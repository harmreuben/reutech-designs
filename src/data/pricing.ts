import type { PricingPackage } from '../types/content'

/**
 * Proposed package categories. None has an approved price yet, so every
 * package shows "Price on request".
 *
 * TODO(owner): when a price is approved, change `price` to
 *   { status: 'from', amountKES: 15000 }   // example shape only, not a real price
 * The card then shows "From KES 15,000".
 */
export const pricingPackages: PricingPackage[] = [
  {
    id: 'single-design',
    service: 'graphic-design',
    name: 'Single Design',
    bestFor: 'One poster, flyer, social media post, advert or business card.',
    quoteFactors: ['The type and size of the design', 'How many versions or sizes you need', 'Whether it is for print, screen or both'],
    price: { status: 'quote' },
  },
  {
    id: 'branding-package',
    service: 'graphic-design',
    name: 'Branding Package',
    bestFor: 'New businesses and brands that need a logo and a consistent look.',
    quoteFactors: ['Logo only or a full identity', 'Which branded items you need', 'Number of concepts and revision rounds'],
    price: { status: 'quote' },
  },
  {
    id: 'social-media-package',
    service: 'graphic-design',
    name: 'Social Media Package',
    bestFor: 'Businesses that post regularly and want a professional, consistent feed.',
    quoteFactors: ['Number of posts per month', 'Platforms and formats', 'One-off set or ongoing monthly work'],
    price: { status: 'quote' },
  },
  {
    id: 'portrait-session',
    service: 'photography',
    name: 'Portrait Session',
    bestFor: 'Individuals, families and professionals who need quality portraits.',
    quoteFactors: ['Length of the session', 'Number of people', 'Location', 'Number of edited images'],
    price: { status: 'quote' },
  },
  {
    id: 'event-coverage',
    service: 'photography',
    name: 'Event Coverage',
    bestFor: 'Launches, conferences, graduations and celebrations.',
    quoteFactors: ['Hours of coverage', 'Event location', 'Number of edited images', 'How soon you need the photos'],
    price: { status: 'quote' },
  },
  {
    id: 'product-photography',
    service: 'photography',
    name: 'Product Photography',
    bestFor: 'Online shops, restaurants and brands that sell physical products.',
    quoteFactors: ['Number of products', 'Plain background or styled scenes', 'Number of angles per product'],
    price: { status: 'quote' },
  },
]

export function formatKES(amount: number) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount)
}
