import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contactez la ressourcerie Au Bas de l'Aisne à Château-Thierry. Téléphone, réseaux sociaux, accès et horaires. Nous répondons rapidement à vos questions.",
  openGraph: {
    title: "Contact · Au Bas de l'Aisne",
    description:
      "Contactez la ressourcerie Au Bas de l'Aisne à Château-Thierry — téléphone, réseaux sociaux, horaires et accès.",
    images: [{ url: "/images/devanture.webp", width: 1200, height: 630 }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
