/**
 * Checks a deployed copy of the site, e.g.
 *   npm run verify:deploy -- https://reutech-designs.vercel.app
 *
 * Add --send-test-email to also send ONE real quote request through the live
 * form endpoint (it arrives in your inbox marked as a deployment test).
 *
 * Exits with code 1 if any check fails. Needs Node 22.18+ (runs TypeScript directly).
 */
import { fullTitle, notFoundRoute, publicRoutes } from '../src/data/seo.ts'
import { site } from '../src/config/site.ts'

const args = process.argv.slice(2)
const base = args.find((a) => a.startsWith('http'))?.replace(/\/+$/, '')
const sendTestEmail = args.includes('--send-test-email')

if (!base) {
  console.error('Usage: npm run verify:deploy -- https://your-site.vercel.app [--send-test-email]')
  process.exit(2)
}

let failures = 0
const pass = (msg: string) => console.log(`  PASS  ${msg}`)
const fail = (msg: string) => {
  failures += 1
  console.log(`  FAIL  ${msg}`)
}
const check = (ok: boolean, msg: string, detail = '') => (ok ? pass(msg) : fail(detail ? `${msg} (${detail})` : msg))

async function get(path: string, init?: RequestInit) {
  return fetch(`${base}${path}`, { redirect: 'manual', ...init })
}

console.log(`\nChecking ${base}\n\nPages`)
for (const route of publicRoutes()) {
  const res = await get(route.path)
  const html = res.status === 200 ? await res.text() : ''
  const expected = `>${fullTitle(route.title)}</title>`
  check(res.status === 200 && html.includes(expected), `${route.path} loads with its own title`, `status ${res.status}`)
}

console.log('\nMissing pages')
const missing = await get(`/this-page-does-not-exist-${Date.now()}`)
const missingHtml = await missing.text()
check(missing.status === 404, 'unknown address returns 404', `status ${missing.status}`)
check(missingHtml.includes(`>${fullTitle(notFoundRoute.title)}</title>`), 'unknown address shows the "Page not found" page')
const slash = await get('/about/')
check([301, 308].includes(slash.status) && (slash.headers.get('location') ?? '').endsWith('/about'), '/about/ redirects to /about', `status ${slash.status}`)

console.log('\nFiles')
for (const [path, type] of [
  ['/robots.txt', 'text/plain'],
  ['/og-image.png', 'image/png'],
  ['/favicon.svg', 'image/svg+xml'],
  ['/site.webmanifest', ''],
  ['/portfolio/mvua-roasters.webp', 'image/webp'],
] as const) {
  const res = await get(path)
  check(res.status === 200 && (res.headers.get('content-type') ?? '').includes(type), `${path} is served`, `status ${res.status}`)
}

console.log('\nSecurity headers')
const home = await get('/')
for (const header of [
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
  'strict-transport-security',
]) {
  check(home.headers.has(header), header)
}

console.log('\nQuote endpoint')
const getApi = await get('/api/quote')
check(getApi.status === 405, 'GET /api/quote is refused (405)', `status ${getApi.status}`)
const invalid = await get('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fullName: '', startedAt: Date.now() - 60_000, website: '' }),
})
const invalidBody = (await invalid.json().catch(() => ({}))) as { error?: string }
check(invalid.status === 400 && invalidBody.error === 'validation', 'invalid request is rejected with field errors', `status ${invalid.status}`)

if (sendTestEmail) {
  const res = await get('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Deployment Test',
      email: 'deploy-test@example.com',
      phone: '',
      service: 'graphic-design',
      packageId: '',
      projectTitle: 'Website deployment test',
      details: 'Automated check from scripts/verify-deploy.ts. You can delete this email.',
      budget: '',
      deadline: '',
      contactMethod: 'Email',
      consent: true,
      website: '',
      startedAt: Date.now() - 60_000,
    }),
  })
  const body = (await res.json().catch(() => ({}))) as { delivery?: string; error?: string; message?: string }
  check(
    res.status === 200 && body.delivery === 'email',
    'test quote request was emailed (check your inbox)',
    body.message ?? `status ${res.status}`,
  )
}

if (site.url) {
  console.log('\nSearch engines')
  const sitemap = await get('/sitemap.xml')
  check(sitemap.status === 200, '/sitemap.xml is served', `status ${sitemap.status}`)
  const html = await (await get('/about')).text()
  check(html.includes(`rel="canonical" href="${site.url.replace(/\/+$/, '')}/about"`), '/about has its canonical URL')
} else {
  console.log('\nSearch engines\n  SKIP  sitemap and canonical URLs (site.url is not set yet)')
}

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) failed.\n`)
process.exit(failures === 0 ? 0 : 1)
