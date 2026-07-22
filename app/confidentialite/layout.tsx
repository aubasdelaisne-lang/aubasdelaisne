import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/confidentialite" },
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site de la ressourcerie Au Bas de l'Aisne.",
  robots: { index: true, follow: true },
}

export default function ConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
