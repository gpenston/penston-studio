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

## Style & Design Tokens

Defined in `assets/style.css`. Default mode is **dark**. See `docs/design-system.md` for the full token reference. Key values:

- **Accent**: `#eb5a00` (orange, dark) / `#d94f00` (slightly deeper, light)
- **Pour Over accent override**: `#f0a830` (warm amber)
- **Backgrounds (dark)**: `#0c0b08` primary · `#17150f` secondary · `#1f1c14` tertiary
- **Backgrounds (light)**: `#efece4` primary · `#e5e1d4` secondary · `#d9d3c2` tertiary
- **Fonts**: Space Grotesk (headings) · Inter (body) · JetBrains Mono (labels, system chrome)
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

Hosted at `penston.studio` via Vercel. No CI/CD — changes go live when pushed to `main`.

## Git Workflow

- Feature branches: `claude/<description>-<sessionId>`
- Push to branch, open PR, merge to `main` to deploy
