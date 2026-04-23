"use client"

import { motion } from "framer-motion"

type Props = {
  /** Délai avant le sweep (en secondes). Utile pour synchroniser avec les animations d'entrée. */
  delay?: number
  /** Durée du sweep. */
  duration?: number
  /** Intensité du reflet (0-1). Par défaut 0.15. */
  intensity?: number
  /** Si true, le sweep se répète en boucle toutes les ~8s. Par défaut : une seule fois à l'arrivée. */
  loop?: boolean
  /** Se déclenche quand l'élément entre dans le viewport plutôt qu'au montage. */
  onView?: boolean
}

/**
 * Reflet lumineux diagonal qui traverse le bloc parent.
 * À placer à l'intérieur d'un bloc en `position: relative` + `overflow-hidden`.
 */
export default function ShineSweep({
  delay = 0.4,
  duration = 2.2,
  intensity = 0.15,
  loop = false,
  onView = false,
}: Props) {
  const animateProps = loop
    ? {
        animate: { x: ["-120%", "180%"] },
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
          repeat: Infinity,
          repeatDelay: 5.5,
        },
      }
    : onView
    ? {
        whileInView: { x: "180%" },
        viewport: { once: true, margin: "-10%" },
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {
        animate: { x: "180%" },
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <motion.span
      aria-hidden
      initial={{ x: "-120%" }}
      {...animateProps}
      className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-12deg] z-[1]"
      style={{
        background: `linear-gradient(to right, transparent, rgba(250,250,255,${intensity}), transparent)`,
      }}
    />
  )
}
