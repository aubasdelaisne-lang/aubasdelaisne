import Image from "next/image"
import { HOURS_BOUTIQUE, SITE } from "@/lib/constants"

/**
 * Plaque "Horaires" façon émail vintage, inspirée de la vraie plaque
 * vissée sur la devanture : fond ivoire, coins dorés, cadre intérieur,
 * titre HORAIRES, séparateur losange, jours/horaires, papillon + nom, téléphone.
 *
 * Réutilisable partout. Couleurs fixes (ivoire) — elle ressort en clair,
 * y compris posée sur les blocs navy du site.
 */
export default function HorairesPlaque({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative bg-[#f6f1e4] text-[#2c2a33] rounded-[28px] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] px-7 py-8 sm:px-9 sm:py-10 max-w-sm w-full ${className}`}
    >
      {/* Cadre intérieur ornemental */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[20px] border border-[#2c2a33]/20"
      />

      {/* 4 points dorés dans les coins */}
      {[
        "top-5 left-5",
        "top-5 right-5",
        "bottom-5 left-5",
        "bottom-5 right-5",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-[#d8a32f] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]`}
        />
      ))}

      <div className="relative">
        {/* Titre */}
        <h3 className="text-center font-display font-medium text-3xl sm:text-4xl tracking-[0.18em] uppercase">
          Horaires
        </h3>

        {/* Séparateur losange */}
        <div aria-hidden className="flex items-center justify-center gap-3 mt-3 mb-7">
          <span className="h-px w-12 bg-[#2c2a33]/30" />
          <span className="w-2.5 h-2.5 rotate-45 bg-[#d8a32f]" />
          <span className="h-px w-12 bg-[#2c2a33]/30" />
        </div>

        {/* Liste jours / horaires */}
        <dl className="space-y-3.5">
          {HOURS_BOUTIQUE.map((h) => {
            const ferme = h.creneaux.length === 0
            return (
              <div key={h.days} className="flex items-start justify-between gap-4">
                <dt className="font-display text-lg sm:text-xl text-[#2c2a33]/90 leading-none pt-0.5">
                  {h.days}
                </dt>
                <dd className="text-right">
                  {ferme ? (
                    <span className="font-display italic text-[14px] text-[#2c2a33]/55">
                      Fermé
                    </span>
                  ) : (
                    h.creneaux.map((c) => (
                      <div
                        key={c}
                        className="font-display italic text-[14px] sm:text-[15px] tabular-nums text-[#2c2a33]/75 leading-tight"
                      >
                        {c}
                      </div>
                    ))
                  )}
                </dd>
              </div>
            )
          })}
        </dl>

        {/* Pied : papillon + nom cursif */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="relative w-7 h-7 shrink-0">
              <Image
                src="/images/papillon.jpg"
                alt=""
                fill
                sizes="28px"
                className="object-contain mix-blend-multiply"
              />
            </span>
            <span className="font-display italic text-xl text-[#2c2a33]">
              Ressourcerie
            </span>
          </div>
          <div className="font-display italic text-lg text-[#2c2a33] -mt-0.5">
            Au bas de l'Aisne
          </div>

          {/* Téléphone */}
          <a
            href={SITE.phoneHref}
            className="mt-3 font-display font-bold text-2xl sm:text-[1.65rem] tracking-[0.12em] tabular-nums text-[#2c2a33] hover:text-terracotta transition-colors"
          >
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
