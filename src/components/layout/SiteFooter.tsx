import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../config/site'
import { legalNav, primaryNav, serviceNav } from '../../data/navigation'
import { Logo } from '../brand/Logo'

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-display text-base font-semibold text-fg">{children}</h2>
}

const footerLink = 'text-muted transition-colors hover:text-fg'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="max-w-xs">
          <Link to="/" aria-label={`${site.name}, home`} className="inline-block rounded-md">
            <Logo variant="compact" />
          </Link>
          <p className="mt-5 font-display text-sm font-medium text-fg italic">{site.tagline}</p>
          <p className="mt-3 text-[0.95rem] text-muted">
            Graphic design and photography for people and brands with something to say.
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="font-display text-base font-semibold text-fg">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="font-display text-base font-semibold text-fg">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {serviceNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/pricing" className={footerLink}>
                Pricing and quotes
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <FooterHeading>Get in touch</FooterHeading>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2.5 ${footerLink}`}>
                  <Mail className="size-4 shrink-0 text-electric" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            )}
            {site.phone.e164 && (
              <li>
                <a href={`tel:${site.phone.e164}`} className={`inline-flex items-center gap-2.5 ${footerLink}`}>
                  <Phone className="size-4 shrink-0 text-electric" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
            )}
            <li className="inline-flex items-center gap-2.5 text-muted">
              <MapPin className="size-4 shrink-0 text-electric" aria-hidden="true" />
              {site.location.city}, {site.location.country}
            </li>
          </ul>

          {site.social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]" aria-label="Social media">
              {site.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
