"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "@/components/section-label"
import { TextReveal } from "@/components/text-reveal"

interface PageHeroProps {
  label: string
  title: string
  highlight?: string[]
  description?: string
}

export function PageHero({ label, title, highlight, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full opacity-25 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionLabel>{label}</SectionLabel>
        <TextReveal
          as="h1"
          text={title}
          highlight={highlight}
          className="mt-6 max-w-4xl text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
