/**
 * Guudle — Website Development landing (page-specific)
 */
(function () {
  'use strict';

  function initProcessRail() {
    const steps = document.querySelectorAll('[data-wbd-process-step]');
    const panels = document.querySelectorAll('[data-wbd-process-panel]');
    if (!steps.length) return;
    steps.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.wbdProcessStep;
        steps.forEach((s) => {
          const active = s === btn;
          s.classList.toggle('is-active', active);
          s.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.wbdProcessPanel === id));
      });
    });
    steps[0]?.click();
  }

  function initFeatureModal() {
    const modal = document.getElementById('wbd-feature-modal');
    if (!modal) return;
    const title = modal.querySelector('[data-wbd-modal-title]');
    const body = modal.querySelector('[data-wbd-modal-body]');
    const closeBtns = modal.querySelectorAll('[data-wbd-modal-close]');

    document.querySelectorAll('[data-wbd-feature-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (title) title.textContent = btn.dataset.wbdFeatureTitle || '';
        if (body) body.textContent = btn.dataset.wbdFeatureBody || '';
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    closeBtns.forEach((b) => b.addEventListener('click', close));
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  function initBrowserTilt() {
    const stack = document.querySelector('.wbd-browser-stack');
    const browser = stack?.querySelector('.wbd-browser');
    if (!stack || !browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stack.addEventListener('mousemove', (e) => {
      const rect = stack.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      browser.style.transform = `perspective(1200px) rotateY(${-6 + x * 8}deg) rotateX(${4 - y * 6}deg)`;
    });
    stack.addEventListener('mouseleave', () => {
      browser.style.transform = 'perspective(1200px) rotateY(-6deg) rotateX(4deg)';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('[data-slp-prefix="wbd"]')) return;
    initProcessRail();
    initFeatureModal();
    initBrowserTilt();
  });
})();
