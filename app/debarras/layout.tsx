import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Débarras à Château-Thierry",
  description:
    "Service de débarras à Château-Thierry et dans l'Aisne : vidage de grenier, cave, appartement, succession. On collecte, on trie, on valorise. Gratuit sur devis — 03 64 13 48 64.",
  openGraph: {
    title: "Débarras à Château-Thierry — Au Bas de l'Aisne",
    description:
      "Vidage de grenier, cave, appartement ou succession à Château-Thierry. On vient collecter vos encombrants et leur donnons une seconde vie. Appelez-nous.",
  },
}

export default function DebarrasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
