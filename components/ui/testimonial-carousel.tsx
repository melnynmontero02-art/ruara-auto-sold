'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  handle: string
  description: string
  image?: string
}

interface Props {
  data: Testimonial[]
  borderType?: 'solid' | 'dashed' | 'none'
}

function Card({ t, borderType }: { t: Testimonial; borderType: Props['borderType'] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl p-6 flex flex-col gap-4 select-none"
      style={{
        background: 'var(--card)',
        border: `1px ${borderType === 'dashed' ? 'dashed' : borderType === 'none' ? 'none' : 'solid'} var(--border)`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} style={{ color: '#C9A352', fill: '#C9A352' }} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>
        &ldquo;{t.description}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        {t.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={t.image}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B6A20, #C9A352)', color: '#060709' }}
          >
            {t.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.name}</div>
          <div className="text-xs" style={{ color: 'var(--text-3)' }}>{t.handle}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialCarousel({ data, borderType = 'solid' }: Props) {
  const trackRef  = useRef<HTMLDivElement>(null)
  const x         = useMotionValue(0)
  const controls  = useAnimation()
  const [paused,  setPaused]  = useState(false)
  const [dragging, setDragging] = useState(false)
  const velRef    = useRef(0)
  const animRef   = useRef<number>(0)

  const CARD_W    = 400  // approx card width + gap
  const TOTAL_W   = data.length * CARD_W

  // Auto-scroll loop
  useEffect(() => {
    let last = performance.now()

    const tick = (now: number) => {
      if (!paused && !dragging) {
        const dt  = (now - last) / 1000
        const spd = 60   // px per second
        let next  = x.get() - spd * dt

        // Seamless wrap
        if (next < -TOTAL_W) next += TOTAL_W
        if (next > 0)        next -= TOTAL_W

        x.set(next)
      }
      last = now
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [paused, dragging, x, TOTAL_W])

  const onDragStart = () => setDragging(true)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    velRef.current = info.velocity.x
    setDragging(false)
    // Apply momentum
    let pos = x.get()
    const glide = velRef.current * 0.3
    pos = Math.max(-TOTAL_W, Math.min(0, pos + glide))
    controls.start({ x: pos, transition: { type: 'spring', stiffness: 80, damping: 22 } })
    x.set(pos)
  }

  // Duplicate data for infinite feel
  const doubled = [...data, ...data]

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -TOTAL_W, right: 0 }}
        dragElastic={0.08}
        style={{ x, display: 'flex', gap: '20px', cursor: dragging ? 'grabbing' : 'grab', width: 'max-content' }}
        animate={controls}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {doubled.map((t, i) => (
          <Card key={i} t={t} borderType={borderType} />
        ))}
      </motion.div>
    </div>
  )
}
