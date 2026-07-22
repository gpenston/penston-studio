---
version: alpha
name: Penston Studio — Bureau
description: >-
  Personal studio and side-project site for George Penston. An instrument, not
  an album cover: warm near-black (or greige-paper) canvas, one signal-orange
  accent, humanist-grotesk type, monospaced technical chrome, and condensed
  industrial numerals. Dieter Rams / Braun / Eames Office lineage.
colors:
  primary: "#eb5a00"
  primary-hover: "#ff7a2e"
  accent-cool: "#7aa9a3"
  surface: "#0c0b08"
  surface-raised: "#17150f"
  surface-overlay: "#1f1c14"
  on-surface: "#e8e2cf"
  on-surface-muted: "#9c9687"
  on-surface-faint: "#837c66"
  border-subtle: "#1f1c14"
  border: "#2a2620"
  on-primary: "#0c0b08"
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 84px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.015em
  title:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Martian Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.12em
  numeral:
    fontFamily: D-DIN Condensed
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.02em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  icon: 14px
  full: 999px
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 48px
  container-pad: 32px
  container-max: 880px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.title}"
  project-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 22px
  project-card-hover:
    backgroundColor: "{colors.surface-overlay}"
  section-label:
    textColor: "{colors.on-surface-faint}"
    typography: "{typography.label}"
  section-number:
    textColor: "{colors.primary}"
    typography: "{typography.numeral}"
  feature-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 26px
---

# Penston Studio — Bureau

## Overview

Penston Studio is the personal site and side-project showcase of George Penston,
a principal product designer and maker. The guiding metaphor is an **instrument,
not an album cover**: the interface is a precise, understated frame that lets the
work carry the weight. The lineage is mid-century industrial modernism — Dieter
Rams, Braun, the Eames Office, trade-publication printing.

The tone is confident, first-person, and editorial — a trade portfolio, not a
personal-brand exercise. Restraint is the rule: keep the drama dialed down and
let composition, typography, and one saturated accent do the talking. Warmth
matters as much as precision — the palette is warm-black and bone rather than
clinical gray, real icons and a hand-drawn highlight survive alongside the
technical chrome, and the background carries a worn drafting-table texture.

The site is **dual-mode**. Dark is the default (warm near-black); light is a
distinct **greige-paper** aesthetic, not a mechanical inversion. Mode is a manual
toggle (sun/moon), persisted locally, applied before paint to avoid a flash.

The site is also **theme-aware of its sister site**, gpenston.com. Outbound
links to the portfolio append `?theme=dark|light` for whichever mode is
active; the receiving site reads it on load, adopts it, and strips the param.
The reverse holds too — arriving here via a themed link from the portfolio
sets `ps_mode` before paint. See §5 Components → "Mode toggle" below and
`docs/design-system.md` §13.

## Colors

The palette is high-contrast warm neutrals with a single evocative accent. Values
below are the **dark (default) theme**; the light "greige paper" theme remaps the
same roles (see end of section).

- **Primary — Signal Orange (#eb5a00):** The sole accent. Used only for the most
  important action per view, section numbers, the wordmark dot, and critical
  emphasis. Hover deepens to `#ff7a2e`. In light mode it shifts to `#d94f00`.
- **Accent Cool — Muted Teal (#7aa9a3):** A secondary, quieter emphasis. Drives
  the one-word headline emphasis and the pullquote highlight marker. Never
  competes with Primary. Light mode: `#3d6b68`.
- **Surface — Warm Near-Black (#0c0b08):** The page background. Deliberately warm
  and never pure black. Raised (`#17150f`) and overlay (`#1f1c14`) layers carry
  cards and chips.
- **On-Surface — Bone (#e8e2cf):** Primary text and headlines.
- **On-Surface Muted (#9c9687):** Body copy asides, secondary text.
- **On-Surface Faint (#837c66):** Technical chrome — mono labels, metadata,
  footer marks. Tuned to clear WCAG AA (4.5:1) at small sizes.
- **Borders (#1f1c14 subtle, #2a2620 medium):** Hairline separation only.

**Light "greige paper" theme (updated 2026-07-21):** surface `#f2f1ec` /
`#e8e6df` / `#dbd9d0`, on-surface `#1a1810`, muted `#5a5547`, faint `#6d6752`,
primary `#d94f00`, accent-cool `#3d6b68`. Desaturated and lifted from the
original bone paper (`#efece4` / `#e5e1d4` / `#d9d3c2`) to read as "paper"
rather than "beige" — ported from gpenston-portfolio's light-mode rework, and
now the shared value across both sites (no longer a sibling divergence). Faint
was darkened from `#7d765f` in the same pass — the old value cleared only
3.84:1 on bone paper and 4.01:1 on the new greige, short of the 4.5:1 floor
for small mono chrome; `#6d6752` clears 5.00:1. Border tones (`--border-light`
`#dad7ca`, `--border-medium` `#c4c1b5`) were pulled toward neutral in step so
they don't read warmer than the desaturated bg. **Per-page accent override:**
the Pour Over page swaps Primary to a warm amber (`#f0a830` dark / `#c88a1e`
light).

## Typography

Three families, each with a strict job. The pairing was chosen to escape the
common geometric-grotesk defaults while staying warm and classic.

- **Hanken Grotesk — display and body.** A humanist grotesque (Alfredo Marco
  Pradil) with a tall, even x-height and gently softened terminals. It carries
  both the poster-scale hero name (weight 800) and long-form body copy (weight
  400) as one coherent voice — warm, legible, made-by-a-person. Section and
  feature headings sit at 600–700.
- **Martian Mono — technical chrome.** A wide, highly legible monospace (Evil
  Martians) for all system chrome: kickers, section-label text, card metadata,
  footer marks, inline `code`. Labels are strictly **uppercase** with generous
  tracking (`0.12em`) and tabular figures. Never used for body copy.
- **D-DIN Condensed — numeric flavor.** A digitization of DIN 1451, the German
  industrial-standard alphabet (road signs, engineering drawings). Reserved
  **only** for numeric accent moments: the hero chapter marker, section numbers,
  and the footer "EST." mark, all in Signal Orange.

Hero display sizes are fluid (`clamp`); the token values above are the upper
bound. One emphasized word per headline, set in Accent Cool (not italic).

## Layout

A single **fixed-max-width column** (880px) centered in the viewport, with 32px
horizontal padding that collapses on mobile. Spacing follows a 4pt scale; major
sections are separated by ~48px of vertical rhythm rather than heavy dividers.

Content is grouped with hairline rules and negative space over boxes. Section
starts are marked by a **section label** — a DIN number in Signal Orange, a mono
uppercase caption, and a thin rule that draws itself in on scroll-reveal. The
background is a 48px dot grid layered over a faint, slightly worn graph-paper
line grid (irregular, as if aged) — a drafting-table surface, kept very subtle.

## Elevation & Depth

Essentially flat. Hierarchy comes from **tonal layering** (surface → raised →
overlay), hairline borders, and type scale — not drop shadows. Cards and chips
sit on the raised surface with a 1px subtle border; hover nudges the border and
background one step, plus a 1px lift. A fixed, pointer-events-none grain overlay
(~3% opacity) and a faint hero starburst/ring add atmosphere without depth.

## Motion

Motion is a supporting cast member, not a feature. Hover transitions run
150–200ms; nothing longer feels slow. The only ambient (always-on) motion
lives in the home hero atmosphere (a slow-rotating ring and counter-rotating
rays) — no floating particles, gradient sweeps, or breathing elements
elsewhere. `prefers-reduced-motion: reduce` kills everything, no exceptions.

Two moments use the View Transitions API rather than ordinary CSS
transitions: MPA page navigation (a 360ms fade-and-rise on arrival, with the
nav wordmark anchored so it never moves between pages) and the **mode-switch
wipe** — nightfall/sunup, described under Components above. The wipe was
deliberately simplified down to a single soft gradient band after an
organic-ripple attempt (layered radial "puddles" riding the same edge)
kept producing a second, competing edge wherever the wipe crossed a
hard-edged element like a card — broke the one-sheet illusion. An SVG
noise-displacement mask is the leading candidate to revisit organic falloff
without that conflict, if it's worth another pass later.

## Shapes

Restrained, engineered softness. Small radii throughout: **4px** for buttons,
tags, and cards; **8px** for larger panels; **12px** for feature tiles; **14px**
for app-icon frames; pill (`999px`) only for the product-switcher chips. App
icons that ship their own baked-in shape are masked to a squircle rather than
double-framed. Feature-tile icons carry small **corner registration ticks** — a
technical-drawing detail that reinforces the instrument theme.

## Components

- **Buttons.** *Primary:* Signal Orange fill, bone-dark text, Hanken 600, 4px
  radius, 12px padding, a 1px hover lift and a tactile press-down on `:active`.
  *Secondary:* text-only, muted color warming to Primary on hover, often paired
  with a small mono arrow. Official Apple "Mac App Store" badge is used verbatim
  for the Markedly CTA (no custom-styled substitute).
- **Product switcher.** Pill chips (Markedly / Pour Over) in the unified bar; the
  active item is a non-interactive dimmed `span`, inactive items are links.
- **Project cards (home).** Icon + name + description + meta in a raised card,
  hairline border, 4px radius, subtle hover lift.
- **Feature tiles.** Hairline-divided grid cells (not floating cards): a DIN
  number, a corner-ticked icon square, a Hanken subhead, one line of body.
- **Section label.** DIN number (Primary) + mono uppercase caption + self-drawing
  hairline rule.
- **Mode toggle.** Sun/moon icons (Remixicon) with an opacity+rotation crossfade;
  reduced-motion falls back to opacity only. Drives `[data-mode]` on `<html>`.
  The switch itself triggers a same-document View Transition: a soft, wide
  gradient band sweeps the new mode in — darkness descending from the top
  ("nightfall") when switching to dark, light rising from the bottom
  ("sunup") when switching to light. Deliberately a single plain gradient,
  not a hard edge or a decorated one — see Motion below.
  **Cross-site handshake:** outbound links to gpenston.com pick up the
  active mode via a `?theme=` query param on click; the reverse also holds
  for links arriving from the portfolio. See `docs/design-system.md` §13.
- **Highlight.** A hand-drawn marker highlight (Accent Cool) reserved for the
  pullquote block only — the single expressive flourish per page.

## Do's and Don'ts

- Do use Signal Orange for only the single most important action (or the numeric
  accents) per view; let Accent Cool handle secondary emphasis.
- Do keep the highlight marker to the pullquote block — never scatter it per
  section.
- Do preserve the atmosphere: icons, hero rays, grain, dot + worn graph-paper
  grid, corner ticks. Clean is the goal; stripped-down is not.
- Do keep chrome type in Martian Mono, uppercase, tracked, tabular figures.
- Do maintain WCAG AA contrast (4.5:1 for normal text); the faint chrome color is
  tuned specifically to clear it at small sizes.
- Don't use D-DIN for anything but numeric accents, and never for body.
- Don't use pure black, gradients, neon glows, or a second saturated accent.
- Don't replace the sun/moon mode toggle with a cryptic text label.
- Don't use straight quotes — always curly/smart quotes in visible copy.
- Don't second-person marketing voice ("You'll love…"); first-person maker voice
  only.
