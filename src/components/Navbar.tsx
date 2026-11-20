import React from 'react';
import { Language, CareMode } from '../types';
import { translations } from '../locales/translations';
import { ShieldAlert, Globe, RotateCcw } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: CareMode;
  onResetSession: () => void;
  demoModeActive: boolean;
  onToggleDemoMode: () => void;
  onOpenEmergencyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  mode,
  onResetSession,
  demoModeActive,
  onToggleDemoMode,
  onOpenEmergencyModal
}) => {
  const t = translations[language];

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors ${
        mode === 'welcome'
          ? 'bg-[#16070D]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#FFF6F5]/90 backdrop-blur-md border-b border-[#F6D9D4]'
      }`}
    >
      {/* Top Clinical Safety Bar */}
      <div className="bg-[#8C2432] text-[#FFF6F5] px-4 sm:px-6 py-2 text-xs flex items-center justify-between font-sans shadow-sm">
        <div className="flex items-center gap-2 truncate">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FFCAD4] shrink-0" />
          <span className="truncate font-medium">{t.emergencyBar}</span>
        </div>
        <button
          onClick={onOpenEmergencyModal}
          className="text-[#FFCAD4] underline text-xs font-semibold shrink-0 hover:text-white transition-colors ml-4"
        >
          National Emergency Numbers (108)
        </button>
      </div>

      {/* Main Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={onResetSession}
          className="flex items-center gap-3 text-left group focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FA6A48] to-[#FF8FA3] flex items-center justify-center text-white shadow-sm shadow-[#FA6A48]/30">
            <span className="font-sans text-lg font-bold">స</span>
          </div>
          <div>
            <span
              className={`font-sans text-2xl font-bold tracking-tight transition-colors ${
                mode === 'welcome'
                  ? 'text-white group-hover:text-[#FA6A48]'
                  : 'text-[#8C2432] group-hover:text-[#FA6A48]'
              }`}
            >
              {t.brandName}
            </span>
            <span
              className={`hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                mode === 'welcome'
                  ? 'text-[#FFCAD4] bg-white/10 border border-white/20'
                  : 'text-[#806669] bg-[#FFF0EC] border border-[#FDC4B5]'
              }`}
            >
              v3.1
            </span>
          </div>
        </button>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-3">
          {/* Active Mode Pill */}
          {mode !== 'welcome' && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 text-xs font-medium border border-[#F6D9D4] bg-white text-[#8C2432] rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FA6A48]" />
              <span className="uppercase tracking-wider font-mono text-[10px]">
                {mode === 'pre_care' ? t.navPreCare : t.navPostCare}
              </span>
            </div>
          )}

          {/* Tri-Lingual Language Segmented Control */}
          <div
            className={`flex items-center p-1 text-xs rounded-full gap-1 shadow-sm ${
              mode === 'welcome'
                ? 'bg-white/10 border border-white/20'
                : 'bg-white border border-[#F6D9D4]'
            }`}
          >
            <Globe
              className={`w-3.5 h-3.5 ml-1.5 mr-0.5 hidden sm:block ${
                mode === 'welcome' ? 'text-[#FFCAD4]' : 'text-[#806669]'
              }`}
            />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                language === 'te'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('tinglish')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                language === 'tinglish'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
              }`}
            >
              Tinglish
            </button>
          </div>

          {/* Reviewer / Judge Mode Toggle */}
          <button
            onClick={onToggleDemoMode}
            className={`flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              demoModeActive
                ? 'bg-[#FA6A48] text-white border-[#FA6A48] shadow-sm shadow-[#FA6A48]/30'
                : mode === 'welcome'
                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                : 'bg-white text-[#8C2432] border-[#F6D9D4] hover:bg-[#FFF0EC]'
            }`}
            title="Toggle Reviewer test harness"
          >
            <span>{t.demoBadge}</span>
          </button>

          {/* Reset / New Session */}
          {mode !== 'welcome' && (
            <button
              onClick={onResetSession}
              className="p-2 text-[#8C2432] bg-white hover:bg-[#FFF0EC] border border-[#F6D9D4] rounded-full transition-colors shadow-sm"
              title={t.navReset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
