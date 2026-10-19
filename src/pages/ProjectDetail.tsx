import { ArrowLeft, Check } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { PageMeta } from '../components/layout/PageMeta'
import { PhotoPlaceholder } from '../components/portfolio/PhotoPlaceholder'
import { ProjectCard } from '../components/portfolio/ProjectCard'
import { CtaBand } from '../components/sections/CtaBand'
import { ButtonLink } from '../components/ui/ButtonLink'
import { getProject, visibleProjects } from '../data/portfolio'
import { categoryLabels } from '../data/projects'
import { getService } from '../data/services'
import NotFound from './NotFound'
import { projectRoute } from '../data/seo'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const service = getService(project.service)
  const more = visibleProjects.filter((p) => p.slug !== project.slug && p.service === project.service).slice(0, 3)

  return (
    <>
      <PageMeta meta={projectRoute(project)} />

      <article aria-labelledby="project-heading">
        <header className="container-site pt-10 sm:pt-14">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-subtle">
            {project.isSample && (
              <span className="rounded-full border border-line-strong px-3 py-1 font-semibold text-fg">
                Sample concept
              </span>
            )}
            <span>{project.categories.map((c) => categoryLabels[c]).join(', ')}</span>
          </div>
          <h1 id="project-heading" className="mt-4 max-w-4xl text-h1">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">{project.summary}</p>
        </header>

        <div className="container-site mt-12">
          <div className="overflow-hidden rounded-card border border-line">
            {project.image ? (
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                className="w-full"
              />
            ) : (
              <PhotoPlaceholder label={project.title} plannedPhoto={project.plannedPhoto} />
            )}
          </div>
        </div>

        <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose space-y-5 text-lead text-muted">
            {project.isSample && (
              <p className="rounded-control border border-line bg-ink-2 p-5 text-base">
                This is a sample concept created by Reutech Designs to show our approach. {project.client.replace(' (fictional)', '')}{' '}
                is a fictional brand, not a client.
              </p>
            )}
            {project.description.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <aside className="card h-fit p-7">
            <h2 className="text-h3">What was made</h2>
            <ul className="mt-4 space-y-2.5">
              {project.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted">
                  <Check className="mt-1 size-4 shrink-0 text-electric" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-6 text-sm text-muted">
              Service:{' '}
              <Link to={`/services#${service.id}`} className="text-link">
                {service.title}
              </Link>
            </p>
            <div className="mt-6">
              <ButtonLink to={`/contact?service=${service.id}#quote`} className="w-full">
                Start a similar project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="border-t border-line">
          <div className="container-site py-20">
            <h2 id="more-heading" className="text-h2">
              More {service.title.toLowerCase()} work
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
