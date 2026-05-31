'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, MessageCircle, Send, Phone } from 'lucide-react'
import { WHATSAPP_URL, BUSINESS_ADDRESS } from '@/lib/data'

const inp: React.CSSProperties = {
  width:'100%', background:'#F8FAFC',
  border:'1.5px solid #E2E8F0', borderRadius:'10px',
  padding:'12px 16px', fontSize:'14px', color:'#0F172A', outline:'none', transition:'all 0.2s',
}
const foc = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
  e.target.style.borderColor='#C9A352'
  e.target.style.boxShadow='0 0 0 3px rgba(201,163,82,0.1)'
  e.target.style.background='#FFFFFF'
}
const blr = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
  e.target.style.borderColor='#E2E8F0'
  e.target.style.boxShadow='none'
  e.target.style.background='#F8FAFC'
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [form, setForm] = useState({ name:'',phone:'',email:'',vehicle:'',message:'' })

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
    <section id="contacto" style={{ background:'#F8FAFC', padding:'96px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit"><Phone size={10}/>Estamos para servirte
          </motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily:'Syncopate,sans-serif', letterSpacing:'0.04em' }}>
            CONTÁCTANOS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity:0,x:-24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7,delay:0.18 }}
            className="contact-info space-y-5">
            {[
              { icon:<MapPin size={15} style={{ color:'#C9A352' }}/>, title:'Ubicación', text:BUSINESS_ADDRESS,
                bg:'rgba(201,163,82,0.07)', border:'rgba(201,163,82,0.15)' },
              { icon:<MessageCircle size={15} style={{ color:'#25D366' }}/>, title:'WhatsApp', text:null,
                bg:'rgba(37,211,102,0.07)', border:'rgba(37,211,102,0.15)' },
            ].map((item,i) => (
              <div key={i} className="flex gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:item.bg, border:`1px solid ${item.border}` }}>{item.icon}</div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm mb-0.5">{item.title}</div>
                  {item.text
                    ? <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                    : <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-ruara-gold transition-colors"
                        style={{ color:'#64748B' }}
                        onMouseEnter={e=>(e.currentTarget.style.color='#C9A352')}
                        onMouseLeave={e=>(e.currentTarget.style.color='#64748B')}>
                        Escríbenos directamente →
                      </a>
                  }
                </div>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden mt-2"
              style={{ border:'1px solid rgba(0,0,0,0.07)', height:'300px', boxShadow:'0 2px 14px rgba(0,0,0,0.05)' }}>
              <iframe
                src="https://maps.google.com/maps?q=F5PX%2BQ7+Santo+Domingo&output=embed"
                width="100%" height="100%" style={{ border:0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación RUARA AUTO SOLD"/>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0,x:24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7,delay:0.22 }}
            className="contact-form">
            <div className="rounded-2xl p-8" style={{ background:'#FFFFFF', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)' }}>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-7"
                style={{ fontFamily:'Syncopate,sans-serif', color:'#8B6A20' }}>Enviar Consulta</h3>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">Nombre *</label>
                    <input name="name" type="text" required placeholder="Tu nombre"
                      value={form.name} onChange={ch} onFocus={foc} onBlur={blr} style={inp}/>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">Teléfono *</label>
                    <input name="phone" type="tel" required placeholder="809-000-0000"
                      value={form.phone} onChange={ch} onFocus={foc} onBlur={blr} style={inp}/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Email</label>
                  <input name="email" type="email" placeholder="tu@email.com"
                    value={form.email} onChange={ch} onFocus={foc} onBlur={blr} style={inp}/>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Vehículo de interés</label>
                  <input name="vehicle" type="text" placeholder="Civic, Elantra, Kicks..."
                    value={form.vehicle} onChange={ch} onFocus={foc} onBlur={blr} style={inp}/>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Mensaje</label>
                  <textarea name="message" rows={4} placeholder="¿En qué podemos ayudarte?"
                    value={form.message} onChange={ch} onFocus={foc} onBlur={blr}
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
