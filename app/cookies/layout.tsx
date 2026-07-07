import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Politique de cookies du site de la ressourcerie Au Bas de l'Aisne à Château-Thierry.",
  robots: { index: true, follow: true },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
