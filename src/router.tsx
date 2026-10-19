import { createBrowserRouter, type RouteObject } from 'react-router'
import { RootLayout } from './components/layout/RootLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RouteError from './pages/RouteError'

/** Loads a page module on demand so each page ships as its own small file. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
})

const pages: RouteObject[] = [
  { index: true, Component: Home },
  { path: 'about', lazy: page(() => import('./pages/About')) },
  { path: 'services', lazy: page(() => import('./pages/Services')) },
  { path: 'portfolio', lazy: page(() => import('./pages/Portfolio')) },
  { path: 'pricing', lazy: page(() => import('./pages/Pricing')) },
  { path: 'contact', lazy: page(() => import('./pages/Contact')) },
  { path: 'privacy', lazy: page(() => import('./pages/Privacy')) },
]

// Design-system reference, available only during development.
if (import.meta.env.DEV) {
  pages.push({ path: 'styleguide', lazy: page(() => import('./pages/Styleguide')) })
}

pages.push({ path: '*', Component: NotFound })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    // Shown for a moment while a lazily loaded page opens on first visit
    HydrateFallback: () => <div className="min-h-dvh bg-ink" />,
    errorElement: <RouteError />,
    children: [{ errorElement: <RouteError />, children: pages }],
  },
])
