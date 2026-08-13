import type { Metadata } from "next"
import { SITE } from "@/lib/constants"
import { FAQS } from "./faq-data"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

/* ── Métadonnées ──────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Débarras Château-Thierry – Succession, Grenier, Cave, Déménagement",
  description:
    "Débarras à Château-Thierry et dans l'Aisne : succession, vide grenier, cave, déménagement. On vient, on emporte tout, on valorise en boutique solidaire. Devis gratuit · 03 64 13 48 64.",
  alternates: { canonical: `${BASE_URL}/debarras` },
  keywords: [
    "débarras château-thierry",
    "vide maison château-thierry",
    "débarras aisne",
    "vide grenier aisne 02",
    "débarras succession château-thierry",
    "encombrants château-thierry",
    "débarras charly-sur-marne",
    "ressourcerie débarras",
  ],
  openGraph: {
    title: "Débarras à Château-Thierry | Au Bas de l'Aisne",
    description:
      "Succession, grenier, déménagement : on vient vider votre logement dans l'Aisne. Tri et valorisation solidaire inclus. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras`,
    type: "website",
    siteName: "Au Bas de l'Aisne – Ressourcerie",
  },
}

/* ── Schema.org JSON-LD ───────────────────────────────────── */

function DebarrasJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: "Au Bas de l'Aisne – Débarras Château-Thierry",
    description:
      "Service de débarras solidaire à Château-Thierry : succession, grenier, cave, déménagement, avant travaux. On collecte vos encombrants, on trie et on valorise en boutique. Devis gratuit sur place.",
    url: `${BASE_URL}/debarras`,
    telephone: "+33364134864",
    email: SITE.email,
    image: `${BASE_URL}/opengraph-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "22 avenue de l'Europe",
      addressLocality: "Château-Thierry",
      postalCode: "02400",
      addressRegion: "Aisne",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.0515,
      longitude: 3.4199,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "€€",
    areaServed: [
      { "@type": "City", "name": "Château-Thierry" },
      { "@type": "City", "name": "Charly-sur-Marne" },
      { "@type": "City", "name": "Dormans" },
      { "@type": "City", "name": "Fère-en-Tardenois" },
      { "@type": "City", "name": "Condé-en-Brie" },
      { "@type": "City", "name": "Brasles" },
      { "@type": "AdministrativeArea", "name": "Aisne" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de débarras",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Débarras succession",
            description:
              "Vider la maison d'un proche après un décès, avec respect et discrétion, pendant que vous gardez l'esprit à l'essentiel.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Débarras déménagement",
            description:
              "Vider ce qui reste d'un logement avant un départ : meubles, électroménager, cartons.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vide grenier et cave",
            description:
              "Évacuation des encombrants accumulés dans les combles, caves et dépendances.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Débarras avant travaux",
            description:
              "Libérer un logement avant une rénovation ou des travaux.",
          },
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Débarras",
        item: `${BASE_URL}/debarras`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

export default function DebarrasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DebarrasJsonLd />
      {children}
    </>
  )
}
