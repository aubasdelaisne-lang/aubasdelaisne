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
        Analytics) n'est déposé par ce site. Nous n'avons pas besoin de votre consentement pour
        des traceurs qui n'existent pas.
      </p>

      <h2>Le bandeau que vous voyez</h2>
      <p>
        À votre première visite, un bandeau vous informe de cette politique et vous propose
        d'« accepter » ou de « refuser ». Votre choix n'active ni ne désactive aucun traceur
        publicitaire : il est simplement <strong>enregistré dans la mémoire locale de votre
        navigateur</strong> (le « localStorage »), afin de ne plus vous réafficher ce message à
        chaque visite. Cette information reste sur votre appareil et n'est jamais transmise à
        l'association ni à un tiers.
      </p>

      <h2>Cookies techniques de nos prestataires</h2>
      <p>
        Certains services intégrés au site peuvent déposer leurs propres cookies techniques,
        indépendamment de notre volonté :
      </p>
      <ul>
        <li>
          <strong>OpenStreetMap</strong> (carte affichée sur la page Contact) peut utiliser des
          cookies techniques nécessaires à l'affichage de la carte.
        </li>
        <li>
          <strong>Vercel</strong>, notre hébergeur, peut utiliser des cookies techniques
          indispensables au fonctionnement et à la sécurité du site (anti-fraude, répartition de
          charge).
        </li>
      </ul>
      <p>
        Ces cookies techniques sont nécessaires au fonctionnement du site et ne requièrent pas
        votre consentement au sens de la réglementation en vigueur.
      </p>

      <h2>Liens vers des réseaux sociaux</h2>
      <p>
        Les liens vers Facebook, Instagram et Google Maps vous redirigent vers des sites tiers.
        Une fois sur ces plateformes, ce sont leurs propres politiques de cookies qui
        s'appliquent — nous n'avons aucun contrôle sur celles-ci.
      </p>

      <h2>Comment effacer ce choix</h2>
      <p>
        Vous pouvez à tout moment effacer les données de navigation de votre navigateur (menu
        « Effacer les données de navigation » / « Vider le cache ») pour réinitialiser le
        message d'information et faire un nouveau choix.
      </p>

      <p>
        Pour en savoir plus sur les données que nous traitons, consultez notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Pour toute question,
        contactez-nous au {SITE.phone}.
      </p>
    </LegalLayout>
  )
}
