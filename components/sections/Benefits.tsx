'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>, title:'Financiamiento Flexible', desc:'12 a 84 meses, inicial desde 10%. Adaptado a tu presupuesto.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l9-18 9 18"/><path d="M7.5 15h9"/></svg>, title:'8+ Bancos Aliados', desc:'Encontramos la mejor tasa para tu perfil crediticio.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title:'Importados de Origen', desc:'Japón y USA. Calidad garantizada desde el país de origen.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title:'Aprobación en 24h', desc:'Proceso ágil y transparente. Sin burocracia innecesaria.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title:'Asesoría Personal', desc:'Un asesor dedicado te acompaña de principio a fin.' },
  { icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Garantía en Papeles', desc:'Documentación 100% legal. Trámites de importación incluidos.' },
]

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="beneficios" style={{ background:'var(--bg)', padding:'clamp(48px, 8vw, 96px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--text)' }}/>La diferencia RUARA
          </motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em', color:'var(--text)' }}>
            ¿POR QUÉ <span className="text-accent">RUARA?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity:0,y:24 }}
              whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.6,delay:i*0.07,ease:[0.16,1,0.3,1] }}
              className="rounded-2xl p-6 group transition-all duration-350 cursor-default"
              style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--card-hover)'; e.currentTarget.style.borderColor='var(--text-3)'; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background:'var(--tint)', border:'1px solid var(--tint-border)', color:'var(--text)' }}>
                {b.icon}
              </div>
              <h3 className="font-bold mb-2"
                style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', fontSize:'1rem', letterSpacing:'0.07em', color:'var(--text)' }}>
                {b.title.toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
