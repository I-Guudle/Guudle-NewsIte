/**
 * Guudle — Service landing page interactions (svc prefix)
 */
(function () {
  'use strict';

  function initReveal() {
    const els = document.querySelectorAll('[data-svc-reveal]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="svc"]')) return;
    initReveal();
  });
})();
