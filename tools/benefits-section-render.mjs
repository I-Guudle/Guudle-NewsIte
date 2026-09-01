/**
 * Benefits / Business Benefits — enterprise SSOT renderer (site-wide)
 */
import { getSliderForSlug } from './slider-images.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

/** Split title and wrap accent word(s) in gradient span */
function titleWithAccent(title, accent) {
  const raw = String(title || 'Business Benefits');
  const word = accent || raw.split(/\s+/).pop();
  const idx = raw.lastIndexOf(word);
  if (idx === -1) return esc(raw);
  return `${esc(raw.slice(0, idx))}<span class="guudle-benefits__accent">${esc(word)}</span>${esc(raw.slice(idx + word.length))}`;
}

function normalizeBenefit(b, i) {
  if (typeof b === 'string') {
    return { icon: 'fa-chart-line', title: `Benefit ${i + 1}`, desc: b };
  }
  return {
    icon: b.icon || 'fa-chart-line',
    title: b.title || `Benefit ${i + 1}`,
    desc: b.desc || b.description || '',
  };
}

function benefitCard(b, i, { aos = true } = {}) {
  const item = normalizeBenefit(b, i);
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 70, 420)}"` : '';
  return `<article class="guudle-benefits__card" tabindex="0"${aosAttr}>
    <span class="guudle-benefits__card-shine" aria-hidden="true"></span>
    <span class="guudle-benefits__card-glow" aria-hidden="true"></span>
    <span class="guudle-benefits__card-icon" aria-hidden="true"><i class="${faIcon(item.icon)}"></i></span>
    <h3 class="guudle-benefits__card-title">${esc(item.title)}</h3>
    <p class="guudle-benefits__card-desc">${esc(item.desc)}</p>
  </article>`;
}

/**
 * @param {object} p — page config
 * @param {object} [opts]
 * @param {string} [opts.sectionId]
 * @param {string} [opts.slug]
 * @param {string} [opts.bg]
 * @param {number} [opts.limit]
 * @param {boolean} [opts.aos]
 * @param {string} [opts.pathPrefix]
 */
export function renderBenefitsSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-benefits';
  const headingId = `${sectionId}-heading`;
  const aos = opts.aos !== false;
  const titles = p.sectionTitles || {};
  const slug = opts.slug || p.slug || 'website-development';
  const bgUrl = opts.bg || p.benefitsBg || getSliderForSlug(slug, 4);

  const badge = titles.benefitsBadge || 'Benefits';
  const titleRaw = titles.benefits || 'Business Benefits';
  const accent = titles.benefitsAccent;
  const lead = titles.benefitsSub || 'Outcomes that matter to your organization — measurable value delivered with enterprise-grade execution.';
  const titleHtml = titles.benefitsHtml || titleWithAccent(titleRaw, accent);

  const limit = opts.limit ?? (p.layout?.benefitsCols === 3 ? 6 : 8);
  const items = (p.benefits || []).slice(0, limit);
  if (!items.length) return '';

  const cards = items.map((b, i) => benefitCard(b, i, { aos })).join('');
  const headAos = aos ? ' data-aos="fade-up"' : '';
  const cols = opts.cols || p.layout?.benefitsCols || 4;
  const colsClass = cols === 2 ? 'guudle-benefits__grid--2' : cols === 3 ? 'guudle-benefits__grid--3' : 'guudle-benefits__grid--4';

  return `
    <section id="${esc(sectionId)}" class="guudle-benefits guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.3" data-parallax-scale="1.06" aria-labelledby="${esc(headingId)}">
      <div class="guudle-benefits__bg slp-parallax__bg guudle-parallax-layer" style="background-image:url('${bgUrl}')" role="img" aria-label="Benefits section background"></div>
      <div class="guudle-benefits__overlay" aria-hidden="true"></div>
      <div class="guudle-benefits__ambient" aria-hidden="true">
        <div class="guudle-benefits__grid-pattern"></div>
        <span class="guudle-benefits__orb guudle-benefits__orb--1"></span>
        <span class="guudle-benefits__orb guudle-benefits__orb--2"></span>
      </div>
      <div class="guudle-benefits__content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="guudle-benefits__head"${headAos}>
          <span class="guudle-benefits__badge"><i class="fas fa-gem" aria-hidden="true"></i> ${esc(badge)}</span>
          <h2 id="${esc(headingId)}" class="guudle-benefits__title font-display">${titleHtml}</h2>
          <p class="guudle-benefits__lead">${esc(lead)}</p>
        </header>
        <div class="guudle-benefits__grid ${colsClass}" role="list">${cards}</div>
      </div>
    </section>`;
}

/** Map string[] benefits to { title, desc } objects for legacy generators */
export function benefitsFromStrings(list, icons = []) {
  const defaultIcons = ['fa-chart-line', 'fa-shield-halved', 'fa-rocket', 'fa-gauge-high', 'fa-users', 'fa-coins'];
  return (list || []).map((text, i) => ({
    icon: icons[i] || defaultIcons[i % defaultIcons.length],
    title: typeof text === 'string' ? text.split('—')[0].trim().slice(0, 48) || `Benefit ${i + 1}` : `Benefit ${i + 1}`,
    desc: typeof text === 'string' ? text : String(text),
  }));
}
