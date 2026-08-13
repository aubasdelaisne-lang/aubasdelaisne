"use client"

import { motion } from "framer-motion"
import { Phone, Home, PackageOpen, Recycle, HeartHandshake } from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import ArcDivider from "@/components/ui/ArcDivider"

const SITUATIONS = [
  { icon: Home, label: "Déménagement", desc: "Vous partez et ne pouvez pas tout emporter." },
  { icon: PackageOpen, label: "Succession", desc: "Vider un logement après un décès ou une succession." },
  { icon: Recycle, label: "Grenier / cave", desc: "Désencombrer un espace qui s'est rempli au fil des années." },
  { icon: HeartHandshake, label: "Rénovation", desc: "Libérer la place avant des travaux." },
]

const ETAPES = [
  { num: "01", title: "Appelez-nous", desc: "Décrivez ce que vous souhaitez débarrasser. On évalue ensemble la situation et on convient d'un rendez-vous." },
  { num: "02", title: "On vient chez vous", desc: "Notre équipe se déplace à Château-Thierry et dans l'Aisne pour voir les objets et vous faire un devis." },
  { num: "03", title: "On collecte tout", desc: "On emporte meubles, bibelots, vêtements, encombrants. Vous n'avez rien à trier ni à porter." },
  { num: "04", title: "On valorise", desc: "Ce qui peut être revendu part en boutique. Le reste est trié et recyclé. Rien ne finit inutilement à la déchetterie." },
]

export default function DebarrasPage() {
  return (
    <>
      {/* Hero */}
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
                    Vous débarrassez,
                    <br />
                    on s'occupe du reste.
                  </motion.span>
                </span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Déménagement, succession, grenier à vider — on vient collecter vos
                encombrants à Château-Thierry et dans l'Aisne, et on leur donne une
                seconde vie.
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-8 inline-flex items-center gap-3 bg-terracotta text-paper font-display font-bold px-8 py-4 rounded-full text-lg hover:bg-terracotta/90 transition-colors"
              >
                <Phone size={20} strokeWidth={2} />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="py-16 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <h2
            className="font-display font-medium text-ink text-center"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.4rem)" }}
          >
            Dans quelle situation êtes-vous ?
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SITUATIONS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-cream border border-ink/8 rounded-2xl p-6 flex flex-col gap-3"
              >
                <span className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center">
                  <Icon size={20} className="text-sage-deep" strokeWidth={1.8} />
                </span>
                <strong className="font-display font-semibold text-ink text-[1.05rem]">{label}</strong>
                <p className="text-ink/65 text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArcDivider from="bg-paper" to="bg-ink" />

      {/* Étapes */}
      <section className="py-16 px-4 md:px-8 bg-ink">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-medium text-paper text-center"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.4rem)" }}
          >
            Comment ça se passe ?
          </h2>
          <div className="mt-12 flex flex-col gap-8">
            {ETAPES.map(({ num, title, desc }, i) => (
              <div key={num} className="flex gap-6 items-start">
                <span className="shrink-0 w-12 h-12 rounded-full border-2 border-terracotta text-terracotta font-display font-bold text-[15px] flex items-center justify-center">
                  {num}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-paper text-[1.1rem]">{title}</h3>
                  <p className="mt-1 text-paper/65 text-[14px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArcDivider from="bg-ink" to="bg-paper" flip />

      {/* CTA final */}
      <section className="py-16 px-4 md:px-8 bg-paper text-center">
        <div className="max-w-[600px] mx-auto">
          <h2
            className="font-display font-medium text-ink"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.4rem)" }}
          >
            Un devis rapide, par téléphone.
          </h2>
          <p className="mt-4 text-ink/65 text-[15px] leading-relaxed">
            Décrivez-nous en quelques mots ce que vous souhaitez débarrasser —
            on vous répond rapidement et on organise la collecte à votre convenance.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-flex items-center gap-3 bg-sage text-paper font-display font-bold px-8 py-4 rounded-full text-xl hover:bg-sage/90 transition-colors"
          >
            <Phone size={22} strokeWidth={2} />
            {SITE.phone}
          </a>
          <p className="mt-4 text-ink/40 text-[13px]">
            Mardi – Samedi · 09h30 – 18h00
          </p>
        </div>
      </section>
    </>
  )
}
