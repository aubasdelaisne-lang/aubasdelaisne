import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notre Mission",
  description:
    "Réduire les déchets, créer du lien social et réinsérer des personnes en difficulté. Découvrez l'histoire et les engagements de l'association Au Bas de l'Aisne.",
  openGraph: {
    title: "Notre Mission · Au Bas de l'Aisne",
    description:
      "Réduire les déchets, créer du lien social et réinsérer — l'histoire et les engagements de la ressourcerie depuis 2014.",
    images: [{ url: "/images/hero.jpeg", width: 1200, height: 630 }],
  },
}

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
