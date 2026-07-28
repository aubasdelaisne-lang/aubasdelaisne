import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/mission" },
  title: "Notre Mission",
  description:
    "Ressourcerie solidaire dans l'Aisne — réduction des déchets, lien social et insertion. Histoire et engagements de l'association Au Bas de l'Aisne depuis 2014.",
  openGraph: {
    title: "Notre Mission · Au Bas de l'Aisne",
    description:
      "Réduire les déchets, créer du lien social et réinsérer — l'histoire et les engagements de la ressourcerie depuis 2014.",
    images: [{ url: "/images/devanture.webp", width: 1200, height: 630 }],
  },
}

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
