import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/donner" },
  title: "Faire un Don",
  description:
    "Donnez vos objets à la ressourcerie Au Bas de l'Aisne. Collecte à domicile ou dépôt sur place à Château-Thierry. Meubles, livres, jouets, vaisselle acceptés.",
  openGraph: {
    title: "Faire un Don · Au Bas de l'Aisne",
    description:
      "Donnez vos objets à la ressourcerie Au Bas de l'Aisne. Collecte à domicile ou dépôt sur place à Château-Thierry.",
    images: [{ url: "/images/camion.webp", width: 1200, height: 630 }],
  },
}

export default function DonnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
