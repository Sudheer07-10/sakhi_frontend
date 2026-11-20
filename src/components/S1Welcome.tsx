import React, { useState } from 'react';
import { Language, CareMode } from '../types';
import { translations } from '../locales/translations';
import { ArrowRight, AlertCircle, Info, Check, ShieldCheck, ChevronRight } from 'lucide-react';

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
  const [spotlightTab, setSpotlightTab] = useState<'pre_care' | 'post_care'>('pre_care');

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
      className={`max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-16 ${
        language === 'te' ? 'lang-te' : ''
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: FULL-BLEED ATMOSPHERIC HERO (MindCloud Gradient in Berry/Coral)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 -mt-4 sm:-mt-6 pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 text-center flex flex-col items-center justify-center overflow-hidden">
        {/* Full-Bleed Atmospheric Gradient Canvas */}
        <div 
          className="absolute inset-0 pointer-events-none -z-20"
          style={{
            background: `
              radial-gradient(ellipse 110% 70% at 50% 60%, rgba(250, 106, 72, 0.95) 0%, rgba(214, 52, 75, 0.92) 28%, rgba(140, 36, 50, 0.96) 52%, #1C0B12 85%),
              linear-gradient(to bottom, #16070D 0%, #280E16 30%, #8C2432 58%, #FA6A48 78%, #FFF6F5 100%)
            `
          }}
        />

        {/* Ambient Radial Flare behind Headline */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[95vw] h-[340px] bg-[#FA6A48]/35 rounded-full blur-[90px] pointer-events-none mix-blend-screen -z-10" />

        {/* Bottom smooth wash to blend into the blush canvas */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#FFF6F5]/50 to-[#FFF6F5] pointer-events-none -z-10" />

        {/* Top Centered Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/25 shadow-lg mb-8 hover:border-white/50 transition-colors relative z-10">
          <span className="w-2 h-2 rounded-full bg-[#FA6A48] animate-pulse shadow-[0_0_10px_#FA6A48]" />
          <span>{t.welcome.tag}</span>
          <span className="text-white/40">•</span>
          <span className="text-[#FFCAD4] font-bold">Verified Clinical Standards</span>
        </div>

        {/* Display Headline — Pure White High-Contrast Typography */}
        <h1
          className={`text-white font-bold tracking-[-0.035em] [text-wrap:balance] max-w-4xl mx-auto mb-6 drop-shadow-md relative z-10 ${
            language === 'te'
              ? 'text-3xl sm:text-5xl lg:text-6xl leading-[1.3] font-medium'
              : 'text-4xl sm:text-6xl lg:text-[4.5rem] leading-[1.08]'
          }`}
        >
          {t.welcome.title}
        </h1>

        {/* Centered Subheadline — Soft Tinted Ivory */}
        <p
          className={`text-[#FFEAE5] font-normal max-w-2xl mx-auto mb-10 [text-wrap:pretty] drop-shadow-sm relative z-10 ${
            language === 'te'
              ? 'text-base sm:text-lg leading-[1.8]'
              : 'text-base sm:text-lg leading-relaxed'
          }`}
        >
          {t.welcome.subtitle}
        </p>

        {/* MindCloud Floating Action Capsule */}
        <div className="w-full max-w-xl mx-auto space-y-3 relative z-10">
          <div className="bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-3 border border-white/90 shadow-[0_20px_50px_rgba(30,10,16,0.38)] flex items-center gap-2 hover:ring-4 hover:ring-white/20 focus-within:ring-4 focus-within:ring-white/30 transition-all">
            <input
              id="hero-user-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePathwayClick('pre_care');
                }
              }}
              placeholder={t.welcome.emailPlaceholder}
              className="flex-1 px-4 sm:px-5 py-2 text-sm sm:text-base font-sans bg-transparent text-[#2D1B20] placeholder-[#806669]/70 focus:outline-none"
            />

            {/* Quick Action Circular Arrow Pill Button */}
            <button
              onClick={() => handlePathwayClick('pre_care')}
              title="Continue to Pre-Care Education"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FA6A48] hover:bg-[#EE5A36] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FA6A48]/40 hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowRight className="w-5 h-5 -rotate-45" />
            </button>
          </div>

          {emailError && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-white font-medium bg-red-900/80 backdrop-blur-md px-3 py-1 rounded-full w-fit mx-auto shadow-sm">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-300" />
              <span>{emailError}</span>
            </p>
          )}

          {/* Pathway Intent Selector Pills */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FFCAD4]/90">
              Or start with:
            </span>
            <button
              onClick={() => handlePathwayClick('pre_care')}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 hover:border-white/50 text-xs font-semibold rounded-full shadow-sm backdrop-blur-md transition-all"
            >
              01 Pre-Care Education
            </button>
            <button
              onClick={() => handlePathwayClick('post_care')}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 hover:border-white/50 text-xs font-semibold rounded-full shadow-sm backdrop-blur-md transition-all"
            >
              02 Post-Care Recovery
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: TRUST & ACCREDITATION STRIP (MindCloud Marquee)
      ────────────────────────────────────────────────────────────── */}
      <section className="border-y border-[#F6D9D4]/70 py-6">
        <div className="text-left mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#806669]">
            Clinical Evidence & Accreditation Sources
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 bg-white/95 backdrop-blur-sm p-4 border border-[#F6D9D4] rounded-2xl shadow-mindcloud-sm">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">ICMR Guidelines</span>
              <span className="text-[#806669] text-xs">Accredited ART documentation</span>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/95 backdrop-blur-sm p-4 border border-[#F6D9D4] rounded-2xl shadow-mindcloud-sm">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">WHO Framework</span>
              <span className="text-[#806669] text-xs">Infertility diagnostic standards</span>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/95 backdrop-blur-sm p-4 border border-[#F6D9D4] rounded-2xl shadow-mindcloud-sm">
            <div className="w-7 h-7 rounded-full bg-[#FFF0EC] text-[#FA6A48] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-sm text-[#3A282B]">FOGSI Protocols</span>
              <span className="text-[#806669] text-xs">Post retrieval symptom safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: INTERACTIVE SPOTLIGHT (MindCloud Dark Split Card)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#2D1B20] text-[#FFF6F5] border border-[#F6D9D4]/30 rounded-3xl p-6 sm:p-10 shadow-mindcloud-dark relative overflow-hidden text-left">
        {/* Subtle radial ambient light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA6A48]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Architectural Intent */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#FFCAD4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FA6A48]" />
              <span>Independent Clinical Companion</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Two distinct responsibilities. Zero hospital dependency.
            </h2>

            <p className="text-sm text-[#FFCAD4]/85 leading-relaxed [text-wrap:pretty]">
              Sakhi is intentionally engineered as an independent healthcare companion. It bridges verified clinical literature with real patient recovery without requesting hospital credentials or medical clearance authority.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#FFCAD4]">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FA6A48]/20 text-[#FA6A48] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Pre-care education requires zero personal treatment history</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FA6A48]/20 text-[#FA6A48] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Post-care navigation is anchored on voluntary, self-reported context</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FA6A48]/20 text-[#FA6A48] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Automatic red-flag safety sentinel prompts emergency evaluation</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div className="lg:col-span-6 bg-[#3D252C] border border-[#F6D9D4]/25 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
            {/* Tab Selector */}
            <div className="flex items-center justify-between border-b border-[#F6D9D4]/20 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setSpotlightTab('pre_care')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    spotlightTab === 'pre_care'
                      ? 'bg-[#FA6A48] text-white shadow-sm'
                      : 'bg-white/5 text-[#FFCAD4] hover:bg-white/10'
                  }`}
                >
                  Pre-Care Experience
                </button>
                <button
                  onClick={() => setSpotlightTab('post_care')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    spotlightTab === 'post_care'
                      ? 'bg-[#FA6A48] text-white shadow-sm'
                      : 'bg-white/5 text-[#FFCAD4] hover:bg-white/10'
                  }`}
                >
                  Post-Care Recovery
                </button>
              </div>
              <span className="text-[10px] uppercase font-mono text-[#FFCAD4]/60">Live Preview</span>
            </div>

            {/* Simulated Interaction Display */}
            {spotlightTab === 'pre_care' ? (
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-black/30 border border-[#F6D9D4]/15 rounded-xl text-left">
                  <div className="text-[10px] uppercase font-semibold text-[#FFCAD4]/70 mb-1">User Question:</div>
                  <div className="text-white">"What are the typical preparation steps and timelines for an IVF cycle?"</div>
                </div>
                <div className="p-3.5 bg-[#2D1B20] border border-[#FA6A48]/30 rounded-xl text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#FA6A48] uppercase tracking-wider">Sakhi Response • Verified</span>
                    <span className="text-[10px] font-mono text-[#FFCAD4]/60">ICMR ART §4.2</span>
                  </div>
                  <p className="text-[#FFCAD4]/90 text-[11px] leading-relaxed">
                    An IVF cycle typically involves ovarian stimulation (8–14 days), egg retrieval, laboratory fertilization, and embryo transfer. ICMR guidelines mandate comprehensive hormonal baseline testing prior to stimulation.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 text-white text-[10px] rounded-md font-mono">
                    <span>Source: ICMR ART National Guidelines 2023</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-black/30 border border-[#F6D9D4]/15 rounded-xl text-left">
                  <div className="text-[10px] uppercase font-semibold text-[#FFCAD4]/70 mb-1">Self-Reported Symptom:</div>
                  <div className="text-white">"I had egg retrieval yesterday and now have mild cramping and bloating."</div>
                </div>
                <div className="p-3.5 bg-[#2D1B20] border border-[#FA6A48]/30 rounded-xl text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Post-Care Safety Guidance</span>
                    <span className="text-[10px] font-mono text-[#FFCAD4]/60">Self-Reported Badge</span>
                  </div>
                  <p className="text-[#FFCAD4]/90 text-[11px] leading-relaxed">
                    Mild pelvic pressure and light cramping are commonly reported after retrieval. FOGSI protocols recommend hydration and rest. If severe sharp pain, rapid weight gain, or shortness of breath develops, contact your clinic immediately.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 text-white text-[10px] rounded-md font-mono">
                    <span>Summary prepared for your doctor</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: CLINICAL BENTO GRID (MindCloud 4-Cell Grid)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6 text-left">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C2432]">
            Evidence-Based Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#8C2432] mt-1">
            Built on clinical guidelines. Engineered for safety.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Source Attribution */}
          <div className="p-6 bg-white/95 backdrop-blur-sm border border-[#F6D9D4] rounded-2xl shadow-mindcloud-md flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#FFF0EC] text-[#FA6A48]">
                Peer-Reviewed Evidence
              </span>
              <h3 className="text-lg font-semibold text-[#8C2432] mt-2 mb-1.5">
                Every recommendation is anchored in verifiable clinical literature.
              </h3>
              <p className="text-xs text-[#5A4548] leading-relaxed">
                Sakhi queries an indexed repository of accredited maternal and fertility frameworks (ICMR ART Guidelines, WHO Infertility Series, FOGSI Safety Handbooks) to guarantee answers reflect medical consensus.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F6D9D4]/60">
              <span className="px-2 py-0.5 bg-[#FFF6F5] text-[#8C2432] text-[10px] font-mono rounded border border-[#F6D9D4]">ICMR ART §4.2</span>
              <span className="px-2 py-0.5 bg-[#FFF6F5] text-[#8C2432] text-[10px] font-mono rounded border border-[#F6D9D4]">WHO Factsheet #399</span>
              <span className="px-2 py-0.5 bg-[#FFF6F5] text-[#8C2432] text-[10px] font-mono rounded border border-[#F6D9D4]">FOGSI Protocols</span>
            </div>
          </div>

          {/* Card 2: Safety Sentinel */}
          <div className="p-6 bg-white/95 backdrop-blur-sm border border-[#F6D9D4] rounded-2xl shadow-mindcloud-md flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-50 text-red-700">
                Safety First Sentinel
              </span>
              <h3 className="text-lg font-semibold text-[#8C2432] mt-2 mb-1.5">
                Instant emergency triage when warning signs appear.
              </h3>
              <p className="text-xs text-[#5A4548] leading-relaxed">
                If self-reported symptoms indicate acute distress, severe bleeding, or OHSS indicators, Sakhi halts standard education and immediately issues urgent emergency guidance without providing false clinical clearance.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F6D9D4]/60 flex items-center justify-between text-[11px] text-[#806669]">
              <span>Emergency Hotline: 108</span>
              <span className="font-semibold text-red-700">Zero False Reassurance</span>
            </div>
          </div>

          {/* Card 3: Multilingual & Tinglish */}
          <div className="p-6 bg-white/95 backdrop-blur-sm border border-[#F6D9D4] rounded-2xl shadow-mindcloud-md flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#FFF0EC] text-[#FA6A48]">
                Localized Interaction
              </span>
              <h3 className="text-lg font-semibold text-[#8C2432] mt-2 mb-1.5">
                Fluent in English, Telugu script, and conversational Tinglish.
              </h3>
              <p className="text-xs text-[#5A4548] leading-relaxed">
                Patients can communicate naturally in Telugu script or phonetic Latin script (Tinglish), ensuring culturally sensitive maternal guidance is accessible regardless of language preference.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F6D9D4]/60 flex items-center gap-2 text-xs font-semibold text-[#8C2432]">
              <span>EN • English</span>
              <span>•</span>
              <span>తెలుగు • Telugu</span>
              <span>•</span>
              <span>Tinglish</span>
            </div>
          </div>

          {/* Card 4: Patient Privacy */}
          <div className="p-6 bg-white/95 backdrop-blur-sm border border-[#F6D9D4] rounded-2xl shadow-mindcloud-md flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#FFF0EC] text-[#FA6A48]">
                Absolute Privacy
              </span>
              <h3 className="text-lg font-semibold text-[#8C2432] mt-2 mb-1.5">
                Zero hospital chart lock-in. Client-side privacy controls.
              </h3>
              <p className="text-xs text-[#5A4548] leading-relaxed">
                Sakhi makes no false claims of hospital EMR connectivity. Voluntary intake data remains in your local browser storage and can be wiped or exported for your doctor at any time.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F6D9D4]/60 flex items-center justify-between text-[11px] text-[#806669]">
              <span>No EMR Tracking</span>
              <span className="font-semibold text-emerald-700">Client-Side Isolation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STATS & METRICS ROW (MindCloud Counter Style)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-white/95 backdrop-blur-sm border border-[#F6D9D4] rounded-2xl p-6 sm:p-8 shadow-mindcloud-md text-left">
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C2432]">
            System Verification Metrics
          </h3>
          <p className="text-lg font-semibold text-[#3A282B] mt-0.5">
            The numbers behind independent clinical education.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1 border-l-2 border-[#FA6A48] pl-3">
            <div className="text-3xl sm:text-4xl font-bold text-[#8C2432] tracking-tight">100%</div>
            <div className="text-xs font-semibold text-[#3A282B]">Independent Education</div>
            <div className="text-[11px] text-[#806669]">No clinical authority imitation</div>
          </div>
          <div className="space-y-1 border-l-2 border-[#FA6A48] pl-3">
            <div className="text-3xl sm:text-4xl font-bold text-[#8C2432] tracking-tight">3</div>
            <div className="text-xs font-semibold text-[#3A282B]">Accredited Guidelines</div>
            <div className="text-[11px] text-[#806669]">ICMR, WHO, and FOGSI</div>
          </div>
          <div className="space-y-1 border-l-2 border-[#FA6A48] pl-3">
            <div className="text-3xl sm:text-4xl font-bold text-[#8C2432] tracking-tight">&lt;150ms</div>
            <div className="text-xs font-semibold text-[#3A282B]">Safety Route Latency</div>
            <div className="text-[11px] text-[#806669]">Gemini sentinel triage checks</div>
          </div>
          <div className="space-y-1 border-l-2 border-[#FA6A48] pl-3">
            <div className="text-3xl sm:text-4xl font-bold text-[#8C2432] tracking-tight">0</div>
            <div className="text-xs font-semibold text-[#3A282B]">Hospital Chart Dependencies</div>
            <div className="text-[11px] text-[#806669]">Zero patient record lock-in</div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: DUAL PATHWAY CARDS (Primary Actions)
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-[#F6D9D4] pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8C2432]">
            {t.welcome.selectPathway}
          </h2>
          <span className="text-xs text-[#806669]">Choose your intended journey</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Explore Pre Care */}
          <div
            onClick={() => handlePathwayClick('pre_care')}
            onMouseEnter={() => setFocusedPathway('pre_care')}
            onMouseLeave={() => setFocusedPathway(null)}
            className={`cursor-pointer p-6 sm:p-7 border rounded-2xl transition-all text-left flex flex-col justify-between relative group ${
              focusedPathway === 'pre_care'
                ? 'border-[#FA6A48] bg-white shadow-mindcloud-lg ring-2 ring-[#FA6A48]/15'
                : 'border-[#F6D9D4] bg-white/95 backdrop-blur-sm hover:border-[#FA6A48] shadow-mindcloud-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                  {t.welcome.preCareBadge}
                </span>
                <span className="text-xs font-mono font-semibold text-[#8C2432]/60">01</span>
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
                ? 'border-[#FA6A48] bg-white shadow-mindcloud-lg ring-2 ring-[#FA6A48]/15'
                : 'border-[#F6D9D4] bg-white/95 backdrop-blur-sm hover:border-[#FA6A48] shadow-mindcloud-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                  {t.welcome.postCareBadge}
                </span>
                <span className="text-xs font-mono font-semibold text-[#8C2432]/60">02</span>
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
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: FINAL CTA SURFACE & LEGAL NON-AFFILIATION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-4 text-left">
        {/* MindCloud Signature Call To Action Card */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#8C2432] to-[#2D1B20] text-white rounded-3xl shadow-mindcloud-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFCAD4]">
              Start Your Confidential Session
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              Ready to explore reproductive health or navigate recovery?
            </h3>
            <p className="text-xs text-[#FFCAD4]/85 leading-relaxed">
              Begin with pre-care education or enter voluntary post-treatment details to receive conservative safety instructions.
            </p>
          </div>
          <button
            onClick={() => handlePathwayClick('pre_care')}
            className="px-6 py-3.5 bg-[#FA6A48] hover:bg-[#EE5A36] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-mindcloud-coral transition-all flex items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.welcome.startBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Non-Affiliation Disclosure */}
        <div className="p-5 bg-white/80 backdrop-blur-sm border border-[#F6D9D4] text-[#5A4548] flex items-start gap-3.5 text-xs leading-relaxed rounded-2xl shadow-mindcloud-sm">
          <Info className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
          <div className="[text-wrap:pretty]">
            <span className="font-semibold text-[#8C2432]">Non-affiliation disclosure: </span>
            {t.welcome.privacyNote}
          </div>
        </div>
      </section>
    </div>
  );
};
