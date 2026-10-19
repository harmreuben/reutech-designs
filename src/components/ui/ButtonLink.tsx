import type { ReactNode } from 'react'
import { Link } from 'react-router'

export type ButtonVariant = 'primary' | 'secondary' | 'on-paper'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: ButtonVariant
  size?: 'md' | 'sm'
  className?: string
  onClick?: () => void
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'on-paper': 'btn-on-paper',
}

/** Internal navigation styled as a button. Use <Button> for actions. */
export function ButtonLink({
  to,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`btn ${variantClass[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
    >
      {children}
    </Link>
  )
}
