'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, FileSearch, Wrench, Car, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

const checks = [
  { icon: <FileSearch size={22}/>, title: 'Historial Verificado', desc: 'Revisamos el historial completo del vehículo antes de comprarlo.' },
  { icon: <Wrench size={22}/>, title: 'Inspección Mecánica', desc: 'Motor, transmisión, frenos y suspensión inspeccionados por técnicos.' },
  { icon: <ShieldCheck size={22}/>, title: 'Documentación Legal', desc: 'Todos los papeles en orden: título limpio, sin gravámenes.' },
  { icon: <Car size={22}/>, title: 'Prueba de Manejo', desc: 'Coordinamos tu test drive antes de cerrar cualquier trato.' },
]

export default function VerifiedVehicles() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="verificados" style={{ background: 'var(--surface)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,163,82,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={ref}>
            <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
              className="section-label mb-5 w-fit">
              <ShieldCheck size={10}/>Garantía de calidad
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em', lineHeight:1.2 }}>
              VEHÍCULOS<br/><span className="gold-text">VERIFICADOS</span>
            </motion.h2>
            <motion.p initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.14 }}
              className="text-lg leading-relaxed mb-8" style={{ color:'var(--text-2)' }}>
              Cada vehículo en RUARA pasa por un proceso de verificación riguroso antes de llegar a nuestro inventario. Tu tranquilidad es nuestra prioridad.
            </motion.p>
            <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.2 }}
              className="btn-gold inline-flex">
              <MessageCircle size={15}/>Preguntar por un vehículo
            </motion.a>
          </div>

          {/* Right — checklist grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checks.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:0.6, delay:0.1+i*0.1, ease:[0.16,1,0.3,1] }}
                className="rounded-2xl p-5 group transition-all duration-350"
                style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(201,163,82,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(201,163,82,0.2)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:'rgba(201,163,82,0.08)', border:'1px solid rgba(201,163,82,0.15)', color:'#C9A352' }}>
                  {c.icon}
                </div>
                <h3 className="font-bold mb-2"
                  style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', fontSize:'1rem', letterSpacing:'0.06em', color:'var(--text)' }}>
                  {c.title.toUpperCase()}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
