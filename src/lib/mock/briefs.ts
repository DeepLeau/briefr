export interface Brief {
  id: string
  title: string
  fullSummary: string
  shortSummary: string
  source: 'Email' | 'Slack' | 'Meeting'
  date: string
  timeSaved: number
}

const mockBriefs: Brief[] = [
  {
    id: '1',
    title: 'Revue mensuelle équipe Produit',
    fullSummary: `Points clés discutés lors de la revue mensuelle :

1. Lancement de la version 2.0 prévu pour fin février avec les nouvelles fonctionnalités de analytics.
2. Décision validée : abandon du module beta en favor de l'intégration directe dans le dashboard principal.
3. Le budget Q1 a été approuvé avec une augmentation de 15% pour les ressources marketing.

Actions à suivre :
- Marie finalise les spécifications UX d'ici vendredi
- Thomas prépare la communication client
- Revue de performance prévue le 15 février`,
    shortSummary: 'Revue mensuelle Produit : lancement v2.0 fin février, budget Q1 validé +15% marketing, specs UX à finaliser.',
    source: 'Meeting',
    date: '2025-01-28T10:00:00Z',
    timeSaved: 12,
  },
  {
    id: '2',
    title: 'Thread Slack #general - Incident serveur',
    fullSummary: `Incident survenu ce matin entre 9h et 10h30 :

1. Panne de la base de données PostgreSQL cause d'un surcroît de connexions.
2. L'équipe infrastructure a intervient rapidement pour redémarrer les services.
3. Impact : 1h30 d'indisponibilité pour ~500 utilisateurs.

Lessons learned :
- Mettre en place un auto-scaling plus agressif
- Améliorer les alertes sur les métriques de connexion
- Documenter la procédure de failover`,
    shortSummary: 'Incident DB ce matin, 1h30 d\'indisponibilité. Cause : surcroît de connexions. Actions : auto-scaling, alertes améliorées.',
    source: 'Slack',
    date: '2025-01-27T09:15:00Z',
    timeSaved: 8,
  },
  {
    id: '3',
    title: 'Discussion fournisseurs - Contrat 2025',
    fullSummary: `Échange avec les fournisseurs principaux pour le renouvellement annuel :

1. AWS : négociation en cours pour un engagement annuel avec 20% de réduction.
2. Twilio : proposition de nouveau contrat avec tarifs préférentiels sur les SMS.
3. Stripe : renouvellement automatique avec indexation classique de 3%.

Points d'attention :
- Comparer les offres concurrentes avant de signer
- Vérifier les SLA de chaque prestataire`,
    shortSummary: 'Négociation contrats 2025 : AWS -20% possible, Twilio nouveau tarif, Stripe indexation 3%. À comparer avant signature.',
    source: 'Email',
    date: '2025-01-26T14:30:00Z',
    timeSaved: 15,
  },
  {
    id: '4',
    title: 'Standup équipe Engineering',
    fullSummary: `Highlights du standup quotidien :

1. Pierre a terminé l'implémentation de l'authentification OAuth.
2. Sophie debug le problème de performance sur les dashboards.
3. Lucas commence l'intégration de la nouvelle API de paiement.

Blockers : aucune demande d'assistance.

Prochaines étapes :
- Code review de la PR #234
- Tests de charge sur le nouveau module`,
    shortSummary: 'Standup : OAuth terminé, debug dashboard en cours, API paiement démarrée. PR#234 en review, tests charge à venir.',
    source: 'Slack',
    date: '2025-01-29T09:30:00Z',
    timeSaved: 6,
  },
  {
    id: '5',
    title: 'Retrospective Sprint 23',
    fullSummary: `Bilan du Sprint 23 :

Ce qui a bien marché :
- Collaboration interdisciplinaire efficace
- Réduction de 30% des bugs grâce aux nouveaux tests
-发布时间 rapide des hotfixes

Points à améliorer :
- Documentation technique insuffisante
- Mauvaise estimation des tâches complexes
- Trop de réunions improvisées

Engagements pour le prochain sprint :
- Au moins 2 pages de documentation
- Planning plus précis pour les stories techniques
- Réduction des réunions à 2 par semaine`,
    shortSummary: 'Sprint 23 : collaboration efficace, -30% bugs. À améliorer : docs, estimations, réunions. Engagements : 2 pages doc, planning précis.',
    source: 'Meeting',
    date: '2025-01-25T16:00:00Z',
    timeSaved: 18,
  },
  {
    id: '6',
    title: 'Email client - Demande fonctionnalité',
    fullSummary: `Demande d'un client Enterprise pour une fonctionnalité personnalisée :

1. Besoin d'un export PDF avancé avec branding personnalisé.
2. Demande de statistiques supplémentaires dans les rapports.
3. Souhait d'une API dédiée pour leurs intégrations.

Évaluation préliminaire :
- Feature complexe estimée à 2-3 semaines de développement
- Impact sur la roadmap à évaluer
- Possibilité de la proposer en option payante`,
    shortSummary: 'Client Enterprise demande export PDF + stats avancées + API dédiée. Estimation : 2-3 semaines. À intégrer en option payante ?',
    source: 'Email',
    date: '2025-01-24T11:00:00Z',
    timeSaved: 10,
  },
  {
    id: '7',
    title: 'Canal #support - Problèmes connection',
    fullSummary: `Plusieurs utilisateurs rapportent des problèmes de connexion ce matin :

1. Erreur "Session expired" fréquente malgré connexion récente.
2. Problème semble affecter principalement les utilisateurs Chrome.
3. Équipe support a identifié un problème avec le renouvellement des tokens.

Solution en cours :
- Déploiement d'un fix urgent prévu dans l'heure
- Instructions envoyées aux utilisateurs affectés
- Suivi des tickets en cours`,
    shortSummary: 'Bug session ce matin sur Chrome. Tokens non renouvelés. Fix urgent déployé, utilisateurs notifiés.',
    source: 'Slack',
    date: '2025-01-23T08:45:00Z',
    timeSaved: 7,
  },
  {
    id: '8',
    title: 'Briefing call Q1 avec investors',
    fullSummary: `Points présentés lors de l'appel trimestriel :

1. Croissance de 45% du MRR par rapport au T4.
2. 120 nouveaux clients Enterprise acquired.
3. Lancement de la fonctionnalité Analytics bien reçu.
4. Roadmap Q1/Q2 présentée : focus sur l'automatisation.

Feedback investors :
- Impression positive de la trajectoire de croissance
- Questions sur la stratégie de expansion internationale
- Prochaine call prévu fin avril`,
    shortSummary: 'Q1 call : MRR +45%, 120 nouveaux clients Enterprise, Analytics reçu positivement. Prochaine call fin avril.',
    source: 'Meeting',
    date: '2025-01-22T15:00:00Z',
    timeSaved: 20,
  },
  {
    id: '9',
    title: 'Email équipe - Organisation Hackathon',
    fullSummary: `Proposition d'organisation d'un hackathon interne :

1. Date proposée : fin février (vendredi + weekend).
2. Thèmes suggérés : IA, automatisation, UX.
3. Budget demandé : 5000€ pour prix et logistique.

Inscriptions :
- 25 personnes déjà intéressé
- Équipe cross-fonctionnelle
- 2 jours dehackathon`,
    shortSummary: 'Hackathon fin février proposé : 25 inscrits, thèmes IA/automatisation/UX, budget 5000€. À valider.',
    source: 'Email',
    date: '2025-01-21T13:20:00Z',
    timeSaved: 5,
  },
  {
    id: '10',
    title: 'Discussion Slack #design - Nouvelle charte',
    fullSummary: `Mise à jour de la charte graphique :

1. Couleurs secondaires ajoutées : violet et teal.
2. Nouvelle typographie validée : Geist pour les headings, Inter pour le body.
3. Composants mis à jour avec les nouveaux tokens.

Points validés :
- Boutons avec nouveau radius (8px)
- Espacements standardisés (4/8/16/24/32)
- icônes Lucide uniformisées`,
    shortSummary: 'Nouvelle charte : couleurs secondaire violet/teal, typographie Geist+Inter, tokens espacement/buttons uniformisés.',
    source: 'Slack',
    date: '2025-01-20T10:00:00Z',
    timeSaved: 9,
  },
]

export function getBriefs(): Brief[] {
  return mockBriefs
}

export function getBriefsFiltered(source: 'Email' | 'Slack' | 'Meeting'): Brief[] {
  return mockBriefs.filter(brief => brief.source === source)
}

export function getBriefById(id: string): Brief | undefined {
  return mockBriefs.find(brief => brief.id === id)
}
