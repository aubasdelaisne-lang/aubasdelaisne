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
  MapPin,
  Phone,
} from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import HorairesPlaque from "@/components/ui/HorairesPlaque"

type Category = {
  Icon: typeof Armchair
  label: string
  desc: string
  tone: "sage" | "paper" | "cream" | "terracotta"
  size: "xl" | "lg" | "md"
}

const categories: Category[] = [
  {
    Icon: Armchair,
    label: "Meubles",
    desc: "Tables, chaises, armoires, commodes, bureaux, étagères. Du mobilier solide et plein de caractère.",
    tone: "sage",
    size: "xl",
  },
  {
    Icon: BookOpen,
    label: "Livres & Médias",
    desc: "Romans, BD, livres jeunesse, CD, DVD, vinyles.",
    tone: "cream",
    size: "lg",
  },
  {
    Icon: Utensils,
    label: "Vaisselle",
    desc: "Assiettes, verres, couverts, plats, théières.",
    tone: "paper",
    size: "md",
  },
  {
    Icon: ToyBrick,
    label: "Jouets",
    desc: "Jeux de société, peluches, Lego, poupées.",
    tone: "paper",
    size: "md",
  },
  {
    Icon: Bike,
    label: "Vélos",
    desc: "Vélos adultes et enfants, selon les dons.",
    tone: "terracotta",
    size: "lg",
  },
  {
    Icon: Frame,
    label: "Déco",
    desc: "Cadres, bibelots, luminaires, linge de maison.",
    tone: "cream",
    size: "lg",
  },
]

const toneStyles: Record<Category["tone"], { bg: string; text: string; iconBg: string; iconColor: string }> = {
  sage: {
    bg: "bg-sage paper-texture",
    text: "text-paper",
    iconBg: "bg-terracotta",
    iconColor: "text-paper",
  },
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    iconBg: "bg-sage",
    iconColor: "text-paper",
  },
  cream: {
    bg: "bg-cream-soft",
    text: "text-ink",
    iconBg: "bg-sage",
    iconColor: "text-paper",
  },
  terracotta: {
    bg: "bg-terracotta paper-texture",
    text: "text-paper",
    iconBg: "bg-paper",
    iconColor: "text-terracotta",
  },
}

const sizeClasses: Record<Category["size"], string> = {
  xl: "md:col-span-2 md:row-span-2 rounded-tl-[80px] rounded-br-[80px] min-h-[380px]",
  lg: "md:col-span-2 rounded-tl-[60px] rounded-br-[60px] min-h-[220px]",
  md: "md:col-span-1 rounded-tl-[40px] rounded-br-[40px] min-h-[220px]",
}

export default function BoutiquePage() {
  return (
    <>
      {/* Hero de page */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] overflow-hidden">
            <ShineSweep />
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
            className="relative aspect-[16/8] grain overflow-hidden border-2 border-ink/10 rounded-tl-[60px] md:rounded-tl-[100px] rounded-br-[60px] md:rounded-br-[100px]"
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

      {/* Catégories — bento grid asymétrique */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto">
          {/* Header asymétrique */}
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <span aria-hidden className="h-px w-12 bg-terracotta" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
                  Nos Rayons
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-medium text-4xl md:text-6xl text-sage-deep leading-[1]"
              >
                Ce qu'on propose.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-sm text-[14px] text-ink-soft leading-relaxed md:text-right"
            >
              Un inventaire vivant, renouvelé chaque semaine par les dons du territoire.
            </motion.p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
            {categories.map((cat, i) => {
              const t = toneStyles[cat.tone]
              const isXL = cat.size === "xl"
              return (
                <motion.article
                  key={cat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className={`spotlight group relative border-2 border-ink/10 hover:border-terracotta p-6 md:p-8 cursor-default overflow-hidden transition-[border-color,box-shadow] duration-500 hover:shadow-[0_20px_40px_-15px_rgba(239,95,23,0.3)] ${sizeClasses[cat.size]} ${t.bg} ${t.text}`}
                >
                  {/* Shimmer diagonal au hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-paper/25 to-transparent skew-x-[-18deg] group-hover:left-[150%] transition-[left] duration-[1400ms] ease-out"
                  />

                  {/* Contenu */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icône */}
                    <div className="flex justify-end mb-5">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.12 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${t.iconBg}`}
                      >
                        <cat.Icon size={20} strokeWidth={1.6} className={t.iconColor} />
                      </motion.div>
                    </div>

                    {/* Titre */}
                    <h3
                      className={`font-display font-semibold leading-tight mb-3 ${
                        isXL ? "text-3xl md:text-5xl" : "text-2xl md:text-[1.75rem]"
                      }`}
                    >
                      {cat.label}
                    </h3>

                    {/* Description */}
                    <p
                      className={`leading-relaxed ${
                        isXL ? "text-[15px] max-w-md" : "text-[13px]"
                      } ${cat.tone === "sage" || cat.tone === "terracotta" ? "text-paper/85" : "text-ink-soft"}`}
                    >
                      {cat.desc}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* Note de bas de grid */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 text-center text-[13px] text-ink-soft italic"
          >
            Les stocks varient selon les dons reçus — chaque visite est une nouvelle surprise.
          </motion.p>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-cream-soft">
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
              className="group relative aspect-video grain overflow-hidden border-2 border-ink/10 cursor-pointer rounded-tr-[60px]"
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
              className="group relative aspect-video grain overflow-hidden border-2 border-ink/10 cursor-pointer rounded-br-[60px]"
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
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Horaires — plaque émail */}
          <div className="flex justify-center">
            <HorairesPlaque />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group relative bg-sage paper-texture border-2 border-ink/10 hover:border-terracotta-soft/60 rounded-tl-[40px] rounded-br-[40px] p-8 cursor-default overflow-hidden transition-colors"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(260px_circle_at_center,rgba(255,255,255,0.18),transparent_65%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/80 font-semibold mb-5">
                <MapPin size={13} strokeWidth={1.8} />
                Nous trouver
              </div>
              <div className="mb-6">
                <p className="font-display text-2xl text-paper leading-snug">
                  {SITE.address}
                </p>
                <p className="font-display text-lg text-paper/65 leading-snug mt-2">
                  {SITE.addressSecondary}
                </p>
              </div>
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
      <section className="py-24 px-4 md:px-8 bg-paper">
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
                Nous rendre visite
              </div>
              <h2 className="font-display font-medium text-4xl md:text-5xl text-paper leading-[1.05]">
                Venez chiner.
              </h2>
              <p className="mt-5 text-paper/85 text-[15px] max-w-md mx-auto leading-relaxed">
                La boutique ouvre ses portes du mardi au samedi. Chaque visite réserve une nouvelle trouvaille.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-paper text-sage-deep px-7 py-3.5 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-cream transition-colors"
                >
                  Voir l'accès
                </Link>
                <Link
                  href="/donner"
                  className="inline-flex items-center gap-2 border-2 border-paper/70 text-paper px-7 py-3.5 text-[13px] tracking-[0.22em] uppercase font-bold rounded-full hover:border-paper transition-colors"
                >
                  Faire un don
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
