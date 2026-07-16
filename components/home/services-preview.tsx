import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/content'
import { SectionLabel } from '@/components/section-label'
import { TextReveal } from '@/components/text-reveal'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'

export function ServicesPreview() {
  return (
    <section className="relative py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 100% 0%, oklch(0.78 0.16 211 / 0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>Услуги</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="Полный цикл — от идеи до результата"
              highlight={['результата']}
              className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              data-cursor-hover
            >
              Все услуги
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services#${s.slug}`}
                data-cursor-hover
                className="group relative flex h-full flex-col bg-card p-8 transition-colors duration-300 hover:bg-secondary/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <span className="mt-6 text-sm font-medium text-primary">{s.priceFrom}</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
