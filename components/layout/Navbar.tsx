'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Instagram, X, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/data'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
  { label: 'Inicio',         href: '/' },
  { label: 'Inventario',     href: '/inventario' },
  { label: 'Servicios',      href: '/servicios' },
  { label: 'Nosotros',       href: '/nosotros' },
  { label: 'Vende tu auto',  href: '/vende' },
  { label: 'Contacto',       href: '/contacto' },
]

/* ─── Hamburger icon ────────────────────────────────────── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      className="lg:hidden relative flex flex-col justify-center items-center"
      style={{ width: '44px', height: '44px', gap: '5px' }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-6 h-0.5 rounded-full"
        style={{ background: 'var(--text)', transformOrigin: 'center' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-6 h-0.5 rounded-full"
        style={{ background: 'var(--text)' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-6 h-0.5 rounded-full"
        style={{ background: 'var(--text)', transformOrigin: 'center' }}
      />
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={scrolled ? {
          background: 'var(--bg)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          padding: '8px 0',
        } : {
          background: 'transparent',
          padding: '16px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png"       alt="RUARA AUTO SOLD" width={110} height={44} className="object-contain logo-dark"  priority />
            <Image src="/images/logo-light.png" alt="RUARA AUTO SOLD" width={110} height={44} className="object-contain logo-light" priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map(l => (
              <Link key={l.label} href={l.href}
                className="text-sm font-semibold transition-colors duration-200 relative group"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: 'var(--gold)' }} />
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              aria-label="Instagram"
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(201,163,82,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <Instagram size={16} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs py-2.5 px-5">
              <MessageCircle size={14} />WhatsApp
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Hamburger open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </motion.nav>

      {/* ── Premium Fullscreen Mobile Menu ───────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
              onClick={() => setOpen(false)}
            />

            {/* Menu panel — slides from right */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
              style={{
                width: 'min(85vw, 360px)',
                background: 'var(--bg)',
                borderLeft: '1px solid var(--border)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <Link href="/" onClick={() => setOpen(false)}>
                  <Image src="/images/logo.png"       alt="RUARA" width={90} height={36} className="object-contain logo-dark" />
                  <Image src="/images/logo-light.png" alt="RUARA" width={90} height={36} className="object-contain logo-light" />
                </Link>
                <button onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
                {links.map((l, i) => (
                  <motion.div key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}>
                    <Link href={l.href} onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group"
                      style={{ color: 'var(--text)', border: '1px solid transparent' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--card-bg)'
                        e.currentTarget.style.borderColor = 'var(--border)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'transparent'
                      }}>
                      <span className="font-bold text-lg" style={{ fontFamily: 'var(--font)', letterSpacing: '0.04em' }}>
                        {l.label}
                      </span>
                      <ArrowRight size={16} style={{ color: 'var(--gold)', opacity: 0.7 }} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="px-5 pb-8 pt-4 flex flex-col gap-3"
                style={{ borderTop: '1px solid var(--border)' }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-4"
                  onClick={() => setOpen(false)}>
                  <MessageCircle size={18} />Escríbenos por WhatsApp
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-glass w-full flex items-center justify-center gap-2 py-3"
                  onClick={() => setOpen(false)}>
                  <Instagram size={16} />@ruaraautosold
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
