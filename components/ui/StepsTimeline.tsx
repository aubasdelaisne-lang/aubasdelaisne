"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Phone, Truck, Sparkles, Tags } from "lucide-react"
import { DON_STEPS } from "@/lib/constants"

const stepIcons = [Phone, Truck, Sparkles, Tags]
const ease = [0.22, 1, 0.36, 1] as const

/**
 * Frise de progression du don : 4 nœuds navy (coins asymétriques, signature
 * du site) reliés par un trait orange qui se "trace" au scroll.
 * Horizontale sur desktop, verticale sur mobile. Sans boîtes — volontairement
 * distincte des cartes bordées du reste du site.
 */
export default function StepsTimeline() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      {/* Connecteur horizontal (desktop) qui se trace */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
        className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[3px] origin-left rounded-full bg-gradient-to-r from-terracotta via-terracotta to-terracotta/40"
      />
      {/* Connecteur vertical (mobile) qui se trace */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
        className="md:hidden absolute top-8 bottom-8 left-[31px] w-[3px] origin-top rounded-full bg-gradient-to-b from-terracotta to-terracotta/40"
      />

      <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-y-9 md:gap-x-6">
        {DON_STEPS.map((step, i) => {
          const Icon = stepIcons[i]
          const delay = i * 0.15
          return (
            <motion.li
              key={step.step}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay, ease }}
              className="group relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center"
            >
              {/* Nœud (coins asymétriques = signature du site) */}
              <div className="relative z-10 shrink-0">
                <motion.div
                  whileHover={reduce ? undefined : { y: -4, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="relative grid place-items-center w-16 h-16 md:w-20 md:h-20 bg-sage paper-texture rounded-tl-[22px] rounded-br-[22px] shadow-[0_14px_30px_-12px_rgba(25,20,101,0.65)] ring-4 ring-paper transition-colors duration-500 group-hover:bg-sage-deep"
                >
                  <Icon className="text-paper w-6 h-6 md:w-7 md:h-7" strokeWidth={1.6} />
                  {/* Badge numéro */}
                  <span className="absolute -bottom-2.5 -right-2.5 w-7 h-7 rounded-full bg-terracotta text-paper text-[12px] font-bold flex items-center justify-center ring-2 ring-paper tabular-nums shadow-sm">
                    {step.step}
                  </span>
                </motion.div>
              </div>

              {/* Contenu */}
              <div className="md:mt-7 pt-1 md:pt-0 min-w-0">
                <h3 className="font-display font-semibold text-lg md:text-xl text-sage-deep transition-colors duration-300 group-hover:text-terracotta">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] md:text-[13.5px] text-ink-soft leading-relaxed md:max-w-[15rem] md:mx-auto">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
