'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SectionLabel } from '@/components/section-label'
import { TextReveal } from '@/components/text-reveal'
import { Reveal } from '@/components/reveal'

const steps = [
  {
    n: '01',
    title: 'Брифинг и анализ',
    text: 'Погружаемся в ваш бизнес, изучаем нишу, конкурентов и цели проекта.',
  },
  {
    n: '02',
    title: 'Стратегия и структура',
    text: 'Проектируем структуру, продумываем путь пользователя и точки конверсии.',
  },
  {
    n: '03',
    title: 'Дизайн',
    text: 'Создаём премиальный дизайн с уникальным стилем и продуманными анимациями.',
  },
  {
    n: '04',
    title: 'Разработка',
    text: 'Кодим на современном стеке: быстро, безопасно, с фокусом на перформанс.',
  },
  {
    n: '05',
    title: 'Запуск и аналитика',
    text: 'Запускаем, подключаем аналитику и настраиваем сквозную отчётность.',
  },
  {
    n: '06',
    title: 'Развитие',
    text: 'Сопровождаем, тестируем гипотезы и наращиваем результат после запуска.',
  },
]

export function Process() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const cards = gsap.utils.toArray<HTMLElement>('.process-step')
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })

      gsap.to('.process-line-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-track',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.6,
        },
      })
    },
    { scope: container },
  )

  return (
    <section className="relative py-24 lg:py-32" ref={container}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <SectionLabel>Процесс работы</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Прозрачный путь к вашему сайту"
            highlight={['сайту']}
            className="mt-6 justify-center text-center font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          />
        </div>

        <div className="process-track relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block">
            <div
              className="process-line-fill absolute inset-0 origin-top scale-y-0 bg-primary"
              style={{ boxShadow: '0 0 16px oklch(0.78 0.16 211 / 0.6)' }}
            />
          </div>

          <div className="flex flex-col gap-6 lg:gap-2">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`process-step lg:grid lg:grid-cols-2 lg:gap-8 ${
                  i % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2'
                }`}
              >
                <div className={i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'}>
                  <div className="glass rounded-2xl p-7">
                    <span className="font-heading text-sm font-bold text-primary">{s.n}</span>
                    <h3 className="mt-2 font-heading text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
