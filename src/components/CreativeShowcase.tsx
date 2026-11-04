import React, { useState, useEffect } from 'react';
import { Music, ArrowRight, ExternalLink, X, Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PianoCover {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  thumbnailUrl: string;
}

const featuredCovers: PianoCover[] = [
  {
    id: 'love-story',
    title: 'Love Story',
    artist: 'Indila',
    youtubeUrl: 'https://youtu.be/rd-mG2gNM9s?si=jK1CCpUT1DsTQ2Fi',
    thumbnailUrl: 'https://img.youtube.com/vi/rd-mG2gNM9s/hqdefault.jpg',
  },
  {
    id: 'experience',
    title: 'Experience',
    artist: 'Ludovico Einaudi',
    youtubeUrl: 'https://www.youtube.com/watch?v=hN_q-_nGv4U',
    thumbnailUrl: 'https://img.youtube.com/vi/hN_q-_nGv4U/hqdefault.jpg',
  },
  {
    id: 'interstellar',
    title: 'Interstellar (Cornfield Chase)',
    artist: 'Hans Zimmer',
    youtubeUrl: 'https://www.youtube.com/watch?v=4y33h81phKU',
    thumbnailUrl: 'https://img.youtube.com/vi/4y33h81phKU/hqdefault.jpg',
  },
];

const allRepertoire = [
  { title: 'Love Story', artist: 'Indila', url: 'https://youtu.be/rd-mG2gNM9s?si=jK1CCpUT1DsTQ2Fi' },
  { title: 'Experience', artist: 'Ludovico Einaudi', url: 'https://www.youtube.com/watch?v=hN_q-_nGv4U' },
  { title: 'Interstellar (Cornfield Chase)', artist: 'Hans Zimmer', url: 'https://www.youtube.com/watch?v=4y33h81phKU' },
  { title: 'Comptine d’un autre été: L’après-midi', artist: 'Yann Tiersen', url: 'https://www.youtube.com/results?search_query=Comptine+d%E2%80%99un+autre+%C3%A9t%C3%A9+piano' },
  { title: 'River Flows in You', artist: 'Yiruma', url: 'https://www.youtube.com/results?search_query=River+Flows+in+You+piano' },
  { title: 'Nuvole Bianche', artist: 'Ludovico Einaudi', url: 'https://www.youtube.com/results?search_query=Nuvole+Bianche+piano' },
  { title: 'Pirates of the Caribbean (He’s a Pirate)', artist: 'Hans Zimmer', url: 'https://www.youtube.com/results?search_query=Pirates+of+the+Caribbean+piano+cover' },
  { title: 'Bohemian Rhapsody', artist: 'Queen', url: 'https://www.youtube.com/results?search_query=Bohemian+Rhapsody+piano+cover' },
  { title: 'Someone Like You', artist: 'Adele', url: 'https://www.youtube.com/results?search_query=Someone+Like+You+piano+cover' },
  { title: 'The Scientist', artist: 'Coldplay', url: 'https://www.youtube.com/results?search_query=The+Scientist+piano+cover' },
  { title: 'Nocturne Op. 9 No. 2', artist: 'Frédéric Chopin', url: 'https://www.youtube.com/results?search_query=Chopin+Nocturne+Op+9+No+2' },
  { title: 'Moonlight Sonata (1st & 3rd Mov.)', artist: 'Ludwig van Beethoven', url: 'https://www.youtube.com/results?search_query=Moonlight+Sonata+piano' },
];

export const CreativeShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section id="creative" className="py-6 sm:py-8 border-t border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
            <Music className="w-4 h-4 text-neutral-500" aria-hidden="true" />
            {t('piano.heading')}
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="min-h-11 inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline cursor-pointer"
          >
            {t('piano.fullRepertoire')}
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {featuredCovers.map((cover) => (
            <a
              key={cover.id}
              href={cover.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 p-1.5 rounded-lg bg-white border border-neutral-200 hover:border-neutral-400"
            >
              <span className="relative shrink-0 w-16 h-10 rounded overflow-hidden bg-neutral-900">
                <img src={cover.thumbnailUrl} alt="" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <Play className="w-3.5 h-3.5 text-white fill-white" aria-hidden="true" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-neutral-900 truncate group-hover:text-blue-700">
                  {cover.title}
                </span>
                <span className="block text-[11px] text-neutral-500 truncate">{cover.artist}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Repertoire Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-xl border border-neutral-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                    {t('piano.modalTitle')}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {t('piano.modalHint')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label={t('piano.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: List of Song Titles */}
            <div className="p-4 sm:p-5 overflow-y-auto divide-y divide-neutral-100">
              {allRepertoire.map((item, idx) => (
                <div
                  key={idx}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-neutral-900 link-hover inline-block truncate max-w-full"
                    >
                      {item.title}
                    </a>
                    <span className="block text-[11px] font-mono text-neutral-400">
                      {item.artist}
                    </span>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 rounded-md text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title={t('piano.watch', { title: item.title })}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-neutral-50 border-t border-neutral-100 text-center">
              <span className="text-[11px] font-mono text-neutral-400">
                {t('piano.footer')}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
