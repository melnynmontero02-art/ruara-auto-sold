'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    title:'Financiamiento Flexible', desc:'De 12 a 84 meses, inicial desde 10%. Adaptamos el plan a tu presupuesto.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l9-18 9 18"/><path d="M7.5 15h9"/></svg>,
    title:'Múltiples Bancos', desc:'Trabajamos con 8+ instituciones para encontrar la mejor tasa para ti.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title:'Importados de Origen', desc:'Directamente de Japón y USA. Calidad garantizada desde el origen.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title:'Aprobación Rápida', desc:'Pre-aprobación en menos de 24 horas. Proceso ágil y transparente.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    title:'Asesoría Personal', desc:'Un asesor dedicado te guía en todo el proceso sin complicaciones.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title:'Garantía en Papeles', desc:'Documentación 100% legal. Todos los trámites de importación incluidos.' },
]

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="beneficios" style={{ background:'#FFFFFF', padding:'96px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:'#C9A352' }}/>La diferencia RUARA
          </motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily:'Syncopate,sans-serif', letterSpacing:'0.04em' }}>
            ¿POR QUÉ <span className="gold-text">RUARA?</span>
          </motion.h2>
          <motion.p initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.14 }}
            className="text-gray-500 max-w-lg mx-auto">
            Más de 5 años siendo el dealer de confianza en la República Dominicana.
          </motion.p>
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.6, delay:i*0.07, ease:[0.16,1,0.3,1] }}
              className="benefit-card group rounded-2xl p-7 transition-all duration-350 cursor-default"
              style={{ background:'#FFFFFF', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.10), 0 0 0 2px rgba(201,163,82,0.2)'
                e.currentTarget.style.transform='translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'
                e.currentTarget.style.transform='translateY(0)'
              }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background:'rgba(201,163,82,0.08)', border:'1px solid rgba(201,163,82,0.18)', color:'#C9A352' }}>
                {b.icon}
              </div>
              <h3 className="font-bold mb-2 text-gray-900"
                style={{ fontFamily:'Syncopate,sans-serif', fontSize:'0.75rem', letterSpacing:'0.07em' }}>
                {b.title.toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{b.desc}</p>
              <div className="mt-5 h-px w-0 group-hover:w-10 transition-all duration-500 rounded"
                style={{ background:'linear-gradient(90deg,#C9A352,transparent)' }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
