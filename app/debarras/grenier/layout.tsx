import type { Metadata } from "next"
import { SITE } from "@/lib/constants"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

export const metadata: Metadata = {
  title: "Vider Grenier Château-Thierry – Débarras Cave et Combles | Au Bas de l'Aisne",
  description:
    "Grenier plein ou cave encombrée à Château-Thierry ? On vient tout vider, trier et valoriser dans l'Aisne. Devis gratuit, sans engagement · 03 64 13 48 64.",
  alternates: { canonical: `${BASE_URL}/debarras/grenier` },
  keywords: [
    "vider grenier château-thierry",
    "débarras cave aisne",
    "vide grenier château-thierry",
    "encombrants château-thierry",
    "vider combles aisne",
    "débarras cave grenier aisne 02",
  ],
  openGraph: {
    title: "Vider Grenier & Cave à Château-Thierry | Au Bas de l'Aisne",
    description:
      "Des années d'accumulation dans vos combles ou cave ? On vient tout évacuer et valoriser. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras/grenier`,
    type: "website",
    siteName: "Au Bas de l'Aisne – Ressourcerie",
  },
}

function GrenierJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: "Au Bas de l'Aisne – Vider Grenier Cave Château-Thierry",
    description:
      "Service de débarras grenier et cave à Château-Thierry : on évacue les encombrants accumulés dans vos combles, dépendances et sous-sol. Tri et valorisation solidaire inclus.",
    url: `${BASE_URL}/debarras/grenier`,
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
      name: "Vider grenier et cave",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Débarras grenier et combles",
            description:
              "Évacuation complète des greniers, combles, caves et dépendances : vieux meubles, cartons, électroménager, outils, vêtements. Tri et valorisation en boutique solidaire.",
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
      { "@type": "ListItem", position: 3, name: "Grenier & cave", item: `${BASE_URL}/debarras/grenier` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

export default function GrenierLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GrenierJsonLd />
      {children}
    </>
  )
}
