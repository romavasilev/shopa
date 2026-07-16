import { Prata, Tenor_Sans } from 'next/font/google'
import localFont from 'next/font/local'

// Hero display — custom calligraphic script (Old Classic)
export const display = localFont({
  src: './fonts/old-classic.ttf',
  variable: '--font-ami-display',
  display: 'swap',
})

// Serif headings
export const prata = Prata({
  variable: '--font-ami-serif',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
})

// Body / UI
export const tenorSans = Tenor_Sans({
  variable: '--font-ami-sans',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
})
