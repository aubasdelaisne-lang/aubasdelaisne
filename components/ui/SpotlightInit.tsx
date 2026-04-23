"use client"

import { useEffect } from "react"

/**
 * Installe un tracker global qui met à jour les CSS variables
 * --mouse-x / --mouse-y sur tout élément possédant la classe `.spotlight`
 * que le curseur survole. Utilise requestAnimationFrame pour la perf.
 *
 * Désactivé automatiquement sur écrans tactiles (aucun hover possible).
 */
export default function SpotlightInit() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return

    let rafId: number | null = null
    let lastEvent: PointerEvent | null = null

    function apply() {
      rafId = null
      if (!lastEvent) return
      const target = lastEvent.target as Element | null
      const el = target?.closest?.(".spotlight") as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty("--mouse-x", `${lastEvent.clientX - rect.left}px`)
      el.style.setProperty("--mouse-y", `${lastEvent.clientY - rect.top}px`)
    }

    function onMove(e: PointerEvent) {
      lastEvent = e
      if (rafId === null) rafId = requestAnimationFrame(apply)
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
