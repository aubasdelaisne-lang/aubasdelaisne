"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) return
    sessionStorage.setItem("splash_shown", "1")
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes _splash-fade-scale {
          from { opacity: 0; transform: scale(0.75); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes _splash-slide-up {
          from { transform: translateY(115%); }
          to   { transform: translateY(0%); }
        }
        @keyframes _splash-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes _splash-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sage"
          >
            {/* Papillon */}
            <div className="rounded-2xl overflow-hidden" style={{
              opacity: 0,
              animation: "_splash-fade-scale 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s forwards",
            }}>
              <Image
                src="/images/papillon-icon-180.png"
                alt="Au Bas de l'Aisne"
                width={88}
                height={88}
                priority
              />
            </div>

            {/* Nom — reveal par masque */}
            <div className="mt-7 overflow-hidden pb-[0.1em]">
              <p
                className="font-display font-medium text-paper text-[clamp(1.8rem,1rem+2.5vw,2.8rem)] leading-none tracking-tight"
                style={{
                  transform: "translateY(115%)",
                  animation: "_splash-slide-up 0.85s cubic-bezier(0.16,1,0.3,1) 0.45s forwards",
                }}
              >
                Au Bas de l&apos;Aisne
              </p>
            </div>

            {/* Sous-titre */}
            <p
              className="mt-3 text-paper/55 text-[11px] tracking-[0.3em] uppercase"
              style={{
                opacity: 0,
                animation: "_splash-fade-in 0.6s ease-out 1.05s forwards",
              }}
            >
              Ressourcerie · Château-Thierry
            </p>

            {/* Barre de progression */}
            <span
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full bg-terracotta/70"
              style={{
                transformOrigin: "left center",
                transform: "scaleX(0)",
                animation: "_splash-progress 2.6s linear 0.4s forwards",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
