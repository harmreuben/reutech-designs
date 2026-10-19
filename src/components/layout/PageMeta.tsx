import { site } from '../../config/site'

interface PageMetaProps {
  /** Page-specific title. The brand name is appended automatically. */
  title?: string
  description?: string
}

/**
 * Per-page <title> and description. React 19 hoists these tags into
 * <head>. Canonical URLs and social tags are added in the SEO stage
 * once the production domain is confirmed.
 */
export function PageMeta({ title, description = site.description }: PageMetaProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Graphic Design and Photography`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </>
  )
}
