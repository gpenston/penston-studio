# penston.studio — Next-Session Plan (post-critique)

_Written 2026-07-11, after a `/design-critique` pass on the homepage, Markedly, and Pour Over. The site is in a strong, near-final place; this is a prioritized plan for the next working session. The product-shot showcase is the known biggest gap and is the centerpiece here._

---

## Critique findings inventory

| # | Finding | Severity | Lands in |
|---|---------|----------|----------|
| 1 | Pour Over hero showcase (`PL. 01 / MAIL CLIENT`) shows a placeholder Reddit email, not a real Pour Over digest | 🟡 | Workstream A |
| 2 | Mode toggle is a 32×32 tap target (under the 44×44 guideline) | 🟢 | Workstream C |
| 3 | "GitHub Flavored Markdown" feature heading is denser/longer than its 3 grid siblings | 🟢 | Workstream C |
| 4 | Product-page metadata row (`MACOS · FREE · 1.0`) competes with the H1; version number over-weighted | 🟡 | Workstream B |
| 5 | Accent orange is doing too many jobs at once (numbering + metadata + chips + CTAs) — dilutes the primary-action signal | 🟡 | Workstream B |
| 6 | Plate captions (`PL. 01 …`) sit on the `--bg-tertiary` band at `--text-tertiary` — lower contrast than the rest of the page | 🟢 | Workstream A |
| 7 | Works With mobile type (12.5px) diverges from the feature-grid mobile type | 🟢 (likely no-op) | Workstream C |

---

## Workstream A — Product Showcase Rework ⭐ (the centerpiece)

The `.product-showcase` section on both product pages is the least-loved part of the site. It also absorbs critique #1 and #6, so fixing the showcase and fixing those findings is one job.

**What's wrong today**
- **Full-bleed dark/tan band.** `.product-showcase` uses `background: var(--bg-tertiary)` with full-width negative margins (`assets/style.css:1272`). It reads as a heavy inserted panel that fights the otherwise-airy paper/near-black canvas.
- **MacBook-outline framing clips/bunches.** The `.device-macbook` + `.device-macbook-base` frame (a drawn laptop silhouette) crowds the screenshot and clips awkwardly at some widths.
- **Pour Over PL. 01 is a placeholder.** The Mail.app framing is right, but the _email content shown_ is a generic Reddit/Apple-community post, not an actual Pour Over digest. The asset (`pour-over-shot-digest-desktop.png`) needs to be a real digest email. This is the single most impactful, lowest-effort win in the whole plan.
- **Caption contrast.** `.plate-num`/`.plate-cap` (`--text-tertiary` on `--bg-tertiary`) should be spot-checked against WCAG AA once the band is re-treated.

**Sub-tasks**
1. **Content audit** — inventory every plate on both pages, decide which screenshots stay, which get reshot. Pour Over PL. 01 (real digest email) is the clear must-fix. Markedly's four plates are on-message; they mainly inherit the structural fixes below.
2. **Framing decision** (see decisions) — pick one consistent device/chrome treatment.
3. **Background treatment** — drop or lighten the full-bleed band so shots sit on the native canvas; add a subtle border/shadow so light-mode shots still read.
4. **Caption contrast** — fix as part of re-treating the band.
5. **Filmstrip interaction** (the ambitious piece) — a row of thumbnails; the selected/hovered one enlarges as the featured shot. This is a genuinely new interaction and deserves its own short brainstorming/design pass before building.

**Decisions to make (bring opinions):**
- **Framing:** (a) clean macOS window chrome for all shots · (b) app-appropriate chrome (Mail.app for Pour Over, Finder/window for Markedly) · (c) no frame — just clean rounded screenshots on the canvas with a hairline border. _Leaning (c) or (a): both sidestep the MacBook-outline clipping._
- **Filmstrip model:** click-to-swap vs hover-to-swap; auto-advance or not; and mobile behavior (horizontal thumbnail scroll vs. a simpler stacked fallback). **Constraint:** the design system forbids scroll-jacking/scroll-tied animation — the filmstrip must be a self-contained click/hover component, not scroll-driven. Vanilla JS only (no framework on this site).

**Blocker / prerequisite:** a real Pour Over digest-email screenshot (desktop + ideally mobile). George likely needs to generate this from an actual Pour Over run — flag it before the session so it's not a surprise mid-build.

**Recommendation:** run the **brainstorming skill** on the filmstrip interaction at the top of the showcase work — it's novel enough (interaction model + responsive behavior + the no-scroll-jack constraint) to warrant a quick design pass before code.

---

## Workstream B — Accent & Emphasis Rebalance

Absorbs critique #4 and #5 — same underlying issue (orange overload). Per the design doc, orange is meant to mark "only the single most important action per view," but today it also marks section numbers, the chapter marker, metadata, format-tag highlights, and badges — so no single one reads as _the_ primary action.

**Options:**
- **A — Keep orange dual-purpose** (status quo, made a conscious choice). Cheapest; changes nothing.
- **B — Full split:** wayfinding numbers/chapter markers move to neutral or the cool accent; orange reserved strictly for actionable elements. Strongest hierarchy, but risks weakening the D-DIN-numeral signature that's part of the site's identity.
- **C — Targeted (recommended):** _keep_ the D-DIN section numbers orange (they're wayfinding **and** a signature), but pull back the _incidental_ orange — specifically the metadata row (`MACOS · FREE · 1.0`), where the version number reads as loud as "Free." De-weight metadata (neutral tone, or only accent the platform) so the H1 is unambiguously dominant. This fixes #4 and most of #5 without touching the identity.

**Rollout once decided:** shared CSS change, verify across all three pages + both modes. Low mechanical risk; the _decision_ is the real work.

---

## Workstream C — Small Polish (quick, low-risk mop-up)

- **#2 Mode toggle tap target** — expand the hit area toward 44×44 while keeping the visible icon at 32px (note: the hover pill will grow with the hit area, so tune the pill radius/size together).
- **#3 GFM feature heading** — shorten "GitHub Flavored Markdown" (e.g. "GFM output") so all four feature cells read at similar density.
- **#7 Works With mobile type** — sanity-check the 12.5px label against the feature grid on a real device; likely no change needed (it was a deliberate anti-wrap fix), just confirming.

---

## Recommended session flow

1. **Decide accent direction (Workstream B)** first — it's a quick call that needs George's input, and it sets the tone treatment the showcase captions/labels should inherit.
2. **Product showcase rework (Workstream A)** — the meat of the session. Start with a brainstorming pass on the filmstrip, then build. Make sure the Pour Over digest asset is in hand before starting.
3. **Small polish (Workstream C)** — mop up at the end.

Each item ships as its own small branch/PR per the usual flow.

---

## Explicitly out of scope — preserve, don't touch

The critique's "what works well," to protect during the above:
- The three-typeface system (Hanken Grotesk / Martian Mono / D-DIN).
- The FARA callout's understated, personal tone.
- Official Mac App Store / GitHub badges (not custom buttons).
- Format-tag highlighting (common formats in orange, rare in neutral) — functional, keep it.
- The nightfall/sunup mode transition and the nav hover-pill convention — both just landed and are good.

---

## Appendix — full critique (2026-07-11, for reference)

### Overall Impression
The typographic/editorial system (Hanken Grotesk + Martian Mono + D-DIN numerals, numbered sections, warm near-black/bone duotone) is genuinely distinctive and well-executed — it reads as one coherent voice across all three pages and both modes. The biggest opportunity is that the single accent color is now doing too many unrelated jobs at once (numbering, metadata, feature chips, CTAs), which dilutes what should be the strongest hierarchy signal on the page.

### Usability
| Finding | Severity | Recommendation |
|---|---|---|
| Pour Over's first showcase image ("PL. 01 / MAIL CLIENT") shows an iPad/iPhone/Watch collage with Reddit content — doesn't visually connect to "your read-later list, brewed fresh daily" | 🟡 Moderate | Swap for an actual digest-email screenshot, or add a one-line caption clarifying what's being shown. First thing after the hero — it should reinforce the value prop. |
| Mode toggle is a 32×32px tap target | 🟢 Minor | Below the 44×44 guideline. Pad the hit area even if the visible icon stays 32px. |
| "GitHub Flavored Markdown" feature heading runs noticeably longer/denser than its three siblings | 🟢 Minor | Shorten to "GFM output" so all four cells read at similar density. |

### Visual Hierarchy
- **What draws the eye first (desktop hero):** the H1 — correct.
- **What draws the eye first (mobile, product pages):** the all-caps orange metadata row ("MACOS · FREE · 1.0") competes hard with the H1 below it, because all three values get identical accent weight regardless of importance. The version number is the least meaningful yet reads as loud as "Free."
- **Reading flow:** clean top-to-bottom scan; the numbered section labels do real wayfinding work.
- **Emphasis:** accent orange is spread across section numbers, chapter marker, metadata, format-tag highlights, badges, and buttons. Per the design doc, orange should mark "only the single most important action per view" — in practice it marks six or seven kinds of things, so none pops as _the_ primary action.

### Consistency
| Element | Issue | Recommendation |
|---|---|---|
| Accent orange | Used for numbering/wayfinding AND CTA/emphasis — two jobs, one color | Consider shifting section numbers/chapter markers to neutral or the cool accent, reserving orange strictly for actionable elements. Bigger system change — deliberate, not reactive. |
| Works With mobile type (12.5px) vs. feature-grid mobile type | Intentional divergence from the anti-wrap fix | Sanity-check side-by-side on a real device; likely no action. |
| Plate caption contrast ("PL. 01 / MAIN WINDOW") on the tan/olive band | Small mono label on a mid-tone band — lower contrast than the page's general pairings | Spot-check against WCAG AA; not covered by the earlier `--text-tertiary` fix, which targeted the primary background. |

### Accessibility
- **Color contrast:** primary body/heading text passes comfortably in both modes. Double-check the plate-caption-on-band case.
- **Touch targets:** mode toggle at 32×32 is under 44×44; other nav items have more generous padding.
- **Text readability:** body line-height and measure are comfortable throughout.

### What Works Well
- The three-typeface system is confident and unusual in a good way — not generic template output.
- Format-tag highlighting (common formats orange, rare neutral) is a useful functional detail.
- The FARA callout is understated and personal rather than guilt-tripping.
- Mobile reflow across all three pages is clean.
- Official Mac App Store / GitHub badges instead of custom buttons — a trust detail easy to skip that wasn't.
- FAQ copy is specific and human ("I never see what you approve") — the site's voice working as intended.

### Priority Recommendations
1. **Fix the Pour Over hero showcase image** — first thing under the fold; currently undercuts the value prop. Highest-impact, lowest-effort.
2. **Rebalance metadata weight on product pages** — de-emphasize the version number (or all metadata) so the H1 is unambiguously strongest, especially on mobile.
3. **Decide orange's job, deliberately** — keep it dual-purpose as a conscious choice, or split wayfinding (neutral/cool) from action (orange). Worth a dedicated conversation.
