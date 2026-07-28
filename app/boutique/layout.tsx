import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/ui/BreadcrumbJsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  alternates: { canonical: "/boutique" },
  title: "La Boutique",
  description:
    "Chinez meubles, vaisselle, livres, jouets et déco à petits prix dans notre boutique solidaire de Château-Thierry. Ouvert du mardi au samedi.",
  openGraph: {
    title: "La Boutique · Au Bas de l'Aisne",
    description:
      "Chinez meubles, vaisselle, livres, jouets et déco à petits prix dans notre boutique solidaire de Château-Thierry.",
    images: [{ url: "/images/table-bois.webp", width: 1200, height: 630 }],
  },
}

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="La Boutique" path="/boutique" />
      {children}
    </>
  )
}
