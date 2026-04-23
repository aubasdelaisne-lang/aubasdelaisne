/**
 * Séparateur en forme de vague entre deux sections.
 *
 * Usage :
 * <WaveDivider top="text-paper" bottom="bg-cream-soft" />
 *
 * - `top`  : couleur (classe text-) qui remplit la vague (= bg de la section du dessus)
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
    <div className={`${bottom} ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block w-full h-[40px] md:h-[70px] ${top} ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,0 L1440,0 L1440,44 C1200,76 960,20 720,44 C480,68 240,20 0,44 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
