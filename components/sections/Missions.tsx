"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Leaf, HeartHandshake, Briefcase } from "lucide-react"
import { MISSIONS } from "@/lib/constants"
import TiltCard from "@/components/ui/TiltCard"
import SectionHeader from "@/components/ui/SectionHeader"
import { useIsTouch } from "@/hooks/useIsTouch"

const icons = { Leaf, HeartHandshake, Briefcase } as const

const ease = [0.22, 1, 0.36, 1] as const

function MissionCard({
  mission,
  index,
  isActive,
}: {
  mission: (typeof MISSIONS)[number]
  index: number
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const Icon = icons[mission.iconKey as keyof typeof icons]
  const delay = index * 0.15

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      whileTap={{ scale: 0.98 }}
    >
      <TiltCard max={4} className="h-full">
        <article className={`relative border-2 p-8 md:p-10 flex flex-col h-full group overflow-hidden rounded-tl-[40px] rounded-br-[40px] transition-[border-color,box-shadow] duration-500 bg-sage paper-texture ${
          isActive
            ? "border-terracotta shadow-[0_20px_40px_-15px_rgba(239,95,23,0.45)]"
            : "border-ink/10 hover:border-terracotta hover:shadow-[0_20px_40px_-15px_rgba(239,95,23,0.35)]"
        }`}>
          {/* Overlay orange au hover / auto-actif */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
              isActive
                ? "from-terracotta/20 to-terracotta/5"
                : "from-terracotta/0 to-terracotta/0 group-hover:from-terracotta/20 group-hover:to-terracotta/5"
            }`}
          />

          {/* Shimmer diagonal */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-paper/15 to-transparent skew-x-[-18deg] transition-[left] duration-[1200ms] ease-out ${
              isActive ? "left-[150%]" : "-left-full group-hover:left-[150%]"
            }`}
          />

          {/* Ligne terracotta en haut */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + 0.3, ease }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left"
          />

          {/* Numéro + icône */}
          <div className="relative flex items-start justify-between mb-8">
            <div className="relative overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: delay + 0.1, ease }}
                className={`inline-block font-display font-bold text-6xl md:text-7xl leading-none transition-colors duration-500 ${
                  isActive ? "text-terracotta-soft" : "text-paper group-hover:text-terracotta-soft"
                }`}
              >
                {mission.num}
              </motion.span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: delay + 0.55, ease }}
                className="block h-0.5 w-10 bg-terracotta origin-left mt-2"
              />
            </div>

            {/* Icône */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: delay + 0.4 }}
              whileHover={{ rotate: 15, scale: 1.12 }}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-all duration-500 ${
                isActive
                  ? "bg-terracotta rotate-12 scale-110"
                  : "bg-paper/10 group-hover:bg-terracotta group-hover:rotate-12 group-hover:scale-110"
              }`}
            >
              <motion.span
                aria-hidden
                initial={{ scale: 1, opacity: 0.4 }}
                animate={inView ? { scale: 1.6, opacity: 0 } : {}}
                transition={{ duration: 1.4, delay: delay + 0.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-paper/20"
              />
              <Icon size={22} strokeWidth={1.6} className="relative text-paper" />
            </motion.div>
          </div>

          {/* Titre */}
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: delay + 0.3, ease }}
            className="relative font-display font-semibold text-2xl text-paper leading-tight mb-4"
          >
            {mission.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: delay + 0.5 }}
            className="relative text-[14px] text-paper/75 leading-relaxed"
          >
            {mission.description}
          </motion.p>

          {/* Chevron bas droite */}
          <motion.span
            aria-hidden
            className={`pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              isActive
                ? "border-terracotta text-terracotta opacity-100 translate-x-0"
                : "border-paper/30 text-paper/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-terracotta group-hover:text-terracotta"
            }`}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8m0 0L6 2m4 4L6 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        </article>
      </TiltCard>
    </motion.div>
  )
}

export default function Missions() {
  const isTouch = useIsTouch()
  const [active, setActive] = useState(-1)

  // Sur mobile : met en valeur une mission à tour de rôle
  useEffect(() => {
    if (!isTouch) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % MISSIONS.length)
    }, 2800)
    return () => clearInterval(id)
  }, [isTouch])

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Notre Mission"
          title={
            <>
              Des mains qui retrouvent confiance.
              <br />
              Des objets qui retrouvent leur utilité.
            </>
          }
          lede=""
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MISSIONS.map((m, i) => (
            <MissionCard key={m.title} mission={m} index={i} isActive={active === i} />
          ))}
        </div>
      </div>
    </section>
  )
}
