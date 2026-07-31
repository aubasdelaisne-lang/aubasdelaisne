import { P } from "./palette"

type Props = { className?: string }

/** Pile de quatre livres sauvés, un brin de guingois. */
export default function Livres({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 160 140" fill="none" className={className} aria-hidden="true">
      {/* Livre 4 (bas) */}
      <g>
        <rect x="20" y="108" width="122" height="24" rx="6" fill={P.sage} stroke={P.sageDeep} strokeWidth="6" />
        <rect x="128" y="113" width="10" height="14" rx="3" fill={P.paper} />
      </g>
      {/* Livre 3 */}
      <g transform="rotate(2 80 100)">
        <rect x="28" y="84" width="110" height="24" rx="6" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="6" />
        <rect x="124" y="89" width="10" height="14" rx="3" fill={P.paper} />
      </g>
      {/* Livre 2 */}
      <g transform="rotate(-3 78 76)">
        <rect x="24" y="60" width="114" height="24" rx="6" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="6" />
        <rect x="124" y="65" width="10" height="14" rx="3" fill={P.paper} />
      </g>
      {/* Livre 1 (haut) + marque-page */}
      <g transform="rotate(-6 74 50)">
        <rect x="32" y="36" width="100" height="24" rx="6" fill={P.terracottaSoft} stroke={P.sageDeep} strokeWidth="6" />
        <rect x="118" y="41" width="10" height="14" rx="3" fill={P.paper} />
        <path d="M58 36 L58 24 L66 30 L74 24 L74 36 Z" fill={P.sage} stroke={P.sageDeep} strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
