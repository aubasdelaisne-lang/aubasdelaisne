"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { Phone, Truck, KeyRound, Archive, Hammer, MapPin, ArrowRight, CheckCircle2, XCircle, ChevronDown, CalendarDays, Recycle, HeartHandshake } from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import WaveDivider from "@/components/ui/WaveDivider"
import ArcDivider from "@/components/ui/ArcDivider"
import TiltCard from "@/components/ui/TiltCard"
import { FAQS } from "./faq-data"

/* ─── données ────────────────────────────────────────────── */

const SITUATIONS = [
  {
    Icon: Truck,
    title: "Déménagement",
    desc: "Vous partez et ne pouvez pas tout emporter ? On vient vider ce qui reste avant votre départ.",
    keywords: ["meubles", "électroménager", "cartons"],
  },
  {
    Icon: KeyRound,
    title: "Succession",
    desc: "Vider le logement d'un proche après un décès. On s'occupe de tout, avec respect et discrétion.",
    keywords: ["héritage", "vider appartement", "maison"],
  },
  {
    Icon: Archive,
    title: "Grenier / cave",
    desc: "Des années d'accumulation à évacuer ? Livres, meubles, bibelots : on trie et on valorise.",
    keywords: ["encombrants", "vider grenier", "cave garage"],
  },
  {
    Icon: Hammer,
    title: "Avant travaux",
    desc: "Libérer la place avant une rénovation ou un aménagement. Rapide et sans effort de votre côté.",
    keywords: ["rénovation", "libérer espace", "travaux"],
  },
]

const ETAPES = [
  {
    num: "01",
    title: "Un appel suffit",
    desc: "Décrivez-nous en quelques mots ce que vous souhaitez débarrasser. On évalue ensemble et on convient d'un créneau.",
    color: "bg-terracotta",
  },
  {
    num: "02",
    title: "On se déplace",
    desc: "Notre équipe vient chez vous à Château-Thierry ou dans l'Aisne pour voir les objets et vous faire un devis sur place.",
    color: "bg-sage",
  },
  {
    num: "03",
    title: "On collecte tout",
    desc: "Meubles, encombrants, bibelots : on emporte tout. Vous n'avez rien à trier, rien à porter, rien à amener.",
    color: "bg-terracotta",
  },
  {
    num: "04",
    title: "On valorise",
    desc: "Ce qui peut être revendu part en boutique. Le reste est recyclé. Chaque objet récupéré finance l'insertion professionnelle locale.",
    color: "bg-sage",
  },
]

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
                Un coup de fil suffit : devis gratuit, sans engagement.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SITUATIONS.map(({ Icon, title, desc, keywords }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <TiltCard className="h-full rounded-2xl">
                  <div className="h-full bg-paper border border-ink/8 rounded-2xl p-7 flex flex-col gap-4">
                    <span className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center">
                      <Icon size={24} className="text-sage-deep" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display font-semibold text-ink text-[1.2rem]">{title}</h3>
                    <p className="text-ink/60 text-[14px] leading-relaxed flex-1">{desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {keywords.map((k) => (
                        <span
                          key={k}
                          className="text-[11px] bg-sage/10 text-sage-deep px-3 py-1 rounded-full"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="text-cream" bottom="bg-ink" />

      {/* ── COMMENT ÇA MARCHE ────────────────────────────── */}
      <section id="comment" className="py-20 px-4 md:px-8 bg-ink">
        <div className="max-w-[860px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-paper/30 font-semibold">
              Simple et rapide
            </span>
            <h2
              className="mt-3 font-display font-medium text-paper"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.6rem)" }}
            >
              Comment ça se passe ?
            </h2>
          </motion.div>

          <div className="relative">
            {/* Ligne verticale animée */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-paper/10 hidden md:block" />

            <div className="flex flex-col gap-0">
              {ETAPES.map(({ num, title, desc, color }, i) => (
                <motion.div
                  key={num}
                  variants={fadeUp}
                  custom={i * 0.4}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative flex gap-6 md:gap-10 pb-12 last:pb-0"
                >
                  {/* Pastille numéro */}
                  <div className="relative shrink-0 z-10">
                    <div
                      className={`w-12 h-12 rounded-full ${color} flex items-center justify-center font-display font-bold text-paper text-[14px]`}
                    >
                      {num}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="pt-2 pb-2">
                    <h3 className="font-display font-semibold text-paper text-[1.1rem] mb-2">
                      {title}
                    </h3>
                    <p className="text-paper/55 text-[14px] leading-relaxed max-w-xl">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA inline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-3 bg-terracotta text-paper font-display font-bold px-8 py-4 rounded-full text-lg hover:bg-terracotta/90 transition-colors"
            >
              <Phone size={20} strokeWidth={2} />
              Appeler pour un devis
            </a>
          </motion.div>
        </div>
      </section>

      <ArcDivider top="text-ink" bottom="bg-paper" flip />

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
              Un appel, un devis gratuit, et on s'occupe de tout.
              Disponible du mardi au samedi.
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-8 inline-flex items-center gap-3 bg-paper text-terracotta font-display font-bold px-10 py-5 rounded-full text-xl hover:bg-cream active:scale-95 transition-all shadow-lg"
            >
              <Phone size={22} strokeWidth={2} />
              {SITE.phone}
            </a>
            <p className="mt-4 text-paper/40 text-[13px]">
              {SITE.address}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
