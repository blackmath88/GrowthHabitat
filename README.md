# Growth Habitat

A career discovery app. Find where your abilities compound fastest.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Status: look-and-feel preview

This first cut is the **visual shell** only:

- Design tokens copied verbatim from the design system (`src/styles/tokens.css`)
- App shell: sidebar with leaf mark, persistent hypothesis footer, blurred topbar with breadcrumbs
- **Command Center page** with hypothesis card, watch-outs, three modules (strongest direction, best conversation, next step), and a five-tile progress strip — all populated with Achim-specific seed content
- Stub pages for the other five routes (Profile, Directions, Conversations, Opportunities, Patterns) — navigation works, content is placeholder

What's **not** yet wired:
- Local storage persistence
- Add/edit/delete for entities
- Score calculations
- JSON import/export
- Markdown career brief

Those come after the look-and-feel is signed off.

## Build

```bash
npm run build
npm run preview
```

## Stack

- Vite + React 18 + TypeScript
- React Router for navigation
- Hand-written CSS using design system tokens (no framework)
- LocalStorage will arrive in the next pass

## Files

```
src/
├── main.tsx                      Entry, BrowserRouter mount
├── App.tsx                       Routes
├── styles/
│   ├── tokens.css                Design tokens (verbatim from design system)
│   └── global.css                Element styles + utility classes
├── components/
│   ├── Shell.tsx                 Sidebar, topbar, page wrapper
│   └── Primitives.tsx            Eyebrow, Chip, Btn, ScoreRail, Card, Module, PageHead, Stat
└── pages/
    ├── CommandCenter.tsx         Live preview page
    └── StubPage.tsx              Placeholder for the other five routes
```
