import { Check } from 'lucide-react'
import { Link } from 'react-router'
import type { Service } from '../../types/content'
import { PhotoPlaceholder } from '../portfolio/PhotoPlaceholder'

/** Service preview card used on the homepage. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card group relative flex flex-col overflow-hidden">
      {service.image ? (
        <img
          src={service.image.thumb ?? service.image.src}
          alt=""
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <PhotoPlaceholder label="Events, portraits and products" aspect="aspect-[16/10]" />
      )}
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <h3 className="text-h3">
          <Link
            to={`/services#${service.id}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-cyan"
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-3 text-muted">{service.summary}</p>
        <ul className="mt-6 grid gap-2.5 text-[0.95rem] sm:grid-cols-2">
          {service.offerings.slice(0, 6).map((o) => (
            <li key={o.title} className="flex gap-2.5">
              <Check className="mt-1 size-4 shrink-0 text-electric" aria-hidden="true" />
              {o.title}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-8 text-[0.95rem] font-semibold text-electric-soft group-hover:text-cyan">
          Explore {service.title.toLowerCase()}
        </p>
      </div>
    </article>
  )
}
