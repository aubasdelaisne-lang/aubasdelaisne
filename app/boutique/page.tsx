"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Armchair,
  BookOpen,
  Utensils,
  ToyBrick,
  Bike,
  Frame,
  Clock,
  MapPin,
  Phone,
} from "lucide-react"
import { HOURS_BOUTIQUE, SITE } from "@/lib/constants"

const categories = [
  { Icon: Armchair, label: "Meubles", desc: "Tables, chaises, armoires, commodes…" },
  { Icon: BookOpen, label: "Livres & Médias", desc: "Livres, CD, DVD, vinyles…" },
  { Icon: Utensils, label: "Vaisselle", desc: "Assiettes, verres, couverts, plats…" },
  { Icon: ToyBrick, label: "Jouets", desc: "Jouets, jeux de société, peluches…" },
  { Icon: Bike, label: "Vélos", desc: "Selon disponibilité des dons reçus." },
  { Icon: Frame, label: "Déco", desc: "Cadres, bibelots, luminaires, linge…" },
]

export default function BoutiquePage() {
  return (
    <>
      {/* Hero de page */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px]">
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                La Boutique
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 font-display font-medium text-4xl md:text-6xl text-paper leading-[1.05]"
              >
                Chiner. Donner.
                <br />
                Recommencer.
              </motion.h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Une boutique solidaire qui se renouvelle chaque semaine. Prix
                doux, objets choisis, ambiance brocante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image cover */}
      <section className="px-4 md:px-8 bg-paper">
        <div className="max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[16/8] grain overflow-hidden border-2 border-ink/10"
          >
            <Image
              src="/images/boutique-capture.png"
              alt="Devanture de la boutique"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Nos Rayons
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Six familles d'objets.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-6 md:p-8 text-center cursor-default overflow-hidden transition-colors rounded-t-[40px]"
              >
                <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(220px_circle_at_center,rgba(25,20,101,0.18),transparent_65%)]" />
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="relative w-14 h-14 rounded-full bg-sage mx-auto flex items-center justify-center mb-5 shadow-sm"
                >
                  <cat.Icon size={22} strokeWidth={1.6} className="text-paper" />
                </motion.div>
                <h3 className="relative font-display font-semibold text-xl mb-2">{cat.label}</h3>
                <p className="relative text-[13px] text-ink-soft leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-24 md:py-28 px-4 md:px-8 bg-cream-soft">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              En images
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              La boutique en vrai.
            </h2>
          </div>

          {/* Grid asymétrique : 1 grande à gauche + 2 empilées à droite */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Grande image gauche */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] md:aspect-auto md:row-span-2 grain overflow-hidden border-2 border-ink/10 cursor-pointer rounded-t-[80px] md:rounded-t-[120px]"
            >
              <Image
                src="/images/boutique-capture.png"
                alt="Devanture de la boutique Au Bas de l'Aisne"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <p className="font-display text-paper text-lg font-semibold">Notre boutique</p>
                <p className="text-paper/80 text-[13px]">8 avenue de Château-Thierry, Brasles</p>
              </motion.div>
            </motion.div>

            {/* Image haut droite */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-video grain overflow-hidden border-2 border-ink/10 cursor-pointer"
            >
              <Image
                src="/images/hero.jpeg"
                alt="L'équipe de la recyclerie Au Bas de l'Aisne"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-display text-paper text-base font-semibold">Notre équipe</p>
                <p className="text-paper/80 text-[12px]">Bénévoles & salariés en insertion</p>
              </motion.div>
            </motion.div>

            {/* Image bas droite */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-video grain overflow-hidden border-2 border-ink/10 cursor-pointer"
            >
              <Image
                src="/images/vaisselle.jpg"
                alt="Objets en vente — vaisselle et déco"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-display text-paper text-base font-semibold">Nos rayons</p>
                <p className="text-paper/80 text-[12px]">Vaisselle, déco & bibelots</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horaires + adresse */}
      <section className="py-16 px-4 md:px-8 bg-cream-soft">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group relative bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-8 cursor-default overflow-hidden transition-colors"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(260px_circle_at_center,rgba(25,20,101,0.15),transparent_65%)]" />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-5">
              <Clock size={13} strokeWidth={1.8} />
              Horaires
            </div>
            <div className="space-y-3">
              {HOURS_BOUTIQUE.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline text-[15px] pb-2 border-b border-rule/40 last:border-0"
                >
                  <span className="text-ink-soft">{h.days}</span>
                  <span
                    className={`tabular-nums ${
                      h.hours === "Fermé" ? "text-terracotta italic" : "text-ink font-semibold"
                    }`}
                  >
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group relative bg-sage paper-texture border-2 border-ink/10 hover:border-terracotta-soft/60 p-8 cursor-default overflow-hidden transition-colors"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(260px_circle_at_center,rgba(255,255,255,0.18),transparent_65%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/80 font-semibold mb-5">
                <MapPin size={13} strokeWidth={1.8} />
                Nous trouver
              </div>
              <p className="font-display text-2xl text-paper leading-snug mb-6">
                {SITE.address}
              </p>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 bg-paper text-sage-deep px-6 py-2.5 text-[12px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-cream transition-colors"
              >
                <Phone size={13} strokeWidth={2} />
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 bg-paper text-center">
        <h2 className="font-display font-medium text-4xl md:text-5xl text-sage-deep">
          Venez chiner.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="bg-sage text-paper px-7 py-3 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-sage-deep transition-colors"
          >
            Voir l'accès
          </Link>
          <Link
            href="/donner"
            className="bg-paper text-sage-deep border-2 border-sage px-7 py-3 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-cream transition-colors"
          >
            Faire un don
          </Link>
        </div>
      </section>
    </>
  )
}
