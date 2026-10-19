import { afterEach, describe, expect, it, vi } from 'vitest'
import { handleQuoteRequest, type QuoteEnv } from '../server/quote'

const devEnv: QuoteEnv = { mode: 'development' }
const prodEnv: QuoteEnv = {
  mode: 'production',
  RESEND_API_KEY: 're_test',
  QUOTE_TO_EMAIL: 'owner@example.com',
  QUOTE_FROM_EMAIL: 'Website <onboarding@resend.dev>',
}

type Body = { ok: boolean; error?: string; delivery?: string; fieldErrors?: Record<string, string> }
const read = async (res: Response): Promise<Body> => (await res.json()) as Body

let ipCounter = 0
const validBody = () => ({
  fullName: 'Jane Wanjiku',
  email: 'jane@example.com',
  phone: '0712 345 678',
  service: 'photography',
  packageId: 'event-coverage',
  projectTitle: '<b>Launch</b> event',
  details: 'Photos of a product launch, about three hours.\u0007 Thanks!',
  budget: '',
  deadline: '',
  contactMethod: 'WhatsApp',
  consent: true,
  website: '',
  startedAt: Date.now() - 60_000,
})

function post(body: unknown, init: { headers?: Record<string, string>; raw?: string } = {}) {
  ipCounter += 1
  return new Request('http://localhost:5173/api/quote', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': `10.0.0.${ipCounter}`, ...init.headers },
    body: init.raw ?? JSON.stringify(body),
  })
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('POST /api/quote', () => {
  it('rejects other HTTP methods', async () => {
    const res = await handleQuoteRequest(new Request('http://localhost/api/quote'), devEnv)
    expect(res.status).toBe(405)
  })

  it('rejects non-JSON bodies and malformed JSON', async () => {
    const text = new Request('http://localhost/api/quote', { method: 'POST', body: 'hi', headers: { 'content-type': 'text/plain' } })
    expect((await handleQuoteRequest(text, devEnv)).status).toBe(415)
    expect((await handleQuoteRequest(post(null, { raw: '{oops' }), devEnv)).status).toBe(400)
  })

  it('rejects oversized requests', async () => {
    const res = await handleQuoteRequest(post({ ...validBody(), details: 'x'.repeat(30_000) }), devEnv)
    expect(res.status).toBe(413)
  })

  it('blocks posts from other websites', async () => {
    const res = await handleQuoteRequest(post(validBody(), { headers: { origin: 'https://evil.example' } }), devEnv)
    expect(res.status).toBe(403)
  })

  it('allows posts from the same site', async () => {
    const res = await handleQuoteRequest(post(validBody(), { headers: { origin: 'http://localhost:5173' } }), devEnv)
    expect(res.status).toBe(200)
  })

  it('rejects forms submitted faster than a person could fill them', async () => {
    const res = await handleQuoteRequest(post({ ...validBody(), startedAt: Date.now() }), devEnv)
    expect(res.status).toBe(400)
    expect((await read(res)).error).toBe('too-fast')
  })

  it('quietly drops honeypot submissions without sending email', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await handleQuoteRequest(post({ ...validBody(), website: 'spam.example' }), prodEnv)
    expect(res.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns field errors for invalid data', async () => {
    const res = await handleQuoteRequest(post({ ...validBody(), email: 'nope', consent: false }), devEnv)
    expect(res.status).toBe(400)
    const body = await read(res)
    expect(body.error).toBe('validation')
    expect(Object.keys(body.fieldErrors ?? {})).toEqual(expect.arrayContaining(['email', 'consent']))
  })

  it('logs instead of emailing in development when email is not configured', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {})
    const res = await handleQuoteRequest(post(validBody()), devEnv)
    expect(res.status).toBe(200)
    expect((await read(res)).delivery).toBe('dev-log')
    expect(info).toHaveBeenCalled()
  })

  it('never reports success in production when email is not configured', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await handleQuoteRequest(post(validBody()), { mode: 'production' })
    expect(res.status).toBe(503)
    expect((await read(res)).ok).toBe(false)
  })

  it('sends a clean, escaped email through Resend', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'abc' }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    const res = await handleQuoteRequest(post(validBody()), prodEnv)
    expect(res.status).toBe(200)
    expect((await read(res)).delivery).toBe('email')

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.headers.Authorization).toBe('Bearer re_test')
    const payload = JSON.parse(init.body)
    expect(payload.to).toEqual(['owner@example.com'])
    expect(payload.reply_to).toBe('jane@example.com')
    expect(payload.html).toContain('&lt;b&gt;Launch&lt;/b&gt;')
    expect(payload.html).not.toContain('<b>Launch</b>')
    expect(payload.text).not.toContain('\u0007') // control characters removed
  })

  it('reports failure when Resend rejects the email', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('denied', { status: 403 })))
    const res = await handleQuoteRequest(post(validBody()), prodEnv)
    expect(res.status).toBe(502)
    expect((await read(res)).ok).toBe(false)
  })

  it('reports failure when Resend cannot be reached', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network down')))
    const res = await handleQuoteRequest(post(validBody()), prodEnv)
    expect(res.status).toBe(502)
  })

  it('rate-limits repeated requests from one connection', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
    const statuses: number[] = []
    for (let i = 0; i < 9; i++) {
      const req = new Request('http://localhost/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-real-ip': '192.0.2.50' },
        body: JSON.stringify(validBody()),
      })
      statuses.push((await handleQuoteRequest(req, devEnv)).status)
    }
    expect(statuses.slice(0, 8).every((s) => s === 200)).toBe(true)
    expect(statuses[8]).toBe(429)
  })
})
