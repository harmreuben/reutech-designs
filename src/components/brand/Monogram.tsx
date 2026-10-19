import { useId } from 'react'

interface MonogramProps {
  className?: string
  /** Accessible name. Leave empty when the monogram sits next to visible brand text. */
  title?: string
}

/**
 * RD monogram, redrawn as SVG from the approved Reutech Designs logo
 * (design/brand/reutech-logo-original.png) so it stays sharp at any size.
 * If a vector master file is supplied later, replace the paths below.
 */
export function Monogram({ className, title }: MonogramProps) {
  const id = useId()
  const ringGradient = `${id}-ring`
  const letterGradient = `${id}-letter`

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={ringGradient} x1="0.1" y1="0.9" x2="0.9" y2="0.1">
          <stop offset="0" stopColor="#0757F2" />
          <stop offset="1" stopColor="#00C8F8" />
        </linearGradient>
        <linearGradient id={letterGradient} x1="0" y1="1" x2="1" y2="0.3">
          <stop offset="0" stopColor="#0757F2" />
          <stop offset="1" stopColor="#00C8F8" />
        </linearGradient>
      </defs>

      {/* Ring: white lower-left arc, blue arc over the top */}
      <path d="M41.41 94.17A45 45 0 0 1 8.58 32.42" fill="none" stroke="#F7F9FC" strokeWidth="6" />
      <path d="M12.69 24.84A45 45 0 1 1 41.41 94.17" fill="none" stroke={`url(#${ringGradient})`} strokeWidth="6" />

      <g transform="translate(2 2) scale(0.96)">
        {/* D */}
        <path
          d="M57 32.85H63.7A19 19 0 0 1 63.7 70.85H58.5"
          fill="none"
          stroke={`url(#${letterGradient})`}
          strokeWidth="9"
        />
        {/* R: bar and bowl */}
        <path
          d="M21 32.5H41.5A8.5 8.5 0 0 1 41.5 49.5H34"
          fill="none"
          stroke="#F7F9FC"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* R: leg */}
        <path d="M21.5 45H35.5L63 78H49Z" fill="#F7F9FC" />
        {/* R: offset blue leg */}
        <path d="M15.5 56H23.5L51 84H43Z" fill={`url(#${letterGradient})`} />
      </g>
    </svg>
  )
}
