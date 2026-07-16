import { ShieldCheck, Zap, Target, TrendingUp, Layers, Headphones } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { TextReveal } from '@/components/text-reveal'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'
import { TiltCard } from '@/components/tilt-card'

const features = [
  {
    icon: Target,
    title: 'Фокус на результат',
    text: 'Мы проектируем каждый сайт под конкретную бизнес-цель: заявки, продажи, узнаваемость.',
  },
  {
    icon: Zap,
    title: 'Скорость и перформанс',
    text: 'Сайты загружаются за миллисекунды и набирают высокие баллы Lighthouse.',
  },
  {
    icon: Layers,
    title: 'Премиальный дизайн',
    text: 'Глубокий визуальный слой, анимации и типографика уровня Awwwards.',
  },
  {
    icon: TrendingUp,
    title: 'Рост конверсии',
    text: 'Применяем лучшие CRO-практики — превращаем посетителей в клиентов.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия качества',
    text: 'Прозрачный процесс, договор, гарантия на работы и поддержка после запуска.',
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    text: 'Сопровождаем, обновляем и развиваем сайт, чтобы он всегда приносил результат.',
  },
]

export function WhyUs() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Почему выбирают нас</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Не просто сайт, а инструмент роста бизнеса"
            highlight={['роста', 'бизнеса']}
            className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              За 9 лет мы запустили более 140 проектов. Мы знаем, что делает сайт успешным — и
              применяем это в каждом проекте.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <TiltCard className="h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{f.text}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
