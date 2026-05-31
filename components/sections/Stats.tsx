"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { STATS } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"

const ease = [0.22, 1, 0.36, 1] as const

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
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax léger des blobs de fond selon le scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-cream-soft overflow-hidden">
      {/* Motifs décoratifs de fond avec parallax */}
      <motion.div
        aria-hidden
        style={{ y: blob1Y }}
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(239,95,23,0.12),transparent_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blob2Y }}
        className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(25,20,101,0.14),transparent_70%)] blur-2xl"
      />

      <div className="relative max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Notre Impact"
          title="Dix ans d'engagement local."
          lede="Des chiffres qui racontent un territoire — objets sauvés, emplois créés, dons collectés."
        />

        {/* Cartes épurées : grands chiffres, fine ligne terracotta, séparateurs verticaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-0">
          {STATS.map((s, i) => {
            const delay = i * 0.12
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay, ease }}
                className="group relative text-center md:text-left md:px-8 first:md:pl-0 last:md:pr-0 md:[&:not(:first-child)]:border-l md:border-sage/15"
              >
                {/* Grand chiffre */}
                <div className="font-display font-bold text-[3.5rem] sm:text-7xl md:text-[5rem] leading-[0.9] tracking-tight tabular-nums text-sage-deep transition-colors duration-500 group-hover:text-terracotta">
                  <Counter target={s.value} />
                </div>

                {/* Fine ligne terracotta */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: delay + 0.3, ease }}
                  className="block h-1 w-12 bg-terracotta rounded-full mt-5 mx-auto md:mx-0 origin-center md:origin-left transition-[width] duration-500 group-hover:w-20"
                />

                {/* Unité */}
                <div className="mt-5 text-[12px] uppercase tracking-[0.25em] font-bold text-sage-deep">
                  {s.unit}
                </div>

                {/* Label */}
                <div className="mt-1.5 text-[13px] text-ink-soft leading-snug">
                  {s.label}
                </div>
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
          className="mt-16 text-center text-[13px] text-ink-soft italic max-w-2xl mx-auto"
        >
          Chaque geste compte. Chaque objet sauvé prolonge l'histoire de notre territoire.
        </motion.p>
      </div>
    </section>
  )
}
