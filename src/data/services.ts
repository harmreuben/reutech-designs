import type { Service } from '../types/content'

/**
 * Service content. Offerings come from the agreed business scope.
 * TODO(owner): review the deliverables lists and adjust to what you provide.
 */
export const services: Service[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    summary:
      'Logos, brand identities and marketing materials that keep your business looking consistent everywhere it appears.',
    intro:
      'Good design makes a business easier to recognise and easier to trust. We create logos, brand identities and everyday marketing materials, from posters to social media posts, so everything you put out looks like it belongs together.',
    offerings: [
      { title: 'Logo design', description: 'A distinctive mark that works at every size, from a profile picture to a signboard.' },
      { title: 'Brand identity', description: 'Colours, type and simple rules that keep your look consistent.' },
      { title: 'Posters and flyers', description: 'Clear, eye-catching layouts for events, offers and announcements.' },
      { title: 'Banners and promotional materials', description: 'Roll-ups, banners and display pieces prepared for printing.' },
      { title: 'Social media graphics', description: 'Posts, stories and covers sized correctly for each platform.' },
      { title: 'Digital advertisements', description: 'Ad designs for social media and websites, in the formats each needs.' },
      { title: 'Business cards', description: 'Cards that carry your brand and your details neatly.' },
      { title: 'Marketing and branding materials', description: 'Letterheads, menus, brochures, labels and other branded pieces.' },
    ],
    deliverables: [
      'Files prepared for printing and for screens',
      'Logo versions for light and dark backgrounds',
      'Social media formats sized for each platform',
      'Editable source files, where agreed in the quote',
    ],
    clientNeeds: [
      'Starting a business and need a logo and a look',
      'Your materials don’t match each other any more',
      'Promoting an event, product or special offer',
      'Keeping social media pages looking professional',
    ],
    portfolioCategory: 'graphic-design',
    image: {
      src: '/portfolio/mvua-roasters.webp',
      thumb: '/portfolio/mvua-roasters-800.webp',
      alt: 'Sample brand identity for a fictional coffee roaster, showing a raindrop logo, coffee bag label and colour palette.',
      width: 1600,
      height: 1200,
    },
  },
  {
    id: 'photography',
    title: 'Photography',
    summary:
      'Events, portraits, products and corporate photography, captured with care and edited to a consistent, professional finish.',
    intro:
      'Photographs are often the first thing people notice about you or your business. We photograph events, people and products, then edit every image so the final set looks consistent and is ready for print, websites and social media.',
    offerings: [
      { title: 'Event photography', description: 'Launches, conferences, meetings and community events.' },
      { title: 'Portrait photography', description: 'Individual, family and professional portraits.' },
      { title: 'Corporate photography', description: 'Team headshots, office and workplace photography.' },
      { title: 'Product photography', description: 'Clean, accurate images for online shops, menus and catalogues.' },
      { title: 'Graduation and celebrations', description: 'Graduations, birthdays, anniversaries and other milestones.' },
      { title: 'Business branding photography', description: 'Images of you, your space and your work to tell your brand’s story.' },
      { title: 'Social media content', description: 'Batches of photos planned for your posting calendar.' },
    ],
    deliverables: [
      'Edited, high-resolution images',
      'Web-optimised copies for social media and websites',
      'Digital delivery of the final files',
    ],
    clientNeeds: [
      'Covering a launch, conference or celebration',
      'Professional portraits for profiles and CVs',
      'Product images for an online shop or menu',
      'A steady supply of photos for social media',
    ],
    portfolioCategory: 'photography',
    image: null,
  },
]

export function getService(id: Service['id']) {
  const service = services.find((s) => s.id === id)
  if (!service) throw new Error(`Unknown service: ${id}`)
  return service
}
