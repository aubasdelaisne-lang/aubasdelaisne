"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Reveal de texte par masque : le contenu monte depuis derrière une ligne
 * invisible (overflow-hidden), effet premium façon Awwwards. Fonctionne avec
 * n'importe quel contenu (texte, spans, <br/>). Respecte prefers-reduced-motion.
 */
export default function RevealText({ children, className = "", delay = 0 }: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className={`block ${className}`}>{children}</span>
  }

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  )
}
