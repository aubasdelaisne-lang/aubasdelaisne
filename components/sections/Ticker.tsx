"use client"

import { Leaf, HeartHandshake, Recycle, Users, Sparkles, MapPin } from "lucide-react"
import Marquee from "@/components/ui/Marquee"

const items = [
  { Icon: Recycle, label: "Donner une seconde vie" },
  { Icon: Leaf, label: "Éco-responsable" },
  { Icon: HeartHandshake, label: "Insertion professionnelle" },
  { Icon: Users, label: "Ancrage local" },
  { Icon: Sparkles, label: "Objets chinés" },
  { Icon: MapPin, label: "Château-Thierry · 02400" },
]

export default function Ticker() {
  return (
    <section className="relative py-6 border-y-2 border-ink/10 bg-paper overflow-hidden">
      <Marquee
        duration={45}
        items={items.map(({ Icon, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sage-deep font-display text-xl md:text-2xl"
          >
            <Icon size={18} strokeWidth={1.6} className="text-terracotta" />
            {label}
            <span className="mx-6 text-terracotta/50">✦</span>
          </span>
        ))}
      />
    </section>
  )
}
