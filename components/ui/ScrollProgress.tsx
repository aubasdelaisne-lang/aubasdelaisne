"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Barre de progression fine en haut de la page qui suit le scroll.
 * Très visible sur mobile où l'on scrolle beaucoup.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-terracotta z-[100] origin-left"
    />
  )
}
