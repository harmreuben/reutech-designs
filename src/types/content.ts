export type ServiceId = 'graphic-design' | 'photography'

export type ProjectCategory =
  | 'graphic-design'
  | 'branding'
  | 'social-media'
  | 'photography'
  | 'events-portraits'

export interface ImageAsset {
  /** Path under /public, e.g. '/portfolio/example.webp' */
  src: string
  /** Optional smaller version for cards and grids */
  thumb?: string
  alt: string
  width: number
  height: number
}

export interface Offering {
  title: string
  description: string
}

export interface Service {
  id: ServiceId
  title: string
  /** One sentence used on cards */
  summary: string
  /** Opening paragraph on the Services page */
  intro: string
  offerings: Offering[]
  deliverables: string[]
  clientNeeds: string[]
  /** Portfolio filter that shows related work */
  portfolioCategory: ProjectCategory
  image: ImageAsset | null
}

export interface Project {
  slug: string
  title: string
  /** Who the work is for. Sample concepts use fictional names. */
  client: string
  service: ServiceId
  categories: ProjectCategory[]
  summary: string
  description: string[]
  deliverables: string[]
  /** null until a real photo is added; such projects are hidden in production */
  image: ImageAsset | null
  /** Expected photo file for photography slots, e.g. '/portfolio/photos/portrait-session.jpg' */
  plannedPhoto?: string
  /** true = illustrative concept, not a client commission */
  isSample: boolean
  featured: boolean
}

export type PackagePrice =
  | { status: 'quote' }
  /** Only for owner-approved prices. Never invent figures. */
  | { status: 'from'; amountKES: number }

export interface PricingPackage {
  id: string
  service: ServiceId
  name: string
  bestFor: string
  /** What the quote is based on */
  quoteFactors: string[]
  price: PackagePrice
}

export interface Testimonial {
  quote: string
  name: string
  role?: string
  /** Confirm the client agreed to be quoted before adding */
  permissionConfirmed: true
}
