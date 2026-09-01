/**
 * Guudle — AI Agent Development landing
 */
(function () {
  'use strict';

  function initCounters() {
    /* Static vanity counters removed project-wide */
  }

  function initScrollProgress() {
    const bar = document.querySelector('[data-aad-scroll-progress]');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  function initBackToTop() {
    const btn = document.querySelector('[data-aad-back-top]');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initStickyNav() {
    const nav = document.querySelector('[data-aad-sticky-nav]');
    const hero = document.querySelector('.aad-hero');
    if (!nav || !hero) return;
    const links = nav.querySelectorAll('[data-aad-nav-link]');
    const sections = Array.from(links).map((a) => {
      const id = a.getAttribute('href');
      return id?.startsWith('#') ? document.querySelector(id) : null;
    }).filter(Boolean);

    const onScroll = () => {
      nav.classList.toggle('is-visible', window.scrollY > hero.offsetTop + hero.offsetHeight - 80);
      let current = sections[0];
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec;
      });
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current?.id));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('aad-page')) return;
    initCounters();
    initScrollProgress();
    initBackToTop();
    initStickyNav();
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
    }
  });
})();
