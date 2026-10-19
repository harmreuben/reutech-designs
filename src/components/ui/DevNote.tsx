import type { ReactNode } from 'react'

/**
 * Development-only note. Renders nothing in production builds, so build
 * progress notes can never leak onto the public site.
 */
export function DevNote({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <aside className="container-site my-10">
      <div className="rounded-control border border-dashed border-line-strong p-4 text-sm text-subtle">
        <strong className="text-muted">Development note:</strong> {children}
      </div>
    </aside>
  )
}
