import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SVC_PAGES } from './svc-pages-config.mjs';
import { AI_PAGES } from './svc-ai-pages.mjs';
import { MIGRATED_PAGES } from './svc-migrated-pages.mjs';
import { TARGET_REDIRECT_SLUGS } from './svc-shared-data.mjs';
import { assetPrefix, navScriptBlock } from './nav-shell.mjs';
import { defaultTestimonials, defaultWhyChoose, buildServicePage } from './svc-page-factory.mjs';
import { getSliderOgUrl } from './slider-images.mjs';
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderCapabilitiesSection } from './svc-capabilities-render.mjs';
import { renderCapabilitiesAccordionSection, renderCapabilitiesGridSection } from './capabilities-accordion-render.mjs';
import { renderMobileCapabilitiesSection } from './mobile-capabilities-render.mjs';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from './site-contact.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderAiServicesHub } from './ai-hub-render.mjs';
import { getCorpoxSectionBuilders } from './svc-corpox-render.mjs';
import { isCorpoxPage } from './svc-master-template.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { renderBenefitsSection } from './benefits-section-render.mjs';
import { renderEnterpriseValueSection } from './enterprise-value-section-render.mjs';

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1].split(',') : null;
/** Marketing pages use tools/generate-mkt-unique.mjs — excluded here to preserve unique layouts */
const ALL_PAGES = { ...SVC_PAGES, ...AI_PAGES, ...MIGRATED_PAGES };

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'pages', 'services');

const VALUE_PILLS = `<div class="slp-value-pills" data-aos="fade-up" data-aos-delay="200">
  <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
  <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
  <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
  <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
</div>`;

const VALUE_PILLS_LIGHT = `<div class="slp-value-pills slp-value-pills--light justify-end" data-aos="fade-up" data-aos-delay="200">
  <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
  <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
  <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
  <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
</div>`;

const HIGHLIGHT_LINKS = ['#svc-features', '#svc-whyChoose', '#svc-benefits'];
const HIGHLIGHT_ICON_VARIANTS = ['teal', 'navy', 'cyan', 'blue'];

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function heroFloatingStats() {
  return '';
}

function heroSaasLightSection(p) {
  const showImage = !p.heroHideImage && (p.heroImage || p.overviewImage);
  const img = showImage ? (p.heroImage || p.overviewImage) : null;
  const imgAlt = p.heroImageAlt || `${p.title} — ${p.category === 'marketing' ? 'digital marketing services' : 'enterprise mobile solutions'} by Guudle IT Solutions`;
  const defaultChips = p.category === 'marketing'
    ? [
      { icon: 'fa-chart-line', label: 'ROI Tracking' },
      { icon: 'fa-bullseye', label: 'Performance Ads' },
    ]
    : [
      { icon: 'fa-shield-halved', label: 'SSO & MDM' },
      { icon: 'fa-wifi', label: 'Offline-first' },
    ];
  const heroChips = p.heroChips || defaultChips;
  const isCorpox = isCorpoxPage(p);
  const isEnterprise = p.theme === 'enterprise-mobile' || isCorpox;
  const isCentered = !img || p.heroCentered;
  const sectionClass = `${isEnterprise ? ' hero-premium--enterprise' : ''}${isCentered ? ' hero-premium--center' : ' hero-premium--split'}`;
  const ctaPrimary = p.heroCtaPrimary || 'Get Started';
  const ctaSecondary = p.heroCtaSecondary || 'Book Consultation';
  const highlights = p.heroHighlights || [
    { icon: 'fa-layer-group', title: 'Scalable Architecture', desc: 'Cloud-native systems built for growth' },
    { icon: 'fa-shield-halved', title: 'Security Focused', desc: 'Hardened, compliant delivery' },
    { icon: 'fa-code', title: 'Modern Technology', desc: 'Current stacks & best practices' },
    { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Responsive post-launch care' },
  ];

  const highlightGrid = highlights.map((h) =>
    `<article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas ${h.icon}" aria-hidden="true"></i></span>
                <div>
                  <strong>${h.title}</strong>
                  <p>${h.desc}</p>
                </div>
              </article>`
  ).join('');

  const imageRight = p.heroImagePosition === 'right';
  const visualLgOrder = imageRight ? 'lg:order-2' : 'lg:order-1';
  const copyLgOrder = imageRight ? 'lg:order-1' : 'lg:order-2';

  const visualColumn = img ? `
          <div class="relative hero-enter hero-enter-d1 order-2 ${visualLgOrder}" data-hero-parallax="0.05" data-aos="fade-right" data-aos-duration="900">
            <div class="hero-visual-panel">
              <div class="hero-visual-panel__glow" aria-hidden="true"></div>
              <div class="hero-visual-panel__ring" aria-hidden="true"></div>
              <div class="hero-visual-panel__frame">
                <img src="${img}" alt="${imgAlt}" width="640" height="800" loading="eager" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas ${heroChips[0]?.icon || 'fa-shield-halved'}"></i> ${heroChips[0]?.label || 'Enterprise'}</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas ${heroChips[1]?.icon || 'fa-wifi'}"></i> ${heroChips[1]?.label || 'Scalable'}</div>
            </div>
          </div>` : '';

  const gridCols = img
    ? 'grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-center py-14 lg:py-20'
    : 'py-14 lg:py-20';

  const titleClass = isEnterprise
    ? 'hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5'
    : 'font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5 text-slate-900';
  const accentClass = isEnterprise
    ? (isCentered ? 'hero-title-navy__line hero-title-navy__line--inline' : 'block mt-2 hero-title-navy__line')
    : 'block mt-2 hero-gradient-text hero-underline';
  const badgePing = isEnterprise ? 'bg-cyan-400' : 'bg-violet-400';
  const badgeDot = isEnterprise ? 'bg-cyan-600' : 'bg-violet-500';
  const breadcrumbActive = isEnterprise ? 'text-[#002080] font-semibold' : 'text-violet-600 font-semibold';
  const aiHubCrumb = p.category === 'ai' && p.slug !== 'ai'
    ? `<a href="ai.html" class="hover:text-slate-800 transition-colors">AI &amp; Emerging Technologies</a><span class="mx-2 text-slate-300">/</span>`
    : '';
  const ctaPrimaryClass = isEnterprise ? 'hero-cta-navy-primary magnetic' : 'hero-cta-primary magnetic';
  const ctaSecondaryClass = isEnterprise ? 'hero-cta-navy-secondary' : 'hero-cta-secondary';
  const ctaSecondaryIcon = isEnterprise ? 'text-cyan-600' : 'text-violet-500';

  const copyWrapClass = isCentered
    ? 'max-w-4xl mx-auto text-center'
    : `max-w-xl order-1 ${copyLgOrder}${img ? '' : ' mx-auto'}`;
  const subheadClass = isCentered ? 'max-w-xl mx-auto' : 'max-w-lg';
  const actionsClass = isCentered ? 'justify-center' : '';
  const featureBlockClass = isCentered ? ' hero-enterprise-grid--center' : '';
  const pillsAlign = isCentered ? 'justify-center' : 'justify-end';
  const pillsBlock = `<div class="hero-enter hero-enter-d5 slp-value-pills slp-value-pills--light ${pillsAlign}" data-aos="fade-up" data-aos-delay="200">
  <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
  <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
  <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
  <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
</div>`;
  const featureBlock = p.heroFeatureStyle === 'pills'
    ? pillsBlock
    : `<div class="hero-enter hero-enter-d5 hero-enterprise-grid${featureBlockClass}" data-aos="fade-up" data-aos-delay="200">${highlightGrid}</div>`;

  const copyColumn = `
          <div class="${copyWrapClass}">
            <nav class="text-sm text-slate-500 mb-7${isCentered ? ' flex flex-wrap justify-center' : ''}" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              ${aiHubCrumb}
              <span class="${breadcrumbActive}">${p.title}</span>
            </nav>

            <div class="hero-enter hero-enter-d1 hero-badge${isEnterprise ? ' hero-badge--navy' : ''} mb-7${isCentered ? ' mx-auto' : ''}" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full ${badgePing} opacity-60"></span><span class="relative rounded-full h-2 w-2 ${badgeDot}"></span></span>
              <span>${p.badge}</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>

            <h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 ${titleClass}" data-aos="fade-up" data-aos-delay="50">${p.headline} <span class="${accentClass}">${p.headlineAccent}</span></h1>

            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 ${subheadClass}" data-aos="fade-up" data-aos-delay="100">${p.subhead}</p>

            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9 ${actionsClass}" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="${ctaPrimaryClass} inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                ${ctaPrimary} <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#svc-contact" class="${ctaSecondaryClass} inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <i class="fas fa-calendar-check ${ctaSecondaryIcon}"></i> ${ctaSecondary}
              </a>
            </div>

            ${featureBlock}
          </div>`;

  const inner = img
    ? `<div class="${gridCols}">${imageRight ? `${copyColumn}${visualColumn}` : `${visualColumn}${copyColumn}`}</div>`
    : `<div class="py-14 lg:py-20">${copyColumn}</div>`;

  return `
    <section class="saas-hero saas-hero--light hero-premium${sectionClass}" aria-labelledby="svc-hero-heading" data-svc-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        ${inner}
      </div>

      <div class="hero-divider" aria-hidden="true">
        <span class="hero-divider__line"></span>
        <span class="hero-divider__gem"></span>
        <span class="hero-divider__line"></span>
      </div>
    </section>`;
}

function enterpriseImmersiveHeroSection(p) {
  const img = p.heroImage;
  const figureImg = p.overviewImage || img;
  const alt = `${p.title} — professional service banner`;

  return `
    <section class="ev3-hero guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.22" data-parallax-scale="1" aria-labelledby="svc-hero-heading" data-svc-hero>
      <div class="ev3-hero__media" aria-hidden="true">
        <div class="ev3-hero__bg slp-parallax__bg svc-parallax__bg" style="background-image:url('${img}')" role="img" aria-label="${alt}"></div>
        <div class="ev3-hero__overlay" aria-hidden="true"></div>
        <div class="ev3-hero__glow ev3-hero__glow--1" aria-hidden="true"></div>
        <div class="ev3-hero__glow ev3-hero__glow--2" aria-hidden="true"></div>
      </div>
      <img class="ev3-hero__figure hidden lg:block" src="${figureImg}" alt="${p.title} — professional team delivering ${p.title.toLowerCase()} solutions" width="520" height="640" loading="eager">
      <div class="ev3-hero__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="ev3-hero__glass" data-aos="fade-up">
          <span class="ev3-hero__badge"><i class="fas fa-star" aria-hidden="true"></i> ${p.badge}</span>
          <h1 id="svc-hero-heading" class="ev3-hero__title">${p.headline} <span class="ev3-hero__accent">${p.headlineAccent}</span></h1>
          <p class="ev3-hero__lead">${p.subhead}</p>
          <div class="ev3-hero__actions">
            <a href="../contact.html" class="ev3-hero__btn ev3-hero__btn--primary">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="#svc-contact" class="ev3-hero__btn ev3-hero__btn--outline">Request a Free Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          </div>
          ${heroFloatingStats(p)}
        </div>
      </div>
      <div class="ev3-hero__cut" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="#F8FAFC"><path d="M0,32L120,28C240,24,480,16,720,24C960,32,1200,56,1320,68L1440,80L1440,80L0,80Z"/></svg>
      </div>
    </section>`;
}

function enterpriseHighlightCards(p) {
  const cards = p.features.slice(0, 4).map((f, i) =>
    `<article class="ev3-glow-card" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="ev3-glow-card__icon ev3-glow-card__icon--${HIGHLIGHT_ICON_VARIANTS[i % HIGHLIGHT_ICON_VARIANTS.length]}"><i class="${faIcon(f.icon)}" aria-hidden="true"></i></div>
      <h2 class="ev3-glow-card__title">${f.title}</h2>
      <p class="ev3-glow-card__desc">${f.desc}</p>
      <a href="${HIGHLIGHT_LINKS[i]}" class="ev3-glow-card__link">Discover services <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </article>`
  ).join('');

  return `
    <section class="ev3-highlight-cards" aria-label="Service highlights">
      <div class="ev3-highlight-cards__grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${cards}</div>
    </section>`;
}

function heroSection(p) {
  if (p.layout?.hero === 'saas-light') return heroSaasLightSection(p);
  if (p.enterpriseTier) return enterpriseImmersiveHeroSection(p);
  const hero = p.layout?.hero || 'full';
  const speed = p.layout?.parallaxSpeed || '0.35';
  const img = p.heroImage;
  const sideImg = p.overviewImage || img;
  const alt = `${p.title} — enterprise service banner`;

  const breadcrumb = `
        <nav class="text-sm text-white/80 mb-8" aria-label="Breadcrumb" data-aos="fade-up">
          <a href="../../index.html" class="hover:text-white">Home</a><span class="mx-2">/</span>
          <span>Services</span><span class="mx-2">/</span>
          <span style="color:var(--svc-accent)" class="font-medium">${p.title}</span>
        </nav>`;

  const badge = `<span class="svc-badge svc-badge--hero mb-6 inline-flex" data-aos="fade-up"><i class="fas fa-star" aria-hidden="true"></i> ${p.badge}</span>`;

  const title = `
          <h1 id="svc-hero-heading" class="svc-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4" data-aos="fade-up" data-aos-delay="50">
            ${p.headline} <span class="svc-gradient-text svc-gradient-text--hero">${p.headlineAccent}</span>
          </h1>
          <p class="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl" data-aos="fade-up" data-aos-delay="100">${p.subhead}</p>`;

  const actions = p.enterpriseTier
    ? `
          <div class="svc-hero__actions flex flex-wrap gap-4 mb-10 justify-center" data-aos="fade-up" data-aos-delay="150">
            <a href="../contact.html" class="svc-btn-primary">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="#svc-contact" class="svc-btn-ghost svc-btn-ghost--hero">Request a Free Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          </div>`
    : `
          <div class="svc-hero__actions flex flex-wrap gap-4 mb-10" data-aos="fade-up" data-aos-delay="150">
            <a href="../contact.html" class="svc-btn-primary">Get Started <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="#svc-contact" class="svc-btn-ghost svc-btn-ghost--hero">Book Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          </div>`;

  const copy = `${breadcrumb}${badge}${title}${actions}${p.valuePills || VALUE_PILLS}${heroFloatingStats(p)}`;

  const parallaxBg = `<div class="slp-parallax__bg svc-parallax__bg" style="background-image:url('${img}')" role="img" aria-label="${alt}"></div>`;
  const overlay = `<div class="slp-parallax__overlay svc-hero-parallax__overlay" aria-hidden="true"></div>`;
  const scrollHint = `<div class="slp-scroll-hint svc-hero-parallax__scroll" aria-hidden="true"><span>Explore</span><i class="fas fa-chevron-down"></i></div>`;

  const base = `svc-hero-parallax svc-hero svc-hero--${hero} slp-parallax`;
  const attrs = `class="${base}" data-svc-parallax-section data-svc-parallax-speed="${speed}" aria-labelledby="svc-hero-heading" data-svc-hero`;

  if (hero === 'split') {
    return `
    <section ${attrs}>
      ${parallaxBg}${overlay}
      <div class="slp-parallax__content svc-hero-parallax__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pb-32">
        <div class="svc-hero-parallax__grid">
          <div class="svc-hero-parallax__copy">${copy}</div>
          <div class="svc-hero-parallax__visual" data-aos="fade-left" data-aos-delay="150">
            <img src="${sideImg}" alt="${p.title} illustration" loading="eager" width="800" height="600" class="svc-hero-parallax__side-img">
          </div>
        </div>
      </div>${scrollHint}
    </section>
    <div class="svc-wave" aria-hidden="true"><svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" class="w-full h-12 sm:h-16"><path d="M0 40L60 35C120 30 240 20 360 18C480 16 600 22 720 28C840 34 960 40 1080 38C1200 36 1320 26 1380 21L1440 16V80H0V40Z"/></svg></div>`;
  }

  const align = hero === 'center' ? ' text-center mx-auto' : hero === 'offset-right' ? ' ml-auto text-right' : hero === 'offset-left' ? '' : ' mx-auto text-center';
  const maxW = hero === 'center' ? ' max-w-3xl' : hero === 'offset-left' || hero === 'offset-right' ? ' max-w-2xl' : ' max-w-4xl';

  return `
    <section ${attrs}>
      ${parallaxBg}${overlay}
      <div class="slp-parallax__content svc-hero-parallax__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pb-32">
        <div class="svc-hero-parallax__copy${align}${maxW}">${copy}</div>
      </div>${scrollHint}
    </section>
    <div class="svc-wave" aria-hidden="true"><svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" class="w-full h-12 sm:h-16"><path d="M0 40L60 35C120 30 240 20 360 18C480 16 600 22 720 28C840 34 960 40 1080 38C1200 36 1320 26 1380 21L1440 16V80H0V40Z"/></svg></div>`;
}

function overviewSection(p) {
  const h = p.overview.highlights.map((x) =>
    `<li class="svc-highlight"><i class="fas fa-circle-check"></i><span>${x}</span></li>`
  ).join('');
  return `
    <section id="svc-overview" class="svc-overview py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="svc-overview__img" data-aos="fade-right">
            <img src="${p.overviewImage}" alt="${p.overview.title} — ${p.title} by Guudle IT Solutions" loading="lazy" width="800" height="600">
          </div>
          <div data-aos="fade-left">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--svc-navy);background:var(--svc-accent-soft)">Overview</span>
            <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">${p.overview.title}</h2>
            <p class="text-slate-600 text-lg leading-relaxed mb-8">${p.overview.text}</p>
            <ul class="space-y-1">${h}</ul>
          </div>
        </div>
      </div>
    </section>`;
}

function featuresSection(p) {
  if (p.capabilitiesVariant === 'mobile-premium') {
    return renderMobileCapabilitiesSection(p, { sectionId: 'svc-features', aos: true });
  }
  if (p.capabilitiesVariant === 'accordion') {
    return renderCapabilitiesAccordionSection(p, { sectionId: 'svc-features', aos: true });
  }
  if (p.capabilitiesVariant === 'grid-2col') {
    return renderCapabilitiesGridSection(p, { sectionId: 'svc-features', aos: true });
  }
  return renderCapabilitiesSection(p, { sectionId: 'svc-features', aos: true });
}

function servicesSection(p) {
  const titles = p.sectionTitles || {};
  const items = p.services.map((s) =>
    `<article class="svc-bento-card" data-aos="fade-up">
      <div class="svc-bento-card__icon"><i class="${s.icon}" aria-hidden="true"></i></div>
      <h3 class="font-bold text-base mb-2">${s.title}</h3>
      <p class="text-slate-600 text-sm">${s.desc}</p>
    </article>`
  ).join('');
  return `
    <section id="svc-services" class="py-20 sm:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="svc-section-head" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--svc-navy);background:var(--svc-accent-soft)">Services</span>
          <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">${titles.services || p.title}</h2>
          <p class="text-slate-600 text-lg">${titles.servicesSub || 'End-to-end capabilities tailored to your goals.'}</p>
        </div>
        <div class="svc-bento">${items}</div>
      </div>
    </section>`;
}

function processSection() {
  return renderProcessHubCta({ linkPrefix: '../' });
}

function benefitsSection(p) {
  return renderBenefitsSection(p, { sectionId: 'svc-benefits', aos: true });
}

function industriesSection(p) {
  return renderIndustriesParallaxSection({
    industries: p.industries || [],
    slug: p.slug,
    bg: p.industriesBg,
    sectionId: 'svc-industries',
    pathPrefix: '../../',
    contactLink: '#svc-contact',
  });
}

function relatedSection(p) {
  if (!p.related?.length) return '';
  const links = p.related.map((r) =>
    `<a href="${r.href}" class="svc-related__link"><i class="fas fa-arrow-right"></i>${r.label}</a>`
  ).join('');
  return `
    <section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
        <div class="flex flex-wrap gap-3">${links}</div>
      </div>
    </section>`;
}

function resultsSection() {
  return '';
}

function statsSection(p) {
  return renderEnterpriseValueSection(p, { sectionId: 'svc-enterprise-value' });
}

function casesSection() {
  return '';
}

function techSection() {
  return '';
}

function aiServicesHubSection() {
  return renderAiServicesHub({ linkPrefix: '', techLinkPrefix: '../' });
}

function faqSection(p) {
  return renderEnterpriseFaqSection({
    id: 'svc-faq',
    faqs: p.faqs || [],
    contactHref: '#svc-contact',
    contactPageHref: '../contact.html',
    aos: true,
  });
}

function ctaSection(p) {
  if (p.enterpriseTier) {
    return `
    <section class="svc-cta svc-cta--enterprise py-20 sm:py-28 relative overflow-hidden" aria-labelledby="svc-cta-heading">
      <div class="svc-cta__mesh" aria-hidden="true"></div>
      <div class="svc-cta__glow svc-cta__glow--teal" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center" data-aos="fade-up">
        <h2 id="svc-cta-heading" class="svc-display text-3xl sm:text-4xl font-extrabold text-white mb-4">${p.cta}</h2>
        <p class="text-white/85 text-lg mb-8 max-w-2xl mx-auto">${p.ctaSubtext || 'Partner with our experienced team to create secure, scalable, and future-ready web solutions tailored to your business goals.'}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#svc-contact" class="svc-cta__btn svc-cta__btn--primary">Get Started Today <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="../contact.html" class="svc-cta__btn svc-cta__btn--ghost">Schedule a Free Consultation</a>
        </div>
      </div>
    </section>`;
  }
  return `
    <section class="svc-cta py-20 sm:py-24 relative overflow-hidden">
      <div class="svc-cta__glow" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center" data-aos="fade-up">
        <h2 class="svc-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">${p.cta}</h2>
        <p class="text-slate-600 text-lg mb-8">${p.ctaSubtext || 'Partner with Guudle IT Solutions for enterprise-grade delivery.'}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#svc-contact" class="svc-btn-primary">Get Free Consultation <i class="fas fa-arrow-right"></i></a>
          <a href="../contact.html" class="svc-btn-ghost">Request Proposal <i class="fas fa-file-lines"></i></a>
        </div>
      </div>
    </section>`;
}

function contactSection(p) {
  return `
    <section id="svc-contact" class="py-20 sm:py-28" style="background:var(--svc-light)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div class="svc-contact-aside" data-aos="fade-up">
            <span class="svc-badge mb-4">Contact</span>
            <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">Start Your Project</h2>
            <p class="text-slate-600 mb-8">Tell us about your goals. We respond within one business day.</p>
            <ul>
              <li><i class="fas fa-envelope"></i> hello@guudle.com</li>
              <li><i class="fas fa-phone"></i> <a href="tel:${SITE_PHONE_TEL}" class="hover:underline">${SITE_PHONE_DISPLAY}</a></li>
              <li><i class="fas fa-clock"></i> Response within 24 hours</li>
            </ul>
          </div>
          <form id="svc-contact-form" class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-5 self-center w-full" data-aos="fade-up" novalidate>
            <div data-slp-field><label for="svc-name" class="block text-sm font-semibold mb-1.5">Full Name <span class="text-red-500">*</span></label><input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name"><span class="slp-form-error" role="alert"></span></div>
            <div data-slp-field><label for="svc-email" class="block text-sm font-semibold mb-1.5">Work Email <span class="text-red-500">*</span></label><input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com"><span class="slp-form-error" role="alert"></span></div>
            <div data-slp-field><label for="svc-message" class="block text-sm font-semibold mb-1.5">Project Details <span class="text-red-500">*</span></label><textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your project goals and timeline..."></textarea><span class="slp-form-error" role="alert"></span></div>
            <button type="submit" class="w-full py-3.5 rounded-xl text-white font-bold text-sm" style="background:linear-gradient(135deg,var(--svc-navy),var(--svc-accent))">Submit Inquiry <i class="fas fa-paper-plane ml-2"></i></button>
          </form>
        </div>
      </div>
    </section>`;
}

function whyChooseSection(p) {
  const titles = p.sectionTitles || {};
  const layout = p.layout?.whyLayout || 'grid-4';
  const items = (p.whyChoose || defaultWhyChoose).map((w) =>
    `<article class="svc-why-card" data-aos="fade-up">
      <div class="svc-why-card__icon"><i class="${faIcon(w.icon)}" aria-hidden="true"></i></div>
      <h3 class="font-bold text-lg mb-2">${w.title}</h3>
      <p class="text-slate-600 text-sm leading-relaxed">${w.desc}</p>
    </article>`
  ).join('');
  const gridClass = layout === 'bento'
    ? 'svc-why-bento'
    : layout === 'grid-3'
      ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6';
  return `
    <section id="svc-whyChoose" class="py-20 sm:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="svc-section-head" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--svc-navy);background:var(--svc-accent-soft)">Why Guudle</span>
          <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">${titles.whyChoose || 'Why Choose This Service'}</h2>
          <p class="text-slate-600 text-lg">Enterprise delivery with the expertise, security, and accountability global teams expect.</p>
        </div>
        <div class="${gridClass}">${items}</div>
      </div>
    </section>`;
}

function testimonialsSection(p) {
  const titles = p.sectionTitles || {};
  const items = (p.testimonials || defaultTestimonials).map((t, i) =>
    `<blockquote class="svc-testimonial${p.enterpriseTier ? ' svc-testimonial--slide' : ''}" data-svc-testimonial-slide="${i}"${p.enterpriseTier && i > 0 ? ' hidden' : ''}>
      <div class="svc-testimonial__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p class="svc-testimonial__quote">"${t.quote}"</p>
      <footer class="svc-testimonial__author"><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></footer>
    </blockquote>`
  ).join('');

  if (p.enterpriseTier) {
    return `
    <section id="svc-testimonials" class="svc-testimonials-enterprise py-20 sm:py-28">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="svc-section-head text-center" data-aos="fade-up">
          <span class="svc-badge svc-badge--section mb-4">Client Success</span>
          <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">${titles.testimonials || 'What Our Clients Say'}</h2>
        </div>
        <div class="svc-testimonial-carousel" data-svc-testimonial-carousel data-aos="fade-up" data-aos-delay="80">
          <div class="svc-testimonial-carousel__track">${items}</div>
          <div class="svc-testimonial-carousel__nav">
            <button type="button" class="svc-testimonial-carousel__btn" data-svc-testimonial-prev aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
            <div class="svc-testimonial-carousel__dots" data-svc-testimonial-dots aria-hidden="true"></div>
            <button type="button" class="svc-testimonial-carousel__btn" data-svc-testimonial-next aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </section>`;
  }

  const layout = p.layout?.testimonialsLayout || 'grid-3';
  const gridClass = layout === 'stack' ? 'max-w-2xl mx-auto space-y-6' : layout === 'grid-2' ? 'grid md:grid-cols-2 gap-8' : 'grid md:grid-cols-3 gap-8';
  const gridItems = (p.testimonials || defaultTestimonials).map((t) =>
    `<blockquote class="svc-testimonial" data-aos="fade-up">
      <div class="svc-testimonial__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p class="svc-testimonial__quote">"${t.quote}"</p>
      <footer class="svc-testimonial__author"><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></footer>
    </blockquote>`
  ).join('');
  return `
    <section id="svc-testimonials" class="py-20 sm:py-28" style="background:var(--svc-light)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="svc-section-head" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--svc-navy);background:var(--svc-accent-soft)">Testimonials</span>
          <h2 class="svc-display text-3xl sm:text-4xl font-extrabold mb-4">${titles.testimonials || 'What Our Clients Say'}</h2>
        </div>
        <div class="${gridClass}">${gridItems}</div>
      </div>
    </section>`;
}

const SECTION_BUILDERS = {
  overview: overviewSection,
  whyChoose: whyChooseSection,
  features: featuresSection,
  industries: industriesSection,
  services: servicesSection,
  process: processSection,
  results: resultsSection,
  benefits: benefitsSection,
  cases: casesSection,
  tech: techSection,
  aiServices: aiServicesHubSection,
  stats: statsSection,
  faq: faqSection,
  testimonials: testimonialsSection,
  cta: ctaSection,
  contact: contactSection,
};

const NAV_ANCHORS = {
  process: 'svc-process-hub',
  aiServices: 'svc-aiServices',
  industries: 'svc-industries',
};

function navAnchor(s, p) {
  return NAV_ANCHORS[s] || `svc-${s}`;
}

function navLabel(s, p) {
  return NAV_LABELS[s] || s;
}

const NAV_LABELS = {
  overview: 'Introduction', whyChoose: 'Why Us', features: 'Features', industries: 'Industries',
  services: 'Services', process: 'Process', results: 'Value',
  benefits: 'Benefits', tech: 'Technology', aiServices: 'AI Services', stats: 'Enterprise Value',
  faq: 'FAQ', testimonials: 'Testimonials', contact: 'Contact',
};

function stickyNav(p) {
  const builders = isCorpoxPage(p) ? getCorpoxSectionBuilders() : SECTION_BUILDERS;
  const links = p.sectionOrder
    .filter((s) => s !== 'cases' && s !== 'gallery' && s !== 'faq')
    .filter((s) => s !== 'tech')
    .filter((s) => builders[s] && s !== 'cta')
    .map((s) => {
      const anchor = navAnchor(s, p);
      return `<a href="#${anchor}" class="slp-sticky-nav__link" data-svc-nav-link>${navLabel(s, p)}</a>`;
    })
    .join('');
  return `
    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">${links}</div>
    </nav>`;
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

function buildPage(slug, p) {
  const builders = p.layout?.pageRedesign === 'corpox' ? getCorpoxSectionBuilders() : SECTION_BUILDERS;
  const skipSections = new Set(['cases', 'gallery']);
  if (!p.includeFaq) skipSections.add('faq');
  const sections = p.sectionOrder
    .filter((s) => !skipSections.has(s))
    .map((s) => builders[s]?.(p) || '')
    .join('\n');
  const ogImage = p.heroOgUrl || getSliderOgUrl(slug);
  const prefix = '../../assets/';

  const isCorpox = isCorpoxPage(p);
  const industriesCss = `\n  <link rel="stylesheet" href="${prefix}css/industries-we-serve.css">`;
  const corpoxCss = isCorpox ? `\n  <link rel="stylesheet" href="${prefix}css/svc-corpox.css">${industriesCss}` : industriesCss;
  const aiHubCss = slug === 'ai' ? `\n  <link rel="stylesheet" href="${prefix}css/ai-hub.css">` : '';
  const corpoxBodyClass = isCorpox ? ' svc-corpox-page' : '';

  const isSaasLightHero = p.layout?.hero === 'saas-light';
  const saasLightCss = isSaasLightHero ? `\n  <link rel="stylesheet" href="${prefix}css/home.css">` : '';
  const saasLightBodyClass = isSaasLightHero ? ' home-premium' : '';

  const enterpriseClass = p.enterpriseTier && !isCorpox ? ' service-page--enterprise-v3' : '';
  const enterpriseCss = p.enterpriseTier && !isCorpox ? `\n  <link rel="stylesheet" href="${prefix}css/svc-enterprise-v3.css">` : '';
  const enterpriseJs = p.enterpriseTier && !isCorpox ? `\n  <script src="${prefix}js/svc-enterprise-v3.js"></script>` : '';
  const mobilePremiumJs = p.capabilitiesVariant === 'mobile-premium'
    ? `\n  <script src="${prefix}js/parallax-unified.js"></script>`
    : '';
  const partnershipsJs = (p.ecosystemSection || p.capabilitiesVariant === 'mobile-premium')
    ? `\n  <script src="${prefix}js/partnerships.js"></script>`
    : '';
  const mobileCapCss = p.capabilitiesVariant === 'mobile-premium'
    ? `\n  <link rel="stylesheet" href="${prefix}css/custom-mobile-app.css">`
    : '';
  const accordionCapCss = (p.capabilitiesVariant === 'accordion' || p.capabilitiesVariant === 'grid-2col')
    ? `\n  <link rel="stylesheet" href="${prefix}css/capabilities-accordion.css">`
    : '';
  const saasPlatformsCss = p.industriesVariant === 'saas-platforms'
    ? `\n  <link rel="stylesheet" href="${prefix}css/saas-platforms-section.css">`
    : '';
  const crmWhyCss = (p.slug === 'crm' || p.whyChooseVariant === 'crm-hub')
    ? `\n  <link rel="stylesheet" href="${prefix}css/crm-why-section.css">`
    : '';
  const erpWhyCss = (p.slug === 'erp' || p.whyChooseVariant === 'erp-hub')
    ? `\n  <link rel="stylesheet" href="${prefix}css/erp-why-section.css">`
    : '';
  const partnershipsCss = (p.ecosystemSection || p.capabilitiesVariant === 'mobile-premium')
    ? `\n  <link rel="stylesheet" href="${prefix}css/partnerships.css">`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="${p.metaDescription}">
  <meta name="keywords" content="${p.keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:title" content="${p.title} | Guudle IT Solutions">
  <meta property="og:description" content="${p.metaDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${p.title} | Guudle IT Solutions">
  <meta name="twitter:description" content="${p.metaDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <title>${p.title} | Guudle IT Solutions</title>
  <script type="application/ld+json">${schemaJson(slug, p)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="${prefix}js/tailwind-config.js"></script>
  <link rel="stylesheet" href="${prefix}css/styles.css">
  <link rel="stylesheet" href="${prefix}css/service-landing-shared.css">
  <link rel="stylesheet" href="${prefix}css/svc-landing.css">
  <link rel="stylesheet" href="${prefix}css/svc-capabilities.css">
  <link rel="stylesheet" href="${prefix}css/dev-process.css">
  <link rel="stylesheet" href="${prefix}css/process-hub-cta.css">
  <link rel="stylesheet" href="${prefix}css/site-unified.css">
  <link rel="stylesheet" href="${prefix}css/benefits-section.css">${saasLightCss}${corpoxCss}${aiHubCss}${enterpriseCss}${mobileCapCss}${accordionCapCss}${saasPlatformsCss}${crmWhyCss}${erpWhyCss}${partnershipsCss}
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden${saasLightBodyClass}${corpoxBodyClass}${enterpriseClass}" data-slp-prefix="svc" data-svc-theme="${p.theme}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">
    ${heroSection(p)}${p.enterpriseTier && !isCorpox ? enterpriseHighlightCards(p) : ''}
    ${stickyNav(p)}
    ${sections}
    ${relatedSection(p)}
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
${navScriptBlock(prefix)}
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="${prefix}js/service-landing-core.js"></script>
  <script src="${prefix}js/dev-process.js"></script>
  <script src="${prefix}js/svc-landing.js"></script>${enterpriseJs}${mobilePremiumJs}${partnershipsJs}
</body>
</html>`;
}

export { buildPage };

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  const targets = ONLY || Object.keys(ALL_PAGES);
  let count = 0;
  for (const slug of targets) {
    const config = ALL_PAGES[slug];
    if (!config) {
      console.warn('Skip (no config):', slug);
      continue;
    }
    const p = buildServicePage({ slug, ...config });
    const file = path.join(outDir, `${slug}.html`);
    const html = buildPage(slug, p);
    fs.writeFileSync(file, html, 'utf8');
    console.log('Generated:', path.relative(root, file));
    count++;
  }
  console.log(`\nDone — ${count} service page(s).`);
}
