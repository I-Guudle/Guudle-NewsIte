/**
 * Enterprise page — process tabs & FAQ accordion
 */
(function () {
  'use strict';

  function initProcessTabs(root) {
    const tabs = [...root.querySelectorAll('.cx-process__tab')];
    const panels = [...root.querySelectorAll('.cx-process__panel')];
    if (!tabs.length || !panels.length) return;

    function activate(idx) {
      tabs.forEach((tab, i) => {
        const on = i === idx;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach((panel, i) => {
        const on = i === idx;
        panel.classList.toggle('is-active', on);
        panel.hidden = !on;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
    });

    activate(0);
  }

  function initFaq(root) {
    root.querySelectorAll('.cx-faq__item').forEach((item) => {
      const trigger = item.querySelector('.cx-faq__trigger');
      const panel = item.querySelector('.cx-faq__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        root.querySelectorAll('.cx-faq__item.is-open').forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.cx-faq__trigger')?.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('is-open', !open);
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  }

  function boot() {
    document.querySelectorAll('[data-cx-process]').forEach(initProcessTabs);
    document.querySelectorAll('[data-cx-faq]').forEach(initFaq);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
