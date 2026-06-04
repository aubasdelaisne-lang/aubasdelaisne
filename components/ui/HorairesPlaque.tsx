import Image from "next/image"
import { HOURS_BOUTIQUE } from "@/lib/constants"

/**
 * Plaque "Horaires" façon émail vintage, inspirée de la vraie plaque
 * vissée sur la devanture : fond ivoire, coins dorés, cadre intérieur,
 * titre HORAIRES, séparateur losange, jours/horaires, papillon + nom.
 *
 * Version compacte. Réutilisable partout. Couleurs fixes (ivoire) —
 * elle ressort en clair, y compris posée sur les blocs navy du site.
 */
export default function HorairesPlaque({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative bg-[#f6f1e4] text-[#2c2a33] rounded-[24px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] px-6 py-6 sm:px-8 sm:py-7 max-w-[360px] w-full ${className}`}
    >
      {/* Cadre intérieur ornemental */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-[#2c2a33]/20"
      />

      {/* 4 points dorés dans les coins */}
      {[
        "top-4 left-4",
        "top-4 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute ${pos} w-2 h-2 rounded-full bg-[#d8a32f] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]`}
        />
      ))}

      <div className="relative">
        {/* Titre */}
        <h3 className="text-center font-display font-medium text-2xl sm:text-[1.75rem] tracking-[0.18em] uppercase">
          Horaires
        </h3>

        {/* Séparateur losange */}
        <div aria-hidden className="flex items-center justify-center gap-2.5 mt-2 mb-5">
          <span className="h-px w-10 bg-[#2c2a33]/30" />
          <span className="w-2 h-2 rotate-45 bg-[#d8a32f]" />
          <span className="h-px w-10 bg-[#2c2a33]/30" />
        </div>

        {/* Liste jours / horaires */}
        <dl className="space-y-2">
          {HOURS_BOUTIQUE.map((h) => {
            const ferme = h.creneaux.length === 0
            return (
              <div key={h.days} className="flex items-start justify-between gap-3">
                <dt className="font-display text-[15px] sm:text-base text-[#2c2a33]/90 shrink-0">
                  {h.days}
                </dt>
                <dd className="text-right">
                  {ferme ? (
                    <span className="font-display italic text-[13px] text-[#2c2a33]/55">
                      Fermé
                    </span>
                  ) : (
                    h.creneaux.map((c) => (
                      <span
                        key={c}
                        className="block font-display italic text-[12.5px] sm:text-[13px] tabular-nums text-[#2c2a33]/75 leading-snug whitespace-nowrap"
                      >
                        {c}
                      </span>
                    ))
                  )}
                </dd>
              </div>
            )
          })}
        </dl>

        {/* Pied : papillon + nom */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center">
          <span className="relative w-6 h-6 shrink-0">
            <Image
              src="/images/papillon.jpg"
              alt=""
              fill
              sizes="24px"
              className="object-contain mix-blend-multiply"
            />
          </span>
          <span className="font-display italic text-base text-[#2c2a33] leading-tight">
            Ressourcerie Au bas de l'Aisne
          </span>
        </div>
      </div>
    </div>
  )
}
