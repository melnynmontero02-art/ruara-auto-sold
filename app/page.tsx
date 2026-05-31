import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Inventory from '@/components/sections/Inventory'
import FinancingCalculator from '@/components/sections/FinancingCalculator'
import Benefits from '@/components/sections/Benefits'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ScrollAnimations from '@/components/ui/ScrollAnimations'
import InstagramBanner from '@/components/sections/InstagramBanner'

export default function Home() {
  return (
    <main className="relative">
      {/* Global scroll FX — gold progress bar + GSAP ScrollTrigger */}
      <ScrollProgress />
      <ScrollAnimations />

      <Navbar />
      <Hero />
      <Stats />
      <Inventory />
      <FinancingCalculator />
      <Benefits />
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
      <InstagramBanner />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
