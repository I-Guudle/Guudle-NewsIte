/**
 * Web Development pages — CMA master template renderer (matches custom-mobile-app-development.html)
 */
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { renderEnterpriseParallaxSection } from './enterprise-parallax-render.mjs';
import {
  getWebDevEnterpriseParallaxBg,
  WEB_DEV_INTRO_PARALLAX,
  WEB_DEV_FEATURES_PARALLAX,
  WEB_DEV_CTA_PARALLAX,
} from './web-dev-parallax-images.mjs';
import { getWebDevDeepContent } from './web-dev-content-expansion.mjs';
import { enterpriseProcess, enterpriseWebIndustries } from './svc-shared-data.mjs';
import { renderEnterpriseValueSection } from './enterprise-value-section-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function glowCard({ icon, title, desc, items, delay = 0, dark = false }) {
  const list = items?.length
    ? `<ul class="cma-glow-card__list">${items.map((i) =>
      `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`
    ).join('')}</ul>`
    : '';
  return `<article class="cma-glow-card${dark ? ' cma-glow-card--dark' : ''}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="cma-glow-card__glow" aria-hidden="true"></span>
    <span class="cma-glow-card__shine" aria-hidden="true"></span>
    <span class="cma-glow-card__icon"><i class="${faIcon(icon)}" aria-hidden="true"></i></span>
    <h3 class="cma-glow-card__title">${esc(title)}</h3>
    ${desc ? `<p class="cma-glow-card__desc">${esc(desc)}</p>` : ''}
    ${list}
  </article>`;
}

function parallaxSection({ id, bg, light = false, inner }) {
  return `<section id="${id}" class="cma-parallax guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.32" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="cma-parallax__ambient" aria-hidden="true">
    <span class="cma-parallax__orb cma-parallax__orb--1"></span>
    <span class="cma-parallax__orb cma-parallax__orb--2"></span>
  </div>
  <div class="cma-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="cma-parallax__overlay${light ? ' cma-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="cma-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

const WHY_US_WEB = [
  'Enterprise-Grade Engineering',
  'Scalable Architecture',
  'Security-First Development',
  'Performance Optimization',
  'Dedicated Project Team',
  'Agile Sprint Delivery',
  'WCAG Accessibility Standards',
  'SEO-Ready Foundations',
  'Cloud-Native Deployment',
  'Long-Term Partnership',
  'Transparent Communication',
  'Post-Launch Support',
];

const ENTERPRISE_PARALLAX_COPY = {
  'website-development': {
    titleHtml: 'Enterprise Web Development <span class="ent-parallax__accent">Built to Scale</span>',
    lead: 'Modern software engineering teams architecting high-performance websites, web applications, and digital platforms — with clean code, cloud-ready infrastructure, and conversion-focused UX that drives measurable business growth.',
    floats: [{ icon: 'fa-code', label: 'Engineering' }, { icon: 'fa-cloud', label: 'Cloud Ready' }, { icon: 'fa-gauge-high', label: 'Performance' }, { icon: 'fa-shield-halved', label: 'Security' }],
  },
  'business-website': {
    titleHtml: 'Custom Websites That <span class="ent-parallax__accent">Build Trust & Convert</span>',
    lead: 'Brand-aligned corporate websites and landing pages engineered for credibility, lead capture, and long-term growth — with SEO foundations and CMS flexibility your marketing team controls.',
    floats: [{ icon: 'fa-building', label: 'Corporate' }, { icon: 'fa-bullseye', label: 'Leads' }, { icon: 'fa-palette', label: 'Brand' }, { icon: 'fa-search', label: 'SEO' }],
  },
  ecommerce: {
    titleHtml: 'E-Commerce Platforms <span class="ent-parallax__accent">Engineered to Sell</span>',
    lead: 'Online stores and commerce systems with seamless checkout, secure payments, inventory control, and conversion optimization — built for revenue growth across B2C, B2B, and marketplace models.',
    floats: [{ icon: 'fa-cart-shopping', label: 'Checkout' }, { icon: 'fa-credit-card', label: 'Payments' }, { icon: 'fa-boxes-stacked', label: 'Inventory' }, { icon: 'fa-chart-line', label: 'Growth' }],
  },
  cms: {
    titleHtml: 'CMS Platforms That <span class="ent-parallax__accent">Empower Your Team</span>',
    lead: 'Flexible content management — WordPress, headless CMS, and custom admin panels — so your team publishes, organizes, and scales digital content without developer dependency.',
    floats: [{ icon: 'fa-pen-to-square', label: 'Publishing' }, { icon: 'fa-sitemap', label: 'Content' }, { icon: 'fa-users-gear', label: 'Roles' }, { icon: 'fa-plug', label: 'Headless' }],
  },
  'frontend-development': {
    titleHtml: 'Frontend Engineering <span class="ent-parallax__accent">Users Love</span>',
    lead: 'React, Vue, and Angular interfaces with design systems, accessibility, and performance budgets — pixel-perfect UIs that load fast and delight users on every device.',
    floats: [{ icon: 'fab fa-react', label: 'React' }, { icon: 'fa-palette', label: 'Design' }, { icon: 'fa-universal-access', label: 'A11y' }, { icon: 'fa-gauge-high', label: 'Speed' }],
  },
  'backend-development': {
    titleHtml: 'Backend Systems <span class="ent-parallax__accent">Built for Scale</span>',
    lead: 'REST and GraphQL APIs, microservices, databases, and cloud deployment — secure server-side architecture that powers web and mobile products under real-world load.',
    floats: [{ icon: 'fa-server', label: 'APIs' }, { icon: 'fa-database', label: 'Data' }, { icon: 'fa-diagram-project', label: 'Microservices' }, { icon: 'fa-cloud', label: 'Cloud' }],
  },
  'full-stack-development': {
    titleHtml: 'Full-Stack Delivery <span class="ent-parallax__accent">One Team, Complete</span>',
    lead: 'Integrated squads owning UI, APIs, databases, and DevOps — eliminating handoff friction and accelerating time to market for SaaS, portals, and web applications.',
    floats: [{ icon: 'fa-layer-group', label: 'Unified' }, { icon: 'fa-users', label: 'Squad' }, { icon: 'fa-rocket', label: 'Delivery' }, { icon: 'fa-arrows-spin', label: 'Agile' }],
  },
  'marketplace-development': {
    titleHtml: 'Marketplace Platforms <span class="ent-parallax__accent">Connect & Scale</span>',
    lead: 'Multi-vendor commerce ecosystems with vendor onboarding, payment splitting, trust systems, and admin tools — designed for two-sided growth across categories and geographies.',
    floats: [{ icon: 'fa-store', label: 'Vendors' }, { icon: 'fa-handshake', label: 'Buyers' }, { icon: 'fa-credit-card', label: 'Payouts' }, { icon: 'fa-star', label: 'Trust' }],
  },
  'web-portal-development': {
    titleHtml: 'Secure Web Portals <span class="ent-parallax__accent">Centralized Access</span>',
    lead: 'Customer, partner, and employee portals with SSO, role-based access, self-service tools, and workflow automation — reducing support load and improving satisfaction.',
    floats: [{ icon: 'fa-key', label: 'SSO' }, { icon: 'fa-users-gear', label: 'Roles' }, { icon: 'fa-file-lines', label: 'Documents' }, { icon: 'fa-headset', label: 'Support' }],
  },
  'cloud-solutions': {
    titleHtml: 'Cloud Infrastructure <span class="ent-parallax__accent">Reliable & Secure</span>',
    lead: 'AWS, Azure, and GCP architecture — migration, DevOps, managed hosting, and cost optimization — keeping your web platforms available, scalable, and protected.',
    floats: [{ icon: 'fab fa-aws', label: 'AWS' }, { icon: 'fa-server', label: 'Hosting' }, { icon: 'fa-dharmachakra', label: 'Kubernetes' }, { icon: 'fa-shield-halved', label: 'Security' }],
  },
  'seo-digital-optimization': {
    titleHtml: 'SEO & Optimization <span class="ent-parallax__accent">Rank & Convert</span>',
    lead: 'Technical SEO, content strategy, Core Web Vitals, and conversion optimization — sustainable organic growth tied to qualified traffic and measurable business outcomes.',
    floats: [{ icon: 'fa-magnifying-glass', label: 'SEO' }, { icon: 'fa-key', label: 'Keywords' }, { icon: 'fa-gauge-high', label: 'Speed' }, { icon: 'fa-chart-line', label: 'CRO' }],
  },
  'maintenance-support': {
    titleHtml: 'Website Care <span class="ent-parallax__accent">Always On</span>',
    lead: 'Proactive maintenance, security updates, performance monitoring, and dedicated support — your extended web operations team keeping digital assets running flawlessly.',
    floats: [{ icon: 'fa-tools', label: 'Updates' }, { icon: 'fa-shield-halved', label: 'Security' }, { icon: 'fa-database', label: 'Backups' }, { icon: 'fa-headset', label: 'Support' }],
  },
  'ui-ux-design': {
    titleHtml: 'UI/UX Design <span class="ent-parallax__accent">Experiences That Delight</span>',
    lead: 'User research, wireframes, prototypes, and design systems — interfaces that reduce friction, increase engagement, and support your brand across web and mobile.',
    floats: [{ icon: 'fa-users', label: 'Research' }, { icon: 'fa-pencil', label: 'Wireframes' }, { icon: 'fa-flask', label: 'Prototypes' }, { icon: 'fa-swatchbook', label: 'Systems' }],
  },
  'website-security': {
    titleHtml: 'Web Security <span class="ent-parallax__accent">Protect What Matters</span>',
    lead: 'Vulnerability assessments, WAF deployment, penetration testing, and incident response — comprehensive protection for web applications, data, and users.',
    floats: [{ icon: 'fa-shield-halved', label: 'WAF' }, { icon: 'fa-lock', label: 'SSL' }, { icon: 'fa-bug', label: 'Pentest' }, { icon: 'fa-bell', label: 'Monitoring' }],
  },
  'legacy-modernization': {
    titleHtml: 'Modernization <span class="ent-parallax__accent">Without Disruption</span>',
    lead: 'Phased legacy migration, cloud re-platforming, and API wrapping — transforming outdated systems into maintainable, cloud-native platforms while operations continue.',
    floats: [{ icon: 'fa-arrows-rotate', label: 'Migration' }, { icon: 'fa-cloud', label: 'Cloud' }, { icon: 'fa-code', label: 'Refactor' }, { icon: 'fa-vial', label: 'Testing' }],
  },
  'emerging-web-technologies': {
    titleHtml: 'Next-Gen Web Tech <span class="ent-parallax__accent">Stay Ahead</span>',
    lead: 'AI integration, progressive web apps, WebAssembly, and edge computing — cutting-edge web capabilities that differentiate your products in competitive markets.',
    floats: [{ icon: 'fa-robot', label: 'AI' }, { icon: 'fa-mobile-screen', label: 'PWA' }, { icon: 'fa-bolt', label: 'Real-Time' }, { icon: 'fa-microchip', label: 'Innovation' }],
  },
};

function whyBenefitsFor(page) {
  const fromHighlights = page.overview?.highlights || [];
  const generic = [
    'Launch faster with proven engineering methodologies',
    'Improve site performance and Core Web Vitals scores',
    'Reduce technical debt with scalable architecture',
    'Increase conversions with UX-focused development',
    'Strengthen security and compliance readiness',
    'Enable content teams with flexible CMS solutions',
    'Integrate seamlessly with CRM, ERP, and third-party APIs',
    'Gain a long-term development partner beyond launch',
  ];
  const merged = [...fromHighlights, ...generic].slice(0, 8);
  return merged;
}

function enrichServiceDesc(f, page) {
  const label = page.title;
  return `${f.desc} Our ${label} engineers implement proven frameworks with clean architecture, rigorous testing, and performance optimization — ensuring every deliverable supports scalability, security, and long-term maintainability. We document technical decisions, align with your internal teams, and report progress in language stakeholders can act on immediately. Each capability maps to business outcomes — conversion, operational efficiency, and digital transformation goals.`;
}

function featureItems(f) {
  if (f.points?.length) return f.points;
  return [
    'Architecture aligned to your scale and integration needs',
    'Implementation with senior engineers and QA discipline',
    'Performance, accessibility, and security validation',
    'Documentation and knowledge transfer included',
  ];
}

/**
 * @param {object} page — WEB_DEV_PAGES entry with slug
 */
export function renderWebDevCmaMain(page) {
  const slug = page.slug;
  const epCopy = ENTERPRISE_PARALLAX_COPY[slug] || {
    titleHtml: `${esc(page.title)} <span class="ent-parallax__accent">That Delivers Results</span>`,
    lead: page.subhead,
    floats: [{ icon: 'fa-chart-line', label: 'ROI' }, { icon: 'fa-bullseye', label: 'Strategy' }, { icon: 'fa-robot', label: 'Automation' }, { icon: 'fa-chart-bar', label: 'Analytics' }],
  };

  const headlineLine2 = page.headlineAccent || '';
  const h1Html = headlineLine2
    ? `${esc(page.headline)}<br class="hidden sm:block"><span class="block sm:inline mt-2 sm:mt-0 hero-title-navy__line hero-title-navy__line--inline">${esc(headlineLine2)}</span>`
    : esc(page.headline);

  const hero = `<section id="cma-hero" class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--center" aria-labelledby="cma-hero-heading" data-svc-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="py-14 lg:py-20">
          <div class="max-w-4xl mx-auto text-center">
            <nav class="text-sm text-slate-500 mb-7 flex flex-wrap justify-center" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">${esc(page.title)}</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7 mx-auto" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>${esc(page.badge)}</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <h1 id="cma-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5 text-center mx-auto" data-aos="fade-up" data-aos-delay="50">${h1Html}</h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">${esc(page.subhead)}</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9 justify-center" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Get Started Today <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-calendar-check text-cyan-600"></i> Book Free Consultation</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid hero-enterprise-grid--center" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-code" aria-hidden="true"></i></span><div><strong>Modern Stack</strong><p>React, Node.js, and cloud-native engineering.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><div><strong>Enterprise Security</strong><p>Security-first architecture and compliance readiness.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-gauge-high" aria-hidden="true"></i></span><div><strong>High Performance</strong><p>Core Web Vitals and Lighthouse optimization.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-users" aria-hidden="true"></i></span><div><strong>Dedicated Team</strong><p>Senior engineers on your project from day one.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;

  const introBg = WEB_DEV_INTRO_PARALLAX[slug] || WEB_DEV_INTRO_PARALLAX['website-development'];
  const overviewExtra = ` Guudle IT Solutions combines strategic consulting with hands-on engineering — senior developers, UX specialists, and DevOps engineers working as one accountable unit. We audit current platforms, define scalable architecture, build with modern frameworks, and optimize continuously for performance and security. Every engagement includes documentation, analytics setup, and executive summaries tied to launch milestones, technical quality, and business outcomes.`;
  const intro = parallaxSection({
    id: 'cma-intro',
    bg: introBg,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-code" aria-hidden="true"></i> ${esc(page.badge)}</span>
        <h2 id="cma-intro-heading" class="cma-title">${esc(page.overview?.title || page.title)} <span style="color:#10A5F5">By Guudle</span></h2>
        <p class="cma-lead">${esc((page.overview?.text || '') + overviewExtra)}</p>
        <p class="cma-lead mt-4">Whether you are launching a new digital product or modernizing an existing platform, our ${esc(page.title)} services align every technical decision to business outcomes — reducing risk, improving user experience, and building web assets that scale with your organization.</p>
      </header>
    </div>`,
  });

  const whyBenefits = whyBenefitsFor(page);
  const whySection = `<section id="cma-why" class="py-20 sm:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Your Business Needs ${esc(page.title)}</h2>
        <p class="cma-lead">Professional ${esc(page.title.toLowerCase())} enables your organization to reach buyers, build trust, and convert demand into measurable revenue.</p>
      </header>
      <div class="cma-check-grid">${whyBenefits.map((b, i) =>
        `<div class="cma-check-item" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 280)}"><i class="fas fa-circle-check" aria-hidden="true"></i>${esc(b)}</div>`
      ).join('')}</div>
    </div>
  </section>`;

  const features = page.features || [];
  const servicesSection = `<section id="cma-services" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-layer-group" aria-hidden="true"></i> Our Services</span>
        <h2 class="cma-title">Our ${esc(page.title)} Services</h2>
        <p class="cma-lead">Comprehensive ${esc(page.title.toLowerCase())} capabilities — strategy, execution, analytics, and optimization under one accountable team.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${features.map((f, i) =>
        glowCard({
          icon: f.icon,
          title: f.title,
          desc: enrichServiceDesc(f, page),
          items: featureItems(f),
          delay: i * 55,
        })
      ).join('')}</div>
    </div>
  </section>`;

  const enterpriseParallax = renderEnterpriseParallaxSection({
    slug,
    bgUrl: getWebDevEnterpriseParallaxBg(slug),
    bgAlt: `${page.title} — enterprise web development parallax background`,
    badge: page.badge,
    badgeIcon: 'fa-code',
    titleHtml: epCopy.titleHtml,
    lead: epCopy.lead,
    floatIcons: epCopy.floats,
    primaryCta: 'Get Started Today',
    secondaryCta: 'Book Free Consultation',
  });

  const techGroups = (page.tech || []).reduce((acc, t, i) => {
    const gi = Math.floor(i / 3);
    if (!acc[gi]) acc[gi] = { icon: 'fa-plug', title: gi === 0 ? 'Frameworks & Languages' : gi === 1 ? 'Cloud & DevOps' : 'Tools & Platforms', items: [] };
    acc[gi].items.push(t.name);
    return acc;
  }, []);
  const featureCards = techGroups.length
    ? techGroups.map((g, i) => glowCard({ ...g, dark: true, delay: i * 50 }))
    : features.slice(0, 6).map((f, i) => glowCard({ icon: f.icon, title: f.title, desc: f.desc, items: featureItems(f).slice(0, 4), dark: true, delay: i * 50 }));

  const featuresParallax = parallaxSection({
    id: 'cma-features',
    bg: WEB_DEV_FEATURES_PARALLAX[slug] || WEB_DEV_FEATURES_PARALLAX['website-development'],
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head cma-section-head--light" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-microchip" aria-hidden="true"></i> Key Features</span>
        <h2 id="cma-features-heading" class="cma-title">Technologies & Capabilities for ${esc(page.title)}</h2>
        <p class="cma-lead">Modern frameworks, cloud platforms, and engineering practices — integrated into scalable web solutions built for performance, security, and long-term growth.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${featureCards.join('')}</div>
    </div>`,
  });

  const industriesSection = renderIndustriesParallaxSection({
    industries: enterpriseWebIndustries,
    slug,
    sectionId: 'cma-industries',
    contactLink: '#svc-contact',
    lead: `We deliver ${page.title.toLowerCase()} across regulated, competitive, and high-growth sectors — with compliance-aware architecture and UX built for your industry's workflows.`,
    pathPrefix: '../../',
  });

  const processHub = renderProcessHubCta({
    linkPrefix: '../',
    badge: 'Development Process',
    title: 'Our Proven Development Process',
    desc: 'Discovery, strategy, architecture, design, development, testing, deployment, and support — discover how our engineers transform requirements into production-ready web platforms.',
    btn: 'Explore Our Development Process',
  });

  const deep = getWebDevDeepContent(slug);
  const closingPara = `Partner with Guudle IT Solutions for ${page.title.toLowerCase()} that combines strategic clarity, engineering excellence, and long-term support — the same enterprise discipline trusted by growth-stage startups and global organizations alike. Request a consultation to receive a tailored roadmap, technical assessment, and transparent proposal aligned to your goals, timeline, and budget. Our onboarding process is efficient, collaborative, and designed to deliver early milestones within the first sprint cycle.`;
  const deepSection = `<section id="cma-deep-dive" class="py-20 sm:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-book-open" aria-hidden="true"></i> In Depth</span>
        <h2 class="cma-title">${esc(deep.title)}</h2>
      </header>
      <div class="max-w-4xl mx-auto space-y-6">${[...deep.paragraphs, closingPara].map((para, i) =>
        `<p class="cma-lead${i > 0 ? ' mt-0' : ''}" data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 300)}">${esc(para)}</p>`
      ).join('')}</div>
    </div>
  </section>`;

  const processSteps = enterpriseProcess || [];
  const stepIcons = ['fa-compass', 'fa-magnifying-glass', 'fa-chess', 'fa-calendar-days', 'fa-pen-ruler', 'fa-rocket', 'fa-gauge-high', 'fa-sliders', 'fa-chart-bar', 'fa-arrow-trend-up'];
  const processSection = `<section id="cma-process" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-route" aria-hidden="true"></i> Our Process</span>
        <h2 class="cma-title">How We Deliver ${esc(page.title)}</h2>
        <p class="cma-lead">A proven methodology from discovery through scaling — transparent milestones, accountable KPIs, and continuous optimization at every stage.</p>
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${processSteps.map((step, i) =>
        `<article class="cma-glow-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 360)}">
          <span class="cma-glow-card__glow" aria-hidden="true"></span>
          <span class="cma-glow-card__icon"><i class="fas ${stepIcons[i % stepIcons.length]}" aria-hidden="true"></i></span>
          <h3 class="cma-glow-card__title">${esc(step.t)}</h3>
          <p class="cma-glow-card__desc">${esc(step.d)} ${esc(step.detail || '')}</p>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const valueSection = renderEnterpriseValueSection(
    { slug, sectionTitles: page.sectionTitles },
    {
      sectionId: 'cma-value',
      slug,
      badge: 'Why Choose Us',
      title: 'Why Businesses Choose Us',
      accent: 'Us',
      lead: `Enterprise-grade ${esc(page.title)} focused on engineering quality, scalability, and long-term partnership — not vanity metrics.`,
    },
  );

  const testimonialsSection = `<section id="cma-testimonials" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-quote-left" aria-hidden="true"></i> Client Success</span>
        <h2 class="cma-title">What Our Clients Say</h2>
        <p class="cma-lead">Enterprise leaders trust Guudle IT Solutions for ${esc(page.title.toLowerCase())} that delivers measurable business impact.</p>
      </header>
      <div class="grid md:grid-cols-3 gap-6">${[
    { quote: 'Guudle rebuilt our web platform from the ground up — faster load times, cleaner architecture, and a CMS our marketing team actually uses every day.', name: 'Sarah Chen', role: 'VP Digital', company: 'FinScale Technologies' },
    { quote: 'Their engineering team operates like an extension of ours — transparent sprints, rigorous QA, and deliverables that consistently meet our launch deadlines.', name: 'Marcus Webb', role: 'CTO', company: 'NovaRetail Group' },
    { quote: 'From discovery through deployment, every layer was thoughtfully architected. We launched on schedule with a platform built to scale.', name: 'Priya Sharma', role: 'Director of Product', company: 'HealthBridge Systems' },
  ].map((t, i) =>
    `<blockquote class="cma-glow-card" data-aos="fade-up" data-aos-delay="${i * 70}">
      <span class="cma-glow-card__glow" aria-hidden="true"></span>
      <div class="cpox-testimonial__stars mb-3" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p class="cma-glow-card__desc">"${esc(t.quote)}"</p>
      <footer class="mt-4 text-sm"><strong>${esc(t.name)}</strong><br><span class="text-slate-500">${esc(t.role)}, ${esc(t.company)}</span></footer>
    </blockquote>`
  ).join('')}</div>
    </div>
  </section>`;

  const whyUsSection = `<section id="cma-why-us" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Choose Guudle for ${esc(page.title)}?</h2>
        <p class="cma-lead">Certified experts, modern engineering practices, and transparent delivery — built for scalable web platforms and long-term partnership.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-4 gap-4">${WHY_US_WEB.map((w, i) =>
        `<article class="cma-glow-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 35, 350)}">
          <span class="cma-glow-card__glow" aria-hidden="true"></span>
          <span class="cma-glow-card__shine" aria-hidden="true"></span>
          <span class="cma-glow-card__icon"><i class="fas fa-check" aria-hidden="true"></i></span>
          <h3 class="cma-glow-card__title">${esc(w)}</h3>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const faqSection = renderEnterpriseFaqSection({
    id: 'cma-faq',
    badge: 'FAQ',
    title: `Frequently Asked Questions — ${page.title}`,
    subtitle: `Common questions about our ${page.title.toLowerCase()} services.`,
    faqs: page.faqs || [],
    aos: true,
  });

  const ctaParallax = parallaxSection({
    id: 'cma-cta',
    bg: WEB_DEV_CTA_PARALLAX[slug] || WEB_DEV_CTA_PARALLAX['website-development'],
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 cma-cta-band" data-aos="fade-up">
      <h2 id="cma-cta-heading">${esc(page.cta || `Ready to Build with ${page.title}?`)}</h2>
      <p>${esc(page.ctaSubtext || `Partner with Guudle IT Solutions for enterprise-grade ${page.title.toLowerCase()} — scalable, secure, and built for long-term success.`)}</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="../contact.html" class="cma-btn-primary">Get Started Today <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="#svc-contact" class="cma-btn-outline"><i class="fas fa-calendar-check" aria-hidden="true"></i> Book Free Consultation</a>
      </div>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="cpox-contact-grid">
        <div class="cpox-contact-aside" data-aos="fade-up">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
          <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">${esc(page.title)}</span> Project</h2>
          <p class="cpox-lead">Tell us about your web project. We respond within one business day.</p>
          <ul class="cpox-contact-list">
            <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
            <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:+447908727559">07908 727559</a></li>
            <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
          </ul>
        </div>
        <form id="svc-contact-form" class="cpox-contact-form" data-aos="fade-up" data-aos-delay="80" novalidate>
          <div data-slp-field>
            <label for="svc-name">Full Name <span class="text-red-500">*</span></label>
            <input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name" autocomplete="name">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-email">Work Email <span class="text-red-500">*</span></label>
            <input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com" autocomplete="email">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-message">Project Details <span class="text-red-500">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your web project goals and timeline..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  const related = page.related || [];
  const relatedSection = related.length ? `<section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
      <div class="flex flex-wrap gap-3">${related.map((r) =>
        `<a href="${esc(r.href)}" class="svc-related__link"><i class="fas fa-arrow-right"></i>${esc(r.label)}</a>`
      ).join('')}</div>
    </div>
  </section>` : '';

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
    <div class="slp-sticky-nav__inner">
      <a href="#cma-intro" class="slp-sticky-nav__link" data-svc-nav-link>Overview</a>
      <a href="#cma-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
      <a href="#cma-enterprise-parallax" class="slp-sticky-nav__link" data-svc-nav-link>Enterprise</a>
      <a href="#cma-features" class="slp-sticky-nav__link" data-svc-nav-link>Technologies</a>
      <a href="#cma-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
      <a href="#cma-testimonials" class="slp-sticky-nav__link" data-svc-nav-link>Testimonials</a>
      <a href="#cma-faq" class="slp-sticky-nav__link" data-svc-nav-link>FAQ</a>
      <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
    </div>
  </nav>`;

  return `
    ${hero}
    ${stickyNav}
    ${intro}
    ${whySection}
    ${servicesSection}
    ${enterpriseParallax}
    ${featuresParallax}
    ${valueSection}
    ${industriesSection}
    ${processHub}
    ${processSection}
    ${deepSection}
    ${whyUsSection}
    ${testimonialsSection}
    ${faqSection}
    ${ctaParallax}
    ${contactSection}
    ${relatedSection}
  `;
}

export function renderWebDevFaqsJsonLd(faqs) {
  return (faqs || []).map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}
