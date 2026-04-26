import {
  Btn,
  Card,
  Chip,
  Eyebrow,
  MistLandscape,
  SectionHeader,
  Stat,
  Tile,
} from "../components/Primitives";
import { Page } from "../components/Shell";

// ---------- Hard-coded preview content ----------
// Will be replaced by live data from the storage layer in the next pass.

const HYPOTHESIS_FULL =
  "AI workforce adoption inside governance-aware organizations is where my translator, activator, and structured creativity strengths compound fastest over the next 3 years.";

const STATS = {
  conversations30d: 5,
  activeDirections: 5,
  totalDirections: 7,
  avgEnergyGain: "+2.4",
  strongestFit: "9.0",
};

const STRONGEST_DIRECTION = {
  name: "AI Adoption Consulting",
  averageScore: 8.4,
  description: "Combines change, governance, and practical AI enablement.",
  topScore: "9.0 strengths fit",
};

const BEST_CONVERSATION = {
  org: "Microsoft Partner",
  role: "Head of Modern Work",
  energyGain: 3,
  insight:
    "The market gap they described — Copilot rolled out without governance — is exactly the work I do.",
  followUp: "Send governance angle note · this week",
};

const NEXT_STEP = {
  title: "Three short outreach notes to AI adoption leads",
  description: "One concrete action this week.",
  due: "Fri 1 May",
};

const WATCH_OUT =
  "Two recent conversations had high admiration but low market pull — energizing, but no immediate signal.";

const PHASE_STEPS = ["Profile", "Directions", "Talks", "Patterns"];
const PHASE_ACTIVE = 1; // Currently working on Directions

// ---------- Page ----------
export default function CommandCenter() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <Page
      crumbs={["Career discovery", "Home"]}
      actions={
        <>
          <Btn sm>Add talk</Btn>
          <Btn sm>Add role</Btn>
          <Btn sm variant="dark">
            Export brief
          </Btn>
        </>
      }
    >
      {/* ====================  HERO  ==================== */}
      <section style={{ marginBottom: 40 }}>
        <Card
          variant="float"
          style={{
            padding: 0,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 0,
            minHeight: 360,
          }}
        >
          {/* Left: editorial headline */}
          <div
            style={{
              padding: "44px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Eyebrow style={{ marginBottom: 16 }}>
              Working hypothesis · v1 · {today}
            </Eyebrow>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                color: "var(--gh-ink)",
                marginBottom: 18,
              }}
            >
              Find where your abilities{" "}
              <em
                style={{
                  fontFamily: "var(--gh-italic)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--gh-rust)",
                }}
              >
                compound
              </em>{" "}
              fastest.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "var(--gh-muted)",
                lineHeight: 1.55,
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              {HYPOTHESIS_FULL}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="primary">Review evidence →</Btn>
              <Btn>Update hypothesis</Btn>
            </div>
          </div>

          {/* Right: mist landscape */}
          <div
            style={{
              background: "var(--gh-mist)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <Eyebrow>Discovery phase</Eyebrow>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--gh-ink)",
                  letterSpacing: "-0.015em",
                }}
              >
                Comparing directions
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12.5,
                  color: "var(--gh-muted)",
                }}
              >
                Profile drafted. Now stress-testing seven directions against real
                conversations.
              </div>
            </div>
            <div style={{ flex: 1, marginTop: 8 }}>
              <MistLandscape steps={PHASE_STEPS} activeIndex={PHASE_ACTIVE} />
            </div>
          </div>
        </Card>
      </section>

      {/* ====================  THREE TILES  ==================== */}
      <section style={{ marginBottom: 40 }}>
        <SectionHeader
          eyebrow="Today's surface"
          title="Strongest, latest, next."
          subtitle="The three things worth your attention right now, drawn from the evidence so far."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <Tile
            tone="rust"
            eyebrow="Strongest direction · pursue"
            badge={
              <span
                style={{
                  fontFamily: "var(--gh-mono)",
                  fontSize: 11,
                  padding: "3px 10px",
                  background: "rgba(245,244,241,0.15)",
                  borderRadius: 999,
                  color: "var(--gh-canvas)",
                }}
              >
                {STRONGEST_DIRECTION.averageScore.toFixed(1)}
              </span>
            }
            title={STRONGEST_DIRECTION.name}
            body={STRONGEST_DIRECTION.description}
            footer={
              <>
                <span>{STRONGEST_DIRECTION.topScore}</span>
                <span style={{ opacity: 0.7 }}>→</span>
              </>
            }
          />

          <Tile
            tone="slate"
            eyebrow="Best conversation · reflect"
            badge={
              <span
                style={{
                  fontFamily: "var(--gh-mono)",
                  fontSize: 11,
                  padding: "3px 10px",
                  background: "rgba(245,244,241,0.15)",
                  borderRadius: 999,
                  color: "var(--gh-canvas)",
                }}
              >
                ↗ +{BEST_CONVERSATION.energyGain}
              </span>
            }
            meta={`${BEST_CONVERSATION.org} · ${BEST_CONVERSATION.role}`}
            title={BEST_CONVERSATION.insight}
            italic
            footer={
              <>
                <span>{BEST_CONVERSATION.followUp}</span>
                <span style={{ opacity: 0.7 }}>→</span>
              </>
            }
          />

          <Tile
            tone="mist"
            eyebrow="Next step · observe"
            badge={
              <Chip tone="neutral">Due {NEXT_STEP.due}</Chip>
            }
            title={NEXT_STEP.title}
            body={NEXT_STEP.description}
            footer={
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm variant="dark">Mark complete</Btn>
                <Btn sm>Reschedule</Btn>
              </div>
            }
          />
        </div>
      </section>

      {/* ====================  STATS BAND  ==================== */}
      <section style={{ marginBottom: 40 }}>
        <Card
          style={{
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          <div style={{ paddingRight: 24 }}>
            <Stat
              label="Conversations · 30d"
              value={String(STATS.conversations30d)}
            />
          </div>
          <div
            style={{
              borderLeft: "1px solid var(--gh-line-soft)",
              padding: "0 24px",
            }}
          >
            <Stat
              label="Active directions"
              value={`${STATS.activeDirections}/${STATS.totalDirections}`}
            />
          </div>
          <div
            style={{
              borderLeft: "1px solid var(--gh-line-soft)",
              padding: "0 24px",
            }}
          >
            <Stat
              label="Avg energy gain"
              value={STATS.avgEnergyGain}
              emphasis
            />
          </div>
          <div
            style={{
              borderLeft: "1px solid var(--gh-line-soft)",
              padding: "0 24px",
            }}
          >
            <Stat label="Strongest fit" value={STATS.strongestFit} />
          </div>
        </Card>
      </section>

      {/* ====================  CLOSING WATCH-OUT  ==================== */}
      <section>
        <div
          style={{
            background: "var(--gh-slate)",
            color: "var(--gh-canvas)",
            borderRadius: 16,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "rgba(245,244,241,0.12)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gh-canvas)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--gh-mono)",
                fontSize: 11,
                color: "rgba(245,244,241,0.65)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Watch-out · drawn from your evidence
            </div>
            <div
              style={{
                fontFamily: "var(--gh-italic)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.45,
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
            >
              "{WATCH_OUT}"
            </div>
          </div>
          <button
            style={{
              height: 32,
              padding: "0 14px",
              borderRadius: 8,
              background: "rgba(245,244,241,0.12)",
              color: "var(--gh-canvas)",
              border: "1px solid rgba(245,244,241,0.22)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Review patterns
          </button>
        </div>
      </section>
    </Page>
  );
}
