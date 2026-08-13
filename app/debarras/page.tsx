"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { Phone, Mail, Truck, KeyRound, Archive, Hammer, MapPin, ArrowRight, CheckCircle2, XCircle, ChevronDown, CalendarDays, Recycle, HeartHandshake, Star, X } from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import WaveDivider from "@/components/ui/WaveDivider"
import ArcDivider from "@/components/ui/ArcDivider"
import SectionHeader from "@/components/ui/SectionHeader"
import StepsTimeline from "@/components/ui/StepsTimeline"
import MagneticButton from "@/components/ui/MagneticButton"
import AmbientBackground from "@/components/ui/AmbientBackground"
import { FAQS } from "./faq-data"

/* ─── données ────────────────────────────────────────────── */

type SituationTone = "sage" | "terracotta" | "cream" | "paper"
type SituationSize = "xl" | "lg" | "md"

const SITUATIONS: {
  Icon: typeof Truck
  title: string
  desc: string
  keywords: string[]
  tone: SituationTone
  size: SituationSize
}[] = [
  {
    Icon: KeyRound,
    title: "Succession",
    desc: "Vider la maison d'un proche après un décès. On s'occupe de tout, avec respect et discrétion, pendant que vous gardez l'esprit à l'essentiel.",
    keywords: ["héritage", "vider une maison", "appartement"],
    tone: "sage",
    size: "xl",
  },
  {
    Icon: Truck,
    title: "Déménagement",
    desc: "Vous partez et ne pouvez pas tout emporter ? On vient vider ce qui reste avant votre départ.",
    keywords: ["meubles", "électroménager", "cartons"],
    tone: "terracotta",
    size: "lg",
  },
  {
    Icon: Archive,
    title: "Grenier / cave",
    desc: "Des années d'accumulation à évacuer ? On trie et on valorise.",
    keywords: ["encombrants", "vider grenier"],
    tone: "cream",
    size: "md",
  },
  {
    Icon: Hammer,
    title: "Avant travaux",
    desc: "Libérer la place avant une rénovation, sans effort de votre côté.",
    keywords: ["rénovation", "travaux"],
    tone: "paper",
    size: "md",
  },
]

const SITUATION_ICON_BG = ["bg-sage", "bg-terracotta", "bg-sage", "bg-terracotta"]

const ETAPES = [
  {
    step: "01",
    title: "Un appel ou un mail",
    desc: "Décrivez-nous en quelques mots ce que vous souhaitez débarrasser, par téléphone ou par écrit. On convient d'un créneau ensemble.",
  },
  {
    step: "02",
    title: "On se déplace",
    desc: "Notre équipe vient chez vous à Château-Thierry ou dans l'Aisne pour voir les objets et vous faire un devis sur place.",
  },
  {
    step: "03",
    title: "On collecte tout",
    desc: "Meubles, encombrants, bibelots : on emporte tout. Vous n'avez rien à trier, rien à porter, rien à amener.",
  },
  {
    step: "04",
    title: "On valorise",
    desc: "Ce qui peut être revendu part en boutique. Le reste est recyclé. Chaque objet finance l'insertion professionnelle locale.",
  },
]

/* Icônes de la frise : contact, visite, collecte, valorisation */
const ETAPES_ICONES = [Phone, MapPin, Truck, Recycle]

const AVANTAGES = [
  { label: "Équipe locale, basée à Château-Thierry", nous: true, benne: false },
  { label: "Pas de location de benne ou de camion", nous: true, benne: false },
  { label: "Tri et recyclage inclus", nous: true, benne: false },
  { label: "Démarche solidaire et éco-responsable", nous: true, benne: false },
  { label: "Devis sur place gratuit", nous: true, benne: false },
  { label: "On emporte tout, vous ne faites rien", nous: true, benne: false },
]

const ZONE_GROUPS = [
  {
    label: "CA Région de Château-Thierry",
    dept: "Aisne · 02",
    communes: ["Château-Thierry", "Brasles", "Chierry", "Essômes-sur-Marne", "Coincy", "Belleau", "Étampes-sur-Marne"],
  },
  {
    label: "CC Charly-sur-Marne et la Marne",
    dept: "Marne · 51",
    communes: ["Charly-sur-Marne", "Condé-en-Brie", "Dormans", "Fère-en-Tardenois"],
  },
]

/* ─── composants internes ────────────────────────────────── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-ink/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display font-medium text-ink text-[1rem] md:text-[1.05rem] group-hover:text-sage-deep transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-terracotta transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-ink/65 text-[14px] leading-relaxed">{a}</p>
      </motion.div>
    </div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 },
  }),
}

/* ─── page ───────────────────────────────────────────────── */

export default function DebarrasPage() {
  return (
    <>
      {/* ── HERO (gabarit commun : carte sage arrondie) ──── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] overflow-hidden">
            <ShineSweep />
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                Débarras à Château-Thierry
              </div>
              <h1
                className="mt-4 font-display font-medium text-paper leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 1rem + 3.5vw, 3.75rem)" }}
              >
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="block"
                  >
                    Une maison à vider ?
                    <br />
                    On s'occupe de tout.
                  </motion.span>
                </span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Déménagement, succession, grenier plein à craquer : on vient, on
                emporte, vous n'avez rien à porter. Vos objets retrouvent une
                seconde vie en boutique et financent l'emploi local.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-paper text-sage-deep font-display font-bold px-8 py-4 rounded-full text-lg tracking-[0.04em] tabular-nums hover:bg-cream active:scale-95 transition-all"
                >
                  <Phone size={20} strokeWidth={2} className="text-terracotta" />
                  {SITE.phone}
                </a>
                <a
                  href="#comment"
                  className="inline-flex items-center justify-center gap-2 border-2 border-paper/40 text-paper px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.2em] font-bold hover:border-paper transition-colors"
                >
                  Comment ça marche
                  <ArrowRight size={15} />
                </a>
              </div>
              <p className="mt-5 text-paper/60 text-[13px]">
                Un appel ou un mail suffit : devis gratuit, sans engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArcDivider top="text-paper" bottom="bg-cream" />

      {/* ── SITUATIONS ───────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
              Vous êtes concerné si…
            </span>
            <h2
              className="mt-3 font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
            >
              Dans quelle situation êtes-vous ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SITUATIONS.map(({ Icon, title, desc, keywords }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 340, damping: 22 } }}
                className="group flex gap-5 bg-paper rounded-tl-[36px] rounded-br-[36px] p-6 md:p-8 border-2 border-ink/8 hover:border-terracotta/60 hover:shadow-[0_20px_50px_-15px_rgba(239,95,23,0.22)] transition-[border-color,box-shadow] duration-500 cursor-default"
              >
                {/* Icône */}
                <div className="shrink-0 pt-0.5">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className={`w-14 h-14 rounded-tl-[16px] rounded-br-[16px] flex items-center justify-center shadow-md ${SITUATION_ICON_BG[i]}`}
                  >
                    <Icon size={22} strokeWidth={1.6} className="text-paper" />
                  </motion.div>
                </div>

                {/* Contenu */}
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-[1.25rem] text-ink leading-tight mb-2 group-hover:text-terracotta transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-ink/55 text-[13.5px] leading-relaxed mb-4">
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map((k) => (
                      <span key={k} className="text-[11px] text-ink/45 border border-ink/12 px-2.5 py-1 rounded-full">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="text-cream" bottom="bg-ink" />

      {/* ── COMMENT ÇA MARCHE (frise commune, fond bleu) ─── */}
      <section id="comment" className="relative py-16 md:py-28 px-4 md:px-8 bg-ink overflow-hidden">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Simple et rapide"
            title="Comment ça se passe ?"
            lede="Quatre étapes, zéro effort de votre côté."
            tone="paper"
          />

          <StepsTimeline steps={ETAPES} icons={ETAPES_ICONES} tone="dark" />

          {/* CTA bar sauge : téléphone ou mail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="spotlight relative mt-16 bg-paper border-2 border-sage/15 p-8 md:p-12 text-center rounded-tl-[60px] md:rounded-tl-[80px] rounded-br-[60px] md:rounded-br-[80px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(10,8,56,0.4)]"
          >
            <ShineSweep delay={0.4} />
            <h3 className="relative z-10 font-display font-medium text-3xl md:text-4xl text-sage-deep leading-tight">
              Parlons de votre débarras.
            </h3>
            <p className="relative z-10 mt-4 text-ink/60 text-[15px]">
              Par téléphone ou par mail, comme vous préférez. Devis gratuit, sans engagement.
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton
                href={SITE.phoneHref}
                className="bg-sage text-paper px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} strokeWidth={2} />
                  {SITE.phone}
                </span>
              </MagneticButton>
              <MagneticButton
                href={`mailto:${SITE.email}`}
                className="border-2 border-sage/50 text-sage-deep px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full hover:border-sage hover:bg-sage/5"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} strokeWidth={2} />
                  Écrire un mail
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transition diagonale bg-ink → bg-paper */}
      <div aria-hidden className="relative h-20 overflow-hidden -mb-px bg-paper">
        <div className="absolute inset-0 bg-ink" style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 100%)" }} />
      </div>

      {/* ── NOUS VS BENNE ────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-paper">
        <div className="max-w-[960px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
            >
              Pourquoi nous plutôt qu'une benne ?
            </h2>
            <p className="mt-3 text-ink/50 text-[15px]">
              Louer une benne, ça demande du temps, de la main d'œuvre et ça coûte cher.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 items-start">
            {/* ── Carte Nous ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="spotlight relative bg-sage paper-texture rounded-tl-[48px] rounded-br-[48px] overflow-hidden p-8 md:p-10"
            >
              <ShineSweep />
              <span className="relative z-10 inline-flex items-center gap-1.5 bg-terracotta text-paper text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6">
                <Star size={10} fill="currentColor" strokeWidth={0} />
                Recommandé
              </span>
              <h3 className="relative z-10 font-display font-semibold text-[1.4rem] text-paper mb-1">
                Au Bas de l&apos;Aisne
              </h3>
              <p className="relative z-10 text-paper/50 text-[13px] mb-8">Ressourcerie solidaire · Château-Thierry</p>
              <ul className="relative z-10 space-y-4">
                {AVANTAGES.map(({ label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-terracotta/25 flex items-center justify-center">
                      <CheckCircle2 size={13} className="text-terracotta" strokeWidth={2.5} />
                    </span>
                    <span className="text-paper/85 text-[14px] leading-snug">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-8 pt-6 border-t border-paper/15">
                <p className="text-paper/40 text-[11px] uppercase tracking-[0.2em]">Coût</p>
                <p className="text-paper font-display font-semibold text-[1.5rem] mt-1">
                  Devis gratuit <span className="text-terracotta text-[14px] font-normal">sur place</span>
                </p>
              </div>
            </motion.div>

            {/* ── Carte Benne ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative bg-cream border border-ink/8 rounded-tl-[48px] rounded-br-[48px] overflow-hidden p-8 md:p-10"
            >
              <div className="h-[26px] mb-6" />
              <h3 className="font-display font-semibold text-[1.4rem] text-ink/40 mb-1">Location de benne</h3>
              <p className="text-ink/25 text-[13px] mb-8">Option classique</p>
              <ul className="space-y-4">
                {AVANTAGES.map(({ label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-ink/8 flex items-center justify-center">
                      <X size={9} className="text-ink/30" strokeWidth={2.5} />
                    </span>
                    <span className="text-ink/35 text-[14px] leading-snug line-through decoration-ink/15">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-ink/10">
                <p className="text-ink/30 text-[11px] uppercase tracking-[0.2em]">Coût estimé</p>
                <p className="text-ink/45 font-display font-semibold text-[1.5rem] mt-1">
                  200 à 600 € <span className="text-[13px] font-normal text-ink/25">+ main d&apos;œuvre</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-terracotta" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
                Une association qui a fait ses preuves
              </span>
              <span aria-hidden className="h-px w-8 bg-terracotta" />
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { Icon: CalendarDays, val: 10, suffix: " ans", label: "d'expérience locale", bg: "bg-sage" },
              { Icon: Recycle, val: 120, suffix: " t", label: "d'objets valorisés chaque année", bg: "bg-terracotta" },
              { Icon: HeartHandshake, val: 15, suffix: "", label: "emplois d'insertion créés", bg: "bg-ink" },
            ].map(({ Icon, val, suffix, label, bg }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden ${bg} paper-texture border-2 border-ink/10 rounded-tl-[40px] rounded-br-[40px] p-8 md:p-10 text-center`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(255,255,255,0.14) 0%, transparent 60%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-7 -right-2 font-display font-extrabold leading-none select-none"
                  style={{ fontSize: "8rem", color: "rgba(255,255,255,0.07)", letterSpacing: "-0.04em" }}
                >
                  {val}
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-paper/12 border border-paper/20 flex items-center justify-center">
                    <Icon size={22} className="text-paper" strokeWidth={1.8} />
                  </span>
                  <div
                    className="mt-5 font-display font-bold text-paper tabular-nums leading-none"
                    style={{ fontSize: "clamp(2.6rem, 1.6rem + 2.5vw, 3.6rem)" }}
                  >
                    <Counter target={val} suffix={suffix} />
                  </div>
                  <span aria-hidden className="mt-5 h-1 w-10 rounded-full bg-paper/45 transition-[width] duration-500 group-hover:w-16" />
                  <span className="mt-4 text-[12px] uppercase tracking-[0.22em] font-semibold text-paper/75 leading-snug">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transition diagonale bg-paper → bg-ink ────────── */}
      <div aria-hidden className="relative h-20 overflow-hidden -mb-px bg-paper">
        <div className="absolute inset-0 bg-ink" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
      </div>

      {/* ── ZONE DE COLLECTE ─────────────────────────────── */}
      <section className="relative py-20 px-4 md:px-8 bg-ink overflow-hidden">
        {/* Filaments animés */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              initial={{ x: "-30%", opacity: 0 }}
              animate={{ x: ["−30%", "130%"], opacity: [0, 0.35, 0.35, 0] }}
              transition={{
                duration: 14 + i * 3.5,
                delay: i * 3.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute block"
              style={{
                top: `${12 + i * 22}%`,
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent, rgba(239,95,23,${0.18 + i * 0.04}), rgba(255,255,255,0.12), transparent)`,
                transform: `rotate(${-8 + i * 3.5}deg) scaleX(1.6)`,
                transformOrigin: "left center",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1060px] mx-auto">
          {/* En-tête + stat */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-terracotta text-[11px] uppercase tracking-[0.2em] font-semibold mb-3">
                <MapPin size={12} strokeWidth={2.5} />
                Zone desservie
              </span>
              <h2
                className="font-display font-medium text-paper"
                style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
              >
                On intervient près de chez vous
              </h2>
              <p className="mt-3 text-paper/50 text-[15px] max-w-[40ch]">
                Deux communautés de communes couvertes autour de Château-Thierry.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="shrink-0 text-right md:text-right"
            >
              <p className="font-display font-semibold text-paper leading-none" style={{ fontSize: "clamp(2.8rem, 1.5rem + 3vw, 4rem)" }}>
                ~30 km
              </p>
              <p className="text-paper/40 text-[12.5px] mt-1 uppercase tracking-[0.15em]">de rayon autour de CT</p>
            </motion.div>
          </div>

          {/* Cartes communautés */}
          <div className="grid md:grid-cols-2 gap-5">
            {ZONE_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: gi * 0.14 }}
                className="relative bg-paper rounded-tl-[44px] rounded-br-[44px] overflow-hidden p-8 md:p-10 shadow-[0_24px_64px_-16px_rgba(10,8,56,0.55)]"
              >
                {/* Numéro décoratif */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 shrink-0 w-2.5 h-2.5 rounded-full bg-terracotta" />
                    <div>
                      <p className="text-ink font-display font-semibold text-[1.1rem] leading-snug">
                        {group.label}
                      </p>
                      <p className="text-ink/40 text-[12px] mt-0.5">{group.dept}</p>
                    </div>
                  </div>
                  <span className="font-display text-[2.5rem] font-bold text-ink/8 leading-none select-none">
                    {gi + 1}
                  </span>
                </div>
                {/* Communes */}
                <div className="flex flex-wrap gap-2">
                  {group.communes.map((c) => (
                    <span
                      key={c}
                      className="text-[12.5px] text-ink/65 bg-ink/5 border border-ink/12 px-3.5 py-1.5 rounded-full hover:bg-ink/10 transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-8 text-paper/35 text-[13px]"
          >
            Votre commune n&apos;est pas listée ?{" "}
            <a href={SITE.phoneHref} className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors">
              Appelez-nous pour vérifier
            </a>
          </motion.p>
        </div>
      </section>

      {/* Transition bg-ink → bg-cream */}
      <WaveDivider top="text-ink" bottom="bg-cream" />

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
            >
              Questions fréquentes
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-paper rounded-2xl px-6 md:px-8 divide-y divide-ink/8"
          >
            {FAQS.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Transition diagonale bg-cream → bg-terracotta */}
      <div aria-hidden className="relative h-16 overflow-hidden -mb-px bg-terracotta">
        <div className="absolute inset-0 bg-cream" style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 100%)" }} />
      </div>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-terracotta text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,255,255,0.06),transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-[640px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Truck size={36} className="text-paper/70 mx-auto mb-6" strokeWidth={1.5} />
            <h2
              className="font-display font-medium text-paper leading-tight"
              style={{ fontSize: "clamp(1.8rem, 1rem + 2.5vw, 3rem)" }}
            >
              Prêt à vous débarrasser ?
            </h2>
            <p className="mt-4 text-paper/70 text-[15px] leading-relaxed">
              Un appel ou un mail, un devis gratuit, et on s'occupe de tout.
              Disponible du mardi au samedi.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-3 bg-paper text-terracotta font-display font-bold px-10 py-5 rounded-full text-xl hover:bg-cream active:scale-95 transition-all shadow-lg"
              >
                <Phone size={22} strokeWidth={2} />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 border-2 border-paper/50 text-paper px-8 py-4 rounded-full text-[14px] font-bold hover:border-paper hover:bg-paper/10 transition-colors"
              >
                <Mail size={18} strokeWidth={2} />
                {SITE.email}
              </a>
            </div>
            <p className="mt-4 text-paper/40 text-[13px]">
              {SITE.address}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
