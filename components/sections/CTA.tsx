'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Calculator, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

export default function CTA() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  return (
    <section id="cta-section" style={{ background:'var(--bg)', padding:'clamp(48px, 8vw, 96px) 0', position:'relative', overflow:'hidden' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 70% 60% at 50% 50%, var(--tint) 0%, transparent 70%)' }}/>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:'linear-gradient(90deg,transparent,var(--border),transparent)' }}/>

      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
          className="section-label mb-6 mx-auto w-fit">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--text)' }}/>Tu vehículo te espera
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em' }}>
          ¿LISTO PARA <span className="text-accent">CONDUCIR?</span>
        </motion.h2>
        <motion.p initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.14 }}
          className="text-lg mb-10 max-w-xl mx-auto" style={{ color:'var(--text-2)' }}>
          Escríbenos y un asesor te ayudará a encontrar el vehículo perfecto con el mejor plan de financiamiento.
        </motion.p>
        <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.2 }}
          className="flex flex-col gap-4 items-center justify-center w-full px-4 sm:flex-row sm:px-0">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 min-w-[230px] justify-center py-4 text-sm">
            <MessageCircle size={16}/>Escribir por WhatsApp<ArrowRight size={14}/>
          </a>
          <button onClick={()=>document.querySelector('#financiamiento')?.scrollIntoView({behavior:'smooth'})}
            className="btn-glass flex items-center gap-2 min-w-[230px] justify-center py-4 text-sm">
            <Calculator size={16}/>Calcular Cuota
          </button>
        </motion.div>
      </div>
    </section>
  )
}
