import { Logo } from '../components/brand/Logo'
import { Monogram } from '../components/brand/Monogram'
import { PageMeta } from '../components/layout/PageMeta'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeader } from '../components/ui/PageHeader'

/**
 * Development-only reference page for the design system.
 * The route is registered only when running `npm run dev`.
 */

const swatches = [
  ['ink', '#080B10', 'bg-ink'],
  ['ink-2', '#111923', 'bg-ink-2'],
  ['ink-3', '#172130', 'bg-ink-3'],
  ['line', '#233142', 'bg-line'],
  ['fg', '#F7F9FC', 'bg-fg'],
  ['muted', '#AAB7C7', 'bg-muted'],
  ['subtle', '#7E8DA0', 'bg-subtle'],
  ['electric', '#087BFF', 'bg-electric'],
  ['electric-soft', '#3D97FF', 'bg-electric-soft'],
  ['action', '#0066DD', 'bg-action'],
  ['cyan', '#00C8F8', 'bg-cyan'],
  ['paper', '#F5F7FA', 'bg-paper'],
] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container-site border-b border-line py-14">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function Styleguide() {
  return (
    <>
      <PageMeta meta={{ path: '/styleguide', title: 'Style guide', description: 'Design system reference', noindex: true }} />
      <PageHeader title="Design system" intro="Development reference. Not included in production builds." />

      <Section title="Logo">
        <div className="flex flex-wrap items-center gap-8">
          <div className="card flex justify-center px-10 py-12">
            <Logo variant="full" />
          </div>
          <div className="card flex justify-center p-8">
            <Logo variant="compact" />
          </div>
          <div className="card flex items-end justify-center gap-5 p-8">
            <Monogram className="size-16" />
            <Monogram className="size-10" />
            <Monogram className="size-8" />
            <Monogram className="size-4" />
          </div>
        </div>
      </Section>

      <Section title="Colour">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map(([name, hex, cls]) => (
            <li key={name}>
              <div className={`h-20 rounded-control border border-line ${cls}`} />
              <p className="mt-2 text-sm font-semibold">{name}</p>
              <p className="text-sm text-subtle">{hex}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Typography">
        <div className="space-y-6">
          <p className="font-display text-display font-extrabold">Display, Montserrat 800</p>
          <p className="font-display text-h1 font-bold">Heading 1, Montserrat 700</p>
          <p className="font-display text-h2 font-bold">Heading 2, Montserrat 700</p>
          <p className="font-display text-h3 font-bold">Heading 3, Montserrat 700</p>
          <p className="max-w-prose text-lead text-muted">
            Lead paragraph in Inter. Used for page introductions and short summaries that sit below a
            heading.
          </p>
          <p className="max-w-prose">
            Body text in Inter at 17px with a 1.65 line height. Line length stays under about 70
            characters for comfortable reading. <a href="#top" className="text-link">This is a text link.</a>
          </p>
          <p className="text-sm text-subtle">Small metadata text for captions and labels.</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink to="/styleguide">Primary</ButtonLink>
          <ButtonLink to="/styleguide" variant="secondary">
            Secondary
          </ButtonLink>
          <ButtonLink to="/styleguide" size="sm">
            Small
          </ButtonLink>
          <button type="button" className="btn btn-primary" disabled>
            Disabled
          </button>
        </div>
        <div className="mt-6 rounded-card bg-paper p-6">
          <ButtonLink to="/styleguide" variant="on-paper">
            On light surface
          </ButtonLink>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card p-7">
            <h3 className="text-h3">Graphic Design</h3>
            <p className="mt-3 text-muted">Logos, brand identity, posters, social media graphics and more.</p>
          </article>
          <article className="card p-7">
            <h3 className="text-h3">Photography</h3>
            <p className="mt-3 text-muted">Events, portraits, corporate, product and celebration photography.</p>
          </article>
        </div>
      </Section>

      <Section title="Form fields">
        <form className="grid max-w-xl gap-6" onSubmit={(e) => e.preventDefault()} noValidate>
          <div>
            <label htmlFor="sg-name" className="field-label">
              Full name
            </label>
            <input id="sg-name" className="field-control" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="sg-email" className="field-label">
              Email address
            </label>
            <input
              id="sg-email"
              type="email"
              className="field-control"
              aria-invalid="true"
              aria-describedby="sg-email-error"
              defaultValue="hello@"
            />
            <p id="sg-email-error" className="field-error">
              Enter an email address like name@example.com
            </p>
          </div>
          <div>
            <label htmlFor="sg-service" className="field-label">
              Service
            </label>
            <select id="sg-service" className="field-control">
              <option>Graphic Design</option>
              <option>Photography</option>
            </select>
          </div>
          <div>
            <label htmlFor="sg-details" className="field-label">
              Project details
            </label>
            <textarea id="sg-details" className="field-control" aria-describedby="sg-details-hint" />
            <p id="sg-details-hint" className="field-hint">
              What you need, when you need it, and anything we should know.
            </p>
          </div>
        </form>
      </Section>
    </>
  )
}
