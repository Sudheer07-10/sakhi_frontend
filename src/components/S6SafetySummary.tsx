import React, { useState } from 'react';
import { Language, PostCareContext, ChatMessage } from '../types';
import { translations } from '../locales/translations';
import { ShieldAlert, Copy, Check, FileText, X, AlertTriangle, Download } from 'lucide-react';

interface S6SafetySummaryProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  context: PostCareContext | null;
  messages: ChatMessage[];
}

export const S6SafetySummary: React.FC<S6SafetySummaryProps> = ({
  language,
  isOpen,
  onClose,
  userEmail,
  context,
  messages
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summaryTimestamp = new Date().toLocaleString();
  const reportedConcerns = messages
    .filter(m => m.sender === 'user')
    .map(m => `• [${m.timestamp}] "${m.text}"`)
    .join('\n');

  const formattedSummaryText = `=====================================================
SAKHI USER-REPORTED HEALTHCARE SUMMARY
STATUS: NOT SENT TO CLINICIAN • NOT CLINICALLY VERIFIED
DATE/TIME: ${summaryTimestamp}
ASSOCIATED EMAIL: ${userEmail} (Voluntarily provided)
=====================================================

1. VOLUNTARY TREATMENT CONTEXT (SELF-REPORTED):
   - Category: ${context?.category || 'Not specified'}
   - Approximate Stage: ${context?.stage || 'Not specified'}
   - Initial Reported Concern: ${context?.concern || 'None declared at intake'}
   - Hospital Verification: NONE (Self-reported by user)

2. USER DIALOGUE & REPORTED SYMPTOMS:
${reportedConcerns || '   No user dialogue entries recorded in this session.'}

3. SAKHI SAFETY INSTRUCTION:
   This summary is generated at the request of the user for in-person 
   consultation with licensed medical doctors. Sakhi provides general education 
   only and does not diagnose, verify medical stability, or notify emergency services.
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedSummaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sakhi_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A282B]/50 backdrop-blur-xs">
      <div className="bg-white max-w-xl w-full p-6 sm:p-8 border border-[#F6D9D4] rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#806669] hover:text-[#8C2432] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3 border-b border-[#F6D9D4] pb-3">
          <div className="p-2.5 bg-[#FFF0EC] text-[#FA6A48] rounded-xl shrink-0">
            <FileText className="w-5 h-5 text-[#FA6A48]" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#8C2432]">
              {t.summaryModal.title}
            </h3>
            <p className="text-xs text-[#806669] font-normal">
              {t.summaryModal.intro}
            </p>
          </div>
        </div>

        {/* Watermark Banner */}
        <div className="p-3 bg-[#FFF0EC] border border-[#FDC4B5] text-[#8C2432] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-4 justify-center text-center rounded-xl">
          <ShieldAlert className="w-4 h-4 text-[#8C2432] shrink-0" />
          <span>{t.summaryModal.watermark}</span>
        </div>

        {/* Text Container */}
        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-[#2D1B20] text-[#FFF0EC] font-mono text-xs leading-relaxed border border-[#4A2B33] select-all whitespace-pre-wrap rounded-xl">
          {formattedSummaryText}
        </div>

        {/* Notice on Doctor Dispatch */}
        <div className="p-3.5 bg-[#FFF6F5] border border-[#F6D9D4] text-[#5A4548] text-xs flex items-start gap-2.5 mb-4 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
          <p className="leading-normal [text-wrap:pretty]">
            Sakhi did not send this document to your clinic. Please download, print, or show this screen in person during your clinical appointment.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F6D9D4]">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#806669] hover:text-[#8C2432] px-3 py-2"
          >
            {t.summaryModal.closeBtn}
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#F6D9D4] hover:border-[#FA6A48] text-[#8C2432] text-xs font-semibold uppercase tracking-wider transition-colors rounded-full"
            >
              <Download className="w-4 h-4 text-[#FA6A48]" />
              <span>Download (.txt)</span>
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-full shadow-md shadow-[#FA6A48]/30 ${
                copied 
                  ? 'bg-[#8C2432] text-white' 
                  : 'bg-[#FA6A48] hover:bg-[#EE5A36] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.summaryModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.summaryModal.copyBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
