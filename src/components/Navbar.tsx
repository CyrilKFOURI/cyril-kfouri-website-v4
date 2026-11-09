import React, { Fragment } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/content';

const languages: Language[] = ['en', 'fr'];

// No section menu on purpose: the page reads top to bottom. Only the language toggle
// stays, as plain "EN / FR" text in the top-right corner that scrolls away with the hero.
export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex h-14 sm:h-16 items-center justify-end">
        <div role="group" aria-label={t('nav.language')} className="-mr-1.5 inline-flex items-center font-mono text-[12px] tracking-wide">
          {languages.map((option, index) => (
            <Fragment key={option}>
              {index > 0 && <span aria-hidden="true" className="text-neutral-300">/</span>}
              <button
                type="button"
                lang={option}
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                className={`min-h-11 min-w-9 px-1.5 transition-colors cursor-pointer ${
                  language === option ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {option.toUpperCase()}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
