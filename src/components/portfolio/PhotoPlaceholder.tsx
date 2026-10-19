import { Camera } from 'lucide-react'

interface PhotoPlaceholderProps {
  label: string
  /** Development hint: where the real photo should be saved */
  plannedPhoto?: string
  className?: string
  /** Tailwind aspect-ratio class */
  aspect?: string
}

/**
 * Branded stand-in for a photo that hasn't been added yet. It is plainly a
 * graphic, never a fake photograph. Photo slots using it are hidden from the
 * production site; the Services page uses it as an illustration.
 */
export function PhotoPlaceholder({
  label,
  plannedPhoto,
  className = '',
  aspect = 'aspect-[4/3]',
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative flex ${aspect} flex-col items-center justify-center overflow-hidden bg-ink-3 text-center ${className}`}
    >
      {/* viewfinder corners */}
      <span aria-hidden="true" className="absolute top-5 left-5 size-8 border-t-2 border-l-2 border-line-strong" />
      <span aria-hidden="true" className="absolute top-5 right-5 size-8 border-t-2 border-r-2 border-line-strong" />
      <span aria-hidden="true" className="absolute bottom-5 left-5 size-8 border-b-2 border-l-2 border-line-strong" />
      <span aria-hidden="true" className="absolute right-5 bottom-5 size-8 border-r-2 border-b-2 border-line-strong" />
      <span
        aria-hidden="true"
        className="flex size-20 items-center justify-center rounded-full border-2 border-electric text-electric"
      >
        <Camera className="size-8" />
      </span>
      <span className="mt-4 px-6 font-display text-base font-semibold text-fg">{label}</span>
      {import.meta.env.DEV && plannedPhoto && (
        <span className="mt-2 px-6 text-xs text-subtle">Add photo: public{plannedPhoto}</span>
      )}
    </div>
  )
}
