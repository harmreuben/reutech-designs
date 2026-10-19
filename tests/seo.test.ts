import { describe, expect, it } from 'vitest'
import { primaryNav } from '../src/data/navigation'
import { absoluteUrl, headTags, organizationJsonLd, publicRoutes, staticRoutes } from '../src/data/seo'
import { site } from '../src/config/site'

describe('SEO data', () => {
  const routes = publicRoutes()

  it('has an entry for every navigation link', () => {
    for (const item of primaryNav) {
      expect(staticRoutes.map((r) => r.path)).toContain(item.to)
    }
  })

  it('gives every page a unique title and description of a useful length', () => {
    const titles = routes.map((r) => r.title ?? 'home')
    const descriptions = routes.map((r) => r.description)
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
    for (const d of descriptions) {
      expect(d.length, d).toBeGreaterThanOrEqual(50)
      expect(d.length, d).toBeLessThanOrEqual(220)
    }
  })

  it('only emits canonical and image URLs when the domain is set', () => {
    const tags = headTags(staticRoutes[0])
    const hasCanonical = tags.some((t) => t.attrs.rel === 'canonical')
    expect(hasCanonical).toBe(Boolean(site.url))
    expect(absoluteUrl('/about')).toBe(site.url ? `${site.url.replace(/\/$/, '')}/about` : null)
  })

  it('describes the business with confirmed facts only', () => {
    const data = organizationJsonLd()
    expect(data.name).toBe('Reutech Designs')
    expect(data).not.toHaveProperty('aggregateRating')
    expect(data).not.toHaveProperty('review')
    expect(data).not.toHaveProperty('areaServed')
    expect(data).not.toHaveProperty('priceRange')
    if (!site.emailLive) expect(data).not.toHaveProperty('email')
  })
})
