import React, { useState } from 'react';
import { Language, CareMode } from '../types';
import { translations } from '../locales/translations';
import { ArrowRight, AlertCircle, Info, Check } from 'lucide-react';

interface S1WelcomeProps {
  language: Language;
  onSelectPathway: (mode: CareMode, email: string) => void;
  initialEmail: string;
}

export const S1Welcome: React.FC<S1WelcomeProps> = ({
  language,
  onSelectPathway,
  initialEmail
}) => {
  const t = translations[language];
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState('');
  const [focusedPathway, setFocusedPathway] = useState<'pre_care' | 'post_care' | null>(null);

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val || !emailRegex.test(val.trim())) {
      setEmailError(t.welcome.emailError);
      return false;
    }
    setEmailError('');
    return true;
  };

  const handlePathwayClick = (selectedMode: CareMode) => {
    if (!validateEmail(email)) {
      return;
    }
    onSelectPathway(selectedMode, email.trim());
  };

  return (
    <div
      lang={language}
      className={`max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10 ${
        language === 'te' ? 'lang-te' : ''
      }`}
    >
      {/* Editorial Hero Header — Typography First */}
      <div className="space-y-6 mb-12 max-w-3xl text-left">
        <h1
          className={`text-[#8C2432] [text-wrap:balance] ${
            language === 'te'
              ? 'font-medium text-3xl sm:text-5xl lg:text-6xl leading-[1.38] tracking-normal'
              : 'font-semibold text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.18] tracking-[-0.025em]'
          }`}
        >
          {t.welcome.title}
        </h1>

        <p
          className={`text-[#5A4548] font-normal max-w-2xl [text-wrap:pretty] ${
            language === 'te'
              ? 'text-base sm:text-lg leading-[1.8] tracking-normal'
              : 'text-base sm:text-lg leading-relaxed'
          }`}
        >
          {t.welcome.subtitle}
        </p>

        {/* Trust Signals First (Design Principle #1) */}
        <div className="pt-6 border-t border-[#F6D9D4] grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-[#3A282B]">
          <div className="flex items-start gap-3 bg-white/95 p-4 border border-[#F6D9D4] rounded-2xl shadow-sakhi-card">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">ICMR Guidelines</span>
              <span className="text-[#806669] text-xs">Accredited ART documentation</span>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/95 p-4 border border-[#F6D9D4] rounded-2xl shadow-sakhi-card">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">WHO Framework</span>
              <span className="text-[#806669] text-xs">Infertility diagnostic standards</span>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/95 p-4 border border-[#F6D9D4] rounded-2xl shadow-sakhi-card">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">FOGSI Protocols</span>
              <span className="text-[#806669] text-xs">Post retrieval symptom safety</span>
            </div>
          </div>
        </div>

        {/* Sakhi Introduction: Dual Responsibilities (Section 1) */}
        <div className="p-6 sm:p-7 bg-white/95 border border-[#F6D9D4] rounded-2xl shadow-sakhi-card text-left space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#FFF0EC] text-[#FA6A48]">
              What is Sakhi?
            </span>
            <span className="text-[#F6D9D4]">•</span>
            <span className="text-xs text-[#3A282B] font-semibold">
              Two Responsibilities, One Trusted Companion
            </span>
          </div>
          <p className="text-sm text-[#5A4548] leading-relaxed [text-wrap:pretty]">
            <strong className="text-[#8C2432]">Sakhi (సఖి)</strong> is a single web companion with two distinct roles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
            <div className="p-4 bg-[#FFF6F5] border border-[#F6D9D4] rounded-xl">
              <strong className="block text-[#8C2432] text-sm mb-1">1. Pre-Care Education</strong>
              <p className="text-[#5A4548]">
                Source-grounded general reproductive health education. Ask questions about fertility, IVF, PCOD, or tests without providing any personal treatment history.
              </p>
            </div>
            <div className="p-4 bg-[#FFF6F5] border border-[#F6D9D4] rounded-xl">
              <strong className="block text-[#8C2432] text-sm mb-1">2. Post-Care Navigation</strong>
              <p className="text-[#5A4548]">
                Care-navigation support based on voluntary, self-reported treatment context. Provides symptom safety checks and summaries to share with your treating doctor.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-[#806669] pt-1">
            * Sakhi is not connected to any hospital, does not access patient charts, does not contact doctors, and never gives clinical clearance.
          </div>
        </div>
      </div>

      {/* Required Contact Email Section */}
      <div className="bg-white/95 p-6 sm:p-8 border border-[#F6D9D4] mb-10 max-w-2xl rounded-2xl shadow-sakhi-card text-left">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <label htmlFor="user-email" className="block text-sm font-semibold text-[#3A282B]">
              {t.welcome.emailLabel}{' '}
              <span className="text-[#FA6A48] font-normal text-xs">
                ({t.welcome.emailRequired})
              </span>
            </label>
            <p className="text-xs text-[#806669] mt-1 [text-wrap:pretty]">
              {t.welcome.emailHelper}
            </p>
          </div>
        </div>

        <div className="mt-2">
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            placeholder={t.welcome.emailPlaceholder}
            className={`w-full px-4 py-3.5 border text-sm font-sans bg-[#FFF6F5] text-[#3A282B] placeholder-[#806669]/60 focus:outline-none focus:bg-white rounded-xl transition-all shadow-sm ${
              emailError
                ? 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-200'
                : 'border-[#F6D9D4] focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20'
            }`}
          />
          {emailError && (
            <p className="flex items-center gap-2 text-xs text-red-700 font-medium mt-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{emailError}</span>
            </p>
          )}
        </div>
      </div>

      {/* Pathway Selection Header */}
      <div className="mb-4 max-w-2xl flex items-center justify-between border-b border-[#F6D9D4] pb-2 text-left">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8C2432]">
          {t.welcome.selectPathway}
        </h2>
        <span className="text-xs text-[#806669]">Choose one intent</span>
      </div>

      {/* Two Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl">
        {/* Card A: Explore Pre Care */}
        <div
          onClick={() => handlePathwayClick('pre_care')}
          onMouseEnter={() => setFocusedPathway('pre_care')}
          onMouseLeave={() => setFocusedPathway(null)}
          className={`cursor-pointer p-6 sm:p-7 border rounded-2xl transition-all text-left flex flex-col justify-between relative group ${
            focusedPathway === 'pre_care'
              ? 'border-[#FA6A48] bg-white shadow-sakhi-hover ring-2 ring-[#FA6A48]/10'
              : 'border-[#F6D9D4] bg-white hover:border-[#FA6A48] shadow-sakhi-card'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                {t.welcome.preCareBadge}
              </span>
              <span className="text-xs font-mono font-semibold text-[#8C2432]/50">01</span>
            </div>
            <h3
              className={`font-semibold text-[#8C2432] mb-2 group-hover:text-[#FA6A48] transition-colors [text-wrap:balance] ${
                language === 'te'
                  ? 'text-xl sm:text-2xl leading-[1.4] tracking-normal'
                  : 'text-xl sm:text-2xl leading-snug tracking-[-0.015em]'
              }`}
            >
              {t.welcome.preCareTitle}
            </h3>
            <p className="text-xs text-[#5A4548] leading-relaxed [text-wrap:pretty]">
              {t.welcome.preCareDesc}
            </p>
          </div>

          <div className="mt-7 pt-4 border-t border-[#F6D9D4] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#FA6A48]">
            <span>{t.welcome.startBtn}</span>
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] flex items-center justify-center group-hover:bg-[#FA6A48] group-hover:text-white transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Card B: Receiving Treatment or Recovering */}
        <div
          onClick={() => handlePathwayClick('post_care')}
          onMouseEnter={() => setFocusedPathway('post_care')}
          onMouseLeave={() => setFocusedPathway(null)}
          className={`cursor-pointer p-6 sm:p-7 border rounded-2xl transition-all text-left flex flex-col justify-between relative group ${
            focusedPathway === 'post_care'
              ? 'border-[#FA6A48] bg-white shadow-sakhi-hover ring-2 ring-[#FA6A48]/10'
              : 'border-[#F6D9D4] bg-white hover:border-[#FA6A48] shadow-sakhi-card'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                {t.welcome.postCareBadge}
              </span>
              <span className="text-xs font-mono font-semibold text-[#8C2432]/50">02</span>
            </div>
            <h3
              className={`font-semibold text-[#8C2432] mb-2 group-hover:text-[#FA6A48] transition-colors [text-wrap:balance] ${
                language === 'te'
                  ? 'text-xl sm:text-2xl leading-[1.4] tracking-normal'
                  : 'text-xl sm:text-2xl leading-snug tracking-[-0.015em]'
              }`}
            >
              {t.welcome.postCareTitle}
            </h3>
            <p className="text-xs text-[#5A4548] leading-relaxed [text-wrap:pretty]">
              {t.welcome.postCareDesc}
            </p>
          </div>

          <div className="mt-7 pt-4 border-t border-[#F6D9D4] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#FA6A48]">
            <span>{t.welcome.startBtn}</span>
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] flex items-center justify-center group-hover:bg-[#FA6A48] group-hover:text-white transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Manifest Statement */}
      <div className="my-10 p-6 sm:p-8 bg-white/90 border border-[#F6D9D4] text-left max-w-2xl rounded-2xl shadow-sakhi-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#FA6A48] mb-2 font-helixa">
          Clinical Guidance Foundation
        </p>
        <blockquote className="font-times text-xl sm:text-2xl text-[#8C2432] [text-wrap:balance] leading-relaxed italic">
          "Trust signals precede interface complexity. Sakhi provides source-grounded reproductive education and conservative symptom guidance without ever imitating hospital authority."
        </blockquote>
      </div>

      {/* Non-Affiliation Disclosure */}
      <div className="p-5 bg-white/80 border border-[#F6D9D4] text-[#5A4548] flex items-start gap-3.5 text-xs leading-relaxed max-w-2xl rounded-2xl shadow-sakhi-card text-left">
        <Info className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
        <div className="[text-wrap:pretty]">
          <span className="font-semibold text-[#8C2432]">Non-affiliation disclosure: </span>
          {t.welcome.privacyNote}
        </div>
      </div>
    </div>
  );
};

