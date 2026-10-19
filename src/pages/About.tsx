import { Camera, PenTool } from 'lucide-react'
import { Logo } from '../components/brand/Logo'
import { PageMeta } from '../components/layout/PageMeta'
import { CtaBand } from '../components/sections/CtaBand'
import { ProcessSteps } from '../components/sections/ProcessSteps'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'

const values = [
  {
    title: 'Creativity with a purpose',
    text: 'Ideas are judged by whether they help you reach people, not just by how they look.',
  },
  {
    title: 'Communication',
    text: 'Clear briefs, honest timelines and straightforward answers, from first message to final files.',
  },
  {
    title: 'Attention to detail',
    text: 'The small things, like alignment, colour accuracy and the right file sizes, are what make work look professional.',
  },
]

export default function About() {
  return (
    <>
      <PageMeta path="/about" />
      <PageHeader
        title="About Reutech Designs"
        intro="A Nairobi-based creative studio for graphic design and photography, built on clear communication and careful work."
      />

      {/* Who we are */}
      <section aria-labelledby="who-heading" className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h2 id="who-heading" className="text-h2">
            Who we are
          </h2>
          <div className="mt-6 max-w-prose space-y-5 text-lead text-muted">
            <p>
              Reutech Designs is a creative business offering graphic design and photography to
              individuals, entrepreneurs, small businesses and organisations.
            </p>
            <p>
              We believe that how you present yourself shapes how people see you. A clear logo, a
              well-designed poster or a strong set of photographs can make a new business look
              established and help an existing one look its best.
            </p>
          </div>
        </div>
        <div className="card flex justify-center px-6 py-14">
          <Logo variant="full" />
        </div>
      </section>

      {/* Purpose */}
      <section aria-labelledby="purpose-heading" className="border-y border-line bg-ink-2/40">
        <div className="container-site py-20 sm:py-28">
          <h2 id="purpose-heading" className="text-h2">
            Our purpose
          </h2>
          <p className="mt-6 max-w-3xl font-display text-2xl leading-snug font-semibold text-fg sm:text-3xl">
            To help people and businesses present themselves with confidence, through design and
            photography that are creative, consistent and made to last.
          </p>
          <p className="mt-6 max-w-prose text-muted">
            Our vision is to be a creative partner our clients come back to, because the work is
            good and working with us is easy.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="container-site py-20 sm:py-28">
        <SectionHeading id="approach-heading" title="Our approach" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="card p-8 sm:p-10">
            <PenTool className="size-7 text-electric" aria-hidden="true" />
            <h3 className="mt-5 text-h3">Graphic design</h3>
            <p className="mt-3 text-muted">
              We start with what your audience needs to understand, then design around it. Every
              logo, poster or post is built to be clear first and memorable second, and prepared
              correctly for where it will be used, whether that’s a printer, a website or a phone
              screen.
            </p>
          </article>
          <article className="card p-8 sm:p-10">
            <Camera className="size-7 text-electric" aria-hidden="true" />
            <h3 className="mt-5 text-h3">Photography</h3>
            <p className="mt-3 text-muted">
              We plan each shoot around how the photos will be used. On the day, we focus on good
              light, natural expressions and the details that matter. Afterwards, every image is
              edited so the whole set looks consistent.
            </p>
          </article>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="border-y border-line bg-ink-2/40">
        <div className="container-site py-20 sm:py-28">
          <SectionHeading id="values-heading" title="What matters to us" />
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="border-t-2 border-electric pt-6">
                <h3 className="text-h3">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="container-site py-20 sm:py-28">
        <SectionHeading
          id="process-heading"
          title="How we work"
          intro="Every project, large or small, follows the same five steps."
        />
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </section>

      <CtaBand
        title="Ready to start your project?"
        text="Tell us about your idea, and we’ll guide you through the next steps."
      />
    </>
  )
}
