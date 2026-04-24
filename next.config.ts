import type { NextConfig } from "next"

const securityHeaders = [
  // Empêche le navigateur de deviner le type MIME
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Interdit l'intégration dans une iframe externe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Politique de référent : n'envoie l'URL complète qu'aux requêtes same-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive les fonctionnalités sensibles du navigateur
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Force HTTPS pendant 1 an (HSTS) — actif seulement sur Vercel (HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content-Security-Policy : limite les sources de contenu autorisées
  // 'unsafe-inline' nécessaire pour Next.js (hydration + Tailwind CSS-in-JS)
  // frame-src openstreetmap.org pour la carte de contact
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "frame-src https://www.openstreetmap.org",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applique les headers à toutes les routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },

  // Restriction des domaines autorisés pour next/image (images locales uniquement pour l'instant)
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
