const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ressourcerie-aubasdelaisne.fr"

export default function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name, item: `${BASE_URL}${path}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
