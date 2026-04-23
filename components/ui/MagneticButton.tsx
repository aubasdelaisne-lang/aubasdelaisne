"use client"

import { useRef, useState, ReactNode, MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

/**
 * Bouton magnétique — suit subtilement le curseur.
 * À utiliser pour CTAs premium. Conserve le style vintage.
 */
type Props = {
  children: ReactNode
  as?: "button" | "a"
  href?: string
  className?: string
  strength?: number
  onClick?: () => void
}

export default function MagneticButton({
  children,
  as = "a",
  href,
  className = "",
  strength = 0.35,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  // Light parallax on inner label
  const lx = useTransform(sx, (v) => v * 0.55)
  const ly = useTransform(sy, (v) => v * 0.55)

  const [hover, setHover] = useState(false)

  function handleMove(e: MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
    setHover(false)
  }

  const Comp = as === "a" ? motion.a : motion.button
  const props = as === "a" ? { href } : { type: "button" as const, onClick }

  return (
    <Comp
      ref={ref as never}
      {...props}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 ${className}`}
    >
      <motion.span
        style={{ x: lx, y: ly }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
      {/* Reveal overlay */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 origin-left bg-ink/10 pointer-events-none"
      />
    </Comp>
  )
}
