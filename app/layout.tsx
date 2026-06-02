import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import PageTransition from "@/components/ui/PageTransition"
import CookieBanner from "@/components/ui/CookieBanner"
import SpotlightInit from "@/components/ui/SpotlightInit"
import ScrollProgress from "@/components/ui/ScrollProgress"
import JsonLd from "@/components/ui/JsonLd"
import { SITE } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://aubasdelaisne.vercel.app"
  ),
  title: {
    default: `${SITE.fullName}`,
    template: `%s · Au Bas de l'Aisne`,
  },
  description: `${SITE.slogan} — Ressourcerie associative à Château-Thierry (02410), dans l'Aisne. Boutique de seconde main, collecte de dons, insertion professionnelle depuis 2014.`,
  keywords: [
    "ressourcerie", "ressourcerie Château-Thierry", "Aisne", "02410",
    "Château-Thierry", "seconde main", "don objets", "insertion professionnelle",
    "économie circulaire", "brocante solidaire", "meubles occasion",
    "déchetterie alternative", "association Aisne",
  ],
  openGraph: {
    title: SITE.fullName,
    description: `${SITE.slogan} — Ressourcerie associative à Château-Thierry depuis 2014.`,
    url: "/",
    siteName: SITE.name,
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Au Bas de l'Aisne — Ressourcerie à Château-Thierry",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.fullName,
    description: `${SITE.slogan} — Ressourcerie associative à Château-Thierry depuis 2014.`,
    images: ["/images/hero.jpeg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-paper text-ink">
        <JsonLd />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieBanner />
        <SpotlightInit />
      </body>
    </html>
  )
}
