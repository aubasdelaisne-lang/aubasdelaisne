import { P } from "./palette"

type Props = { className?: string }

/** Tournevis horizontal — vole autour du fauteuil dans l'atelier. */
export default function Tournevis({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 150 40" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="17" width="12" height="6" rx="3" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="4" />
      <rect x="10" y="14" width="54" height="12" rx="6" fill={P.creamSoft} stroke={P.sageDeep} strokeWidth="5" />
      <rect x="60" y="11" width="44" height="18" rx="8" fill={P.terracotta} stroke={P.sageDeep} strokeWidth="5" />
    </svg>
  )
}
