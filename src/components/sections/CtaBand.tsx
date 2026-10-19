import { startProject } from '../../data/navigation'
import { ButtonLink } from '../ui/ButtonLink'
import { RingArc } from '../ui/RingArc'

interface CtaBandProps {
  title?: string
  text?: string
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = 'Have an idea? Let’s bring it to life.',
  text = 'Tell us what you’re working on. We’ll reply with questions, ideas and a quote.',
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-heading" className="container-site py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-panel border border-line bg-ink-2 px-6 py-14 sm:px-14 sm:py-20">
        <RingArc className="absolute -top-24 -right-32 hidden w-[30rem] sm:block" />
        <div className="relative max-w-2xl">
          <h2 id="cta-heading" className="text-h2">
            {title}
          </h2>
          <p className="mt-4 text-lead text-muted">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to={startProject.to}>{startProject.label}</ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
