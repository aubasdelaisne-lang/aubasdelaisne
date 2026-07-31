import { P } from "./palette"

type Props = { className?: string }

/** Main ouverte paume vers le haut, manche bleu nuit — le geste du don. */
export default function Main({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      {/* Manche */}
      <rect x="0" y="58" width="52" height="44" rx="14" fill={P.sage} stroke={P.sageDeep} strokeWidth="7" />
      {/* Paume + doigts (paume vers le haut) */}
      <path
        d="M44 64
           C 60 56, 76 52, 92 52
           C 98 52, 102 44, 108 44 C 114 44, 114 52, 120 52
           C 126 52, 128 46, 134 47 C 140 48, 138 56, 144 57
           C 150 58, 152 64, 148 70
           C 140 84, 118 94, 96 94
           C 76 94, 58 88, 46 80
           Z"
        fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="7" strokeLinejoin="round"
      />
      {/* Pouce */}
      <path
        d="M52 68 C 58 58, 70 54, 80 58"
        stroke={P.sageDeep} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5"
      />
      {/* Reflet manche */}
      <rect x="8" y="66" width="16" height="8" rx="4" fill={P.paper} opacity="0.35" />
    </svg>
  )
}
