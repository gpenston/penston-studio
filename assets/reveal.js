/* reveal.js — shared scroll-reveal runtime for penston.studio and
   gpenston.com. Keep this file byte-identical in both repos:
     penston-studio/assets/reveal.js
     gpenston-portfolio/public/reveal.js

   Contract (each site's CSS implements the visual half):
   - The inline <head> script adds `js` to <html>, then removes it after 3s
     unless this script has added `reveal-live`. All hiding CSS is gated on
     `html.js`, so a missing or failed script can never leave a page blank.
   - [data-reveal] elements fade up. [data-reveal-trigger] elements don't
     fade themselves; they only stage descendants (e.g. a pullquote's
     highlighter). Both get `data-revealed` once, and keep it.
   - Default trigger: 64px inside the viewport, same as the portfolio's
     original Framer `useInView({ once: true, margin: "-64px" })`.
     data-reveal-amount="0.6" waits until that fraction is visible instead.
   - Elements added later (gpenston.com's client-side navigation) are picked
     up by a MutationObserver. Nothing here is React-managed, so hydration
     and re-renders never strip `data-revealed`. */
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window) || !window.WeakSet) {
    root.classList.remove('js');
    return;
  }

  var SELECTOR = '[data-reveal], [data-reveal-trigger]';
  var observers = {};
  var watched = new WeakSet();

  function observerFor(amount) {
    var key = amount || 'margin';
    if (!observers[key]) {
      observers[key] = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-revealed', '');
          obs.unobserve(e.target);
        });
      }, amount ? { threshold: parseFloat(amount) } : { rootMargin: '-64px' });
    }
    return observers[key];
  }

  function watch(el) {
    if (watched.has(el) || el.hasAttribute('data-revealed')) return;
    watched.add(el);
    observerFor(el.getAttribute('data-reveal-amount')).observe(el);
  }

  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches(SELECTOR)) watch(node);
    node.querySelectorAll(SELECTOR).forEach(watch);
  }

  scan(document.body);
  new MutationObserver(function (records) {
    records.forEach(function (r) { r.addedNodes.forEach(scan); });
  }).observe(document.body, { childList: true, subtree: true });

  root.classList.add('reveal-live');
})();
