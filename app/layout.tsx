import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import { SITE } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName}`,
    template: `%s · Au Bas de l'Aisne`,
  },
  description: `${SITE.slogan} — Recyclerie-Ressourcerie à Brasles (02410). Boutique de seconde main, dons d'objets, insertion professionnelle.`,
  keywords: ["recyclerie", "ressourcerie", "Aisne", "Brasles", "seconde main", "insertion"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
