/**
 * Mobile HIS-style landing — tabs, industries, stats
 */
(function () {
  'use strict';

  function initTabs(rootSel, btnSel, panelSel) {
    const root = document.querySelector(rootSel);
    if (!root) return;
    const btns = [...root.querySelectorAll(btnSel)];
    const panels = [...root.querySelectorAll(panelSel)];
    if (!btns.length) return;

    function activate(id) {
      btns.forEach((b) => b.classList.toggle('is-active', b.dataset.mobTab === id));
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.mobPanel === id));
    }

    btns.forEach((btn) => {
      btn.addEventListener('click', () => activate(btn.dataset.mobTab));
    });
    activate(btns[0].dataset.mobTab);
  }

  function initIndustries() {
    document.querySelectorAll('[data-mob-industry]').forEach((item) => {
      const trigger = item.querySelector('.mob-his-industry__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        document.querySelectorAll('[data-mob-industry]').forEach((i) => {
          i.classList.remove('is-open');
          i.querySelector('.mob-his-industry__trigger')?.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.querySelector('[data-mob-industry]')?.classList.add('is-open');
    document.querySelector('[data-mob-industry] .mob-his-industry__trigger')?.setAttribute('aria-expanded', 'true');
  }

  function initStats() {
    const els = document.querySelectorAll('[data-mob-stat]');
    if (!els.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.mobStatValue, 10);
          const suffix = el.dataset.mobStatSuffix || '';
          const prefix = el.dataset.mobStatPrefix || '';
          if (Number.isNaN(target)) return;
          const start = performance.now();
          const duration = 1400;
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );
    els.forEach((el) => observer.observe(el));
  }

  function initTestimonials() {
    const root = document.querySelector('[data-mob-testimonial-carousel]');
    if (!root) return;
    const slides = [...root.querySelectorAll('[data-mob-testimonial-slide]')];
    if (slides.length <= 1) return;
    const prev = root.querySelector('[data-mob-testimonial-prev]');
    const next = root.querySelector('[data-mob-testimonial-next]');
    const dotsWrap = root.querySelector('[data-mob-testimonial-dots]');
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
      slides.forEach((s, si) => { s.hidden = si !== index; });
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    }

    prev?.addEventListener('click', () => go(index - 1));
    next?.addEventListener('click', () => go(index + 1));
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('svc-mobile-his-page')) return;
    initTabs('.mob-his-services', '.mob-his-tabs__btn', '.mob-his-tab-panel');
    initTabs('.mob-his-tech', '.mob-his-tabs__btn', '.mob-his-tech__panel');
    initIndustries();
    initStats();
    initTestimonials();
  });
})();
