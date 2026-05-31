'use client'

// Removed: GSAP ScrollTrigger was conflicting with Framer Motion useScroll,
// creating a double animation loop that caused scroll lag.
// All reveals are now handled by Framer Motion useInView only.
export default function ScrollAnimations() {
  return null
}
