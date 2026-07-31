import { P } from "./palette"

type Props = { className?: string; prix?: string }

/** Étiquette de prix pendue à son fil. */
export default function Etiquette({ className = "", prix = "25 €" }: Props) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={className} aria-hidden="true">
      {/* Fil */}
      <path
        d="M50 0 C 46 12, 42 20, 44 30"
        stroke={P.sageDeep} strokeWidth="4" strokeLinecap="round" fill="none"
      />
      {/* Étiquette */}
      <g transform="rotate(6 48 70)">
        <rect
          x="16" y="30" width="64" height="76" rx="10"
          fill={P.paper} stroke={P.sageDeep} strokeWidth="6"
        />
        <circle cx="48" cy="44" r="5" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="4" />
        <text
          x="48" y="84" textAnchor="middle"
          className="font-display" fontWeight="800" fontSize="22"
          fill={P.terracotta}
        >
          {prix}
        </text>
      </g>
    </svg>
  )
}
