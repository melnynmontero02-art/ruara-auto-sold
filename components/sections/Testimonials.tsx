'use client'

import { motion } from 'framer-motion'
import TestimonialCarousel from '@/components/ui/testimonial-carousel'

const title = 'Lo que dicen nuestros clientes'
const titleWords = title.split(' ')

const ruaraTestimonials = [
  {
    name: 'Carlos Mejía',
    handle: 'Santo Domingo Este',
    description: 'Excelente servicio. Me aprobaron el financiamiento en menos de 24 horas y el proceso fue muy transparente. Mi Ford Explorer está impecable.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format',
  },
  {
    name: 'María Rodríguez',
    handle: 'Boca Chica',
    description: 'Compré mi Elantra con inicial bajita y el proceso fue rapidísimo. El equipo de RUARA es honesto y muy profesional. 100% recomendado.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format',
  },
  {
    name: 'Junior Taveras',
    handle: 'San Pedro de Macorís',
    description: 'Busqué en varios dealers y ninguno me dio el trato que recibí aquí. La inicial fue flexible y el banco aprobó en tiempo récord.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format',
  },
  {
    name: 'Ana Pérez',
    handle: 'Santo Domingo Norte',
    description: 'Mi Honda CRV llegó en perfectas condiciones. Documentación completa y sin sorpresas. Un dealer de confianza real.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&auto=format',
  },
  {
    name: 'Roberto Familia',
    handle: 'La Romana',
    description: 'Tercera vez que compro con RUARA. Siempre el mejor trato, los mejores precios y la aprobación más rápida del mercado.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format',
  },
  {
    name: 'Patricia Sánchez',
    handle: 'Santiago',
    description: 'Me ayudaron a escoger el Nissan Kicks ideal para mi presupuesto. El asesor fue muy paciente, claro y honesto en todo momento.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="relative w-full flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, var(--tint) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-label"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text)' }} />
            +500 clientes satisfechos
          </motion.div>

          {/* Title — word-by-word reveal */}
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: 'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', color: 'var(--text)' }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeInOut' }}
                className="mr-3 inline-block"
              >
                {i === 3 || i === 4 ? (
                  <span className="text-accent">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-base md:text-lg max-w-xl"
            style={{ color: 'var(--text-2)' }}
          >
            Más de 500 familias dominicanas confían en RUARA AUTO SOLD.
            <br className="hidden sm:block" />
            Su experiencia habla por nosotros.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full"
        >
          <TestimonialCarousel data={ruaraTestimonials} borderType="solid" />
        </motion.div>
      </div>
    </section>
  )
}
