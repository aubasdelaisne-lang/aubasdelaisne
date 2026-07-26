"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

type Props = {
  /** Sur fond clair (filaments navy + terracotta) ou sombre (blanc + terracotta) */
  variant?: "light" | "dark"
  className?: string
}

/**
 * Filaments SVG décoratifs qui se "dessinent" au fil du scroll, en cascade.
 * Purement décoratif (aria-hidden). À placer en premier enfant d'une section
 * `relative overflow-hidden` ; le contenu doit être en `relative z-10`.
 * Réutilisable sur tout le site.
 */
export default function ScrollFilaments({ variant = "light", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const d1 = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), { stiffness: 85, damping: 28 })
  const d2 = useSpring(useTransform(scrollYProgress, [0.05, 0.6], [0, 1]), { stiffness: 70, damping: 26 })
  const d3 = useSpring(useTransform(scrollYProgress, [0.1, 0.65], [0, 1]), { stiffness: 75, damping: 30 })
  const d4 = useSpring(useTransform(scrollYProgress, [0.15, 0.7], [0, 1]), { stiffness: 68, damping: 27 })
  const d5 = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), { stiffness: 72, damping: 29 })

  const accent = "239,95,23" // terracotta
  const neutral = variant === "dark" ? "255,255,255" : "25,20,101" // blanc ou navy

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.path d="M -60 980 C 100 780 280 500 550 320 C 780 170 1000 200 1260 60" stroke={`rgba(${accent},0.45)`} strokeWidth="2" strokeLinecap="round" style={{ pathLength: d1 }} />
        <motion.path d="M -40 700 C 200 620 420 660 640 500 C 860 340 1040 420 1260 300" stroke={`rgba(${accent},0.25)`} strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: d2 }} />
        <motion.path d="M -60 300 C 180 360 380 240 600 300 C 840 366 1020 260 1260 340" stroke={`rgba(${neutral},0.14)`} strokeWidth="1" strokeLinecap="round" style={{ pathLength: d3 }} />
        <motion.path d="M -40 120 C 220 240 460 180 700 260 C 920 334 1080 300 1260 420" stroke={`rgba(${accent},0.18)`} strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: d4 }} />
        <motion.path d="M -60 520 C 160 460 360 540 560 460 C 800 366 1040 540 1260 500" stroke={`rgba(${neutral},0.08)`} strokeWidth="1" strokeLinecap="round" style={{ pathLength: d5 }} />
      </svg>
    </div>
  )
}
