"use client"

import { ReactNode } from "react"

/**
 * Ticker horizontal infini — CSS pur pour fiabilité maximale.
 * Duplique le contenu pour une boucle sans couture.
 * Vitesse gérée via @keyframes dans globals.css.
 */
type Props = {
  items: ReactNode[]
  duration?: number
  className?: string
  direction?: "left" | "right"
}

export default function Marquee({
  items,
  duration = 28,
  className = "",
  direction = "left",
}: Props) {
  const sequence = [...items, ...items]
  const animName = direction === "left" ? "marquee-left" : "marquee-right"

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="marquee-track flex gap-12 whitespace-nowrap w-max"
        style={{
          animation: `${animName} ${duration}s linear infinite`,
        }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            {item}
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  )
}
