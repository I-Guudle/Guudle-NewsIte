(function () {
  const root = document.querySelector('.tlx-page');
  if (!root) return;

  const sheet = document.querySelector('link[href*="techlix-agent.css"]');
  if (sheet && sheet.parentNode) sheet.parentNode.appendChild(sheet);

  root.querySelectorAll('[data-tlx-acc]').forEach((list) => {
    list.querySelectorAll('.tlx-acc__item').forEach((item, index) => {
      const btn = item.querySelector('.tlx-acc__btn');
      if (!btn) return;
      if (index === 0) item.classList.add('is-open');
      btn.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        list.querySelectorAll('.tlx-acc__item').forEach((el) => el.classList.remove('is-open'));
        if (!open) item.classList.add('is-open');
      });
    });
  });

  const counters = [...root.querySelectorAll('[data-tlx-count]')];
  if (counters.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.tlxCount || 0);
        const suffix = el.dataset.tlxSuffix || '';
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(end * p) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => io.observe(el));
  }
})();
