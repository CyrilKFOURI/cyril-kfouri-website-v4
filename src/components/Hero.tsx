import React from 'react';
import { FileDown, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import profilePhoto from '../assets/Cyril_Kfouri.png';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Hero: React.FC = () => {
  const { language, t, content } = useLanguage();
  const { profile } = content;
  return (
    <section id="top" className="relative pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left Column: Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="md:col-span-7 space-y-3.5"
          >
            {/* Headline */}
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
                {profile.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 font-medium">
                {profile.headline}
              </p>
            </div>

            {/* Ultra-concise Bio */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              {profile.tagline}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>{profile.location}</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href={profile.cv[language] ?? profile.cv.en}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-xs"
              >
                <FileDown className="w-3.5 h-3.5 text-white" />
                <span>{t('hero.resume')}</span>
              </a>

              {/* Quick Socials */}
              <div className="flex items-center gap-2 pl-0.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-700 hover:text-white bg-white hover:bg-neutral-950 border border-neutral-200 hover:border-neutral-950 rounded-lg shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer ring-0 hover:ring-2 hover:ring-neutral-400/30"
                  aria-label="GitHub"
                  title={t('hero.githubTitle')}
                >
                  <GitHubIcon />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 hover:text-blue-600 bg-white hover:bg-blue-50/70 border border-neutral-200 hover:border-blue-300 rounded-lg shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="LinkedIn"
                  title={t('hero.linkedinTitle')}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-1.5 text-neutral-600 hover:text-blue-600 bg-white hover:bg-blue-50/70 border border-neutral-200 hover:border-blue-300 rounded-lg shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label={t('footer.email')}
                  title={t('hero.emailTitle')}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Transparent Photo without frame (smaller & balanced) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[200px] sm:max-w-[230px]">
              <img
                src={profilePhoto}
                alt={profile.name}
                className="w-full h-auto object-contain filter drop-shadow-xs select-none"
                loading="eager"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
