/* ==========================================================================
   Growth Habitat — Conversation Editor Page
   Wraps the multi-step ConversationForm in a Page shell. Edits a single
   conversation by ID from the route param.
   ========================================================================== */

import { useNavigate, useParams } from "react-router-dom";
import { ConversationForm } from "../components/ConversationForm";
import { Btn, Card, SectionHeader } from "../components/Primitives";
import { Page } from "../components/Shell";
import { useConversations, useStore } from "../lib/store";

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { conversations } = useConversations();
  const { saving } = useStore();

  const conv = conversations.find((c) => c.id === id);

  if (!conv) {
    return (
      <Page crumbs={["Career discovery", "Talks", "Not found"]}>
        <SectionHeader
          eyebrow="Talks"
          title="Conversation not found"
          subtitle="It may have been deleted, or the link may be stale."
        />
        <Card>
          <Btn onClick={() => navigate("/conversations")}>
            ← Back to all talks
          </Btn>
        </Card>
      </Page>
    );
  }

  const personLabel = conv.person || "Untitled conversation";
  const dateLabel = new Date(conv.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Page
      crumbs={["Career discovery", "Talks", personLabel]}
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
        eyebrow={`Talk · ${dateLabel}`}
        title={personLabel}
        subtitle={
          [conv.organization, conv.role].filter(Boolean).join(" · ") ||
          "Add the basic context in step 1 — everything else autosaves as you go."
        }
        action={
          <Btn sm onClick={() => navigate("/conversations")}>
            ← All talks
          </Btn>
        }
      />

      <Card style={{ padding: 32 }}>
        <ConversationForm
          conversationId={conv.id}
          onDone={() => navigate("/conversations")}
        />
      </Card>
    </Page>
  );
}
