'use client'

import { MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { WHATSAPP_URL, BUSINESS_ADDRESS, INSTAGRAM_URL } from '@/lib/data'

const links = [
  { label:'Inventario',     href:'#inventario' },
  { label:'Financiamiento', href:'#financiamiento' },
  { label:'Beneficios',     href:'#beneficios' },
  { label:'Galería',        href:'#galeria' },
  { label:'Testimonios',    href:'#testimonios' },
  { label:'Contacto',       href:'#contacto' },
]

export default function Footer() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })

  return (
    <footer style={{ background:'#03040A', borderTop:'1px solid rgba(201,163,82,0.12)' }}>
      {/* Top gold line */}
      <div className="w-32 h-px mx-auto"
        style={{ background:'linear-gradient(90deg,transparent,rgba(201,163,82,0.6),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <div className="gold-text" style={{ fontFamily:'Syncopate,sans-serif', fontSize:'1.75rem', fontWeight:700, letterSpacing:'0.18em' }}>
                RUARA
              </div>
              <div style={{ fontSize:'8px', letterSpacing:'0.32em', color:'#C9A352', fontWeight:600, textTransform:'uppercase', marginTop:'2px' }}>
                AUTO SOLD
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color:'rgba(255,255,255,0.4)' }}>
              Tu dealer de confianza en República Dominicana. Vehículos importados con financiamiento flexible.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { href: INSTAGRAM_URL, icon:<Instagram size={14}/> },
                { href:'https://facebook.com',  icon:<Facebook size={14}/> },
                { href:WHATSAPP_URL,            icon:<MessageCircle size={14}/> },
              ].map((s,i)=>(
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(201,163,82,0.4)'; e.currentTarget.style.color='#C9A352' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.4)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ fontFamily:'Syncopate,sans-serif', color:'#C9A352' }}>
              Navegación
            </h4>
            <ul className="space-y-3">
              {links.map(l=>(
                <li key={l.label}>
                  <button onClick={()=>go(l.href)}
                    className="text-sm transition-colors duration-300"
                    style={{ color:'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ fontFamily:'Syncopate,sans-serif', color:'#C9A352' }}>
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={14} style={{ color:'#C9A352', flexShrink:0, marginTop:'2px' }} />
                <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.45)' }}>{BUSINESS_ADDRESS}</p>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex gap-3 group">
                <MessageCircle size={14} style={{ color:'#C9A352', flexShrink:0, marginTop:'2px' }} />
                <span className="text-sm transition-colors" style={{ color:'rgba(255,255,255,0.45)' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
                  onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}>
                  Escríbenos por WhatsApp →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:'12px' }}>© 2025 RUARA AUTO SOLD. Todos los derechos reservados.</p>
          <p style={{ color:'rgba(255,255,255,0.15)', fontSize:'12px' }}>Santo Domingo Este, República Dominicana</p>
        </div>
      </div>
    </footer>
  )
}
