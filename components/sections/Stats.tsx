"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { STATS } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = (target / duration) * step
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString("fr-FR")}</span>
}

export default function Stats() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-cream-soft">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Notre Impact"
          title="Dix ans d'engagement local."
          lede="Des chiffres qui racontent un territoire — objets sauvés, emplois créés, dons collectés."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-sage paper-texture text-paper text-center px-4 py-8 md:py-10 border-2 border-ink/10 hover:border-terracotta/50 relative overflow-hidden transition-colors cursor-default"
            >
              {/* Spotlight hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(200px_circle_at_center,rgba(255,255,255,0.18),transparent_60%)]"
              />
              {/* Trait haut terracotta comme les cartes Missions */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 right-0 h-0.5 bg-terracotta-soft origin-left"
              />
              <div className="relative z-10 font-display font-bold text-5xl md:text-6xl leading-none tabular-nums">
                <Counter target={s.value} />
              </div>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.6 }}
                className="block h-px w-8 bg-paper/50 mx-auto mt-4 origin-center"
              />
              <div className="relative z-10 mt-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-paper/90">
                {s.unit}
              </div>
              <div className="relative z-10 mt-2 text-[13px] text-paper/75 leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
