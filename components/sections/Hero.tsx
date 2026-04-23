"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ArrowRight } from "lucide-react"
import { SITE } from "@/lib/constants"
import Starburst from "@/components/ui/Starburst"
import MagneticButton from "@/components/ui/MagneticButton"

const headline = ["Au", "Bas", "de", "l'Aisne"]

const wordParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const wordChild = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Parallax values — subtle, editorial
  const yStar1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yStar2 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yStar3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={ref} className="relative pt-24 md:pt-28 pb-10 px-4 md:px-8 bg-paper">
      <div className="relative max-w-[1300px] mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[560px] md:min-h-[640px] border-2 border-ink/10 overflow-visible">
          {/* Starbursts décoratifs — parallax au scroll */}
          <motion.div
            style={{ y: yStar1 }}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-10 -left-8 md:-top-14 md:-left-14 text-cream z-20"
          >
            <Starburst size={130} points={22} duration={80} />
          </motion.div>

          <motion.div
            style={{ y: yStar2 }}
            initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-10 -right-8 md:-bottom-14 md:-right-14 text-cream z-20"
          >
            <Starburst size={150} points={24} duration={90} />
          </motion.div>

          <motion.div
            style={{ y: yStar3 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="hidden md:block absolute top-1/2 -right-10 -translate-y-1/2 text-cream z-20"
          >
            <Starburst size={90} points={16} duration={60} />
          </motion.div>

          {/* Gauche — Contenu texte */}
          <div className="relative bg-sage paper-texture flex flex-col justify-center px-8 md:px-14 py-16 md:py-20 z-10 overflow-hidden">
            {/* Subtle shine sweep */}
            <motion.div
              aria-hidden
              initial={{ x: "-120%" }}
              animate={{ x: "180%" }}
              transition={{ duration: 2.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-paper/15 to-transparent skew-x-[-12deg]"
            />

            <div className="text-[11px] tracking-[0.3em] uppercase text-paper/70 font-semibold mb-5">
              Recyclerie · Brasles · Depuis 2014
            </div>

            <motion.h1
              variants={wordParent}
              initial="hidden"
              animate="show"
              className="relative z-10 font-display font-medium text-paper text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
            >
              {headline.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-baseline mr-3 last:mr-0"
                  style={{ paddingBottom: "0.08em" }}
                >
                  <motion.span variants={wordChild} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10 mt-7 max-w-md text-paper/85 text-[15px] leading-relaxed"
            >
              {SITE.slogan}. Une recyclerie-ressourcerie associative à Brasles
              depuis 2014. Donner, chiner, s'engager — trois gestes simples pour
              un territoire plus juste.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative z-10 mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton
                href="/donner"
                className="bg-paper text-sage-deep px-7 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden hover:text-ink transition-colors"
              >
                Nous rejoindre
                <ArrowRight size={14} strokeWidth={2.2} />
              </MagneticButton>

              <MagneticButton
                href="/boutique"
                strength={0.25}
                className="border-2 border-paper/70 text-paper px-7 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden hover:border-paper"
              >
                La boutique
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 mt-12 md:mt-16 text-paper/70 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold"
            >
              <ChevronDown size={16} strokeWidth={1.5} />
              Découvrir
            </motion.div>
          </div>

          {/* Droite — Image avec Ken Burns + parallax */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="relative grain overflow-hidden min-h-[320px]"
          >
            <motion.div
              style={{ y: yImage, scale: scaleImage }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero.jpeg"
                alt="L'équipe de la recyclerie Au Bas de l'Aisne"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Warm paper overlay for cohesion */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sage-deep/25 via-transparent to-terracotta/10 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
