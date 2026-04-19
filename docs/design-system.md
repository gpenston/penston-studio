# Penston Studio — Design System

> **The short version.** The site is an **instrument**, not an album cover. Bureau lineage: Dieter Rams / Braun / Eames Office via Walkie. Monochrome canvas, one saturated accent, tabular mono numerics, numbered chapter headings, restrained atmosphere. Keep the drama dialed down; let composition and typography carry the weight.

---

## 1. Voice & Tone

- **Confident, not marketing-fluffy.** "A one-person practice in product design and development." Not "I'm passionate about crafting delightful experiences."
- **Maker-first.** Written by the person who builds the things.
- **Editorial cadence.** Numbered chapters (`01 —`, `02 —`), pullquotes, system labels. Reads like a trade journal, not a SaaS page.
- **Smart quotes.** `'` `"` — never straight `' "`.
- **Em dashes** — not hyphens — for parentheticals. Use sparingly; don't stack two in one sentence.

---

## 2. Color

### Dark mode (default)

```css
--bg-primary:     #0c0b08;   /* near-black, warm */
--bg-secondary:   #17150f;   /* card / panel */
--bg-tertiary:    #1f1c14;   /* inset / hover */
--text-primary:   #e8e2cf;   /* bone / cream */
--text-secondary: #9c9687;   /* muted */
--text-tertiary:  #5a5547;   /* labels, system chrome */
--border-light:   #1f1c14;
--border-medium:  #2a2620;
--border-rule:    #e8e2cf;
--accent:         #eb5a00;   /* signal orange */
--accent-hover:   #ff7a2e;
--accent-cool:    #7aa9a3;   /* faded teal — used for <em> emphasis only */
--highlight:      rgba(64,220,228,0.52);  /* pullquote .hl — bright cyan wash */
```

### Light mode

```css
--bg-primary:     #efece4;   /* bone paper */
--bg-secondary:   #e5e1d4;
--bg-tertiary:    #d9d3c2;
--text-primary:   #1a1810;   /* warm near-black */
--text-secondary: #5a5547;
--text-tertiary:  #8a8371;
--border-light:   #dcd5c2;
--border-medium:  #c8c0ac;
--border-rule:    #1a1810;
--accent:         #d94f00;   /* slightly deeper for contrast on paper */
--accent-hover:   #a53600;
--accent-cool:    #3d6b68;
--highlight:      rgba(0,175,190,0.30);  /* pullquote .hl — muted teal wash */
```

### Per-page accent overrides

- **Pour Over** (`[data-page="pourover"]`): `--accent: #f0a830` (warm amber), `--accent-hover: #f7c060`. The orange global accent is too murky for the coffee theme.

### Rules

- **One accent at a time.** `--accent` is the only saturated color on the page.
- **`--accent-cool` is a whisper.** Use it for one word in a headline and nowhere else.
- **Background grid is default.** Every page has a faint mono grid backdrop (`background-size: 48px 48px`, ~11% opacity lines in dark, ~6% in light). It reads as graph paper.
- **Paper grain is always on.** A `body::before` fixed pseudo-element adds a ~3% feTurbulence SVG grain for organic texture. Dark: 3% opacity, Light: 2%. Never remove it.
- **No gradients except the disc-mark.** The only gradient allowed is the sun/disc motif behind the home hero.
- **Light mode is not dark-mode-inverted.** It's a distinct paper aesthetic. Recalibrate, don't swap.

---

## 3. Typography

### Families

```css
--font-display: 'Space Grotesk', system-ui, sans-serif;  /* headlines, name */
--font-body:    'Inter', system-ui, sans-serif;          /* body copy */
--mono:         'JetBrains Mono', ui-monospace, monospace; /* system chrome, numerics, labels */
```

Loaded via Google Fonts. No other families.

### Scale

| Token | Size | Usage |
|---|---|---|
| `hero-name` | `clamp(56px, 9vw, 128px)` | Home h1 — "George Penston" |
| `hero-headline` | `clamp(44px, 7vw, 88px)` | Product h1 — "Convert anything to Markdown." |
| `big-h2` | `clamp(36px, 6vw, 58px)` | Section headlines |
| `pullquote` | `clamp(22px, 3vw, 32px)` | Editorial pullquote |
| `body-lg` | 17px / 1.7 | Hero bios, long paragraphs |
| `body` | 15px / 1.6 | Default paragraph |
| `body-sm` | 13px | Meta, captions |
| `mono-label` | 10–11px, 0.08em tracking, uppercase | System chrome, section labels, captions |

### Rules

- **Display weight is 500.** Not 700 — we want editorial, not punchy.
- **One emphasized word per headline.** Wrap it in `<em>` and it renders in `--accent-cool`, not italic.
  ```html
  <h2>Small and <em>considered</em>.</h2>
  ```
- **Mono is for system, not body.** Never use JetBrains Mono for paragraphs.
- **Mono labels are always uppercase, tracked, with tabular numbers.** `font-variant-numeric: tabular-nums`.
- **Section labels carry a chapter number.** `data-num="02"` renders as `02 —` before the label text via CSS `::before`.
- **`text-wrap: pretty`** on all paragraphs and headlines by default.

---

## 4. Layout

### Container

```css
.container { max-width: 880px; margin: 0 auto; padding: 0 32px; }
```

880px is deliberate — narrower than a blog (1024+), wider than a product page column (640). Gives the site the proportion of a trade paperback.

### Vertical rhythm

- Section padding: `48px 0 24px` standard, `80px 0 32px` for major breaks.
- The Catalogue section on the home page uses `24px 0 24px` — tighter because the hero leads directly into it.
- Between paragraphs: 1.2em.
- Never use `<br>` for spacing — use margins.

### Grid

- CSS Grid for anything with structural alignment (spec-rows, plate-grid, unified-bar).
- Flex for inline clusters (unified-actions, app-identity, cta-group, works-with-prose).
- Don't use Bootstrap-style 12-column grids.

### Responsive (max-width: 600px)

- Plates collapse to single column.
- **Sticky chrome back-link:** text hidden on mobile — glyph (`//` or `<`) only. Product switcher labels remain visible. This prevents the "PENSTON STUDIO" label from wrapping to two lines.
- **Coffee ring:** pulls flush to `right: 0` and scales to 220px — keeps it on screen without causing horizontal overflow.
- No hamburger menu — nav is always visible.
- `main { overflow-x: visible }` on mobile allows product-showcase full-bleed. The `.instr-hero` has its own `overflow: hidden` to contain the disc ornament.

### iOS Safari / safe area

All pages include `viewport-fit=cover` in the viewport meta and `theme-color` meta tags (dark + light variants). The `.sticky-chrome` uses `padding-top: env(safe-area-inset-top)` to extend behind the status bar on notched devices.

Note: iOS 26 Safari uses a "liquid glass" translucent browser chrome by design. Page content showing through Apple's own toolbar is an OS-level behaviour — no CSS workaround exists.

---

## 5. Components

### Unified bar (sticky nav — all pages)

A single `position: sticky` chrome row shared across all pages. CSS Grid `1fr auto 1fr` keeps the centre content anchored while the left and right slots adapt per page.

```html
<div class="sticky-chrome">
  <div class="unified-bar">
    <!-- Left: home = scroll-to-top anchor; product pages = back-link -->
    <a href="#" class="instr-kicker nav-kicker nav-mark" aria-label="Scroll to top">
      <svg class="nav-glyph"><!-- // glyph --></svg>
      <span class="nav-text">Penston Studio</span>
    </a>
    <!-- Centre: home = empty div; product pages = .product-switcher -->
    <div aria-hidden="true"></div>
    <!-- Right: mode toggle -->
    <div class="unified-actions"><!-- mode-toggle button --></div>
  </div>
</div>
```

**On product pages** the left slot is a back-link (`<a class="... nav-mark back-link">`) with a `<` glyph SVG and `<span class="back-link-text nav-text">Penston Studio</span>`. The centre slot holds the `.product-switcher` — icon pills for each product.

**`nav-text`** carries `view-transition-name: nav-text` so the wordmark is perfectly anchored across MPA page transitions — it never moves or fades between pages.

**Mobile:** `.back-link-text` is `display: none` at ≤600px. Only the glyph shows. Product switcher labels remain visible.

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

Active item is a `<span>` (not a link), dimmed, non-interactive. Inactive items are `<a>` links.

### Mode toggle — Dieter Rams I/O switch

A physical sliding pill toggle. CSS-driven entirely from `[data-mode]` on `<html>`. No JS class manipulation needed. The thumb slides 24px right in dark mode. Icons (sun left, moon right) slide slightly with the thumb for a physically coupled feel. A tooltip appears after a 0.6s hover delay.

```html
<button class="mode-toggle" type="button" aria-label="Toggle color mode" data-mode-toggle>
  <span class="mode-toggle-track">
    <span class="mode-toggle-i" aria-hidden="true"><!-- sun SVG --></span>
    <span class="mode-toggle-thumb"></span>
    <span class="mode-toggle-o" aria-hidden="true"><!-- moon SVG --></span>
  </span>
</button>
```

- **Dark mode active:** track fills with `--accent`, thumb at `translateX(24px)`, sun visible, moon hidden.
- **Light mode active:** track is `--bg-tertiary`, thumb at `translateX(0)`, moon visible, sun hidden.
- **Tooltip:** CSS `::after` on `.mode-toggle` — content set via `:root[data-mode]` attribute selector. Mono font, right-aligned, fades in after 0.6s.
- **FOUC prevention:** Inline `<script>` in `<head>` reads `localStorage['ps_mode']`, falls back to `prefers-color-scheme`, sets `data-mode` synchronously before any paint.

### Hero atmosphere (home only)

Three layered decorative elements — all `position: absolute`, `pointer-events: none`, `z-index: 0` — inside `.instr-hero` which has `overflow: hidden` to contain them.

- **`.disc-mark`** — 92×92px radial-gradient sphere (orange/accent). Sits top-right.
- **`.disc-ring`** — 130×130px thin border circle. Slightly offset from disc-mark.
- **`.atm-rays`** — 260×260px SVG star-burst of thin lines (accent stroke). Top-right, extends slightly beyond.

All three animate when `prefers-reduced-motion: no-preference` — see §6 Motion.

### Coffee ring (home only)

A `position: absolute` decorative PNG at the bottom of `<main>`, positioned to straddle the section/footer seam:

```css
.coffee-ring {
  right: -20px; bottom: -118px;   /* desktop: bleeds slightly right, bridges footer */
  width: 260px;
  transform: rotate(3deg);
  mix-blend-mode: multiply;       /* screen in dark mode */
  opacity: 0.18;                  /* 0.06 in dark */
}
/* Mobile: pull flush so it doesn't cause horizontal overflow */
@media (max-width: 600px) {
  .coffee-ring { right: 0; width: 220px; }
}
```

### Portfolio link (home only)

A styled call-to-action link below the hero bio, pointing to `gpenston.com`. Uses `.portfolio-link` class with external arrow SVG.

### Project card (home)

Row-based card with icon tile, name + description, platform badge, arrow. Hover lifts 2px and shifts border toward accent. **No shadow on rest state** — only border.

### Section label

```html
<div class="section-label" data-num="02">The Studio</div>
```

Mono, uppercase, tracked. The `data-num` renders as `02 —` in `--text-tertiary` before the label text. An `::after` pseudo-element draws a horizontal rule that animates in on scroll-reveal.

### Big H2 (section headline)

Space Grotesk, weight 500, `clamp(36px, 6vw, 58px)`. Usually has one `<em>` word in `--accent-cool`.

### Spec row (product features)

Four-column grid: number · icon · body · (flex spacer). Thin divider between rows. Used for "What it does" feature lists.

### Inline links

Links in body copy use a consistent treatment:
- Default: `--accent` color, no underline
- Hover: `--accent-hover` with underline
- Active: slight opacity drop

### Plate / device frame

Every product screenshot sits in a `.plate` with a caption label (`PL. 01 / MAIN WINDOW`) above. Plates come in two sizes: `.plate-hero` (full-width) and `.plate-small` (grid cell). Inside, a `.device-macbook` wrapper provides the bezel. On mobile the bezel strips away to a clean full-bleed screenshot.

### Pullquote

Editorial quote block with `.hl` spans highlighting key phrases. Used once per page max. The `.hl` background is a semi-transparent cyan wash — it draws in from left to right on scroll-reveal (background-size animation), with a staggered delay for the second span.

```html
<p class="pullquote">
  Markdown is the plain-text format that
  <span class="hl">Obsidian, Bear, and Notion natively speak</span>.
</p>
```

### Works With (prose)

A single sentence naming tools, rendered as body copy. Not a grid or icon row.

```html
<section style="padding: 32px 0 16px;">
  <div class="section-label" data-num="04" data-reveal>Works with</div>
  <p class="works-with-prose" data-reveal>
    Made for <strong>Obsidian</strong>, <strong>Bear</strong>, and <strong>Notion</strong> —
    and feeds cleanly into <strong>Claude</strong>, <strong>ChatGPT</strong>, and <strong>Gemini</strong>.
  </p>
</section>
```

`.works-with-prose`: 17px Inter, `--text-secondary`, max-width 580px, line-height 1.7. `strong` in `--text-primary`.

### FARA card

Signature block near the footer of Markedly only. Communicates the donation-link commitment. Never removed, never shortened.

---

## 6. Motion

### Scroll-reveal

Elements with `[data-reveal]` start at `opacity: 0; transform: translateY(16px)`. Class `.is-revealed` is added via IntersectionObserver when entering viewport (600ms ease-out). Safety-net timer reveals all after 2.5s.

### Stagger

`[data-stagger="N"]` increments `transition-delay` by 120ms per step. Used on hero elements only.

### Section label line draw

`.section-label::after` (the horizontal rule) scales from `scaleX(0)` to `scaleX(1)` on `.is-revealed`. 600ms `cubic-bezier(0.16, 1, 0.3, 1)`, 200ms delay.

### Pullquote highlight draw

`.pullquote .hl` animates `background-size` from `0% 72%` to `100% 72%` on `.is-revealed`. 800ms `cubic-bezier(0.16, 1, 0.3, 1)`, 300ms delay. Second span delays an extra 250ms.

### Hero atmosphere (home only)

Three ambient animations, all gated on `prefers-reduced-motion: no-preference`:

- **`.disc-ring`** — `ring-orbit`: rotates 360° over 70s linear, infinite.
- **`.disc-mark`** — `disc-breath`: opacity pulses 0.70 → 0.84 over 7s ease-in-out, infinite.
- **`.atm-rays`** — `rays-drift`: counter-rotates 360° over 90s linear, infinite.

### Closing CTA icon float (product pages)

`.closing-cta .app-icon` floats `translateY(0)` → `translateY(-6px)` → back, 4s ease-in-out infinite. Gated on `prefers-reduced-motion: no-preference`.

### MPA page transitions (View Transitions API)

```css
@view-transition { navigation: auto; }
```

- **`nav-text`** (`view-transition-name: nav-text`) is anchored — `animation: none` on both old and new snapshots. The wordmark never moves or fades during navigation.
- **Root** fades up on arrival: `opacity: 0; transform: translateY(8px)` → normal over 360ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- **The nav glyph (`//` ↔ `<`) has no `view-transition-name`** — it's part of the root transition. Giving it its own name caused simultaneous old+new bitmap snapshots to appear (overlap bug). Let the root crossfade handle it.
- All transitions killed under `prefers-reduced-motion: reduce`.

### General rules

- **Hover transitions are 150–200ms.** Anything longer feels slow.
- **No scroll-jacking, parallax, or scroll-tied animation.** The page scrolls like a document.
- **`prefers-reduced-motion: reduce` kills all transitions and reveals immediately.** Non-negotiable.
- **The atmosphere (disc + rays) is the only ambient animation on home.** Don't add floating particles, gradient sweeps, or breathing elements elsewhere.
- **Mode toggle transition is 200ms `cubic-bezier(0.4, 0, 0.2, 1)`.** Applies to thumb translate, icon slide, and track background.

---

## 7. Iconography

- **Remixicon via CDN** for feature icons. `<i class="ri-drag-drop-line"></i>`.
- Icons always in icon cells with a subtle background tint — never floating unanchored.
- **No emoji.** The mono-label style covers anywhere you'd be tempted.
- **Never draw proprietary logos in SVG.** Use Remixicon's brand glyphs (`ri-github-line`) or real asset files.

---

## 8. Imagery

- **Product shots live at `assets/<app>-shot-<role>.png`.** Naming convention: `markedly-shot-open`, `markedly-shot-drag`. Always inside a device frame.
- **App icons live at `assets/<app>-icon.png`.** Rounded-square, always 120×120px or larger source.
- **Works With icons live at `assets/app-icon-<name>.jpg`.** Real app icons, not drawn substitutes.
- **Badges** (App Store, GitHub): keep vendor-provided SVGs in `assets/`. Don't redraw.
- **If an image doesn't exist, use a dashed placeholder** with a caption `(PLACEHOLDER)`. Never ship a half-drawn SVG mockup.

---

## 9. Code Hygiene

- **No build step. No framework.** Plain HTML, one CSS file, one JS file.
- **One `assets/style.css` with clear section banners** in declaration order: tokens, reset, typography, chrome, components, utilities, responsive, motion.
- **One `assets/site.js`** for mode toggle, scroll-reveal, and any small interactive bits. No modules, no imports.
- **JS is defensive.** Every query wrapped in null checks. Feature-detect `IntersectionObserver`. Always provide a fallback.
- **`?v=N` cache-busters on CSS/JS links** are incremented in committed code on every change to force fresh loads on Vercel's CDN edge. When making changes, bump the version in all three HTML files.
- **CSS custom properties for all theme-able values.** No hardcoded hex in components.
- **Avoid `!important`.** If you need it, your selector order is wrong.
- **All three pages get the same `<head>` meta additions** — viewport-fit, theme-color, etc. Don't update one and forget the others.

---

## 10. Tokens at a glance

```css
:root {
  /* Type */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --mono:         'JetBrains Mono', ui-monospace, monospace;

  /* Space */
  --container-max: 880px;
  --container-pad: 32px;
  --section-y:     48px;
  --section-y-lg:  80px;

  /* Radii */
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 12px;

  /* Motion */
  --t-fast: 150ms ease-out;
  --t-med:  300ms ease-out;
  --t-slow: 600ms ease-out;
}
```

---

## 11. Don't do this

- Don't add a system rail / status bar at the top of pages. We tried it — it added visual noise without earning its keep.
- Don't add a gradient hero background.
- Don't use Inter Tight, Satoshi, General Sans, or any "designer" substitute for Space Grotesk — they're all trying too hard.
- Don't make the accent orange darker "to be tasteful." The orange is the signal.
- Don't add a "Get in touch" CTA section. There's LinkedIn in the footer, that's enough.
- Don't put a newsletter signup anywhere.
- Don't write copy in second-person marketing voice ("You'll love…"). First-person maker voice only ("I build…").
- Don't add emoji, even in the README.
- Don't put utility links (Support, Privacy, back-link) in the nav. They live in the unified bar / product-switcher.
- Don't use the same accent colour for pullquote highlights as for links. The `.hl` is a cyan wash, not orange.
- Don't give the nav glyph a `view-transition-name`. The simultaneous old+new snapshots cause an overlap bug. Let it ride with the root crossfade.
- Don't try to fix iOS 26 Safari's liquid glass browser chrome with CSS. Content showing through Apple's own translucent toolbar is an OS-level design choice. `backdrop-filter`, `translateZ(0)`, and `will-change` don't help. `theme-color` meta and `env(safe-area-inset-top)` are the right signals — beyond that, let it go.

---

## 12. Extending this system

When adding a new product page or section:

1. Start with the page chrome: sticky-chrome with unified-bar (back-link glyph + nav-text + product-switcher + mode toggle).
2. Hero: app-identity block (icon + name + platform), headline, sub, CTA group.
3. Product showcase: plates with device frames (skip if no screenshots yet).
4. "The idea": pullquote section — one per page, `data-num="01"`.
5. "What it does": section-label `02 —` + spec-rows.
6. "Works with": prose sentence (`works-with-prose`), `data-num="03"` or `"04"`.
7. FARA card (Markedly only).
8. Support section (+ Privacy if App Store app — Privacy before Support in both nav and page order).
9. Footer.

Not every section is required, but they should appear **in this order** when present. The narrative is: *what is it → show me → the idea → what does it do → how does it fit my world → who's behind it → where do I go next.*
