# Penston Studio — Design System

> **The short version.** The site is an **instrument**, not an album cover. Bureau lineage: Dieter Rams / Braun / Eames Office via Walkie. Monochrome canvas, one saturated accent, tabular mono numerics, numbered chapter headings, restrained atmosphere. Keep the drama dialed down; let composition and typography carry the weight.

---

## 1. Voice & Tone

- **Confident, not marketing-fluffy.** "A one-person practice in product design and development." Not "I'm passionate about crafting delightful experiences."
- **Maker-first.** Written by the person who builds the things.
- **Editorial cadence.** Numbered chapters (`01 —`, `02 —`), pullquotes, system labels. Reads like a trade journal, not a SaaS page.
- **Technical monitor diction for system chrome.** `SESSION 0xA7F2`, `LAT: 37.77° N · LON: 122.42° W`, `STUDIO.ENGINE V.1.2`. Real-sounding but obviously typographic.
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
--border:         #2a2620;
--border-light:   #1f1c14;
--accent:         #eb5a00;   /* signal orange */
--accent-cool:    #7aa9a3;   /* faded teal — used for emphasis, never primary */
```

### Light mode

```css
--bg-primary:     #efece4;   /* bone paper */
--bg-secondary:   #e5e1d4;
--bg-tertiary:    #d9d3c2;
--text-primary:   #1a1810;   /* warm near-black */
--text-secondary: #5a5547;
--text-tertiary:  #8a8371;
--border:         #c8c0ac;
--border-light:   #dcd5c2;
--accent:         #d94f00;   /* slightly deeper for contrast on paper */
--accent-cool:    #3d6b68;
```

### Rules

- **One accent at a time.** `--accent` is the only saturated color on the page. Don't introduce magenta, blue, green alongside.
- **`--accent-cool` is a whisper.** Use it for one word in a headline (`considered`, `fresh daily`, `Markdown`) and nowhere else.
- **Background grid is default.** Every page has a faint mono grid backdrop (`background-size: 48px 48px`, ~4% opacity lines). It reads as graph paper, not as decoration.
- **No gradients except the disc-mark.** The only gradient allowed is the sun/disc motif behind the home hero. Everything else is flat color.
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
- **Section labels carry a chapter number.** `data-num="02 —"` renders before the label text via CSS `::before`.
- **text-wrap: pretty** on all paragraphs and headlines by default.

---

## 4. Layout

### Container

```css
.container { max-width: 880px; margin: 0 auto; padding: 0 32px; }
```

880px is deliberate — narrower than a blog (1024+), wider than a product page column (640). Gives the site the proportion of a trade paperback.

### Vertical rhythm

- Section padding: `48px 0 24px` standard, `80px 0 32px` for major breaks.
- Between paragraphs: 1.2em.
- Never use `<br>` for spacing — use margins.

### Grid

- CSS Grid for anything with structural alignment (spec-rows, plate-grid, system-rail).
- Flex for inline clusters (nav, app-identity, cta-group).
- Don't use Bootstrap-style 12-column grids.

### Responsive

- Mobile breakpoint: `@media (max-width: 600px)`.
- Plates collapse to single column. Nav wraps. Spec-row icon cell stays but shrinks.
- No hamburger menu — nav is always visible, wraps if it must.

---

## 5. Components

### System Rail (top of every page)

Fixed-position strip at the very top of the viewport. Three slots: session/online indicator · coordinates/chapter ID · location/status. Mono uppercase, tabular nums, border-bottom. Sets the instrument tone before anything else.

```html
<div class="system-rail">
  <div class="sys-item"><span class="sys-led"></span>ONLINE</div>
  <div class="sys-item">LAT: 37.77° N · LON: 122.42° W</div>
  <div class="sys-item">SFO / USA</div>
</div>
```

### Nav

Wordmark on left (`penston.studio` in mono), links on right, mode toggle pill on far right. No logo — the wordmark IS the logo.

### Mode toggle

A single pill with two segments (DARK · LIGHT). The active segment fills with `--accent`. Persists to `localStorage['ps_mode']`. Both the user's OS preference AND the stored value are respected; stored wins.

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

### Plate / device frame

Every product screenshot sits in a `.plate` with a caption label (`PL. 01 / MAIN WINDOW`) above and an optional role label below (`Drag & drop`). Plates come in two sizes: `.plate-hero` (full-width) and `.plate-small` (grid cell). Inside, a `.device-macbook` or `.device-iphone` wrapper provides the bezel.

### Pullquote

Editorial quote block with a `.hl` span highlighting the key phrase. Used sparingly — once per page max.

```html
<p class="pullquote">
  Markdown is the plain-text format that
  <span class="hl">Obsidian, Bear, and Notion natively speak</span>.
</p>
```

### FARA card

Signature block near the footer of product pages, communicating the donation-link commitment. Always present on product pages.

---

## 6. Motion

- **Scroll-reveal on `[data-reveal]`.** Elements start at `opacity: 0; transform: translateY(16px)`. Class `.is-revealed` adds via IntersectionObserver when entering viewport. 600ms ease-out. Safety-net timer reveals all after 2.5s regardless.
- **Stagger via `[data-stagger="N"]`.** Increments transition-delay by 120ms per step.
- **No scroll-jacking, parallax, or scroll-tied animation.** The page scrolls like a document.
- **Hover transitions are 150–200ms.** Anything longer feels slow.
- **`prefers-reduced-motion: reduce` kills all transitions and reveals immediately.** Non-negotiable.
- **The atmosphere / disc-mark is the ONLY ambient animation.** It drifts slowly on the home hero. Don't add floating particles, gradient sweeps, or breathing elements elsewhere.

---

## 7. Iconography

- **Remixicon via CDN** for feature icons. `<i class="ri-drag-drop-line"></i>`.
- Icons always in icon cells with a subtle background tint — never floating unanchored.
- **No emoji.** The mono-label style covers anywhere you'd be tempted (`SFO / USA`, `CH. 01`, `v.1.2`).
- **Never draw proprietary logos in SVG.** Use Remixicon's brand glyphs (`ri-github-line`, `ri-apple-fill`) or real asset files.

---

## 8. Imagery

- **Product shots live at `assets/<app>-shot-<role>.png`.** Naming convention: `markedly-shot-open`, `markedly-shot-drag`, `pour-over-shot-email`. Always inside a device frame.
- **Icons live at `assets/<app>-icon.png`.** Rounded-square app icons, always 120×120 or larger source.
- **Badges** (App Store, GitHub): keep vendor-provided SVGs in `assets/`. Don't redraw.
- **If an image doesn't exist, use a dashed placeholder** with a caption `(PLACEHOLDER)`. Never ship a half-drawn SVG mockup.

---

## 9. Code Hygiene

- **No build step. No framework.** Plain HTML, one CSS file, one JS file.
- **One `assets/style.css` with clear section banners** (`/* ----- Name ----------------------- */`) in declaration order: tokens, reset, typography, chrome, components, utilities, responsive, motion.
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

- Don't add a gradient hero background.
- Don't use Inter Tight, Satoshi, General Sans, or any "designer" substitute for Space Grotesk — they're all trying too hard.
- Don't make the accent orange darker "to be tasteful." The orange is the signal.
- Don't add a "Get in touch" CTA section. There's LinkedIn in the footer, that's enough.
- Don't put a newsletter signup anywhere.
- Don't write copy in second-person marketing voice ("You'll love…"). First-person maker voice only ("I build…").
- Don't add emoji, even in the README.
- Don't ship pull-request copy like "Amazing new feature!" in commits — tone matches the site.

---

## 12. Extending this system

When adding a new product page or section:

1. Start with the page chrome: system rail, nav, back-link.
2. Hero: app-identity block, headline, sub, CTA group.
3. Product showcase: plates with device frames.
4. "What it does": section-label `01 —` + big-h2 + spec-rows.
5. "Why": pullquote section.
6. Optional: formats, works-with grid, compatibility.
7. FARA card.
8. Support / privacy links.
9. Footer.

Not every section is required, but they should appear **in this order** when present. The narrative is: *what is it → show me → what does it do → why does it matter → how does it fit my world → who's behind it → where do I go next.*
