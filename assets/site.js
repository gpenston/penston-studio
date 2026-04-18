// Mode toggle: persisted in localStorage; falls back to OS preference, then dark.
(function () {
  var KEY = 'ps_mode';
  var stored = localStorage.getItem(KEY);
  var osPrefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  var saved = stored || osPrefers;
  document.documentElement.setAttribute('data-mode', saved);

  function playClick() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var len = Math.floor(ctx.sampleRate * 0.018);
      var buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 10);
      }
      var src = ctx.createBufferSource();
      src.buffer = buf;
      var gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.016);
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch (e) {}
  }

  function wire() {
    var root = document.documentElement;

    document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.dataset.mode === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-mode', next);
        localStorage.setItem(KEY, next);
        playClick();
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
