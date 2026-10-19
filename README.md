# Reutech Designs website

Graphic design and photography studio website. React 19, TypeScript, Vite, Tailwind CSS 4 and React Router.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local development site at http://localhost:5173 |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Check code with ESLint |
| `npm test` | Run the automated tests (Vitest) |
| `npm run check` | Lint, test and build in one go; run this before committing |

`/styleguide` (development only) shows the logo, colours, type, buttons and form fields.

## Quote form (email delivery)

The Contact page form posts to `/api/quote`. The same handler (`server/quote.ts`) runs as a Vercel Function in production (`api/quote.ts`) and inside `npm run dev` / `npm run preview` locally.

It validates and cleans every field on the server, blocks other websites from posting, rate-limits each connection, and uses a hidden honeypot field and a minimum fill time to filter out bots. Enquiries are emailed through [Resend](https://resend.com) with the visitor's address as reply-to.

**Setup**
1. Create a free Resend account with the email address that should receive enquiries.
2. In Resend, create an API key.
3. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `QUOTE_TO_EMAIL`. Keep the test sender `onboarding@resend.dev` for now: it can only deliver to your own Resend account address.
4. Restart `npm run dev`, then send a test request from the Contact page.
5. After buying the domain, verify it in Resend and change `QUOTE_FROM_EMAIL` to e.g. `Reutech Designs Website <website@reutechdesigns.com>`.
6. On Vercel, add the same variables under Project → Settings → Environment Variables.

Without `RESEND_API_KEY`, development prints each request in the terminal instead of emailing it, and production shows visitors an error with a WhatsApp alternative. The site never tells a visitor a request was sent unless it actually was.

## SEO

Page titles and descriptions live in `src/data/seo.ts`. During `npm run build`, `build-tools/seo-plugin.ts` writes a separate HTML file for every page (e.g. `dist/about/index.html`) with that page's title, description and social-preview tags, plus `404.html` and `robots.txt`. This means Google and link previews on WhatsApp, Facebook and LinkedIn show the right information.

**After buying the domain**, set `url` in `src/config/site.ts` (e.g. `'https://reutechdesigns.com'`). The next build then also adds canonical URLs, the social-sharing image (`public/og-image.png`) and `sitemap.xml`.

The homepage includes schema.org business data (name, phone, Nairobi location) built only from confirmed details in `site.ts`.

## Tests

`npm test` runs 44 checks in `tests/`:
- **Form rules**: every field's validation, including the phone and date rules.
- **Quote endpoint**: methods, other-website blocking, spam checks, rate limiting, honest errors, and the exact email sent to Resend (with a fake Resend, so no real email is sent).
- **Content**: navigation order, only the two promoted services, no virtual-assistance wording, portfolio images exist, no unapproved prices, correct WhatsApp link.
- **SEO**: every page has a unique title and description, and the business data contains no invented facts.

## Deployment (Vercel)

`vercel.json` sets the build (`npm run build` → `dist`), clean URLs, security headers (including a Content Security Policy) and caching. The site needs no rewrites: every page has its own HTML file, and unknown addresses get `404.html` with a real 404 status. `api/quote.ts` becomes a Vercel Function automatically.

Environment variables to add in Vercel (Project → Settings → Environment Variables): `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`.

After each deployment, check the live site:

```powershell
npm run verify:deploy -- https://your-site.vercel.app
npm run verify:deploy -- https://your-site.vercel.app --send-test-email
```

## Where content lives

| What | File |
|---|---|
| Business name, phone, WhatsApp, email, location, social links | `src/config/site.ts` |
| Services, offerings and deliverables | `src/data/services.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Pricing packages | `src/data/pricing.ts` |
| Project process steps | `src/data/process.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Navigation | `src/data/navigation.ts` |

Anything empty or switched off in `site.ts` (email, social links) is hidden on the site.

## Common updates

### Turn on the email address
After buying the domain and setting up the mailbox, set `emailLive: true` in `src/config/site.ts`.

### Add a photography project
1. Save the photo (about 1600 × 1200 px, JPG or WebP) at the path in that project's `plannedPhoto`, e.g. `public/portfolio/photos/portrait-session.jpg`.
2. In `src/data/projects.ts`, replace `image: null` with:
   ```ts
   image: {
     src: '/portfolio/photos/portrait-session.jpg',
     alt: 'Describe what is in the photo',
     width: 1600,
     height: 1200,
   },
   ```
3. If it's real client work, set `isSample: false` and use the real client name (with their permission).

Photography projects without a photo are hidden on the live site and appear as placeholders only during development.

### Add a real client project
Add an entry to `src/data/projects.ts` with `isSample: false`. Put images in `public/portfolio/`.

### Publish a price
In `src/data/pricing.ts`, change a package's `price` from `{ status: 'quote' }` to `{ status: 'from', amountKES: <approved amount> }`. Only use prices you have approved.

### Add a testimonial
Add it to `src/data/testimonials.ts` only when the client has agreed to be quoted. The section appears automatically once the list has an entry.

## Sample artwork

The images in `public/portfolio/` are original sample concepts for fictional brands (Mvua Roasters, Nairobi Night Market, Kijani Fitness, Amani Advocates, Savanna Tech Meetup). They are labelled "Sample concept" everywhere they appear. Replace them with real work over time.
