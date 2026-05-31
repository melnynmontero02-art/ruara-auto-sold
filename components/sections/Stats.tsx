'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '@/lib/data'

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const t0 = Date.now(); const dur = 1600
    const tick = () => {
      const p = Math.min((Date.now()-t0)/dur,1)
      setN(Math.round(target*(1-Math.pow(1-p,3))))
      if (p<1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref} style={{ fontFamily:'Space Mono,monospace' }}>{n}{suffix}</span>
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin:'-60px' })

  return (
    <section id="stats-bar" style={{ background:'#0F172A', borderTop:'3px solid #C9A352' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:16 }}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.6, delay:i*0.1 }}
              className="flex flex-col items-center text-center relative">
              {i>0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-8" style={{ background:'rgba(255,255,255,0.1)' }} />}
              <div className="text-4xl md:text-5xl font-bold mb-2 gold-text">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs tracking-widest" style={{ color:'rgba(255,255,255,0.5)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
