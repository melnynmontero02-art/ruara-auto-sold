'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/data'
import { Instagram } from 'lucide-react'

const links = [
  { label: 'Inicio',         href: '#inicio' },
  { label: 'Inventario',     href: '#inventario' },
  { label: 'Financiamiento', href: '#financiamiento' },
  { label: 'Nosotros',       href: '#beneficios' },
  { label: 'Contacto',       href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background:   '#FFFFFF',
          boxShadow:    '0 2px 20px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding:      '10px 0',
        } : {
          background: 'transparent',
          padding:    '22px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => go('#inicio')} className="flex flex-col leading-none">
            <span style={{
              fontFamily:   'Syncopate, sans-serif',
              fontSize:     '1.15rem',
              fontWeight:   700,
              letterSpacing:'0.18em',
              color:        scrolled ? '#0F172A' : '#FFFFFF',
            }}>
              RUARA
            </span>
            <span style={{
              fontSize:     '8px',
              letterSpacing:'0.32em',
              color:        '#C9A352',
              fontWeight:   600,
              textTransform:'uppercase',
              marginTop:    '2px',
            }}>
              AUTO SOLD
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-9">
            {links.map(l => (
              <button
                key={l.label}
                onClick={() => go(l.href)}
                className="text-sm font-medium relative group transition-colors duration-300"
                style={{ color: scrolled ? '#374151' : 'rgba(255,255,255,0.85)' }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#0F172A' : '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#374151' : 'rgba(255,255,255,0.85)')}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ruara-gold transition-all duration-300 group-hover:w-full"
                  style={{ background: '#C9A352' }} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                color: scrolled ? '#0F172A' : '#FFFFFF',
                border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.2)',
              }}
              aria-label="Instagram RUARA AUTO SOLD"
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,163,82,0.12)'; e.currentTarget.style.color = '#C9A352'; e.currentTarget.style.borderColor = 'rgba(201,163,82,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = scrolled ? '#0F172A' : '#FFFFFF'; e.currentTarget.style.borderColor = scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.2)' }}
            >
              <Instagram size={15} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs py-2.5 px-5"
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ background: 'rgba(6,7,9,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex justify-between items-center px-6 py-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily:'Syncopate,sans-serif', fontWeight:700, letterSpacing:'0.18em', color:'#FFFFFF' }}>
                RUARA
              </span>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-8 gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => go(l.href)}
                  className="text-left py-4 text-2xl font-bold text-white/70 hover:text-white transition-colors"
                  style={{ fontFamily: 'Syncopate,sans-serif', letterSpacing:'0.08em',
                    borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {l.label.toUpperCase()}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: links.length * 0.07 + 0.1 }}
                className="mt-8"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-4">
                  <MessageCircle size={16} />
                  Escríbenos por WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
