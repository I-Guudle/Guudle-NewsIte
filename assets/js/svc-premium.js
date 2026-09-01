/**
 * Premium service landing interactions
 */
(function () {
  'use strict';

  function initAos() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
    }
  }

  function initHubHighlight() {
    const hub = document.querySelector('[data-pre-hub]');
    if (!hub) return;
    const nodes = hub.querySelectorAll('[data-pre-hub-node]');
    let idx = 0;

    nodes.forEach((node, i) => {
      node.addEventListener('mouseenter', () => {
        nodes.forEach((n) => n.classList.remove('is-highlight'));
        node.classList.add('is-highlight');
      });
      node.addEventListener('mouseleave', () => node.classList.remove('is-highlight'));
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setInterval(() => {
      nodes.forEach((n) => n.classList.remove('is-highlight'));
      nodes[idx]?.classList.add('is-highlight');
      idx = (idx + 1) % nodes.length;
    }, 3000);
  }

  function initProcessWheel() {
    const root = document.querySelector('[data-pre-process]');
    if (!root) return;

    const nodes = root.querySelectorAll('[data-pre-wheel-node]');
    const cards = root.querySelectorAll('[data-pre-process-card]');

    function activate(i) {
      nodes.forEach((n, j) => {
        const active = j === i;
        n.classList.toggle('is-active', active);
        n.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      cards.forEach((c, j) => {
        const active = j === i;
        c.classList.toggle('is-active', active);
        if (active) {
          c.removeAttribute('hidden');
        } else {
          c.setAttribute('hidden', '');
        }
      });
    }

    nodes.forEach((node, i) => {
      node.addEventListener('click', () => activate(i));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(i);
        }
      });
    });
  }

  function initStatCounters() {
    const els = document.querySelectorAll('[data-pre-count]');
    if (!els.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate(el) {
      const target = parseFloat(el.dataset.preCount);
      const suffix = el.dataset.preSuffix || '';
      if (Number.isNaN(target) || reduced) return;

      const isDecimal = String(el.dataset.preCount).includes('.');
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    els.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAos();
    initHubHighlight();
    initProcessWheel();
    initStatCounters();
  });
})();
