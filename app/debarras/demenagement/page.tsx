"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ArrowLeft, CheckCircle2, Truck, Calendar, PackageCheck } from "lucide-react"
import Link from "next/link"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import MagneticButton from "@/components/ui/MagneticButton"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 },
  }),
}

const SITUATIONS = [
  "Vous partez et ne pouvez pas tout emporter",
  "Le logement doit être libéré avant une date précise",
  "Les anciens locataires ont laissé des affaires",
  "Vous vendez et l'acheteur veut les lieux vides",
  "Vous entrez en EHPAD et devez vider l'appartement",
  "Vous réduisez votre surface et gardez l'essentiel",
]

const ETAPES = [
  {
    num: "01",
    Icon: Phone,
    title: "Un appel, une date",
    desc: "Expliquez-nous votre situation et votre contrainte de temps. On cale une visite rapidement.",
  },
  {
    num: "02",
    Icon: Calendar,
    title: "Devis sur place",
    desc: "On évalue le volume, on vous indique un tarif clair. Devis gratuit, aucun engagement.",
  },
  {
    num: "03",
    Icon: Truck,
    title: "On vide le logement",
    desc: "Notre équipe emporte tout ce que vous ne gardez pas : meubles, électroménager, cartons, divers.",
  },
  {
    num: "04",
    Icon: PackageCheck,
    title: "Logement libéré",
    desc: "Ce qui a de la valeur part en boutique solidaire. Vous rendez les clés sans rien laisser derrière.",
  },
]

export default function DemenagementPage() {
  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div className="pt-28 pb-2 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/debarras"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink/40 hover:text-sage-deep transition-colors uppercase tracking-[0.18em] font-semibold"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Débarras
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="py-8 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1100px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-12 md:p-16 rounded-tl-[60px] sm:rounded-tl-[90px] rounded-br-[60px] sm:rounded-br-[90px] overflow-hidden">
            <ShineSweep />
            <div className="relative z-10 max-w-[680px]">
              <span className="text-[11px] tracking-[0.3em] uppercase text-paper/70 font-semibold">
                Débarras déménagement · Château-Thierry
              </span>
              <h1
                className="mt-4 font-display font-medium text-paper leading-[1.08]"
                style={{ fontSize: "clamp(1.8rem, 1rem + 3vw, 3.2rem)" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  Vous déménagez et ne pouvez<br />pas tout emporter ?
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 text-paper/80 text-[15px] leading-relaxed max-w-[520px]"
              >
                On vient vider ce qui reste de votre logement à Château-Thierry ou dans
                l'Aisne. Meubles, électroménager, cartons : on emporte tout, on trie, on valorise.
                Vous rendez vos clés l'esprit tranquille.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2.5 bg-paper text-sage-deep font-display font-bold px-7 py-3.5 rounded-full text-[15px] hover:bg-cream active:scale-95 transition-all"
                >
                  <Phone size={17} strokeWidth={2} className="text-terracotta" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 border-2 border-paper/40 text-paper px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.18em] font-bold hover:border-paper transition-colors"
                >
                  <Mail size={14} />
                  Écrire un mail
                </a>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 text-paper/50 text-[13px]"
              >
                Devis gratuit sur place · Sans engagement
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SITUATIONS ── */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
              On intervient pour vous si…
            </span>
            <h2
              className="mt-3 font-display font-medium text-ink leading-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.2rem)" }}
            >
              Un logement à libérer,<br />quelle que soit la raison
            </h2>
            <p className="mt-4 text-ink/55 text-[15px] leading-relaxed">
              Que vous partiez à la retraite, changiez de ville ou libériez un logement
              familial, notre équipe locale s'adapte à votre planning. On intervient
              généralement sous 1 à 2 semaines selon les disponibilités.
            </p>
            <div className="mt-5 bg-paper border border-ink/8 rounded-2xl p-5">
              <p className="text-[14px] text-ink/65 leading-relaxed">
                <strong className="text-ink font-semibold">Avantage solidaire :</strong>{" "}
                vos objets ne finissent pas à la déchetterie. Ils rejoignent notre boutique
                et financent l'insertion professionnelle à Château-Thierry.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-paper border border-ink/8 rounded-2xl p-6 md:p-8"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-ink/35 font-semibold mb-5">
              Situations fréquentes
            </p>
            <ul className="space-y-3">
              {SITUATIONS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-sage-deep" strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] text-ink/70 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── ÉTAPES ── */}
      <section className="py-20 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.2rem)" }}
            >
              Comment ça se passe ?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ETAPES.map(({ num, Icon, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative bg-cream border border-ink/8 rounded-tl-[32px] rounded-br-[32px] p-6"
              >
                <span className="absolute top-4 right-5 font-display font-bold text-[2rem] leading-none text-ink/6 select-none">
                  {num}
                </span>
                <span className="inline-flex w-10 h-10 rounded-xl bg-sage/15 items-center justify-center mb-4">
                  <Icon size={18} className="text-sage-deep" strokeWidth={1.8} />
                </span>
                <h3 className="font-display font-semibold text-[1rem] text-ink mb-2">{title}</h3>
                <p className="text-[13px] text-ink/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 md:px-8 bg-sage">
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-display font-medium text-paper leading-tight"
              style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.2vw, 2.5rem)" }}
            >
              Vous avez une date limite ?<br />Appelez-nous maintenant.
            </h2>
            <p className="mt-4 text-paper/70 text-[15px]">
              On s'organise selon vos contraintes. Devis gratuit, intervention rapide.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton
                href={SITE.phoneHref}
                className="bg-paper text-sage-deep px-8 py-4 font-display font-bold text-[15px] rounded-full hover:bg-cream transition-colors"
              >
                <Phone size={17} strokeWidth={2} className="text-terracotta" />
                {SITE.phone}
              </MagneticButton>
              <MagneticButton
                href={`mailto:${SITE.email}`}
                className="border-2 border-paper/40 text-paper px-8 py-4 text-[13px] uppercase tracking-[0.18em] font-bold rounded-full hover:border-paper transition-colors"
              >
                <Mail size={14} />
                Écrire
              </MagneticButton>
            </div>
            <Link
              href="/debarras"
              className="mt-8 inline-flex items-center gap-1.5 text-[12px] text-paper/40 hover:text-paper/70 transition-colors uppercase tracking-[0.18em]"
            >
              <ArrowLeft size={12} />
              Tous nos services de débarras
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
