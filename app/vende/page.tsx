import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SellVehicle from '@/components/sections/SellVehicle'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Vende tu Vehículo | RUARA AUTO SOLD',
  description: 'Vende tu vehículo rápido y al mejor precio. Compramos tu carro en República Dominicana. Proceso sencillo y pago rápido.',
}

export default function VendePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '104px' }}>
        <SellVehicle />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
