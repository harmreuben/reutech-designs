import { Check } from 'lucide-react'
import { hasWhatsApp } from '../../config/site'
import { visibleProjects } from '../../data/projects'
import { whatsappMessages, whatsappUrl } from '../../lib/contact'
import type { Service } from '../../types/content'
import { PhotoPlaceholder } from '../portfolio/PhotoPlaceholder'
import { ProjectCard } from '../portfolio/ProjectCard'
import { ButtonLink } from '../ui/ButtonLink'

interface ServiceSectionProps {
  service: Service
  /** Alternate the image side on wide screens */
  reverse?: boolean
}

/** One full service section on the Services page, built from `data/services.ts`. */
export function ServiceSection({ service, reverse = false }: ServiceSectionProps) {
  const headingId = `${service.id}-heading`
  const related = visibleProjects.filter((p) => p.service === service.id).slice(0, 3)
  const message = service.id === 'photography' ? whatsappMessages.photography : whatsappMessages.graphicDesign

  return (
    <section id={service.id} aria-labelledby={headingId} className="border-b border-line">
      <div className="container-site py-20 sm:py-28">
        {/* Introduction */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={reverse ? 'lg:order-2' : ''}>
            <h2 id={headingId} className="text-h1">
              {service.title}
            </h2>
            <p className="mt-6 max-w-prose text-lead text-muted">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={`/contact?service=${service.id}#quote`}>Request a quote</ButtonLink>
              {hasWhatsApp && (
                <a
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Ask on WhatsApp
                </a>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-card border border-line">
            {service.image ? (
              <img
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <PhotoPlaceholder label="Events, portraits, products and more" />
            )}
          </div>
        </div>

        {/* Offerings */}
        <h3 className="mt-20 text-h2">What we offer</h3>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.offerings.map((o) => (
            <li key={o.title} className="card p-6">
              <h4 className="font-display text-lg font-semibold">{o.title}</h4>
              <p className="mt-2 text-[0.95rem] text-muted">{o.description}</p>
            </li>
          ))}
        </ul>

        {/* Needs and deliverables */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-h3">This is for you if you’re</h3>
            <ul className="mt-5 space-y-3">
              {service.clientNeeds.map((n) => (
                <li key={n} className="flex gap-3 text-muted">
                  <Check className="mt-1 size-5 shrink-0 text-electric" aria-hidden="true" />
                  {n.charAt(0).toLowerCase() + n.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h3">What you receive</h3>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted">
                  <Check className="mt-1 size-5 shrink-0 text-electric" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-subtle">The exact deliverables are confirmed in your quote.</p>
          </div>
        </div>

        {/* Related work */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-h2">Related work</h3>
              <ButtonLink to={`/portfolio?category=${service.portfolioCategory}`} variant="secondary" size="sm">
                See all {service.title.toLowerCase()} work
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} headingLevel="h4" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
