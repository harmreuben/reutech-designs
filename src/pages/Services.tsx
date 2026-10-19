import { PageMeta } from '../components/layout/PageMeta'
import { CtaBand } from '../components/sections/CtaBand'
import { ServiceSection } from '../components/services/ServiceSection'
import { PageHeader } from '../components/ui/PageHeader'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageMeta path="/services" />
      <PageHeader
        title="Services"
        intro="Graphic design and photography, on their own or together, so your brand looks consistent everywhere it appears."
      >
        {services.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="btn btn-secondary btn-sm">
            {s.title}
          </a>
        ))}
      </PageHeader>

      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} reverse={i % 2 === 1} />
      ))}

      <CtaBand
        title="Need both design and photography?"
        text="Many projects use both, such as a product launch with photos and promotional graphics. Tell us what you need and we’ll plan it together."
      />
    </>
  )
}
