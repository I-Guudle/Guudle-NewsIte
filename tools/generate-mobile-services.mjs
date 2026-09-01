import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderCapabilitiesSection } from './svc-capabilities-render.mjs';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from './site-contact.mjs';
import { navScriptBlock } from './nav-shell.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'pages', 'services');

const configSrc = fs.readFileSync(path.join(root, 'assets/js/mobile-services-config.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(configSrc, sandbox);
const pages = sandbox.window.MobileServicesPages;

function heroVisual(type) {
  switch (type) {
    case 'phones':
      return `<div class="msl-phones" data-aos="fade-left">
        <div class="msl-phone msl-phone--1"><div class="msl-phone__screen"><div class="msl-phone__bar msl-phone__bar--accent"></div><div class="msl-phone__bar"></div><div class="msl-phone__bar" style="width:70%"></div></div></div>
        <div class="msl-phone msl-phone--2"><div class="msl-phone__screen"><div class="msl-phone__bar msl-phone__bar--accent" style="width:80%"></div><div class="msl-phone__bar"></div><div class="msl-phone__bar" style="width:90%"></div><div class="msl-phone__bar" style="width:55%"></div></div></div>
        <div class="msl-phone msl-phone--3"><div class="msl-phone__screen"><div class="msl-phone__bar msl-phone__bar--accent"></div><div class="msl-phone__bar" style="width:75%"></div></div></div>
      </div>`;
    case 'dashboard':
      return `<div class="msl-dashboard" data-aos="fade-left">
        <div class="msl-dashboard__header"><span class="msl-dashboard__dot"></span><span class="msl-dashboard__dot"></span><span class="msl-dashboard__dot"></span></div>
        <div class="msl-dashboard__grid">
          <div class="msl-dashboard__card"><strong><i class="fas fa-shield-halved"></i></strong><span>Security</span></div>
          <div class="msl-dashboard__card"><strong><i class="fas fa-cloud"></i></strong><span>Cloud Native</span></div>
          <div class="msl-dashboard__card"><strong><i class="fas fa-key"></i></strong><span>SSO Ready</span></div>
          <div class="msl-dashboard__card"><strong><i class="fas fa-headset"></i></strong><span>24/7 Support</span></div>
        </div>
      </div>`;
    case 'rocket':
      return `<div class="msl-rocket-wrap" data-aos="fade-left"><div class="msl-rocket-trail"></div><i class="fas fa-rocket msl-rocket-icon" aria-hidden="true"></i></div>`;
    case 'grid':
      return `<div class="msl-grid-cards" data-aos="fade-left">
        <div class="msl-grid-card"><i class="fas fa-briefcase" aria-hidden="true"></i><span>Sales</span></div>
        <div class="msl-grid-card"><i class="fas fa-chart-line" aria-hidden="true"></i><span>Analytics</span></div>
        <div class="msl-grid-card"><i class="fas fa-users" aria-hidden="true"></i><span>Teams</span></div>
        <div class="msl-grid-card"><i class="fas fa-file-contract" aria-hidden="true"></i><span>Contracts</span></div>
      </div>`;
    case 'social':
      return `<div class="msl-social-ring" data-aos="fade-left">
        <div class="msl-social-orbit"></div>
        <div class="msl-social-center"><i class="fas fa-heart" aria-hidden="true"></i></div>
        <span class="msl-social-node msl-social-node--1"><i class="fas fa-share-nodes"></i></span>
        <span class="msl-social-node msl-social-node--2"><i class="fas fa-star"></i></span>
        <span class="msl-social-node msl-social-node--3"><i class="fas fa-bell"></i></span>
        <span class="msl-social-node msl-social-node--4"><i class="fas fa-users"></i></span>
      </div>`;
    case 'map':
      return `<div class="msl-map" data-aos="fade-left">
        <div class="msl-map__grid"></div>
        <div class="msl-map__route"></div>
        <span class="msl-map__pin msl-map__pin--1"></span>
        <span class="msl-map__pin msl-map__pin--2"></span>
        <span class="msl-map__pin msl-map__pin--3"></span>
      </div>`;
    default:
      return '';
  }
}

const VALUE_PILLS = `<div class="slp-value-pills" data-aos="fade-up" data-aos-delay="200">
  <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
  <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
  <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
  <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
</div>`;

function heroSaasLightSection(p) {
  return `
    <section class="saas-hero saas-hero--light hero-premium" aria-labelledby="hero-heading">
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">

          <div class="max-w-xl">
            <div class="hero-enter hero-enter-d1 hero-badge mb-7">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-violet-500"></span></span>
              <span>Premium IT Solutions Partner</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Trusted delivery</span>
            </div>

            <h1 id="hero-heading" class="hero-enter hero-enter-d2 font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5 text-slate-900">
              Build digital products that
              <span class="block mt-2 hero-gradient-text hero-underline">scale with confidence</span>
            </h1>

            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
              We design and engineer premium software, cloud platforms, and AI systems — the same polish as top SaaS products, built for your business.
            </p>

            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9">
              <a href="../contact.html" class="hero-cta-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Start Your Project
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="../../index.html#services" class="hero-cta-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <i class="fas fa-compass text-violet-500"></i> Explore Services
              </a>
            </div>

            <div class="hero-enter hero-enter-d5 hero-feature-row">
              <div class="hero-feature">
                <span class="hero-feature__icon"><i class="fas fa-layer-group"></i></span>
                <div>
                  <strong>End-to-end delivery</strong>
                  <small>Strategy → design → build</small>
                </div>
              </div>
              <div class="hero-feature">
                <span class="hero-feature__icon"><i class="fas fa-shield-halved"></i></span>
                <div>
                  <strong>Security-first</strong>
                  <small>Hardened, compliant builds</small>
                </div>
              </div>
              <div class="hero-feature">
                <span class="hero-feature__icon"><i class="fas fa-bolt"></i></span>
                <div>
                  <strong>Built to scale</strong>
                  <small>Cloud-native architecture</small>
                </div>
              </div>
            </div>
          </div>

          <div class="relative hero-enter hero-enter-d3 lg:ml-2" data-hero-parallax="0.05">
            <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-rocket"></i> Fast launch</div>
            <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-headset"></i> 24/7 support</div>
            <div class="max-w-md mx-auto lg:mx-0 w-full px-4 sm:px-0" data-aos="fade-left" data-aos-duration="1000">
              <div class="hero-contact-card">
                <div class="hero-contact-card__glow" aria-hidden="true"></div>
                <h3 class="hero-contact-card__title font-display">Get Your Free Consultation</h3>
                <p class="hero-contact-card__sub">Tell us about your project — no obligations.</p>
                <form class="hero-contact-form" id="hero-contact-form">
                  <div class="hero-contact-field">
                    <input type="text" name="name" placeholder="Your Name" required class="hero-contact-input" autocomplete="name">
                  </div>
                  <div class="hero-contact-field">
                    <input type="email" name="email" placeholder="Your Email" required class="hero-contact-input" autocomplete="email">
                  </div>
                  <div class="hero-contact-field">
                    <input type="tel" name="phone" placeholder="Your Phone" class="hero-contact-input" autocomplete="tel">
                  </div>
                  <div class="hero-contact-field">
                    <select name="service" required class="hero-contact-input hero-contact-input--select">
                      <option value="">Select Service</option>
                      <option value="custom-software">Custom Software Development</option>
                      <option value="mobile-app" selected>Mobile App Development</option>
                      <option value="web-development">Web Development</option>
                      <option value="ui-design">UI/UX Design</option>
                      <option value="ecommerce">Ecommerce Development</option>
                      <option value="consulting">IT Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="hero-contact-field">
                    <textarea name="message" rows="3" placeholder="Tell us about your project..." class="hero-contact-input hero-contact-input--area"></textarea>
                  </div>
                  <button type="submit" class="hero-contact-submit">
                    Send Message <i class="fas fa-paper-plane" aria-hidden="true"></i>
                  </button>
                  <p class="hero-contact-note"><i class="fas fa-clock" aria-hidden="true"></i> We'll get back to you within 24 hours</p>
                </form>
              </div>
            </div>
            <div class="hero-contact-aura" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <div class="hero-divider" aria-hidden="true">
        <span class="hero-divider__line"></span>
        <span class="hero-divider__gem"></span>
        <span class="hero-divider__line"></span>
      </div>
    </section>`;
}

function heroSection(p) {
  if (p.heroLayout === 'saas-light') return heroSaasLightSection(p);
  return `
    <section class="msl-hero flex items-center relative" aria-labelledby="msl-hero-heading">
      <div class="msl-hero__mesh" aria-hidden="true"></div>
      <div class="msl-hero__grid" aria-hidden="true"></div>
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pb-32">
        <nav class="text-sm text-white/60 mb-8" aria-label="Breadcrumb" data-aos="fade-up">
          <a href="../../index.html" class="hover:text-white">Home</a><span class="mx-2">/</span>
          <span>Services</span><span class="mx-2">/</span>
          <span class="text-accent font-medium">${p.title}</span>
        </nav>
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span class="msl-badge mb-6 inline-flex" data-aos="fade-up"><i class="fas fa-mobile-screen"></i> ${p.badge}</span>
            <h1 id="msl-hero-heading" class="msl-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4" data-aos="fade-up" data-aos-delay="50">
              ${p.headline} <span class="msl-gradient-text">${p.headlineAccent}</span>
            </h1>
            <p class="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl" data-aos="fade-up" data-aos-delay="100">${p.subhead}</p>
            <div class="flex flex-wrap gap-4 mb-10" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="msl-btn-primary">Start Your Project <i class="fas fa-arrow-right"></i></a>
              <a href="#msl-contact" class="msl-btn-ghost">Book a Demo <i class="fas fa-calendar-check"></i></a>
            </div>
            ${VALUE_PILLS}
          </div>
          <div class="msl-hero-visual">${heroVisual(p.heroType)}</div>
        </div>
      </div>
      <div class="slp-scroll-hint" aria-hidden="true"><span>Explore</span><i class="fas fa-chevron-down"></i></div>
    </section>

    <div class="msl-wave" aria-hidden="true"><svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" class="w-full h-12 sm:h-16"><path d="M0 40L60 35C120 30 240 20 360 18C480 16 600 22 720 28C840 34 960 40 1080 38C1200 36 1320 26 1380 21L1440 16V80H0V40Z"/></svg></div>`;
}

function buildPage(slug, p) {
  const capabilitiesSection = renderCapabilitiesSection(
    { ...p, sectionTitles: { features: 'Key Features & Capabilities', featuresSub: p.capabilitiesIntro || `End-to-end mobile capabilities tailored to your goals — from architecture and UX to launch and ongoing support.` } },
    { sectionId: 'msl-features', aos: true }
  );

  const servicesHtml = p.services.map((s) =>
    `<article class="msl-bento-card" data-aos="fade-up"><div class="msl-bento-card__icon"><i class="${s.icon}" aria-hidden="true"></i></div><h3 class="font-bold text-base mb-2">${s.title}</h3><p class="text-slate-600 text-sm">${s.desc}</p></article>`
  ).join('');

  const processSteps = [
    { t: 'Discovery', d: 'Requirements, user research, and technical architecture planning.', detail: 'We align stakeholders, define success metrics, and produce a detailed scope document.' },
    { t: 'Design', d: 'Wireframes, prototypes, and platform-native UI systems.', detail: 'Interactive Figma prototypes validated with users before development begins.' },
    { t: 'Development', d: 'Agile sprints with weekly demos and CI/CD pipelines.', detail: 'Two-week sprints delivering testable builds with automated testing on real devices.' },
    { t: 'Launch', d: 'Store submission, monitoring, and post-launch optimization.', detail: 'App Store and Play Store submission, ASO, crash monitoring, and iterative improvements.' },
  ];
  const processHtml = processSteps.map((step, i) =>
    `<article class="msl-process-step" data-msl-process-step role="listitem" tabindex="0" aria-expanded="false">
      <div class="msl-process-step__num">${i + 1}</div>
      <div><h3 class="font-bold text-lg mb-1">${step.t}</h3><p class="text-slate-500 text-sm">${step.d}</p><p class="msl-process-step__detail">${step.detail}</p></div>
    </article>`
  ).join('');

  const faqSection = renderEnterpriseFaqSection({
    id: 'msl-faq',
    faqs: p.faqs,
    contactHref: '#msl-contact',
    contactPageHref: '../contact.html',
    aos: true,
  });

  const isSaasHero = p.heroLayout === 'saas-light';
  const headExtras = isSaasHero ? `
  <script src="../../assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="../../assets/css/home.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">` : '';
  const bodyClass = isSaasHero
    ? 'slp-page scroll-smooth antialiased guudle-site home-premium overflow-x-hidden'
    : 'slp-page scroll-smooth antialiased';
  const scriptExtras = isSaasHero ? `
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/parallax-unified.js"></script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="description" content="${p.metaDescription}">
  <meta name="keywords" content="${p.keywords}">
  <meta property="og:title" content="${p.title} | Guudle IT Solutions">
  <meta property="og:description" content="${p.metaDescription}">
  <meta property="og:type" content="website">
  <title>${p.title} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=${isSaasHero ? 'Poppins' : 'Manrope'}:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{primary:'var(--msl-primary)',secondary:'var(--msl-secondary)',accent:'var(--msl-accent)',light:'var(--msl-light)'},fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['${isSaasHero ? 'Poppins' : 'Manrope'}','Inter','sans-serif']}}}}</script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-landing-shared.css">
  <link rel="stylesheet" href="../../assets/css/mobile-services-landing.css">
  <link rel="stylesheet" href="../../assets/css/svc-capabilities.css">${headExtras}
</head>
<body class="${bodyClass}" data-slp-prefix="msl" data-msl-theme="${p.theme}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-msl-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-msl-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">

    ${heroSection(p)}

    <nav class="slp-sticky-nav" data-msl-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#msl-features" class="slp-sticky-nav__link" data-msl-nav-link>Capabilities</a>
        <a href="#msl-services" class="slp-sticky-nav__link" data-msl-nav-link>Services</a>
        <a href="#msl-process" class="slp-sticky-nav__link" data-msl-nav-link>Process</a>
        <a href="#msl-contact" class="slp-sticky-nav__link" data-msl-nav-link>Contact</a>
      </div>
    </nav>

    <section id="msl-trust" class="py-10 sm:py-14 bg-white border-b border-slate-100">
      <p class="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8 px-4">Trusted mobile technologies</p>
      <div class="msl-marquee" data-aos="fade-up"><div class="msl-marquee__track">
        <div class="msl-trust-item"><i class="fab fa-apple text-xl"></i><span class="font-semibold text-slate-700">Swift / iOS</span></div>
        <div class="msl-trust-item"><i class="fab fa-android text-xl text-[#3DDC84]"></i><span class="font-semibold text-slate-700">Kotlin / Android</span></div>
        <div class="msl-trust-item"><i class="fas fa-code text-xl text-[#61DAFB]"></i><span class="font-semibold text-slate-700">React Native</span></div>
        <div class="msl-trust-item"><i class="fas fa-feather text-xl text-[#54C5F8]"></i><span class="font-semibold text-slate-700">Flutter</span></div>
        <div class="msl-trust-item"><i class="fab fa-firebase text-xl text-[#FFCA28]"></i><span class="font-semibold text-slate-700">Firebase</span></div>
        <div class="msl-trust-item" aria-hidden="true"><i class="fab fa-apple text-xl"></i><span class="font-semibold text-slate-700">Swift / iOS</span></div>
        <div class="msl-trust-item" aria-hidden="true"><i class="fab fa-android text-xl text-[#3DDC84]"></i><span class="font-semibold text-slate-700">Kotlin / Android</span></div>
        <div class="msl-trust-item" aria-hidden="true"><i class="fas fa-code text-xl text-[#61DAFB]"></i><span class="font-semibold text-slate-700">React Native</span></div>
        <div class="msl-trust-item" aria-hidden="true"><i class="fas fa-feather text-xl text-[#54C5F8]"></i><span class="font-semibold text-slate-700">Flutter</span></div>
      </div></div>
    </section>

    ${capabilitiesSection}

    <section id="msl-services" class="py-20 sm:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="msl-section-head" data-aos="fade-up">
          <span class="msl-badge mb-4" style="color:var(--msl-primary);background:color-mix(in srgb,var(--msl-primary) 12%,#fff);border-color:color-mix(in srgb,var(--msl-primary) 30%,#fff)">Services</span>
          <h2 class="msl-display text-3xl sm:text-4xl font-extrabold mb-4">${p.title}</h2>
          <p class="text-slate-600 text-lg">End-to-end mobile capabilities tailored to your goals.</p>
        </div>
        <div class="msl-bento">${servicesHtml}</div>
      </div>
    </section>

    <section id="msl-process" class="py-20 sm:py-28" style="background:var(--msl-light)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="msl-section-head" data-aos="fade-up">
          <span class="msl-badge mb-4" style="color:var(--msl-primary);background:color-mix(in srgb,var(--msl-primary) 12%,#fff);border-color:color-mix(in srgb,var(--msl-primary) 30%,#fff)">Process</span>
          <h2 class="msl-display text-3xl sm:text-4xl font-extrabold mb-4">Our Development Process</h2>
        </div>
        <div class="msl-process" data-aos="fade-up" role="list">${processHtml}</div>
      </div>
    </section>

    ${faqSection}

    <section class="msl-cta py-20 sm:py-24 relative overflow-hidden">
      <div class="msl-cta__glow" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center" data-aos="fade-up">
        <h2 class="msl-display text-3xl sm:text-4xl font-extrabold text-white mb-4">${p.cta}</h2>
        <p class="text-white/70 text-lg mb-8">Partner with Guudle IT Solutions for mobile apps that deliver real business value.</p>
        <a href="#msl-contact" class="msl-btn-primary">Get Free Consultation <i class="fas fa-arrow-right"></i></a>
      </div>
    </section>

    <section id="msl-contact" class="py-20 sm:py-28" style="background:var(--msl-light)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div class="msl-contact-aside" data-aos="fade-up">
            <span class="msl-badge mb-4 bg-white/10 text-white border-white/20">Contact</span>
            <h2 class="msl-display text-3xl sm:text-4xl font-extrabold mb-4">Start Your Project</h2>
            <p class="text-white/70 mb-8">Tell us about your mobile app goals. We respond within one business day.</p>
            <ul>
              <li><i class="fas fa-envelope"></i> hello@guudle.com</li>
              <li><i class="fas fa-phone"></i> <a href="tel:${SITE_PHONE_TEL}">${SITE_PHONE_DISPLAY}</a></li>
              <li><i class="fas fa-clock"></i> Response within 24 hours</li>
            </ul>
          </div>
          <form id="msl-contact-form" class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-5 self-center w-full" data-aos="fade-up" novalidate>
            <div data-slp-field><label for="msl-name" class="block text-sm font-semibold mb-1.5">Full Name <span class="text-red-500">*</span></label><input type="text" id="msl-name" name="name" class="slp-form-input" required placeholder="Your full name"><span class="slp-form-error" role="alert"></span></div>
            <div data-slp-field><label for="msl-email" class="block text-sm font-semibold mb-1.5">Work Email <span class="text-red-500">*</span></label><input type="email" id="msl-email" name="email" class="slp-form-input" required placeholder="you@company.com"><span class="slp-form-error" role="alert"></span></div>
            <div data-slp-field><label for="msl-message" class="block text-sm font-semibold mb-1.5">Project Details <span class="text-red-500">*</span></label><textarea id="msl-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your app idea, platforms, and timeline..."></textarea><span class="slp-form-error" role="alert"></span></div>
            <button type="submit" class="w-full py-3.5 rounded-xl text-white font-bold text-sm" style="background:linear-gradient(135deg,var(--msl-primary),var(--msl-secondary))">Submit Inquiry <i class="fas fa-paper-plane ml-2"></i></button>
          </form>
        </div>
      </div>
    </section>

  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
${navScriptBlock('../../assets/')}
  <script src="../../assets/js/service-landing-core.js"></script>
  <script src="../../assets/js/mobile-services-landing.js"></script>${scriptExtras}
</body>
</html>`;
}

/** Hand-maintained HIS-style layouts — do not overwrite on regen */
const MANUAL_MOBILE_PAGES = new Set(['custom-mobile-app-development', 'enterprise-mobile-app-development']);

for (const [slug, config] of Object.entries(pages)) {
  if (MANUAL_MOBILE_PAGES.has(slug)) {
    console.log('Skipped (manual layout):', slug);
    continue;
  }
  const file = path.join(outDir, `${slug}.html`);
  fs.writeFileSync(file, buildPage(slug, config), 'utf8');
  console.log('Generated:', file);
}

console.log(`Done — ${Object.keys(pages).length} pages.`);
