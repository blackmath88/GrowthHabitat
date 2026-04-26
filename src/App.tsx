import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/Shell";
import CommandCenter from "./pages/CommandCenter";
import { StubPage } from "./pages/StubPage";

const HYPOTHESIS_SHORT =
  "AI workforce adoption inside governance-aware orgs.";
const HYPOTHESIS_META = "v1 · 5 talks";

export default function App() {
  return (
    <AppShell
      ownerName="Achim Imboden"
      ownerInitials="AI"
      hypothesisShort={HYPOTHESIS_SHORT}
      hypothesisMeta={HYPOTHESIS_META}
    >
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route
          path="/profile"
          element={
            <StubPage
              num="01"
              title="Profile"
              subtitle="Capture what you know about yourself before testing the market."
            />
          }
        />
        <Route
          path="/directions"
          element={
            <StubPage
              num="02"
              title="Directions"
              subtitle="Compare possible career paths before committing to one."
            />
          }
        />
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
    </AppShell>
  );
}
