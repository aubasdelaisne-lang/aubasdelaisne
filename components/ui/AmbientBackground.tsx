type Blob = {
  color: string
  size: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  anim: "a" | "b" | "c"
  duration: string
  opacity?: number
}

type Props = {
  /** Jeu de couleurs : sur fond clair (défaut) ou sur fond sombre (sage) */
  variant?: "light" | "dark"
  className?: string
}

const LIGHT: Blob[] = [
  { color: "var(--color-sage-soft)", size: "38rem", top: "-8rem", left: "-6rem", anim: "a", duration: "22s", opacity: 0.28 },
  { color: "var(--color-terracotta)", size: "26rem", bottom: "-6rem", right: "-4rem", anim: "b", duration: "26s", opacity: 0.16 },
  { color: "var(--color-stone)", size: "30rem", top: "30%", right: "20%", anim: "c", duration: "30s", opacity: 0.3 },
]

const DARK: Blob[] = [
  { color: "var(--color-terracotta)", size: "34rem", top: "-8rem", right: "-6rem", anim: "a", duration: "24s", opacity: 0.22 },
  { color: "var(--color-sage-soft)", size: "40rem", bottom: "-10rem", left: "-8rem", anim: "b", duration: "28s", opacity: 0.4 },
]

/**
 * Fond d'ambiance : quelques halos colorés flous qui dérivent lentement.
 * Purement décoratif (aria-hidden), désactivé si prefers-reduced-motion.
 * À placer en premier enfant d'une section `relative overflow-hidden`,
 * le contenu devant être en `relative z-10`.
 */
export default function AmbientBackground({ variant = "light", className = "" }: Props) {
  const blobs = variant === "dark" ? DARK : LIGHT
  return (
    <div className={`ambient ${className}`} aria-hidden>
      {blobs.map((b, i) => (
        <span
          key={i}
          className="ambient-blob"
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            opacity: b.opacity ?? 0.5,
            animation: `ambient-drift-${b.anim} ${b.duration} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
