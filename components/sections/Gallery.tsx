'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, Images } from 'lucide-react'
import { galleryImages } from '@/lib/data'

export default function Gallery() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [box, setBox]   = useState<number|null>(null)
  const [srcs, setSrcs] = useState<Record<number,string>>({})
  const [errs, setErrs] = useState<Record<number,boolean>>({})

  const getImg = (img: typeof galleryImages[0]) => srcs[img.id] ?? img.src
  const handleErr = (img: typeof galleryImages[0]) => {
    if (!srcs[img.id]||srcs[img.id]===img.src) setSrcs(p=>({...p,[img.id]:img.fallback}))
    else setErrs(p=>({...p,[img.id]:true}))
  }
  const current = box!==null ? galleryImages[box] : null

  return (
    <section id="galeria" style={{ background:'var(--surface)', padding:'clamp(48px, 8vw, 96px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}
            className="section-label mb-5 mx-auto w-fit"><Images size={10}/>Nuestra flota</motion.div>
          <motion.h2 initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color:'var(--text)',  fontFamily:'Century Gothic, CenturyGothic, Josefin Sans, sans-serif', letterSpacing:'0.04em' }}>
            GALERÍA <span className="gold-text">PREMIUM</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:0.8,delay:0.2 }}
          className="masonry">
          {galleryImages.map((img,i) => (
            <motion.div key={img.id}
              initial={{ opacity:0,scale:0.96 }}
              whileInView={{ opacity:1,scale:1 }}
              viewport={{ once:true,margin:'-30px' }}
              transition={{ duration:0.5,delay:i*0.08 }}
              className="masonry-item gallery-item group cursor-pointer"
              style={{ minHeight:i%3===1?'290px':'200px' }}
              onClick={() => !errs[img.id]&&setBox(i)}>
              <div className="relative w-full h-full" style={{ minHeight:'inherit', background:'var(--surface)' }}>
                {!errs[img.id] ? (
                  <Image src={getImg(img)} alt={img.alt} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={()=>handleErr(img)}/>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,163,82,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
                      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background:'rgba(6,7,10,0.5)' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ background:'rgba(201,163,82,0.9)', boxShadow:'0 0 20px rgba(201,163,82,0.4)' }}>
                    <ZoomIn size={16} color="#060709"/>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ border:'1px solid rgba(201,163,82,0.3)' }}/>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {box!==null&&current&&(
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:'rgba(6,7,10,0.95)', backdropFilter:'blur(20px)' }}
            onClick={()=>setBox(null)}>
            <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }} exit={{ scale:0.9,opacity:0 }}
              transition={{ type:'spring',stiffness:280,damping:26 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
              onClick={e=>e.stopPropagation()}>
              <div className="relative w-full h-[70vh]">
                <Image src={getImg(current)} alt={current.alt} fill className="object-contain"/>
              </div>
            </motion.div>
            <button onClick={()=>setBox(null)}
              className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background:'var(--card-hover)', border:'1px solid rgba(255,255,255,0.12)', color:'var(--text-2)' }}>
              <X size={17}/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
