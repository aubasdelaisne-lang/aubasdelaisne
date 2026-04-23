"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  eyebrow: string
  title: ReactNode
  lede?: string
  align?: "center" | "left"
  tone?: "sage" | "paper"
}

/**
 * En-tête de section partagé — garantit la cohérence typographique
 * et rythmique entre toutes les sections du site.
 */
export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "sage",
}: Props) {
  const isCenter = align === "center"
  const textTone = tone === "sage" ? "text-sage-deep" : "text-paper"
  const ledeTone = tone === "sage" ? "text-ink-soft" : "text-paper/80"
  const eyebrowTone = tone === "sage" ? "text-sage-deep" : "text-paper/80"

  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-2xl mb-14 md:mb-20`}
    >
      {/* Eyebrow avec trait animé */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase ${eyebrowTone} font-semibold ${
          isCenter ? "justify-center" : ""
        }`}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`h-px w-8 origin-left ${tone === "sage" ? "bg-terracotta" : "bg-terracotta-soft"}`}
        />
        {eyebrow}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`h-px w-8 origin-right ${tone === "sage" ? "bg-terracotta" : "bg-terracotta-soft"} ${
            isCenter ? "" : "hidden"
          }`}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-4 font-display font-medium text-3xl md:text-5xl ${textTone} leading-[1.1] tracking-tight`}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className={`mt-6 ${ledeTone} text-[15px] leading-relaxed ${isCenter ? "mx-auto" : ""} max-w-xl`}
        >
          {lede}
        </motion.p>
      )}
    </div>
  )
}
