/* ==========================================================================
   Growth Habitat — Conversation Form
   Three-step flow:
     Step 1 — Who & when (5 fields)
     Step 2 — Energy, trust, evidence (10 fields)
     Step 3 — Insight & follow-up (5 fields)
   The conversation entity persists from step 1 onward — every field commits
   on blur via autosave, so leaving the form mid-flow doesn't lose data.
   ========================================================================== */

import { useState } from "react";
import {
  AutosaveInput,
  AutosaveScore,
  AutosaveTextarea,
  Btn,
  CheckboxRow,
  ChipMultiSelect,
  Eyebrow,
  SegmentedSelect,
  StepIndicator,
} from "./Primitives";
import {
  useConversations,
  useDirections,
  useProfile,
} from "../lib/store";
import type {
  Conversation,
  EvidenceStrength,
  TrustSignal,
} from "../types/entities";

// ---------- Constants ---------------------------------------------------

const STEPS = [
  { label: "Who & when", sub: "Person, organization, related direction" },
  { label: "Energy & signal", sub: "Buffett lens scores and trust" },
  { label: "Insight & follow-up", sub: "What you learned. What's next." },
];

const TRUST_OPTIONS: { value: TrustSignal; label: string; helper: string }[] = [
  { value: "forming", label: "Trust forming", helper: "Real signal" },
  { value: "not_enough_signal", label: "Not enough signal", helper: "Too early" },
  { value: "concern", label: "Trust concern", helper: "Off note" },
];

const EVIDENCE_OPTIONS: {
  value: EvidenceStrength;
  label: string;
  helper: string;
}[] = [
  { value: "weak", label: "Weak", helper: "Read it" },
  { value: "medium", label: "Medium", helper: "Touched it" },
  { value: "strong", label: "Strong", helper: "Engaged with it" },
];

const MARKET_PULL_SIGNALS = [
  {
    key: "asked_for_followup",
    label: "Asked for a follow-up",
    helper: "They want another conversation",
  },
  {
    key: "asked_for_artifact",
    label: "Asked for an artifact",
    helper: "Deck, doc, framework — they want something tangible",
  },
  {
    key: "introduced_me",
    label: "Introduced me to someone",
    helper: "Network signal — they want to share you",
  },
  {
    key: "named_role_or_problem",
    label: "Named a role or specific problem you'd fit",
    helper: "They mapped you to a real opening",
  },
  {
    key: "asked_about_availability",
    label: "Asked about your availability",
    helper: "Direct interest in working together",
  },
  {
    key: "no_pull_yet",
    label: "No pull yet",
    helper: "Honest — nice talk, no traction",
  },
];

// ---------- Form -------------------------------------------------------

export function ConversationForm({
  conversationId,
  onDone,
}: {
  conversationId: string;
  onDone?: () => void;
}) {
  const { conversations, update, remove } = useConversations();
  const { directions } = useDirections();
  const { profile } = useProfile();

  const conv = conversations.find((c) => c.id === conversationId);

  const [step, setStep] = useState(0);
  // Market pull lives in the notes field as a JSON tag for now to avoid
  // a schema migration. Pragmatic choice: it's still queryable, still
  // exported, and we can promote it to a typed field in patch 04b.
  const [marketPull, setMarketPull] = useState<string[]>(() => {
    if (!conv?.notes) return [];
    const match = conv.notes.match(/^\[market_pull:([^\]]*)\]\s*/);
    return match ? match[1].split(",").filter(Boolean) : [];
  });

  if (!conv) {
    return (
      <div style={{ color: "var(--gh-muted)" }}>
        Conversation not found. It may have been deleted.
      </div>
    );
  }

  const onUpdate = (patch: Partial<Conversation>) => update(conv.id, patch);

  // Toggle a market pull signal and persist into notes prefix
  const toggleMarketPull = (key: string) => {
    const next = marketPull.includes(key)
      ? marketPull.filter((k) => k !== key)
      : [...marketPull, key];
    setMarketPull(next);
    // Strip existing prefix and write new one
    const stripped = (conv.notes || "").replace(
      /^\[market_pull:[^\]]*\]\s*/,
      ""
    );
    const prefix = next.length > 0 ? `[market_pull:${next.join(",")}] ` : "";
    onUpdate({ notes: prefix + stripped });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete this conversation${conv.person ? ` with ${conv.person}` : ""}? This can't be undone.`
      )
    ) {
      remove(conv.id);
      onDone?.();
    }
  };

  return (
    <div>
      {/* Step indicator */}
      <StepIndicator
        steps={STEPS}
        current={step}
        onJump={(i) => setStep(i)}
      />

      {/* ===================== Step 1: Who & when ===================== */}
      {step === 0 && (
        <div style={{ display: "grid", gap: 24 }}>
          <FormField
            label="Person"
            helper="Their name. Use a clear placeholder if it's not yet a real contact (e.g. 'Microsoft Partner Conversation')."
          >
            <AutosaveInput
              value={conv.person}
              onSave={(v) => onUpdate({ person: v })}
              ariaLabel="Person"
              placeholder="Name or descriptive placeholder"
            />
          </FormField>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <FormField
              label="Organization"
              helper="Where they work, or the context."
            >
              <AutosaveInput
                value={conv.organization}
                onSave={(v) => onUpdate({ organization: v })}
                ariaLabel="Organization"
                placeholder="Company, institution, or context"
              />
            </FormField>

            <FormField label="Role" helper="Their title or role.">
              <AutosaveInput
                value={conv.role}
                onSave={(v) => onUpdate({ role: v })}
                ariaLabel="Role"
                placeholder="e.g. Head of Modern Work"
              />
            </FormField>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <FormField
              label="Date"
              helper="When the conversation happened."
            >
              <input
                type="date"
                className="gh-input"
                value={conv.date.slice(0, 10)}
                onChange={(e) => onUpdate({ date: e.target.value })}
                aria-label="Date"
              />
            </FormField>

            <FormField
              label="Related direction"
              helper="Which direction this conversation tests."
            >
              <select
                className="gh-select"
                value={conv.relatedDirectionId ?? ""}
                onChange={(e) =>
                  onUpdate({
                    relatedDirectionId: e.target.value || undefined,
                  })
                }
                aria-label="Related direction"
              >
                <option value="">— None / unclassified</option>
                {directions
                  .filter((d) => d.status !== "avoid")
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </FormField>
          </div>

          <FormField
            label="Evidence strength"
            helper="Honest weight. A read article is weak; a deep working conversation is strong. The pattern engine uses this."
          >
            <SegmentedSelect
              options={EVIDENCE_OPTIONS}
              value={conv.evidenceStrength}
              onChange={(v) => onUpdate({ evidenceStrength: v })}
              ariaLabel="Evidence strength"
            />
          </FormField>

          <StepNav
            onBack={null}
            onNext={() => setStep(1)}
            onCancel={onDone}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* ===================== Step 2: Energy & signal ===================== */}
      {step === 1 && (
        <div style={{ display: "grid", gap: 24 }}>
          <div>
            <Eyebrow style={{ marginBottom: 12 }}>
              Energy · before vs after the conversation
            </Eyebrow>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                background: "var(--gh-mist)",
                border: "1px solid var(--gh-mist-line)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <ScoreField
                label="Energy before"
                helper="1 = drained · 5 = neutral · 10 = energized"
                value={conv.energyBefore}
                onChange={(v) => onUpdate({ energyBefore: v })}
              />
              <ScoreField
                label="Energy after"
                helper="Same scale. Difference = real signal."
                value={conv.energyAfter}
                onChange={(v) => onUpdate({ energyAfter: v })}
              />
            </div>
          </div>

          <div>
            <Eyebrow style={{ marginBottom: 12 }}>
              Buffett lens · 1–10
            </Eyebrow>
            <div style={{ display: "grid", gap: 18 }}>
              <ScoreField
                label="Admiration"
                helper="Do I admire how they work?"
                value={conv.admirationScore}
                onChange={(v) => onUpdate({ admirationScore: v })}
              />
              <ScoreField
                label="Learning potential"
                helper="Would this sharpen me?"
                value={conv.learningPotentialScore}
                onChange={(v) => onUpdate({ learningPotentialScore: v })}
              />
              <ScoreField
                label="Recognition"
                helper="Did they understand my value?"
                value={conv.recognitionScore}
                onChange={(v) => onUpdate({ recognitionScore: v })}
              />
              <ScoreField
                label="Autonomy"
                helper="Would I have room to shape the work?"
                value={conv.autonomyScore}
                onChange={(v) => onUpdate({ autonomyScore: v })}
              />
              <ScoreField
                label="Market pull"
                helper="Did the world reach toward me?"
                value={conv.marketPullScore}
                onChange={(v) => onUpdate({ marketPullScore: v })}
              />
            </div>
          </div>

          <FormField
            label="Trust signal"
            helper="Three honest states. 'Not enough signal' is the right answer for most early conversations."
          >
            <SegmentedSelect
              options={TRUST_OPTIONS}
              value={conv.trustSignal}
              onChange={(v) => onUpdate({ trustSignal: v })}
              ariaLabel="Trust signal"
            />
          </FormField>

          <FormField
            label="Would I work with them on a hard problem next month?"
            helper="The integration test. Politely interested doesn't pass it."
          >
            <SegmentedSelect
              options={[
                { value: "yes", label: "Yes" },
                { value: "maybe", label: "Maybe" },
                { value: "no", label: "No" },
              ]}
              value={conv.workWithOnHardProblem}
              onChange={(v) => onUpdate({ workWithOnHardProblem: v })}
              ariaLabel="Would I work with them on a hard problem"
            />
          </FormField>

          <StepNav
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
            onCancel={onDone}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* ===================== Step 3: Insight & follow-up ===================== */}
      {step === 2 && (
        <div style={{ display: "grid", gap: 24 }}>
          <FormField
            label="Key insight"
            helper="One sentence. What did this conversation actually teach you that you didn't know before?"
          >
            <AutosaveTextarea
              value={conv.keyInsight}
              onSave={(v) => onUpdate({ keyInsight: v })}
              ariaLabel="Key insight"
              placeholder="e.g. 'The market gap they described — Copilot rolled out without governance — is exactly the work I do.'"
              rows={2}
            />
          </FormField>

          <div>
            <Eyebrow style={{ marginBottom: 8 }}>
              Market pull observed
            </Eyebrow>
            <div
              style={{
                fontSize: 13,
                color: "var(--gh-muted)",
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              Did the world pull on you? This separates nice conversations
              from real signals.
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {MARKET_PULL_SIGNALS.map((sig) => (
                <CheckboxRow
                  key={sig.key}
                  label={sig.label}
                  helper={sig.helper}
                  checked={marketPull.includes(sig.key)}
                  onChange={() => toggleMarketPull(sig.key)}
                />
              ))}
            </div>
          </div>

          <FormField
            label="Energy gains triggered"
            helper="From your Profile. Tag what this conversation activated."
          >
            <ChipMultiSelect
              options={profile.energyGains}
              selected={conv.taggedEnergyGains}
              onChange={(v) => onUpdate({ taggedEnergyGains: v })}
              tone="rust"
              emptyLabel="No energy gains in your Profile yet. Add some first."
            />
          </FormField>

          <FormField
            label="Energy drains triggered"
            helper="Equally important. What in this conversation drained you?"
          >
            <ChipMultiSelect
              options={profile.energyDrains}
              selected={conv.taggedEnergyDrains}
              onChange={(v) => onUpdate({ taggedEnergyDrains: v })}
              tone="slate"
              emptyLabel="No energy drains in your Profile yet."
            />
          </FormField>

          <FormField
            label="Notes"
            helper="Anything else you want to remember. Quotes, role language, references, half-thoughts."
          >
            <AutosaveTextarea
              value={(conv.notes || "").replace(
                /^\[market_pull:[^\]]*\]\s*/,
                ""
              )}
              onSave={(v) => {
                // Preserve the market_pull prefix when updating notes
                const prefix =
                  marketPull.length > 0
                    ? `[market_pull:${marketPull.join(",")}] `
                    : "";
                onUpdate({ notes: prefix + v });
              }}
              ariaLabel="Notes"
              rows={4}
              placeholder="Free notes — quotes, role language, references…"
            />
          </FormField>

          <FormField
            label="Follow-up action"
            helper="One concrete thing within 7 days. If you can't articulate it, there isn't one."
          >
            <AutosaveInput
              value={conv.followUpAction}
              onSave={(v) => onUpdate({ followUpAction: v })}
              ariaLabel="Follow-up action"
              placeholder="e.g. 'Send governance angle note this week'"
            />
          </FormField>

          <StepNav
            onBack={() => setStep(1)}
            onNext={null}
            onCancel={onDone}
            onDelete={handleDelete}
            doneLabel="Done"
          />
        </div>
      )}
    </div>
  );
}

// ---------- Sub-components ---------------------------------------------

function FormField({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--gh-ink)",
          marginBottom: helper ? 4 : 8,
        }}
      >
        {label}
      </div>
      {helper && (
        <div
          style={{
            fontSize: 12.5,
            color: "var(--gh-muted)",
            lineHeight: 1.5,
            marginBottom: 10,
            maxWidth: 600,
          }}
        >
          {helper}
        </div>
      )}
      {children}
    </div>
  );
}

function ScoreField({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <div
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
            fontWeight: 600,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "var(--gh-faint)",
            marginTop: 2,
            lineHeight: 1.4,
          }}
        >
          {helper}
        </div>
      </div>
      <AutosaveScore value={value} onSave={onChange} ariaLabel={label} />
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  onCancel,
  onDelete,
  doneLabel,
}: {
  onBack: (() => void) | null;
  onNext: (() => void) | null;
  onCancel?: () => void;
  onDelete: () => void;
  doneLabel?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 16,
        borderTop: "1px solid var(--gh-line-soft)",
        marginTop: 8,
      }}
    >
      <Btn variant="ghost" sm onClick={onDelete}>
        Delete
      </Btn>
      <div style={{ display: "flex", gap: 8 }}>
        {onBack && (
          <Btn sm onClick={onBack}>
            ← Back
          </Btn>
        )}
        {onCancel && (
          <Btn sm onClick={onCancel}>
            Save & close
          </Btn>
        )}
        {onNext ? (
          <Btn sm variant="primary" onClick={onNext}>
            Continue →
          </Btn>
        ) : (
          <Btn sm variant="primary" onClick={onCancel}>
            {doneLabel ?? "Done"}
          </Btn>
        )}
      </div>
    </div>
  );
}
