'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  highlight?: string[]
  once?: boolean
}

export function TextReveal({
  text,
  className,
  as = 'h2',
  highlight = [],
  once = true,
}: TextRevealProps) {
  const Tag = motion[as]
  const words = text.split(' ')

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10%' }}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((w, i) => {
        const isHighlight = highlight.includes(w.replace(/[.,!?]/g, ''))
        return (
          <span key={`${w}-${i}`} className="mr-[0.28em] inline-block overflow-hidden py-[0.06em]">
            <motion.span
              variants={word}
              className={cn('inline-block', isHighlight && 'text-primary text-glow')}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
