"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

/* 8 particules : positions, tailles, couleurs et timings variés */
const PARTICLES = [
  { left: "11%", top: "17%", size: 4, color: "rgba(239,95,23,0.38)",   dur: 8,  delay: 0,   drift: 1 },
  { left: "83%", top: "13%", size: 3, color: "rgba(250,250,255,0.22)", dur: 11, delay: 1.4, drift: 2 },
  { left: "7%",  top: "63%", size: 5, color: "rgba(239,95,23,0.28)",   dur: 10, delay: 0.7, drift: 3 },
  { left: "89%", top: "67%", size: 3, color: "rgba(250,250,255,0.18)", dur: 9,  delay: 1.9, drift: 1 },
  { left: "21%", top: "83%", size: 4, color: "rgba(239,95,23,0.30)",   dur: 12, delay: 0.3, drift: 2 },
  { left: "73%", top: "37%", size: 2, color: "rgba(250,250,255,0.25)", dur: 7,  delay: 1.1, drift: 3 },
  { left: "47%", top: "7%",  size: 3, color: "rgba(239,95,23,0.33)",   dur: 13, delay: 0.5, drift: 1 },
  { left: "61%", top: "89%", size: 4, color: "rgba(250,250,255,0.20)", dur: 9,  delay: 1.7, drift: 2 },
]

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
        @keyframes _splash-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
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
        @keyframes _splash-float-1 {
          0%,100% { transform: translateY(0px)   translateX(0px); }
          33%     { transform: translateY(-14px)  translateX(7px); }
          66%     { transform: translateY(9px)    translateX(-5px); }
        }
        @keyframes _splash-float-2 {
          0%,100% { transform: translateY(0px)   translateX(0px); }
          40%     { transform: translateY(11px)   translateX(-8px); }
          70%     { transform: translateY(-8px)   translateX(5px); }
        }
        @keyframes _splash-float-3 {
          0%,100% { transform: translateY(0px)   translateX(0px); }
          25%     { transform: translateY(-10px)  translateX(-6px); }
          75%     { transform: translateY(12px)   translateX(4px); }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash"
            initial={{ clipPath: "circle(150% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sage overflow-hidden"
          >

            {/* ── Particules flottantes ── */}
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  backgroundColor: p.color,
                  animation: `_splash-float-${p.drift} ${p.dur}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}

            {/* ── Logo : fade+scale, puis pulse ── */}
            {/* Outer : gère l'apparition */}
            <div
              style={{
                opacity: 0,
                animation: "_splash-fade-scale 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s forwards",
              }}
            >
              {/* Inner : gère la pulsation après l'apparition */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  animation: "_splash-pulse 2.6s ease-in-out 1.1s infinite",
                }}
              >
                <Image
                  src="/images/papillon-icon-180.png"
                  alt="Au Bas de l'Aisne"
                  width={88}
                  height={88}
                  priority
                />
              </div>
            </div>

            {/* ── Nom — reveal par masque ── */}
            <div className="mt-7 overflow-hidden pb-[0.1em]">
              <p
                className="font-display font-medium text-paper leading-none tracking-tight px-6 text-center"
                style={{
                  fontSize: "clamp(1.8rem, 1rem + 2.5vw, 2.8rem)",
                  transform: "translateY(115%)",
                  animation: "_splash-slide-up 0.85s cubic-bezier(0.16,1,0.3,1) 0.45s forwards",
                }}
              >
                Au Bas de l&apos;Aisne
              </p>
            </div>

            {/* ── Sous-titre ── */}
            <p
              className="mt-3 text-paper/55 text-[11px] tracking-[0.3em] uppercase text-center px-6"
              style={{
                opacity: 0,
                animation: "_splash-fade-in 0.6s ease-out 1.05s forwards",
              }}
            >
              Ressourcerie · Château-Thierry
            </p>

            {/* ── Barre de progression ── */}
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
