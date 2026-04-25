// ArenaExplorer.jsx
function ArenaExplorer({ data }) {
  const [sortKey, setSortKey] = useState("avg");
  const arenas = [...data.arenas].sort((a,b) => {
    if (sortKey === "avg") return avgScore(b) - avgScore(a);
    return (b.scores[sortKey] || 0) - (a.scores[sortKey] || 0);
  });

  const dims = [
    { k: "fascination", label: "Fascination" },
    { k: "market", label: "Market demand" },
    { k: "fit", label: "Strength fit" },
    { k: "learning", label: "Learning speed" },
    { k: "access", label: "Access" },
    { k: "comp", label: "Comp upside" },
    { k: "credibility", label: "Credibility today" },
  ];
  const statusTone = { active: "positive", explore: "caution", parked: "neutral", avoid: "warn" };

  return (
    <Page crumbs={["Discovery", "02 Arena Explorer"]} actions={<Btn sm icon={<Icon name="plus" size={14}/>}>Add arena</Btn>}>
      <PageHead
        eyebrow="02 · Arena Explorer"
        title="Where might your abilities compound fastest?"
        subtitle="Each arena is a falsifiable hypothesis. Score across seven dimensions, then compare. Pursue what's repeatedly strong; park what isn't."
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span className="gh-eyebrow">Sort by</span>
        {[{k:"avg",l:"Composite"}, ...dims.map(d=>({k:d.k,l:d.label}))].map(d => (
          <button key={d.k} onClick={() => setSortKey(d.k)} style={{
            border: "1px solid " + (sortKey === d.k ? "var(--gh-moss)" : "var(--gh-line)"),
            background: sortKey === d.k ? "var(--gh-moss-soft)" : "var(--gh-surface)",
            color: sortKey === d.k ? "var(--gh-moss)" : "var(--gh-muted)",
            padding: "5px 10px", borderRadius: 999, fontFamily: "var(--gh-mono)", fontSize: 10.5,
            letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
          }}>{d.l}</button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2.4fr) repeat(7, 1fr) 110px", padding: "12px 22px", borderBottom: "1px solid var(--gh-line)", background: "var(--gh-canvas)", gap: 8 }}>
          <span className="gh-eyebrow">Arena</span>
          {dims.map(d => <span key={d.k} className="gh-eyebrow" style={{ textAlign: "center" }}>{d.label}</span>)}
          <span className="gh-eyebrow" style={{ textAlign: "right" }}>Status</span>
        </div>
        {arenas.map((a, i) => (
          <div key={a.id} style={{
            display: "grid", gridTemplateColumns: "minmax(0, 2.4fr) repeat(7, 1fr) 110px",
            gap: 8, padding: "18px 22px", alignItems: "center",
            borderBottom: i < arenas.length - 1 ? "1px solid var(--gh-line-soft)" : "none",
            transition: "background 200ms var(--gh-ease)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--gh-surface-2)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500", fontSize: 16, color: "var(--gh-ink)", letterSpacing: "-0.01em" }}>{a.name}</div>
              <div style={{ marginTop: 4, fontSize: 12.5, color: "var(--gh-muted)", lineHeight: 1.45, textWrap: "pretty" }}>{a.desc}</div>
              <div style={{ marginTop: 8, fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Composite {avgScore(a).toFixed(1)}</div>
            </div>
            {dims.map(d => <ScoreCell key={d.k} v={a.scores[d.k]} highlighted={sortKey === d.k}/>)}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Chip tone={statusTone[a.status]}>{a.status}</Chip>
            </div>
          </div>
        ))}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
        <Module eyebrow="Strongest arenas right now" title="Top by composite score">
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {arenas.slice(0,3).map((a, i) => (
              <li key={a.id} style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px", gap: 12, alignItems: "center", paddingBottom: 12, borderBottom: i < 2 ? "1px solid var(--gh-line-soft)" : "none" }}>
                <span style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 26, color: "var(--gh-moss)", lineHeight: 1, letterSpacing: "-0.02em" }}>{i+1}</span>
                <div>
                  <div style={{ fontSize: 14, color: "var(--gh-ink)", fontWeight: 500 }}>{a.name}</div>
                  <div style={{ marginTop: 2, fontSize: 12, color: "var(--gh-muted)" }}>{a.hyp}</div>
                </div>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 14, color: "var(--gh-ink)", textAlign: "right", fontWeight: 500 }}>{avgScore(a).toFixed(1)}</span>
              </li>
            ))}
          </ol>
        </Module>
        <Module eyebrow="Compare two arenas" title="AI Adoption Consulting vs. Microsoft Partner">
          {dims.map(d => {
            const a = arenas.find(x => x.id === "ai-consulting").scores[d.k];
            const b = arenas.find(x => x.id === "ms-partner").scores[d.k];
            return (
              <div key={d.k} style={{ display: "grid", gridTemplateColumns: "120px 30px 1fr 30px", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 10.5, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.label}</span>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 12, color: a >= b ? "var(--gh-ink)" : "var(--gh-muted)", textAlign: "right", fontWeight: a >= b ? 500 : 400 }}>{a.toFixed(1)}</span>
                <div style={{ display: "flex", height: 6 }}>
                  <div style={{ flex: a, background: "var(--gh-moss)", borderRadius: "1px 0 0 1px" }}/>
                  <div style={{ flex: b, background: "var(--gh-caution)", borderRadius: "0 1px 1px 0" }}/>
                </div>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 12, color: b > a ? "var(--gh-ink)" : "var(--gh-muted)", fontWeight: b > a ? 500 : 400 }}>{b.toFixed(1)}</span>
              </div>
            );
          })}
        </Module>
      </div>
    </Page>
  );
}

function ScoreCell({ v, highlighted }) {
  const tone = v >= 8 ? "var(--gh-moss)" : v >= 6 ? "var(--gh-caution)" : "var(--gh-warn)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={{ fontFamily: "var(--gh-mono)", fontSize: 13, color: highlighted ? tone : "var(--gh-ink)", fontWeight: highlighted ? 500 : 400 }}>{v.toFixed(1)}</span>
      <div style={{ width: 32, height: 4, background: "var(--gh-line)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ width: `${v*10}%`, height: "100%", background: tone }}/>
      </div>
    </div>
  );
}

Object.assign(window, { ArenaExplorer });
