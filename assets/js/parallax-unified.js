/**
 * Unified parallax for hero & section background images site-wide
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
  ].join(',');

  function getSpeed(el, bg) {
    const section = el.closest(SECTION_SELECTORS) || el;
    const ds = section.dataset;
    return parseFloat(
      ds.svcParallaxSpeed ||
        ds.slpParallaxSpeed ||
        ds.mktParallaxSpeed ||
        bg?.dataset?.parallaxSpeed ||
        '0.32'
    );
  }

  function initParallaxUnified() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const backgrounds = [...document.querySelectorAll(BG_SELECTORS)];
    if (!backgrounds.length) return;

    backgrounds.forEach((bg) => {
      bg.classList.add('guudle-parallax-layer');
      const section = bg.closest(SECTION_SELECTORS);
      if (section) section.classList.add('guudle-parallax-section');
    });

    let ticking = false;

    function update() {
      ticking = false;
      const vh = window.innerHeight;

      backgrounds.forEach((bg) => {
        const section = bg.closest(SECTION_SELECTORS) || bg.parentElement;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;

        const speed = getSpeed(section, bg);
        const progress = (vh - rect.top) / (vh + rect.height);
        const offset = (progress - 0.5) * speed * 120;
        const scale = parseFloat(section.dataset.parallaxScale || '1.04');
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxUnified);
  } else {
    initParallaxUnified();
  }

  window.GuudleParallax = { refresh: initParallaxUnified };
})();
