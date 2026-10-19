import { site } from '../../config/site'
import { Monogram } from './Monogram'

type LogoVariant = 'full' | 'compact' | 'icon'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

const designsGradient =
  'bg-[linear-gradient(90deg,#0A6CFF_0%,#00C8F8_100%)] bg-clip-text text-transparent'

/**
 * Reutech Designs logo.
 * - full:    monogram, stacked wordmark and tagline (hero, footer, about page)
 * - compact: monogram with a two-line wordmark (header)
 * - icon:    monogram only (small screens, avatars)
 */
export function Logo({ variant = 'compact', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return <Monogram className={`size-10 ${className}`} title={site.name} />
  }

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <Monogram className="size-10 shrink-0" />
        <span className="flex flex-col font-display leading-none">
          <span className="text-[1.15rem] font-extrabold tracking-[0.1em] text-fg">REUTECH</span>
          <span className={`mt-1 text-[0.62rem] font-bold tracking-[0.5em] ${designsGradient}`}>
            DESIGNS
          </span>
        </span>
      </span>
    )
  }

  return (
    <span className={`inline-flex flex-col items-center text-center ${className}`}>
      <Monogram className="size-28 sm:size-36" />
      <span className="mt-5 font-display text-[2.1rem] leading-none font-extrabold tracking-[0.14em] text-fg sm:text-5xl">
        REUTECH
      </span>
      <span className="mt-3 flex w-full items-center gap-3">
        <span className="h-[3px] flex-1 bg-electric" aria-hidden="true" />
        <span
          className={`mr-[-0.55em] font-display text-lg font-bold tracking-[0.55em] sm:text-2xl ${designsGradient}`}
        >
          DESIGNS
        </span>
        <span className="h-[3px] flex-1 bg-cyan" aria-hidden="true" />
      </span>
      <span className="mt-4 font-display text-sm font-medium italic text-fg sm:text-base">
        {site.tagline}
      </span>
    </span>
  )
}
