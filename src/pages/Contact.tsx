import { Mail, Phone } from 'lucide-react'
import { PageMeta } from '../components/layout/PageMeta'
import { DevNote } from '../components/ui/DevNote'
import { PageHeader } from '../components/ui/PageHeader'
import { site } from '../config/site'

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Request a quote or ask about a graphic design or photography project with Reutech Designs."
      />
      <PageHeader
        title="Let’s talk about your project"
        intro="Tell us what you have in mind and we’ll get back to you with next steps and a quote."
      />
      <section id="quote" aria-labelledby="quote-heading" className="container-site py-16">
        <h2 id="quote-heading" className="text-h2">
          Request a quote
        </h2>
        <ul className="mt-6 space-y-3">
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-link">
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li>
            <a href={`tel:${site.phone.e164}`} className="inline-flex items-center gap-2.5 text-link">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </li>
        </ul>
      </section>
      <DevNote>The quotation form and WhatsApp buttons are built in Stage 4.</DevNote>
    </>
  )
}
