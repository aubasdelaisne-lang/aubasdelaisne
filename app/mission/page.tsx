"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Leaf, HeartHandshake, Briefcase, Quote } from "lucide-react"
import { MISSIONS, TIMELINE, SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import ScrollFilaments from "@/components/ui/ScrollFilaments"
import RevealText from "@/components/ui/RevealText"
import ArcDivider from "@/components/ui/ArcDivider"

const icons = { Leaf, HeartHandshake, Briefcase } as const

const ease = [0.22, 1, 0.36, 1] as const

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
  const reduce = useReducedMotion()
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
              <h1
                className="mt-4 font-display font-medium text-paper leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 1rem + 3.5vw, 3.75rem)" }}
              >
                <RevealText delay={0.2}>
                  Réinsérer, relier,
                  <br />
                  réduire.
                </RevealText>
              </h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Depuis le 16 janvier 2014, nous œuvrons pour un territoire plus
                juste et plus durable dans l'Aisne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 engagements */}
      <section className="relative overflow-hidden py-16 md:py-32 px-4 md:px-8 bg-paper">
        <ScrollFilaments variant="light" />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Nos engagements
            </div>
            <h2
              className="mt-4 font-display font-medium text-sage-deep leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 0.9rem + 2.6vw, 3rem)" }}
            >
              <RevealText delay={0.1}>Trois gestes, un même combat.</RevealText>
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
                  whileHover={{ y: -14, transition: { type: "spring", stiffness: 320, damping: 20 } }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative bg-sage paper-texture border-2 border-ink/10 hover:border-terracotta hover:bg-sage-deep hover:shadow-[0_34px_70px_-20px_rgba(239,95,23,0.55)] p-8 cursor-default overflow-hidden transition-[border-color,box-shadow,background-color] duration-500 rounded-tl-[40px] rounded-br-[40px]"
                >
                  <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta/0 to-terracotta/0 group-hover:from-terracotta/20 group-hover:to-terracotta/5 transition-all duration-700" />
                  <div className="relative flex items-start justify-between mb-6">
                    <span className="font-display font-bold text-5xl text-paper group-hover:text-terracotta-soft leading-none transition-colors duration-500">
                      {m.num}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.12 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="w-12 h-12 rounded-full bg-paper/10 group-hover:bg-terracotta flex items-center justify-center shadow-sm transition-colors duration-500"
                    >
                      <Icon size={20} strokeWidth={1.6} className="text-paper" />
                    </motion.div>
                  </div>
                  <h3 className="relative font-display font-semibold text-2xl text-paper mb-3">{m.title}</h3>
                  <p className="relative text-[14px] text-paper/75 leading-relaxed">{m.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <ArcDivider top="text-paper" bottom="bg-cream-soft" />
      <section className="relative overflow-hidden py-16 md:py-32 px-4 md:px-8 bg-cream-soft">
        <ScrollFilaments variant="light" />
        <div className="relative z-10 max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Notre histoire
            </div>
            <h2
              className="mt-4 font-display font-medium text-sage-deep leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 0.9rem + 2.6vw, 3rem)" }}
            >
              <RevealText delay={0.1}>Dix ans dans l&apos;Aisne.</RevealText>
            </h2>
          </div>

          <ol className="relative">
            {TIMELINE.map((item, i) => {
              const last = i === TIMELINE.length - 1
              return (
                <motion.li
                  key={item.year}
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group relative flex gap-5 md:gap-8 pb-12 last:pb-0"
                >
                  {/* Colonne nœud + connecteur */}
                  <div className="relative shrink-0 w-16 flex justify-center">
                    {/* Connecteur terracotta vers l'étape suivante */}
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute left-1/2 -translate-x-1/2 top-16 -bottom-4 w-[3px] rounded-full bg-gradient-to-b from-terracotta to-terracotta/30"
                      />
                    )}
                    {/* Flèche animée qui descend le long du connecteur */}
                    {!last && !reduce && (
                      <motion.span
                        aria-hidden
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: [0, 14, 0], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.25,
                        }}
                        className="absolute left-1/2 -translate-x-1/2 top-[74px] text-terracotta"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 3v10m0 0l-4-4m4 4l4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    )}
                    {/* Anneau pulsant */}
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ scale: [0.9, 1.4], opacity: [0.5, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 0.3,
                        }}
                        className="absolute top-0 h-16 w-16 rounded-tl-[20px] rounded-br-[20px] bg-terracotta/25"
                      />
                    )}
                    {/* Nœud année */}
                    <motion.div
                      whileHover={
                        reduce ? undefined : { y: -5, scale: 1.08, rotate: -3 }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative z-10 grid place-items-center w-16 h-16 bg-sage paper-texture rounded-tl-[20px] rounded-br-[20px] ring-4 ring-cream-soft shadow-[0_14px_30px_-12px_rgba(25,20,101,0.7)] transition-colors duration-500 group-hover:bg-terracotta"
                    >
                      <span className="font-display font-bold text-[15px] text-paper tabular-nums">
                        {item.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Carte contenu */}
                  <motion.div
                    whileHover={
                      reduce
                        ? undefined
                        : { y: -6, transition: { type: "spring", stiffness: 320, damping: 20 } }
                    }
                    className="flex-1 bg-paper border-2 border-ink/10 group-hover:border-terracotta rounded-tl-[28px] rounded-br-[28px] p-5 md:p-6 shadow-sm hover:shadow-[0_28px_55px_-22px_rgba(25,20,101,0.45)] transition-[border-color,box-shadow] duration-500 cursor-default"
                  >
                    <div className="font-display font-bold text-xl md:text-2xl text-terracotta leading-none">
                      {item.year}
                    </div>
                    <h3 className="font-display font-semibold text-lg mt-2 mb-2 text-sage-deep">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-ink-soft leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Témoignages */}
      <ArcDivider top="text-cream-soft" bottom="bg-paper" />
      <section className="py-16 md:py-32 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Ils témoignent
            </div>
            <h2
              className="mt-4 font-display font-medium text-sage-deep leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 0.9rem + 2.6vw, 3rem)" }}
            >
              <RevealText delay={0.1}>Des voix du territoire.</RevealText>
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
      <ArcDivider top="text-paper" bottom="bg-cream-soft" />
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
            className="relative w-32 h-32 shrink-0 grain overflow-hidden bg-cream rounded-2xl"
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

      {/* CTA final */}
      <ArcDivider top="text-cream-soft" bottom="bg-paper" />
      <section className="py-16 md:py-24 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-10 md:p-16 text-center rounded-tl-[60px] md:rounded-tl-[80px] rounded-br-[60px] md:rounded-br-[80px] overflow-hidden"
          >
            <ShineSweep delay={0.3} />
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/70 font-semibold mb-5">
                Agir avec nous
              </div>
              <h2
                className="font-display font-medium text-paper leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 1rem + 3.5vw, 3.75rem)" }}
              >
                <RevealText delay={0.1}>Rejoignez le mouvement.</RevealText>
              </h2>
              <p className="mt-5 text-paper/85 text-[15px] max-w-md mx-auto leading-relaxed">
                Donner un objet, chiner une trouvaille ou simplement passer nous
                voir — chaque geste fait vivre le territoire.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/donner"
                  className="inline-flex items-center gap-2 bg-paper text-sage-deep px-7 py-3.5 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-cream transition-colors"
                >
                  Faire un don
                </Link>
                <Link
                  href="/boutique"
                  className="inline-flex items-center gap-2 border-2 border-paper/70 text-paper px-7 py-3.5 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:border-paper transition-colors"
                >
                  Visiter la boutique
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
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
