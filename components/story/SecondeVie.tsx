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
import Camion from "@/components/illustrations/Camion"
import Atelier from "@/components/illustrations/Atelier"
import Cle from "@/components/illustrations/Cle"
import Tournevis from "@/components/illustrations/Tournevis"
import Etagere from "@/components/illustrations/Etagere"
import Etiquette from "@/components/illustrations/Etiquette"
import Salon from "@/components/illustrations/Salon"
import Papillon from "@/components/illustrations/Papillon"
import { P } from "@/components/illustrations/palette"

/* « La seconde vie d'un objet » — le scroll fait avancer l'histoire d'un
   fauteuil en 5 chapitres (scrub). Deux couches d'animation :
   1. Scrub (lié au scroll) : trajets, entrées en scène, transformation.
   2. Vie permanente (CSS, tourne même à l'arrêt) : roues, fumée, balancement
      d'étiquette, pulsation du halo, particules, outils, papillon.
   Version statique empilée si prefers-reduced-motion. */

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

/* Particules flottantes (vie permanente, toute la section) */
const PARTICULES = [
  { left: "8%", top: "22%", size: 5, cls: "bg-terracotta-soft/30", dur: 7, delay: 0, mdOnly: false },
  { left: "90%", top: "18%", size: 4, cls: "bg-cream-soft/25", dur: 9, delay: 1.2, mdOnly: true },
  { left: "16%", top: "72%", size: 3, cls: "bg-cream-soft/20", dur: 8, delay: 0.6, mdOnly: false },
  { left: "84%", top: "64%", size: 5, cls: "bg-terracotta-soft/20", dur: 10, delay: 2, mdOnly: true },
  { left: "48%", top: "12%", size: 3, cls: "bg-cream-soft/25", dur: 11, delay: 0.3, mdOnly: false },
  { left: "68%", top: "82%", size: 4, cls: "bg-terracotta-soft/25", dur: 9, delay: 1.6, mdOnly: true },
]

/** Fondu-enchaîné entre chapitres : la sortie de l'un chevauche l'entrée du
 *  suivant (jamais d'écran vide). Premier chapitre visible dès l'entrée,
 *  dernier visible jusqu'à la sortie. */
function useChapterOpacity(
  progress: MotionValue<number>,
  [a, b]: readonly [number, number]
) {
  const fade = 0.018
  const pts =
    a === 0
      ? { i: [a, b - fade, b + fade], o: [1, 1, 0] }
      : b === 1
        ? { i: [a - fade, a + fade, b], o: [0, 1, 1] }
        : { i: [a - fade, a + fade, b - fade, b + fade], o: [0, 1, 1, 0] }
  return useTransform(progress, pts.i, pts.o)
}

/* ————— Scènes illustrées ————— */

/** Chapitre 1 — le fauteuil vole jusqu'au-dessus de la caisse à dons,
 *  puis plonge dedans (la paroi avant le recouvre). */
function SceneDon({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0.0, 0.13], ["-48vw", "0vw"])
  const yVol = useTransform(progress, [0.0, 0.08, 0.13], ["-8vh", "-3vh", "0vh"])
  const yPlongee = useTransform(progress, [0.145, 0.19], [0, 78])
  const rotate = useTransform(progress, [0.0, 0.13], [-7, 0])
  const scale = useTransform(progress, [0.145, 0.19], [1, 0.9])
  const caisseScale = useTransform(progress, [0.17, 0.19, 0.21], [1, 1.06, 1])
  const poussiereOpacity = useTransform(progress, [0.175, 0.19, 0.21], [0, 0.5, 0])
  const poussiereScale = useTransform(progress, [0.175, 0.21], [0.4, 1.7])
  const decoY1 = useTransform(progress, [0, 0.2], [0, -52])
  const decoY2 = useTransform(progress, [0, 0.2], [0, 40])
  const decoY3 = useTransform(progress, [0, 0.2], [0, -26])

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

      {/* Le fauteuil (derrière la caisse : il disparaît dedans en plongeant) */}
      <motion.div
        style={{ x, rotate }}
        className="absolute bottom-[calc(9vh+72px)] md:bottom-[calc(9vh+96px)] left-1/2 -translate-x-1/2 w-32 md:w-40"
      >
        <motion.div style={{ y: yVol }}>
          <motion.div style={{ y: yPlongee, scale }}>
            <Fauteuil state="abime" className="w-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Caisse au premier plan (sursaute quand le fauteuil plonge) */}
      <motion.span
        style={{ scale: caisseScale, transformOrigin: "bottom center" }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-48 md:w-64 block"
      >
        <Caisse className="w-full" />
      </motion.span>

      {/* Nuage de poussière quand il plonge */}
      <motion.span
        style={{ opacity: poussiereOpacity, scale: poussiereScale }}
        className="absolute bottom-[8.5vh] left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-cream-soft/50"
      />
    </div>
  )
}

/** Chapitre 2 — le camion traverse l'écran sans s'arrêter,
 *  roues qui tournent, fumée, paysage en parallaxe. */
function SceneCollecte({ progress }: { progress: MotionValue<number> }) {
  /* Le camion traverse ET SORT de l'écran par la droite avant la fin du
     chapitre — pas d'arrêt sur place au moment du fondu. */
  const camionX = useTransform(progress, [0.2, 0.395], ["-58vw", "85vw"])
  const camionY = useTransform(
    progress,
    [0.2, 0.24, 0.28, 0.32, 0.36, 0.395],
    [0, -4, 2, -3, 2, 0]
  )
  const camionRotate = useTransform(
    progress,
    [0.2, 0.25, 0.3, 0.35, 0.395],
    [0, -1, 0.8, -0.8, 0]
  )
  const collinesArriereX = useTransform(progress, [0.2, 0.4], [0, -200])
  const collinesAvantX = useTransform(progress, [0.2, 0.4], [0, -400])
  const routeDashX = useTransform(progress, [0.2, 0.4], [0, -1200])
  const nuageX = useTransform(progress, [0.2, 0.4], [0, -120])

  return (
    <div className="absolute inset-0">
      {/* Soleil */}
      <span
        className="absolute top-[15%] left-[10%] w-12 md:w-16 h-12 md:h-16 rounded-full bg-terracotta-soft/25"
        style={{ animation: "_sv-float 9s ease-in-out infinite" }}
      />

      {/* Nuages */}
      <motion.div style={{ x: nuageX }} className="absolute inset-x-0 top-[26%] hidden md:block">
        <span className="absolute left-[16%] w-24 h-8 rounded-full bg-paper/15" />
        <span className="absolute left-[54%] top-10 w-16 h-6 rounded-full bg-paper/10" />
        <span className="absolute left-[80%] w-20 h-7 rounded-full bg-paper/15" />
      </motion.div>

      {/* Collines arrière */}
      <motion.div style={{ x: collinesArriereX }} className="absolute bottom-[13vh] left-0 w-[170%]">
        <svg viewBox="0 0 1400 160" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,160 L0,110 Q170,40 360,95 T720,80 T1080,100 T1400,70 L1400,160 Z"
            fill={P.sageSoft} opacity="0.3"
          />
        </svg>
      </motion.div>
      {/* Collines avant */}
      <motion.div style={{ x: collinesAvantX }} className="absolute bottom-[8vh] left-0 w-[200%]">
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

      {/* Camion : roues qui tournent + fumée d'échappement */}
      <motion.div
        style={{ x: camionX, y: camionY, rotate: camionRotate }}
        className="absolute bottom-[8.5vh] left-1/2 -translate-x-1/2 w-64 md:w-96"
      >
        <span
          className="absolute -left-1 bottom-6 w-3 h-3 rounded-full bg-paper/40"
          style={{ animation: "_sv-smoke 1.6s ease-out infinite" }}
        />
        <span
          className="absolute -left-2 bottom-5 w-2.5 h-2.5 rounded-full bg-paper/30"
          style={{ animation: "_sv-smoke 1.6s ease-out 0.55s infinite" }}
        />
        <span
          className="absolute left-0 bottom-7 w-2 h-2 rounded-full bg-paper/35"
          style={{ animation: "_sv-smoke 1.6s ease-out 1.1s infinite" }}
        />
        <Camion rolling className="w-full" />
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

/** Chapitre 3 — l'atelier, lisible : l'établi nu monte en scène, le fauteuil
 *  abîmé est posé DESSUS, la clé et le tournevis volent depuis les côtés et
 *  travaillent autour de lui pendant la transformation. */
function SceneAtelier({ progress }: { progress: MotionValue<number> }) {
  /* L'atelier se monte PENDANT le fondu-enchaîné avec le camion :
     dès qu'on le voit, il est déjà en mouvement. */
  const etabliY = useTransform(progress, [0.385, 0.435], ["22vh", "0vh"])
  const fauteuilY = useTransform(progress, [0.41, 0.455], ["-34vh", "0vh"])
  const cleX = useTransform(progress, [0.43, 0.475], ["-30vw", "0vw"])
  const cleRotate = useTransform(
    progress,
    [0.5, 0.52, 0.54, 0.56],
    [0, -28, 8, -12]
  )
  const tournevisX = useTransform(progress, [0.44, 0.485], ["30vw", "0vw"])
  const tournevisRotate = useTransform(
    progress,
    [0.5, 0.525, 0.545, 0.565],
    [0, 24, -10, 14]
  )
  const abimeOpacity = useTransform(progress, [0.51, 0.545], [1, 0])
  const raviveOpacity = useTransform(progress, [0.51, 0.545], [0, 1])
  const raviveScale = useTransform(
    progress,
    [0.51, 0.55, 0.58, 0.6],
    [0.96, 1.06, 0.99, 1.02]
  )
  const s1 = useTransform(progress, [0.49, 0.52, 0.555], [0, 1, 0])
  const s2 = useTransform(progress, [0.515, 0.545, 0.58], [0, 1, 0])
  const s3 = useTransform(progress, [0.5, 0.535, 0.59], [0, 1, 0])

  return (
    <div className="absolute inset-0">
      {/* Établi nu qui monte en scène */}
      <motion.span
        style={{ y: etabliY }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-72 md:w-96 block"
      >
        <Atelier anime outils={false} className="w-full" />
      </motion.span>

      {/* Fauteuil posé SUR l'établi : les deux états superposés */}
      <motion.div
        style={{ y: fauteuilY }}
        className="absolute bottom-[calc(9vh+62px)] md:bottom-[calc(9vh+86px)] left-1/2 -translate-x-1/2 w-36 md:w-44"
      >
        <motion.span style={{ opacity: abimeOpacity }} className="absolute inset-0">
          <Fauteuil state="abime" className="w-full" />
        </motion.span>
        <motion.span style={{ opacity: raviveOpacity, scale: raviveScale }} className="block">
          <Fauteuil state="ravive" className="w-full" />
        </motion.span>
      </motion.div>

      {/* La clé vole à gauche du fauteuil et pique vers lui */}
      <motion.span
        style={{ x: cleX, rotate: cleRotate }}
        className="absolute bottom-[calc(9vh+150px)] md:bottom-[calc(9vh+190px)] left-[8%] md:left-[22%] w-20 md:w-28 block"
      >
        <span className="block" style={{ animation: "_sv-float 3.2s ease-in-out infinite" }}>
          <Cle className="w-full" />
        </span>
      </motion.span>

      {/* Le tournevis vole à droite */}
      <motion.span
        style={{ x: tournevisX, rotate: tournevisRotate }}
        className="absolute bottom-[calc(9vh+130px)] md:bottom-[calc(9vh+165px)] right-[6%] md:right-[20%] w-20 md:w-28 block"
      >
        <span className="block" style={{ animation: "_sv-float 2.7s ease-in-out 0.6s infinite" }}>
          <Tournevis className="w-full" />
        </span>
      </motion.span>

      {/* Étincelles de transformation en cascade */}
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

/** Chapitre 4 — l'étagère et le fauteuil entrent en rayon,
 *  l'étiquette descend puis se balance toute seule. */
function SceneRayon({ progress }: { progress: MotionValue<number> }) {
  const etagereX = useTransform(progress, [0.6, 0.665], ["-42vw", "0vw"])
  const fauteuilX = useTransform(progress, [0.61, 0.675], ["46vw", "0vw"])
  const etiquetteY = useTransform(progress, [0.67, 0.71], ["-26vh", "0vh"])
  const etiquetteOpacity = useTransform(progress, [0.67, 0.69], [0, 1])

  return (
    <div className="absolute inset-0">
      {/* Étagère */}
      <motion.span
        style={{ x: etagereX }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-[62%] w-60 md:w-80 block"
      >
        <Etagere className="w-full" />
      </motion.span>

      {/* Fauteuil devant, à droite */}
      <motion.span
        style={{ x: fauteuilX }}
        className="absolute bottom-[9vh] left-1/2 translate-x-[26px] md:translate-x-[48px] w-32 md:w-40 block"
      >
        <Fauteuil state="ravive" className="w-full" />
      </motion.span>

      {/* Étiquette : descend (scroll) puis balance en continu (CSS) */}
      <motion.span
        style={{ y: etiquetteY, opacity: etiquetteOpacity }}
        className="absolute bottom-[calc(9vh+120px)] md:bottom-[calc(9vh+150px)] left-1/2 translate-x-[64px] md:translate-x-[96px] w-16 md:w-20 block"
      >
        <span
          className="block"
          style={{ animation: "_sv-swing 2.8s ease-in-out infinite", transformOrigin: "top center" }}
        >
          <Etiquette className="w-full" />
        </span>
      </motion.span>
    </div>
  )
}

/** Chapitre 5 — le salon monte en scène, la lampe pulse doucement,
 *  le papillon s'envole. */
function SceneRevit({ progress }: { progress: MotionValue<number> }) {
  const salonY = useTransform(progress, [0.8, 0.855], ["20vh", "0vh"])
  const haloOpacity = useTransform(progress, [0.86, 0.92], [0, 1])
  const papX = useTransform(progress, [0.9, 1], ["0vw", "24vw"])
  const papY = useTransform(progress, [0.9, 1], ["0vh", "-34vh"])
  const papRotate = useTransform(progress, [0.9, 1], [0, -14])
  const papOpacity = useTransform(progress, [0.85, 0.89], [0, 1])

  return (
    <div className="absolute inset-0">
      <motion.div
        style={{ y: salonY }}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 w-[340px] md:w-[520px]"
      >
        {/* Halo de la lampe (pulse en continu une fois allumé) */}
        <motion.span
          style={{ opacity: haloOpacity }}
          className="absolute left-[58%] -top-[10%] w-44 h-44 md:w-56 md:h-56"
        >
          <span
            className="block w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,142,92,0.85) 0%, rgba(245,142,92,0) 68%)",
              animation: "_sv-pulse 3.2s ease-in-out infinite",
            }}
          />
        </motion.span>
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
      </motion.div>
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
  const [a] = chapter.range
  const opacity = useChapterOpacity(progress, chapter.range)
  const textY = useTransform(
    progress,
    a === 0 ? [0, 1] : [a - 0.018, a + 0.045],
    a === 0 ? [0, 0] : [30, 0]
  )
  const ctaOpacity = useTransform(progress, [0.93, 0.98], [0, 1])
  const ctaY = useTransform(progress, [0.93, 0.98], [20, 0])
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Texte du chapitre (glisse en entrant) */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 top-[14vh] md:top-[16vh] px-6 text-center z-10"
      >
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
      </motion.div>
      {/* Scène illustrée */}
      <Scene id={chapter.id} progress={progress} />
    </motion.div>
  )
}

/** Point de l'indicateur de chapitres (bord droit). */
function PointChapitre({
  progress,
  range,
}: {
  progress: MotionValue<number>
  range: readonly [number, number]
}) {
  const active = useChapterOpacity(progress, range)
  const opacity = useTransform(active, [0, 1], [0.25, 1])
  const scale = useTransform(active, [0, 1], [1, 1.45])
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block w-2 h-2 rounded-full bg-paper"
    />
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
      className="relative h-[320vh] md:h-[400vh] bg-sage"
    >
      <style>{`
        @keyframes _sv-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-16px); }
        }
        @keyframes _sv-smoke {
          0%   { opacity: 0.5; transform: translate(0, 0) scale(0.6); }
          100% { opacity: 0; transform: translate(-26px, -36px) scale(1.4); }
        }
        @keyframes _sv-swing {
          0%, 100% { transform: rotate(6deg); }
          50%      { transform: rotate(-6deg); }
        }
        @keyframes _sv-pulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
      `}</style>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Particules flottantes (toute la section) */}
        {PARTICULES.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute rounded-full ${p.cls} ${p.mdOnly ? "hidden md:block" : ""}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `_sv-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {CHAPTERS.map((c) => (
          <Chapitre key={c.id} chapter={c} progress={scrollYProgress} />
        ))}

        {/* Indicateur de chapitres */}
        <div className="absolute right-5 md:right-9 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {CHAPTERS.map((c) => (
            <PointChapitre key={c.id} progress={scrollYProgress} range={c.range} />
          ))}
        </div>
      </div>
    </section>
  )
}
