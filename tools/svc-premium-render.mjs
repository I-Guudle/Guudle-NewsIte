/**
 * Premium enterprise service page renderer
 * Used for website-development & web-application
 */
import { navScriptBlock } from './nav-shell.mjs';
import { getSliderForSlug, getSliderOgUrl } from './slider-images.mjs';
import { PREMIUM_SLUGS, PREMIUM_OVERRIDES } from './svc-premium-config.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderCapabilitiesSection } from './svc-capabilities-render.mjs';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from './site-contact.mjs';
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderBenefitsSection } from './benefits-section-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function isPremiumSlug(slug) {
  return PREMIUM_SLUGS.has(slug);
}

function premiumData(slug, p) {
  return { ...p, premium: PREMIUM_OVERRIDES[slug] || {} };
}

function schemaJson(slug, p) {
  const url = `https://guudle.com/pages/services/${slug}.html`;
  const graph = [
    {
      '@type': 'Service',
      name: p.title,
      description: p.metaDescription,
      provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      areaServed: 'Worldwide',
      url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://guudle.com/pages/services/' },
        { '@type': 'ListItem', position: 3, name: p.title, item: url },
      ],
    },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function sectionHead(badge, title, subtitle = '') {
  const sub = subtitle
    ? `<p class="pre-section-head__sub">${esc(subtitle)}</p>`
    : '';
  return `<div class="pre-section-head" data-aos="fade-up">
    <span class="pre-pill">${esc(badge)}</span>
    <h2 class="pre-section-head__title">${title}</h2>
    ${sub}
  </div>`;
}

function heroSection(p, pre) {
  const heroImg = p.heroImage || getSliderForSlug(p.slug, 0);
  const sideImg = p.overviewImage || getSliderForSlug(p.slug, 1);
  const stats = (pre.stats || []).map((s, i) =>
    `<div class="pre-stat" data-aos="fade-up" data-aos-delay="${100 + i * 50}">
      <strong class="pre-stat__value" data-pre-count="${esc(s.value.replace(/[^0-9.]/g, ''))}" data-pre-suffix="${esc(s.value.replace(/[0-9.]/g, ''))}">${esc(s.value)}</strong>
      <span class="pre-stat__label">${esc(s.label)}</span>
    </div>`
  ).join('');

  return `
    <section class="pre-hero guudle-parallax-section" aria-labelledby="pre-hero-heading" data-pre-hero data-svc-parallax-section data-svc-parallax-speed="0.28">
      <div class="slp-parallax__bg svc-parallax__bg pre-hero__parallax-bg" style="background-image:url('${heroImg}')" role="img" aria-label="${esc(p.title)} hero background"></div>
      <div class="pre-aurora pre-aurora--hero" aria-hidden="true"></div>
      <div class="pre-wrap pre-hero__grid">
        <div class="pre-hero__copy">
          <nav class="pre-breadcrumb" aria-label="Breadcrumb" data-aos="fade-up">
            <a href="../../index.html">Home</a><span>/</span>
            <span>Services</span><span>/</span>
            <span class="pre-breadcrumb__current">${esc(p.title)}</span>
          </nav>
          <span class="pre-pill pre-pill--hero" data-aos="fade-up">${esc(pre.heroEyebrow || p.badge)}</span>
          <p class="pre-hero__kicker" data-aos="fade-up" data-aos-delay="40">${esc(pre.heroKicker || 'Enterprise Software')}</p>
          <h1 id="pre-hero-heading" class="pre-hero__title" data-aos="fade-up" data-aos-delay="80">
            ${esc(p.headline)} <span class="pre-gradient-text">${esc(p.headlineAccent)}</span>
          </h1>
          <p class="pre-hero__lead" data-aos="fade-up" data-aos-delay="120">${esc(p.subhead)}</p>
          <div class="pre-hero__actions" data-aos="fade-up" data-aos-delay="160">
            <a href="#pre-contact" class="pre-btn pre-btn--primary">Request a Quote <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="../contact.html" class="pre-btn pre-btn--ghost">Book Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          </div>
        </div>
        <div class="pre-hero__visual" data-aos="fade-left" data-aos-delay="120">
          <div class="pre-hero__photo">
            <img src="${heroImg}" alt="${esc(p.title)} — professional team at work" width="640" height="480" loading="eager">
            <div class="pre-hero__photo-overlay" aria-hidden="true"></div>
          </div>
          <div class="pre-hero__float pre-hero__float--side">
            <img src="${sideImg}" alt="" width="200" height="140" loading="lazy" aria-hidden="true">
          </div>
          <div class="pre-hero__float pre-hero__float--badge">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
            <div>
              <strong>Enterprise Ready</strong>
              <span>ISO-aligned delivery</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pre-wrap pre-hero__stats" data-aos="fade-up" data-aos-delay="200">${stats}</div>
    </section>`;
}

function stickyNav() {
  const links = [
    ['#pre-overview', 'Overview'],
    ['#pre-capabilities', 'Capabilities'],
    ['#pre-architecture', 'Architecture'],
    ['#pre-tech', 'Technology'],
    ['#svc-process-hub', 'Process'],
    ['#pre-contact', 'Contact'],
  ];
  const inner = links.map(([href, label]) =>
    `<a href="${href}" class="slp-sticky-nav__link" data-svc-nav-link>${label}</a>`
  ).join('');
  return `<nav class="slp-sticky-nav pre-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">${inner}</div></nav>`;
}

function overviewSection(p) {
  const ov = p.overview || {};
  const highlights = (ov.highlights || []).map((h) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(h)}</li>`
  ).join('');
  return `
    <section id="pre-overview" class="pre-section pre-section--white">
      <div class="pre-wrap pre-overview">
        <div class="pre-overview__copy" data-aos="fade-up">
          ${sectionHead('Overview', esc(ov.title || `Introduction to ${p.title}`), ov.text)}
          <ul class="pre-checklist">${highlights}</ul>
          <a href="#pre-contact" class="pre-link-arrow">Start your project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
        <div class="pre-overview__visual" data-aos="fade-left">
          <div class="pre-image-card">
            <img src="${p.overviewImage || getSliderForSlug(p.slug, 1)}" alt="${esc(p.title)} overview" width="600" height="450" loading="lazy">
            <div class="pre-image-card__glow" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>`;
}

function capabilitiesSection(p) {
  return renderCapabilitiesSection(p, { sectionId: 'pre-capabilities', aos: true });
}

function featuresSection() {
  return '';
}

function hubSection(pre) {
  const hub = pre.hub || {};
  const nodes = (hub.nodes || []).map((n, i) =>
    `<div class="pre-hub__node" data-pre-hub-node="${i}" style="--pre-hub-i:${i};--pre-hub-total:${hub.nodes?.length || 1}">
      <span class="pre-hub__node-icon"><i class="fas ${n.icon}" aria-hidden="true"></i></span>
      <strong>${esc(n.label)}</strong>
      <span>${esc(n.desc)}</span>
    </div>`
  ).join('');
  return `
    <section id="pre-architecture" class="pre-section pre-section--white">
      <div class="pre-wrap">
        ${sectionHead(hub.badge || 'Architecture', esc(hub.title || 'System Architecture'), hub.subtitle)}
        <div class="pre-hub" data-pre-hub data-aos="fade-up">
          <div class="pre-hub__ring" aria-hidden="true"></div>
          <div class="pre-hub__spokes" aria-hidden="true">${(hub.nodes || []).map((_, i) =>
            `<span class="pre-hub__spoke" style="--pre-hub-i:${i};--pre-hub-total:${hub.nodes?.length || 1}"></span>`
          ).join('')}</div>
          <div class="pre-hub__center">
            <i class="fas fa-circle-nodes" aria-hidden="true"></i>
            <strong>${esc(hub.center || 'Core')}</strong>
          </div>
          ${nodes}
        </div>
      </div>
    </section>`;
}

function splitSection(split, slug, i) {
  const img = getSliderForSlug(slug, split.imageOffset ?? i + 2);
  const bullets = (split.bullets || []).map((b) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(b)}</li>`
  ).join('');
  const reverse = split.reverse ? ' pre-split--reverse' : '';
  return `
    <section class="pre-section pre-section--white pre-split${reverse}" data-aos="fade-up">
      <div class="pre-wrap pre-split__grid">
        <div class="pre-split__copy">
          <span class="pre-pill">${esc(split.badge)}</span>
          <h2 class="pre-split__title">${esc(split.title)}</h2>
          <p class="pre-split__text">${esc(split.text)}</p>
          <ul class="pre-checklist pre-checklist--compact">${bullets}</ul>
        </div>
        <div class="pre-split__visual">
          <div class="pre-image-card pre-image-card--tall">
            <img src="${img}" alt="" width="560" height="420" loading="lazy">
          </div>
        </div>
      </div>
    </section>`;
}

function techSection() {
  return '';
}

function processSection() {
  return renderProcessHubCta({ linkPrefix: '../' });
}

function casesSection() {
  return '';
}

function insightsSection(pre) {
  const items = (pre.insights || []).map((ins, i) =>
    `<article class="pre-insight" data-aos="fade-up" data-aos-delay="${i * 70}">
      <div class="pre-insight__icon"><i class="fas ${ins.icon}" aria-hidden="true"></i></div>
      <h3>${esc(ins.title)}</h3>
      <p>${esc(ins.desc)}</p>
    </article>`
  ).join('');
  if (!items) return '';
  return `
    <section class="pre-section pre-section--white" aria-label="Industry insights">
      <div class="pre-wrap">
        ${sectionHead('Insights', 'Industry Trends &amp; Best Practices')}
        <div class="pre-insight-grid">${items}</div>
      </div>
    </section>`;
}

function benefitsSection(p) {
  return renderBenefitsSection(p, { sectionId: 'svc-benefits', aos: true, slug: p.slug });
}

function whySection(p) {
  const items = (p.whyChoose || []).slice(0, 4).map((w, i) =>
    `<article class="pre-why" data-aos="fade-up" data-aos-delay="${i * 60}">
      <div class="pre-why__icon"><i class="fas ${w.icon || 'fa-star'}" aria-hidden="true"></i></div>
      <h3>${esc(w.title)}</h3>
      <p>${esc(w.desc)}</p>
    </article>`
  ).join('');
  return `
    <section id="pre-why" class="pre-section pre-section--white">
      <div class="pre-wrap">
        ${sectionHead('Why Guudle', p.sectionTitles?.whyChoose || 'Why Choose Guudle', 'Enterprise delivery with the expertise, security, and accountability global teams expect.')}
        <div class="pre-why-grid">${items}</div>
      </div>
    </section>`;
}

function testimonialsSection(p) {
  const items = (p.testimonials || []).slice(0, 3).map((t, i) =>
    `<blockquote class="pre-testimonial" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="pre-testimonial__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p>"${esc(t.quote)}"</p>
      <footer><strong>${esc(t.name)}</strong><span>${esc(t.role)}, ${esc(t.company)}</span></footer>
    </blockquote>`
  ).join('');
  return `
    <section id="pre-testimonials" class="pre-section pre-section--soft">
      <div class="pre-wrap">
        ${sectionHead('Testimonials', p.sectionTitles?.testimonials || 'What Our Clients Say')}
        <div class="pre-testimonial-grid">${items}</div>
      </div>
    </section>`;
}

function faqSection(p) {
  return renderEnterpriseFaqSection({
    id: 'pre-faq',
    faqs: p.faqs || [],
    contactHref: '#pre-contact',
    contactPageHref: '../contact.html',
    aos: true,
  });
}

function ctaSection(p) {
  return `
    <section class="pre-cta" aria-label="Call to action">
      <div class="pre-aurora pre-aurora--cta" aria-hidden="true"></div>
      <div class="pre-wrap pre-cta__inner" data-aos="fade-up">
        <h2>${esc(p.cta || 'Ready to Get Started?')}</h2>
        <p>${esc(p.ctaSubtext || 'Partner with Guudle IT Solutions for enterprise-grade delivery worldwide.')}</p>
        <div class="pre-cta__actions">
          <a href="#pre-contact" class="pre-btn pre-btn--primary">Get Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="../contact.html" class="pre-btn pre-btn--ghost pre-btn--ghost-dark">Request Proposal <i class="fas fa-file-lines" aria-hidden="true"></i></a>
        </div>
      </div>
    </section>`;
}

function contactSection(p) {
  return `
    <section id="pre-contact" class="pre-section pre-section--white">
      <div class="pre-wrap pre-contact">
        <div class="pre-contact__aside" data-aos="fade-up">
          <span class="pre-pill">Contact</span>
          <h2 class="pre-contact__title">Start Your Project</h2>
          <p class="pre-contact__lead">Tell us about your goals. We respond within one business day with a tailored proposal.</p>
          <ul class="pre-contact__list">
            <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
            <li><i class="fas fa-phone" aria-hidden="true"></i> Speak with our team</li>
            <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
          </ul>
        </div>
        <form id="svc-contact-form" class="pre-contact__form" data-aos="fade-up" novalidate>
          <div data-slp-field>
            <label for="svc-name">Full Name <span class="pre-required">*</span></label>
            <input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-email">Work Email <span class="pre-required">*</span></label>
            <input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-message">Project Details <span class="pre-required">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your project goals and timeline..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="pre-btn pre-btn--primary pre-btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </section>`;
}

function relatedSection(p) {
  if (!p.related?.length) return '';
  const links = p.related.map((r) =>
    `<a href="${esc(r.href)}" class="pre-related__link"><i class="fas fa-arrow-right" aria-hidden="true"></i>${esc(r.label)}</a>`
  ).join('');
  return `
    <section class="pre-related" aria-label="Related services">
      <div class="pre-wrap">
        <p class="pre-related__label">Related Services</p>
        <div class="pre-related__links">${links}</div>
      </div>
    </section>`;
}

export function buildPremiumPage(slug, p) {
  const data = premiumData(slug, p);
  const pre = data.premium;
  const prefix = '../../assets/';
  const ogImage = p.heroOgUrl || getSliderOgUrl(slug);

  const splits = (pre.splits || []).map((s, i) => splitSection(s, slug, i)).join('\n');

  const body = [
    heroSection(data, pre),
    stickyNav(),
    overviewSection(data),
    capabilitiesSection(data),
    hubSection(pre),
    featuresSection(data),
    splits,
    techSection(data),
    processSection(),
    casesSection(data, pre),
    insightsSection(pre),
    benefitsSection(data),
    whySection(data),
    testimonialsSection(data),
    faqSection(data),
    ctaSection(data),
    contactSection(data),
    relatedSection(data),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="description" content="${esc(p.metaDescription)}">
  <meta name="keywords" content="${esc(p.keywords)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:title" content="${esc(p.title)} | Guudle IT Solutions">
  <meta property="og:description" content="${esc(p.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.title)} | Guudle IT Solutions">
  <meta name="twitter:description" content="${esc(p.metaDescription)}">
  <meta name="twitter:image" content="${ogImage}">
  <title>${esc(p.title)} | Guudle IT Solutions</title>
  <script type="application/ld+json">${schemaJson(slug, p)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="${prefix}js/tailwind-config.js"></script>
  <link rel="stylesheet" href="${prefix}css/styles.css">
  <link rel="stylesheet" href="${prefix}css/service-landing-shared.css">
  <link rel="stylesheet" href="${prefix}css/svc-premium.css">
  <link rel="stylesheet" href="${prefix}css/svc-capabilities.css">
  <link rel="stylesheet" href="${prefix}css/site-unified.css">
  <link rel="stylesheet" href="${prefix}css/benefits-section.css">
</head>
<body class="slp-page pre-page service-page scroll-smooth antialiased guudle-site" data-slp-prefix="svc" data-svc-theme="${esc(p.theme)}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress pre-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top pre-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">
${body}
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
${navScriptBlock(prefix)}
  <script src="${prefix}js/service-landing-core.js"></script>
  <script src="${prefix}js/svc-premium.js"></script>
</body>
</html>`;
}
