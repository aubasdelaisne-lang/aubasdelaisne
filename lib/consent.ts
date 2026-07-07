"use client"

/**
 * Gestion centralisée du consentement cookies (RGPD).
 * - Expire après 6 mois (recommandation CNIL) : au-delà, on redemande.
 * - Diffuse un événement "consent-changed" pour que tous les composants
 *   (carte, bandeau…) réagissent immédiatement sans recharger la page.
 */

export type ConsentValue = "accepted" | "refused"

const STORAGE_KEY = "rgpd-consent"
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6

type StoredConsent = { value: ConsentValue; date: number }

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: StoredConsent = JSON.parse(raw)
    if (Date.now() - parsed.date > SIX_MONTHS_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed.value
  } catch {
    return null
  }
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return
  const stored: StoredConsent = { value, date: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  window.dispatchEvent(new CustomEvent("consent-changed", { detail: value }))
}

/** Efface le choix et rouvre le bandeau — utilisé par "Gérer les cookies". */
export function resetConsent() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent("consent-changed", { detail: null }))
  window.dispatchEvent(new Event("open-cookie-banner"))
}
