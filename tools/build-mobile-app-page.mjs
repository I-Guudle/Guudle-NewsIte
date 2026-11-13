/**
 * Rebuild pages/services/mobile-app.html — comprehensive mobile app services
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { defaultIndustries } from './svc-shared-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'pages', 'services', 'mobile-app.html');

const industries = renderIndustriesParallaxSection({
  industries: defaultIndustries,
  sectionId: 'svc-industries',
  contactLink: '../contact.html',
  industriesLink: '../industries.html',
}).trim();

const platforms = [
  { icon: 'fab fa-apple', title: 'iOS App Development', body: 'Swift and SwiftUI apps tuned for Apple Human Interface Guidelines, App Store quality, and device capabilities from iPhone to iPad.', points: ['Swift / SwiftUI', 'App Store submission', 'Push & deep links'] },
  { icon: 'fab fa-android', title: 'Android App Development', body: 'Kotlin apps with Material Design, Google Play readiness, and support across phones, tablets, and emerging form factors.', points: ['Kotlin / Jetpack', 'Play Console release', 'Material 3 UX'] },
  { icon: 'fas fa-mobile-screen', title: 'Flutter Cross-Platform', body: 'One codebase for iOS and Android with near-native performance — ideal when speed-to-market and consistency matter equally.', points: ['Single codebase', 'Custom UI kits', 'CI/CD pipelines'] },
  { icon: 'fab fa-react', title: 'React Native', body: 'JavaScript/TypeScript mobile apps that share logic with your web stack while delivering a native feel.', points: ['Shared business logic', 'Native modules', 'OTA-friendly delivery'] },
  { icon: 'fas fa-building', title: 'Enterprise Mobility', body: 'Workforce and field apps with SSO, MDM, offline sync, and secure APIs for regulated and high-scale operations.', points: ['SSO / MDM', 'Offline-first', 'Role-based access'] },
  { icon: 'fas fa-bolt', title: 'On-Demand & Consumer Apps', body: 'Ride, delivery, booking, and marketplace experiences with real-time matching, payments, and live tracking.', points: ['Real-time maps', 'Payments', 'Notifications'] },
];

const capabilities = [
  { icon: 'fas fa-pen-ruler', title: 'UX / UI Design', body: 'Research-led flows, interactive prototypes, and design systems that feel premium on every screen size.' },
  { icon: 'fas fa-server', title: 'Backend & APIs', body: 'Secure REST/GraphQL APIs, auth, and cloud backends that scale with your user growth.' },
  { icon: 'fas fa-bell', title: 'Push & Engagement', body: 'Segmented notifications, in-app messaging, and retention loops that respect user attention.' },
  { icon: 'fas fa-credit-card', title: 'Payments & Commerce', body: 'Stripe, Apple Pay, Google Pay, and regional gateways integrated with clear reconciliation.' },
  { icon: 'fas fa-location-dot', title: 'Maps & Location', body: 'Live tracking, geofencing, and route experiences for logistics, field service, and consumer apps.' },
  { icon: 'fas fa-shield-halved', title: 'Security & Compliance', body: 'Encryption, biometric auth, secure storage, and audit-ready practices for sensitive data.' },
  { icon: 'fas fa-chart-line', title: 'Analytics & Growth', body: 'Product analytics, crash reporting, A/B testing, and KPI dashboards for product leaders.' },
  { icon: 'fas fa-cloud-arrow-up', title: 'Release Engineering', body: 'Store submissions, staged rollouts, hotfix workflows, and CI/CD for continuous delivery.' },
  { icon: 'fas fa-wifi', title: 'Offline & Sync', body: 'Local databases and conflict-aware sync so field teams keep working without perfect connectivity.' },
];

const process = [
  ['01', 'Discover', 'Goals, users, and success metrics'],
  ['02', 'Design', 'Flows, prototypes, brand UI'],
  ['03', 'Build', 'Native / Flutter / RN sprints'],
  ['04', 'Integrate', 'APIs, payments, analytics'],
  ['05', 'Test', 'QA, devices, store readiness'],
  ['06', 'Launch', 'Release, monitor, iterate'],
];

const tech = [
  { icon: 'fa-mobile', title: 'Mobile', items: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'SwiftUI'] },
  { icon: 'fa-server', title: 'Backend', items: ['Node.js', 'Java', '.NET', 'Python', 'Firebase'] },
  { icon: 'fa-cloud', title: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'App Store', 'Play Console'] },
  { icon: 'fa-database', title: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Realm'] },
  { icon: 'fa-gears', title: 'DevOps', items: ['CI/CD', 'Fastlane', 'GitHub Actions', 'Bitrise', 'TestFlight'] },
  { icon: 'fa-chart-pie', title: 'Analytics', items: ['Firebase', 'Mixpanel', 'Amplitude', 'Sentry', 'Crashlytics'] },
];

const faqs = [
  { q: 'Should we build native or cross-platform?', a: 'Native is ideal when you need maximum platform fidelity or heavy device APIs. Flutter or React Native are excellent when you want faster dual-platform delivery with a shared codebase. We recommend based on UX ambition, timeline, and long-term ownership.' },
  { q: 'How long does a typical mobile app take?', a: 'MVPs often land in 8–16 weeks depending on scope. Enterprise or marketplace apps may run longer with phased releases. We sequence a first production launch early, then expand features in controlled waves.' },
  { q: 'Do you handle App Store and Google Play submission?', a: 'Yes. We prepare store assets, privacy disclosures, review guidelines compliance, TestFlight/internal testing, and production rollouts — including staged releases where appropriate.' },
  { q: 'Can you integrate with our existing backend or ERP/CRM?', a: 'Absolutely. We connect via secure APIs, events, and middleware so the mobile experience sits cleanly on top of your current systems.' },
  { q: 'How do you ensure quality across devices?', a: 'We combine automated tests, device lab / cloud device testing, and structured UAT. Critical journeys are validated on priority devices before each release.' },
  { q: 'What about post-launch support?', a: 'We offer maintenance retainers covering OS updates, crash monitoring, feature iterations, and store compliance — with clear SLAs.' },
  { q: 'Can you redesign an existing app?', a: 'Yes. We audit UX, performance, and architecture, then modernise UI and refactor high-risk areas without a risky big-bang rewrite when a phased approach is safer.' },
  { q: 'Do you build apps for regulated industries?', a: 'Yes — including healthcare, finance, and government contexts. Security, audit trails, and compliance requirements are designed into the architecture from day one.' },
];

function cards(list, extraClass) {
  return list
    .map(
      (c) => `        <article class="ma-card ma-reveal">
          <div class="ma-card__icon"><i class="${c.icon}" aria-hidden="true"></i></div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          ${c.points ? `<ul>${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
        </article>`
    )
    .join('\n');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="Mobile app development by Guudle — iOS, Android, Flutter, and React Native apps with premium UX, secure backends, and App Store / Play launch support.">
  <meta name="keywords" content="Mobile App Development, iOS App Development, Android App Development, Flutter, React Native, Enterprise Mobile Apps, Guudle IT Solutions">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/mobile-app.html">
  <meta property="og:title" content="Mobile App Development | Guudle IT Solutions">
  <meta property="og:description" content="Native and cross-platform mobile apps with polished UX, scalable backends, and enterprise-grade delivery.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/mobile-app.html">
  <meta property="og:image" content="https://images.unsplash.com/photo-1512941937669-90a1df58e7cd?w=900&q=82&auto=format&fit=crop">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mobile App Development | Guudle IT Solutions">
  <meta name="twitter:description" content="Native and cross-platform mobile apps with polished UX, scalable backends, and enterprise-grade delivery.">
  <meta name="twitter:image" content="https://images.unsplash.com/photo-1512941937669-90a1df58e7cd?w=900&q=82&auto=format&fit=crop">
  <title>Mobile App Development | Guudle IT Solutions</title>
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Service","name":"Mobile App Development","description":"Native and cross-platform mobile apps with polished UX, scalable backends, and enterprise-grade delivery.","provider":{"@type":"Organization","name":"Guudle IT Solutions","url":"https://guudle.com"},"areaServed":"Worldwide","url":"https://guudle.com/pages/services/mobile-app.html"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://guudle.com/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://guudle.com/pages/services/"},{"@type":"ListItem","position":3,"name":"Mobile App Development","item":"https://guudle.com/pages/services/mobile-app.html"}]},{"@type":"FAQPage","mainEntity":${JSON.stringify(
    faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  )}]}</script>
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
  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">
  <link rel="stylesheet" href="../../assets/css/mobile-app-page.css">
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page ma-page" data-slp-prefix="svc" data-svc-theme="mob-general">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">

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
                <img src="https://images.unsplash.com/photo-1512941937669-90a1df58e7cd?w=900&q=82&auto=format&fit=crop" alt="Mobile app development — Guudle IT Solutions" width="640" height="800" loading="eager" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fab fa-apple"></i> iOS</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fab fa-android"></i> Android</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-[#002080] font-semibold">Mobile App Development</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>Mobile Apps</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">Mobile Apps <span class="block mt-2 hero-title-navy__line">That Users Love &amp; Businesses Trust</span></h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">Guudle designs and engineers iOS, Android, Flutter, and React Native applications — from consumer products to enterprise mobility — with polished UX, secure backends, and store-ready launches.</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start Your App <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#ma-showcase" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-mobile-screen text-cyan-600"></i> See the Showcase</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-mobile-screen" aria-hidden="true"></i></span><div><strong>Native &amp; Cross-Platform</strong><p>iOS, Android, Flutter, React Native.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><div><strong>Security-First</strong><p>Auth, encryption, and compliance-ready.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-gauge-high" aria-hidden="true"></i></span><div><strong>Performance</strong><p>Smooth UX and reliable release pipelines.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-store" aria-hidden="true"></i></span><div><strong>Store Launch</strong><p>App Store &amp; Play Console end to end.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>

    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#ma-platforms" class="slp-sticky-nav__link" data-svc-nav-link>Platforms</a>
        <a href="#ma-showcase" class="slp-sticky-nav__link" data-svc-nav-link>Showcase</a>
        <a href="#ma-capabilities" class="slp-sticky-nav__link" data-svc-nav-link>Capabilities</a>
        <a href="#ma-process" class="slp-sticky-nav__link" data-svc-nav-link>Process</a>
        <a href="#ma-tech" class="slp-sticky-nav__link" data-svc-nav-link>Tech</a>
        <a href="#svc-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
        <a href="#ma-faq" class="slp-sticky-nav__link" data-svc-nav-link>FAQ</a>
        <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
      </div>
    </nav>

    <section id="ma-platforms" class="ma-section ma-section--canvas" aria-labelledby="ma-platforms-heading">
      <div class="ma-wrap">
        <header class="ma-head" data-aos="fade-up">
          <span class="ma-eyebrow"><i class="fas fa-layer-group" aria-hidden="true"></i> Platforms</span>
          <h2 id="ma-platforms-heading" class="ma-title font-display">Build once — or go native — with the <span>right stack</span></h2>
          <p class="ma-lead">We match platform choice to product ambition, timeline, and total cost of ownership — never a one-size-fits-all template.</p>
        </header>
        <div class="ma-grid ma-grid--3">
${cards(platforms)}
        </div>
      </div>
    </section>

    <!-- Eye-catching mid-page parallax showcase -->
    <section id="ma-showcase" class="ma-showcase" aria-labelledby="ma-showcase-heading">
      <div class="ma-showcase__bg" style="background-image:url('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="ma-showcase__veil" aria-hidden="true"></div>
      <div class="ma-showcase__grid" aria-hidden="true"></div>
      <div class="ma-showcase__inner">
        <div class="ma-wrap">
          <div class="ma-showcase__layout">
            <div class="ma-showcase__copy" data-aos="fade-right">
              <span class="ma-eyebrow"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> Experience Showcase</span>
              <h2 id="ma-showcase-heading" class="ma-title font-display">Apps that feel premium in every <span>interaction</span></h2>
              <p class="ma-lead">Scroll through our mid-page parallax stage — a cinematic look at how Guudle crafts mobile products with depth, motion, and enterprise reliability.</p>
              <ul class="ma-showcase__points">
                <li><i class="fas fa-check-circle" aria-hidden="true"></i><span>Pixel-precise UI with brand-aligned design systems</span></li>
                <li><i class="fas fa-check-circle" aria-hidden="true"></i><span>Real-time features: chat, tracking, notifications</span></li>
                <li><i class="fas fa-check-circle" aria-hidden="true"></i><span>Secure auth, payments, and offline resilience</span></li>
                <li><i class="fas fa-check-circle" aria-hidden="true"></i><span>Store-ready releases with monitoring from day one</span></li>
              </ul>
              <div class="ma-actions" style="justify-content:flex-start;margin-top:1.5rem">
                <a href="../contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Discuss Your App Idea</a>
              </div>
            </div>
            <div class="ma-phones" aria-hidden="true">
              <span class="ma-float-chip ma-float-chip--1"><i class="fas fa-bolt"></i> 60 FPS UI</span>
              <span class="ma-float-chip ma-float-chip--2"><i class="fas fa-shield-halved"></i> Secure by design</span>
              <div class="ma-phone ma-phone--left">
                <span class="ma-phone__notch"></span>
                <div class="ma-phone__screen" style="background-image:url('https://images.unsplash.com/photo-1556740749-887f6717c7e9?w=600&q=80&auto=format&fit=crop')"></div>
              </div>
              <div class="ma-phone ma-phone--main">
                <span class="ma-phone__notch"></span>
                <div class="ma-phone__screen" style="background-image:url('https://images.unsplash.com/photo-1512941937669-90a1df58e7cd?w=700&q=80&auto=format&fit=crop')"></div>
              </div>
              <div class="ma-phone ma-phone--right">
                <span class="ma-phone__notch"></span>
                <div class="ma-phone__screen" style="background-image:url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&auto=format&fit=crop')"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="ma-capabilities" class="ma-section ma-section--white" aria-labelledby="ma-capabilities-heading">
      <div class="ma-wrap">
        <header class="ma-head" data-aos="fade-up">
          <span class="ma-eyebrow"><i class="fas fa-cubes" aria-hidden="true"></i> Capabilities</span>
          <h2 id="ma-capabilities-heading" class="ma-title font-display">Everything required to ship a <span>complete product</span></h2>
          <p class="ma-lead">Design, engineering, integrations, security, analytics, and release — delivered as one programme.</p>
        </header>
        <div class="ma-grid ma-grid--3">
${cards(capabilities)}
        </div>
      </div>
    </section>

    <section class="ma-stats-band" aria-label="Delivery outcomes">
      <div class="ma-stats-band__bg" style="background-image:url('../../sliders/38.jpg')" aria-hidden="true"></div>
      <div class="ma-stats-band__veil" aria-hidden="true"></div>
      <div class="ma-wrap">
        <div class="ma-stats">
          <div class="ma-stat ma-reveal"><strong>2×</strong><span>Faster dual-platform delivery with Flutter / RN</span></div>
          <div class="ma-stat ma-reveal"><strong>99.9%</strong><span>Target uptime for connected backends</span></div>
          <div class="ma-stat ma-reveal"><strong>40+</strong><span>Device &amp; OS combinations in QA coverage</span></div>
          <div class="ma-stat ma-reveal"><strong>24/7</strong><span>Monitoring &amp; support options</span></div>
        </div>
      </div>
    </section>

    <section id="ma-process" class="ma-section ma-section--canvas" aria-labelledby="ma-process-heading">
      <div class="ma-wrap">
        <header class="ma-head ma-head--center" data-aos="fade-up">
          <span class="ma-eyebrow"><i class="fas fa-route" aria-hidden="true"></i> Process</span>
          <h2 id="ma-process-heading" class="ma-title font-display">From idea to App Store — a clear <span>path</span></h2>
          <p class="ma-lead">Transparent milestones, weekly demos, and production discipline on every engagement.</p>
        </header>
        <div class="ma-process">
          ${process
            .map(
              ([n, t, d]) =>
                `<article class="ma-step ma-reveal"><span class="ma-step__n">${n}</span><strong>${t}</strong><p>${d}</p></article>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section id="ma-tech" class="ma-section ma-section--white" aria-labelledby="ma-tech-heading">
      <div class="ma-wrap">
        <header class="ma-head" data-aos="fade-up">
          <span class="ma-eyebrow"><i class="fas fa-code" aria-hidden="true"></i> Technology</span>
          <h2 id="ma-tech-heading" class="ma-title font-display">Modern stacks for durable <span>mobile products</span></h2>
          <p class="ma-lead">We select technologies for performance, maintainability, and your team’s long-term ownership.</p>
        </header>
        <div class="ma-tech">
          ${tech
            .map(
              (t) =>
                `<article class="ma-tech__card ma-reveal"><h3><i class="fas ${t.icon}" aria-hidden="true"></i> ${t.title}</h3><div class="ma-chips">${t.items
                  .map((i) => `<span>${i}</span>`)
                  .join('')}</div></article>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    ${industries}

    <section id="ma-faq" class="ma-section ma-section--canvas" aria-labelledby="ma-faq-heading">
      <div class="ma-wrap">
        <header class="ma-head ma-head--center" data-aos="fade-up">
          <span class="ma-eyebrow">FAQ</span>
          <h2 id="ma-faq-heading" class="ma-title font-display">Questions teams ask before they <span>build</span></h2>
          <p class="ma-lead">Practical answers for founders, product owners, and enterprise IT leaders.</p>
        </header>
        <div class="ma-faq" data-ma-faq data-aos="fade-up">
          ${faqs
            .map(
              (f) =>
                `<div class="ma-faq__item" data-ma-faq-item>
            <button type="button" class="ma-faq__btn" data-ma-faq-btn aria-expanded="false"><span>${f.q}</span><i class="fas fa-chevron-down" aria-hidden="true"></i></button>
            <div class="ma-faq__panel"><p>${f.a}</p></div>
          </div>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section class="ma-cta" aria-labelledby="ma-cta-heading">
      <div class="ma-cta__bg" style="background-image:url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="ma-cta__veil" aria-hidden="true"></div>
      <div class="ma-wrap">
        <h2 id="ma-cta-heading" class="font-display">Ready to launch your next mobile product?</h2>
        <p>Partner with Guudle to design, build, and ship iOS, Android, and cross-platform apps that users love and businesses can scale.</p>
        <div class="ma-actions">
          <a href="../contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Book a Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="ios-app.html" class="inline-flex items-center gap-2 px-6 py-3.5 text-sm rounded-xl border border-white/30 text-white hover:bg-white/10">iOS Services</a>
          <a href="android-app.html" class="inline-flex items-center gap-2 px-6 py-3.5 text-sm rounded-xl border border-white/30 text-white hover:bg-white/10">Android Services</a>
        </div>
      </div>
    </section>

    <section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-contact-grid">
          <div class="cpox-contact-aside" data-aos="fade-up">
            <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
            <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">Mobile App</span></h2>
            <p class="cpox-lead">Share your idea, platform preference, and timeline. We respond within one business day.</p>
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
              <label for="svc-message">App Idea / Requirements <span class="text-red-500">*</span></label>
              <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="iOS, Android, Flutter… describe features and timeline"></textarea>
              <span class="slp-form-error" role="alert"></span>
            </div>
            <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
    </section>

    <section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
        <div class="flex flex-wrap gap-3">
          <a href="ios-app.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>iOS App Development</a>
          <a href="android-app.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Android App Development</a>
          <a href="flutter-app.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Flutter App Development</a>
          <a href="enterprise-mobile-app-development.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Enterprise Mobile</a>
          <a href="ui-ux-design.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>UI/UX Design</a>
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
  <script src="../../assets/js/industries-tabs.js"></script>
  <script src="../../assets/js/mobile-app-page.js"></script>
</body>
</html>
`;

fs.writeFileSync(out, html, 'utf8');
console.log('Wrote', out);
