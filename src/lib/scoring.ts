/* ==========================================================================
   Growth Habitat — Scoring
   Pure functions. No state, no side effects. Given an entity, return a
   computed value. These are the heart of "evidence becomes pattern."
   ========================================================================== */

import type {
  Conversation,
  Direction,
  EvidenceStrength,
  Opportunity,
} from "../types/entities";

// ---------- Helpers ------------------------------------------------------

/** Round to 1 decimal place. Avoids float artifacts in display. */
const round1 = (n: number) => Math.round(n * 10) / 10;

/** Average of defined scores; returns undefined if none are scored. */
function avgScores(scores: (number | undefined)[]): number | undefined {
  const valid = scores.filter((s): s is number => typeof s === "number");
  if (valid.length === 0) return undefined;
  const sum = valid.reduce((a, b) => a + b, 0);
  return round1(sum / valid.length);
}

// ---------- Direction.averageScore ---------------------------------------

export function directionAverage(d: Direction): number | undefined {
  return avgScores([
    d.interestScore,
    d.marketDemandScore,
    d.strengthsFitScore,
    d.learningPotentialScore,
    d.accessScore,
    d.credibilityScore,
    d.compensationPotentialScore,
  ]);
}

/** Number of scored dimensions (0–7). Useful for "how complete is this?" */
export function directionScoreCompleteness(d: Direction): number {
  return [
    d.interestScore,
    d.marketDemandScore,
    d.strengthsFitScore,
    d.learningPotentialScore,
    d.accessScore,
    d.credibilityScore,
    d.compensationPotentialScore,
  ].filter((s) => typeof s === "number").length;
}

// ---------- Conversation.energyGain --------------------------------------

/**
 * Energy gain = energy after - energy before. Positive = energizing.
 * Returns undefined if either is unset, so the UI can show "—" instead of 0.
 */
export function conversationEnergyGain(c: Conversation): number | undefined {
  if (typeof c.energyBefore !== "number" || typeof c.energyAfter !== "number") {
    return undefined;
  }
  return c.energyAfter - c.energyBefore;
}

/** Average across the five "Buffett-lens" signal scores. */
export function conversationSignalAverage(
  c: Conversation
): number | undefined {
  return avgScores([
    c.admirationScore,
    c.learningPotentialScore,
    c.recognitionScore,
    c.autonomyScore,
    c.marketPullScore,
  ]);
}

// ---------- Opportunity.fitScore -----------------------------------------

export function opportunityFitScore(o: Opportunity): number | undefined {
  return avgScores([
    o.interestingProblemsScore,
    o.smartPeopleScore,
    o.learningPotentialScore,
    o.autonomyScore,
    o.visibleImpactScore,
    o.strengthsFitScore,
    o.compensationScore,
    o.futureValueScore,
  ]);
}

// ---------- Evidence weighting -------------------------------------------

/**
 * Weight by evidence strength. Used in Patterns to make a "n=12" line honest:
 * 12 weak data points isn't the same as 12 strong ones.
 */
export const EVIDENCE_WEIGHT: Record<EvidenceStrength, number> = {
  weak: 1,
  medium: 2,
  strong: 4,
};

export function weightedEvidenceCount(items: {
  evidenceStrength: EvidenceStrength;
}[]): number {
  return items.reduce((sum, item) => sum + EVIDENCE_WEIGHT[item.evidenceStrength], 0);
}

export function countByStrength(
  items: { evidenceStrength: EvidenceStrength }[]
): Record<EvidenceStrength, number> {
  return items.reduce(
    (acc, item) => {
      acc[item.evidenceStrength] += 1;
      return acc;
    },
    { weak: 0, medium: 0, strong: 0 } as Record<EvidenceStrength, number>
  );
}

// ---------- Direction comparators ----------------------------------------

/**
 * Sort directions by average score, descending. Undefined averages sink.
 */
export function rankDirections(directions: Direction[]): Direction[] {
  return [...directions]
    .filter((d) => d.status !== "avoid")
    .sort((a, b) => {
      const av = directionAverage(a) ?? -1;
      const bv = directionAverage(b) ?? -1;
      return bv - av;
    });
}

/** The single strongest direction, or undefined if none scored. */
export function strongestDirection(
  directions: Direction[]
): Direction | undefined {
  const ranked = rankDirections(directions);
  return ranked.find((d) => directionAverage(d) !== undefined);
}

// ---------- Conversation comparators -------------------------------------

export function rankConversationsByEnergyGain(
  conversations: Conversation[]
): Conversation[] {
  return [...conversations]
    .filter((c) => conversationEnergyGain(c) !== undefined)
    .sort(
      (a, b) =>
        (conversationEnergyGain(b) ?? 0) - (conversationEnergyGain(a) ?? 0)
    );
}

export function bestRecentConversation(
  conversations: Conversation[]
): Conversation | undefined {
  // "Best recent" = highest energy gain in the last 30 days
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = conversations.filter(
    (c) => new Date(c.date).getTime() >= cutoff
  );
  return rankConversationsByEnergyGain(recent)[0];
}

// ---------- Aggregate stats for the Command Center -----------------------

export interface CommandStats {
  conversations30d: number;
  activeDirections: number;
  totalDirections: number;
  avgEnergyGain: number | undefined;
  strongestFit: number | undefined;
}

export function commandStats(
  directions: Direction[],
  conversations: Conversation[]
): CommandStats {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = conversations.filter(
    (c) => new Date(c.date).getTime() >= cutoff
  );
  const gains = recent
    .map(conversationEnergyGain)
    .filter((g): g is number => typeof g === "number");
  const avgGain =
    gains.length > 0
      ? round1(gains.reduce((a, b) => a + b, 0) / gains.length)
      : undefined;

  const strongest = strongestDirection(directions);

  return {
    conversations30d: recent.length,
    activeDirections: directions.filter((d) => d.status === "active").length,
    totalDirections: directions.length,
    avgEnergyGain: avgGain,
    strongestFit: strongest ? directionAverage(strongest) : undefined,
  };
}
