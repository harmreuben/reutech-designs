import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'

export default function Portfolio() {
  return (
    <>
      <PageMeta
        title="Portfolio"
        description="Graphic design, branding, social media and photography work by Reutech Designs."
      />
      <PageHeader title="Portfolio" intro="A selection of design and photography work." />
      <DevNote>
        The filterable project grid and project details are built in Stages 3 and 4. Sample projects
        will be clearly labelled as concepts.
      </DevNote>
    </>
  )
}
