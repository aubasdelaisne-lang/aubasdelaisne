"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { SITE } from "@/lib/constants"

const links = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/donner", label: "Donner" },
  { href: "/mission", label: "Mission" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 24))
    return unsub
  }, [scrollY])

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/95 backdrop-blur-md border-b border-rule/50" : "bg-paper"
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative w-11 h-11 rounded-full overflow-hidden bg-white ring-2 ring-ink/10 shadow-sm"
          >
            <Image
              src="/images/papillon.jpg"
              alt="Au Bas de l'Aisne"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="leading-[1.1]">
            <div className="font-display font-semibold text-[15px] md:text-base text-sage-deep">
              Au Bas de l'Aisne
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-semibold">
              Recyclerie · Brasles
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative group px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                <span className={active ? "text-sage-deep" : "text-ink-soft group-hover:text-ink"}>
                  {l.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-terracotta"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <a
          href={SITE.phoneHref}
          className="hidden md:inline-flex items-center gap-2 bg-sage text-paper px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase font-bold hover:bg-sage-deep transition-colors rounded-full"
        >
          <Phone size={12} strokeWidth={2} />
          {SITE.phone}
        </a>

        {/* Mobile burger */}
        <button
          aria-label="Menu"
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper border-t border-rule/50 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 border-b border-rule/40 text-[14px] font-semibold uppercase tracking-[0.14em] ${
                    pathname === l.href ? "text-sage-deep" : "text-ink-soft"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={SITE.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 bg-sage text-paper px-4 py-3 text-[13px] tracking-[0.2em] uppercase font-bold rounded-full"
              >
                <Phone size={13} strokeWidth={2} />
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
