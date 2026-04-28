/* ==========================================================================
   Growth Habitat — Conversation Card
   One card per logged conversation. Shows the artifact: who, when, energy
   gain as a chip, evidence strength, the key insight as a serif pull-quote
   (if present), and the follow-up. Click to edit.
   ========================================================================== */

import { Eyebrow } from "./Primitives";
import {
  conversationEnergyGain,
  conversationSignalAverage,
} from "../lib/scoring";
import { useDirections } from "../lib/store";
import type { Conversation } from "../types/entities";

const STRENGTH_LABEL = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

const STRENGTH_TONE = {
  weak: { bg: "var(--gh-canvas-deep)", fg: "var(--gh-faint)", border: "var(--gh-line)" },
  medium: { bg: "var(--gh-mist)", fg: "var(--gh-slate-deep)", border: "var(--gh-mist-line)" },
  strong: { bg: "var(--gh-rust-soft)", fg: "var(--gh-rust)", border: "var(--gh-rust-line)" },
};

export function ConversationCard({
  conversation,
  onClick,
}: {
  conversation: Conversation;
  onClick: () => void;
}) {
  const { directions } = useDirections();
  const direction = directions.find(
    (d) => d.id === conversation.relatedDirectionId
  );

  const gain = conversationEnergyGain(conversation);
  const sig = conversationSignalAverage(conversation);
  const date = new Date(conversation.date);
  const dateLabel = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const cleanedNotes = (conversation.notes || "").replace(
    /^\[market_pull:[^\]]*\]\s*/,
    ""
  );

  const strengthTone = STRENGTH_TONE[conversation.evidenceStrength];

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--gh-surface)",
        border: "1px solid var(--gh-line)",
        borderRadius: "var(--gh-r-panel)",
        boxShadow: "var(--gh-shadow-card)",
        padding: 24,
        cursor: "pointer",
        transition: "border-color var(--gh-dur-base) var(--gh-ease)",
        marginBottom: 12,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--gh-faint)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--gh-line)";
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 16,
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "var(--gh-ink)",
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            {conversation.person || "(unnamed conversation)"}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--gh-muted)",
              lineHeight: 1.4,
            }}
          >
            {[conversation.organization, conversation.role]
              .filter(Boolean)
              .join(" · ") || (
              <span style={{ fontStyle: "italic" }}>No org or role yet</span>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          {/* Energy gain chip */}
          {typeof gain === "number" ? (
            <div
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 999,
                background:
                  gain > 0
                    ? "var(--gh-rust-soft)"
                    : gain < 0
                    ? "var(--gh-warn-soft)"
                    : "var(--gh-canvas-deep)",
                color:
                  gain > 0
                    ? "var(--gh-rust)"
                    : gain < 0
                    ? "var(--gh-warn)"
                    : "var(--gh-muted)",
                border: `1px solid ${
                  gain > 0
                    ? "var(--gh-rust-line)"
                    : gain < 0
                    ? "var(--gh-warn-line)"
                    : "var(--gh-line)"
                }`,
              }}
            >
              {gain >= 0 ? `↗ +${gain}` : `↘ ${gain}`}
            </div>
          ) : (
            <div
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 10.5,
                color: "var(--gh-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              No energy yet
            </div>
          )}

          {/* Evidence strength */}
          <div
            style={{
              fontFamily: "var(--gh-mono)",
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 999,
              background: strengthTone.bg,
              color: strengthTone.fg,
              border: `1px solid ${strengthTone.border}`,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 500,
            }}
          >
            {STRENGTH_LABEL[conversation.evidenceStrength]}
          </div>
        </div>
      </div>

      {/* Key insight as serif pull-quote (if present) */}
      {conversation.keyInsight && (
        <div
          style={{
            fontFamily: "var(--gh-italic)",
            fontStyle: "italic",
            fontSize: 15.5,
            lineHeight: 1.45,
            color: "var(--gh-ink)",
            letterSpacing: "-0.005em",
            paddingLeft: 14,
            borderLeft: "2px solid var(--gh-rust-line)",
            margin: "12px 0",
          }}
        >
          "{conversation.keyInsight}"
        </div>
      )}

      {/* Follow-up + meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid var(--gh-line-soft)",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            color: conversation.followUpAction
              ? "var(--gh-ink-soft)"
              : "var(--gh-faint)",
            lineHeight: 1.4,
            flex: 1,
            minWidth: 0,
          }}
        >
          {conversation.followUpAction ? (
            <>
              <span
                style={{
                  fontFamily: "var(--gh-mono)",
                  fontSize: 10.5,
                  color: "var(--gh-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginRight: 8,
                }}
              >
                Next:
              </span>
              {conversation.followUpAction}
            </>
          ) : (
            <span style={{ fontStyle: "italic" }}>No follow-up yet</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {direction && (
            <span
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 10.5,
                color: "var(--gh-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {direction.name}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--gh-mono)",
              fontSize: 10.5,
              color: "var(--gh-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {dateLabel}
          </span>
          {typeof sig === "number" && (
            <span
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 11,
                color: "var(--gh-ink)",
              }}
              title="Average Buffett-lens score"
            >
              {sig.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Notes preview if no key insight */}
      {!conversation.keyInsight && cleanedNotes && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: "1px dashed var(--gh-line-soft)",
            fontSize: 12.5,
            color: "var(--gh-muted)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Eyebrow>Notes</Eyebrow>
          <div style={{ marginTop: 4 }}>{cleanedNotes}</div>
        </div>
      )}
    </div>
  );
}
