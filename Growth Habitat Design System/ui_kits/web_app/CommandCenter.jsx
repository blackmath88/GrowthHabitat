// CommandCenter.jsx
function CommandCenter({ data, onNav }) {
  const u = data.user;
  const topArena = [...data.arenas].sort((a,b) => avgScore(b)-avgScore(a))[0];
  const topConv = [...data.conversations].sort((a,b) => (b.energyAfter-b.energyBefore)-(a.energyAfter-a.energyBefore))[0];
  const next = data.experiments[0];

  return (
    <Page
      crumbs={["Career discovery lab", "Command Center"]}
      actions={<>
        <Btn icon={<Icon name="plus" size={14}/>} sm onClick={() => onNav("people")}>Add conversation</Btn>
        <Btn icon={<Icon name="plus" size={14}/>} sm onClick={() => onNav("fit")}>Add opportunity</Btn>
        <Btn variant="primary" icon={<Icon name="fileText" size={14}/>} sm onClick={() => onNav("patterns")}>Export brief</Btn>
      </>}
    >
      <PageHead
        eyebrow="Command Center · 25 April"
        title="Find the place where your abilities compound."
        subtitle="A career discovery lab for turning weak signals into direction. Six surfaces. Twelve weeks of evidence. One falsifiable hypothesis at a time."
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 24, marginBottom: 32 }}>
        <Card style={{ padding: 32 }}>
          <Eyebrow>Working hypothesis · v3</Eyebrow>
          <p style={{ marginTop: 16, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'wght' 380", fontStyle: "italic", fontSize: 26, lineHeight: 1.32, color: "var(--gh-ink)", textWrap: "pretty" }}>
            "{u.hypothesis}"
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--gh-line-soft)" }}>
            <Stat label="Conversations" value="12" sub="last 30d"/>
            <Stat label="Active arenas" value="4" sub="of 7 tracked"/>
            <Stat label="Strongest fit" value="9.0" sub="strength match"/>
            <Stat label="Energy gain" value="+2.4" sub="avg per talk"/>
          </div>
        </Card>

        <Card>
          <Eyebrow num="!">Warning signals</Eyebrow>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {data.patterns.warnings.map((w, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--gh-ink-soft)", lineHeight: 1.45 }}>
                <span style={{ color: "var(--gh-warn)", marginTop: 1 }}><Icon name="alert" size={14}/></span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
        <Module eyebrow="Strongest career arena" title={topArena.name} action={<Chip tone="positive">Pursue · {avgScore(topArena).toFixed(1)}</Chip>}>
          <p style={{ color: "var(--gh-muted)", fontSize: 13.5, lineHeight: 1.55 }}>{topArena.desc}</p>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--gh-line-soft)", display: "grid", gap: 8 }}>
            {[["Strength fit", topArena.scores.fit], ["Fascination", topArena.scores.fascination], ["Learning speed", topArena.scores.learning]].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 12, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--gh-mono)", fontSize: 10.5, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                <ScoreRail value={v}/>
              </div>
            ))}
          </div>
        </Module>

        <Module eyebrow="Most energizing recent conversation" title={topConv.person} action={<Chip tone="positive"><Icon name="trendUp" size={11}/> +{topConv.energyAfter - topConv.energyBefore}</Chip>}>
          <div className="gh-eyebrow" style={{ marginBottom: 8 }}>{topConv.org} · {topConv.role}</div>
          <p style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'wght' 380", fontStyle: "italic", fontSize: 17, lineHeight: 1.4, color: "var(--gh-ink)", textWrap: "pretty" }}>
            "{topConv.quote}"
          </p>
          <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--gh-muted)" }}>{topConv.followUp}</div>
        </Module>

        <Module eyebrow="Next best experiment" title={next.title} action={<Chip>Due {next.due}</Chip>}>
          <p style={{ color: "var(--gh-muted)", fontSize: 13.5, lineHeight: 1.55 }}>
            One concrete action this week. The smaller the experiment, the faster the signal.
          </p>
          <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
            <Btn variant="primary" sm icon={<Icon name="check" size={14}/>}>Mark complete</Btn>
            <Btn sm>Reschedule</Btn>
          </div>
        </Module>
      </div>

      <Module eyebrow="Discovery journey" title="Five modules · evidence over advice" action={<Btn sm icon={<Icon name="arrowRight" size={14}/>} onClick={() => onNav("patterns")}>See patterns</Btn>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
          {[
            { num: "01", id: "signal", title: "Signal Profile", sub: "Who you are at your best", count: "10 strengths" },
            { num: "02", id: "arena", title: "Arena Explorer", sub: "Where to compound", count: "4 active · 3 parked" },
            { num: "03", id: "people", title: "People & Conversations", sub: "Career intelligence map", count: "12 conversations" },
            { num: "04", id: "fit", title: "Opportunity Fit", sub: "What's worth pursuing", count: "5 opportunities" },
            { num: "05", id: "patterns", title: "Patterns & Direction", sub: "What the evidence says", count: "v3 hypothesis" },
          ].map((m, i) => (
            <div key={m.id}
              onClick={() => onNav(m.id)}
              style={{
                cursor: "pointer", padding: "16px 18px",
                borderRight: i < 4 ? "1px solid var(--gh-line-soft)" : "none",
                transition: "background 220ms var(--gh-ease)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--gh-canvas)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: "var(--gh-moss)", letterSpacing: "0.06em" }}>{m.num}</div>
              <div style={{ marginTop: 8, fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500", fontSize: 16, color: "var(--gh-ink)", letterSpacing: "-0.01em" }}>{m.title}</div>
              <div style={{ marginTop: 4, fontSize: 12.5, color: "var(--gh-muted)", lineHeight: 1.45 }}>{m.sub}</div>
              <div style={{ marginTop: 10, fontFamily: "var(--gh-mono)", fontSize: 10.5, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.count}</div>
            </div>
          ))}
        </div>
      </Module>
    </Page>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div style={{ flex: 1 }}>
      <div className="gh-eyebrow">{label}</div>
      <div style={{ marginTop: 8, fontFamily: "var(--gh-serif)", fontSize: 32, fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 420", color: "var(--gh-ink)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "var(--gh-muted)" }}>{sub}</div>
    </div>
  );
}

function avgScore(arena) {
  const s = arena.scores;
  return (s.fascination + s.market + s.fit + s.learning + s.access + s.comp + s.credibility) / 7;
}

Object.assign(window, { CommandCenter, avgScore });
