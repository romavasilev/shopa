import type { Metadata, Viewport } from 'next'
import './globals.css'
import { display, prata, tenorSans } from './fonts'
import styles from './ami-clinic.module.css'

export const metadata: Metadata = {
  title: {
    default: 'ÀМИ — Клиника эстетической медицины',
    template: '%s — ÀМИ',
  },
  description:
    'ÀМИ — клиника эстетической медицины. Косметология, инъекционные методики, массаж и комплексные программы красоты. Искусство естественных изменений.',
  keywords: [
    'клиника эстетической медицины',
    'косметология',
    'инъекции',
    'массаж',
    'биоревитализация',
    'ботулинотерапия',
    'ÀМИ',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ÀМИ',
    title: 'ÀМИ — Клиника эстетической медицины',
    description: 'Искусство естественных изменений. Косметология, инъекции, массаж, программы.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#241A13',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'ÀМИ',
  description: 'Клиника эстетической медицины: косметология, инъекции, массаж, программы.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Пречистенка, 27/29',
    addressLocality: 'Москва',
    postalCode: '119034',
    addressCountry: 'RU',
  },
  telephone: '+7 (495) 123 45 67',
  openingHours: ['Mo-Fr 10:00-21:00', 'Sa-Su 11:00-19:00'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${prata.variable} ${tenorSans.variable}`}
    >
      <body className={styles.root}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
