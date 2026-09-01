/**
 * AI hub page — light parallax on hero and image sections
 */
(function () {
  'use strict';

  function parallaxLayers(selector, factor) {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (!nodes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        nodes.forEach((el) => {
          const rect = el.parentElement?.getBoundingClientRect();
          const offset = rect ? (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) * factor : y * factor;
          el.style.transform = `scale(1.06) translate3d(0, ${offset * 0.35}px, 0)`;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function boot() {
    parallaxLayers('.ai-hero-px__bg', 0.22);
    parallaxLayers('.ai-block__px-bg', 0.12);
    parallaxLayers('.ai-cta-band__bg', 0.1);
    if (window.AOS) {
      window.AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 40 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
