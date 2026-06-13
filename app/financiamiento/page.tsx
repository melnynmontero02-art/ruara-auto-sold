import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FinancingCalculator from '@/components/sections/FinancingCalculator'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Financiamiento | RUARA AUTO SOLD',
  description: 'Calcula tu cuota mensual y solicita tu aprobación de financiamiento hoy. Trabajamos con 8+ bancos. Inicial desde 10%, plazos de 12 a 84 meses.',
}

export default function FinanciamientoPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '104px' }}>
        <FinancingCalculator />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
