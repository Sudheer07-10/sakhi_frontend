import React, { useState } from 'react';
import { Language, CareMode, DemoTrace, PostCareContext } from '../types';
import { 
  Terminal, 
  ShieldCheck, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface S7ReviewerDemoProps {
  language: Language;
  onApplyScenario: (
    scenarioMode: CareMode,
    scenarioLanguage: Language,
    email: string,
    initialQuestion: string,
    context?: PostCareContext
  ) => void;
  activeTrace: DemoTrace;
}

export const S7ReviewerDemo: React.FC<S7ReviewerDemoProps> = ({
  onApplyScenario,
  activeTrace
}) => {
  const [showTraceModal, setShowTraceModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const scenarios = [
    {
      id: "1",
      title: "Explorer (Tinglish)",
      subtitle: "Pre-Care education & sources",
      lang: "tinglish" as Language,
      mode: "pre_care" as CareMode,
      email: "explorer.tinglish@buildathon.demo",
      prompt: "IVF ante enti? Simple ga explain cheyyava?",
      desc: "Grounded answer with source attribution and test abstention fallback"
    },
    {
      id: "2",
      title: "Recovery Guidance",
      subtitle: "Post-Care self-reported",
      lang: "en" as Language,
      mode: "post_care" as CareMode,
      email: "ivf.patient@buildathon.demo",
      prompt: "I had my egg retrieval two days ago. What are normal sensations versus warning signs?",
      context: {
        category: "IVF (In Vitro Fertilization)",
        stage: "Post egg retrieval day two",
        concern: "Mild pelvic pressure and resting requirements",
        consentStored: true,
        consentOutboundEmail: false
      },
      desc: "Self reported context badge, no hospital claim, conservative recovery guidance"
    },
    {
      id: "3",
      title: "Urgent Symptoms",
      subtitle: "Emergency red-flag triage",
      lang: "tinglish" as Language,
      mode: "post_care" as CareMode,
      email: "urgent.flag@buildathon.demo",
      prompt: "Naku egg retrieval tharvatha severe abdominal pain and heavy bleeding undi.",
      context: {
        category: "IVF (In Vitro Fertilization)",
        stage: "Post egg retrieval day one",
        concern: "Acute pain, lightheadedness",
        consentStored: true,
        consentOutboundEmail: false
      },
      desc: "Bypasses normal chat. Triggers immediate urgent guidance, no clinical clearance, shareable summary not sent"
    }
  ];

  if (isMinimized) {
    return (
      <aside aria-label="Reviewer Demo Control" className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2D1B20] text-[#FFF6F5] hover:bg-[#3D252C] border border-[#F6D9D4]/40 rounded-full shadow-2xl text-xs font-semibold transition-all shadow-[#2D1B20]/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Judges Demo Harness (S7)</span>
          <ChevronUp className="w-4 h-4 text-[#FFCAD4]" />
        </button>
      </aside>
    );
  }

  return (
    <>
      <aside
        aria-label="Reviewer evaluation harness"
        className="fixed bottom-4 right-4 z-40 max-w-sm w-[92vw] sm:w-[380px] bg-[#2D1B20]/95 backdrop-blur-md text-[#FFF6F5] border border-[#F6D9D4]/30 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-3.5 animate-in slide-in-from-bottom-4 zoom-in-95 duration-200"
      >
        {/* Header with Minimize Toggle */}
        <div className="flex items-start justify-between gap-3 border-b border-[#F6D9D4]/20 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans text-sm font-bold text-white">
                Reviewer Demo Harness (S7)
              </span>
              <span className="px-2 py-0.5 bg-white/15 text-[#FFCAD4] text-[10px] uppercase font-semibold rounded-full">
                Synthetic
              </span>
            </div>
            <p className="text-[11px] text-[#FFCAD4]/80 leading-normal">
              One-click test scenarios from Specification Section 8.
            </p>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-[#FFCAD4] hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0"
            title="Minimize to button"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Vertical Stack of Scenario Cards */}
        <div className="flex flex-col gap-2.5">
          {scenarios.map((scn) => (
            <button
              key={scn.id}
              onClick={() => {
                onApplyScenario(scn.mode, scn.lang, scn.email, scn.prompt, scn.context);
              }}
              className="w-full text-left p-3 bg-[#3D252C] hover:bg-[#4E3038] border border-[#F6D9D4]/25 hover:border-[#FA6A48] transition-all rounded-xl group"
              title={scn.desc}
            >
              <div className="text-xs font-semibold text-white group-hover:text-[#FA6A48] transition-colors mb-0.5">
                {scn.title}
              </div>
              <div className="text-[11px] text-[#FFCAD4]/75 leading-tight">
                {scn.subtitle}
              </div>
            </button>
          ))}

      {/* Vertical Stack of Scenario Cards */}
      <div className="flex flex-col gap-2.5">
        {scenarios.map((scn) => (
          <button
            onClick={() => setShowTraceModal(true)}
            className="w-full text-left p-3 bg-[#FA6A48] hover:bg-[#EE5A36] text-white font-semibold text-xs transition-all rounded-xl shadow-md shadow-[#FA6A48]/30 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                Inspect Route Trace
              </div>
              <div className="text-[10px] text-white/85 leading-tight">
                Gemini model path & latency
              </div>
            </div>
            <ChevronUp className="w-4 h-4 rotate-90 text-white/80" />
            <div className="text-[11px] text-[#FFCAD4]/75 leading-tight">
              {scn.subtitle}
            </div>
          </button>
        ))}
        </div>
      </aside>
    </aside>

      {/* Trace Inspector Modal */}
      {showTraceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201E1C]/80 backdrop-blur-xs text-[#201E1C]">
          <div className="bg-[#201E1C] text-[#F4F1ED] max-w-lg w-full p-6 sm:p-7 border border-[#B3A69E]/40 rounded-[2px] relative animate-in zoom-in-95 duration-150 shadow-2xl">
            <button
              onClick={() => setShowTraceModal(false)}
              className="absolute top-5 right-5 p-2 text-[#B3A69E] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 border-b border-[#B3A69E]/20 pb-3">
              <Terminal className="w-4 h-4 text-white" />
              <div>
                <h3 className="font-serif text-xl font-normal text-white">
                  Google Gemini & Safety Route Trace
                </h3>
                <p className="text-xs text-[#B3A69E] font-mono">
                  GET /api/v1/demo/trace/{activeTrace.requestId}
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="p-3 bg-black/40 border border-[#B3A69E]/30 grid grid-cols-2 gap-3 rounded-[2px]">
                <div>
                  <span className="text-[#B3A69E] block text-[10px] uppercase tracking-wider">Route Decision:</span>
                  <span className={`font-bold text-xs ${activeTrace.routeDecision === 'URGENT_GUIDANCE' ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                    {activeTrace.routeDecision}
                  </span>
                </div>
                <div>
                  <span className="text-[#B3A69E] block text-[10px] uppercase tracking-wider">Safety Sentinel:</span>
                  <span className={`font-bold text-xs ${activeTrace.safetyFlagTriggered ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                    {activeTrace.safetyFlagTriggered ? 'FLAGGED_RED_SIGN' : 'CLEAR_PASSTHROUGH'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-black/40 border border-[#B3A69E]/30 space-y-2 rounded-[2px]">
                <div className="flex justify-between">
                  <span className="text-[#B3A69E]">Model Engine:</span>
                  <span className="text-white font-semibold">{activeTrace.geminiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B3A69E]">Total Latency:</span>
                  <span className="text-emerald-400">{activeTrace.latencyMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B3A69E]">Masked Contact:</span>
                  <span className="text-white">{activeTrace.maskedEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B3A69E]">Retrieved Sources:</span>
                  <span className="text-white">{activeTrace.retrievedSourcesCount} documents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B3A69E]">Clinic Handoff:</span>
                  <span className="text-[#B3A69E]">False (No hospital integration)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#B3A69E] border-t border-[#B3A69E]/20 pt-3 font-mono">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                PII masked • Telemetry
              </span>
              <button
                onClick={() => setShowTraceModal(false)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white text-white hover:text-[#201E1C] font-mono uppercase text-xs transition-colors rounded-[2px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
