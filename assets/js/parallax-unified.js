/**
 * Unified parallax for hero and section background images.
 * Transform parallax is desktop-only. Mobile and reduced-motion keep a static cover image.
 */
(function () {
  'use strict';

  const BG_SELECTORS = [
    '.slp-parallax__bg',
    '.svc-parallax__bg',
    '.mkt-parallax__bg',
    '.home-parallax-immersive__bg',
    '[data-mkt-parallax-bg]',
    '[data-parallax-bg]',
    '.guudle-parallax-layer',
    '.gv-parallax__bg',
    '.gbp-hero__layer',
    '.gbp-px__layer',
  ].join(',');

  const SECTION_SELECTORS = [
    '[data-svc-parallax-section]',
    '[data-slp-parallax-section]',
    '[data-mkt-parallax-section]',
    '[data-home-parallax-section]',
    '.guudle-parallax-section',
    '.svc-hero-parallax',
    '.mkt-hero--parallax',
    '.home-parallax-immersive',
    '.gbp-hero--parallax',
    '.gbp-px',
    '.gv-band--image',
  ].join(',');

  let backgrounds = [];
  let listening = false;
  let ticking = false;

  function isStatic() {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches
    );
  }

  function getSpeed(el, bg) {
    const section = el.closest(SECTION_SELECTORS) || el;
    const ds = section.dataset || {};
    return parseFloat(
      bg?.dataset?.parallaxSpeed ||
        ds.svcParallaxSpeed ||
        ds.slpParallaxSpeed ||
        ds.mktParallaxSpeed ||
        '0.28'
    );
  }

  function update() {
    ticking = false;
    if (!backgrounds.length || isStatic()) return;
    const vh = window.innerHeight;

    backgrounds.forEach((bg) => {
      const section = bg.closest(SECTION_SELECTORS) || bg.parentElement;
      if (!section || section.classList.contains('gv-band--solid')) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -40 || rect.top > vh + 40) return;
      const speed = getSpeed(section, bg);
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * speed * 90;
      const scale = parseFloat(section.dataset.parallaxScale || '1.08');
      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function initParallaxUnified() {
    backgrounds = [...document.querySelectorAll(BG_SELECTORS)];
    if (!backgrounds.length) return;

    backgrounds.forEach((bg) => {
      bg.classList.add('guudle-parallax-layer');
      const section = bg.closest(SECTION_SELECTORS);
      if (section) section.classList.add('guudle-parallax-section');
      if (isStatic()) bg.style.transform = 'none';
    });

    if (isStatic()) return;

    if (!listening) {
      listening = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
    update();
  }

  document.addEventListener('guudle:rhythm-ready', initParallaxUnified);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxUnified);
  } else {
    initParallaxUnified();
  }

  window.GuudleParallax = { refresh: initParallaxUnified };
})();
