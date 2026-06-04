'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MessageCircle, Phone, ShieldCheck,
  Fuel, Settings, Gauge, Palette, Users, Calendar,
  ChevronDown, ChevronRight, CheckCircle,
} from 'lucide-react'
import type { Vehicle } from '@/lib/data'
import { WHATSAPP_URL } from '@/lib/data'
import { formatCurrency as fmt } from '@/lib/utils'

const faqs = [
  { q: '¿Ha tenido choques el vehículo?' },
  { q: '¿Se ha pintado alguna pieza del vehículo?' },
  { q: '¿El vehículo ha sido reparado?' },
  { q: '¿El vehículo está financiado actualmente?' },
  { q: '¿Dónde se compró el vehículo?' },
]

function Accordion({ question }: { question: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ minHeight: '56px' }}
      >
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm" style={{ color: 'var(--text-2)' }}>
              Para obtener información detallada sobre este vehículo, contáctanos directamente por WhatsApp. Respondemos en menos de 24 horas.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function VehicleDetail({ vehicle: v }: { vehicle: Vehicle }) {
  // Build gallery from vehicle images
  const allPhotos = [
    v.image,
    ...(v.gallery ?? []),
    v.fallback,
  ].filter(Boolean).slice(0, 6)

  const [mainImg, setMainImg] = useState(allPhotos[0])
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const getSrc = (src: string) => imgErrors[src] ? v.fallback : src
  const handleErr = (src: string) => setImgErrors(p => ({ ...p, [src]: true }))

  const waMsg = encodeURIComponent(
    `Hola RUARA AUTO SOLD! Me interesa el ${v.brand} ${v.model} ${v.year}.\n` +
    `💰 Precio: ${fmt(v.price)}\n🏦 Inicial desde: ${fmt(v.initial)}\n` +
    `⛽ ${v.fuel} · ⚙️ ${v.transmission} · 📍 ${v.mileage}\n\n¿Está disponible?`
  )

  const specs = [
    { label: 'Marca',        value: v.brand },
    { label: 'Modelo',       value: v.model },
    { label: 'Año',          value: String(v.year) },
    { label: 'Color',        value: v.color ?? '—' },
    { label: 'Kilometraje',  value: v.mileage },
    { label: 'Combustible',  value: v.fuel },
    { label: 'Transmisión',  value: v.transmission },
    { label: 'Tipo',         value: v.type },
    ...(v.seats ? [{ label: 'Pasajeros', value: v.seats }] : []),
    ...(v.owners ? [{ label: 'Dueños',   value: String(v.owners) }] : []),
  ]

  return (
    <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-3)' }}>
        <Link href="/" style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
          Inicio
        </Link>
        <ChevronRight size={14} />
        <Link href="/inventario" style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
          Inventario
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-2)' }}>{v.brand} {v.model}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* ── Left: Image gallery ────────────────────────── */}
        <div>
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden mb-3"
            style={{ aspectRatio: '4/3', background: 'var(--surface)' }}>
            <Image
              src={getSrc(mainImg)}
              alt={`${v.brand} ${v.model} ${v.year}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => handleErr(mainImg)}
            />
            {/* Verified badge */}
            {v.verified && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', backdropFilter: 'blur(8px)' }}>
                <ShieldCheck size={13} />Verificado RUARA
              </div>
            )}
            {/* Tag */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(201,163,82,0.15)', border: '1px solid rgba(201,163,82,0.3)', color: '#C9A352', backdropFilter: 'blur(8px)' }}>
              {v.tag}
            </div>
          </div>

          {/* Thumbnails */}
          {allPhotos.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allPhotos.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(src)}
                  className="relative rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: '1',
                    border: mainImg === src ? '2px solid #C9A352' : '2px solid var(--border)',
                    opacity: mainImg === src ? 1 : 0.65,
                    background: 'var(--surface)',
                  }}
                >
                  <Image
                    src={getSrc(src)}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                    onError={() => handleErr(src)}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Add more photos note */}
          <p className="text-xs mt-3" style={{ color: 'var(--text-3)' }}>
            💡 Para agregar más fotos de este vehículo, coloca imágenes en <code style={{ color: 'var(--gold)' }}>/public/images/cars/car-{v.id}-2.jpg</code>, etc.
          </p>
        </div>

        {/* ── Right: Vehicle info ────────────────────────── */}
        <div>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>
              {v.brand}
            </div>
            <h1 className="font-bold mb-4"
              style={{ fontFamily: 'var(--font)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.2, color: 'var(--text)' }}>
              {v.brand} {v.model}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Calendar size={14} style={{ color: 'var(--gold)' }} />{v.year}
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Gauge size={14} style={{ color: 'var(--gold)' }} />{v.mileage}
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Fuel size={14} style={{ color: 'var(--gold)' }} />{v.fuel}
              </span>
            </div>
          </motion.div>

          {/* Price + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            {/* Price card */}
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(201,163,82,0.07)', border: '1px solid rgba(201,163,82,0.18)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-3)' }}>
                NUESTRO PRECIO
              </div>
              <div className="text-2xl font-bold gold-text" style={{ fontFamily: 'var(--font)' }}>
                {fmt(v.price)}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                Inicial desde {fmt(v.initial)}
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl p-5"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
                ¿ESTÁS INTERESADO?
              </div>
              <div className="flex gap-2">
                <a href={`${WHATSAPP_URL}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  className="btn-gold flex-1 flex items-center justify-center gap-1.5 py-3 text-xs">
                  <MessageCircle size={15} />WhatsApp
                </a>
                <a href={`tel:+18098285795`}
                  className="btn-glass flex-1 flex items-center justify-center gap-1.5 py-3 text-xs">
                  <Phone size={15} />Teléfono
                </a>
              </div>
            </div>
          </motion.div>

          {/* Verified perks */}
          {v.verified && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl p-4 mb-6 flex flex-wrap gap-3"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
            >
              {['Historial revisado','Motor inspeccionado','Papeles legales','Garantía RUARA'].map(p => (
                <span key={p} className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: '#4ade80' }}>
                  <CheckCircle size={12} />{p}
                </span>
              ))}
            </motion.div>
          )}

          {/* Specs table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-bold mb-4"
              style={{ fontFamily: 'var(--font)', fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', color: 'var(--text)' }}>
              Detalles del vehículo
            </h2>
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}>
              {specs.map((s, i) => (
                <div key={i}
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{
                    borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                    background: i % 2 === 0 ? 'var(--card-bg)' : 'transparent',
                  }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{s.label}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FAQ Accordion ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <h2 className="font-bold mb-6"
          style={{ fontFamily: 'var(--font)', fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', color: 'var(--text)' }}>
          Más información del vehículo
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => <Accordion key={i} question={f.q} />)}
        </div>
      </motion.div>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 rounded-2xl p-8 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(201,163,82,0.08), rgba(201,163,82,0.03))', border: '1px solid rgba(201,163,82,0.18)' }}
      >
        <h3 className="font-bold mb-2" style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)', color: 'var(--text)', fontFamily: 'var(--font)' }}>
          ¿Listo para conducir este {v.brand} {v.model}?
        </h3>
        <p className="mb-6" style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
          Escríbenos ahora y un asesor te ayuda con el financiamiento.
        </p>
        <a href={`${WHATSAPP_URL}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          className="btn-gold inline-flex items-center gap-2 py-4 px-8">
          <MessageCircle size={18} />Quiero este vehículo
        </a>
      </motion.div>

      {/* Back */}
      <div className="mt-8">
        <Link href="/inventario"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
          <ArrowLeft size={14} />Volver al inventario
        </Link>
      </div>
    </div>
  )
}
