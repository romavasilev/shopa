'use client'

import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import styles from './ami-clinic.module.css'

const C = {
  ink: '#241A13',
  bg: '#EEEBE6',
  text: '#2C2119',
  gold: '#A8805A',
  goldLight: '#C9A876',
  muted: '#8A6B4E',
  muted2: '#4A3B2E',
}
const SERIF = 'var(--font-ami-serif), serif'
const DISPLAY = 'var(--font-ami-display), cursive'

// On GitHub Pages the site is served from a subpath. next/font and routes get the
// prefix automatically, but raw <img>/<video>/CSS url() paths do not.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const NAV_LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '#visit', label: 'Визит' },
  { href: '#team', label: 'Специалисты' },
  { href: '#philosophy', label: 'Философия' },
  { href: '#price', label: 'Прайс' },
]

const SERVICES = [
  {
    num: '01',
    title: 'Косметология',
    img: `${BASE}/ami-clinic/service-cosmetology.jpg`,
    desc: 'Эстетические программы ухода за кожей лица: чистки, пилинги, аппаратные методики. Индивидуальный подбор протокола под задачи вашей кожи.',
  },
  {
    num: '02',
    title: 'Инъекции',
    img: `${BASE}/ami-clinic/service-injections.jpg`,
    desc: 'Инъекционные методики для естественного омоложения, коррекции и поддержания вашей красоты. Только сертифицированные препараты и врачи с медицинским образованием.',
  },
  {
    num: '03',
    title: 'Массаж',
    img: `${BASE}/ami-clinic/service-massage.jpg`,
    desc: 'Классические и авторские техники массажа лица и тела. Глубокое расслабление, лимфодренаж и восстановление тонуса в атмосфере полного покоя.',
  },
  {
    num: '04',
    title: 'Программы',
    img: `${BASE}/ami-clinic/service-programs.jpg`,
    desc: 'Комплексные программы красоты и здоровья, составленные из процедур клиники. Курсовой подход для устойчивого и долговременного результата.',
  },
]

const VISIT_STEPS = [
  { n: '01', t: 'Консультация', d: 'Внимательно выслушаем ваши пожелания и ответим на все вопросы.' },
  { n: '02', t: 'Диагностика', d: 'Проведём комплексную диагностику и составим индивидуальный план.' },
  { n: '03', t: 'Процедура', d: 'Выполним процедуру с использованием передовых методик и технологий.' },
  { n: '04', t: 'Уход', d: 'Подберём рекомендации по уходу, чтобы сохранить результат надолго.' },
]

const TEAM = [
  {
    name: 'Мария Лебедева',
    role: 'Врач-дерматовенеролог, косметолог',
    maxW: 470,
    h: 'min(36vw, 560px)',
    mt: '140px',
  },
  {
    name: 'Ольга Смирнова',
    role: 'Врач-пластический хирург',
    maxW: 400,
    h: 'min(40vw, 620px)',
    mt: '0px',
  },
  {
    name: 'Анастасия Егорова',
    role: 'Массажист-эстетист',
    maxW: 400,
    h: 'min(27vw, 420px)',
    mt: '220px',
  },
]

const PHILOSOPHY_TEXT = [
  'Мы верим в силу бережного подхода и в естественную красоту, которая раскрывается в гармонии с собой.',
  'Каждая деталь — от пространства до используемых методик — подчинена идее заботы, комфорта и безупречного качества.',
  'ÀМИ — это место, где наука встречается с эстетикой, а результат становится отражением вашего внутреннего состояния.',
]

const PRICE_COSMETOLOGY: [string, string][] = [
  ['Консультация косметолога', '5 000'],
  ['HydraFacial MD', '17 000'],
  ['Биоревитализация', '15 000'],
  ['Коллагенотерапия', '18 000'],
  ['Ботулинотерапия (1 зона)', '14 000'],
  ['Контурная пластика (1 мл)', '18 000'],
  ['RF-лифтинг', '16 000'],
  ['SMAS-лифтинг', '33 000'],
  ['Пилинг PRX-T33', '8 000'],
  ['Карбокситерапия', '7 000'],
]

const PRICE_MASSAGE: [string, string][] = [
  ['Классический массаж', '8 000'],
  ['Лимфодренажный массаж', '9 000'],
  ['Массаж лица', '6 000'],
  ['Массаж спины', '8 000'],
  ['Антицеллюлитный массаж', '10 000'],
  ['Спортивный массаж', '9 000'],
  ['Расслабляющий массаж', '8 000'],
  ['Массаж ног', '7 000'],
  ['Массаж головы', '5 000'],
  ['Комплексный массаж', '14 000'],
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function Reveal({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function Sphere({
  y,
  float,
  duration,
  position,
  size,
  gradient,
  blur,
}: {
  y: MotionValue<number>
  float: string
  duration: string
  position: CSSProperties
  size: string
  gradient: string
  blur: number
}) {
  return (
    <motion.div style={{ position: 'absolute', width: size, height: size, y, ...position }}>
      <div
        className={float}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: gradient,
          filter: `blur(${blur}px)`,
          animationDuration: duration,
        }}
      />
    </motion.div>
  )
}

function HeroSpheres() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, (v) => -v * 0.5)
  const y2 = useTransform(scrollY, (v) => -v * 0.85)
  const y3 = useTransform(scrollY, (v) => -v * 1.15)
  const y4 = useTransform(scrollY, (v) => -v * 0.65)
  const y5 = useTransform(scrollY, (v) => -v * 1.3)

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Sphere
        y={y1}
        float={styles.floatA}
        duration="13s"
        position={{ top: '-8%', left: '-6%' }}
        size="clamp(320px, 36vw, 620px)"
        gradient="radial-gradient(circle, rgba(233,207,168,0.40) 0%, rgba(233,207,168,0) 70%)"
        blur={34}
      />
      <Sphere
        y={y2}
        float={styles.floatB}
        duration="15s"
        position={{ top: '6%', right: '-4%' }}
        size="clamp(260px, 30vw, 520px)"
        gradient="radial-gradient(circle, rgba(214,180,132,0.34) 0%, rgba(214,180,132,0) 70%)"
        blur={38}
      />
      <Sphere
        y={y3}
        float={styles.floatA}
        duration="10s"
        position={{ top: '30%', left: '22%' }}
        size="clamp(120px, 14vw, 220px)"
        gradient="radial-gradient(circle, rgba(245,236,220,0.42) 0%, rgba(245,236,220,0) 72%)"
        blur={26}
      />
      <Sphere
        y={y4}
        float={styles.floatB}
        duration="16s"
        position={{ bottom: '-12%', left: '12%' }}
        size="clamp(300px, 34vw, 560px)"
        gradient="radial-gradient(circle, rgba(222,193,150,0.30) 0%, rgba(222,193,150,0) 70%)"
        blur={40}
      />
      <Sphere
        y={y5}
        float={styles.floatA}
        duration="9s"
        position={{ bottom: '20%', right: '20%' }}
        size="clamp(90px, 10vw, 160px)"
        gradient="radial-gradient(circle, rgba(248,241,229,0.40) 0%, rgba(248,241,229,0) 72%)"
        blur={22}
      />
    </div>
  )
}

function ServiceCard({
  service,
  index,
  active,
  blurred,
  isMobile,
  onSelect,
  onEnter,
  onLeave,
}: {
  service: (typeof SERVICES)[number]
  index: number
  active: boolean
  blurred: boolean
  isMobile: boolean
  onSelect: () => void
  onEnter: () => void
  onLeave: () => void
}) {
  const labelStyle: CSSProperties = isMobile
    ? {
        position: 'absolute',
        left: 24,
        bottom: 22,
        fontFamily: SERIF,
        fontSize: 32,
        color: '#F0EEEB',
        textShadow: '0 2px 24px rgba(44,33,25,0.45)',
        letterSpacing: '0.03em',
      }
    : {
        position: 'absolute',
        left: 30,
        bottom: 36,
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        fontFamily: SERIF,
        fontSize: 44,
        color: '#F0EEEB',
        textShadow: '0 2px 24px rgba(44,33,25,0.45)',
        letterSpacing: '0.03em',
      }

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        flex: isMobile ? 'none' : active ? 2.4 : 1,
        minHeight: isMobile ? (active ? 560 : 110) : 0,
        transition:
          'flex .85s cubic-bezier(.22,1,.36,1), min-height .85s cubic-bezier(.22,1,.36,1)',
        cursor: 'pointer',
        minWidth: 0,
      }}
    >
      <div
        role="img"
        aria-label={service.title}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${service.img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'filter .7s ease, transform .7s ease',
          filter: blurred ? 'blur(12px) saturate(0.9)' : 'none',
          transform: blurred ? 'scale(1.07)' : 'scale(1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(154,120,86,0.25) 0%, rgba(74,55,38,0.55) 100%)',
          opacity: active ? 0.25 : 0.65,
          transition: 'opacity .8s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 26,
          right: 26,
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: '1px solid rgba(240,238,235,0.75)',
          color: '#F0EEEB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 200,
          background: 'rgba(44,33,25,0.14)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {active ? '−' : '+'}
      </div>

      {!active && <div style={labelStyle}>{service.title}</div>}

      {active && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}
        >
          <div
            style={{
              background: 'rgba(238,236,232,0.62)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(240,238,235,0.5)',
              maxWidth: 430,
              width: '100%',
              padding: '54px 48px',
              boxShadow: '0 30px 60px rgba(44,33,25,0.25)',
            }}
          >
            <div style={{ fontSize: 14, letterSpacing: 3, color: C.muted }}>{service.num}</div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(28px, 7.5vw, 46px)',
                color: C.text,
                marginTop: 14,
              }}
            >
              {service.title}
            </div>
            <div style={{ width: 34, height: 1, background: C.gold, margin: '22px 0 24px' }} />
            <div style={{ fontSize: 15.5, lineHeight: 1.75, color: C.muted2, fontWeight: 300 }}>
              {service.desc}
            </div>
            <a
              href="#booking"
              className={styles.gold}
              style={{
                display: 'inline-block',
                marginTop: 28,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: 'uppercase',
                borderBottom: `1px solid ${C.gold}`,
                paddingBottom: 5,
              }}
            >
              Подробнее
            </a>
          </div>
        </div>
      )}
      {/* index reserved for future ordering logic */}
      <span hidden>{index}</span>
    </div>
  )
}

export default function AmiClinicPage() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState(1)
  const [hover, setHover] = useState(-1)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    const prevPadding = html.style.scrollPaddingTop
    html.style.scrollBehavior = 'smooth'
    html.style.scrollPaddingTop = '90px'
    return () => {
      html.style.scrollBehavior = prevBehavior
      html.style.scrollPaddingTop = prevPadding
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const labelUpper: CSSProperties = {
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: C.muted,
  }

  return (
    <>
      {/* ---------- Header ---------- */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          padding: '18px clamp(24px, 3vw, 56px)',
          background: 'rgba(232,230,227,0.82)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(44,33,25,0.08)',
        }}
      >
        <a href="#hero" style={{ display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/ami-clinic/logo.png`}
            alt="ÀМИ — клиника эстетической медицины"
            style={{
              height: 'clamp(36px, 10vw, 50px)',
              display: 'block',
              filter:
                'brightness(0.55) contrast(1.25) drop-shadow(0 1px 0 rgba(255,255,255,0.4))',
            }}
          />
        </a>
        {!isMobile && (
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(16px, 2.4vw, 44px)',
              fontSize: 12,
              letterSpacing: 3.5,
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={styles.gold}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <a
          href="#booking"
          className={styles.gold}
          style={{
            fontSize: 'clamp(10px, 2.7vw, 12px)',
            letterSpacing: 'clamp(1.5px, 0.9vw, 3.5px)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          Записаться
          <span style={{ display: 'inline-block', width: 36, height: 1, background: C.gold }} />
        </a>
      </header>

      {/* ---------- Hero ---------- */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: C.ink,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0.55) brightness(1.15) contrast(0.95)',
          }}
        >
          <source src={`${BASE}/ami-clinic/hero.mp4`} type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            // Long, multi-stop ramp: a short dark→light fade banded visibly.
            // Final stop matches the Services background exactly, so there's no seam.
            background:
              'linear-gradient(180deg, rgba(36,26,19,0.38) 0%, rgba(36,26,19,0.10) 34%, rgba(48,35,25,0.16) 50%, rgba(74,56,40,0.30) 64%, rgba(116,95,72,0.48) 76%, rgba(170,152,128,0.68) 85%, rgba(214,205,192,0.86) 93%, rgba(238,235,230,1) 100%)',
          }}
        />
        <HeroSpheres />
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            padding: '96px 24px 60px',
            maxWidth: 1200,
          }}
        >
          <div
            className={styles.riseIn}
            style={{
              fontSize: 'clamp(10px, 2.8vw, 16px)',
              letterSpacing: 'clamp(2.5px, 1.3vw, 7px)',
              textTransform: 'uppercase',
              color: C.goldLight,
              marginBottom: 'clamp(12px, 3vw, 20px)',
              animationDelay: '.1s',
            }}
          >
            Клиника эстетической медицины
          </div>
          <h1
            className={styles.riseIn}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: 'clamp(46px, 7.4vw, 132px)',
              lineHeight: 1.16,
              margin: '20px 0 0',
              color: '#D9CDBC',
              letterSpacing: '0',
              textShadow: '0 2px 20px rgba(20,13,8,0.22)',
              animationDelay: '.25s',
            }}
          >
            Красота
            <span
              style={{
                display: 'block',
                fontSize: '0.44em',
                letterSpacing: '0',
                marginTop: '0.05em',
                opacity: 0.9,
              }}
            >
              в состоянии покоя
            </span>
          </h1>
          <svg
            className={styles.riseIn}
            width="380"
            height="24"
            viewBox="0 0 380 24"
            fill="none"
            style={{ display: 'block', margin: '30px auto 0', maxWidth: '70%', animationDelay: '.4s' }}
            aria-hidden="true"
          >
            <path
              d="M0 12 C54 12 70 4 112 4 C150 4 160 20 190 20 C220 20 230 4 268 4 C310 4 326 12 380 12"
              stroke={C.goldLight}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
          <div
            className={styles.riseIn}
            style={{
              fontSize: 'clamp(13px, 3.3vw, 17px)',
              letterSpacing: 'clamp(1.5px, 0.8vw, 3px)',
              color: '#D9CDBC',
              marginTop: 'clamp(22px, 5vw, 36px)',
              animationDelay: '.45s',
            }}
          >
            Искусство естественных изменений
          </div>
          <div className={styles.riseIn} style={{ marginTop: 56, animationDelay: '.6s' }}>
            <a
              href="#booking"
              className={styles.heroCta}
              style={{
                display: 'inline-block',
                border: `1px solid ${C.goldLight}`,
                padding: 'clamp(15px, 4vw, 19px) clamp(40px, 13vw, 72px)',
                fontSize: 'clamp(12px, 3.1vw, 14px)',
                letterSpacing: 'clamp(2px, 1vw, 4px)',
                textTransform: 'uppercase',
                color: '#EDE9E3',
                background: 'rgba(36,26,19,0.25)',
                backdropFilter: 'blur(4px)',
              }}
            >
              Записаться
            </a>
          </div>
        </div>

        {/* Side labels: the wrapper owns position/transform so the riseIn
            animation (which sets its own transform) can't clobber centering. */}
        {!isMobile && (
          <>
            <div
              style={{
                position: 'absolute',
                left: 'clamp(20px, 3vw, 46px)',
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)',
                writingMode: 'vertical-rl',
                opacity: 0.5,
              }}
            >
              <div
                className={styles.riseIn}
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: C.goldLight,
                  animationDelay: '.8s',
                }}
              >
                Эстетика · Здоровье · Покой
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 'clamp(20px, 3vw, 46px)',
                top: '50%',
                transform: 'translateY(-50%)',
                writingMode: 'vertical-rl',
                opacity: 0.5,
              }}
            >
              <div
                className={styles.riseIn}
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: C.goldLight,
                  animationDelay: '.8s',
                }}
              >
                Москва · Пречистенка 27/29
              </div>
            </div>
          </>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(22px, 3vw, 40px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <a
            href="#services"
            className={styles.riseIn}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#5A4A3C',
              animationDelay: '1s',
            }}
          >
            Листайте вниз
            <span className={styles.scrollLine}>
              <span className={styles.scrollDot} />
            </span>
          </a>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" style={{ background: C.bg }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: 'clamp(64px, 8vw, 100px) clamp(20px, 4vw, 56px) 48px',
          }}
        >
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(34px, 8vw, 84px)', margin: 0, color: C.text }}>
            Услуги
          </h2>
          <div style={labelUpper}>/ 01 — Направления</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            height: isMobile ? 'auto' : '82vh',
            minHeight: isMobile ? 0 : 560,
          }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.num}
              service={s}
              index={i}
              active={i === active}
              blurred={i === active || i === hover}
              isMobile={isMobile}
              onSelect={() => setActive(i)}
              onEnter={() => setHover(i)}
              onLeave={() => setHover(-1)}
            />
          ))}
        </div>
      </section>

      {/* ---------- Visit ---------- */}
      <section
        id="visit"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #EEEBE6 0%, #E9E3DB 100%)',
          padding: 'clamp(72px, 9vw, 130px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 150px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -140,
            bottom: -140,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,196,153,0.30) 0%, rgba(224,196,153,0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        <Reveal>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(32px, 8vw, 92px)',
              margin: '0 0 clamp(44px, 9vw, 90px)',
              color: C.text,
            }}
          >
            Как проходит визит
          </h2>
          <div style={{ position: 'relative', maxWidth: 640, marginLeft: 'clamp(0px, 8vw, 150px)' }}>
            <div
              style={{
                position: 'absolute',
                left: 10,
                top: 14,
                bottom: 54,
                width: 1,
                background: 'linear-gradient(#C4A87F, rgba(196,168,127,0.25))',
              }}
            />
            <div style={{ display: 'grid', gap: 64 }}>
              {VISIT_STEPS.map((step) => (
                <div key={step.n} style={{ display: 'flex', gap: 'clamp(20px, 6vw, 46px)' }}>
                  <div
                    style={{
                      width: 21,
                      height: 21,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 30%, #E9D9C4, #A8805A)',
                      boxShadow: '0 6px 12px rgba(44,33,25,0.25)',
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(16px, 4vw, 20px)', color: C.muted }}>
                      {step.n}
                    </div>
                    <div
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(26px, 7vw, 40px)',
                        color: C.text,
                        marginTop: 6,
                      }}
                    >
                      {step.t}
                    </div>
                    <div
                      style={{
                        fontSize: 15.5,
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: C.muted2,
                        marginTop: 12,
                        maxWidth: 420,
                      }}
                    >
                      {step.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Team ---------- */}
      <section
        id="team"
        style={{
          background: 'linear-gradient(180deg, #E9E3DB 0%, #EDE8E1 100%)',
          padding: 'clamp(72px, 9vw, 130px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 150px)',
          overflow: 'hidden',
        }}
      >
        <Reveal>
          <div style={{ position: 'relative' }}>
            <h2
              style={
                isMobile
                  ? {
                      position: 'static',
                      fontFamily: SERIF,
                      fontWeight: 300,
                      fontSize: 'clamp(44px, 11vw, 80px)',
                      margin: '0 0 40px',
                      color: C.muted,
                      letterSpacing: '0.04em',
                    }
                  : {
                      position: 'absolute',
                      top: 44,
                      left: 0,
                      zIndex: 2,
                      fontFamily: SERIF,
                      fontWeight: 300,
                      fontSize: 'clamp(60px, 7.4vw, 128px)',
                      margin: 0,
                      color: C.muted,
                      letterSpacing: '0.04em',
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none',
                    }
              }
            >
              Специалисты
            </h2>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 72px)',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 22,
                    width: '100%',
                    maxWidth: member.maxW,
                    marginTop: isMobile ? 0 : member.mt,
                  }}
                >
                  <div
                    aria-label={`Фото — ${member.name}`}
                    style={{
                      width: '100%',
                      height: isMobile ? 440 : member.h,
                      background:
                        'linear-gradient(160deg, rgba(200,176,142,0.35) 0%, rgba(122,96,66,0.28) 100%)',
                      border: '1px solid rgba(168,128,90,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: 24,
                      color: 'rgba(44,33,25,0.5)',
                      fontSize: 12,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                    }}
                  >
                    Фото — {member.name}
                  </div>
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 6.4vw, 34px)', color: C.text }}>
                      {member.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        color: C.muted,
                        marginTop: 8,
                      }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                maxWidth: 240,
                marginTop: isMobile ? 40 : -80,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: 'uppercase',
                lineHeight: 2.1,
                color: '#5A4A3C',
              }}
            >
              <div style={{ width: 120, height: 1, background: C.gold, marginBottom: 22 }} />
              Команда профессионалов для вашей красоты и здоровья
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section
        id="philosophy"
        style={{
          background: 'linear-gradient(180deg, #EDE8E1 0%, #E7E1D8 100%)',
          padding: 'clamp(64px, 8vw, 110px) clamp(20px, 4vw, 56px) clamp(72px, 9vw, 130px)',
          overflow: 'hidden',
        }}
      >
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={labelUpper}>/ 04&nbsp;&nbsp;&nbsp;Философия</div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(320px, 1.05fr) 1.4fr',
              gap: 'clamp(32px, 5vw, 90px)',
              marginTop: 40,
              alignItems: 'end',
            }}
          >
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(38px, 9vw, 110px)',
                lineHeight: 1.04,
                margin: 0,
                color: C.text,
              }}
            >
              Уход
              <br />
              как тихий
              <br />
              ритуал
            </h2>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/ami-clinic/service-programs.jpg`}
                alt="Текстура крема на камне"
                style={{
                  width: '100%',
                  height: 'clamp(300px, 34vw, 520px)',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'saturate(0.82) contrast(0.98)',
                  boxShadow: '0 40px 80px rgba(44,33,25,0.18)',
                }}
              />
              <div style={{ display: 'flex', gap: 40, marginTop: 44, maxWidth: 720 }}>
                <div style={{ width: 1, background: C.gold, flexShrink: 0 }} />
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: C.muted2,
                    display: 'grid',
                    gap: 18,
                  }}
                >
                  {PHILOSOPHY_TEXT.map((p) => (
                    <div key={p}>{p}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Price ---------- */}
      <section
        id="price"
        style={{
          background: 'linear-gradient(180deg, #E7E1D8 0%, #ECE6DD 100%)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 140px)',
          overflow: 'hidden',
        }}
      >
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(38px, 9vw, 110px)',
                margin: 0,
                color: C.text,
              }}
            >
              Прайс
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 'clamp(40px, 6vw, 120px)',
              maxWidth: 1520,
              margin: 'clamp(48px, 6vw, 90px) auto 0',
            }}
          >
            {[
              { title: 'Косметология', rows: PRICE_COSMETOLOGY },
              { title: 'Массаж', rows: PRICE_MASSAGE },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 7vw, 42px)', color: C.text }}>
                  {col.title}
                </div>
                <div style={{ display: 'grid', marginTop: 26 }}>
                  {col.rows.map(([name, price]) => (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 20,
                        padding: '15px 0',
                        borderBottom: '1px solid rgba(44,33,25,0.28)',
                        fontWeight: 300,
                        fontSize: 'clamp(14px, 3.7vw, 17px)',
                      }}
                    >
                      <span>{name}</span>
                      <span>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- Booking ---------- */}
      <section
        id="booking"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr',
          minHeight: '92vh',
          background: '#ECE6DD',
        }}
      >
        <Reveal>
          <div style={{ padding: 'clamp(56px, 7vw, 110px) clamp(32px, 5vw, 90px)' }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(38px, 9vw, 96px)',
                margin: '0 0 clamp(36px, 8vw, 64px)',
                color: C.text,
              }}
            >
              Запись
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 44, maxWidth: 620 }}>
              <label style={{ display: 'grid', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5A4A3C' }}>
                  Имя
                </span>
                <input type="text" className={styles.field} />
              </label>
              <label style={{ display: 'grid', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5A4A3C' }}>
                  Телефон
                </span>
                <input type="tel" className={styles.field} />
              </label>
              <label style={{ display: 'grid', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5A4A3C' }}>
                  Услуга
                </span>
                <select className={styles.field} style={{ appearance: 'none' }} defaultValue="Косметология">
                  <option>Косметология</option>
                  <option>Инъекции</option>
                  <option>Массаж</option>
                  <option>Программы</option>
                  <option>Консультация</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5A4A3C' }}>
                  Дата
                </span>
                <input type="date" className={styles.field} />
              </label>
              <label style={{ display: 'grid', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5A4A3C' }}>
                  Сообщение
                </span>
                <input type="text" className={styles.field} />
              </label>
              <button
                type="submit"
                className={styles.submitBtn}
                style={{
                  marginTop: 18,
                  background: sent ? C.gold : C.text,
                  color: '#E8E6E3',
                  border: 'none',
                  padding: 22,
                  fontSize: 13,
                  letterSpacing: 6,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ami-sans), sans-serif',
                }}
              >
                {sent ? 'Заявка отправлена ✓' : 'Записаться'}
              </button>
            </form>
          </div>
        </Reveal>
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(165deg, #E8E2D8 0%, #DFD6C9 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            className={styles.floatA}
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(240px, 24vw, 400px)',
              height: 'clamp(240px, 24vw, 400px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(214,180,132,0.34) 0%, rgba(214,180,132,0) 70%)',
              filter: 'blur(30px)',
              animationDuration: '12s',
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(20px, 3vw, 56px)',
              padding: '0 clamp(28px, 4vw, 70px) 70px',
              fontSize: 12,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: C.text,
              lineHeight: 2.2,
            }}
          >
            {[
              { label: 'Адрес', value: <>ул. Пречистенка, 27/29<br />Москва, 119034</> },
              { label: 'Время работы', value: <>ПН — ПТ&nbsp;&nbsp;10:00 — 21:00<br />СБ — ВС&nbsp;&nbsp;11:00 — 19:00</> },
              { label: 'Телефон', value: <>+7 (495) 123 45 67</> },
            ].map((item) => (
              <div key={item.label} style={{ borderLeft: '1px solid rgba(44,33,25,0.35)', paddingLeft: 22 }}>
                <div style={{ color: 'rgba(44,33,25,0.6)' }}>{item.label}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer
        style={{
          background: '#E4DDD1',
          color: C.text,
          borderTop: '1px solid rgba(44,33,25,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          padding: '34px clamp(20px, 4vw, 56px)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 66, height: 66, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/ami-clinic/logo-footer.jpg`}
              alt="ÀМИ"
              style={{ width: '100%', height: '100%', display: 'block', transform: 'scale(1.22)', objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontSize: 11, letterSpacing: 3.5, textTransform: 'uppercase', lineHeight: 2 }}>
            Клиника эстетической
            <br />
            медицины ÀМИ
          </div>
        </div>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(44,33,25,0.55)' }}>
          Москва, ул. Пречистенка, 27/29
        </div>
        <div style={{ display: 'flex', gap: 36, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>
          <a href="#hero" className={styles.footerLink}>
            Наверх
          </a>
          <a href="#booking" className={styles.footerLink}>
            Записаться
          </a>
        </div>
      </footer>
    </>
  )
}
