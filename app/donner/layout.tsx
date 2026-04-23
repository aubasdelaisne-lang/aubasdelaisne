import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faire un Don",
  description:
    "Donnez vos objets à la recyclerie Au Bas de l'Aisne. Collecte à domicile ou dépôt sur place à Brasles. Meubles, livres, jouets, vaisselle acceptés.",
  openGraph: {
    title: "Faire un Don · Au Bas de l'Aisne",
    description:
      "Donnez vos objets à la recyclerie Au Bas de l'Aisne. Collecte à domicile ou dépôt sur place à Brasles.",
    images: [{ url: "/images/hero.jpeg", width: 1200, height: 630 }],
  },
}

export default function DonnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
