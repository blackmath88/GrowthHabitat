import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

// ---------- Navigation definition ----------
type NavEntry = {
  to: string;
  label: string;
  num?: string;
  icon: ReactNode;
};

// Inline 18×18 line icons. Tiny and dependency-free.
const I = {
  compass: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2.5 5-5 2.5 2.5-5z" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  target: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  scale: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="m5 8-3 7a4 4 0 0 0 6 0Z" />
      <path d="m19 8-3 7a4 4 0 0 0 6 0Z" />
    </svg>
  ),
  branch: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <path d="M6 8.5v7" />
      <path d="M18 10.5c0 5-6 5-6 9" />
    </svg>
  ),
};

export const NAV: NavEntry[] = [
  { to: "/", label: "Home", icon: I.compass },
  { to: "/profile", label: "Profile", num: "01", icon: I.user },
  { to: "/directions", label: "Directions", num: "02", icon: I.target },
  { to: "/conversations", label: "Talks", num: "03", icon: I.chat },
  { to: "/opportunities", label: "Roles", num: "04", icon: I.scale },
  { to: "/patterns", label: "Patterns", num: "05", icon: I.branch },
];

// ---------- Sidebar ----------
function Sidebar({
  ownerName,
  ownerInitials,
  hypothesisShort,
  hypothesisMeta,
}: {
  ownerName: string;
  ownerInitials: string;
  hypothesisShort: string;
  hypothesisMeta: string;
}) {
  return (
    <aside
      style={{
        position: "fixed",
        left: "var(--gh-sidebar-inset)",
        top: "var(--gh-sidebar-inset)",
        bottom: "var(--gh-sidebar-inset)",
        width: "var(--gh-sidebar-w)",
        zIndex: 30,
        background: "var(--gh-surface)",
        border: "1px solid var(--gh-line)",
        borderRadius: 24,
        boxShadow: "var(--gh-shadow-float)",
        padding: "16px 12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Brand mark */}
      <div
        style={{
          padding: "4px 4px 14px",
          borderBottom: "1px solid var(--gh-line-soft)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--gh-ink)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
            <g
              stroke="var(--gh-canvas)"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <path d="M 32 50 L 32 18" />
              <path d="M 32 28 C 26 26 22 22 21 16 C 27 16 31 20 32 26" />
              <path d="M 32 36 C 38 34 42 30 43 24 C 37 24 33 28 32 34" />
              <path d="M 32 44 C 26 42 22 38 21 32 C 27 32 31 36 32 42" />
            </g>
          </svg>
        </div>
        <div
          style={{
            fontFamily: "var(--gh-sans)",
            fontWeight: 700,
            fontSize: 11,
            color: "var(--gh-ink)",
            letterSpacing: "-0.01em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Growth<br />Habitat
        </div>
      </div>

      {/* Nav items */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flex: 1,
        }}
      >
        {NAV.map((entry) => (
          <NavRow key={entry.to} entry={entry} />
        ))}
      </nav>

      {/* Identity card */}
      <div
        style={{
          padding: "12px 8px 4px",
          borderTop: "1px solid var(--gh-line-soft)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: "var(--gh-slate)",
            color: "var(--gh-canvas)",
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {ownerInitials}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--gh-ink)",
              lineHeight: 1.2,
            }}
          >
            {ownerName}
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: "var(--gh-mono)",
              fontSize: 9.5,
              color: "var(--gh-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
            title={hypothesisShort}
          >
            {hypothesisMeta}
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavRow({ entry }: { entry: NavEntry }) {
  return (
    <NavLink
      to={entry.to}
      end={entry.to === "/"}
      style={({ isActive }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "10px 6px",
        borderRadius: 12,
        background: isActive ? "var(--gh-rust)" : "transparent",
        color: isActive ? "var(--gh-canvas)" : "var(--gh-muted)",
        fontFamily: "var(--gh-sans)",
        fontSize: 11,
        fontWeight: 600,
        textAlign: "center",
        cursor: "pointer",
        transition: "all var(--gh-dur-base) var(--gh-ease)",
      })}
    >
      {entry.icon}
      <span>{entry.label}</span>
    </NavLink>
  );
}

// ---------- Topbar ----------
function Topbar({
  crumbs,
  actions,
}: {
  crumbs: string[];
  actions?: ReactNode;
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "rgba(245, 244, 241, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--gh-line-soft)",
      }}
    >
      <nav style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "inline-flex", gap: 10 }}>
            <span
              className="gh-eyebrow"
              style={{
                color:
                  i === crumbs.length - 1
                    ? "var(--gh-ink)"
                    : "var(--gh-faint)",
              }}
            >
              {c}
            </span>
            {i < crumbs.length - 1 && (
              <span className="gh-eyebrow" style={{ color: "var(--gh-faint)" }}>
                /
              </span>
            )}
          </span>
        ))}
      </nav>
      {actions && (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {actions}
        </div>
      )}
    </header>
  );
}

// ---------- Page ----------
export function Page({
  children,
  crumbs,
  actions,
}: {
  children: ReactNode;
  crumbs: string[];
  actions?: ReactNode;
}) {
  return (
    <main
      className="gh-canvas"
      style={{
        marginLeft: "calc(var(--gh-sidebar-w) + var(--gh-sidebar-inset) * 2)",
        minHeight: "100vh",
      }}
    >
      <Topbar crumbs={crumbs} actions={actions} />
      <div
        style={{
          maxWidth: "var(--gh-content-max)",
          margin: "0 auto",
          padding: "32px 32px 64px",
        }}
      >
        {children}
      </div>
    </main>
  );
}

// ---------- AppShell wrapper ----------
export function AppShell({
  children,
  ownerName,
  ownerInitials,
  hypothesisShort,
  hypothesisMeta,
}: {
  children: ReactNode;
  ownerName: string;
  ownerInitials: string;
  hypothesisShort: string;
  hypothesisMeta: string;
}) {
  useLocation();
  return (
    <>
      <Sidebar
        ownerName={ownerName}
        ownerInitials={ownerInitials}
        hypothesisShort={hypothesisShort}
        hypothesisMeta={hypothesisMeta}
      />
      {children}
    </>
  );
}
