/**
 * Séparateur en forme de vague entre deux sections.
 *
 * Deux couches : une vague arrière translucide qui dérive lentement
 * (profondeur + vie), et la vague avant nette qui fait la vraie coupure.
 *
 * Usage :
 * <WaveDivider top="text-paper" bottom="bg-cream-soft" />
 *
 * - `top`    : couleur (classe text-) qui remplit la vague (= bg de la section du dessus)
 * - `bottom` : couleur (classe bg-) du fond derrière la vague (= bg de la section du dessous)
 */
type Props = {
  top?: string
  bottom?: string
  flip?: boolean
  className?: string
}

export default function WaveDivider({
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
      {/* Couche arrière : plus haute, translucide, dérive lentement */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`wave-drift absolute inset-x-0 top-0 w-[130%] -left-[15%] h-[46px] md:h-[80px] ${top} opacity-40`}
      >
        <path d="M0,0 L1440,0 L1440,30 Q720,66 0,30 Z" fill="currentColor" />
      </svg>

      {/* Couche avant : la vraie coupure nette */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`relative block w-full h-[40px] md:h-[70px] ${top}`}
      >
        <path d="M0,0 L1440,0 L1440,35 Q720,58 0,35 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
