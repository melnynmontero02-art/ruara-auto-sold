import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Contacto | RUARA AUTO SOLD',
  description: 'Contáctanos por WhatsApp o visítanos en Calle Las Palmeras Orientales #1, Res. Los Triunfadores, Santo Domingo Este, República Dominicana.',
}

export default function ContactoPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '80px' }}>
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
