'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/magnetic-button'

const links = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[120] transition-all duration-500',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled ? 'glass-strong glow-ring' : 'border border-transparent',
          )}
        >
          <Link href="/" className="flex items-center gap-2.5" data-cursor-hover>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Hexagon className="h-5 w-5 text-primary" strokeWidth={2.2} />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight">Сайтоген</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor-hover
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-primary" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton href="/contacts" className="px-5 py-2.5">
              Обсудить проект
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:hidden">
          <div className="glass-strong flex flex-col gap-1 rounded-3xl p-4">
            {links.map((l) => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-base transition-colors',
                    active ? 'bg-primary/15 text-primary' : 'text-foreground hover:bg-secondary',
                  )}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link
              href="/contacts"
              className="mt-2 rounded-2xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
            >
              Обсудить проект
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
