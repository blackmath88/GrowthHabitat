// OpportunityFit.jsx
function OpportunityFit({ data }) {
  const [selected, setSelected] = useState(data.opportunities[0].id);
  const opp = data.opportunities.find(o => o.id === selected);
  const arenaName = (id) => data.arenas.find(a => a.id === id)?.name || "—";
  const fitScore = (o) => {
    const s = o.scores;
    return (s.problem + s.smart + s.learning + s.autonomy + s.impact + s.fit + s.comp + s.future) / 8;
  };
  const decisionTone = { pursue: "positive", explore: "caution", park: "neutral", avoid: "warn" };

  return (
    <Page crumbs={["Discovery", "04 Opportunity Fit"]} actions={<Btn variant="primary" sm icon={<Icon name="plus" size={14}/>}>Add opportunity</Btn>}>
      <PageHead
        eyebrow="04 · Opportunity Fit"
        title="Is this role, company, or project worth pursuing?"
        subtitle="Eight dimensions, scored honestly. The number is a prompt for the decision — not the decision itself."
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 380px) 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.opportunities.map(o => (
            <div key={o.id} onClick={() => setSelected(o.id)} style={{
              padding: "16px 18px",
              background: selected === o.id ? "var(--gh-surface)" : "var(--gh-surface)",
              border: "1px solid " + (selected === o.id ? "var(--gh-moss-line)" : "var(--gh-line)"),
              borderLeft: "2px solid " + (selected === o.id ? "var(--gh-moss)" : "var(--gh-line)"),
              borderRadius: 8, cursor: "pointer",
              boxShadow: selected === o.id ? "0 1px 0 rgba(26,24,20,0.04)" : "none",
              transition: "all 200ms var(--gh-ease)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div className="gh-eyebrow">{arenaName(o.arena)}</div>
                  <div style={{ marginTop: 6, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500", fontSize: 16, color: "var(--gh-ink)", letterSpacing: "-0.01em" }}>{o.role}</div>
                  <div style={{ marginTop: 2, fontSize: 12.5, color: "var(--gh-muted)" }}>{o.company}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 26, color: "var(--gh-ink)", letterSpacing: "-0.02em", lineHeight: 1 }}>{fitScore(o).toFixed(1)}</div>
                  <div className="gh-eyebrow" style={{ marginTop: 4 }}>fit</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <Chip tone={decisionTone[o.decision]}>{o.decision}</Chip>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 10.5, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
              <div>
                <Eyebrow>{arenaName(opp.arena)} · {opp.status}</Eyebrow>
                <h2 style={{ marginTop: 8 }}>{opp.role}</h2>
                <div style={{ marginTop: 6, color: "var(--gh-muted)", fontSize: 14 }}>{opp.company}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", fontSize: 56, color: "var(--gh-ink)", letterSpacing: "-0.02em", lineHeight: 1 }}>{fitScore(opp).toFixed(1)}</div>
                <div className="gh-eyebrow" style={{ marginTop: 6 }}>composite fit</div>
              </div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--gh-line-soft)", display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn variant={opp.decision === "pursue" ? "primary" : "secondary"} sm icon={<Icon name="arrowUpRight" size={14}/>}>Pursue</Btn>
              <Btn sm icon={<Icon name="search" size={14}/>}>Explore</Btn>
              <Btn sm icon={<Icon name="pause" size={14}/>}>Park</Btn>
              <Btn sm icon={<Icon name="x" size={14}/>}>Avoid</Btn>
            </div>
          </Card>

          <Module eyebrow="Eight dimensions" title="Honest scores" action={<Btn sm>Edit</Btn>}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["Interesting problem", opp.scores.problem],
                ["Smart people", opp.scores.smart],
                ["Learning speed", opp.scores.learning],
                ["Autonomy", opp.scores.autonomy],
                ["Impact visibility", opp.scores.impact],
                ["Strengths fit", opp.scores.fit],
                ["Compensation", opp.scores.comp],
                ["Future value", opp.scores.future],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr 60px", gap: 8, alignItems: "center" }}>
                  <div>
                    <div className="gh-eyebrow">{k}</div>
                    <div style={{ marginTop: 6 }}><ScoreRail value={v} showValue={false}/></div>
                  </div>
                  <span style={{ fontFamily: "var(--gh-mono)", fontSize: 14, color: "var(--gh-ink)", textAlign: "right", fontWeight: 500 }}>{v.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </Module>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Module eyebrow="Risks / unknowns" title="What might break this">
              <p style={{ color: "var(--gh-ink-soft)", fontSize: 14, lineHeight: 1.55 }}>{opp.risks}</p>
            </Module>
            <Module eyebrow="Notes" title="Context to remember">
              <p style={{ color: "var(--gh-ink-soft)", fontSize: 14, lineHeight: 1.55 }}>{opp.notes}</p>
            </Module>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Module eyebrow="Outreach draft" title="Opening line">
              <textarea defaultValue={`Hi ${opp.company.split(' ')[0]} team — I've been mapping where my M365 adoption work compounds with AI workforce enablement. Your ${opp.role} caught my eye for three reasons: …`} style={{
                width: "100%", minHeight: 110, border: "1px solid var(--gh-line)", borderRadius: 4,
                background: "var(--gh-canvas)", padding: "11px 12px", font: "inherit", color: "var(--gh-ink)",
                fontFamily: "var(--gh-sans)", fontSize: 13.5, resize: "vertical", outline: "none",
              }}/>
            </Module>
            <Module eyebrow="CV angle" title="What to lead with">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                <li style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, fontSize: 13.5, color: "var(--gh-ink-soft)" }}><span style={{ color: "var(--gh-moss)" }}>·</span><span>Lead with the M365 → AI translation work, not the change-mgmt label.</span></li>
                <li style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, fontSize: 13.5, color: "var(--gh-ink-soft)" }}><span style={{ color: "var(--gh-moss)" }}>·</span><span>One named case study with measurable adoption uplift.</span></li>
                <li style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, fontSize: 13.5, color: "var(--gh-ink-soft)" }}><span style={{ color: "var(--gh-moss)" }}>·</span><span>Quote Stefan or Marta — borrowed credibility.</span></li>
              </ul>
            </Module>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { OpportunityFit });
