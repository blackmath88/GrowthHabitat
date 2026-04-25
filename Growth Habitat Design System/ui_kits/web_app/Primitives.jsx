// Primitives.jsx — shared UI atoms
const { useState, useEffect, useRef } = React;

const cx = (...c) => c.filter(Boolean).join(" ");

function Eyebrow({ children, num }) {
  return (
    <div className="gh-eyebrow" style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {num && <span style={{ color: "var(--gh-moss)" }}>{num}</span>}
      <span>{children}</span>
    </div>
  );
}

function Card({ children, style, onClick, hoverable }) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setH(true)}
      onMouseLeave={() => hoverable && setH(false)}
      style={{
        background: h ? "var(--gh-surface-2)" : "var(--gh-surface)",
        border: "1px solid var(--gh-line)",
        borderLeft: hoverable && h ? "2px solid var(--gh-moss)" : "1px solid var(--gh-line)",
        paddingLeft: hoverable && h ? 23 : 24,
        borderRadius: 8,
        boxShadow: "var(--gh-shadow-hairline)",
        padding: 24,
        transition: "background var(--gh-dur-base) var(--gh-ease), border-color var(--gh-dur-base) var(--gh-ease)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ScoreRail({ value, max = 10, tone = "moss", showValue = true, w }) {
  const segs = Array.from({ length: max });
  const filled = Math.round(value);
  const fillColor = tone === "warn" ? "var(--gh-warn)" : tone === "caution" ? "var(--gh-caution)" : "var(--gh-moss)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: w }}>
      <div style={{ display: "flex", gap: 2, height: 6, flex: 1 }}>
        {segs.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: i < filled ? fillColor : "var(--gh-line)",
              borderRadius: 1,
              transition: "background 220ms var(--gh-ease)",
            }}
          />
        ))}
      </div>
      {showValue && (
        <span style={{ fontFamily: "var(--gh-mono)", fontSize: 12, color: "var(--gh-ink)", width: 26, textAlign: "right", fontWeight: 500 }}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

function Chip({ children, tone = "neutral", size = "md" }) {
  const tones = {
    positive: { bg: "var(--gh-positive-soft)", fg: "var(--gh-positive)", bd: "var(--gh-positive-line)" },
    caution: { bg: "var(--gh-caution-soft)", fg: "var(--gh-caution)", bd: "var(--gh-caution-line)" },
    warn: { bg: "var(--gh-warn-soft)", fg: "var(--gh-warn)", bd: "var(--gh-warn-line)" },
    neutral: { bg: "var(--gh-neutral-soft)", fg: "var(--gh-neutral)", bd: "var(--gh-neutral-line)" },
    blank: { bg: "var(--gh-canvas)", fg: "var(--gh-muted)", bd: "var(--gh-line)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: size === "sm" ? 20 : 22,
        padding: "0 8px",
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        fontFamily: "var(--gh-mono)",
        fontSize: 10.5,
        fontWeight: 500,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Btn({ children, variant = "secondary", onClick, sm, icon }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: sm ? 30 : 36,
    padding: sm ? "0 10px" : "0 14px",
    border: "1px solid var(--gh-line)",
    borderRadius: 4,
    background: "var(--gh-surface)",
    color: "var(--gh-ink)",
    fontFamily: "var(--gh-sans)",
    fontSize: sm ? 12 : 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all var(--gh-dur-base) var(--gh-ease)",
  };
  const variants = {
    primary: { background: "var(--gh-moss)", borderColor: "var(--gh-moss)", color: "var(--gh-canvas)" },
    secondary: {},
    ghost: { background: "transparent", borderColor: "transparent", color: "var(--gh-muted)" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant] }}>
      {icon}
      {children}
    </button>
  );
}

function PageHead({ eyebrow, title, subtitle, actions }) {
  return (
    <header style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end", marginBottom: 40 }}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ marginTop: 14, maxWidth: 820, textWrap: "balance" }}>{title}</h1>
        {subtitle && <p style={{ marginTop: 14, color: "var(--gh-muted)", fontSize: 16, lineHeight: 1.55, maxWidth: 680 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
    </header>
  );
}

function Module({ eyebrow, title, action, children, style }) {
  return (
    <section style={{
      background: "var(--gh-surface)",
      border: "1px solid var(--gh-line)",
      borderRadius: 8,
      boxShadow: "var(--gh-shadow-hairline)",
      ...style,
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "18px 22px",
        borderBottom: "1px solid var(--gh-line-soft)",
      }}>
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h4 style={{ marginTop: 6, fontSize: 18, fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'wght' 500" }}>{title}</h4>
        </div>
        {action}
      </header>
      <div style={{ padding: 22 }}>{children}</div>
    </section>
  );
}

function Avatar({ name, size = 36 }) {
  const init = name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: "var(--gh-canvas-deep)", border: "1px solid var(--gh-line)",
      display: "grid", placeItems: "center",
      fontFamily: "var(--gh-mono)", fontSize: size * 0.32, fontWeight: 500, color: "var(--gh-ink)",
      letterSpacing: 0.5,
    }}>{init}</div>
  );
}

function Icon({ name, size = 18 }) {
  const paths = {
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrowUpRight: <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    trendUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    trendDown: <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    compass: <><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>,
    radio: <><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"/><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2 5.4 0 7.4"/><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"/><line x1="12" y1="22" x2="12" y2="13"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    scale: <><path d="M16 16.5L12 21l-4-4.5"/><path d="M12 21V3"/><path d="M3 7l9-4 9 4"/><path d="M3 7v6c0 2 4 4 9 4s9-2 9-4V7"/></>,
    branch: <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

Object.assign(window, { cx, Eyebrow, Card, ScoreRail, Chip, Btn, PageHead, Module, Avatar, Icon });
