"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"


export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <TextReveal
          as="h2"
          text="Готовы создать сайт, который работает?"
          className="justify-center text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Расскажите о проекте — мы предложим решение, рассчитаем стоимость и сроки в течение одного
          рабочего дня.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/contacts">
            Обсудить проект
            <ArrowUpRight className="size-5" />
          </MagneticButton>
          <Link
            href="/cases"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Сначала посмотреть кейсы
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
