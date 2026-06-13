'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/data'

const STORAGE_KEY = 'ruara_promo_bhd_jun2026'

const RATES = [
  { value: '8.95%', label: '6 meses' },
  { value: '9.25%', label: '1 año' },
  { value: '10.50%', label: '3 años' },
  { value: '12.95%', label: '5 años' },
]

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY)
    if (seen) return
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const waMsg = encodeURIComponent(
    'Hola RUARA AUTO SOLD! Vi la promo de la Feria Fleximóvil BHD y quiero información sobre el financiamiento.'
  )

  const handleCTA = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    window.open(`${WHATSAPP_URL}?text=${waMsg}`, '_blank', 'noopener,noreferrer')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={close}
            className="fixed inset-0 z-[999] bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 flex flex-col md:flex-row"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-900"
              >
                <X size={18} />
              </button>

              {/* Imagen promo */}
              <div className="relative h-48 w-full shrink-0 md:h-auto md:w-[42%]">
                <Image
                  src="/images/promo/feria-bhd.jpg"
                  alt="Feria Fleximóvil BHD - RUARA AUTO SOLD"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 p-6 md:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                  Feria Fleximóvil BHD
                </span>

                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
                  Tasas fijas desde <span className="text-amber-600">8.95%</span>
                </h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Financia tu próximo vehículo con las mejores tasas del Banco BHD, en alianza con RUARA AUTO SOLD.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {RATES.map(r => (
                    <div key={r.label} className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center">
                      <p className="text-base font-extrabold text-slate-900">{r.value}</p>
                      <p className="text-[11px] font-medium text-slate-500">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Vehículos usados</p>
                  <p className="text-lg font-extrabold text-white">13.25% tasa fija por 2 años</p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Calendar size={14} />
                  Válido del 11 al 14 de junio &mdash; ¡últimos días!
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleCTA}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Solicitar financiamiento
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={close}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
                  >
                    Ahora no
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
