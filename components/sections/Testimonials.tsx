'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

function Card({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-80 rounded-2xl p-6 relative"
      style={{ background:'#FFFFFF', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 2px 14px rgba(0,0,0,0.05)' }}>
      <div className="absolute top-5 right-5 w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background:'rgba(201,163,82,0.08)' }}>
        <Quote size={12} style={{ color:'#C9A352' }}/>
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length:t.rating }).map((_,i) => (
          <Star key={i} size={11} style={{ color:'#C9A352', fill:'#C9A352' }}/>
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-5 italic text-gray-600">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop:'1px solid #F1F5F9' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
          style={{ background:'linear-gradient(135deg,#8B6A20,#C9A352)' }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-gray-400">{t.city}</div>
        </div>
      </div>
      <div className="mt-3 px-2.5 py-1 rounded-lg text-xs font-medium w-fit"
        style={{ background:'rgba(201,163,82,0.06)', border:'1px solid rgba(201,163,82,0.15)', color:'#8B6A20' }}>
        {t.vehicle}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonios" style={{ background:'#F8FAFC', padding:'96px 0', overflow:'hidden' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit"><Star size={10}/>Lo que dicen nuestros clientes
          </motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily:'Syncopate,sans-serif', letterSpacing:'0.04em' }}>
            CLIENTES <span className="gold-text">SATISFECHOS</span>
          </motion.h2>
          <motion.p initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.14 }}
            className="text-gray-500 max-w-md mx-auto">
            Más de 500 familias dominicanas ya confían en RUARA AUTO SOLD.
          </motion.p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background:'linear-gradient(to right,#F8FAFC,transparent)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background:'linear-gradient(to left,#F8FAFC,transparent)' }}/>
        <div className="t-track" style={{ animation:'scrollLeft 50s linear infinite' }}>
          {doubled.map((t,i) => <Card key={i} t={t}/>)}
        </div>
      </div>
    </section>
  )
}
