import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "La Boutique",
  description:
    "Chinez meubles, vaisselle, livres, jouets et déco à petits prix dans notre boutique solidaire de Château-Thierry. Ouvert du mardi au samedi.",
  openGraph: {
    title: "La Boutique · Au Bas de l'Aisne",
    description:
      "Chinez meubles, vaisselle, livres, jouets et déco à petits prix dans notre boutique solidaire de Château-Thierry.",
    images: [{ url: "/images/boutique-capture.png", width: 1200, height: 630 }],
  },
}

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
