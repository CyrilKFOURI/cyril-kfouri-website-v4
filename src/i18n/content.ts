import { projects, experiences, education, certifications, profile } from '../data';
import frProjectsRaw from '../data/fr/projects.json';
import frExperiencesRaw from '../data/fr/experiences.json';
import frEducationRaw from '../data/fr/education.json';
import frProfileRaw from '../data/fr/profile.json';

import type { Project } from '../types/project';
import type { Experience } from '../types/experience';
import type { Education, Certification } from '../types/education';
import type { Profile } from '../types/profile';

export type Language = 'en' | 'fr';

export interface Content {
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  profile: Profile;
}

// French files hold only translated fields; gallery captions are listed in order so image URLs stay in one place.
type ProjectTranslation = Partial<Project> & { galleryCaptions?: string[] };
type Translations<T> = Record<string, Partial<T>>;

const frProjects = frProjectsRaw as Record<string, ProjectTranslation>;
const frExperiences = frExperiencesRaw as Translations<Experience>;
const frEducation = frEducationRaw as Translations<Education>;
const frProfile = frProfileRaw as Partial<Profile>;

const warnMissing = (fileName: string, ids: string[], translations: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  const missing = ids.filter((id) => !(id in translations));
  if (missing.length > 0) console.warn(`[i18n] No French text in data/fr/${fileName} for: ${missing.join(', ')}`);
};

const translate = <T extends { id: string }>(items: T[], translations: Translations<T>): T[] =>
  items.map((item) => ({ ...item, ...translations[item.id] }));

const translateProject = (project: Project): Project => {
  const { galleryCaptions, ...fields } = frProjects[project.id] ?? {};
  const gallery = project.media?.gallery?.map((item, index) => ({
    ...item,
    caption: galleryCaptions?.[index] ?? item.caption,
  }));
  return { ...project, ...fields, media: project.media && { ...project.media, gallery } };
};

warnMissing('projects.json', projects.map((p) => p.id), frProjects);
warnMissing('experiences.json', experiences.map((e) => e.id), frExperiences);
warnMissing('education.json', education.map((e) => e.id), frEducation);

// Both languages are built once at load time, so switching language is a lookup.
export const contentByLanguage: Record<Language, Content> = {
  en: { projects, experiences, education, certifications, profile },
  fr: {
    projects: projects.map(translateProject),
    experiences: translate(experiences, frExperiences),
    education: translate(education, frEducation),
    certifications,
    profile: { ...profile, ...frProfile },
  },
};
