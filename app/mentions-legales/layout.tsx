import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site de la ressourcerie Au Bas de l'Aisne à Château-Thierry : éditeur, hébergeur et propriété intellectuelle.",
  robots: { index: true, follow: true },
}

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
