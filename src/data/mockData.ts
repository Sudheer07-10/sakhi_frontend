import { Source, DemoTrace } from '../types';

export const MEDICAL_SOURCES: Source[] = [
  {
    id: "SRC-ICMR-2022",
    title: "ICMR National Guidelines for ART & Fertility Management",
    publisher: "Indian Council of Medical Research (ICMR)",
    year: "2022",
    excerpt: "Section 4.2: In Vitro Fertilization (IVF) protocol encompasses ovarian stimulation, oocyte retrieval, laboratory fertilization, and embryo transfer. Patient monitoring requires strict adherence to aseptic protocols and early recognition of ovarian hyperstimulation symptoms.",
    url: "https://main.icmr.nic.in"
  },
  {
    id: "SRC-WHO-2024",
    title: "Global Clinical Standards for Infertility Care & Diagnostics",
    publisher: "World Health Organization (WHO)",
    year: "2024",
    excerpt: "Anti-Müllerian Hormone (AMH) and antral follicle counts provide predictive metrics for ovarian reserve. Clinical counseling must differentiate physiological mild post-procedure cramping from acute peritoneal signs.",
    url: "https://www.who.int"
  },
  {
    id: "SRC-FOGSI-2023",
    title: "Clinical Practice Recommendations: Post-Oocyte Retrieval Care",
    publisher: "Federation of Obstetric and Gynaecological Societies of India (FOGSI)",
    year: "2023",
    excerpt: "Immediate hospital evaluation is indicated upon onset of severe abdominal distension, intractable pelvic pain, persistent pyrexia >38°C, or sudden shortness of breath. Telephonic reassurance without in-person triage is strongly contraindicated.",
    url: "https://www.fogsi.org"
  }
];

export const SUGGESTED_QUESTIONS = {
  en: [
    "What is IVF and how does the process work?",
    "What is normal AMH level for fertility?",
    "What is the difference between PCOD and PCOS?",
    "Can you prescribe medication for my cycle timing?" // Trigger ABSTAIN test
  ],
  te: [
    "IVF అంటే ఏమిటి? ప్రక్రియ ఎలా ఉంటుంది?",
    "నార్మల్ AMH లెవెల్స్ ఎంత ఉండాలి?",
    "PCOD మరియు PCOS మధ్య తేడా ఏమిటి?",
    "నా సైకిల్ కోసం మందులు సూచించగలరా?" // Trigger ABSTAIN test
  ],
  tinglish: [
    "IVF ante enti? Simple ga explain cheyyava?",
    "Normal AMH level entha undali?",
    "PCOD ki PCOS ki difference enti?",
    "Naku cycle set avvadaniki medicine prescribe cheyyi" // Trigger ABSTAIN test
  ]
};

export const INITIAL_DEMO_TRACE: DemoTrace = {
  requestId: "req_demo_init_88291",
  timestamp: new Date().toISOString(),
  routeDecision: "EDUCATE",
  geminiModel: "gemini-1.5-pro-multilingual-v3",
  latencyMs: 412,
  maskedEmail: "s***@example.com",
  safetyFlagTriggered: false,
  retrievedSourcesCount: 2
};

