import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'

export default function Pricing() {
  return (
    <>
      <PageMeta
        title="Pricing"
        description="Graphic design and photography packages from Reutech Designs, quoted in Kenyan shillings (KES)."
      />
      <PageHeader
        title="Pricing"
        intro="Every project is quoted on its scope, deliverables, duration and location. Prices are in Kenyan shillings (KES)."
      />
      <DevNote>
        Package cards are built in Stage 3. They will show “Request a quote” until you supply approved
        prices.
      </DevNote>
    </>
  )
}
