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
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 sm:rounded-3xl md:flex-row"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-900 sm:top-4 sm:right-4 sm:h-9 sm:w-9"
              >
                <X size={18} />
              </button>

              {/* Imagen promo */}
              <div className="relative h-32 w-full shrink-0 sm:h-48 md:h-auto md:w-[42%]">
                <Image
                  src="/images/promo/feria-bhd.jpg"
                  alt="Feria Fleximóvil BHD - RUARA AUTO SOLD"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 p-4 sm:p-6 md:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                  Feria Fleximóvil BHD
                </span>

                <h2 className="mt-2 text-xl font-extrabold leading-tight text-slate-900 sm:mt-3 sm:text-2xl md:text-3xl">
                  Tasas fijas desde <span className="text-amber-600">8.95%</span>
                </h2>
                <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                  Financia tu próximo vehículo con las mejores tasas del Banco BHD, en alianza con RUARA AUTO SOLD.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-4 sm:gap-2 sm:grid-cols-4">
                  {RATES.map(r => (
                    <div key={r.label} className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-center sm:py-2.5">
                      <p className="text-sm font-extrabold text-slate-900 sm:text-base">{r.value}</p>
                      <p className="text-[10px] font-medium text-slate-500 sm:text-[11px]">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 rounded-2xl bg-slate-900 px-4 py-2.5 text-center sm:mt-3 sm:py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Vehículos usados</p>
                  <p className="text-base font-extrabold text-white sm:text-lg">13.25% tasa fija por 2 años</p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500 sm:mt-4">
                  <Calendar size={14} className="shrink-0" />
                  Válido del 11 al 14 de junio &mdash; ¡últimos días!
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row">
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
