import { P } from "./palette"

type Props = { className?: string }

/** Clé plate à œil, horizontale — vole autour du fauteuil dans l'atelier. */
export default function Cle({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 140 70" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="28" width="80" height="13" rx="6.5" fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" />
      <path
        fillRule="evenodd"
        d="M118 17 A 18 18 0 1 1 98 49 A 18 18 0 0 1 118 17 Z
           M114 26 A 8.5 8.5 0 1 0 104 40 A 8.5 8.5 0 0 0 114 26 Z"
        fill={P.sageSoft} stroke={P.sageDeep} strokeWidth="5" strokeLinejoin="round"
      />
    </svg>
  )
}
