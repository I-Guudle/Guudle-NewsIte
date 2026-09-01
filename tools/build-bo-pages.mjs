/**
 * Build all Business Outcomes solution pages
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pages as part1 } from './bo-pages-data-part1.mjs';
import { pages as part2 } from './bo-pages-data-part2.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'pages', 'services');

const pages = [...part1, ...part2];

const PROCESS = [
  ['Discover', 'Clarify outcomes & constraints'],
  ['Strategy', 'Prioritise value & roadmap'],
  ['Architecture', 'Design scalable foundations'],
  ['Design', 'Experience & workflow design'],
  ['Development', 'Build secure capabilities'],
  ['Integration', 'Connect enterprise systems'],
  ['Testing', 'Validate quality & compliance'],
  ['Deployment', 'Release with controlled risk'],
  ['Optimization', 'Tune performance & cost'],
  ['Continuous Improvement', 'Expand value over time'],
];

const INDUSTRIES = [
  ['fa-heart-pulse', 'Healthcare'],
  ['fa-building-columns', 'Finance'],
  ['fa-bag-shopping', 'Retail'],
  ['fa-industry', 'Manufacturing'],
  ['fa-landmark', 'Government'],
  ['fa-truck', 'Logistics'],
  ['fa-graduation-cap', 'Education'],
  ['fa-shield-halved', 'Insurance'],
  ['fa-bolt', 'Energy'],
  ['fa-tower-cell', 'Telecommunications'],
];

const TECH = [
  { icon: 'fa-desktop', title: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Flutter', 'SwiftUI'] },
  { icon: 'fa-server', title: 'Backend', items: ['Node.js', 'Java', '.NET', 'Python', 'Go'] },
  { icon: 'fa-brain', title: 'AI', items: ['OpenAI', 'Azure AI', 'LangChain', 'Custom ML', 'Vision'] },
  { icon: 'fa-cloud', title: 'Cloud', items: ['Azure', 'AWS', 'GCP', 'Hybrid', 'Edge'] },
  { icon: 'fa-database', title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'Elastic'] },
  { icon: 'fa-gears', title: 'DevOps', items: ['CI/CD', 'Terraform', 'GitHub Actions', 'ArgoCD', 'Helm'] },
  { icon: 'fa-lock', title: 'Security', items: ['SSO', 'Zero Trust', 'WAF', 'Vault', 'SIEM'] },
  { icon: 'fa-plug', title: 'APIs', items: ['REST', 'GraphQL', 'gRPC', 'Events', 'Webhooks'] },
  { icon: 'fa-box', title: 'Containers', items: ['Docker', 'Kubernetes', 'ECS', 'AKS', 'EKS'] },
  { icon: 'fa-chart-line', title: 'Monitoring', items: ['OpenTelemetry', 'Grafana', 'Datadog', 'ELK', 'APM'] },
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPage(p, index) {
  const prev = pages[(index - 1 + pages.length) % pages.length];
  const next = pages[(index + 1) % pages.length];
  const url = `https://guudle.com/pages/services/${p.slug}.html`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: p.name,
        description: p.metaDesc,
        provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
        areaServed: 'Worldwide',
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://guudle.com/pages/services/' },
          { '@type': 'ListItem', position: 3, name: 'Business Outcomes', item: 'https://guudle.com/pages/services/business-outcomes-digital-platforms.html' },
          { '@type': 'ListItem', position: 4, name: p.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const challenges = p.challenges
    .map(
      (c) => `        <article class="bo-card bo-reveal">
          <div class="bo-card__icon"><i class="fas ${esc(c.icon)}" aria-hidden="true"></i></div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.body)}</p>
        </article>`
    )
    .join('\n');

  const arch = p.architecture
    .map(
      (a) => `            <div class="bo-arch__row"><i class="fas ${esc(a.icon)}" aria-hidden="true"></i><span>${esc(a.label)}</span></div>`
    )
    .join('\n');

  const caps = p.capabilities
    .map(
      (c) => `        <article class="bo-cap bo-reveal">
          <div class="bo-cap__icon"><i class="fas ${esc(c.icon)}" aria-hidden="true"></i></div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.desc)}</p>
          <span class="bo-cap__benefit">${esc(c.benefit)}</span>
        </article>`
    )
    .join('\n');

  const feats = p.features
    .map(
      (f) => `        <article class="bo-feat bo-reveal">
          <i class="fas ${esc(f.icon)}" aria-hidden="true"></i>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.body)}</p>
        </article>`
    )
    .join('\n');

  const stats = p.stats
    .map((s) => {
      const dec = s.decimals != null ? ` data-bo-decimals="${s.decimals}"` : '';
      return `        <article class="bo-stat bo-reveal">
          <div class="bo-stat__num"><span data-bo-count="${s.value}" data-bo-suffix="${esc(s.suffix)}"${dec}>0</span></div>
          <p>${esc(s.label)}</p>
        </article>`;
    })
    .join('\n');

  const why = p.why
    .map(
      (w) => `        <article class="bo-card bo-reveal">
          <div class="bo-card__icon"><i class="fas ${esc(w.icon)}" aria-hidden="true"></i></div>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.body)}</p>
        </article>`
    )
    .join('\n');

  const faqs = p.faqs
    .map(
      (f) => `        <div class="bo-faq__item" data-bo-faq-item>
          <button type="button" class="bo-faq__btn" data-bo-faq-btn aria-expanded="false">
            <span>${esc(f.q)}</span>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
          <div class="bo-faq__panel"><p>${esc(f.a)}</p></div>
        </div>`
    )
    .join('\n');

  const timeline = PROCESS.map(
    ([t, d], i) => `          <div class="bo-timeline__step" style="transition-delay:${i * 0.04}s">
            <div class="bo-timeline__dot" aria-hidden="true"></div>
            <strong>${esc(t)}</strong>
            <span>${esc(d)}</span>
          </div>`
  ).join('\n');

  const inds = INDUSTRIES.map(
    ([icon, name]) => `        <article class="bo-ind bo-reveal">
          <i class="fas ${icon}" aria-hidden="true"></i>
          <strong>${name}</strong>
        </article>`
  ).join('\n');

  const tech = TECH.map(
    (t) => `        <article class="bo-tech__card bo-reveal">
          <h3><i class="fas ${t.icon}" aria-hidden="true"></i> ${t.title}</h3>
          <div class="bo-chips">${t.items.map((i) => `<span>${i}</span>`).join('')}</div>
        </article>`
  ).join('\n');

  const bars = p.kpiBars
    .map(
      (b) => `              <div class="bo-kpi__row">
                <label><span>${esc(b.label)}</span><span>${b.value}%</span></label>
                <div class="bo-kpi__track"><div class="bo-kpi__fill" data-bo-bar="${b.value}"></div></div>
              </div>`
    )
    .join('\n');

  const tiles = p.kpiTiles
    .map(
      (t) => `            <div class="bo-kpi__tile"><strong>${esc(t.value)}</strong><span>${esc(t.label)}</span></div>`
    )
    .join('\n');

  const related = p.relatedServices
    .map((r) => `<a href="${esc(r.href)}"><i class="fas fa-arrow-right" aria-hidden="true"></i> ${esc(r.label)}</a>`)
    .join('\n          ');

  const heroMetrics = p.metrics
    .map(
      (m) => `              <div class="bo-metric"><strong data-bo-count="${m.value}" data-bo-suffix="${esc(m.suffix)}">0</strong><span>${esc(m.label)}</span></div>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="${esc(p.metaDesc)}">
  <meta name="keywords" content="${esc(p.keywords)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(p.name)} | Guudle IT Solutions">
  <meta property="og:description" content="${esc(p.metaDesc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${esc(p.ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.name)} | Guudle IT Solutions">
  <meta name="twitter:description" content="${esc(p.metaDesc)}">
  <meta name="twitter:image" content="${esc(p.ogImage)}">
  <title>${esc(p.name)} — Business Outcomes | Guudle IT Solutions</title>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
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
  <link rel="stylesheet" href="../../assets/css/business-outcomes-pages.css">
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page bo-page" data-slp-prefix="svc" data-svc-theme="bo-${esc(p.theme)}" data-bo-theme="${esc(p.theme)}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">

    <section class="bo-hero" aria-labelledby="bo-hero-heading" data-svc-hero>
      <div class="bo-hero__canvas" aria-hidden="true">
        <canvas class="bo-hero__particles"></canvas>
        <div class="bo-hero__blob bo-hero__blob--1"></div>
        <div class="bo-hero__blob bo-hero__blob--2"></div>
        <div class="bo-hero__blob bo-hero__blob--3"></div>
        <div class="bo-hero__grid"></div>
      </div>
      <div class="bo-hero__inner">
        <div class="bo-wrap">
          <div class="bo-hero__layout">
            <div data-aos="fade-up">
              <nav class="bo-hero__crumb" aria-label="Breadcrumb">
                <a href="../../index.html">Home</a> / <a href="../../index.html#services">Services</a> /
                <a href="business-outcomes-digital-platforms.html">Business Outcomes</a> /
                <span>${esc(p.name)}</span>
              </nav>
              <div class="bo-hero__badge"><i class="fas ${esc(p.heroIcon)}" aria-hidden="true"></i> ${esc(p.eyebrow)}</div>
              <h1 id="bo-hero-heading" class="bo-hero__title font-display">${esc(p.title)} <span>${esc(p.titleAccent)}</span></h1>
              <p class="bo-hero__lead">${esc(p.lead)}</p>
              <div class="bo-actions">
                <a href="../contact.html" class="bo-btn bo-btn--primary">Book Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                <a href="#svc-contact" class="bo-btn bo-btn--ghost">Talk to Experts</a>
              </div>
              <div class="bo-hero__metrics" aria-label="Key outcomes">
${heroMetrics}
              </div>
            </div>
            <div class="bo-hero__glass" data-aos="fade-left">
              <span class="bo-hero__float bo-hero__float--1"><i class="fas fa-chart-line" aria-hidden="true"></i> Measurable ROI</span>
              <span class="bo-hero__float bo-hero__float--2"><i class="fas fa-shield-halved" aria-hidden="true"></i> Enterprise Secure</span>
              <div class="bo-hero__illu" style="position:relative">
                <img src="${esc(p.heroImg)}" alt="${esc(p.name)} enterprise platform illustration" width="720" height="540" loading="eager">
                <i class="fas ${esc(p.heroIcon)} bo-hero__illu-icon" aria-hidden="true" style="position:absolute;inset:auto auto 1rem 1rem;font-size:2.5rem;color:rgba(255,255,255,.55)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#bo-challenge" class="slp-sticky-nav__link" data-svc-nav-link>Challenges</a>
        <a href="#bo-solution" class="slp-sticky-nav__link" data-svc-nav-link>Solution</a>
        <a href="#bo-capabilities" class="slp-sticky-nav__link" data-svc-nav-link>Capabilities</a>
        <a href="#bo-process" class="slp-sticky-nav__link" data-svc-nav-link>Process</a>
        <a href="#bo-benefits" class="slp-sticky-nav__link" data-svc-nav-link>Benefits</a>
        <a href="#bo-features" class="slp-sticky-nav__link" data-svc-nav-link>Features</a>
        <a href="#bo-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
        <a href="#bo-tech" class="slp-sticky-nav__link" data-svc-nav-link>Technology</a>
        <a href="#bo-why" class="slp-sticky-nav__link" data-svc-nav-link>Why Us</a>
        <a href="#bo-kpi" class="slp-sticky-nav__link" data-svc-nav-link>Success</a>
        <a href="#bo-faq" class="slp-sticky-nav__link" data-svc-nav-link>FAQ</a>
        <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
      </div>
    </nav>

    <section id="bo-challenge" class="bo-section bo-section--canvas" aria-labelledby="bo-challenge-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Business Challenges</span>
          <h2 id="bo-challenge-heading" class="bo-title font-display">Enterprise Problems Holding Back <span>Growth</span></h2>
          <p class="bo-lead">Leaders face operational friction that technology alone cannot fix — until platforms, process, and governance move together.</p>
        </header>
        <div class="bo-challenge-grid">
${challenges}
        </div>
      </div>
    </section>

    <section id="bo-solution" class="bo-section bo-section--white" aria-labelledby="bo-solution-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Enterprise Solution</span>
          <h2 id="bo-solution-heading" class="bo-title font-display">How Guudle Delivers <span>${esc(p.short)}</span></h2>
          <p class="bo-lead">${esc(p.solutionIntro)}</p>
        </header>
        <div class="bo-solution">
          <div class="bo-solution__panel" data-aos="fade-up">
            <h3 class="font-display text-lg font-bold text-[#0B1F3A] mb-3">Platform Architecture</h3>
            <div class="bo-arch">
${arch}
            </div>
          </div>
          <div class="bo-solution__panel" data-aos="fade-up" data-aos-delay="80">
            <h3 class="font-display text-lg font-bold text-[#0B1F3A] mb-2">What Changes for the Business</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-2">Architecture, automation, integrations, scalability, governance, and security are engineered as one programme — so outcomes compound instead of fragmenting across vendors.</p>
            <ul class="bo-solution__list">
              ${p.solutionPoints.map((s) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i><span>${esc(s)}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="bo-capabilities" class="bo-section bo-section--canvas" aria-labelledby="bo-capabilities-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Capabilities</span>
          <h2 id="bo-capabilities-heading" class="bo-title font-display">Capabilities That Create <span>Business Value</span></h2>
          <p class="bo-lead">Each capability pairs technical excellence with a clear operational benefit leaders can track.</p>
        </header>
        <div class="bo-cap-grid">
${caps}
        </div>
      </div>
    </section>

    <section id="bo-process" class="bo-section bo-section--white" aria-labelledby="bo-process-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Delivery Process</span>
          <h2 id="bo-process-heading" class="bo-title font-display">Interactive Enterprise <span>Timeline</span></h2>
          <p class="bo-lead">A governed path from discovery to continuous improvement — animated as you scroll.</p>
        </header>
        <div class="bo-timeline-wrap" data-aos="fade-up">
          <div class="bo-timeline" role="list">
${timeline}
          </div>
        </div>
      </div>
    </section>

    <section id="bo-benefits" class="bo-section bo-section--canvas" aria-labelledby="bo-benefits-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Business Benefits</span>
          <h2 id="bo-benefits-heading" class="bo-title font-display">Outcomes You Can <span>Measure</span></h2>
          <p class="bo-lead">Illustrative programme targets — refined during discovery against your baselines.</p>
        </header>
        <div class="bo-stats">
${stats}
        </div>
      </div>
    </section>

    <section id="bo-features" class="bo-section bo-section--white" aria-labelledby="bo-features-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Enterprise Features</span>
          <h2 id="bo-features-heading" class="bo-title font-display">Platform Features for <span>Scale</span></h2>
          <p class="bo-lead">Automation, AI, analytics, integrations, security, workflows, and cloud deployment — built for production.</p>
        </header>
        <div class="bo-feat-grid">
${feats}
        </div>
      </div>
    </section>

    <section id="bo-industries" class="bo-section bo-section--canvas" aria-labelledby="bo-industries-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Industry Applications</span>
          <h2 id="bo-industries-heading" class="bo-title font-display">Where ${esc(p.short)} <span>Creates Impact</span></h2>
          <p class="bo-lead">Sector patterns adapted to your regulatory, operational, and customer context.</p>
        </header>
        <div class="bo-ind-grid">
${inds}
        </div>
      </div>
    </section>

    <section id="bo-tech" class="bo-section bo-section--white" aria-labelledby="bo-tech-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Technology Ecosystem</span>
          <h2 id="bo-tech-heading" class="bo-title font-display">Modern Stack for <span>Enterprise Delivery</span></h2>
          <p class="bo-lead">Frontend, backend, AI, cloud, data, DevOps, security, APIs, containers, and monitoring — selected for maintainability.</p>
        </header>
        <div class="bo-tech">
${tech}
        </div>
      </div>
    </section>

    <section id="bo-why" class="bo-section bo-section--canvas" aria-labelledby="bo-why-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Why Guudle</span>
          <h2 id="bo-why-heading" class="bo-title font-display">Why Choose Us for <span>${esc(p.name)}</span></h2>
          <p class="bo-lead">Experience, innovation, scalable architecture, security-first delivery, and measurable ROI.</p>
        </header>
        <div class="bo-why-grid">
${why}
        </div>
      </div>
    </section>

    <section id="bo-kpi" class="bo-section bo-section--white" aria-labelledby="bo-kpi-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">Customer Success Metrics</span>
          <h2 id="bo-kpi-heading" class="bo-title font-display">Animated KPI <span>Dashboard</span></h2>
          <p class="bo-lead">Programme health across growth, automation, response time, engagement, and productivity.</p>
        </header>
        <div class="bo-kpi" data-aos="fade-up">
          <div class="bo-kpi__panel">
            <h3 class="font-display text-base font-bold text-[#0B1F3A]">Performance Trends</h3>
            <div class="bo-kpi__bars">
${bars}
            </div>
          </div>
          <div class="bo-kpi__tiles">
${tiles}
          </div>
        </div>
      </div>
    </section>

    <section id="bo-faq" class="bo-section bo-section--canvas" aria-labelledby="bo-faq-heading">
      <div class="bo-wrap">
        <header class="bo-head" data-aos="fade-up">
          <span class="bo-eyebrow">FAQ</span>
          <h2 id="bo-faq-heading" class="bo-title font-display">Enterprise <span>Questions</span></h2>
          <p class="bo-lead">Answers for sponsors, architects, and delivery leaders evaluating ${esc(p.name)}.</p>
        </header>
        <div class="bo-faq" data-bo-faq data-aos="fade-up">
${faqs}
        </div>
      </div>
    </section>

    <section class="bo-cta" aria-labelledby="bo-cta-heading">
      <div class="bo-cta__bg" style="background-image:url('${esc(p.ctaBg)}')" aria-hidden="true"></div>
      <div class="bo-cta__veil" aria-hidden="true"></div>
      <div class="bo-wrap">
        <h2 id="bo-cta-heading" class="font-display">${esc(p.ctaTitle)}</h2>
        <p>${esc(p.ctaBody)}</p>
        <div class="bo-actions">
          <a href="../contact.html" class="bo-btn bo-btn--primary">Book Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="#svc-contact" class="bo-btn bo-btn--ghost">Talk to Experts</a>
        </div>
      </div>
    </section>

    <section class="bo-section bo-section--white" aria-label="Solution navigation">
      <div class="bo-wrap">
        <div class="bo-nav-pair">
          <a href="${esc(prev.slug)}.html" aria-label="Previous solution: ${esc(prev.name)}">
            <small>Previous Solution</small>
            <strong><i class="fas fa-arrow-left" aria-hidden="true"></i> ${esc(prev.name)}</strong>
          </a>
          <a href="${esc(next.slug)}.html" aria-label="Next solution: ${esc(next.name)}" style="text-align:right">
            <small>Next Solution</small>
            <strong>${esc(next.name)} <i class="fas fa-arrow-right" aria-hidden="true"></i></strong>
          </a>
        </div>
        <header class="bo-head" style="margin-bottom:1rem">
          <span class="bo-eyebrow">Related Services</span>
          <h2 class="bo-title font-display" style="font-size:1.35rem">Connected Service <span>Pages</span></h2>
        </header>
        <div class="bo-related">
          ${related}
          <a href="business-outcomes-digital-platforms.html"><i class="fas fa-arrow-right" aria-hidden="true"></i> Outcomes Hub</a>
        </div>
      </div>
    </section>

    <section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-contact-grid">
          <div class="cpox-contact-aside" data-aos="fade-up">
            <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
            <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">${esc(p.short)}</span> Programme</h2>
            <p class="cpox-lead">Tell us your goals, constraints, and timeline. We respond within one business day.</p>
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
              <label for="svc-message">Project Details <span class="text-red-500">*</span></label>
              <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe outcomes, timeline, and constraints..."></textarea>
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
  <script src="../../assets/js/business-outcomes-pages.js"></script>
</body>
</html>
`;
}

let missing = [];
for (const p of pages) {
  for (const r of p.relatedServices) {
    const f = path.join(outDir, r.href);
    if (!fs.existsSync(f)) missing.push(`${p.slug} -> ${r.href}`);
  }
}
if (missing.length) {
  console.warn('Missing related service files (will still generate):');
  missing.forEach((m) => console.warn(' ', m));
}

for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  const file = path.join(outDir, `${p.slug}.html`);
  fs.writeFileSync(file, renderPage(p, i), 'utf8');
  console.log('Wrote', path.relative(root, file));
}

console.log('Done:', pages.length, 'pages');
