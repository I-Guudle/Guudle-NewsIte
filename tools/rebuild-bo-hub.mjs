/**
 * Rebuild Business Outcomes hub as parallax landing
 * — keeps existing light split hero
 * — 13 solution cards linking to brand-new pages
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'pages', 'services', 'business-outcomes-digital-platforms.html');

const solutions = [
  { href: 'ai-powered-automation.html', icon: 'fa-robot', name: 'AI-Powered Automation', desc: 'Intelligent workflows that reduce manual work', related: 'ai-automation.html' },
  { href: 'enterprise-digital-transformation.html', icon: 'fa-building', name: 'Enterprise Digital Transformation', desc: 'Modernize legacy systems at scale', related: 'digital-transformation.html' },
  { href: 'saas-platforms.html', icon: 'fa-cloud', name: 'SaaS Platforms', desc: 'Subscription products with multi-tenant architecture', related: 'saas-development.html' },
  { href: 'marketplace-solutions.html', icon: 'fa-store', name: 'Marketplace Solutions', desc: 'Multi-vendor commerce & booking platforms', related: 'ecommerce.html' },
  { href: 'crm-systems.html', icon: 'fa-users', name: 'CRM Systems', desc: 'Sales pipelines & customer 360 views', related: 'crm.html' },
  { href: 'erp-platforms.html', icon: 'fa-sitemap', name: 'ERP Platforms', desc: 'Unified operations & resource planning', related: 'erp.html' },
  { href: 'on-demand-apps.html', icon: 'fa-bolt', name: 'On-Demand Apps', desc: 'Real-time matching & fulfillment', related: 'mobile-app.html' },
  { href: 'delivery-platforms.html', icon: 'fa-truck', name: 'Delivery Platforms', desc: 'Last-mile logistics & tracking', related: 'mobile-app.html' },
  { href: 'fintech-platforms.html', icon: 'fa-building-columns', name: 'FinTech Platforms', desc: 'Secure payments & financial products', related: 'ecommerce.html' },
  { href: 'healthcare-platforms.html', icon: 'fa-heart-pulse', name: 'Healthcare Platforms', desc: 'Patient portals & clinical workflows', related: 'mobile-app.html' },
  { href: 'ecommerce-systems.html', icon: 'fa-cart-shopping', name: 'eCommerce Systems', desc: 'Shopify, Magento, WooCommerce & custom', related: 'ecommerce.html' },
  { href: 'ai-chatbots.html', icon: 'fa-comments', name: 'AI Chatbots', desc: 'Support automation & conversational UX', related: 'conversational-ai.html' },
  { href: 'analytics-dashboards.html', icon: 'fa-chart-line', name: 'Analytics Dashboards', desc: 'BI, KPIs & real-time reporting', related: 'analytics.html' },
];

const cards = solutions
  .map(
    (s, i) => `          <a href="${s.href}" class="boh-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 70}">
            <span class="boh-card__num">${String(i + 1).padStart(2, '0')}</span>
            <span class="boh-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
            <h3 class="boh-card__title">${s.name}</h3>
            <p class="boh-card__desc">${s.desc}</p>
            <span class="boh-card__cta">Open solution page <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
          </a>`
  )
  .join('\n');

const relatedChips = solutions
  .map((s) => `<a href="${s.related}" class="boh-chip"><i class="fas fa-link" aria-hidden="true"></i> ${s.name.split(' ')[0]} service</a>`)
  .filter((_, i, arr) => i < 8)
  .join('\n          ');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="Business Outcomes & Digital Platforms by Guudle — 13 enterprise solution pages for AI automation, SaaS, CRM, ERP, FinTech, healthcare, eCommerce, and more.">
  <meta name="keywords" content="Business Outcomes, Digital Platforms, AI Automation, SaaS Platforms, CRM, ERP, FinTech, eCommerce Systems, Guudle IT Solutions">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/business-outcomes-digital-platforms.html">
  <meta property="og:title" content="Business Outcomes & Digital Platforms | Guudle IT Solutions">
  <meta property="og:description" content="Explore 13 enterprise outcome platforms — from AI automation to analytics dashboards — each with a dedicated landing page.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/business-outcomes-digital-platforms.html">
  <meta property="og:image" content="https://guudle.com/sliders/42.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Business Outcomes & Digital Platforms | Guudle IT Solutions">
  <meta name="twitter:description" content="Explore 13 enterprise outcome platforms with dedicated parallax landing pages.">
  <meta name="twitter:image" content="https://guudle.com/sliders/42.jpg">
  <title>Business Outcomes & Digital Platforms | Guudle IT Solutions</title>
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","name":"Business Outcomes & Digital Platforms","description":"Enterprise solution platforms engineered for measurable revenue, efficiency, and growth.","url":"https://guudle.com/pages/services/business-outcomes-digital-platforms.html","provider":{"@type":"Organization","name":"Guudle IT Solutions","url":"https://guudle.com"}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://guudle.com/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://guudle.com/pages/services/"},{"@type":"ListItem","position":3,"name":"Business Outcomes & Digital Platforms","item":"https://guudle.com/pages/services/business-outcomes-digital-platforms.html"}]},{"@type":"ItemList","name":"Business Outcome Solutions","numberOfItems":13,"itemListElement":[${solutions
    .map(
      (s, i) =>
        `{"@type":"ListItem","position":${i + 1},"name":"${s.name}","url":"https://guudle.com/pages/services/${s.href}"}`
    )
    .join(',')}]}]}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../../assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-landing-shared.css">
  <link rel="stylesheet" href="../../assets/css/svc-landing.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">
  <link rel="stylesheet" href="../../assets/css/home.css">
  <link rel="stylesheet" href="../../assets/css/svc-corpox.css">
  <link rel="stylesheet" href="../../assets/css/business-outcomes-landing.css">
  <link rel="stylesheet" href="../../assets/css/business-outcomes-hub.css">
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page boh-page" data-slp-prefix="svc" data-svc-theme="ent-outcomes">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">

    <!-- KEEP EXISTING HERO -->
    <section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="svc-hero-heading" data-svc-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">
          <div class="relative hero-enter hero-enter-d1 order-2 lg:order-1" data-hero-parallax="0.05" data-aos="fade-right" data-aos-duration="900">
            <div class="hero-visual-panel">
              <div class="hero-visual-panel__glow" aria-hidden="true"></div>
              <div class="hero-visual-panel__ring" aria-hidden="true"></div>
              <div class="hero-visual-panel__frame">
                <img src="../../sliders/42.jpg" alt="Business Outcomes & Digital Platforms — enterprise solutions by Guudle IT Solutions" width="640" height="800" loading="eager" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-shield-halved"></i> SSO &amp; MDM</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-wifi"></i> Offline-first</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-[#002080] font-semibold">Business Outcomes & Digital Platforms</span>
            </nav>

            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>Digital Platforms</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>

            <h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">Digital Platforms <span class="block mt-2 hero-title-navy__line">Outcomes Over Output</span></h1>

            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">Platform strategies and engineering aligned to measurable business outcomes and KPIs. Explore 13 dedicated solution pages below.</p>

            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9 " data-aos="fade-up" data-aos-delay="150">
              <a href="#boh-solutions" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Explore Solutions <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <i class="fas fa-calendar-check text-cyan-600"></i> Book a Strategy Session
              </a>
            </div>

            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200"><article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-layer-group" aria-hidden="true"></i></span>
                <div>
                  <strong>Scalable Architecture</strong>
                  <p>Cloud-native systems built to grow with your business and user base.</p>
                </div>
              </article><article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                <div>
                  <strong>Security Focused</strong>
                  <p>Zero-trust design with encryption, audit trails, and policy controls.</p>
                </div>
              </article><article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-code" aria-hidden="true"></i></span>
                <div>
                  <strong>Modern Technology</strong>
                  <p>Current stacks and best practices matched to your requirements.</p>
                </div>
              </article><article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-headset" aria-hidden="true"></i></span>
                <div>
                  <strong>Dedicated Support</strong>
                  <p>Named account team with SLA-backed response and proactive monitoring.</p>
                </div>
              </article></div>
          </div></div>
      </div>

      <div class="hero-divider" aria-hidden="true">
        <span class="hero-divider__line"></span>
        <span class="hero-divider__gem"></span>
        <span class="hero-divider__line"></span>
      </div>
    </section>

    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#boh-intro" class="slp-sticky-nav__link" data-svc-nav-link>Overview</a>
        <a href="#boh-solutions" class="slp-sticky-nav__link" data-svc-nav-link>13 Solutions</a>
        <a href="#boh-related" class="slp-sticky-nav__link" data-svc-nav-link>Related Services</a>
        <a href="#boh-value" class="slp-sticky-nav__link" data-svc-nav-link>Value</a>
        <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
      </div>
    </nav>

    <section id="boh-intro" class="boh-parallax" data-svc-parallax-section data-svc-parallax-speed="0.28" aria-labelledby="boh-intro-heading">
      <div class="boh-parallax__bg" style="background-image:url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop')" data-parallax-layer aria-hidden="true"></div>
      <div class="boh-parallax__veil" aria-hidden="true"></div>
      <div class="boh-parallax__content">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <header class="max-w-3xl" data-aos="fade-up">
            <span class="boh-eyebrow"><i class="fas fa-compass" aria-hidden="true"></i> Business Outcomes Landing</span>
            <h2 id="boh-intro-heading" class="boh-title font-display">Thirteen platforms. One outcomes-led <span>portfolio.</span></h2>
            <p class="boh-lead">Each card opens a brand-new dedicated landing page — designed for measurable ROI, operational excellence, and enterprise delivery. Existing Guudle service pages remain linked for technical depth.</p>
          </header>
        </div>
      </div>
    </section>

    <section id="boh-solutions" class="boh-section" aria-labelledby="boh-solutions-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <span class="boh-eyebrow"><i class="fas fa-grid-2" aria-hidden="true"></i> Solution Pages</span>
          <h2 id="boh-solutions-heading" class="boh-title font-display">Choose a platform to <span>explore</span></h2>
          <p class="boh-lead mx-auto">Click any solution to open its full parallax landing page. Titles and descriptions match the Solutions menu exactly.</p>
        </header>
        <div class="boh-grid">
${cards}
        </div>
      </div>
    </section>

    <section id="boh-related" class="boh-parallax boh-parallax--alt" data-svc-parallax-section data-svc-parallax-speed="0.22" aria-labelledby="boh-related-heading">
      <div class="boh-parallax__bg" style="background-image:url('../../sliders/41.jpg')" aria-hidden="true"></div>
      <div class="boh-parallax__veil boh-parallax__veil--strong" aria-hidden="true"></div>
      <div class="boh-parallax__content">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <header class="max-w-2xl mb-8" data-aos="fade-up">
            <span class="boh-eyebrow"><i class="fas fa-link" aria-hidden="true"></i> Connected Services</span>
            <h2 id="boh-related-heading" class="boh-title font-display">Links to existing <span>service pages</span></h2>
            <p class="boh-lead">Every outcome page also links to related Guudle service pages for implementation depth.</p>
          </header>
          <div class="boh-related-list" data-aos="fade-up">
            ${solutions
              .map(
                (s) =>
                  `<div class="boh-related-row"><a href="${s.href}" class="boh-related-row__main"><i class="fas ${s.icon}" aria-hidden="true"></i> ${s.name}</a><a href="${s.related}" class="boh-related-row__svc">Related service →</a></div>`
              )
              .join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <section id="boh-value" class="boh-section boh-section--canvas" aria-labelledby="boh-value-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
          <span class="boh-eyebrow">Why this portfolio</span>
          <h2 id="boh-value-heading" class="boh-title font-display">Built for <span>measurable business value</span></h2>
        </header>
        <div class="boh-value-grid">
          <article class="boh-value" data-aos="fade-up"><i class="fas fa-gauge-high" aria-hidden="true"></i><h3>Productivity</h3><p>Automate work and shorten cycle times across operations.</p></article>
          <article class="boh-value" data-aos="fade-up" data-aos-delay="60"><i class="fas fa-chart-line" aria-hidden="true"></i><h3>Growth &amp; ROI</h3><p>Platforms designed around revenue, conversion, and cost KPIs.</p></article>
          <article class="boh-value" data-aos="fade-up" data-aos-delay="120"><i class="fas fa-shield-halved" aria-hidden="true"></i><h3>Trust &amp; Scale</h3><p>Security, governance, and cloud elasticity for enterprise load.</p></article>
          <article class="boh-value" data-aos="fade-up" data-aos-delay="180"><i class="fas fa-lightbulb" aria-hidden="true"></i><h3>Innovation</h3><p>AI, automation, and modern UX without abandoning your estate.</p></article>
        </div>
      </div>
    </section>

    <section class="boh-cta-band" aria-labelledby="boh-cta-heading">
      <div class="boh-cta-band__bg" style="background-image:url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="boh-cta-band__veil" aria-hidden="true"></div>
      <div class="relative z-[2] max-w-3xl mx-auto px-4 text-center py-20">
        <h2 id="boh-cta-heading" class="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to pick your outcome platform?</h2>
        <p class="text-slate-200 mb-8 leading-relaxed">Open any solution page above, or speak with Guudle specialists to map the right programme to your KPIs.</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <a href="#boh-solutions" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Browse 13 Solutions</a>
          <a href="../contact.html" class="inline-flex items-center gap-2 px-6 py-3.5 text-sm rounded-xl border border-white/30 text-white hover:bg-white/10">Talk to Experts</a>
        </div>
      </div>
    </section>

    <section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-contact-grid">
          <div class="cpox-contact-aside" data-aos="fade-up">
            <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
            <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">Outcomes Programme</span></h2>
            <p class="cpox-lead">Tell us which platform you need — automation, SaaS, CRM, FinTech, healthcare, and more. We respond within one business day.</p>
            <ul class="cpox-contact-list">
              <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
              <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:+447908727559">07908 727559</a></li>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
            </ul>
          </div>
          <form id="svc-contact-form" class="cpox-contact-form" data-aos="fade-up" novalidate>
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
              <label for="svc-message">Which solution do you need? <span class="text-red-500">*</span></label>
              <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="e.g. SaaS Platforms, CRM Systems, FinTech..."></textarea>
              <span class="slp-form-error" role="alert"></span>
            </div>
            <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
    </section>
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-webdev-data.js"></script>
  <script src="../../assets/js/mega-menu-data.js"></script>
  <script src="../../assets/js/mega-menu-render.js"></script>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/parallax-unified.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="../../assets/js/service-landing-core.js"></script>
  <script src="../../assets/js/svc-landing.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      if (window.AOS) window.AOS.init({ once: true, duration: 700, offset: 40 });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(out, html, 'utf8');
console.log('Rebuilt hub:', out);
