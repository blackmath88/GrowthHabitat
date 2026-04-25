// PeopleConversations.jsx
function PeopleConversations({ data }) {
  const [selected, setSelected] = useState(data.conversations[0].id);
  const conv = data.conversations.find(c => c.id === selected);
  const arenaName = (id) => data.arenas.find(a => a.id === id)?.name || "—";

  return (
    <Page crumbs={["Discovery", "03 People & Conversations"]} actions={<Btn variant="primary" sm icon={<Icon name="plus" size={14}/>}>Add conversation</Btn>}>
      <PageHead
        eyebrow="03 · People & Conversations"
        title="A career intelligence map. Not a contact list."
        subtitle="Each conversation is a signal: energy in, energy out, admiration, learning. The pattern across people is louder than any single one."
      />

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, marginBottom: 24 }}>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--gh-line-soft)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Eyebrow>{data.conversations.length} conversations</Eyebrow>
            <Btn sm variant="ghost" icon={<Icon name="filter" size={13}/>}>Filter</Btn>
          </div>
          {data.conversations.map((c, i) => (
            <div key={c.id} onClick={() => setSelected(c.id)}
              style={{
                padding: "14px 18px",
                borderBottom: i < data.conversations.length-1 ? "1px solid var(--gh-line-soft)" : "none",
                borderLeft: selected === c.id ? "2px solid var(--gh-moss)" : "2px solid transparent",
                background: selected === c.id ? "var(--gh-canvas)" : "transparent",
                cursor: "pointer", display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, alignItems: "center",
                transition: "all 200ms var(--gh-ease)",
              }}>
              <Avatar name={c.person} size={32}/>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, color: "var(--gh-ink)", fontWeight: 500 }}>{c.person}</div>
                <div style={{ fontSize: 12, color: "var(--gh-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.org}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--gh-mono)", fontSize: 11, color: c.energyAfter > c.energyBefore ? "var(--gh-positive)" : "var(--gh-warn)", fontWeight: 500 }}>
                  {c.energyAfter > c.energyBefore ? "+" : ""}{c.energyAfter - c.energyBefore}
                </div>
                <div style={{ fontFamily: "var(--gh-mono)", fontSize: 10, color: "var(--gh-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.date}</div>
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card style={{ padding: 28 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Avatar name={conv.person} size={48}/>
                <div>
                  <Eyebrow>{arenaName(conv.arena)} · {conv.date}</Eyebrow>
                  <h3 style={{ marginTop: 6, fontSize: 24 }}>{conv.person}</h3>
                  <div style={{ marginTop: 4, color: "var(--gh-muted)", fontSize: 13 }}>{conv.role} · {conv.org}</div>
                </div>
              </div>
              <Chip tone={conv.integrity ? "positive" : "warn"}>
                <Icon name={conv.integrity ? "check" : "x"} size={11}/>
                {conv.integrity ? "Integrity ✓" : "Integrity ✗"}
              </Chip>
            </div>
            <blockquote style={{ margin: "20px 0 0", padding: "16px 20px", borderLeft: "2px solid var(--gh-moss)", background: "var(--gh-canvas)" }}>
              <p style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'wght' 380", fontStyle: "italic", fontSize: 19, lineHeight: 1.4, color: "var(--gh-ink)", textWrap: "pretty" }}>"{conv.quote}"</p>
            </blockquote>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--gh-muted)" }}>
              <b style={{ color: "var(--gh-ink)", fontWeight: 500 }}>Follow-up:</b> {conv.followUp}
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Module eyebrow="Energy delta" title={`${conv.energyBefore} → ${conv.energyAfter}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
                <div style={{ flex: 1 }}>
                  <div className="gh-eyebrow">Before</div>
                  <ScoreRail value={conv.energyBefore} max={10}/>
                </div>
                <Icon name="arrowRight" size={18}/>
                <div style={{ flex: 1 }}>
                  <div className="gh-eyebrow">After</div>
                  <ScoreRail value={conv.energyAfter} max={10}/>
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--gh-canvas)", borderRadius: 4, fontSize: 12.5, color: "var(--gh-muted)" }}>
                {conv.energyAfter > conv.energyBefore ? "You left more alive than you arrived. That's a signal." : "You left flatter than you arrived. Note the cause."}
              </div>
            </Module>
            <Module eyebrow="Signal scores" title="Career intelligence">
              {[["Admiration", conv.admiration], ["Learning", conv.learning], ["Recognition", conv.recognition], ["Autonomy", conv.autonomy], ["Market pull", conv.marketPull]].map(([k,v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <span className="gh-eyebrow">{k}</span>
                  <ScoreRail value={v}/>
                </div>
              ))}
            </Module>
          </div>

          <Module eyebrow="Buffett 10% Test" title="Would you bet on this person's future?" action={<Btn sm>Save reflection</Btn>}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                "Would I admire this person's trajectory?",
                "Would I want to learn from them?",
                "Would I bet on their future?",
                "Would this environment sharpen me?",
                "Do they show integrity?",
                "Do I feel more alive after talking to them?",
              ].map((q, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center", padding: "10px 14px", border: "1px solid var(--gh-line-soft)", borderRadius: 4, background: "var(--gh-canvas)" }}>
                  <span style={{ fontSize: 13, color: "var(--gh-ink-soft)", lineHeight: 1.4 }}>{q}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["yes","?","no"].map((opt, j) => (
                      <button key={opt} style={{
                        width: 28, height: 22, borderRadius: 2,
                        border: "1px solid " + (j === 0 && i < 5 ? "var(--gh-moss)" : "var(--gh-line)"),
                        background: j === 0 && i < 5 ? "var(--gh-moss)" : "var(--gh-surface)",
                        color: j === 0 && i < 5 ? "var(--gh-canvas)" : "var(--gh-muted)",
                        fontFamily: "var(--gh-mono)", fontSize: 10, textTransform: "uppercase", cursor: "pointer",
                      }}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Module>
        </div>
      </div>

      <Module eyebrow="Conversation map" title="Energy / admiration vs. market relevance" action={<Btn sm>Group by arena</Btn>}>
        <PeopleMap data={data}/>
      </Module>
    </Page>
  );
}

function PeopleMap({ data }) {
  const arenaColor = { "ms-partner": "#3D5A3F", "ai-consulting": "#9C7A3C", "public-sector": "#5A6F8A", "corporate": "#3D5A3F", "boutique": "#A14A3A", "edu": "#5A6F8A" };
  return (
    <div style={{ position: "relative", height: 360, background: "var(--gh-canvas)", border: "1px solid var(--gh-line-soft)", borderRadius: 4 }}>
      {/* axes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "var(--gh-line)" }}/>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--gh-line)" }}/>
      {/* axis labels */}
      <div className="gh-eyebrow" style={{ position: "absolute", left: 16, top: 14, color: "var(--gh-faint)" }}>↑ Energy / admiration / learning pull</div>
      <div className="gh-eyebrow" style={{ position: "absolute", right: 16, bottom: 14, color: "var(--gh-faint)" }}>Market relevance / access →</div>
      {data.conversations.map((c, i) => {
        const x = (c.marketPull / 10) * 92 + 4;
        const y = 94 - ((c.admiration + c.learning + (c.energyAfter - c.energyBefore)) / 3 / 10) * 88;
        const size = 24 + c.marketPull * 2;
        return (
          <div key={c.id} title={`${c.person} · ${c.org}`} style={{
            position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)",
            width: size, height: size, borderRadius: 999,
            background: (arenaColor[c.arena] || "#3D5A3F") + "30",
            border: "1.5px solid " + (arenaColor[c.arena] || "#3D5A3F"),
            display: "grid", placeItems: "center",
            fontFamily: "var(--gh-mono)", fontSize: 9.5, color: arenaColor[c.arena] || "#3D5A3F",
            cursor: "pointer", letterSpacing: 0.5,
          }}>{c.person.split(" ").map(s=>s[0]).join("")}</div>
        );
      })}
    </div>
  );
}

Object.assign(window, { PeopleConversations });
