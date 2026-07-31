import Fauteuil from "@/components/illustrations/Fauteuil"
import Camion from "@/components/illustrations/Camion"

export const metadata = { robots: { index: false, follow: false } }

/** Page temporaire de validation du style des illustrations.
 *  Supprimée en fin de chantier (Task 9). */
export default function DevIllustrations() {
  return (
    <main className="min-h-screen bg-paper px-8 pt-24 pb-8">
      <div className="flex flex-wrap items-start gap-6">
        <section>
          <h2 className="font-display text-sage-deep text-sm mb-2">
            Fauteuil — ravivé / abîmé / petit
          </h2>
          <div className="flex items-end gap-4 flex-wrap">
            <Fauteuil state="ravive" className="w-44" />
            <Fauteuil state="abime" className="w-44" />
            <Fauteuil state="ravive" className="w-16" />
          </div>
        </section>
        <section>
          <h2 className="font-display text-sage-deep text-sm mb-2">Camion</h2>
          <Camion className="w-72" />
        </section>
      </div>
      <section className="mt-6 bg-sage p-8 rounded-2xl">
        <h2 className="font-display text-paper text-sm mb-3">Sur fond sombre</h2>
        <div className="flex items-end gap-6 flex-wrap">
          <Fauteuil state="ravive" className="w-44" />
          <Camion className="w-72" />
        </div>
      </section>
    </main>
  )
}
