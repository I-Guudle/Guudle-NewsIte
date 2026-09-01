/**
 * Guudle IT Solutions — AI Multi-Agent landing interactions
 */
(function () {
  'use strict';

  function initPreloader() {
    const el = document.querySelector('[data-ma-preloader]');
    if (!el) return;
    const bar = el.querySelector('[data-ma-preloader-progress]');
    const count = el.querySelector('[data-ma-preloader-count]');
    let pct = 0;
    const tick = setInterval(() => {
      pct = Math.min(pct + Math.random() * 18 + 8, 100);
      if (bar) bar.style.width = `${pct}%`;
      if (count) count.textContent = `${Math.round(pct)}%`;
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => el.classList.add('is-hidden'), 350);
      }
    }, 120);
  }

  function initReveal() {
    const items = document.querySelectorAll('.ma-reveal');
    if (!items.length) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      items.forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => obs.observe(el));
  }

  function initReviewCarousel() {
    const el = document.querySelector('.ma-review-carousel');
    if (!el || typeof Swiper === 'undefined') return;
    // eslint-disable-next-line no-new
    new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: '.ma-review-pagination', clickable: true },
      navigation: {
        nextEl: '.ma-review-next',
        prevEl: '.ma-review-prev',
      },
      breakpoints: { 992: { slidesPerView: 1.05 } },
    });
  }

  function initAiModelCarousel() {
    const el = document.querySelector('.ma-model-carousel');
    if (!el || typeof Swiper === 'undefined') return;
    // eslint-disable-next-line no-new
    new Swiper(el, {
      direction: 'vertical',
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      autoplay: { delay: 2200 },
      allowTouchMove: false,
    });
  }

  function initStepTabs() {
    const tabs = document.querySelectorAll('[data-ma-step-tab]');
    const panels = document.querySelectorAll('[data-ma-step-panel]');
    if (!tabs.length) return;

    let idx = 0;
    const interval = 5000;
    let timer;

    function activate(id) {
      tabs.forEach((t) => {
        const active = t.dataset.maStepTab === id;
        t.classList.toggle('border-royal-blue', active);
        t.classList.toggle('bg-white', active);
        t.classList.toggle('shadow-md', active);
        t.classList.toggle('border-transparent', !active);
      });
      panels.forEach((p) => {
        p.classList.toggle('hidden', p.dataset.maStepPanel !== id);
      });
    }

    function next() {
      idx = (idx + 1) % tabs.length;
      activate(tabs[idx].dataset.maStepTab);
    }

    function start() {
      clearInterval(timer);
      activate(tabs[idx].dataset.maStepTab);
      timer = setInterval(next, interval);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        idx = i;
        start();
      });
    });
    start();
  }

  function initTimedTabs() {
    const nav = document.querySelector('[data-ma-timed-tabs]');
    if (!nav) return;
    const interval = parseInt(nav.dataset.interval || '6000', 10);
    const tabs = [...nav.querySelectorAll('[data-ma-timed-target]')];
    const panes = [...document.querySelectorAll('[data-ma-timed-pane]')];
    if (!tabs.length) return;

    let idx = 0;
    let timer;

    function activate(i) {
      nav.style.setProperty('--tab-duration', `${interval}ms`);
      tabs.forEach((t, j) => {
        t.classList.toggle('active', j === i);
        t.classList.toggle('border-royal-blue', j === i);
        t.classList.toggle('text-royal-blue', j === i);
      });
      const target = tabs[i]?.dataset.maTimedTarget;
      panes.forEach((p) => {
        p.classList.toggle('hidden', p.id !== target);
      });
    }

    function next() {
      idx = (idx + 1) % tabs.length;
      activate(idx);
    }

    function start() {
      clearInterval(timer);
      activate(idx);
      timer = setInterval(next, interval);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        idx = i;
        start();
      });
    });
    start();
  }

  function initAccordions() {
    document.querySelectorAll('[data-ma-accordion]').forEach((root) => {
      const buttons = root.querySelectorAll('[data-ma-accordion-btn]');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const panel = btn.nextElementSibling;
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          const single = root.dataset.maAccordion === 'single';

          if (single) {
            buttons.forEach((b) => {
              if (b !== btn) {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling?.classList.remove('is-open');
              }
            });
          }

          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          panel?.classList.toggle('is-open', !expanded);
        });
      });
    });
  }

  function initPricingToggle() {
    const toggle = document.getElementById('ma-pricing-switch');
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      const yearly = toggle.checked;
      document.querySelectorAll('[data-monthly-price]').forEach((el) => {
        el.textContent = el.dataset[yearly ? 'yearlyPrice' : 'monthlyPrice'] || el.textContent;
      });
      document.querySelectorAll('[data-monthly-period]').forEach((el) => {
        el.textContent = yearly
          ? el.dataset.yearlyPeriod || '/Year'
          : el.dataset.monthlyPeriod || '/Month';
      });
    });
  }

  function initBackToTop() {
    const btn = document.querySelector('.ma-back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initReveal();
    initReviewCarousel();
    initAiModelCarousel();
    initStepTabs();
    initTimedTabs();
    initAccordions();
    initPricingToggle();
    initBackToTop();
  });
})();
