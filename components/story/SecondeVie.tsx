"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion"
import Fauteuil from "@/components/illustrations/Fauteuil"
import Caisse from "@/components/illustrations/Caisse"
import Main from "@/components/illustrations/Main"
import Camion from "@/components/illustrations/Camion"
import Atelier from "@/components/illustrations/Atelier"
import Etagere from "@/components/illustrations/Etagere"
import Etiquette from "@/components/illustrations/Etiquette"
import Salon from "@/components/illustrations/Salon"
import Papillon from "@/components/illustrations/Papillon"
import { P } from "@/components/illustrations/palette"

/* « La seconde vie d'un objet » — le scroll fait avancer l'histoire d'un
   fauteuil en 5 chapitres (scrub). Scène sticky plein écran, transforms GPU
   uniquement. Version statique empilée si prefers-reduced-motion. */

type Chapter = {
  id: "don" | "collecte" | "atelier" | "rayon" | "revit"
  range: readonly [number, number]
  kicker: string
  title: string
  text: string
}

const CHAPTERS: Chapter[] = [
  {
    id: "don",
    range: [0.0, 0.2],
    kicker: "Chapitre 1",
    title: "Tout commence par un geste",
    text: "Un fauteuil dont vous n'avez plus besoin ? Quelqu'un, quelque part, en rêve.",
  },
  {
    id: "collecte",
    range: [0.2, 0.4],
    kicker: "Chapitre 2",
    title: "On vient le chercher",
    text: "Dépôt sur place ou collecte à domicile — notre camion sillonne le sud de l'Aisne.",
  },
  {
    id: "atelier",
    range: [0.4, 0.6],
    kicker: "Chapitre 3",
    title: "On lui redonne vie",
    text: "Trié, nettoyé, réparé par notre équipe en insertion. Chaque objet repart de zéro.",
  },
  {
    id: "rayon",
    range: [0.6, 0.8],
    kicker: "Chapitre 4",
    title: "Il attend sa nouvelle maison",
    text: "En rayon à petit prix, au milieu de mille autres trouvailles.",
  },
  {
    id: "revit",
    range: [0.8, 1.0],
    kicker: "Chapitre 5",
    title: "Et l'histoire recommence",
    text: "Un objet sauvé, un emploi soutenu, des déchets évités. Tout le monde y gagne.",
  },
]

/** Fondu d'un chapitre sur sa plage de scroll.
 *  Le premier chapitre est visible dès l'entrée de la section,
 *  le dernier le reste jusqu'à la sortie. */
function useChapterOpacity(
  progress: MotionValue<number>,
  [a, b]: readonly [number, number]
) {
  const fade = 0.04
  const pts =
    a === 0
      ? { i: [a, b - fade, b], o: [1, 1, 0] }
      : b === 1
        ? { i: [a, a + fade, b], o: [0, 1, 1] }
        : { i: [a, a + fade, b - fade, b], o: [0, 1, 1, 0] }
  return useTransform(progress, pts.i, pts.o)
}

/* ————— Scènes illustrées ————— */

/** Chapitre 1 — la main dépose le fauteuil abîmé près de la caisse. */
function SceneDon({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0.02, 0.14], ["-46vw", "-4vw"])
  const y = useTransform(progress, [0.02, 0.14], ["-4vh", "0vh"])
  const decoY1 = useTransform(progress, [0, 0.2], [0, -46])
  const decoY2 = useTransform(progress, [0, 0.2], [0, 34])
  const decoY3 = useTransform(progress, [0, 0.2], [0, -22])

  return (
    <div className="absolute inset-0">
      {/* Cercles décoratifs en parallaxe */}
      <motion.span
        style={{ y: decoY1 }}
        className="absolute top-[24%] left-[14%] w-24 h-24 rounded-full bg-cream-soft/15 hidden md:block"
      />
      <motion.span
        style={{ y: decoY2 }}
        className="absolute top-[38%] right-[12%] w-14 h-14 rounded-full bg-terracotta-soft/20 hidden md:block"
      />
      <motion.span
        style={{ y: decoY3 }}
        className="absolute bottom-[34%] right-[26%] w-8 h-8 rounded-full bg-cream-soft/20 hidden md:block"
      />

      {/* Caisse au sol */}
      <span className="absolute bottom-[9vh] left-1/2 translate-x-[6vw] w-48 md:w-64">
        <Caisse className="w-full" />
      </span>

      {/* Main qui apporte le fauteuil */}
      <motion.div
        style={{ x, y }}
        className="absolute bottom-[calc(9vh+40px)] left-1/2 -translate-x-full w-40 md:w-56"
      >
        <Fauteuil state="abime" className="w-3/4 mx-auto" />
        <Main className="w-full -mt-5" />
      </motion.div>
    </div>
  )
}

/** Chapitre 2 — le camion roule, paysage en parallaxe. */
function SceneCollecte({ progress }: { progress: MotionValue<number> }) {
  const camionX = useTransform(progress, [0.2, 0.31], ["-55vw", "6vw"])
  const camionRotate = useTransform(
    progress,
    [0.31, 0.34, 0.37, 0.4],
    [0, -1.2, 1.2, 0]
  )
  const collinesArriereX = useTransform(progress, [0.2, 0.4], [0, -90])
  const collinesAvantX = useTransform(progress, [0.2, 0.4], [0, -180])
  const routeDashX = useTransform(progress, [0.2, 0.4], [0, -520])
  const nuageX = useTransform(progress, [0.2, 0.4], [0, -60])

  return (
    <div className="absolute inset-0">
      {/* Nuages */}
      <motion.div style={{ x: nuageX }} className="absolute inset-x-0 top-[26%] hidden md:block">
        <span className="absolute left-[16%] w-24 h-8 rounded-full bg-paper/15" />
        <span className="absolute left-[54%] top-10 w-16 h-6 rounded-full bg-paper/10" />
        <span className="absolute left-[80%] w-20 h-7 rounded-full bg-paper/15" />
      </motion.div>

      {/* Collines arrière */}
      <motion.div style={{ x: collinesArriereX }} className="absolute bottom-[13vh] left-0 w-[140%]">
        <svg viewBox="0 0 1400 160" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,160 L0,110 Q170,40 360,95 T720,80 T1080,100 T1400,70 L1400,160 Z"
            fill={P.sageSoft} opacity="0.3"
          />
        </svg>
      </motion.div>
      {/* Collines avant */}
      <motion.div style={{ x: collinesAvantX }} className="absolute bottom-[8vh] left-0 w-[160%]">
        <svg viewBox="0 0 1600 120" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,120 L0,80 Q220,30 440,70 T880,60 T1320,80 T1600,55 L1600,120 Z"
            fill={P.sageDeep} opacity="0.55"
          />
        </svg>
      </motion.div>

      {/* Route pointillée */}
      <motion.div
        style={{
          backgroundPositionX: routeDashX,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(250,250,255,0.5) 0 34px, transparent 34px 68px)",
        }}
        className="absolute bottom-[7.5vh] left-0 right-0 h-[4px] rounded-full"
      />

      {/* Camion */}
      <motion.div
        style={{ x: camionX, rotate: camionRotate }}
        className="absolute bottom-[8.5vh] left-1/2 -translate-x-1/2 w-64 md:w-96"
      >
        <Camion className="w-full" />
      </motion.div>
    </div>
  )
}

/** Étincelle 8 branches pour la remise à neuf. */
function Etincelle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z"
        fill={P.terracotta}
      />
    </svg>
  )
}

/** Chapitre 3 — l'atelier : le fauteuil abîmé devient éclatant. */
function SceneAtelier({ progress }: { progress: MotionValue<number> }) {
  const abimeOpacity = useTransform(progress, [0.48, 0.52], [1, 0])
  const raviveOpacity = useTransform(progress, [0.48, 0.52], [0, 1])
  const raviveScale = useTransform(progress, [0.48, 0.52, 0.56], [0.96, 1.05, 1])
  const s1 = useTransform(progress, [0.46, 0.49, 0.53], [0, 1, 0])
  const s2 = useTransform(progress, [0.49, 0.52, 0.56], [0, 1, 0])
  const s3 = useTransform(progress, [0.47, 0.51, 0.55], [0, 1, 0])

  return (
    <div className="absolute inset-0">
      {/* Établi */}
      <span className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-72 md:w-96">
        <Atelier className="w-full" />
      </span>

      {/* Fauteuil : les deux états superposés sur l'établi */}
      <div className="absolute bottom-[calc(9vh+82px)] md:bottom-[calc(9vh+104px)] left-1/2 -translate-x-1/2 w-36 md:w-44">
        <motion.span style={{ opacity: abimeOpacity }} className="absolute inset-0">
          <Fauteuil state="abime" className="w-full" />
        </motion.span>
        <motion.span style={{ opacity: raviveOpacity, scale: raviveScale }} className="block">
          <Fauteuil state="ravive" className="w-full" />
        </motion.span>
      </div>

      {/* Étincelles en cascade */}
      <motion.span style={{ opacity: s1, scale: s1 }} className="absolute bottom-[calc(9vh+200px)] left-[38%] w-7">
        <Etincelle className="w-full" />
      </motion.span>
      <motion.span style={{ opacity: s2, scale: s2 }} className="absolute bottom-[calc(9vh+170px)] left-[60%] w-5">
        <Etincelle className="w-full" />
      </motion.span>
      <motion.span style={{ opacity: s3, scale: s3 }} className="absolute bottom-[calc(9vh+120px)] left-[32%] w-4">
        <Etincelle className="w-full" />
      </motion.span>
    </div>
  )
}

/** Chapitre 4 — en rayon, l'étiquette se balance. */
function SceneRayon({ progress }: { progress: MotionValue<number> }) {
  const balancier = useTransform(
    progress,
    [0.6, 0.65, 0.7, 0.75, 0.8],
    [-7, 5, -4, 4, -2]
  )

  return (
    <div className="absolute inset-0">
      {/* Étagère */}
      <span className="absolute bottom-[9vh] left-1/2 -translate-x-[62%] w-60 md:w-80">
        <Etagere className="w-full" />
      </span>

      {/* Fauteuil devant, à droite */}
      <span className="absolute bottom-[9vh] left-1/2 translate-x-[26px] md:translate-x-[48px] w-32 md:w-40">
        <Fauteuil state="ravive" className="w-full" />
      </span>

      {/* Étiquette qui se balance au-dessus */}
      <motion.span
        style={{ rotate: balancier, transformOrigin: "top center" }}
        className="absolute bottom-[calc(9vh+120px)] md:bottom-[calc(9vh+150px)] left-1/2 translate-x-[64px] md:translate-x-[96px] w-16 md:w-20"
      >
        <Etiquette className="w-full" />
      </motion.span>
    </div>
  )
}

/** Chapitre 5 — le salon : lumière chaude, le papillon s'envole. */
function SceneRevit({ progress }: { progress: MotionValue<number> }) {
  const haloOpacity = useTransform(progress, [0.82, 0.9], [0, 0.34])
  const papX = useTransform(progress, [0.9, 1], ["0vw", "24vw"])
  const papY = useTransform(progress, [0.9, 1], ["0vh", "-34vh"])
  const papRotate = useTransform(progress, [0.9, 1], [0, -14])
  const papOpacity = useTransform(progress, [0.82, 0.86], [0, 1])

  return (
    <div className="absolute inset-0">
      <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 w-[340px] md:w-[520px]">
        {/* Halo de la lampe */}
        <motion.span
          style={{
            opacity: haloOpacity,
            background:
              "radial-gradient(circle, rgba(245,142,92,0.85) 0%, rgba(245,142,92,0) 68%)",
          }}
          className="absolute left-[58%] -top-[10%] w-44 h-44 md:w-56 md:h-56 rounded-full"
        />
        {/* Décor salon */}
        <Salon className="w-full" />
        {/* Fauteuil sur le tapis */}
        <span className="absolute left-[34%] bottom-[6%] w-28 md:w-36">
          <Fauteuil state="ravive" className="w-full" />
        </span>
        {/* Papillon qui s'envole */}
        <motion.span
          style={{ x: papX, y: papY, rotate: papRotate, opacity: papOpacity }}
          className="absolute left-[46%] bottom-[52%] w-12 md:w-14"
        >
          <Papillon flap className="w-full" />
        </motion.span>
      </div>
    </div>
  )
}

/** Aiguillage des scènes par chapitre. */
function Scene({
  id,
  progress,
}: {
  id: Chapter["id"]
  progress: MotionValue<number>
}) {
  if (id === "don") return <SceneDon progress={progress} />
  if (id === "collecte") return <SceneCollecte progress={progress} />
  if (id === "atelier") return <SceneAtelier progress={progress} />
  if (id === "rayon") return <SceneRayon progress={progress} />
  return <SceneRevit progress={progress} />
}

/** Les deux boutons de fin d'histoire. */
function CtaBoutons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      <Link
        href="/donner"
        className="bg-terracotta text-paper px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-terracotta-soft transition-colors"
      >
        Donner un objet
      </Link>
      <Link
        href="/boutique"
        className="border-2 border-paper/50 text-paper px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] hover:border-paper transition-colors"
      >
        Venir chiner
      </Link>
    </div>
  )
}

function Chapitre({
  chapter,
  progress,
}: {
  chapter: Chapter
  progress: MotionValue<number>
}) {
  const opacity = useChapterOpacity(progress, chapter.range)
  const ctaOpacity = useTransform(progress, [0.92, 0.97], [0, 1])
  const ctaY = useTransform(progress, [0.92, 0.97], [20, 0])
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Texte du chapitre */}
      <div className="absolute inset-x-0 top-[16vh] px-6 text-center z-10">
        <div className="text-[11px] tracking-[0.3em] uppercase text-terracotta-soft font-semibold">
          {chapter.kicker}
        </div>
        <h2
          className="mt-3 font-display font-medium text-paper leading-[1.08] mx-auto max-w-3xl"
          style={{ fontSize: "clamp(1.7rem, 0.9rem + 2.6vw, 3rem)" }}
        >
          {chapter.title}
        </h2>
        <p className="mt-4 max-w-md mx-auto text-paper/75 text-[15px] leading-relaxed">
          {chapter.text}
        </p>
        {chapter.id === "revit" && (
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-7 pointer-events-auto"
          >
            <CtaBoutons />
          </motion.div>
        )}
      </div>
      {/* Scène illustrée */}
      <Scene id={chapter.id} progress={progress} />
    </motion.div>
  )
}

/** Illustration principale de chaque chapitre (version statique). */
function IllustrationStatique({ id }: { id: Chapter["id"] }) {
  if (id === "don") return <Fauteuil state="abime" className="w-36 mx-auto" />
  if (id === "collecte") return <Camion className="w-56 mx-auto" />
  if (id === "atelier") return <Fauteuil state="ravive" className="w-36 mx-auto" />
  if (id === "rayon") return <Etagere className="w-48 mx-auto" />
  return <Salon className="w-72 max-w-full mx-auto" />
}

/** Version sans animations : chapitres empilés (prefers-reduced-motion). */
function SecondeVieStatique() {
  return (
    <section aria-label="La seconde vie d'un objet" className="bg-sage">
      {CHAPTERS.map((c) => (
        <div key={c.id} className="py-14 px-6 text-center">
          <IllustrationStatique id={c.id} />
          <div className="mt-6 text-[11px] tracking-[0.3em] uppercase text-terracotta-soft font-semibold">
            {c.kicker}
          </div>
          <h2
            className="mt-3 font-display font-medium text-paper leading-[1.08] mx-auto max-w-3xl"
            style={{ fontSize: "clamp(1.7rem, 0.9rem + 2.6vw, 3rem)" }}
          >
            {c.title}
          </h2>
          <p className="mt-4 max-w-md mx-auto text-paper/75 text-[15px] leading-relaxed">
            {c.text}
          </p>
        </div>
      ))}
      <div className="pb-16 px-6">
        <CtaBoutons />
      </div>
    </section>
  )
}

export default function SecondeVie() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  if (reduce) return <SecondeVieStatique />

  return (
    <section
      ref={ref}
      aria-label="La seconde vie d'un objet"
      className="relative h-[400vh] md:h-[500vh] bg-sage"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {CHAPTERS.map((c) => (
          <Chapitre key={c.id} chapter={c} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
