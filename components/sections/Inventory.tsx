'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Fuel, Settings, Gauge, Tag, X, Users, Palette, ChevronRight, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { vehicles, WHATSAPP_URL } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

type Vehicle = (typeof vehicles)[0]

const BRANDS = ['Todos', ...Array.from(new Set(vehicles.map(v => v.brand))).sort()]
const TYPES  = ['Todos', 'SUV', 'Sedán', 'Pickup', 'Hatchback', 'Van']
const PRICES = [
  { label: 'Todos',            min: 0,         max: Infinity },
  { label: 'Hasta RD$700K',   min: 0,         max: 700_000 },
  { label: 'RD$700K – 1M',    min: 700_000,   max: 1_000_000 },
  { label: 'RD$1M – 1.5M',   min: 1_000_000, max: 1_500_000 },
  { label: 'Más de RD$1.5M',  min: 1_500_000, max: Infinity },
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
      style={{ background:'rgba(6,7,10,0.85)', backdropFilter:'blur(16px)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity:0, y:40, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }}
        exit={{ opacity:0, y:30, scale:0.95 }}
        transition={{ type:'spring', stiffness:300, damping:30 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ background:'var(--card)', border:'1px solid var(--border)', boxShadow:'0 40px 100px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background:'var(--card-hover)' }}
          onMouseEnter={e=>(e.currentTarget.style.background='var(--tint-strong)')}
          onMouseLeave={e=>(e.currentTarget.style.background='var(--card-hover)')}>
          <X size={16} color="var(--text)" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/2 flex-shrink-0" style={{ minHeight:'280px', background:'var(--surface)' }}>
            <Image src={imgSrc} alt={`${v.brand} ${v.model}`} fill className="object-cover"
              onError={() => setImgSrc(v.fallback)} />
            <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 50%,rgba(17,19,25,0.7) 100%)' }} />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
              style={{ background:tag.bg, color:tag.color }}>{v.tag}</div>
            {v.verified && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.2)', color:'#4ade80' }}>
                <ShieldCheck size={12}/> Verificado
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-7 flex flex-col">
            <div className="mb-5">
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color:'var(--text-3)' }}>{v.brand}</div>
              <h2 className="text-2xl font-bold leading-tight mb-1"
                style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', fontSize:'1.15rem', letterSpacing:'0.04em' }}>{v.model}</h2>
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
                <div key={i} className="rounded-xl p-3" style={{ background:'var(--inp-bg)', border:'1px solid var(--border)' }}>
                  <div className="flex items-center gap-1.5 mb-1" style={{ color:'var(--text-3)' }}>
                    {s.icon}<span className="text-xs" style={{ color:'var(--text-2)' }}>{s.label}</span>
                  </div>
                  <div className="text-sm font-semibold" style={{ color:'var(--text)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 mb-5" style={{ background:'var(--tint)', border:'1px solid var(--tint-border)' }}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs mb-1" style={{ color:'var(--text-2)' }}>Precio</div>
                  <div className="text-2xl font-bold" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'var(--text)' }}>{formatCurrency(v.price)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color:'var(--text-2)' }}>Inicial desde</div>
                  <div className="text-lg font-semibold text-accent" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{formatCurrency(v.initial)}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <a href={`${WHATSAPP_URL}?text=${wa}`} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                <MessageCircle size={14}/>Consultar por WhatsApp
              </a>
              <button onClick={() => { onClose(); setTimeout(()=>document.querySelector('#financiamiento')?.scrollIntoView({behavior:'smooth'}), 300) }}
                className="btn-glass px-4 py-3 flex items-center gap-1 text-xs whitespace-nowrap">
                Financiar<ChevronRight size={12}/>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Card ───────────────────────────────────────────────── */
function Card({ v, delay, onOpen }: { v: Vehicle; delay: number; onOpen: ()=>void }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-40px' })
  const [tilt, setTilt] = useState({ x:0, y:0 })
  const [hover, setHover] = useState(false)
  const [imgSrc, setImgSrc] = useState(v.image)
  const [err, setErr] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x:((e.clientY-r.top)/r.height-0.5)*-7, y:((e.clientX-r.left)/r.width-0.5)*7 })
  }

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:28 }}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.55, delay, ease:[0.16,1,0.3,1] }}
      style={{ perspective:'900px' }}>
      <motion.div
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setTilt({x:0,y:0}) }}
        animate={{ rotateX:tilt.x, rotateY:tilt.y }}
        transition={{ type:'spring', stiffness:180, damping:22 }}
        style={{ transformStyle:'preserve-3d' }}
        className="vehicle-card cursor-pointer"
        onClick={() => window.location.href = `/inventario/${v.id}`}>
        <motion.div
          animate={hover ? { boxShadow:'0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(148,163,184,0.25)' } : { boxShadow:'0 4px 20px rgba(0,0,0,0.3)' }}
          transition={{ duration:0.3 }}
          style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'24px', overflow:'hidden' }}>

          {/* Image */}
          <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden" style={{ background:'#F5F5F5' }}>
            {!err ? (
              <Image src={imgSrc} alt={`${v.brand} ${v.model}`} fill
                className="object-contain object-center p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ transition:'transform 0.6s ease', transform:hover?'scale(1.05)':'scale(1)' }}
                onError={() => { if(imgSrc!==v.fallback)setImgSrc(v.fallback); else setErr(true) }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
                  <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                </svg>
              </div>
            )}
            {v.verified && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold"
                style={{ background:'rgba(255,255,255,0.9)', color:'#16a34a', border:'1px solid rgba(34,197,94,0.25)', backdropFilter:'blur(6px)' }}>
                <ShieldCheck size={10}/>Verificado RUARA
              </div>
            )}
            <motion.div animate={{ opacity:hover?1:0 }} transition={{ duration:0.2 }}
              className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 pt-10"
              style={{ background:'linear-gradient(to top, rgba(0,0,0,0.28), transparent)' }}>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background:'var(--accent)', color:'var(--accent-text)' }}>Ver detalles</div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-2">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color:'var(--text-3)' }}>{v.brand}</div>
              <h3 className="font-bold leading-tight"
                style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', fontSize:'1rem', letterSpacing:'0.03em', color:'var(--text)' }}>{v.model}</h3>
              <div className="text-xs mt-0.5" style={{ color:'var(--text-3)' }}>{v.year} · {v.mileage} · {v.type}</div>
            </div>

            <div className="flex items-end justify-between pt-3" style={{ borderTop:'1px solid var(--border)' }}>
              <div>
                <div className="text-xs mb-0.5" style={{ color:'var(--text-3)' }}>Precio</div>
                <div className="text-base font-bold text-accent" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{formatCurrency(v.price)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs mb-0.5" style={{ color:'var(--text-3)' }}>Inicial desde</div>
                <div className="text-xs font-semibold" style={{ color:'var(--text-2)', fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>{formatCurrency(v.initial)}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Inventory Section ──────────────────────────────────── */
export default function Inventory() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true })
  const [selected,    setSelected]    = useState<Vehicle|null>(null)
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
    <section id="inventario" style={{ background:'var(--bg)', padding:'clamp(48px, 8vw, 96px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
              className="section-label mb-4 w-fit"><Tag size={10}/>Disponibles ahora</motion.div>
            <motion.h2 initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em' }}>
              NUESTRO <span className="text-accent">INVENTARIO</span>
            </motion.h2>
          </div>
          <motion.button initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:0.6,delay:0.2 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background:showFilters?'var(--tint-strong)':'var(--tint)', border:'1px solid var(--border)', color: showFilters?'var(--text)':'var(--text-2)' }}>
            <SlidersHorizontal size={15}/>Filtros
            {(brand!=='Todos'||type!=='Todos'||priceIdx!==0) && (
              <span className="w-2 h-2 rounded-full" style={{ background:'var(--text)' }}/>
            )}
          </motion.button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
              className="overflow-hidden mb-8">
              <div className="rounded-2xl p-6 space-y-5"
                style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
                {/* Brand */}
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-2)' }}>Marca</div>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map(b => (
                      <button key={b} onClick={() => setBrand(b)}
                        className={`filter-pill ${brand===b?'active':''}`}>{b}</button>
                    ))}
                  </div>
                </div>
                {/* Type */}
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-2)' }}>Tipo</div>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map(t => (
                      <button key={t} onClick={() => setType(t)}
                        className={`filter-pill ${type===t?'active':''}`}>{t}</button>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-2)' }}>Precio</div>
                  <div className="flex flex-wrap gap-2">
                    {PRICES.map((p,i) => (
                      <button key={i} onClick={() => setPriceIdx(i)}
                        className={`filter-pill ${priceIdx===i?'active':''}`}>{p.label}</button>
                    ))}
                  </div>
                </div>
                {/* Reset */}
                {(brand!=='Todos'||type!=='Todos'||priceIdx!==0) && (
                  <button onClick={() => { setBrand('Todos'); setType('Todos'); setPriceIdx(0) }}
                    className="text-xs flex items-center gap-1.5 transition-colors"
                    style={{ color:'var(--text-2)' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#f87171')}
                    onMouseLeave={e=>(e.currentTarget.style.color='var(--text-2)')}>
                    <X size={12}/>Limpiar filtros
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="mb-6 text-sm" style={{ color:'var(--text-3)' }}>
          {filtered.length} vehículo{filtered.length!==1?'s':''} encontrado{filtered.length!==1?'s':''}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((v,i) => <Card key={v.id} v={v} delay={i*0.04} onOpen={()=>setSelected(v)}/>)}
          </div>
        ) : (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="font-semibold mb-2" style={{ color:'var(--text)' }}>No hay vehículos con esos filtros</div>
            <button onClick={() => { setBrand('Todos'); setType('Todos'); setPriceIdx(0) }} className="btn-outline mt-4 text-xs">
              Ver todos los vehículos
            </button>
          </motion.div>
        )}

        <motion.div initial={{ opacity:0,y:14 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6 }} className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color:'var(--text-3)' }}>¿No encuentras lo que buscas? Podemos conseguirlo.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-glass inline-flex">
            <MessageCircle size={14}/>Pedir vehículo específico
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <VehicleModal v={selected} onClose={() => setSelected(null)}/>}
      </AnimatePresence>
    </section>
  )
}
