// PatternsDirection.jsx
function PatternsDirection({ data }) {
  const topArenas = [...data.arenas].sort((a,b) => avgScore(b)-avgScore(a)).slice(0,3);
  const topConvs = [...data.conversations].sort((a,b) => (b.energyAfter-b.energyBefore)-(a.energyAfter-a.energyBefore)).slice(0,3);
  const topOpps = [...data.opportunities].sort((a,b) => {
    const s = (o) => Object.values(o.scores).reduce((x,y)=>x+y,0)/8;
    return s(b)-s(a);
  }).slice(0,3);

  return (
    <Page crumbs={["Discovery", "05 Patterns & Direction"]} actions={<Btn variant="primary" sm icon={<Icon name="download" size={14}/>}>Export career brief</Btn>}>
      <PageHead
        eyebrow="05 · Patterns & Direction"
        title="What does the evidence say?"
        subtitle="The product helps you see patterns over time, not make one big career decision too early. Read what's repeating. Set the next experiment."
      />

      <Card style={{ padding: 36, marginBottom: 32, background: "var(--gh-surface)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px", gap: 32, alignItems: "center" }}>
          <div>
            <Eyebrow>Working hypothesis · v3 · 12 signals</Eyebrow>
            <p style={{ marginTop: 14, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 32, lineHeight: 1.25, color: "var(--gh-ink)", letterSpacing: "-0.02em", textWrap: "pretty" }}>
              "{data.user.hypothesis}"
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 14, background: "var(--gh-positive-soft)", border: "1px solid var(--gh-positive-line)", borderRadius: 6 }}>
              <div className="gh-eyebrow" style={{ color: "var(--gh-positive)" }}>Evidence for</div>
              <div style={{ marginTop: 6, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 28, color: "var(--gh-positive)", letterSpacing: "-0.02em", lineHeight: 1 }}>{data.patterns.evidenceFor.length}</div>
            </div>
            <div style={{ padding: 14, background: "var(--gh-warn-soft)", border: "1px solid var(--gh-warn-line)", borderRadius: 6 }}>
              <div className="gh-eyebrow" style={{ color: "var(--gh-warn)" }}>Evidence against</div>
              <div style={{ marginTop: 6, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 28, color: "var(--gh-warn)", letterSpacing: "-0.02em", lineHeight: 1 }}>{data.patterns.evidenceAgainst.length}</div>
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Module eyebrow="Evidence for" title="What's pulling toward the hypothesis" action={<span style={{color:"var(--gh-positive)"}}><Icon name="trendUp" size={16}/></span>}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {data.patterns.evidenceFor.map((e, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, fontSize: 14, color: "var(--gh-ink-soft)", lineHeight: 1.5 }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-positive)", paddingTop: 2 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Module>
        <Module eyebrow="Evidence against" title="What's pulling away" action={<span style={{color:"var(--gh-warn)"}}><Icon name="trendDown" size={16}/></span>}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {data.patterns.evidenceAgainst.map((e, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, fontSize: 14, color: "var(--gh-ink-soft)", lineHeight: 1.5 }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-warn)", paddingTop: 2 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Module>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 24 }}>
        <Module eyebrow="Top arenas" title="By composite score">
          {topArenas.map((a, i) => (
            <div key={a.id} style={{ padding: i ? "10px 0" : "0 0 10px", borderBottom: i < 2 ? "1px solid var(--gh-line-soft)" : "none", display: "grid", gridTemplateColumns: "20px 1fr 40px", gap: 10, alignItems: "center" }}>
              <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)" }}>{i+1}</span>
              <span style={{ fontSize: 13, color: "var(--gh-ink)" }}>{a.name}</span>
              <span style={{ fontFamily: "var(--gh-mono)", fontSize: 13, color: "var(--gh-ink)", textAlign: "right", fontWeight: 500 }}>{avgScore(a).toFixed(1)}</span>
            </div>
          ))}
        </Module>
        <Module eyebrow="Top conversations" title="By energy gain">
          {topConvs.map((c, i) => (
            <div key={c.id} style={{ padding: i ? "10px 0" : "0 0 10px", borderBottom: i < 2 ? "1px solid var(--gh-line-soft)" : "none", display: "grid", gridTemplateColumns: "20px 1fr 40px", gap: 10, alignItems: "center" }}>
              <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)" }}>{i+1}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: "var(--gh-ink)" }}>{c.person}</div>
                <div style={{ fontSize: 11.5, color: "var(--gh-muted)" }}>{c.org}</div>
              </div>
              <span style={{ fontFamily: "var(--gh-mono)", fontSize: 13, color: "var(--gh-positive)", textAlign: "right", fontWeight: 500 }}>+{c.energyAfter-c.energyBefore}</span>
            </div>
          ))}
        </Module>
        <Module eyebrow="Top opportunities" title="By fit score">
          {topOpps.map((o, i) => {
            const s = Object.values(o.scores).reduce((x,y)=>x+y,0)/8;
            return (
              <div key={o.id} style={{ padding: i ? "10px 0" : "0 0 10px", borderBottom: i < 2 ? "1px solid var(--gh-line-soft)" : "none", display: "grid", gridTemplateColumns: "20px 1fr 40px", gap: 10, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)" }}>{i+1}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "var(--gh-ink)" }}>{o.role}</div>
                  <div style={{ fontSize: 11.5, color: "var(--gh-muted)" }}>{o.company}</div>
                </div>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 13, color: "var(--gh-ink)", textAlign: "right", fontWeight: 500 }}>{s.toFixed(1)}</span>
              </div>
            );
          })}
        </Module>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Module eyebrow="Repeated signals" title="What keeps coming up">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.patterns.repeated.map((s, i) => (
              <div key={i} style={{ padding: "10px 14px", background: "var(--gh-canvas)", borderLeft: "2px solid var(--gh-moss)", borderRadius: "0 4px 4px 0", fontSize: 14, color: "var(--gh-ink-soft)", lineHeight: 1.5 }}>{s}</div>
            ))}
          </div>
        </Module>
        <Module eyebrow="Repeated keywords" title="The words you keep hearing">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.patterns.keywords.map((k, i) => (
              <span key={i} style={{
                padding: "6px 12px", border: "1px solid var(--gh-moss-line)", background: "var(--gh-moss-soft)",
                color: "var(--gh-moss)", borderRadius: 999, fontFamily: "var(--gh-mono)", fontSize: 11.5, letterSpacing: "0.04em",
              }}>{k}</span>
            ))}
          </div>
        </Module>
      </div>

      <Module eyebrow="7-day action plan" title="The next experiments" action={<Btn sm icon={<Icon name="plus" size={14}/>}>Add</Btn>}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
          {data.experiments.concat([
            { id: "x4", title: "Marta follow-up: share Roche prep doc", due: "May 18" },
            { id: "x5", title: "Buffett-test the 3 active arena hypotheses out loud", due: "May 20" },
          ]).map((x, i, arr) => (
            <li key={x.id} style={{
              display: "grid", gridTemplateColumns: "32px 1fr 100px 32px", gap: 12, alignItems: "center",
              padding: "14px 0", borderBottom: i < arr.length-1 ? "1px solid var(--gh-line-soft)" : "none",
            }}>
              <span style={{ width: 22, height: 22, border: "1.5px solid var(--gh-line)", borderRadius: 4, display: "grid", placeItems: "center", color: "var(--gh-faint)" }}>
                {i === 0 && <Icon name="check" size={12}/>}
              </span>
              <span style={{ fontSize: 14, color: "var(--gh-ink)" }}>{x.title}</span>
              <span style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{x.due}</span>
              <Icon name="arrowRight" size={16}/>
            </li>
          ))}
        </ol>
      </Module>
    </Page>
  );
}

Object.assign(window, { PatternsDirection });
