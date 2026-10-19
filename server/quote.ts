/**
 * Quote request handler. Runs on the server only (Vercel Function in
 * production, Vite middleware in development). Never imported by the browser.
 *
 * Flow: method/size/origin checks -> rate limit -> spam checks ->
 * validation -> clean-up -> email via Resend.
 */
import { quoteSchema, serviceLabel, type QuoteRequest, type QuoteResponse } from '../src/lib/quote-schema.js'

export interface QuoteEnv {
  /** Resend API key (server-side secret) */
  RESEND_API_KEY?: string
  /** Inbox that receives enquiries */
  QUOTE_TO_EMAIL?: string
  /** Sender address, e.g. 'Reutech Designs <onboarding@resend.dev>' */
  QUOTE_FROM_EMAIL?: string
  /** Comma-separated extra origins allowed to post, e.g. 'https://reutechdesigns.com' */
  QUOTE_ALLOWED_ORIGINS?: string
  /** 'development' logs enquiries to the terminal when email isn't configured */
  mode: 'production' | 'development'
}

const MAX_BODY_BYTES = 20_000
const MIN_FILL_MS = 3_000
const RATE_LIMIT = { max: 8, windowMs: 10 * 60 * 1000 }

// Best-effort, per-instance rate limiting. Serverless instances don't share
// memory, so this slows down abuse rather than stopping it completely.
const recentByIp = new Map<string, number[]>()

function isRateLimited(ip: string, now = Date.now()) {
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  if (hits.length >= RATE_LIMIT.max) {
    recentByIp.set(ip, hits)
    return true
  }
  hits.push(now)
  recentByIp.set(ip, hits)
  if (recentByIp.size > 5000) recentByIp.clear() // keep memory bounded
  return false
}

function json(body: QuoteResponse, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}

/** Remove control characters (keeps line breaks and tabs). */
function clean(value: string) {
  // eslint-disable-next-line no-control-regex -- intentionally strips control characters
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function originAllowed(request: Request, env: QuoteEnv) {
  const origin = request.headers.get('origin')
  if (!origin) return true // same-origin form posts from some browsers omit it
  const requestHost = new URL(request.url).host
  const allowed = (env.QUOTE_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  try {
    return new URL(origin).host === requestHost || allowed.includes(origin)
  } catch {
    return false
  }
}

function clientIp(request: Request) {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

function buildEmail(q: QuoteRequest, reference: string) {
  const rows: [string, string][] = [
    ['Name', q.fullName],
    ['Email', q.email],
    ['Phone', q.phone || 'Not given'],
    ['Preferred contact', q.contactMethod],
    ['Service', serviceLabel(q.service)],
    ['Package', q.packageId || 'Not specified'],
    ['Project', q.projectTitle],
    ['Budget', q.budget || 'Not given'],
    ['Needed by', q.deadline || 'Not given'],
  ]

  const text = [
    `New quote request (${reference})`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Project details:',
    q.details,
  ].join('\n')

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.5">
<h2 style="margin:0 0 4px">New quote request</h2>
<p style="margin:0 0 16px;color:#4A5A6E">Reference ${escapeHtml(reference)}</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#4A5A6E;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
  )
  .join('\n')}
</table>
<h3 style="margin:20px 0 6px">Project details</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(q.details)}</p>
<p style="margin-top:24px;color:#4A5A6E;font-size:13px">Reply to this email to answer ${escapeHtml(q.fullName)} directly.</p>
</body></html>`

  return { text, html }
}

export async function handleQuoteRequest(request: Request, env: QuoteEnv): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'bad-request', message: 'Use POST to send a quote request.' }, 405, {
      Allow: 'POST',
    })
  }

  if (!originAllowed(request, env)) {
    return json({ ok: false, error: 'bad-request', message: 'This request came from an unknown website.' }, 403)
  }

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json({ ok: false, error: 'bad-request', message: 'Send the form as JSON.' }, 415)
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'bad-request', message: 'The request is too large.' }, 413)
  }

  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('not an object')
    body = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'bad-request', message: 'The form data could not be read.' }, 400)
  }

  if (isRateLimited(clientIp(request))) {
    return json(
      {
        ok: false,
        error: 'rate-limited',
        message: 'Too many requests from your connection. Wait a few minutes, or message us on WhatsApp.',
      },
      429,
      { 'Retry-After': '600' },
    )
  }

  // Honeypot filled in: almost certainly a bot. Return a normal-looking
  // response without sending anything.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true, delivery: 'email', reference: 'RD-0' }, 200)
  }

  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0
  if (Date.now() - startedAt < MIN_FILL_MS) {
    return json(
      { ok: false, error: 'too-fast', message: 'That was very quick. Check your details and press send again.' },
      400,
    )
  }

  const result = quoteSchema.safeParse(body)
  if (!result.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      fieldErrors[key] ??= issue.message
    }
    return json(
      { ok: false, error: 'validation', message: 'Some details need fixing.', fieldErrors },
      400,
    )
  }

  const q: QuoteRequest = {
    ...result.data,
    fullName: clean(result.data.fullName),
    email: clean(result.data.email),
    phone: clean(result.data.phone),
    packageId: clean(result.data.packageId).replace(/[^a-z0-9-]/gi, ''),
    projectTitle: clean(result.data.projectTitle),
    details: clean(result.data.details),
  }

  const reference = `RD-${Date.now().toString(36).toUpperCase()}`
  const { text, html } = buildEmail(q, reference)

  const configured = Boolean(env.RESEND_API_KEY && env.QUOTE_TO_EMAIL)
  if (!configured) {
    if (env.mode === 'development') {
      console.info(`\n[quote] Email not configured, so the request was only logged here:\n${text}\n`)
      return json({ ok: true, delivery: 'dev-log', reference }, 200)
    }
    console.error('[quote] RESEND_API_KEY or QUOTE_TO_EMAIL is missing; enquiry not delivered.')
    return json(
      {
        ok: false,
        error: 'not-configured',
        message: 'Online requests are not available right now. Please message us on WhatsApp or call us.',
      },
      503,
    )
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.QUOTE_FROM_EMAIL || 'Reutech Designs Website <onboarding@resend.dev>',
        to: env.QUOTE_TO_EMAIL!.split(',').map((e) => e.trim()),
        reply_to: q.email,
        subject: `Quote request: ${q.projectTitle} (${serviceLabel(q.service)})`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[quote] Resend returned ${res.status}: ${detail.slice(0, 300)}`)
      throw new Error(`Resend ${res.status}`)
    }
  } catch (error) {
    console.error('[quote] Delivery failed:', error instanceof Error ? error.message : error)
    return json(
      {
        ok: false,
        error: 'delivery-failed',
        message: 'Your request could not be sent. Please try again, or message us on WhatsApp.',
      },
      502,
    )
  }

  return json({ ok: true, delivery: 'email', reference }, 200)
}
