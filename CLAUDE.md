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
│   ├── site.js             # Mode toggle, click sound, smooth anchors
│   ├── reveal.js           # Scroll-reveal runtime — identical copy in gpenston-portfolio
│   └── ...                 # Favicons, app icons, product screenshots
├── docs/
│   └── design-system.md    # Full design system reference — read this first
├── scripts/                # Card-generation tooling; .vercelignore'd, not deployed
│   ├── og-card.html        # 1200×630 share-card template
│   └── generate-og-cards.mjs
├── robots.txt
└── sitemap.xml
```

## Share Cards (Open Graph)

Every page previews with a real 1200×630 bureau card in `assets/og-*.png`: `og-studio`, `og-markedly`, `og-pour-over`, and `og-notes` (shared by both notes pages). Before Aug 2026 every page pointed `og:image` at a 200×200 favicon with `twitter:card: summary`, so sharing a link produced a tiny icon or nothing — while gpenston.com, which generates a proper card, previewed fine.

Regenerate with `node scripts/generate-og-cards.mjs` after changing a card's wording or adding a page, then commit the PNGs. Cards carry explicit `og:image:width`/`height` and `twitter:card: summary_large_image` — a 1200×630 image in a `summary` slot just gets cropped back to a square.

**Two constraints worth not undoing:**

- **No `package.json`.** Playwright is borrowed from a sibling checkout (`../gpenston-portfolio/node_modules`, override with `PLAYWRIGHT_FROM`). Adding a `package.json` here would make Vercel stop treating this as static files and start looking for a build.
- **The template copies the palette rather than linking `style.css`.** It renders from `file://` where the site's relative paths don't resolve, and a share card should be frozen anyway — every platform that scrapes it caches it, so it must not silently change when the site's CSS does. If the dark palette moves, update `scripts/og-card.html` by hand and re-render.

## Markedly Page Section Order

`markedly/index.html` uses numbered `.section-label` sections (`data-num`): 01 Why Markdown, 02 What it does, 03 Supported formats, 04 Works with, 05 Privacy, 06 Tips & FAQ, 07 Support. Keep this numbering contiguous when adding/removing sections — anchors (`#privacy`, `#faq`, `#support`) are linked from the top nav (`.page-util-links`), so update both together. The Tips & FAQ section reuses the existing `.privacy-content` (`h3`/`p`) pattern rather than a new component; there's no dedicated FAQ/accordion CSS.

**Keep "Supported formats" in sync with the app.** The format-tag grid must match what Markedly's app actually supports — it previously advertised `XLS` after that format was dropped in the app (v1.1), which meant the site promised something that would fail. When Markedly's own format support changes (see the Markedly repo's `CLAUDE.md`/`ROADMAP.md`), check this grid too.

## Style & Design Tokens

Defined in `assets/style.css`. Default mode is **dark**. See `docs/design-system.md` for the full token reference. Key values:

- **Accent**: `#eb5a00` (orange, dark) / `#d94f00` (slightly deeper, light)
- **Pour Over accent override**: `#f0a830` (warm amber)
- **Backgrounds (dark)**: `#0c0b08` primary · `#17150f` secondary · `#1f1c14` tertiary
- **Backgrounds (light)**: `#f2f1ec` primary · `#e8e6df` secondary · `#dbd9d0` tertiary — "greige paper", updated 2026-07-21 (was bone paper `#efece4`/`#e5e1d4`/`#d9d3c2`; ported from gpenston-portfolio's rework, closing what had been a sibling divergence — both sites now share this light palette). See `DESIGN.md` + `docs/design-system.md` §2.
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

## Sister Site

**gpenston-portfolio** (gpenston.com, `~/Projects/gpenston-portfolio`, github.com/gpenston/gpenston-portfolio) is the sibling portfolio site — **Next.js 16 + React 19 + Tailwind v4 + Framer Motion** (not Framer/HTML). This repo is the design source of truth: `DESIGN.md` + `docs/design-system.md` are the canonical spec, and the portfolio implements the same "bureau" language in its `app/globals.css` `@theme`.

Shared DNA (keep in sync both ways): the warm greige/near-black palette (both sites now share the same light-mode greige as of 2026-07-21 — see Style & Design Tokens above), orange (+ cool-teal) accents, 880px container, mono section labels, dot-grid + grain, and the Chapter 03 type system (Hanken Grotesk + Martian Mono + D-DIN Condensed — synced 2026-07-11). Sibling-distinct by design: content structure and per-site ornament (this site's worn graph-paper texture vs. the portfolio's dot-grid/registration-ticks). **When you change tokens, the type system, or a shared component here, mirror it in the portfolio and update both CLAUDE.md files the same session** — they've drifted before.

**Flowing back from the portfolio (2026-08-07).** Its editorial polish pass adopted two devices from here — `.section-label::after`'s growing hairline and `.big-h2`'s poster-scale statement type — so those are now shared DNA in both directions. Two rules it established are worth applying here too if this site ever drifts the same way: **mono is chrome at 1–3 words, never phrases** (set a sentence in Martian Mono at 11px/0.1em+ and the page reads as a spec sheet), and **arrows belong only on a primary CTA, an external link, or a directional pager** — everywhere else a drawn underline on hover carries the affordance without the chrome.

**Shared DNA — page entrance + scroll-reveal (unified 2026-09-24).** Both sites run one runtime: `assets/reveal.js` here and `public/reveal.js` in the portfolio, **byte-identical, so edit both together**. Both also use the same CSS contract: `main` fades up 8px/360ms in pure CSS, `[data-reveal]` fades up 24px/600ms at 64px inside the viewport, and hidden states are gated on `html.js` and written as `:not([data-revealed])`. A 3s `<head>` failsafe shows everything if the runtime never arrives. Under reduced motion both sites keep the fades and drop the movement. The only page-navigation view transition here is on `.product-switcher`, which reproduces the portfolio's cross-fading active nav pill. Details are in `docs/design-system.md` §6.

**Deliberate divergence — mode-wipe duration.** This site stays at 680ms; the portfolio runs 540ms. Easing and direction are still identical, so they remain siblings.

**Why this site's mode wipe was always the faster one.** The portfolio's dropped ~92% of its frames on iOS Safari because its page texture applied `filter: url(...)` (feTurbulence + feDisplacementMap) to a fixed, full-viewport layer, which re-evaluates on every repaint. This site never had that problem because its worn graph-paper layer uses a **`mask-image` data URI** — rasterized once at decode, then just tiled. The portfolio has since been rebuilt the same way, baking its displacement inside the tiled SVG rather than filtering the layer.

Keep it that way here: **the texture effects belong inside the image, not in a CSS `filter` on the layer.** And measure this class of change in WebKit — it was invisible in desktop Chromium, where an earlier pass measured a clean 60fps and wrongly concluded there was nothing wrong.

**Cross-site theme handshake (2026-07-21):** outbound links between the two sites carry the active mode as a `?theme=dark|light` query param (set on click in `assets/site.js`'s `wire()`), and each site's FOUC-prevention `<head>` script reads/strips it on load before applying its own stored/OS-fallback logic. No shared cookie or backend — just the param on links that already existed. Full mechanism documented in `docs/design-system.md` §13; the portfolio's mirror-image implementation lives in `lib/cross-site-theme.ts` + `app/layout.tsx`.
