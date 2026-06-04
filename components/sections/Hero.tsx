'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, MessageCircle, Car } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative w-full overflow-hidden flex items-end md:items-center"
      style={{ minHeight: '100dvh', background: '#05080F' }}
    >
      {/* ── Hero image — next/image with responsive focal point ── */}
      <div className="absolute inset-0">
        {/* Desktop image (landscape) */}
        <Image
          src="/images/hero-banner.jpg"
          alt="RUARA AUTO SOLD — Vehículos premium"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover hidden md:block"
          style={{ objectPosition: 'center center' }}
        />

        {/* Mobile image — same file, different focal point */}
        <Image
          src="/images/hero-banner.jpg"
          alt="RUARA AUTO SOLD"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover block md:hidden"
          style={{
            objectPosition: '75% center', /* show the car (right side of image) */
          }}
        />
      </div>

      {/* ── Overlay — mobile: bottom-heavy, desktop: left-side ── */}
      <div
        className="absolute inset-0"
        style={{
          background: isMobile
            ? 'linear-gradient(180deg, rgba(5,8,15,0.25) 0%, rgba(5,8,15,0.5) 45%, rgba(5,8,15,0.92) 100%)'
            : 'linear-gradient(90deg, rgba(5,8,15,0.82) 0%, rgba(5,8,15,0.5) 55%, rgba(5,8,15,0.1) 100%)',
        }}
      />

      {/* ── Bottom fade to page background ───────────────── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '120px', background: 'linear-gradient(to bottom, transparent, var(--bg))', zIndex: 2 }} />

      {/* ── Content ──────────────────────────────────────── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-16"
        style={{
          zIndex: 3,
          paddingBottom: isMobile ? '100px' : '60px',
          paddingTop: isMobile ? '110px' : '0',
        }}
      >
        {/* On mobile: content takes only the left ~60% so car stays visible */}
        <div
          style={{
            maxWidth: isMobile ? '100%' : '520px',
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label mb-5 w-fit"
            style={{ background: 'rgba(201,163,82,0.1)', borderColor: 'rgba(201,163,82,0.35)', color: '#C9A352' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A352' }} />
            Dealer Premium · Santo Domingo
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 4.5rem)',
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            CALIDAD QUE<br />
            SE SIENTE,{' '}
            <span className="gold-text">CONFIANZA</span>
            <br />QUE TE ACOMPAÑA.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(0.875rem, 2vw, 1.05rem)',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
              maxWidth: '440px',
            }}
          >
            Vehículos importados con{' '}
            <span style={{ color: '#C9A352', fontWeight: 600 }}>financiamiento flexible</span>
            {' '}y aprobación rápida en República Dominicana.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
            className="flex gap-3 flex-wrap"
          >
            <Link href="/inventario" className="btn-gold flex items-center gap-2"
              style={{ flex: isMobile ? '1 1 auto' : 'none' }}>
              <Car size={16} />Ver Inventario
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="btn-glass flex items-center gap-2"
              style={{ flex: isMobile ? '1 1 auto' : 'none' }}>
              <MessageCircle size={16} />WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex gap-6 mt-7 flex-wrap"
          >
            {[
              { v: '500+', l: 'Vendidos' },
              { v: '8+',   l: 'Bancos' },
              { v: '98%',  l: 'Aprobaciones' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily:'var(--font)', fontWeight:700, fontSize:'clamp(1.2rem,3vw,1.6rem)', color:'#C9A352' }}>
                  {s.v}
                </div>
                <div style={{ fontSize:'clamp(0.65rem,1.2vw,0.75rem)', color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator (desktop only) ──────────────── */}
      <div
        className="absolute bottom-8 left-1/2 hidden md:flex"
        style={{ zIndex: 4, animation: 'chevBounce 2s ease-in-out infinite', transform: 'translateX(-50%)' }}
      >
        <button
          onClick={() => document.querySelector('#stats-bar')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
          <ChevronDown size={18} />
        </button>
      </div>
    </section>
  )
}
