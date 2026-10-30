---
version: alpha
name: Penston Studio — Bureau
description: >-
  Personal studio and side-project site for George Penston. An instrument, not
  an album cover: a neutral near-black (or flat white) canvas, one signal-orange
  accent, humanist-grotesk type, a little monospaced chrome, and surface-tone
  cards instead of rules. Dieter Rams / Braun / Eames Office lineage.
colors:
  primary: "#eb5a00"
  primary-text-light: "#b23f00"
  primary-text-hover-light: "#963500"
  accent-cool: "#7aa9a3"
  surface: "#0a0a0a"
  surface-raised: "#141414"
  surface-overlay: "#1c1c1c"
  on-surface: "#ececec"
  on-surface-muted: "#b3b3b3"
  on-surface-faint: "#8f8f8f"
  border-subtle: "rgba(255,255,255,0.08)"
  border: "rgba(255,255,255,0.18)"
  on-primary: "#0a0a0a"
  light-surface: "#ffffff"
  light-surface-raised: "#f6f6f5"
  light-surface-overlay: "#ececec"
  light-on-surface: "#141414"
  light-on-surface-muted: "#555555"
  light-on-surface-faint: "#6b6b6b"
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 84px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.022em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.015em
  section-heading:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.015em
  title:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lead:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.4
  meta:
    fontFamily: Martian Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.06em
rounded:
  sm: 4px
  md: 8px
  full: 999px
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 64px
  container-pad: 32px
  container-max: 880px
components:
  button-primary:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.full}"
    padding: 9px 22px
  button-tertiary:
    backgroundColor: transparent
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.control}"
    rounded: "{rounded.full}"
    padding: 9px 18px
  nav-link:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  project-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 22px
  project-card-hover:
    backgroundColor: "{colors.surface-overlay}"
  section-heading:
    textColor: "{colors.on-surface}"
    typography: "{typography.section-heading}"
  feature-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 28px
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
let composition, typography, and one saturated accent do the talking. Real icons
and a hand-drawn highlight survive alongside a little technical chrome, and the
background carries a faint drafting-table texture.

**2026-10-29 pass (ported from gpenston.com).** Both sites were de-slopped
together: the greige light theme became flat white, the warm bone-on-black dark
theme became neutral, and the devices that read as AI tells were removed —
eyebrows and kickers, numbered section labels and chapter numerals, hairline
dividers and image borders. Whitespace separates sections; surface tone groups
cards. Nav, buttons, section headings, footer and form labels are Hanken
sentence case; Martian Mono is kept only for tiny meta.

The site is **dual-mode**. Dark is the default; light is flat white. Mode is a
manual toggle (sun/moon), persisted locally, applied before paint to avoid a
flash.

The site is also **theme-aware of its sister site**, gpenston.com. Outbound
links to the portfolio append `?theme=dark|light` for whichever mode is
active; the receiving site reads it on load, adopts it, and strips the param.
The reverse holds too — arriving here via a themed link from the portfolio
sets `ps_mode` before paint. See §5 Components → "Mode toggle" below and
`docs/design-system.md` §13.

## Colors

Neutral grays with a single evocative accent. Values below are the **dark
(default) theme**; the light theme remaps the same roles (see end of section).

- **Primary — Signal Orange (#eb5a00):** The sole accent, identical in both
  modes. It is a fill, ring and icon color. **It is not a small-text color on
  light** (3.50:1 on white): body-sized orange text uses `--accent-text`, which
  is the rust `#b23f00` in light (5.83:1 on white) and aliases `--accent` in
  dark (5.65:1 on `#0a0a0a`). Hover partner is `--accent-text-hover`
  (`#963500` light, `#ff7a33` dark).
- **Accent Cool — Muted Teal (#7aa9a3):** A secondary, quieter emphasis. Drives
  the one-word headline emphasis and the pullquote highlight marker. Light
  mode: `#3d6b68`.
- **Surface — Near-Black (#0a0a0a):** The page background. Raised (`#141414`)
  and overlay (`#1c1c1c`) layers carry cards and chips.
- **On-Surface (#ececec):** Primary text and headlines.
- **On-Surface Muted (#b3b3b3):** Body copy asides, secondary text.
- **On-Surface Faint (#8f8f8f):** Meta and metadata. 6.12:1 on the page.
- **Borders:** white at 8% (subtle) and 18% (medium) alpha. Used on the hairline
  tertiary button and device bezels only; nothing is boxed or ruled.
- **Image outline:** an inset 1px `oklch(1 0 0 / 0.1)` (dark) or
  `oklch(0 0 0 / 0.1)` (light) painted over images instead of a border. Pure
  white or black, never a tinted neutral.

**Light theme (flat white, 2026-10-29):** surface `#ffffff` / `#f6f6f5` /
`#ececec`, on-surface `#141414`, muted `#555555`, faint `#6b6b6b` (5.33:1 on
white, 4.93:1 on raised, 4.51:1 on overlay, so keep it off the overlay tier),
borders `rgba(20,20,20,0.08 / 0.18)`, `--on-accent` `#141414`. **Per-page
accent override:** Pour Over swaps Primary to amber, `#f0a830` in dark. Light
amber had to be darkened well past the brand value (`#c88a1e` is 2.95:1 on
white): fill `#b87a00`, text `#8a5a00` (5.93:1 on white, 5.48:1 on raised),
hover `#6e4500`.

## Typography

Two families, each with a strict job.

- **Hanken Grotesk — display, body, and chrome.** A humanist grotesque with a
  tall, even x-height. It carries the poster-scale hero name (800), long-form
  body (400), and, since the 2026-10-29 pass, nav links (15px/500), button
  labels (15px/600), section headings (18–22px/700), the footer and form
  labels, all in sentence case.
- **Martian Mono — meta only.** One-to-two-word chips and file-type tags
  (`macOS`, `GitHub Action`, `DOCX`), inline `code`. Uppercase with 0.06em
  tracking. **Mono is a label face: never a phrase, never a control.** Set a
  sentence in it and the page reads as a spec sheet.

**D-DIN Condensed was removed 2026-10-29.** It only styled the section numbers,
the hero chapter marker and the footer "EST." mark. Once those went it was a
font loaded for nothing. Don't add a font without a rendered use.

Line height by role: intro/lead 1.55, long-form body 1.6, 15px small text 1.5.
`text-wrap: balance` on headline-like elements, `pretty` on prose; button
labels are `nowrap`. Cap big type in `px`, never `ch` (the unit is measured in
the element's own font and under-sizes large type).

Hero display sizes are fluid (`clamp`); the token values above are the upper
bound. One emphasized word per headline, set in Accent Cool (not italic).

## Layout

A single **fixed-max-width column** (880px) centered in the viewport, with 32px
horizontal padding that collapses on mobile. Spacing follows a 4pt scale;
sections are separated by 64px (48px on mobile) of whitespace and nothing else:
no rules, no numbering, no eyebrows.

Groups sit on surface tone. Feature tiles, Works With items, the callout and
support links are `--bg-secondary` cards with a 4px radius, 12px apart, and no
borders. The background is a 48px dot grid layered over a faint worn
graph-paper grid, kept very subtle (fainter in light).

## Elevation & Depth

Essentially flat. Hierarchy comes from **tonal layering** (surface → raised →
overlay) and type scale, not drop shadows or borders. Cards sit on the raised
tone; hover steps them to the overlay tone in 150ms, with no lift. A fixed,
pointer-events-none grain overlay (~2% opacity) and a faint hero starburst/ring
add atmosphere without depth.

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

Three radius tiers: **4px** for content and media (images, plates, cards,
tiles, code, device mocks), **8px** for controls and hover surfaces (nav links,
mode toggle, chips, back link), and full-round for pills, avatars and dots.
App icons that ship their own baked-in shape are masked to a squircle rather
than double-framed.

**Navigational interactive elements are 8px rects; actions are pills.** Don't
mix them: a pill on a nav link or a rect on a CTA breaks the rule.

## Components

- **Buttons.** Two tiers, both pills, Hanken 15px/600, nowrap, symmetric padding
  (no button carries an arrow). *Primary:* a solid ink pill (`--text-primary`
  fill, `--bg-primary` label; hover mixes 10% toward the page). *Tertiary:* a
  hairline pill (`--border-medium`) in both modes. Press is `scale(0.97)` over
  150ms, `transform` only, off under reduced motion. The Mac App Store badge is
  used verbatim.
- **Nav links, product switcher, back link, mode toggle.** 8px rects. Hover is
  instant (no transition: they are crossed constantly, and the global `a` color
  transition is overridden); pressed and selected share the `--bg-tertiary`
  tone. The active switcher item is a non-interactive filled `span`.
- **Project cards (home).** Icon, name, description and a mono chip on the
  raised tone, 4px radius. Hover steps to the overlay tone and draws an
  underline under the name. No arrow: arrows are kept for external links.
- **Feature tiles.** Raised-tone cards (4px radius, 12px gap): icon, Hanken
  subhead, one short paragraph.
- **Section heading.** A plain `h2`: Hanken 700 on the 18–22px step, 16px above
  its content. No numeral, no rule.
- **Callout.** A raised-tone card, no accent bar.
- **Mode toggle.** Sun/moon icons (Remixicon) with an opacity+rotation
  crossfade; reduced-motion falls back to opacity only. Drives `[data-mode]` on
  `<html>`. The switch triggers a same-document View Transition: a soft, wide
  gradient band sweeps the new mode in — darkness descending from the top
  ("nightfall") when switching to dark, light rising from the bottom
  ("sunup") when switching to light. See Motion above.
  **Cross-site handshake:** outbound links to gpenston.com pick up the active
  mode via a `?theme=` query param on click; the reverse also holds. See
  `docs/design-system.md` §13.
- **Highlight.** A hand-drawn marker highlight (Accent Cool) reserved for the
  pullquote block only.
- **Touch.** On coarse pointers a pseudo-element extends nav, toggle and footer
  targets to ~44px under the unchanged visible shape.

## Do's and Don'ts

- Do use Signal Orange as a fill, ring or icon, and `--accent-text` for any
  orange text.
- Do separate sections with whitespace and group with surface tone.
- Do keep the highlight marker to the pullquote block.
- Do keep mono to one-to-two-word meta; everything that reads as a sentence or
  a control is Hanken.
- Do maintain WCAG AA contrast (4.5:1 for normal text). Walk the rendered DOM
  rather than trusting token names.
- Do paint image edges with the inset `--image-outline`.
- Don't reintroduce eyebrows, kickers, numbered sections, chapter numerals,
  figure or plate numbers, section rules, or hairline dividers.
- Don't put a pill on navigation or a rect on a CTA.
- Don't add arrows to buttons, cards or rows. External links and directional
  pagers only.
- Don't put a live CSS `filter` on a fixed full-viewport layer (see CLAUDE.md).
- Don't use pure black, gradients, neon glows, or a second saturated accent.
- Don't use straight quotes — always curly/smart quotes in visible copy.
- Don't use a second-person marketing voice ("You'll love…"); first-person
  maker voice only.
