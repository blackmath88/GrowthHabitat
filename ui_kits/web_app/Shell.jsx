// Shell.jsx — sidebar + topbar + page wrapper
const NAV = [
  { id: "command", label: "Command Center", glyph: "◇", group: null },
  { id: "signal", label: "Signal Profile", num: "01" },
  { id: "arena", label: "Arena Explorer", num: "02" },
  { id: "people", label: "People & Conversations", num: "03" },
  { id: "fit", label: "Opportunity Fit", num: "04" },
  { id: "patterns", label: "Patterns & Direction", num: "05" },
];

function Sidebar({ current, onNav }) {
  return (
    <aside style={{
      position: "fixed", inset: "0 auto 0 0", width: 264,
      background: "var(--gh-canvas-deep)",
      borderRight: "1px solid var(--gh-line)",
      display: "flex", flexDirection: "column",
      zIndex: 30,
    }}>
      <div style={{ padding: "22px 22px 20px", borderBottom: "1px solid var(--gh-line-soft)", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--gh-canvas)", border: "1px solid var(--gh-line)", display: "grid", placeItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 64 64" fill="none">
            <g stroke="#3D5A3F" strokeWidth="3" strokeLinecap="round">
              <path d="M 32 50 L 32 18"/>
              <path d="M 32 28 C 26 26 22 22 21 16 C 27 16 31 20 32 26"/>
              <path d="M 32 36 C 38 34 42 30 43 24 C 37 24 33 28 32 34"/>
              <path d="M 32 44 C 26 42 22 38 21 32 C 27 32 31 36 32 42"/>
            </g>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500", fontSize: 16, color: "var(--gh-ink)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>Growth Habitat</div>
          <div className="gh-eyebrow" style={{ marginTop: 4 }}>Daniela's Lab</div>
        </div>
      </div>

      <div style={{ padding: "12px 10px 8px" }}>
        {NAV.slice(0, 1).map((it) => (
          <NavItem key={it.id} it={it} active={current === it.id} onClick={() => onNav(it.id)} />
        ))}
      </div>

      <div style={{ padding: "8px 18px 4px" }}>
        <div className="gh-eyebrow" style={{ color: "var(--gh-faint)" }}>Discovery</div>
      </div>
      <div style={{ padding: "4px 10px" }}>
        {NAV.slice(1).map((it) => (
          <NavItem key={it.id} it={it} active={current === it.id} onClick={() => onNav(it.id)} />
        ))}
      </div>

      <div style={{ marginTop: "auto", padding: "16px 18px 22px", borderTop: "1px solid var(--gh-line-soft)" }}>
        <div className="gh-eyebrow" style={{ marginBottom: 8 }}>Current hypothesis</div>
        <div style={{ fontFamily: "var(--gh-serif)", fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500", fontSize: 13, color: "var(--gh-ink)", lineHeight: 1.4 }}>
          AI workforce adoption inside large governance-aware orgs.
        </div>
        <div style={{ marginTop: 8, fontFamily: "var(--gh-mono)", fontSize: 10.5, color: "var(--gh-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          v3 · 12 signals
        </div>
      </div>
    </aside>
  );
}

function NavItem({ it, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: "100%",
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 12px",
        border: "0",
        borderLeft: `2px solid ${active ? "var(--gh-moss)" : "transparent"}`,
        borderRadius: "0 4px 4px 0",
        background: active ? "var(--gh-canvas)" : (h ? "rgba(26,24,20,0.03)" : "transparent"),
        color: active ? "var(--gh-ink)" : "var(--gh-muted)",
        fontFamily: "var(--gh-sans)",
        fontSize: 13.5,
        fontWeight: 500,
        textAlign: "left",
        cursor: "pointer",
        transition: "all var(--gh-dur-base) var(--gh-ease)",
      }}
    >
      <span style={{
        fontFamily: "var(--gh-mono)", fontSize: 10.5,
        color: active ? "var(--gh-moss)" : "var(--gh-faint)",
        width: 22, letterSpacing: "0.04em",
      }}>
        {it.num || it.glyph}
      </span>
      <span>{it.label}</span>
    </button>
  );
}

function Topbar({ crumbs, actions }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 264, right: 0, height: 64,
      background: "rgba(245,241,234,0.86)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--gh-line)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 36px", zIndex: 20,
    }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <span className="gh-eyebrow" style={{ color: i === crumbs.length - 1 ? "var(--gh-ink)" : "var(--gh-faint)" }}>{c}</span>
            {i < crumbs.length - 1 && <span className="gh-eyebrow" style={{ color: "var(--gh-faint)" }}>/</span>}
          </React.Fragment>
        ))}
      </nav>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{actions}</div>
    </header>
  );
}

function Page({ children, crumbs, actions }) {
  return (
    <>
      <Topbar crumbs={crumbs} actions={actions} />
      <main style={{
        marginLeft: 264,
        padding: "calc(64px + 40px) 40px 64px",
        minHeight: "100vh",
        background: "var(--gh-canvas)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </>
  );
}

Object.assign(window, { Sidebar, Topbar, Page, NAV });
