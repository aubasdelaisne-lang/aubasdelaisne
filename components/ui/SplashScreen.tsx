"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

/* Timeline (~2,5 s) :
   0,2  logo papillon scale-in + fade  (0,6 s)
   0,8  "Au Bas de l'Aisne" slide-up   (0,7 s)
   1,3  tagline fade-in                (0,5 s)
   2,5  iris close                     (0,9 s)
   Clic ou touche = passage immédiat. Une fois par session. */

type Phase = "checking" | "showing" | "done"

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("checking")

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) {
      setPhase("done")
      return
    }
    sessionStorage.setItem("splash_shown", "1")
    setPhase("showing")
    const t = setTimeout(() => setPhase("done"), 2500)
    return () => clearTimeout(t)
  }, [])

  const skip = useCallback(() => setPhase("done"), [])

  useEffect(() => {
    if (phase !== "showing") return
    window.addEventListener("keydown", skip)
    return () => window.removeEventListener("keydown", skip)
  }, [phase, skip])

  return (
    <>
      {/* Bloque le Hero pendant le check sessionStorage (évite le flash) */}
      {phase === "checking" && (
        <div className="fixed inset-0 z-[9999] bg-paper" aria-hidden />
      )}
      <style>{`
        @keyframes _splash-logo {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes _splash-slide-up {
          from { transform: translateY(110%); }
          to   { transform: translateY(0%); }
        }
        @keyframes _splash-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <AnimatePresence>
        {phase === "showing" && (
          <motion.div
            key="splash"
            initial={{ clipPath: "circle(150% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            onClick={skip}
            className="fixed inset-0 z-[9999] bg-sage overflow-hidden cursor-pointer select-none flex flex-col items-center justify-center gap-5"
            aria-label="Écran d'ouverture — cliquez pour passer"
          >
            {/* Logo */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ opacity: 0, animation: "_splash-logo 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards" }}
            >
              <Image
                src="/images/papillon-icon-180.png"
                alt=""
                width={96}
                height={96}
                priority
              />
            </div>

            {/* Nom */}
            <div className="text-center px-6">
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  className="block font-display font-medium text-paper leading-none tracking-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 1rem + 2.5vw, 2.8rem)",
                    transform: "translateY(110%)",
                    animation: "_splash-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards",
                  }}
                >
                  Au Bas de l&apos;Aisne
                </span>
              </span>
              <p
                className="mt-3 text-paper/80 tracking-[0.2em] uppercase"
                style={{
                  fontSize: "clamp(0.75rem, 0.65rem + 0.5vw, 1rem)",
                  opacity: 0,
                  animation: "_splash-fade-in 0.5s ease-out 1.3s forwards",
                }}
              >
                Ressourcerie · Château-Thierry
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
