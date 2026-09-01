/** Premium mobile capabilities + why choose — light grey parallax sections */

import { getSliderForSlug } from './slider-images.mjs';
import { defaultWhyChoose } from './svc-page-factory.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-star';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

const DISCOVER_LINKS = ['#svc-features', '#svc-industries', '#svc-benefits', '#svc-process-hub'];

function parallaxBg(slug, offset = 1) {
  return getSliderForSlug(slug || 'custom-mobile-app-development', offset);
}

function parallaxShell({ sectionId, headingId, bgUrl, speed = '0.32', extraClass = '', content }) {
  return `
    <section id="${esc(sectionId)}" class="cma-parallax guudle-parallax-section cma-parallax--grey ${extraClass}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.06" aria-labelledby="${esc(headingId)}">
      <div class="cma-parallax__bg slp-parallax__bg guudle-parallax-layer" style="background-image:url('${bgUrl}')" role="img" aria-label="Decorative background"></div>
      <div class="cma-parallax__overlay cma-parallax__overlay--grey" aria-hidden="true"></div>
      <div class="cma-parallax__ambient" aria-hidden="true">
        <div class="cma-parallax__grid"></div>
        <span class="cma-parallax__orb cma-parallax__orb--1"></span>
        <span class="cma-parallax__orb cma-parallax__orb--2"></span>
        <span class="cma-parallax__orb cma-parallax__orb--3"></span>
      </div>
      <div class="cma-parallax__content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        ${content}
      </div>
    </section>`;
}

function capabilityCard(f, i, { aos = true } = {}) {
  const num = String(i + 1).padStart(2, '0');
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 360)}"` : '';
  const featured = f.featured ? ' cma-cap-card--featured' : '';
  const accent = f.accent ? ` cma-cap-card--${f.accent}` : '';
  const chips = (f.chips || []).map((c) => `<span class="cma-cap-card__chip">${esc(c)}</span>`).join('');
  const points = (f.points || []).map((p) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i><span>${esc(p)}</span></li>`
  ).join('');

  return `<article class="cma-cap-card${featured}${accent}"${aosAttr}>
    <span class="cma-cap-card__num" aria-hidden="true">${num}</span>
    <div class="cma-cap-card__shine" aria-hidden="true"></div>
    <div class="cma-cap-card__glow" aria-hidden="true"></div>
    ${f.tag ? `<span class="cma-cap-card__tag">${esc(f.tag)}</span>` : ''}
    <div class="cma-cap-card__icon"><i class="${faIcon(f.icon)}" aria-hidden="true"></i></div>
    <h3 class="cma-cap-card__title">${esc(f.title)}</h3>
    <p class="cma-cap-card__hook">${esc(f.desc)}</p>
    <p class="cma-cap-card__detail">${esc(f.detail)}</p>
    ${chips ? `<div class="cma-cap-card__chips">${chips}</div>` : ''}
    <ul class="cma-cap-card__points">${points}</ul>
  </article>`;
}

/**
 * Why Choose / Flutter apps — light grey parallax band
 * @param {object} p — page config
 * @param {{ sectionId?: string, aos?: boolean }} [opts]
 */
export function renderMobileWhyChooseSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-whyChoose';
  const headingId = `${sectionId}-heading`;
  const aos = opts.aos !== false;
  const titles = p.sectionTitles || {};
  const items = (p.whyChoose || defaultWhyChoose).slice(0, 4);
  const slug = p.slug || 'custom-mobile-app-development';
  const bgUrl = p.whyChooseBg || parallaxBg(slug, 2);
  const badge = titles.whyChooseBadge || 'Business Impact';
  const badgeIcon = p.whyChooseBadgeIcon || 'fa-chart-line';
  const titleHtml = titles.whyChooseHtml || 'Build <span class="cma-why-head__accent">Flutter</span> Applications';
  const lead = p.whyChooseIntro || titles.whyChooseLead
    || 'From delivery and food ordering to marketplaces and on-demand services — we design and build production-ready Flutter apps for iOS and Android.';
  const linkLabel = titles.whyChooseLink || 'View capabilities';

  const cards = items.map((w, i) =>
    `<article class="cma-why-card cma-why-card--${i + 1}"${aos ? ` data-aos="fade-up" data-aos-delay="${80 + i * 70}"` : ''}>
      <span class="cma-why-card__bar" aria-hidden="true"></span>
      <span class="cma-why-card__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div class="cma-why-card__icon"><i class="${faIcon(w.icon)}" aria-hidden="true"></i></div>
      <h3 class="cma-why-card__title">${esc(w.title)}</h3>
      <p class="cma-why-card__desc">${esc(w.desc)}</p>
      <a href="${DISCOVER_LINKS[i % DISCOVER_LINKS.length]}" class="cma-why-card__link">${esc(linkLabel)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </article>`
  ).join('');

  const headAos = aos ? ' data-aos="fade-up"' : '';

  const content = `
    <header class="cma-why-head"${headAos}>
      <span class="cma-why-head__badge"><i class="${faIcon(badgeIcon)}" aria-hidden="true"></i> ${esc(badge)}</span>
      <h2 id="${esc(headingId)}" class="cma-why-head__title font-display">${titleHtml}</h2>
      <p class="cma-why-head__lead">${esc(lead)}</p>
    </header>
    <div class="cma-why-grid" role="list">${cards}</div>`;

  return parallaxShell({
    sectionId,
    headingId,
    bgUrl,
    speed: '0.28',
    extraClass: 'cma-why-parallax',
    content,
  });
}

/**
 * @param {object} p — page config
 * @param {{ sectionId?: string, aos?: boolean }} [opts]
 */
export function renderMobileCapabilitiesSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-features';
  const headingId = `${sectionId}-heading`;
  const aos = opts.aos !== false;
  const titles = p.sectionTitles || {};
  const features = p.features || [];
  if (!features.length) return '';

  const slug = p.slug || 'custom-mobile-app-development';
  const bgUrl = p.capabilitiesBg || parallaxBg(slug, 1);

  const intro = p.capabilitiesIntro || titles.featuresSub
    || 'Enterprise-grade mobile engineering — from Flutter cross-platform builds to secure backends — designed for launch velocity, user delight, and long-term scale.';

  const pills = (p.services || []).slice(0, 4).map((s) =>
    `<span class="cma-cap-pill"><i class="${faIcon(s.icon)}" aria-hidden="true"></i>${esc(s.title)}</span>`
  ).join('');

  const cards = features.map((f, i) => capabilityCard(f, i, { aos })).join('');
  const headAos = aos ? ' data-aos="fade-up"' : '';

  const spotlight = p.capabilitySpotlight || p.flutterSpotlight;
  const spotlightIcon = spotlight?.icon || 'fa-feather';
  const spotlightEyebrow = spotlight?.eyebrow || 'Cross-Platform Excellence';
  const spotlightLabel = p.capabilitySpotlight ? 'Service spotlight' : 'Flutter development spotlight';
  const flutterSpotlight = spotlight ? `
    <aside class="cma-cap-flutter"${aos ? ' data-aos="fade-up" data-aos-delay="200"' : ''} aria-label="${esc(spotlightLabel)}">
      <div class="cma-cap-flutter__glow" aria-hidden="true"></div>
      <div class="cma-cap-flutter__inner">
        <div class="cma-cap-flutter__brand">
          <span class="cma-cap-flutter__logo" aria-hidden="true"><i class="${faIcon(spotlightIcon)}"></i></span>
          <div>
            <p class="cma-cap-flutter__eyebrow">${esc(spotlightEyebrow)}</p>
            <h3 class="cma-cap-flutter__title">${esc(spotlight.title)}</h3>
          </div>
        </div>
        <p class="cma-cap-flutter__lead">${esc(spotlight.lead)}</p>
        <div class="cma-cap-flutter__body">
          <ul class="cma-cap-flutter__list">${(spotlight.points || []).map((pt) =>
            `<li><i class="fas fa-bolt" aria-hidden="true"></i>${esc(pt)}</li>`
          ).join('')}</ul>
          <div class="cma-cap-flutter__stack">${(spotlight.stack || []).map((t) =>
            `<span>${esc(t)}</span>`
          ).join('')}</div>
        </div>
      </div>
    </aside>` : '';

  const content = `
    <header class="cma-cap-head"${headAos}>
      <span class="cma-cap-head__badge"><i class="${faIcon(p.capabilitiesBadgeIcon || 'fa-mobile-screen-button')}" aria-hidden="true"></i> Capabilities</span>
      <h2 id="${esc(headingId)}" class="cma-cap-head__title font-display">${esc(titles.features || 'Key Features & Capabilities')}</h2>
      <p class="cma-cap-head__lead">${esc(intro)}</p>
    </header>

    <div class="cma-cap-includes"${aos ? ' data-aos="fade-up" data-aos-delay="100"' : ''}>
      <p class="cma-cap-includes__label">What this service includes</p>
      <div class="cma-cap-includes__pills">${pills}</div>
    </div>

    <div class="cma-cap-bento">${cards}</div>
    ${flutterSpotlight}`;

  return parallaxShell({
    sectionId,
    headingId,
    bgUrl,
    speed: '0.34',
    extraClass: 'cma-cap-section cma-cap-section--light-parallax',
    content,
  });
}
