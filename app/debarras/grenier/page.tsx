"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ArrowLeft, CheckCircle2, Archive, Truck, Recycle } from "lucide-react"
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

const OBJETS = [
  "Vieux meubles et armoires",
  "Cartons et caisses",
  "Électroménager hors d'usage",
  "Outils et matériel de bricolage",
  "Vêtements et linge",
  "Livres, magazines, vinyles",
  "Jouets et jeux",
  "Vélos et équipements de sport",
]

const ETAPES = [
  {
    num: "01",
    Icon: Phone,
    title: "Un coup de fil suffit",
    desc: "Dites-nous où vous êtes et ce que vous avez à faire évacuer. On fixe une date de visite.",
  },
  {
    num: "02",
    Icon: Archive,
    title: "Visite et devis",
    desc: "On monte évaluer le volume sur place. Le devis est gratuit, sans surprise et sans engagement.",
  },
  {
    num: "03",
    Icon: Truck,
    title: "On vide, vous regardez",
    desc: "Notre équipe emballe et emporte tout. En quelques heures, votre grenier est vide.",
  },
  {
    num: "04",
    Icon: Recycle,
    title: "Tout est valorisé",
    desc: "Ce qui peut être revendu part en boutique solidaire. Le reste rejoint les bonnes filières de recyclage.",
  },
]

export default function GrenierPage() {
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
                Vider grenier & cave · Château-Thierry
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
                  Grenier plein à craquer ?<br />On vient tout vider.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 text-paper/80 text-[15px] leading-relaxed max-w-[520px]"
              >
                Des années d'accumulation dans votre grenier, cave ou dépendance ?
                Notre équipe à Château-Thierry vient tout évacuer et valoriser.
                Vous n'avez rien à porter ni à trier.
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

      {/* ── CE QU'ON EMPORTE ── */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
              Ce qu'on gère
            </span>
            <h2
              className="mt-3 font-display font-medium text-ink leading-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.2rem)" }}
            >
              On trie à votre place,<br />vous regardez
            </h2>
            <p className="mt-4 text-ink/55 text-[15px] leading-relaxed">
              Inutile de tout descendre avant notre arrivée. Notre équipe monte dans votre
              grenier ou cave, évalue ce qui peut être revendu, et emporte le reste.
              Chaque objet récupéré finance l'insertion professionnelle locale.
            </p>
            <p className="mt-4 text-ink/55 text-[15px] leading-relaxed">
              Un grenier standard se vide en quelques heures. Pour les volumes importants
              (maison complète, grand hangar), on prévoit plusieurs passages selon vos disponibilités.
            </p>
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
              On accepte notamment
            </p>
            <ul className="space-y-3">
              {OBJETS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-sage-deep" strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] text-ink/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] text-ink/35 border-t border-ink/8 pt-4">
              Un doute ? Appelez-nous, on vous dit si on peut l'emporter.
            </p>
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
              En 4 étapes, votre grenier est vide
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
              Votre grenier vidé,<br />sans effort de votre part.
            </h2>
            <p className="mt-4 text-paper/70 text-[15px]">
              Un appel suffit pour caler une visite et obtenir un devis gratuit.
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
