/**
 * Guudle Homepage — SaaS + Premium interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('home-saas')) return;

  initHeroLoad();
  initHeroParallax();
  initMobileStickyCta();
  initAOS();
  initTechTabs();
  initIndTabs();
  initSectionParallax();
  initHomeImmersiveParallax();
  initSvcFilters();
});

function initHeroLoad() {
  requestAnimationFrame(() => {
    document.body.classList.add('hero-loaded');
  });
}

function initHeroParallax() {
  const hero = document.querySelector('.saas-hero');
  const layers = document.querySelectorAll('[data-hero-parallax]');
  if (!hero || !layers.length) return;

  let ticking = false;
  function update() {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      ticking = false;
      return;
    }
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.heroParallax) || 0.15;
      el.style.transform = `translate3d(0, ${progress * 80 * speed}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function initMobileStickyCta() {
  const bar = document.getElementById('mobile-sticky-cta');
  const hero = document.querySelector('.saas-hero');
  if (!bar || !hero) return;

  const obs = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );
  obs.observe(hero);
}

function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'all' : false,
  });
}

function initTechTabs() {
  const buttons = document.querySelectorAll('.tech-tab-btn');
  const panels = document.querySelectorAll('.tech-tab-content');
  if (!buttons.length || !panels.length) return;

  function activate(tabId) {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        btn.classList.add('bg-gradient-to-r', 'from-navy-600', 'to-navy-800', 'text-white', 'shadow-lg');
      } else {
        btn.classList.remove('bg-gradient-to-r', 'from-navy-600', 'to-navy-800', 'text-white', 'shadow-lg');
      }
    });
    panels.forEach((panel) => {
      const show = panel.dataset.content === tabId || panel.id === tabId;
      panel.classList.toggle('hidden', !show);
      panel.classList.toggle('show', show);
      panel.classList.toggle('active', show);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activate(btn.dataset.tab);
    });
  });

  const defaultBtn = document.querySelector('.tech-tab-btn.active') || buttons[0];
  if (defaultBtn) activate(defaultBtn.dataset.tab);
}

function initIndTabs() {
  const root = document.getElementById('ind-tabs');
  if (!root) return;

  const buttons = root.querySelectorAll('.ind-tabs__btn');
  const panels = root.querySelectorAll('.ind-tabs__panel');
  if (!buttons.length || !panels.length) return;

  function activate(tabId, focusBtn) {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.indTab === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.tabIndex = isActive ? 0 : -1;
      if (isActive && focusBtn) btn.focus();
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    panels.forEach((panel) => {
      const isActive = panel.dataset.indPanel === tabId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.dataset.indTab, false));
    btn.addEventListener('keydown', (e) => {
      const list = Array.from(buttons);
      const idx = list.indexOf(btn);
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = (idx + 1) % list.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = (idx - 1 + list.length) % list.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        next = list.length - 1;
      }
      if (next >= 0) activate(list[next].dataset.indTab, true);
    });
  });

  const defaultBtn = root.querySelector('.ind-tabs__btn.active') || buttons[0];
  if (defaultBtn) activate(defaultBtn.dataset.indTab, false);
}

function initSectionParallax() {
  const layers = document.querySelectorAll('[data-parallax-speed]');
  if (!layers.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  function update() {
    layers.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.1;
      const offset = (window.innerHeight / 2 - rect.top) * speed * 0.15;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initHomeCounters() {
  /* Static vanity counters removed project-wide */
}

function initSvcFilters() {
  const filters = document.querySelectorAll('.svc-filter');
  const grid = document.querySelector('[data-svc-grid]');
  const cards = grid ? grid.querySelectorAll('[data-svc-cat]') : [];
  if (!filters.length || !cards.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.svcFilter;
      filters.forEach((f) => {
        const active = f === btn;
        f.classList.toggle('is-active', active);
        f.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      cards.forEach((card) => {
        const match = cat === 'all' || card.dataset.svcCat === cat;
        card.classList.toggle('is-filtered-out', !match);
      });
    });
  });
}

function initHomeImmersiveParallax() {
  if (window.GuudleParallax) return;
  const section = document.querySelector('[data-home-parallax-section]');
  const bg = section?.querySelector('.home-parallax-immersive__bg');
  if (!section || !bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const speed = 0.35;
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -0.12;
    bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
