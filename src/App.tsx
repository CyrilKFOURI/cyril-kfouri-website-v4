import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsExplorer } from './components/ProjectsExplorer';
import { ProjectModal } from './components/ProjectModal';
import { EducationAndExperience } from './components/EducationAndExperience';
import { ExperienceModal } from './components/ExperienceModal';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t, content } = useLanguage();
  // Selections are stored by id so an open modal switches language along with the page.
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const { profile } = content;

  const selectedProject = content.projects.find((project) => project.id === selectedProjectId) ?? null;
  const selectedExperience = content.experiences.find((experience) => experience.id === selectedExperienceId) ?? null;

  return (
    <div className="min-h-dvh flex flex-col bg-[#FAFAFA] text-[#111827] selection:bg-emerald-500/20 selection:text-emerald-800">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProjectsExplorer onSelectProject={(project) => setSelectedProjectId(project.id)} />
        <EducationAndExperience onSelectExperience={(experience) => setSelectedExperienceId(experience.id)} />
        {/* Piano section hidden until my own recordings exist; CreativeShowcase is kept ready for them. */}
      </main>

      {/* Global Minimalist Footer */}
      <footer className="border-t border-black/[0.06] bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-neutral-400">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-neutral-900 transition-colors"
            >
              {t('footer.email')}
            </a>
          </div>
        </div>
      </footer>

      {/* Modals for Deep Details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperienceId(null)}
      />
    </div>
  );
}
