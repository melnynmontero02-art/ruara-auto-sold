'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Fuel, Settings, Gauge, Tag, X, Users, Palette, ChevronRight, ShieldCheck, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import { vehicles, WHATSAPP_URL } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

type Vehicle = (typeof vehicles)[0]

const BRANDS = ['Todos', ...Array.from(new Set(vehicles.map(v => v.brand))).sort()]
const TYPES  = ['Todos', 'SUV', 'Sedán', 'Pickup', 'Hatchback', 'Van']
const PRICES = [
  { label: 'Todos',           min: 0,         max: Infinity },
  { label: 'Hasta RD$700K',  min: 0,         max: 700_000 },
  { label: 'RD$700K – 1M',   min: 700_000,   max: 1_000_000 },
  { label: 'RD$1M – 1.5M',   min: 1_000_000, max: 1_500_000 },
  { label: 'Más de RD$1.5M', min: 1_500_000, max: Infinity },
]

const tagStyle: Record<string, { bg: string; color: string }> = {
  PREMIUM:    { bg: 'rgba(148,163,184,0.16)', color: '#E2E8F0' },
  NUEVO:      { bg: 'rgba(59,130,246,0.12)', color: '#60A5FA' },
  DISPONIBLE: { bg: 'rgba(34,197,94,0.10)',  color: '#4ade80' },
  OFERTA:     { bg: 'rgba(239,68,68,0.10)',  color: '#f87171' },
  VENDIDO:    { bg: 'rgba(100,116,139,0.1)', color: '#94A3B8' },
}

/* ─── Modal ──────────────────────────────────────────────── */
function VehicleModal({ v, onClose }: { v: Vehicle; onClose: () => void }) {
  const [imgSrc, setImgSrc] = useState(v.image)
  const tag = tagStyle[v.tag] ?? tagStyle.DISPONIBLE
  const wa = encodeURIComponent(
    `Hola RUARA AUTO SOLD! Me interesa el ${v.brand} ${v.model} ${v.year}.\n💰 Precio: ${formatCurrency(v.price)}\n🏦 Inicial desde: ${formatCurrency(v.initial)}\n¿Está disponible?`
  )

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background:'rgba(0,0,0,0.8)', backdropFilter:'blur(16px)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity:0,y:40,scale:0.95 }} animate={{ opacity:1,y:0,scale:1 }}
        exit={{ opacity:0,y:30,scale:0.95 }}
        transition={{ type:'spring',stiffness:300,damping:30 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ background:'var(--card)', border:'1px solid var(--border)', boxShadow:'0 40px 100px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
          <X size={16} style={{ color:'var(--text)' }} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/2 flex-shrink-0" style={{ minHeight:'280px', background:'var(--surface)' }}>
            <Image src={imgSrc} alt={`${v.brand} ${v.model}`} fill className="object-cover"
              onError={() => setImgSrc(v.fallback)} />
            <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.5) 100%)' }}/>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
              style={{ background:tag.bg, color:tag.color }}>{v.tag}</div>
            {v.verified && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.2)', color:'#4ade80' }}>
                <ShieldCheck size={12}/>Verificado
              </div>
            )}
          </div>
          <div className="flex-1 p-7 flex flex-col">
            <div className="mb-5">
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color:'var(--text)' }}>{v.brand}</div>
              <h2 className="text-2xl font-bold leading-tight mb-1"
                style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', fontSize:'1.15rem', letterSpacing:'0.04em', color:'var(--text)' }}>{v.model}</h2>
              <div className="text-sm" style={{ color:'var(--text-2)' }}>{v.year} · {v.type}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon:<Fuel size={13}/>,     label:'Combustible', value:v.fuel },
                { icon:<Settings size={13}/>, label:'Transmisión',  value:v.transmission },
                { icon:<Gauge size={13}/>,    label:'Kilometraje',  value:v.mileage },
                { icon:<Palette size={13}/>,  label:'Color',        value:v.color??'—' },
                ...(v.seats?[{ icon:<Users size={13}/>, label:'Pasajeros', value:v.seats }]:[]),
              ].map((s,i) => (
                <div key={i} className="rounded-xl p-3" style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
                  <div className="flex items-center gap-1.5 mb-1" style={{ color:'var(--text)' }}>
                    {s.icon}<span className="text-xs" style={{ color:'var(--text-3)' }}>{s.label}</span>
                  </div>
                  <div className="text-sm font-semibold" style={{ color:'var(--text)' }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 mb-5" style={{ background:'var(--tint)', border:'1px solid var(--tint-border)' }}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs mb-1" style={{ color:'var(--text-3)' }}>Precio</div>
                  <div className="text-2xl font-bold" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'var(--text)' }}>{formatCurrency(v.price)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color:'var(--text-3)' }}>Inicial desde</div>
                  <div className="text-lg font-semibold text-accent" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{formatCurrency(v.initial)}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-auto">
              <a href={`${WHATSAPP_URL}?text=${wa}`} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                <MessageCircle size={14}/>Consultar por WhatsApp
              </a>
              <Link href="/#financiamiento"
                className="btn-glass px-4 py-3 flex items-center gap-1 text-xs whitespace-nowrap">
                Financiar<ChevronRight size={12}/>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Card ───────────────────────────────────────────────── */
function Card({ v, onOpen }: { v: Vehicle; onOpen: ()=>void }) {
  const [imgSrc, setImgSrc] = useState(v.image)
  const [err,    setErr]    = useState(false)

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">

      {/* Image */}
      <div className="relative h-[280px] overflow-hidden bg-slate-100">
        {!err ? (
          <Image src={imgSrc} alt={`${v.brand} ${v.model}`} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => { if(imgSrc!==v.fallback)setImgSrc(v.fallback); else setErr(true) }}/>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
              <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
        )}
        {v.verified && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur-sm">
            <ShieldCheck size={12}/>Verificado RUARA
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xs font-bold tracking-[0.22em] uppercase text-slate-900">{v.brand}</h3>
        <p className="text-sm font-semibold text-slate-800 mt-0.5"
          style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{v.model}</p>
        <p className="mt-1 text-sm text-slate-500">{v.year} · {v.mileage} · {v.type}</p>

        <div className="my-4 h-px bg-slate-200" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400">Precio</p>
            <p className="text-xl font-extrabold text-slate-900"
              style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{formatCurrency(v.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Inicial desde</p>
            <p className="text-sm font-bold text-slate-700">{formatCurrency(v.initial)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Full Inventory Page ────────────────────────────────── */
export default function InventoryPage() {
  
  const [brand,       setBrand]       = useState('Todos')
  const [type,        setType]        = useState('Todos')
  const [priceIdx,    setPriceIdx]    = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => vehicles.filter(v => {
    const pr = PRICES[priceIdx]
    return (brand==='Todos'||v.brand===brand)
        && (type==='Todos'||v.type===type)
        && (v.price>=pr.min && v.price<=pr.max)
  }), [brand, type, priceIdx])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
          style={{ color:'var(--text-2)' }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--text-2)')}>
          <ArrowLeft size={14}/>Volver al inicio
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-label mb-4 w-fit"><Tag size={10}/>Disponibles ahora</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2"
              style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em', color:'var(--text)' }}>
              NUESTRO <span className="text-accent">INVENTARIO</span>
            </h1>
            <p style={{ color:'var(--text-2)' }}>Haz clic en cualquier vehículo para ver todos los detalles.</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background:'var(--card-bg)', border:'1px solid var(--border)', color:'var(--text-2)' }}>
            <SlidersHorizontal size={15}/>Filtros
            {(brand!=='Todos'||type!=='Todos'||priceIdx!==0) && (
              <span className="w-2 h-2 rounded-full" style={{ background:'var(--text)' }}/>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
            className="overflow-hidden mb-8">
            <div className="rounded-2xl p-6 space-y-5"
              style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
              {[
                { label:'Marca', options:BRANDS, active:brand, set:setBrand },
                { label:'Tipo',  options:TYPES,  active:type,  set:setType },
              ].map(f => (
                <div key={f.label}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-3)' }}>{f.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {f.options.map(o => (
                      <button key={o} onClick={() => f.set(o)}
                        className={`filter-pill ${f.active===o?'active':''}`}>{o}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-3)' }}>Precio</div>
                <div className="flex flex-wrap gap-2">
                  {PRICES.map((p,i) => (
                    <button key={i} onClick={() => setPriceIdx(i)}
                      className={`filter-pill ${priceIdx===i?'active':''}`}>{p.label}</button>
                  ))}
                </div>
              </div>
              {(brand!=='Todos'||type!=='Todos'||priceIdx!==0) && (
                <button onClick={() => { setBrand('Todos'); setType('Todos'); setPriceIdx(0) }}
                  className="text-xs flex items-center gap-1.5" style={{ color:'var(--text-3)' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='#f87171')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--text-3)')}>
                  <X size={12}/>Limpiar filtros
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Count */}
      <div className="mb-6 text-sm" style={{ color:'var(--text-3)' }}>
        {filtered.length} vehículo{filtered.length!==1?'s':''} encontrado{filtered.length!==1?'s':''}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(v => <Card key={v.id} v={v} onOpen={() => window.location.href = `/inventario/${v.id}`}/>)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="font-semibold mb-2" style={{ color:'var(--text)' }}>No hay vehículos con esos filtros</div>
          <button onClick={() => { setBrand('Todos'); setType('Todos'); setPriceIdx(0) }}
            className="btn-outline mt-4 text-xs">Ver todos los vehículos</button>
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-sm mb-4" style={{ color:'var(--text-3)' }}>¿No encuentras lo que buscas?</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-glass inline-flex">
          <MessageCircle size={14}/>Pedir vehículo específico
        </a>
      </div>

      
    </div>
  )
}
