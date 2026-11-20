import React, { useState } from 'react';
import { Language, PostCareContext } from '../types';
import { translations } from '../locales/translations';
import { ShieldAlert, CheckSquare, Square, ArrowRight, X } from 'lucide-react';

interface S4PostCareIntakeProps {
  language: Language;
  userEmail: string;
  onSaveContext: (context: PostCareContext) => void;
  onSkip: () => void;
  onClose?: () => void;
  initialContext?: Partial<PostCareContext>;
}

export const S4PostCareIntake: React.FC<S4PostCareIntakeProps> = ({
  language,
  userEmail,
  onSaveContext,
  onSkip,
  onClose,
  initialContext
}) => {
  const t = translations[language];

  const [category, setCategory] = useState(initialContext?.category || 'IVF (In Vitro Fertilization)');
  const [stage, setStage] = useState(initialContext?.stage || 'Post egg retrieval day two');
  const [concern, setConcern] = useState(initialContext?.concern || '');
  const [consentStored, setConsentStored] = useState(initialContext?.consentStored ?? true);
  const [consentOutboundEmail, setConsentOutboundEmail] = useState(initialContext?.consentOutboundEmail ?? false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentStored) {
      setError(t.postCareIntake.consentRequiredError);
      return;
    }
    setError('');
    onSaveContext({
      category,
      stage,
      concern,
      consentStored,
      consentOutboundEmail
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A282B]/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-lg w-full p-6 sm:p-8 border border-[#F6D9D4] rounded-2xl shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#806669] hover:text-[#8C2432] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="mb-4 border-b border-[#F6D9D4] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FA6A48] block mb-1">
            Voluntary Context Intake
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#8C2432]">
            {t.postCareIntake.modalTitle}
          </h2>
          <p className="text-xs text-[#806669] mt-1">
            Contact: <span className="text-[#3A282B] font-semibold">{userEmail}</span> (Self-reported)
          </p>
        </div>

        {/* Mandatory Disclosure Alert */}
        <div className="p-4 bg-[#FFF0EC] border border-[#FDC4B5] text-[#3A282B] text-xs leading-relaxed mb-6 space-y-1 rounded-xl">
          <div className="flex items-center gap-2 font-semibold uppercase text-[#8C2432] text-[11px] tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#FA6A48] shrink-0" />
            <span>Mandatory non-hospital disclosure</span>
          </div>
          <p className="[text-wrap:pretty] text-[#5A4548]">
            {t.postCareIntake.mandatoryDisclaimer}
          </p>
        </div>

        {/* Voluntary Intake Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A282B] mb-1.5">
              {t.postCareIntake.categoryLabel}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#F6D9D4] bg-[#FFF6F5] text-sm text-[#3A282B] focus:outline-none focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20 rounded-xl"
            >
              <option value="IVF (In Vitro Fertilization)">IVF (In Vitro Fertilization)</option>
              <option value="IUI (Intrauterine Insemination)">IUI (Intrauterine Insemination)</option>
              <option value="Laparoscopy / Pelvic Surgery">Laparoscopy / Pelvic Surgery</option>
              <option value="Endometriosis Management">Endometriosis Management</option>
              <option value="Ovarian Stimulation Cycle">Ovarian Stimulation Cycle</option>
              <option value="Other Reproductive Procedure">Other Reproductive Procedure</option>
            </select>
          </div>

          {/* Timing/Stage */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A282B] mb-1.5">
              {t.postCareIntake.stageLabel}
            </label>
            <input
              type="text"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder={t.postCareIntake.stagePlaceholder}
              className="w-full px-3.5 py-2.5 border border-[#F6D9D4] bg-[#FFF6F5] text-sm text-[#3A282B] focus:outline-none focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20 placeholder-[#806669]/60 rounded-xl"
            />
          </div>

          {/* Concern */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A282B] mb-1.5">
              {t.postCareIntake.concernLabel}
            </label>
            <textarea
              rows={2}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder={t.postCareIntake.concernPlaceholder}
              className="w-full px-3.5 py-2.5 border border-[#F6D9D4] bg-[#FFF6F5] text-sm text-[#3A282B] focus:outline-none focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20 placeholder-[#806669]/60 rounded-xl"
            />
          </div>

          {/* Consents */}
          <div className="space-y-3 pt-1">
            <div 
              onClick={() => setConsentStored(!consentStored)}
              className="flex items-start gap-3 cursor-pointer text-xs text-[#3A282B] select-none"
            >
              {consentStored ? (
                <CheckSquare className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-[#806669] shrink-0 mt-0.5" />
              )}
              <span className="font-semibold text-[#3A282B]">
                {t.postCareIntake.consentStoreLabel}{' '}
                <span className="text-[#8C2432] font-bold">*</span>
              </span>
            </div>

            <div 
              onClick={() => setConsentOutboundEmail(!consentOutboundEmail)}
              className="flex items-start gap-3 cursor-pointer text-xs text-[#5A4548] select-none"
            >
              {consentOutboundEmail ? (
                <CheckSquare className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-[#806669] shrink-0 mt-0.5" />
              )}
              <span>{t.postCareIntake.consentEmailLabel}</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-800 font-semibold bg-red-50 p-3 border border-red-200 rounded-xl">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F6D9D4]">
            <button
              type="button"
              onClick={onSkip}
              className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold text-[#806669] hover:text-[#8C2432] py-2 px-4 transition-colors order-2 sm:order-1"
            >
              {t.postCareIntake.skipBtn}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FA6A48] hover:bg-[#EE5A36] text-white font-semibold text-xs uppercase tracking-wider py-3 px-7 transition-all rounded-full shadow-md shadow-[#FA6A48]/30 order-1 sm:order-2"
            >
              <span>{t.postCareIntake.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
