import { Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { AppShell } from "./components/Shell";
import CommandCenter from "./pages/CommandCenter";
import DirectionsPage from "./pages/Directions";
import ProfilePage from "./pages/Profile";
import { StubPage } from "./pages/StubPage";
import { StoreProvider, useConversations, useProfile } from "./lib/store";

function ShellWithLiveData({ children }: { children: ReactNode }) {
  const { profile } = useProfile();
  const { conversations } = useConversations();

  const trimmed =
    profile.currentHypothesis.length > 60
      ? `${profile.currentHypothesis
          .slice(0, 60)
          .replace(/[\s,.;:]+\S*$/, "")}...`
      : profile.currentHypothesis;

  const initials = profile.name
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  return (
    <AppShell
      ownerName={profile.name}
      ownerInitials={initials}
      hypothesisShort={trimmed}
      hypothesisMeta={`v1 · ${conversations.length} talks`}
    >
      {children}
    </AppShell>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ShellWithLiveData>
        <Routes>
          <Route path="/" element={<CommandCenter />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route
            path="/conversations"
            element={
              <StubPage
                num="03"
                title="Talks"
                subtitle="Use real conversations to test where your value is recognized."
              />
            }
          />
          <Route
            path="/opportunities"
            element={
              <StubPage
                num="04"
                title="Roles"
                subtitle="Decide whether a role, company, or project deserves attention."
              />
            }
          />
          <Route
            path="/patterns"
            element={
              <StubPage
                num="05"
                title="Patterns"
                subtitle="Review the evidence and decide what to test next."
              />
            }
          />
        </Routes>
      </ShellWithLiveData>
    </StoreProvider>
  );
}
