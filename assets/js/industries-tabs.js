/**
 * Industries We Serve — tabs + accordion
 */
(function () {
  'use strict';

  function initTabs(root) {
    const tabs = Array.from(root.querySelectorAll('[data-indw-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-indw-panel]'));
    if (!tabs.length || !panels.length) return;

    const activate = (id) => {
      tabs.forEach((tab) => {
        const on = tab.getAttribute('data-indw-tab') === id;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.setAttribute('tabindex', on ? '0' : '-1');
      });
      panels.forEach((panel) => {
        const on = panel.getAttribute('data-indw-panel') === id;
        panel.classList.toggle('is-active', on);
        panel.hidden = !on;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab.getAttribute('data-indw-tab')));
      tab.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = tabs[(i + 1) % tabs.length];
          next.focus();
          activate(next.getAttribute('data-indw-tab'));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = tabs[(i - 1 + tabs.length) % tabs.length];
          prev.focus();
          activate(prev.getAttribute('data-indw-tab'));
        }
      });
    });

    const current = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];
    activate(current.getAttribute('data-indw-tab'));
  }

  function initAccordion(root) {
    root.querySelectorAll('[data-indw-acc]').forEach((acc) => {
      const items = Array.from(acc.querySelectorAll('[data-indw-acc-item]'));
      items.forEach((item) => {
        const btn = item.querySelector('[data-indw-acc-btn]');
        if (!btn) return;
        btn.addEventListener('click', () => {
          const open = item.classList.contains('is-open');
          items.forEach((other) => {
            other.classList.remove('is-open');
            const b = other.querySelector('[data-indw-acc-btn]');
            if (b) b.setAttribute('aria-expanded', 'false');
          });
          if (!open) {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  function boot() {
    document.querySelectorAll('[data-indw-root]').forEach((root) => {
      initTabs(root);
      initAccordion(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
