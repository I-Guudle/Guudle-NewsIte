/**
 * Guudle — Enterprise Our Development Process page (stats, reveals, ambient)
 * Process console interactions: dev-process.js
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.querySelector('[data-gproc-root]');
  if (!root) return;

  /* Stat counters */
  const counters = root.querySelectorAll('[data-gproc-count]');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.gprocCount || '0');
    const suffix = el.dataset.gprocSuffix || '';
    const prefix = el.dataset.gprocPrefix || '';
    const isDecimal = String(target).includes('.');
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = prefix + (isDecimal ? val.toFixed(0) : Math.round(val)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (counters.length && !reduced) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted) return;
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cObs.observe(c));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.gprocPrefix || '') + el.dataset.gprocCount + (el.dataset.gprocSuffix || '');
    });
  }

    /* Ambient parallax on journey section */
    const devproc = root.querySelector('.devproc-section');
    const blobs = devproc?.querySelectorAll('.devproc-flow-bg__blob');
    if (blobs?.length && !reduced) {
      devproc.addEventListener('mousemove', (e) => {
        const rect = devproc.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        blobs.forEach((blob, i) => {
          const shift = (i + 1) * 8;
          blob.style.transform = `translate(${x * shift}px, ${y * shift}px)`;
        });
      }, { passive: true });
    }

  /* Generic reveals */
  root.querySelectorAll('.gproc-reveal').forEach((el) => {
    if (reduced) { el.classList.add('is-visible'); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
  });
})();
