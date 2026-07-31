"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Caisse from "@/components/illustrations/Caisse"
import Fauteuil from "@/components/illustrations/Fauteuil"
import Theiere from "@/components/illustrations/Theiere"
import Livres from "@/components/illustrations/Livres"
import Papillon from "@/components/illustrations/Papillon"

/* Timeline (~6,4 s) :
   0,2–1,2  fauteuil tombe dans la caisse  + « On récupère un fauteuil… »
   1,3–2,3  théière tombe                  + « On chine une théière… »
   2,4–3,4  livres tombent                 + « On sauve une pile de livres… »
   3,4–4,5  papillon se pose sur la caisse + « Au Bas de l'Aisne » (3,5 s)
   4,6–5,9  ENVOL : le papillon grossit et vient se poser près du nom —
            temps d'arrêt sur la marque, le lieu et le logo
   6,4      sortie iris (0,9 s)
   Clic ou touche = passage immédiat. Une fois par session. */

const OBJETS = [
  { Comp: Fauteuil, label: "On récupère un fauteuil…", at: 0.2, w: "w-28" },
  { Comp: Theiere, label: "On chine une théière…", at: 1.3, w: "w-24" },
  { Comp: Livres, label: "On sauve une pile de livres…", at: 2.4, w: "w-24" },
]

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) return
    sessionStorage.setItem("splash_shown", "1")
    setVisible(true)
    const t = setTimeout(() => setVisible(false), reduce ? 2000 : 6400)
    return () => clearTimeout(t)
  }, [reduce])

  const skip = useCallback(() => setVisible(false), [])

  useEffect(() => {
    if (!visible) return
    window.addEventListener("keydown", skip)
    return () => window.removeEventListener("keydown", skip)
  }, [visible, skip])

  return (
    <>
      <style>{`
        @keyframes _splash-drop {
          0%   { transform: translateY(-62vh) rotate(-8deg); opacity: 1; }
          70%  { transform: translateY(0) rotate(3deg); }
          85%  { transform: translateY(-12px) rotate(0deg); }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes _splash-sink {
          0%, 78% { opacity: 1; }
          100%    { opacity: 0; }
        }
        @keyframes _splash-label {
          0%   { opacity: 0; transform: translateY(10px); }
          14%  { opacity: 1; transform: translateY(0); }
          78%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes _splash-fly {
          0%   { transform: translate(34vw, -30vh) rotate(-12deg); opacity: 0; }
          12%  { opacity: 1; }
          60%  { transform: translate(6vw, -6vh) rotate(6deg); }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @keyframes _splash-envol {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); }
          45%  { transform: translate(-7vw, -32vh) scale(1.7) rotate(-9deg); }
          100% { transform: translate(-3.5vw, -55vh) scale(2.5) rotate(0deg); }
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
            initial={{ clipPath: "circle(150% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            onClick={skip}
            className="fixed inset-0 z-[9999] bg-sage overflow-hidden cursor-pointer select-none"
            aria-label="Écran d'ouverture — cliquez pour passer"
          >
            {reduce ? (
              /* Version calme : logo + nom en fondu simple */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ opacity: 0, animation: "_splash-fade-in 0.7s ease-out 0.1s forwards" }}
                >
                  <Image
                    src="/images/papillon-icon-180.png"
                    alt=""
                    width={88}
                    height={88}
                    priority
                  />
                </div>
                <p
                  className="font-display font-medium text-paper text-3xl text-center px-6"
                  style={{ opacity: 0, animation: "_splash-fade-in 0.7s ease-out 0.3s forwards" }}
                >
                  Au Bas de l&apos;Aisne
                </p>
              </div>
            ) : (
              <>
                {/* Nom de la marque (révélé à 3,5 s, à la place des messages) */}
                <div className="absolute top-[20%] left-0 w-full text-center px-6">
                  <span className="block overflow-hidden pb-[0.12em]">
                    <span
                      className="block font-display font-medium text-paper leading-none tracking-tight"
                      style={{
                        fontSize: "clamp(1.8rem, 1rem + 2.5vw, 2.8rem)",
                        transform: "translateY(115%)",
                        animation: "_splash-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 3.5s forwards",
                      }}
                    >
                      Au Bas de l&apos;Aisne
                    </span>
                  </span>
                  <p
                    className="mt-3 text-paper/55 text-[11px] tracking-[0.3em] uppercase"
                    style={{ opacity: 0, animation: "_splash-fade-in 0.6s ease-out 3.9s forwards" }}
                  >
                    Ressourcerie · Château-Thierry
                  </p>
                </div>

                {/* Objets qui tombent */}
                {OBJETS.map(({ Comp, at, w }, i) => (
                  <span
                    key={i}
                    className={`absolute left-1/2 -translate-x-1/2 bottom-[calc(14vh+72px)] ${w}`}
                    style={{
                      opacity: 0,
                      animation: [
                        `_splash-drop 0.95s cubic-bezier(0.34, 1.2, 0.4, 1) ${at}s both`,
                        `_splash-sink 1.15s linear ${at}s both`,
                      ].join(", "),
                    }}
                  >
                    <Comp className="w-full" />
                  </span>
                ))}

                {/* Papillon : se pose sur la caisse (3,4 s) puis s'envole,
                    grossit et vient se poser près du nom (4,6 s) */}
                <span
                  className="absolute z-10 left-1/2 translate-x-[52px] bottom-[calc(14vh+122px)] w-16"
                  style={{
                    opacity: 0,
                    animation: [
                      "_splash-fly 1.1s cubic-bezier(0.22, 1, 0.36, 1) 3.4s both",
                      "_splash-envol 1.3s cubic-bezier(0.34, 1.2, 0.4, 1) 4.6s both",
                    ].join(", "),
                  }}
                >
                  <Papillon flap className="w-full" />
                </span>

                {/* Caisse de dons */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[14vh] w-52 md:w-64">
                  <Caisse className="w-full" />
                </span>

                {/* Messages — en haut de l'écran, bien visibles */}
                <div className="absolute top-[20%] left-0 w-full px-6">
                  {OBJETS.map(({ label, at }, i) => (
                    <p
                      key={i}
                      className="absolute inset-x-0 text-center text-paper font-display font-medium"
                      style={{
                        fontSize: "clamp(1.15rem, 0.8rem + 1.6vw, 1.8rem)",
                        opacity: 0,
                        animation: `_splash-label 1.1s linear ${at}s both`,
                      }}
                    >
                      {label}
                    </p>
                  ))}
                </div>

                {/* Barre de progression */}
                <span
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full bg-terracotta/70"
                  style={{
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                    animation: "_splash-progress 6s linear 0.2s forwards",
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
