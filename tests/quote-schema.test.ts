import { describe, expect, it } from 'vitest'
import { quoteSchema, type QuoteInput } from '../src/lib/quote-schema'

const valid: QuoteInput = {
  fullName: 'Jane Wanjiku',
  email: 'jane@example.com',
  phone: '0712 345 678',
  service: 'graphic-design',
  packageId: '',
  projectTitle: 'Logo for my bakery',
  details: 'A new bakery needs a logo and simple signage before opening.',
  budget: '',
  deadline: '',
  contactMethod: 'WhatsApp',
  consent: true,
}

function errorsFor(input: Partial<QuoteInput>) {
  const result = quoteSchema.safeParse({ ...valid, ...input })
  return result.success ? [] : result.error.issues.map((i) => String(i.path[0]))
}

describe('quote form rules', () => {
  it('accepts a complete, valid request', () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true)
  })

  it('trims surrounding spaces', () => {
    const r = quoteSchema.parse({ ...valid, fullName: '  Jane Wanjiku  ', email: ' jane@example.com ' })
    expect(r.fullName).toBe('Jane Wanjiku')
    expect(r.email).toBe('jane@example.com')
  })

  it.each([
    ['fullName', { fullName: 'J' }],
    ['email', { email: 'not-an-email' }],
    ['email', { email: '' }],
    ['projectTitle', { projectTitle: 'ab' }],
    ['details', { details: 'too short' }],
    ['details', { details: 'x'.repeat(4001) }],
    ['consent', { consent: false as unknown as true }],
  ])('rejects an invalid %s', (field, input) => {
    expect(errorsFor(input)).toContain(field)
  })

  it('only allows the two promoted services', () => {
    expect(errorsFor({ service: 'virtual-assistance' as QuoteInput['service'] })).toContain('service')
  })

  it('requires a phone number for WhatsApp or phone contact', () => {
    expect(errorsFor({ phone: '', contactMethod: 'WhatsApp' })).toContain('phone')
    expect(errorsFor({ phone: '', contactMethod: 'Phone call' })).toContain('phone')
  })

  it('lets the phone number be empty when the visitor prefers email', () => {
    expect(errorsFor({ phone: '', contactMethod: 'Email' })).toEqual([])
  })

  it('rejects a malformed phone number', () => {
    expect(errorsFor({ phone: 'call me maybe' })).toContain('phone')
  })

  it('accepts Kenyan and international phone formats', () => {
    for (const phone of ['0712345678', '+254 712 345 678', '(020) 123-4567']) {
      expect(errorsFor({ phone })).toEqual([])
    }
  })

  it('rejects a deadline in the past and accepts a future one', () => {
    expect(errorsFor({ deadline: '2001-01-01' })).toContain('deadline')
    const nextYear = `${new Date().getFullYear() + 1}-06-15`
    expect(errorsFor({ deadline: nextYear })).toEqual([])
  })

  it('only accepts budget ranges from the list', () => {
    expect(errorsFor({ budget: 'KES 1,000,000' as QuoteInput['budget'] })).toContain('budget')
    expect(errorsFor({ budget: 'Not sure yet' })).toEqual([])
  })

  it('shows the phone problem together with other problems', () => {
    const fields = errorsFor({ fullName: '', phone: '' })
    expect(fields).toEqual(expect.arrayContaining(['fullName', 'phone']))
  })
})
