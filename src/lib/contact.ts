import { site } from '../config/site'

/** Prefilled WhatsApp messages. Keep them short and easy to edit before sending. */
export const whatsappMessages = {
  general: `Hello ${site.name}, I'd like to ask about your services.`,
  quote: `Hello ${site.name}, I'd like a quote for a project.`,
  graphicDesign: `Hello ${site.name}, I'd like a quote for a graphic design project.`,
  photography: `Hello ${site.name}, I'd like to book or ask about a photography session.`,
} as const

/** WhatsApp click-to-chat link (https://wa.me/<number>?text=<message>). */
export function whatsappUrl(message: string = whatsappMessages.general) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const telUrl = `tel:${site.phone.e164}`
export const mailtoUrl = `mailto:${site.email}`
