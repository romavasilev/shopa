'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'
import { HeroScene } from '@/components/hero-scene'
import { MagneticButton } from '@/components/magnetic-button'
import { Counter } from '@/components/counter'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <HeroScene />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 40%, oklch(0.16 0.012 264 / 0.9) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 mask-fade-b" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-2 text-sm text-muted-foreground"
        >
          <span className="flex -space-x-1">
            {[0, 1, 2].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </span>
          Более 140 проектов с измеримым результатом
        </motion.div>

        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {['Создаём', 'сайты,', 'которые'].map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary text-glow"
            >
              работают на бизнес
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Премиальный дизайн и разработка сайтов, которые продают, усиливают бренд и приносят
          клиентов. Превращаем ваш трафик в выручку.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/contacts">
            Получить консультацию
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href="/cases" variant="outline">
            <Play className="h-4 w-4" />
            Посмотреть кейсы
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8"
        >
          {[
            { to: 140, suffix: '+', label: 'проектов' },
            { to: 9, suffix: ' лет', label: 'на рынке' },
            { to: 184, suffix: '%', label: 'средний рост заявок' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
