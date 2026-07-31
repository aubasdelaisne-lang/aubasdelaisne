# Refonte accueil « La seconde vie d'un objet » — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer la page d'accueil en expérience immersive : splash narratif (objets qui tombent dans une caisse), histoire d'un fauteuil en 5 chapitres pilotée par le scroll, illustrations SVG sur mesure — sans toucher au reste du site ni à la charte.

**Architecture:** Illustrations = composants React SVG inline dans `components/illustrations/`. Histoire = un conteneur haut (500 vh) avec scène `sticky` plein écran, scrub via `useScroll`/`useTransform` de Framer Motion. Splash = réécriture de `components/ui/SplashScreen.tsx` en CSS keyframes (leçon apprise : `animate` de Framer Motion ne se déclenche pas fiablement sous AnimatePresence ; Framer Motion réservé à la sortie iris). `app/page.tsx` reste server component ; les îlots animés sont `"use client"`.

**Tech Stack:** Next.js App Router, Framer Motion (déjà installé — AUCUNE nouvelle dépendance), Tailwind v4 (tokens CSS dans `globals.css`), SVG inline.

**Vérification (pas de framework de test dans ce repo):** chaque tâche se termine par `npm run build` (vérifie types + compilation) et une vérification navigateur sur le dev server (port 57025) avec captures d'écran. Le splash se re-teste avec `sessionStorage.removeItem("splash_shown")` puis reload.

**Palette (SEULES couleurs autorisées dans les SVG):**

```ts
// components/illustrations/palette.ts — créé en Task 1
export const P = {
  sage: "#191465",        // navy indigo — fonds sombres
  sageDeep: "#0f0a45",    // contours épais (remplace le noir de CRAV)
  sageSoft: "#5a54a3",    // ombres douces, éléments secondaires
  terracotta: "#ef5f17",  // accent principal (fauteuil ravivé, étiquette)
  terracottaSoft: "#f58e5c", // reflets, variantes
  paper: "#fafaff",       // blancs
  cream: "#f0efff",       // fonds clairs
  creamSoft: "#e1e0ff",   // lilas secondaire
} as const
```

**Style SVG commun à toutes les illustrations :** flat design, contours `stroke={P.sageDeep}` épais (`strokeWidth` 6–8 sur viewBox ~200×200, `strokeLinejoin="round"` `strokeLinecap="round"`), aplats de couleur + 1 reflet clair par forme (petit path `paper` ou variante `Soft` en opacité 0.35), pas de dégradés, pas de filtres.

---

### Task 1: Fauteuil + Camion + page de prévisualisation — PORTE DE VALIDATION STYLE

**Files:**
- Create: `components/illustrations/palette.ts` (contenu ci-dessus)
- Create: `components/illustrations/Fauteuil.tsx`
- Create: `components/illustrations/Camion.tsx`
- Create: `app/dev-illustrations/page.tsx` (page temporaire, supprimée en Task 9)

- [ ] **Step 1: Créer `palette.ts`** avec le contenu exact du bloc ci-dessus.

- [ ] **Step 2: Créer `Fauteuil.tsx`.** Interface obligatoire :

```tsx
import { P } from "./palette"

type Props = {
  /** "abime" = terne (fills sageSoft/creamSoft, un accroc), "ravive" = éclatant (fills terracotta) */
  state?: "abime" | "ravive"
  className?: string
}

export default function Fauteuil({ state = "ravive", className = "" }: Props) {
  const seat = state === "ravive" ? P.terracotta : P.sageSoft
  const seatLight = state === "ravive" ? P.terracottaSoft : P.creamSoft
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* Composition : dossier arrondi haut, deux accoudoirs cylindriques,
          assise-coussin épaisse, 4 pieds bois (sageDeep), coussin décoratif.
          state "abime" : + un path zigzag (accroc) sur l'assise et opacité 0.85.
          Chaque forme : fill aplat + contour sageDeep strokeWidth 7 + 1 reflet. */}
    </svg>
  )
}
```

Le dessin lui-même : formes généreuses et rondes (rayons ~20), proportions
« mignonnes » (dossier haut, pieds courts), lisible en 80 px comme en 400 px.

- [ ] **Step 3: Créer `Camion.tsx`.** Même style. `type Props = { className?: string }`. Composition : fourgon vu de profil roulant vers la droite — caisse `sage` avec panneau `paper` portant un papillon simplifié (2 triangles arrondis `terracotta`), cabine `creamSoft` avec vitre `paper`, 2 roues (`sageDeep`, enjoliveur `paper`), 3 traits de vitesse derrière. ViewBox `0 0 280 160`.

- [ ] **Step 4: Créer la page de prévisualisation** `app/dev-illustrations/page.tsx` :

```tsx
import Fauteuil from "@/components/illustrations/Fauteuil"
import Camion from "@/components/illustrations/Camion"

export const metadata = { robots: { index: false, follow: false } }

export default function DevIllustrations() {
  return (
    <main className="min-h-screen bg-paper p-10 pt-28 space-y-12">
      <section>
        <h2 className="font-display text-sage-deep text-xl mb-4">Fauteuil — ravivé / abîmé</h2>
        <div className="flex items-end gap-8 flex-wrap">
          <Fauteuil state="ravive" className="w-64" />
          <Fauteuil state="abime" className="w-64" />
          <Fauteuil state="ravive" className="w-20" />
        </div>
      </section>
      <section className="bg-sage p-10 rounded-2xl">
        <h2 className="font-display text-paper text-xl mb-4">Sur fond sombre</h2>
        <div className="flex items-end gap-8">
          <Fauteuil state="ravive" className="w-64" />
          <Camion className="w-80" />
        </div>
      </section>
      <section>
        <h2 className="font-display text-sage-deep text-xl mb-4">Camion</h2>
        <Camion className="w-96" />
      </section>
    </main>
  )
}
```

- [ ] **Step 5: Vérifier** — `npm run build` passe ; ouvrir `http://localhost:57025/dev-illustrations`, captures des 3 sections (fond clair, fond sombre, petite taille). Attendu : contours nets, lisible en 80 px, cohérent avec la charte.

- [ ] **Step 6: Commit**

```bash
git add components/illustrations/ app/dev-illustrations/
git commit -m "Illustrations : fauteuil (2 états) + camion + page de prévisualisation"
```

- [ ] **Step 7: 🛑 STOP — montrer les captures à Damien.** Ne PAS passer à la Task 2 sans son accord explicite sur le style. S'il demande des ajustements (traits plus fins/épais, couleurs, rondeur), itérer ici.

---

### Task 2: Illustrations restantes

**Files:**
- Create: `components/illustrations/Caisse.tsx` — caisse bois vue 3/4 face, planches `terracottaSoft`/`creamSoft` cerclées `sageDeep`, intérieur sombre (`sageDeep` opacité 0.5), viewBox `0 0 240 160`. Prop `className`.
- Create: `components/illustrations/Theiere.tsx` — théière ronde `creamSoft`, couvercle + bec, motif fleur `terracotta`, viewBox `0 0 160 140`.
- Create: `components/illustrations/Livres.tsx` — pile de 4 livres inclinés, tranches `terracotta`/`sage`/`creamSoft`/`terracottaSoft`, viewBox `0 0 160 140`.
- Create: `components/illustrations/Papillon.tsx` — papillon vectoriel, **ailes en 2 `<g>` séparés** (`.aile-gauche`, `.aile-droite`, `transform-origin` au corps) pour pouvoir les animer en CSS ; corps `sageDeep`, ailes `terracotta` avec taches `paper` ; props `className`, `flap?: boolean` (si true : animation CSS de battement infinie définie dans le composant via `<style>` scopé).
- Create: `components/illustrations/Main.tsx` — main stylisée `terracottaSoft` manche `sage`, viewBox `0 0 160 120`.
- Create: `components/illustrations/Atelier.tsx` — établi : clé à molette + tournevis croisés `sageSoft` + 3 étincelles 4 branches `terracotta`, viewBox `0 0 240 160`.
- Create: `components/illustrations/Etagere.tsx` — étagère boutique 2 niveaux `sageDeep` avec vase, radio, plante dessus (petits aplats), viewBox `0 0 240 200`.
- Create: `components/illustrations/Etiquette.tsx` — étiquette prix pendue à un fil, `paper` contour `sageDeep`, texte « 25 € » en `font-display` via `<text>`, viewBox `0 0 100 120`.
- Create: `components/illustrations/Salon.tsx` — fond de scène : fenêtre `creamSoft` avec rideaux, lampadaire à abat-jour `terracotta` avec halo (`terracottaSoft` opacité 0.25, cercle), tapis ovale `creamSoft`, viewBox `0 0 400 240`.
- Modify: `app/dev-illustrations/page.tsx` — ajouter une section par nouvelle illustration (même motif que Task 1 Step 4 : fond clair + un exemple sur fond `bg-sage`).

- [ ] **Step 1:** Créer les 9 composants ci-dessus (même style commun : contours `sageDeep` 6–8, aplats + 1 reflet, coins ronds).
- [ ] **Step 2:** Les ajouter à la page de prévisualisation.
- [ ] **Step 3: Vérifier** — `npm run build` ; `/dev-illustrations` : tout est lisible, cohérent, le papillon `flap` bat des ailes.
- [ ] **Step 4: Commit**

```bash
git add components/illustrations/ app/dev-illustrations/page.tsx
git commit -m "Illustrations : caisse, théière, livres, papillon animable, main, atelier, étagère, étiquette, salon"
```

---

### Task 3: Splash narratif

**Files:**
- Modify: `components/ui/SplashScreen.tsx` (réécriture complète du contenu visuel ; conserver : clé `sessionStorage("splash_shown")`, structure AnimatePresence + sortie iris `clipPath`, z-index 9999)

- [ ] **Step 1: Réécrire le composant.** Squelette imposé :

```tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Caisse from "@/components/illustrations/Caisse"
import Fauteuil from "@/components/illustrations/Fauteuil"
import Theiere from "@/components/illustrations/Theiere"
import Livres from "@/components/illustrations/Livres"
import Papillon from "@/components/illustrations/Papillon"

/* Timeline (s) — total ~4,6 s :
   0,2–1,2  fauteuil tombe dans la caisse  + « On récupère un fauteuil… »
   1,3–2,3  théière tombe                  + « On chine une théière… »
   2,4–3,4  livres tombent                 + « On sauve une pile de livres… »
   3,4–4,6  papillon se pose sur la caisse + « Au Bas de l'Aisne » (slide-up)
   4,6      setVisible(false) → sortie iris 0,9 s */

const STEPS = [
  { Comp: Fauteuil, label: "On récupère un fauteuil…", at: 0.2 },
  { Comp: Theiere,  label: "On chine une théière…",    at: 1.3 },
  { Comp: Livres,   label: "On sauve une pile de livres…", at: 2.4 },
]

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) return
    sessionStorage.setItem("splash_shown", "1")
    setVisible(true)
    const t = setTimeout(() => setVisible(false), reduce ? 2000 : 4600)
    return () => clearTimeout(t)
  }, [reduce])

  const skip = useCallback(() => setVisible(false), [])
  // ... rendu : voir détails steps suivants
}
```

Détails de rendu :
- Overlay `fixed inset-0 z-[9999] bg-sage flex flex-col items-center justify-end overflow-hidden cursor-pointer`, `onClick={skip}`, + listener `keydown` (n'importe quelle touche) pendant `visible`.
- `Caisse` en bas au centre (`w-52 md:w-64`, marge basse ~15 vh).
- Chaque objet : conteneur `absolute` au-dessus de la caisse, animation CSS
  `@keyframes _splash-drop { from { transform: translateY(-60vh) rotate(-8deg); opacity: 1 } 70% { transform: translateY(0) rotate(3deg) } 85% { transform: translateY(-14px) } to { transform: translateY(0) } }`
  durée 0,9 s, `animation-delay` = `at`, `animation-fill-mode: both`, easing `cubic-bezier(0.34, 1.2, 0.4, 1)`. Après atterrissage l'objet disparaît dans la caisse (`opacity` → 0 à `at + 1.0 s` via 2ᵉ keyframe `_splash-sink`) pour laisser la place au suivant.
- Les labels : un seul `<p>` en position fixe sous la caisse, remplacé par étapes
  via 3 `<span>` empilés dont chacun a `_splash-label` (fade-in à `at`, fade-out à `at + 1.0 s`).
- Papillon : `absolute`, part de haut-droite, animation CSS `_splash-fly` (translate + léger roulis) 1 s à 3,4 s, puis reste posé sur le bord de la caisse avec `flap`.
- « Au Bas de l'Aisne » : slide-up masqué (motif existant `overflow-hidden` + `translateY(115%)→0`) à 3,5 s ; sous-titre « Ressourcerie · Château-Thierry » fade-in à 3,9 s (styles du splash actuel réutilisés).
- Barre de progression : span bas de page, `scaleX 0→1` linéaire sur 4,4 s (motif actuel conservé).
- `reduce` (prefers-reduced-motion) : rendu alternatif sans chutes — logo `Image` (`/images/papillon-icon-180.png`) + nom en fondu simple, 2 s.

- [ ] **Step 2: Vérifier** — `npm run build` ; dans le navigateur : `sessionStorage.removeItem("splash_shown")` + reload → séquence complète ~4,6 s puis iris ; re-tester : reload sans clear → pas de splash ; clear + reload + clic immédiat → sortie instantanée. Capture pendant la chute d'un objet.
- [ ] **Step 3: Commit**

```bash
git add components/ui/SplashScreen.tsx
git commit -m "Splash narratif : objets qui tombent dans la caisse + papillon + skip au clic"
```

---

### Task 4: Squelette « SecondeVie » — mécanique de scrub

**Files:**
- Create: `components/story/SecondeVie.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Créer le composant avec la mécanique et des scènes en attendant vides.**

```tsx
"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion"

export const CHAPTERS = [
  { id: "don",      range: [0.0, 0.2] as const, kicker: "Chapitre 1", title: "Tout commence par un geste",    text: "Un fauteuil dont vous n'avez plus besoin ? Quelqu'un, quelque part, en rêve." },
  { id: "collecte", range: [0.2, 0.4] as const, kicker: "Chapitre 2", title: "On vient le chercher",          text: "Dépôt sur place ou collecte à domicile — notre camion sillonne le sud de l'Aisne." },
  { id: "atelier",  range: [0.4, 0.6] as const, kicker: "Chapitre 3", title: "On lui redonne vie",            text: "Trié, nettoyé, réparé par notre équipe en insertion. Chaque objet repart de zéro." },
  { id: "rayon",    range: [0.6, 0.8] as const, kicker: "Chapitre 4", title: "Il attend sa nouvelle maison",  text: "En rayon à petit prix, au milieu de mille autres trouvailles." },
  { id: "revit",    range: [0.8, 1.0] as const, kicker: "Chapitre 5", title: "Et l'histoire recommence",      text: "Un objet sauvé, un emploi soutenu, des déchets évités. Tout le monde y gagne." },
]

/** Fade-in/out d'un chapitre sur sa plage de scroll */
function useChapterOpacity(progress: MotionValue<number>, [a, b]: readonly [number, number]) {
  const fade = 0.04
  return useTransform(progress, [a, a + fade, b - fade, b], [0, 1, 1, 0])
}

export default function SecondeVie() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  if (reduce) return <SecondeVieStatique />   // version empilée, définie en bas de fichier

  return (
    <section ref={ref} aria-label="La seconde vie d'un objet" className="relative h-[500vh] bg-sage">
      <div className="sticky top-0 h-screen overflow-hidden">
        {CHAPTERS.map((c) => (
          <Chapitre key={c.id} chapter={c} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
```

`Chapitre` (même fichier) : `absolute inset-0 flex items-center justify-center`,
`style={{ opacity }}` via `useChapterOpacity`, contenu = zone scène (placeholder
`div` vide pour l'instant, rempli en Tasks 5–6) + bloc texte (kicker uppercase
terracotta, `h2` `font-display` `text-paper`, `p` `text-paper/80`).
`SecondeVieStatique` : les 5 chapitres en sections empilées normales (`py-16`),
mêmes textes — c'est aussi elle qui garantit le contenu lisible par les moteurs
dans le HTML server-rendered ? Non — composant client : le HTML est rendu au
SSR dans les deux branches. `useReducedMotion` retourne `false` au SSR, donc la
branche animée est celle rendue : ses `h2/p` sont bien dans le HTML. OK.

- [ ] **Step 2: Brancher dans `app/page.tsx`** — après `<Hero />` (avant `<Ticker />`) :

```tsx
import SecondeVie from "@/components/story/SecondeVie"
// ...
<Hero />
<SecondeVie />
<Ticker />
```

- [ ] **Step 3: Vérifier** — `npm run build` ; navigateur : scroller à travers la section → les 5 textes se succèdent en fondu, remonter fait rejouer à l'envers, aucun saut de layout ; DevTools : émuler `prefers-reduced-motion` → version empilée.
- [ ] **Step 4: Commit**

```bash
git add components/story/SecondeVie.tsx app/page.tsx
git commit -m "SecondeVie : mécanique de scrub 5 chapitres (scènes à venir)"
```

---

### Task 5: Scènes 1 et 2 (don + collecte)

**Files:**
- Modify: `components/story/SecondeVie.tsx` (remplacer les placeholders des chapitres `don` et `collecte`)

- [ ] **Step 1: Scène « don »** — composant `SceneDon({ progress })` dans le même fichier. Sur la plage 0→0,2 : `Main` entre par la gauche (`useTransform(progress, [0.02, 0.12], ["-40vw", "0vw"])`) en portant `Fauteuil state="abime"` (`w-40 md:w-56`), les deux descendent doucement vers `Caisse` posée au sol de la scène ; 3 cercles décoratifs `creamSoft` opacité 0.15 en parallaxe légère (facteurs y différents).
- [ ] **Step 2: Scène « collecte »** — `SceneCollecte({ progress })`. `Camion` (`w-64 md:w-96`) traverse : `x` de `-50vw` à `8vw` sur [0.2, 0.3], stable jusqu'à 0.36, léger balancement `rotate` ±1° ; « paysage » = 2 bandes de collines (paths SVG inline `sageSoft`/`sageDeep` opacité 0.4) défilant en sens inverse (parallaxe), 3 nuages `paper` opacité 0.2 ; pointillés de route qui défilent (`backgroundPosition` animé par `useTransform` sur un div `background: repeating-linear-gradient`).
- [ ] **Step 3: Vérifier** — `npm run build` ; navigateur : chapitres 1–2 joués au scroll avant/arrière, 60 fps ressenti (pas de layout shift, transforms uniquement).
- [ ] **Step 4: Commit**

```bash
git add components/story/SecondeVie.tsx
git commit -m "SecondeVie : scènes don (main + fauteuil) et collecte (camion + paysage parallaxe)"
```

---

### Task 6: Scènes 3, 4 et 5 (atelier + rayon + revit)

**Files:**
- Modify: `components/story/SecondeVie.tsx`

- [ ] **Step 1: Scène « atelier »** — `Atelier` derrière `Fauteuil` ; le fauteuil **change d'état au milieu du chapitre** : deux `Fauteuil` superposés (`abime` opacité 1→0 sur [0.48, 0.52], `ravive` 0→1 sur la même plage, léger `scale` 0.96→1.04→1 sur le ravivé) ; étincelles : 3 étoiles `terracotta` qui `scale`/`opacity` en cascade autour du fauteuil sur [0.46, 0.56].
- [ ] **Step 2: Scène « rayon »** — `Etagere` au centre, `Fauteuil state="ravive"` (`w-36 md:w-48`) posé devant, `Etiquette` qui se balance au-dessus du fauteuil (`rotate` -6°→6° mappé sur la plage, `transform-origin: top center`).
- [ ] **Step 3: Scène « revit »** — `Salon` en fond (pleine largeur bas de scène), `Fauteuil state="ravive"` au centre du tapis, halo de la lampe qui s'intensifie (`opacity` 0→0.35 sur [0.82, 0.9]), `Papillon` qui s'envole : `x` 0→30vw, `y` 0→-40vh, `rotate` léger sur [0.9, 1.0], `flap`.
- [ ] **Step 4: Vérifier** — `npm run build` ; navigateur : parcours complet des 5 chapitres fluide dans les deux sens ; la transformation abîmé→ravivé est nette et satisfaisante.
- [ ] **Step 5: Commit**

```bash
git add components/story/SecondeVie.tsx
git commit -m "SecondeVie : scènes atelier (transformation), rayon (étiquette) et revit (salon + envol)"
```

---

### Task 7: CTA finale, mobile et version statique complète

**Files:**
- Modify: `components/story/SecondeVie.tsx`

- [ ] **Step 1: CTA finale** — dans le chapitre `revit`, sous le texte, deux boutons apparaissant sur [0.92, 0.97] (`opacity` + `y` 20→0) :

```tsx
<div className="flex flex-wrap justify-center gap-4">
  <Link href="/donner" className="bg-terracotta text-paper px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-terracotta-soft transition-colors">
    Donner un objet
  </Link>
  <Link href="/boutique" className="border-2 border-paper/50 text-paper px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] hover:border-paper transition-colors">
    Venir chiner
  </Link>
</div>
```

- [ ] **Step 2: Mobile** (breakpoint `md:`) — hauteur section `h-[400vh] md:h-[500vh]` ; scènes : illustrations réduites (classes `w-*` déjà prévues), masquer les décors secondaires (nuages, cercles parallaxe) sous `md` (`hidden md:block`), textes `text-2xl` min., vérifier qu'aucun élément ne déborde (`overflow-hidden` déjà sur la scène).
- [ ] **Step 3: Compléter `SecondeVieStatique`** — chaque chapitre empilé affiche maintenant son illustration principale statique (don : main+fauteuil abîmé ; collecte : camion ; atelier : fauteuil ravivé ; rayon : étagère+étiquette ; revit : salon) + les 2 CTA en bas.
- [ ] **Step 4: Vérifier** — `npm run build` ; navigateur : viewport mobile (`resize_window` 375×812) parcours complet fluide + CTA cliquables ; reduced-motion : version statique avec illustrations ; desktop : re-parcours complet.
- [ ] **Step 5: Commit**

```bash
git add components/story/SecondeVie.tsx
git commit -m "SecondeVie : CTA finale, adaptation mobile, version statique illustrée"
```

---

### Task 8: Personnalité — bannière cookies + micro-interactions

**Files:**
- Modify: `components/ui/CookieBanner.tsx` (texte uniquement, comportement RGPD inchangé)
- Modify: `components/sections/Missions.tsx` (hover cartes)

- [ ] **Step 1: Bannière cookies** — remplacer le texte descriptif par le ton maison, boutons inchangés fonctionnellement mais relabellés : texte → « Ici, on ne collecte que les objets — aucun cookie de suivi ni de pub. La carte de la page Contact ne s'affiche qu'avec votre accord. », bouton refuser → « Non merci », bouton accepter → « D'accord ! ». Vérifier que les libellés restent explicites (accessibilité) et le lien « En savoir plus » conservé.
- [ ] **Step 2: Hover cartes missions** — sur les `motion.article` de `Missions.tsx`, ajouter `whileHover={{ y: -10, rotate: -1 }}` avec `transition={{ type: "spring", stiffness: 300, damping: 18 }}` (motif déjà utilisé sur la page boutique).
- [ ] **Step 3: Vérifier** — `npm run build` ; navigateur : bannière (localStorage/cookie de consentement effacé) affiche le nouveau texte, refus/accord fonctionnent comme avant ; hover des cartes.
- [ ] **Step 4: Commit**

```bash
git add components/ui/CookieBanner.tsx components/sections/Missions.tsx
git commit -m "Personnalité : bannière cookies sur le ton maison + hover cartes missions"
```

---

### Task 9: QA finale, nettoyage et mise en préversion

**Files:**
- Delete: `app/dev-illustrations/` (page temporaire)

- [ ] **Step 1: Supprimer la page de prévisualisation** — `rm -rf app/dev-illustrations` .
- [ ] **Step 2: QA complète** — `npm run build` (zéro erreur/warning nouveau) ; parcours complet : splash (session vierge) → hero → histoire → sections existantes → footer ; mobile 375px ; reduced-motion ; console navigateur vide d'erreurs ; vérifier que boutique/mission/donner/contact n'ont pas bougé.
- [ ] **Step 3: Commit + push de la branche**

```bash
git add -A
git commit -m "Nettoyage : suppression page dev-illustrations"
git push -u origin refonte-accueil
```

- [ ] **Step 4: Récupérer l'URL de préversion Vercel** (déploiement automatique de la branche) et l'envoyer à Damien avec un récap de ce qui l'attend. 🛑 **Le merge dans `main` n'a lieu que sur son feu vert explicite.**

---

## Auto-revue du plan

- **Couverture spec :** splash narratif (T3), histoire 5 chapitres scrub (T4–6), CTA double (T7), illustrations sur mesure avec porte de validation fauteuil+camion (T1–2), hybride photos conservées (aucune section photo supprimée), mobile + reduced-motion + SEO textes dans le DOM (T4, T7), cookies ton maison + micro-interactions (T8), branche + preview + feu vert avant merge (T9). Hors périmètre respecté : aucune autre page touchée (T8 ne modifie que le hover de la section Missions de l'accueil).
- **Placeholders :** les paths SVG précis sont volontairement laissés à l'exécution (travail artistique itératif validé visuellement en T1) ; toutes les interfaces, viewBox, palettes et compositions sont spécifiées.
- **Cohérence types :** `Fauteuil` expose `state?: "abime" | "ravive"` partout ; `Papillon` expose `flap?: boolean` (T2, utilisé T3/T6) ; `CHAPTERS` et `useChapterOpacity` définis T4, utilisés T5–7.
