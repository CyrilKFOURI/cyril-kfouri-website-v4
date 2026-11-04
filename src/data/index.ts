import projectsRaw from './projects.json';
import experiencesRaw from './experiences.json';
import educationRaw from './education.json';
import skillsRaw from './skills.json';
import profileRaw from './profile.json';
import creativeRaw from './creative.json';

import type { Project } from '../types/project';
import type { Experience } from '../types/experience';
import type { Education, Certification } from '../types/education';
import type { SkillCategory } from '../types/skill';
import type { Profile } from '../types/profile';
import type { CreativeShowcase } from '../types/creative';

export const projects: Project[] = projectsRaw as unknown as Project[];
export const experiences: Experience[] = experiencesRaw as unknown as Experience[];
export const education: Education[] = educationRaw.education as unknown as Education[];
export const certifications: Certification[] = educationRaw.certifications as unknown as Certification[];
export const skillCategories: SkillCategory[] = skillsRaw as unknown as SkillCategory[];
export const profile: Profile = profileRaw as unknown as Profile;
export const creative: CreativeShowcase = creativeRaw as unknown as CreativeShowcase;

export const featuredProjects = projects.filter((p) => p.featured);
