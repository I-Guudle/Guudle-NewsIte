/**
 * PWA landing — offline/online toggle demo
 */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-pwa-offline-toggle]');
    const demo = document.querySelector('[data-pwa-demo-app]');
    if (!toggle || !demo) return;
    toggle.querySelectorAll('[data-pwa-toggle-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.pwaToggleBtn;
        toggle.querySelectorAll('[data-pwa-toggle-btn]').forEach((b) => b.classList.toggle('is-active', b === btn));
        demo.classList.toggle('is-offline', mode === 'offline');
        const status = demo.querySelector('[data-pwa-status-text]');
        if (status) status.textContent = mode === 'offline' ? 'Offline Mode' : 'Online · Synced';
      });
    });
  });
})();
