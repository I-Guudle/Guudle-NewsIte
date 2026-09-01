/** SaaS Development — process tab interactions */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="saas"]')) return;
    const tabs = document.querySelectorAll('[data-saas-process-step]');
    const panels = document.querySelectorAll('[data-saas-process-panel]');
    if (!tabs.length) return;
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const step = tab.dataset.saasProcessStep;
        tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.saasProcessPanel === step));
      });
    });
  });
})();
