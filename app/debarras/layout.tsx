import type { Metadata } from "next"
import { SITE } from "@/lib/constants"
import { FAQS } from "./faq-data"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

export const metadata: Metadata = {
  title: "Débarras à Château-Thierry",
  description:
    "Service de débarras à Château-Thierry et dans l'Aisne : vidage de grenier, cave, appartement, succession. On collecte, on trie, on valorise. Devis gratuit au 03 64 13 48 64.",
  alternates: { canonical: "/debarras" },
  openGraph: {
    title: "Débarras à Château-Thierry · Au Bas de l'Aisne",
    description:
      "Vidage de grenier, cave, appartement ou succession à Château-Thierry. On vient collecter vos encombrants et leur donnons une seconde vie. Appelez-nous.",
    url: "/debarras",
  },
}

/** Schema.org : le service de débarras + FAQ, pour les résultats enrichis Google. */
function DebarrasJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Débarras de maison et d'appartement",
    name: "Débarras à Château-Thierry",
    description:
      "Service de débarras solidaire : déménagement, succession, grenier, cave. Collecte à domicile, tri et valorisation des objets.",
    url: `${BASE_URL}/debarras`,
    telephone: SITE.phone,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "22 avenue de l'Europe",
        addressLocality: "Château-Thierry",
        postalCode: "02400",
        addressCountry: "FR",
      },
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.0515, longitude: 3.4199 },
      geoRadius: "30000",
    },
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
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
