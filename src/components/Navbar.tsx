import React, { Fragment, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import type { UiKey } from '../i18n/ui';
import type { Language } from '../i18n/content';

interface NavItem {
  labelKey: UiKey;
  href: string;
}

const navItems: NavItem[] = [
  { labelKey: 'nav.projects', href: '#projects' },
  { labelKey: 'nav.experience', href: '#experience' },
  { labelKey: 'nav.education', href: '#education' },
];

const languages: Language[] = ['en', 'fr'];

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    // Plain text toggle, "EN / FR": the active language is simply darker.
    <div role="group" aria-label={t('nav.language')} className="inline-flex items-center font-mono text-[12px] tracking-wide">
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
  );
};

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // Section links scroll in place: following "#projects" would add a history entry,
  // so Back would walk through sections instead of leaving the page.
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    closeMenu();
    // Wait for the mobile drawer to release its scroll lock before scrolling.
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  return (
    // Sits on top of the hero and scrolls away with it: the page is short enough
    // that a bar following the reader would only take screen space.
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Desktop Navigation Links (the empty span keeps the language switcher right-aligned on mobile) */}
          <span className="md:hidden" />
          <div className="hidden md:flex items-center gap-1 sm:gap-2 -ml-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className="px-3 py-1 text-xs sm:text-sm font-medium text-neutral-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-md transition-colors"
              >
                {t(item.labelKey)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitch />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-1.5 md:hidden text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
              aria-label={t('nav.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col justify-between px-6 pb-6 overflow-y-auto"
          >
            {/* The bar scrolls away with the page, so the drawer carries its own close button. */}
            <div className="space-y-2">
              <div className="flex h-14 items-center justify-end -mr-2">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-1.5 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
                  aria-label={t('nav.closeMenu')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3">
                {t('nav.navigation')}
              </span>
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => scrollToSection(event, item.href)}
                    className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 rounded-lg transition-colors"
                  >
                    <span>{t(item.labelKey)}</span>
                    <span className="text-xs font-mono text-neutral-400">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>{t('nav.language')}</span>
              <LanguageSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
