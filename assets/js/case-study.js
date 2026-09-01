/**
 * Case study detail renderer — enterprise consulting structure
 */
(function () {
  'use strict';

  const data = window.GuudleWork;
  const root = document.getElementById('csd-root');
  if (!data || !root) return;

  const id = document.body.getAttribute('data-case-id');
  const project = data.PROJECTS.find((p) => p.id === id);

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function thumb(p) {
    return p.thumbnail || p.fallback || '';
  }

  if (!project) {
    root.innerHTML = `
      <section class="cpox-section cpox-section--white">
        <div class="max-w-3xl mx-auto px-4 text-center">
          <h1 class="cpox-title font-display">Case study not found</h1>
          <p class="cpox-lead">This project is not in the current Our Work collection.</p>
          <a class="cpox-cta__btn cpox-cta__btn--primary" href="../our-work.html">Back to Our Work</a>
        </div>
      </section>`;
    return;
  }

  const p = project;
  const isProduct = p.provenance === 'product';
  const clientLabel = isProduct ? 'Internal product / demonstration' : p.client;
  const related = data.PROJECTS.filter((x) => x.listed !== false && x.id !== p.id && (
    x.industryId === p.industryId || (x.categories || []).some((c) => (p.categories || []).includes(c))
  )).slice(0, 3);

  const live = p.url
    ? `<a href="${esc(p.url)}" class="ow-btn ow-btn--ghost" target="_blank" rel="noopener noreferrer">Visit Live Site <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
    : '';

  const approach = p.approach
    ? esc(p.approach)
    : `We analysed the ${esc(p.industry).toLowerCase()} context around ${esc(p.projectType).toLowerCase()}—who needed to act, which processes were slowing them down, and what a durable digital response would require. Architecture, experience, and delivery were then aligned so the solution could be built in stages without losing the original business problem.`;

  const experience = p.experience
    ? esc(p.experience)
    : `People use this solution through ${esc(p.projectType).toLowerCase()} flows designed around everyday work: ${(p.features || []).slice(0, 3).map(esc).join(', ') || 'clear tasks, visible status, and a path to complete the job'}. The interface is intended to support those tasks rather than showcase technology for its own sake.`;

  root.innerHTML = `
    <section class="csd-hero" aria-labelledby="csd-title">
      <img src="${thumb(p)}" alt="${esc(p.title)} project visual" width="1600" height="900" fetchpriority="high" data-fallback="${esc(p.fallback || '')}">
      <div class="csd-hero__veil" aria-hidden="true"></div>
      <div class="csd-hero__inner">
        <nav class="text-sm text-white/70 mb-6 flex flex-wrap" aria-label="Breadcrumb">
          <a href="../../index.html" class="hover:text-white">Home</a><span class="mx-2 opacity-50">/</span>
          <a href="../our-work.html" class="hover:text-white">Our Work</a><span class="mx-2 opacity-50">/</span>
          <span class="text-white font-semibold">${esc(p.title)}</span>
        </nav>
        <div class="csd-pills">
          <span class="csd-pill">${esc(p.industry)}</span>
          <span class="csd-pill">${esc(p.categoryLabel)}</span>
          <span class="csd-pill">${esc(p.projectType)}</span>
          ${isProduct ? '<span class="csd-pill">Internal product</span>' : ''}
        </div>
        <h1 id="csd-title" class="font-display">${esc(p.title)}</h1>
        <p>${esc(p.overview)}</p>
        ${live ? `<div class="csd-hero__actions">${live}</div>` : ''}
      </div>
    </section>

    <section class="cpox-section cpox-section--white" aria-labelledby="csd-overview-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="csd-overview-heading" class="sr-only">Overview</h2>
        <dl class="csd-overview">
          <article><dt>Client / Project</dt><dd>${esc(clientLabel)}</dd></article>
          <article><dt>Live website</dt><dd>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>` : 'Internal product'}</dd></article>
          <article><dt>Services</dt><dd>${esc((p.services || []).join(' · '))}</dd></article>
          <article><dt>Technology</dt><dd>${esc((p.stack || []).join(' · '))}</dd></article>
          <article><dt>Project Type</dt><dd>${esc(p.projectType)}</dd></article>
        </dl>
      </div>
    </section>

    <section class="cpox-section cpox-section--gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="csd-split">
          <div>
            <h2>Business Challenge</h2>
            <p>${esc(p.challenge)}</p>
          </div>
          <div>
            <h2>Our Approach</h2>
            <p>${approach}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cpox-section cpox-section--white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="csd-split">
          <div>
            <h2>Solution</h2>
            <p>${esc(p.solution)}</p>
          </div>
          <div>
            <h2>Experience</h2>
            <p>${experience}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cpox-section cpox-section--gray" aria-labelledby="csd-features-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Capabilities</span></div>
          <h2 id="csd-features-heading" class="cpox-title font-display">What was delivered</h2>
        </header>
        <ul class="csd-features">
          ${(p.features || []).map((f) => `<li><i class="fas fa-check" aria-hidden="true"></i><span>${esc(f)}</span></li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="cpox-section cpox-section--white" aria-labelledby="csd-tech-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Architecture</span></div>
          <h2 id="csd-tech-heading" class="cpox-title font-display">Technology</h2>
        </header>
        <div class="ow-meta" aria-label="Technology stack">
          ${(p.stack || []).map((t) => `<span class="ow-chip">${esc(t)}</span>`).join('')}
        </div>
      </div>
    </section>

    <section class="cpox-section cpox-section--gray" aria-labelledby="csd-gallery-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Visuals</span></div>
          <h2 id="csd-gallery-heading" class="cpox-title font-display">Product interfaces</h2>
        </header>
        <div class="csd-gallery">
          ${(p.gallery || []).map((g, i) => `
            <figure>
              <img src="${esc(g.src)}" alt="${esc(g.alt)}" width="1400" height="900" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" data-fallback="${esc(p.fallback || '')}">
            </figure>`).join('')}
        </div>
      </div>
    </section>

    <section class="cpox-section cpox-section--white" aria-labelledby="csd-outcome-heading">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Result</span></div>
          <h2 id="csd-outcome-heading" class="cpox-title font-display">Outcome</h2>
        </header>
        <p class="cpox-lead">${esc(p.outcome)}</p>
      </div>
    </section>

    ${related.length ? `
    <section class="cpox-section cpox-section--gray" aria-labelledby="csd-related-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">More work</span></div>
          <h2 id="csd-related-heading" class="cpox-title font-display">Related case studies</h2>
        </header>
        <div class="csd-related">
          ${related.map((r) => `
            <article class="ow-card">
              <a class="ow-card__media" href="${esc(r.id)}.html" aria-label="${esc(r.title)} case study">
                <img src="${thumb(r)}" alt="${esc(r.title)} project thumbnail" width="800" height="500" loading="lazy" decoding="async" data-fallback="${esc(r.fallback || '')}">
              </a>
              <div class="ow-card__body">
                <p class="ow-kicker">${esc(r.industry)}</p>
                <h3>${esc(r.title)}</h3>
                <a class="ow-link" href="${esc(r.id)}.html">Explore Case Study <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <section class="ow-cta" aria-labelledby="csd-cta-heading">
      <h2 id="csd-cta-heading" class="font-display">Let's Build What's Next</h2>
      <p>Have a complex business challenge, digital product, or transformation initiative? Let's explore what we can build together.</p>
      <div class="ow-cta__actions">
        <a href="../contact.html#contact-inquiry" class="ow-btn ow-btn--primary">Start a Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="../contact.html" class="ow-btn ow-btn--ghost">Talk to Our Team</a>
        ${live}
      </div>
    </section>
  `;

  root.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', function onErr() {
      img.removeEventListener('error', onErr);
      if (img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
    });
  });
})();
