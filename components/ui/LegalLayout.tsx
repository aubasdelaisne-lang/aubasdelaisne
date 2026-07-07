"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import ShineSweep from "@/components/ui/ShineSweep"

type Props = {
  eyebrow: string
  title: string
  updatedAt: string
  children: ReactNode
}

/**
 * Mise en page partagée pour les pages légales (mentions, confidentialité, cookies).
 * Reprend le hero sauge + le rythme typographique du reste du site.
 */
export default function LegalLayout({ eyebrow, title, updatedAt, children }: Props) {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-14 text-center rounded-tl-[50px] sm:rounded-tl-[80px] rounded-br-[50px] sm:rounded-br-[80px] overflow-hidden">
            <ShineSweep />
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                {eyebrow}
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 font-display font-medium text-3xl md:text-5xl text-paper leading-[1.1]"
              >
                {title}
              </motion.h1>
              <p className="mt-5 text-paper/70 text-[13px]">
                Dernière mise à jour : {updatedAt}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8 bg-paper">
        <div className="max-w-[720px] mx-auto legal-content">{children}</div>
      </section>
    </>
  )
}
