// SignalProfile.jsx
function SignalProfile({ data }) {
  const u = data.user;
  return (
    <Page crumbs={["Discovery", "01 Signal Profile"]}>
      <PageHead
        eyebrow="01 · Signal Profile"
        title="Who you are at your best."
        subtitle="Map your strengths, your energy in and out, the environments that sharpen you, and the working positioning statement that follows."
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 24, marginBottom: 24 }}>
        <Card style={{ padding: 32 }}>
          <Eyebrow>Working positioning statement</Eyebrow>
          <p style={{ marginTop: 14, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 28, lineHeight: 1.32, color: "var(--gh-ink)", letterSpacing: "-0.015em", textWrap: "pretty" }}>
            {u.positioning}
          </p>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--gh-line-soft)", display: "flex", gap: 24, fontSize: 13, color: "var(--gh-muted)" }}>
            <span><b style={{ color: "var(--gh-ink)", fontWeight: 500 }}>Current:</b> {u.currentRole}</span>
            <span style={{ color: "var(--gh-line)" }}>·</span>
            <span><b style={{ color: "var(--gh-ink)", fontWeight: 500 }}>Desired:</b> {u.desired}</span>
            <span style={{ color: "var(--gh-line)" }}>·</span>
            <span><b style={{ color: "var(--gh-ink)", fontWeight: 500 }}>Identity:</b> {u.workingIdentity}</span>
          </div>
        </Card>

        <Module eyebrow="Top strengths" title="From CliftonStrengths · ordered" action={<Btn sm>Reorder</Btn>}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {u.strengths.map((s, i) => (
              <li key={s} style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 10, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)" }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontSize: 13.5, color: "var(--gh-ink)", fontWeight: i < 4 ? 500 : 400 }}>{s}</span>
                {i < 4 && <Chip tone="positive" size="sm">Top</Chip>}
              </li>
            ))}
          </ol>
        </Module>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Module eyebrow="What gives you energy" title="Energy in" action={<span style={{color:"var(--gh-positive)"}}><Icon name="trendUp" size={16}/></span>}>
          <ul style={listStyle}>
            {u.energizes.map((s, i) => <li key={i} style={liStyle("var(--gh-positive)")}>{s}</li>)}
          </ul>
        </Module>
        <Module eyebrow="What drains you" title="Energy out" action={<span style={{color:"var(--gh-warn)"}}><Icon name="trendDown" size={16}/></span>}>
          <ul style={listStyle}>
            {u.drains.map((s, i) => <li key={i} style={liStyle("var(--gh-warn)")}>{s}</li>)}
          </ul>
        </Module>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Module eyebrow="Environments that sharpen you" title="Where you thrive">
          <ul style={listStyle}>{u.thrives.map((s,i) => <li key={i} style={liStyle("var(--gh-moss)")}>{s}</li>)}</ul>
        </Module>
        <Module eyebrow="Environments to avoid" title="Where you blunt">
          <ul style={listStyle}>{u.avoid.map((s,i) => <li key={i} style={liStyle("var(--gh-warn)")}>{s}</li>)}</ul>
        </Module>
      </div>

      <Module eyebrow="Non-negotiables" title="What must hold for any role to compound" action={<Btn sm icon={<Icon name="plus" size={14}/>}>Add</Btn>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {u.nonNegotiables.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: "var(--gh-canvas)", border: "1px solid var(--gh-line-soft)", borderRadius: 4 }}>
              <span style={{ color: "var(--gh-moss)", marginTop: 2 }}><Icon name="check" size={14}/></span>
              <span style={{ fontSize: 13.5, color: "var(--gh-ink-soft)" }}>{s}</span>
            </div>
          ))}
        </div>
      </Module>
    </Page>
  );
}

const listStyle = { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 };
const liStyle = (color) => ({
  display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, alignItems: "baseline",
  fontSize: 14, color: "var(--gh-ink-soft)", lineHeight: 1.5,
  paddingLeft: 0,
  position: "relative",
});

Object.assign(window, { SignalProfile });
