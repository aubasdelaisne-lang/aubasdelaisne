"use client"

import { motion } from "framer-motion"

type Props = {
  size?: number
  points?: number
  color?: string
  className?: string
  spin?: boolean
  duration?: number
}

export default function Starburst({
  size = 120,
  points = 20,
  color = "currentColor",
  className = "",
  spin = true,
  duration = 60,
}: Props) {
  const cx = 50
  const cy = 50
  const outer = 48
  const inner = 36
  const step = (Math.PI * 2) / (points * 2)

  let d = ""
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = i * step - Math.PI / 2
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2) + " "
  }
  d += "Z"

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration, repeat: Infinity, ease: "linear" } : undefined}
    >
      <path d={d} fill={color} />
    </motion.svg>
  )
}
