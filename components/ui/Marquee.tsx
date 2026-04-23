"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

/**
 * Ticker horizontal infini — style vintage.
 * Duplique le contenu pour un scroll sans couture.
 */
type Props = {
  items: ReactNode[]
  duration?: number
  className?: string
  direction?: "left" | "right"
}

export default function Marquee({
  items,
  duration = 40,
  className = "",
  direction = "left",
}: Props) {
  const sequence = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  )
}
