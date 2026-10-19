import { PageMeta } from '../components/layout/PageMeta'
import { ButtonLink } from '../components/ui/ButtonLink'
import { DevNote } from '../components/ui/DevNote'
import { RingArc } from '../components/ui/RingArc'
import { startProject } from '../data/navigation'

export default function Home() {
  return (
    <>
      <PageMeta />
      <section className="relative overflow-hidden">
        <RingArc className="absolute top-1/2 -right-40 hidden w-[44rem] -translate-y-1/2 sm:block lg:-right-16 lg:w-[52rem]" />
        <div className="container-site relative py-20 sm:py-28 lg:py-36">
          <h1 className="max-w-4xl text-display font-extrabold">Your Vision. Our Creativity.</h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Creative graphic design and photography that help your brand stand out, tell its story,
            and make a lasting impression.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to={startProject.to}>{startProject.label}</ButtonLink>
            <ButtonLink to="/portfolio" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </div>
        </div>
      </section>
      <DevNote>
        Stage 2 preview. The full homepage (services, featured work, process, about preview and
        final call to action) is built in Stage 3.
      </DevNote>
    </>
  )
}
