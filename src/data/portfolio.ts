import { projects, publishedProjects } from './projects'

/**
 * Projects shown in the browser. Photo slots without a photo appear only in
 * development, as placeholders. (Kept separate from projects.ts so that file
 * stays free of Vite-only code and can be read by the build and tests.)
 */
export const visibleProjects = import.meta.env.DEV ? projects : publishedProjects

export const featuredProjects = visibleProjects.filter((p) => p.featured).slice(0, 4)

export function getProject(slug: string | undefined) {
  return visibleProjects.find((p) => p.slug === slug)
}
