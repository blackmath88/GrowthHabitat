import { useState } from "react";
import {
  AutosaveInput,
  AutosaveScore,
  AutosaveTextarea,
  Btn,
  Card,
  Eyebrow,
  SectionHeader,
  StatusPill,
} from "../components/Primitives";
import { Page } from "../components/Shell";
import {
  directionAverage,
  directionScoreCompleteness,
  rankDirections,
} from "../lib/scoring";
import { useDirections } from "../lib/store";
import type { Direction, DirectionStatus } from "../types/entities";

// ---------- Status helpers -----------------------------------------------

const STATUS_OPTIONS: DirectionStatus[] = [
  "active",
  "explore",
  "park",
  "avoid",
];

function statusTone(s: DirectionStatus): "rust" | "slate" | "default" | "muted" {
  switch (s) {
    case "active":
      return "rust";
    case "explore":
      return "slate";
    case "park":
      return "muted";
    case "avoid":
      return "muted";
  }
}

// ---------- Score row ----------------------------------------------------

const SCORE_DIMENSIONS: { key: keyof Direction; label: string; helper: string }[] = [
  { key: "interestScore", label: "Interest", helper: "How much you genuinely want this" },
  { key: "marketDemandScore", label: "Market demand", helper: "Whether the world is asking for it" },
  { key: "strengthsFitScore", label: "Strengths fit", helper: "How well your strengths apply" },
  { key: "learningPotentialScore", label: "Learning potential", helper: "How much you'd grow in 3 years" },
  { key: "accessScore", label: "Access", helper: "How realistically you can enter today" },
  { key: "credibilityScore", label: "Credibility", helper: "Whether your story holds up" },
  { key: "compensationPotentialScore", label: "Comp potential", helper: "Realistic earning ceiling" },
];

function ScoreRow({
  direction,
  onUpdate,
}: {
  direction: Direction;
  onUpdate: (patch: Partial<Direction>) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {SCORE_DIMENSIONS.map((d) => (
        <div
          key={d.key}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 11,
                color: "var(--gh-ink)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {d.label}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--gh-faint)",
                marginTop: 2,
              }}
            >
              {d.helper}
            </div>
          </div>
          <AutosaveScore
            value={direction[d.key] as number | undefined}
            onSave={(v) => onUpdate({ [d.key]: v } as Partial<Direction>)}
            ariaLabel={d.label}
          />
        </div>
      ))}
    </div>
  );
}

// ---------- Direction card -----------------------------------------------

function DirectionCard({ direction }: { direction: Direction }) {
  const { update, remove } = useDirections();
  const [expanded, setExpanded] = useState(false);
  const avg = directionAverage(direction);
  const completeness = directionScoreCompleteness(direction);

  const onUpdate = (patch: Partial<Direction>) => update(direction.id, patch);

  return (
    <Card style={{ padding: 24, marginBottom: 12 }}>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto auto",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <AutosaveInput
            value={direction.name}
            onSave={(v) => onUpdate({ name: v })}
            ariaLabel="Direction name"
            style={{
              fontSize: 17,
              fontWeight: 600,
              border: "1px solid transparent",
              padding: "6px 8px",
              background: "transparent",
            }}
          />
        </div>

        <StatusPill
          value={direction.status}
          options={STATUS_OPTIONS}
          onChange={(v) => onUpdate({ status: v })}
          toneFor={statusTone}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            minWidth: 80,
          }}
        >
          <div
            style={{
              fontFamily: "var(--gh-sans)",
              fontSize: 22,
              fontWeight: 700,
              color: avg !== undefined ? "var(--gh-ink)" : "var(--gh-faint)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {avg !== undefined ? avg.toFixed(1) : "—"}
          </div>
          <div
            style={{
              fontFamily: "var(--gh-mono)",
              fontSize: 10,
              color: "var(--gh-faint)",
              marginTop: 4,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {completeness}/7 scored
          </div>
        </div>

        <Btn sm variant="ghost" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Btn>
      </div>

      {/* Description always visible */}
      <div style={{ marginTop: 10 }}>
        <AutosaveTextarea
          rows={2}
          value={direction.description}
          onSave={(v) => onUpdate({ description: v })}
          placeholder="One-sentence description of this direction."
          ariaLabel="Description"
          style={{
            fontSize: 14,
            color: "var(--gh-muted)",
            background: "transparent",
            border: "1px solid transparent",
          }}
        />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--gh-line-soft)",
            display: "grid",
            gap: 24,
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Hypothesis</Eyebrow>
            <AutosaveTextarea
              rows={2}
              value={direction.hypothesis}
              onSave={(v) => onUpdate({ hypothesis: v })}
              placeholder="Why might this direction fit? Written as a testable claim."
              ariaLabel="Hypothesis"
            />
          </div>

          <div>
            <Eyebrow style={{ marginBottom: 12 }}>Scoring · 1–10</Eyebrow>
            <ScoreRow direction={direction} onUpdate={onUpdate} />
          </div>

          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Notes</Eyebrow>
            <AutosaveTextarea
              rows={3}
              value={direction.notes}
              onSave={(v) => onUpdate({ notes: v })}
              placeholder="Anything you want to remember about this direction."
              ariaLabel="Notes"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btn
              sm
              variant="ghost"
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${direction.name}"? This can't be undone.`
                  )
                ) {
                  remove(direction.id);
                }
              }}
            >
              Delete direction
            </Btn>
          </div>
        </div>
      )}
    </Card>
  );
}

// ---------- Decision-verb legend -----------------------------------------

function DecisionLegend() {
  const verbs: { label: string; meaning: string }[] = [
    { label: "Active", meaning: "Currently testing — looking for evidence." },
    { label: "Explore", meaning: "Worth one informational conversation, then re-decide." },
    { label: "Park", meaning: "Good but not now — revisit in 90 days." },
    { label: "Avoid", meaning: "Seen enough; this isn't it." },
  ];
  return (
    <div
      style={{
        background: "var(--gh-mist)",
        border: "1px solid var(--gh-mist-line)",
        borderRadius: "var(--gh-r-panel)",
        padding: "16px 20px",
        marginBottom: 24,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
      }}
    >
      {verbs.map((v) => (
        <div key={v.label}>
          <div
            style={{
              fontFamily: "var(--gh-mono)",
              fontSize: 11,
              color: "var(--gh-ink)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {v.label}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--gh-muted)",
              lineHeight: 1.5,
            }}
          >
            {v.meaning}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Page ---------------------------------------------------------

export default function DirectionsPage() {
  const { directions, add } = useDirections();
  const ranked = rankDirections(directions);
  const avoided = directions.filter((d) => d.status === "avoid");

  const handleAdd = () => {
    const name = window.prompt("Name of the new direction?");
    if (!name?.trim()) return;
    add({
      name: name.trim(),
      description: "",
      hypothesis: "",
      status: "explore",
      interestScore: undefined,
      marketDemandScore: undefined,
      strengthsFitScore: undefined,
      learningPotentialScore: undefined,
      accessScore: undefined,
      credibilityScore: undefined,
      compensationPotentialScore: undefined,
      notes: "",
    });
  };

  return (
    <Page
      crumbs={["Career discovery", "Directions"]}
      actions={
        <Btn sm variant="primary" onClick={handleAdd}>
          + Add direction
        </Btn>
      }
    >
      <SectionHeader
        eyebrow="02 · Directions"
        title="Compare possible career paths before committing to one."
        subtitle="Don't bet on one thing. Run several hypotheses in parallel and let evidence move them. Score honestly — directions that score 9s on internal axes and 4s on external ones are real signal."
      />

      <DecisionLegend />

      {ranked.length === 0 ? (
        <Card style={{ padding: 32, textAlign: "center" }}>
          <p style={{ color: "var(--gh-muted)" }}>
            No directions tracked yet. Add one to start comparing.
          </p>
        </Card>
      ) : (
        ranked.map((d) => <DirectionCard key={d.id} direction={d} />)
      )}

      {avoided.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <Eyebrow style={{ marginBottom: 12 }}>Avoided</Eyebrow>
          {avoided.map((d) => (
            <DirectionCard key={d.id} direction={d} />
          ))}
        </div>
      )}
    </Page>
  );
}
