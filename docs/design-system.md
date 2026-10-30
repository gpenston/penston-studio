# Penston Studio — Design System

> **The short version.** The site is an **instrument**, not an album cover. Bureau lineage: Dieter Rams / Braun / Eames Office via Walkie. Neutral canvas (flat white or near-black), one saturated accent, Hanken sentence-case chrome with a little mono meta, surface-tone cards instead of rules, restrained atmosphere. Keep the drama dialed down; let composition and typography carry the weight. Both palettes and the type, shape and interaction rules were ported from gpenston.com on 2026-10-29 (see its CLAUDE.md for the source of truth).

---

## 1. Voice & Tone

- **Confident, not marketing-fluffy.** "A one-person practice in product design and development." Not "I'm passionate about crafting delightful experiences."
- **Maker-first.** Written by the person who builds the things.
- **Editorial cadence.** Plain section headings, pullquotes, short meta chips. Reads like a trade journal, not a SaaS page. No numbered chapters, eyebrows or kickers (removed 2026-10-29 as AI tells).
- **Smart quotes.** `'` `"` — never straight `' "`.
- **Em dashes** — not hyphens — for parentheticals. Use sparingly; don't stack two in one sentence.

---

## 2. Color

### Dark mode (default, neutral since 2026-10-29)

```css
--bg-primary:     #0a0a0a;
--bg-secondary:   #141414;   /* card / panel */
--bg-tertiary:    #1c1c1c;   /* hover / pressed / selected */
--text-primary:   #ececea;
--text-secondary: #b3b3b3;
--text-tertiary:  #8f8f8f;   /* meta, 6.12:1 on bg-primary */
--border-light:   rgba(255,255,255,0.08);
--border-medium:  rgba(255,255,255,0.18);
--accent:         #eb5a00;   /* signal orange — fills, rings, icons */
--accent-text:    var(--accent);   /* 5.65:1 on bg-primary */
--accent-text-hover: #ff7a33;
--accent-cool:    #7aa9a3;   /* faded teal — <em> emphasis only */
--image-outline:  oklch(1 0 0 / 0.1);
--highlight:      rgba(64,220,228,0.52);  /* pullquote .hl — bright cyan wash */
```

### Light mode (flat white, 2026-10-29)

```css
--bg-primary:     #ffffff;
--bg-secondary:   #f6f6f5;
--bg-tertiary:    #ececea;
--text-primary:   #141414;
--text-secondary: #555555;
--text-tertiary:  #6b6b6b;   /* 5.33:1 on white, 4.93:1 on bg-secondary.
                                Not for use on bg-tertiary (4.51:1). */
--border-light:   rgba(20,20,20,0.08);
--border-medium:  rgba(20,20,20,0.18);
--accent:         #eb5a00;   /* same orange as dark: 3.50:1 on white */
--accent-text:    #b23f00;   /* rust: 5.83:1 on white, 5.39:1 on bg-secondary */
--accent-text-hover: #963500; /* 7.48:1 on white */
--accent-cool:    #3d6b68;
--on-accent:      #141414;   /* 5.26:1 on #eb5a00; white would be 3.50:1 */
--image-outline:  oklch(0 0 0 / 0.1);
--highlight:      rgba(0,175,190,0.30);
```

**2026-10-29 — flat white and neutral dark.** The greige (`#f2f1ec`, itself a
2026-07-21 repaint of the bone paper) still read as beige, and the warm
bone-on-black dark read as a different system next to gpenston.com. Both are
now neutral, matching the portfolio. Teal and orange hues are unchanged.
**`--accent` is not a small-text color in light mode**: use `--accent-text`
(and `--accent-text-hover`) for any body-sized orange, such as inline links and
`.cost-amount`. Measure after touching any of them: walk the rendered DOM and
compare each text node against its nearest painted ancestor, as in the
portfolio's CLAUDE.md. As of the port, axe reports 0 violations on all five
pages in both modes at 1280, 375 and 320px.

### Per-page accent overrides

- **Pour Over** (`[data-page="pourover"]`): amber. Dark: `--accent` and `--accent-text` `#f0a830`, hover `#f7c060`. Light has to be darkened well past the brand value (`#c88a1e` is only 2.95:1 on white): `--accent` `#b87a00`, `--accent-text` `#8a5a00` (5.93:1 on white, 5.48:1 on bg-secondary), `--accent-text-hover` `#6e4500`. Re-measure if the surfaces move.

### Rules

- **One accent at a time.** `--accent` is the only saturated color on the page.
- **`--accent-cool` is a whisper.** Use it for one word in a headline and nowhere else.
- **Background grid is default.** Every page has a faint dot grid (`background-size: 48px 48px`, white 8% in dark, ink 3.5% in light) over a worn graph-paper line grid. Fainter than before the port.
- **Paper grain is always on.** A `body::before` fixed pseudo-element adds a ~3% feTurbulence SVG grain for organic texture. Dark: 2.2%, Light: 1.8%. Never remove it.
- **No gradients.** The site is flat. (The old orange disc gradient and the hero horizon glow were removed in the June 2026 cleanup — don't reintroduce decorative gradients.)
- **Light mode is not dark-mode-inverted.** Recalibrate each token against its own surfaces, don't swap.
- **Studio texture stays.** The worn graph paper and atmosphere rays remain studio-only; the portfolio's dot grid and registration ticks are its own.

---

## 3. Typography

### Families

```css
--font-display: 'Hanken Grotesk', system-ui, sans-serif;  /* headlines, name */
--font-body:    'Hanken Grotesk', system-ui, sans-serif;  /* body, nav, buttons, footer */
--mono:         'Martian Mono', ui-monospace, monospace;  /* tiny meta only */
```

Both load via Google Fonts. **D-DIN Condensed was removed 2026-10-29** (and
`assets/fonts/D-DINCondensed-Bold.woff2` with it): it only styled section
numbers, the hero chapter marker and the footer `EST.` mark. When those went
it was a font loaded for nothing. Don't add a font without a rendered use.

Hanken does display, body **and chrome**. Martian Mono is for one-to-two-word
meta only.

### Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `hero-name` | `clamp(44px, 6.5vw, 84px)` | 800 | Home h1 — "George Penston" |
| `hero-headline` | `clamp(44px, 7vw, 84px)` | 800 | Product h1 — "Convert anything to Markdown." |
| `big-h2` | `clamp(36px, 6vw, 56px)` | 700 | Section headlines |
| `pullquote` | `clamp(22px, 3.2vw, 34px)` | 700 | Editorial pullquote (carries the highlight marker) |
| `section-heading` | `clamp(18px, 1.02rem + 0.45vw, 22px)` | 700 | `.section-label` (an `h2`) |
| `body-lead` | 17px / 1.55 | 400 | Hero bios, intro paragraphs |
| `body` | 16px / 1.6 | 400 | Long-form body, privacy and FAQ prose |
| `body-sm` | 14–15px / 1.5 | 400 | Card text, captions, footer |
| `control` | 15px | 500–600 | Nav links (500), buttons (600) |
| `meta` | 11px mono, 0.06em tracking, uppercase | 500 | Chips and file-type tags only |

### Rules

- **Display weight is 700–800.** Hanken reads lighter than the old Space Grotesk at matched weights, so hero display sits at 800, section headlines at 700, base headings at 600.
- **One emphasized word per headline.** Wrap it in `<em>` and it renders in `--accent-cool`, not italic.
  ```html
  <h2>Small and <em>considered</em>.</h2>
  ```
- **Mono is meta, not chrome.** One-to-two-word chips and file types (`macOS`, `DOCX`), inline `code`. Never a phrase, never a control. Nav, buttons, section headings, the footer and form labels are Hanken sentence case.
- **No numerals.** No `data-num`, no chapter marker, no plate or figure numbers.
- **The highlight marker (`.hl`, accent-cool) is reserved for the pullquote block** — the single expressive flourish per page. Don't scatter it per section.
- **`text-wrap: balance`** on headline-like elements (`h1`–`h6`, `.hero-name`, `.hero-headline`, `.big-h2`, `.pullquote`, `.callout-heading`, `.closing-cta-headline`, `.section-label`); **`pretty`** on prose. Button labels are `nowrap`. Cap big type in `px`, never `ch`, and avoid hard `<br>`s. Where a break matters, wrap the tail in `.nowrap` (applies from 640px up).
- **Line height by role:** lead 1.55, long-form body 1.6, 15px small text 1.5.
- **11px is the floor.** No text goes below 11px. `--text-tertiary` clears WCAG AA (4.5:1) on `--bg-primary` and `--bg-secondary`.

> **Type direction.** Chapter 03 (Hanken Grotesk + Martian Mono + D-DIN) was resolved 2026-07-10. D-DIN and the mono-everywhere chrome were dropped in the 2026-10-29 pass; see `DESIGN.md`.

---

## 4. Layout

### Container

```css
.container { max-width: 880px; margin: 0 auto; padding: 0 32px; }
```

880px is deliberate — narrower than a blog (1024+), wider than a product page column (640). Gives the site the proportion of a trade paperback.

### Vertical rhythm

- Sections use `.section-block` (`padding-top: 64px`, 48px under 600px). Whitespace is the only separator: no rules, dividers or numbering.
- Heading to content is 16px.
- Between paragraphs: 1.2em.
- Never use `<br>` for spacing — use margins.

### Grid

- CSS Grid for anything with structural alignment (spec-rows, plate-grid, unified-bar).
- Flex for inline clusters (unified-actions, app-identity, cta-group, works-with-prose).
- Don't use Bootstrap-style 12-column grids.

### Responsive (max-width: 600px)

- Plates collapse to single column.
- **Sticky chrome back-link:** text hidden on mobile — glyph (`//` or `<`) only. Product switcher labels remain visible. This prevents the "PENSTON STUDIO" label from wrapping to two lines.
- No hamburger menu — nav is always visible.
- `main { overflow-x: visible }` on mobile allows product-showcase full-bleed. The `.instr-hero` has its own `overflow: hidden` to contain the disc ornament.

### iOS Safari / safe area

All pages include `viewport-fit=cover` in the viewport meta and `theme-color` meta tags (dark + light variants). The `.sticky-chrome` uses `padding-top: env(safe-area-inset-top)` to extend behind the status bar on notched devices.

**iOS 26 Safari — sticky chrome fix (confirmed working).** Safari 26 introduced a "liquid glass" translucent browser chrome that composites *over* page content. Without a fix, page content peeks through the browser toolbar. The confirmed workaround is a `::before` pseudo-element on `.sticky-chrome` that forces Safari to paint the safe-area strip as part of the element's own box:

```css
.sticky-chrome {
  position: sticky;
  top: 0;
  z-index: 9999;                          /* must be high — 9999, not 100 */
  padding-top: env(safe-area-inset-top, 0px);
  background: var(--bg-primary);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}
.sticky-chrome::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  z-index: -1;
  pointer-events: none;                   /* CRITICAL — without this, the overlay
                                             eats clicks to buttons on desktop */
}
```

Key points:
- `position: sticky` is correct. `position: fixed` does **not** help with this Safari 26 bug.
- The `::before` with `background: inherit` forces Safari to repaint the padding-top region as part of the element's own box, closing the compositor gap that lets content bleed through.
- `z-index: 9999` (not 100) ensures the chrome always sits above product showcase frames.
- `pointer-events: none` on `::before` is non-negotiable. The pseudo-element is `position: absolute; inset: 0` — without it, it covers the entire chrome area and silently eats clicks to the mode toggle button on desktop browsers.
- `backdrop-filter` is kept for the frosted-glass effect — it doesn't conflict with the `::before` fix.

**iOS 26 Safari — toolbar tint on mode toggle (unresolvable).** The toolbar tint color (the status-bar zone above the sticky chrome) is correct on initial page load but does **not** update when the user manually toggles light/dark mode via the site's toggle. This is a confirmed hard Safari 26 limitation. We exhausted every known approach: inline `style.backgroundColor` overrides on fixed elements, CSS `[data-mode]` cascade, `color-scheme` property, `theme-color` meta updates, micro-scroll triggers. None cause Safari to re-composite the toolbar tint dynamically. It only updates on page navigation. Accepted as a known limitation — do not spend more time on this.

The following are in place as belt-and-suspenders for other browsers and to be ready if Apple ever exposes a dynamic tint API:
- `#safari-toolbar-tint` div in each page `<body>` — `position: fixed`, `height: env(safe-area-inset-top)`, colored via `[data-mode]` CSS selectors, `pointer-events: none`.
- `color-scheme: dark/light` on `:root` via `[data-mode]` CSS selectors.
- `theme-color` meta tags kept in sync via the inline `<head>` script and `syncThemeColor()` in `site.js`.

**`theme-color` meta tag is ignored by Safari 26.** Keep the metas for Chrome/Firefox correctness.

---

## 5. Components

### Unified bar (sticky nav — all pages)

A single `position: sticky` `<header class="sticky-chrome">` (a landmark) shared across all pages. CSS Grid `1fr auto 1fr` keeps the centre content anchored while the left and right slots adapt per page. No bottom rule.

```html
<header class="sticky-chrome">
  <div class="unified-bar">
    <!-- Left: home = scroll-to-top anchor; product pages = back-link -->
    <a href="#" class="nav-mark" aria-label="Penston Studio — scroll to top">
      <svg class="nav-glyph"><!-- // glyph --></svg>
      <span class="nav-text">Penston Studio</span>
    </a>
    <!-- Centre: home = empty div; product pages = .product-switcher; notes = .page-util-links -->
    <div aria-hidden="true"></div>
    <!-- Right: mode toggle -->
    <div class="unified-actions"><!-- mode-toggle button --></div>
  </div>
</header>
```

The wordmark is Hanken 15px/600 in `--text-primary`. **On product pages** the left slot is a back-link (`<a class="back-link nav-mark" aria-label="Penston Studio">`) with a chevron glyph and `<span class="back-link-text nav-text">`. The label is on the link because the text is hidden at ≤600px.

**Navigational controls are 8px rects** (switcher items, util links, back link, mode toggle). Hover and selected are instant (`transition: none`, overriding the global `a` colour transition), pressed uses the selected tone. On coarse pointers a pseudo-element extends each target to ~44px.

The chrome sits outside `main`, so it stays still between pages while the content fades in (see §6).

### Product switcher (product pages only)

```html
<ul class="product-switcher">
  <li class="product-switcher-item is-active">
    <span>
      <img class="product-switcher-icon" src="...">
      <span class="product-switcher-label">Markedly</span>
    </span>
  </li>
  <li class="product-switcher-item">
    <a href="../pour-over/">
      <img class="product-switcher-icon" src="...">
      <span class="product-switcher-label">Pour Over</span>
    </a>
  </li>
</ul>
```

Items are Hanken 15px/500 in 8px rects. The active item is a `<span>` (not a link) on the `--bg-tertiary` tone, non-interactive. Inactive items are `<a>` links: hover `--bg-secondary`, pressed `--bg-tertiary`. Labels are text only.

### Mode toggle — flat sun/moon icon button

A flat icon button — no track, thumb, or skeuomorphic depth (the old Dieter Rams I/O pill was removed in the June 2026 cleanup as out of place). CSS-driven entirely from `[data-mode]` on `<html>`: the button shows the icon of the mode you'll switch *to* — the sun in dark mode (tap for light), the moon in light mode (tap for dark). 32px, 8px radius, `--text-secondary` resting, `--text-primary` on a `--bg-secondary` rect on hover (instant), `--bg-tertiary` pressed. A tooltip appears after a 0.6s hover delay.

```html
<button class="mode-toggle" type="button" aria-label="Toggle color mode" data-mode-toggle>
  <span class="mode-toggle-i" aria-hidden="true"><!-- sun SVG  — shown in dark mode --></span>
  <span class="mode-toggle-o" aria-hidden="true"><!-- moon SVG — shown in light mode --></span>
</button>
```

- **Dark mode active:** sun icon visible (`.mode-toggle-i` shown, `.mode-toggle-o` hidden).
- **Light mode active:** moon icon visible (`.mode-toggle-o` shown, `.mode-toggle-i` hidden).
- **Tooltip:** CSS `::after` on `.mode-toggle` — content set via `:root[data-mode]` attribute selector. Hanken 13px, right-aligned, fades in after 0.6s.
- **Click sound:** `playClick()` in `site.js` fires on toggle — keep it.
- **FOUC prevention:** Inline `<script>` in `<head>` reads `localStorage['ps_mode']`, falls back to `prefers-color-scheme`, sets `data-mode` synchronously before any paint.

### Hero atmosphere (home only)

Two quiet decorative elements — both `position: absolute`, `pointer-events: none`, `z-index: 0` — inside `.instr-hero` which has `overflow: hidden` to contain them. (The heavy orange `.disc-mark` sphere, the `.atm-horizon` line + gradient glow, and the `.coffee-ring` stain were all removed in the June 2026 cleanup as decorative noise.)

- **`.disc-ring`** — ~120px thin border circle, top-right. Reads as a single deliberate mark now that the disc is gone.
- **`.atm-rays`** — SVG star-burst of thin lines (accent stroke), top-right, extends slightly beyond.

Both animate when `prefers-reduced-motion: no-preference` — see §6 Motion.

### Portfolio link (home only)

A tertiary pill button ("Full portfolio") below the hero bio, pointing to `gpenston.com`. No arrow.

### Buttons

Two tiers, both pills (`a.pill-btn`), Hanken 15px/600, `nowrap`, symmetric `9px 18px` padding. **Primary** (`.pill-btn-primary`): solid ink pill, `--text-primary` fill, `--bg-primary` label, hover mixes the fill 10% toward the page. **Tertiary** (`.pill-btn-tertiary`): hairline pill (`--border-medium`) in both modes, `--bg-secondary` on hover. Press is `scale(0.97)` over 150ms, `transform` only, off under reduced motion. The old accent-filled `.btn-primary`, text-only `.btn-secondary` and tinted `.pill-btn-secondary` were retired. A button never carries an arrow; the Mac App Store badge keeps its own `:active` press.

### Project card (home)

Icon tile, name + description, platform chip. A 4px-radius card on `--bg-secondary`, no border, no shadow, no lift. Hover and press step to `--bg-tertiary` in 150ms and draw a 1px underline under the name (`background-size: 0% → 100%`, since `text-decoration` doesn't animate). No arrow: internal cards don't get one.

### Section heading

```html
<h2 class="section-label" data-reveal>The Studio</h2>
```

An ordinary `h2` (so heading order is valid), Hanken 700 on the section-heading step, 16px above its content. No numeral and no drawn rule. The class name is kept for the reveal and selector history.

### Big H2 (section headline)

Hanken Grotesk, weight 700, `clamp(36px, 6vw, 56px)` (see §3 Scale — `big-h2`), `text-wrap: balance`, `max-width: 640px`. Usually has one `<em>` word in `--accent-cool`. No hard breaks.

### Feature tiles (product features)

`.features` is a 2-up grid with a 12px gap. Each `.feature` is a 4px-radius card on `--bg-secondary` (28px padding): a 24px `--accent` icon, a Hanken subhead, a 15px/1.5 paragraph. No hairlines, no borders.

### Inline links

Links in body copy use a consistent treatment:
- Default: `--accent-text` color, underline
- Hover: `--accent-text-hover`, wider offset
- Active: slight opacity drop
- Never `--accent` for text in light mode (3.50:1).

### Plate / device frame

Every product screenshot sits in a `.plate` with an optional plain-text caption beneath (`.plate-cap`, Hanken 14px, no rule). **No plate numbers** (`PL. 01` is gone). Plates come in two sizes: `.plate-hero` (full-width) and `.plate-small` (grid cell). Real-desktop captures use `.device-photo` (4px radius, inset `--image-outline`); app mocks use `.device-macbook` / `.device-iphone` / `.device-ipad` with a 1px `--border-medium` bezel and an inset-outlined screen. Images carry the outline instead of a border. On mobile the macbook bezel strips away to a clean full-bleed screenshot.

### Pullquote

Editorial quote block with `.hl` spans highlighting key phrases. Used once per page max. The `.hl` background is a semi-transparent cyan wash — it draws in from left to right on scroll-reveal (background-size animation), with a staggered delay for the second span.

```html
<p class="pullquote">
  Markdown is the plain-text format that
  <span class="hl">Obsidian, Bear, and Notion natively speak</span>.
</p>
```

### Works With

A 3-up grid (2-up on mobile) of `.ww-item` cards on `--bg-secondary`, 12px gap, 4px radius. Each holds a 38px real app icon (inset `--image-outline`) and the name in Hanken 500.

### FARA card

Signature block near the footer of Markedly and Pour Over: a `--bg-secondary` card (4px radius, no accent bar, no label above the heading) with a heading, a short paragraph and a tertiary "Donate to FARA" pill. Communicates the donation-link commitment. Never removed, never shortened.

---

## 6. Motion

Page entrance and scroll-reveal are **shared with gpenston.com**. Both sites run the same runtime (`assets/reveal.js` here and `public/reveal.js` there, byte-identical) and the same CSS block. Change one, change both. Then run `node scripts/test-motion.mjs`, which checks both sites in Chromium and WebKit and confirms the two `reveal.js` copies match.

### Page entrance

`main` fades up on every page load: `opacity: 0; translateY(8px)` → normal, 360ms `cubic-bezier(0.16, 1, 0.3, 1)`, fill `backwards`. It's pure CSS, so it plays at first paint with no JS. The chrome and footer sit outside `main` and don't move.

### Scroll-reveal

- **`[data-reveal]`** fades up 24px over 600ms `cubic-bezier(0.21, 0.47, 0.32, 0.98)` once it's 64px inside the viewport. Optional inline `--reveal-delay` (hero: `0.05s / 0.1s / 0.2s / 0.25s`; catalogue cards: `0.1s + 0.08s` per card). Also optional: `--reveal-x`/`--reveal-y` to change the direction.
- **`[data-reveal-trigger]`** doesn't fade itself; it only stages descendants. Used for the pullquote highlighter.
- **`data-reveal-amount="0.6"`** waits until that fraction is visible instead of the 64px margin. The pullquote uses it so the highlighter draws while you're looking at it.
- `reveal.js` sets **`data-revealed`** once and never removes it. It also watches for elements added later (the portfolio's client-side navigation).

**Visible is the default.** Every hidden state:
- is gated on `html.js`. The inline `<head>` script adds it and drops it after 3s if `reveal.js` never sets `.reveal-live`.
- is written as `:not([data-revealed])`, never as a hide rule plus a later "show" override. In Sep 2026 a gated hide rule outranked `.is-revealed` on specificity and blanked the first page of every session.

The reveal is a CSS animation with `backwards` fill, not a transition, so it never overrides a component's own hover `transition`/`transform` (e.g. `.project-card`).

### Pullquote highlight draw

`.pullquote .hl` is `background-size: 0% 72%` until the pullquote is revealed at 60% visibility. It draws to `100% 72%` over 800ms `cubic-bezier(0.16, 1, 0.3, 1)` with a 300ms delay, and the second span waits an extra 250ms.

### Reduced motion

Fades stay, movement goes: `main` and reveals switch to opacity-only keyframes (`page-enter-fade`, `reveal-fade`), and the hairline and highlighter render drawn. Same on both sites.

### Hero atmosphere (home only)

Two ambient animations, both gated on `prefers-reduced-motion: no-preference`:

- **`.disc-ring`** — `ring-orbit`: rotates 360° over 70s linear, infinite.
- **`.atm-rays`** — `rays-drift`: counter-rotates 360° over 360s linear, infinite.

### Closing CTA icon float (product pages)

`.closing-cta .app-icon` floats `translateY(0)` → `translateY(-6px)` → back, 4s ease-in-out infinite. Gated on `prefers-reduced-motion: no-preference`.

### Page navigation — switcher-only view transition

`@view-transition { navigation: auto; }` with the root hard-cut (`animation: none`). Only `.product-switcher` has a `view-transition-name`, so between product pages the active pill cross-fades over 200ms, matching gpenston.com's persistent header (`.nav-link { transition: color 0.2s, background 0.2s }`). Home has no switcher, so it fades in or out. `main`'s CSS entrance plays underneath the hard-cut root.

- Don't name the root or anything inside `main`. A whole-page crossfade raced the reveal cascade through three rounds of patches in Sep 2026.
- `html.vt-mode .product-switcher` drops the name so the mode wipe stays one layer.
- Don't give the nav glyph its own name (old/new bitmap overlap bug).
- Browsers without cross-document support swap instantly.

### General rules

- **Hover transitions are 150–200ms.** Anything longer feels slow.
- **No scroll-jacking, parallax, or scroll-tied animation.** The page scrolls like a document.
- **`prefers-reduced-motion: reduce` removes all movement and drawing.** Fades stay (opacity only), matching gpenston.com. Decided 2026-09-24; the older rule was "no animation at all."
- **The atmosphere (ring + rays) is the only ambient animation on home.** Don't add floating particles, gradient sweeps, or breathing elements elsewhere.
- **Mode toggle transition is 200ms `cubic-bezier(0.4, 0, 0.2, 1)`.** Applies to thumb translate, icon slide, and track background.

---

## 7. Iconography

- **Remixicon via CDN** for feature icons. `<i class="ri-drag-drop-line"></i>`.
- **Arrows earn their place.** Only external links (`ri-arrow-right-up-line` in the footer and support list) and directional pagers. No button, internal card or row carries one.
- **No emoji.** The mono-label style covers anywhere you'd be tempted.
- **Never draw proprietary logos in SVG.** Use Remixicon's brand glyphs (`ri-github-line`) or real asset files.

---

## 8. Imagery

- **Product shots live at `assets/<app>-shot-<role>.png`.** Naming convention: `markedly-shot-open`, `markedly-shot-drag`. Always inside a device frame.
- **App icons live at `assets/<app>-icon.png`.** Rounded-square, always 120×120px or larger source.
- **Works With icons live at `assets/app-icon-<name>.jpg`.** Real app icons, not drawn substitutes.
- **Badges** (App Store, GitHub): keep vendor-provided SVGs in `assets/`. Don't redraw.
- **Image edges are an inset 1px `--image-outline`,** not a border (pure black/white at 10%, never a tinted neutral).
- **If an image doesn't exist, use a dashed placeholder** with a caption `(PLACEHOLDER)`. Never ship a half-drawn SVG mockup.

---

## 9. Code Hygiene

- **No build step. No framework.** Plain HTML, one CSS file, one JS file.
- **One `assets/style.css` with clear section banners** in declaration order: tokens, reset, typography, chrome, components, utilities, responsive, motion.
- **One `assets/site.js`** for mode toggle, scroll-reveal, and any small interactive bits. No modules, no imports.
- **JS is defensive.** Every query wrapped in null checks. Feature-detect `IntersectionObserver`. Always provide a fallback.
- **`?v=N` cache-busters on CSS/JS links** are incremented in committed code on every change to force fresh loads on Vercel's CDN edge. When making changes, bump the version in all five HTML pages (home, Markedly, Pour Over, and the two notes).
- **CSS custom properties for all theme-able values.** No hardcoded hex in components.
- **Avoid `!important`.** If you need it, your selector order is wrong.
- **All three pages get the same `<head>` meta additions** — viewport-fit, theme-color, etc. Don't update one and forget the others.

---

## 10. Tokens at a glance

```css
:root {
  --font-display: 'Hanken Grotesk', system-ui, sans-serif;
  --font-body:    'Hanken Grotesk', system-ui, sans-serif;
  --mono:         'Martian Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* Space */
  --container-max: 880px;
  --container-pad: 32px;

  /* Radius tiers: 4 content/media, 8 controls and hover surfaces, 999px pills */
  --r-sm: 4px;
  --r-md: 8px;

  /* Motion */
  --t-fast: 150ms ease-out;
  --t-med:  300ms ease-out;
  --t-slow: 600ms ease-out;
}
```

---

## 11. Don't do this

- Don't add a system rail / status bar at the top of pages. We tried it — it added visual noise without earning its keep.
- Don't add a gradient hero background — or any decorative gradient. The site is flat (June 2026 cleanup).
- Don't bring back the orange hero disc, the hero horizon line/glow, the coffee-ring stain, or the skeuomorphic sliding mode switch. They were removed deliberately.
- Don't put shadows on the catalogue cards — the hover state is flat (a step in surface tone), never a drop-shadow.
- Don't use Inter Tight, Satoshi, General Sans, or any "designer" substitute for Hanken Grotesk — they're all trying too hard.
- Don't make the accent orange darker "to be tasteful." The orange is the signal. (Small orange *text* in light mode is the exception: it uses the rust `--accent-text`.)
- Don't reintroduce eyebrows, kickers, `data-num` numbering, chapter numerals, plate/figure numbers, the drawn section rule, hairline dividers or image borders (all removed 2026-10-29).
- Don't set nav, buttons, section headings, the footer or form labels in uppercase mono. Mono is for one-to-two-word meta.
- Don't put a pill on navigation, or an 8px rect on an action button.
- Don't add a third button tier or an arrow to a button.
- Don't add D-DIN (or any font) back without a rendered use.
- Don't add a "Get in touch" CTA section. There's LinkedIn in the footer, that's enough.
- Don't put a newsletter signup anywhere.
- Don't write copy in second-person marketing voice ("You'll love…"). First-person maker voice only ("I build…").
- Don't add emoji, even in the README.
- Don't put utility links (Support, Privacy, back-link) in the nav. They live in the unified bar / product-switcher.
- Don't use the same accent colour for pullquote highlights as for links. The `.hl` is a cyan wash, not orange.
- Don't widen the page-navigation view transition beyond `.product-switcher`, and don't bring back once-per-session reveal gates. See §6 "Page navigation."
- Don't hide reveal content with a rule that a later "revealed" rule must override. Write the hidden state as `:not([data-revealed])`. See §6 "Scroll-reveal."
- Don't edit `assets/reveal.js` without making the same change to gpenston-portfolio's `public/reveal.js`.
- Don't use `position: fixed` for `.sticky-chrome` — the iOS 26 Safari bleed-through fix requires `position: sticky`. See §4 for the full pattern.
- Don't remove `pointer-events: none` from `.sticky-chrome::before` — the pseudo-element covers the entire chrome area and will silently eat button clicks without it.
- Don't assume `theme-color` meta controls toolbar colour on iOS 26 Safari — Apple dropped that support. Keep the metas for other browsers.
- Don't try to fix the toolbar tint not updating on mode toggle — we exhausted every known approach. It's a confirmed iOS 26 Safari hard limit. See §4.
- Don't wrap `playClick()`'s `src.start()` in `ctx.resume().then()` — the original synchronous pattern is what works across all browsers. Any "fix" that adds async resume breaks Safari desktop audio.

---

## 12. Extending this system

When adding a new product page or section:

1. Start with the page chrome: `<header class="sticky-chrome">` with unified-bar (back-link glyph + nav-text + product-switcher + mode toggle).
2. Hero: app-identity block (icon + name + platform), headline, sub, CTA group (one primary pill at most).
3. Product showcase: plates with device frames (skip if no screenshots yet).
4. "The idea": a `.section-label` `h2` plus the pullquote, one per page.
5. "What it does": a `.section-label` `h2` plus `.features` tiles.
6. "Works with": a `.section-label` `h2` plus the `.works-with-row` grid.
7. FARA card (Markedly only).
8. Support section (+ Privacy if App Store app — Privacy before Support in both nav and page order).
9. Footer.

Sections take `class="section-block"`, not inline padding, and are never numbered.

Not every section is required, but they should appear **in this order** when present. The narrative is: *what is it → show me → the idea → what does it do → how does it fit my world → who's behind it → where do I go next.*

---

## 13. Cross-site theme handshake (added 2026-07-21)

gpenston.com (the sister portfolio, Next.js) and penston.studio each persist
their mode choice independently — `localStorage['theme']` on the portfolio,
`localStorage['ps_mode']` here — and `localStorage` doesn't cross origins.
Without help, a visitor who sets dark mode on one site lands cold (OS-default)
on the other. The fix is a lightweight query-param handshake, no shared
infrastructure required:

- **Outbound.** Every link to `https://gpenston.com` (footer, nav, product
  pages) gets a click handler in `assets/site.js` (`wire()`) that appends
  `?theme=<mode>` to the href just before the browser navigates, reading the
  live `document.documentElement.dataset.mode`.
- **Inbound.** Each page's blocking `<head>` script (the one that already
  prevents FOUC) checks `location.search` for a `theme` param *before*
  deciding the mode. If present and valid, it writes to `localStorage['ps_mode']`,
  strips the param via `history.replaceState` (so a reload or bookmark
  doesn't re-force it), and only then falls through to the normal
  stored-preference / OS-preference logic.
- The portfolio implements the mirror image: `lib/cross-site-theme.ts`
  (`appendThemeParam`) wired onto its two outbound links (Footer, About), and
  the same read-strip-apply sequence prepended to its FOUC-prevention script
  in `app/layout.tsx`.
- **Why a query param and not a shared cookie:** no common parent domain
  exists between `gpenston.com` and `penston.studio`, so a cross-site cookie
  isn't an option without extra infrastructure. The query-param handshake
  needs nothing beyond the links that already exist between the two sites.
- Applies only to the sites' own cross-links — following an external
  search-engine or social link with a stray `theme=` param would be
  harmless (falls through to normal logic if the value isn't exactly
  `"dark"` or `"light"`).
