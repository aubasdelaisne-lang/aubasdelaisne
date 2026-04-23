"use client"

import { motion } from "framer-motion"

type Props = {
  /** Délai avant le premier sweep (en secondes). */
  delay?: number
  /** Durée d'un passage (gauche→droite ou droite→gauche). */
  duration?: number
  /** Intensité du reflet (0-1). */
  intensity?: number
  /** Temps d'attente entre chaque passage. */
  pause?: number
}

/**
 * Reflet lumineux diagonal qui traverse le bloc parent en aller-retour continu :
 * gauche → droite, pause, droite → gauche, pause, etc.
 * À placer dans un bloc `position: relative` + `overflow-hidden`.
 */
export default function ShineSweep({
  delay = 0.8,
  duration = 3.2,
  intensity = 0.15,
  pause = 2.5,
}: Props) {
  return (
    <motion.span
      aria-hidden
      initial={{ x: "-120%" }}
      animate={{ x: ["-120%", "180%", "180%", "-120%", "-120%"] }}
      transition={{
        times: [0, 0.35, 0.5, 0.85, 1],
        duration: duration * 2 + pause * 2,
        delay,
        ease: [0.22, 1, 0.36, 1],
        repeat: Infinity,
      }}
      className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-12deg] z-[1]"
      style={{
        background: `linear-gradient(to right, transparent, rgba(250,250,255,${intensity}), transparent)`,
      }}
    />
  )
}
