# Type System Refresh — Design Spec

**Date:** 2026-07-10
**Branch:** `claude/site-cleanup-pass-22f7f17f` (continues after the donate-link + squircle commits)
**Status:** Awaiting review

## Goal

Replace the site's current typeface trio — which reads as a common AI/template default — with a warmer, more distinctive system, and merge in the UI refinements developed during the type exploration. Modernize the type and tighten the layout **without hollowing out the personality**: icons, the highlight effect, atmosphere, and numeric flourishes all carry over.

## Decision context

Arrived at after a long exploration (mocks v6–v12). Winner chosen by full-page A/B over real long-form content, then pressure-tested with the `design-taste-frontend` and `design-critique` skills. The winning direction is **Hanken (HK)** — warm, humanist, single-family coherence, holds up over a long scroll — over Public Sans (too civic/cool) and Darker Grotesque (great character but an awkward `S`, and a 2-family display/body split).

## The type system

| Role | New | Replaces | Loaded via |
|------|-----|----------|------------|
| Display + Body | **Hanken Grotesk** (Alfredo Marco Pradil, OFL) | Space Grotesk + Inter | Google Fonts |
| Spec / chrome | **Martian Mono** (Evil Martians, OFL) | JetBrains Mono | Google Fonts |
| Numeric flavor | **D-DIN Condensed** (DIN 1451, Datto/Nix, OFL) | — (new) | self-hosted woff2 |

- **Hanken does display and body both** — one family, different weights (800 for hero display, ~700 for section heads, 600 for subheads/card names, 400 for body). This is the system-coherence win.
- **Martian Mono** is the spec font for all mono chrome: kickers, section-label text, card meta, footer marks, `code`. Wider and more legible small than JetBrains Mono (confirmed on the spec bench).
- **D-DIN Condensed** is a *flavor accent only*, confined to numeric moments (see below). Self-hosted (`assets/fonts/D-DINCondensed-Bold.woff2`, ~30KB) rather than CDN, since it's brand-critical and not on Google Fonts. Source: Datto's `d-din` release, OFL.

### Token changes (`assets/style.css` `:root`)

```
--font-display: 'Hanken Grotesk', system-ui, sans-serif;   /* was Space Grotesk */
--font-body:    'Hanken Grotesk', system-ui, sans-serif;   /* was Inter */
--mono:         'Martian Mono', ui-monospace, monospace;   /* was JetBrains Mono */
--font-flavor:  'D-DIN Condensed', 'Martian Mono', sans-serif;  /* NEW — numeric accents */
```

The Google Fonts `@import` (currently line 7) swaps Inter/Space Grotesk/JetBrains Mono for Hanken Grotesk (400,500,600,700,800 + ital 400) and Martian Mono (~300–700). A new `@font-face` block self-hosts D-DIN Condensed Bold.

### Accessibility fix (folded in)

The tertiary chrome color fails WCAG AA at small mono sizes. Corrected as part of this pass:
- Dark: `--text-tertiary: #5a5547` (3.06:1) → **`#837c66`** (4.72:1, passes AA).
- Light: nudge its counterpart to keep parity (`#8a8371` → verify ≥4.5:1, darken if needed).

## DIN numeric accent system (full)

D-DIN Condensed appears at three numeric moments, everything else stays Martian Mono:
1. **Hero chapter marker** (home): large DIN `00` beside the "Bureau · Chapter" kicker.
2. **Section numbers**: the `.section-label` `data-num` (`01`, `02`…) renders in DIN, larger, in accent orange. (No markup change — restyle the existing `::before`.)
3. **Footer "EST. 2025" mark**: DIN, small.

## UI refinements to merge in

- **Buttons** — keep existing structure/behavior; swap label font Space Grotesk → Hanken (`--font-display`). Everything else (accent fill, hover lift, active press, mono arrow) unchanged.
- **Product switcher** (Markedly / Pour Over pills) — keep as-is; approved. Just inherits the new fonts.
- **Feature grid** — reformat the existing Features content on the product pages into bordered tiles: hairline-divided cells, a DIN number, an **icon square with corner registration ticks** (technical-drawing detail), a Hanken subhead, a line of body. Icons are the existing Remixicon glyphs.
- **How-it-works steps** — where step content exists, a big-DIN-numbered list treatment.
- **Works-with** — keep the real app-icon chips; no flattening.
- **Highlight effect** (`.hl`, accent-cool marker) — **keep**, reserved for the pullquote block (may mark a phrase or two within that one block), not scattered per-section.
- **Background** — add a subtle, slightly *organic/worn* graph-paper line layer beneath the existing 48px dot grid (faint irregular mask so lines look worn away in places), reinforcing the drafting-table feel. Dots stay.

## Explicitly preserved (anti-strip-down principle)

Do **not** lose in the merge: all Remixicon icons and SVG glyphs (nav `//` mark, back-link chevron, project/portfolio arrows), the hero `.atm-rays` + `.disc-ring`, the grain overlay, the dot grid, the scroll-reveal animations, the highlight effect. The mocks were deliberately bare to isolate type; the production merge keeps the detail.

## Explicitly kept from current design (not replaced)

- **Mode toggle**: existing Remixicon **sun/moon** icons stay exactly as they are. The mock's "Mode I/O" text treatment is dropped — too cryptic.
- Existing nav structure, unified bar, FARA sections, privacy/support ordering, squircle icon work, safari toolbar tint, audio.

## Files touched

- `assets/style.css` — tokens, `@import` + `@font-face`, section-label/button/feature-grid/background/tertiary rules. Bump cache-buster (`?v=37` → `?v=38`).
- `assets/fonts/D-DINCondensed-Bold.woff2` — new self-hosted font.
- `index.html` — hero chapter marker markup, footer EST mark, `?v=` bump.
- `markedly/index.html` — feature grid, footer mark, `?v=` bump.
- `pour-over/index.html` — feature grid, footer mark, `?v=` bump.
- `docs/design-system.md` — update the Typography section (§3) and any font references.
- `CLAUDE.md` — update the Fonts line under Style & Design Tokens.

## Out of scope

- Extending the system to the Markedly/Pour Over apps or gpenston.com (George's stated plan is to do the site first, then extend once it's settled).
- Any content/copy rewrites.

## Verification

Preview all three pages (`index`, `markedly/`, `pour-over/`) in **both** dark and light modes via the browser preview. Confirm: fonts load (no FOUC/fallback), tertiary contrast ≥4.5:1, DIN accents render, highlight shows only on pullquote, no horizontal overflow, mode toggle sun/moon intact. Screenshot before/after for the PR.

## Git

Continue on `claude/site-cleanup-pass-22f7f17f`. Commit the spec first, then implement in reviewable commits (fonts+tokens → chrome/buttons/section-labels → feature grid/steps → background → docs). PR bundles all of it.
