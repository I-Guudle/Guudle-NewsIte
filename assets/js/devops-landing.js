/**
 * Guudle — DevOps landing (page-specific)
 */
(function () {
  'use strict';

  function initPipelineAnimation() {
    const stages = document.querySelectorAll('[data-dvo-pipeline-stage]');
    if (!stages.length) return;
    let idx = 0;
    setInterval(() => {
      stages.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      idx = (idx + 1) % stages.length;
    }, 2200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="dvo"]')) return;
    initPipelineAnimation();
  });
})();
