/**
 * Corporate About / Our Story — reveals, carousel, subnav
 */
(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.corp-reveal').forEach((el) => {
    if (reduced) { el.classList.add('is-visible'); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
  });

  const carousel = document.querySelector('.corp-carousel');
  if (carousel) {
    const track = carousel.querySelector('.corp-carousel-track');
    const slides = carousel.querySelectorAll('.corp-testimonial');
    const prev = carousel.querySelector('[data-corp-prev]');
    const next = carousel.querySelector('[data-corp-next]');
    if (track && slides.length) {
      let idx = 0;
      const visible = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      const maxIdx = () => Math.max(0, slides.length - visible());
      const go = (i) => {
        idx = Math.max(0, Math.min(i, maxIdx()));
        const pct = (idx * 100) / visible();
        track.style.transform = `translateX(-${pct}%)`;
      };
      prev?.addEventListener('click', () => go(idx - 1));
      next?.addEventListener('click', () => go(idx + 1));
      window.addEventListener('resize', () => go(idx));
      if (!reduced) {
        setInterval(() => go(idx >= maxIdx() ? 0 : idx + 1), 6000);
      }
    }
  }

  const subnav = document.querySelector('.corp-subnav');
  if (subnav) {
    const raw = window.location.pathname.split('/').pop() || 'about.html';
    const path = raw.replace(/\.html$/i, '');
    subnav.querySelectorAll('a').forEach((a) => {
      const href = (a.getAttribute('href') || '').split('/').pop().replace(/\.html$/i, '');
      if (href && href === path) a.classList.add('active');
    });
  }

  if (typeof window.AOS !== 'undefined' && !document.querySelector('.slp-page')) {
    window.AOS.init({ duration: 750, once: true, offset: 50, easing: 'ease-out-cubic', disable: reduced });
  }

  const storyNav = document.querySelector('.gstory-page .slp-sticky-nav');
  if (storyNav) {
    const links = Array.from(storyNav.querySelectorAll('[data-svc-nav-link]'));
    const sections = links.map((a) => {
      const href = a.getAttribute('href');
      return href && href.startsWith('#') ? document.querySelector(href) : null;
    }).filter(Boolean);
    const offset = () => {
      const header = document.querySelector('header, .site-header');
      const sub = document.querySelector('.corp-subnav');
      return (header ? header.getBoundingClientRect().height : 72) + (sub ? sub.getBoundingClientRect().height : 48) + 28;
    };
    const sync = () => {
      const y = window.scrollY + offset();
      let current = sections[0];
      sections.forEach((sec) => { if (sec.offsetTop <= y) current = sec; });
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id));
    };
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }
})();
