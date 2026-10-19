import { useSearchParams } from 'react-router'
import { PageMeta } from '../components/layout/PageMeta'
import { ProjectCard } from '../components/portfolio/ProjectCard'
import { CtaBand } from '../components/sections/CtaBand'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHeader } from '../components/ui/PageHeader'
import { visibleProjects } from '../data/portfolio'
import { categoryLabels, isPortfolioFilter, portfolioFilters } from '../data/projects'
import { startProject } from '../data/navigation'

export default function Portfolio() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const active = isPortfolioFilter(requested) ? requested : null
  const shown = active ? visibleProjects.filter((p) => p.categories.includes(active)) : visibleProjects

  const select = (category: string | null) => {
    const next = new URLSearchParams(params)
    if (category) next.set('category', category)
    else next.delete('category')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const filters: { value: string | null; label: string }[] = [
    { value: null, label: 'All' },
    ...portfolioFilters.map((f) => ({ value: f, label: categoryLabels[f] })),
  ]

  return (
    <>
      <PageMeta path="/portfolio" />
      <PageHeader
        title="Portfolio"
        intro="A selection of design and photography work. Pieces marked “Sample concept” were made for fictional brands to show our approach; client projects will be added as they are completed."
      />

      <section aria-labelledby="projects-heading" className="container-site py-16 sm:py-20">
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>

        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2.5">
          {filters.map((f) => {
            const isActive = f.value === active
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => select(f.value)}
                className={`btn btn-sm ${
                  isActive ? 'bg-fg text-ink' : 'border-[1.5px] border-line-strong text-muted hover:border-electric hover:text-fg'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-sm text-subtle" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          {active ? ` in ${categoryLabels[active]}` : ''}
        </p>

        {shown.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel="h3" />
            ))}
          </div>
        ) : (
          <div className="card mt-10 flex flex-col items-start gap-5 p-8 sm:p-12">
            <h3 className="text-h3">
              {active === 'photography' || active === 'events-portraits'
                ? 'Photography samples are on the way'
                : 'No projects here yet'}
            </h3>
            <p className="max-w-prose text-muted">
              We’re adding work to this category. In the meantime, get in touch and we’ll share
              examples that match what you have in mind.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={startProject.to}>{startProject.label}</ButtonLink>
              <button type="button" className="btn btn-secondary" onClick={() => select(null)}>
                Show all projects
              </button>
            </div>
          </div>
        )}
      </section>

      <CtaBand />
    </>
  )
}
