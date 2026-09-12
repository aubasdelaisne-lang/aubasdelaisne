import type { Metadata } from "next"
import { SITE } from "@/lib/constants"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

export const metadata: Metadata = {
  title: "Débarras Succession Château-Thierry – Vider une maison après décès",
  description:
    "Vous devez vider la maison d'un proche après un décès ? L'équipe Au Bas de l'Aisne intervient à Château-Thierry avec respect et discrétion. Devis gratuit, sans engagement · 03 64 13 48 64.",
  alternates: { canonical: `${BASE_URL}/debarras/succession` },
  keywords: [
    "débarras succession château-thierry",
    "vider maison après décès aisne",
    "vide maison succession aisne",
    "débarras héritage château-thierry",
    "vider appartement décès aisne",
    "liquidation succession aisne",
  ],
  openGraph: {
    title: "Débarras Succession à Château-Thierry | Au Bas de l'Aisne",
    description:
      "On vide la maison d'un proche avec respect, pendant que vous vous occupez de l'essentiel. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras/succession`,
    type: "website",
    siteName: "Au Bas de l'Aisne – Ressourcerie",
  },
}

function SuccessionJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: "Au Bas de l'Aisne – Débarras Succession Château-Thierry",
    description:
      "Service de débarras succession à Château-Thierry : vider la maison d'un proche après un décès, avec respect et discrétion. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras/succession`,
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
      name: "Débarras succession",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Débarras succession maison",
            description:
              "Vider intégralement une maison ou un appartement après un décès. Meubles, vêtements, vaisselle, archives, cave et grenier inclus. Tri et valorisation solidaire.",
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
      { "@type": "ListItem", position: 3, name: "Succession", item: `${BASE_URL}/debarras/succession` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

export default function SuccessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SuccessionJsonLd />
      {children}
    </>
  )
}
