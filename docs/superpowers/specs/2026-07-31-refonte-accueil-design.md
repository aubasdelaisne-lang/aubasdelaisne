# Refonte accueil — « La seconde vie d'un objet »

**Date** : 31 juillet 2026
**Statut** : validé par Damien
**Référence d'inspiration** : https://www.cravburgers.shop/ (illustrations flat, scroll storytelling, personnalité dans chaque détail)

## Objectif

Élever la page d'accueil au niveau du site de référence CRAV : une expérience
immersive et mémorable qui raconte le métier de la ressourcerie, tout en
gardant la charte graphique existante (bleu nuit `sage`, crème `paper`,
terracotta, papillon) et les informations pratiques qui créent la confiance.

## Décisions actées

| Question | Décision |
|---|---|
| Ampleur | Accueil d'abord ; les autres pages hériteront du style en phase 2 |
| Style visuel | Hybride : illustrations SVG pour la narration, vraies photos pour la boutique |
| Narration au scroll | La seconde vie d'un objet (un fauteuil), en 5 chapitres |
| Splash | Version narrative courte 4-5 s, passable au clic, 1×/session |
| Retour arrière | Tag `sauvegarde-site-v1` + branche `refonte-accueil` + preview Vercel |

## 1. Splash narratif (remplace le contenu de `components/ui/SplashScreen.tsx`)

Scène : fond `sage`, caisse en bois illustrée en bas au centre.

Séquence (~4,5 s au total) :
1. Un fauteuil tombe dans la caisse — « On récupère un fauteuil… » (~1,1 s)
2. Une théière tombe — « On chine une théière… » (~1,1 s)
3. Une pile de livres tombe — « On sauve une pile de livres… » (~1,1 s)
4. Le papillon (logo) se pose sur la caisse, bat des ailes — « Au Bas de l'Aisne » apparaît (~1,2 s)
5. Sortie iris (clip-path circle), comme le splash actuel

Comportements :
- Barre de progression terracotta en bas (style actuel conservé)
- **Clic ou touche n'importe où = skip immédiat** (sortie iris accélérée)
- `sessionStorage("splash_shown")` : une seule fois par session (clé actuelle conservée)
- `prefers-reduced-motion` : fondu simple logo + nom, pas d'objets qui tombent
- Animations en CSS `@keyframes` (leçon apprise : `animate` de Framer Motion
  ne se déclenche pas de façon fiable dans un montage conditionnel sous AnimatePresence) ;
  Framer Motion uniquement pour la sortie iris

## 2. Section « La seconde vie » (nouveau, cœur de la page)

Nouveau composant `components/story/SecondeVie.tsx`, inséré dans `app/page.tsx`
après le hero.

Mécanique : conteneur haut (~500 vh), scène en `position: sticky` plein écran.
`useScroll` sur le conteneur + `useTransform` pour piloter chaque élément.
Le scroll fait avancer/reculer l'histoire (scrub). Transforms GPU uniquement
(opacity, x, y, rotate, scale) — pas d'animation de layout.

Les 5 chapitres (plages de progression indicatives) :

| Plage | Chapitre | Scène illustrée | Texte |
|---|---|---|---|
| 0,00–0,20 | Vous donnez | Une main dépose le fauteuil | « Tout commence par un geste » |
| 0,20–0,40 | On collecte | Le camion roule, paysage qui défile | « On vient le chercher » |
| 0,40–0,60 | On trie, on répare | Atelier : outils, étincelles, couleurs ravivées | « On lui redonne vie » |
| 0,60–0,80 | Il retrouve une place | En rayon, étiquette petit prix | « Il attend sa nouvelle maison » |
| 0,80–1,00 | Il revit | Salon d'une famille, lumière chaude, papillon s'envole | « Et l'histoire recommence » |

Fin de séquence : deux CTA — **« Donner un objet »** (`/donner`) et
**« Venir chiner »** (`/boutique`).

Dégradations :
- Mobile : mêmes scènes, éléments décoratifs réduits, textes plus grands,
  hauteur de conteneur réduite (~400 vh)
- `prefers-reduced-motion` : 5 blocs statiques empilés (illustration + texte),
  aucun pinning ni scrub
- SEO : tous les textes sont dans le DOM en balises normales (h2/p), rien
  n'est injecté au scroll

## 3. Illustrations SVG sur mesure

Style : flat design, contours épais sombres (façon CRAV), palette de la charte
uniquement (sage, paper, terracotta, cream). Fichiers SVG inline en composants
React (`components/illustrations/`), légers (< 10 Ko chacun).

Assets à dessiner :
- Fauteuil (le héros de l'histoire — plusieurs états : abîmé / ravivé)
- Caisse en bois de dons
- Théière, pile de livres
- Camion de collecte (avec logo)
- Main qui dépose
- Éléments d'atelier (clé, tournevis, étincelles)
- Étagère de boutique, étiquette prix
- Salon (lampe, tapis, fenêtre)
- Papillon vectoriel animable (ailes séparées)

**Porte de validation** : le fauteuil et le camion sont dessinés en premier et
soumis à Damien pour valider le style avant de dessiner le reste.

## 4. Reste de la page d'accueil

Conservé et restylé (cohérence, pas révolution) : stats 10 ans, galerie photos
réelles, horaires/accès, CTA contact. Les sections existantes gardent leur
structure ; ajustements de ton et micro-interactions (cartes qui « sautent »
légèrement au survol).

Bannière cookies : reformulée sur le ton de la maison (le comportement RGPD ne
change pas).

## 5. Contraintes techniques

- **Aucune nouvelle dépendance** : Framer Motion (déjà installé) pour le scrub,
  CSS keyframes pour le splash
- Next.js App Router : `app/page.tsx` reste server component ; les composants
  animés sont des îlots `"use client"`
- Performance : viser zéro régression Lighthouse (SVG inline légers, sections
  basses en lazy, pas de nouvelle image lourde)
- Le H1 et la structure de titres existants sont conservés (acquis SEO récents)

## 6. Processus et sécurité

1. Travail sur la branche `refonte-accueil` — `main` intact
2. Preview Vercel de la branche pour valider visuellement
3. Portes de validation : (a) style des illustrations, (b) splash,
   (c) histoire au scroll complète, (d) merge seulement sur feu vert explicite
4. Retour arrière : tag `sauvegarde-site-v1` + Instant Rollback Vercel

## Hors périmètre (phase 2)

- Pages boutique / mission / donner / contact
- Changement de contenu éditorial majeur
- Toute modification de la palette ou de la typographie de la charte
