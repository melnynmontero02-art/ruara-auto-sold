'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Car, DollarSign, Gauge, Phone } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

const BRANDS_LIST = ['Toyota','Honda','Nissan','Hyundai','Kia','Ford','Chevrolet','Mazda','Mitsubishi','Suzuki','Volkswagen','BMW','Mercedes','Otro']

const inp: React.CSSProperties = {
  width:'100%', background:'var(--inp-bg)',
  border:'1.5px solid rgba(255,255,255,0.08)', borderRadius:'10px',
  padding:'12px 16px', fontSize:'14px', color:'var(--text)', outline:'none',
  transition:'all 0.2s', fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif',
}
const foc = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'rgba(201,163,82,0.5)'
  e.target.style.background  = 'rgba(255,255,255,0.07)'
  e.target.style.boxShadow   = '0 0 0 3px rgba(201,163,82,0.08)'
}
const blr = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.08)'
  e.target.style.background  = 'rgba(255,255,255,0.04)'
  e.target.style.boxShadow   = 'none'
}

export default function SellVehicle() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    brand: '', model: '', year: '', mileage: '', condition: '', price: '', phone: '', notes: '',
  })

  const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hola RUARA AUTO SOLD! Quiero vender mi vehículo:\n\n` +
      `🚗 ${form.brand} ${form.model} ${form.year}\n` +
      `📍 Kilometraje: ${form.mileage} km\n` +
      `✅ Condición: ${form.condition}\n` +
      `💰 Precio esperado: ${form.price ? 'RD$'+form.price : 'A convenir'}\n` +
      `📞 Teléfono: ${form.phone}\n` +
      (form.notes ? `📝 Notas: ${form.notes}` : '')
    )
    window.open(`${WHATSAPP_URL}?text=${msg}`, '_blank')
  }

  return (
    <section id="vende" style={{ background: 'var(--bg)', padding: 'clamp(48px, 8vw, 96px) 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — pitch */}
          <div ref={ref}>
            <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
              className="section-label mb-5 w-fit">
              <Car size={10}/>¿Quieres vender?
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em', lineHeight:1.2 }}>
              VENDE TU<br/><span className="gold-text">VEHÍCULO</span>
            </motion.h2>
            <motion.p initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6,delay:0.14 }}
              className="text-lg leading-relaxed mb-8" style={{ color:'var(--text-2)' }}>
              Compramos tu vehículo al mejor precio del mercado. Proceso rápido, sin complicaciones y con pago inmediato.
            </motion.p>

            {/* Benefits */}
            {[
              { icon:<DollarSign size={18}/>, text:'Pago rápido y seguro' },
              { icon:<Phone size={18}/>,      text:'Respuesta en menos de 24 horas' },
              { icon:<Car size={18}/>,        text:'Compramos cualquier marca y modelo' },
            ].map((b, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-20 }}
                animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.6, delay:0.2+i*0.08 }}
                className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(201,163,82,0.08)', border:'1px solid rgba(201,163,82,0.15)', color:'#C9A352' }}>
                  {b.icon}
                </div>
                <span className="text-white/70">{b.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Right — form */}
          <motion.div initial={{ opacity:0, x:24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.2 }}>
            <div className="rounded-2xl p-8"
              style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-7"
                style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'#C9A352' }}>
                Datos de tu vehículo
              </h3>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Marca *</label>
                    <select name="brand" required value={form.brand} onChange={ch} 
                      className="neu-input" style={{ cursor:'pointer' }}>
                      <option value="" disabled style={{ background:'var(--card)' }}>Selecciona</option>
                      {BRANDS_LIST.map(b => <option key={b} value={b} style={{ background:'var(--card)' }}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Modelo *</label>
                    <input name="model" type="text" required placeholder="Ej. Corolla" value={form.model} onChange={ch} className="neu-input"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Año *</label>
                    <input name="year" type="number" required placeholder="2020" min={1990} max={2026} value={form.year} onChange={ch} className="neu-input"/>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Kilometraje</label>
                    <input name="mileage" type="text" placeholder="45,000" value={form.mileage} onChange={ch} className="neu-input"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Condición</label>
                  <select name="condition" value={form.condition} onChange={ch} 
                    className="neu-input" style={{ cursor:'pointer' }}>
                    <option value="" style={{ background:'var(--card)' }}>Selecciona la condición</option>
                    {['Excelente','Muy bueno','Bueno','Regular','Para piezas'].map(c => (
                      <option key={c} value={c} style={{ background:'var(--card)' }}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Precio esperado (RD$)</label>
                    <input name="price" type="text" placeholder="500,000" value={form.price} onChange={ch} className="neu-input"/>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Tu teléfono *</label>
                    <input name="phone" type="tel" required placeholder="809-000-0000" value={form.phone} onChange={ch} className="neu-input"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Notas adicionales</label>
                  <textarea name="notes" rows={3} placeholder="Accesorios, historial, detalle que quieras compartir..." value={form.notes} onChange={ch} 
                    style={{ ...inp, resize:'none' }}/>
                </div>

                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 py-4 mt-2">
                  <Send size={14}/>Enviar por WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
