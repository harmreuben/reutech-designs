interface RingArcProps {
  className?: string
}

/**
 * Large decorative ring taken from the RD monogram: a white lower-left arc
 * and an electric-blue arc over the top. It is the site's one signature
 * graphic device, used sparingly behind page headers and the hero.
 */
export function RingArc({ className = '' }: RingArcProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M41.41 94.17A45 45 0 0 1 8.58 32.42"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="0.6"
      />
      <path
        d="M12.69 24.84A45 45 0 1 1 41.41 94.17"
        fill="none"
        stroke="var(--color-electric)"
        strokeWidth="0.6"
      />
    </svg>
  )
}
