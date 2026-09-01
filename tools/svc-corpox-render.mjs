/**
 * Corpox-inspired corporate section renderer (light cards, split about, purple/navy accents)
 */
import { renderCapabilitiesSection } from './svc-capabilities-render.mjs';
import { renderCapabilitiesAccordionSection, renderCapabilitiesGridSection } from './capabilities-accordion-render.mjs';
import { renderMobileCapabilitiesSection, renderMobileWhyChooseSection } from './mobile-capabilities-render.mjs';
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { renderSaasPlatformsSection } from './saas-platforms-render.mjs';
import { renderCrmWhySection } from './crm-why-render.mjs';
import { renderErpWhySection } from './erp-why-render.mjs';
import { renderAiServicesHub } from './ai-hub-render.mjs';
import { renderBenefitsSection } from './benefits-section-render.mjs';
import { renderMarketingEcosystemSection } from './marketing-ecosystem-render.mjs';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from './site-contact.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function cpoxLabel(text) {
  return `<div class="cpox-label" data-aos="fade-up"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">${esc(text)}</span></div>`;
}

function cpoxHead(label, titleHtml, lead, centered = false) {
  const align = centered ? ' cpox-head--center' : '';
  return `<header class="cpox-head${align}" data-aos="fade-up">
    ${cpoxLabel(label)}
    <h2 class="cpox-title font-display">${titleHtml}</h2>
    ${lead ? `<p class="cpox-lead">${esc(lead)}</p>` : ''}
  </header>`;
}

function cpoxHeadDark(label, titleHtml, lead, centered = true) {
  const align = centered ? ' cpox-head--center' : '';
  return `<header class="cpox-head cpox-head--dark${align}" data-aos="fade-up">
    <div class="cpox-label cpox-label--light" data-aos="fade-up"><span class="cpox-label__line cpox-label__line--light" aria-hidden="true"></span><span class="cpox-label__text">${esc(label)}</span></div>
    <h2 class="cpox-title cpox-title--light font-display">${titleHtml}</h2>
    ${lead ? `<p class="cpox-lead cpox-lead--light">${esc(lead)}</p>` : ''}
  </header>`;
}

function titleWithAccent(title, accent) {
  if (!accent || !title.includes(accent)) return esc(title);
  const idx = title.indexOf(accent);
  return `${esc(title.slice(0, idx))}<span class="cpox-accent">${esc(accent)}</span>${esc(title.slice(idx + accent.length))}`;
}

const DISCOVER_LINKS = ['#svc-features', '#svc-whyChoose', '#svc-benefits', '#svc-process-hub', '#svc-contact'];

function corpoxOverview(p) {
  const ov = p.overview || {};
  const accent = ov.titleAccent || 'Enterprise';
  const titleHtml = ov.titleHtml || titleWithAccent(ov.title || 'Overview', accent);
  const mini = (ov.highlights || []).slice(0, 4).map((h, i) => {
    const icons = ov.highlightIcons || ['fa-key', 'fa-wifi', 'fa-mobile-screen', 'fa-shield-halved'];
    return `<article class="cpox-mini">
      <span class="cpox-mini__icon"><i class="${faIcon(icons[i % icons.length])}" aria-hidden="true"></i></span>
      <div><strong>${esc(h)}</strong></div>
    </article>`;
  }).join('');

  const subtitleBlock = ov.subtitle
    ? `<p class="cpox-overview-subtitle">${esc(ov.subtitle)}</p>`
    : '';
  const textBlocks = String(ov.text || '').includes('\n\n')
    ? String(ov.text).split('\n\n').map((para) => `<p class="cpox-lead">${esc(para.trim())}</p>`).join('')
    : `<p class="cpox-lead">${esc(ov.text)}</p>`;

  return `
    <section id="svc-overview" class="cpox-section cpox-section--white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-split">
          <div class="cpox-split__media" data-aos="fade-right">
            <img src="${p.overviewImage}" alt="${esc(ov.title)} — ${esc(p.title)} by Guudle IT Solutions" loading="lazy" width="800" height="600" class="cpox-split__img">
            <span class="cpox-play" aria-hidden="true"><i class="fas fa-play"></i></span>
          </div>
          <div class="cpox-split__copy" data-aos="fade-left">
            ${cpoxLabel('Overview')}
            <h2 class="cpox-title font-display">${titleHtml}</h2>
            ${subtitleBlock}
            ${textBlocks}
            ${mini ? `<div class="cpox-mini-grid">${mini}</div>` : ''}
          </div>
        </div>
      </div>
    </section>`;
}

function corpoxWhyChoose(p) {
  if (p.whyChooseVariant === 'erp-hub' || p.slug === 'erp') {
    return renderErpWhySection({ sectionId: 'svc-whyChoose', contactLink: '#svc-contact', strategyLink: '#svc-contact' });
  }

  if (p.whyChooseVariant === 'crm-hub' || p.slug === 'crm') {
    return renderCrmWhySection({ sectionId: 'svc-whyChoose', contactLink: '#svc-contact' });
  }

  if (p.capabilitiesVariant === 'mobile-premium') {
    return renderMobileWhyChooseSection(p, { sectionId: 'svc-whyChoose', aos: true });
  }

  if (p.whyChooseVariant === 'promo-glow') {
    const titles = p.sectionTitles || {};
    const badge = titles.whyChooseBadge || 'Enterprise Mobile';
    const titleHtml = titles.whyChooseHtml || esc(titles.whyChoose || 'Build Powerful Mobile Applications');
    const lead = p.whyChooseIntro || titles.whyChooseLead || '';
    const ctaHref = p.whyChooseCtaHref || '#svc-contact';
    const ctaLabel = p.whyChooseCtaLabel;
    const isLight = p.whyChooseTheme === 'light-grey';
    const sectionClass = isLight
      ? 'cpox-why-glow-section cpox-why-glow-section--light'
      : 'cpox-benefits-glow cpox-why-glow-section';
    const leadClass = isLight ? 'cpox-lead cpox-why-glow__lead' : 'cpox-lead cpox-lead--light cpox-why-glow__lead';
    const headClass = isLight ? 'cpox-head cpox-head--center cpox-why-glow__head' : 'cpox-head cpox-head--center cpox-head--dark cpox-why-glow__head';
    const labelHtml = isLight
      ? cpoxLabel(badge)
      : `<div class="cpox-label cpox-label--light" data-aos="fade-up"><span class="cpox-label__line cpox-label__line--light" aria-hidden="true"></span><span class="cpox-label__text">${esc(badge)}</span></div>`;
    const titleClass = isLight ? 'cpox-title font-display' : 'cpox-title cpox-title--light font-display';
    const cardClass = isLight ? 'cpox-benefit-glow cpox-benefit-glow--light' : 'cpox-benefit-glow';
    const leadBlocks = String(lead).includes('\n\n')
      ? String(lead).split('\n\n').map((para) => `<p class="${leadClass}">${esc(para.trim())}</p>`).join('')
      : (lead ? `<p class="${leadClass}">${esc(lead)}</p>` : '');
    const items = (p.whyChoose || defaultWhyChoose).slice(0, 4);
    const cards = items.map((w, i) =>
      `<article class="${cardClass}" data-aos="fade-up" data-aos-delay="${80 + i * 70}">
        <div class="cpox-benefit-glow__glow" aria-hidden="true"></div>
        <span class="cpox-benefit-glow__icon"><i class="${faIcon(w.icon)}" aria-hidden="true"></i></span>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.desc)}</p>
      </article>`
    ).join('');

    const ambient = isLight
      ? `<div class="cpox-why-glow-section__ambient" aria-hidden="true">
        <div class="cpox-why-glow-section__grid"></div>
        <span class="cpox-why-glow-section__orb cpox-why-glow-section__orb--1"></span>
        <span class="cpox-why-glow-section__orb cpox-why-glow-section__orb--2"></span>
      </div>`
      : `<div class="cpox-benefits-glow__ambient" aria-hidden="true">
        <div class="cpox-benefits-glow__grid"></div>
        <div class="cpox-benefits-glow__orb cpox-benefits-glow__orb--1"></div>
        <div class="cpox-benefits-glow__orb cpox-benefits-glow__orb--2"></div>
      </div>`;

    return `
    <section id="svc-whyChoose" class="${sectionClass}" aria-labelledby="svc-whyChoose-heading">
      ${ambient}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28">
        <header class="${headClass}" data-aos="fade-up">
          ${labelHtml}
          <h2 id="svc-whyChoose-heading" class="${titleClass}">${titleHtml}</h2>
          ${leadBlocks}
        </header>
        <div class="cpox-benefit-glow-grid cpox-why-glow__grid">${cards}</div>
        ${ctaLabel ? `<div class="cpox-why-glow__cta-wrap" data-aos="fade-up" data-aos-delay="200"><a href="${esc(ctaHref)}" class="cpox-cta__btn cpox-cta__btn--primary">${esc(ctaLabel)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div>` : ''}
      </div>
    </section>`;
  }

  if (p.whyChooseVariant === 'promo') {
    const titles = p.sectionTitles || {};
    const badge = titles.whyChooseBadge || 'Get Started';
    const titleHtml = titles.whyChooseHtml || esc(titles.whyChoose || 'Ready to Get Started?');
    const lead = p.whyChooseIntro || titles.whyChooseLead || '';
    const ctaHref = p.whyChooseCtaHref || '#svc-contact';
    const ctaLabel = p.whyChooseCtaLabel;
    const leadBlocks = String(lead).includes('\n\n')
      ? String(lead).split('\n\n').map((para) => `<p class="cpox-lead cpox-why-promo__lead">${esc(para.trim())}</p>`).join('')
      : (lead ? `<p class="cpox-lead cpox-why-promo__lead">${esc(lead)}</p>` : '');

    return `
    <section id="svc-whyChoose" class="cpox-section cpox-section--gray cpox-why-promo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="cpox-head cpox-head--center cpox-why-promo__head" data-aos="fade-up">
          ${cpoxLabel(badge)}
          <h2 class="cpox-title font-display">${titleHtml}</h2>
          ${leadBlocks}
          ${ctaLabel ? `<a href="${esc(ctaHref)}" class="cpox-cta__btn cpox-cta__btn--primary cpox-why-promo__cta">${esc(ctaLabel)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : ''}
        </header>
      </div>
    </section>`;
  }

  const items = (p.whyChoose || defaultWhyChoose).slice(0, 4);
  const cards = items.map((w, i) =>
    `<article class="cpox-card" data-aos="fade-up" data-aos-delay="${i * 70}">
      <div class="cpox-card__icon cpox-card__icon--${i + 1}"><i class="${faIcon(w.icon)}" aria-hidden="true"></i></div>
      <h3 class="cpox-card__title">${esc(w.title)}</h3>
      <p class="cpox-card__desc">${esc(w.desc)}</p>
      <a href="${DISCOVER_LINKS[i % DISCOVER_LINKS.length]}" class="cpox-discover">Discover services <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </article>`
  ).join('');

  return `
    <section id="svc-whyChoose" class="cpox-section cpox-section--gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${cpoxHead('Why Guudle', 'Why Choose <span class="cpox-accent">Guudle</span>', 'Enterprise delivery with the expertise, security, and accountability global teams expect.', true)}
        <div class="cpox-card-row">${cards}</div>
      </div>
    </section>`;
}

function renderAiProductParallaxBanner() {
  const parallaxBg = 'https://images.unsplash.com/photo-1555066931-4369d7bab899?w=1920&q=85&auto=format&fit=crop';
  return `
    <section class="svc-hero-parallax svc-hero-parallax--clarity svc-hero svc-hero--reverse slp-parallax guudle-parallax-section" id="svc-ai-product-banner" data-svc-parallax-section data-svc-parallax-speed="0.35" aria-labelledby="svc-ai-product-heading">
      <div class="slp-parallax__bg svc-parallax__bg guudle-parallax-layer" style="background-image:url('${parallaxBg}')" role="img" aria-label="SaaS product engineering — developer coding banner"></div>
      <div class="slp-parallax__overlay svc-hero-parallax__overlay" aria-hidden="true"></div>
      <div class="slp-parallax__content svc-hero-parallax__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pb-32">
        <div class="svc-hero-parallax__copy mx-auto text-center max-w-4xl">
          <nav class="text-sm text-white/80 mb-8" aria-label="Breadcrumb" data-aos="fade-up">
            <a href="../../index.html" class="hover:text-white">Home</a><span class="mx-2">/</span>
            <span>Services</span><span class="mx-2">/</span>
            <span style="color:var(--svc-accent)" class="font-medium">AI Product Engineering</span>
          </nav>
          <span class="svc-badge svc-badge--hero mb-6 inline-flex" data-aos="fade-up"><i class="fas fa-star" aria-hidden="true"></i> AI-Native Products</span>
          <h2 id="svc-ai-product-heading" class="svc-display svc-hero-parallax__title text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4" data-aos="fade-up" data-aos-delay="50">
            AI-Native <span class="svc-hero-parallax__title-accent">SaaS Products</span>
          </h2>
          <p class="svc-hero-parallax__desc text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Build and launch AI-native SaaS products — from MVP to scale — with subscription billing, multi-tenancy, and intelligent core features.</p>
          <div class="svc-hero__actions flex flex-wrap justify-center gap-4 mb-10" data-aos="fade-up" data-aos-delay="150">
            <a href="../contact.html" class="svc-btn-primary">Get Started <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="#svc-contact" class="svc-btn-ghost svc-btn-ghost--hero">Book Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          </div>
          <div class="slp-value-pills justify-center" data-aos="fade-up" data-aos-delay="200">
            <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
            <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
            <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
            <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
          </div>
        </div>
      </div>
      <div class="slp-scroll-hint svc-hero-parallax__scroll" aria-hidden="true"><span>Explore</span><i class="fas fa-chevron-down"></i></div>
    </section>`;
}

function corpoxFeatures(p) {
  let html;
  if (p.capabilitiesVariant === 'mobile-premium') {
    html = renderMobileCapabilitiesSection(p, { sectionId: 'svc-features', aos: true });
  } else if (p.capabilitiesVariant === 'accordion') {
    html = renderCapabilitiesAccordionSection(p, { sectionId: 'svc-features', aos: true });
  } else if (p.capabilitiesVariant === 'grid-2col') {
    html = renderCapabilitiesGridSection(p, { sectionId: 'svc-features', aos: true });
  } else {
    html = renderCapabilitiesSection(p, { sectionId: 'svc-features', aos: true, variant: 'light', cols: 3 });
  }
  if (p.afterFeaturesParallax === 'ai-product') {
    html += renderAiProductParallaxBanner();
  }
  if (p.ecosystemSection) {
    html += renderMarketingEcosystemSection(p);
  }
  return html;
}

function corpoxIndustries(p) {
  if (p.industriesVariant === 'saas-platforms') {
    return renderSaasPlatformsSection({
      sectionId: 'svc-industries',
      contactLink: '#svc-contact',
    });
  }
  return renderIndustriesParallaxSection({
    industries: p.industries || [],
    slug: p.slug,
    sectionId: 'svc-industries',
    contactLink: '#svc-contact',
    lead: p.industriesLead,
    footerText: p.industriesFooterText,
  });
}

function corpoxServices(p) {
  const titles = p.sectionTitles || {};
  const cards = (p.services || []).map((s, i) =>
    `<article class="cpox-card cpox-card--compact" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 300)}">
      <div class="cpox-card__icon cpox-card__icon--${(i % 4) + 1}"><i class="${faIcon(s.icon)}" aria-hidden="true"></i></div>
      <h3 class="cpox-card__title">${esc(s.title)}</h3>
      <p class="cpox-card__desc">${esc(s.desc)}</p>
      <a href="#svc-contact" class="cpox-discover">Discover services <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </article>`
  ).join('');

  return `
    <section id="svc-services" class="cpox-section cpox-section--gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${cpoxHead('Services', esc(titles.services || p.title), titles.servicesSub || 'End-to-end capabilities tailored to your goals.', true)}
        <div class="cpox-card-row cpox-card-row--3">${cards}</div>
      </div>
    </section>`;
}

function corpoxBenefits(p) {
  return renderBenefitsSection({ ...p, slug: p.slug }, { sectionId: 'svc-benefits', aos: true });
}

function corpoxProcess(p) {
  const hub = p.processHub || {};
  return renderProcessHubCta({
    linkPrefix: '../',
    title: hub.title,
    desc: hub.desc,
    badge: hub.badge,
    btn: hub.btn,
  });
}

function corpoxCases() {
  return '';
}

function corpoxTech() {
  return '';
}

function corpoxFaq(p) {
  return `
    <div class="cpox-section cpox-section--gray cpox-faq-wrap">
      ${renderEnterpriseFaqSection({
        id: 'svc-faq',
        faqs: p.faqs || [],
        contactHref: '#svc-contact',
        contactPageHref: '../contact.html',
        aos: true,
      })}
    </div>`;
}

function corpoxTestimonials(p) {
  const titles = p.sectionTitles || {};
  const items = (p.testimonials || defaultTestimonials).map((t, i) =>
    `<blockquote class="cpox-testimonial" data-aos="fade-up" data-aos-delay="${i * 70}">
      <div class="cpox-testimonial__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p>"${esc(t.quote)}"</p>
      <footer><strong>${esc(t.name)}</strong><span>${esc(t.role)}, ${esc(t.company)}</span></footer>
    </blockquote>`
  ).join('');

  return `
    <section id="svc-testimonials" class="cpox-section cpox-section--white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${cpoxHead('Testimonials', esc(titles.testimonials || 'Client Testimonials'), 'What enterprise leaders say about partnering with Guudle.', true)}
        <div class="cpox-testimonial-grid">${items}</div>
      </div>
    </section>`;
}

function corpoxCta(p) {
  return `
    <section class="cpox-cta" aria-labelledby="svc-cta-heading">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center" data-aos="fade-up">
        <h2 id="svc-cta-heading" class="cpox-cta__title font-display">${esc(p.cta)}</h2>
        <p class="cpox-cta__lead">${esc(p.ctaSubtext || 'Partner with Guudle IT Solutions for enterprise-grade delivery.')}</p>
        <div class="cpox-cta__actions">
          <a href="#svc-contact" class="cpox-cta__btn cpox-cta__btn--primary">Get Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="../contact.html" class="cpox-cta__btn cpox-cta__btn--outline">Request Proposal</a>
        </div>
      </div>
    </section>`;
}

function corpoxContact(p) {
  return `
    <section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-contact-grid">
          <div class="cpox-contact-aside" data-aos="fade-up">
            ${cpoxLabel('Contact')}
            <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">Project</span></h2>
            <p class="cpox-lead">Tell us about your goals. We respond within one business day.</p>
            <ul class="cpox-contact-list">
              <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
              <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:${SITE_PHONE_TEL}">${SITE_PHONE_DISPLAY}</a></li>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
            </ul>
            <div class="cpox-contact-badges">
              <span><i class="fas fa-shield-halved"></i> Enterprise SLA</span>
              <span><i class="fas fa-globe"></i> Global Delivery</span>
              <span><i class="fas fa-certificate"></i> ISO-aligned</span>
            </div>
          </div>
          <form id="svc-contact-form" class="cpox-contact-form" data-aos="fade-up" data-aos-delay="80" novalidate>
            <div data-slp-field>
              <label for="svc-name">Full Name <span class="text-red-500">*</span></label>
              <input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name">
              <span class="slp-form-error" role="alert"></span>
            </div>
            <div data-slp-field>
              <label for="svc-email">Work Email <span class="text-red-500">*</span></label>
              <input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com">
              <span class="slp-form-error" role="alert"></span>
            </div>
            <div data-slp-field>
              <label for="svc-message">Project Details <span class="text-red-500">*</span></label>
              <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your project goals and timeline..."></textarea>
              <span class="slp-form-error" role="alert"></span>
            </div>
            <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
    </section>`;
}

export function getCorpoxSectionBuilders() {
  return {
    overview: corpoxOverview,
    whyChoose: corpoxWhyChoose,
    features: corpoxFeatures,
    industries: corpoxIndustries,
    services: corpoxServices,
    process: corpoxProcess,
    benefits: corpoxBenefits,
    cases: corpoxCases,
    tech: corpoxTech,
    aiServices: () => renderAiServicesHub({ linkPrefix: '', techLinkPrefix: '../' }),
    faq: corpoxFaq,
    testimonials: corpoxTestimonials,
    cta: corpoxCta,
    contact: corpoxContact,
    stats: () => '',
    results: () => '',
  };
}
