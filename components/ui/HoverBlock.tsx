"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, useRef, MouseEvent } from "react"

/**
 * Bloc interactif universel : spotlight qui suit le curseur,
 * léger lift, trait terracotta animé, tilt micro.
 *
 * Utilisable autour de n'importe quelle carte — préserve le style vintage.
 */
type Props = {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "a"
  href?: string
  target?: string
  rel?: string
  /** Intensité du tilt en degrés (0 = désactivé). Par défaut 3°. */
  tilt?: number
  /** Couleur du spotlight (css). */
  spotlight?: string
  /** Désactive le spotlight si vrai (utile sur fond sauge). */
  noSpotlight?: boolean
}

export default function HoverBlock({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
  tilt = 3,
  spotlight = "rgba(184, 84, 58, 0.10)",
  noSpotlight = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 180, damping: 22 })
  const sy = useSpring(my, { stiffness: 180, damping: 22 })

  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt])
  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt])
  const spotX = useTransform(sx, (v) => `${v * 100}%`)
  const spotY = useTransform(sy, (v) => `${v * 100}%`)

  function onMove(e: MouseEvent) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function onLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  const Comp = as === "a" ? motion.a : as === "article" ? motion.article : motion.div
  const extraProps = as === "a" ? { href, target, rel } : {}

  return (
    <Comp
      ref={ref as never}
      {...extraProps}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={`group relative ${className}`}
    >
      {/* Spotlight qui suit le curseur */}
      {!noSpotlight && (
        <motion.span
          aria-hidden
          style={
            {
              background: `radial-gradient(220px circle at var(--x) var(--y), ${spotlight}, transparent 60%)`,
              ["--x" as string]: spotX,
              ["--y" as string]: spotY,
            } as React.CSSProperties
          }
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      {/* Trait terracotta en bas qui s'étend au hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-terracotta group-hover:w-full transition-[width] duration-500 ease-out"
      />

      <div style={{ transform: "translateZ(0)" }} className="relative h-full">
        {children}
      </div>
    </Comp>
  )
}
