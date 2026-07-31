import { P } from "./palette"

type Props = { className?: string }

/** Décor de salon : fenêtre à rideaux, lampadaire, tapis.
 *  Le halo de la lampe est animé séparément dans la scène (SecondeVie). */
export default function Salon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 400 240" fill="none" className={className} aria-hidden="true">
      {/* Fenêtre */}
      <rect x="60" y="24" width="130" height="120" rx="12" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="7" />
      <rect x="74" y="38" width="46" height="42" rx="6" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      <rect x="130" y="38" width="46" height="42" rx="6" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      <rect x="74" y="90" width="46" height="40" rx="6" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      <rect x="130" y="90" width="46" height="40" rx="6" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      {/* Rideaux */}
      <path
        d="M52 18 C 60 60, 58 110, 48 152 L 70 152 C 78 110, 78 60, 74 18 Z"
        fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round"
      />
      <path
        d="M198 18 C 190 60, 192 110, 202 152 L 180 152 C 172 110, 172 60, 176 18 Z"
        fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round"
      />

      {/* Lampadaire */}
      <line x1="322" y1="70" x2="322" y2="196" stroke={P.sageDeep} strokeWidth="8" strokeLinecap="round" />
      <path d="M296 74 L 348 74 L 338 38 L 306 38 Z" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round" />
      <path d="M300 196 L 344 196" stroke={P.sageDeep} strokeWidth="8" strokeLinecap="round" />
      {/* Reflet abat-jour */}
      <path d="M310 46 L 306 66" stroke={P.paper} strokeWidth="5" strokeLinecap="round" opacity="0.4" />

      {/* Tapis */}
      <ellipse cx="200" cy="216" rx="150" ry="18" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" />
      <ellipse cx="200" cy="216" rx="104" ry="11" fill="none" stroke={P.sageDeep} strokeWidth="4" opacity="0.35" />
    </svg>
  )
}
