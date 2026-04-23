"use client"

import { motion } from "framer-motion"
import { Phone, Truck, Sparkles, Tags } from "lucide-react"
import { DON_STEPS, SITE } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"
import MagneticButton from "@/components/ui/MagneticButton"
import ShineSweep from "@/components/ui/ShineSweep"

const stepIcons = [Phone, Truck, Sparkles, Tags]

export default function DonSteps() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Faire un don"
          title="Simple comme un coup de fil."
          lede="En quatre étapes, vos objets trouvent une nouvelle maison."
        />

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5">
          {/* Ligne horizontale de liaison entre étapes (desktop) */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-px bg-terracotta/40 origin-left"
          />
          {DON_STEPS.map((step, i) => {
            const Icon = stepIcons[i]
            const delay = i * 0.15
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-cream-soft hover:bg-paper border-2 border-ink/10 hover:border-terracotta/40 p-6 md:p-7 text-center overflow-hidden transition-colors cursor-default"
              >
                {/* Spotlight curseur */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(200px_circle_at_center,rgba(25,20,101,0.18),transparent_65%)]"
                />
                {/* Trait haut terracotta */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 right-0 h-0.5 bg-terracotta origin-left"
                />

                {/* Icône ronde avec pulse + spring */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: delay + 0.35,
                  }}
                  whileHover={{ rotate: 12, scale: 1.08 }}
                  className="relative w-14 h-14 rounded-full bg-sage mx-auto flex items-center justify-center mb-5 shadow-sm"
                >
                  <motion.span
                    aria-hidden
                    initial={{ scale: 1, opacity: 0.5 }}
                    whileInView={{ scale: 1.6, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: delay + 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-sage"
                  />
                  <Icon size={22} strokeWidth={1.5} className="relative text-paper" />
                </motion.div>

                {/* Numéro étape */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: delay + 0.5 }}
                  className="font-display font-bold text-sage-deep text-xl mb-2"
                >
                  {step.step}
                </motion.div>
                <h3 className="font-display font-semibold text-lg text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA bar sauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="spotlight relative mt-16 bg-sage paper-texture border-2 border-ink/10 p-8 md:p-12 text-center rounded-tl-[60px] md:rounded-tl-[80px] rounded-br-[60px] md:rounded-br-[80px] overflow-hidden"
        >
          <ShineSweep delay={0.4} />
          <h3 className="relative z-10 font-display font-medium text-3xl md:text-4xl text-paper leading-tight">
            Prêt à nous confier vos objets ?
          </h3>
          <p className="relative z-10 mt-4 text-paper/85 text-[15px]">
            Un appel suffit.{" "}
            <a
              href={SITE.phoneHref}
              className="underline underline-offset-4 decoration-paper/60 hover:decoration-paper font-semibold"
            >
              {SITE.phone}
            </a>
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton
              href="/donner"
              className="bg-paper text-sage-deep px-8 py-3.5 text-[13px] tracking-[0.25em] uppercase font-bold overflow-hidden rounded-full"
            >
              Prendre rendez-vous
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
