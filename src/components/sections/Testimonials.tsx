import { testimonials } from '../../data/testimonials'

/** Renders nothing until real, permission-confirmed testimonials are added. */
export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="testimonials-heading" className="container-site py-20 sm:py-28">
      <h2 id="testimonials-heading" className="text-h2">
        What clients say
      </h2>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name} className="card p-8">
            <figure>
              <blockquote className="text-lead text-fg">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-fg">{t.name}</span>
                {t.role && <span>, {t.role}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
