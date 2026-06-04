import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import Hero             from '@/components/sections/Hero'
import Stats            from '@/components/sections/Stats'
import Inventory        from '@/components/sections/Inventory'
import VerifiedVehicles from '@/components/sections/VerifiedVehicles'
import FinancingCalculator from '@/components/sections/FinancingCalculator'
import SellVehicle      from '@/components/sections/SellVehicle'
import Benefits         from '@/components/sections/Benefits'
import Gallery          from '@/components/sections/Gallery'
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

      {/* 2. Quick stats */}
      <Stats />

      {/* 3. Inventario + filtros */}
      <Inventory />

      {/* 4. Vehículos verificados */}
      <VerifiedVehicles />

      {/* 5. Financiamiento */}
      <FinancingCalculator />

      {/* 6. Vende tu vehículo */}
      <SellVehicle />

      {/* 7. Por qué RUARA */}
      <Benefits />

      {/* 8. Galería */}
      <Gallery />

      {/* 9. Testimonios */}
      <Testimonials />

      {/* 10. CTA */}
      <CTA />

      {/* 11. Contacto */}
      <Contact />

      {/* 12. Instagram */}
      <InstagramBanner />

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
