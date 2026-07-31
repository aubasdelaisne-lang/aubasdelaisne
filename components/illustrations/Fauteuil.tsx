import { P } from "./palette"

type Props = {
  /** "abime" = terne (accroc, rustine), "ravive" = éclatant (terracotta) */
  state?: "abime" | "ravive"
  className?: string
}

/** Fauteuil illustré, le héros de l'histoire. Flat design, contours épais. */
export default function Fauteuil({ state = "ravive", className = "" }: Props) {
  const ravive = state === "ravive"
  const seat = ravive ? P.terracotta : P.sageSoft
  const seatLight = ravive ? P.terracottaSoft : P.creamSoft

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g opacity={ravive ? 1 : 0.92}>
        {/* Pieds */}
        <rect x="48" y="158" width="13" height="28" rx="6" fill={P.sageDeep} />
        <rect x="139" y="158" width="13" height="28" rx="6" fill={P.sageDeep} />

        {/* Dossier */}
        <rect
          x="42" y="32" width="116" height="104" rx="30"
          fill={seat} stroke={P.sageDeep} strokeWidth="7"
        />
        {/* Reflet dossier */}
        <rect x="56" y="44" width="46" height="14" rx="7" fill={P.paper} opacity="0.35" />

        {/* Coussin décoratif */}
        <rect
          x="60" y="94" width="36" height="36" rx="9"
          fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6"
          transform="rotate(-12 78 112)"
        />

        {/* Assise */}
        <rect
          x="54" y="118" width="92" height="46" rx="15"
          fill={seatLight} stroke={P.sageDeep} strokeWidth="7"
        />

        {/* Accoudoirs */}
        <rect
          x="22" y="86" width="40" height="78" rx="20"
          fill={seat} stroke={P.sageDeep} strokeWidth="7"
        />
        <rect
          x="138" y="86" width="40" height="78" rx="20"
          fill={seat} stroke={P.sageDeep} strokeWidth="7"
        />
        {/* Reflets accoudoirs */}
        <rect x="30" y="94" width="14" height="10" rx="5" fill={P.paper} opacity="0.35" />
        <rect x="146" y="94" width="14" height="10" rx="5" fill={P.paper} opacity="0.35" />

        {state === "abime" && (
          <>
            {/* Accroc zigzag sur le dossier */}
            <polyline
              points="112,58 120,68 112,78 121,88"
              stroke={P.sageDeep} strokeWidth="4.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
            {/* Rustine cousue sur l'assise */}
            <rect
              x="112" y="130" width="26" height="22" rx="6"
              fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="4"
              strokeDasharray="7 5"
            />
          </>
        )}
      </g>
    </svg>
  )
}
