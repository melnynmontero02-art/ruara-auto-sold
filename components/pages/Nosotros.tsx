'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Globe, Users, Zap, Heart, Star, MessageCircle, ChevronRight } from 'lucide-react'
import { WHATSAPP_URL, stats } from '@/lib/data'

const values = [
  { icon: <ShieldCheck size={24}/>, title: 'Confianza', desc: 'Transparencia total en cada proceso. Sin letra pequeña, sin sorpresas.' },
  { icon: <Globe size={24}/>, title: 'Importación directa', desc: 'Vehículos traídos directo de Japón y USA con documentación completa.' },
  { icon: <Zap size={24}/>, title: 'Rapidez', desc: 'Aprobación de financiamiento en menos de 24 horas. Proceso ágil.' },
  { icon: <Heart size={24}/>, title: 'Compromiso', desc: 'El vehículo correcto al mejor precio. Tu satisfacción es nuestra prioridad.' },
  { icon: <Users size={24}/>, title: 'Asesoría personal', desc: 'Un asesor dedicado te acompaña desde el primer contacto hasta la entrega.' },
  { icon: <Star size={24}/>, title: 'Calidad premium', desc: 'Solo vehículos inspeccionados y verificados entran a nuestro inventario.' },
]

export default function Nosotros() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--surface)', padding: 'clamp(60px,10vw,120px) 0' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,163,82,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}
            className="section-label mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--gold)' }}/>Nuestra historia
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:22 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7,delay:0.1 }}
            className="font-bold mb-6"
            style={{ fontFamily:'var(--font)', fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--text)', lineHeight:1.1 }}>
            Más de 5 años conectando<br/>familias con su{' '}
            <span className="gold-text">vehículo ideal</span>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.2 }}
            style={{ color:'var(--text-2)', fontSize:'clamp(1rem,2vw,1.15rem)', maxWidth:'600px', margin:'0 auto 2rem' }}>
            RUARA AUTO SOLD nació con una misión clara: hacer accesible la compra de un vehículo importado de calidad en República Dominicana, con financiamiento real y un proceso transparente.
          </motion.p>
          <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.3 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/inventario" className="btn-gold flex items-center gap-2">
              <ChevronRight size={16}/>Ver Inventario
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-glass flex items-center gap-2">
              <MessageCircle size={16}/>Escríbenos
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(40px,6vw,80px) 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0,y:16 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.1 }}
                className="text-center">
                <div className="font-bold gold-text mb-1"
                  style={{ fontFamily:'var(--font)', fontSize:'clamp(2rem,4vw,3rem)' }}>
                  {s.value}{s.suffix}
                </div>
                <div className="text-sm" style={{ color:'var(--text-2)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(60px,8vw,100px) 0' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity:0, x:-24 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7 }}>
              <div className="section-label mb-5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--gold)' }}/>Quiénes somos
              </div>
              <h2 className="font-bold mb-5"
                style={{ fontFamily:'var(--font)', fontSize:'clamp(1.5rem,3vw,2.5rem)', color:'var(--text)', lineHeight:1.2 }}>
                Un dealer que <span className="gold-text">se diferencia</span> por su honestidad
              </h2>
              <p className="mb-4" style={{ color:'var(--text-2)', lineHeight:1.75 }}>
                Somos un dealer especializado en la importación y venta de vehículos japoneses y americanos en República Dominicana. Desde nuestro local en Santo Domingo Este, hemos ayudado a más de 500 familias a encontrar el vehículo de sus sueños.
              </p>
              <p className="mb-6" style={{ color:'var(--text-2)', lineHeight:1.75 }}>
                Lo que nos diferencia es simple: cada vehículo pasa por una inspección rigurosa antes de ser ofrecido al cliente, y trabajamos con más de 8 bancos para garantizarte las mejores condiciones de financiamiento.
              </p>
              <div className="flex flex-col gap-3">
                {['Importación directa desde Japón y USA', 'Inspección mecánica y documentación verificada', '8+ bancos aliados para financiamiento', 'Respuesta en menos de 24 horas'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background:'rgba(201,163,82,0.12)', border:'1px solid rgba(201,163,82,0.3)' }}>
                      <ShieldCheck size={11} style={{ color:'var(--gold)' }}/>
                    </div>
                    <span style={{ color:'var(--text-2)', fontSize:'0.95rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity:0, x:24 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay:0.1 }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio:'4/3', background:'var(--card)' }}>
                <Image src="/images/cars/car-01.jpg" alt="RUARA AUTO SOLD" fill className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero-banner.jpg' }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.4) 100%)' }}/>
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-xl p-4"
                  style={{ background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', border:'1px solid rgba(201,163,82,0.2)' }}>
                  <div className="font-bold mb-0.5 gold-text" style={{ fontFamily:'var(--font)', fontSize:'1.1rem' }}>RUARA AUTO SOLD</div>
                  <div className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Calle Las Palmeras Orientales #1, Santo Domingo Este</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section ref={ref} style={{ background:'var(--bg)', padding:'clamp(60px,8vw,100px) 0' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
              className="section-label mb-5 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--gold)' }}/>Nuestros valores
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.1 }}
              className="font-bold"
              style={{ fontFamily:'var(--font)', fontSize:'clamp(1.5rem,3vw,2.5rem)', color:'var(--text)' }}>
              Lo que nos <span className="gold-text">define</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:0.6, delay:i*0.08 }}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,163,82,0.25)'; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:'rgba(201,163,82,0.08)', border:'1px solid rgba(201,163,82,0.15)', color:'var(--gold)' }}>
                  {v.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily:'var(--font)', color:'var(--text)', fontSize:'1.05rem' }}>{v.title}</h3>
                <p style={{ color:'var(--text-2)', fontSize:'0.9rem', lineHeight:1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ background:'var(--surface)', padding:'clamp(50px,7vw,90px) 0' }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-bold mb-4" style={{ fontFamily:'var(--font)', fontSize:'clamp(1.5rem,3vw,2rem)', color:'var(--text)' }}>
            ¿Listo para encontrar tu vehículo?
          </h2>
          <p className="mb-8" style={{ color:'var(--text-2)' }}>
            Visítanos en Santo Domingo Este o escríbenos por WhatsApp. Estamos disponibles para ayudarte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/inventario" className="btn-gold flex items-center gap-2 py-4 px-8">
              Ver Inventario
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="btn-glass flex items-center gap-2 py-4 px-8">
              <MessageCircle size={16}/>WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
