import type { Metadata } from "next"
import { SITE } from "@/lib/constants"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

export const metadata: Metadata = {
  title: "Débarras Déménagement Château-Thierry – Vider un Logement | Au Bas de l'Aisne",
  description:
    "Vous déménagez et ne pouvez pas tout emporter ? On vient vider ce qui reste de votre logement à Château-Thierry et dans l'Aisne. Devis gratuit · 03 64 13 48 64.",
  alternates: { canonical: `${BASE_URL}/debarras/demenagement` },
  keywords: [
    "débarras déménagement château-thierry",
    "vide maison château-thierry",
    "vider appartement château-thierry",
    "déménagement encombrants aisne",
    "encombrants déménagement aisne 02",
    "vider logement château-thierry",
  ],
  openGraph: {
    title: "Débarras Déménagement à Château-Thierry | Au Bas de l'Aisne",
    description:
      "Vous partez et ne pouvez pas tout emporter ? On vide ce qui reste avant votre départ. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras/demenagement`,
    type: "website",
    siteName: "Au Bas de l'Aisne – Ressourcerie",
  },
}

function DemenagementJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: "Au Bas de l'Aisne – Débarras Déménagement Château-Thierry",
    description:
      "Service de débarras avant ou après déménagement à Château-Thierry : on vide ce qui reste du logement, meubles, électroménager et encombrants inclus. Tri et valorisation solidaire.",
    url: `${BASE_URL}/debarras/demenagement`,
    telephone: "+33364134864",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "22 avenue de l'Europe",
      addressLocality: "Château-Thierry",
      postalCode: "02400",
      addressRegion: "Aisne",
      addressCountry: "FR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Débarras déménagement",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vider un logement avant déménagement",
            description:
              "Évacuation de tout ce qui reste dans un logement avant ou après un déménagement : meubles, électroménager, cartons, vêtements. Devis gratuit sur place.",
          },
        },
      ],
    },
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Débarras", item: `${BASE_URL}/debarras` },
      { "@type": "ListItem", position: 3, name: "Déménagement", item: `${BASE_URL}/debarras/demenagement` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

export default function DemenagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemenagementJsonLd />
      {children}
    </>
  )
}
