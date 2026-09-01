/**
 * Marketing Technology Ecosystem — partnerships v3 section (matches custom-mobile-app layout)
 */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function brandNode(t) {
  const name = esc(t.name);
  const icon = faIcon(t.icon);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24);
  return `<div class="ptr-brand" aria-label="${name}"><span class="ptr-brand__icon ptr-brand__icon--${slug}"><i class="${icon}" aria-hidden="true"></i></span><span class="ptr-brand__name">${name}</span></div>`;
}

function marqueeBrands(tech) {
  const items = (tech || []).slice(0, 10);
  const group = items.map((t) => brandNode(t)).join('');
  return `<div class="ptr-marquee__group" aria-hidden="false">${group}</div>
            <div class="ptr-marquee__group" aria-hidden="true">${group}</div>`;
}

function spotlightCard(sp, i) {
  const color = sp.color || ['#4285F4', '#1877F2', '#0A66C2'][i % 3];
  const tags = (sp.tags || []).map((t) => `<span class="ptr-v3__tag">${esc(t)}</span>`).join('');
  return `<article class="ptr-v3__spot" style="--spot-color:${color};">
          <div class="ptr-v3__spot-icon"><i class="${faIcon(sp.icon)}" aria-hidden="true"></i></div>
          <h4>${esc(sp.title)}</h4>
          <p class="ptr-v3__spot-role">${esc(sp.role || '')}</p>
          <p>${esc(sp.desc)}</p>
          ${tags ? `<div class="ptr-v3__spot-tags">${tags}</div>` : ''}
        </article>`;
}

function gridCard(c) {
  return `<article class="ptr-v3__card" style="--card-color:${c.color || '#10A5F5'};"><span class="ptr-v3__card-logo"><i class="${faIcon(c.icon)}" aria-hidden="true"></i></span><div><h5>${esc(c.title)}</h5><p>${esc(c.desc)}</p></div></article>`;
}

function orbitNode(n) {
  return `<span class="ptr-orbit-node" tabindex="0" data-ptr-eco-partner="${esc(n.tip)}"><i class="${faIcon(n.icon)}" aria-hidden="true"></i> ${esc(n.label)}</span>`;
}

function valueCard(v) {
  return `<article class="ptr-v3__value"><div class="ptr-v3__value-ico"><i class="${faIcon(v.icon)}" aria-hidden="true"></i></div><div><h4>${esc(v.title)}</h4><p>${esc(v.desc)}</p></div></article>`;
}

function solCard(s) {
  const items = (s.items || []).map((x) => `<li>${esc(x)}</li>`).join('');
  return `<article class="ptr-v3__sol" style="--sol-c:${s.color || '#10A5F5'};"><h4><i class="${faIcon(s.icon)}" aria-hidden="true"></i> ${esc(s.title)}</h4><ul>${items}</ul></article>`;
}

function certCard(c) {
  return `<article class="ptr-v3__cert" style="--cert-a:${c.a || '#6366F1'};--cert-b:${c.b || '#4338CA'};"><span class="ptr-v3__cert-ico"><i class="${faIcon(c.icon)}" aria-hidden="true"></i></span><div><h5>${esc(c.title)}</h5><p>${esc(c.desc)}</p></div></article>`;
}

const DEFAULT_VALUES = [
  { icon: 'fa-chart-line', title: 'Measurable ROI', desc: 'Every channel tracked against leads, conversions, ROAS, and revenue attribution.' },
  { icon: 'fa-robot', title: 'Marketing Automation', desc: 'Triggered workflows, nurture sequences, and AI-assisted optimization at scale.' },
  { icon: 'fa-bullseye', title: 'Precision Targeting', desc: 'Audience segmentation and intent-based campaigns that reduce waste and improve CPA.' },
  { icon: 'fa-chart-pie', title: 'Unified Analytics', desc: 'Executive dashboards connecting ad spend to pipeline and revenue outcomes.' },
  { icon: 'fa-shield-halved', title: 'Brand-Safe Execution', desc: 'Compliance-aware campaigns with transparent reporting and governance.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Named strategists, weekly optimization cycles, and long-term partnership.' },
];

/**
 * @param {object} p — full page config (expects p.ecosystem)
 */
export function renderMarketingEcosystemSection(p) {
  const eco = p.ecosystem || {};
  const sectionId = eco.sectionId || 'marketing-ecosystem';
  const headingId = eco.headingId || 'marketing-ecosystem-heading';
  const badge = eco.badge || p.badge || 'Digital Marketing';
  const titleEm = eco.titleEm || 'Powered by Leading Platforms';
  const title = eco.title || 'Marketing Excellence,';
  const lead = eco.lead || p.subhead || '';
  const sub = eco.sub || (p.overview?.text || '');
  const pills = (eco.pills || [
    { icon: 'fa-chart-line', label: 'Data-Driven Strategy' },
    { icon: 'fa-bullseye', label: 'Performance Marketing' },
    { icon: 'fa-robot', label: 'Automation & AI' },
    { icon: 'fa-chart-bar', label: 'Transparent Reporting' },
  ]).map((pill) =>
    `<span class="ptr-v3__pill"><i class="${faIcon(pill.icon)}" aria-hidden="true"></i> ${esc(pill.label)}</span>`
  ).join('');

  const tech = p.tech || [];
  const spotlight = (eco.spotlight || tech.slice(0, 3).map((t, i) => ({
    icon: t.icon,
    title: t.name,
    role: i === 0 ? 'Primary Platform' : 'Channel Partner',
    desc: `Enterprise-grade ${t.name} integration for campaign setup, tracking, and optimization.`,
    tags: [t.name, 'Analytics', 'ROI'],
  }))).map(spotlightCard).join('');

  const grid = (eco.grid || tech.slice(0, 6).map((t) => ({
    icon: t.icon,
    title: t.name,
    desc: 'Campaign management, reporting, and optimization.',
    color: '#10A5F5',
  }))).map(gridCard).join('');

  const orbit = (eco.orbit || tech.slice(0, 6).map((t) => ({
    icon: t.icon,
    label: t.name,
    tip: `${t.name} — campaign setup, tracking, and performance optimization`,
  }))).map(orbitNode).join('');

  const values = (eco.values || DEFAULT_VALUES).map(valueCard).join('');
  const solutions = (eco.solutions || [
    { icon: 'fa-magnifying-glass-chart', title: 'Search & SEO', items: ['Organic', 'Technical', 'Local'], color: '#10A5F5' },
    { icon: 'fa-bullhorn', title: 'Paid Media', items: ['Google Ads', 'Meta Ads', 'Display'], color: '#6366F1' },
    { icon: 'fa-envelope', title: 'Lifecycle Marketing', items: ['Email', 'SMS', 'WhatsApp'], color: '#10A5F5' },
    { icon: 'fa-cart-shopping', title: 'Commerce Growth', items: ['CRO', 'Marketplaces', 'Listings'], color: '#6366F1' },
  ]).map(solCard).join('');

  const certs = (eco.certs || [
    { icon: 'fab fa-google', title: 'Google Partner Stack', desc: 'Ads, Analytics, Tag Manager & Search Console.', a: '#4285F4', b: '#1967D2' },
    { icon: 'fab fa-meta', title: 'Meta Business Certified', desc: 'Facebook, Instagram & Conversions API expertise.', a: '#1877F2', b: '#0C63D4' },
    { icon: 'fas fa-chart-line', title: 'Analytics Excellence', desc: 'GA4, attribution modeling & executive dashboards.', a: '#6366F1', b: '#4338CA' },
    { icon: 'fas fa-shield-halved', title: 'Compliance Ready', desc: 'GDPR, CAN-SPAM, TCPA & platform policy adherence.', a: '#37474F', b: '#10A5F5' },
    { icon: 'fas fa-award', title: 'Proven Results', desc: 'Documented ROAS lifts, lead growth & retention rates.', a: '#10A5F5', b: '#0891B2' },
  ]).map(certCard).join('');

  const hubTitle = eco.hubTitle || 'Guudle Marketing Hub';
  const hubCore = eco.hubCore || 'GUUDLE<br>Marketing';
  const ctaTitle = eco.ctaTitle || `Ready to Grow with ${p.title || 'Digital Marketing'}?`;
  const ctaDesc = eco.ctaDesc || 'Partner with Guudle IT Solutions for data-driven marketing that generates more traffic, qualified leads, and measurable business growth.';
  const ctaBtn = eco.ctaBtn || 'Get Started Today';

  return `
    <section class="partners-section partners-section--v3" id="${esc(sectionId)}" aria-labelledby="${esc(headingId)}">
    <div class="ptr-v3__hero">
      <div class="ptr-v3__hero-bg" aria-hidden="true">
        <div class="ptr-v3__hero-grid"></div>
        <span class="ptr-v3__hero-orb ptr-v3__hero-orb--1"></span>
        <span class="ptr-v3__hero-orb ptr-v3__hero-orb--2"></span>
      </div>
      <div class="ptr-v3__hero-inner">
        <div data-aos="fade-up">
          <span class="ptr-v3__badge"><i class="fas fa-bullhorn" aria-hidden="true"></i> ${esc(badge)}</span>
          <h2 id="${esc(headingId)}" class="ptr-v3__title font-display">${esc(title)} <em>${esc(titleEm)}</em></h2>
          <p class="ptr-v3__lead">${esc(lead)}</p>
          <p class="ptr-v3__sub">${esc(sub)}</p>
          <div class="ptr-v3__pills">${pills}</div>
        </div>
      </div>
    </div>
    <div class="ptr-v3__body">
      <div class="ptr-v3__marquee" data-aos="fade-up">
        <p class="ptr-v3__marquee-label">Platforms &amp; tools powering our ${esc(p.title || 'marketing')} programs</p>
        <div class="ptr-marquee" data-ptr-marquee role="region" aria-label="Marketing technology logos">
          <div class="ptr-marquee__track">${marqueeBrands(tech)}</div>
        </div>
      </div>
      <header class="ptr-v3__head" data-aos="fade-up">
        <span class="ptr-v3__eyebrow"><i class="fas fa-star" aria-hidden="true"></i> Marketing Platforms</span>
        <h3 class="ptr-v3__sec-title font-display">Technologies &amp; Platforms We Master</h3>
        <p class="ptr-v3__sec-lead">Best-in-class tools for campaign execution, analytics, automation, and conversion optimization — integrated into one accountable growth engine.</p>
      </header>
      <div class="ptr-v3__spotlight" data-aos="fade-up" data-aos-delay="60">${spotlight}</div>
      <div class="ptr-v3__core" data-aos="fade-up">
        <div>
          <header class="ptr-v3__head ptr-v3__head--left">
            <span class="ptr-v3__eyebrow"><i class="fas fa-plug" aria-hidden="true"></i> Marketing Stack</span>
            <h3 class="ptr-v3__sec-title font-display">Analytics, Automation &amp; Channel Tools</h3>
            <p class="ptr-v3__sec-lead">The platforms we configure, integrate, and optimize to deliver measurable marketing performance.</p>
          </header>
          <div class="ptr-v3__grid">${grid}</div>
        </div>
        <aside class="ptr-v3__hub" data-ptr-ecosystem>
          <div class="ptr-v3__hub-mesh" aria-hidden="true"></div>
          <h3 class="ptr-v3__hub-title font-display">${esc(hubTitle)}</h3>
          <div class="ptr-v3__hub-stage">
            <div class="ptr-v3__hub-ring" aria-hidden="true"></div>
            <div class="ptr-v3__hub-core">${hubCore}</div>
            <div class="ptr-v3__hub-nodes">${orbit}</div>
          </div>
          <p class="ptr-orbit__hint" data-ptr-eco-tooltip>Hover a platform to explore capabilities</p>
        </aside>
      </div>
      <div class="ptr-v3__values" data-aos="fade-up">
        <header class="ptr-v3__head">
          <span class="ptr-v3__eyebrow"><i class="fas fa-gem" aria-hidden="true"></i> Why Choose Us</span>
          <h3 class="ptr-v3__sec-title font-display">What Our Marketing Programs Deliver</h3>
          <p class="ptr-v3__sec-lead">Certified experts, data-driven strategies, and transparent reporting — built for sustainable growth.</p>
        </header>
        <div class="ptr-v3__value-grid">${values}</div>
      </div>
      <div class="ptr-v3__lower" data-aos="fade-up">
        <div class="ptr-v3__panel">
          <header class="ptr-v3__head ptr-v3__head--left">
            <span class="ptr-v3__eyebrow"><i class="fas fa-layer-group" aria-hidden="true"></i> Channel Solutions</span>
            <h3 class="ptr-v3__sec-title font-display">Marketing Services We Deliver</h3>
          </header>
          <div class="ptr-v3__sol-list">${solutions}</div>
        </div>
        <div class="ptr-v3__panel">
          <header class="ptr-v3__head ptr-v3__head--left">
            <span class="ptr-v3__eyebrow"><i class="fas fa-shield-halved" aria-hidden="true"></i> Certifications &amp; Standards</span>
            <h3 class="ptr-v3__sec-title font-display">Enterprise Marketing Excellence</h3>
          </header>
          <div class="ptr-v3__cert-list">${certs}</div>
        </div>
      </div>
      <div class="ptr-v3__cta" data-aos="fade-up">
        <div class="ptr-v3__cta-glow" aria-hidden="true"></div>
        <h3 class="font-display">${esc(ctaTitle)}</h3>
        <p>${esc(ctaDesc)}</p>
        <a href="#svc-contact" class="ptr-v3__cta-btn">${esc(ctaBtn)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <p class="ptr-v3__cta-note"><i class="fas fa-circle-check" aria-hidden="true"></i> Data-driven marketing from strategy through continuous optimization</p>
      </div>
    </div>
    </section>`;
}
