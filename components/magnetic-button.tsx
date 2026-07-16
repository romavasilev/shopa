'use client'

import Link from 'next/link'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  strength?: number
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform'

  const variants = {
    primary:
      'bg-primary text-primary-foreground glow-ring hover:bg-primary/90',
    outline:
      'border border-border bg-transparent text-foreground hover:border-primary/60 hover:text-primary',
    ghost: 'bg-transparent text-foreground hover:text-primary',
  }

  const inner = (
    <span
      ref={ref}
      className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 ease-out"
      style={{ willChange: 'transform' }}
    >
      {children}
    </span>
  )

  const sharedProps = {
    className: cn(base, variants[variant], className),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    'data-cursor-hover': true,
  }

  if (href) {
    const isInternal = href.startsWith('/')
    if (isInternal) {
      return (
        <Link href={href} {...sharedProps}>
          {inner}
        </Link>
      )
    }
    return (
      <a href={href} {...sharedProps}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} {...sharedProps}>
      {inner}
    </button>
  )
}
