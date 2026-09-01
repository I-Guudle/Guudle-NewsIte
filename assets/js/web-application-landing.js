/**
 * Guudle — Web Application Development landing
 */
(function () {
  'use strict';

  function initCounters() {
    /* Static vanity counters removed project-wide */
  }

  function initScrollProgress() {
    const bar = document.querySelector('[data-wa-scroll-progress]');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  function initBackToTop() {
    const btn = document.querySelector('[data-wa-back-top]');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initStickyNav() {
    const nav = document.querySelector('[data-wa-sticky-nav]');
    const hero = document.querySelector('.wa-hero');
    if (!nav || !hero) return;
    const links = nav.querySelectorAll('[data-wa-nav-link]');
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

  function initProcess() {
    const btns = document.querySelectorAll('[data-wa-process-step]');
    const panels = document.querySelectorAll('[data-wa-process-panel]');
    if (!btns.length) return;
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = btn.dataset.waProcessStep;
        btns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.waProcessPanel === step));
      });
    });
  }

  function initFaq() {
    document.querySelectorAll('[data-wa-faq]').forEach((item) => {
      const trigger = item.querySelector('.wa-faq-trigger');
      const panel = item.querySelector('.wa-faq-panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('[data-wa-faq].is-open').forEach((open) => {
          open.classList.remove('is-open');
          open.querySelector('.wa-faq-panel').style.maxHeight = '0';
          open.querySelector('.wa-faq-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initSwiper() {
    const el = document.querySelector('.wa-testimonials-swiper');
    if (!el || typeof Swiper === 'undefined') return;
    new Swiper('.wa-testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5500, disableOnInteraction: false },
      pagination: { el: '.wa-testimonials-pagination', clickable: true },
      navigation: { nextEl: '.wa-testimonials-next', prevEl: '.wa-testimonials-prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
  }

  function initForm() {
    const form = document.getElementById('wa-contact-form');
    if (!form) return;
    const rules = {
      name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
      phone: (v) => !v.trim() || /^[\d\s+\-().]{7,}$/.test(v) || 'Please enter a valid phone number.',
      company: () => true,
      message: (v) => v.trim().length >= 20 || 'Please describe your project (at least 20 characters).',
    };
    const showError = (field, msg) => {
      field.classList.add('is-error');
      const err = field.closest('[data-wa-field]')?.querySelector('.wa-form-error');
      if (err) { err.textContent = msg; err.classList.add('is-visible'); }
    };
    const clearError = (field) => {
      field.classList.remove('is-error');
      field.closest('[data-wa-field]')?.querySelector('.wa-form-error')?.classList.remove('is-visible');
    };
    form.querySelectorAll('input, textarea').forEach((f) => f.addEventListener('input', () => clearError(f)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(rules).forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const result = rules[name](field.value);
        if (result !== true) { showError(field, result); valid = false; }
        else clearError(field);
      });
      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const orig = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-check"></i> Message Sent!';
        setTimeout(() => { form.reset(); btn.disabled = false; btn.innerHTML = orig; }, 2500);
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  function initParallax() {
    const sections = document.querySelectorAll('[data-wa-parallax-section]');
    if (!sections.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const onScroll = () => {
      sections.forEach((section) => {
        const bg = section.querySelector('.wa-parallax__bg') || section.querySelector('.slp-parallax__bg');
        if (!bg) return;
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(section.dataset.waParallaxSpeed || section.getAttribute('data-wa-parallax-speed') || '0.35');
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -0.15;
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.wa-page')) return;
    initScrollProgress();
    initBackToTop();
    initStickyNav();
    initCounters();
    initProcess();
    initFaq();
    initForm();
    initSmoothScroll();
    initParallax();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 750, once: true, offset: 50, easing: 'ease-out-cubic' });
    if (typeof Swiper !== 'undefined') initSwiper();
    else window.addEventListener('load', initSwiper);
  });
})();
