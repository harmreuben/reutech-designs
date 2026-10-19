import { PageMeta } from '../components/layout/PageMeta'
import { PricingCard } from '../components/pricing/PricingCard'
import { CtaBand } from '../components/sections/CtaBand'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { pricingPackages } from '../data/pricing'
import { services } from '../data/services'

const quoteFactors = [
  { title: 'Scope', text: 'What needs to be designed or photographed, and how much of it.' },
  { title: 'Deliverables', text: 'The files, sizes and formats you need at the end.' },
  { title: 'Time', text: 'Hours of coverage for shoots, and how soon you need the work.' },
  { title: 'Location', text: 'Where a shoot takes place, including any travel.' },
]

export default function Pricing() {
  return (
    <>
      <PageMeta path="/pricing" />
      <PageHeader
        title="Pricing"
        intro="Every project is different, so we quote each one on its scope. All prices are in Kenyan shillings (KES), and you’ll receive a quote before any work starts."
      />

      {services.map((service) => {
        const packages = pricingPackages.filter((p) => p.service === service.id)
        const headingId = `pricing-${service.id}`
        return (
          <section key={service.id} aria-labelledby={headingId} className="container-site py-16 sm:py-20">
            <SectionHeading id={headingId} title={service.title} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </section>
        )
      })}

      <section aria-labelledby="how-quotes-heading" className="border-y border-line bg-ink-2/40">
        <div className="container-site py-20 sm:py-24">
          <SectionHeading
            id="how-quotes-heading"
            title="How quotes work"
            intro="Send us a few details about your project and we’ll reply with a written quote. These are the things that affect the price."
          />
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quoteFactors.map((f) => (
              <div key={f.title} className="border-t-2 border-electric pt-5">
                <dt className="font-display text-lg font-semibold text-fg">{f.title}</dt>
                <dd className="mt-2 text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <ButtonLink to="/contact#quote">Request a custom quote</ButtonLink>
            <p className="text-sm text-subtle">Not sure which package fits? Describe the project and we’ll suggest one.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
