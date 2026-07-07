"use client"

import Link from "next/link"
import LegalLayout from "@/components/ui/LegalLayout"
import { SITE } from "@/lib/constants"

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Vie privée" title="Politique de cookies" updatedAt="4 juin 2026">
      <p>
        Cette page explique de façon simple et transparente ce que fait (et ne fait pas) le
        bandeau que vous avez peut-être vu en arrivant sur ce site.
      </p>

      <h2>Ce site n'utilise pas de cookies de mesure d'audience ou de publicité</h2>
      <p>
        Aucun cookie de suivi publicitaire, de profilage ou de mesure d'audience (type Google
        Analytics) n'est déposé par ce site. Les polices utilisées sur le site sont hébergées
        directement par nos soins, sans aucune requête vers Google.
      </p>

      <h2>Le bandeau que vous voyez</h2>
      <p>
        À votre première visite, un bandeau vous informe de cette politique et vous propose
        d'« accepter » ou de « refuser ». Votre choix est enregistré dans la mémoire locale de
        votre navigateur (le « localStorage »), pour une durée de <strong>6 mois</strong> — passé
        ce délai, nous vous redemanderons votre choix. Cette information reste sur votre appareil
        et n'est jamais transmise à l'association ni à un tiers.
      </p>

      <h2>La carte de la page Contact ne s'affiche qu'avec votre accord</h2>
      <p>
        La page Contact propose une carte fournie par le service tiers <strong>OpenStreetMap</strong>.
        Ce contenu n'est chargé qu'après votre accord explicite : tant que vous n'avez pas cliqué
        sur « Accepter » (dans le bandeau) ou sur « Afficher la carte » (directement sous
        l'emplacement de la carte), aucune requête n'est envoyée à OpenStreetMap et aucun cookie
        de ce service ne peut être déposé. Un lien alternatif vers Google Maps reste disponible à
        tout moment, sans dépôt de cookie.
      </p>

      <h2>Cookies techniques indispensables</h2>
      <p>
        Notre hébergeur, <strong>Vercel</strong>, peut utiliser des cookies techniques strictement
        nécessaires au fonctionnement et à la sécurité du site (anti-fraude, répartition de
        charge). Ces cookies techniques ne requièrent pas votre consentement au sens de la
        réglementation en vigueur.
      </p>

      <h2>Liens vers des réseaux sociaux</h2>
      <p>
        Les liens vers Facebook, Instagram et Google Maps vous redirigent vers des sites tiers.
        Une fois sur ces plateformes, ce sont leurs propres politiques de cookies qui
        s'appliquent — nous n'avons aucun contrôle sur celles-ci.
      </p>

      <h2>Comment changer d'avis</h2>
      <p>
        Vous pouvez revenir sur votre choix à tout moment, aussi simplement que vous l'avez
        donné : cliquez sur <strong>« Gérer les cookies »</strong> en bas de n'importe quelle page
        du site pour rouvrir le bandeau et faire un nouveau choix.
      </p>

      <p>
        Pour en savoir plus sur les données que nous traitons, consultez notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Pour toute question,
        contactez-nous au {SITE.phone}.
      </p>
    </LegalLayout>
  )
}
