/**
 * Technology Hub — filter interactions (pages/technology.html)
 */
(function () {
  function initHub(root, filterAttr, cardAttr, catAttr) {
    const buttons = root.querySelectorAll(`[${filterAttr}]`);
    const cards = root.querySelectorAll(`[${cardAttr}]`);
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute(filterAttr);

        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        cards.forEach((card) => {
          const show = cat === 'all' || card.getAttribute(catAttr) === cat;
          card.hidden = !show;
        });
      });
    });
  }

  document.querySelectorAll('[data-tech-hub]').forEach((root) => {
    initHub(root, 'data-tech-hub-filter', 'data-tech-hub-card', 'data-tech-hub-cat');
  });

  document.querySelectorAll('[data-tech-industry-hub]').forEach((root) => {
    initHub(root, 'data-tech-industry-filter', 'data-tech-industry-card', 'data-tech-industry-cat');
  });

  /* Hero stat counters */
  function animateStat(el) {
    const target = parseInt(el.getAttribute('data-tech-hero-stat-value'), 10);
    const suffix = el.getAttribute('data-tech-hero-stat-suffix') || '';
    if (Number.isNaN(target)) return;

    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.round(target * easeOut(p));
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  document.querySelectorAll('[data-tech-hero]').forEach((hero) => {
    const stats = hero.querySelectorAll('[data-tech-hero-stat]');
    if (!stats.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateStat(entry.target);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      stats.forEach((s) => io.observe(s));
    } else {
      stats.forEach(animateStat);
    }

    const visual = hero.querySelector('[data-tech-hero-visual]');
    if (visual && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        visual.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
      });
      hero.addEventListener('mouseleave', () => {
        visual.style.transform = '';
      });
    }
  });
})();
