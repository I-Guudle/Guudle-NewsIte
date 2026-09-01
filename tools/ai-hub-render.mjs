/**
 * AI Services Hub — shared renderers for ai.html and technology.html
 */
import { AI_SERVICE_CATALOG } from './tech-data.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/**
 * Enterprise grid of all AI service pages (used on ai.html hub).
 * @param {{ linkPrefix?: string, techLinkPrefix?: string, id?: string }} opts
 */
export function renderAiServicesHub({ linkPrefix = '', techLinkPrefix = '../', id = 'svc-aiServices' } = {}) {
  const cards = AI_SERVICE_CATALOG.map((s, i) =>
    `<article class="ai-svc-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 480)}">
      <a href="${linkPrefix}${s.href}" class="ai-svc-card__link">
        <span class="ai-svc-card__glow" aria-hidden="true"></span>
        <span class="ai-svc-card__badge">${esc(s.badge)}</span>
        <span class="ai-svc-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
        <h3 class="ai-svc-card__title">${esc(s.title)}</h3>
        <p class="ai-svc-card__desc">${esc(s.desc)}</p>
        <span class="ai-svc-card__cta">Explore service <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
    </article>`
  ).join('');

  return `<section id="${id}" class="ai-svc-hub" aria-labelledby="${id}-heading">
  <div class="ai-svc-hub__ambient" aria-hidden="true"><span class="ai-svc-hub__orb ai-svc-hub__orb--1"></span><span class="ai-svc-hub__orb ai-svc-hub__orb--2"></span></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28">
    <div class="ai-svc-hub__head" data-aos="fade-up">
      <span class="ai-svc-hub__label"><i class="fas fa-robot" aria-hidden="true"></i> AI &amp; Emerging Technologies</span>
      <h2 id="${id}-heading" class="ai-svc-hub__title font-display">Enterprise <span class="ai-svc-hub__accent">AI Services</span></h2>
      <p class="ai-svc-hub__lead">Fifteen specialized AI practice areas — from generative AI and agents to computer vision, RPA, and enterprise platforms. Each practice delivers production-ready AI integrated with your data, workflows, and governance requirements.</p>
    </div>
    <div class="ai-svc-hub__grid" role="list">${cards}</div>
  </div>
</section>`;
}

/**
 * Compact service directory on technology.html linking to AI service pages.
 */
export function renderAiServiceDirectory({ linkPrefix = 'services/' } = {}) {
  const hubLink = `<a href="${linkPrefix}ai.html" class="tech-ai-svc-link tech-ai-svc-link--hub" data-aos="fade-up">
      <span class="tech-ai-svc-link__icon"><i class="fas fa-brain" aria-hidden="true"></i></span>
      <span class="tech-ai-svc-link__text">
        <strong>AI &amp; Emerging Technologies</strong>
        <span>Services Hub</span>
      </span>
      <i class="fas fa-arrow-right tech-ai-svc-link__arrow" aria-hidden="true"></i>
    </a>`;

  const items = AI_SERVICE_CATALOG.map((s, i) =>
    `<a href="${linkPrefix}${s.href}" class="tech-ai-svc-link" data-aos="fade-up" data-aos-delay="${Math.min(i * 30, 420)}">
      <span class="tech-ai-svc-link__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
      <span class="tech-ai-svc-link__text">
        <strong>${esc(s.title)}</strong>
        <span>${esc(s.badge)}</span>
      </span>
      <i class="fas fa-arrow-right tech-ai-svc-link__arrow" aria-hidden="true"></i>
    </a>`
  ).join('');

  return `<div class="tech-ai-svc-dir" id="tech-ai-services">
    <div class="tech-ai-svc-dir__head" data-aos="fade-up">
      <span class="tech-section-badge"><i class="fas fa-sitemap" aria-hidden="true"></i> Service Directory</span>
      <h3 class="tech-ai-svc-dir__title">AI &amp; Emerging Technology <span class="tech-accent">Services</span></h3>
      <p class="tech-lead">Each practice area delivers specialized AI capabilities. Technology details live here — service pages focus on outcomes, process, and engagement.</p>
    </div>
    <div class="tech-ai-svc-dir__grid">${hubLink}${items}</div>
  </div>`;
}
