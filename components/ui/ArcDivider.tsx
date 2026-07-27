/**
 * Séparateur en arc organique (creux concave) — alternative aux vagues
 * pour varier les transitions entre sections.
 *
 * Usage :
 * <ArcDivider top="text-paper" bottom="bg-cream-soft" />
 *
 * - `top`    : couleur (classe text-) qui remplit l'arc (= bg de la section du dessus)
 * - `bottom` : couleur (classe bg-) du fond derrière l'arc (= bg de la section du dessous)
 * - `flip`   : inverse l'arc (bosse convexe au lieu du creux)
 */
type Props = {
  top?: string
  bottom?: string
  flip?: boolean
  className?: string
}

export default function ArcDivider({
  top = "text-paper",
  bottom = "bg-cream-soft",
  flip = false,
  className = "",
}: Props) {
  return (
    <div
      className={`relative ${bottom} ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      {/* Couche arrière translucide, dérive douce (ondulation) */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`wave-drift absolute inset-x-0 top-0 w-[124%] -left-[12%] h-[54px] md:h-[92px] ${top} opacity-40`}
      >
        <path d="M0,0 L1440,0 L1440,78 Q720,4 0,78 Z" fill="currentColor" />
      </svg>

      {/* Arc net : creux concave prononcé */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`relative block w-full h-[48px] md:h-[80px] ${top}`}
      >
        <path d="M0,0 L1440,0 L1440,72 Q720,0 0,72 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
