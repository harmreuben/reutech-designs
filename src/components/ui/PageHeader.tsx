import type { ReactNode } from 'react'
import { RingArc } from './RingArc'

interface PageHeaderProps {
  title: string
  intro?: ReactNode
  children?: ReactNode
}

/** Opening block for inner pages. Holds the page's single <h1>. */
export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <RingArc className="absolute top-1/2 -right-24 hidden w-[34rem] -translate-y-1/2 opacity-70 sm:block lg:right-0 lg:w-[38rem]" />
      <div className="container-site relative py-16 sm:py-24">
        <h1 className="max-w-3xl text-h1">{title}</h1>
        {intro && <p className="mt-5 max-w-prose text-lead text-muted">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </header>
  )
}
