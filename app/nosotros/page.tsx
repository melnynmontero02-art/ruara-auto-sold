import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Nosotros from '@/components/pages/Nosotros'

export const metadata: Metadata = {
  title: 'Nosotros | RUARA AUTO SOLD',
  description: 'Conoce a RUARA AUTO SOLD — más de 5 años siendo el dealer de confianza en Santo Domingo Este, República Dominicana. Vehículos importados con financiamiento flexible.',
}

export default function NosotrosPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '104px' }}>
        <Nosotros />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
