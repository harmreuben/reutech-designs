/**
 * Central business information for Reutech Designs.
 *
 * Every public contact detail on the site is read from here, so a change
 * made in this file updates the header, footer, contact page and SEO data.
 *
 * Rules:
 * - Only verified, owner-supplied details go in this file.
 * - Leave a value empty ('' or []) when it is not confirmed. Components hide
 *   anything that is empty, so nothing fake is ever shown to visitors.
 */

export interface SocialLink {
  label: 'Instagram' | 'Facebook' | 'TikTok' | 'LinkedIn' | 'X' | 'Behance' | 'YouTube'
  url: string
}

export const site = {
  name: 'Reutech Designs',
  shortName: 'Reutech',
  tagline: 'Where Creativity Meets Excellence.',
  description:
    'Graphic design and photography for individuals, businesses and brands, from logos and marketing materials to events, portraits and products.',

  /**
   * TODO(owner): production domain, e.g. 'https://reutechdesigns.com'.
   * Needed for canonical URLs, the sitemap and social-sharing previews.
   */
  url: '' as string,

  /**
   * Supplied by the owner on 19 Oct 2026. The domain is not purchased yet,
   * so this mailbox cannot receive mail. It stays hidden while `emailLive`
   * is false. TODO(owner): set to true once the domain and mailbox work.
   */
  email: 'hello@reutechdesigns.com',
  emailLive: false as boolean,

  phone: {
    /** As written locally. */
    display: '0701 209 444',
    /** E.164 format for tel: links and structured data. */
    e164: '+254701209444',
  },

  whatsapp: {
    /**
     * Digits only, country code first, no '+' (WhatsApp click-to-chat format).
     * Owner confirmed on 19 Oct 2026 that this number is active on WhatsApp.
     * Set `confirmed` to false to hide every WhatsApp button.
     */
    number: '254701209444',
    confirmed: true,
  },

  location: {
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'KE',
  },

  /** TODO(owner): add verified social profiles. Empty = hidden. */
  social: [] as SocialLink[],
} as const

export const hasWhatsApp = site.whatsapp.confirmed && site.whatsapp.number.length > 0
export const hasEmail = site.emailLive && site.email.length > 0
