export type Language = 'en' | 'te' | 'tinglish';

export type CareMode = 'welcome' | 'pre_care' | 'post_care';

export type MessageState = 
  | 'EDUCATE'
  | 'CLARIFY'
  | 'ABSTAIN'
  | 'URGENT_GUIDANCE'
  | 'SHARE_SUMMARY'
  | 'SIMULATED_ESCALATION';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  year: string;
  excerpt: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sakhi';
  text: string;
  timestamp: string;
  state?: MessageState;
  sources?: Source[];
  isUrgent?: boolean;
}

export interface PostCareContext {
  category: string;
  stage: string;
  concern: string;
  consentStored: boolean;
  consentOutboundEmail: boolean;
}

export interface DemoTrace {
  requestId: string;
  timestamp: string;
  routeDecision: MessageState;
  geminiModel: string;
  latencyMs: number;
  maskedEmail: string;
  safetyFlagTriggered: boolean;
  retrievedSourcesCount: number;
}

