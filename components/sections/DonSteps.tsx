"use client"

import { motion } from "framer-motion"
import { SITE } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"
import MagneticButton from "@/components/ui/MagneticButton"
import ShineSweep from "@/components/ui/ShineSweep"
import StepsTimeline from "@/components/ui/StepsTimeline"

export default function DonSteps() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-paper overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Faire un don"
          title="Simple comme un coup de fil."
          lede="En quatre étapes, vos objets trouvent une nouvelle maison."
        />

        <StepsTimeline />

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
              href="/donner#formulaire"
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
