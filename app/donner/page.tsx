"use client"

import { motion } from "framer-motion"
import {
  Phone,
  Calendar,
  Check,
  AlertCircle,
  Truck,
  Sparkles,
  Tags,
} from "lucide-react"
import { DON_STEPS, ITEMS, SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"

const stepIcons = [Phone, Truck, Sparkles, Tags]

export default function DonnerPage() {

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 px-4 md:px-8 bg-paper overflow-x-clip">
        <div className="max-w-[1300px] mx-auto">
          <div className="spotlight relative bg-sage paper-texture border-2 border-ink/10 p-8 sm:p-10 md:p-16 text-center rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] overflow-hidden">
            <ShineSweep />
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
                  className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[36px] rounded-br-[36px] p-6 text-center cursor-default overflow-hidden transition-colors"
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
            className="group relative bg-paper border-2 border-ink/10 hover:border-terracotta/40 rounded-tl-[40px] rounded-br-[40px] p-8 cursor-default overflow-hidden transition-colors"
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
            className="group relative bg-sage paper-texture border-2 border-ink/10 hover:border-terracotta-soft/60 rounded-tl-[40px] rounded-br-[40px] p-8 cursor-default overflow-hidden transition-colors"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(260px_circle_at_center,rgba(255,255,255,0.18),transparent_65%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/80 font-semibold mb-5">
                <Calendar size={13} strokeWidth={1.8} />
                Dépôt de dons
              </div>
              <p className="text-[15px] text-paper/90 leading-relaxed mb-4">
                Le dépôt de dons se fait <strong className="text-paper font-semibold">sans rendez-vous</strong>, directement à la ressourcerie de Château-Thierry.
              </p>
              <p className="text-[13px] text-paper/70 leading-relaxed mb-2">
                22 avenue de l'Europe, 02410 Château-Thierry
              </p>
              <div className="mt-4 flex items-start gap-2 text-[13px] text-terracotta-soft">
                <AlertCircle size={14} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Exception :</strong> les meubles sont acceptés uniquement sur rendez-vous.
                </span>
              </div>
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

      {/* Contact pour un don */}
      <section id="formulaire" className="py-24 px-4 md:px-8 bg-paper">
        <div className="max-w-[900px] mx-auto">
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
                Faire un don
              </div>
              <h2 className="font-display font-medium text-4xl md:text-5xl text-paper leading-[1.05]">
                Un appel, c'est parti.
              </h2>
              <p className="mt-5 text-paper/85 text-[15px] max-w-md mx-auto leading-relaxed">
                Dépôt sans rendez-vous aux horaires d'ouverture. Pour les meubles,
                appelez-nous pour convenir d'un créneau de collecte ou de dépôt.
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-8 inline-flex items-center justify-center gap-3 bg-paper text-sage-deep px-7 py-4 rounded-full font-display font-bold text-2xl tracking-[0.08em] tabular-nums hover:bg-cream transition-colors"
              >
                <Phone size={20} strokeWidth={2} className="text-terracotta" />
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
