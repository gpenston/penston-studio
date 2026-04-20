// Mode toggle: persisted in localStorage; falls back to OS preference.
(function () {
  var KEY = 'ps_mode';

  function getOSMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply persisted preference, or fall back to OS. (FOUC already handled by
  // the inline <head> script — this ensures deferred load stays in sync.)
  var stored = localStorage.getItem(KEY);
  var mode = stored !== null ? stored : getOSMode();
  document.documentElement.setAttribute('data-mode', mode);

  function playClick() {
    try {
      // Fresh context per click — a cached/reused context can drift into a
      // suspended state that resume() can't reliably unblock on Safari desktop.
      // Creating a new one each time matches the original working behaviour.
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Bake amplitude decay into the buffer so there's no AudioParam scheduling
      // relative to ctx.currentTime (which can be stale by the time start fires).
      var len = Math.floor(ctx.sampleRate * 0.02);
      var buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 8) * 0.3;
      }
      var src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      // resume() as a hint — fire-and-forget, not awaited. src.start() runs
      // immediately; if the context is suspended the source queues and plays
      // as soon as the context becomes running (Safari auto-resumes on gesture).
      ctx.resume();
      src.start();
      src.onended = function () { try { ctx.close(); } catch (e) {} };
    } catch (e) {}
  }

  // Keep theme-color meta in sync for Chrome / Firefox.
  // Safari 26 toolbar tint is handled entirely in CSS via color-scheme
  // on [data-mode] selectors — no JS intervention needed.
  function syncThemeColor() {
    var color = document.documentElement.dataset.mode === 'dark' ? '#0c0b08' : '#efece4';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', color);
    });
  }

  function wire() {
    var root = document.documentElement;

    document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.dataset.mode === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-mode', next);
        localStorage.setItem(KEY, next);
        syncThemeColor();
        playClick();
      });
    });

    // Follow OS preference changes in real-time (e.g. macOS auto dark/light
    // schedule, or user switching system theme). Updates localStorage so the
    // next page load also reflects the new OS preference.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      function onOSChange(e) {
        root.setAttribute('data-mode', e.matches ? 'dark' : 'light');
        localStorage.setItem(KEY, e.matches ? 'dark' : 'light');
        syncThemeColor();
      }
      if (mq.addEventListener) {
        mq.addEventListener('change', onOSChange);
      } else if (mq.addListener) { // Safari < 14
        mq.addListener(onOSChange);
      }
    }

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

    // Smooth animated scroll for anchor links (e.g. Support, Privacy, # top).
    // easeOutExpo: fast start, physical settle — matches the site's motion language.
    function easeOutExpo(t) {
      return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    function animateScroll(dest, duration) {
      var start = window.pageYOffset;
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / duration, 1);
        window.scrollTo(0, start + (dest - start) * easeOutExpo(p));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        // bare '#' = scroll to top
        if (id === '#') {
          e.preventDefault();
          if (window.pageYOffset > 0) animateScroll(0, 550);
          return;
        }
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var chrome = document.querySelector('.sticky-chrome');
        var offset = (chrome ? chrome.offsetHeight : 0) + 20;
        var dest = target.getBoundingClientRect().top + window.pageYOffset - offset;
        animateScroll(dest, 650);
      });
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { wire(); syncThemeColor(); });
  } else {
    wire();
    syncThemeColor();
  }
})();
