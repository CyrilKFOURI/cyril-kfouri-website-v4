import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project, ProjectCategory } from '../types/project';
import { projectImagesMap, defaultProjectImage } from '../data/projectImages';

interface ProjectsExplorerProps {
  onSelectProject: (project: Project) => void;
}

const MAX_CARD_TAGS = 3;

// Groups keep the order in which each category first appears in the sorted list.
const groupByCategory = (projects: Project[]) => {
  const groups = new Map<ProjectCategory, Project[]>();
  for (const project of projects) {
    groups.set(project.category, [...(groups.get(project.category) ?? []), project]);
  }
  return [...groups.entries()];
};

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({ project, onSelect }) => {
  const imageSrc = projectImagesMap[project.id] ?? defaultProjectImage;
  const hiddenTagCount = project.tags.length - MAX_CARD_TAGS;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full text-left flex gap-3 sm:gap-4 p-2.5 sm:p-3 bg-white border border-neutral-200 rounded-lg hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 cursor-pointer"
    >
      <div className="shrink-0 w-16 h-16 sm:w-32 sm:h-24 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200">
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-neutral-950 leading-snug line-clamp-2 md:line-clamp-1 group-hover:text-blue-700">
          {project.title}
        </h3>
        <p className="hidden sm:block mt-0.5 text-xs text-neutral-600 leading-relaxed line-clamp-2">
          {project.subtitle ?? project.summary}
        </p>
        <div className="mt-auto pt-1 sm:pt-1.5 flex items-center gap-1 min-w-0">
          {project.tags.slice(0, MAX_CARD_TAGS).map((tag) => (
            <span
              key={tag}
              className="min-w-0 max-w-[8rem] truncate px-1.5 py-0.5 text-[10px] font-mono text-neutral-700 bg-neutral-100 rounded"
            >
              {tag}
            </span>
          ))}
          {hiddenTagCount > 0 && (
            <span className="shrink-0 text-[10px] font-mono text-neutral-400">+{hiddenTagCount}</span>
          )}
          <ArrowUpRight
            aria-hidden="true"
            className="ml-auto shrink-0 w-4 h-4 text-neutral-400 group-hover:text-neutral-900"
          />
        </div>
      </div>
    </button>
  );
};

export const ProjectsExplorer: React.FC<ProjectsExplorerProps> = ({ onSelectProject }) => {
  const { t, content } = useLanguage();
  const { profile } = content;
  const sortedProjects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-8 sm:py-10 border-t border-black/[0.06] scroll-mt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">{t('projects.title')}</h2>
            <span className="hidden sm:inline text-xs text-neutral-500">{t('projects.hint')}</span>
          </div>
          {profile.projectsOverviewUrl && (
            <a
              href={profile.projectsOverviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-11 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700"
            >
              <span className="underline decoration-blue-700/40 underline-offset-2 group-hover:decoration-blue-700">
                {t('projects.overview')}
              </span>
              <span className="text-xs font-normal text-neutral-500">{t('projects.overviewNote')}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="space-y-5">
          {groupByCategory(sortedProjects).map(([category, projects]) => (
            <div key={category}>
              <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t(`category.${category}`)}
                <span className="font-mono font-normal text-neutral-400">{projects.length}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={() => onSelectProject(project)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
