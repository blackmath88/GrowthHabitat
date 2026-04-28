/* ==========================================================================
   Growth Habitat — Seed Data
   Initial state when the app starts fresh or after a reset. Achim-specific
   content, written in his voice. Edit freely after first run.
   ========================================================================== */

import type { AppData, Direction } from "../types/entities";
import { SCHEMA_VERSION } from "../types/entities";

const NOW = "2026-04-26T00:00:00.000Z";

// ---------- Helper to make IDs deterministic in seed ----------------------

const seedId = (prefix: string, n: number) => `${prefix}_${String(n).padStart(2, "0")}`;

// ---------- Directions ----------------------------------------------------

const directions: Direction[] = [
  {
    id: seedId("dir", 1),
    name: "AI Adoption Consulting",
    description:
      "Help governance-aware organizations turn AI from possibility into real workforce usage. Combines change, people, governance, and practical enablement.",
    hypothesis:
      "This direction may fit because it combines change, people, governance, AI readiness, and practical enablement — all my existing strengths converging.",
    status: "active",
    interestScore: 9,
    marketDemandScore: 8,
    strengthsFitScore: 9,
    learningPotentialScore: 8,
    accessScore: 7,
    credibilityScore: 7,
    compensationPotentialScore: 7,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 2),
    name: "Microsoft Partner Ecosystem",
    description:
      "Roles inside or adjacent to Microsoft's partner network — M365/Copilot adoption, governance-aware deployment, modern work transformation.",
    hypothesis:
      "This direction may fit because I already understand M365/Copilot adoption and the governance challenges around Microsoft environments.",
    status: "active",
    interestScore: 8,
    marketDemandScore: 9,
    strengthsFitScore: 8,
    learningPotentialScore: 7,
    accessScore: 7,
    credibilityScore: 8,
    compensationPotentialScore: 8,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 3),
    name: "Public Sector AI Transformation",
    description:
      "AI adoption work inside government, public administration, or quasi-public bodies where governance, compliance, and trust are central.",
    hypothesis:
      "This direction may fit because governance, compliance, adoption, and trust are central — and I already work in a public-sector-adjacent context.",
    status: "active",
    interestScore: 7,
    marketDemandScore: 7,
    strengthsFitScore: 8,
    learningPotentialScore: 7,
    accessScore: 6,
    credibilityScore: 7,
    compensationPotentialScore: 6,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 4),
    name: "Corporate AI Enablement",
    description:
      "In-house AI enablement role at a larger company — building workforce capability, governance frameworks, and adoption programs.",
    hypothesis:
      "This direction may fit if the role gives enough autonomy and strategic influence rather than narrow execution.",
    status: "explore",
    interestScore: 7,
    marketDemandScore: 8,
    strengthsFitScore: 8,
    learningPotentialScore: 7,
    accessScore: 7,
    credibilityScore: 7,
    compensationPotentialScore: 8,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 5),
    name: "Boutique Innovation Consultancy",
    description:
      "Small consultancy environment with smart people, fast pace, and room for creative structuring across change, AI, and human-centered design.",
    hypothesis:
      "This direction may fit if the environment is smart, fast, human, and gives room for creative structuring rather than process maintenance.",
    status: "explore",
    interestScore: 8,
    marketDemandScore: 6,
    strengthsFitScore: 9,
    learningPotentialScore: 9,
    accessScore: 5,
    credibilityScore: 6,
    compensationPotentialScore: 7,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 6),
    name: "Education / Research AI Transformation",
    description:
      "AI transformation work inside higher education, research institutions, or learning-focused organizations.",
    hypothesis:
      "This direction may fit because I understand higher education and research-adjacent public-sector dynamics from inside.",
    status: "active",
    interestScore: 7,
    marketDemandScore: 6,
    strengthsFitScore: 8,
    learningPotentialScore: 7,
    accessScore: 8,
    credibilityScore: 8,
    compensationPotentialScore: 5,
    notes: "",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: seedId("dir", 7),
    name: "Independent Consulting / Productized Offer",
    description:
      "Self-employed consulting or a productized offer around AI adoption, change, and governance.",
    hypothesis:
      "This direction may fit as a long-term option but conflicts with the near-term non-negotiable of a secure base.",
    status: "park",
    interestScore: 7,
    marketDemandScore: 6,
    strengthsFitScore: 8,
    learningPotentialScore: 8,
    accessScore: 4,
    credibilityScore: 6,
    compensationPotentialScore: 6,
    notes:
      "Parked for now. Conflicts with non-negotiable: I need a secure enough base.",
    createdAt: NOW,
    updatedAt: NOW,
  },
];

// ---------- Initial hypothesis -------------------------------------------

const hypothesis = {
  id: seedId("hyp", 1),
  statement:
    "I am testing whether AI workforce adoption inside governance-aware organizations is where my translator, activator, and structured creativity strengths compound fastest over the next 3 years.",
  confidence: 5 as number,
  evidenceFor: "",
  evidenceAgainst: "",
  nextStep: "",
  isCurrent: true,
  createdAt: NOW,
  updatedAt: NOW,
};

// ---------- Full seed payload --------------------------------------------

export const SEED: AppData = {
  schemaVersion: SCHEMA_VERSION,
  profile: {
    id: "profile",
    name: "Achim Imboden",
    currentRole:
      "Senior Expert Change Management / M365 Adoption, University of Basel",
    desiredDirection:
      "AI adoption, AI transformation, workforce AI enablement, governance-aware Copilot/M365 transformation, practical AI readiness",
    workingIdentity:
      "AI Workforce Adoption Architect · Cross-Pollinator · Structured Creative Translator",
    positioningStatement:
      "I help governance-aware organizations turn AI from possibility into real usage by bridging people, M365/Copilot adoption, governance, and practical workforce enablement.",
    strengths: [
      "I can sense quite early where people are emotionally, what they are afraid of, and what would help them move.",
      "I connect topics that usually stay separated: AI, change, governance, tools, people, learning, design, and communication.",
      "I can turn messy complexity into a structure, map, framework, or interface that people can actually use.",
      "I bring energy into rooms when a topic feels stuck, abstract, or heavy.",
      "I am good at translating technical possibilities into human language without making them shallow.",
      "I see adoption problems before they become rollout problems.",
      "I can create formats that make people curious instead of defensive.",
      "I learn fast by building, testing, comparing, and talking things through.",
      "I am good at spotting individual strengths and helping people find their own way into a topic.",
      "I can make serious organizational work feel more alive, creative, and approachable.",
    ],
    workingStyle:
      "Structured-creative. I move between strategy and prototype quickly. I learn by building and conversing. I prefer small smart teams over large slow ones.",
    energyGains: [
      "Smart people working on messy, meaningful problems without pretending the answer is already clear.",
      "Conversations where technical depth meets plain language and practical use.",
      "Situations where I can design a structure, framework, tool, or workshop that helps people move.",
      "Environments where AI is treated as an organizational capability, not just a software feature.",
      "Moments where people suddenly understand something complex because the framing or interface makes it visible.",
    ],
    energyDrains: [
      "Long meetings without a clear question, decision, or owner.",
      "Rigid hierarchy where people protect roles instead of solving the actual problem.",
      "AI hype without governance, adoption thinking, or real user value.",
      "Work where I only execute predefined tasks and cannot shape the approach.",
      "Environments where everything must look polished before anything is allowed to be tested.",
    ],
    thriveEnvironments: [
      "Governance-aware organizations that genuinely need to make AI usable for real people.",
      "Small or mid-sized teams with smart people, trust, speed, and room to build.",
      "Settings where strategy and implementation are close together, so ideas can become artifacts quickly.",
      "Organizations dealing with ambiguity, change, and adoption rather than only technical deployment.",
      "Communities or networks where learning, experimentation, and shared ownership matter.",
    ],
    avoidEnvironments: [
      "Purely political environments where self-protection matters more than progress.",
      "Narrow execution roles where my job is mainly to maintain processes, coordinate tasks, or produce status updates.",
      "Generic AI hype environments that sell transformation but do not care about governance, users, or long-term capability.",
    ],
    nonNegotiables: [
      "I need a secure enough base: stable employment or a clearly sustainable setup, not pure financial uncertainty.",
      "I need room to shape the work, not only deliver someone else's checklist.",
      "The work has to stretch me toward AI adoption, transformation, governance, or human-centered technology — not pull me back into generic coordination.",
    ],
    currentHypothesis: hypothesis.statement,
    updatedAt: NOW,
  },
  directions,
  conversations: [],
  opportunities: [],
  hypotheses: [hypothesis],
  reflections: [],
  patterns: [],
  updatedAt: NOW,
};
