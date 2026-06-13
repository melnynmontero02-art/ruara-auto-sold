'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram, ArrowUpRight } from 'lucide-react'
import { INSTAGRAM_URL } from '@/lib/data'

export default function InstagramBanner() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background:'var(--surface)', padding:'clamp(40px, 7vw, 80px) 0' }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div ref={ref}
          initial={{ opacity:0, y:24 }}
          animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl p-8 md:p-10 transition-all duration-400"
            style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}
            onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(148,163,184,0.2)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='var(--text-3)' }}
            onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='var(--border)' }}>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background:'linear-gradient(135deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888)', boxShadow:'0 8px 24px rgba(220,39,67,0.35)' }}>
                <Instagram size={28} color="#FFFFFF"/>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ color:'var(--text-2)' }}>Síguenos en Instagram</div>
                <div className="font-bold text-2xl leading-tight"
                  style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.06em' }}>@ruaraautosold</div>
                <div className="mt-1 text-sm" style={{ color:'var(--text-2)' }}>Nuevos vehículos · Ofertas · Entregas</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide flex-shrink-0 transition-all duration-300"
              style={{ background:'var(--tint)', border:'1px solid var(--tint-border)', color:'var(--text)' }}>
              Ver perfil
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"/>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
