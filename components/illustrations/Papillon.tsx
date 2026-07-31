import { P } from "./palette"

type Props = {
  className?: string
  /** Battement d'ailes continu */
  flap?: boolean
}

/** Papillon du logo, vectorisé. Ailes gauche/droite animables séparément. */
export default function Papillon({ className = "", flap = false }: Props) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
      {flap && (
        <style>{`
          @keyframes _pap-flap-l {
            0%, 100% { transform: scaleX(1); }
            50%      { transform: scaleX(0.55); }
          }
          @keyframes _pap-flap-r {
            0%, 100% { transform: scaleX(1); }
            50%      { transform: scaleX(0.55); }
          }
          ._pap-l { animation: _pap-flap-l 0.9s ease-in-out infinite; transform-origin: 100px 84px; }
          ._pap-r { animation: _pap-flap-r 0.9s ease-in-out infinite; transform-origin: 100px 84px; }
        `}</style>
      )}
      {/* Aile gauche */}
      <g className={flap ? "_pap-l" : undefined}>
        <path
          d="M96 78 C 86 46, 52 28, 38 42 C 24 56, 44 82, 92 88 Z"
          fill={P.terracotta} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
        />
        <path
          d="M92 92 C 64 88, 44 102, 54 118 C 63 132, 88 118, 96 100 Z"
          fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
        />
        <circle cx="56" cy="54" r="6" fill={P.paper} />
        <circle cx="68" cy="108" r="4.5" fill={P.paper} />
      </g>
      {/* Aile droite */}
      <g className={flap ? "_pap-r" : undefined}>
        <path
          d="M104 78 C 114 46, 148 28, 162 42 C 176 56, 156 82, 108 88 Z"
          fill={P.terracotta} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
        />
        <path
          d="M108 92 C 136 88, 156 102, 146 118 C 137 132, 112 118, 104 100 Z"
          fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
        />
        <circle cx="144" cy="54" r="6" fill={P.paper} />
        <circle cx="132" cy="108" r="4.5" fill={P.paper} />
      </g>
      {/* Corps */}
      <rect x="95" y="66" width="10" height="48" rx="5" fill={P.sageDeep} />
      {/* Antennes */}
      <path
        d="M98 66 C 92 56, 86 52, 80 50 M102 66 C 108 56, 114 52, 120 50"
        stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round" fill="none"
      />
    </svg>
  )
}
