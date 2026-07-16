'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFine || reduced) return

    const canvas = canvasRef.current
    const ring = ringRef.current
    if (!canvas || !ring) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: width / 2, y: height / 2 }
    const ringPos = { x: width / 2, y: height / 2 }
    const points: Dot[] = []
    const maxPoints = 18
    let hovering = false

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      points.push({ x: e.clientX, y: e.clientY })
      if (points.length > maxPoints) points.shift()
      const el = e.target as HTMLElement
      hovering = !!el.closest('a, button, [data-cursor-hover]')
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMove)

    let raf = 0
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      // trail line
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const alpha = (i / points.length) * 0.5
        const radius = (i / points.length) * 5 + 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(86, 204, 242, ${alpha})`
        ctx.fill()
      }

      // smooth follow ring
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      const scale = hovering ? 1.8 : 1
      ring.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0) scale(${scale})`
      ring.style.opacity = hovering ? '0.9' : '0.45'

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-primary/70 transition-[opacity] duration-200"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
