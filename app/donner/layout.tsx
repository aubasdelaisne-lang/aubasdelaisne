import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/ui/BreadcrumbJsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  alternates: { canonical: "/donner" },
  title: "Faire un Don",
  description:
    "Donnez vos objets à la ressourcerie de Château-Thierry. Dépôt sans rendez-vous ou collecte à domicile. Meubles, livres, jouets, vaisselle acceptés.",
  openGraph: {
    title: "Faire un Don · Au Bas de l'Aisne",
    description:
      "Donnez vos objets à la ressourcerie Au Bas de l'Aisne. Collecte à domicile ou dépôt sur place à Château-Thierry.",
    images: [{ url: "/images/camion.webp", width: 1200, height: 630 }],
  },
}

export default function DonnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="Faire un Don" path="/donner" />
      {children}
    </>
  )
}
