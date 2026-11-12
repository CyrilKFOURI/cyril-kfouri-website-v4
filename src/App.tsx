import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsExplorer } from './components/ProjectsExplorer';
import { ProjectModal } from './components/ProjectModal';
import { EducationAndExperience } from './components/EducationAndExperience';
import { ExperienceModal } from './components/ExperienceModal';
import { useLanguage } from './i18n/LanguageContext';
import { useRoute } from './routing/useRoute';

export default function App() {
  const { t, content } = useLanguage();
  // The open dialog lives in the URL and the browser history (see useRoute), so Back closes it
  // and never reopens it. Looking the record up on each render also lets it follow a language switch.
  const { route, open, close, redirectHome } = useRoute();
  const { profile } = content;

  const selectedProject =
    route.name === 'project' ? (content.projects.find((project) => project.slug === route.slug) ?? null) : null;
  const selectedExperience =
    route.name === 'experience' ? (content.experiences.find((experience) => experience.id === route.id) ?? null) : null;

  // A URL that names nothing (old link, typo) is corrected instead of showing an empty page.
  const pointsAtNothing = route.name !== 'home' && !selectedProject && !selectedExperience;
  useEffect(() => {
    if (pointsAtNothing) redirectHome();
  }, [pointsAtNothing, redirectHome]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FAFAFA] text-[#111827] selection:bg-emerald-500/20 selection:text-emerald-800">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProjectsExplorer onSelectProject={(project) => open({ name: 'project', slug: project.slug })} />
        <EducationAndExperience onSelectExperience={(experience) => open({ name: 'experience', id: experience.id })} />
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
        onClose={close}
      />

      <ExperienceModal
        experience={selectedExperience}
        onClose={close}
      />
    </div>
  );
}
