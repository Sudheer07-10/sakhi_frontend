import React from 'react';
import { Language, Source } from '../types';
import { translations } from '../locales/translations';
import { BookOpen, X, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';

interface S3SourcesDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  sources: Source[];
}

export const S3SourcesDrawer: React.FC<S3SourcesDrawerProps> = ({
  language,
  isOpen,
  onClose,
  sources
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#3A282B]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full border-l border-[#F6D9D4] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#F6D9D4] flex items-center justify-between bg-[#FFF6F5]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFF0EC] text-[#FA6A48] rounded-xl border border-[#FDC4B5]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#8C2432]">
                {t.sourcesDrawer.title}
              </h3>
              <p className="text-xs text-[#806669] font-normal">
                {t.sourcesDrawer.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#806669] hover:text-[#8C2432] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinical Disclaimer Strip */}
        <div className="px-6 py-3 bg-[#FFF0EC] border-b border-[#FDC4B5] text-[#3A282B] text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
          <p className="leading-normal [text-wrap:pretty] text-[#5A4548]">
            {t.sourcesDrawer.disclaimer}
          </p>
        </div>

        {/* Source Cards Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {sources.map((src) => (
            <div 
              key={src.id}
              className="p-5 border border-[#F6D9D4] bg-white rounded-2xl shadow-sakhi-card hover:border-[#FA6A48] transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                  {src.id}
                </span>
                <span className="text-xs font-mono text-[#806669]">
                  {src.year}
                </span>
              </div>

              <h4 className="font-serif text-base font-bold text-[#8C2432] leading-snug [text-wrap:balance]">
                {src.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-[#806669]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FA6A48]" />
                <span>{src.publisher}</span>
              </div>

              <div className="p-3 bg-[#FFF6F5] text-xs text-[#5A4548] leading-relaxed border border-[#F6D9D4] rounded-xl italic">
                "{src.excerpt}"
              </div>

              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FA6A48] hover:text-[#EE5A36] pt-1"
                >
                  <span>Verification link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-artocea-4 border-t border-[#B3A69E]/30 bg-[#F4F1ED] flex justify-end">
          <button
            onClick={onClose}
            className="px-artocea-6 py-artocea-2 bg-[#201E1C] text-white font-mono uppercase tracking-wider text-artocea-xs hover:bg-black transition-colors"
          >
            {t.sourcesDrawer.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
