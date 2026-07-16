import Link from 'next/link'
import { Hexagon, ArrowUpRight, Send, Mail, Phone, MapPin } from 'lucide-react'

const nav = [
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
]

const services = [
  { href: '/services#design', label: 'Дизайн сайтов' },
  { href: '/services#corporate', label: 'Корпоративные сайты' },
  { href: '/services#ecommerce', label: 'Интернет-магазины' },
  { href: '/services#landing', label: 'Лендинги' },
  { href: '/services#seo', label: 'SEO-продвижение' },
  { href: '/services#support', label: 'Поддержка' },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-card/40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                <Hexagon className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </span>
              <span className="font-heading text-lg font-bold tracking-tight">Сайтоген</span>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Создаём сайты, которые продают, усиливают бренд и приносят клиентов. Дизайн и
              разработка уровня премиальных digital-агентств.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://t.me/saitogen"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@saitogen.ru"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Навигация</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Услуги</h3>
            <ul className="mt-5 space-y-3">
              {services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Контакты</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+74950000000" className="transition-colors hover:text-primary">
                  +7 (495) 000-00-00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@saitogen.ru" className="transition-colors hover:text-primary">
                  hello@saitogen.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Москва, ул. Тверская, 12</span>
              </li>
            </ul>
            <Link
              href="/contacts"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Получить консультацию
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Сайтоген. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Политика конфиденциальности
            </Link>
            <Link href="/cases" className="transition-colors hover:text-primary">
              Портфолио
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
