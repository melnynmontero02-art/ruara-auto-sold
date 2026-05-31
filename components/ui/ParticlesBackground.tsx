'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  opacity: number; opacityDir: number
  r: number; g: number; b: number
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const palette = [
      { r: 201, g: 163, b: 82 },  // gold
      { r: 245, g: 223, b: 160 }, // gold light
      { r: 255, g: 255, b: 255 }, // white
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const create = () => {
      particles = Array.from({ length: 28 }, () => {
        const c = palette[Math.floor(Math.random() * palette.length)]
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.35 - 0.05,
          size: Math.random() * 1.5 + 0.4,
          opacity: Math.random() * 0.5 + 0.1,
          opacityDir: Math.random() > 0.5 ? 1 : -1,
          ...c,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.opacityDir * 0.004
        if (p.opacity >= 0.65) p.opacityDir = -1
        if (p.opacity <= 0.05) p.opacityDir = 1
        if (p.y < -6) { p.y = canvas.height + 6; p.x = Math.random() * canvas.width }
        if (p.x < -6) p.x = canvas.width + 6
        if (p.x > canvas.width + 6) p.x = -6

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    create()
    draw()

    window.addEventListener('resize', () => { resize(); create() })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
