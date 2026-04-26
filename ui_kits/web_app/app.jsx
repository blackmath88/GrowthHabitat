// app.jsx — main app
const { useState: useStateApp } = React;

const APP_DATA = {
  user: {
    name: "Daniela",
    currentRole: "Senior change & adoption consultant",
    desired: "AI workforce strategist for governance-aware orgs",
    workingIdentity: "Translator between AI capability and human change",
    hypothesis: "I help mid-large EU orgs adopt AI tools without losing trust — by translating technical possibility into change-managed reality.",
    positioning: "I make AI workforce adoption survive the second month — by treating it as change management, not a tool rollout.",
    strengths: ["Strategic", "Connectedness", "Learner", "Communication", "Empathy", "Achiever", "Ideation", "Input", "Responsibility", "Individualization"],
    energizes: ["Translating ambiguous strategy into something teams can actually do on Monday morning", "Workshops where I can read the room and adjust mid-flight", "Writing — long-form thinking pieces about adoption", "1-on-1 conversations with people 10 years ahead of me", "Naming the unspoken thing in a leadership conversation"],
    drains: ["Pure delivery rhythm with no strategic input", "Big-room broadcast presentations with no Q&A", "Internal politics where the work is performance, not impact", "Endless governance meetings without a decision-maker present"],
    thrives: ["Small senior teams (5–15) with one shared problem", "Direct access to the person who can say yes", "An employer who trusts written work over face-time", "A market where adoption — not just deployment — is the bottleneck"],
    avoid: ["Matrixed orgs where the same conversation happens four times", "Pure technical roles where my human-systems instinct is wasted", "Sales-heavy roles where the relationship is transactional"],
    nonNegotiables: ["Hybrid or remote — at least 2 days at home", "Direct line to a decision-maker, not a tier-3 stakeholder", "Permission to write publicly about what I learn", "Quarterly travel for fieldwork, not weekly", "Comp floor: €95k base, real equity if startup"],
  },
  arenas: [
    { id: "ai-consulting", name: "AI Adoption Consulting (boutique)", desc: "Independent or small-firm work helping mid-large orgs land AI tooling without breaking trust.", hyp: "Smaller, senior, faster decisions — my sweet spot.", status: "active", scores: { fascination: 9.2, market: 8.8, fit: 9.0, learning: 8.6, access: 7.8, comp: 7.4, credibility: 8.2 } },
    { id: "ms-partner", name: "Microsoft Partner ecosystem (M365 Copilot)", desc: "Senior role inside an MS Gold/Solutions partner running Copilot adoption programs.", hyp: "Existing M365 credibility transfers fastest here.", status: "active", scores: { fascination: 7.4, market: 9.4, fit: 8.6, learning: 7.2, access: 8.8, comp: 8.4, credibility: 9.1 } },
    { id: "public-sector", name: "EU public sector AI policy", desc: "Adoption advisor inside an EU institution or national digital agency.", hyp: "Mission-aligned but slow; risk of becoming a process role.", status: "explore", scores: { fascination: 8.4, market: 7.6, fit: 6.8, learning: 7.0, access: 6.4, comp: 5.8, credibility: 7.8 } },
    { id: "corporate", name: "Corporate AI center of excellence (in-house)", desc: "Lead an AI adoption practice inside a Fortune-500-class enterprise.", hyp: "Stable but matrixed; my translator strength may dilute.", status: "explore", scores: { fascination: 6.8, market: 8.6, fit: 7.4, learning: 6.4, access: 7.6, comp: 8.8, credibility: 8.4 } },
    { id: "boutique", name: "Found my own adoption practice", desc: "Solo or 2–3 person consultancy with a sharp methodology.", hyp: "Highest upside, highest risk — needs 6 months of pipeline first.", status: "parked", scores: { fascination: 9.4, market: 7.8, fit: 8.8, learning: 9.2, access: 6.2, comp: 7.0, credibility: 6.4 } },
    { id: "edu", name: "Executive education / faculty", desc: "Teach AI adoption at a business school or corporate university.", hyp: "Energizing but adjacent — not the main bet.", status: "parked", scores: { fascination: 7.8, market: 6.4, fit: 7.0, learning: 7.4, access: 5.4, comp: 6.2, credibility: 6.8 } },
    { id: "tooling", name: "AI product / tooling vendor (PMM)", desc: "Product marketing for an AI tooling vendor's enterprise motion.", hyp: "Comp is high but the work is mostly narrative — drains me long-term.", status: "avoid", scores: { fascination: 5.6, market: 8.6, fit: 5.8, learning: 5.4, access: 7.2, comp: 8.6, credibility: 7.0 } },
  ],
  conversations: [
    { id: "c1", person: "Stefan Lindqvist", role: "Partner, AI Practice", org: "Avanade Nordics", arena: "ms-partner", date: "22 Apr", energyBefore: 6, energyAfter: 9, admiration: 8.4, learning: 9.0, recognition: 7.6, autonomy: 7.0, marketPull: 9.2, integrity: true, quote: "Most adoption work fails in month two — not at launch. The buyers who get this are the ones funding 18-month programs, not 8-week pilots.", followUp: "Send him my Roche change-mgmt prep doc — he'll route to a colleague hiring." },
    { id: "c2", person: "Marta Kovács", role: "Independent AI Adoption Strategist", org: "ex-Accenture", arena: "ai-consulting", date: "19 Apr", energyBefore: 7, energyAfter: 10, admiration: 9.6, learning: 9.2, recognition: 8.0, autonomy: 9.4, marketPull: 8.4, integrity: true, quote: "If you can name the Monday-morning behavior change, you can charge senior money. If you can't, you're competing with the Big Four on rate cards.", followUp: "She offered to co-deliver a Roche-style workshop — say yes by Friday." },
    { id: "c3", person: "Henrik Vogel", role: "Director, Digital Adoption", org: "Roche Diagnostics", arena: "corporate", date: "16 Apr", energyBefore: 7, energyAfter: 8, admiration: 7.4, learning: 7.0, recognition: 8.8, autonomy: 6.4, marketPull: 8.6, integrity: true, quote: "Internally we have the budget. What we don't have is the translator role. Everyone is either a tool expert or a change person — almost nobody is both.", followUp: "He may open a 0.5 FTE strategist contract in Q3." },
    { id: "c4", person: "Aisha Demir", role: "Policy Officer, AI Office", org: "European Commission", arena: "public-sector", date: "14 Apr", energyBefore: 7, energyAfter: 8, admiration: 8.0, learning: 7.6, recognition: 6.8, autonomy: 5.8, marketPull: 6.8, integrity: true, quote: "We don't need more frameworks. We need people who have shipped adoption inside a real organization and can write about it.", followUp: "Send my AI Act readiness write-up; she'll forward internally." },
    { id: "c5", person: "Petra Bauer", role: "Head of People Tech", org: "Siemens", arena: "corporate", date: "11 Apr", energyBefore: 6, energyAfter: 6, admiration: 6.0, learning: 5.4, recognition: 7.4, autonomy: 5.0, marketPull: 7.4, integrity: false, quote: "Honestly we just need someone to drive Copilot training rollout. We have a vendor for the strategy.", followUp: "Pass — wrong shape of role. Polite decline." },
    { id: "c6", person: "Léa Bertrand", role: "Founder", org: "Atelier AI (boutique)", arena: "boutique", date: "08 Apr", energyBefore: 7, energyAfter: 9, admiration: 9.0, learning: 8.6, recognition: 7.4, autonomy: 9.6, marketPull: 7.0, integrity: true, quote: "The first six months I made nothing. The seventh month I billed €40k. The shape of the curve was scary but predictable.", followUp: "Get her to introduce me to her ex-Roland Berger contact." },
    { id: "c7", person: "Tomás Ferreira", role: "Principal", org: "Bain & Company", arena: "ai-consulting", date: "05 Apr", energyBefore: 7, energyAfter: 7, admiration: 7.4, learning: 6.6, recognition: 8.2, autonomy: 5.6, marketPull: 8.0, integrity: true, quote: "We can hire you tomorrow. The real question is whether you want a partner-track in five years or your own thing in two.", followUp: "Useful prompt — re-score boutique vs. corporate against 5y horizon." },
    { id: "c8", person: "Yuki Tanaka", role: "Director, Workplace AI", org: "SAP", arena: "tooling", date: "02 Apr", energyBefore: 7, energyAfter: 5, admiration: 5.4, learning: 5.0, recognition: 7.2, autonomy: 4.6, marketPull: 7.6, integrity: true, quote: "The role would be 70% deck building and customer evidence. Less workshop, more narrative.", followUp: "Drains me. Move SAP/PMM-type roles to Avoid." },
  ],
  opportunities: [
    { id: "o1", arena: "ms-partner", role: "Senior AI Adoption Lead", company: "Avanade Nordics", status: "Stockholm · hybrid · referral", decision: "pursue", scores: { problem: 8.4, smart: 8.6, learning: 8.2, autonomy: 7.4, impact: 8.6, fit: 9.0, comp: 8.4, future: 8.6 }, risks: "Mostly delivery in year one; partner-track unclear. Need to confirm 30%+ strategic time before signing.", notes: "Stefan would be the sponsor. Comp ~€110k base + 25% bonus. Two roles open." },
    { id: "o2", arena: "ai-consulting", role: "Co-delivered workshop practice", company: "with Marta Kovács", status: "Pipeline test · 6 weeks", decision: "pursue", scores: { problem: 9.0, smart: 9.4, learning: 9.6, autonomy: 9.2, impact: 8.4, fit: 9.4, comp: 6.8, future: 9.0 }, risks: "Pipeline lumpy first 90 days. Need a 4-month runway. Marta's brand carries early; mine has to follow.", notes: "Lowest activation cost — start as a side project while at current role. Day rate €1,800–2,200." },
    { id: "o3", arena: "corporate", role: "Lead, AI Adoption Practice", company: "Roche Diagnostics (Basel)", status: "0.5 FTE contract · Q3", decision: "explore", scores: { problem: 7.8, smart: 7.6, learning: 7.0, autonomy: 6.4, impact: 8.8, fit: 7.6, comp: 8.6, future: 7.4 }, risks: "Matrix risk. Henrik is good but the layer above is unclear. Could become process work in 12 months.", notes: "Half-time means it could co-exist with the Marta practice for two quarters." },
    { id: "o4", arena: "public-sector", role: "Senior Adoption Advisor", company: "EU AI Office (Brussels)", status: "Open · slow process", decision: "park", scores: { problem: 8.4, smart: 7.8, learning: 7.0, autonomy: 5.4, impact: 8.4, fit: 6.4, comp: 5.6, future: 7.0 }, risks: "Comp drops 30%. Slow change pace. Mission-aligned but autonomy is the question mark.", notes: "Keep warm via Aisha. Check again in 6 months once private-sector pipeline is clearer." },
    { id: "o5", arena: "tooling", role: "Director, Product Marketing", company: "SAP Workplace AI", status: "Recruiter inbound", decision: "avoid", scores: { problem: 5.6, smart: 6.4, learning: 5.0, autonomy: 4.6, impact: 6.0, fit: 5.4, comp: 9.0, future: 5.4 }, risks: "Pay is excellent. Work is narrative-heavy. Energy drain confirmed by Yuki conversation.", notes: "Polite decline. Add SAP-type roles to default-avoid filter." },
  ],
  patterns: {
    evidenceFor: [
      "5 of 8 conversations explicitly named the translator role between AI capability and change as the gap.",
      "Top 2 arenas by composite (AI Consulting, MS Partner) both score 8.5+ on strength fit.",
      "Energy delta is +2 or higher in 5 of 8 conversations — repeatedly with senior practitioners, not generalists.",
      "M365 background opens doors faster than expected — Stefan, Henrik, Petra all referenced it unprompted.",
      "Two unrelated people (Marta, Léa) independently described the same boutique unit-economics curve.",
    ],
    evidenceAgainst: [
      "Boutique founding requires 4–6 month runway I don't yet have.",
      "Public sector autonomy score is consistently low — mission alignment isn't enough.",
      "Comp ceiling for pure consulting plateaus around €180k unless I build a productized offer.",
    ],
    warnings: [
      "SAP/PMM-style roles drain me — drop from active list.",
      "Internal corporate matrix roles dilute the translator strength.",
      "Don't optimize for credibility today over learning speed.",
    ],
    repeated: [
      "\"Translator\" — used by 4 different people unprompted.",
      "\"Adoption survives month two\" — my own phrase, now echoed back.",
      "Senior buyers want 18-month programs, not 8-week pilots.",
      "Writing publicly is the differentiator that compounds, not certifications.",
    ],
    keywords: ["translator", "adoption", "month two", "change-managed", "governance-aware", "M365 → AI", "Monday morning", "18-month", "boutique", "behavior change", "senior decisions"],
  },
  experiments: [
    { id: "x1", title: "Co-deliver one Marta workshop end-to-end", due: "May 10" },
    { id: "x2", title: "Publish AI-Act-readiness piece (1500w) and send to Aisha", due: "May 14" },
    { id: "x3", title: "Stefan call: clarify strategic vs. delivery split for Avanade role", due: "May 16" },
  ],
};

function App() {
  const [route, setRoute] = useStateApp("command");
  return (
    <>
      <Sidebar current={route} onNav={setRoute}/>
      {route === "command" && <CommandCenter data={APP_DATA} onNav={setRoute}/>}
      {route === "signal" && <SignalProfile data={APP_DATA}/>}
      {route === "arena" && <ArenaExplorer data={APP_DATA}/>}
      {route === "people" && <PeopleConversations data={APP_DATA}/>}
      {route === "fit" && <OpportunityFit data={APP_DATA}/>}
      {route === "patterns" && <PatternsDirection data={APP_DATA}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
