"use client"

import { Eye, Heart, Gauge, Sparkles } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionLabel } from "@/components/section-label"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { Counter } from "@/components/counter"
import { TiltCard } from "@/components/tilt-card"
import { FinalCta } from "@/components/home/final-cta"

const values = [
  {
    icon: Eye,
    title: "Прозрачность",
    text: "Вы всегда видите статус проекта, сроки и стоимость. Никаких скрытых платежей и сюрпризов.",
  },
  {
    icon: Heart,
    title: "Внимание к деталям",
    text: "Мы доводим каждый пиксель и каждую анимацию до совершенства, потому что мелочи формируют доверие.",
  },
  {
    icon: Gauge,
    title: "Фокус на результате",
    text: "Сайт — это инструмент. Мы измеряем успех в заявках, продажах и росте бизнеса клиента.",
  },
  {
    icon: Sparkles,
    title: "Технологичность",
    text: "Используем современный стек, чтобы сайты были быстрыми, безопасными и готовыми к развитию.",
  },
]

const stats = [
  { value: 120, suffix: "+", label: "проектов запущено" },
  { value: 8, suffix: " лет", label: "на рынке" },
  { value: 96, suffix: "%", label: "клиентов возвращаются" },
  { value: 14, suffix: "", label: "человек в команде" },
]

const team = [
  { name: "Артём Соколов", role: "Основатель, стратег", initials: "АС" },
  { name: "Мария Левина", role: "Арт-директор", initials: "МЛ" },
  { name: "Игорь Дёмин", role: "Lead-разработчик", initials: "ИД" },
  { name: "Олег Кравцов", role: "Руководитель SEO", initials: "ОК" },
]

export function AboutContent() {
  return (
    <>
      <PageHero
        label="О нас"
        title="Команда, которая создаёт сайты для роста"
        highlight={["роста"]}
        description="Сайтоген — это digital-агентство полного цикла. Мы объединяем дизайн, разработку и маркетинг, чтобы сайт не просто красиво выглядел, а приносил клиентов и прибыль."
      />

      {/* Story */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionLabel>Наша история</SectionLabel>
            <h2 className="mt-5 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Мы начинали с веры в то, что сайт должен работать на бизнес
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                За 8 лет мы прошли путь от небольшой студии до агентства полного цикла. Через нашу
                команду прошли десятки отраслей — финтех, e-commerce, недвижимость, услуги.
              </p>
              <p>
                Мы поняли главное: красивый сайт без бизнес-логики не приносит результат. Поэтому
                каждый проект мы начинаем с целей клиента и выстраиваем дизайн и разработку вокруг
                них.
              </p>
              <p>
                Сегодня Сайтоген — это команда из 14 специалистов, которые любят сложные задачи и
                измеряют свой успех результатами клиентов.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-border py-16 md:py-20">
        <StaggerGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center md:text-left">
              <div className="font-serif text-5xl tracking-tight text-foreground md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Values */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel>Ценности</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              Принципы, которые лежат в основе работы
            </h2>
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <TiltCard className="h-full rounded-3xl border border-border bg-card p-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{v.text}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Team */}
      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel>Команда</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              Люди, которые делают проекты
            </h2>
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group rounded-3xl border border-border bg-card p-8 text-center transition-colors hover:border-accent/40">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-accent/10 font-serif text-2xl text-accent">
                    {m.initials}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
