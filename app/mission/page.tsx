"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf, HeartHandshake, Briefcase, Quote } from "lucide-react"
import { MISSIONS, TIMELINE, SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"

const icons = { Leaf, HeartHandshake, Briefcase } as const

const testimonials = [
  {
    name: "Marie D.",
    quote:
      "Grâce à Au Bas de l'Aisne, j'ai pu meubler mon appartement à petit prix après un déménagement difficile.",
    role: "Cliente, Château-Thierry",
  },
  {
    name: "Jean-Luc P.",
    quote:
      "Le programme d'insertion m'a donné une seconde chance. L'équipe est bienveillante et professionnelle.",
    role: "Ancien salarié en insertion",
  },
  {
    name: "Famille Martin",
    quote:
      "Nous y amenons nos vieux objets régulièrement. C'est tellement plus satisfaisant que de les jeter.",
    role: "Donateurs fidèles",
  },
]

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] overflow-hidden">
            <ShineSweep />
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                Notre mission
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 font-display font-medium text-4xl md:text-6xl text-paper leading-[1.05]"
              >
                Réduire. Relier.
                <br />
                Réinsérer.
              </motion.h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Depuis le 16 janvier 2014, nous œuvrons pour un territoire plus
                juste et plus durable dans l'Aisne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 engagements */}
      <section className="py-24 md:py-28 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Nos engagements
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Trois gestes, un même combat.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MISSIONS.map((m, i) => {
              const Icon = icons[m.iconKey as keyof typeof icons]
              return (
                <motion.article
                  key={m.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-8 cursor-default overflow-hidden transition-colors rounded-tl-[40px] rounded-br-[40px]"
                >
                  <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(25,20,101,0.18),transparent_65%)]" />
                  <div className="relative flex items-start justify-between mb-6">
                    <span className="font-display font-bold text-5xl text-sage-deep leading-none">
                      {m.num}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.12 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="w-12 h-12 rounded-full bg-sage flex items-center justify-center shadow-sm"
                    >
                      <Icon size={20} strokeWidth={1.6} className="text-paper" />
                    </motion.div>
                  </div>
                  <h3 className="relative font-display font-semibold text-2xl mb-3">{m.title}</h3>
                  <p className="relative text-[14px] text-ink-soft leading-relaxed">{m.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-28 px-4 md:px-8 bg-cream-soft">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Notre histoire
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Dix ans à Brasles.
            </h2>
          </div>

          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-[11px] md:left-4 top-2 bottom-2 w-0.5 bg-sage/40" />
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="group relative py-5 pl-8 cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.3, backgroundColor: "#ef5f17" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="absolute -left-[9px] md:-left-[2px] top-6 w-6 h-6 rounded-full bg-sage border-4 border-cream-soft"
                />
                <div className="font-display font-bold text-2xl text-sage-deep group-hover:text-terracotta transition-colors">{item.year}</div>
                <h3 className="font-display font-semibold text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed max-w-xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 md:py-28 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Ils témoignent
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Des voix du territoire.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-8 cursor-default overflow-hidden transition-colors rounded-tl-[40px] rounded-br-[40px]"
              >
                <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(25,20,101,0.18),transparent_65%)]" />
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="relative inline-block mb-4"
                >
                  <Quote size={22} strokeWidth={1.5} className="text-terracotta" />
                </motion.div>
                <blockquote className="relative font-display text-lg leading-[1.5] text-ink mb-6">
                  « {t.quote} »
                </blockquote>
                <figcaption className="relative">
                  <div className="font-semibold text-[14px] text-sage-deep">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-ink-soft mt-1 font-semibold">
                    {t.role}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Label Tremplin */}
      <section className="py-16 px-4 md:px-8 bg-cream-soft">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.985 }}
          className="spotlight group relative max-w-[900px] mx-auto flex flex-col md:flex-row items-center gap-8 bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-8 cursor-default overflow-hidden transition-colors rounded-tl-[40px] rounded-br-[40px]"
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(300px_circle_at_center,rgba(25,20,101,0.12),transparent_65%)]" />
          <motion.div
            whileHover={{ rotate: 6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="relative w-32 h-32 shrink-0 grain overflow-hidden bg-cream"
          >
            <Image src="/images/tremplin.webp" alt="Label Tremplin" fill sizes="128px" className="object-contain p-3" />
          </motion.div>
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
              Label Tremplin
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">
              Acteur reconnu de l'insertion professionnelle
            </h3>
            <p className="text-[14px] text-ink-soft leading-relaxed">
              Notre association est labellisée pour son engagement dans l'accompagnement
              et la formation de personnes en difficulté sociale.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Colophon */}
      <section className="py-10 px-4 md:px-8 bg-paper">
        <div className="max-w-[900px] mx-auto text-center text-[11px] uppercase tracking-[0.2em] text-ink-soft font-semibold space-y-1">
          <p>Association déclarée · {SITE.registration}</p>
          <p>SIRET · {SITE.siret} · Fondée le {SITE.founded}</p>
        </div>
      </section>
    </>
  )
}
