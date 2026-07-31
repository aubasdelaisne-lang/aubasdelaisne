import Fauteuil from "@/components/illustrations/Fauteuil"
import Camion from "@/components/illustrations/Camion"
import Caisse from "@/components/illustrations/Caisse"
import Theiere from "@/components/illustrations/Theiere"
import Livres from "@/components/illustrations/Livres"
import Papillon from "@/components/illustrations/Papillon"
import Main from "@/components/illustrations/Main"
import Atelier from "@/components/illustrations/Atelier"
import Etagere from "@/components/illustrations/Etagere"
import Etiquette from "@/components/illustrations/Etiquette"
import Salon from "@/components/illustrations/Salon"

export const metadata = { robots: { index: false, follow: false } }

/** Page temporaire de validation du style des illustrations.
 *  Supprimée en fin de chantier (Task 9). */
export default function DevIllustrations() {
  return (
    <main className="min-h-screen bg-paper px-8 pt-24 pb-8">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <Fauteuil state="ravive" className="w-36" />
        <Fauteuil state="abime" className="w-36" />
        <Camion className="w-56" />
        <Caisse className="w-48" />
        <Theiere className="w-32" />
        <Livres className="w-32" />
        <Papillon flap className="w-40" />
        <Main className="w-32" />
        <Atelier className="w-48" />
        <Etagere className="w-44" />
        <Etiquette className="w-20" />
        <Salon className="w-72" />
      </div>
      <section className="mt-4 bg-sage p-6 rounded-2xl flex flex-wrap items-end gap-6">
        <Caisse className="w-48" />
        <Papillon flap className="w-40" />
        <Salon className="w-72" />
        <Etiquette className="w-20" />
      </section>
    </main>
  )
}
