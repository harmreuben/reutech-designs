import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { PageMeta } from '../components/layout/PageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { hasEmail, hasWhatsApp, site } from '../config/site'
import { mailtoUrl, telUrl, whatsappUrl } from '../lib/contact'

/**
 * Privacy notice for the enquiry form.
 * TODO(owner): review before launch. Update it if you add analytics, a
 * newsletter, a database, or change how long you keep enquiries.
 */
const LAST_UPDATED = '19 October 2026'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-10">
      <h2 id={id} className="text-h3">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-muted [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
    </section>
  )
}

export default function Privacy() {
  return (
    <>
      <PageMeta path="/privacy" />
      <PageHeader
        title="Privacy notice"
        intro={`How ${site.name} handles the details you share with us through this website. Last updated ${LAST_UPDATED}.`}
      />

      <div className="container-site max-w-3xl space-y-10 py-16 sm:py-20">
        <Block id="who" title="Who we are">
          <p>
            {site.name} is a graphic design and photography business based in {site.location.city},{' '}
            {site.location.country}. We are responsible for the personal information you send us
            through this website.
          </p>
        </Block>

        <Block id="collect" title="What we collect">
          <p>When you send a quote request, we collect:</p>
          <ul>
            <li>your name, email address and, if you give it, your phone number</li>
            <li>how you would like us to contact you</li>
            <li>
              the details of your project: the service, title, description, and optionally your
              budget range and date
            </li>
          </ul>
          <p>
            We ask only for what we need to reply to you. Please don’t include sensitive personal
            information in the project description.
          </p>
          <p>
            This website does not use advertising or analytics cookies. If you contact us on WhatsApp,
            your messages are also handled under WhatsApp’s own privacy policy.
          </p>
        </Block>

        <Block id="use" title="How we use it">
          <p>We use your details only to:</p>
          <ul>
            <li>reply to your enquiry and ask any follow-up questions</li>
            <li>prepare and send you a quote</li>
            <li>carry out the project if you decide to go ahead</li>
          </ul>
          <p>
            We do not sell your information or use it for marketing without your separate
            agreement. The legal basis for using it is your consent, which you give when you send the
            form, and taking steps at your request before entering into an agreement with us.
          </p>
        </Block>

        <Block id="share" title="Who handles it">
          <p>To run this website and deliver your enquiry, we use trusted service providers:</p>
          <ul>
            <li>
              <strong className="text-fg">Vercel</strong>, which hosts this website and processes the
              form when you send it
            </li>
            <li>
              <strong className="text-fg">Resend</strong>, which delivers your enquiry to our inbox by
              email
            </li>
          </ul>
          <p>
            These providers may process data outside Kenya. They handle it only to provide their
            service to us. We don’t share your details with anyone else unless the law requires it.
          </p>
        </Block>

        <Block id="keep" title="How long we keep it">
          <p>
            We keep enquiries only for as long as we need them to respond, to deliver any work you
            agree to, and to keep basic business records. After that, we delete them.
          </p>
        </Block>

        <Block id="rights" title="Your rights">
          <p>
            Under Kenya’s Data Protection Act, 2019, you can ask us to tell you what information we
            hold about you, correct it, or delete it. You can also withdraw your consent or object to
            how we use your information.
          </p>
          <p>
            If you are unhappy with how we handle your information, you can complain to the Office of
            the Data Protection Commissioner (ODPC).
          </p>
        </Block>

        <Block id="contact" title="Contact us about privacy">
          <p>To make a request or ask a question about this notice, contact us:</p>
          <ul>
            {hasWhatsApp && (
              <li>
                <a href={whatsappUrl('Hello Reutech Designs, I have a privacy question.')} target="_blank" rel="noopener noreferrer" className="text-link">
                  on WhatsApp
                </a>
              </li>
            )}
            <li>
              by phone on{' '}
              <a href={telUrl} className="text-link">
                {site.phone.display}
              </a>
            </li>
            {hasEmail && (
              <li>
                by email at{' '}
                <a href={mailtoUrl} className="text-link">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
          <p>
            We may update this notice from time to time. The date at the top shows when it last
            changed. Return to the{' '}
            <Link to="/contact#quote" className="text-link">
              quote form
            </Link>
            .
          </p>
        </Block>
      </div>
    </>
  )
}
