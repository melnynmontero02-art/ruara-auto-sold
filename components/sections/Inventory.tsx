'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, Fuel, Settings, Gauge, Tag, X, Users, Palette, ChevronRight } from 'lucide-react'
import { vehicles, WHATSAPP_URL } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

const tagStyle: Record<string, { bg: string; color: string }> = {
  PREMIUM:    { bg: 'rgba(201,163,82,0.1)',  color: '#8B6A20' },
  NUEVO:      { bg: 'rgba(37,99,235,0.08)', color: '#1D4ED8' },
  DISPONIBLE: { bg: 'rgba(22,163,74,0.08)', color: '#15803D' },
  OFERTA:     { bg: 'rgba(220,38,38,0.08)', color: '#DC2626' },
  VENDIDO:    { bg: 'rgba(100,116,139,0.1)', color: '#475569' },
}

type Vehicle = (typeof vehicles)[0]

/* ── Vehicle Detail Modal ─────────────────────────────────────── */
function VehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [imgSrc, setImgSrc] = useState(vehicle.image)
  const tag = tagStyle[vehicle.tag] ?? tagStyle.DISPONIBLE
  const wa  = encodeURIComponent(
    `Hola RUARA AUTO SOLD! Me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.\n` +
    `💰 Precio: ${formatCurrency(vehicle.price)}\n` +
    `🏦 Inicial desde: ${formatCurrency(vehicle.initial)}\n` +
    `¿Está disponible? ¿Qué opciones de financiamiento tienen?`
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(15,23,42,0.08)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.08)')}
          aria-label="Cerrar"
        >
          <X size={16} style={{ color: '#0F172A' }} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/2 h-64 md:h-auto flex-shrink-0" style={{ minHeight: '280px', background: '#F1F5F9' }}>
            <Image
              src={imgSrc}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
              onError={() => setImgSrc(vehicle.fallback)}
            />
            {/* Tag */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
              style={{ background: tag.bg, color: tag.color }}
            >
              {vehicle.tag}
            </div>
            {vehicle.badge && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold text-white"
                style={{ background: '#C9A352' }}>
                {vehicle.badge}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-7 flex flex-col">
            {/* Header */}
            <div className="mb-5">
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A352' }}>
                {vehicle.brand}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1"
                style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '1.2rem', letterSpacing: '0.04em' }}>
                {vehicle.model}
              </h2>
              <div className="text-gray-400 text-sm">{vehicle.year}</div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: <Fuel size={14} />,     label: 'Combustible',    value: vehicle.fuel },
                { icon: <Settings size={14} />, label: 'Transmisión',    value: vehicle.transmission },
                { icon: <Gauge size={14} />,    label: 'Kilometraje',    value: vehicle.mileage },
                { icon: <Palette size={14} />,  label: 'Color',          value: vehicle.color ?? '—' },
                ...(vehicle.seats ? [{ icon: <Users size={14} />, label: 'Pasajeros', value: vehicle.seats }] : []),
              ].map((spec, i) => (
                <div key={i} className="rounded-xl p-3" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                  <div className="flex items-center gap-1.5 mb-1" style={{ color: '#C9A352' }}>
                    {spec.icon}
                    <span className="text-xs text-gray-400">{spec.label}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(201,163,82,0.06)', border: '1px solid rgba(201,163,82,0.15)' }}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Precio</div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Space Mono, monospace', color: '#0F172A' }}>
                    {formatCurrency(vehicle.price)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">Inicial desde</div>
                  <div className="text-lg font-semibold" style={{ fontFamily: 'Space Mono, monospace', color: '#C9A352' }}>
                    {formatCurrency(vehicle.initial)}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-auto">
              <a
                href={`${WHATSAPP_URL}?text=${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 flex items-center justify-center gap-2 py-3"
              >
                <MessageCircle size={15} />
                Consultar por WhatsApp
              </a>
              <button
                onClick={() => document.querySelector('#financiamiento')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-4 py-3 flex items-center gap-1 whitespace-nowrap"
                style={{ fontSize: '11px' }}
              >
                Financiamiento
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Vehicle Card ─────────────────────────────────────────────── */
function Card({ v, delay, onOpen }: { v: Vehicle; delay: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 })
  const [hover,  setHover]  = useState(false)
  const [imgSrc, setImgSrc] = useState(v.image)
  const [err,    setErr]    = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  8,
    })
  }
  const handleErr = () => {
    if (imgSrc !== v.fallback) setImgSrc(v.fallback)
    else setErr(true)
  }

  const tag = tagStyle[v.tag] ?? tagStyle.DISPONIBLE

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '900px' }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="vehicle-card cursor-pointer"
        onClick={onOpen}
      >
        <motion.div
          animate={hover ? {
            boxShadow: '0 20px 50px rgba(0,0,0,0.12), 0 0 0 2px rgba(201,163,82,0.3)',
          } : {
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.3 }}
          style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden" style={{ background: '#F1F5F9' }}>
            {!err ? (
              <Image
                src={imgSrc}
                alt={`${v.brand} ${v.model} ${v.year}`}
                fill
                className="object-cover"
                style={{ transition: 'transform 0.7s ease', transform: hover ? 'scale(1.05)' : 'scale(1)' }}
                onError={handleErr}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(201,163,82,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
                  <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                </svg>
              </div>
            )}

            {/* Gradient */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.06) 100%)' }} />

            {/* Tag */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider"
              style={{ background: tag.bg, color: tag.color }}>
              {v.tag}
            </div>
            {v.badge && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                style={{ background: '#C9A352' }}>
                {v.badge}
              </div>
            )}

            {/* "Ver más" hint on hover */}
            <motion.div
              animate={{ opacity: hover ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(15,23,42,0.35)' }}
            >
              <div className="px-4 py-2 rounded-full text-white text-xs font-semibold tracking-wider"
                style={{ background: 'rgba(201,163,82,0.9)', backdropFilter: 'blur(4px)' }}>
                Ver detalles
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-3">
              <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#C9A352' }}>{v.brand}</div>
              <h3 className="font-bold leading-tight text-gray-900"
                style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '0.88rem', letterSpacing: '0.03em' }}>
                {v.model}
              </h3>
              <div className="text-xs mt-0.5 text-gray-400">{v.year} · {v.color}</div>
            </div>

            <div className="flex gap-4 mb-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Fuel size={10} style={{ color: '#C9A352' }} />{v.fuel}</span>
              <span className="flex items-center gap-1"><Settings size={10} style={{ color: '#C9A352' }} />{v.transmission}</span>
              <span className="flex items-center gap-1"><Gauge size={10} style={{ color: '#C9A352' }} />{v.mileage}</span>
            </div>

            <div className="flex items-end justify-between pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Precio</div>
                <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {formatCurrency(v.price)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-0.5">Inicial desde</div>
                <div className="text-sm font-semibold text-gray-600" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {formatCurrency(v.initial)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Inventory Section ────────────────────────────────────────── */
export default function Inventory() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [selected, setSelected] = useState<Vehicle | null>(null)

  return (
    <section id="inventario" style={{ background: '#FFFFFF', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="section-label mb-5 mx-auto w-fit">
            <Tag size={10} />Disponibles ahora
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Syncopate, sans-serif', letterSpacing: '0.04em' }}>
            NUESTRO <span className="gold-text">INVENTARIO</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.14 }}
            className="text-gray-500 max-w-lg mx-auto">
            Haz clic en cualquier vehículo para ver todos los detalles y opciones de financiamiento.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="vehicles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vehicles.map((v, i) => (
            <Card key={v.id} v={v} delay={i * 0.05} onOpen={() => setSelected(v)} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mt-12">
          <p className="text-sm text-gray-400 mb-4">¿No encuentras lo que buscas? Podemos conseguirlo.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex">
            <MessageCircle size={14} />Pedir vehículo específico
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
