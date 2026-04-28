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
import {
  bestRecentConversation,
  commandStats,
  conversationEnergyGain,
  directionAverage,
  strongestDirection,
} from "../lib/scoring";
import {
  useConversations,
  useCurrentHypothesis,
  useDirections,
  useOpportunities,
  useProfile,
} from "../lib/store";

function computePhase(
  hasProfile: boolean,
  directionCount: number,
  conversationCount: number
): { steps: string[]; activeIndex: number; label: string; sub: string } {
  const steps = ["Profile", "Directions", "Talks", "Patterns"];
  if (!hasProfile) {
    return {
      steps,
      activeIndex: 0,
      label: "Drafting profile",
      sub: "Write what you know about yourself before testing the market.",
    };
  }
  if (directionCount < 3) {
    return {
      steps,
      activeIndex: 1,
      label: "Mapping directions",
      sub: "Run several hypotheses in parallel. Don't commit yet.",
    };
  }
  if (conversationCount < 5) {
    return {
      steps,
      activeIndex: 2,
      label: "Collecting evidence",
      sub: `${conversationCount} of about 5-10 conversations needed before patterns emerge.`,
    };
  }
  return {
    steps,
    activeIndex: 3,
    label: "Reading the patterns",
    sub: "Enough evidence to look for concentration, absence, and contradiction.",
  };
}

function topScoreLabel(direction: NonNullable<ReturnType<typeof strongestDirection>>) {
  const dims: { label: string; value: number | undefined }[] = [
    { label: "strengths fit", value: direction.strengthsFitScore },
    { label: "interest", value: direction.interestScore },
    { label: "market demand", value: direction.marketDemandScore },
    { label: "learning", value: direction.learningPotentialScore },
    { label: "access", value: direction.accessScore },
    { label: "credibility", value: direction.credibilityScore },
    { label: "comp potential", value: direction.compensationPotentialScore },
  ];
  const top = dims
    .filter((d) => typeof d.value === "number")
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0];
  return top ? `${top.value} ${top.label}` : "Score this direction";
}

export default function CommandCenter() {
  const { profile } = useProfile();
  const { directions } = useDirections();
  const { conversations } = useConversations();
  const { opportunities } = useOpportunities();
  const { current: hypothesis } = useCurrentHypothesis();

  const stats = commandStats(directions, conversations);
  const strongest = strongestDirection(directions);
  const strongestAvg = strongest ? directionAverage(strongest) : undefined;
  const bestConversation = bestRecentConversation(conversations);
  const bestGain = bestConversation
    ? conversationEnergyGain(bestConversation)
    : undefined;
  const phase = computePhase(
    profile.workingIdentity.length > 0,
    directions.length,
    conversations.length
  );
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const untestedHighScore = directions
    .filter((d) => d.status === "active" || d.status === "explore")
    .filter((d) => directionAverage(d) !== undefined)
    .sort((a, b) => (directionAverage(b) ?? 0) - (directionAverage(a) ?? 0))
    .find((d) => !conversations.some((c) => c.relatedDirectionId === d.id));

  const nextStepTitle =
    conversations.length === 0
      ? "Log one conversation this week"
      : untestedHighScore
      ? `Book one conversation in ${untestedHighScore.name}`
      : "Review patterns and update the hypothesis";
  const nextStepBody =
    conversations.length === 0
      ? "Why: no evidence yet. The app is patient until then."
      : untestedHighScore
      ? `Why: this direction scores ${directionAverage(untestedHighScore)?.toFixed(
          1
        )} but has 0 conversations logged.`
      : "Why: every active direction has at least one data point.";

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
              {hypothesis?.statement ?? profile.currentHypothesis}
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Btn variant="primary">Review evidence {"->"}</Btn>
              <Btn>Update hypothesis</Btn>
              {hypothesis && (
                <span
                  style={{
                    marginLeft: 8,
                    fontFamily: "var(--gh-mono)",
                    fontSize: 11,
                    color: "var(--gh-faint)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Confidence{" "}
                  {typeof hypothesis.confidence === "number"
                    ? hypothesis.confidence
                    : "-"}/10
                </span>
              )}
            </div>
          </div>

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
                {phase.label}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12.5,
                  color: "var(--gh-muted)",
                  lineHeight: 1.5,
                }}
              >
                {phase.sub}
              </div>
            </div>
            <div style={{ flex: 1, marginTop: 8 }}>
              <MistLandscape steps={phase.steps} activeIndex={phase.activeIndex} />
            </div>
          </div>
        </Card>
      </section>

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
          {strongest ? (
            <Tile
              tone="rust"
              eyebrow="Strongest direction · pursue"
              badge={
                strongestAvg !== undefined && (
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
                    {strongestAvg.toFixed(1)}
                  </span>
                )
              }
              title={strongest.name}
              body={strongest.description || strongest.hypothesis}
              footer={
                <>
                  <span>{topScoreLabel(strongest)}</span>
                  <span style={{ opacity: 0.7 }}>{"->"}</span>
                </>
              }
            />
          ) : (
            <Tile
              tone="mist"
              eyebrow="Strongest direction · empty"
              title="No directions scored yet"
              body="Score at least one direction on Directions to see it surface here."
            />
          )}

          {bestConversation ? (
            <Tile
              tone="slate"
              eyebrow="Best conversation · reflect"
              badge={
                typeof bestGain === "number" && (
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
                    {bestGain >= 0 ? `+${bestGain}` : bestGain}
                  </span>
                )
              }
              meta={`${bestConversation.organization} · ${bestConversation.role}`}
              title={
                bestConversation.keyInsight ||
                bestConversation.notes ||
                "No insight recorded yet"
              }
              italic={!!bestConversation.keyInsight}
              footer={
                <>
                  <span>
                    {bestConversation.followUpAction || "No follow-up yet"}
                  </span>
                  <span style={{ opacity: 0.7 }}>{"->"}</span>
                </>
              }
            />
          ) : (
            <Tile
              tone="mist"
              eyebrow="Best conversation · empty"
              title="No conversations logged yet"
              body="Conversations are experiments. Log them within 24 hours so memory does not edit the data."
            />
          )}

          <Tile
            tone="mist"
            eyebrow="Next step · observe"
            badge={
              <Chip tone="neutral">
                {opportunities.length === 0 ? "Suggested" : "From data"}
              </Chip>
            }
            title={nextStepTitle}
            body={nextStepBody}
            footer={
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm variant="dark">
                  Mark complete
                </Btn>
                <Btn sm>Edit suggestion</Btn>
              </div>
            }
          />
        </div>
      </section>

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
              value={String(stats.conversations30d)}
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
              value={`${stats.activeDirections}/${stats.totalDirections}`}
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
              value={
                typeof stats.avgEnergyGain === "number"
                  ? `${stats.avgEnergyGain >= 0 ? "+" : ""}${stats.avgEnergyGain}`
                  : "-"
              }
              emphasis={typeof stats.avgEnergyGain === "number"}
            />
          </div>
          <div
            style={{
              borderLeft: "1px solid var(--gh-line-soft)",
              padding: "0 24px",
            }}
          >
            <Stat
              label="Strongest fit"
              value={
                typeof stats.strongestFit === "number"
                  ? stats.strongestFit.toFixed(1)
                  : "-"
              }
            />
          </div>
        </Card>
      </section>

      {untestedHighScore && (
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
                "{untestedHighScore.name} scores{" "}
                {directionAverage(untestedHighScore)?.toFixed(1)} on hypothesis
                but has no conversations yet. The score is wishful until
                evidence arrives."
              </div>
            </div>
            <button
              type="button"
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
      )}
    </Page>
  );
}
