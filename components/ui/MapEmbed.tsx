"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { getConsent, setConsent, type ConsentValue } from "@/lib/consent"

type Props = {
  src: string
  mapsUrl: string
  className?: string
}

/**
 * Carte OpenStreetMap chargée uniquement après consentement (RGPD) —
 * la page OSM embarquée est un domaine tiers qui peut déposer ses propres
 * cookies. Sans consentement, on affiche un aperçu + un lien direct vers
 * Google Maps (aucun cookie, simple lien sortant).
 */
export default function MapEmbed({ src, mapsUrl, className = "" }: Props) {
  const [consent, setConsentState] = useState<ConsentValue | null>(null)

  useEffect(() => {
    setConsentState(getConsent())
    const onChange = (e: Event) => {
      setConsentState((e as CustomEvent<ConsentValue | null>).detail)
    }
    window.addEventListener("consent-changed", onChange)
    return () => window.removeEventListener("consent-changed", onChange)
  }, [])

  function allow() {
    setConsent("accepted")
    setConsentState("accepted")
  }

  if (consent === "accepted") {
    return (
      <iframe
        title="Localisation"
        src={src}
        className={className}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`${className} flex flex-col items-center justify-center gap-4 bg-cream-soft text-center px-6 py-10`}
    >
      <MapPin size={28} strokeWidth={1.6} className="text-sage-deep" />
      <p className="max-w-sm text-[13px] text-ink-soft leading-relaxed">
        La carte est fournie par un service tiers (OpenStreetMap). Elle ne s'affiche qu'avec
        votre accord.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={allow}
          className="bg-sage text-paper px-5 py-2.5 text-[12px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-sage-deep transition-colors"
        >
          Afficher la carte
        </button>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] tracking-[0.15em] uppercase font-bold text-sage-deep underline underline-offset-4 hover:text-terracotta transition-colors"
        >
          Voir sur Google Maps
        </a>
      </div>
    </div>
  )
}
