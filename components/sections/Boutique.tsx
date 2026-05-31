"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ITEMS } from "@/lib/constants"
import MagneticButton from "@/components/ui/MagneticButton"
import ShineSweep from "@/components/ui/ShineSweep"
import HorairesPlaque from "@/components/ui/HorairesPlaque"
import { useIsTouch } from "@/hooks/useIsTouch"

export default function BoutiqueSection() {
  const isTouch = useIsTouch()
  const [activeChip, setActiveChip] = useState(-1)

  // Sur mobile : un chip prend la couleur orange à tour de rôle
  useEffect(() => {
    if (!isTouch) return
    const id = setInterval(() => {
      setActiveChip((prev) => (prev + 1) % ITEMS.length)
    }, 1500)
    return () => clearInterval(id)
  }, [isTouch])
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper">
      <div className="max-w-[1300px] mx-auto">
        {/* Bloc sauge avec image + contenu */}
        <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 md:p-14 rounded-tl-[80px] md:rounded-tl-[120px] rounded-br-[80px] md:rounded-br-[120px] overflow-hidden">
          <ShineSweep delay={0.4} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">
            {/* Texte */}
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                La Boutique
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-4 font-display font-medium text-4xl md:text-5xl text-paper leading-[1.1]"
              >
                Des trésors
                <br />
                à petits prix.
              </motion.h2>
              <p className="mt-6 text-paper/85 text-[15px] leading-relaxed max-w-md">
                Meubles, livres, vaisselle, jouets, vélos… Une sélection triée
                avec soin, renouvelée chaque semaine.
              </p>

              {/* Horaires — plaque émail */}
              <HorairesPlaque className="mt-8" />

              <div className="mt-8">
                <MagneticButton
                  href="/boutique"
                  className="bg-paper text-sage-deep px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full"
                >
                  Visiter la boutique
                  <ArrowRight size={14} strokeWidth={2.2} />
                </MagneticButton>
              </div>
            </div>

            {/* Image avec reveal clip-path + zoom hover */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[4/5] grain overflow-hidden border-4 border-paper group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/boutique-capture.png"
                  alt="Devanture de la boutique Au Bas de l'Aisne"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Chips objets — sous le bloc */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span aria-hidden className="h-px w-10 bg-terracotta/60" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Ce que vous trouverez
            </span>
            <span aria-hidden className="h-px w-10 bg-terracotta/60" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {ITEMS.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: i * 0.05,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.08,
                  rotate: [0, -1.5, 1.5, 0],
                  transition: { rotate: { duration: 0.4 }, default: { type: "spring", stiffness: 400, damping: 15 } },
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative inline-flex items-center gap-2 px-5 py-2 text-[13px] border-2 rounded-full cursor-default transition-[background-color,border-color,color,box-shadow,transform] duration-500 ${
                  activeChip === i
                    ? "bg-terracotta text-paper border-terracotta shadow-[0_8px_20px_-8px_rgba(239,95,23,0.5)] -translate-y-1 scale-[1.06]"
                    : "bg-paper border-ink/10 hover:border-terracotta hover:bg-terracotta hover:text-paper hover:shadow-[0_8px_20px_-8px_rgba(239,95,23,0.5)]"
                }`}
              >
                <span
                  aria-hidden
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                    activeChip === i ? "bg-paper" : "bg-sage group-hover:bg-paper"
                  }`}
                />
                <span className="font-medium">{item}</span>
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-[13px] text-ink-soft italic"
          >
            … et bien d'autres trouvailles renouvelées chaque semaine.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
