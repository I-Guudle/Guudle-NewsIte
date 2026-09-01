/**
 * Guudle — Mobile Services landing interactions
 */
(function () {
  'use strict';

  function initProcessSteps() {
    const steps = document.querySelectorAll('[data-msl-process-step]');
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
    steps[0]?.classList.add('is-active');
    steps[0]?.setAttribute('aria-expanded', 'true');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="msl"]')) return;
    initProcessSteps();
  });
})();
