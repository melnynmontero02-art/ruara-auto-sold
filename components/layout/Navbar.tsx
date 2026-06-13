'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageCircle, Instagram } from 'lucide-react'
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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-full px-4 backdrop-blur-2xl md:h-[80px] md:px-6"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px var(--shadow)',
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex shrink-0 items-center" aria-label="RUARA AUTO SOLD - Inicio">
            <Image
              src="/images/logo.png"
              alt="RUARA AUTO SOLD"
              width={140}
              height={140}
              priority
              className="logo-dark h-12 w-auto md:h-16"
            />
            <Image
              src="/images/logo-light.png"
              alt="RUARA AUTO SOLD"
              width={140}
              height={140}
              priority
              className="logo-light h-12 w-auto md:h-16"
            />
          </Link>

          {/* Center nav — cápsula glass (desktop) */}
          <div
            className="hidden items-center gap-1 rounded-full p-1 lg:flex"
            style={{ background: 'var(--tint)', border: '1px solid var(--tint-border)' }}
          >
            {links.map(l => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                  style={active
                    ? { background: 'var(--tint-strong)', color: 'var(--text)' }
                    : { color: 'var(--text-2)' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)' }}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div
              className="hidden items-center gap-3 rounded-full px-3 py-2 md:flex"
              style={{ background: 'var(--tint)', border: '1px solid var(--tint-border)' }}
            >
              <ThemeToggle />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center transition-colors duration-200"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                <Instagram size={16} />
              </a>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] md:px-5 md:text-sm"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Hamburger — mobile/tablet */}
            <button
              type="button"
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden"
              style={{ background: 'var(--tint)', border: '1px solid var(--tint-border)', color: 'var(--text)' }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile glass panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-3 right-3 top-[80px] z-50 overflow-hidden rounded-3xl backdrop-blur-2xl sm:left-4 sm:right-4 sm:top-[92px] lg:hidden"
            style={{ background: 'var(--glass-bg-strong)', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px var(--shadow)' }}
          >
            <nav className="flex flex-col p-3">
              {links.map((l, i) => {
                const active = isActive(l.href)
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      onClick={closeMenu}
                      className="block rounded-2xl px-4 py-3.5 text-base font-medium tracking-wide transition-colors duration-200"
                      style={active
                        ? { background: 'var(--tint-strong)', color: 'var(--text)' }
                        : { color: 'var(--text-2)' }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
                  style={{ background: 'var(--tint)', border: '1px solid var(--tint-border)', color: 'var(--text-2)' }}
                >
                  <Instagram size={15} />
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
              >
                <MessageCircle size={15} />WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
