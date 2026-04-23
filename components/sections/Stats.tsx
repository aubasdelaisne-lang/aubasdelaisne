"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Recycle, Users, ShoppingBag, Calendar, TrendingUp } from "lucide-react"
import { STATS } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"

const statIcons = [Recycle, Users, ShoppingBag, Calendar] as const

// Formes asymétriques alternées pour varier le rythme visuel
const shapeClasses = [
  "rounded-tl-[50px] rounded-br-[50px]",
  "rounded-tr-[50px] rounded-bl-[50px]",
  "rounded-tl-[50px] rounded-br-[50px]",
  "rounded-tr-[50px] rounded-bl-[50px]",
]

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
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
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-cream-soft overflow-hidden">
      {/* Motifs décoratifs de fond */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(239,95,23,0.08),transparent_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(25,20,101,0.1),transparent_70%)] blur-2xl"
      />

      <div className="relative max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Notre Impact"
          title="Dix ans d'engagement local."
          lede="Des chiffres qui racontent un territoire — objets sauvés, emplois créés, dons collectés."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((s, i) => {
            const Icon = statIcons[i]
            const delay = i * 0.12
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative bg-sage text-paper px-5 py-10 md:py-12 border-2 border-ink/10 overflow-hidden transition-all duration-500 cursor-default ${shapeClasses[i]} hover:border-terracotta hover:shadow-[0_20px_40px_-15px_rgba(239,95,23,0.4)]`}
              >
                {/* Fond qui glisse au hover : bleu → orange subtil */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta/0 to-terracotta/0 group-hover:from-terracotta/20 group-hover:to-terracotta/5 transition-all duration-700"
                />

                {/* Texture paper */}
                <span aria-hidden className="pointer-events-none absolute inset-0 paper-texture opacity-60" />

                {/* Shimmer sweep au hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-paper/20 to-transparent skew-x-[-18deg] group-hover:left-[150%] transition-[left] duration-[1200ms] ease-out"
                />

                {/* Trait haut terracotta animé */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 right-0 h-[3px] bg-terracotta origin-left"
                />

                {/* Icône en haut */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: delay + 0.35,
                  }}
                  className="relative z-10 w-12 h-12 mx-auto mb-6 rounded-full bg-paper/10 group-hover:bg-terracotta group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center transition-all duration-500"
                >
                  <Icon size={20} strokeWidth={1.8} className="text-paper" />
                </motion.div>

                {/* Grand chiffre */}
                <div className="relative z-10 font-display font-bold text-[2.75rem] md:text-6xl leading-none tabular-nums text-center group-hover:text-terracotta-soft transition-colors duration-500">
                  <Counter target={s.value} />
                </div>

                {/* Divider animé */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: delay + 0.7 }}
                  className="relative z-10 block h-px w-10 bg-terracotta/70 mx-auto mt-5 origin-center group-hover:w-16 group-hover:bg-terracotta transition-all duration-500"
                />

                {/* Unité + label */}
                <div className="relative z-10 mt-4 text-center">
                  <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-paper/90 group-hover:text-paper">
                    {s.unit}
                  </div>
                  <div className="mt-2 text-[13px] text-paper/75 group-hover:text-paper/95 leading-snug transition-colors duration-500">
                    {s.label}
                  </div>
                </div>

                {/* Petit badge coin au hover : flèche montante */}
                <motion.div
                  aria-hidden
                  initial={false}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-terracotta flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                >
                  <TrendingUp size={13} strokeWidth={2.4} className="text-paper" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Ligne de contexte */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center text-[13px] text-ink-soft italic max-w-2xl mx-auto"
        >
          Chaque geste compte. Chaque objet sauvé prolonge l'histoire de notre territoire.
        </motion.p>
      </div>
    </section>
  )
}
