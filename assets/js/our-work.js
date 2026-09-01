/**
 * Our Work — featured slider, filters, editorial gallery, and page interactions.
 * Vanilla JS only. Renders from window.GuudleWork.
 */
(function () {
  'use strict';

  const data = window.GuudleWork;
  if (!data) return;

  const { CATEGORIES, INDUSTRIES, TECH_GROUPS, PROJECTS } = data;
  const CASE_BASE = 'case-studies/';
  const FEATURED_PIN = ['beba-gas', 'nearbycare', 'new-pollard', 'kuulow', 'beba24', 'jija-fashion'];
  const CINEMA_TOP = ['beba-gas', 'nearbycare', 'new-pollard', 'kuulow', 'beba24'];
  const CINEMA_BOTTOM = ['jija-fashion', 'leaforest', 'malmal', 'royaal-coffee', 'gwda'];
  const CINEMA_IDS = new Set([...CINEMA_TOP, ...CINEMA_BOTTOM]);
  const ACTION_PIN = ['new-pollard', 'kuulow', 'malmal', 'beba24', 'leaforest', 'nearbycare'];
  const EASE_MS = 760;
  const AUTOPLAY_MS = 7000;

  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = mqReduce.matches;

  const listed = () => PROJECTS.filter((p) => p.listed !== false);

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function thumb(p) {
    return p.thumbnail || p.fallback || '';
  }

  function caseHref(p) {
    return `${CASE_BASE}${encodeURIComponent(p.id)}.html`;
  }

  function siteHref(p) {
    const raw = String((p && p.url) || '').trim();
    if (!raw) return '';
    try {
      const url = new URL(raw);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
      return url.href;
    } catch {
      return '';
    }
  }

  function visitAttrs(url) {
    return `href="${esc(url)}" target="_blank" rel="noopener noreferrer"`;
  }

  function bindFallbacks(root) {
    (root || document).querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', function onErr() {
        img.removeEventListener('error', onErr);
        if (img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
      });
    });
  }

  function matchesFilter(p, filter) {
    if (!filter || filter === 'all') return true;
    const cats = p.categories || [];
    const stack = (p.stack || []).join(' ').toLowerCase();
    const blob = [
      p.industry, p.industryId, p.categoryLabel, p.projectType, p.summary,
      ...(p.services || []), ...cats, ...(p.stack || []),
    ].join(' ').toLowerCase();

    if (filter === 'enterprise') return cats.includes('enterprise') || cats.includes('saas');
    if (filter === 'web') return cats.includes('web') || cats.includes('cms');
    if (filter === 'mobile') return cats.includes('mobile') || /flutter|android|ios/.test(stack);
    if (filter === 'healthcare') return cats.includes('healthcare') || p.industryId === 'healthcare';
    if (filter === 'ai') return cats.includes('data') || /analytics|intelligence|ai\b|data platform/.test(blob);
    if (filter === 'cloud') return cats.includes('cloud') || stack.includes('cloud');
    if (filter === 'platforms') return cats.includes('saas') || cats.includes('enterprise') || cats.includes('ecommerce') || /platform|portal/.test(blob);
    if (filter === 'experience') return cats.includes('uiux') || cats.includes('cms') || cats.includes('web');
    return cats.includes(filter);
  }

  function featuredProjects() {
    const pool = listed();
    const pinned = FEATURED_PIN.map((id) => pool.find((p) => p.id === id)).filter(Boolean);
    if (pinned.length >= 6) return pinned.slice(0, 6);
    const extra = pool.filter((p) => p.featured && !pinned.includes(p));
    return [...pinned, ...extra].slice(0, 6);
  }

  function actionProjects() {
    const pool = listed().filter((p) => p.url);
    const pinned = ACTION_PIN.map((id) => pool.find((p) => p.id === id)).filter(Boolean);
    const extra = pool.filter((p) => p.inSlider && !pinned.includes(p));
    return [...pinned, ...extra].slice(0, 8);
  }

  function techLine(p) {
    return (p.stack || []).slice(0, 4).join(' · ');
  }

  function createSlider(host, items, options) {
    if (!host || !items.length) return null;

    const state = {
      index: 0,
      timer: null,
      paused: false,
      animating: false,
      resumeAt: 0,
    };

    host.innerHTML = `
      <div class="owx-slide" data-slide>
        <div class="owx-slide__media">
          <a data-shot-link>
            <img alt="" width="1600" height="1000" decoding="async">
          </a>
        </div>
        <div class="owx-slide__copy">
          <div class="owx-slide__meta">
            <p class="owx-slide__cat" data-cat></p>
            <p class="owx-slide__num" data-num aria-live="polite"></p>
          </div>
          <h3 class="font-display" data-title></h3>
          <p data-desc></p>
          <p class="owx-slide__tech" data-tech></p>
          <p class="owx-slide__svc" data-svc></p>
          <div class="owx-slide__links">
            <a class="ow-link" data-site hidden>Visit website <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
            <a class="ow-link" data-link>Explore project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      <div class="owx-slide__bar" aria-hidden="true"><i data-progress></i></div>
      <div class="owx-slide__controls">
        <button type="button" class="owx-slide__nav" data-prev aria-label="Previous project"><i class="fas fa-arrow-left" aria-hidden="true"></i></button>
        <button type="button" class="owx-slide__nav" data-next aria-label="Next project"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
      </div>
      <div class="owx-slide__thumbs" data-thumbs role="tablist" aria-label="Featured projects"></div>
    `;

    const img = host.querySelector('.owx-slide__media img');
    const shotLink = host.querySelector('[data-shot-link]');
    const cat = host.querySelector('[data-cat]');
    const num = host.querySelector('[data-num]');
    const title = host.querySelector('[data-title]');
    const desc = host.querySelector('[data-desc]');
    const tech = host.querySelector('[data-tech]');
    const svc = host.querySelector('[data-svc]');
    const siteLink = host.querySelector('[data-site]');
    const link = host.querySelector('[data-link]');
    const thumbs = host.querySelector('[data-thumbs]');
    const progress = host.querySelector('[data-progress]');
    const slide = host.querySelector('[data-slide]');

    thumbs.innerHTML = items.map((p, i) => `
      <button type="button" role="tab" data-goto="${i}" aria-label="${esc(p.title)}" aria-selected="${i === 0 ? 'true' : 'false'}">
        <img src="${esc(thumb(p))}" alt="" width="88" height="56" loading="lazy" decoding="async" data-fallback="${esc(p.fallback || '')}">
      </button>
    `).join('');
    bindFallbacks(thumbs);

    function paint(index, instant) {
      const p = items[index];
      if (!p) return;
      state.index = index;
      img.src = thumb(p);
      img.alt = p.url
        ? `${p.title} website screenshot`
        : `${p.title} concept visual`;
      img.dataset.fallback = p.fallback || '';
      bindFallbacks(host.querySelector('.owx-slide__media'));
      cat.textContent = p.categoryLabel || p.industry || '';
      num.textContent = `${pad(index + 1)} / ${pad(items.length)}`;
      title.textContent = p.title;
      desc.textContent = p.summary || '';
      tech.textContent = techLine(p);
      svc.textContent = (p.services || []).slice(0, 3).join(' · ');
      const live = siteHref(p);
      const caseUrl = caseHref(p);
      link.href = caseUrl;
      if (shotLink) {
        shotLink.href = caseUrl;
        shotLink.removeAttribute('target');
        shotLink.removeAttribute('rel');
        shotLink.setAttribute('aria-label', `${p.title} case study`);
      }
      if (siteLink) {
        if (live) {
          siteLink.hidden = false;
          siteLink.href = live;
          siteLink.target = '_blank';
          siteLink.rel = 'noopener noreferrer';
        } else {
          siteLink.hidden = true;
          siteLink.removeAttribute('href');
        }
      }
      thumbs.querySelectorAll('[data-goto]').forEach((btn, i) => {
        const on = i === index;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (progress) {
        progress.style.animation = 'none';
        void progress.offsetWidth;
        if (!reduced && !state.paused && options.autoplay !== false) {
          progress.style.animation = `owxProgress ${AUTOPLAY_MS}ms linear`;
        }
      }
      if (!instant && !reduced) {
        slide.classList.add('is-in');
        window.setTimeout(() => slide.classList.remove('is-in'), EASE_MS);
      }
    }

    function goToProject(index, dir) {
      if (!items.length) return;
      const next = ((index % items.length) + items.length) % items.length;
      if (next === state.index && slide.classList.contains('is-ready')) return;
      if (state.animating && !reduced) return;
      const outgoing = dir === -1 ? 'is-out-left' : 'is-out';
      if (reduced) {
        paint(next, true);
        return;
      }
      state.animating = true;
      slide.classList.remove('is-in', 'is-out', 'is-out-left');
      slide.classList.add(outgoing);
      window.setTimeout(() => {
        paint(next, false);
        slide.classList.remove(outgoing);
        slide.classList.add('is-ready', 'is-in');
        window.setTimeout(() => {
          state.animating = false;
        }, EASE_MS);
      }, 280);
    }

    function nextProject() { goToProject(state.index + 1, 1); }
    function previousProject() { goToProject(state.index - 1, -1); }

    function stopTimer() {
      if (state.timer) {
        window.clearInterval(state.timer);
        state.timer = null;
      }
      if (progress) progress.style.animationPlayState = 'paused';
    }

    function startTimer() {
      stopTimer();
      if (reduced || state.paused || items.length < 2 || options.autoplay === false) return;
      if (progress) progress.style.animationPlayState = 'running';
      state.timer = window.setInterval(nextProject, AUTOPLAY_MS);
    }

    function pause() {
      state.paused = true;
      stopTimer();
    }

    function resume() {
      state.paused = false;
      startTimer();
    }

    host.querySelector('[data-prev]').addEventListener('click', () => {
      previousProject();
      pause();
      window.setTimeout(resume, AUTOPLAY_MS);
    });
    host.querySelector('[data-next]').addEventListener('click', () => {
      nextProject();
      pause();
      window.setTimeout(resume, AUTOPLAY_MS);
    });
    thumbs.querySelectorAll('[data-goto]').forEach((btn) => {
      btn.addEventListener('click', () => {
        goToProject(Number(btn.getAttribute('data-goto')), 1);
        pause();
        window.setTimeout(resume, AUTOPLAY_MS);
      });
    });

    host.addEventListener('mouseenter', pause);
    host.addEventListener('mouseleave', resume);
    host.addEventListener('focusin', pause);
    host.addEventListener('focusout', (e) => {
      if (!host.contains(e.relatedTarget)) resume();
    });

    host.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextProject(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); previousProject(); }
    });

    let startX = 0;
    let tracking = false;
    host.addEventListener('touchstart', (e) => {
      if (!e.changedTouches[0]) return;
      tracking = true;
      startX = e.changedTouches[0].clientX;
      pause();
    }, { passive: true });
    host.addEventListener('touchend', (e) => {
      if (!tracking || !e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - startX;
      tracking = false;
      if (Math.abs(dx) > 42) {
        if (dx < 0) nextProject();
        else previousProject();
      }
      window.setTimeout(resume, AUTOPLAY_MS);
    }, { passive: true });

    paint(0, true);
    slide.classList.add('is-ready');
    startTimer();

    mqReduce.addEventListener('change', () => {
      reduced = mqReduce.matches;
      if (reduced) stopTimer();
      else startTimer();
    });

    return { nextProject, previousProject, goToProject, pause, resume };
  }

  const filterState = { category: 'all' };

  function renderCategories() {
    const bar = document.getElementById('ow-cats');
    if (!bar) return;
    bar.innerHTML = CATEGORIES.map((c) =>
      `<button type="button" class="owx-cat${c.id === filterState.category ? ' is-active' : ''}" data-category="${esc(c.id)}" aria-pressed="${c.id === filterState.category}">${esc(c.label)}</button>`
    ).join('');
    bar.querySelectorAll('[data-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        filterState.category = btn.getAttribute('data-category');
        renderCategories();
        renderCollection();
      });
    });
  }

  function cinemaItemHTML(p) {
    const live = siteHref(p);
    const caseUrl = caseHref(p);
    return `
      <article class="owx-cinema__item">
        <a class="owx-cinema__shot" href="${esc(caseUrl)}" aria-label="${esc(p.title)} case study">
          <img src="${esc(thumb(p))}" alt="${esc(p.title)} live website screenshot" width="1400" height="800" loading="lazy" decoding="async" data-fallback="${esc(p.fallback || '')}">
        </a>
        <div class="owx-cinema__meta">
          <strong>${esc(p.title)}</strong>
          <span>
            <a href="${esc(caseUrl)}">View project</a>
            ${live ? `<a ${visitAttrs(live)}>Visit website <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
          </span>
        </div>
      </article>`;
  }

  function renderCinemaRow(host, ids) {
    if (!host) return;
    const pool = listed();
    const items = ids.map((id) => pool.find((p) => p.id === id && p.url)).filter(Boolean);
    if (!items.length) {
      host.innerHTML = '';
      return;
    }
    const loop = reduced ? items : items.concat(items);
    host.innerHTML = loop.map(cinemaItemHTML).join('');
    bindFallbacks(host);
  }

  function renderCinema() {
    renderCinemaRow(document.getElementById('ow-cinema-top'), CINEMA_TOP);
    renderCinemaRow(document.getElementById('ow-cinema-bottom'), CINEMA_BOTTOM);
  }

  function cardHTML(p) {
    const caseUrl = caseHref(p);
    const live = siteHref(p);
    const concept = !live || p.provenance === 'product';
    return `
      <article class="owx-box" data-owx-reveal>
        <a class="owx-box__media" href="${esc(caseUrl)}" aria-label="${esc(p.title)} case study">
          <img src="${esc(thumb(p))}" alt="${esc(p.title)} ${concept && !live ? 'concept visual' : 'project interface'}" width="1400" height="900" loading="lazy" decoding="async" data-fallback="${esc(p.fallback || '')}">
          <span class="owx-box__veil" aria-hidden="true"></span>
        </a>
        <div class="owx-box__body">
          <p class="owx-card__cat">${esc(p.categoryLabel || p.industry || '')}</p>
          <h3><a href="${esc(caseUrl)}">${esc(p.title)}</a></h3>
          <p>${esc(p.summary)}</p>
          <p class="owx-card__tech">${esc(techLine(p))}</p>
          <div class="owx-box__links">
            <a class="ow-link" href="${esc(caseUrl)}">Explore project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            ${live ? `<a class="ow-link" ${visitAttrs(live)}>Visit website <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
          </div>
        </div>
      </article>`;
  }

  function renderCollection() {
    const host = document.getElementById('ow-collection');
    const empty = document.getElementById('ow-empty');
    const status = document.getElementById('ow-status');
    if (!host) return;
    let items = listed().filter((p) => matchesFilter(p, filterState.category));
    if (filterState.category === 'all') {
      items = items.filter((p) => !CINEMA_IDS.has(p.id));
    }
    host.innerHTML = items.map((p) => cardHTML(p)).join('');
    bindFallbacks(host);
    if (empty) empty.hidden = items.length > 0;
    if (status) {
      const label = (CATEGORIES.find((c) => c.id === filterState.category) || {}).label || 'All';
      status.textContent = items.length ? `Showing ${label} work` : `No ${label} projects in this view`;
    }
    observeReveals(host);
  }

  function renderSpotlight() {
    const host = document.getElementById('ow-spotlight');
    if (!host) return;
    const p = listed().find((x) => x.featuredCase) || listed().find((x) => x.featured);
    if (!p) {
      host.hidden = true;
      return;
    }
    host.innerHTML = `
      <div class="ow-wrap">
        <header class="ow-head owx-spot__head">
          <p class="ow-kicker">Case study</p>
          <h2 id="ow-spot-heading" class="ow-title font-display">From challenge to transformation</h2>
        </header>
        <div class="owx-spot__grid">
          <figure class="owx-spot__media">
            <a href="${caseHref(p)}" aria-label="${esc(p.title)} case study">
            <img src="${esc(thumb(p))}" alt="${esc(p.title)} platform screenshot" width="1400" height="900" loading="lazy" decoding="async" data-fallback="${esc(p.fallback || '')}">
            </a>
          </figure>
          <div class="owx-spot__copy">
            <p class="owx-card__cat">${esc(p.industry)}</p>
            <h3 class="font-display">${esc(p.title)}</h3>
            <p class="owx-spot__lede">${esc(p.overview || p.summary)}</p>
            <dl>
              <div><dt>The challenge</dt><dd>${esc(p.challenge)}</dd></div>
              <div><dt>Our approach</dt><dd>${esc(p.solution)}</dd></div>
              <div><dt>The solution</dt><dd>${esc((p.services || []).slice(0, 3).join(', '))}. Built with ${esc((p.stack || []).join(', '))}.</dd></div>
              <div><dt>The outcome</dt><dd>${esc(p.outcome)}</dd></div>
            </dl>
            <div class="owx-spot__actions">
              <a class="ow-btn ow-btn--primary" href="${caseHref(p)}">Read the case study <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              ${siteHref(p) ? `<a class="ow-btn ow-btn--ghost" ${visitAttrs(siteHref(p))}>Visit website <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
            </div>
          </div>
        </div>
      </div>`;
    bindFallbacks(host);
  }

  function renderIndustries() {
    const host = document.getElementById('ow-industries');
    if (!host) return;
    host.innerHTML = INDUSTRIES.map((ind) => `
      <a class="owx-ind" href="${esc(ind.href || 'industries.html')}">
        <i class="fas ${esc(ind.icon)}" aria-hidden="true"></i>
        <strong>${esc(ind.label)}</strong>
        <span>${esc(ind.desc || '')}</span>
      </a>
    `).join('');
  }

  function renderTech() {
    const host = document.getElementById('ow-tech');
    if (!host) return;
    host.innerHTML = TECH_GROUPS.map((g) => `
      <article>
        <h3>${esc(g.label)}</h3>
        <ul>${g.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </article>
    `).join('');
  }

  function bindCompare() {
    const root = document.querySelector('[data-compare]');
    if (!root) return;
    const after = root.querySelector('[data-compare-after]');
    const handle = root.querySelector('[data-compare-handle]');
    const range = root.querySelector('.owx-compare__range');
    if (!after || !handle || !range) return;

    function setPos(pct) {
      const v = Math.min(92, Math.max(8, pct));
      after.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
      range.value = String(Math.round(v));
      range.setAttribute('aria-valuenow', String(Math.round(v)));
    }

    range.addEventListener('input', () => setPos(Number(range.value)));

    let dragging = false;
    function fromEvent(e) {
      const rect = root.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setPos((x / rect.width) * 100);
    }
    handle.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', (e) => {
      if (dragging) fromEvent(e);
    });
    handle.addEventListener('pointerup', () => { dragging = false; });
    root.addEventListener('click', (e) => {
      if (e.target === range || handle.contains(e.target)) return;
      fromEvent(e);
    });
    setPos(50);
  }

  function observeReveals(scope) {
    const nodes = (scope || document).querySelectorAll('[data-owx-reveal], .owx-process li, .owx-cso article, .owx-build a, .owx-principles article, .owx-why article, .owx-stack article');
    if (!nodes.length) return;
    if (reduced) {
      nodes.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((el) => io.observe(el));
  }

  function injectSchema() {
    const items = featuredProjects();
    if (!items.length) return;
    const node = document.createElement('script');
    node.type = 'application/ld+json';
    node.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Selected work by Guudle IT Solutions',
      itemListElement: items.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://guudle.com/pages/case-studies/${p.id}.html`,
        name: p.title,
        description: p.summary,
      })),
    });
    document.head.appendChild(node);
  }

  function init() {
    bindFallbacks(document.querySelector('.ow-collage'));
    renderCinema();
    createSlider(document.getElementById('ow-action'), actionProjects(), { autoplay: true });
    renderCategories();
    renderCollection();
    renderSpotlight();
    renderIndustries();
    renderTech();
    bindCompare();
    observeReveals(document);
    injectSchema();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
