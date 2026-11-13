import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';
import { serviceHeroValueCards } from './value-props.mjs';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'pages', 'services');

const DEFAULT_PROCESS = [
  ['01', 'Discovery', 'Goals, users, constraints, and success metrics.'],
  ['02', 'Strategy', 'Architecture, roadmap, and delivery plan.'],
  ['03', 'Design', 'UX flows, UI systems, and interactive prototypes.'],
  ['04', 'Build', 'Agile sprints with continuous feedback.'],
  ['05', 'Test', 'QA, performance, security, and UAT.'],
  ['06', 'Launch', 'Deployment, monitoring, and optimization.'],
];

const DEFAULT_FAQS = [
  ['How long does a typical project take?', 'Timelines vary by scope — MVPs often launch in 8–12 weeks; enterprise platforms may take 4–9 months. We provide a detailed estimate after discovery.'],
  ['Do you work with existing teams?', 'Yes. We integrate with your in-house developers, designers, and product owners via shared tools and ceremonies.'],
  ['What engagement models do you offer?', 'Fixed-scope projects, dedicated teams, and staff augmentation — whichever fits your delivery model.'],
  ['How do you ensure quality?', 'Code review, automated testing, CI/CD pipelines, and structured QA gates at every release milestone.'],
];

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

function heroAside(p) {
  const a = p.accent;
  const v = p.heroVisual;
  if (v === 'mobile') return `<div class="sp-hero-mobile sp-reveal-right" aria-hidden="true">
    <div class="sp-phone sp-phone--1"><div class="sp-phone-notch"></div><div class="sp-phone-screen"><div class="sp-phone-bar"></div><div class="sp-phone-block"></div><div class="sp-phone-block short"></div><i class="fas fa-mobile-screen sp-phone-icon"></i></div></div>
    <div class="sp-phone sp-phone--2"><div class="sp-phone-notch"></div><div class="sp-phone-screen accent" style="--sp-accent:${a}"><i class="fas fa-chart-line sp-phone-icon"></i></div></div>
    <span class="sp-float-chip" style="--sp-accent:${a}"><i class="fas fa-star"></i> 4.9★ Apps</span>
  </div>`;
  if (v === 'ux') return `<div class="sp-hero-ux sp-reveal-right" aria-hidden="true">
    <div class="sp-ux-board"><div class="sp-ux-wire"></div><div class="sp-ux-wire short"></div><div class="sp-ux-card glass"><i class="fas fa-palette"></i> Design System</div><div class="sp-ux-dot" style="background:${a}"></div><div class="sp-ux-dot" style="background:#2563EB"></div></div>
  </div>`;
  if (v === 'product') return `<div class="sp-hero-product sp-reveal-right" aria-hidden="true">
    <div class="sp-product-dash"><div class="sp-product-line" style="width:85%;background:${a}"></div><div class="sp-product-line" style="width:60%"></div><div class="sp-product-line" style="width:72%"></div><div class="sp-product-stat"><span>↑ 142%</span><small>Growth</small></div></div>
  </div>`;
  if (v === 'pwa') return `<div class="sp-hero-pwa sp-reveal-right" aria-hidden="true">
    <div class="sp-pwa-browser"><div class="sp-pwa-bar"><span></span><span></span><span></span></div><div class="sp-pwa-content"></div></div>
    <i class="fas fa-arrow-right sp-pwa-arrow" style="color:${a}"></i>
    <div class="sp-pwa-app"><i class="fas fa-mobile-screen"></i></div>
  </div>`;
  if (v === 'api') return `<div class="sp-hero-api sp-reveal-right" aria-hidden="true">
    <div class="sp-api-node center" style="border-color:${a}"><i class="fas fa-server"></i></div>
    <div class="sp-api-node tl"><i class="fas fa-database"></i></div>
    <div class="sp-api-node tr"><i class="fas fa-cloud"></i></div>
    <div class="sp-api-node bl"><i class="fas fa-plug"></i></div>
    <div class="sp-api-line" style="background:${a}"></div>
  </div>`;
  if (v === 'qa') return `<div class="sp-hero-qa sp-reveal-right" aria-hidden="true">
    <div class="sp-qa-card"><div class="sp-qa-metric" style="color:${a}">99.2%</div><p>Pass rate</p></div>
    <div class="sp-qa-bars"><span style="height:70%;background:${a}"></span><span style="height:90%"></span><span style="height:55%"></span><span style="height:85%"></span></div>
  </div>`;
  if (v === 'enterprise') return `<div class="sp-hero-enterprise sp-reveal-right" aria-hidden="true">
    <div class="sp-ent-layer l1"><i class="fas fa-building"></i></div><div class="sp-ent-layer l2"><i class="fas fa-diagram-project"></i></div><div class="sp-ent-layer l3" style="color:${a}"><i class="fas fa-shield-halved"></i></div>
  </div>`;
  if (v === 'webapp') return `<div class="sp-hero-webapp sp-reveal-right" aria-hidden="true">
    <div class="sp-webapp-dash"><div class="sp-webapp-sidebar"></div><div class="sp-webapp-main"><div class="sp-webapp-chart" style="background:linear-gradient(135deg,${a},#2563EB)"></div><div class="sp-webapp-grid"><span></span><span></span><span></span></div></div></div>
  </div>`;
  if (v === 'android') return `<div class="sp-hero-android sp-reveal-right" aria-hidden="true">
    <div class="sp-android-phone"><div class="sp-android-screen"><div class="sp-material-fab" style="background:${a}"><i class="fas fa-plus"></i></div><div class="sp-material-card"></div></div></div>
  </div>`;
  if (v === 'ios') return `<div class="sp-hero-ios sp-reveal-right" aria-hidden="true">
    <div class="sp-ios-device"><div class="sp-ios-island"></div><div class="sp-ios-screen"><i class="fab fa-apple sp-ios-icon"></i></div></div>
  </div>`;
  if (v === 'saas') return `<div class="sp-hero-saas sp-reveal-right" aria-hidden="true">
    <div class="sp-saas-panel"><div class="sp-saas-header"></div><div class="sp-saas-metrics"><div style="background:${a}"><small>MRR</small><strong>$84K</strong></div><div><small>Users</small><strong>12.4K</strong></div></div><div class="sp-saas-chart"></div></div>
  </div>`;
  if (v === 'mvp') return `<div class="sp-hero-mvp sp-reveal-right" aria-hidden="true">
    <div class="sp-mvp-timeline"><div class="sp-mvp-dot done" style="background:${a}"></div><div class="sp-mvp-dot done" style="background:${a}"></div><div class="sp-mvp-dot active" style="border-color:${a}"></div><div class="sp-mvp-dot"></div><p class="sp-mvp-label">Launch in 8 weeks</p></div>
  </div>`;
  if (v === 'discovery') return `<div class="sp-hero-discovery sp-reveal-right" aria-hidden="true">
    <div class="sp-discovery-map"><div class="sp-discovery-pin" style="background:${a}"><i class="fas fa-lightbulb"></i></div><div class="sp-discovery-path"></div><div class="sp-discovery-card">Insights</div></div>
  </div>`;
  return '';
}

function heroSection(p) {
  const bc = `<nav class="text-sm text-slate-500 mb-8 sp-reveal" aria-label="Breadcrumb">
    <a href="../../index.html" class="hover:text-[#002080]">Home</a><span class="mx-2">/</span><span>Services</span><span class="mx-2">/</span><span class="font-medium" style="color:${p.accent}">${esc(p.breadcrumb)}</span>
  </nav>`;
  const ctas = `<div class="flex flex-wrap gap-3 sp-reveal sp-d2">
    <a href="../contact.html" class="sp-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">Start Your Project <i class="fas fa-arrow-right"></i></a>
    <a href="../contact.html" class="sp-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-sm">Free Consultation</a>
  </div>`;
  const aside = heroAside(p);
  const bg = p.heroStyle === 'dark'
    ? `background:linear-gradient(150deg,#002080 0%,#123D6A 50%,${p.accent}33 100%);color:#fff;`
    : 'background:linear-gradient(180deg,#F3F6FB 0%,#fff 100%);';
  const textMain = p.heroStyle === 'dark' ? 'text-white/70' : 'text-slate-600';
  const bcUse = p.heroStyle === 'dark' ? bc.replace('text-slate-500', 'text-white/60').replace('hover:text-[#002080]', 'hover:text-white') : bc;
  const accentSpan = p.heroStyle === 'dark'
    ? `<span style="color:${p.accent}">${esc(p.headlineAccent)}</span>`
    : `<span class="sp-gradient-text">${esc(p.headlineAccent)}</span>`;
  const badgeStyle = p.heroStyle === 'dark' ? `background:rgba(255,255,255,0.1);color:${p.accent}` : `background:${p.accent}18;color:${p.accent}`;

  return `<section class="pt-28 pb-20 relative overflow-hidden" style="${bg}">
    <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
      <div>${bcUse}
        <span class="sp-badge mb-6 sp-reveal" style="${badgeStyle}">${esc(p.badge)}</span>
        <h1 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} ${accentSpan}</h1>
        <p class="${textMain} text-lg mb-8 sp-reveal sp-d1">${esc(p.subtitle)}</p>
        ${ctas}
      </div>
      ${aside}
    </div>
  </section>`;
}

function buildPage(p) {
  const process = p.process || DEFAULT_PROCESS;
  const faqs = p.faqs || DEFAULT_FAQS;
  const trustHtml = p.trust.map((t, i) =>
    `<div class="sp-trust-item sp-reveal${i ? ` sp-d${i}` : ''}"><div class="sp-trust-icon"><i class="fas ${t[0]}"></i></div><p class="text-sm font-semibold text-slate-800">${esc(t[1])}</p><p class="text-xs text-slate-500 mt-1">${esc(t[2])}</p></div>`
  ).join('');
  const statsHtml = p.stats.map(([val, label, type], i) => {
    if (type === 'navy') return `<div class="sp-card-navy p-6 sp-reveal sp-d${i + 1}"><p class="text-3xl font-bold">${esc(val)}</p><p class="text-white/60 text-sm mt-2">${esc(label)}</p></div>`;
    const style = type === 'accent' ? ` style="color:${p.accent}"` : '';
    return `<div class="sp-card p-6 sp-reveal sp-d${i + 1}"><p class="text-3xl font-bold"${style}>${esc(val)}</p><p class="text-slate-500 text-sm mt-2">${esc(label)}</p></div>`;
  }).join('');
  const capsHtml = p.capabilities.map(([icon, title, desc, grad], i) =>
    `<div class="sp-card p-7 sp-reveal sp-d${(i % 3) + 1} sp-feature-card"><div class="w-12 h-12 rounded-xl bg-gradient-to-br ${grad} text-white grid place-items-center mb-4"><i class="fas ${icon}"></i></div><h3 class="font-bold text-lg mb-2">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');
  const indHtml = p.industries.map(([icon, title, desc], i) =>
    `<div class="sp-card p-6 sp-reveal sp-d${i + 1}"><i class="fas ${icon} text-2xl mb-3" style="color:${p.accent}"></i><h3 class="font-bold mb-1">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');
  const techHtml = p.tech.map(t => `<span class="sp-chip">${esc(t)}</span>`).join('');
  const benHtml = p.benefits.map(([icon, title, desc], i) =>
    `<div class="sp-card p-6 text-center sp-reveal sp-d${i + 1}"><div class="sp-icon-ring mx-auto mb-4"><i class="fas ${icon}" style="color:${p.accent}"></i></div><h3 class="font-bold mb-1">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');
  const bullets = p.overviewBullets.map(b =>
    `<li class="flex items-start gap-3"><i class="fas fa-circle-check mt-1" style="color:${p.accent}"></i><span class="text-slate-600">${esc(b)}</span></li>`
  ).join('');
  const processHtml = process.map(([n, t, d], i) =>
    `<div class="sp-process-step sp-reveal sp-d${(i % 3) + 1}"><div class="sp-process-num" style="background:${p.accent}">${n}</div><h3 class="font-bold text-sm mb-1">${esc(t)}</h3><p class="text-slate-500 text-xs">${esc(d)}</p></div>`
  ).join('');
  const faqHtml = faqs.map(([q, a], i) =>
    `<div class="sp-accordion-item sp-reveal sp-d${(i % 3) + 1}"><button type="button" class="sp-accordion-trigger w-full flex items-center justify-between gap-4 text-left font-semibold py-4" aria-expanded="false">${esc(q)}<i class="fas fa-chevron-down text-sm transition-transform"></i></button><div class="sp-accordion-panel"><p class="text-slate-500 text-sm pb-4">${esc(a)}</p></div></div>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSiteMetaBlock({ homeHref: '../../index.html', aboutHref: '../about.html' })}
  <meta name="description" content="${esc(p.subtitle)} — ${esc(p.title)} by Guudle IT Solutions.">
  <title>${esc(p.title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>tailwind.config={theme:{extend:{colors:{navy:'#002080','deep-blue':'#123D6A','royal-blue':'#2563EB',cyan:'#10A5F5','light-gray':'#F3F6FB'}}}}<\/script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-pages.css">
</head>
<body class="service-page ${p.layout} bg-white text-[#002080] antialiased" data-service="${p.dataService}" data-layout="${p.dataLayout}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">
    ${heroSection(p)}
    <section class="py-16 border-y border-slate-100 bg-[#F3F6FB]"><div class="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">${trustHtml}</div></section>
    <section class="py-24"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
      <div class="sp-reveal-left"><h2 class="text-3xl font-bold mb-6">${esc(p.overviewTitle)}</h2><p class="text-slate-500 mb-6">${esc(p.overview)}</p><ul class="space-y-3">${bullets}</ul></div>
      <div class="grid grid-cols-2 gap-6 sp-reveal-right">${serviceHeroValueCards()}</div>
    </div></section>
    <section class="py-24 sp-section-gray"><div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal"><h2 class="text-3xl font-bold mb-4">${esc(p.capabilitiesTitle || 'Core Features')}</h2><p class="text-slate-500">${esc(p.capabilitiesSub || 'Capabilities engineered for measurable outcomes.')}</p></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${capsHtml}</div>
    </div></section>
    <section class="py-24"><div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal"><h2 class="text-3xl font-bold mb-4">Our Development Process</h2><p class="text-slate-500">A proven methodology from discovery to launch.</p></div>
      <div class="sp-process-track sp-reveal">${processHtml}</div>
    </div></section>
    <section class="py-24 sp-section-gray"><div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal"><h2 class="text-3xl font-bold mb-4">Industry Applications</h2><p class="text-slate-500">${esc(p.industriesSub || 'Real-world solutions across sectors.')}</p></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">${indHtml}</div>
    </div></section>
    <section class="py-24"><div class="max-w-5xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4 sp-reveal">Technology Stack</h2>
      <p class="text-slate-500 mb-10 sp-reveal sp-d1">Frameworks, platforms, and tools we build with.</p>
      <div class="flex flex-wrap justify-center gap-3 sp-reveal sp-d2">${techHtml}</div>
    </div></section>
    <section class="py-24 sp-section-gray"><div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal"><h2 class="text-3xl font-bold mb-4">Client Benefits</h2><p class="text-slate-500">ROI, scalability, performance, and security.</p></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">${benHtml}</div>
    </div></section>
    <section class="py-24"><div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-12 sp-reveal"><h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2></div>
      <div class="sp-accordion divide-y divide-slate-200">${faqHtml}</div>
    </div></section>
    <section class="py-24 sp-section-navy"><div class="max-w-5xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center sp-reveal">
        <div><h2 class="text-3xl font-bold mb-4">${esc(p.ctaTitle)}</h2><p class="text-white/60 mb-6">${esc(p.ctaSub)}</p>
          <a href="../contact.html" class="inline-flex px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-xl hover:shadow-xl transition-all text-sm">Book Consultation</a>
        </div>
        <form class="sp-cta-form space-y-4" action="../contact.html" method="get">
          <input type="text" name="name" placeholder="Your name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50" aria-label="Your name">
          <input type="email" name="email" placeholder="Work email" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50" aria-label="Email">
          <textarea name="message" rows="3" placeholder="Tell us about your project" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50" aria-label="Project details"></textarea>
          <button type="submit" class="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all" style="background:${p.accent}">Request Proposal</button>
        </form>
      </div>
    </div></section>
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-data.js"><\/script>
  <script src="../../assets/js/mega-menu-render.js"><\/script>
  <script src="../../assets/js/components.js"><\/script>
  <script src="../../assets/js/main.js"><\/script>
  <script src="../../assets/js/service-pages.js"><\/script>
</body>
</html>`;
}

const PAGES = [
  {
    file: 'mobile-app.html', dataService: 'mobile-app', dataLayout: 'mobile-dev', layout: 'layout-orbit-devices',
    title: 'Mobile App Development', breadcrumb: 'Mobile App Development', badge: 'Mobile Innovation', accent: '#10A5F5', heroStyle: 'light', heroVisual: 'mobile',
    headline: 'Build Mobile Apps That', headlineAccent: 'Users Love & Businesses Scale',
    subtitle: 'Native iOS, Android, and cross-platform apps engineered for performance, retention, and App Store success — from MVP to enterprise rollout.',
    trust: [['fa-apple', 'iOS Native', 'Swift & SwiftUI'], ['fa-android', 'Android', 'Kotlin & Material'], ['fa-layer-group', 'Cross-Platform', 'Flutter & React Native'], ['fa-rocket', 'App Store Ready', 'Launch & ASO']],
    overviewTitle: 'Mobile-First Products Built for Growth', overview: 'We design and develop mobile experiences that feel premium on every device — with offline support, push notifications, analytics, and secure backend integration.',
    overviewBullets: ['End-to-end from UX to App Store submission', 'Performance tuning for low-end devices and emerging markets', 'Long-term maintenance, updates, and feature roadmaps'],
    stats: [['200+', 'Apps shipped', 'navy'], ['4.8★', 'Avg store rating', 'accent'], ['40+', 'Countries launched', 'accent'], ['8 wks', 'Typical MVP', 'accent']],
    capabilitiesTitle: 'Mobile Capabilities', capabilitiesSub: 'Full-stack mobile delivery across platforms.',
    capabilities: [
      ['fa-apple', 'Native iOS Development', 'Swift, SwiftUI, and Apple ecosystem integrations.', 'from-[#002080] to-[#2563EB]'],
      ['fa-android', 'Android Development', 'Kotlin, Jetpack Compose, and Material Design 3.', 'from-[#3DDC84] to-[#10A5F5]'],
      ['fa-mobile-screen', 'Cross-Platform', 'Single codebase with Flutter or React Native.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-screwdriver-wrench', 'App Maintenance', 'Bug fixes, OS updates, and performance monitoring.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-store', 'App Store Deployment', 'Submission, compliance, and optimization (ASO).', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-palette', 'Mobile UI/UX', 'Gesture-first interfaces and accessible mobile patterns.', 'from-[#10A5F5] to-[#22C55E]'],
    ],
    industries: [['fa-heart-pulse', 'Healthcare', 'Telehealth, patient portals, and HIPAA-ready apps.', 'teal'], ['fa-cart-shopping', 'Retail', 'Loyalty, checkout, and omnichannel commerce.', 'blue'], ['fa-truck', 'Logistics', 'Fleet tracking and last-mile delivery.', 'purple'], ['fa-building', 'Enterprise', 'Field service and workforce mobility.', 'orange']],
    tech: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Firebase', 'GraphQL', 'AWS', 'Fastlane', 'TestFlight', 'Play Console'],
    benefits: [['fa-chart-line', 'Engagement', 'Higher retention with polished UX.'], ['fa-expand', 'Scale', 'Architectures that grow with your user base.'], ['fa-shield-halved', 'Security', 'Biometrics, encryption, and secure APIs.'], ['fa-clock', 'Speed', 'Faster time-to-market with agile delivery.']],
    ctaTitle: 'Ready to Launch Your Mobile App?', ctaSub: 'Get a free mobile strategy session and technical roadmap.',
  },
  {
    file: 'ui-ux-design.html', dataService: 'ui-ux-design', dataLayout: 'ux-design', layout: 'layout-ux-glass',
    title: 'UI/UX Design', breadcrumb: 'UI/UX Design', badge: 'Human-Centered Design', accent: '#7C3AED', heroStyle: 'light', heroVisual: 'ux',
    headline: 'Design Experiences That', headlineAccent: 'Convert & Delight',
    subtitle: 'Research-driven UI/UX design — wireframes, prototypes, design systems, and usability testing that turn complex products into intuitive experiences.',
    trust: [['fa-users', 'User Research', 'Interviews & testing'], ['fa-pencil-ruler', 'Wireframes', 'Low to high fidelity'], ['fa-cubes', 'Design Systems', 'Scalable components'], ['fa-universal-access', 'Accessibility', 'WCAG compliant']],
    overviewTitle: 'Design That Drives Business Results', overview: 'Great design is more than aesthetics — it reduces friction, increases conversion, and builds brand trust. We embed UX research and iterative testing into every engagement.',
    overviewBullets: ['Personas, journey maps, and information architecture', 'Interactive Figma prototypes for stakeholder validation', 'Developer-ready specs and component libraries'],
    stats: [['35%', 'Higher conversion', 'navy'], ['50%', 'Less rework', 'accent'], ['100+', 'Design systems', 'accent'], ['2 wks', 'To first prototype', 'accent']],
    capabilitiesTitle: 'Design Services', capabilitiesSub: 'End-to-end UX from research to handoff.',
    capabilities: [
      ['fa-magnifying-glass', 'User Research', 'Interviews, surveys, and behavioral analytics.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-table-columns', 'Wireframing', 'Structure and flows before visual design.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-wand-magic-sparkles', 'Prototyping', 'Clickable prototypes for testing and demos.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-layer-group', 'Design Systems', 'Tokens, components, and documentation.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-vial', 'User Testing', 'Moderated and unmoderated usability studies.', 'from-[#7C3AED] to-[#10A5F5]'],
      ['fa-universal-access', 'Accessibility', 'Inclusive design for all abilities.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [['fa-building', 'SaaS', 'Dashboard and onboarding UX.', 'purple'], ['fa-store', 'E-commerce', 'Checkout and product discovery.', 'blue'], ['fa-hospital', 'Healthcare', 'Patient-friendly clinical UX.', 'teal'], ['fa-landmark', 'FinTech', 'Trust-focused financial interfaces.', 'orange']],
    tech: ['Figma', 'FigJam', 'Adobe XD', 'Maze', 'Hotjar', 'Storybook', 'Zeroheight', 'Principle', 'WCAG 2.2'],
    benefits: [['fa-heart', 'Satisfaction', 'Users complete tasks faster.'], ['fa-coins', 'ROI', 'Design reduces dev waste.'], ['fa-bolt', 'Speed', 'Clear specs accelerate build.'], ['fa-star', 'Brand', 'Cohesive premium identity.']],
    ctaTitle: 'Ready to Elevate Your Product UX?', ctaSub: 'Book a UX audit and receive actionable recommendations.',
  },
  {
    file: 'digital-product-development.html', dataService: 'digital-product', dataLayout: 'digital-product', layout: 'layout-product-journey',
    title: 'Digital Product Development', breadcrumb: 'Digital Product Development', badge: 'Product Innovation', accent: '#2563EB', heroStyle: 'light', heroVisual: 'product',
    headline: 'Ship Digital Products From', headlineAccent: 'Strategy to Scale',
    subtitle: 'Full product lifecycle — strategy, roadmapping, validation, design, engineering, and scaling for web and mobile products that win markets.',
    trust: [['fa-compass', 'Product Strategy', 'Vision & positioning'], ['fa-map', 'Roadmapping', 'Prioritized backlogs'], ['fa-flask', 'Validation', 'Experiments & metrics'], ['fa-rocket', 'Scale', 'Growth architecture']],
    overviewTitle: 'Product-Led Engineering', overview: 'We partner with founders and product teams to turn ideas into revenue-generating products — balancing speed, quality, and long-term scalability.',
    overviewBullets: ['Product discovery workshops and OKR alignment', 'Lean validation before major engineering investment', 'Cross-functional squads: PM, design, and engineering'],
    stats: [['3x', 'Faster validation', 'navy'], ['60%', 'Feature adoption', 'accent'], ['$50M+', 'Product ARR supported', 'accent'], ['12 wks', 'MVP to market', 'accent']],
    capabilitiesTitle: 'Product Capabilities', capabilitiesSub: 'Strategy through engineering at scale.',
    capabilities: [
      ['fa-lightbulb', 'Product Strategy', 'Market fit, positioning, and competitive analysis.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-road', 'Roadmapping', 'Prioritized releases tied to business outcomes.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-chart-simple', 'Validation', 'A/B tests, prototypes, and metric dashboards.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-palette', 'Product Design', 'UX/UI integrated with engineering sprints.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-code', 'Product Engineering', 'Full-stack builds with CI/CD and analytics.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-arrow-trend-up', 'Product Scaling', 'Performance, infra, and team expansion.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [['fa-rocket', 'Startups', 'Zero-to-one product launches.', 'blue'], ['fa-building', 'Enterprise', 'Internal product platforms.', 'purple'], ['fa-cart-shopping', 'Consumer', 'B2C apps and marketplaces.', 'teal'], ['fa-briefcase', 'B2B SaaS', 'Workflow and vertical SaaS.', 'orange']],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Amplitude', 'Mixpanel', 'Figma', 'Jira', 'AWS', 'Docker', 'LaunchDarkly'],
    benefits: [['fa-bullseye', 'Focus', 'Build what users actually need.'], ['fa-coins', 'Capital efficiency', 'Validate before scaling spend.'], ['fa-expand', 'Scale', 'Architecture ready for growth.'], ['fa-users', 'Team velocity', 'Aligned cross-functional delivery.']],
    ctaTitle: 'Ready to Build Your Next Product?', ctaSub: 'Get a product strategy workshop with our leadership team.',
  },
  {
    file: 'progressive-web-apps.html', dataService: 'pwa', dataLayout: 'pwa', layout: 'layout-pwa-transform',
    title: 'Progressive Web Apps', breadcrumb: 'Progressive Web Apps', badge: 'Next-Gen Web', accent: '#10A5F5', heroStyle: 'dark', heroVisual: 'pwa',
    headline: 'Web Apps That Feel', headlineAccent: 'Native & Work Offline',
    subtitle: 'PWAs with install prompts, push notifications, offline caching, and lightning performance — one codebase for every device.',
    trust: [['fa-wifi-slash', 'Offline Ready', 'Service workers'], ['fa-download', 'Installable', 'Add to home screen'], ['fa-bell', 'Push Alerts', 'Re-engagement'], ['fa-gauge-high', 'Performance', 'Core Web Vitals']],
    overviewTitle: 'Browser to App — Without App Stores', overview: 'Progressive Web Apps combine reach of the web with app-like experiences. We build PWAs that load instantly, work offline, and drive re-engagement through push.',
    overviewBullets: ['Service worker strategies for offline and background sync', 'Lighthouse-optimized performance scores', 'Cross-platform delivery without duplicate native codebases'],
    stats: [['3x', 'Faster load', 'navy'], ['40%', 'Lower dev cost', 'accent'], ['90+', 'Lighthouse score', 'accent'], ['6 wks', 'Typical build', 'accent']],
    capabilitiesTitle: 'PWA Features', capabilitiesSub: 'Modern web capabilities at native quality.',
    capabilities: [
      ['fa-wifi-slash', 'Offline Functionality', 'Cache-first and network-first strategies.', 'from-[#10A5F5] to-[#2563EB]'],
      ['fa-mobile-screen-button', 'Installable Apps', 'Manifest, icons, and install prompts.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-bell', 'Push Notifications', 'Web push for retention and alerts.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-gauge-high', 'High Performance', 'Code splitting, lazy loading, and CDN.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-globe', 'Cross-Platform', 'One URL for desktop, tablet, and mobile.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-shield-halved', 'Secure Delivery', 'HTTPS, CSP, and modern auth flows.', 'from-[#002080] to-[#2563EB]'],
    ],
    industries: [['fa-store', 'Retail', 'Mobile commerce without app store friction.', 'cyan'], ['fa-newspaper', 'Media', 'Offline reading and breaking alerts.', 'blue'], ['fa-industry', 'Field Ops', 'Offline data capture for technicians.', 'teal'], ['fa-graduation-cap', 'EdTech', 'Learning apps accessible everywhere.', 'purple']],
    tech: ['React', 'Vue', 'Workbox', 'Vite', 'Lighthouse', 'Web Push', 'IndexedDB', 'Service Workers', 'Tailwind', 'Node.js'],
    benefits: [['fa-coins', 'Cost', 'One codebase vs native dual build.'], ['fa-bolt', 'Reach', 'Instant access via URL.'], ['fa-chart-line', 'SEO', 'Indexable unlike native apps.'], ['fa-sync', 'Updates', 'Deploy without store review delays.']],
    ctaTitle: 'Ready for a Progressive Web App?', ctaSub: 'Assess PWA feasibility for your product in a free technical review.',
  },
  {
    file: 'api-development.html', dataService: 'api-development', dataLayout: 'api', layout: 'layout-api-network',
    title: 'API Development', breadcrumb: 'API Development', badge: 'Connected Systems', accent: '#2563EB', heroStyle: 'light', heroVisual: 'api',
    headline: 'APIs That Power', headlineAccent: 'Connected Ecosystems',
    subtitle: 'REST, GraphQL, and microservices APIs — secure, documented, and built for integrations with third-party platforms and internal systems.',
    trust: [['fa-code', 'REST & GraphQL', 'Modern protocols'], ['fa-cubes', 'Microservices', 'Modular architecture'], ['fa-plug', 'Integrations', 'CRM, ERP & SaaS'], ['fa-lock', 'API Security', 'OAuth & rate limits']],
    overviewTitle: 'Integration-First Architecture', overview: 'APIs are the backbone of modern software. We design contracts, implement services, and manage lifecycle — from OpenAPI docs to gateway policies and monitoring.',
    overviewBullets: ['API-first design with versioning and backward compatibility', 'Gateway, rate limiting, and authentication layers', 'Third-party integrations with Salesforce, Stripe, SAP, and more'],
    stats: [['500+', 'APIs delivered', 'navy'], ['99.9%', 'Uptime SLA', 'accent'], ['<100ms', 'P95 latency', 'accent'], ['4 wks', 'First endpoints', 'accent']],
    capabilitiesTitle: 'API Services', capabilitiesSub: 'Build, secure, and manage your API layer.',
    capabilities: [
      ['fa-server', 'REST APIs', 'Resource-oriented endpoints with OpenAPI specs.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-diagram-project', 'GraphQL', 'Flexible queries and federated schemas.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-cubes', 'Microservices', 'Domain-driven service decomposition.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-plug', 'Third-Party Integrations', 'Stripe, Twilio, HubSpot, and enterprise ERP.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-shield-halved', 'API Security', 'OAuth 2.0, JWT, mTLS, and WAF policies.', 'from-[#002080] to-[#2563EB]'],
      ['fa-sliders', 'API Management', 'Kong, AWS API Gateway, and analytics.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [['fa-building-columns', 'FinTech', 'Payment and banking APIs.', 'blue'], ['fa-cart-shopping', 'E-commerce', 'Catalog, cart, and fulfillment APIs.', 'teal'], ['fa-hospital', 'Healthcare', 'FHIR and HL7 integrations.', 'purple'], ['fa-truck', 'Logistics', 'Tracking and TMS connectors.', 'orange']],
    tech: ['Node.js', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis', 'Kong', 'AWS API Gateway', 'OpenAPI', 'Docker', 'Kubernetes'],
    benefits: [['fa-link', 'Connectivity', 'Unify siloed systems.'], ['fa-expand', 'Scale', 'Independent service scaling.'], ['fa-shield-halved', 'Security', 'Centralized auth and policies.'], ['fa-book', 'Documentation', 'Self-service developer portals.']],
    ctaTitle: 'Need a Robust API Layer?', ctaSub: 'Get an API architecture review and integration roadmap.',
  },
  {
    file: 'qa-testing.html', dataService: 'qa-testing', dataLayout: 'qa', layout: 'layout-qa-dashboard',
    title: 'QA & Testing', breadcrumb: 'QA & Testing', badge: 'Quality Excellence', accent: '#22C55E', heroStyle: 'light', heroVisual: 'qa',
    headline: 'Ship Software With', headlineAccent: 'Confidence & Quality',
    subtitle: 'Automated and manual QA — performance, security, and regression testing that catches defects before your users do.',
    trust: [['fa-robot', 'Automation', 'Selenium & Cypress'], ['fa-user-check', 'Manual QA', 'Exploratory testing'], ['fa-gauge-high', 'Performance', 'Load & stress tests'], ['fa-shield-virus', 'Security', 'Pen test support']],
    overviewTitle: 'Quality Built Into Every Release', overview: 'We embed QA throughout your SDLC — test plans, automation frameworks, CI gates, and release sign-off so every deployment meets your quality bar.',
    overviewBullets: ['Test strategy aligned to risk and release cadence', 'Automated regression suites in your CI/CD pipeline', 'Performance benchmarks and security test coverage'],
    stats: [['99%', 'Defect catch rate', 'navy'], ['70%', 'Automation coverage', 'accent'], ['50%', 'Faster releases', 'accent'], ['24hr', 'Critical bug SLA', 'accent']],
    capabilitiesTitle: 'Testing Services', capabilitiesSub: 'Comprehensive QA across the stack.',
    capabilities: [
      ['fa-robot', 'Automated Testing', 'Unit, integration, and E2E automation.', 'from-[#22C55E] to-[#10A5F5]'],
      ['fa-hand-pointer', 'Manual Testing', 'Exploratory, UAT, and accessibility checks.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-gauge-high', 'Performance Testing', 'Load, stress, and scalability benchmarks.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-shield-halved', 'Security Testing', 'OWASP scans and vulnerability assessment.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-rotate', 'Regression Testing', 'Release gates and smoke test suites.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-clipboard-check', 'QA Processes', 'Test plans, traceability, and sign-off.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [['fa-building', 'Enterprise', 'Mission-critical platform QA.', 'green'], ['fa-mobile-screen', 'Mobile', 'Device lab and store compliance.', 'blue'], ['fa-cloud', 'SaaS', 'Multi-tenant regression automation.', 'teal'], ['fa-credit-card', 'FinTech', 'Compliance-focused test coverage.', 'orange']],
    tech: ['Cypress', 'Playwright', 'Selenium', 'Jest', 'k6', 'JMeter', 'Postman', 'BrowserStack', 'SonarQube', 'GitHub Actions'],
    benefits: [['fa-shield-halved', 'Reliability', 'Fewer production incidents.'], ['fa-coins', 'Cost', 'Catch bugs early — cheaper fixes.'], ['fa-rocket', 'Velocity', 'Confident continuous delivery.'], ['fa-star', 'Reputation', 'Protect brand with quality releases.']],
    ctaTitle: 'Ready to Strengthen Your QA?', ctaSub: 'Get a QA maturity assessment and automation roadmap.',
  },
  {
    file: 'custom-software-development.html', dataService: 'custom-software', dataLayout: 'custom-software', layout: 'layout-enterprise-stats',
    title: 'Custom Software Development', breadcrumb: 'Custom Software Development', badge: 'Enterprise Solutions', accent: '#123D6A', heroStyle: 'dark', heroVisual: 'enterprise',
    headline: 'Tailored Software for', headlineAccent: 'Complex Business Needs',
    subtitle: 'Bespoke enterprise applications, workflow automation, legacy modernization, and cloud-native platforms built around your unique processes.',
    trust: [['fa-building', 'Enterprise Apps', 'Custom platforms'], ['fa-diagram-project', 'Workflow Automation', 'Process digitization'], ['fa-arrows-rotate', 'Modernization', 'Legacy replatform'], ['fa-cloud', 'Cloud Native', 'Scalable infra']],
    overviewTitle: 'Software Shaped Around Your Business', overview: 'Off-the-shelf tools rarely fit complex operations. We build custom software that mirrors your workflows, integrates with existing systems, and scales with your organization.',
    overviewBullets: ['Domain-driven design aligned to business capabilities', 'Integration with ERP, CRM, and legacy databases', 'Cloud-native architectures for resilience and scale'],
    stats: [['300+', 'Enterprise projects', 'navy'], ['40%', 'Process efficiency gain', 'accent'], ['99.9%', 'Platform uptime', 'accent'], ['6 mo', 'Avg enterprise delivery', 'accent']],
    capabilitiesTitle: 'Custom Development', capabilitiesSub: 'Enterprise-grade tailored solutions.',
    capabilities: [
      ['fa-building', 'Enterprise Applications', 'Portals, intranets, and operational platforms.', 'from-[#002080] to-[#2563EB]'],
      ['fa-gears', 'Workflow Automation', 'Approval flows, RPA, and orchestration.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-arrows-rotate', 'Legacy Modernization', 'Replatform monoliths to microservices.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-cloud', 'Cloud Solutions', 'AWS, Azure, and hybrid deployments.', 'from-[#10A5F5] to-[#2563EB]'],
      ['fa-layer-group', 'Scalable Architectures', 'Event-driven and multi-tenant designs.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-shield-halved', 'Security & Compliance', 'SOC 2, GDPR, and industry standards.', 'from-[#123D6A] to-[#2563EB]'],
    ],
    industries: [['fa-industry', 'Manufacturing', 'MES and supply chain systems.', 'navy'], ['fa-landmark', 'Finance', 'Core banking and risk platforms.', 'blue'], ['fa-hospital', 'Healthcare', 'EHR extensions and care coordination.', 'teal'], ['fa-truck', 'Logistics', 'TMS and warehouse management.', 'orange']],
    tech: ['.NET', 'Java', 'Node.js', 'PostgreSQL', 'Kafka', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform'],
    benefits: [['fa-bullseye', 'Fit', 'Software matches your processes.'], ['fa-expand', 'Scale', 'Grow without platform limits.'], ['fa-link', 'Integration', 'Connect your entire stack.'], ['fa-shield-halved', 'Control', 'Own your IP and roadmap.']],
    ctaTitle: 'Need Custom Enterprise Software?', ctaSub: 'Schedule an architecture workshop with our enterprise team.',
  },
  {
    file: 'web-application.html', dataService: 'web-application', dataLayout: 'webapp', layout: 'layout-webapp-saas',
    title: 'Web Application Development', breadcrumb: 'Web Application Development', badge: 'Modern Web Platforms', accent: '#2563EB', heroStyle: 'light', heroVisual: 'webapp',
    headline: 'Enterprise Web Apps That', headlineAccent: 'Perform at Scale',
    subtitle: 'SaaS platforms, enterprise portals, dashboards, and cloud-native web applications — responsive, secure, and built for millions of users.',
    trust: [['fa-globe', 'Enterprise Web', 'Portals & platforms'], ['fa-cloud', 'SaaS', 'Multi-tenant apps'], ['fa-chart-pie', 'Dashboards', 'Real-time analytics'], ['fa-server', 'Cloud Native', 'Microservices ready']],
    overviewTitle: 'Web Platforms Built for the Enterprise', overview: 'We engineer web applications with modern frontends, robust APIs, and cloud infrastructure — delivering the performance and security enterprise clients demand.',
    overviewBullets: ['SPA and SSR architectures for optimal UX and SEO', 'Role-based access control and enterprise SSO', 'Real-time features with WebSockets and event streams'],
    stats: [['150+', 'Web apps delivered', 'navy'], ['2M+', 'Users supported', 'accent'], ['99.99%', 'Uptime targets', 'accent'], ['10 wks', 'MVP timeline', 'accent']],
    capabilitiesTitle: 'Web App Capabilities', capabilitiesSub: 'Full-stack web engineering.',
    capabilities: [
      ['fa-building', 'Enterprise Web Apps', 'Internal tools and customer portals.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-cloud', 'SaaS Platforms', 'Subscription billing and tenant isolation.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-door-open', 'Portals', 'Partner, vendor, and employee portals.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-chart-line', 'Dashboards', 'BI, analytics, and operational views.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-server', 'Cloud-Native Apps', 'Containerized, auto-scaling deployments.', 'from-[#10A5F5] to-[#3B82F6]'],
      ['fa-lock', 'Security', 'OWASP, encryption, and audit logging.', 'from-[#002080] to-[#2563EB]'],
    ],
    industries: [['fa-briefcase', 'B2B SaaS', 'Vertical and horizontal SaaS products.', 'blue'], ['fa-building', 'Enterprise', 'Workflow and compliance portals.', 'purple'], ['fa-heart-pulse', 'Healthcare', 'Patient and provider platforms.', 'teal'], ['fa-graduation-cap', 'EdTech', 'LMS and learning platforms.', 'orange']],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'GraphQL', 'Docker', 'Tailwind'],
    benefits: [['fa-expand', 'Scale', 'Handle traffic spikes gracefully.'], ['fa-bolt', 'Performance', 'Sub-second load times.'], ['fa-shield-halved', 'Security', 'Enterprise-grade protection.'], ['fa-coins', 'ROI', 'Digital channels that drive revenue.']],
    ctaTitle: 'Ready to Build Your Web Platform?', ctaSub: 'Get a technical architecture proposal for your web application.',
  },
  {
    file: 'android-app.html', dataService: 'android-app', dataLayout: 'android', layout: 'layout-android-material',
    title: 'Android App Development', breadcrumb: 'Android App Development', badge: 'Android Ecosystem', accent: '#3DDC84', heroStyle: 'light', heroVisual: 'android',
    headline: 'Premium Android Apps With', headlineAccent: 'Material Design Excellence',
    subtitle: 'Kotlin and Java Android development — Material Design 3, Play Store optimization, and performance tuning for the world\'s largest mobile platform.',
    trust: [['fa-android', 'Kotlin & Java', 'Modern Android stack'], ['fa-palette', 'Material Design', 'MD3 components'], ['fa-store', 'Play Store', 'Launch & ASO'], ['fa-gauge-high', 'Optimization', 'Battery & memory']],
    overviewTitle: 'Android Apps for Global Reach', overview: 'Android powers billions of devices. We build native Android apps that leverage platform capabilities — notifications, widgets, foldables, and Google Play services.',
    overviewBullets: ['Jetpack Compose and traditional View system expertise', 'Play Store compliance, signing, and staged rollouts', 'Analytics, crash reporting, and remote config integration'],
    stats: [['120+', 'Android apps', 'navy'], ['4.7★', 'Play Store avg', 'accent'], ['70%', 'Global market reach', 'accent'], ['8 wks', 'To MVP', 'accent']],
    capabilitiesTitle: 'Android Expertise', capabilitiesSub: 'Native Android from design to Play Store.',
    capabilities: [
      ['fa-code', 'Kotlin Development', 'Coroutines, Flow, and modern Android APIs.', 'from-[#3DDC84] to-[#10A5F5]'],
      ['fa-java', 'Java Development', 'Legacy app maintenance and migration.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-palette', 'Material Design', 'MD3 theming, motion, and accessibility.', 'from-[#2563EB] to-[#7C3AED]'],
      ['fa-google-play', 'Play Store Deployment', 'Listing, policies, and release management.', 'from-[#3DDC84] to-[#22C55E]'],
      ['fa-bolt', 'Android Optimization', 'Startup time, memory, and battery efficiency.', 'from-[#002080] to-[#2563EB]'],
      ['fa-plug', 'Google Services', 'Maps, Firebase, and Play Billing integration.', 'from-[#10A5F5] to-[#2563EB]'],
    ],
    industries: [['fa-cart-shopping', 'Retail', 'Shopping and loyalty apps.', 'green'], ['fa-utensils', 'Food & Delivery', 'Ordering and rider apps.', 'orange'], ['fa-car', 'Automotive', 'Connected car companion apps.', 'blue'], ['fa-building', 'Enterprise', 'Field workforce mobility.', 'purple']],
    tech: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Room', 'Retrofit', 'Firebase', 'Gradle', 'Play Console', 'JUnit', 'Espresso'],
    benefits: [['fa-globe', 'Reach', 'Access the largest mobile audience.'], ['fa-palette', 'UX', 'Material Design users expect.'], ['fa-shield-halved', 'Security', 'Play Protect and app signing.'], ['fa-chart-line', 'Growth', 'Play Store ASO and analytics.']],
    ctaTitle: 'Ready to Build Your Android App?', ctaSub: 'Get an Android technical assessment and delivery plan.',
  },
  {
    file: 'ios-app.html', dataService: 'ios-app', dataLayout: 'ios', layout: 'layout-apple-spotlight',
    title: 'iOS App Development', breadcrumb: 'iOS App Development', badge: 'Apple Ecosystem', accent: '#007AFF', heroStyle: 'light', heroVisual: 'ios',
    headline: 'Premium iOS Experiences With', headlineAccent: 'Swift & SwiftUI',
    subtitle: 'iPhone and iPad apps crafted with Apple\'s latest frameworks — elegant UX, App Store optimization, and seamless ecosystem integration.',
    trust: [['fa-apple', 'Swift & SwiftUI', 'Native Apple stack'], ['fa-mobile-screen', 'iPhone & iPad', 'Universal apps'], ['fa-store', 'App Store', 'ASO & submission'], ['fa-watch', 'Ecosystem', 'Watch & widget support']],
    overviewTitle: 'Apple-Quality Mobile Products', overview: 'iOS users expect polish. We deliver native apps with fluid animations, HIG-compliant UX, and deep integration with Apple services — HealthKit, Sign in with Apple, and more.',
    overviewBullets: ['SwiftUI and UIKit for optimal performance across devices', 'TestFlight beta programs and App Store Connect management', 'Privacy-first design aligned with Apple guidelines'],
    stats: [['100+', 'iOS apps shipped', 'navy'], ['4.9★', 'App Store avg', 'accent'], ['35%', 'Higher ARPU', 'accent'], ['7 wks', 'To TestFlight', 'accent']],
    capabilitiesTitle: 'iOS Development', capabilitiesSub: 'Native Apple platform expertise.',
    capabilities: [
      ['fa-swift', 'Swift Development', 'Modern concurrency and type-safe code.', 'from-[#007AFF] to-[#5856D6]'],
      ['fa-mobile-screen', 'SwiftUI', 'Declarative UI across iPhone and iPad.', 'from-[#5856D6] to-[#2563EB]'],
      ['fa-tablet-screen-button', 'iPhone & iPad Apps', 'Adaptive layouts and multitasking.', 'from-[#002080] to-[#007AFF]'],
      ['fa-chart-line', 'App Store Optimization', 'Keywords, screenshots, and conversion.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-apple-whole', 'Apple Ecosystem', 'Watch, widgets, and iCloud sync.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-shield-halved', 'Privacy & Security', 'Keychain, App Tracking Transparency.', 'from-[#007AFF] to-[#5856D6]'],
    ],
    industries: [['fa-heart-pulse', 'Health & Fitness', 'HealthKit and wellness apps.', 'blue'], ['fa-credit-card', 'FinTech', 'Apple Pay and secure banking.', 'purple'], ['fa-music', 'Media', 'Streaming and content apps.', 'teal'], ['fa-briefcase', 'Productivity', 'Enterprise and prosumer tools.', 'orange']],
    tech: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'CloudKit', 'Xcode', 'TestFlight', 'Fastlane', 'Combine', 'StoreKit'],
    benefits: [['fa-gem', 'Premium UX', 'Apple-grade polish and performance.'], ['fa-coins', 'Revenue', 'Higher monetization on iOS.'], ['fa-shield-halved', 'Trust', 'Apple security and privacy standards.'], ['fa-users', 'Loyalty', 'Engaged premium user base.']],
    ctaTitle: 'Ready to Launch on the App Store?', ctaSub: 'Book an iOS strategy call with our Apple platform specialists.',
  },
  {
    file: 'saas-development.html', dataService: 'saas-development', dataLayout: 'saas', layout: 'layout-saas-parallax',
    title: 'SaaS Product Development', breadcrumb: 'SaaS Product Development', badge: 'Subscription Platforms', accent: '#6366F1', heroStyle: 'light', heroVisual: 'saas',
    headline: 'Build SaaS Products That', headlineAccent: 'Scale & Retain',
    subtitle: 'Multi-tenant architecture, subscription billing, user analytics, and cloud infrastructure — from MVP to Series B scale.',
    trust: [['fa-building', 'Multi-Tenant', 'Isolated tenants'], ['fa-credit-card', 'Subscriptions', 'Stripe & billing'], ['fa-chart-line', 'Analytics', 'Product metrics'], ['fa-cloud', 'Cloud Infra', 'Auto-scaling']],
    overviewTitle: 'SaaS Engineering for Recurring Revenue', overview: 'We build subscription platforms with tenant isolation, usage metering, self-service onboarding, and admin consoles — engineered for growth and operational efficiency.',
    overviewBullets: ['Multi-tenant data models with row-level security', 'Stripe, Chargebee, or custom billing integration', 'Product analytics, feature flags, and admin dashboards'],
    stats: [['80+', 'SaaS products', 'navy'], ['$100M+', 'ARR platforms built', 'accent'], ['99.9%', 'Uptime SLA', 'accent'], ['12 wks', 'To paid MVP', 'accent']],
    capabilitiesTitle: 'SaaS Capabilities', capabilitiesSub: 'Subscription platform engineering.',
    capabilities: [
      ['fa-building', 'Multi-Tenant Architecture', 'Schema-per-tenant or shared with RLS.', 'from-[#6366F1] to-[#2563EB]'],
      ['fa-credit-card', 'Subscription Management', 'Plans, trials, upgrades, and dunning.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-chart-pie', 'User Analytics', 'Funnels, cohorts, and feature adoption.', 'from-[#7C3AED] to-[#6366F1]'],
      ['fa-cloud', 'Cloud Infrastructure', 'AWS/Azure with IaC and auto-scale.', 'from-[#10A5F5] to-[#2563EB]'],
      ['fa-arrow-trend-up', 'Product Scaling', 'Sharding, caching, and CDN strategy.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-user-gear', 'Admin & Ops', 'Tenant management and support tools.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [['fa-briefcase', 'B2B SaaS', 'Vertical and horizontal tools.', 'indigo'], ['fa-users', 'HR Tech', 'People and payroll platforms.', 'blue'], ['fa-chart-line', 'MarTech', 'Campaign and analytics SaaS.', 'purple'], ['fa-screwdriver-wrench', 'DevTools', 'Developer-facing products.', 'teal']],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS', 'Terraform', 'Amplitude', 'LaunchDarkly', 'Kubernetes'],
    benefits: [['fa-repeat', 'Recurring revenue', 'Subscription models that compound.'], ['fa-expand', 'Scale', 'Add tenants without re-architecture.'], ['fa-chart-line', 'Insights', 'Data-driven product decisions.'], ['fa-bolt', 'Speed', 'Launch billing-ready MVPs fast.']],
    ctaTitle: 'Ready to Build Your SaaS?', ctaSub: 'Get a SaaS architecture blueprint and go-to-market tech plan.',
  },
  {
    file: 'mvp-development.html', dataService: 'mvp-development', dataLayout: 'mvp', layout: 'layout-mvp-launch',
    title: 'MVP Development', breadcrumb: 'MVP Development', badge: 'Startup Acceleration', accent: '#F59E0B', heroStyle: 'light', heroVisual: 'mvp',
    headline: 'Validate Faster With a', headlineAccent: 'Launch-Ready MVP',
    subtitle: 'Idea validation, rapid prototyping, lean development, and market testing — get to paying users in weeks, not months.',
    trust: [['fa-lightbulb', 'Validation', 'Test assumptions fast'], ['fa-bolt', 'Rapid Build', 'Lean sprints'], ['fa-flask', 'Market Test', 'Real user feedback'], ['fa-rocket', 'Launch', 'Go-live support']],
    overviewTitle: 'From Idea to Market in Record Time', overview: 'Startups need speed and learning. We build focused MVPs that test your core hypothesis with real users — then iterate based on data, not guesswork.',
    overviewBullets: ['Ruthless scope prioritization on must-have features only', 'Launch-ready code — not throwaway prototypes', 'Analytics and feedback loops from day one'],
    stats: [['8 wks', 'Avg MVP delivery', 'navy'], ['70%', 'Reach PMF signal', 'accent'], ['3x', 'Faster than in-house', 'accent'], ['150+', 'MVPs launched', 'accent']],
    capabilitiesTitle: 'MVP Services', capabilitiesSub: 'Lean product development for startups.',
    capabilities: [
      ['fa-lightbulb', 'Idea Validation', 'Hypothesis mapping and experiment design.', 'from-[#F59E0B] to-[#EA580C]'],
      ['fa-wand-magic-sparkles', 'Rapid Prototyping', 'Clickable demos in days.', 'from-[#2563EB] to-[#7C3AED]'],
      ['fa-code', 'Lean Development', 'Core features only — no bloat.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-vial', 'Market Testing', 'Beta programs and user interviews.', 'from-[#6366F1] to-[#2563EB]'],
      ['fa-rocket', 'Product Launch', 'Deploy, monitor, and iterate.', 'from-[#F59E0B] to-[#EF4444]'],
      ['fa-chart-line', 'Growth Setup', 'Analytics, onboarding, and referral hooks.', 'from-[#10A5F5] to-[#2563EB]'],
    ],
    industries: [['fa-rocket', 'Startups', 'Pre-seed to Series A.', 'amber'], ['fa-building', 'Corporate Innovation', 'Internal venture labs.', 'blue'], ['fa-store', 'D2C', 'Quick commerce validation.', 'teal'], ['fa-heart-pulse', 'HealthTech', 'Regulatory-aware MVPs.', 'purple']],
    tech: ['React', 'Next.js', 'Firebase', 'Supabase', 'Stripe', 'Figma', 'Vercel', 'Mixpanel', 'Node.js', 'PostgreSQL'],
    benefits: [['fa-clock', 'Speed', 'Learn before over-investing.'], ['fa-coins', 'Capital efficient', 'Minimal spend for max learning.'], ['fa-users', 'Users', 'Real feedback beats assumptions.'], ['fa-arrow-trend-up', 'Investor ready', 'Demoable product for fundraising.']],
    ctaTitle: 'Ready to Build Your MVP?', ctaSub: 'Get a 2-week MVP scope and fixed-price proposal.',
    process: [['01', 'Validate', 'Define hypothesis and success metrics.'], ['02', 'Scope', 'Ruthless feature prioritization.'], ['03', 'Prototype', 'Design core user flows.'], ['04', 'Build', '2-week agile sprints.'], ['05', 'Launch', 'Beta release to real users.'], ['06', 'Learn', 'Measure, iterate, and scale.']],
  },
  {
    file: 'product-discovery.html', dataService: 'product-discovery', dataLayout: 'product-discovery', layout: 'layout-discovery-map',
    title: 'Product Discovery', breadcrumb: 'Product Discovery', badge: 'Research & Innovation', accent: '#EC4899', heroStyle: 'light', heroVisual: 'discovery',
    headline: 'Discover What to Build', headlineAccent: 'Before You Build It',
    subtitle: 'Market research, user research, competitor analysis, product workshops, and requirements gathering — de-risk investment with evidence.',
    trust: [['fa-chart-pie', 'Market Research', 'TAM & trends'], ['fa-users', 'User Research', 'Interviews & surveys'], ['fa-chess', 'Competitor Analysis', 'Landscape mapping'], ['fa-people-group', 'Workshops', 'Stakeholder alignment']],
    overviewTitle: 'Evidence-Led Product Decisions', overview: 'Most product failures stem from building the wrong thing. Our discovery engagements align stakeholders, validate demand, and produce actionable requirements before engineering begins.',
    overviewBullets: ['Facilitated discovery workshops with executives and users', 'Competitive landscape and differentiation analysis', 'Prioritized backlog with effort/impact scoring'],
    stats: [['200+', 'Discovery projects', 'navy'], ['50%', 'Less rework', 'accent'], ['90%', 'Stakeholder alignment', 'accent'], ['2 wks', 'Discovery sprint', 'accent']],
    capabilitiesTitle: 'Discovery Services', capabilitiesSub: 'Research-driven product definition.',
    capabilities: [
      ['fa-magnifying-glass-chart', 'Market Research', 'Sizing, trends, and opportunity assessment.', 'from-[#EC4899] to-[#7C3AED]'],
      ['fa-users', 'User Research', 'Interviews, jobs-to-be-done, and personas.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-chess', 'Competitor Analysis', 'Feature matrices and positioning maps.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-people-group', 'Product Workshops', 'Design sprints and alignment sessions.', 'from-[#F59E0B] to-[#EA580C]'],
      ['fa-list-check', 'Requirement Gathering', 'User stories, acceptance criteria, and specs.', 'from-[#6366F1] to-[#2563EB]'],
      ['fa-map', 'Journey Mapping', 'End-to-end user and service blueprints.', 'from-[#EC4899] to-[#2563EB]'],
    ],
    industries: [['fa-rocket', 'Startups', 'Pre-build validation.', 'pink'], ['fa-building', 'Enterprise', 'Digital transformation discovery.', 'blue'], ['fa-cart-shopping', 'Retail', 'Omnichannel opportunity mapping.', 'teal'], ['fa-landmark', 'FinTech', 'Regulatory and market entry research.', 'purple']],
    tech: ['Miro', 'FigJam', 'Dovetail', 'Notion', 'Jira', 'Confluence', 'Google Analytics', 'Hotjar', 'Figma', 'Airtable'],
    benefits: [['fa-shield-halved', 'De-risk', 'Validate before major spend.'], ['fa-bullseye', 'Focus', 'Build features that matter.'], ['fa-handshake', 'Alignment', 'Shared vision across teams.'], ['fa-book', 'Clarity', 'Actionable specs for engineering.']],
    ctaTitle: 'Start With Product Discovery', ctaSub: 'Book a discovery workshop with our product strategists.',
    process: [['01', 'Align', 'Stakeholder interviews and goals.'], ['02', 'Research', 'Market, user, and competitor insights.'], ['03', 'Synthesize', 'Personas, journeys, and opportunities.'], ['04', 'Ideate', 'Workshop solutions and priorities.'], ['05', 'Define', 'Requirements and success metrics.'], ['06', 'Roadmap', 'Phased delivery plan.']],
  },
];

fs.mkdirSync(OUT, { recursive: true });
for (const p of PAGES) {
  fs.writeFileSync(path.join(OUT, p.file), buildPage(p), 'utf8');
  console.log(`✓ ${p.file}`);
}
console.log(`\nGenerated ${PAGES.length} product service pages.`);
