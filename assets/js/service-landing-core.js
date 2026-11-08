/**
 * Guudle — Shared premium service landing interactions
 * Usage: body.slp-page[data-slp-prefix="csd"]
 */
(function () {
  'use strict';

  function getCfg() {
    const body = document.querySelector('.slp-page');
    if (!body) return null;
    const p = body.dataset.slpPrefix || 'slp';
    return { prefix: p, hero: body.querySelector(`.${p}-hero`) || body.querySelector('[class*="-hero"]') };
  }

  function sel(cfg, name) {
    return document.querySelector(`[data-${cfg.prefix}-${name}]`);
  }

  function selAll(cfg, name) {
    return document.querySelectorAll(`[data-${cfg.prefix}-${name}]`);
  }

  function initScrollProgress(cfg) {
    const bar = sel(cfg, 'scroll-progress') || document.querySelector('.slp-scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  function initBackToTop(cfg) {
    const btn = sel(cfg, 'back-top') || document.querySelector('.slp-back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initStickyNav(cfg) {
    const nav = sel(cfg, 'sticky-nav') || document.querySelector('.slp-sticky-nav');
    const hero = cfg.hero;
    if (!nav || !hero) return;
    const links = nav.querySelectorAll(`[data-${cfg.prefix}-nav-link]`);
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

  function initCounters() {
    /* Static vanity counters removed project-wide */
  }

  function initParallax(cfg) {
    if (window.GuudleParallax) return;
    const sections = document.querySelectorAll(`[data-${cfg.prefix}-parallax-section]`);
    if (!sections.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const onScroll = () => {
      sections.forEach((section) => {
        const bg = section.querySelector(`.${cfg.prefix}-parallax__bg`) || section.querySelector('.slp-parallax__bg');
        if (!bg) return;
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(section.dataset[`${cfg.prefix}ParallaxSpeed`] || section.getAttribute(`data-${cfg.prefix}-parallax-speed`) || '0.35');
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -0.15;
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initFaq(cfg) {
    if (document.querySelector('.ent-faq')) return;
    const marked = selAll(cfg, 'faq');
    const items = marked.length ? marked : document.querySelectorAll('.slp-faq-item');
    items.forEach((item) => {
      const trigger = item.querySelector(`.${cfg.prefix}-faq-trigger`) || item.querySelector('.slp-faq-trigger');
      const panel = item.querySelector(`.${cfg.prefix}-faq-panel`) || item.querySelector('.slp-faq-panel');
      if (!trigger || !panel || trigger.dataset.faqBound === '1') return;
      trigger.dataset.faqBound = '1';
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((open) => {
          if (!open.classList.contains('is-open')) return;
          open.classList.remove('is-open');
          const p = open.querySelector(`.${cfg.prefix}-faq-panel`) || open.querySelector('.slp-faq-panel');
          const t = open.querySelector(`.${cfg.prefix}-faq-trigger`) || open.querySelector('.slp-faq-trigger');
          if (p) p.style.maxHeight = '0';
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initSwiper(cfg) {
    const el = document.querySelector(`.${cfg.prefix}-testimonials-swiper`);
    if (!el || typeof Swiper === 'undefined') return;
    new Swiper(`.${cfg.prefix}-testimonials-swiper`, {
      slidesPerView: 1, spaceBetween: 24, loop: true,
      autoplay: { delay: 5500, disableOnInteraction: false },
      pagination: { el: `.${cfg.prefix}-testimonials-pagination`, clickable: true },
      navigation: { nextEl: `.${cfg.prefix}-testimonials-next`, prevEl: `.${cfg.prefix}-testimonials-prev` },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find((s) => s.src && s.src.includes(src.split('/').pop()));
      if (existing) {
        if (existing.dataset.loaded === '1' || existing.getAttribute('data-loaded') === '1') return resolve();
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', reject);
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => {
        s.dataset.loaded = '1';
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function assetsBase() {
    const current = document.querySelector('script[src*="service-landing-core.js"]');
    if (current && current.src) return current.src.replace(/service-landing-core\.js.*$/, '');
    return '../../assets/js/';
  }

  async function ensureContactModule() {
    if (window.GuudleContact) return true;
    const base = assetsBase();
    try {
      await loadScript(base + 'supabase-config.js');
    } catch (e) { /* optional */ }
    try {
      await loadScript(base + 'supabase-config.local.js');
    } catch (e) { /* optional local override */ }
    try {
      await loadScript(base + 'contact-form.js');
      return Boolean(window.GuudleContact);
    } catch (e) {
      return false;
    }
  }

  function initForm(cfg) {
    const form =
      document.getElementById(`${cfg.prefix}-contact-form`) ||
      document.getElementById('svc-contact-form') ||
      document.querySelector('form.cpox-contact-form');
    if (!form) return;

    const rules = {
      name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter your business email address.',
      phone: (v) => !v.trim() || /^[\d\s+\-().]{7,}$/.test(v) || 'Please enter a valid phone number.',
      company: () => true,
      message: (v) => v.trim().length >= 1 || 'Please tell us about your project.',
    };
    const showError = (field, msg) => {
      field.classList.add('is-error');
      const err = field.closest('[data-slp-field]')?.querySelector('.slp-form-error');
      if (err) { err.textContent = msg; err.classList.add('is-visible'); }
    };
    const clearError = (field) => {
      field.classList.remove('is-error');
      field.closest('[data-slp-field]')?.querySelector('.slp-form-error')?.classList.remove('is-visible');
    };
    form.querySelectorAll('input, textarea').forEach((f) => f.addEventListener('input', () => clearError(f)));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(rules).forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const result = rules[name](field.value);
        if (result !== true) { showError(field, result); valid = false; }
        else clearError(field);
      });
      if (!valid) return;

      await ensureContactModule();
      if (window.GuudleContact) {
        // Prevent double-bind auto handler fighting this submit
        form.dataset.guudleBound = '1';
        await window.GuudleContact.submitFromForm(form, {
          service: window.GuudleContact.inferService(form),
          sourcePage: window.GuudleContact.sourcePage(),
        });
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      const orig = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "We couldn't submit your enquiry right now. Please try again.";
      }
      setTimeout(() => {
        if (btn) { btn.disabled = false; btn.innerHTML = orig; }
      }, 2500);
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
    const cfg = getCfg();
    if (!cfg) return;
    initScrollProgress(cfg);
    initBackToTop(cfg);
    initStickyNav(cfg);
    initCounters(cfg);
    initParallax(cfg);
    initFaq(cfg);
    initForm(cfg);
    initSmoothScroll();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 750, once: true, offset: 50, easing: 'ease-out-cubic' });
    if (typeof Swiper !== 'undefined') initSwiper(cfg);
    else window.addEventListener('load', () => initSwiper(cfg));
  });
})();
