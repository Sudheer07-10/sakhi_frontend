import React, { useState, useRef, useEffect } from 'react';
import { Language, CareMode, ChatMessage, PostCareContext, Source } from '../types';
import { translations } from '../locales/translations';
import { SUGGESTED_QUESTIONS, MEDICAL_SOURCES } from '../data/mockData';
import { 
  Send, 
  BookOpen, 
  ShieldAlert, 
  AlertCircle, 
  FileText, 
  Edit3, 
  Trash2, 
  Info,
  Mail,
  X
} from 'lucide-react';

interface ChatViewProps {
  language: Language;
  mode: CareMode;
  userEmail: string;
  context: PostCareContext | null;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onOpenSourcesDrawer: (sources: Source[]) => void;
  onOpenSummaryModal: () => void;
  onEditContext: () => void;
  onClearContext: () => void;
  onUpdateEmail: (newEmail: string) => void;
  isGenerating: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  language,
  mode,
  userEmail,
  context,
  messages,
  onSendMessage,
  onOpenSourcesDrawer,
  onOpenSummaryModal,
  onEditContext,
  onClearContext,
  onUpdateEmail,
  isGenerating
}) => {
  const t = translations[language];
  const [inputText, setInputText] = useState('');
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(userEmail);
  const [emailError, setEmailError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    const msg = inputText.trim();
    setInputText('');
    onSendMessage(msg);
  };

  const handleSuggestedClick = (q: string) => {
    if (isGenerating) return;
    onSendMessage(q);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!tempEmail || !emailRegex.test(tempEmail.trim())) {
      setEmailError('Enter a valid email address');
      return;
    }
    onUpdateEmail(tempEmail.trim());
    setShowEditEmail(false);
    setEmailError('');
  };

  const suggestedList = SUGGESTED_QUESTIONS[language] || SUGGESTED_QUESTIONS.en;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-6.5rem)] px-4 sm:px-6 py-4 relative z-10">
      {/* S5 Post Care Persistent Top Banner */}
      {mode === 'post_care' && context && (
        <div className="mb-4 p-4 bg-white/95 border border-[#F6D9D4] text-[#3A282B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl shadow-sakhi-card">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-[#FFF0EC] border border-[#FDC4B5] text-[#FA6A48] shrink-0 font-mono text-xs uppercase rounded-xl">
              CTX
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] rounded-full">
                  {t.postCareBanner.selfReportedTag}
                </span>
                <span className="text-sm font-bold text-[#8C2432]">
                  {context.category}
                </span>
                <span className="text-xs text-[#806669]">
                  • {context.stage}
                </span>
              </div>
              <p className="text-xs text-[#806669] font-normal mt-0.5">
                {t.postCareBanner.unverifiedNote} • Contact: <span className="text-[#3A282B] font-semibold">{userEmail}</span>
                <button 
                  onClick={() => { setTempEmail(userEmail); setShowEditEmail(true); }}
                  className="underline hover:text-[#FA6A48] ml-1.5 text-xs text-[#FA6A48] font-medium"
                >
                  Edit email
                </button>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={onEditContext}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0EC] hover:bg-[#FFE2DC] text-[#FA6A48] text-xs font-semibold border border-[#FDC4B5] transition-colors rounded-full"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t.postCareBanner.editBtn}</span>
            </button>
            <button
              onClick={onClearContext}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 text-xs font-medium border border-red-200 transition-colors rounded-full"
              title="Remove stored context"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>{t.postCareBanner.clearBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* S2 Pre Care Header Bar */}
      {mode === 'pre_care' && (
        <div className="mb-4 px-4 py-3 bg-white/95 border border-[#F6D9D4] text-[#3A282B] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium rounded-2xl shadow-sakhi-card">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#FA6A48] shrink-0" />
            <span className="text-[#5A4548]">
              Pre care education mode • Indexed against ICMR and WHO clinical literature.
            </span>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs text-[#806669]">
              Email: <span className="text-[#3A282B] font-semibold">{userEmail}</span>
              <button 
                onClick={() => { setTempEmail(userEmail); setShowEditEmail(true); }}
                className="underline hover:text-[#FA6A48] ml-1.5 text-xs text-[#FA6A48]"
              >
                (Edit)
              </button>
            </span>
            <button 
              onClick={() => onOpenSourcesDrawer(MEDICAL_SOURCES)}
              className="text-[#8C2432] font-semibold underline hover:text-[#FA6A48] uppercase text-xs tracking-wider"
            >
              {t.chat.sourcesBtn}
            </button>
          </div>
        </div>
      )}

      {/* Edit Email Modal (Section 3.3) */}
      {showEditEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A282B]/50 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full p-6 border border-[#F6D9D4] rounded-2xl shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowEditEmail(false)}
              className="absolute top-4 right-4 p-1 text-[#806669] hover:text-[#8C2432]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-[#FA6A48]" />
              <h3 className="font-serif text-lg font-bold text-[#8C2432]">Edit Contact Email</h3>
            </div>
            <p className="text-xs text-[#806669] mb-4">
              Update the contact email associated with this saved Sakhi session.
            </p>
            <form onSubmit={handleSaveEmail} className="space-y-3">
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#F6D9D4] text-sm text-[#3A282B] focus:outline-none focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20 rounded-xl"
                placeholder="name@example.com"
                autoFocus
              />
              {emailError && <p className="text-xs text-red-600 font-medium">{emailError}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditEmail(false)}
                  className="px-3 py-1.5 text-xs text-[#806669] hover:text-[#3A282B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FA6A48] hover:bg-[#EE5A36] text-white text-xs font-semibold rounded-full shadow-md shadow-[#FA6A48]/30 transition-all"
                >
                  Save Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } transition-opacity duration-200`}
          >
            <div className="text-[11px] text-[#806669] mb-1 px-1 font-sans font-medium uppercase tracking-wider">
              {msg.sender === 'user' ? 'You' : 'Sakhi (సఖి)'} • {msg.timestamp}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[90%] sm:max-w-[85%] p-5 sm:p-6 text-base leading-relaxed [text-wrap:pretty] ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-[#FA6A48] to-[#FF8FA3] text-white rounded-2xl rounded-tr-xs shadow-md shadow-[#FA6A48]/20'
                  : msg.isUrgent
                  ? 'bg-[#FFF5F5] text-[#8C2432] border-2 border-red-500 rounded-2xl rounded-tl-xs shadow-sakhi-card'
                  : msg.state === 'ABSTAIN'
                  ? 'bg-white text-[#3A282B] border border-[#F6D9D4] rounded-2xl rounded-tl-xs shadow-sakhi-card'
                  : 'bg-white/95 text-[#3A282B] border border-[#F6D9D4] rounded-2xl rounded-tl-xs shadow-sakhi-card'
              }`}
            >
              {/* Urgent Callout Badge */}
              {msg.isUrgent && (
                <div className="mb-4 p-4 bg-[#8C2432] text-white rounded-xl flex items-start gap-3 text-sm shadow-md">
                  <ShieldAlert className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-white text-lg">
                      {t.chat.urgentBannerTitle}
                    </h4>
                    <p className="opacity-95 mt-1 leading-normal text-xs font-sans">
                      {t.chat.urgentBannerBody}
                    </p>
                  </div>
                </div>
              )}

              {/* Abstain Badge */}
              {msg.state === 'ABSTAIN' && (
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FA6A48]">
                  <AlertCircle className="w-4 h-4 text-[#FA6A48] shrink-0" />
                  <span>Clinical limitation notice</span>
                </div>
              )}

              {/* Message Text */}
              <div className={`whitespace-pre-wrap font-sans text-base ${
                msg.sender === 'user' ? 'text-white' : 'text-[#3A282B]'
              }`}>
                {msg.text}
              </div>

              {/* Citations Chip Bar (if EDUCATE with sources) */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-5 pt-3 border-t border-[#F6D9D4] flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-xs font-semibold text-[#8C2432] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#FA6A48]" />
                    Evidence:
                  </span>
                  {msg.sources.map((src) => (
                    <button
                      key={src.id}
                      onClick={() => onOpenSourcesDrawer([src])}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF0EC] text-[#FA6A48] border border-[#FDC4B5] hover:bg-[#FA6A48] hover:text-white transition-colors text-[11px] font-semibold rounded-full"
                      title={src.title}
                    >
                      <span>{src.id}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => onOpenSourcesDrawer(msg.sources || [])}
                    className="text-[#FA6A48] font-semibold underline hover:text-[#EE5A36] ml-2 text-[11px]"
                  >
                    View details
                  </button>
                </div>
              )}

              {/* Doctor Share Summary Button */}
              {(msg.isUrgent || mode === 'post_care') && msg.sender === 'sakhi' && (
                <div className="mt-5 pt-4 border-t border-[#F6D9D4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-[#806669]">
                    Structured notes for in-person consultation
                  </span>
                  <button
                    onClick={onOpenSummaryModal}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FA6A48] hover:bg-[#EE5A36] text-white text-xs font-semibold uppercase tracking-wider transition-all rounded-full shadow-md shadow-[#FA6A48]/30"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.chat.shareSummaryBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Skeleton Loading State */}
        {isGenerating && (
          <div className="flex flex-col items-start space-y-2 max-w-[70%]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#FA6A48] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FA6A48] animate-ping" />
              <span>{t.chat.statusAnalyzing}</span>
            </div>
            <div className="w-full bg-white p-5 border border-[#F6D9D4] rounded-2xl shadow-sakhi-card space-y-3 animate-pulse">
              <div className="h-3.5 bg-[#FFF0EC] rounded-full w-3/4"></div>
              <div className="h-3.5 bg-[#FFF0EC] rounded-full w-full"></div>
              <div className="h-3.5 bg-[#FFF0EC] rounded-full w-5/6"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 5 && (
        <div className="mb-3 overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar">
          <span className="text-xs font-semibold text-[#8C2432] shrink-0">
            {t.chat.suggestedQuestions}
          </span>
          {suggestedList.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(q)}
              className="text-xs bg-white/95 hover:bg-[#FFF0EC] text-[#3A282B] hover:text-[#8C2432] border border-[#F6D9D4] px-3.5 py-1.5 shrink-0 transition-colors font-medium text-left truncate max-w-xs rounded-full shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Message Input Bar */}
      <form onSubmit={handleSend} className="relative flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={mode === 'pre_care' ? t.chat.preCarePlaceholder : t.chat.postCarePlaceholder}
          disabled={isGenerating}
          className="flex-1 bg-white border border-[#F6D9D4] text-[#3A282B] text-sm px-5 py-3.5 focus:outline-none focus:border-[#FA6A48] focus:ring-2 focus:ring-[#FA6A48]/20 disabled:opacity-50 transition-all placeholder-[#806669]/60 rounded-full shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isGenerating}
          className="bg-[#FA6A48] hover:bg-[#EE5A36] disabled:bg-[#F6D9D4] disabled:text-[#806669] text-white px-7 py-3.5 transition-all flex items-center justify-center shrink-0 font-semibold text-xs rounded-full shadow-md shadow-[#FA6A48]/30"
          title={t.chat.sendBtn}
        >
          <Send className="w-4 h-4 mr-2" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
