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
import { WHATSAPP_URL, vehicles } from '@/lib/data'
import { formatCurrency as fmt } from '@/lib/utils'

const faqs = [
  { q: '¿Ha tenido choques el vehículo?' },
  { q: '¿Se ha pintado alguna pieza del vehículo?' },
  { q: '¿El vehículo ha sido reparado?' },
  { q: '¿El vehículo está financiado actualmente?' },
  { q: '¿Dónde se compró el vehículo?' },
]

const tagStyle: Record<string, { bg: string; color: string }> = {
  PREMIUM:    { bg: 'rgba(148,163,184,0.16)', color: '#E2E8F0' },
  NUEVO:      { bg: 'rgba(59,130,246,0.12)', color: '#60A5FA' },
  DISPONIBLE: { bg: 'rgba(34,197,94,0.10)',  color: '#4ade80' },
  OFERTA:     { bg: 'rgba(239,68,68,0.10)',  color: '#f87171' },
  VENDIDO:    { bg: 'rgba(100,116,139,0.1)', color: '#94A3B8' },
}

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
          <ChevronDown size={18} style={{ color: 'var(--text)', flexShrink: 0 }} />
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

function RelatedCard({ v }: { v: Vehicle }) {
  const [imgSrc, setImgSrc] = useState(v.image)

  return (
    <Link href={`/inventario/${v.id}`}
      className="group block overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-[280px] overflow-hidden bg-slate-100">
        <Image
          src={imgSrc}
          alt={`${v.brand} ${v.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={() => setImgSrc(v.fallback)}
        />
        {v.verified && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur-sm">
            <ShieldCheck size={12}/>Verificado RUARA
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xs font-bold tracking-[0.22em] uppercase text-slate-900">{v.brand}</h3>
        <p className="text-sm font-semibold text-slate-800 mt-0.5"
          style={{ fontFamily: 'var(--font)' }}>{v.model}</p>
        <p className="mt-1 text-sm text-slate-500">{v.year} · {v.mileage}</p>

        <div className="my-4 h-px bg-slate-200" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400">Precio</p>
            <p className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'var(--font)' }}>{fmt(v.price)}</p>
          </div>
          <ChevronRight size={16} className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
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

  const tag = tagStyle[v.tag] ?? tagStyle.DISPONIBLE

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

  // Other available vehicles — same type first, then the rest
  const others   = vehicles.filter(rv => rv.id !== v.id && rv.tag !== 'VENDIDO')
  const sameType = others.filter(rv => rv.type === v.type)
  const restType = others.filter(rv => rv.type !== v.type)
  const related  = [...sameType, ...restType].slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-3)' }}>
        <Link href="/" style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
          Inicio
        </Link>
        <ChevronRight size={14} />
        <Link href="/inventario" style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
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
          <div className="relative w-full aspect-[5/4] md:aspect-[4/3] overflow-hidden rounded-2xl mb-3 bg-neutral-100">
            <Image
              src={getSrc(mainImg)}
              alt={`${v.brand} ${v.model} ${v.year}`}
              fill
              className="object-cover object-center"
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
              style={{ background: tag.bg, border: `1px solid ${tag.color}4D`, color: tag.color, backdropFilter: 'blur(8px)' }}>
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
                    border: mainImg === src ? '2px solid var(--text)' : '2px solid var(--border)',
                    opacity: mainImg === src ? 1 : 0.65,
                    background: '#F5F5F4',
                  }}
                >
                  <Image
                    src={getSrc(src)}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="100px"
                    onError={() => handleErr(src)}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Add more photos note */}
          <p className="text-xs mt-3" style={{ color: 'var(--text-3)' }}>
            💡 Para agregar más fotos de este vehículo, coloca imágenes en <code style={{ color: 'var(--text)' }}>/public/images/cars/car-{v.id}-2.jpg</code>, etc.
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
            <div className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--text)' }}>
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
                <Calendar size={14} style={{ color: 'var(--text)' }} />{v.year}
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Gauge size={14} style={{ color: 'var(--text)' }} />{v.mileage}
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Fuel size={14} style={{ color: 'var(--text)' }} />{v.fuel}
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
              style={{ background: 'var(--tint)', border: '1px solid var(--tint-border)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-3)' }}>
                NUESTRO PRECIO
              </div>
              <div className="text-2xl font-bold text-accent" style={{ fontFamily: 'var(--font)' }}>
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
                  className="btn-primary flex-1 flex items-center justify-center gap-1.5 py-3 text-xs">
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

      {/* ── Other available vehicles ─────────────────────── */}
      {related.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="flex items-end justify-between mb-6 gap-4">
            <h2 className="font-bold"
              style={{ fontFamily: 'var(--font)', fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', color: 'var(--text)' }}>
              Otros vehículos <span className="text-accent">disponibles</span>
            </h2>
            <Link href="/inventario"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap"
              style={{ color: 'var(--text)' }}>
              Ver todo el inventario<ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(rv => <RelatedCard key={rv.id} v={rv} />)}
          </div>
        </motion.div>
      )}

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 rounded-2xl p-8 text-center"
        style={{ background: 'linear-gradient(135deg, var(--tint-strong), var(--tint))', border: '1px solid var(--tint-border)' }}
      >
        <h3 className="font-bold mb-2" style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)', color: 'var(--text)', fontFamily: 'var(--font)' }}>
          ¿Listo para conducir este {v.brand} {v.model}?
        </h3>
        <p className="mb-6" style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
          Escríbenos ahora y un asesor te ayuda con el financiamiento.
        </p>
        <a href={`${WHATSAPP_URL}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 py-4 px-8">
          <MessageCircle size={18} />Quiero este vehículo
        </a>
      </motion.div>

      {/* Back */}
      <div className="mt-8">
        <Link href="/inventario"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
          <ArrowLeft size={14} />Volver al inventario
        </Link>
      </div>
    </div>
  )
}
