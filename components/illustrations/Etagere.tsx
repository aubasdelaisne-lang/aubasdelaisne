import { P } from "./palette"

type Props = { className?: string }

/** Étagère de boutique avec trouvailles : vase, radio, plante, livres. */
export default function Etagere({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={className} aria-hidden="true">
      {/* Montants */}
      <rect x="22" y="14" width="14" height="176" rx="7" fill={P.sage} stroke={P.sageDeep} strokeWidth="6" />
      <rect x="204" y="14" width="14" height="176" rx="7" fill={P.sage} stroke={P.sageDeep} strokeWidth="6" />

      {/* Objets étagère haute */}
      {/* Vase */}
      <path
        d="M64 48 C 60 60, 60 70, 66 78 L 82 78 C 88 70, 88 60, 84 48 C 80 44, 68 44, 64 48 Z"
        fill={P.terracotta} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round"
      />
      {/* Radio */}
      <rect x="104" y="46" width="58" height="32" rx="8" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" />
      <circle cx="120" cy="62" r="8" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      <line x1="136" y1="56" x2="152" y2="56" stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round" />
      <line x1="136" y1="66" x2="152" y2="66" stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round" />
      <line x1="150" y1="46" x2="158" y2="32" stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round" />

      {/* Tablette haute */}
      <rect x="16" y="78" width="208" height="14" rx="7" fill={P.sageDeep} />

      {/* Objets étagère basse */}
      {/* Plante */}
      <path d="M62 132 C 54 120, 54 110, 60 104 C 66 110, 68 120, 66 132 Z" fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" strokeLinejoin="round" />
      <path d="M74 132 C 78 118, 86 110, 94 108 C 92 118, 84 128, 76 132 Z" fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" strokeLinejoin="round" />
      <path d="M56 132 L 86 132 L 82 156 L 60 156 Z" fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round" />
      {/* Petite pile de livres */}
      <rect x="116" y="142" width="60" height="14" rx="5" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="5" />
      <g transform="rotate(-4 146 138)">
        <rect x="122" y="126" width="52" height="14" rx="5" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="5" />
      </g>

      {/* Tablette basse */}
      <rect x="16" y="156" width="208" height="14" rx="7" fill={P.sageDeep} />
    </svg>
  )
}
