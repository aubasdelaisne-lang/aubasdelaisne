import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la recyclerie Au Bas de l'Aisne à Brasles. Téléphone, formulaire, accès et horaires. Nous répondons rapidement à vos questions.",
  openGraph: {
    title: "Contact · Au Bas de l'Aisne",
    description:
      "Contactez la recyclerie Au Bas de l'Aisne à Brasles — téléphone, formulaire, horaires et accès.",
    images: [{ url: "/images/boutique-capture.png", width: 1200, height: 630 }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
