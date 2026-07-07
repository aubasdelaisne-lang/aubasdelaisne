"use client"

import LegalLayout from "@/components/ui/LegalLayout"
import { SITE } from "@/lib/constants"

export default function MentionsLegalesPage() {
  return (
    <LegalLayout eyebrow="Informations légales" title="Mentions légales" updatedAt="4 juin 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>{SITE.fullName}</strong> est édité par l'association{" "}
        <strong>{SITE.fullName}</strong>, association loi 1901 déclarée auprès de la{" "}
        {SITE.registration}, fondée le {SITE.founded}.
      </p>
      <ul>
        <li>Siège / boutique : {SITE.address}</li>
        <li>Boutique secondaire : {SITE.addressSecondary}</li>
        <li>Téléphone : {SITE.phone}</li>
        <li>SIRET : {SITE.siret}</li>
        <li>
          Représentant légal (directeur de la publication) :{" "}
          <span className="legal-fill">[Nom du président / de la présidente]</span>
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut,
        CA 91789, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>
      <p>
        Le nom de domaine est déposé auprès de{" "}
        <span className="legal-fill">[registraire du nom de domaine, ex. OVHcloud]</span>, dont
        l'association « {SITE.name} » est titulaire.
      </p>

      <h2>Conception et développement</h2>
      <p>
        Conception graphique et développement : Damien Maupetit, entrepreneur individuel.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, photographies, logo, charte
        graphique) est la propriété de l'association « {SITE.name} », sauf mention contraire.
        Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
        préalable est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        L'association s'efforce d'assurer l'exactitude et la mise à jour des informations
        diffusées sur ce site, mais ne peut garantir l'exhaustivité des informations. Elle ne
        pourra être tenue responsable des erreurs, omissions ou de l'indisponibilité temporaire
        du site.
      </p>

      <h2>Liens externes</h2>
      <p>
        Le site contient des liens vers des services tiers (Facebook, Instagram, OpenStreetMap,
        Google Maps). L'association n'exerce aucun contrôle sur ces sites et n'assume aucune
        responsabilité quant à leur contenu ou à leurs pratiques en matière de données
        personnelles.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter
        par téléphone au {SITE.phone} ou vous rendre à la boutique : {SITE.address}.
      </p>
    </LegalLayout>
  )
}
