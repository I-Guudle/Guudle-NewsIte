/**
 * Enterprise FAQ accordion — site-wide
 */
(function () {
  'use strict';

  function closeItem(item) {
    item.classList.remove('is-open');
    const trigger = item.querySelector('.ent-faq__trigger, .slp-faq-trigger');
    const panel = item.querySelector('.ent-faq__panel, .slp-faq-panel');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (panel) panel.style.maxHeight = '0';
  }

  function openItem(item) {
    item.classList.add('is-open');
    const trigger = item.querySelector('.ent-faq__trigger, .slp-faq-trigger');
    const panel = item.querySelector('.ent-faq__panel, .slp-faq-panel');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  function initEnterpriseFaq() {
    const sections = document.querySelectorAll('.ent-faq');
    if (!sections.length) return;

    sections.forEach((section) => {
      if (section.dataset.faqInit === 'true') return;
      section.dataset.faqInit = 'true';
      const items = section.querySelectorAll('[data-ent-faq]');
      items.forEach((item, index) => {
        const trigger = item.querySelector('.ent-faq__trigger, .slp-faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          items.forEach(closeItem);
          if (!isOpen) openItem(item);
        });

        trigger.addEventListener('keydown', (e) => {
          const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
          if (!keys.includes(e.key)) return;
          e.preventDefault();
          const list = [...items];
          let next = index;
          if (e.key === 'ArrowDown') next = (index + 1) % list.length;
          if (e.key === 'ArrowUp') next = (index - 1 + list.length) % list.length;
          if (e.key === 'Home') next = 0;
          if (e.key === 'End') next = list.length - 1;
          list[next]?.querySelector('.ent-faq__trigger, .slp-faq-trigger')?.focus();
        });
      });
    });

    window.addEventListener('resize', () => {
      document.querySelectorAll('.ent-faq__item.is-open, [data-ent-faq].is-open').forEach((item) => {
        const panel = item.querySelector('.ent-faq__panel, .slp-faq-panel');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnterpriseFaq);
  } else {
    initEnterpriseFaq();
  }

  document.addEventListener('guudle:faq-ready', initEnterpriseFaq);
  window.GuudleFaqInit = initEnterpriseFaq;
})();
