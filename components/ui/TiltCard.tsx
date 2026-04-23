"use client"

import { useRef, ReactNode, MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

/**
 * Carte 3D subtile qui suit le curseur.
 * Tilt doux (max 6°) — reste pro et vintage-friendly.
 */
type Props = {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

export default function TiltCard({ children, className = "", max = 6, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"])

  function handleMove(e: MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      data-tilt
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative h-full">
        {children}
      </div>
      {glare && (
        <motion.div
          aria-hidden
          style={
            {
              background: `radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.35), transparent 55%)`,
              ["--x" as string]: glareX,
              ["--y" as string]: glareY,
            } as React.CSSProperties
          }
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
        />
      )}
    </motion.div>
  )
}
