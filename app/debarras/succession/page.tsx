"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ArrowLeft, CheckCircle2, Clock, Heart, Package } from "lucide-react"
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

const INCLUS = [
  "Meubles et literie",
  "Vêtements et linge de maison",
  "Vaisselle et ustensiles",
  "Livres, bibelots, cadres",
  "Électroménager fonctionnel",
  "Contenu de la cave et du grenier",
  "Cartons et archives",
  "Outils et matériel de bricolage",
]

const ETAPES = [
  {
    num: "01",
    Icon: Phone,
    title: "Un appel, un rendez-vous",
    desc: "Décrivez-nous la situation par téléphone ou par mail. On convient d'une date de visite qui vous arrange.",
  },
  {
    num: "02",
    Icon: Heart,
    title: "Visite et devis gratuit",
    desc: "On se déplace sur place pour évaluer le volume et vous faire un devis sans engagement. On prend le temps qu'il faut.",
  },
  {
    num: "03",
    Icon: Package,
    title: "On vide, on valorise",
    desc: "Notre équipe s'occupe de tout : trier, emballer, emporter. Ce qui peut être revendu part en boutique. Rien ne finit inutilement à la déchetterie.",
  },
]

export default function SuccessionPage() {
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
                Débarras succession · Château-Thierry
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
                  Vous devez vider la maison<br />d'un proche après un décès ?
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 text-paper/80 text-[15px] leading-relaxed max-w-[520px]"
              >
                On s'occupe de tout avec respect et discrétion, pendant que vous gardez
                l'esprit à l'essentiel. Notre équipe locale à Château-Thierry intervient
                selon votre planning, sans précipiter.
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

      {/* ── CE QU'ON GÈRE ── */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
              Inclus dans le débarras
            </span>
            <h2
              className="mt-3 font-display font-medium text-ink leading-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.2rem)" }}
            >
              On prend tout en charge,<br />vous n'avez rien à trier
            </h2>
            <p className="mt-4 text-ink/55 text-[15px] leading-relaxed">
              Inutile de séparer ce qui garde de la valeur de ce qui n'en a plus.
              Notre équipe s'en occupe sur place : ce qui peut être revendu part en
              boutique solidaire, le reste rejoint les filières de recyclage adaptées.
            </p>
            <div className="mt-6 flex items-start gap-3 bg-paper border border-ink/8 rounded-2xl p-5">
              <Clock size={18} className="text-terracotta mt-0.5 shrink-0" strokeWidth={2} />
              <p className="text-[14px] text-ink/65 leading-snug">
                <strong className="text-ink font-semibold">Flexible sur le planning.</strong>{" "}
                On s'adapte aux délais imposés par la succession ou le notaire.
                Appelez-nous pour caler une date.
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
              Ce qu'on emporte
            </p>
            <ul className="space-y-3">
              {INCLUS.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-sage-deep" strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] text-ink/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] text-ink/35 border-t border-ink/8 pt-4">
              Un doute sur un objet spécifique ? Appelez-nous, on vous répondra.
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
              Comment ça se passe ?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {ETAPES.map(({ num, Icon, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative bg-cream border border-ink/8 rounded-tl-[36px] rounded-br-[36px] p-7 md:p-8"
              >
                <span className="absolute top-5 right-6 font-display font-bold text-[2.4rem] leading-none text-ink/6 select-none">
                  {num}
                </span>
                <span className="inline-flex w-10 h-10 rounded-xl bg-sage/15 items-center justify-center mb-5">
                  <Icon size={18} className="text-sage-deep" strokeWidth={1.8} />
                </span>
                <h3 className="font-display font-semibold text-[1.05rem] text-ink mb-2">{title}</h3>
                <p className="text-[13.5px] text-ink/55 leading-relaxed">{desc}</p>
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
              Parlons de votre débarras<br />succession.
            </h2>
            <p className="mt-4 text-paper/70 text-[15px]">
              On répond à toutes vos questions. Devis gratuit, sans engagement.
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
