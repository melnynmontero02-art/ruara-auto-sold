import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Servicios from '@/components/pages/Servicios'

export const metadata: Metadata = {
  title: 'Servicios | RUARA AUTO SOLD',
  description: 'Financiamiento flexible, vehículos verificados, asesoría personalizada, importación directa y más servicios de RUARA AUTO SOLD en Santo Domingo.',
}

export default function ServiciosPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '70px' }}>
        <Servicios />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
