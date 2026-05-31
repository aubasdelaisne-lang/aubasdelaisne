"use client"

import { motion } from "framer-motion"
import { MapPin, Phone } from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"
import HorairesPlaque from "@/components/ui/HorairesPlaque"

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] overflow-hidden">
            <ShineSweep />
            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                Contact
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 font-display font-medium text-4xl md:text-6xl text-paper leading-[1.05]"
              >
                À votre écoute.
              </motion.h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Une question, un projet de don, ou simplement envie de passer ?
                Écrivez-nous ou appelez directement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid contact */}
      <section className="py-20 md:py-24 px-4 md:px-8 bg-paper">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Infos + carte */}
          <div className="space-y-5">
            {/* Adresse principale — Château-Thierry */}
            <motion.a
              href={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex gap-5 p-6 bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[32px] rounded-br-[32px] transition-colors overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(25,20,101,0.15),transparent_65%)]" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative w-12 h-12 rounded-full bg-sage flex items-center justify-center shrink-0 shadow-sm"
              >
                <MapPin size={18} strokeWidth={1.6} className="text-paper" />
              </motion.div>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold">
                  Boutique — Château-Thierry
                </div>
                <div className="font-display text-lg mt-1">{SITE.address}</div>
              </div>
            </motion.a>

            {/* Adresse secondaire — Brasles */}
            <motion.a
              href={`https://www.google.com/maps?q=${encodeURIComponent(SITE.addressSecondary)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex gap-5 p-6 bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[32px] rounded-br-[32px] transition-colors overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(25,20,101,0.15),transparent_65%)]" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative w-12 h-12 rounded-full bg-sage/60 flex items-center justify-center shrink-0 shadow-sm"
              >
                <MapPin size={18} strokeWidth={1.6} className="text-paper" />
              </motion.div>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold">
                  Dépôt — Brasles
                </div>
                <div className="font-display text-lg mt-1">{SITE.addressSecondary}</div>
              </div>
            </motion.a>

            <motion.a
              href={SITE.phoneHref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex gap-5 p-6 bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[32px] rounded-br-[32px] transition-colors overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(239,95,23,0.15),transparent_65%)]" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative w-12 h-12 rounded-full bg-terracotta flex items-center justify-center shrink-0 shadow-sm"
              >
                <Phone size={18} strokeWidth={1.6} className="text-paper" />
              </motion.div>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold">
                  Téléphone
                </div>
                <div className="font-display text-lg mt-1">{SITE.phone}</div>
              </div>
            </motion.a>

            <motion.a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex gap-5 p-6 bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[32px] rounded-br-[32px] transition-colors overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(15,10,69,0.15),transparent_65%)]" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative w-12 h-12 rounded-full bg-sage-deep flex items-center justify-center shrink-0 text-paper shadow-sm"
              >
                <FacebookIcon size={18} />
              </motion.div>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold">
                  Facebook
                </div>
                <div className="font-display text-lg mt-1">facebook.com/aubasdelaisne</div>
              </div>
            </motion.a>

            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex gap-5 p-6 bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[32px] rounded-br-[32px] transition-colors overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_center,rgba(239,95,23,0.12),transparent_65%)]" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative w-12 h-12 rounded-full bg-sage-deep flex items-center justify-center shrink-0 text-paper shadow-sm"
              >
                <InstagramIcon size={18} />
              </motion.div>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold">
                  Instagram
                </div>
                <div className="font-display text-lg mt-1">@ressourcerie_aubasdelaisne</div>
              </div>
            </motion.a>

            {/* Horaires — plaque émail */}
            <div className="flex justify-center">
              <HorairesPlaque />
            </div>

            {/* Carte */}
            <div className="overflow-hidden border-2 border-ink/10 rounded-tl-[32px] rounded-br-[32px]">
              <iframe
                title="Localisation"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.4149%2C49.0490%2C3.4249%2C49.0540&layer=mapnik&marker=49.0515%2C3.4199"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold mb-4">
              Nous contacter
            </div>
            <h2 className="font-display font-medium text-3xl md:text-4xl text-sage-deep leading-tight mb-8">
              Parlons directement.
            </h2>

            <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 rounded-tl-[40px] rounded-br-[40px] p-8 md:p-10 overflow-hidden">
              <ShineSweep delay={0.3} />
              <div className="relative z-10">
                <p className="text-paper/85 text-[15px] leading-relaxed">
                  Le plus simple, c'est de nous appeler ou de passer nous voir
                  pendant les horaires d'ouverture. Pour un don de meubles, un
                  coup de fil suffit pour convenir d'un rendez-vous.
                </p>

                {/* Téléphone */}
                <a
                  href={SITE.phoneHref}
                  className="mt-8 flex items-center justify-center gap-3 bg-paper text-sage-deep px-6 py-4 rounded-full font-display font-bold text-2xl tracking-[0.08em] tabular-nums hover:bg-cream transition-colors"
                >
                  <Phone size={20} strokeWidth={2} className="text-terracotta" />
                  {SITE.phone}
                </a>

                {/* Réseaux sociaux */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-paper/40 text-paper px-4 py-3 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:border-paper transition-colors"
                  >
                    <FacebookIcon size={15} />
                    Facebook
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-paper/40 text-paper px-4 py-3 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:border-paper transition-colors"
                  >
                    <InstagramIcon size={15} />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
