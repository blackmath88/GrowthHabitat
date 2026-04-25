// Sample data — based on the user's profile context
window.GH_DATA = {
  user: {
    name: "Daniela",
    currentRole: "M365 Adoption & Change Lead",
    desired: "AI Workforce Adoption Architect",
    positioning: "I help governance-aware organizations turn AI from policy into practice — bridging change management, Copilot adoption, and workforce enablement.",
    strengths: ["Empathy", "Positivity", "Ideation", "Activator", "Input", "Developer", "Individualization", "Communication", "Woo", "Restorative"],
    workingIdentity: "AI Workforce Adoption Architect · Cross-Pollinator · Structured Creative Translator",
    energizes: [
      "Translating policy into practice for non-technical teams",
      "Building learning paths from messy raw material",
      "Watching a stuck team unstick after one workshop",
      "Conversations with people 5 years ahead of me",
    ],
    drains: [
      "Pure project admin with no learning",
      "Selling without conviction",
      "Consensus theatre",
      "Environments that punish honest feedback",
    ],
    thrives: [
      "Cross-functional teams with real budget authority",
      "Organizations big enough to matter, small enough to move",
      "Cultures that protect time for thinking",
      "Leaders who measure learning, not hours",
    ],
    avoid: [
      "Pure-sales partner orgs without delivery substance",
      "Hyper-political public-sector roles with no mandate",
      "Solo consulting at the very start (no compounding)",
    ],
    nonNegotiables: [
      "Remote-first or hybrid with travel optional",
      "Ownership of program scope, not just execution",
      "Direct access to end users, not just sponsors",
      "≥ 20% time on learning / R&D",
    ],
    hypothesis: "AI workforce adoption inside large governance-aware organizations is where my translator/activator strengths compound fastest over the next 3 years.",
  },

  arenas: [
    { id: "ms-partner", name: "Microsoft Partner Ecosystem", desc: "Senior consulting role inside an MS partner running M365/AI adoption programs.", hyp: "Closest to current credibility; fastest path to AI delivery scale.", scores: { fascination: 7.4, market: 8.2, fit: 8.8, learning: 7.5, access: 8.6, comp: 7.8, credibility: 8.4 }, status: "active", notes: "3 partner contacts already; warm intro to Avanade lead via Stefan." },
    { id: "ai-consulting", name: "AI Adoption Consulting", desc: "Independent senior advisor on AI rollout, change, and Copilot governance.", hyp: "Highest fascination + strength fit; access through existing relationships.", scores: { fascination: 9.2, market: 8.6, fit: 9.4, learning: 9.1, access: 7.0, comp: 8.4, credibility: 6.8 }, status: "active", notes: "Need 2–3 named case studies before this becomes pursuable solo." },
    { id: "public-sector", name: "Public Sector AI Transformation", desc: "Lead AI workforce readiness inside a federal or cantonal admin body.", hyp: "Mission resonance high; pace and scope of mandate uncertain.", scores: { fascination: 7.8, market: 7.4, fit: 7.2, learning: 7.0, access: 5.8, comp: 6.2, credibility: 7.0 }, status: "explore", notes: "Conversation with Bern team scheduled for May 6." },
    { id: "corporate", name: "Corporate AI Enablement", desc: "Internal head-of-AI-adoption role at a large enterprise (banking, pharma, industry).", hyp: "Stable comp + clear scope; risk of slow internal politics.", scores: { fascination: 6.8, market: 8.4, fit: 8.0, learning: 6.4, access: 7.2, comp: 9.0, credibility: 7.8 }, status: "explore", notes: "Roche / Novartis both running AI enablement programs." },
    { id: "boutique", name: "Boutique Innovation Consultancy", desc: "Senior partner in a small (5–15) high-craft firm with named reputation.", hyp: "Best learning environment; smallest market reach.", scores: { fascination: 8.6, market: 6.4, fit: 8.4, learning: 9.4, access: 5.4, comp: 7.0, credibility: 6.8 }, status: "explore", notes: "Look at Studio D, Greaterthan, ETH spinouts." },
    { id: "edu", name: "Education / Research AI Transformation", desc: "Practitioner-fellow role inside a university or research institute.", hyp: "Mission resonance very high; comp and pace structurally lower.", scores: { fascination: 8.0, market: 5.8, fit: 7.4, learning: 8.6, access: 6.8, comp: 4.8, credibility: 6.4 }, status: "parked", notes: "Worth one conversation per quarter; not a primary path." },
    { id: "indep", name: "Independent / Productized Offer", desc: "Own practice with a productized AI-readiness assessment + sprint.", hyp: "Highest autonomy; no compounding without 18 months runway.", scores: { fascination: 8.4, market: 6.8, fit: 8.2, learning: 8.8, access: 5.0, comp: 6.4, credibility: 5.6 }, status: "parked", notes: "Defer until at least one anchor client lined up." },
  ],

  conversations: [
    { id: "c1", person: "Stefan Reinhardt", org: "Avanade", role: "Director, Modern Work", arena: "ms-partner", date: "Apr 18", energyBefore: 6, energyAfter: 9, admiration: 8, learning: 9, recognition: 7, autonomy: 7, marketPull: 8, integrity: true, quote: "The partners who win the AI wave will be the ones who already understand change. You're closer to that than you think.", followUp: "Send 2 case-study one-pagers by May 2." },
    { id: "c2", person: "Marta Halem", org: "Independent", role: "AI Adoption Advisor", arena: "ai-consulting", date: "Apr 14", energyBefore: 7, energyAfter: 10, admiration: 9, learning: 9, recognition: 8, autonomy: 9, marketPull: 8, integrity: true, quote: "Don't ask what the world needs. Ask where your strengths are most rare and most rewarded.", followUp: "Reconnect after the Roche workshop." },
    { id: "c3", person: "Anja Furrer", org: "Federal Office of Personnel", role: "Programme Lead, Digital Skills", arena: "public-sector", date: "Apr 9", energyBefore: 7, energyAfter: 6, admiration: 6, learning: 6, recognition: 6, autonomy: 5, marketPull: 6, integrity: true, quote: "The mandate is real but the procurement clock is 18 months minimum.", followUp: "Decide by end-May whether to keep tracking." },
    { id: "c4", person: "Lukas Gygli", org: "Roche", role: "Head of Workforce AI", arena: "corporate", date: "Apr 4", energyBefore: 6, energyAfter: 8, admiration: 8, learning: 8, recognition: 7, autonomy: 6, marketPull: 9, integrity: true, quote: "We don't need another framework. We need someone who's done it once already.", followUp: "Prep a 30-min adoption diagnostic for May 12." },
    { id: "c5", person: "Renu Patel", org: "Studio D", role: "Senior Partner", arena: "boutique", date: "Mar 28", energyBefore: 8, energyAfter: 10, admiration: 10, learning: 10, recognition: 6, autonomy: 9, marketPull: 5, integrity: true, quote: "The work is the work. We pick projects we'd be embarrassed not to do well.", followUp: "Coffee in Zurich next time she's in town." },
    { id: "c6", person: "Jens K.", org: "GroundTruth Consulting", role: "Founder", arena: "ms-partner", date: "Mar 22", energyBefore: 6, energyAfter: 4, admiration: 4, learning: 4, recognition: 5, autonomy: 4, marketPull: 6, integrity: false, quote: "We just put 'AI' on the deck and the budget moves.", followUp: "Park. Not the standard." },
  ],

  opportunities: [
    { id: "o1", company: "Avanade", role: "Senior Manager, AI Adoption", arena: "ms-partner", status: "Active", scores: { problem: 8, smart: 8, learning: 8, autonomy: 7, impact: 8, fit: 9, comp: 8, future: 9 }, decision: "pursue", risks: "Travel-heavy; Microsoft-locked tech stack", notes: "Stefan introducing to hiring manager next week." },
    { id: "o2", company: "Roche", role: "Workforce AI Programme Lead", arena: "corporate", status: "Discovery", scores: { problem: 9, smart: 8, learning: 7, autonomy: 7, impact: 9, fit: 8, comp: 9, future: 8 }, decision: "pursue", risks: "Internal politics; long approval cycles", notes: "30-min diagnostic scheduled May 12." },
    { id: "o3", company: "Studio D", role: "Senior Practice Lead", arena: "boutique", status: "Early signal", scores: { problem: 9, smart: 10, learning: 10, autonomy: 9, impact: 7, fit: 8, comp: 6, future: 7 }, decision: "explore", risks: "Comp ceiling; smaller deal flow", notes: "Coffee with Renu pending." },
    { id: "o4", company: "Federal Office of Personnel", role: "Senior Advisor, Digital Skills", arena: "public-sector", status: "Discovery", scores: { problem: 7, smart: 6, learning: 6, autonomy: 5, impact: 7, fit: 7, comp: 5, future: 6 }, decision: "park", risks: "18-month procurement; mandate ambiguity", notes: "Anja's note on procurement clock." },
    { id: "o5", company: "GroundTruth Consulting", role: "Practice Director", arena: "ms-partner", status: "Closed", scores: { problem: 5, smart: 4, learning: 4, autonomy: 5, impact: 5, fit: 6, comp: 7, future: 4 }, decision: "avoid", risks: "Integrity signal failed Buffett test", notes: "Walked away after first call." },
  ],

  experiments: [
    { id: "x1", title: "Send Avanade 2 case-study one-pagers", due: "May 2", arena: "ms-partner" },
    { id: "x2", title: "Roche 30-min adoption diagnostic prep", due: "May 12", arena: "corporate" },
    { id: "x3", title: "Draft AI-readiness assessment v0.1", due: "May 16", arena: "ai-consulting" },
  ],

  patterns: {
    repeated: ["translator role across 4/6 conversations", "governance + AI together (3 conversations)", "energy spikes when teaching, not selling"],
    keywords: ["readiness", "translator", "policy → practice", "compounding", "non-technical teams"],
    warnings: ["solo consulting flagged 2× by mentors as premature", "public-sector pace incompatible with current life stage"],
    evidenceFor: [
      "5 of 6 highest-energy conversations are in AI adoption / partner ecosystem",
      "Strength fit ≥ 8.4 in 4 arenas; all of them are governance-adjacent",
      "Marta and Stefan independently used the word 'translator'",
    ],
    evidenceAgainst: [
      "Credibility-today score in independent consulting is 5.6",
      "No anchor case study yet for solo offer",
    ],
  },
};
