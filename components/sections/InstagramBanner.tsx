'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram, ArrowUpRight } from 'lucide-react'
import { INSTAGRAM_URL } from '@/lib/data'

export default function InstagramBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl p-8 md:p-10 transition-all duration-400"
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              border: '1px solid rgba(201,163,82,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,163,82,0.3)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              {/* Instagram icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  boxShadow: '0 8px 24px rgba(220,39,67,0.35)',
                }}
              >
                <Instagram size={28} color="#FFFFFF" />
              </div>

              <div>
                <div className="text-white/50 text-xs tracking-widest uppercase mb-1">Síguenos en</div>
                <div
                  className="text-white font-bold text-2xl leading-tight"
                  style={{ fontFamily: 'Syncopate, sans-serif', letterSpacing: '0.06em' }}
                >
                  @ruaraautosold
                </div>
                <div className="text-white/40 text-sm mt-1">
                  Nuevos vehículos · Ofertas · Entregas
                </div>
              </div>
            </div>

            {/* Right */}
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex-shrink-0"
              style={{
                background: 'rgba(201,163,82,0.1)',
                border: '1px solid rgba(201,163,82,0.25)',
                color: '#C9A352',
              }}
            >
              Ver perfil
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
