import {
  AutosaveInput,
  AutosaveList,
  AutosaveTextarea,
  Card,
  Eyebrow,
  SectionHeader,
} from "../components/Primitives";
import { Page } from "../components/Shell";
import { useProfile, useStore } from "../lib/store";

// ---------- Section card -------------------------------------------------

function ProfileSection({
  eyebrow,
  title,
  helper,
  children,
}: {
  eyebrow: string;
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <Card style={{ padding: 28, marginBottom: 16 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3
        style={{
          marginTop: 8,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          color: "var(--gh-ink)",
        }}
      >
        {title}
      </h3>
      {helper && (
        <p
          style={{
            marginTop: 6,
            fontSize: 13,
            color: "var(--gh-muted)",
            lineHeight: 1.55,
            maxWidth: 640,
          }}
        >
          {helper}
        </p>
      )}
      <div style={{ marginTop: 16 }}>{children}</div>
    </Card>
  );
}

// ---------- Page ---------------------------------------------------------

export default function ProfilePage() {
  const { profile, update } = useProfile();
  const { saving } = useStore();

  return (
    <Page
      crumbs={["Career discovery", "Profile"]}
      actions={
        <span
          style={{
            fontFamily: "var(--gh-mono)",
            fontSize: 11,
            color: saving ? "var(--gh-rust)" : "var(--gh-faint)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {saving ? "Saving…" : "Saved"}
        </span>
      }
    >
      <SectionHeader
        eyebrow="01 · Profile"
        title="Capture what you know about yourself before testing the market."
        subtitle="The Profile is the measurement reference. Every conversation, opportunity, and pattern in this app is judged against what you write here. Keep it honest, keep it specific, edit it freely."
      />

      <ProfileSection
        eyebrow="Identity"
        title="Working identity"
        helper="The sentence you'd say to a smart friend if they asked who you actually are professionally. One line."
      >
        <AutosaveInput
          value={profile.workingIdentity}
          onSave={(v) => update({ workingIdentity: v })}
          ariaLabel="Working identity"
          placeholder="e.g. AI Workforce Adoption Architect · Cross-Pollinator"
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Identity"
        title="Positioning statement"
        helper="What you do, for whom, and how. Written so a stranger could repeat it back."
      >
        <AutosaveTextarea
          rows={3}
          value={profile.positioningStatement}
          onSave={(v) => update({ positioningStatement: v })}
          ariaLabel="Positioning statement"
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Context"
        title="Current role & desired direction"
        helper="Where you are now and where you're heading. Both rough is fine."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Current role</Eyebrow>
            <AutosaveInput
              value={profile.currentRole}
              onSave={(v) => update({ currentRole: v })}
              ariaLabel="Current role"
            />
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Desired direction</Eyebrow>
            <AutosaveInput
              value={profile.desiredDirection}
              onSave={(v) => update({ desiredDirection: v })}
              ariaLabel="Desired direction"
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection
        eyebrow="What I bring"
        title="Strengths"
        helper="In your own words, not framework labels. What you'd say if a friend asked. The act of pruning is itself useful — keep what's load-bearing, drop what's polite."
      >
        <AutosaveList
          values={profile.strengths}
          onSave={(v) => update({ strengths: v })}
          placeholder="e.g. I see adoption problems before they become rollout problems."
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="What I bring"
        title="Working style"
        helper="How you actually work when you're in flow. One paragraph."
      >
        <AutosaveTextarea
          rows={3}
          value={profile.workingStyle}
          onSave={(v) => update({ workingStyle: v })}
          ariaLabel="Working style"
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Energy"
        title="What gives me energy"
        helper="Specific situations and conditions, not abstractions. These become tags on your conversations later — so write them concretely enough to recognize again."
      >
        <AutosaveList
          values={profile.energyGains}
          onSave={(v) => update({ energyGains: v })}
          placeholder="e.g. Smart people working on messy, meaningful problems."
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Energy"
        title="What drains my energy"
        helper="The repeating patterns that leave you flat. Honesty here is what makes the conversation log honest later."
      >
        <AutosaveList
          values={profile.energyDrains}
          onSave={(v) => update({ energyDrains: v })}
          placeholder="e.g. Long meetings without a clear question."
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Fit"
        title="Environments where I thrive"
        helper="The kinds of organizations, teams, or settings where you do your best work."
      >
        <AutosaveList
          values={profile.thriveEnvironments}
          onSave={(v) => update({ thriveEnvironments: v })}
          placeholder="e.g. Small teams with smart people, trust, and room to build."
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Fit"
        title="Environments to avoid"
        helper="What you've learned the hard way to stay clear of."
      >
        <AutosaveList
          values={profile.avoidEnvironments}
          onSave={(v) => update({ avoidEnvironments: v })}
          placeholder="e.g. Purely political environments where self-protection matters more than progress."
        />
      </ProfileSection>

      <ProfileSection
        eyebrow="Constraints"
        title="Non-negotiables"
        helper="Soft and hard constraints together. The honest list — what you'd refuse even if everything else aligned."
      >
        <AutosaveList
          values={profile.nonNegotiables}
          onSave={(v) => update({ nonNegotiables: v })}
          placeholder="e.g. I need a secure enough base — stable employment or a clearly sustainable setup."
        />
      </ProfileSection>
    </Page>
  );
}
