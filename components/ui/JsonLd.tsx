import { SITE } from "@/lib/constants"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://aubasdelaisne.vercel.app"

/**
 * Données structurées Schema.org pour Google.
 * Permet à Google d'afficher l'adresse, les horaires et le téléphone
 * directement dans les résultats de recherche (Knowledge Panel).
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Store", "Organization"],
    name: SITE.name,
    alternateName: SITE.fullName,
    description: `${SITE.slogan}. Ressourcerie associative à Château-Thierry depuis 2014. Boutique de seconde main, dons d'objets et insertion professionnelle.`,
    url: BASE_URL,
    logo: `${BASE_URL}/images/papillon.jpg`,
    image: `${BASE_URL}/images/hero.jpeg`,
    telephone: SITE.phone,
    foundingDate: "2014-01-16",
    address: {
      "@type": "PostalAddress",
      streetAddress: "22 avenue de l'Europe",
      addressLocality: "Château-Thierry",
      postalCode: "02410",
      addressRegion: "Hauts-de-France",
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
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "13:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:30",
        closes: "12:00",
      },
    ],
    sameAs: [SITE.facebook],
    priceRange: "€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Card",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.0515,
        longitude: 3.4199,
      },
      geoRadius: "30000",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
