# gpenston.com — Portfolio Redesign Brief

> The same instrument, tuned for a different room. Penston Studio is a product showcase;
> gpenston.com is a career document. The aesthetic is identical — bureau, restrained, orange signal —
> but the content architecture shifts from "here are things I made" to "here is how I think and lead."

---

## 1. Positioning

George Penston is a **product design leader and maker**. The portfolio has to hold both:

- **The leader:** Design Director at LinkedIn for 7+ years. Shipped Dark Mode (went viral), new design language, generative AI features, LinkedIn Games. Led Profile, Pages, Messaging, and Groups. Grew and coaches design teams.
- **The maker:** Builds the tools he wants to exist. Penston Studio, Markedly, Pour Over. Code-literate.

The site should feel like a trade portfolio from someone who operates at two altitudes — strategic leadership and hands-on craft. Not a personal branding exercise. Not "I'm passionate about seamless experiences." The work does the talking.

**Tone:** Same as Penston Studio — confident, first-person, editorial cadence. Maker voice.

---

## 2. Aesthetic Foundation

Carry the Penston Studio design system across verbatim. This is the same person, same sensibility.

### Colors (exact same tokens)

```
Dark mode (default)
  Background:   #0c0b08  (warm near-black)
  Surface:      #17150f  (cards, panels)
  Text:         #e8e2cf  (bone/cream)
  Muted text:   #9c9687
  Accent:       #eb5a00  (signal orange — the only saturated color)
  Accent cool:  #7aa9a3  (teal — one word in a headline, nowhere else)

Light mode
  Background:   #efece4  (bone paper)
  Text:         #1a1810  (warm near-black)
  Accent:       #d94f00  (slightly deeper for contrast on paper)
```

Light mode is a distinct paper aesthetic — not dark mode inverted.

### Typography

```
Display/headlines:  Space Grotesk, weight 500 (not 700 — editorial, not punchy)
Body:               Inter, 15–17px, line-height 1.6–1.7
System chrome:      JetBrains Mono — labels, numbers, captions only
```

- One `<em>` word per headline, rendered in `--accent-cool` (teal), not italic
- Section labels: mono, uppercase, tracked, prefixed `01 —`, `02 —` etc.
- Body copy: `text-wrap: pretty`, max-width ~65ch

### Texture

- Faint mono graph-paper grid backdrop on every page (~11% opacity in dark, ~6% in light)
- Subtle paper grain (`feTurbulence` SVG filter, `body::before`, fixed, pointer-events none): 3% dark, 2% light
- These run on every page. Never remove them.

### Atmosphere

The home hero can have the disc/rays motif (same as Studio) — the orange radial disc + ring + starburst rays — but keep it pulled back. It's ambient, not a design feature.

### Rules that carry over

- One accent color at a time
- No gradients except the disc ornament
- No emoji
- No marketing voice ("You'll love…", "Seamless experiences…")
- Max container width: 880px — the proportions of a trade paperback
- Section padding: `48px 0 24px` standard, `80px 0 32px` for major breaks

---

## 3. Content Architecture

### Pages

```
/           Home — hero, selected work (3–4 cards), brief about, Studio link
/work/      Work index — all case studies listed
/work/:id   Case study — individual project deep-dive
/about      About — bio, philosophy, experience, the dual identity
```

Optional depending on scope:
```
/writing    Writing index — AdAge piece, LinkedIn posts, anything published
```

### Navigation

Sticky nav, same unified-bar pattern as Studio:
- Left: `GP` mark or `//` glyph + "George Penston" — anchors to top
- Right: mode toggle (same Dieter Rams I/O switch)
- No hamburger — always visible

On work/case study pages, left slot shows a back-arrow + "Work" label.

---

## 4. Home Page

### Hero

Left-aligned. Not centered.

```
[kicker — mono label]   Bureau · CH. 00
[h1]                    George Penston
[bio]                   Design Director at LinkedIn. I lead the teams
                        that design Profile, Pages, Messaging, and Groups —
                        and build the tools I can't find anywhere else.
[cta]                   View work →     Penston Studio ↗
```

The bio is two sentences max. One covers the day job, one covers the making. The "Penston Studio" link opens in a new tab.

### Selected Work (3–4 cards)

Row-based cards, same pattern as the project cards on Studio. Each card:
- Company/product wordmark or icon (left)
- Title + one-line description
- Role badge (e.g., "Design Director") + year
- Arrow

Suggested selection:
1. LinkedIn Dark Mode — the one that went viral
2. LinkedIn Generative AI — most recent, most forward-looking
3. LinkedIn Games — unexpected, shows range
4. [One Pinterest piece] — shows breadth beyond LinkedIn

### Brief About / Studio Bridge

Short paragraph — 2–3 sentences — then a horizontal divider, then a card linking to Penston Studio. Something like:

> Penston Studio is where the side projects live — the things I build because
> I want them to exist. Markedly, Pour Over for Raindrop, whatever comes next.

---

## 5. Case Study Page

This is where the portfolio earns its weight. Each case study should feel like a well-edited trade article, not a UX process dump.

### Structure

```
[kicker]        01 — Context
[h1]            The case study headline — punchy, not descriptive
[meta row]      LinkedIn · Design Director · 2022–2023

[lead]          One strong paragraph: what was the problem and why it mattered.
                Not "we conducted 12 user interviews." Start with the stakes.

[section]       02 — The Work
                Primary artifact: full-width hero image or device mockup.
                Then narrative paragraphs — what we built and why those choices.

[section]       03 — Impact
                What happened. Concrete if possible (viral article, 1,149 likes,
                launched to X% of users). Honest if the metrics aren't shareable.

[section]       04 — What I Learned
                One paragraph. First-person. The thing that surprised you or
                changed how you think. Optional — skip if nothing genuine to say.

[footer cta]    ← Previous work     Next work →
```

### Image treatment

Same plate pattern from Studio: every image gets a caption label (`FIG. 01 — Main states`). Full-bleed on desktop, stacks cleanly on mobile.

### What not to do in case studies

- Don't lead with the process. Lead with the problem.
- Don't include affinity maps or sticky-note photos.
- Don't write "I was responsible for…" — just say what you did.
- Don't pad with "this project taught me the importance of collaboration." Real lessons only.
- Keep it to 600–900 words of body copy. Photography and craft carry the rest.

---

## 6. About Page

Three beats:

**1. The short version** (2–3 sentences) — for people who scan.
> Design Director at LinkedIn, where I lead the teams shaping how
> 1B+ people present themselves and connect with each other.
> I also build the tools I wish existed.

**2. The longer version** — editorial paragraphs covering:
- Philosophy: design as infrastructure, not decoration. "The substrate."
- LinkedIn work: what the scale actually means, what you've shipped
- The making: why side projects, why code, what you're building toward
- One or two quotes that actually guide how you work (Bob Iger on vision, Rams on good design)

**3. The facts** (mono-label table or spec-row style):
```
Currently     Design Director, LinkedIn (Sep 2018 — present)
Previously    Design Director, Pinterest · Head of Product & Design, Flite
Education     Art Institute of Atlanta
Published     AdAge, Adobe Press, CreativePro, Macworld
Patent        Method and system to provide composite view... (2015)
```

---

## 7. Framer-Specific Notes

### CMS Collections

Use Framer CMS for case studies — one collection, one template. Fields:
- `title` (text)
- `kicker` (text — the mono label)
- `description` (text — one-line card description)
- `role` (text — badge label)
- `year` (text)
- `company` (text)
- `heroImage` (image)
- `body` (rich text — styled to match the type system)
- `order` (number — for controlling card/list sequence)

### Components to build first

1. **Sticky nav** — reusable across all pages. Mode toggle wired to `localStorage` + `prefers-color-scheme` (same logic as Studio, adapted for Framer's override system).
2. **Work card** — used on home and work index. Left-aligned, row-based.
3. **Section label** — mono, uppercase, `N —` prefix.
4. **Case study hero** — full-bleed image + caption label.
5. **Mode toggle** — the I/O switch; replicate in Framer using state variables.

### Tokens in Framer

Set up all colors as Framer variables (not hardcoded fills). Use the exact hex values from §2. Create two variable sets: Dark (default) and Light, toggled by a global `mode` variable.

### Animations

- **Scroll-reveal:** Framer's built-in scroll animations. `opacity: 0 → 1`, `translateY: 16px → 0`, 600ms ease-out. Apply to section content, not individual words.
- **Stagger:** Use Framer's stagger on hero elements — 120ms per item.
- **Page transition:** Framer's built-in smart animate between pages covers most of it. Add a 360ms fade-up on arrival (`opacity: 0 → 1`, `translateY: 8px → 0`) to match Studio's View Transitions feel.
- **No parallax, no scroll-jacking.** The page scrolls like a document.

---

## 8. What's Different from Penston Studio

| | Penston Studio | gpenston.com |
|---|---|---|
| Purpose | Product showcase | Career portfolio |
| Primary audience | Potential app users | Recruiters, peers, hiring managers |
| Primary content | App landing pages | Case studies, bio |
| Navigation depth | 3 flat pages | 2-level (index → case study) |
| CTA | Download / GitHub | View work / Contact |
| Voice register | Side project maker | Design leader who also makes |
| Platform | Hand-coded HTML/CSS/JS | Framer |

The aesthetic carries over fully. The content strategy and information architecture are different.

---

## 9. Prompt for AI / Framer AI

If using an AI tool to help generate layouts or copy, use this prompt as a starting point:

---

*Design a portfolio website for George Penston, Design Director at LinkedIn and independent maker. The aesthetic is bureau/instrument — think Dieter Rams, Eames Office, trade publication. Warm near-black background (#0c0b08), bone/cream text (#e8e2cf), signal orange accent (#eb5a00), no other saturated colors. Fonts: Space Grotesk (weight 500) for headlines, Inter for body copy, JetBrains Mono for labels and system chrome. Max container width 880px. Section labels are mono uppercase with a chapter number prefix (01 —, 02 —). One emphasized word per headline, in muted teal (#7aa9a3), not italic. Light mode exists as a distinct bone paper aesthetic (#efece4 background), not a dark-mode inversion. No gradients, no marketing voice, no emoji, no hamburger menu. The tone is confident, first-person, editorial — a trade portfolio, not a personal brand exercise. The work does the talking.*

---

## 10. Reference Files

The full token set, component patterns, and motion specs are documented in the Penston Studio design system:

→ `penston-studio/docs/design-system.md` — the canonical reference
→ `penston-studio/assets/style.css` — all tokens and components implemented in CSS
→ `penston.studio` — the live reference site
