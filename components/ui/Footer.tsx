import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone } from "lucide-react"
import { SITE, HOURS_BOUTIQUE } from "@/lib/constants"

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-sage paper-texture text-paper overflow-hidden">
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white ring-2 ring-paper/20 shadow-sm">
                <Image
                  src="/images/papillon.jpg"
                  alt="Au Bas de l'Aisne"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="font-display font-semibold text-lg">Au Bas de l'Aisne</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-paper/70 font-semibold">
                  Recyclerie
                </div>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-paper/80 max-w-xs">
              {SITE.slogan}.
            </p>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-paper/90 hover:text-paper border-b border-paper/30 pb-1 transition-colors"
            >
              <FacebookIcon size={13} />
              Facebook
            </a>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-paper/70 font-semibold mb-4">
              Navigation
            </div>
            <div className="space-y-2.5">
              {[
                ["Accueil", "/"],
                ["Boutique", "/boutique"],
                ["Donner", "/donner"],
                ["Mission", "/mission"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-[14px] text-paper/85 hover:text-paper transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-paper/70 font-semibold mb-4">
              Horaires boutique
            </div>
            <div className="space-y-2">
              {HOURS_BOUTIQUE.map((h, i) => (
                <div key={i} className="flex justify-between text-[13px] pb-2 border-b border-paper/15 last:border-0">
                  <span className="text-paper/75">{h.days}</span>
                  <span
                    className={`tabular-nums ${
                      h.hours === "Fermé" ? "text-terracotta-soft italic" : "text-paper font-medium"
                    }`}
                  >
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-paper/70 font-semibold mb-4">
              Contact
            </div>
            <div className="flex items-start gap-2 text-[13px] text-paper/85 mb-3">
              <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta-soft" />
              <span>{SITE.address}</span>
            </div>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-[13px] text-paper/85 hover:text-paper transition-colors"
            >
              <Phone size={14} strokeWidth={1.5} className="text-terracotta-soft shrink-0" />
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracking-[0.18em] text-paper/60">
          <div>© {new Date().getFullYear()} {SITE.fullName}</div>
          <div>SIRET · {SITE.siret}</div>
          <div>Fondée le {SITE.founded}</div>
        </div>
      </div>
    </footer>
  )
}
