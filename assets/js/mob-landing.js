/**
 * Guudle — Mobile App Development landing (page-specific)
 */
(function () {
  'use strict';

  function initDeviceCluster() {
    const cluster = document.querySelector('[data-mob-device-cluster]');
    if (!cluster || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.addEventListener('scroll', () => {
      const rect = cluster.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = center * 0.04;
      cluster.style.setProperty('--mob-parallax-y', `${offset}px`);
    }, { passive: true });
  }

  function initProcessSteps() {
    const steps = document.querySelectorAll('[data-mob-process-step]');
    if (!steps.length) return;
    steps.forEach((step) => {
      step.addEventListener('click', () => {
        const active = step.classList.contains('is-active');
        steps.forEach((s) => {
          s.classList.remove('is-active');
          s.setAttribute('aria-expanded', 'false');
        });
        if (!active) {
          step.classList.add('is-active');
          step.setAttribute('aria-expanded', 'true');
        }
      });
    });
    if (steps[0]) {
      steps[0].classList.add('is-active');
      steps[0].setAttribute('aria-expanded', 'true');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="mob"]')) return;
    initDeviceCluster();
    initProcessSteps();
  });
})();
