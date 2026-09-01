/** Collapsible accordion — Key Features & Capabilities */

import { enrichFeature } from './svc-capabilities-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-star';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function accordionItem(f, i, { aos = true, groupName = 'cap-acc' } = {}) {
  const num = String(i + 1).padStart(2, '0');
  const open = i === 0 ? ' open' : '';
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 300)}"` : '';
  const points = (f.points || []).map((p) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i><span>${esc(p)}</span></li>`
  ).join('');
  const chips = (f.chips || []).map((c) => `<span class="cap-acc-item__chip">${esc(c)}</span>`).join('');

  return `<details class="cap-acc-item" name="${esc(groupName)}"${open}${aosAttr}>
    <summary class="cap-acc-item__trigger">
      <span class="cap-acc-item__num" aria-hidden="true">${num}</span>
      <span class="cap-acc-item__icon"><i class="${faIcon(f.icon)}" aria-hidden="true"></i></span>
      <span class="cap-acc-item__head">
        ${f.tag ? `<span class="cap-acc-item__tag">${esc(f.tag)}</span>` : ''}
        <span class="cap-acc-item__title">${esc(f.title)}</span>
        <span class="cap-acc-item__hook">${esc(f.desc)}</span>
      </span>
      <span class="cap-acc-item__chevron" aria-hidden="true"><i class="fas fa-chevron-down"></i></span>
    </summary>
    <div class="cap-acc-item__panel">
      <p class="cap-acc-item__detail">${esc(f.detail)}</p>
      ${chips ? `<div class="cap-acc-item__chips">${chips}</div>` : ''}
      ${points ? `<ul class="cap-acc-item__points">${points}</ul>` : ''}
    </div>
  </details>`;
}

function gridCard(f, i, { aos = true } = {}) {
  const num = String(i + 1).padStart(2, '0');
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 300)}"` : '';
  const points = (f.points || []).map((p) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i><span>${esc(p)}</span></li>`
  ).join('');
  const chips = (f.chips || []).map((c) => `<span class="cap-grid-card__chip">${esc(c)}</span>`).join('');

  return `<article class="cap-grid-card" role="listitem"${aosAttr}>
    <div class="cap-grid-card__head">
      <span class="cap-grid-card__num" aria-hidden="true">${num}</span>
      <span class="cap-grid-card__icon"><i class="${faIcon(f.icon)}" aria-hidden="true"></i></span>
      <div class="cap-grid-card__meta">
        ${f.tag ? `<span class="cap-grid-card__tag">${esc(f.tag)}</span>` : ''}
        <h3 class="cap-grid-card__title">${esc(f.title)}</h3>
        <p class="cap-grid-card__hook">${esc(f.desc)}</p>
      </div>
    </div>
    <p class="cap-grid-card__detail">${esc(f.detail)}</p>
    ${chips ? `<div class="cap-grid-card__chips">${chips}</div>` : ''}
    ${points ? `<ul class="cap-grid-card__points">${points}</ul>` : ''}
  </article>`;
}

function capabilitiesHead(p, sectionId, aos, titleHtml, intro) {
  const headAos = aos ? ' data-aos="fade-up"' : '';
  return `<header class="cap-acc-head"${headAos}>
    <span class="cap-acc-head__badge"><i class="fas fa-layer-group" aria-hidden="true"></i> Capabilities</span>
    <h2 id="${esc(sectionId)}-heading" class="cap-acc-head__title font-display">${titleHtml}</h2>
    <p class="cap-acc-head__lead">${esc(intro)}</p>
  </header>`;
}

function loadFeatures(p) {
  const features = (p.features || []).map((f) =>
    enrichFeature(typeof f === 'object' && !Array.isArray(f) ? f : { title: f[1], desc: f[2], icon: f[0] }, p.title)
  );
  return features;
}

/**
 * @param {object} p — page config
 * @param {{ sectionId?: string, aos?: boolean, groupName?: string }} [opts]
 */
export function renderCapabilitiesAccordionSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-features';
  const aos = opts.aos !== false;
  const groupName = opts.groupName || `cap-acc-${p.slug || 'svc'}`;
  const titles = p.sectionTitles || {};
  const intro = p.capabilitiesIntro || titles.featuresSub
    || 'Explore how we architect, secure, and scale enterprise mobile platforms — each capability expands with engineering detail below.';

  const features = loadFeatures(p);
  if (!features.length) return '';

  const items = features.map((f, i) => accordionItem(f, i, { aos, groupName })).join('');
  const titleHtml = titles.featuresHtml || esc(titles.features || 'Key Features & Capabilities');

  return `
    <section id="${esc(sectionId)}" class="cap-acc-section" aria-labelledby="${esc(sectionId)}-heading">
      <div class="cap-acc-section__ambient" aria-hidden="true">
        <div class="cap-acc-section__grid"></div>
      </div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28">
        ${capabilitiesHead(p, sectionId, aos, titleHtml, intro)}
        <div class="cap-acc-list" role="list">${items}</div>
      </div>
    </section>`;
}

/**
 * 2-column capability grid — same content as accordion, always visible
 * @param {object} p — page config
 * @param {{ sectionId?: string, aos?: boolean }} [opts]
 */
export function renderCapabilitiesGridSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-features';
  const aos = opts.aos !== false;
  const titles = p.sectionTitles || {};
  const intro = p.capabilitiesIntro || titles.featuresSub
    || 'How we design, secure, and deploy enterprise mobile platforms — from identity and offline field workflows to MDM rollout and executive analytics.';

  const features = loadFeatures(p);
  if (!features.length) return '';

  const cards = features.map((f, i) => gridCard(f, i, { aos })).join('');
  const titleHtml = titles.featuresHtml || esc(titles.features || 'Key Features & Capabilities');

  return `
    <section id="${esc(sectionId)}" class="cap-grid-section" aria-labelledby="${esc(sectionId)}-heading">
      <div class="cap-grid-section__ambient" aria-hidden="true">
        <div class="cap-grid-section__grid"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28">
        ${capabilitiesHead(p, sectionId, aos, titleHtml, intro)}
        <div class="cap-grid" role="list">${cards}</div>
      </div>
    </section>`;
}
