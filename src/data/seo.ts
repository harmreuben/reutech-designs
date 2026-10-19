/**
 * Page titles, descriptions and search-engine data for every public URL.
 *
 * Used in two places:
 *  - in the browser, by <PageMeta>, when someone navigates around the site
 *  - at build time, by the prerender step in vite.config.ts, which writes a
 *    separate HTML file per page so search engines and link previews
 *    (WhatsApp, Facebook, LinkedIn) see the right title and description
 *    without running JavaScript.
 *
 * Keep this file free of browser- or Vite-only code.
 */
import { publishedProjects } from './projects.ts'
import { site } from '../config/site.ts'
import type { Project } from '../types/content.ts'

export interface RouteMeta {
  path: string
  /** Page title without the brand; omit for the homepage */
  title?: string
  description: string
  noindex?: boolean
  /** Sitemap priority hint, 0.0–1.0 */
  priority?: number
}

export const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    description:
      'Reutech Designs creates graphic design and photography for individuals, businesses and brands in Nairobi, Kenya: logos, branding, posters, social media graphics, events, portraits and products.',
    priority: 1,
  },
  {
    path: '/about',
    title: 'About Us',
    description:
      'Reutech Designs is a Nairobi creative studio for graphic design and photography. Learn how we work and what we value.',
    priority: 0.7,
  },
  {
    path: '/services',
    title: 'Services',
    description:
      'Graphic design and photography in Nairobi: logos, brand identity, posters, social media graphics, events, portraits, corporate and product photography.',
    priority: 0.9,
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    description: 'Graphic design, branding, social media and photography work by Reutech Designs.',
    priority: 0.8,
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description:
      'Graphic design and photography packages from Reutech Designs. Every project is quoted in Kenyan shillings (KES) based on its scope.',
    priority: 0.8,
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Request a quote or ask about a graphic design or photography project with Reutech Designs in Nairobi, Kenya.',
    priority: 0.9,
  },
  {
    path: '/privacy',
    title: 'Privacy notice',
    description: 'How Reutech Designs collects, uses and protects the details you send through this website.',
    priority: 0.2,
  },
]

export function projectRoute(project: Project): RouteMeta {
  return {
    path: `/portfolio/${project.slug}`,
    title: project.title,
    description: project.isSample
      ? `Sample concept by Reutech Designs: ${project.summary}`
      : project.summary,
    priority: 0.6,
  }
}

export const notFoundRoute: RouteMeta = {
  path: '/404',
  title: 'Page not found',
  description: 'This page does not exist. Visit the Reutech Designs homepage or portfolio.',
  noindex: true,
}

/** Every public, indexable page, in sitemap order. */
export function publicRoutes(): RouteMeta[] {
  return [...staticRoutes, ...publishedProjects.map(projectRoute)]
}

export function routeMeta(path: string): RouteMeta | undefined {
  return staticRoutes.find((r) => r.path === path)
}

export function fullTitle(title?: string) {
  return title ? `${title} | ${site.name}` : `${site.name} | Graphic Design and Photography in Nairobi`
}

/** Absolute URL, or null while the production domain isn't set. */
export function absoluteUrl(path: string) {
  if (!site.url) return null
  const base = site.url.replace(/\/+$/, '')
  return path === '/' ? `${base}/` : `${base}${path}`
}

export const socialImage = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Reutech Designs logo: an RD monogram in a blue and white ring, with the tagline Where Creativity Meets Excellence.',
}

/** schema.org data describing the business. Only confirmed facts. */
export function organizationJsonLd() {
  const url = absoluteUrl('/')
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    telephone: site.phone.e164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: ['Graphic design', 'Brand identity', 'Photography'],
  }
  if (url) {
    data.url = url
    data.logo = absoluteUrl('/icon-512.png')
    data.image = absoluteUrl(socialImage.path)
  }
  if (site.emailLive) data.email = site.email
  if (site.social.length > 0) data.sameAs = site.social.map((s) => s.url)
  return data
}

export interface HeadTag {
  tag: 'title' | 'meta' | 'link'
  attrs: Record<string, string>
  /** Text content, for <title> */
  text?: string
}

/**
 * The <head> tags for one page. Rendered as JSX by <PageMeta> in the
 * browser and as HTML by the build-time prerender, so both always match.
 */
export function headTags(meta: RouteMeta): HeadTag[] {
  const title = fullTitle(meta.title)
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(socialImage.path)

  const tags: HeadTag[] = [
    { tag: 'title', attrs: {}, text: title },
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.path === '/' ? 'website' : 'article' } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_KE' } },
    { tag: 'meta', attrs: { property: 'og:title', content: title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
  ]
  if (meta.noindex) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
  if (url && !meta.noindex) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: url } })
  }
  if (image) {
    tags.push(
      { tag: 'meta', attrs: { property: 'og:image', content: image } },
      { tag: 'meta', attrs: { property: 'og:image:width', content: String(socialImage.width) } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: String(socialImage.height) } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: socialImage.alt } },
    )
  }
  return tags
}
