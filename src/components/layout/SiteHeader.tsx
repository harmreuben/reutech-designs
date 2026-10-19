import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { site } from '../../config/site'
import { primaryNav, startProject } from '../../data/navigation'
import { Logo } from '../brand/Logo'
import { ButtonLink } from '../ui/ButtonLink'

const DESKTOP_QUERY = '(min-width: 1024px)'

function desktopLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'relative px-1 py-2 text-[0.95rem] font-medium transition-colors',
    'after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors',
    isActive
      ? 'text-fg after:bg-electric'
      : 'text-muted hover:text-fg after:bg-transparent hover:after:bg-line-strong',
  ].join(' ')
}

function mobileLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'flex items-center justify-between rounded-control px-4 py-3.5 font-display text-xl font-semibold transition-colors',
    isActive ? 'bg-ink-3 text-fg' : 'text-muted hover:bg-ink-2 hover:text-fg',
  ].join(' ')
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Stronger header edge once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // While the menu is open: lock page scroll, move focus into the menu,
  // close on Escape and keep Tab focus inside header + menu.
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current || !menuButtonRef.current) return

      const focusables = [
        menuButtonRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink transition-colors ${
        scrolled || menuOpen ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label={`${site.name}, home`}
          className="shrink-0 rounded-md"
        >
          <span className="sm:hidden">
            <Logo variant="icon" />
          </span>
          <span className="hidden sm:block">
            <Logo variant="compact" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={desktopLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to={startProject.to} size="sm" className="hidden sm:inline-flex">
            {startProject.label}
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-electric lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="mobile-menu fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-6">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={mobileLinkClass} onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-line pt-8">
            <ButtonLink to={startProject.to} onClick={closeMenu} className="w-full">
              {startProject.label}
            </ButtonLink>
            <p className="mt-6 text-sm text-subtle">
              Or email{' '}
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  )
}
