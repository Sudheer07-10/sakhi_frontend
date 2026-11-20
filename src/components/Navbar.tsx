import React from 'react';
import { Language, CareMode } from '../types';
import { translations } from '../locales/translations';
import { ShieldAlert, RotateCcw } from 'lucide-react';

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors ${
        mode === 'welcome'
          ? 'bg-[#16070D]/80 backdrop-blur-xl border-b border-white/10 text-white'
          : 'bg-[#FFF6F5]/90 backdrop-blur-md border-b border-[#F6D9D4] text-[#3A282B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity (MindCloud Style) */}
        <button
          onClick={onResetSession}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FA6A48] to-[#FF8FA3] flex items-center justify-center text-white shadow-sm shadow-[#FA6A48]/30 group-hover:scale-105 transition-transform">
            <span className="font-sans text-base font-bold">స</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-sans text-xl font-bold tracking-tight transition-colors ${
                mode === 'welcome'
                  ? 'text-white group-hover:text-[#FA6A48]'
                  : 'text-[#8C2432] group-hover:text-[#FA6A48]'
              }`}
            >
              {t.brandName}
            </span>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                mode === 'welcome'
                  ? 'text-[#FFCAD4] bg-white/10 border border-white/20'
                  : 'text-[#806669] bg-[#FFF0EC] border border-[#FDC4B5]'
              }`}
            >
              v3.1
            </span>
          </div>
        </button>

        {/* Center: Sleek MindCloud Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-normal">
          <button
            onClick={() => scrollToSection('hero-section')}
            className={`transition-colors ${
              mode === 'welcome'
                ? 'text-white/80 hover:text-white'
                : 'text-[#5A4548] hover:text-[#8C2432]'
            }`}
          >
            Pre-Care
          </button>
          <button
            onClick={() => scrollToSection('hero-section')}
            className={`transition-colors ${
              mode === 'welcome'
                ? 'text-white/80 hover:text-white'
                : 'text-[#5A4548] hover:text-[#8C2432]'
            }`}
          >
            Post-Care
          </button>
          <button
            onClick={() => scrollToSection('bento-grid')}
            className={`transition-colors ${
              mode === 'welcome'
                ? 'text-white/80 hover:text-white'
                : 'text-[#5A4548] hover:text-[#8C2432]'
            }`}
          >
            Clinical Evidence
          </button>
          <button
            onClick={() => scrollToSection('spotlight-section')}
            className={`transition-colors ${
              mode === 'welcome'
                ? 'text-white/80 hover:text-white'
                : 'text-[#5A4548] hover:text-[#8C2432]'
            }`}
          >
            Safety Architecture
          </button>
        </nav>

        {/* Right: Actions, Languages & Emergency */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Emergency 108 Alert Badge */}
          <button
            onClick={onOpenEmergencyModal}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
              mode === 'welcome'
                ? 'bg-red-500/15 hover:bg-red-500/25 text-red-200 border border-red-400/30'
                : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
            }`}
            title="Emergency Medical Hotline"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Emergency 108</span>
          </button>

          {/* Tri-Lingual Language Segmented Control */}
          <div
            className={`flex items-center p-0.5 text-xs rounded-full gap-0.5 shadow-sm ${
              mode === 'welcome'
                ? 'bg-white/10 border border-white/20'
                : 'bg-white border border-[#F6D9D4]'
            }`}
          >
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-[11px] rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-2.5 py-1 text-[11px] rounded-full transition-all ${
                language === 'te'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
                }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('tinglish')}
              className={`px-2.5 py-1 text-[11px] rounded-full transition-all ${
                language === 'tinglish'
                  ? 'bg-[#FA6A48] text-white font-semibold shadow-sm'
                  : mode === 'welcome'
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#3A282B] hover:bg-[#FFF0EC]'
                }`}
            >
              Tinglish
            </button>
          </div>

          {/* Reviewer Mode Pill */}
          <button
            onClick={onToggleDemoMode}
            className={`hidden md:flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
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
              className="p-1.5 text-[#8C2432] bg-white hover:bg-[#FFF0EC] border border-[#F6D9D4] rounded-full transition-colors shadow-sm"
              title={t.navReset}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* MindCloud 'Get Started >' CTA Button */}
          <button
            onClick={() => scrollToSection('hero-section')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FA6A48] hover:bg-[#EE5A36] text-white font-semibold text-xs rounded-full shadow-mindcloud-coral hover:scale-105 active:scale-95 transition-all"
          >
            <span>Get Started</span>
            <span className="text-[10px]">›</span>
          </button>
        </div>
      </div>
    </header>
  );
};
