import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  title: string
  intro?: ReactNode
  /** Optional action shown beside the heading on wide screens */
  action?: ReactNode
}

/** Section <h2> with an optional intro paragraph. `id` labels the section. */
export function SectionHeading({ id, title, intro, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lead text-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
