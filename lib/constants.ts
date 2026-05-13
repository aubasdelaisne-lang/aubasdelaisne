export const SITE = {
  name: "Au Bas de l'Aisne",
  fullName: "Recyclerie-Ressourcerie Au Bas de l'Aisne",
  slogan: "Réinsérer, relier, réduire…",
  address: "22 avenue de l'Europe, 02410 Château-Thierry",
  addressSecondary: "8 avenue de Château-Thierry, 02410 Brasles",
  phone: "03 64 13 48 64",
  phoneHref: "tel:+33364134864",
  facebook: "https://www.facebook.com/aubasdelaisne",
  // TODO: remplacer "#" par l'URL Instagram définitive dès confirmation client
  instagram: "https://www.instagram.com/ressourcerie_aubasdelaisne/",
  siret: "800 130 494 000 27",
  founded: "16 janvier 2014",
  registration: "Sous-préfecture de Château-Thierry (N° W021001352)",
}

export const HOURS_BOUTIQUE = [
  { days: "Lundi", hours: "Fermé" },
  { days: "Mardi", hours: "TODO" }, // TODO: compléter les horaires
  { days: "Mercredi", hours: "TODO" }, // TODO: compléter les horaires
  { days: "Jeudi", hours: "TODO" }, // TODO: compléter les horaires
  { days: "Vendredi", hours: "TODO" }, // TODO: compléter les horaires
  { days: "Samedi", hours: "TODO" }, // TODO: compléter les horaires
  { days: "Dimanche", hours: "Fermé" },
]

export const HOURS_DEPOT = [
  { days: "Mardi – Samedi", hours: "9h30–12h / 13h–16h" },
  { note: "Sur rendez-vous uniquement" },
]

export const MISSIONS = [
  {
    num: "01",
    iconKey: "Leaf",
    title: "Réduire les déchets",
    lede: "Seconde vie",
    description:
      "Chaque objet récupéré est une victoire pour la planète. Nous détournons des tonnes de déchets chaque année.",
    tone: "sage",
  },
  {
    num: "02",
    iconKey: "HeartHandshake",
    title: "Créer du lien",
    lede: "Tissu social",
    description:
      "La ressourcerie est un lieu de rencontre et d'échange. Nous renforçons le lien social du territoire.",
    tone: "terracotta",
  },
  {
    num: "03",
    iconKey: "Briefcase",
    title: "Réinsérer",
    lede: "Emploi & formation",
    description:
      "Nous embauchons des personnes en difficulté sociale, avec accompagnement et formation sur mesure.",
    tone: "ink",
  },
]

export const ITEMS = [
  "Meubles",
  "Bibelots",
  "Vaisselle",
  "Livres",
  "CD / DVD",
  "Vinyles",
  "Linge de maison",
  "Jouets",
  "Cadres",
  "Fournitures scolaires",
  "Vélos",
]

export const STATS = [
  { value: 120, unit: "tonnes", label: "détournées des déchets" },
  { value: 15, unit: "emplois", label: "créés depuis 2014" },
  { value: 4500, unit: "objets", label: "vendus par an" },
  { value: 10, unit: "ans", label: "d'engagement associatif" },
]

export const TIMELINE = [
  {
    year: "2014",
    title: "Création de l'association",
    desc: "Fondée le 16 janvier 2014, l'association ouvre ses portes à Brasles avec une poignée de bénévoles motivés.",
  },
  {
    year: "2016",
    title: "Premiers emplois d'insertion",
    desc: "Démarrage du programme d'insertion professionnelle avec les premières embauches en contrat aidé.",
  },
  {
    year: "2018",
    title: "Développement de la collecte",
    desc: "Lancement du service de collecte à domicile pour faciliter les dons des habitants de la région.",
  },
  {
    year: "2020",
    title: "100 tonnes détournées",
    desc: "Cap symbolique des 100 tonnes d'objets sauvés de la déchetterie, une fierté pour toute l'équipe.",
  },
  {
    year: "2024",
    title: "10 ans d'engagement",
    desc: "L'association célèbre une décennie au service de l'économie circulaire et de l'insertion locale.",
  },
  {
    year: "2026",
    title: "Ouverture d'une nouvelle boutique",
    // TODO: le client doit fournir le texte de description
    desc: "TODO — description à compléter par le client.",
  },
]

export const DON_STEPS = [
  {
    step: "01",
    title: "Appelez-nous",
    desc: "Contactez-nous au 03 64 13 48 64 pour prendre rendez-vous et décrire vos objets.",
  },
  {
    step: "02",
    title: "Apportez ou collecte",
    desc: "Déposez vos objets directement à la boutique, ou nous venons les chercher chez vous.",
  },
  {
    step: "03",
    title: "Tri et valorisation",
    desc: "Nos équipes trient, nettoient et valorisent chaque objet pour lui donner une seconde vie.",
  },
  {
    step: "04",
    title: "Mise en vente",
    desc: "Les objets sont mis en vente à petit prix dans notre boutique, accessibles à tous.",
  },
]
