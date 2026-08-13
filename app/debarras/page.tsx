"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { Phone, Mail, Truck, KeyRound, Archive, Hammer, MapPin, ArrowRight, CheckCircle2, XCircle, ChevronDown, CalendarDays, Recycle, HeartHandshake } from "lucide-react"
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

/* Langage visuel des cartes bento, repris de la page Boutique */
const situationTones: Record<SituationTone, { bg: string; text: string; iconBg: string; iconColor: string; pill: string }> = {
  sage: {
    bg: "bg-sage paper-texture",
    text: "text-paper",
    iconBg: "bg-terracotta",
    iconColor: "text-paper",
    pill: "bg-paper/12 border-paper/25 text-paper/85",
  },
  terracotta: {
    bg: "bg-terracotta paper-texture",
    text: "text-paper",
    iconBg: "bg-paper",
    iconColor: "text-terracotta",
    pill: "bg-paper/15 border-paper/30 text-paper/90",
  },
  cream: {
    bg: "bg-cream-soft",
    text: "text-ink",
    iconBg: "bg-sage",
    iconColor: "text-paper",
    pill: "bg-sage/10 border-ink/10 text-sage-deep",
  },
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    iconBg: "bg-sage",
    iconColor: "text-paper",
    pill: "bg-sage/10 border-ink/10 text-sage-deep",
  },
}

const situationSizes: Record<SituationSize, string> = {
  xl: "md:col-span-2 md:row-span-2 rounded-tl-[60px] rounded-br-[60px] min-h-[240px]",
  lg: "md:col-span-2 rounded-tl-[44px] rounded-br-[44px] min-h-[150px]",
  md: "md:col-span-1 rounded-tl-[32px] rounded-br-[32px] min-h-[150px]",
}

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

const ZONES = [
  "Château-Thierry", "Brasles", "Essômes-sur-Marne", "Chierry",
  "Charly-sur-Marne", "Condé-en-Brie", "Dormans", "Fère-en-Tardenois",
  "Coincy", "Belleau", "Étampes-sur-Marne",
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
                {/* Halo haut */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(255,255,255,0.14) 0%, transparent 60%)" }}
                />
                {/* Chiffre fantôme */}
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
                  <span
                    aria-hidden
                    className="mt-5 h-1 w-10 rounded-full bg-paper/45 transition-[width] duration-500 group-hover:w-16"
                  />
                  <span className="mt-4 text-[12px] uppercase tracking-[0.22em] font-semibold text-paper/75 leading-snug">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
            {SITUATIONS.map(({ Icon, title, desc, keywords, tone, size }, i) => {
              const t = situationTones[tone]
              const isXL = size === "xl"
              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -14, transition: { type: "spring", stiffness: 320, damping: 20 } }}
                  whileTap={{ scale: 0.97 }}
                  className={`spotlight group relative border-2 border-ink/10 hover:border-terracotta p-5 md:p-6 cursor-default overflow-hidden transition-[border-color,box-shadow] duration-500 hover:shadow-[0_34px_70px_-20px_rgba(239,95,23,0.5)] ${situationSizes[size]} ${t.bg} ${t.text}`}
                >
                  {/* Shimmer diagonal au hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-paper/25 to-transparent skew-x-[-18deg] group-hover:left-[150%] transition-[left] duration-[1400ms] ease-out"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icône */}
                    <div className="flex justify-end mb-3">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.12 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${t.iconBg}`}
                      >
                        <Icon size={20} strokeWidth={1.6} className={t.iconColor} />
                      </motion.div>
                    </div>

                    {/* Titre */}
                    <h3
                      className={`font-display font-semibold leading-tight mb-3 ${
                        isXL ? "text-3xl md:text-5xl" : "text-2xl md:text-[1.75rem]"
                      }`}
                    >
                      {title}
                    </h3>

                    {/* Description */}
                    <p className={`leading-relaxed ${isXL ? "text-[15px] max-w-md" : "text-[13px]"} opacity-80`}>
                      {desc}
                    </p>

                    {/* Mots-clés */}
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {keywords.map((k) => (
                        <span
                          key={k}
                          className={`text-[11px] border px-3 py-1 rounded-full ${t.pill}`}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider top="text-cream" bottom="bg-paper" />

      {/* ── COMMENT ÇA MARCHE (frise commune du site) ────── */}
      <section id="comment" className="relative py-16 md:py-28 px-4 md:px-8 bg-paper overflow-hidden">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Simple et rapide"
            title="Comment ça se passe ?"
            lede="Quatre étapes, zéro effort de votre côté."
          />

          <StepsTimeline steps={ETAPES} icons={ETAPES_ICONES} />

          {/* CTA bar sauge : téléphone ou mail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="spotlight relative mt-16 bg-sage paper-texture border-2 border-ink/10 p-8 md:p-12 text-center rounded-tl-[60px] md:rounded-tl-[80px] rounded-br-[60px] md:rounded-br-[80px] overflow-hidden"
          >
            <ShineSweep delay={0.4} />
            <h3 className="relative z-10 font-display font-medium text-3xl md:text-4xl text-paper leading-tight">
              Parlons de votre débarras.
            </h3>
            <p className="relative z-10 mt-4 text-paper/85 text-[15px]">
              Par téléphone ou par mail, comme vous préférez. Devis gratuit, sans engagement.
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton
                href={SITE.phoneHref}
                className="bg-paper text-sage-deep px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} strokeWidth={2} />
                  {SITE.phone}
                </span>
              </MagneticButton>
              <MagneticButton
                href={`mailto:${SITE.email}`}
                className="border-2 border-paper/40 text-paper px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full hover:border-paper"
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

      {/* ── NOUS VS BENNE ────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-paper">
        <div className="max-w-[860px] mx-auto">
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
              Pourquoi nous plutôt qu'une benne ?
            </h2>
            <p className="mt-3 text-ink/50 text-[15px]">
              Louer une benne, ça demande du temps, de la main d'œuvre et ça coûte cher.
            </p>
          </motion.div>

          {/* Tableau comparatif */}
          <div className="rounded-2xl overflow-hidden border border-ink/8">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px] bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold">
              <div className="px-5 py-3" />
              <div className="px-3 py-3 text-center text-terracotta">Nous</div>
              <div className="px-3 py-3 text-center text-paper/40">Benne</div>
            </div>

            {AVANTAGES.map(({ label, nous, benne }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i * 0.15}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-[1fr_80px_80px] border-t border-ink/6 bg-paper hover:bg-cream transition-colors"
              >
                <div className="px-5 py-4 text-ink/75 text-[14px]">{label}</div>
                <div className="px-3 py-4 flex justify-center items-center">
                  {nous
                    ? <CheckCircle2 size={20} className="text-sage-deep" strokeWidth={2} />
                    : <XCircle size={20} className="text-ink/20" strokeWidth={2} />}
                </div>
                <div className="px-3 py-4 flex justify-center items-center">
                  {benne
                    ? <CheckCircle2 size={20} className="text-sage-deep" strokeWidth={2} />
                    : <XCircle size={20} className="text-ink/20" strokeWidth={2} />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="text-paper" bottom="bg-sage" />

      {/* ── ZONE DE COLLECTE ─────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-sage">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <MapPin size={28} className="text-terracotta mx-auto mb-4" strokeWidth={1.5} />
            <h2
              className="font-display font-medium text-paper"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
            >
              Zone d'intervention
            </h2>
            <p className="mt-3 text-paper/65 text-[15px]">
              On intervient à Château-Thierry et dans les communes alentour de l'Aisne.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ZONES.map((zone, i) => (
              <motion.span
                key={zone}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[13px] text-paper/80 bg-paper/10 border border-paper/15 px-4 py-2 rounded-full"
              >
                {zone}
              </motion.span>
            ))}
            <motion.span
              variants={fadeUp}
              custom={ZONES.length * 0.08}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-[13px] text-terracotta bg-terracotta/10 border border-terracotta/20 px-4 py-2 rounded-full"
            >
              + appelez-nous pour vérifier
            </motion.span>
          </div>
        </div>
      </section>

      <ArcDivider top="text-sage" bottom="bg-cream" flip />

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

      <WaveDivider top="text-cream" bottom="bg-terracotta" />

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
