import type { CSSProperties, ReactNode } from "react";

// ---------- Eyebrow ----------
export function Eyebrow({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="gh-eyebrow" style={style}>
      {children}
    </div>
  );
}

// ---------- Chip ----------
type ChipTone = "default" | "positive" | "caution" | "warn" | "neutral" | "rust";

export function Chip({
  children,
  tone = "default",
  style,
}: {
  children: ReactNode;
  tone?: ChipTone;
  style?: CSSProperties;
}) {
  const toneClass = tone === "default" ? "" : `gh-chip-${tone}`;
  return (
    <span className={`gh-chip ${toneClass}`.trim()} style={style}>
      {children}
    </span>
  );
}

// ---------- Btn ----------
type BtnVariant = "default" | "primary" | "dark" | "ghost";

export function Btn({
  children,
  variant = "default",
  sm = false,
  onClick,
  type = "button",
  style,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  sm?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: CSSProperties;
}) {
  const cls = [
    "gh-btn",
    variant === "primary" ? "gh-btn-primary" : "",
    variant === "dark" ? "gh-btn-dark" : "",
    variant === "ghost" ? "gh-btn-ghost" : "",
    sm ? "gh-btn-sm" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type={type} className={cls} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

// ---------- ScoreRail ----------
export function ScoreRail({ value, max = 10 }: { value: number; max?: number }) {
  const segs = Array.from({ length: max }, (_, i) => i < value);
  return (
    <div className="gh-score-rail" aria-label={`Score ${value} of ${max}`}>
      {segs.map((on, i) => (
        <div
          key={i}
          className={`gh-score-seg ${on ? "is-on" : ""}`.trim()}
        />
      ))}
    </div>
  );
}

// ---------- Card (default) ----------
export function Card({
  children,
  style,
  onClick,
  variant = "card",
}: {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  variant?: "card" | "float" | "flat";
}) {
  const cls = variant === "float" ? "gh-card-float" : variant === "flat" ? "gh-card-flat" : "gh-card";
  return (
    <div
      className={cls}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default", padding: 24, ...style }}
    >
      {children}
    </div>
  );
}

// ---------- SectionHeader ----------
// Strict pattern used on every section: eyebrow → title → optional subtitle/action.
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  style,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 24,
        marginBottom: 18,
        ...style,
      }}
    >
      <div>
        <Eyebrow style={{ marginBottom: 8 }}>{eyebrow}</Eyebrow>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--gh-ink)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              marginTop: 8,
              maxWidth: 720,
              color: "var(--gh-muted)",
              lineHeight: 1.6,
              fontSize: 14.5,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}

// ---------- Module (titled section card) ----------
export function Module({
  eyebrow,
  title,
  action,
  children,
  style,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="gh-card" style={{ padding: 24, ...style }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h4
            style={{
              marginTop: 8,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h4>
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

// ---------- Stat ----------
export function Stat({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <Eyebrow>{label}</Eyebrow>
      <div
        style={{
          marginTop: 10,
          fontFamily: "var(--gh-sans)",
          fontSize: 32,
          fontWeight: 700,
          color: emphasis ? "var(--gh-rust)" : "var(--gh-ink)",
          letterSpacing: "-0.025em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "var(--gh-muted)",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ---------- Tile (colored panel for the three-tile rhythm) ----------
type TileTone = "rust" | "slate" | "mist" | "cream";

export function Tile({
  tone,
  eyebrow,
  badge,
  title,
  body,
  footer,
  italic = false,
  meta,
}: {
  tone: TileTone;
  eyebrow: string;
  badge?: ReactNode;
  title: string;
  body?: string;
  footer?: ReactNode;
  italic?: boolean;
  meta?: string;
}) {
  const palette =
    tone === "rust"
      ? { bg: "var(--gh-rust)", fg: "var(--gh-canvas)", line: "rgba(245,244,241,0.18)" }
      : tone === "slate"
      ? { bg: "var(--gh-slate)", fg: "var(--gh-canvas)", line: "rgba(245,244,241,0.18)" }
      : tone === "mist"
      ? { bg: "var(--gh-mist)", fg: "var(--gh-ink)", line: "var(--gh-mist-line)" }
      : { bg: "var(--gh-surface)", fg: "var(--gh-ink)", line: "var(--gh-line)" };

  const dim = tone === "rust" || tone === "slate";

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.fg,
        borderRadius: 16,
        border: dim ? "none" : `1px solid ${palette.line}`,
        boxShadow: dim ? "var(--gh-shadow-card)" : "var(--gh-shadow-hairline)",
        padding: 24,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            className="gh-eyebrow"
            style={{
              color: dim ? "rgba(245,244,241,0.7)" : "var(--gh-faint)",
            }}
          >
            {eyebrow}
          </div>
          {badge}
        </div>
        {meta && (
          <div
            style={{
              fontSize: 12.5,
              color: dim ? "rgba(245,244,241,0.7)" : "var(--gh-muted)",
              marginBottom: 8,
            }}
          >
            {meta}
          </div>
        )}
        <div
          style={{
            fontSize: italic ? 16 : 21,
            fontWeight: italic ? 400 : 600,
            fontFamily: italic ? "var(--gh-italic)" : "var(--gh-sans)",
            fontStyle: italic ? "italic" : "normal",
            lineHeight: italic ? 1.4 : 1.25,
            letterSpacing: italic ? "-0.005em" : "-0.015em",
            marginBottom: body ? 8 : 0,
          }}
        >
          {italic ? `"${title}"` : title}
        </div>
        {body && (
          <div
            style={{
              fontSize: 13,
              color: dim ? "rgba(245,244,241,0.78)" : "var(--gh-muted)",
              lineHeight: 1.5,
            }}
          >
            {body}
          </div>
        )}
      </div>
      {footer && (
        <div
          style={{
            paddingTop: 16,
            borderTop: `1px solid ${palette.line}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11.5,
            color: dim ? "rgba(245,244,241,0.85)" : "var(--gh-muted)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// ---------- MistLandscape ----------
// Decorative SVG used in the hero's secondary panel. Layered curves +
// progress dots. No data semantics — it's calm visual furniture.
export function MistLandscape({
  steps,
  activeIndex,
}: {
  steps: string[];
  activeIndex: number;
}) {
  return (
    <svg
      viewBox="0 0 1000 280"
      style={{ width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1000" height="280" fill="var(--gh-mist)" />
      <path
        d="M0 150 C150 95 270 145 420 105 C560 65 650 95 760 130 C870 165 920 115 1000 135 L1000 280 L0 280 Z"
        fill="var(--gh-mist-deep)"
      />
      <path
        d="M0 175 C140 135 260 185 390 145 C520 105 640 170 780 132 C880 105 930 148 1000 132 L1000 280 L0 280 Z"
        fill="#C9D8DD"
        opacity="0.8"
      />
      <path
        d="M0 205 C160 160 260 225 420 178 C560 135 680 205 810 165 C900 138 950 180 1000 165 L1000 280 L0 280 Z"
        fill="#9FB5C0"
        opacity="0.45"
      />
      <line
        x1="80"
        y1="200"
        x2="920"
        y2="200"
        stroke="var(--gh-canvas)"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      {steps.map((label, index) => {
        const x = 80 + index * (840 / (steps.length - 1));
        const active = index === activeIndex;
        const done = index < activeIndex;
        return (
          <g key={label}>
            <circle
              cx={x}
              cy="200"
              r={active ? 12 : 9}
              fill={active ? "var(--gh-rust)" : done ? "var(--gh-slate)" : "#AEBBC0"}
            />
            {done && (
              <text
                x={x}
                y="205"
                textAnchor="middle"
                fill="var(--gh-canvas)"
                fontSize="11"
                fontWeight="700"
              >
                ✓
              </text>
            )}
            <text
              x={x}
              y="240"
              textAnchor="middle"
              fill={active ? "var(--gh-rust)" : "var(--gh-muted)"}
              fontFamily="var(--gh-sans)"
              fontSize="11"
              fontWeight={active ? 700 : 500}
              letterSpacing="0.02em"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
