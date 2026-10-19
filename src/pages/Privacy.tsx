import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'

export default function Privacy() {
  return (
    <>
      <PageMeta title="Privacy notice" description="How Reutech Designs handles the details you send through this website." />
      <PageHeader title="Privacy notice" />
      <DevNote>
        The privacy notice is written in Stage 4, together with the enquiry form, so it describes
        exactly what the form collects and where it is sent.
      </DevNote>
    </>
  )
}
