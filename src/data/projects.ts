import type { Project, ProjectCategory } from '../types/content'

/**
 * Portfolio projects: the single source for the homepage, Services and
 * Portfolio pages and project detail pages.
 *
 * All current entries are SAMPLE CONCEPTS for fictional brands, made to show
 * the kind of work Reutech Designs does. They are labelled as samples on the
 * site. Replace them with real client work (with the client's permission)
 * by adding entries with `isSample: false`.
 *
 * Photography slots have `image: null` until a real photo is added. They are
 * hidden from the public site until then. To add one, save the photo at the
 * `plannedPhoto` path and fill in `image` (see README).
 */
export const projects: Project[] = [
  {
    slug: 'mvua-roasters-brand-identity',
    title: 'Brand identity for a coffee roaster',
    client: 'Mvua Roasters (fictional)',
    service: 'graphic-design',
    categories: ['branding', 'graphic-design'],
    summary: 'A warm, earthy identity for a small-batch coffee brand, from logo to packaging label.',
    description: [
      'Mvua means rain in Kiswahili. The concept builds the brand around that idea: a raindrop mark with a coffee-bean curve inside it, a confident serif wordmark and a palette taken from roasted coffee, red soil and new growth.',
      'The identity is designed to work on a small packaging label, a shop sign and a social media profile picture without losing detail.',
    ],
    deliverables: ['Logo and wordmark', 'Colour palette', 'Packaging label', 'Brand usage examples'],
    image: {
      src: '/portfolio/mvua-roasters.webp',
      thumb: '/portfolio/mvua-roasters-800.webp',
      alt: 'Brand board for Mvua Roasters: a brown circular raindrop logo, the Mvua wordmark, a coffee bag with a cream label and four colour swatches.',
      width: 1600,
      height: 1200,
    },
    isSample: true,
    featured: true,
  },
  {
    slug: 'nairobi-night-market-poster',
    title: 'Event poster for a night market',
    client: 'Nairobi Night Market (fictional)',
    service: 'graphic-design',
    categories: ['graphic-design'],
    summary: 'A bold, high-contrast poster that reads clearly from across a street.',
    description: [
      'Event posters have a few seconds to get noticed. This concept uses tall condensed type, a deep night-sky background and a band of bright triangles inspired by kitenge patterns to make the event name impossible to miss.',
      'The key details (what, when and how often) sit in a clear order so people can take them in at a glance.',
    ],
    deliverables: ['A2 poster', 'Social media version', 'Print-ready file'],
    image: {
      src: '/portfolio/nairobi-night-market.webp',
      thumb: '/portfolio/nairobi-night-market-800.webp',
      alt: 'Poster with orange and cream text reading Nairobi Night Market, with bands of orange, pink and yellow triangles at the top and bottom.',
      width: 1600,
      height: 1200,
    },
    isSample: true,
    featured: true,
  },
  {
    slug: 'kijani-fitness-social-media',
    title: 'Social media set for a fitness studio',
    client: 'Kijani Fitness (fictional)',
    service: 'graphic-design',
    categories: ['social-media', 'graphic-design'],
    summary: 'A set of posts with a consistent look, built from reusable layouts.',
    description: [
      'A gym’s social media needs to look consistent week after week. This concept sets up three post layouts (class announcements, motivation and challenges) that share colours, type and spacing, so new posts can be made quickly without the page looking messy.',
    ],
    deliverables: ['Three post templates', 'Square and story sizes', 'Simple layout guide'],
    image: {
      src: '/portfolio/kijani-fitness.webp',
      thumb: '/portfolio/kijani-fitness-800.webp',
      alt: 'Three square social media posts for Kijani Fitness in lime green, forest green and off-white, announcing a class, a motivational message and a step challenge.',
      width: 1600,
      height: 1200,
    },
    isSample: true,
    featured: true,
  },
  {
    slug: 'amani-advocates-business-cards',
    title: 'Business cards for a law firm',
    client: 'Amani Advocates (fictional)',
    service: 'graphic-design',
    categories: ['branding', 'graphic-design'],
    summary: 'Formal, understated business cards in navy and gold.',
    description: [
      'Professional services firms need to look established and trustworthy. This concept pairs a simple monogram with a classic serif and a restrained navy and gold palette, keeping the contact side clean and easy to read.',
    ],
    deliverables: ['Monogram', 'Two-sided business card', 'Print-ready file'],
    image: {
      src: '/portfolio/amani-advocates.webp',
      thumb: '/portfolio/amani-advocates-800.webp',
      alt: 'Two business cards: a navy front with a gold A monogram and the name Amani Advocates, and a white back with placeholder contact details.',
      width: 1600,
      height: 1200,
    },
    isSample: true,
    featured: false,
  },
  {
    slug: 'savanna-tech-meetup-event-graphics',
    title: 'Event graphics for a tech meetup',
    client: 'Savanna Tech Meetup (fictional)',
    service: 'graphic-design',
    categories: ['graphic-design', 'social-media'],
    summary: 'One event look adapted to a large banner, a social post and an email header.',
    description: [
      'Events need the same message in many sizes. This concept designs the main banner first, then adapts it to a square social post and an email header so every touchpoint feels like the same event.',
    ],
    deliverables: ['3 m × 1 m banner', 'Square social post', 'Email header'],
    image: {
      src: '/portfolio/savanna-tech-meetup.webp',
      thumb: '/portfolio/savanna-tech-meetup-800.webp',
      alt: 'A dark blue event banner for Savanna Tech Meetup with an orange sun behind an acacia tree, shown with a square social post and an email header version.',
      width: 1600,
      height: 1200,
    },
    isSample: true,
    featured: false,
  },

  // ---- Photography slots: add real photos to publish these ----
  {
    slug: 'portrait-session',
    title: 'Portrait session',
    client: 'Sample shoot',
    service: 'photography',
    categories: ['photography', 'events-portraits'],
    summary: 'Natural, well-lit portraits for professional profiles and personal use.',
    description: ['A relaxed portrait session focused on natural expression, flattering light and clean backgrounds.'],
    deliverables: ['Edited portraits', 'Web and print versions'],
    image: null,
    plannedPhoto: '/portfolio/photos/portrait-session.jpg',
    isSample: true,
    featured: true,
  },
  {
    slug: 'graduation-celebration',
    title: 'Graduation celebration',
    client: 'Sample shoot',
    service: 'photography',
    categories: ['photography', 'events-portraits'],
    summary: 'The day captured, from formal portraits to moments with family and friends.',
    description: ['Coverage of a graduation day, combining posed portraits with candid moments.'],
    deliverables: ['Edited photo set', 'Print-ready files'],
    image: null,
    plannedPhoto: '/portfolio/photos/graduation-celebration.jpg',
    isSample: true,
    featured: false,
  },
  {
    slug: 'product-photography',
    title: 'Product photography',
    client: 'Sample shoot',
    service: 'photography',
    categories: ['photography'],
    summary: 'Clean, accurate product images for an online shop and social media.',
    description: ['Products photographed on clean backgrounds and in simple styled scenes, with colours kept true to the real item.'],
    deliverables: ['White-background images', 'Styled images', 'Web-optimised files'],
    image: null,
    plannedPhoto: '/portfolio/photos/product-photography.jpg',
    isSample: true,
    featured: false,
  },
  {
    slug: 'corporate-headshots',
    title: 'Corporate team headshots',
    client: 'Sample shoot',
    service: 'photography',
    categories: ['photography'],
    summary: 'Consistent headshots so a whole team looks professional together.',
    description: ['Headshots taken with the same lighting and framing for every person, ready for a website and LinkedIn.'],
    deliverables: ['Edited headshots', 'Square and portrait crops'],
    image: null,
    plannedPhoto: '/portfolio/photos/corporate-headshots.jpg',
    isSample: true,
    featured: false,
  },
  {
    slug: 'event-coverage',
    title: 'Event coverage',
    client: 'Sample shoot',
    service: 'photography',
    categories: ['photography', 'events-portraits'],
    summary: 'Speakers, guests and atmosphere, captured as the event unfolds.',
    description: ['Full coverage of an event: arrivals, speakers, audience reactions and the details that set the mood.'],
    deliverables: ['Edited event gallery', 'Selection for social media'],
    image: null,
    plannedPhoto: '/portfolio/photos/event-coverage.jpg',
    isSample: true,
    featured: false,
  },
]

export const categoryLabels: Record<ProjectCategory, string> = {
  'graphic-design': 'Graphic Design',
  branding: 'Branding',
  'social-media': 'Social Media',
  photography: 'Photography',
  'events-portraits': 'Events & Portraits',
}

/** Filter order on the Portfolio page */
export const portfolioFilters: ProjectCategory[] = [
  'graphic-design',
  'branding',
  'social-media',
  'photography',
  'events-portraits',
]

/** Projects shown on the site. Photo slots without a photo appear only in development. */
export const visibleProjects = projects.filter((p) => p.image !== null || import.meta.env.DEV)

export const featuredProjects = visibleProjects.filter((p) => p.featured).slice(0, 4)

export function getProject(slug: string | undefined) {
  return visibleProjects.find((p) => p.slug === slug)
}

export function isPortfolioFilter(value: string | null): value is ProjectCategory {
  return value !== null && (portfolioFilters as string[]).includes(value)
}
