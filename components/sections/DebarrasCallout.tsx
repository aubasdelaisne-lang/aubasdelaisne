"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import { SITE } from "@/lib/constants"
import ShineSweep from "@/components/ui/ShineSweep"

/**
 * Bandeau compact sous le hero : met en avant le service débarras
 * (grosse partie de l'activité) et renvoie vers /debarras.
 * Carte navy aux coins asymétriques, camion flottant, halo orange.
 */
export default function DebarrasCallout() {
  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-paper">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="spotlight relative bg-sage paper-texture overflow-hidden rounded-tl-[44px] md:rounded-tl-[60px] rounded-br-[44px] md:rounded-br-[60px] px-7 py-8 md:px-12 md:py-10"
        >
          <ShineSweep delay={0.3} />
          {/* Halo orange côté CTA */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 45% 90% at 88% 50%, rgba(239,95,23,0.22), transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-7 md:gap-10">
            {/* Texte */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] tracking-[0.3em] uppercase text-terracotta-soft font-semibold">
                Service débarras
              </p>
              <h2
                className="mt-2 font-display font-medium text-paper leading-tight"
                style={{ fontSize: "clamp(1.4rem, 0.9rem + 1.6vw, 2.1rem)" }}
              >
                Une maison à vider ? On s'occupe de tout.
              </h2>
              <p className="mt-2 text-paper/70 text-[14px] leading-relaxed max-w-[52ch]">
                Succession, déménagement, grenier plein : on vient, on emporte,
                et vos objets financent l'emploi local.
              </p>
            </div>

            {/* CTAs */}
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/debarras"
                className="group inline-flex items-center justify-center gap-2 bg-paper text-sage-deep font-display font-bold px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.18em] hover:bg-cream hover:-translate-y-0.5 transition-all duration-300 shadow-md"
              >
                Découvrir le service
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-paper/40 text-paper px-7 py-3 rounded-full text-[14px] font-bold tabular-nums hover:border-paper hover:bg-paper/10 transition-colors"
              >
                <Phone size={15} strokeWidth={2} className="text-terracotta-soft" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
