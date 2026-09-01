/** Shared HTML renderer — Key Features & Capabilities (dark navy glow) */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-star';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

const ACCENTS = ['cyan', 'indigo', 'teal', 'violet', 'sky', 'emerald'];

function derivePoints(title, desc) {
  const t = title.toLowerCase();
  if (t.includes('security') || t.includes('compliance') || t.includes('shield')) {
    return [
      'Role-based access, encryption, and audit-ready controls',
      'Vulnerability testing and continuous monitoring',
      'Compliance alignment with industry standards',
    ];
  }
  if (t.includes('seo') || t.includes('search') || t.includes('analytics') || t.includes('chart')) {
    return [
      'Keyword strategy, metadata, and structured data',
      'Performance tracking with actionable dashboards',
      'Iterative optimization based on real user data',
    ];
  }
  if (t.includes('design') || t.includes('ux') || t.includes('ui') || t.includes('brand')) {
    return [
      'User research, wireframes, and design systems',
      'Accessible, responsive layouts across devices',
      'Brand-consistent components and style guides',
    ];
  }
  if (t.includes('mobile') || t.includes('app') || t.includes('ios') || t.includes('android')) {
    return [
      'Native and cross-platform implementation options',
      'App Store / Play Store launch and ASO support',
      'Offline sync, push notifications, and analytics',
    ];
  }
  if (t.includes('cloud') || t.includes('devops') || t.includes('scale') || t.includes('architecture')) {
    return [
      'Cloud-native architecture with auto-scaling',
      'CI/CD pipelines and infrastructure as code',
      'Monitoring, alerting, and cost optimization',
    ];
  }
  if (t.includes('ai') || t.includes('machine') || t.includes('automation') || t.includes('intelligent')) {
    return [
      'Model selection, training, and validation workflows',
      'Secure API integration with guardrails',
      'Continuous improvement from production feedback',
    ];
  }
  const snippet = desc ? desc.split('.')[0] : title;
  return [
    `Structured delivery for ${snippet.toLowerCase()}`,
    'Security, performance, and scalability built in',
    'Clear milestones, documentation, and handover',
  ];
}

export function enrichFeature(f, pageTitle) {
  const title = f.title || 'Capability';
  const desc = f.desc || '';
  return {
    icon: f.icon || 'fa-star',
    title,
    desc,
    detail: f.detail || `${desc} Our ${pageTitle} specialists implement this with proven frameworks, transparent reporting, and measurable KPIs aligned to your business goals.`,
    points: f.points?.length ? f.points : derivePoints(title, desc),
    tag: f.tag,
    chips: f.chips,
  };
}

function capabilityCard(f, i, { aos = true } = {}) {
  const num = String(i + 1).padStart(2, '0');
  const accent = ACCENTS[i % ACCENTS.length];
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 55, 330)}"` : '';
  const points = f.points.map((p) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(p)}</li>`).join('');
  return `<article class="svc-cap-card svc-cap-card--${accent}"${aosAttr}>
    <span class="svc-cap-card__num" aria-hidden="true">${num}</span>
    <div class="svc-cap-card__glow" aria-hidden="true"></div>
    <div class="svc-cap-card__icon"><i class="${faIcon(f.icon)}" aria-hidden="true"></i></div>
    <h3 class="svc-cap-card__title">${esc(f.title)}</h3>
    <p class="svc-cap-card__desc">${esc(f.desc)}</p>
    <p class="svc-cap-card__detail">${esc(f.detail)}</p>
    <ul class="svc-cap-card__points">${points}</ul>
  </article>`;
}

function capabilitiesIntro(p) {
  const titles = p.sectionTitles || {};
  if (titles.featuresSub) return titles.featuresSub;
  if (p.capabilitiesIntro) return p.capabilitiesIntro;
  if (p.overview?.text) {
    const lead = p.overview.text.split('.').filter(Boolean)[0];
    return `${lead.trim()}. Below are the core capabilities we deliver as part of our ${p.title} service.`;
  }
  if (p.subhead) return `${p.subhead} Explore the features, engineering standards, and service outcomes we bring to every engagement.`;
  return `Comprehensive ${p.title} capabilities — engineered for performance, security, scalability, and long-term maintainability.`;
}

function serviceSummary(p) {
  if (p.services?.length) {
    return p.services.slice(0, 4).map((s) =>
      `<span class="svc-cap-summary__pill"><i class="${faIcon(s.icon)}" aria-hidden="true"></i>${esc(s.title)}</span>`
    ).join('');
  }
  return [
    '<span class="svc-cap-summary__pill"><i class="fas fa-compass" aria-hidden="true"></i>Strategy &amp; Discovery</span>',
    '<span class="svc-cap-summary__pill"><i class="fas fa-pen-ruler" aria-hidden="true"></i>Design &amp; Architecture</span>',
    '<span class="svc-cap-summary__pill"><i class="fas fa-code" aria-hidden="true"></i>Build &amp; Integration</span>',
    '<span class="svc-cap-summary__pill"><i class="fas fa-rocket" aria-hidden="true"></i>Launch &amp; Support</span>',
  ].join('');
}

/**
 * @param {object} p — page config (title, features, sectionTitles, overview, services, subhead)
 * @param {object} [opts]
 * @param {string} [opts.sectionId='svc-features']
 * @param {number} [opts.cols=3]
 * @param {boolean} [opts.aos=true]
 */
export function renderCapabilitiesSection(p, opts = {}) {
  const sectionId = opts.sectionId || 'svc-features';
  const aos = opts.aos !== false;
  const variant = opts.variant || 'dark';
  const titles = p.sectionTitles || {};
  const features = (p.features || p.capabilities || []).map((f) =>
    enrichFeature(typeof f === 'object' && !Array.isArray(f) ? f : { title: f[1], desc: f[2], icon: f[0] }, p.title)
  );
  if (!features.length) return '';

  const cols = opts.cols || (features.length <= 4 ? 2 : 3);
  const gridClass = cols === 2 ? 'svc-cap-grid svc-cap-grid--2' : 'svc-cap-grid svc-cap-grid--3';
  const cards = features.map((f, i) => capabilityCard(f, i, { aos })).join('');
  const intro = capabilitiesIntro(p);
  const summary = serviceSummary(p);
  const headAos = aos ? ' data-aos="fade-up"' : '';
  const sectionClass = variant === 'light' ? 'svc-cap-section svc-cap-section--light' : 'svc-cap-section';
  const ambient = variant === 'light' ? '' : `
      <div class="svc-cap-ambient" aria-hidden="true">
        <div class="svc-cap-ambient__grid"></div>
        <div class="svc-cap-ambient__neo"></div>
        <div class="svc-cap-ambient__orb svc-cap-ambient__orb--1"></div>
        <div class="svc-cap-ambient__orb svc-cap-ambient__orb--2"></div>
      </div>`;

  return `
    <section id="${esc(sectionId)}" class="${sectionClass} py-20 sm:py-28">
      ${ambient}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header class="svc-cap-head"${headAos}>
          <span class="svc-cap-head__badge"><i class="fas fa-layer-group" aria-hidden="true"></i> Capabilities</span>
          <h2 class="svc-cap-head__title">${esc(titles.features || 'Key Features & Capabilities')}</h2>
          <p class="svc-cap-head__lead">${esc(intro)}</p>
        </header>
        <div class="svc-cap-summary"${aos ? ' data-aos="fade-up" data-aos-delay="80"' : ''}>
          <p class="svc-cap-summary__label">What this service includes</p>
          <div class="svc-cap-summary__pills">${summary}</div>
        </div>
        <div class="${gridClass}">${cards}</div>
      </div>
    </section>`;
}
