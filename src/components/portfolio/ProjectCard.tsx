import { Link } from 'react-router'
import { categoryLabels } from '../../data/projects'
import type { Project } from '../../types/content'
import { PhotoPlaceholder } from './PhotoPlaceholder'
import { SampleBadge } from './SampleBadge'

interface ProjectCardProps {
  project: Project
  headingLevel?: 'h2' | 'h3' | 'h4'
}

export function ProjectCard({ project, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const { image } = project
  return (
    <article className="group relative">
      <div className="relative overflow-hidden rounded-card border border-line">
        {image ? (
          <img
            src={image.thumb ?? image.src}
            alt={image.alt}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <PhotoPlaceholder label={project.title} plannedPhoto={project.plannedPhoto} />
        )}
        {project.isSample && <SampleBadge className="absolute top-4 left-4" />}
      </div>
      <p className="mt-5 text-sm text-subtle">
        {project.categories.map((c) => categoryLabels[c]).join(', ')}
      </p>
      <Heading className="mt-1.5 text-xl leading-snug">
        {/* The whole card is clickable through this link's expanded hit area */}
        <Link
          to={`/portfolio/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-cyan"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 text-[0.975rem] text-muted">{project.summary}</p>
    </article>
  )
}
