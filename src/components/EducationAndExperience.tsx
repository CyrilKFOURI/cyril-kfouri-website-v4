import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Experience } from '../types/experience';
import { experienceLogosMap } from '../data/experienceLogos';
import { getIssuerLogo } from './IssuerLogos';
import { GraduationCap, Award, MapPin, Briefcase, ArrowRight } from 'lucide-react';

interface EducationAndExperienceProps {
  onSelectExperience: (exp: Experience) => void;
}

export const EducationAndExperience: React.FC<EducationAndExperienceProps> = ({
  onSelectExperience,
}) => {
  const { t, content } = useLanguage();
  const { education, experiences, certifications } = content;
  return (
    <section id="experience" className="py-6 sm:py-8 border-t border-black/[0.06] bg-neutral-50/30">
      <div className="max-w-5xl mx-auto px-3 sm:px-5">
        
        {/* Section Title */}
        <div className="text-center max-w-md mx-auto mb-5 sm:mb-6 space-y-0.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            {t('timeline.eyebrow')}
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950">
            {t('timeline.title')}
          </h2>
        </div>

        {/* 2-Column Side-by-Side Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Education & Certifications */}
          <div id="education" className="space-y-6 scroll-mt-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-200">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                {t('timeline.education')}
              </h3>
            </div>

            {/* Education Timeline */}
            <div className="relative pl-8 space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-neutral-200">
              {education.map((edu) => (
                <div key={edu.id} className="relative flex items-center">
                  {/* Timeline Node */}
                  <div className="absolute -left-8 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0 z-10">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>

                  {/* Horizontal Connector Dash */}
                  <div className="w-4 h-[1.5px] bg-neutral-300 shrink-0" />

                  {/* Education Card */}
                  <div className="flex-1 p-3 rounded-xl bg-white border border-neutral-200/90 shadow-xs space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-neutral-950">
                        {edu.institution}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">
                        {edu.period.start} – {edu.period.end}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-emerald-800">
                      {edu.degree} — {edu.field}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications with Square Issuer Logos */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-1.5 pb-1 border-b border-neutral-200/80">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono">
                  {t('timeline.certifications', { count: certifications.length })}
                </h4>
              </div>

              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-2.5 rounded-lg bg-white border border-neutral-200/90 hover:border-neutral-300 shadow-xs flex items-center gap-3 transition-colors"
                  >
                    {/* Square Issuer Logo */}
                    <div className="w-6 h-6 rounded bg-neutral-50 border border-neutral-200 flex items-center justify-center p-0.5 shrink-0">
                      {getIssuerLogo(cert.issuer)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono font-semibold text-neutral-500 uppercase block leading-tight">
                        {cert.issuer}
                      </span>
                      <p className="text-xs font-semibold text-neutral-900 leading-snug truncate" title={cert.name}>
                        {cert.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Professional Experience with Bigger Round Logos & Connecting Dash */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-200">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                {t('timeline.experience')}
              </h3>
            </div>

            {/* Experience Timeline */}
            <div className="relative pl-10 space-y-4 before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-neutral-200">
              {experiences.map((exp) => {
                const logo = experienceLogosMap[exp.id];

                return (
                  <div key={exp.id} className="relative flex items-center">
                    {/* Bigger Round Logo Node */}
                    <div className="absolute -left-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-white border border-neutral-300 shadow-xs flex items-center justify-center shrink-0 z-10">
                      {logo ? (
                        <img
                          src={logo}
                          alt={exp.company}
                          className="w-full h-full object-contain p-0.5 bg-white"
                        />
                      ) : (
                        <Briefcase className="w-4 h-4 text-neutral-600" />
                      )}
                    </div>

                    {/* Horizontal Connector Dash */}
                    <div className="w-4 sm:w-5 h-[1.5px] bg-neutral-300 shrink-0" />

                    <button
                      type="button"
                      onClick={() => onSelectExperience(exp)}
                      className="group flex-1 min-w-0 text-left p-3 rounded-lg bg-white border border-neutral-200 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-neutral-950 leading-tight group-hover:text-blue-700">
                          {exp.role}
                        </h4>
                        <span className="text-[11px] text-neutral-500 whitespace-nowrap tabular-nums">
                          {exp.period.start} – {exp.period.end}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-700">
                        {exp.company} · {exp.location}
                      </p>
                      {exp.summary && (
                        <p className="mt-1 text-xs text-neutral-500 leading-relaxed line-clamp-2">{exp.summary}</p>
                      )}
                      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                        {t('timeline.details')}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
