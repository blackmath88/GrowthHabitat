/* ==========================================================================
   Growth Habitat — Conversations Page
   List of logged conversations + entry point for adding new ones. Sorted
   most-recent-first. Card list, not table — each conversation is an
   artifact, not a row in a database.
   ========================================================================== */

import { useNavigate } from "react-router-dom";
import { ConversationCard } from "../components/ConversationCard";
import { Btn, Card, SectionHeader } from "../components/Primitives";
import { Page } from "../components/Shell";
import { useConversations } from "../lib/store";

export default function ConversationsPage() {
  const { conversations, add } = useConversations();
  const navigate = useNavigate();

  const handleAdd = () => {
    const created = add({
      person: "",
      organization: "",
      role: "",
      relatedDirectionId: undefined,
      date: new Date().toISOString().slice(0, 10),
      energyBefore: undefined,
      energyAfter: undefined,
      admirationScore: undefined,
      learningPotentialScore: undefined,
      recognitionScore: undefined,
      autonomyScore: undefined,
      marketPullScore: undefined,
      trustSignal: undefined,
      evidenceStrength: "medium",
      taggedEnergyGains: [],
      taggedEnergyDrains: [],
      workWithOnHardProblem: undefined,
      keyInsight: "",
      notes: "",
      followUpAction: "",
    });
    navigate(`/conversations/${created.id}`);
  };

  // Most recent first
  const sorted = [...conversations].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <Page
      crumbs={["Career discovery", "Talks"]}
      actions={
        <Btn sm variant="primary" onClick={handleAdd}>
          + Log conversation
        </Btn>
      }
    >
      <SectionHeader
        eyebrow="03 · Talks"
        title="Use real conversations to test where your value is recognized."
        subtitle="Each conversation is a small experiment. Log within 24 hours — memory edits the data."
      />

      {sorted.length === 0 ? (
        <Card style={{ padding: 48, textAlign: "center" }}>
          <p
            style={{
              fontSize: 16,
              color: "var(--gh-ink-soft)",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            Conversations are experiments.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--gh-muted)",
              maxWidth: 420,
              margin: "0 auto 24px",
              lineHeight: 1.55,
            }}
          >
            Log them within 24 hours — memory edits the data. Patterns appear
            after 5–10 conversations. Until then, this page is patient.
          </p>
          <Btn variant="primary" onClick={handleAdd}>
            Log your first conversation
          </Btn>
        </Card>
      ) : (
        <div>
          {sorted.map((conv) => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              onClick={() => navigate(`/conversations/${conv.id}`)}
            />
          ))}
        </div>
      )}
    </Page>
  );
}
