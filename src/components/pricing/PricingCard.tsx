import { formatKES } from '../../data/pricing'
import type { PricingPackage } from '../../types/content'
import { ButtonLink } from '../ui/ButtonLink'

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const headingId = `pkg-${pkg.id}`
  return (
    <article aria-labelledby={headingId} className="card flex flex-col p-7 sm:p-8">
      <h3 id={headingId} className="text-h3">
        {pkg.name}
      </h3>
      <p className="mt-3 text-[0.975rem] text-muted">{pkg.bestFor}</p>

      <p className="mt-6 border-t border-line pt-6 font-display text-2xl font-bold text-fg">
        {pkg.price.status === 'from' ? (
          <>
            <span className="text-base font-semibold text-muted">From </span>
            {formatKES(pkg.price.amountKES)}
          </>
        ) : (
          'Price on request'
        )}
      </p>

      <h4 className="mt-6 font-sans text-sm font-semibold text-fg">Your quote depends on</h4>
      <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
        {pkg.quoteFactors.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <ButtonLink
          to={`/contact?service=${pkg.service}&package=${pkg.id}#quote`}
          variant="secondary"
          className="w-full"
        >
          Request a quote
        </ButtonLink>
      </div>
    </article>
  )
}
