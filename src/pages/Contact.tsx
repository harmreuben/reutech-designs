import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { PageMeta } from '../components/layout/PageMeta'
import { QuoteForm } from '../components/forms/QuoteForm'
import { PageHeader } from '../components/ui/PageHeader'
import { hasEmail, hasWhatsApp, site } from '../config/site'
import { mailtoUrl, telUrl, whatsappUrl } from '../lib/contact'

function ContactMethod({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-3 text-electric">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </li>
  )
}

const helpfulDetails = [
  'What you need: design, photography or both',
  'What it’s for and who will see it',
  'When you need it',
  'Your budget range, if you have one',
  'For shoots: the date and location',
]

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Request a quote or ask about a graphic design or photography project with Reutech Designs in Nairobi, Kenya."
      />
      <PageHeader
        title="Let’s talk about your project"
        intro="Tell us what you have in mind. We’ll reply with any questions, then a quote and next steps."
      />

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr]">
        <section id="quote" aria-labelledby="quote-heading">
          <h2 id="quote-heading" className="text-h2">
            Request a quote
          </h2>
          <p className="mt-4 max-w-prose text-muted">
            Fill in the form and we’ll reply with any questions, then a quote. It takes about two
            minutes.
          </p>
          <div className="mt-10">
            <QuoteForm />
          </div>
        </section>

        <aside aria-labelledby="reach-heading" className="card h-fit p-7 sm:p-9 lg:sticky lg:top-24">
          <h2 id="reach-heading" className="text-h3">
            Other ways to reach us
          </h2>
          <ul className="mt-7 space-y-7">
            {hasWhatsApp && (
              <ContactMethod icon={MessageCircle} title="WhatsApp">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-link">
                  Chat with us on WhatsApp
                </a>
              </ContactMethod>
            )}
            <ContactMethod icon={Phone} title="Phone">
              <a href={telUrl} className="text-link">
                {site.phone.display}
              </a>
            </ContactMethod>
            {hasEmail && (
              <ContactMethod icon={Mail} title="Email">
                <a href={mailtoUrl} className="text-link">
                  {site.email}
                </a>
              </ContactMethod>
            )}
            <ContactMethod icon={MapPin} title="Location">
              {site.location.city}, {site.location.country}
            </ContactMethod>
          </ul>

          <h2 className="mt-10 border-t border-line pt-8 text-h3">What to include</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
            {helpfulDetails.map((d) => (
              <li key={d} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric" />
                {d}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}
