'use client'

import { useEffect, useRef, useState } from 'react'
// useState kept for mousePos
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ParticlesBackground from '@/components/ui/ParticlesBackground'

export default function Hero() {
  const heroRef  = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  /* ── Detect mobile on mount ──────────────────────────────── */
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 0)
  }, [])

  /* ── Framer Motion scroll — visual parallax only ──────── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const rawScale   = useTransform(scrollYProgress, [0, 1],   [1, 1.12])
  const rawOverlay = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.88])
  const bgScale    = useSpring(rawScale, { stiffness: 55, damping: 18 })

  /* ── VIDEO SCRUB — desktop only (RAF loop) ──────────────────
     On mobile, browsers block preload/seek → use autoplay instead.
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isMobile) return  // mobile uses autoplay — no scrub needed

    let rafId: number

    const loop = () => {
      const video = videoRef.current
      const hero  = heroRef.current

      if (video && hero && video.duration && !isNaN(video.duration)) {
        const heroTop  = hero.offsetTop
        const heroH    = hero.offsetHeight
        const scrollY  = window.scrollY
        const progress = Math.max(0, Math.min((scrollY - heroTop) / heroH, 1))
        const target   = progress * video.duration

        if (Math.abs(video.currentTime - target) > 0.033) {
          try { video.currentTime = target } catch (_) { /* not seekable yet */ }
        }
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile])

  /* ── Mouse parallax ──────────────────────────────────────── */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative w-full"
      style={{ height: isMobile ? '100dvh' : '380vh', background: '#05080F' }}
    >
      {/* Sticky wrapper — keeps everything pinned while section scrolls */}
      <div className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height: '100vh' }}>

      {/* ── Video — scrubbed frame-by-frame via scroll ────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale }}
      >
        {/* Fallback image (always visible, video fades over it) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {isMobile ? (
          /* Mobile — autoplay loop, no scrub */
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        ) : (
          /* Desktop — preload + RAF scrub */
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              v.pause()
              v.currentTime = 0
            }}
          >
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      {/* ── Dark overlay (intensifies on scroll) ─────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: rawOverlay,
          background: 'linear-gradient(180deg, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.30) 45%, rgba(5,8,15,0.72) 100%)',
        }}
      />

      {/* Fade into white at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)', zIndex: 4 }}
      />

      {/* ── Particles ──────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <ParticlesBackground />
      </div>

      {/* ── Mouse parallax depth ───────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
        animate={{ x: mousePos.x * -14, y: mousePos.y * -9 }}
        transition={{ type: 'spring', stiffness: 70, damping: 28 }}
      >
        <div className="absolute top-[28%] left-[22%] w-1 h-1 rounded-full"
          style={{ background: 'rgba(201,163,82,0.9)', boxShadow: '0 0 10px rgba(201,163,82,0.6)' }} />
        <div className="absolute top-[38%] right-[28%] w-0.5 h-0.5 rounded-full"
          style={{ background: 'rgba(245,223,160,1)' }} />
        <div className="absolute bottom-[38%] left-[38%] w-1.5 h-1.5 rounded-full"
          style={{ background: 'rgba(201,163,82,0.5)' }} />
      </motion.div>

      {/* Hero limpio — sin texto */}

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{ zIndex: 6, animation: 'chevBounce 2s ease-in-out infinite' }}
      >
        <button
          onClick={() => document.querySelector('#stats-bar')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
          <ChevronDown size={22} />
        </button>
      </div>

      </div>{/* end sticky */}
    </section>
  )
}
