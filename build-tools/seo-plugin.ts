/**
 * Build step: writes one HTML file per public page, each with its own title,
 * description, canonical URL and social-preview tags, plus 404.html,
 * robots.txt and (once the domain is set) sitemap.xml.
 *
 * The pages are still rendered by React in the browser; this only fills in
 * the <head> so search engines and link previews (WhatsApp, Facebook,
 * LinkedIn, X) see the right information without running JavaScript.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { site } from '../src/config/site.ts'
import {
  absoluteUrl,
  headTags,
  notFoundRoute,
  organizationJsonLd,
  publicRoutes,
  type RouteMeta,
} from '../src/data/seo.ts'

const MARKER = /<!--\s*seo-head[\s\S]*?-->/

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function headHtml(meta: RouteMeta) {
  const lines = headTags(meta).map(({ tag, attrs, text }) => {
    const attrString = Object.entries({ ...attrs, 'data-prerender': '' })
      .map(([k, v]) => (v === '' ? k : `${k}="${escapeAttr(v)}"`))
      .join(' ')
    return tag === 'title' ? `<title ${attrString}>${escapeText(text ?? '')}</title>` : `<${tag} ${attrString} />`
  })
  if (meta.path === '/') {
    // Let the browser start downloading the hero artwork before the app runs
    lines.push(
      '<link rel="preload" as="image" href="/portfolio/nairobi-night-market-poster.webp" type="image/webp" fetchpriority="high" />',
    )
    // JSON-LD: '<' is escaped so the data can never close the script tag early
    const json = JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c')
    lines.push(`<script type="application/ld+json">${json}</script>`)
  }
  return lines.map((l) => `    ${l}`).join('\n')
}

function sitemapXml(routes: RouteMeta[]) {
  const urls = routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const loc = absoluteUrl(r.path)!
      return `  <url>\n    <loc>${escapeText(loc)}</loc>\n    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function seoPlugin(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()

  return {
    name: 'reutech-seo-prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const templatePath = join(outDir, 'index.html')
      const template = await readFile(templatePath, 'utf8')
      if (!MARKER.test(template)) {
        throw new Error('[seo] The <!-- seo-head --> marker is missing from index.html')
      }

      const write = async (relativePath: string, content: string) => {
        const file = join(outDir, relativePath)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, content, 'utf8')
      }

      const routes = publicRoutes()
      for (const route of routes) {
        const html = template.replace(MARKER, headHtml(route).trimStart())
        await write(route.path === '/' ? 'index.html' : join(route.path.slice(1), 'index.html'), html)
      }
      await write('404.html', template.replace(MARKER, headHtml(notFoundRoute).trimStart()))

      const sitemapUrl = absoluteUrl('/sitemap.xml')
      await write(
        'robots.txt',
        `User-agent: *\nAllow: /\n${sitemapUrl ? `\nSitemap: ${sitemapUrl}\n` : ''}`,
      )

      if (site.url) {
        await write('sitemap.xml', sitemapXml(routes))
      } else {
        console.warn(
          '\n[seo] site.url is empty in src/config/site.ts, so sitemap.xml, canonical URLs and social images were skipped.',
        )
      }

      console.info(`[seo] Wrote head tags for ${routes.length} pages and 404.html (${root}).`)
    },
  }
}
