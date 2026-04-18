# Penston Studio — Design System

> **The short version.** The site is an **instrument**, not an album cover. Bureau lineage: Dieter Rams / Braun / Eames Office via Walkie. Monochrome canvas, one saturated accent, tabular mono numerics, numbered chapter headings, restrained atmosphere. Keep the drama dialed down; let composition and typography carry the weight.

---

## 1. Voice & Tone

- **Confident, not marketing-fluffy.** "A one-person practice in product design and development." Not "I'm passionate about crafting delightful experiences."
- **Maker-first.** Written by the person who builds the things.
- **Editorial cadence.** Numbered chapters (`01 —`, `02 —`), pullquotes, system labels. Reads like a trade journal, not a SaaS page.
- **Smart quotes.** `'` `"` — never straight `' "`.
- **Em dashes** — not hyphens — for parentheticals.

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
--accent-cool:    #3d6b68;
--highlight:      rgba(0,175,190,0.30);  /* pullquote .hl — muted teal wash */
```

### Per-page accent overrides

- **Pour Over** (`[data-page="pourover"]`): `--accent: #f0a830` (warm amber), `--accent-hover: #f7c060`. The orange global accent is too murky for the coffee theme.

### Rules

- **One accent at a time.** `--accent` is the only saturated color on the page.
- **`--accent-cool` is a whisper.** Use it for one word in a headline and nowhere else.
- **Background grid is default.** Every page has a faint mono grid backdrop (`background-size: 48px 48px`, ~7% opacity lines in dark, ~4% in light). It reads as graph paper.
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

Loaded via Google Fonts preconnect. No other families.

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

- CSS Grid for anything with structural alignment (spec-rows, plate-grid).
- Flex for inline clusters (nav, app-identity, cta-group, works-with-row).
- Don't use Bootstrap-style 12-column grids.

### Responsive

- Mobile breakpoint: `@media (max-width: 600px)`.
- Plates collapse to single column. Nav wraps. Spec-row icon cell stays but shrinks.
- No hamburger menu — nav is always visible, wraps if it must.

---

## 5. Components

### Nav

Wordmark on left (`penston.studio` in mono, `<a>` on product pages, `<span>` on home), mode toggle on far right. No external links in nav — the nav has one job.

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="../" class="nav-wordmark">penston<span>.</span>studio</a>
    <ul class="nav-links">
      <li><!-- mode toggle --></li>
    </ul>
  </div>
</nav>
```

### Product bar

On product pages only. Sits immediately below the nav. Back-link on the left, page anchor links on the right. This keeps the nav clean and gives the product page its own utility row.

```html
<div class="product-bar">
  <a href="../" class="back-link">
    <svg><!-- left chevron --></svg>
    All projects
  </a>
  <ul class="product-bar-links">
    <li><a href="#support">Support</a></li>
    <li><a href="#privacy">Privacy</a></li>
  </ul>
</div>
```

### Mode toggle — Dieter Rams I/O switch

A physical sliding pill toggle. CSS-driven entirely from `[data-mode]` on `<html>`. No JS class manipulation needed. The thumb slides 24px right in dark mode. Icons (sun left, moon right) slide slightly with the thumb — 4px in the direction of travel — for a physically coupled feel. A tooltip appears after a 0.6s hover delay.

```html
<button class="mode-toggle" type="button" aria-label="Toggle color mode" data-mode-toggle>
  <span class="mode-toggle-track">
    <span class="mode-toggle-i" aria-hidden="true"><!-- sun SVG --></span>
    <span class="mode-toggle-thumb"></span>
    <span class="mode-toggle-o" aria-hidden="true"><!-- moon SVG --></span>
  </span>
</button>
```

- **Dark mode active:** track fills with `--accent`, thumb at `translateX(24px)`, sun visible, moon hidden and pushed right.
- **Light mode active:** track is `--bg-tertiary`, thumb at `translateX(0)`, moon visible, sun hidden and pushed left.
- **Tooltip:** CSS `::after` on `.mode-toggle` — content set via `:root[data-mode]` attribute selector. Mono font, right-aligned, fades in after 0.6s, fades out immediately on mouse-out.
- **First-load FOUC prevention:** Inline `<script>` in `<head>` (before stylesheets) reads `localStorage['ps_mode']` and falls back to `prefers-color-scheme`. Sets `data-mode` synchronously so the correct theme is applied before any paint.

### Portfolio link (home only)

A styled call-to-action link below the hero bio, pointing to `gpenston.com`. Uses `.portfolio-link` class with external arrow SVG. This is the primary contextual "who is this person" link.

### Project card (home)

Row-based card with icon tile, name + description, platform badge, arrow. Hover lifts 2px and shifts border toward accent. **No shadow on rest state** — only border. This is the single most important component on the home page.

### Section label

```html
<div class="section-label" data-num="02">The Studio</div>
```

Mono, uppercase, tracked. The `data-num` renders as `02 —` in `--text-tertiary` before the label.

### Big H2 (section headline)

Space Grotesk, weight 500, `clamp(36px, 6vw, 58px)`. Usually has one `<em>` word in `--accent-cool`.

### Spec row (product features)

Four-column grid: number · icon · body · (flex spacer). Thin divider between rows. Used for "What it does" feature lists.

### Inline links

Links in body copy (`.hero-sub`, `.spec-row .body`, `.why`, `.fara-body`, `.privacy-content`) use a consistent treatment:
- Default: `--accent` color, no underline
- Hover: `--accent-hover` with underline
- Active: slight opacity drop

### Plate / device frame

Every product screenshot sits in a `.plate` with a caption label (`PL. 01 / MAIN WINDOW`) above and an optional role label below (`Drag & drop`). Plates come in two sizes: `.plate-hero` (full-width) and `.plate-small` (grid cell). Inside, a `.device-macbook` wrapper provides the bezel.

### Pullquote

Editorial quote block with a `.hl` span highlighting the key phrase. Used sparingly — once per page max. The `.hl` background is a semi-transparent cyan wash (not the accent orange) so it reads as highlighter pen, not brand colour.

```html
<p class="pullquote">
  Markdown is the plain-text format that
  <span class="hl">Obsidian, Bear, and Notion natively speak</span>.
</p>
```

### Works With row

Logo clusters in a flex-wrap row. No grid, no table. Each `.ww-item` is a rounded icon + label. Icons are real app icons from `assets/app-icon-<name>.jpg`.

```html
<div class="works-with-row">
  <div class="ww-item"><img class="ww-icon" src="..."><span class="ww-name">Obsidian</span></div>
  <!-- ... -->
</div>
```

### FARA card

Signature block near the footer of product pages, communicating the donation-link commitment. Always present on product pages. Never removed, never shortened.

---

## 6. Motion

- **Scroll-reveal on `[data-reveal]`.** Elements start at `opacity: 0; transform: translateY(16px)`. Class `.is-revealed` adds via IntersectionObserver when entering viewport. 600ms ease-out. Safety-net timer reveals all after 2.5s regardless.
- **Stagger via `[data-stagger="N"]`.** Increments transition-delay by 120ms per step. Used on hero elements only.
- **No scroll-jacking, parallax, or scroll-tied animation.** The page scrolls like a document.
- **Hover transitions are 150–200ms.** Anything longer feels slow.
- **`prefers-reduced-motion: reduce` kills all transitions and reveals immediately.** Non-negotiable.
- **The atmosphere / disc-mark is the ONLY ambient animation.** It drifts slowly on the home hero. Don't add floating particles, gradient sweeps, or breathing elements elsewhere.
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
- **No `?v=N` cache-busters in committed code.** Those are dev-only.
- **CSS custom properties for all theme-able values.** No hardcoded hex in components.
- **Avoid `!important`.** If you need it, your selector order is wrong.

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
- Don't put utility links (Support, Privacy, back-link) in the nav. Use the product-bar row instead.
- Don't use the same accent colour for pullquote highlights as for links. The `.hl` is a cyan wash, not orange.

---

## 12. Extending this system

When adding a new product page or section:

1. Start with the page chrome: nav (wordmark + toggle), product-bar (back-link + anchor links).
2. Hero: app-identity block (icon + name + platform), headline, sub, CTA group.
3. Product showcase: plates with device frames (skip if no screenshots yet).
4. "The idea": pullquote section — one per page, `data-num="01"`.
5. "What it does": section-label `02 —` + spec-rows.
6. "Works with": `.works-with-row` logo clusters.
7. FARA card.
8. Support section (+ Privacy if App Store app).
9. Footer.

Not every section is required, but they should appear **in this order** when present. The narrative is: *what is it → show me → the idea → what does it do → how does it fit my world → who's behind it → where do I go next.*
