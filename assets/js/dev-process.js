/**
 * Guudle — Development Process Journey Flow
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initRoot(root) {
    const cards = [...root.querySelectorAll('[data-devproc-card]')];
    const nodes = [...root.querySelectorAll('[data-devproc-node]')];
    const fill = root.querySelector('.devproc-journey__fill');
    const head = root.querySelector('.devproc-head');

    if (head && !reduced) {
      const hObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { head.classList.add('is-visible'); hObs.disconnect(); }
      }, { threshold: 0.2 });
      hObs.observe(head);
    } else if (head) {
      head.classList.add('is-visible');
    }

    if (!cards.length) return;

    function setProgress(activeIdx) {
      const total = cards.length;
      if (nodes.length) {
        nodes.forEach((node, i) => {
          node.classList.toggle('is-active', i === activeIdx);
          node.classList.toggle('is-done', i < activeIdx);
        });
      }
      if (fill && total > 1) {
        const pct = (activeIdx / (total - 1)) * 100;
        fill.style.width = `${Math.min(100, pct)}%`;
      }
    }

    if (reduced) {
      cards.forEach((c) => c.classList.add('is-inview'));
      setProgress(cards.length - 1);
      if (fill) fill.style.width = '100%';
      return;
    }

    let activeIdx = 0;
    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        const idx = parseInt(entry.target.dataset.devprocCard, 10);
        if (!Number.isNaN(idx) && idx >= activeIdx) {
          activeIdx = idx;
          setProgress(activeIdx);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });

    cards.forEach((card) => cardObs.observe(card));
    setProgress(0);
  }

  function boot() {
    document.querySelectorAll('[data-devproc-root]').forEach(initRoot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
