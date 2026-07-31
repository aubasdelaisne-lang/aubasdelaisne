"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion"

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

/** Scènes illustrées — remplies chapitre par chapitre (Tasks 5–6). */
function Scene({
  id,
}: {
  id: Chapter["id"]
  progress: MotionValue<number>
}) {
  void id
  return null
}

function Chapitre({
  chapter,
  progress,
}: {
  chapter: Chapter
  progress: MotionValue<number>
}) {
  const opacity = useChapterOpacity(progress, chapter.range)
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
      </div>
      {/* Scène illustrée */}
      <Scene id={chapter.id} progress={progress} />
    </motion.div>
  )
}

/** Version sans animations : chapitres empilés (prefers-reduced-motion). */
function SecondeVieStatique() {
  return (
    <section aria-label="La seconde vie d'un objet" className="bg-sage">
      {CHAPTERS.map((c) => (
        <div key={c.id} className="py-16 px-6 text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-terracotta-soft font-semibold">
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
