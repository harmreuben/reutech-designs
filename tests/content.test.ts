import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { hasEmail, site } from '../src/config/site'
import { whatsappMessages, whatsappUrl } from '../src/lib/contact'
import { primaryNav } from '../src/data/navigation'
import { pricingPackages } from '../src/data/pricing'
import { projects, publishedProjects } from '../src/data/projects'
import { services } from '../src/data/services'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(tsx?|css|html)$/.test(name) ? [path] : []
  })
}

describe('navigation', () => {
  it('keeps the agreed order', () => {
    expect(primaryNav.map((n) => n.label)).toEqual(['Home', 'About Us', 'Services', 'Portfolio', 'Pricing', 'Contact'])
  })
})

describe('business scope', () => {
  it('promotes only Graphic Design and Photography', () => {
    expect(services.map((s) => s.id)).toEqual(['graphic-design', 'photography'])
  })

  it('never mentions virtual assistance or data entry on the site', () => {
    const banned = /virtual assist|data entry|administrative support|\bVA\b/i
    for (const file of [...sourceFiles('src'), 'index.html']) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(banned)
    }
  })
})

describe('portfolio data', () => {
  it('has unique project slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has image files for every published project', () => {
    for (const p of publishedProjects) {
      expect(existsSync(join('public', p.image!.src)), p.image!.src).toBe(true)
      if (p.image!.thumb) expect(existsSync(join('public', p.image!.thumb)), p.image!.thumb).toBe(true)
      expect(p.image!.alt.length, `${p.slug} alt text`).toBeGreaterThan(20)
    }
  })

  it('labels sample concepts with fictional client names', () => {
    for (const p of projects.filter((x) => x.isSample && x.image)) {
      expect(p.client, p.slug).toMatch(/fictional/i)
    }
  })
})

describe('pricing integrity', () => {
  it('publishes no prices until the owner approves them', () => {
    // When real prices are approved, update this test to list them explicitly.
    expect(pricingPackages.every((p) => p.price.status === 'quote')).toBe(true)
  })
})

describe('contact details', () => {
  it('builds a correctly encoded WhatsApp link', () => {
    const url = new URL(whatsappUrl(whatsappMessages.quote))
    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe(`/${site.whatsapp.number}`)
    expect(url.searchParams.get('text')).toBe(whatsappMessages.quote)
    expect(site.whatsapp.number).toMatch(/^254\d{9}$/)
  })

  it('keeps the email hidden until the mailbox is live', () => {
    expect(hasEmail).toBe(site.emailLive)
  })
})
