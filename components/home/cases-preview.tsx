import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cases } from '@/lib/content'
import { SectionLabel } from '@/components/section-label'
import { TextReveal } from '@/components/text-reveal'
import { Reveal } from '@/components/reveal'
import { CaseCard } from '@/components/case-card'
import { MagneticButton } from '@/components/magnetic-button'

export function CasesPreview() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>Кейсы</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="Проекты, которые приносят прибыль"
              highlight={['прибыль']}
              className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/cases"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              data-cursor-hover
            >
              Все кейсы
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.slice(0, 6).map((c, i) => (
            <CaseCard key={c.slug} item={c} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <MagneticButton href="/cases" variant="outline">
            Смотреть всё портфолио
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
