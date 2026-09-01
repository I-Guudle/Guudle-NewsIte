/**
 * Enterprise service pages v3 — animated stats + testimonial carousel
 */
(function () {
  'use strict';

  function initStatsCounters() {
    const stats = document.querySelectorAll('[data-svc-stat]');
    if (!stats.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateStat(el) {
      const target = parseInt(el.dataset.svcStatValue, 10);
      const suffix = el.dataset.svcStatSuffix || '';
      if (Number.isNaN(target) || reduced || suffix === '/7') return;

      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateStat(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    stats.forEach((el) => observer.observe(el));
  }

  function initTestimonialCarousel() {
    const root = document.querySelector('[data-svc-testimonial-carousel]');
    if (!root) return;

    const slides = [...root.querySelectorAll('[data-svc-testimonial-slide]')];
    if (slides.length <= 1) return;

    const prevBtn = root.querySelector('[data-svc-testimonial-prev]');
    const nextBtn = root.querySelector('[data-svc-testimonial-next]');
    const dotsWrap = root.querySelector('[data-svc-testimonial-dots]');
    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `svc-testimonial-carousel__dot${i === 0 ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsWrap?.appendChild(dot);
    });

    const dots = dotsWrap ? [...dotsWrap.querySelectorAll('.svc-testimonial-carousel__dot')] : [];

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, si) => {
        const on = si === index;
        slide.hidden = !on;
      });
      dots.forEach((dot, di) => dot.classList.toggle('is-active', di === index));
    }

    prevBtn?.addEventListener('click', () => go(index - 1));
    nextBtn?.addEventListener('click', () => go(index + 1));

    let timer = setInterval(() => go(index + 1), 7000);
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => {
      timer = setInterval(() => go(index + 1), 7000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('service-page--enterprise-v3')) return;
    initStatsCounters();
    initTestimonialCarousel();
  });
})();
