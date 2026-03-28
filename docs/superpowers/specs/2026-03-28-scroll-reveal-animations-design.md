---
title: Scroll-Reveal & Entrance Animations
date: 2026-03-28
status: approved
---

# Scroll-Reveal & Entrance Animations

## Overview

Add scroll-triggered entrance animations and a staggered hero load animation to penston.studio. Motion is purposeful and restrained — mid-century modern sensibility, not decorative. Vanilla JS only, no dependencies, no build step.

## Scope

All three pages: `index.html`, `markedly/index.html`, `pour-over/index.html`.

## Approach

CSS classes own all animation state. JS only toggles classes and sets CSS custom properties — it never sets inline styles for visual values. This keeps motion logic in one place and makes tuning easy.

## CSS Changes (`assets/style.css`)

Two animation states added as attribute selectors:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  transition-delay: calc(var(--stagger-index, 0) * 0.15s);
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

The `--stagger-index` custom property drives per-element delay for hero stagger. Scroll-reveal elements leave it unset (defaults to `0`, no delay).

### Hover refinement

`.project-card:hover` `transform` updated from `translateY(-2px)` → `translateY(-3px)`. Shadow and border-color already correct.

## JavaScript (`assets/animations.js`)

Single file, loaded with `defer` in each page's `<head>`. Target: under 50 lines.

### Scroll-reveal

- `IntersectionObserver` watches all `[data-reveal]` elements
- `rootMargin: '-64px'`, threshold: `0`
- On intersection: add `.is-revealed`, then `unobserve` (fires once per element)

### Hero stagger

- Runs on `DOMContentLoaded`
- Finds all `[data-stagger]` elements
- Sets `--stagger-index` CSS custom property from attribute value
- Adds `.is-revealed` inside a `requestAnimationFrame` to ensure initial hidden state has painted

## HTML Changes

### `index.html` — hero stagger targets

| Element | `data-stagger` |
|---------|---------------|
| `.hero-label` | `0` |
| `.hero-name` | `1` |
| `.hero-bio` | `2` |

### `index.html` — scroll-reveal targets

| Element | `data-reveal` |
|---------|--------------|
| `.section-label` (Projects) | ✓ |
| Each `.project-card` | ✓ |

### `markedly/index.html` — hero stagger targets

| Element | `data-stagger` |
|---------|---------------|
| `.app-identity` | `0` |
| `.hero-headline` | `1` |
| `.hero-sub` | `2` |
| `.cta-group` | `3` |

### `markedly/index.html` — scroll-reveal targets

| Element | `data-reveal` |
|---------|--------------|
| Each `.section-label` | ✓ |
| Each `.feature-item` | ✓ |
| `.why-body` | ✓ |

### `pour-over/index.html` — same pattern as markedly

Same stagger and scroll-reveal targets as markedly.

## Constraints

- No frameworks, no npm, no build step
- Must not break existing layout or styles
- Dark mode already handled in CSS — animations are mode-agnostic
- JS file under ~50 lines
- `prefers-reduced-motion` respected via CSS only
