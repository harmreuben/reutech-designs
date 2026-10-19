/**
 * Vercel Function: POST /api/quote
 * Secrets come from Vercel's Environment Variables, never from browser code.
 */
import { handleQuoteRequest } from '../server/quote.js'

export default {
  fetch(request: Request) {
    return handleQuoteRequest(request, {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      QUOTE_TO_EMAIL: process.env.QUOTE_TO_EMAIL,
      QUOTE_FROM_EMAIL: process.env.QUOTE_FROM_EMAIL,
      QUOTE_ALLOWED_ORIGINS: process.env.QUOTE_ALLOWED_ORIGINS,
      mode: 'production',
    })
  },
}
