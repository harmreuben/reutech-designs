/**
 * Quote request rules, shared by the browser form and the server endpoint
 * so both validate exactly the same way.
 */
import { z } from 'zod'

export const serviceOptions = [
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'photography', label: 'Photography' },
] as const

/** Ranges the visitor chooses from. These are not Reutech prices. */
export const budgetOptions = [
  'Under KES 10,000',
  'KES 10,000 – 25,000',
  'KES 25,000 – 50,000',
  'KES 50,000 – 100,000',
  'Over KES 100,000',
  'Not sure yet',
] as const

export const contactMethodOptions = ['WhatsApp', 'Phone call', 'Email'] as const

export const limits = {
  name: 100,
  email: 254,
  phone: 20,
  title: 120,
  details: 4000,
} as const

const phonePattern = /^\+?[0-9\s()-]{7,20}$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

/** Accepts today or later. Allows one day of slack for time-zone differences. */
function isTodayOrLater(value: string) {
  if (!datePattern.test(value)) return false
  const chosen = Date.parse(`${value}T23:59:59Z`)
  if (Number.isNaN(chosen)) return false
  return chosen >= Date.now() - 24 * 60 * 60 * 1000
}

export const quoteSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Enter your full name')
      .max(limits.name, `Use ${limits.name} characters or fewer`),
    email: z
      .string()
      .trim()
      .min(1, 'Enter your email address')
      .max(limits.email, 'This email address is too long')
      .pipe(z.email('Enter an email address like name@example.com')),
    phone: z
      .string()
      .trim()
      .max(limits.phone, 'Enter a phone number like 0712 345 678')
      .refine((v) => v === '' || phonePattern.test(v), 'Enter a phone number like 0712 345 678'),
    service: z.enum(['graphic-design', 'photography'], { error: 'Choose a service' }),
    packageId: z.string().trim().max(60),
    projectTitle: z
      .string()
      .trim()
      .min(3, 'Give your project a short title')
      .max(limits.title, `Use ${limits.title} characters or fewer`),
    details: z
      .string()
      .trim()
      .min(20, 'Tell us a little more about the project (at least 20 characters)')
      .max(limits.details, `Keep this under ${limits.details.toLocaleString('en')} characters`),
    budget: z.union([z.enum(budgetOptions), z.literal('')]),
    deadline: z.string().refine((v) => v === '' || isTodayOrLater(v), 'Choose today or a later date'),
    contactMethod: z.enum(contactMethodOptions, { error: 'Choose how we should contact you' }),
    consent: z.literal(true, { error: 'Agree to the privacy notice so we can reply to you' }),
  })
  .refine((d) => d.contactMethod === 'Email' || d.phone !== '', {
    path: ['phone'],
    message: 'Add a phone number so we can reach you by WhatsApp or phone',
    // Run this check even while other fields still have errors,
    // so all problems are shown at once.
    when(payload) {
      const v = payload.value as { contactMethod?: unknown; phone?: unknown } | undefined
      return typeof v?.contactMethod === 'string' && typeof v?.phone === 'string'
    },
  })

export type QuoteInput = z.input<typeof quoteSchema>
export type QuoteRequest = z.output<typeof quoteSchema>

/** Extra fields sent with every submission for spam protection. */
export interface QuoteMeta {
  /** Honeypot: hidden from people, so it must stay empty */
  website: string
  /** When the form was first shown (ms since epoch) */
  startedAt: number
}

export type QuoteResponse =
  | { ok: true; delivery: 'email' | 'dev-log'; reference: string }
  | {
      ok: false
      error: 'validation' | 'rate-limited' | 'not-configured' | 'delivery-failed' | 'bad-request' | 'too-fast'
      message: string
      fieldErrors?: Partial<Record<keyof QuoteInput, string>>
    }

export function serviceLabel(value: string) {
  return serviceOptions.find((s) => s.value === value)?.label ?? value
}
