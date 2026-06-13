'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  CreditCard, ShieldCheck, Car, Globe, Users, Calculator,
  MessageCircle, ArrowRight, CheckCircle,
} from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

const services = [
  {
    icon: <CreditCard size={28}/>,
    title: 'Financiamiento Flexible',
    desc: 'Trabajamos con más de 8 bancos e instituciones financieras para encontrar el plan ideal para ti. Plazos de 12 a 84 meses, inicial desde el 10%.',
    link: '/financiamiento',
    linkLabel: 'Calcular mi cuota',
    perks: ['Aprobación en 24h', 'Múltiples bancos', 'Inicial flexible', 'Sin burocracia'],
  },
  {
    icon: <ShieldCheck size={28}/>,
    title: 'Vehículos Verificados',
    desc: 'Cada unidad pasa por un proceso de inspección riguroso antes de entrar a nuestro inventario. Motor, transmisión, frenos, historial y documentación.',
    link: '/inventario',
    linkLabel: 'Ver inventario',
    perks: ['Inspección mecánica', 'Historial verificado', 'Papeles legales', 'Sin sorpresas'],
  },
  {
    icon: <Car size={28}/>,
    title: 'Vende tu Vehículo',
    desc: 'Compramos tu vehículo al mejor precio del mercado. Proceso rápido, sin complicaciones y con pago garantizado. Solo completa el formulario.',
    link: '/vende',
    linkLabel: 'Vender mi vehículo',
    perks: ['Mejor precio', 'Proceso rápido', 'Pago garantizado', 'Sin intermediarios'],
  },
  {
    icon: <Globe size={28}/>,
    title: 'Importación Directa',
    desc: 'Conseguimos el vehículo exacto que buscas directamente desde Japón o Estados Unidos. Tú eliges las especificaciones, nosotros lo traemos.',
    link: null,
    linkLabel: 'Solicitar importación',
    perks: ['Japón y USA', 'Especificaciones a pedido', 'Documentación completa', 'Precios competitivos'],
  },
  {
    icon: <Users size={28}/>,
    title: 'Asesoría Personalizada',
    desc: 'Un asesor dedicado te guía en todo el proceso: desde elegir el vehículo correcto hasta completar el financiamiento. Sin presión, a tu ritmo.',
    link: null,
    linkLabel: 'Hablar con un asesor',
    perks: ['Asesor dedicado', 'Sin presión de venta', 'Respuesta rápida', 'Atención personalizada'],
  },
  {
    icon: <Calculator size={28}/>,
    title: 'Simulador de Financiamiento',
    desc: 'Calcula tu cuota mensual en tiempo real antes de comprometerte. Ajusta precio, inicial y plazo para encontrar el plan que se adapte a tu presupuesto.',
    link: '/financiamiento',
    linkLabel: 'Ir al simulador',
    perks: ['Cálculo en tiempo real', 'Múltiples escenarios', 'Sin registro', 'Gratis'],
  },
]

export default function Servicios() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background:'var(--surface)', padding:'clamp(60px,10vw,120px) 0' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 70% 60% at 50% 50%, var(--tint) 0%, transparent 70%)' }}/>
        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}
            className="section-label mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--text)' }}/>Todo lo que necesitas
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:22 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7,delay:0.1 }}
            className="font-bold mb-5"
            style={{ fontFamily:'var(--font)', fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--text)', lineHeight:1.1 }}>
            Nuestros <span className="text-accent">Servicios</span>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.2 }}
            style={{ color:'var(--text-2)', fontSize:'clamp(1rem,2vw,1.1rem)', maxWidth:'500px', margin:'0 auto' }}>
            Desde la búsqueda del vehículo perfecto hasta el financiamiento y la entrega. RUARA lo hace todo.
          </motion.p>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────── */}
      <section ref={ref} style={{ background:'var(--bg)', padding:'clamp(60px,8vw,100px) 0' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:28 }}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:0.6, delay:i*0.08, ease:[0.16,1,0.3,1] }}
                className="rounded-2xl p-7 flex flex-col transition-all duration-300"
                style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--text-3)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background:'var(--tint)', border:'1px solid var(--tint-border)', color:'var(--text)' }}>
                  {s.icon}
                </div>

                {/* Content */}
                <h2 className="font-bold mb-3" style={{ fontFamily:'var(--font)', fontSize:'1.1rem', color:'var(--text)' }}>
                  {s.title}
                </h2>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color:'var(--text-2)' }}>
                  {s.desc}
                </p>

                {/* Perks */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {s.perks.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-1.5 text-xs" style={{ color:'var(--text-2)' }}>
                      <CheckCircle size={12} style={{ color:'var(--text)', flexShrink:0 }}/>
                      {p}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {s.link ? (
                  <Link href={s.link}
                    className="btn-outline flex items-center justify-center gap-2 py-3 text-sm mt-auto">
                    {s.linkLabel}<ArrowRight size={14}/>
                  </Link>
                ) : (
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2 py-3 text-sm mt-auto">
                    <MessageCircle size={14}/>{s.linkLabel}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section style={{ background:'var(--surface)', padding:'clamp(50px,7vw,90px) 0' }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-bold mb-4"
            style={{ fontFamily:'var(--font)', fontSize:'clamp(1.5rem,3vw,2rem)', color:'var(--text)' }}>
            ¿Tienes alguna pregunta?
          </h2>
          <p className="mb-8" style={{ color:'var(--text-2)' }}>
            Nuestro equipo está listo para ayudarte. Escríbenos por WhatsApp y recibe respuesta en minutos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 py-4 px-8">
              <MessageCircle size={16}/>Hablar con un asesor
            </a>
            <Link href="/inventario" className="btn-glass flex items-center gap-2 py-4 px-8">
              Ver Inventario<ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
