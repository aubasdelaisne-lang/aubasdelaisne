import { P } from "./palette"

type Props = {
  className?: string
  /** Outils qui se balancent + étincelles qui scintillent en continu */
  anime?: boolean
}

/** Établi d'atelier : outils croisés + étincelles de remise à neuf. */
export default function Atelier({ className = "", anime = false }: Props) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className={className} aria-hidden="true">
      {anime && (
        <style>{`
          @keyframes _atl-rock {
            0%, 100% { transform: rotate(-2deg); }
            50%      { transform: rotate(2deg); }
          }
          @keyframes _atl-tw {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0.25; }
          }
          ._atl-tools { animation: _atl-rock 2.2s ease-in-out infinite; }
          ._atl-s1 { animation: _atl-tw 1.6s ease-in-out infinite; }
          ._atl-s2 { animation: _atl-tw 1.9s ease-in-out 0.4s infinite; }
          ._atl-s3 { animation: _atl-tw 1.4s ease-in-out 0.8s infinite; }
        `}</style>
      )}
      {/* Étincelles */}
      <path className={anime ? "_atl-s1" : undefined} d="M52 26 L55 35 L64 38 L55 41 L52 50 L49 41 L40 38 L49 35 Z" fill={P.terracotta} />
      <path className={anime ? "_atl-s2" : undefined} d="M190 18 L192.5 25 L200 27.5 L192.5 30 L190 37 L187.5 30 L180 27.5 L187.5 25 Z" fill={P.terracottaSoft} />
      <path className={anime ? "_atl-s3" : undefined} d="M216 68 L218 74 L224 76 L218 78 L216 84 L214 78 L208 76 L214 74 Z" fill={P.terracotta} />

      {/* Outils (balancés ensemble si anime) */}
      <g
        className={anime ? "_atl-tools" : undefined}
        style={{ transformOrigin: "120px 90px", transformBox: "view-box" }}
      >
        {/* Clé plate à œil (diagonale) */}
        <g transform="rotate(-28 120 70)">
          <rect x="88" y="64" width="76" height="13" rx="6.5" fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" />
          <path
            fillRule="evenodd"
            d="M178 54 A 17 17 0 1 1 158 82 A 17 17 0 0 1 178 54 Z
               M174 62 A 8 8 0 1 0 165 74 A 8 8 0 0 0 174 62 Z"
            fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" strokeLinejoin="round"
          />
        </g>
        {/* Tournevis (diagonale opposée) */}
        <g transform="rotate(26 120 74)">
          <rect x="52" y="71" width="12" height="6" rx="3" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="4" />
          <rect x="60" y="68" width="52" height="12" rx="6" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="5" />
          <rect x="108" y="65" width="42" height="18" rx="8" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="5" />
        </g>
      </g>

      {/* Plateau d'établi */}
      <rect x="18" y="104" width="204" height="20" rx="8" fill={P.sage} stroke={P.sageDeep} strokeWidth="7" />
      {/* Pieds */}
      <rect x="34" y="124" width="14" height="28" rx="6" fill={P.sageDeep} />
      <rect x="192" y="124" width="14" height="28" rx="6" fill={P.sageDeep} />
      {/* Reflet plateau */}
      <rect x="32" y="109" width="44" height="7" rx="3.5" fill={P.paper} opacity="0.3" />
    </svg>
  )
}
