"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Phone, Truck, Sparkles, Tags } from "lucide-react"
import { DON_STEPS } from "@/lib/constants"

const stepIcons = [Phone, Truck, Sparkles, Tags]
const ease = [0.22, 1, 0.36, 1] as const

/**
 * Frise de progression du don : 4 nœuds navy (coins asymétriques, signature
 * du site) reliés par un trait orange qui se "trace" au scroll, avec un point
 * lumineux qui parcourt la frise en boucle. Élévation franche au survol.
 * Horizontale sur desktop, verticale sur mobile.
 */
export default function StepsTimeline() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      {/* Rail de fond (desktop) */}
      <span
        aria-hidden
        className="hidden md:block absolute top-[46px] left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-stone/60"
      />
      {/* Connecteur horizontal (desktop) qui se trace */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
        className="hidden md:block absolute top-[46px] left-[12.5%] right-[12.5%] h-[3px] origin-left rounded-full bg-gradient-to-r from-terracotta via-terracotta to-terracotta"
      />
      {/* Point lumineux qui parcourt la frise (desktop) */}
      {!reduce && (
        <motion.span
          aria-hidden
          initial={{ left: "12.5%", opacity: 0 }}
          whileInView={{
            left: ["12.5%", "87.5%"],
            opacity: [0, 1, 1, 0],
          }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, delay: 1.4, ease: "easeInOut" }}
          className="hidden md:block absolute top-[46px] -mt-[6px] h-[15px] w-[15px] -translate-x-1/2 rounded-full bg-terracotta shadow-[0_0_18px_4px_rgba(239,95,23,0.7)]"
        />
      )}

      {/* Connecteur vertical (mobile) qui se trace */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
        className="md:hidden absolute top-8 bottom-8 left-[35px] w-[3px] origin-top rounded-full bg-gradient-to-b from-terracotta to-terracotta/50"
      />

      <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-6">
        {DON_STEPS.map((step, i) => {
          const Icon = stepIcons[i]
          const delay = i * 0.15
          return (
            <motion.li
              key={step.step}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay, ease }}
              className="group relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center"
            >
              {/* Nœud (coins asymétriques = signature du site) */}
              <div className="relative z-10 shrink-0">
                {/* Anneau pulsant perpétuel */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: [0.9, 1.35], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.4,
                    }}
                    className="absolute inset-0 rounded-tl-[24px] rounded-br-[24px] bg-terracotta/30"
                  />
                )}
                <motion.div
                  whileHover={
                    reduce ? undefined : { y: -8, rotate: -4, scale: 1.06 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative grid place-items-center w-[68px] h-[68px] md:w-24 md:h-24 bg-sage paper-texture rounded-tl-[24px] rounded-br-[24px] shadow-[0_16px_34px_-12px_rgba(25,20,101,0.7)] ring-4 ring-paper transition-colors duration-500 group-hover:bg-terracotta"
                >
                  <Icon
                    className="text-paper w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.6}
                  />
                  {/* Badge numéro */}
                  <span className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-terracotta text-paper text-[13px] font-bold flex items-center justify-center ring-2 ring-paper tabular-nums shadow-md transition-colors duration-500 group-hover:bg-sage-deep">
                    {step.step}
                  </span>
                </motion.div>
              </div>

              {/* Contenu */}
              <div className="md:mt-9 pt-1 md:pt-0 min-w-0">
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
