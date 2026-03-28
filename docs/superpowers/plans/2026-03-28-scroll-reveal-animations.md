# Scroll-Reveal & Entrance Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-triggered entrance animations, staggered hero load animations, and a refined project card hover state to all three pages of penston.studio.

**Architecture:** CSS owns all animation states via `[data-reveal]` and `[data-stagger]` attribute selectors. A single `assets/animations.js` file toggles `.is-revealed` classes — for scroll targets via IntersectionObserver, for hero elements via DOMContentLoaded + requestAnimationFrame. HTML gets `data-reveal` / `data-stagger` attributes added to target elements.

**Tech Stack:** Vanilla JS, CSS custom properties, IntersectionObserver API. No dependencies, no build step.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `assets/style.css` | Modify | Add `[data-reveal]`, `[data-stagger]` hidden state + `.is-revealed` visible state + reduced-motion override |
| `assets/animations.js` | Create | IntersectionObserver for scroll-reveal; stagger init on DOMContentLoaded |
| `index.html` | Modify | Add `data-stagger` to hero elements, `data-reveal` to section label + cards, fix hover translateY, load script |
| `markedly/index.html` | Modify | Add `data-stagger` to hero elements, `data-reveal` to section labels + feature items + why-body, load script |
| `pour-over/index.html` | Modify | Same as markedly |

---

## Task 1: Add animation CSS to `assets/style.css`

**Files:**
- Modify: `assets/style.css` (append to end of file)

- [ ] **Step 1: Add animation utility styles**

Append to the end of `assets/style.css`:

```css
/* ===== Scroll-reveal & entrance animations ===== */
[data-reveal],
[data-stagger] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-stagger] {
  transition-delay: calc(var(--stagger-index, 0) * 0.15s);
}

[data-reveal].is-revealed,
[data-stagger].is-revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal],
  [data-stagger] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Verify in browser**

Open `index.html` in a browser. The page should be blank/invisible — all elements with `data-reveal` or `data-stagger` will be hidden once HTML is updated. (Nothing is hidden yet because no HTML attributes added — this step just confirms the CSS is valid and parses without error. Use DevTools > Console to check for CSS parse errors.)

- [ ] **Step 3: Commit**

```bash
git add assets/style.css
git commit -m "Add scroll-reveal and stagger animation CSS"
```

---

## Task 2: Create `assets/animations.js`

**Files:**
- Create: `assets/animations.js`

- [ ] **Step 1: Create the file**

Create `assets/animations.js` with this content:

```js
(function () {
  // Scroll reveal — fires once per element on first scroll into view
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-64px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });

  // Hero stagger — runs after first paint so hidden state is visible before reveal
  function initStagger() {
    requestAnimationFrame(function () {
      document.querySelectorAll('[data-stagger]').forEach(function (el) {
        el.style.setProperty('--stagger-index', el.dataset.stagger);
        el.classList.add('is-revealed');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStagger);
  } else {
    initStagger();
  }
}());
```

- [ ] **Step 2: Verify line count**

Run:
```bash
wc -l assets/animations.js
```
Expected: under 50 lines.

- [ ] **Step 3: Commit**

```bash
git add assets/animations.js
git commit -m "Add animations.js — scroll-reveal and hero stagger"
```

---

## Task 3: Update `index.html`

**Files:**
- Modify: `index.html`

Three changes: (a) add script tag to `<head>`, (b) add `data-stagger` to hero elements, (c) add `data-reveal` to section label and project cards, (d) fix hover translateY.

- [ ] **Step 1: Add script tag to `<head>`**

Add before the closing `</head>` tag (after the `<link rel="stylesheet">` line):

```html
  <script defer src="/assets/animations.js"></script>
```

- [ ] **Step 2: Add `data-stagger` to hero elements**

Update the three hero elements (lines ~212–216):

```html
<span class="hero-label" data-stagger="0">Product Design Leader &amp; Maker</span>
<h1 class="hero-name" data-stagger="1">George<br>Penston</h1>
<p class="hero-bio" data-stagger="2">
  I turn big ideas into real products and build teams that bring them to life. This is where the side projects live.
</p>
```

- [ ] **Step 3: Add `data-reveal` to section label and project cards**

```html
<p class="section-label" data-reveal>Projects</p>

<a href="/markedly/" class="project-card" data-reveal>
```

```html
<a href="/pour-over/" class="project-card" data-reveal>
```

- [ ] **Step 4: Fix project card hover — update transition and translateY**

In the inline `<style>` block, find `.project-card` and update the `transition` to use `ease-in-out`:

```css
.project-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  background: var(--bg-secondary);
  text-decoration: none;
  color: var(--text-primary);
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  margin-bottom: 16px;
}
```

Then find `.project-card:hover` and change `translateY(-2px)` to `translateY(-3px)`:

```css
.project-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  color: var(--text-primary);
}
```

- [ ] **Step 5: Verify in browser**

Open `index.html` in a browser (file:// is fine):
- Hero label, name, and bio should fade + slide up in sequence on page load
- Scroll down — "Projects" label and both cards should animate in as they enter the viewport
- Hover a project card — should lift 3px with shadow and accent border

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Add entrance animations to index.html hero and project cards"
```

---

## Task 4: Update `markedly/index.html`

**Files:**
- Modify: `markedly/index.html`

- [ ] **Step 1: Add script tag to `<head>`**

Add before `</head>`:

```html
  <script defer src="/assets/animations.js"></script>
```

- [ ] **Step 2: Add `data-stagger` to hero elements**

The four hero elements in `<section class="hero">` (after the `.back-link`):

```html
<div class="app-identity" data-stagger="0">
```

```html
<h1 class="hero-headline" data-stagger="1">Convert anything<br>to <em>Markdown</em>.</h1>
```

```html
<p class="hero-sub" data-stagger="2">
```

```html
<div class="cta-group" data-stagger="3">
```

- [ ] **Step 3: Add `data-reveal` to scroll targets**

Add `data-reveal` to every `.section-label`, every `.feature-item`, and `.why-body`:

```html
<p class="section-label" data-reveal>Why Markdown?</p>
```

```html
<div class="why-body" data-reveal>
```

```html
<p class="section-label" data-reveal>What it does</p>
```

```html
<div class="feature-item" data-reveal>  <!-- repeat for all 4 feature items -->
```

Add `data-reveal` to any remaining `.section-label` elements further down the page (Supported formats, etc.) following the same pattern.

- [ ] **Step 4: Verify in browser**

Open `markedly/index.html` in a browser:
- App identity, headline, sub, and CTA group should stagger in on load
- Scroll through page — section labels, why-body, and feature items should animate in

- [ ] **Step 5: Commit**

```bash
git add markedly/index.html
git commit -m "Add entrance animations to markedly page"
```

---

## Task 5: Update `pour-over/index.html`

**Files:**
- Modify: `pour-over/index.html`

Same pattern as Task 4.

- [ ] **Step 1: Add script tag to `<head>`**

Add before `</head>`:

```html
  <script defer src="/assets/animations.js"></script>
```

- [ ] **Step 2: Add `data-stagger` to hero elements**

```html
<div class="app-identity" data-stagger="0">
```

```html
<h1 class="hero-headline" data-stagger="1">Your read-later list,<br>brewed <em>fresh daily</em>.</h1>
```

```html
<p class="hero-sub" data-stagger="2">
```

```html
<div class="cta-group" data-stagger="3">
```

- [ ] **Step 3: Add `data-reveal` to scroll targets**

```html
<p class="section-label" data-reveal>The idea</p>
```

```html
<div class="why-body" data-reveal>
```

```html
<p class="section-label" data-reveal>What it does</p>
```

```html
<div class="feature-item" data-reveal>  <!-- repeat for all feature items -->
```

Add `data-reveal` to any remaining `.section-label` elements further down the page following the same pattern.

- [ ] **Step 4: Verify in browser**

Open `pour-over/index.html` in a browser:
- App identity, headline, sub, and CTA group should stagger in on load
- Scroll through page — section labels, why-body, and feature items should animate in

- [ ] **Step 5: Commit**

```bash
git add pour-over/index.html
git commit -m "Add entrance animations to pour-over page"
```

---

## Task 6: Final cross-browser and reduced-motion check

- [ ] **Step 1: Check reduced-motion**

In Chrome DevTools: open Rendering panel (⋮ > More tools > Rendering), enable "Emulate CSS media feature prefers-reduced-motion: reduce". Reload each page — all elements should be immediately visible with no animation.

- [ ] **Step 2: Check dark mode**

In Chrome DevTools Rendering panel, enable "Emulate CSS media feature prefers-color-scheme: dark". Verify animations work correctly in dark mode (they should — animations are mode-agnostic).

- [ ] **Step 3: Push branch and open PR**

```bash
git push origin main
```

Or if on a feature branch:
```bash
git push -u origin HEAD
```
