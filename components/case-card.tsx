'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CaseStudy } from '@/lib/content'

export function CaseCard({ item, index = 0 }: { item: CaseStudy; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/cases/${item.slug}`}
        data-cursor-hover
        className="group block overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={`Кейс ${item.title} — ${item.client}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-40"
            style={{
              background: 'linear-gradient(to top, oklch(0.16 0.012 264) 0%, transparent 60%)',
            }}
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full glass px-3 py-1 text-xs font-medium text-foreground">
              {item.category}
            </span>
          </div>
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
            <span className="text-sm text-muted-foreground">{item.year}</span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{item.client}</p>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-heading text-lg font-bold text-primary">{m.value}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
