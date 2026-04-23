"use client"

import { useEffect, useState } from "react"

/**
 * Retourne true si l'appareil est tactile (pas de hover, pointer coarse).
 * Utilisé pour déclencher des animations auto-cycliques qui remplacent
 * les effets `whileHover` sur mobile.
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)")
    setIsTouch(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return isTouch
}
