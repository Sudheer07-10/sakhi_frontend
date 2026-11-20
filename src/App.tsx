import { useState, useEffect } from 'react';
import { Language, CareMode, ChatMessage, PostCareContext, Source, DemoTrace } from './types';
import { translations } from './locales/translations';
import { MEDICAL_SOURCES, INITIAL_DEMO_TRACE } from './data/mockData';
import { Navbar } from './components/Navbar';
import { S1Welcome } from './components/S1Welcome';
import { ChatView } from './components/ChatView';
import { S4PostCareIntake } from './components/S4PostCareIntake';
import { S3SourcesDrawer } from './components/S3SourcesDrawer';
import { S6SafetySummary } from './components/S6SafetySummary';
import { S7ReviewerDemo } from './components/S7ReviewerDemo';
import { EmergencyModal } from './components/EmergencyModal';
import { FlowerPetals } from './components/FlowerPetals';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<CareMode>('welcome');
  const [userEmail, setUserEmail] = useState('');
  const [context, setContext] = useState<PostCareContext | null>(null);
  
  // Modals & Panels
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [showSourcesDrawer, setShowSourcesDrawer] = useState(false);
  const [activeSources, setActiveSources] = useState<Source[]>(MEDICAL_SOURCES);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [demoModeActive, setDemoModeActive] = useState(true);
  const [activeTrace, setActiveTrace] = useState<DemoTrace>(INITIAL_DEMO_TRACE);

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language === 'te' ? 'te' : 'en';
  }, [language]);

  // Handle Initial Pathway Selection from S1
  const handleSelectPathway = (selectedMode: CareMode, email: string) => {
    setUserEmail(email);
    if (selectedMode === 'post_care') {
      setShowIntakeModal(true);
    } else {
      setMode('pre_care');
      // Initialize Pre-Care chat with welcome message
      initWelcomeMessage('pre_care', language);
    }
  };

  const initWelcomeMessage = (careMode: CareMode, lang: Language) => {
    const isTe = lang === 'te';
    const isTing = lang === 'tinglish';
    let welcomeText = "Hello! I am Sakhi, your educational pre-care companion. How can I help you understand fertility, treatments, or reproductive health today?";
    if (careMode === 'post_care') {
      welcomeText = "Hello! I am here to help you navigate your recovery safely based on your self-reported context. What questions or concerns do you have?";
      if (isTe) {
        welcomeText = "నమస్కారం! మీరు స్వచ్ఛందంగా అందించిన వివరాల ఆధారంగా మీ రికవరీలో మార్గదర్శకత్వం చేయడానికి నేను సిద్ధంగా ఉన్నాను. మీ సందేహాలు ఏమిటి?";
      } else if (isTing) {
        welcomeText = "Hello! Meeru ichina self-reported treatment context base chesukuni recovery safety guidance ivvadaniki nenu unnanu. Mee question cheppandi.";
      }
    } else {
      if (isTe) {
        welcomeText = "నమస్కారం! నేను సఖిని. సంతానోత్పత్తి, IVF విధానాలు మరియు మహిళల ఆరోగ్యం గురించి మీకు అవసరమైన సమాచారాన్ని తెలుసుకోవడానికి నేను సహాయం చేస్తాను. మీ ప్రశ్న ఏమిటి?";
      } else if (isTing) {
        welcomeText = "Hello! Nenu Sakhi, mee pre-care educational companion. Fertility, IVF mariyu reproductive health gurinchi meeku em doubts unna adagandi.";
      }
    }

    setMessages([
      {
        id: `msg_init_${Date.now()}`,
        sender: 'sakhi',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        state: 'EDUCATE'
      }
    ]);
  };

  // Handle Post-Care Intake Save
  const handleSaveContext = (newContext: PostCareContext) => {
    setContext(newContext);
    setShowIntakeModal(false);
    setMode('post_care');
    initWelcomeMessage('post_care', language);
  };

  // Handle Post-Care Intake Skip
  const handleSkipContext = () => {
    setShowIntakeModal(false);
    setMode('post_care');
    setContext(null);
    initWelcomeMessage('post_care', language);
  };

  // Reset Session
  const handleResetSession = () => {
    setMode('welcome');
    setContext(null);
    setMessages([]);
  };

  // Rule-First Safety Engine & Generation Logic
  const handleSendMessage = (userText: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    const lower = userText.toLowerCase();

    // 1. Red-Flag Symptom Sentinel (Specification Section 6: URGENT_GUIDANCE)
    const redFlags = [
      'severe pain', 'heavy bleeding', 'fever', 'shortness of breath',
      'acute pain', 'raktham', 'nopi', 'chala nopi', 'bleeding', 'dizziness', 'fainting'
    ];
    const isRedFlag = redFlags.some(flag => lower.includes(flag));

    // 2. Prescription / Direct Medical Diagnosis (Section 6: ABSTAIN)
    const abstainTriggers = [
      'prescribe', 'medicine for my', 'dose', 'what tablet', 'give me tablet', 
      'cure my', 'diagnose me', 'mandulu', 'tablets'
    ];
    const isAbstain = abstainTriggers.some(trigger => lower.includes(trigger));

    setTimeout(() => {
      let botResponse: ChatMessage;
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (isRedFlag) {
        let urgentText = translations.en.chat.urgentBannerBody;
        if (language === 'te') {
          urgentText = translations.te.chat.urgentBannerBody;
        } else if (language === 'tinglish') {
          urgentText = translations.tinglish.chat.urgentBannerBody;
        }

        botResponse = {
          id: `sakhi_${Date.now()}`,
          sender: 'sakhi',
          text: urgentText,
          timestamp: responseTime,
          state: 'URGENT_GUIDANCE',
          isUrgent: true,
          sources: [MEDICAL_SOURCES[2]] // FOGSI Urgent Care guidelines
        };

        setActiveTrace({
          requestId: `req_urgent_${Date.now()}`,
          timestamp: new Date().toISOString(),
          routeDecision: 'URGENT_GUIDANCE',
          geminiModel: 'gemini-1.5-pro-multilingual-v3 (Safety Sentinel)',
          latencyMs: 180,
          maskedEmail: maskEmail(userEmail || 'demo.user@example.com'),
          safetyFlagTriggered: true,
          retrievedSourcesCount: 1
        });

      } else if (isAbstain) {
        let abstainText = translations.en.chat.abstainAlert;
        if (language === 'te') {
          abstainText = translations.te.chat.abstainAlert;
        } else if (language === 'tinglish') {
          abstainText = translations.tinglish.chat.abstainAlert;
        }

        botResponse = {
          id: `sakhi_${Date.now()}`,
          sender: 'sakhi',
          text: abstainText,
          timestamp: responseTime,
          state: 'ABSTAIN',
          isUrgent: false
        };

        setActiveTrace({
          requestId: `req_abstain_${Date.now()}`,
          timestamp: new Date().toISOString(),
          routeDecision: 'ABSTAIN',
          geminiModel: 'gemini-1.5-pro-multilingual-v3',
          latencyMs: 290,
          maskedEmail: maskEmail(userEmail || 'demo.user@example.com'),
          safetyFlagTriggered: false,
          retrievedSourcesCount: 0
        });

      } else {
        // Grounded EDUCATE response
        let answer = "";
        if (language === 'tinglish') {
          if (lower.includes('ivf')) {
            answer = "IVF (In Vitro Fertilization) ante egg mariyu sperm ni laboratory lo combine chesi embryo create chese scientific process. Idi mukhyam ga 4 steps lo jaruguthundi:\n\n1. Ovarian Stimulation (Eggs grow avvadaniki injections)\n2. Egg Retrieval (Day care procedure)\n3. Fertilization & Embryo Culture (Lab lo)\n4. Embryo Transfer (Uterus loki transfer cheyyadam)\n\nIdi general medical education information matrame. ICMR guidelines prakaram prathi patient protocol different ga untundi.";
          } else if (lower.includes('amh')) {
            answer = "AMH (Anti-Müllerian Hormone) test dwara ovaries lo unna egg reserve quantity ni estimate cheyavachu. Normal range general ga 1.5 - 4.0 ng/mL madyalo untundi. AMH thakkuva unte ovarian reserve thaggindi ani ardham, kani idi natural ga pregnancy radu ani cheppaledu. Proper analysis kosam fertility specialist ni kalavali.";
          } else {
            answer = "Ee vishayam meeda available guidelines prakaram idi general fertility education topic. Specific symptoms leda doubts unte mee treating clinician tho discuss cheyadam manchidi.";
          }
        } else if (language === 'te') {
          if (lower.includes('ivf')) {
            answer = "IVF (ఇన్ విట్రో ఫెర్టిలైజేషన్) అనేది ప్రయోగశాలలో అండం మరియు శుక్రకణాన్ని కలిపి పిండాన్ని తయారుచేసే అధునాతన వైద్య ప్రక్రియ. ఇందులో ప్రధానంగా 4 దశలు ఉంటాయి:\n\n1. అండాశయ ప్రేరణ (ఇంజెక్షన్ల ద్వారా)\n2. అండాల సేకరణ (ఎగ్ రిట్రీవల్)\n3. ప్రయోగశాలలో ఫలదీకరణం\n4. పిండ మార్పిడి (ఎంబ్రియో ట్రాన్స్‌ఫర్)\n\nఇది సాధారణ అవగాహన కొరకు మాత్రమే. ఐసీఎంఆర్ (ICMR) నిబంధనల ప్రకారం వ్యక్తిగత చికిత్సకు మీ వైద్యుడిని సంప్రదించండి.";
          } else {
            answer = "అందుబాటులో ఉన్న ప్రామాణిక వైద్య సమాచారం ప్రకారం ఇది సంతానోత్పత్తి ఆరోగ్యానికి సంబంధించిన సాధారణ వివరణ. మీ వ్యక్తిగత ఆరోగ్య పరిస్థితి కోసం ఎల్లప్పుడూ నిపుణులైన వైద్యుడి సలహా తీసుకోండి.";
          }
        } else {
          // English
          if (lower.includes('ivf')) {
            answer = "In Vitro Fertilization (IVF) is an assisted reproductive technology procedure where eggs are retrieved from the ovaries and fertilized by sperm in a specialized laboratory environment. The protocol typically includes:\n\n1. Controlled Ovarian Stimulation: Hormonal medications to develop multiple mature follicles.\n2. Oocyte Retrieval: Ultrasound-guided minor aspiration under sedation.\n3. Laboratory Fertilization & Embryo Culture: Conventional IVF or ICSI.\n4. Embryo Transfer: Placement of viable embryos into the uterine cavity.\n\nNote: This is population-level clinical education. Treatment protocols vary based on individual age, ovarian reserve, and medical history.";
          } else if (lower.includes('retrieval') || lower.includes('sensations')) {
            answer = "Following oocyte retrieval, patients frequently experience mild lower pelvic heaviness, slight cramping, and minimal spotting. These are common physiological responses. However, any sudden weight gain, severe abdominal distension, severe pain not relieved by mild analgesics, or breathing difficulty requires immediate hospital assessment according to FOGSI standards.";
          } else {
            answer = "Based on our indexed clinical reference guidelines (ICMR & WHO), this is standard reproductive health information. Sakhi does not provide personal prescriptions or treatment regimens.";
          }
        }

        botResponse = {
          id: `sakhi_${Date.now()}`,
          sender: 'sakhi',
          text: answer,
          timestamp: responseTime,
          state: 'EDUCATE',
          isUrgent: false,
          sources: [MEDICAL_SOURCES[0], MEDICAL_SOURCES[1]]
        };

        setActiveTrace({
          requestId: `req_rag_${Date.now()}`,
          timestamp: new Date().toISOString(),
          routeDecision: 'EDUCATE',
          geminiModel: 'gemini-1.5-pro-multilingual-v3',
          latencyMs: 385,
          maskedEmail: maskEmail(userEmail || 'demo.user@example.com'),
          safetyFlagTriggered: false,
          retrievedSourcesCount: 2
        });
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsGenerating(false);
    }, 600);
  };

  const maskEmail = (email: string) => {
    if (!email || !email.includes('@')) return 's***@example.com';
    const [name, domain] = email.split('@');
    return `${name.charAt(0)}***@${domain}`;
  };

  // Apply Reviewer Demo Scenario (S7)
  const handleApplyScenario = (
    scenarioMode: CareMode,
    scenarioLanguage: Language,
    email: string,
    initialQuestion: string,
    scenarioContext?: PostCareContext
  ) => {
    setLanguage(scenarioLanguage);
    setUserEmail(email);
    setMode(scenarioMode);
    setContext(scenarioContext || null);
    setShowIntakeModal(false);

    // Set initial dialogue and immediately trigger response
    initWelcomeMessage(scenarioMode, scenarioLanguage);

    setTimeout(() => {
      handleSendMessage(initialQuestion);
    }, 200);
  };

  return (
    <div
      lang={language}
      className={`min-h-screen flex flex-col bg-[#FFF6F5] text-[#3A282B] font-sans selection:bg-[#FA6A48] selection:text-white relative overflow-x-hidden ${
        language === 'te' ? 'lang-te' : ''
      }`}
    >
      {/* Ambient Floating Flower Petals across the whole site */}
      <FlowerPetals />

      {/* Main Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        mode={mode}
        onResetSession={handleResetSession}
        demoModeActive={demoModeActive}
        onToggleDemoMode={() => setDemoModeActive(!demoModeActive)}
        onOpenEmergencyModal={() => setShowEmergencyModal(true)}
      />

      {/* Screen Body */}
      <main className="flex-1 pb-24 sm:pb-20">
        {mode === 'welcome' ? (
          <S1Welcome
            language={language}
            onSelectPathway={handleSelectPathway}
            initialEmail={userEmail}
          />
        ) : (
          <ChatView
            language={language}
            mode={mode}
            userEmail={userEmail}
            context={context}
            messages={messages}
            onSendMessage={handleSendMessage}
            onOpenSourcesDrawer={(srcs) => {
              setActiveSources(srcs.length > 0 ? srcs : MEDICAL_SOURCES);
              setShowSourcesDrawer(true);
            }}
            onOpenSummaryModal={() => setShowSummaryModal(true)}
            onEditContext={() => setShowIntakeModal(true)}
            onClearContext={() => setContext(null)}
            onUpdateEmail={(newEmail) => setUserEmail(newEmail)}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* S4 Post-Care Intake Modal */}
      {showIntakeModal && (
        <S4PostCareIntake
          language={language}
          userEmail={userEmail}
          onSaveContext={handleSaveContext}
          onSkip={handleSkipContext}
          onClose={() => setShowIntakeModal(false)}
          initialContext={context || undefined}
        />
      )}

      {/* S3 Sources & Evidence Drawer */}
      <S3SourcesDrawer
        language={language}
        isOpen={showSourcesDrawer}
        onClose={() => setShowSourcesDrawer(false)}
        sources={activeSources}
      />

      {/* S6 Shareable Clinical Summary Modal */}
      <S6SafetySummary
        language={language}
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        userEmail={userEmail}
        context={context}
        messages={messages}
      />

      {/* Emergency Helpline Directory Modal */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />

      {/* S7 Reviewer Demo Dock (Fixed at bottom of page) */}
      {demoModeActive && (
        <S7ReviewerDemo
          language={language}
          onApplyScenario={handleApplyScenario}
          activeTrace={activeTrace}
        />
      )}
    </div>
  );
}

export default App;
