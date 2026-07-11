# Penston Studio — Claude Notes

## Project Overview

Static HTML/CSS website for [penston.studio](https://penston.studio), the personal site and portfolio of George Penston. No build tools, frameworks, or package managers — just plain HTML, CSS, and one vanilla JS file.

## Structure

```
/
├── index.html              # Studio homepage (portfolio/about)
├── markedly/
│   └── index.html          # Markedly app landing page
├── pour-over/
│   └── index.html          # Pour Over for Raindrop landing page
├── assets/
│   ├── style.css           # Shared styles for all pages
│   ├── site.js             # Mode toggle, scroll-reveal, click sound
│   └── ...                 # Favicons, app icons, product screenshots
├── docs/
│   └── design-system.md    # Full design system reference — read this first
├── robots.txt
└── sitemap.xml
```

## Markedly Page Section Order

`markedly/index.html` uses numbered `.section-label` sections (`data-num`): 01 Why Markdown, 02 What it does, 03 Supported formats, 04 Works with, 05 Privacy, 06 Tips & FAQ, 07 Support. Keep this numbering contiguous when adding/removing sections — anchors (`#privacy`, `#faq`, `#support`) are linked from the top nav (`.page-util-links`), so update both together. The Tips & FAQ section reuses the existing `.privacy-content` (`h3`/`p`) pattern rather than a new component; there's no dedicated FAQ/accordion CSS.

**Keep "Supported formats" in sync with the app.** The format-tag grid must match what Markedly's app actually supports — it previously advertised `XLS` after that format was dropped in the app (v1.1), which meant the site promised something that would fail. When Markedly's own format support changes (see the Markedly repo's `CLAUDE.md`/`ROADMAP.md`), check this grid too.

## Style & Design Tokens

Defined in `assets/style.css`. Default mode is **dark**. See `docs/design-system.md` for the full token reference. Key values:

- **Accent**: `#eb5a00` (orange, dark) / `#d94f00` (slightly deeper, light)
- **Pour Over accent override**: `#f0a830` (warm amber)
- **Backgrounds (dark)**: `#0c0b08` primary · `#17150f` secondary · `#1f1c14` tertiary
- **Backgrounds (light)**: `#efece4` primary · `#e5e1d4` secondary · `#d9d3c2` tertiary
- **Fonts**: Hanken Grotesk (headings + body) · Martian Mono (labels, system chrome) · D-DIN Condensed (numeric accents only — self-hosted in `assets/fonts/`). Chosen 2026-07-10; see `DESIGN.md` and `docs/superpowers/specs/2026-07-10-type-system-refresh-design.md`.
- Icons use [Remixicon](https://remixicon.com/) via CDN (product pages only)

## Mode Toggle

A Dieter Rams-style I/O sliding switch. State is driven entirely by `[data-mode="dark"|"light"]` on `<html>`. Persisted in `localStorage['ps_mode']`; falls back to `prefers-color-scheme`. A synchronous inline script in `<head>` sets the attribute before paint to prevent FOUC.

## Content Guidelines

- Copy should be concise and confident — not marketing-fluffy
- Use curly/smart quotes (`'` `"`) not straight quotes
- Tone: professional but personal, maker-focused
- First-person maker voice only — never second-person marketing ("You'll love…")
- See `docs/design-system.md` §1 for full voice & tone guidance

## Deployment

Hosted at `penston.studio` via **Vercel** (migrated from GitHub Pages, June 2026). Deploy from `main` branch — Vercel auto-deploys on push, preview URLs on every branch. `vercel.json` at root sets `cleanUrls` and `trailingSlash: true` to preserve directory-style URLs (`/markedly/`, `/pour-over/`). `www.penston.studio` 308-redirects to the bare apex via Vercel domain config.

## Git Workflow

- Feature branches: `claude/<description>-<sessionId>`
- Push to branch, open PR, merge to `main` to deploy
