'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, MessageCircle, Instagram } from 'lucide-react'
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/data'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
  { label: 'Inicio',         href: '/' },
  { label: 'Inventario',     href: '/inventario' },
  { label: 'Financiamiento', href: '/financiamiento' },
  { label: 'Vende tu auto',  href: '/vende' },
  { label: 'Contacto',       href: '/contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: 'var(--bg)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          padding: '8px 0',
        } : {
          background: 'transparent',
          padding: '18px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo — dark: glowing, light: black text */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png"       alt="RUARA AUTO SOLD" width={120} height={48} className="object-contain logo-dark"  priority />
            <Image src="/images/logo-light.png" alt="RUARA AUTO SOLD" width={120} height={48} className="object-contain logo-light" priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.label} href={l.href}
                className="text-sm font-medium transition-colors duration-300 relative group"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: '#C9A352' }} />
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              aria-label="Instagram"
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A352'; e.currentTarget.style.borderColor = 'rgba(201,163,82,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <Instagram size={15} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="btn-gold text-xs py-2.5 px-5">
              <MessageCircle size={13} />WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" style={{ color:'var(--text)' }} aria-label="Menú">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ background: 'var(--bg)', backdropFilter: 'blur(24px)' }}>
            <div className="flex justify-between items-center px-6 py-5"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <Link href="/" onClick={() => setOpen(false)}>
                <Image src="/images/logo.png"       alt="RUARA AUTO SOLD" width={100} height={40} className="object-contain logo-dark" />
                <Image src="/images/logo-light.png" alt="RUARA AUTO SOLD" width={100} height={40} className="object-contain logo-light" />
              </Link>
              <button onClick={() => setOpen(false)} style={{ color:'var(--text-2)' }} className="hover:opacity-100 opacity-70"><X size={20} /></button>
            </div>
            <div className="flex flex-col px-6 pt-8 gap-1">
              {links.map((l, i) => (
                <motion.div key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <Link href={l.href} onClick={() => setOpen(false)}
                    className="block py-4 text-xl font-bold transition-colors"
                    style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.06em', borderBottom:'1px solid var(--border)', color:'var(--text-2)' }}>
                    {l.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: links.length*0.07+0.1 }} className="mt-8 flex gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                  style={{ background:'var(--card-hover)', border:'1px solid var(--border)', color:'#fff' }}>
                  <Instagram size={16} />Instagram
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-gold flex-1 flex items-center justify-center gap-2 py-3">
                  <MessageCircle size={16} />WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
