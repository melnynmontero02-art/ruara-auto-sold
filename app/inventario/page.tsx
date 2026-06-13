import type { Metadata } from 'next'
import InventoryPage from '@/components/sections/InventoryPage'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: 'Inventario | RUARA AUTO SOLD',
  description: 'Explora nuestro inventario completo de vehículos importados de Japón y USA. Sedanes, SUVs, Pickups y más. Financiamiento flexible con múltiples bancos.',
  keywords: 'inventario autos Santo Domingo, carros en venta RD, SUV, sedán, pickup, importados',
}

export default function InventarioPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '104px' }}>
        <InventoryPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
