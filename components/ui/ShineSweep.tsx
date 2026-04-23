"use client"

import { motion } from "framer-motion"

type Props = {
  /** Délai avant le premier sweep (en secondes). Défaut : 0.2s. */
  delay?: number
  /** Durée d'un passage dans un sens. Défaut : 2.8s. */
  duration?: number
  /** Temps d'attente entre deux passages. Défaut : 1.8s. */
  pause?: number
  /** Intensité du reflet (0-1). Défaut : 0.18. */
  intensity?: number
}

/**
 * Reflet lumineux diagonal en aller-retour continu :
 * gauche→droite → pause → droite→gauche → pause → etc.
 *
 * À placer dans un parent `relative` + `overflow-hidden`.
 */
export default function ShineSweep({
  delay = 0.2,
  duration = 2.8,
  pause = 1.8,
  intensity = 0.18,
}: Props) {
  // Séquence : off-screen gauche → traversée → stationnement droite →
  // retour traversée → stationnement gauche. Les paliers créent les pauses.
  const total = duration * 2 + pause * 2
  const t1 = duration / total // fin du passage L→R
  const t2 = (duration + pause) / total // fin pause droite
  const t3 = (duration * 2 + pause) / total // fin passage R→L
  // t4 = 1 (fin pause gauche)

  return (
    <motion.span
      aria-hidden
      initial={{ x: "-130%" }}
      animate={{ x: ["-130%", "180%", "180%", "-130%", "-130%"] }}
      transition={{
        times: [0, t1, t2, t3, 1],
        duration: total,
        delay,
        ease: [0.45, 0, 0.55, 1],
        repeat: Infinity,
      }}
      className="pointer-events-none absolute inset-y-0 w-[38%] skew-x-[-14deg] z-[1] mix-blend-overlay"
      style={{
        background: `linear-gradient(
          to right,
          transparent 0%,
          rgba(250,250,255,${intensity * 0.4}) 25%,
          rgba(250,250,255,${intensity}) 50%,
          rgba(250,250,255,${intensity * 0.4}) 75%,
          transparent 100%
        )`,
      }}
    />
  )
}
