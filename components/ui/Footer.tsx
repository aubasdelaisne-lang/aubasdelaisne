"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone } from "lucide-react"
import { SITE } from "@/lib/constants"

const ease = [0.22, 1, 0.36, 1] as const

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const navLinks = [
  ["Accueil", "/"],
  ["Boutique", "/boutique"],
  ["Donner", "/donner"],
  ["Mission", "/mission"],
  ["Contact", "/contact"],
] as const

export default function Footer() {
  return (
    <footer className="relative bg-sage paper-texture text-paper overflow-hidden">
      {/* Trait terracotta en haut */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        className="h-0.5 bg-terracotta origin-left"
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0, ease }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative w-11 h-11 rounded-full overflow-hidden bg-white ring-2 ring-paper/20 shadow-sm"
              >
                <Image
                  src="/images/papillon.jpg"
                  alt="Au Bas de l'Aisne"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </motion.div>
              <div className="leading-tight">
                <div className="font-display font-semibold text-lg">Au Bas de l'Aisne</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-paper/70 font-semibold">
                  Ressourcerie
                </div>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-paper/80 max-w-xs">
              Réinsérer, relier, réduire…
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <motion.a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-paper/90 hover:text-paper border-b border-paper/30 pb-1 transition-colors w-fit"
              >
                <FacebookIcon size={13} />
                Facebook
              </motion.a>
              <motion.a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-paper/90 hover:text-paper border-b border-paper/30 pb-1 transition-colors w-fit"
              >
                <InstagramIcon size={13} />
                Instagram
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-paper/70 font-semibold mb-4">
              Navigation
            </div>
            <div className="space-y-2.5">
              {navLinks.map(([label, href]) => (
                <motion.div
                  key={href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={href}
                    className="block text-[14px] text-paper/85 hover:text-paper transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-paper/70 font-semibold mb-4">
              Contact
            </div>
            <div className="flex items-start gap-2 text-[13px] text-paper/85 mb-3">
              <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta-soft" />
              <span>{SITE.address}</span>
            </div>
            <div className="flex items-start gap-2 text-[13px] text-paper/85 mb-3">
              <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta-soft" />
              <span>{SITE.addressSecondary}</span>
            </div>
            <motion.a
              href={SITE.phoneHref}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 text-[13px] text-paper/85 hover:text-paper transition-colors"
            >
              <Phone size={14} strokeWidth={1.5} className="text-terracotta-soft shrink-0" />
              {SITE.phone}
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 pt-6 border-t border-paper/15 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracking-[0.18em] text-paper/60"
        >
          <div>© {new Date().getFullYear()} {SITE.fullName}</div>
          <div>SIRET · {SITE.siret}</div>
          <div>Fondée le {SITE.founded}</div>
        </motion.div>
      </div>
    </footer>
  )
}
