import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';
import type { Experience } from '../types/experience';
import { experienceLogosMap } from '../data/experienceLogos';
import { useLanguage } from '../i18n/LanguageContext';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-neutral-950 mb-2">{children}</h3>
);

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose }) => {
  const { t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only touch the page scroll while open: resetting it when closed would undo the project modal's lock.
    if (!experience) return;

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
  }, [experience, onClose]);

  if (!experience) return null;

  const logoSrc = experienceLogosMap[experience.id];
  const metrics = experience.metrics ?? [];
  const documents = experience.media?.documents ?? [];
  const metaLine = [
    t(`experienceType.${experience.type}`),
    `${experience.period.start} – ${experience.period.end}`,
    experience.location,
  ].join(' · ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center bg-black/50 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-xl sm:border sm:border-neutral-200 flex flex-col overflow-hidden"
      >
        <header className="flex items-start gap-3 px-4 sm:px-6 pt-4 pb-3 border-b border-neutral-200 shrink-0">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt=""
              className="shrink-0 w-11 h-11 rounded-md object-contain p-1 border border-neutral-200 bg-white"
            />
          ) : (
            <div className="shrink-0 w-11 h-11 rounded-md border border-neutral-200 bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-500">
              {experience.company.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 id="experience-modal-title" className="text-lg font-bold tracking-tight text-neutral-950 leading-tight">
              {experience.role}
            </h2>
            <p className="text-sm font-medium text-neutral-700">{experience.company}</p>
            <p className="text-xs text-neutral-500 tabular-nums">{metaLine}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('experienceModal.close')}
            className="shrink-0 w-11 h-11 -mr-2 -mt-1 inline-flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 space-y-6">
          {experience.summary && (
            <p className="text-sm text-neutral-700 leading-relaxed">{experience.summary}</p>
          )}

          <section>
            <SectionHeading>{t('experienceModal.whatIDid')}</SectionHeading>
            <ul className="space-y-2 list-disc pl-5 marker:text-neutral-400">
              {experience.bulletPoints.map((point) => (
                <li key={point} className="text-sm text-neutral-700 leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {metrics.length > 0 && (
            <section>
              <SectionHeading>{t('experienceModal.keyFacts')}</SectionHeading>
              <dl className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-white px-3 py-2.5">
                    <dt className="text-[11px] text-neutral-500">{metric.label}</dt>
                    <dd className="text-sm font-medium text-neutral-950 tabular-nums">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {documents.length > 0 && (
            <section>
              <SectionHeading>{t('experienceModal.documents')}</SectionHeading>
              <ul className="space-y-1">
                {documents.map((doc) => (
                  <li key={doc.url}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <SectionHeading>{t('experienceModal.tools')}</SectionHeading>
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs font-mono text-neutral-800 bg-neutral-100 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {experience.companyUrl && (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 inline-flex items-center gap-1.5 text-sm text-blue-700 hover:underline"
            >
              {t('experienceModal.website', { company: experience.company })}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
