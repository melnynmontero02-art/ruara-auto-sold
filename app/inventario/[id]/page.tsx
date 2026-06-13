import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { vehicles, getVehicleById } from '@/lib/data'
import VehicleDetail from '@/components/sections/VehicleDetail'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return vehicles.map(v => ({ id: String(v.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const v = getVehicleById(Number(id))
  if (!v) return { title: 'Vehículo no encontrado | RUARA AUTO SOLD' }
  return {
    title: `${v.brand} ${v.model} ${v.year} | RUARA AUTO SOLD`,
    description: `${v.brand} ${v.model} ${v.year} · ${v.mileage} · ${v.fuel} · Precio desde RD$${(v.price/1000).toFixed(0)}K. Financiamiento flexible con múltiples bancos.`,
    openGraph: {
      title: `${v.brand} ${v.model} ${v.year} | RUARA AUTO SOLD`,
      images: [v.image],
    },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const vehicle = getVehicleById(Number(id))
  if (!vehicle) notFound()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '104px' }}>
        <VehicleDetail vehicle={vehicle} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
