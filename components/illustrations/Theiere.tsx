import { P } from "./palette"

type Props = { className?: string }

/** Théière ronde chinée, motif fleur. */
export default function Theiere({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 160 140" fill="none" className={className} aria-hidden="true">
      {/* Anse */}
      <path
        d="M42 70 C 18 62, 18 100, 44 98"
        stroke={P.sageDeep} strokeWidth="9" strokeLinecap="round" fill="none"
      />
      {/* Bec */}
      <path
        d="M112 74 C 128 66, 138 58, 142 46 L 152 54 C 146 70, 134 82, 118 88 Z"
        fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round"
      />
      {/* Corps */}
      <ellipse
        cx="82" cy="90" rx="44" ry="38"
        fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="7"
      />
      {/* Couvercle */}
      <path
        d="M56 60 Q 82 42 108 60"
        fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="6" strokeLinejoin="round"
      />
      <circle cx="82" cy="46" r="7" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="5" />
      {/* Fleur */}
      <g>
        <circle cx="74" cy="88" r="5" fill={P.terracotta} />
        <circle cx="90" cy="88" r="5" fill={P.terracotta} />
        <circle cx="82" cy="80" r="5" fill={P.terracotta} />
        <circle cx="82" cy="96" r="5" fill={P.terracotta} />
        <circle cx="82" cy="88" r="4" fill={P.paper} />
      </g>
      {/* Reflet */}
      <path d="M52 78 Q 56 66 66 60" stroke={P.paper} strokeWidth="6" strokeLinecap="round" opacity="0.5" fill="none" />
    </svg>
  )
}
