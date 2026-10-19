import { createElement } from 'react'
import { headTags, routeMeta, type RouteMeta } from '../../data/seo'

type PageMetaProps = { meta: RouteMeta } | { path: string }

/**
 * Per-page <title>, description, canonical and social tags, from src/data/seo.ts.
 * React 19 hoists these into <head>. The build also writes them into each
 * page's HTML file, so they work without JavaScript too.
 */
export function PageMeta(props: PageMetaProps) {
  const meta = 'meta' in props ? props.meta : routeMeta(props.path)
  if (!meta) throw new Error(`No SEO entry for ${'path' in props ? props.path : 'page'} in src/data/seo.ts`)

  return (
    <>
      {headTags(meta).map((t) =>
        createElement(t.tag, { key: `${t.tag}-${Object.values(t.attrs)[0] ?? 'title'}`, ...t.attrs }, t.text),
      )}
    </>
  )
}
