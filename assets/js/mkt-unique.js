/**
 * Guudle — Unique marketing page interactions (parallax, FAQ, counters)
 */
(function () {
  'use strict';
  const page = document.querySelector('.mkt-page');
  if (!page) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll progress */
  const bar = document.querySelector('[data-mkt-scroll-progress]');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  /* Back to top */
  const topBtn = document.querySelector('[data-mkt-back-top]');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Sticky nav */
  const sticky = document.querySelector('[data-mkt-sticky-nav]');
  const hero = document.querySelector('.mkt-hero');
  if (sticky && hero) {
    const links = sticky.querySelectorAll('[data-mkt-nav-link]');
    const sections = Array.from(links).map((a) => {
      const id = a.getAttribute('href');
      return id?.startsWith('#') ? document.querySelector(id) : null;
    }).filter(Boolean);

    const onScroll = () => {
      sticky.classList.toggle('is-visible', window.scrollY > hero.offsetHeight - 80);
      let cur = sections[0];
      sections.forEach((sec) => { if (window.scrollY >= sec.offsetTop - 140) cur = sec; });
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${cur?.id}`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Parallax sections — background layers handled by parallax-unified.js */
  if (!reduced) {
    const floats = document.querySelectorAll('[data-mkt-float]');

    const onParallax = () => {
      if (window.GuudleParallax) {
        floats.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const shift = (rect.top - window.innerHeight / 2) * (0.02 + i * 0.005);
            el.style.transform = `translate3d(0, ${shift}px, 0)`;
          }
        });
        return;
      }
      const sy = window.scrollY;
      const heroBg = document.querySelector('[data-mkt-parallax-bg]');
      if (heroBg) {
        heroBg.style.transform = `translate3d(0, ${sy * 0.35}px, 0) scale(1.1)`;
      }
      document.querySelectorAll('[data-mkt-parallax-section]').forEach((sec) => {
        const bg = sec.querySelector('.mkt-parallax__bg');
        if (!bg) return;
        const rect = sec.getBoundingClientRect();
        const speed = parseFloat(sec.dataset.mktParallaxSpeed || '0.35');
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -0.12;
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
      floats.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const shift = (rect.top - window.innerHeight / 2) * (0.02 + i * 0.005);
          el.style.transform = `translate3d(0, ${shift}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();
  }

  /* Animated counters */
  const counters = document.querySelectorAll('[data-mkt-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.mktCount || '0');
      const prefix = el.dataset.mktPrefix || '';
      const suffix = el.dataset.mktSuffix || '';
      const isDecimal = String(target).includes('.');
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    counters.forEach((c) => obs.observe(c));
  }

  /* FAQ accordion — legacy mkt items only */
  if (document.querySelector('.ent-faq')) return;
  document.querySelectorAll('[data-mkt-faq]').forEach((item) => {
    const btn = item.querySelector('button');
    btn?.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      item.closest('.mkt-faq, .mkt-faq-2col')?.querySelectorAll('[data-mkt-faq]').forEach((x) => {
        x.classList.remove('is-open');
        x.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Contact form */
  const form = document.getElementById('mkt-contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.innerHTML = 'Thank you! <i class="fas fa-check"></i>'; btn.disabled = true; }
  });

  /* AOS lite — fade in sections */
  if (!reduced && typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, disable: reduced });
  }
})();
