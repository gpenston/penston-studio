// Mode toggle: persisted in localStorage; falls back to OS preference, then dark.
(function () {
  var KEY = 'ps_mode';
  var stored = localStorage.getItem(KEY);
  var osPrefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  var saved = stored || osPrefers;
  document.documentElement.setAttribute('data-mode', saved);

  function wire() {
    var root = document.documentElement;
    document.querySelectorAll('[data-mode-set]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.modeSet === root.dataset.mode);
      btn.addEventListener('click', function () {
        var mode = btn.dataset.modeSet;
        root.setAttribute('data-mode', mode);
        localStorage.setItem(KEY, mode);
        document.querySelectorAll('[data-mode-set]').forEach(function (b) {
          b.classList.toggle('is-active', b.dataset.modeSet === mode);
        });
      });
    });

    // Scroll-reveal — IntersectionObserver with a full-reveal fallback after 2.5s
    var reveals = document.querySelectorAll('[data-reveal]');
    var staggers = document.querySelectorAll('[data-stagger]');
    staggers.forEach(function (el) {
      el.style.setProperty('--stagger-index', el.dataset.stagger);
      el.classList.add('is-revealed');
    });
    var vh = window.innerHeight;
    reveals.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh + 200) el.classList.add('is-revealed');
    });
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px 100px 0px' });
      reveals.forEach(function (el) {
        if (!el.classList.contains('is-revealed')) obs.observe(el);
      });
    }
    // Safety net: whatever hasn't revealed in 2.5s, reveal anyway.
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add('is-revealed'); });
    }, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
