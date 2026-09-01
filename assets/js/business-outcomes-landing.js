/**
 * Guudle — Business Outcomes & Digital Platforms landing
 */
(function () {
  'use strict';

  function initCounters() {
    /* Static vanity counters removed project-wide */
  }

  function initScrollProgress() {
    const bar = document.querySelector('[data-bop-scroll-progress]');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  function initStickyNav() {
    const nav = document.querySelector('[data-bop-sticky-nav]');
    const hero = document.querySelector('.bop-hero');
    if (!nav || !hero) return;
    const links = nav.querySelectorAll('[data-bop-nav-link]');
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

  function initFaq() {
    document.querySelectorAll('[data-bop-faq]').forEach((item) => {
      const trigger = item.querySelector('.bop-faq-trigger');
      const panel = item.querySelector('.bop-faq-panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('[data-bop-faq].is-open').forEach((open) => {
          open.classList.remove('is-open');
          open.querySelector('.bop-faq-panel').style.maxHeight = '0';
          open.querySelector('.bop-faq-trigger').setAttribute('aria-expanded', 'false');
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
    const el = document.querySelector('.bop-testimonials-swiper');
    if (!el || typeof Swiper === 'undefined') return;
    new Swiper('.bop-testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5500, disableOnInteraction: false },
      pagination: { el: '.bop-testimonials-pagination', clickable: true },
      navigation: { nextEl: '.bop-testimonials-next', prevEl: '.bop-testimonials-prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
  }

  function initForm() {
    const form = document.getElementById('bop-contact-form');
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
      const err = field.closest('[data-bop-field]')?.querySelector('.bop-form-error');
      if (err) { err.textContent = msg; err.classList.add('is-visible'); }
    };
    const clearError = (field) => {
      field.classList.remove('is-error');
      field.closest('[data-bop-field]')?.querySelector('.bop-form-error')?.classList.remove('is-visible');
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

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.bop-page')) return;
    initScrollProgress();
    initStickyNav();
    initCounters();
    initFaq();
    initForm();
    initSmoothScroll();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 750, once: true, offset: 50, easing: 'ease-out-cubic' });
    if (typeof Swiper !== 'undefined') initSwiper();
    else window.addEventListener('load', initSwiper);
  });
})();
