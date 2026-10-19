export interface NavItem {
  label: string
  to: string
}

/** Primary navigation. The order is fixed by the brief; do not reorder. */
export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export const serviceNav: NavItem[] = [
  { label: 'Graphic Design', to: '/services#graphic-design' },
  { label: 'Photography', to: '/services#photography' },
]

export const legalNav: NavItem[] = [{ label: 'Privacy notice', to: '/privacy' }]

/** Main call to action, used in the header and across pages. */
export const startProject: NavItem = { label: 'Start a Project', to: '/contact#quote' }
