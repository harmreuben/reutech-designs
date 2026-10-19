import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Graphic design and photography services from Reutech Designs: logos, brand identity, marketing materials, events, portraits and products."
      />
      <PageHeader
        title="Services"
        intro="Graphic design and photography, on their own or together, so your brand looks consistent everywhere it appears."
      />
      {/* Anchors used by the footer and service links */}
      <section id="graphic-design" aria-labelledby="graphic-design-heading" className="container-site py-16">
        <h2 id="graphic-design-heading" className="text-h2">
          Graphic Design
        </h2>
      </section>
      <section id="photography" aria-labelledby="photography-heading" className="container-site pb-16">
        <h2 id="photography-heading" className="text-h2">
          Photography
        </h2>
      </section>
      <DevNote>Service details, deliverables and imagery are added in Stage 3.</DevNote>
    </>
  )
}
