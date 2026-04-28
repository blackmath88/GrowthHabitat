/* ==========================================================================
   Growth Habitat — Entity Types
   The data contract for the entire app. Every entity gets an id, timestamps,
   and a stable schema version. The version field is what lets the storage
   layer migrate old data on load.
   ========================================================================== */

export const SCHEMA_VERSION = 1;

// Score scale is 1–10 throughout. We use undefined (not 0) to mean "not yet
// scored" so empty states render cleanly without lying about the data.
export type Score = number | undefined;

// ---------- Status & decision verbs ---------------------------------------

export type DirectionStatus = "active" | "explore" | "park" | "avoid";
export type Decision = "pursue" | "explore" | "park" | "avoid";
export type EvidenceStrength = "weak" | "medium" | "strong";
export type TrustSignal = "forming" | "not_enough_signal" | "concern";

// ---------- Profile -------------------------------------------------------

export interface Profile {
  id: "profile";
  name: string;
  currentRole: string;
  desiredDirection: string;
  workingIdentity: string;
  positioningStatement: string;
  strengths: string[];
  workingStyle: string;
  energyGains: string[];
  energyDrains: string[];
  thriveEnvironments: string[];
  avoidEnvironments: string[];
  nonNegotiables: string[];
  currentHypothesis: string;
  updatedAt: string;
}

// ---------- Direction -----------------------------------------------------

export interface Direction {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  status: DirectionStatus;
  interestScore: Score;
  marketDemandScore: Score;
  strengthsFitScore: Score;
  learningPotentialScore: Score;
  accessScore: Score;
  credibilityScore: Score;
  compensationPotentialScore: Score;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Conversation --------------------------------------------------

export interface Conversation {
  id: string;
  person: string;
  organization: string;
  role: string;
  relatedDirectionId?: string;
  date: string;
  energyBefore: Score;
  energyAfter: Score;
  admirationScore: Score;
  learningPotentialScore: Score;
  recognitionScore: Score;
  autonomyScore: Score;
  marketPullScore: Score;
  trustSignal?: TrustSignal;
  evidenceStrength: EvidenceStrength;
  taggedEnergyGains: string[];   // references to Profile.energyGains entries
  taggedEnergyDrains: string[];  // references to Profile.energyDrains entries
  workWithOnHardProblem?: "yes" | "no" | "maybe";
  keyInsight: string;
  notes: string;
  followUpAction: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Opportunity ---------------------------------------------------

export interface Opportunity {
  id: string;
  company: string;
  title: string;
  link: string;
  relatedDirectionId?: string;
  status: "open" | "applied" | "interviewing" | "closed";
  interestingProblemsScore: Score;
  smartPeopleScore: Score;
  learningPotentialScore: Score;
  autonomyScore: Score;
  visibleImpactScore: Score;
  strengthsFitScore: Score;
  compensationScore: Score;
  futureValueScore: Score;
  evidenceStrength: EvidenceStrength;
  risks: string;
  notes: string;
  decision?: Decision;
  positioningAngle: string;
  outreachDraft: string;
  cvAngle: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Hypothesis (current + history) --------------------------------

export interface Hypothesis {
  id: string;
  statement: string;
  confidence: Score;
  evidenceFor: string;
  evidenceAgainst: string;
  nextStep: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------- Reflection (free-form notes) ----------------------------------

export interface Reflection {
  id: string;
  type: "observation" | "decision" | "question";
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

// ---------- Pattern (auto-detected, not user-authored) --------------------

export interface Pattern {
  id: string;
  kind: "concentration" | "absence" | "contradiction";
  label: string;
  description: string;
  evidence: string[];
  importance: number;
  createdAt: string;
}

// ---------- Top-level store shape ----------------------------------------

export interface AppData {
  schemaVersion: number;
  profile: Profile;
  directions: Direction[];
  conversations: Conversation[];
  opportunities: Opportunity[];
  hypotheses: Hypothesis[];   // ordered chronologically; .at(-1) is current
  reflections: Reflection[];
  patterns: Pattern[];
  updatedAt: string;
}
