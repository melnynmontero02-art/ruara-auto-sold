import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import Hero             from '@/components/sections/Hero'
import Inventory        from '@/components/sections/Inventory'
import VerifiedVehicles from '@/components/sections/VerifiedVehicles'
import FinancingCalculator from '@/components/sections/FinancingCalculator'
import SellVehicle      from '@/components/sections/SellVehicle'
import Benefits         from '@/components/sections/Benefits'
import Testimonials     from '@/components/sections/Testimonials'
import CTA              from '@/components/sections/CTA'
import Contact          from '@/components/sections/Contact'
import InstagramBanner  from '@/components/sections/InstagramBanner'
import WhatsAppButton   from '@/components/ui/WhatsAppButton'
import ScrollProgress   from '@/components/ui/ScrollProgress'
import ScrollAnimations from '@/components/ui/ScrollAnimations'

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <ScrollAnimations />
      <Navbar />

      {/* 1. Hero — video scrub */}
      <Hero />

      {/* 2. Inventario + filtros */}
      <Inventory />

      {/* 3. Vehículos verificados */}
      <VerifiedVehicles />

      {/* 4. Financiamiento */}
      <FinancingCalculator />

      {/* 5. Vende tu vehículo */}
      <SellVehicle />

      {/* 6. Por qué RUARA */}
      <Benefits />

      {/* 7. Testimonios */}
      <Testimonials />

      {/* 8. CTA */}
      <CTA />

      {/* 9. Contacto */}
      <Contact />

      {/* 10. Instagram */}
      <InstagramBanner />

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
