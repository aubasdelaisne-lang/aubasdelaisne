import { P } from "./palette"

type Props = { className?: string }

/** Camion de collecte vu de profil, roulant vers la droite.
 *  Panneau papillon sur la caisse. Flat design, contours épais. */
export default function Camion({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Traits de vitesse */}
      <g stroke={P.terracottaSoft} strokeWidth="7" strokeLinecap="round" opacity="0.9">
        <line x1="8" y1="56" x2="38" y2="56" />
        <line x1="2" y1="78" x2="26" y2="78" />
        <line x1="12" y1="100" x2="36" y2="100" />
      </g>

      {/* Caisse */}
      <rect
        x="48" y="22" width="126" height="94" rx="10"
        fill={P.sage} stroke={P.sageDeep} strokeWidth="7"
      />
      {/* Panneau */}
      <rect
        x="60" y="36" width="102" height="64" rx="8"
        fill={P.paper} stroke={P.sageDeep} strokeWidth="4"
      />

      {/* Papillon sur le panneau (ailes relevées, vu de face) */}
      <g>
        {/* Aile supérieure gauche */}
        <path
          d="M108 70 C 103 56, 90 48, 84 54 C 78 60, 86 70, 106 74 Z"
          fill={P.terracotta} stroke={P.sageDeep} strokeWidth="4" strokeLinejoin="round"
        />
        {/* Aile inférieure gauche */}
        <path
          d="M106 76 C 94 74, 86 80, 90 87 C 94 93, 104 88, 108 80 Z"
          fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="4" strokeLinejoin="round"
        />
        {/* Aile supérieure droite */}
        <path
          d="M114 70 C 119 56, 132 48, 138 54 C 144 60, 136 70, 116 74 Z"
          fill={P.terracotta} stroke={P.sageDeep} strokeWidth="4" strokeLinejoin="round"
        />
        {/* Aile inférieure droite */}
        <path
          d="M116 76 C 128 74, 136 80, 132 87 C 128 93, 118 88, 114 80 Z"
          fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="4" strokeLinejoin="round"
        />
        {/* Taches */}
        <circle cx="93" cy="60" r="2.6" fill={P.paper} />
        <circle cx="129" cy="60" r="2.6" fill={P.paper} />
        {/* Corps */}
        <rect x="108" y="62" width="6" height="24" rx="3" fill={P.sageDeep} />
        {/* Antennes */}
        <path
          d="M110 62 C 107 56, 104 54, 101 53 M112 62 C 115 56, 118 54, 121 53"
          stroke={P.sageDeep} strokeWidth="3" strokeLinecap="round" fill="none"
        />
      </g>

      {/* Cabine */}
      <path
        d="M174 54 L212 54 Q222 54 228 63 L244 86 Q250 94 250 103 L250 116 L174 116 Z"
        fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
      />
      {/* Vitre */}
      <path
        d="M182 62 L208 62 Q214 62 218 68 L230 85 L182 85 Z"
        fill={P.paper} stroke={P.sageDeep} strokeWidth="5" strokeLinejoin="round"
      />
      {/* Poignée de porte */}
      <line
        x1="186" y1="98" x2="198" y2="98"
        stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round"
      />
      {/* Phare */}
      <circle cx="245" cy="105" r="5.5" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="4" />

      {/* Roues */}
      <g>
        <circle cx="88" cy="124" r="18" fill={P.sageDeep} />
        <circle cx="88" cy="124" r="7" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
        <circle cx="212" cy="124" r="18" fill={P.sageDeep} />
        <circle cx="212" cy="124" r="7" fill={P.paper} stroke={P.sageDeep} strokeWidth="4" />
      </g>
    </svg>
  )
}
