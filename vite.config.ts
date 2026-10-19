import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import { seoPlugin } from './build-tools/seo-plugin.ts'
import { handleQuoteRequest, type QuoteEnv } from './server/quote.ts'

/**
 * Serves POST /api/quote during `npm run dev` and `npm run preview`, using the
 * same handler as the Vercel Function. Values come from .env.local, which is
 * never committed and never sent to the browser.
 */
function localQuoteApi(env: Record<string, string>): Plugin {
  const quoteEnv: QuoteEnv = {
    RESEND_API_KEY: env.RESEND_API_KEY,
    QUOTE_TO_EMAIL: env.QUOTE_TO_EMAIL,
    QUOTE_FROM_EMAIL: env.QUOTE_FROM_EMAIL,
    QUOTE_ALLOWED_ORIGINS: env.QUOTE_ALLOWED_ORIGINS,
    mode: 'development',
  }

  const middleware: Connect.NextHandleFunction = async (
    req: IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction,
  ) => {
    if (!req.url?.startsWith('/api/quote')) return next()
    try {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const headers = new Headers()
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') headers.set(key, value)
      }
      const request = new Request(`http://${req.headers.host ?? 'localhost'}${req.url}`, {
        method: req.method,
        headers,
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
      })
      const response = await handleQuoteRequest(request, quoteEnv)
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(await response.text())
    } catch (error) {
      next(error)
    }
  }

  return {
    name: 'local-quote-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), localQuoteApi(env), seoPlugin()],
  }
})
