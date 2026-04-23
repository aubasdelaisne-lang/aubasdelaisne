"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Phone,
  Calendar,
  Check,
  AlertCircle,
  Truck,
  Sparkles,
  Tags,
  ChevronDown,
} from "lucide-react"
import { DON_STEPS, HOURS_DEPOT, ITEMS, SITE } from "@/lib/constants"
import Starburst from "@/components/ui/Starburst"

const stepIcons = [Phone, Truck, Sparkles, Tags]

export default function DonnerPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-6 sm:-top-8 left-4 sm:left-6 text-cream scale-75 sm:scale-100 origin-top-left"
            >
              <Starburst size={90} points={18} duration={80} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 sm:-bottom-10 right-4 sm:right-6 text-cream scale-75 sm:scale-100 origin-bottom-right"
            >
              <Starburst size={110} points={20} duration={90} />
            </motion.div>

            <div className="relative z-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-paper/80 font-semibold">
                Faire un don
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 font-display font-medium text-4xl md:text-6xl text-paper leading-[1.05]"
              >
                Un objet oublié,
                <br />
                une seconde vie.
              </motion.h1>
              <p className="mt-6 max-w-xl mx-auto text-paper/85 text-[15px] leading-relaxed">
                Vos affaires dont vous n'avez plus besoin peuvent servir à
                d'autres. Déposez-les ou faites-les collecter — on s'occupe du
                reste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-24 px-4 md:px-8 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Le processus
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Quatre étapes simples.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {DON_STEPS.map((step, i) => {
              const Icon = stepIcons[i]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-6 text-center cursor-default overflow-hidden transition-colors"
                >
                  <span aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(200px_circle_at_center,rgba(25,20,101,0.18),transparent_65%)]" />
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="relative w-14 h-14 rounded-full bg-sage mx-auto flex items-center justify-center mb-4 shadow-sm"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-paper" />
                  </motion.div>
                  <div className="relative font-display font-bold text-sage-deep text-xl mb-2">
                    {step.step}
                  </div>
                  <h3 className="relative font-display font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="relative text-[13px] text-ink-soft leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Objets acceptés + Horaires */}
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
            <div className="relative text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-5">
              Objets acceptés
            </div>
            <div className="relative flex flex-wrap gap-2 mb-5">
              {ITEMS.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2, scale: 1.05, backgroundColor: "#191465", color: "#fafaff" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] bg-cream-soft border border-ink/10 rounded-full cursor-default transition-colors"
                >
                  <Check size={11} strokeWidth={2.5} className="text-sage-deep" />
                  {item}
                </motion.span>
              ))}
            </div>
            <div className="relative flex items-start gap-2 text-[12px] text-ink-soft">
              <AlertCircle size={13} strokeWidth={1.5} className="text-terracotta shrink-0 mt-0.5" />
              <span>
                Les objets doivent être en bon état. Nous nous réservons le droit de
                refuser certains dons.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative bg-sage paper-texture border-2 border-ink/10 hover:border-terracotta-soft/60 p-8 cursor-default overflow-hidden transition-colors"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(260px_circle_at_center,rgba(255,255,255,0.18),transparent_65%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/80 font-semibold mb-5">
                <Calendar size={13} strokeWidth={1.8} />
                Horaires de dépôt
              </div>
              {HOURS_DEPOT.map((h, i) => (
                <div key={i}>
                  {"days" in h && (
                    <div className="flex justify-between items-baseline text-[15px] pb-2 border-b border-paper/20">
                      <span className="text-paper/80">{h.days}</span>
                      <span className="text-paper font-semibold tabular-nums">{h.hours}</span>
                    </div>
                  )}
                  {"note" in h && (
                    <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-terracotta-soft font-semibold italic">
                      {h.note}
                    </p>
                  )}
                </div>
              ))}
              <a
                href={SITE.phoneHref}
                className="mt-6 inline-flex items-center gap-2 bg-paper text-sage-deep px-5 py-2.5 text-[12px] tracking-[0.22em] uppercase font-bold rounded-full hover:bg-cream transition-colors"
              >
                <Phone size={12} strokeWidth={2} />
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-24 px-4 md:px-8 bg-paper">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <div className="text-[11px] tracking-[0.3em] uppercase text-sage-deep font-semibold">
              Prise de rendez-vous
            </div>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl text-sage-deep leading-[1.1]">
              Planifier un don.
            </h2>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cream-soft border-2 border-ink/10 p-10 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-sage mx-auto flex items-center justify-center mb-5">
                <Check size={22} strokeWidth={2} className="text-paper" />
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2">Demande envoyée.</h3>
              <p className="text-ink-soft text-[14px]">
                Nous vous recontacterons dans les plus brefs délais.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-[12px] uppercase tracking-[0.22em] font-semibold text-sage-deep border-b-2 border-sage hover:border-sage-deep pb-0.5"
              >
                Retour à l'accueil
              </Link>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="bg-cream-soft border-2 border-ink/10 p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
                    Nom et prénom
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Marie Dupont"
                    className="w-full bg-paper border-2 border-ink/15 focus:border-sage px-4 py-3 text-[15px] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
                    Téléphone
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="w-full bg-paper border-2 border-ink/15 focus:border-sage px-4 py-3 text-[15px] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
                  Type d'objets
                </label>
                <div className="relative">
                  <select
                    required
                    defaultValue=""
                    className="w-full bg-paper border-2 border-ink/15 focus:border-sage px-4 py-3 text-[15px] outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Sélectionner…</option>
                    {ITEMS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                    <option>Autre</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-4 text-ink-soft pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  className="w-full bg-paper border-2 border-ink/15 focus:border-sage px-4 py-3 text-[15px] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-sage-deep font-semibold mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  rows={3}
                  placeholder="État, quantité…"
                  className="w-full bg-paper border-2 border-ink/15 focus:border-sage px-4 py-3 text-[15px] outline-none resize-none transition-colors"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full bg-sage text-paper px-6 py-4 text-[13px] tracking-[0.25em] uppercase font-bold rounded-full hover:bg-sage-deep transition-colors"
              >
                Envoyer ma demande
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
