"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("rgpd-consent")
    if (!consent) {
      // Petit délai pour ne pas bloquer le rendu initial
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    localStorage.setItem("rgpd-consent", "accepted")
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem("rgpd-consent", "refused")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[60] max-w-[900px] md:mx-auto"
        >
          <div className="relative bg-ink border-l-4 border-terracotta shadow-2xl px-5 py-4 md:px-8 md:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icône */}
            <Cookie size={20} strokeWidth={1.5} className="text-terracotta shrink-0 mt-0.5 sm:mt-0" />

            {/* Texte */}
            <p className="flex-1 text-[13px] text-paper/85 leading-relaxed">
              Ce site n'utilise aucun cookie de suivi ni de publicité. Aucune donnée personnelle
              n'est vendue ni transmise à des tiers.{" "}
              <a
                href="/cookies"
                className="text-terracotta-soft underline underline-offset-2 hover:text-paper transition-colors"
              >
                En savoir plus
              </a>
              .
            </p>

            {/* Boutons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={refuse}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-bold border border-paper/20 text-paper/60 hover:text-paper hover:border-paper/50 transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-bold bg-terracotta text-paper hover:bg-terracotta-soft transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={refuse}
                aria-label="Fermer"
                className="ml-1 text-paper/40 hover:text-paper transition-colors"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
