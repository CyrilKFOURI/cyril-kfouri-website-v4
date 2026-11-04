import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Lock, FileText } from 'lucide-react';
import type { Project, ProjectLink, ProjectMedia } from '../types/project';
import { useLanguage } from '../i18n/LanguageContext';
import { resolveAsset } from '../data/assets';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

// A repository is public only if its label says so; private repos must not be linked (visitors get a 404).
const isPrivateRepository = (link: ProjectLink): boolean =>
  link.type === 'github' && /private/i.test(link.label);

const MAX_BULLET_LABEL_LENGTH = 80;

// "Label: explanation" bullets get a bold label so the key point can be skimmed.
const BulletText: React.FC<{ text: string }> = ({ text }) => {
  const separatorIndex = text.indexOf(': ');
  if (separatorIndex <= 0 || separatorIndex > MAX_BULLET_LABEL_LENGTH) return <>{text}</>;
  return (
    <>
      <span className="font-semibold text-neutral-950">{text.slice(0, separatorIndex)}:</span>
      {text.slice(separatorIndex + 1)}
    </>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-neutral-950 mb-2">{children}</h3>
);

const ProjectLinks: React.FC<{ links: ProjectLink[] }> = ({ links }) => {
  const { t } = useLanguage();
  const liveLink = links.find((l) => l.type === 'live' || l.type === 'demo');
  const repoLink = links.find((l) => l.type === 'github');
  const hasPrivateRepo = repoLink !== undefined && isPrivateRepository(repoLink);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {liveLink && (
        <a
          href={liveLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 px-4 inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-950 hover:bg-neutral-800 rounded-md"
        >
          {t('projectModal.openLiveApp')}
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
      {repoLink && !hasPrivateRepo && (
        <a
          href={repoLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 px-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-md"
        >
          <GitHubIcon />
          {t('projectModal.sourceCode')}
        </a>
      )}
      {hasPrivateRepo && (
        <span className="min-h-11 px-1 inline-flex items-center gap-2 text-xs text-neutral-500">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          {t('projectModal.privateRepo')}
        </span>
      )}
    </div>
  );
};

const Gallery: React.FC<{ items: NonNullable<ProjectMedia['gallery']>; projectTitle: string }> = ({
  items,
  projectTitle,
}) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];
  if (!activeItem) return null;

  return (
    <div className="space-y-2">
      <figure className="rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
        {activeItem.type === 'video' ? (
          <video src={resolveAsset(activeItem.url)} controls className="w-full max-h-[420px] bg-black" />
        ) : (
          <img
            src={resolveAsset(activeItem.url)}
            alt={activeItem.caption ?? projectTitle}
            className="w-full max-h-[420px] object-contain bg-neutral-50"
          />
        )}
        {activeItem.caption && (
          <figcaption className="px-3 py-2 text-xs text-neutral-600 border-t border-neutral-200 bg-white">
            {activeItem.caption}
          </figcaption>
        )}
      </figure>

      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={item.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={t('projectModal.showImage', { index: index + 1, caption: item.caption ?? projectTitle })}
              aria-pressed={index === activeIndex}
              className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 cursor-pointer ${
                index === activeIndex ? 'border-neutral-900' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={resolveAsset(item.url)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DemoVideo: React.FC<{ video: NonNullable<ProjectMedia['demoVideo']>; projectTitle: string }> = ({
  video,
  projectTitle,
}) => {
  const { t } = useLanguage();
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-neutral-200 bg-black">
      {video.type === 'mp4' ? (
        <video src={resolveAsset(video.url)} poster={video.poster} controls className="w-full h-full" />
      ) : (
        <iframe
          src={video.url}
          title={t('projectModal.demoTitle', { title: projectTitle })}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const galleryItems = project.media?.gallery ?? [];
  const demoVideo = project.media?.demoVideo;
  const documents = project.media?.documents ?? [];
  const metrics = project.metrics ?? [];
  const metaLine = [t(`category.${project.category}`), project.context, project.dates].filter(Boolean).join(' · ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center bg-black/50 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full sm:max-w-3xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-xl sm:border sm:border-neutral-200 flex flex-col overflow-hidden"
      >
        <header className="flex items-start justify-between gap-3 px-4 sm:px-6 pt-4 pb-3 border-b border-neutral-200 shrink-0">
          <div className="min-w-0">
            <p className="text-xs text-neutral-500 tabular-nums">{metaLine}</p>
            <h2 id="project-modal-title" className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('projectModal.close')}
            className="shrink-0 w-11 h-11 -mr-2 -mt-1 inline-flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 space-y-6">
          {project.subtitle && <p className="text-sm text-neutral-700 leading-relaxed">{project.subtitle}</p>}

          {project.links && project.links.length > 0 && <ProjectLinks links={project.links} />}

          {galleryItems.length > 0 && <Gallery key={project.id} items={galleryItems} projectTitle={project.title} />}

          <section>
            <SectionHeading>{t('projectModal.overview')}</SectionHeading>
            <p className="text-sm text-neutral-700 leading-relaxed">{project.summary}</p>
          </section>

          {metrics.length > 0 && (
            <section>
              <SectionHeading>{t('projectModal.keyFacts')}</SectionHeading>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-white px-3 py-2.5">
                    <dt className="text-[11px] text-neutral-500">{metric.label}</dt>
                    <dd className="text-sm font-medium text-neutral-950 tabular-nums">{metric.value}</dd>
                    {metric.description && <dd className="text-xs text-neutral-500 mt-0.5">{metric.description}</dd>}
                  </div>
                ))}
              </dl>
            </section>
          )}

          {project.sections.map((section, index) => (
            <section key={section.title ?? index}>
              {section.title && <SectionHeading>{section.title}</SectionHeading>}
              <div className="space-y-2">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-neutral-400">
                  {section.bulletPoints.map((point) => (
                    <li key={point} className="text-sm text-neutral-700 leading-relaxed">
                      <BulletText text={point} />
                    </li>
                  ))}
                </ul>
              )}
              {section.callout && (
                <p className="mt-3 border-l-2 border-neutral-900 pl-3 text-sm text-neutral-800">{section.callout.text}</p>
              )}
              {section.codeSnippet && (
                <pre className="mt-3 p-3 rounded-lg bg-neutral-950 text-neutral-100 text-xs overflow-x-auto">
                  <code>{section.codeSnippet.code}</code>
                </pre>
              )}
            </section>
          ))}

          {demoVideo && (
            <section>
              <SectionHeading>{t('projectModal.demo')}</SectionHeading>
              <DemoVideo video={demoVideo} projectTitle={project.title} />
            </section>
          )}

          {documents.length > 0 && (
            <section>
              <SectionHeading>{t('projectModal.documents')}</SectionHeading>
              <ul className="space-y-1">
                {documents.map((doc) => (
                  <li key={doc.url}>
                    <a
                      href={resolveAsset(doc.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      {doc.title}
                      {doc.size && <span className="text-xs text-neutral-500 tabular-nums">({doc.size})</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <SectionHeading>{t('projectModal.techStack')}</SectionHeading>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs font-mono text-neutral-800 bg-neutral-100 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
