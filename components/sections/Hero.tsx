"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ArrowRight } from "lucide-react"
import MagneticButton from "@/components/ui/MagneticButton"
import ShineSweep from "@/components/ui/ShineSweep"

const ease = [0.22, 1, 0.36, 1] as const

// Le grand titre alterne entre ces deux textes toutes les 3 s.
// « l'Aisne » en italique = accent éditorial (italique réservé à l'accent).
const rotatingTitles = [
  { id: "ressourcerie", content: <>Ressourcerie</> },
  {
    id: "nom",
    content: (
      <>
        Au Bas de <span className="italic">l&apos;Aisne</span>
      </>
    ),
  },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Parallax léger
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  // Alternance du grand titre toutes les 3 secondes
  const [titleIndex, setTitleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % rotatingTitles.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="relative pt-24 md:pt-28 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
      <div className="relative max-w-[1300px] mx-auto">
        {/* Bloc navy unique — texte large + photo plus petite */}
        <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 overflow-hidden rounded-tl-[80px] md:rounded-tl-[140px] rounded-br-[80px] md:rounded-br-[140px] px-6 sm:px-10 md:px-14 lg:px-20 py-14 md:py-20">
          <ShineSweep delay={1.4} />

          {/* Halo orange très subtil en fond */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(239,95,23,0.18),transparent_70%)] blur-2xl"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-10 md:gap-14 items-center">
            {/* Texte */}
            <motion.div style={{ y: yText }} className="min-w-0">
              {/* Badge crédibilité */}
              <div className="inline-flex items-center gap-2 mb-7 rounded-full border border-paper/25 bg-paper/5 px-4 py-1.5 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-paper/80 font-semibold backdrop-blur-sm">
                Ressourcerie <span className="text-terracotta-soft">·</span> Château-Thierry <span className="text-terracotta-soft">·</span> Depuis 2014
              </div>

              {/* Grand titre animé — décoratif (le vrai H1 est l'accroche dessous) */}
              <div
                aria-hidden
                className="font-display font-medium text-[2.6rem] sm:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-[-0.025em] min-h-[2.1em] flex items-start"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingTitles[titleIndex].id}
                    initial={{ y: 28, opacity: 0, backgroundPosition: "0% 0%" }}
                    animate={{ y: 0, opacity: 1, backgroundPosition: ["0% 0%", "100% 0%"] }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      ease,
                      backgroundPosition: {
                        duration: 3.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.2,
                      },
                    }}
                    className="block bg-clip-text text-transparent"
                    style={{
                      paddingBottom: "0.08em",
                      backgroundImage:
                        "linear-gradient(110deg, #ffffff 0%, #ffffff 40%, #f58e5c 46%, #ef5f17 50%, #f58e5c 54%, #ffffff 60%, #ffffff 100%)",
                      backgroundSize: "250% 100%",
                      filter: "drop-shadow(0 0 16px rgba(239,95,23,0.22))",
                    }}
                  >
                    {rotatingTitles[titleIndex].content}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Vrai H1 — accroche SEO (ressourcerie + Château-Thierry) */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 font-display font-semibold text-xl sm:text-2xl lg:text-[1.7rem] text-paper leading-snug max-w-xl"
              >
                Boutique solidaire &amp; ressourcerie à Château-Thierry
              </motion.h1>

              {/* Accroche claire et pratique */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-5 max-w-lg text-paper/85 text-[15px] leading-relaxed"
              >
                On chine, on donne, on recycle — et chaque geste finance l'emploi
                local. Ouvert du mardi au samedi.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <MagneticButton
                  href="/mission"
                  className="bg-paper text-sage-deep px-6 sm:px-7 py-3.5 text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-bold overflow-hidden hover:text-ink transition-colors rounded-full"
                >
                  Soutenir l'insertion
                  <ArrowRight size={14} strokeWidth={2.2} className="text-terracotta" />
                </MagneticButton>

                <MagneticButton
                  href="/boutique"
                  strength={0.25}
                  className="border-2 border-paper/70 text-paper px-6 sm:px-7 py-3.5 text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-bold overflow-hidden hover:border-paper rounded-full"
                >
                  Visiter la boutique
                </MagneticButton>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-12 text-paper/70 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold"
              >
                <ChevronDown size={16} strokeWidth={1.8} className="text-terracotta-soft" />
                Découvrir
              </motion.div>
            </motion.div>

            {/* Photo plus petite, encadrée */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative mx-auto md:mx-0 w-full max-w-[260px] md:max-w-none aspect-[3/4] grain overflow-hidden rounded-tl-[40px] rounded-br-[40px] border-4 border-paper/90 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)]"
            >
              <motion.div style={{ scale: scaleImage }} className="absolute inset-0">
                <Image
                  src="/images/devanture.webp"
                  alt="La devanture de la ressourcerie Au Bas de l'Aisne à Château-Thierry"
                  fill
                  priority
                  sizes="(min-width: 768px) 33vw, 70vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sage-deep/20 via-transparent to-terracotta/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
