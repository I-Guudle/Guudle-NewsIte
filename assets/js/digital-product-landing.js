/**

 * Guudle — Digital Product Development landing (enterprise redesign)

 */

(function () {

  'use strict';



  function initCounters() {
    /* Static vanity counters removed project-wide */
  }



  function initScrollProgress() {

    const bar = document.querySelector('[data-dpd-scroll-progress]');

    if (!bar) return;

    window.addEventListener(

      'scroll',

      () => {

        const h = document.documentElement.scrollHeight - window.innerHeight;

        bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';

      },

      { passive: true }

    );

  }



  function initStickyNav() {

    const nav = document.querySelector('[data-dpd-sticky-nav]');

    const hero = document.querySelector('.dpd-hero');

    if (!nav || !hero) return;



    const links = nav.querySelectorAll('[data-dpd-nav-link]');

    const sections = Array.from(links)

      .map((a) => {

        const id = a.getAttribute('href');

        return id && id.startsWith('#') ? document.querySelector(id) : null;

      })

      .filter(Boolean);



    const onScroll = () => {

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      nav.classList.toggle('is-visible', window.scrollY > heroBottom - 80);



      let current = sections[0];

      sections.forEach((sec) => {

        if (window.scrollY >= sec.offsetTop - 120) current = sec;

      });

      links.forEach((a) => {

        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current?.id);

      });

    };



    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

  }



  function initProcess() {

    const nav = document.querySelector('[data-dpd-process-nav]');

    if (!nav) return;



    const btns = nav.querySelectorAll('[data-dpd-process-step]');

    const panels = document.querySelectorAll('[data-dpd-process-panel]');



    btns.forEach((btn) => {

      btn.addEventListener('click', () => {

        const step = btn.dataset.dpdProcessStep;

        btns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach((p) => {

          p.classList.toggle('is-active', p.dataset.dpdProcessPanel === step);

        });

      });

    });

  }



  function initFaq() {

    document.querySelectorAll('[data-dpd-faq]').forEach((item) => {

      const trigger = item.querySelector('.dpd-faq-trigger');

      const panel = item.querySelector('.dpd-faq-panel');

      if (!trigger || !panel) return;



      trigger.addEventListener('click', () => {

        const isOpen = item.classList.contains('is-open');

        document.querySelectorAll('[data-dpd-faq].is-open').forEach((open) => {

          open.classList.remove('is-open');

          open.querySelector('.dpd-faq-panel').style.maxHeight = '0';

          open.querySelector('.dpd-faq-trigger').setAttribute('aria-expanded', 'false');

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

    const el = document.querySelector('.dpd-testimonials-swiper');

    if (!el || typeof Swiper === 'undefined') return;



    new Swiper('.dpd-testimonials-swiper', {

      slidesPerView: 1,

      spaceBetween: 24,

      loop: true,

      autoplay: { delay: 5500, disableOnInteraction: false },

      pagination: { el: '.dpd-testimonials-pagination', clickable: true },

      navigation: {

        nextEl: '.dpd-testimonials-next',

        prevEl: '.dpd-testimonials-prev',

      },

      breakpoints: {

        768: { slidesPerView: 2 },

        1024: { slidesPerView: 3 },

      },

    });

  }



  function initForm() {

    const form = document.getElementById('dpd-contact-form');

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

      const err = field.closest('[data-dpd-field]')?.querySelector('.dpd-form-error');

      if (err) {

        err.textContent = msg;

        err.classList.add('is-visible');

      }

    };



    const clearError = (field) => {

      field.classList.remove('is-error');

      const err = field.closest('[data-dpd-field]')?.querySelector('.dpd-form-error');

      if (err) err.classList.remove('is-visible');

    };



    form.querySelectorAll('input, textarea').forEach((field) => {

      field.addEventListener('input', () => clearError(field));

    });



    form.addEventListener('submit', (e) => {

      e.preventDefault();

      let valid = true;



      Object.keys(rules).forEach((name) => {

        const field = form.elements[name];

        if (!field) return;

        const result = rules[name](field.value);

        if (result !== true) {

          showError(field, result);

          valid = false;

        } else {

          clearError(field);

        }

      });



      if (valid) {

        const btn = form.querySelector('[type="submit"]');

        const orig = btn.innerHTML;

        btn.disabled = true;

        btn.innerHTML = '<i class="fas fa-circle-check"></i> Message Sent!';

        setTimeout(() => {

          form.reset();

          btn.disabled = false;

          btn.innerHTML = orig;

        }, 2500);

      }

    });

  }



  function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach((a) => {

      a.addEventListener('click', (e) => {

        const id = a.getAttribute('href');

        if (!id || id === '#') return;

        const target = document.querySelector(id);

        if (target) {

          e.preventDefault();

          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }

      });

    });

  }



  function initParallax() {

    const cluster = document.querySelector('[data-dpd-parallax]');

    if (!cluster || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;



    window.addEventListener(

      'scroll',

      () => {

        const rect = cluster.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {

          const offset = (rect.top - window.innerHeight * 0.5) * 0.04;

          cluster.style.transform = `translateY(${offset}px)`;

        }

      },

      { passive: true }

    );

  }

  function initSectionParallax() {
    const section = document.querySelector('[data-dpd-parallax-section]');
    const bg = section?.querySelector('.dpd-parallax__bg');
    if (!section || !bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.35 * -0.12;
      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }



  document.addEventListener('DOMContentLoaded', () => {

    if (!document.querySelector('.dpd-page')) return;

    initScrollProgress();

    initStickyNav();

    initCounters();

    initProcess();

    initFaq();

    initForm();

    initSmoothScroll();

    initParallax();
    initSectionParallax();



    if (typeof AOS !== 'undefined') {

      AOS.init({ duration: 750, once: true, offset: 50, easing: 'ease-out-cubic' });

    }



    if (typeof Swiper !== 'undefined') initSwiper();

    else window.addEventListener('load', initSwiper);

  });

})();

