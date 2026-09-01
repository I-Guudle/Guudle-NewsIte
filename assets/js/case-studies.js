/**
 * Case Studies & Portfolio — scroll reveals, filters
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.cs-reveal');
  if (revealEls.length && !reduced) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Project filter */
  const filterBar = document.querySelector('.cs-filter');
  if (filterBar) {
    const btns = filterBar.querySelectorAll('.cs-filter-btn');
    const items = document.querySelectorAll('[data-cs-filter]');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-filter');
        btns.forEach((b) => b.classList.toggle('active', b === btn));
        items.forEach((item) => {
          const tags = (item.getAttribute('data-cs-filter') || '').split(' ');
          const show = val === 'all' || tags.includes(val);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Neural nodes (AI hero) */
  const neuralBg = document.querySelector('.cs-neural-bg');
  if (neuralBg && !reduced) {
    for (let i = 0; i < 24; i++) {
      const n = document.createElement('span');
      n.className = 'cs-neural-node';
      n.style.left = `${Math.random() * 100}%`;
      n.style.top = `${Math.random() * 100}%`;
      n.style.animationDelay = `${Math.random() * 5}s`;
      n.style.animationDuration = `${4 + Math.random() * 4}s`;
      neuralBg.appendChild(n);
    }
  }
})();
