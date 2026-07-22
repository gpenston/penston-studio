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
--bg-primary:     #f2f1ec;   /* greige paper — was #efece4 bone paper, see below */
--bg-secondary:   #e8e6df;   /* was #e5e1d4 */
--bg-tertiary:    #dbd9d0;   /* was #d9d3c2 */
--text-primary:   #1a1810;   /* warm near-black */
--text-secondary: #5a5547;
--text-tertiary:  #6d6752;   /* was #7d765f — only 3.84:1 on old bone paper /
                                 4.01:1 on greige, below the 4.5:1 floor for
                                 small mono chrome. Darkened to clear 5.00:1. */
--border-light:   #dad7ca;   /* was #dcd5c2 — pulled toward neutral in step
                                 with the bg desaturation */
--border-medium:  #c4c1b5;   /* was #c8c0ac */
--border-rule:    #1a1810;
--accent:         #d94f00;   /* slightly deeper for contrast on paper */
--accent-hover:   #a53600;
--accent-cool:    #3d6b68;
--highlight:      rgba(0,175,190,0.30);  /* pullquote .hl — muted teal wash */
```

**2026-07-21 — greige repaint.** The light bg tokens were desaturated and
lifted a touch (ported from gpenston-portfolio's light-mode rework) to read
as "paper" rather than "beige." This closes what had been a deliberate
sibling divergence — until this pass, the portfolio used this desaturated
greige while this site kept the warmer original bone paper. They're back in
sync now. `--text-tertiary` was darkened in the same pass to actually clear
WCAG AA (it had quietly been failing on bone paper too — not a regression
introduced by the repaint, just caught while in the area). Dark mode is
untouched. `--border-light`/`--border-medium` and `--on-accent` moved with
the bg; all other light tokens (text-primary/secondary, accent family,
highlight) are unchanged.

### Per-page accent overrides

- **Pour Over** (`[data-page="pourover"]`): `--accent: #f0a830` (warm amber), `--accent-hover: #f7c060`. The orange global accent is too murky for the coffee theme.

### Rules

- **One accent at a time.** `--accent` is the only saturated color on the page.
- **`--accent-cool` is a whisper.** Use it for one word in a headline and nowhere else.
- **Background grid is default.** Every page has a faint mono grid backdrop (`background-size: 48px 48px`, ~11% opacity lines in dark, ~6% in light). It reads as graph paper.
- **Paper grain is always on.** A `body::before` fixed pseudo-element adds a ~3% feTurbulence SVG grain for organic texture. Dark: 3% opacity, Light: 2%. Never remove it.
- **No gradients.** The site is flat. (The old orange disc gradient and the hero horizon glow were removed in the June 2026 cleanup — don't reintroduce decorative gradients.)
- **Light mode is not dark-mode-inverted.** It's a distinct paper aesthetic. Recalibrate, don't swap.

---

## 3. Typography

### Families

```css
--font-display: 'Hanken Grotesk', system-ui, sans-serif;  /* headlines, name */
--font-body:    'Hanken Grotesk', system-ui, sans-serif;  /* body copy */
--mono:         'Martian Mono', ui-monospace, monospace;  /* system chrome, labels */
--font-flavor:  'D-DIN Condensed', 'Martian Mono', sans-serif; /* numeric accents only */
```

Hanken Grotesk and Martian Mono load via Google Fonts. **D-DIN Condensed is
self-hosted** at `assets/fonts/D-DINCondensed-Bold.woff2` (DIN 1451 digitization,
OFL) — served from Vercel's edge like any static asset. See the full rationale in
`DESIGN.md` (root) and `docs/superpowers/specs/2026-07-10-type-system-refresh-design.md`.

Hanken does display **and** body (one warm humanist family). Martian Mono is the
technical chrome. D-DIN Condensed is a flavor accent used **only** for numeric
moments — never for body or headings.

### Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `hero-name` | `clamp(44px, 6.5vw, 84px)` | 800 | Home h1 — "George Penston" |
| `hero-headline` | `clamp(44px, 7vw, 84px)` | 800 | Product h1 — "Convert anything to Markdown." |
| `big-h2` | `clamp(36px, 6vw, 56px)` | 700 | Section headlines |
| `pullquote` | `clamp(22px, 3.2vw, 34px)` | 700 | Editorial pullquote (carries the highlight marker) |
| `body-lg` | 17px / 1.7 | Hero bios, long paragraphs |
| `body` | 15px / 1.6 | Default paragraph |
| `body-sm` | 13px | Meta, captions |
| `mono-label` | 10–11px, 0.08em tracking, uppercase | System chrome, section labels, captions |

### Rules

- **Display weight is 700–800.** Hanken reads lighter than the old Space Grotesk at matched weights, so hero display sits at 800, section headlines at 700, base headings at 600.
- **One emphasized word per headline.** Wrap it in `<em>` and it renders in `--accent-cool`, not italic.
  ```html
  <h2>Small and <em>considered</em>.</h2>
  ```
- **Mono is for system, not body.** Never use Martian Mono for paragraphs.
- **Mono labels are always uppercase, tracked, with tabular numbers.**
- **D-DIN is for numeric accents only** — the hero chapter marker, section-label numbers, feature-row numbers, and the footer `EST.` mark. Never for body or headings.
- **Section labels carry a chapter number.** `data-num="02"` renders the number in condensed D-DIN (signal orange) before the mono label text via CSS `::before`.
- **The highlight marker (`.hl`, accent-cool) is reserved for the pullquote block** — the single expressive flourish per page. Don't scatter it per section.
- **`text-wrap: pretty`** on all paragraphs and headlines by default.
- **11px is the floor.** No text — including mono labels, badges, and captions — goes below 11px. The faint chrome color (`--text-tertiary`) is tuned to clear WCAG AA (4.5:1) at these small sizes.

> **Type direction (resolved 2026-07-10):** Hanken Grotesk + Martian Mono + D-DIN
> Condensed, chosen after the v6–v12 exploration. Extending it to the Markedly/Pour
> Over apps and gpenston.com is a later, separate effort.

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

### Mode toggle — flat sun/moon icon button

A flat icon button — no track, thumb, or skeuomorphic depth (the old Dieter Rams I/O pill was removed in the June 2026 cleanup as out of place). CSS-driven entirely from `[data-mode]` on `<html>`: the button shows the icon of the mode you'll switch *to* — the sun in dark mode (tap for light), the moon in light mode (tap for dark). 32px hit target, `--text-secondary` resting, `--accent` on hover. A tooltip appears after a 0.6s hover delay.

```html
<button class="mode-toggle" type="button" aria-label="Toggle color mode" data-mode-toggle>
  <span class="mode-toggle-i" aria-hidden="true"><!-- sun SVG  — shown in dark mode --></span>
  <span class="mode-toggle-o" aria-hidden="true"><!-- moon SVG — shown in light mode --></span>
</button>
```

- **Dark mode active:** sun icon visible (`.mode-toggle-i` shown, `.mode-toggle-o` hidden).
- **Light mode active:** moon icon visible (`.mode-toggle-o` shown, `.mode-toggle-i` hidden).
- **Tooltip:** CSS `::after` on `.mode-toggle` — content set via `:root[data-mode]` attribute selector. Mono font, right-aligned, fades in after 0.6s.
- **Click sound:** `playClick()` in `site.js` fires on toggle — keep it.
- **FOUC prevention:** Inline `<script>` in `<head>` reads `localStorage['ps_mode']`, falls back to `prefers-color-scheme`, sets `data-mode` synchronously before any paint.

### Hero atmosphere (home only)

Two quiet decorative elements — both `position: absolute`, `pointer-events: none`, `z-index: 0` — inside `.instr-hero` which has `overflow: hidden` to contain them. (The heavy orange `.disc-mark` sphere, the `.atm-horizon` line + gradient glow, and the `.coffee-ring` stain were all removed in the June 2026 cleanup as decorative noise.)

- **`.disc-ring`** — ~120px thin border circle, top-right. Reads as a single deliberate mark now that the disc is gone.
- **`.atm-rays`** — SVG star-burst of thin lines (accent stroke), top-right, extends slightly beyond.

Both animate when `prefers-reduced-motion: no-preference` — see §6 Motion.

### Portfolio link (home only)

A styled call-to-action link below the hero bio, pointing to `gpenston.com`. Uses `.portfolio-link` class with external arrow SVG.

### Project card (home)

Row-based card with icon tile, name + description, platform badge, arrow. **No shadow, ever** — rest or hover. Hover is a flat, deliberate state: border + icon border shift to the card accent, background lifts `--bg-secondary` → `--bg-tertiary`, the name shifts to the accent, the arrow slides, and the whole card lifts 1px (no box-shadow).

### Section label

```html
<div class="section-label" data-num="02">The Studio</div>
```

Mono, uppercase, tracked. The `data-num` renders as `02 —` in `--text-tertiary` before the label text. An `::after` pseudo-element draws a horizontal rule that animates in on scroll-reveal.

### Big H2 (section headline)

Hanken Grotesk, weight 700, `clamp(36px, 6vw, 58px)` (see §3 Scale — `big-h2`). Usually has one `<em>` word in `--accent-cool`.

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

`.works-with-prose`: 17px Hanken Grotesk, `--text-secondary`, max-width 580px, line-height 1.7. `strong` in `--text-primary`.

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

Two ambient animations, both gated on `prefers-reduced-motion: no-preference`:

- **`.disc-ring`** — `ring-orbit`: rotates 360° over 70s linear, infinite.
- **`.atm-rays`** — `rays-drift`: counter-rotates 360° over 360s linear, infinite.

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
- **The atmosphere (ring + rays) is the only ambient animation on home.** Don't add floating particles, gradient sweeps, or breathing elements elsewhere.
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
  /* Type — Chapter 03 system, resolved 2026-07-10 (see §3). This block had
     drifted to the pre-refresh Space Grotesk/Inter/JetBrains Mono names —
     corrected 2026-07-21 to match assets/style.css and §3 above. */
  --font-display: 'Hanken Grotesk', system-ui, sans-serif;
  --font-body:    'Hanken Grotesk', system-ui, sans-serif;
  --mono:         'Martian Mono', ui-monospace, 'SF Mono', Menlo, monospace;
  --font-flavor:  'D-DIN Condensed', 'Martian Mono', sans-serif;

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
- Don't add a gradient hero background — or any decorative gradient. The site is flat (June 2026 cleanup).
- Don't bring back the orange hero disc, the hero horizon line/glow, the coffee-ring stain, or the skeuomorphic sliding mode switch. They were removed deliberately.
- Don't put shadows on the catalogue cards — the hover state is flat (border + background + accent), never a drop-shadow.
- Don't use Inter Tight, Satoshi, General Sans, or any "designer" substitute for Hanken Grotesk — they're all trying too hard.
- Don't make the accent orange darker "to be tasteful." The orange is the signal.
- Don't add a "Get in touch" CTA section. There's LinkedIn in the footer, that's enough.
- Don't put a newsletter signup anywhere.
- Don't write copy in second-person marketing voice ("You'll love…"). First-person maker voice only ("I build…").
- Don't add emoji, even in the README.
- Don't put utility links (Support, Privacy, back-link) in the nav. They live in the unified bar / product-switcher.
- Don't use the same accent colour for pullquote highlights as for links. The `.hl` is a cyan wash, not orange.
- Don't give the nav glyph a `view-transition-name`. The simultaneous old+new snapshots cause an overlap bug. Let it ride with the root crossfade.
- Don't use `position: fixed` for `.sticky-chrome` — the iOS 26 Safari bleed-through fix requires `position: sticky`. See §4 for the full pattern.
- Don't remove `pointer-events: none` from `.sticky-chrome::before` — the pseudo-element covers the entire chrome area and will silently eat button clicks without it.
- Don't assume `theme-color` meta controls toolbar colour on iOS 26 Safari — Apple dropped that support. Keep the metas for other browsers.
- Don't try to fix the toolbar tint not updating on mode toggle — we exhausted every known approach. It's a confirmed iOS 26 Safari hard limit. See §4.
- Don't wrap `playClick()`'s `src.start()` in `ctx.resume().then()` — the original synchronous pattern is what works across all browsers. Any "fix" that adds async resume breaks Safari desktop audio.

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
