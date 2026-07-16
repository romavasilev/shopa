'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { TextReveal } from '@/components/text-reveal'
import { Reveal } from '@/components/reveal'

const testimonials = [
  {
    quote:
      'Сайтоген сделали нам сайт, который реально продаёт. Заявки выросли в три раза за первые два месяца. Команда работает на результат, а не на отчётность.',
    name: 'Анна Ковалёва',
    role: 'CMO, Nova Finance',
    rating: 5,
  },
  {
    quote:
      'Лучшее агентство, с которым мы работали. Премиальный дизайн, безупречная скорость и внимание к деталям. Наш магазин стал выглядеть дорого и приносить больше.',
    name: 'Дмитрий Орлов',
    role: 'Основатель, Aurora Store',
    rating: 5,
  },
  {
    quote:
      'Запускали SaaS-продукт и нужен был лендинг с высокой конверсией. Получили 11% конверсии и в два раза дешевле заявку. Рекомендую без оговорок.',
    name: 'Игорь Семёнов',
    role: 'CEO, Pulse',
    rating: 5,
  },
  {
    quote:
      'Профессионалы своего дела. Сделали корпоративный сайт, который стал главным источником лидов. Сопровождают и развивают проект уже больше года.',
    name: 'Марина Зайцева',
    role: 'Директор по маркетингу, Terra Build',
    rating: 5,
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d: number) => {
    setDir(d)
    setIndex((i) => (i + d + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 50%, oklch(0.78 0.16 211 / 0.07), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal className="flex justify-center">
          <SectionLabel>Отзывы</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Нам доверяют рост бизнеса"
          highlight={['доверяют']}
          className="mt-6 justify-center text-center font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
        />

        <div className="relative mt-14 min-h-[280px]">
          <Quote className="mx-auto h-12 w-12 text-primary/30" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="text-pretty text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                {t.quote}
              </p>
              <div className="mt-8 flex items-center justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-4">
                <div className="font-heading text-lg font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            data-cursor-hover
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            aria-label="Предыдущий отзыв"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDir(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Отзыв ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-7 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            data-cursor-hover
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            aria-label="Следующий отзыв"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
