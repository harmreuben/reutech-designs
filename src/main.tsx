import '@fontsource-variable/inter'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/montserrat/wght-italic.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import './styles/index.css'

// Head tags written into the HTML at build time are for crawlers and link
// previews. Once the app runs, <PageMeta> manages them, so remove the static
// copies to avoid duplicates.
document.head.querySelectorAll('[data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
