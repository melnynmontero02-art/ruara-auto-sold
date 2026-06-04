'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────────────
   SectionHeading — title mask reveal + GSAP char split
   ───────────────────────────────────────────────────── */
export function SectionHeading({
  label,
  labelIcon,
  title,
  goldWord,
  subtitle,
  center = true,
}: {
  label?: string
  labelIcon?: React.ReactNode
  title: string
  goldWord?: string
  subtitle?: string
  center?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const titleParts = goldWord
    ? title.split(goldWord)
    : [title]

  return (
    <div ref={ref} className={`${center ? 'text-center' : ''} mb-14`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className={`section-label mb-5 ${center ? 'mx-auto' : ''} w-fit`}
        >
          {labelIcon}
          {label}
        </motion.div>
      )}

      {/* Title with clip-path mask reveal */}
      <div className="overflow-hidden mb-4">
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: 'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing: '0.04em' }}
        >
          {goldWord ? (
            <>
              {titleParts[0]}
              <span style={{
                background: 'linear-gradient(135deg, #8B6A20, #C9A352)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {goldWord}
              </span>
              {titleParts[1]}
            </>
          ) : title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className={`text-gray-500 max-w-lg ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   RevealOnScroll — generic wrapper for any child
   ───────────────────────────────────────────────────── */
export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 50 : 0,
    x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
