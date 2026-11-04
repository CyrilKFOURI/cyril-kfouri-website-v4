// Interface strings. `fr` is typed against the keys of `en`, so a missing translation fails the build.
// `{name}` placeholders are filled by `t(key, { name: value })`.

export const en = {
  'meta.title': 'Cyril KFOURI — Quantitative Analyst & Data Scientist',

  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.education': 'Education',
  'nav.navigation': 'Navigation',
  'nav.language': 'Language',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',

  'hero.resume': 'Resume',
  'hero.githubTitle': 'GitHub profile',
  'hero.linkedinTitle': 'LinkedIn profile',
  'hero.emailTitle': 'Send an email',

  'projects.title': 'Projects',
  'projects.hint': 'Click a project for details',
  'projects.overview': 'Project overview',
  'projects.overviewNote': '(3D tour of all my projects)',

  'category.quantitative-finance': 'Quantitative Finance',
  'category.data-science': 'Data Science',
  'category.agentic-ai': 'Agentic AI',
  'category.ai-tooling': 'AI Tooling',
  'category.mobile-software': 'Software & Mobile',
  'category.creative-tech': 'Embedded & Robotics',

  'projectModal.close': 'Close project details',
  'projectModal.openLiveApp': 'Open live app',
  'projectModal.sourceCode': 'Source code',
  'projectModal.privateRepo': 'Private repository — code available on request',
  'projectModal.showImage': 'Show image {index}: {caption}',
  'projectModal.demoTitle': '{title} demo',
  'projectModal.overview': 'Overview',
  'projectModal.keyFacts': 'Key facts',
  'projectModal.demo': 'Demo',
  'projectModal.documents': 'Documents',
  'projectModal.techStack': 'Tech stack',

  'timeline.eyebrow': 'Timeline',
  'timeline.title': 'Education & Experience',
  'timeline.education': 'Education',
  'timeline.certifications': 'Certifications ({count})',
  'timeline.experience': 'Professional Experience',
  'timeline.details': 'Details',

  'experienceType.Internship': 'Internship',
  'experienceType.Full-time': 'Full-time',
  'experienceType.Consultant': 'Consultant',
  'experienceType.Part-time': 'Part-time',

  'experienceModal.close': 'Close experience details',
  'experienceModal.whatIDid': 'What I did',
  'experienceModal.keyFacts': 'Key facts',
  'experienceModal.documents': 'Documents',
  'experienceModal.tools': 'Tools & skills used',
  'experienceModal.website': '{company} website',

  'footer.email': 'Email',

  'piano.heading': 'Piano · 8+ years · pieces I play',
  'piano.fullRepertoire': 'Full repertoire',
  'piano.modalTitle': 'Piano covers & repertoire',
  'piano.modalHint': 'Click any title to watch the cover on YouTube',
  'piano.close': 'Close',
  'piano.watch': 'Watch {title} on YouTube',
  'piano.footer': 'Covers recorded on acoustic grand & Yamaha digital pianos',
} as const;

export type UiKey = keyof typeof en;

export const fr: Record<UiKey, string> = {
  'meta.title': 'Cyril KFOURI — Analyste quantitatif & Data Scientist',

  'nav.projects': 'Projets',
  'nav.experience': 'Expérience',
  'nav.education': 'Formation',
  'nav.navigation': 'Navigation',
  'nav.language': 'Langue',
  'nav.openMenu': 'Ouvrir le menu',
  'nav.closeMenu': 'Fermer le menu',

  'hero.resume': 'CV',
  'hero.githubTitle': 'Profil GitHub',
  'hero.linkedinTitle': 'Profil LinkedIn',
  'hero.emailTitle': 'Envoyer un e-mail',

  'projects.title': 'Projets',
  'projects.hint': 'Cliquez sur un projet pour le détail',
  'projects.overview': 'Vue d’ensemble des projets',
  'projects.overviewNote': '(visite 3D de tous mes projets)',

  'category.quantitative-finance': 'Finance quantitative',
  'category.data-science': 'Data science',
  'category.agentic-ai': 'IA agentique',
  'category.ai-tooling': 'Outils IA',
  'category.mobile-software': 'Logiciel & mobile',
  'category.creative-tech': 'Embarqué & robotique',

  'projectModal.close': 'Fermer le détail du projet',
  'projectModal.openLiveApp': 'Ouvrir l’application',
  'projectModal.sourceCode': 'Code source',
  'projectModal.privateRepo': 'Dépôt privé — code disponible sur demande',
  'projectModal.showImage': 'Afficher l’image {index} : {caption}',
  'projectModal.demoTitle': 'Démo de {title}',
  'projectModal.overview': 'Présentation',
  'projectModal.keyFacts': 'Chiffres clés',
  'projectModal.demo': 'Démo',
  'projectModal.documents': 'Documents',
  'projectModal.techStack': 'Technologies',

  'timeline.eyebrow': 'Parcours',
  'timeline.title': 'Formation & expérience',
  'timeline.education': 'Formation',
  'timeline.certifications': 'Certifications ({count})',
  'timeline.experience': 'Expérience professionnelle',
  'timeline.details': 'Détails',

  'experienceType.Internship': 'Stage',
  'experienceType.Full-time': 'Temps plein',
  'experienceType.Consultant': 'Consultant',
  'experienceType.Part-time': 'Temps partiel',

  'experienceModal.close': 'Fermer le détail de l’expérience',
  'experienceModal.whatIDid': 'Ce que j’ai fait',
  'experienceModal.keyFacts': 'Chiffres clés',
  'experienceModal.documents': 'Documents',
  'experienceModal.tools': 'Outils & compétences',
  'experienceModal.website': 'Site de {company}',

  'footer.email': 'E-mail',

  'piano.heading': 'Piano · plus de 8 ans · morceaux que je joue',
  'piano.fullRepertoire': 'Tout le répertoire',
  'piano.modalTitle': 'Reprises & répertoire au piano',
  'piano.modalHint': 'Cliquez sur un titre pour voir la reprise sur YouTube',
  'piano.close': 'Fermer',
  'piano.watch': 'Voir {title} sur YouTube',
  'piano.footer': 'Reprises enregistrées sur piano à queue acoustique et piano numérique Yamaha',
};
