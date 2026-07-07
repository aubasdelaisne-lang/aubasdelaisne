"use client"

import Link from "next/link"
import LegalLayout from "@/components/ui/LegalLayout"
import { SITE } from "@/lib/constants"

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Vie privée"
      title="Politique de confidentialité"
      updatedAt="4 juin 2026"
    >
      <p>
        L'association « {SITE.name} » attache de l'importance à la protection de vos données
        personnelles. Cette page explique quelles données sont traitées lors de votre visite sur
        ce site, et dans quel but.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est l'association « {SITE.fullName} »,{" "}
        {SITE.address}, représentée par son{" "}
        <span className="legal-fill">[président / présidente]</span>.
      </p>

      <h2>Le site ne collecte aucune donnée via un formulaire</h2>
      <p>
        Ce site ne comporte aucun formulaire de contact ni de collecte de données (nom, email,
        téléphone). Pour toute demande, vous êtes invité à nous appeler ou à nous écrire via nos
        réseaux sociaux — vos coordonnées ne transitent donc pas par le site.
      </p>

      <h2>Données techniques collectées automatiquement</h2>
      <p>
        Comme tout site web, l'hébergeur du site (Vercel Inc.) collecte automatiquement certaines
        données techniques nécessaires au bon fonctionnement et à la sécurité du service :
      </p>
      <ul>
        <li>Adresse IP</li>
        <li>Type de navigateur et d'appareil</li>
        <li>Pages consultées et date de visite</li>
      </ul>
      <p>
        Ces données sont traitées sur la base de l'intérêt légitime de l'association à assurer la
        sécurité et le bon fonctionnement du site. Elles ne sont ni utilisées à des fins
        commerciales, ni revendues, et sont conservées pour une durée limitée par notre
        hébergeur.
      </p>
      <p>
        <strong>Aucun outil de mesure d'audience (Google Analytics ou équivalent) n'est
        utilisé sur ce site.</strong>
      </p>

      <h2>Choix mémorisé du bandeau cookies</h2>
      <p>
        Lors de votre première visite, un bandeau vous informe de cette politique. Votre choix
        (accepté / refusé) est mémorisé localement dans votre navigateur pendant 6 mois, puis
        vous sera de nouveau demandé. Vous pouvez à tout moment revenir sur ce choix via le lien
        « Gérer les cookies » en bas de page. Voir notre{" "}
        <Link href="/cookies">politique de cookies</Link> pour plus de détails.
      </p>

      <h2>Services tiers intégrés au site</h2>
      <p>
        La page Contact propose une carte fournie par <strong>OpenStreetMap</strong>. Par
        précaution, cette carte n'est chargée qu'après votre accord explicite (bandeau cookies ou
        bouton dédié) afin d'éviter tout dépôt de cookie tiers sans consentement. Des liens
        renvoient également vers Facebook, Instagram et Google Maps. Si vous cliquez sur ces
        liens, vous quittez notre site et les conditions de confidentialité de ces plateformes
        s'appliquent — nous vous invitons à les consulter.
      </p>

      <h2>Hébergement et transfert de données</h2>
      <p>
        Le site est hébergé par Vercel Inc., société basée aux États-Unis. Ce prestataire peut
        traiter certaines données techniques en dehors de l'Union européenne, dans le cadre de
        garanties contractuelles appropriées (clauses contractuelles types de la Commission
        européenne).
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
        Informatique et Libertés, vous disposez d'un droit d'accès, de rectification,
        d'effacement, d'opposition et de limitation concernant vos données. Pour exercer ces
        droits, contactez-nous :
      </p>
      <ul>
        <li>Par téléphone : {SITE.phone}</li>
        <li>En vous rendant à la boutique : {SITE.address}</li>
      </ul>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale
        de l'Informatique et des Libertés) — {" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>
    </LegalLayout>
  )
}
