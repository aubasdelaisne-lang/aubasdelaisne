import { P } from "./palette"

type Props = { className?: string }

/** Caisse en bois des dons, vue de face. */
export default function Caisse({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className={className} aria-hidden="true">
      {/* Ouverture (intérieur sombre) */}
      <rect x="30" y="16" width="180" height="34" rx="9" fill={P.sageDeep} opacity="0.55" />
      {/* Paroi avant */}
      <rect
        x="20" y="38" width="200" height="108" rx="11"
        fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="7"
      />
      {/* Lignes de planches */}
      <line x1="30" y1="74" x2="210" y2="74" stroke={P.sageDeep} strokeWidth="4" opacity="0.35" />
      <line x1="30" y1="110" x2="210" y2="110" stroke={P.sageDeep} strokeWidth="4" opacity="0.35" />
      {/* Tasseaux latéraux */}
      <rect x="28" y="30" width="22" height="122" rx="8" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" />
      <rect x="190" y="30" width="22" height="122" rx="8" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" />
      {/* Étiquette DONS */}
      <rect x="86" y="78" width="68" height="30" rx="7" fill={P.paper} stroke={P.sageDeep} strokeWidth="5" />
      <text
        x="120" y="99" textAnchor="middle"
        className="font-display" fontWeight="800" fontSize="17"
        letterSpacing="2" fill={P.sageDeep}
      >
        DONS
      </text>
      {/* Reflet */}
      <rect x="60" y="48" width="40" height="10" rx="5" fill={P.paper} opacity="0.4" />
    </svg>
  )
}
