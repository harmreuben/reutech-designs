import { processSteps } from '../../data/process'

/** The five-step project process. The numbers reflect a real sequence. */
export function ProcessSteps() {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-electric font-display text-lg font-bold text-fg">
              {i + 1}
            </span>
            {/* connector line between steps on wide screens */}
            {i < processSteps.length - 1 && (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-line-strong lg:block" />
            )}
          </div>
          <h3 className="mt-5 text-h3">{step.title}</h3>
          <p className="mt-2 text-[0.975rem] text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
