/** Marks illustrative work so it is never mistaken for a client commission. */
export function SampleBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line-strong bg-ink/85 px-3 py-1 text-xs font-semibold text-fg backdrop-blur-sm ${className}`}
    >
      Sample concept
    </span>
  )
}
