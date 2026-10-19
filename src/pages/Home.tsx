import { Eye, Layers, MessagesSquare, Users } from 'lucide-react'
import { PageMeta } from '../components/layout/PageMeta'
import { ProjectCard } from '../components/portfolio/ProjectCard'
import { CtaBand } from '../components/sections/CtaBand'
import { ProcessSteps } from '../components/sections/ProcessSteps'
import { Testimonials } from '../components/sections/Testimonials'
import { ServiceCard } from '../components/services/ServiceCard'
import { ButtonLink } from '../components/ui/ButtonLink'
import { RingArc } from '../components/ui/RingArc'
import { SectionHeading } from '../components/ui/SectionHeading'
import { startProject } from '../data/navigation'
import { featuredProjects } from '../data/projects'
import { services } from '../data/services'

const reasons = [
  {
    icon: Layers,
    title: 'Design and photography together',
    text: 'Your photos and graphics are planned side by side, so posters, posts and websites share one look.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear communication',
    text: 'We agree goals, deliverables and timelines before starting, and keep you updated as the work progresses.',
  },
  {
    icon: Eye,
    title: 'Attention to detail',
    text: 'Spacing, colour, sizing and file formats are checked before anything is handed over.',
  },
  {
    icon: Users,
    title: 'Made for your audience',
    text: 'Every piece is shaped around the people you want to reach, not copied from a template.',
  },
]

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-site grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="relative z-10">
          <h1 id="hero-heading" className="text-[clamp(2.6rem,1.2rem+4.4vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.025em]">
            Your Vision.
            <br />
            Our Creativity.
          </h1>
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

        {/* Composition: the monogram ring framing two sample pieces */}
        <figure className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <div className="relative aspect-square">
            <RingArc className="absolute inset-0 size-full" />
            <img
              src="/portfolio/nairobi-night-market-poster.webp"
              alt="Sample concept: an event poster for a fictional Nairobi night market."
              width={880}
              height={1180}
              fetchPriority="high"
              className="absolute top-[9%] left-[26%] w-[50%] rotate-3 rounded-lg shadow-2xl shadow-black/60"
            />
            <img
              src="/portfolio/kijani-fitness-800.webp"
              alt="Sample concept: social media posts for a fictional fitness studio."
              width={800}
              height={600}
              className="absolute bottom-[10%] left-[4%] w-[52%] -rotate-3 rounded-lg border border-line shadow-2xl shadow-black/60"
            />
          </div>
          <figcaption className="mt-2 text-center text-sm text-subtle">
            Sample concepts for fictional brands
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <PageMeta />
      <Hero />

      {/* Services */}
      <section aria-labelledby="services-heading" className="border-t border-line bg-ink-2/40">
        <div className="container-site py-20 sm:py-28">
          <SectionHeading
            id="services-heading"
            title="What we do"
            intro="Two services that work well alone and even better together."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section aria-labelledby="work-heading" className="container-site py-20 sm:py-28">
        <SectionHeading
          id="work-heading"
          title="Featured work"
          intro="Sample concepts that show our approach. Client projects will be added as they are completed."
          action={
            <ButtonLink to="/portfolio" variant="secondary">
              View the full portfolio
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section aria-labelledby="why-heading" className="border-y border-line bg-ink-2/40">
        <div className="container-site py-20 sm:py-28">
          <SectionHeading id="why-heading" title="Why work with Reutech Designs" />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-3 text-electric">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="container-site py-20 sm:py-28">
        <SectionHeading
          id="process-heading"
          title="How a project works"
          intro="A simple, predictable process, so you always know what happens next."
        />
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </section>

      {/* About preview */}
      <section aria-labelledby="about-heading" className="border-t border-line">
        <div className="container-site grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <h2 id="about-heading" className="text-h2">
            A Nairobi creative studio for design and photography
          </h2>
          <div>
            <p className="text-lead text-muted">
              Reutech Designs helps individuals, businesses and organisations present themselves well.
              We bring graphic design and photography together so your brand looks and feels the same
              everywhere people meet it, online and in print.
            </p>
            <div className="mt-8">
              <ButtonLink to="/about" variant="secondary">
                Learn more about us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  )
}
