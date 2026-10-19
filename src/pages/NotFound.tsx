import { PageMeta } from '../components/layout/PageMeta'
import { ButtonLink } from '../components/ui/ButtonLink'
import { RingArc } from '../components/ui/RingArc'
import { notFoundRoute } from '../data/seo'

export default function NotFound() {
  return (
    <>
      <PageMeta meta={notFoundRoute} />
      <section className="relative overflow-hidden">
        <RingArc className="absolute top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="container-site relative flex flex-col items-center py-28 text-center sm:py-36">
          <p className="font-display text-7xl font-extrabold text-electric sm:text-8xl">404</p>
          <h1 className="mt-4 text-h2">This page doesn’t exist</h1>
          <p className="mt-4 max-w-md text-muted">
            The link may be old or mistyped. Head back to the homepage or see our work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/">Go to the homepage</ButtonLink>
            <ButtonLink to="/portfolio" variant="secondary">
              See our work
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
