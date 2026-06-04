'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, INSTAGRAM_URL, BUSINESS_ADDRESS } from '@/lib/data'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const columns = [
  {
    heading: 'Navegación',
    links: [
      { text: 'Inicio',         url: '/' },
      { text: 'Inventario',     url: '/inventario' },
      { text: 'Financiamiento', url: '/financiamiento' },
      { text: 'Vende tu auto',  url: '/vende' },
      { text: 'Contacto',       url: '/contacto' },
    ],
  },
  {
    heading: 'Servicios',
    links: [
      { text: 'Vehículos Verificados', url: '/#verificados' },
      { text: 'Galería',               url: '/#galeria' },
      { text: 'Testimonios',           url: '/#testimonios' },
      { text: 'Calculadora',           url: '/financiamiento' },
    ],
  },
  {
    heading: 'Contacto',
    links: [
      { text: 'WhatsApp',       url: WHATSAPP_URL },
      { text: 'Instagram',      url: INSTAGRAM_URL },
      { text: 'Santo Domingo Este', url: '#' },
    ],
  },
]

const legalLinks = [
  { text: 'Política de privacidad', url: '#' },
  { text: 'Términos',               url: '#' },
]

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden select-none"
      style={{ background: 'var(--bg)' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,163,82,0.4),transparent)' }}/>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 px-8 pt-16 pb-10 md:px-16 md:pt-16"
      >
        {/* Tagline */}
        <motion.p variants={itemVariants}
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-10"
          style={{ color: 'var(--gold)' }}>
          Conduce tus Sueños.
        </motion.p>

        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start">
          {/* Columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-3 md:gap-x-20">
            {columns.map((col, ci) => (
              <motion.div key={ci} variants={itemVariants}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                  style={{ color: 'var(--text-3)' }}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <Link href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: 'var(--text-2)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="md:text-right">
            <p className="text-[11px] font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--text-3)' }}>
              Síguenos
            </p>
            <div className="flex items-center gap-3 md:justify-end">
              {[
                { href: INSTAGRAM_URL, icon: <Instagram size={15}/>, label: 'Instagram' },
                { href: WHATSAPP_URL,  icon: <MessageCircle size={15}/>, label: 'WhatsApp' },
                { href: 'https://facebook.com', icon: <Facebook size={15}/>, label: 'Facebook' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201,163,82,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(201,163,82,0.4)'
                    e.currentTarget.style.color = 'var(--gold)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--card-bg)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-2)'
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Address */}
            <p className="mt-6 text-xs leading-relaxed max-w-[220px] md:ml-auto"
              style={{ color: 'var(--text-3)' }}>
              {BUSINESS_ADDRESS}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants}
          className="mt-12"
          style={{ borderTop: '1px solid var(--border)' }}/>

        {/* Bottom bar */}
        <motion.div variants={itemVariants}
          className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © 2025 RUARA AUTO SOLD. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l, i) => (
              <a key={i} href={l.url}
                className="text-xs transition-colors duration-200"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {l.text}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Giant faded brand name ── */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="pointer-events-none text-center font-bold"
        style={{
          fontSize: 'clamp(4rem, 18vw, 16rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginTop: '-1rem',
          paddingBottom: '0.5rem',
          /* Gradient fades from slightly visible → fully transparent */
          background: 'linear-gradient(to bottom, var(--text-3) 0%, transparent 80%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Century Gothic, CenturyGothic, Josefin Sans, sans-serif',
        }}
      >
        RUARA
      </motion.p>
    </footer>
  )
}
