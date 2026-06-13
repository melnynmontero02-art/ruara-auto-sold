'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, MessageCircle, Send, Phone } from 'lucide-react'
import { WHATSAPP_URL, BUSINESS_ADDRESS } from '@/lib/data'

// All inputs use the .neu-input class (neumorphism from globals.css)
const I = 'neu-input'

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [form, setForm] = useState({ name:'', phone:'', email:'', vehicle:'', message:'' })

  const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p=>({...p,[e.target.name]:e.target.value}))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = encodeURIComponent(
      `Hola RUARA AUTO SOLD!\nNombre: ${form.name}\n📞 ${form.phone}\n📧 ${form.email}\n`+
      `🚗 ${form.vehicle||'Ver inventario'}\n💬 ${form.message}`
    )
    window.open(`${WHATSAPP_URL}?text=${t}`,'_blank')
  }

  return (
    <section id="contacto" style={{ background:'var(--bg)', padding:'clamp(48px, 8vw, 96px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit"><Phone size={10}/>Estamos para servirte</motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em' }}>CONTÁCTANOS</motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity:0,x:-24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7,delay:0.18 }}
            className="contact-info space-y-5">
            {[
              { icon:<MapPin size={15} style={{ color:'var(--text)' }}/>, title:'Ubicación', text:BUSINESS_ADDRESS, bg:'var(--tint)', border:'var(--tint-border)' },
              { icon:<MessageCircle size={15} style={{ color:'#25D366' }}/>, title:'WhatsApp', text:null, bg:'rgba(37,211,102,0.07)', border:'rgba(37,211,102,0.15)' },
            ].map((item,i) => (
              <div key={i} className="flex gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:item.bg, border:`1px solid ${item.border}` }}>{item.icon}</div>
                <div>
                  <div className="font-semibold text-sm mb-0.5" style={{ color:'var(--text)' }}>{item.title}</div>
                  {item.text
                    ? <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{item.text}</p>
                    : <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="text-sm transition-colors" style={{ color:'var(--text-2)' }}
                        onMouseEnter={e=>(e.currentTarget.style.color='#25D366')}
                        onMouseLeave={e=>(e.currentTarget.style.color='var(--text-2)')}>
                        Escríbenos directamente →
                      </a>
                  }
                </div>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden mt-2"
              style={{ border:'1px solid var(--border)', height:'300px' }}>
              <iframe src="https://maps.google.com/maps?q=F5PX%2BQ7+Santo+Domingo&output=embed"
                width="100%" height="100%"
                className="map-embed"
                style={{ border:0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación RUARA AUTO SOLD"/>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0,x:24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7,delay:0.22 }}
            className="contact-form">
            <div className="rounded-2xl p-8"
              style={{ background:'var(--card-bg)', border:'1px solid var(--border)' }}>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-7"
                style={{ fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color:'var(--text-3)' }}>Enviar Consulta</h3>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Nombre *</label>
                    <input name="name" type="text" required placeholder="Tu nombre" value={form.name} onChange={ch} className={I}/>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Teléfono *</label>
                    <input name="phone" type="tel" required placeholder="809-000-0000" value={form.phone} onChange={ch} className={I}/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Email</label>
                  <input name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={ch} className={I}/>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Vehículo de interés</label>
                  <input name="vehicle" type="text" placeholder="Civic, Elantra, Kicks..." value={form.vehicle} onChange={ch} className={I}/>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color:'var(--text-2)' }}>Mensaje</label>
                  <textarea name="message" rows={4} placeholder="¿En qué podemos ayudarte?" value={form.message} onChange={ch} 
                    className={I} style={{ resize:'none' }}/>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 mt-2">
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
