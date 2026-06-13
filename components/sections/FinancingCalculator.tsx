'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, MessageCircle, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { WHATSAPP_URL } from '@/lib/data'

function AnimVal({ value }: { value: number }) {
  const [d, setD] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const s = prev.current; prev.current = value
    if (s===value) return
    const t0 = Date.now(); const dur = 420
    const tick = () => {
      const p = Math.min((Date.now()-t0)/dur,1)
      setD(Math.round(s+(value-s)*(1-Math.pow(1-p,3))))
      if (p<1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return <>{formatCurrency(d)}</>
}

const fill = (v: number, min: number, max: number) =>
  `linear-gradient(to right, var(--accent) ${((v-min)/(max-min))*100}%, var(--tint-strong) 0%)`

export default function FinancingCalculator() {
  const [price, setPrice]   = useState(2_500_000)
  const [pct,   setPct]     = useState(20)
  const [months,setMonths]  = useState(48)
  const rate = 18

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  const initial  = price*pct/100
  const financed = price-initial
  const r        = rate/100/12
  const monthly  = financed*(r*Math.pow(1+r,months))/(Math.pow(1+r,months)-1)
  const total    = monthly*months+initial
  const approval = pct>=30?98:pct>=20?92:80

  const wa = encodeURIComponent(
    `Hola, quiero aplicar para financiamiento.\nPrecio: ${formatCurrency(price)}, inicial: ${pct}%, plazo: ${months} meses.\nCuota estimada: ${formatCurrency(monthly)}/mes.`
  )

  return (
    <section id="financiamiento" style={{ background:'var(--surface)', padding:'clamp(48px, 8vw, 96px) 0', position:'relative' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 50% at 50% 50%, var(--tint) 0%, transparent 70%)' }}/>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit"><Calculator size={10}/>Calculadora de crédito</motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em' }}>
            CALCULA TU <span className="text-accent">CUOTA</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7">

          {/* Sliders */}
          <div className="rounded-2xl p-8"
            style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-8"
              style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'var(--text-3)' }}>Configurar Crédito</h3>

            {[
              { label:'Precio del Vehículo', val:price, set:setPrice, min:800_000, max:8_000_000, step:50_000,
                fmt:()=>formatCurrency(price), range:'RD$800K — RD$8M' },
              { label:'Inicial', val:pct, set:setPct, min:10, max:50, step:5,
                fmt:()=>`${pct}% · ${formatCurrency(initial)}`, range:'10% — 50%' },
              { label:'Plazo', val:months, set:setMonths, min:12, max:84, step:12,
                fmt:()=>`${months} meses`, range:'12 — 84 meses' },
            ].map((s,i) => (
              <div key={i} className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-sm" style={{ color:'var(--text-2)' }}>{s.label}</label>
                  <span className="text-sm font-bold" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'var(--text)' }}>{s.fmt()}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                  onChange={e=>s.set(Number(e.target.value))}
                  style={{ background:fill(s.val,s.min,s.max), width:'100%' }}/>
                <div className="flex justify-between mt-2 text-xs" style={{ color:'var(--text-3)' }}>
                  <span>{s.range.split(' — ')[0]}</span><span>{s.range.split(' — ')[1]}</span>
                </div>
              </div>
            ))}
            <p className="text-xs" style={{ color:'var(--text-3)' }}>* Tasa referencial {rate}% anual. Sujeto a aprobación bancaria.</p>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background:'linear-gradient(135deg, var(--tint-strong), var(--tint))', border:'1px solid var(--tint-border)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background:'radial-gradient(circle, var(--tint-strong), transparent 70%)', transform:'translate(30%,-30%)' }}/>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-3)' }}>Cuota Mensual Estimada</div>
              <div className="text-5xl font-bold mb-1 text-accent" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif' }}>
                <AnimVal value={Math.round(monthly)}/>
              </div>
              <div className="text-sm" style={{ color:'var(--text-2)' }}>por mes — {months} meses</div>
            </div>

            <div className="rounded-2xl p-6" style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
              {[
                { label:'Precio del vehículo', value:price },
                { label:`Inicial (${pct}%)`, value:initial },
                { label:'Monto a financiar', value:financed, highlight:true },
                { label:'Costo total', value:total },
              ].map((r,i) => (
                <div key={i} className="flex justify-between items-center"
                  style={i>0?{borderTop:'1px solid var(--border)',paddingTop:'12px',marginTop:'12px'}:{}}>
                  <span className="text-sm" style={{ color:'var(--text-2)' }}>{r.label}</span>
                  <span className="text-sm font-semibold"
                    style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:r.highlight?'var(--text)':'var(--text-2)' }}>
                    {formatCurrency(r.value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.14)' }}>
              <CheckCircle size={20} style={{ color:'#4ade80', flexShrink:0 }}/>
              <div>
                <div className="font-bold text-lg" style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'#4ade80' }}>{approval}% Tasa de Aprobación</div>
                <div className="text-xs" style={{ color:'var(--text-3)' }}>Con inicial del {pct}%</div>
              </div>
            </div>

            <a href={`${WHATSAPP_URL}?text=${wa}`} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 w-full py-4 text-sm">
              <MessageCircle size={16}/>Solicitar Aprobación Ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
