import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="Who Reutech Designs is, how we approach graphic design and photography, and how a project with us works."
      />
      <PageHeader
        title="About Reutech Designs"
        intro="A creative studio for graphic design and photography, built on clear communication and careful work."
      />
      <DevNote>Full About Us content is written in Stage 3.</DevNote>
    </>
  )
}
