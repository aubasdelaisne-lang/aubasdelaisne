import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import PageTransition from "@/components/ui/PageTransition"
import CookieBanner from "@/components/ui/CookieBanner"
import SpotlightInit from "@/components/ui/SpotlightInit"
import ScrollProgress from "@/components/ui/ScrollProgress"
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
  description: `${SITE.slogan} — Recyclerie-Ressourcerie à Brasles (02410). Boutique de seconde main, dons d'objets, insertion professionnelle.`,
  keywords: ["recyclerie", "ressourcerie", "Aisne", "Brasles", "seconde main", "insertion", "don objets"],
  openGraph: {
    title: SITE.fullName,
    description: `${SITE.slogan} — Recyclerie associative à Brasles depuis 2014.`,
    url: "/",
    siteName: SITE.name,
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Au Bas de l'Aisne — Recyclerie-Ressourcerie à Brasles",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.fullName,
    description: `${SITE.slogan} — Recyclerie associative à Brasles depuis 2014.`,
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
