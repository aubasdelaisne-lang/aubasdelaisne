"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { ITEMS, HOURS_BOUTIQUE } from "@/lib/constants"
import MagneticButton from "@/components/ui/MagneticButton"

export default function BoutiqueSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper">
      <div className="max-w-[1300px] mx-auto">
        {/* Bloc sauge avec image + contenu */}
        <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 md:p-14 rounded-tl-[80px] md:rounded-tl-[120px] rounded-br-[80px] md:rounded-br-[120px] overflow-hidden">
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

              {/* Horaires */}
              <div className="mt-8 bg-paper/95 p-5 max-w-md">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-3">
                  <Clock size={13} strokeWidth={1.8} />
                  Horaires
                </div>
                {HOURS_BOUTIQUE.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline text-[14px] py-1.5 border-b border-rule/40 last:border-0"
                  >
                    <span className="text-ink-soft">{h.days}</span>
                    <span
                      className={`tabular-nums ${
                        h.hours === "Fermé"
                          ? "text-terracotta italic"
                          : "text-ink font-semibold"
                      }`}
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>

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
        <div className="mt-16 text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold mb-6">
            Ce que vous trouverez
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ITEMS.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -3, scale: 1.06, backgroundColor: "#191465", color: "#fafaff" }}
                className="px-4 py-1.5 text-[13px] bg-cream-soft border border-ink/15 rounded-full cursor-default transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
