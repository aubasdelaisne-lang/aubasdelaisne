"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion"
import { STATS } from "@/lib/constants"

const ease = [0.16, 1, 0.3, 1] as const

/* Compteur : requestAnimationFrame + easeOutCubic, déclenché au scroll */
function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })

  useEffect(() => {
    if (!inView) return
    const duration = 1900
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return <span ref={ref}>{val.toLocaleString("fr-FR")}</span>
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  /* Filaments SVG qui se dessinent au scroll, en cascade */
  const draw1 = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), { stiffness: 85, damping: 28 })
  const draw2 = useSpring(useTransform(scrollYProgress, [0.05, 0.6], [0, 1]), { stiffness: 70, damping: 26 })
  const draw3 = useSpring(useTransform(scrollYProgress, [0.1, 0.65], [0, 1]), { stiffness: 75, damping: 30 })
  const draw4 = useSpring(useTransform(scrollYProgress, [0.15, 0.7], [0, 1]), { stiffness: 68, damping: 27 })
  const draw5 = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), { stiffness: 72, damping: 29 })

  /* Chiffres fantômes en parallaxe */
  const ghostY = useTransform(scrollYProgress, [0, 1], ["40px", "-120px"])

  /* Spotlight qui suit le curseur */
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const spotX = useSpring(cursorX, { stiffness: 70, damping: 22 })
  const spotY = useSpring(cursorY, { stiffness: 70, damping: 22 })

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative -mt-10 md:-mt-14 px-4 md:px-8 pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden bg-sage paper-texture"
      style={{
        clipPath: "polygon(0 48px, 100% 0, 100% calc(100% - 48px), 0 100%)",
      }}
    >
      {/* ── Fond : couches superposées ─────────────── */}
      {/* Halo haut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% -4%, rgba(239,95,23,0.22) 0%, transparent 65%)" }}
      />
      {/* Halo bas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 35% at 50% 108%, rgba(239,95,23,0.14) 0%, transparent 60%)" }}
      />
      {/* Vignette bords */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 45%, rgba(10,8,56,0.55) 100%)" }}
      />
      {/* Grille de points */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(239,95,23,0.16) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      {/* Spotlight souris */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{
          width: 800,
          height: 800,
          left: spotX,
          top: spotY,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(239,95,23,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Filaments SVG */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.path d="M -60 980 C 100 780 280 500 550 320 C 780 170 1000 200 1260 60" stroke="rgba(239,95,23,0.5)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: draw1 }} />
        <motion.path d="M -40 700 C 200 620 420 660 640 500 C 860 340 1040 420 1260 300" stroke="rgba(239,95,23,0.28)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: draw2 }} />
        <motion.path d="M -60 300 C 180 360 380 240 600 300 C 840 366 1020 260 1260 340" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" style={{ pathLength: draw3 }} />
        <motion.path d="M -40 120 C 220 240 460 180 700 260 C 920 334 1080 300 1260 420" stroke="rgba(239,95,23,0.2)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: draw4 }} />
        <motion.path d="M -60 520 C 160 460 360 540 560 460 C 800 366 1040 540 1260 500" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" style={{ pathLength: draw5 }} />
      </svg>

      {/* Chiffres fantômes en parallaxe */}
      <motion.div aria-hidden style={{ y: ghostY }} className="pointer-events-none absolute inset-0 overflow-hidden">
        {["10", "02", "100"].map((n, i) => (
          <div
            key={n}
            style={{
              fontSize: "clamp(12rem, 24vw, 24rem)",
              color: "rgba(239,95,23,0.06)",
              position: "absolute",
              top: i * 360 - 40,
              left: i % 2 === 0 ? "-2rem" : "auto",
              right: i % 2 === 1 ? "-2rem" : "auto",
              letterSpacing: "-0.04em",
              fontWeight: 800,
              lineHeight: 1,
            }}
            className="font-display"
          >
            {n}
          </div>
        ))}
      </motion.div>

      {/* ── Contenu ─────────────────────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span aria-hidden className="h-px w-10 bg-terracotta" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta-soft font-semibold">
              Notre Impact
            </span>
            <span aria-hidden className="h-px w-10 bg-terracotta" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-display font-medium text-3xl md:text-5xl text-paper leading-[1.1]"
          >
            Dix ans d'engagement local.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-5 max-w-2xl mx-auto text-[14px] text-paper/70 leading-relaxed"
          >
            Des chiffres qui racontent un territoire — objets sauvés, emplois créés, dons
            collectés.
          </motion.p>
        </div>

        {/* Cartes chiffres : entrée alternée gauche/droite */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-0">
          {STATS.map((s, i) => {
            const fromX = i % 2 === 0 ? -50 : 50
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: fromX, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="group relative text-center md:text-left md:px-8 first:md:pl-0 last:md:pr-0 md:[&:not(:first-child)]:border-l md:border-paper/15"
              >
                <div className="font-display font-bold text-[3.5rem] sm:text-7xl md:text-[5rem] leading-[0.9] tracking-tight tabular-nums text-paper transition-colors duration-500 group-hover:text-terracotta-soft">
                  <Counter target={s.value} />
                </div>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 + 0.3, ease }}
                  className="block h-1 w-12 bg-terracotta rounded-full mt-5 mx-auto md:mx-0 origin-center md:origin-left transition-[width] duration-500 group-hover:w-20"
                />
                <div className="mt-5 text-[12px] uppercase tracking-[0.25em] font-bold text-terracotta-soft">
                  {s.unit}
                </div>
                <div className="mt-1.5 text-[13px] text-paper/65 leading-snug">
                  {s.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center text-[13px] text-paper/55 italic max-w-2xl mx-auto"
        >
          Chaque geste compte. Chaque objet sauvé prolonge l'histoire de notre territoire.
        </motion.p>
      </div>
    </section>
  )
}
