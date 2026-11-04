import React, { useState, useEffect } from 'react';
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
    <div
      role="group"
      aria-label={t('nav.language')}
      className="inline-flex items-center p-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-xs font-mono"
    >
      {languages.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={`min-w-11 min-h-11 px-2 rounded transition-colors cursor-pointer ${
            language === option
              ? 'bg-white text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Desktop Navigation Links (the empty span keeps the language switcher right-aligned on mobile) */}
          <span className="md:hidden" />
          <div className="hidden md:flex items-center gap-1 sm:gap-2 -ml-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
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
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 md:hidden text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-white/95 backdrop-blur-xl border-t border-black/[0.06] z-40 flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3">
                {t('nav.navigation')}
              </span>
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
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
