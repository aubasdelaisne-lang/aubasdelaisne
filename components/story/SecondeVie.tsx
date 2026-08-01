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
   fauteuil en 5 chapitres (scrub). Un principe UNIQUE, celui qui marche :
   chaque chapitre = UN grand groupe illustré qui traverse l'écran d'un
   mouvement simple et continu (comme le fauteuil du ch.1 et le camion du
   ch.2), + une couche de vie permanente en CSS (roues, fumée, balancier,
   halo, particules). Version statique empilée si prefers-reduced-motion. */

type Chapter = {
  id: "don" | "collecte" | "atelier" | "rayon" | "revit"
  range: readonly [number, number]
  kicker: string
  title: string
  text: string
  /** true = le calque devient opaque immédiatement : la scène entre par le
   *  côté/le bas, son mouvement EST son apparition (pas de fondu d'entrée
   *  qui masquerait la traversée). */
  entreeDirecte?: boolean
}

const CHAPTERS: Chapter[] = [
  /* Plages pondérées : l'atelier (le pivot) reçoit le plus de scroll. */
  {
    id: "don",
    range: [0.0, 0.16],
    kicker: "Chapitre 1",
    title: "Tout commence par un geste",
    text: "Un fauteuil dont vous n'avez plus besoin ? Quelqu'un, quelque part, en rêve.",
  },
  {
    id: "collecte",
    range: [0.16, 0.33],
    kicker: "Chapitre 2",
    title: "On vient le chercher",
    text: "Dépôt sur place ou collecte à domicile — notre camion sillonne le sud de l'Aisne.",
  },
  {
    id: "atelier",
    range: [0.33, 0.57],
    kicker: "Chapitre 3",
    title: "On lui redonne vie",
    text: "Trié, nettoyé, réparé par notre équipe en insertion. Chaque objet repart de zéro.",
    entreeDirecte: true,
  },
  {
    id: "rayon",
    range: [0.57, 0.74],
    kicker: "Chapitre 4",
    title: "Il attend sa nouvelle maison",
    text: "En rayon à petit prix, au milieu de mille autres trouvailles.",
    entreeDirecte: true,
  },
  {
    id: "revit",
    range: [0.74, 1.0],
    kicker: "Chapitre 5",
    title: "Et l'histoire recommence",
    text: "Un objet sauvé, un emploi soutenu, des déchets évités. Tout le monde y gagne.",
    entreeDirecte: true,
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

/** Opacité d'un calque de chapitre. Premier visible dès l'entrée, dernier
 *  jusqu'à la sortie. `direct` = opaque immédiatement (la scène entre par
 *  le côté : son mouvement doit se jouer en pleine visibilité). */
function useChapterOpacity(
  progress: MotionValue<number>,
  [a, b]: readonly [number, number],
  direct = false
) {
  const fade = 0.022
  const inPts = direct ? [a - 0.034, a - 0.033] : [a - fade, a + fade]
  const pts =
    a === 0
      ? { i: [a, b - fade, b + fade], o: [1, 1, 0] }
      : b === 1
        ? { i: [...inPts, b], o: [0, 1, 1] }
        : { i: [...inPts, b - fade, b + fade], o: [0, 1, 1, 0] }
  return useTransform(progress, pts.i, pts.o)
}

/* ————— Scènes : UN grand mouvement continu par chapitre ————— */

/** Ch.1 — le fauteuil vole depuis la gauche et plonge dans la caisse. */
function SceneDon({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0.0, 0.10], ["-48vw", "0vw"])
  const yVol = useTransform(progress, [0.0, 0.06, 0.10], ["-8vh", "-3vh", "0vh"])
  const yPlongee = useTransform(progress, [0.11, 0.14], [0, 78])
  const rotate = useTransform(progress, [0.0, 0.10], [-7, 0])
  const scale = useTransform(progress, [0.11, 0.14], [1, 0.9])
  const caisseScale = useTransform(progress, [0.13, 0.14, 0.16], [1, 1.06, 1])
  const poussiereOpacity = useTransform(progress, [0.13, 0.145, 0.165], [0, 0.5, 0])
  const poussiereScale = useTransform(progress, [0.13, 0.165], [0.4, 1.7])
  const decoY1 = useTransform(progress, [0, 0.16], [0, -52])
  const decoY2 = useTransform(progress, [0, 0.16], [0, 40])

  return (
    <div className="absolute inset-0">
      <motion.span
        style={{ y: decoY1 }}
        className="absolute top-[24%] left-[14%] w-24 h-24 rounded-full bg-cream-soft/15 hidden md:block"
      />
      <motion.span
        style={{ y: decoY2 }}
        className="absolute top-[38%] right-[12%] w-14 h-14 rounded-full bg-terracotta-soft/20 hidden md:block"
      />

      {/* Le fauteuil (derrière la caisse : il disparaît dedans) */}
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

      {/* Caisse au premier plan */}
      <motion.span
        style={{ scale: caisseScale, transformOrigin: "bottom center" }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-48 md:w-64 block"
      >
        <Caisse className="w-full" />
      </motion.span>

      {/* Poussière quand il plonge */}
      <motion.span
        style={{ opacity: poussiereOpacity, scale: poussiereScale }}
        className="absolute bottom-[8.5vh] left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-cream-soft/50"
      />
    </div>
  )
}

/** Ch.2 — le camion traverse l'écran et SORT par la droite. */
function SceneCollecte({ progress }: { progress: MotionValue<number> }) {
  const camionX = useTransform(progress, [0.16, 0.345], ["-58vw", "85vw"])
  const camionY = useTransform(
    progress,
    [0.16, 0.20, 0.24, 0.28, 0.31, 0.345],
    [0, -4, 2, -3, 2, 0]
  )
  const collinesArriereX = useTransform(progress, [0.16, 0.33], [0, -200])
  const collinesAvantX = useTransform(progress, [0.16, 0.33], [0, -400])
  const routeX = useTransform(progress, [0.16, 0.33], ["0%", "-30%"])
  const nuageX = useTransform(progress, [0.16, 0.33], [0, -120])

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

      {/* Collines */}
      <motion.div style={{ x: collinesArriereX }} className="absolute bottom-[13vh] left-0 w-[170%]">
        <svg viewBox="0 0 1400 160" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,160 L0,110 Q170,40 360,95 T720,80 T1080,100 T1400,70 L1400,160 Z"
            fill={P.sageSoft} opacity="0.3"
          />
        </svg>
      </motion.div>
      <motion.div style={{ x: collinesAvantX }} className="absolute bottom-[8vh] left-0 w-[200%]">
        <svg viewBox="0 0 1600 120" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,120 L0,80 Q220,30 440,70 T880,60 T1320,80 T1600,55 L1600,120 Z"
            fill={P.sageDeep} opacity="0.55"
          />
        </svg>
      </motion.div>

      {/* Route (bande translatée sur le GPU) */}
      <div className="absolute bottom-[7.5vh] left-0 right-0 h-[4px] overflow-hidden">
        <motion.div
          style={{
            x: routeX,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(250,250,255,0.5) 0 34px, transparent 34px 68px)",
          }}
          className="h-full w-[200%]"
        />
      </div>

      {/* Camion : roues qui tournent + fumée */}
      <motion.div
        style={{ x: camionX, y: camionY }}
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
        {/* Pas de rotation interne des roues : les animations DANS un SVG
            tournent sur le processeur (pas la carte graphique) et saturent
            les machines modestes. La fumée + les traits de vitesse suffisent. */}
        <Camion className="w-full" />
      </motion.div>
    </div>
  )
}

/** Étincelle 8 branches. */
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

/** Ch.3 — MÊME PRINCIPE QUE LE CAMION : tout l'atelier (établi + fauteuil
 *  + outils) entre par la droite d'un seul mouvement, se pose au centre,
 *  puis la transformation opère sous les étincelles. */
function SceneAtelier({ progress }: { progress: MotionValue<number> }) {
  /* Entrée depuis 45vw, départ à 0.285 (avant le snap de couche à 0.297)
     pour que le groupe soit déjà en mouvement quand il apparaît — arrivée
     au centre à 0.33 (= début de range), transformation immédiate. */
  const groupeX = useTransform(progress, [0.285, 0.33], ["45vw", "0vw"])
  const abimeOpacity = useTransform(progress, [0.33, 0.44], [1, 0])
  const raviveOpacity = useTransform(progress, [0.33, 0.44], [0, 1])
  const raviveScale = useTransform(
    progress,
    [0.33, 0.38, 0.44, 0.48],
    [0.96, 1.07, 0.99, 1.02]
  )
  const s1 = useTransform(progress, [0.31, 0.355, 0.40], [0, 1, 0])
  const s2 = useTransform(progress, [0.33, 0.375, 0.42], [0, 1, 0])
  const s3 = useTransform(progress, [0.32, 0.365, 0.41], [0, 1, 0])

  return (
    <div className="absolute inset-0">
      {/* Tout l'atelier voyage d'un bloc, comme le camion */}
      <motion.div
        style={{ x: groupeX }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-80 md:w-[420px]"
      >
        {/* Établi nu (sans animations SVG internes — coût processeur) */}
        <Atelier outils={false} className="w-full" />

        {/* Fauteuil posé sur l'établi (les deux états superposés) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[62%] w-32 md:w-40">
          <motion.span style={{ opacity: abimeOpacity }} className="absolute inset-0">
            <Fauteuil state="abime" className="w-full" />
          </motion.span>
          <motion.span style={{ opacity: raviveOpacity, scale: raviveScale }} className="block">
            <Fauteuil state="ravive" className="w-full" />
          </motion.span>
        </div>

        {/* Outils flottants de part et d'autre */}
        <span
          className="absolute -left-[14%] bottom-[80%] w-20 md:w-24 block"
          style={{ animation: "_sv-float 3.2s ease-in-out infinite" }}
        >
          <Cle className="w-full" />
        </span>
        <span
          className="absolute -right-[12%] bottom-[70%] w-20 md:w-24 block"
          style={{ animation: "_sv-float 2.7s ease-in-out 0.6s infinite" }}
        >
          <Tournevis className="w-full" />
        </span>

        {/* Étincelles de transformation */}
        <motion.span style={{ opacity: s1, scale: s1 }} className="absolute left-[18%] bottom-[105%] w-7">
          <Etincelle className="w-full" />
        </motion.span>
        <motion.span style={{ opacity: s2, scale: s2 }} className="absolute right-[20%] bottom-[95%] w-5">
          <Etincelle className="w-full" />
        </motion.span>
        <motion.span style={{ opacity: s3, scale: s3 }} className="absolute left-[30%] bottom-[70%] w-4">
          <Etincelle className="w-full" />
        </motion.span>
      </motion.div>
    </div>
  )
}

/** Ch.4 — MÊME PRINCIPE QUE LE FAUTEUIL DU CH.1 : tout le rayon (étagère
 *  + fauteuil + étiquette) entre par la gauche d'un seul mouvement. */
function SceneRayon({ progress }: { progress: MotionValue<number> }) {
  const groupeX = useTransform(progress, [0.56, 0.63], ["-55vw", "0vw"])

  return (
    <div className="absolute inset-0">
      <motion.div
        style={{ x: groupeX }}
        className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 w-80 md:w-[420px]"
      >
        {/* Étagère à gauche du groupe */}
        <span className="absolute left-0 bottom-0 w-[62%] block">
          <Etagere className="w-full" />
        </span>
        {/* Fauteuil ravivé à droite */}
        <span className="absolute right-0 bottom-0 w-[38%] block">
          <Fauteuil state="ravive" className="w-full" />
        </span>
        {/* Étiquette qui balance en continu au-dessus du fauteuil */}
        <span
          className="absolute right-[8%] bottom-[88%] w-14 md:w-16 block"
          style={{ animation: "_sv-swing 2.8s ease-in-out infinite", transformOrigin: "top center" }}
        >
          <Etiquette className="w-full" />
        </span>
        {/* Hauteur du groupe = étagère */}
        <span className="block invisible">
          <Etagere className="w-[62%]" />
        </span>
      </motion.div>
    </div>
  )
}

/** Ch.5 — le salon monte depuis le bas d'un seul mouvement,
 *  la lampe pulse, le papillon s'envole. */
function SceneRevit({ progress }: { progress: MotionValue<number> }) {
  const salonY = useTransform(progress, [0.73, 0.80], ["55vh", "0vh"])
  const haloOpacity = useTransform(progress, [0.80, 0.85], [0, 1])
  const papX = useTransform(progress, [0.88, 0.98], ["0vw", "24vw"])
  const papY = useTransform(progress, [0.88, 0.98], ["0vh", "-34vh"])
  const papRotate = useTransform(progress, [0.88, 0.98], [0, -14])
  const papOpacity = useTransform(progress, [0.80, 0.84], [0, 1])

  return (
    <div className="absolute inset-0">
      <motion.div
        style={{ y: salonY }}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 w-[340px] md:w-[520px]"
      >
        {/* Halo de la lampe (pulse une fois allumé) */}
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
        <Salon className="w-full" />
        <span className="absolute left-[34%] bottom-[6%] w-28 md:w-36">
          <Fauteuil state="ravive" className="w-full" />
        </span>
        <motion.span
          style={{ x: papX, y: papY, rotate: papRotate, opacity: papOpacity }}
          className="absolute left-[46%] bottom-[52%] w-12 md:w-14"
        >
          {/* Flottement HTML (GPU) plutôt que battement d'ailes SVG (CPU) */}
          <span className="block" style={{ animation: "_sv-float 2.4s ease-in-out infinite" }}>
            <Papillon className="w-full" />
          </span>
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
  const [a, b] = chapter.range
  const opacity = useChapterOpacity(progress, chapter.range, chapter.entreeDirecte)
  /* Pour les chapitres entreeDirecte la couche saute à opacité 1 à a-0.033.
     Le texte doit s'aligner sur cet instant, pas sur a, pour éviter le blanc. */
  const ti0 = chapter.entreeDirecte ? a - 0.034 : a - 0.012
  const ti1 = chapter.entreeDirecte ? a - 0.003 : a + 0.020
  const textOpacity = useTransform(
    progress,
    a === 0
      ? [b - 0.035, b - 0.006]
      : b === 1
        ? [ti0, ti1]
        : [ti0, ti1, b - 0.035, b - 0.006],
    a === 0 ? [1, 0] : b === 1 ? [0, 1] : [0, 1, 1, 0]
  )
  const textY = useTransform(
    progress,
    a === 0
      ? [b - 0.035, b - 0.006]
      : b === 1
        ? [ti0, ti1]
        : [ti0, ti1, b - 0.035, b - 0.006],
    a === 0 ? [0, -24] : b === 1 ? [24, 0] : [24, 0, 0, -24]
  )
  const ctaOpacity = useTransform(progress, [0.94, 0.985], [0, 1])
  const ctaY = useTransform(progress, [0.94, 0.985], [20, 0])
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
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
      className="relative h-[280vh] md:h-[380vh] bg-sage"
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
