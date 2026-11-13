/**
 * Builds redesigned pages/services/ai.html
 * Light professional layout, classic enterprise hero, 2×2 Capabilities grid.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { defaultIndustries } from './svc-shared-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'pages', 'services', 'ai.html');

const industriesHtml = renderIndustriesParallaxSection({
  industries: defaultIndustries,
  sectionId: 'svc-industries',
  contactLink: '../contact.html',
  industriesLink: '../industries.html',
}).trim();

const IMG = {
  hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=85&auto=format&fit=crop',
  overview: 'https://images.unsplash.com/photo-1676299080924-c9c6a3820b27?w=1000&q=82&auto=format&fit=crop',
  features: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1920&q=85&auto=format&fit=crop',
  process: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=85&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=85&auto=format&fit=crop',
};

const services = [
  { badge: 'Core AI', icon: 'fa-brain', title: 'AI Development', desc: 'Production-grade ML systems, MLOps, and end-to-end AI engineering from data to deployment.', href: 'ai-development.html' },
  { badge: 'GenAI', icon: 'fa-wand-magic-sparkles', title: 'Generative AI Development', desc: 'LLM copilots, content engines, and governed generative AI with brand-safe guardrails.', href: 'generative-ai.html' },
  { badge: 'Agents', icon: 'fa-robot', title: 'AI Agent Development', desc: 'Autonomous agents with tool use, planning loops, and human-in-the-loop checkpoints.', href: 'ai-agent-development.html' },
  { badge: 'Orchestration', icon: 'fa-users-gear', title: 'AI Multi-Agent Systems', desc: 'Supervisor-worker topologies and specialist agent teams for complex enterprise workflows.', href: 'ai-multi-agent-agents.html' },
  { badge: 'Automation', icon: 'fa-gears', title: 'AI Automation', desc: 'Intelligent process automation combining RPA, LLMs, and workflow engines.', href: 'ai-automation.html' },
  { badge: 'Chat &amp; Voice', icon: 'fa-comments', title: 'Conversational AI', desc: 'Enterprise chatbots and voice assistants with RAG grounding and seamless handoff.', href: 'conversational-ai.html' },
  { badge: 'ML Engineering', icon: 'fa-chart-line', title: 'Machine Learning Solutions', desc: 'Custom predictive models, feature stores, and production MLOps pipelines.', href: 'machine-learning.html' },
  { badge: 'Vision AI', icon: 'fa-eye', title: 'Computer Vision', desc: 'Object detection, OCR, quality inspection, and edge-deployed vision systems.', href: 'computer-vision.html' },
  { badge: 'RPA', icon: 'fa-robot', title: 'RPA Development', desc: 'UiPath and Power Automate bots that eliminate repetitive manual work at scale.', href: 'rpa-development.html' },
  { badge: 'Strategy', icon: 'fa-lightbulb', title: 'AI Consulting', desc: 'AI readiness assessments, use-case prioritization, and responsible adoption roadmaps.', href: 'ai-consulting.html' },
  { badge: 'Integration', icon: 'fa-plug', title: 'AI Integration', desc: 'Embed models and copilots into CRM, ERP, data platforms, and customer products.', href: 'ai-integration.html' },
  { badge: 'Enterprise', icon: 'fa-building', title: 'Enterprise AI Solutions', desc: 'Governed AI platforms with model registry, SSO, multi-tenancy, and compliance.', href: 'enterprise-ai.html' },
  { badge: 'AI Products', icon: 'fa-cube', title: 'AI Product Engineering', desc: 'AI-native SaaS products from MVP to scale with billing, multi-tenancy, and growth analytics.', href: 'ai-product-engineering.html' },
  { badge: 'LLMs', icon: 'fa-microchip', title: 'LLM Development', desc: 'Fine-tuning, deployment, and governance of domain-specific large language models.', href: 'llm-development.html' },
  { badge: 'RAG', icon: 'fa-database', title: 'RAG Development', desc: 'Retrieval-augmented generation with vector search, citations, and access-controlled knowledge.', href: 'rag-development.html' },
];

const why = [
  { icon: 'fa-building-columns', title: 'Enterprise Delivery', desc: 'Fortune-grade engineering practices, documentation, and governance on every engagement.', cta: 'See how we deliver', href: '#svc-process-hub' },
  { icon: 'fa-user-tie', title: 'Senior Specialists', desc: 'Architects and leads with deep domain experience — not junior bench rotations.', cta: 'Work with specialists', href: '#svc-aiServices' },
  { icon: 'fa-shield-halved', title: 'Security &amp; Compliance', desc: 'Security-first design with audit trails, encryption, and regulatory awareness.', cta: 'Review our security', href: '#svc-benefits' },
  { icon: 'fa-chart-line', title: 'Measurable ROI', desc: 'KPIs defined upfront and tracked through launch with transparent reporting.', cta: 'Explore outcomes', href: '#svc-testimonials' },
];

/** Exactly 4 items → 2 rows × 2 columns */
const capabilities = [
  {
    num: '01',
    icon: 'fa-wand-magic-sparkles',
    title: 'Generative AI &amp; LLMs',
    summary: 'Copilots, fine-tuning, and governed GenAI on OpenAI, Claude, Gemini, and private models.',
    detail: 'Our specialists implement governed GenAI with proven frameworks, transparent reporting, and measurable KPIs aligned to your business goals.',
    bullets: ['Model selection, training, and validation workflows', 'Secure API integration with guardrails', 'Continuous improvement from production feedback'],
  },
  {
    num: '02',
    icon: 'fa-robot',
    title: 'Agents &amp; Automation',
    summary: 'Single and multi-agent systems with tool use, RPA, and intelligent process automation.',
    detail: 'Autonomous agents and automation pipelines designed for enterprise workflows with human-in-the-loop controls where it matters.',
    bullets: ['Tool-using agents with planning loops', 'RPA + LLM hybrid automation', 'Supervisor-worker multi-agent topologies'],
  },
  {
    num: '03',
    icon: 'fa-chart-line',
    title: 'Machine Learning &amp; Vision',
    summary: 'Custom models, feature stores, drift monitoring, OCR, and edge-deployed vision systems.',
    detail: 'Production ML and computer vision engineered for reliability — from training pipelines to monitored inference.',
    bullets: ['Predictive models and feature stores', 'Detection, OCR, and quality inspection', 'Drift monitoring and MLOps pipelines'],
  },
  {
    num: '04',
    icon: 'fa-database',
    title: 'RAG &amp; Enterprise Platforms',
    summary: 'Vector search, citation-backed Q&amp;A, model registry, SSO, and regulatory alignment.',
    detail: 'Knowledge assistants and governed AI platforms built for security, multi-tenancy, and compliance from day one.',
    bullets: ['Citation-backed retrieval and access control', 'Model registry and SSO integration', 'Audit trails and compliance readiness'],
  },
];

const deliveryServices = [
  { icon: 'fa-compass', title: 'Consulting &amp; Strategy', desc: 'Roadmaps, architecture, and feasibility assessments.', cta: 'Plan your roadmap' },
  { icon: 'fa-pen-ruler', title: 'Design &amp; Prototyping', desc: 'UX flows, wireframes, and interactive prototypes.', cta: 'Start with a prototype' },
  { icon: 'fa-code', title: 'Implementation', desc: 'Full-stack development with agile delivery.', cta: 'Build with our team' },
  { icon: 'fa-vial', title: 'QA &amp; Testing', desc: 'Automated testing, security review, and UAT support.', cta: 'See our QA approach' },
  { icon: 'fa-cloud', title: 'Cloud Deployment', desc: 'CI/CD, monitoring, and scalable infrastructure.', cta: 'Deploy with confidence' },
  { icon: 'fa-headset', title: 'Support &amp; Growth', desc: 'Maintenance, optimization, and feature iteration.', cta: 'Talk about support' },
];

const benefits = [
  { icon: 'fa-bullseye', title: 'Measurable Outcomes', desc: 'Solutions aligned to business KPIs and long-term growth.' },
  { icon: 'fa-shield-halved', title: 'Enterprise Security', desc: 'Security-first architecture with compliance readiness.' },
  { icon: 'fa-arrows-spin', title: 'Agile Delivery', desc: 'Transparent sprints with continuous stakeholder feedback.' },
  { icon: 'fa-handshake', title: 'Dedicated Support', desc: 'Long-term partnership beyond launch day.' },
];

const testimonials = [
  { quote: 'Guudle delivered on time with enterprise quality. Our platform scaled seamlessly through peak demand.', name: 'Sarah Chen', role: 'CTO, FinScale Technologies' },
  { quote: 'Their team integrated with ours like an extension of our engineering org. Communication was exceptional.', name: 'Marcus Webb', role: 'VP Engineering, NovaRetail Group' },
  { quote: 'From discovery to deployment, every milestone was clear. We saw measurable business impact within weeks.', name: 'Priya Sharma', role: 'Director of Digital, HealthBridge Systems' },
];

const svcCards = services
  .map(
    (s, i) => `<a href="${s.href}" class="ai-svc-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 40}">
          <span class="ai-svc-card__badge">${s.badge}</span>
          <span class="ai-svc-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
          <h3 class="ai-svc-card__title">${s.title}</h3>
          <p class="ai-svc-card__desc">${s.desc}</p>
          <span class="ai-svc-card__cta">Explore service <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
        </a>`
  )
  .join('\n        ');

const whyCards = why
  .map(
    (w, i) => `<article class="ai-info-card" data-aos="fade-up" data-aos-delay="${i * 40}">
          <div class="ai-info-card__icon"><i class="fas ${w.icon}" aria-hidden="true"></i></div>
          <h3>${w.title}</h3>
          <p>${w.desc}</p>
          <a href="${w.href}">${w.cta} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </article>`
  )
  .join('\n        ');

const capCards = capabilities
  .map(
    (c, i) => `<article class="ai-cap-card" data-aos="fade-up" data-aos-delay="${(i % 2) * 60}">
          <div class="ai-cap-card__top">
            <span class="ai-cap-card__num">${c.num}</span>
            <div>
              <h3>${c.title}</h3>
              <p class="ai-cap-card__summary">${c.summary}</p>
            </div>
            <span class="ai-cap-card__icon"><i class="fas ${c.icon}" aria-hidden="true"></i></span>
          </div>
          <p class="ai-cap-card__detail">${c.detail}</p>
          <ul>${c.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </article>`
  )
  .join('\n        ');

const deliveryCards = deliveryServices
  .map(
    (s, i) => `<article class="ai-info-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 40}">
          <div class="ai-info-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <a href="#svc-contact">${s.cta} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </article>`
  )
  .join('\n        ');

const benefitCards = benefits
  .map(
    (b, i) => `<article class="ai-info-card" data-aos="fade-up" data-aos-delay="${i * 40}">
          <div class="ai-info-card__icon"><i class="fas ${b.icon}" aria-hidden="true"></i></div>
          <h3>${b.title}</h3>
          <p>${b.desc}</p>
        </article>`
  )
  .join('\n        ');

const quoteCards = testimonials
  .map(
    (t, i) => `<blockquote class="ai-quote" data-aos="fade-up" data-aos-delay="${i * 60}">
          <div class="ai-quote__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p>"${t.quote}"</p>
          <footer><strong>${t.name}</strong><span>${t.role}</span></footer>
        </blockquote>`
  )
  .join('\n        ');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="AI & Emerging Technologies hub — generative AI, agents, ML, computer vision, RPA, LLM, RAG, and enterprise AI services by Guudle IT Solutions.">
  <meta name="keywords" content="AI Services, Generative AI, Machine Learning, AI Agents, Enterprise AI, Guudle IT Solutions">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/ai.html">
  <meta property="og:title" content="AI & Emerging Technologies | Guudle IT Solutions">
  <meta property="og:description" content="AI & Emerging Technologies hub — generative AI, agents, ML, computer vision, RPA, LLM, RAG, and enterprise AI services by Guudle IT Solutions.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/ai.html">
  <meta property="og:image" content="${IMG.hero.replace('w=1920', 'w=900')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AI & Emerging Technologies | Guudle IT Solutions">
  <meta name="twitter:description" content="AI & Emerging Technologies hub — generative AI, agents, ML, computer vision, RPA, LLM, RAG, and enterprise AI services by Guudle IT Solutions.">
  <meta name="twitter:image" content="${IMG.hero.replace('w=1920', 'w=900')}">
  <title>AI & Emerging Technologies | Guudle IT Solutions</title>
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Service","name":"AI & Emerging Technologies","description":"AI & Emerging Technologies hub — generative AI, agents, ML, computer vision, RPA, LLM, RAG, and enterprise AI services by Guudle IT Solutions.","provider":{"@type":"Organization","name":"Guudle IT Solutions","url":"https://guudle.com"},"areaServed":"Worldwide","url":"https://guudle.com/pages/services/ai.html"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://guudle.com/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://guudle.com/pages/services/"},{"@type":"ListItem","position":3,"name":"AI & Emerging Technologies","item":"https://guudle.com/pages/services/ai.html"}]}]}</script>
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
  <link rel="stylesheet" href="../../assets/css/svc-capabilities.css">
  <link rel="stylesheet" href="../../assets/css/dev-process.css">
  <link rel="stylesheet" href="../../assets/css/process-hub-cta.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">
  <link rel="stylesheet" href="../../assets/css/benefits-section.css">
  <link rel="stylesheet" href="../../assets/css/home.css">
  <link rel="stylesheet" href="../../assets/css/svc-corpox.css">
  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">
  <link rel="stylesheet" href="../../assets/css/ai-page.css">
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page ai-page" data-slp-prefix="svc" data-svc-theme="ai-hub">
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
                <img src="${IMG.hero.replace('w=1920', 'w=900')}" alt="AI &amp; Emerging Technologies — enterprise AI solutions by Guudle IT Solutions" width="640" height="800" loading="eager" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-shield-halved"></i> Governed AI</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-gauge-high"></i> Production MLOps</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-[#002080] font-semibold">AI &amp; Emerging Technologies</span>
            </nav>

            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>Enterprise AI Hub</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>

            <h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">AI &amp; Emerging Tech <span class="block mt-2 hero-title-navy__line">Built for Enterprise Scale</span></h1>

            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">Your gateway to fifteen specialized AI practices — generative AI, agents, machine learning, computer vision, RPA, and enterprise platforms — engineered for production scale.</p>

            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Get Started <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <i class="fas fa-calendar-check text-cyan-600"></i> Book a Strategy Session
              </a>
            </div>

            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                <div>
                  <strong>Governed AI</strong>
                  <p>Security, compliance, and responsible AI by design.</p>
                </div>
              </article>
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-gauge-high" aria-hidden="true"></i></span>
                <div>
                  <strong>Production MLOps</strong>
                  <p>Monitored inference, drift detection, and retraining.</p>
                </div>
              </article>
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-users-gear" aria-hidden="true"></i></span>
                <div>
                  <strong>Senior Specialists</strong>
                  <p>Architects, data scientists, and ML engineers.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-divider" aria-hidden="true">
        <span class="hero-divider__line"></span>
        <span class="hero-divider__gem"></span>
        <span class="hero-divider__line"></span>
      </div>
    </section>

    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#svc-aiServices" class="slp-sticky-nav__link" data-svc-nav-link>AI Services</a>
        <a href="#svc-overview" class="slp-sticky-nav__link" data-svc-nav-link>Introduction</a>
        <a href="#svc-whyChoose" class="slp-sticky-nav__link" data-svc-nav-link>Why Us</a>
        <a href="#svc-features" class="slp-sticky-nav__link" data-svc-nav-link>Features</a>
        <a href="#svc-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
        <a href="#svc-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
        <a href="#svc-benefits" class="slp-sticky-nav__link" data-svc-nav-link>Benefits</a>
        <a href="#svc-process-hub" class="slp-sticky-nav__link" data-svc-nav-link>Process</a>
        <a href="#svc-testimonials" class="slp-sticky-nav__link" data-svc-nav-link>Testimonials</a>
        <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
      </div>
    </nav>

    <section id="svc-aiServices" class="ai-block ai-block--canvas" aria-labelledby="svc-aiServices-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow"><i class="fas fa-robot" aria-hidden="true"></i> AI &amp; Emerging Technologies</span>
          <h2 id="svc-aiServices-heading" class="ai-block__title font-display">Enterprise <span>AI Services</span></h2>
          <p class="ai-block__lead">Fifteen specialized AI practice areas — from generative AI and agents to computer vision, RPA, and enterprise platforms. Each practice delivers production-ready AI integrated with your data, workflows, and governance requirements.</p>
        </header>
        <div class="ai-svc-grid" role="list">
        ${svcCards}
        </div>
      </div>
    </section>

    <section id="svc-overview" class="ai-block" aria-labelledby="svc-overview-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="ai-overview">
          <div class="ai-overview__media" data-aos="fade-right">
            <img src="${IMG.overview}" alt="AI engineering and neural systems — Guudle IT Solutions" width="900" height="600" loading="lazy">
          </div>
          <div data-aos="fade-left">
            <span class="ai-block__eyebrow">Overview</span>
            <h2 id="svc-overview-heading" class="ai-block__title font-display" style="text-align:left">One Hub for Every <span>AI Capability</span></h2>
            <p class="ai-block__lead" style="text-align:left">Guudle IT Solutions delivers end-to-end AI engineering — from strategy and consulting through production deployment and MLOps. Each practice area is staffed by senior specialists who integrate with your data, security, and compliance requirements.</p>
            <ul class="ai-overview__points">
              <li><i class="fas fa-check-circle" aria-hidden="true"></i> 15 specialized AI service practices</li>
              <li><i class="fas fa-check-circle" aria-hidden="true"></i> Production MLOps and governance</li>
              <li><i class="fas fa-check-circle" aria-hidden="true"></i> Enterprise security and compliance ready</li>
              <li><i class="fas fa-check-circle" aria-hidden="true"></i> End-to-end AI engineering delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="svc-whyChoose" class="ai-block ai-block--canvas" aria-labelledby="svc-whyChoose-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow">Why Guudle</span>
          <h2 id="svc-whyChoose-heading" class="ai-block__title font-display">Why Choose <span>Guudle</span></h2>
          <p class="ai-block__lead">Enterprise delivery with the expertise, security, and accountability global teams expect.</p>
        </header>
        <div class="ai-card-grid ai-card-grid--4">
        ${whyCards}
        </div>
      </div>
    </section>

    <section id="svc-features" class="ai-block ai-block--parallax" aria-labelledby="svc-features-heading">
      <div class="ai-block__px-bg" style="background-image:url('${IMG.features}')" aria-hidden="true"></div>
      <div class="ai-block__px-veil" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow"><i class="fas fa-layer-group" aria-hidden="true"></i> Capabilities</span>
          <h2 id="svc-features-heading" class="ai-block__title font-display">Key Features &amp; <span>Capabilities</span></h2>
          <p class="ai-block__lead">Enterprise-grade capabilities designed for performance, security, scalability, and long-term maintainability.</p>
        </header>
        <div class="ai-cap-pills" data-aos="fade-up">
          <span class="ai-cap-pill"><i class="fas fa-compass"></i> Consulting &amp; Strategy</span>
          <span class="ai-cap-pill"><i class="fas fa-pen-ruler"></i> Design &amp; Prototyping</span>
          <span class="ai-cap-pill"><i class="fas fa-code"></i> Implementation</span>
          <span class="ai-cap-pill"><i class="fas fa-vial"></i> QA &amp; Testing</span>
        </div>
        <div class="ai-cap-grid" role="list" aria-label="Key capabilities in two by two grid">
        ${capCards}
        </div>
      </div>
    </section>

    ${industriesHtml}

    <section id="svc-services" class="ai-block" aria-labelledby="svc-services-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow">Services</span>
          <h2 id="svc-services-heading" class="ai-block__title font-display">AI &amp; Emerging <span>Technologies</span></h2>
          <p class="ai-block__lead">End-to-end capabilities tailored to your goals.</p>
        </header>
        <div class="ai-card-grid ai-card-grid--3">
        ${deliveryCards}
        </div>
      </div>
    </section>

    <section id="svc-benefits" class="ai-block ai-block--canvas" aria-labelledby="svc-benefits-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow">Benefits</span>
          <h2 id="svc-benefits-heading" class="ai-block__title font-display">Business <span>Benefits</span></h2>
          <p class="ai-block__lead">Outcomes that matter to your organization — measurable value delivered with enterprise-grade execution.</p>
        </header>
        <div class="ai-card-grid ai-card-grid--4">
        ${benefitCards}
        </div>
      </div>
    </section>

    <section id="svc-process-hub" class="ai-block ai-block--parallax" aria-labelledby="svc-process-heading">
      <div class="ai-block__px-bg" style="background-image:url('${IMG.process}')" aria-hidden="true"></div>
      <div class="ai-block__px-veil" aria-hidden="true"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow">Process</span>
          <h2 id="svc-process-heading" class="ai-block__title font-display">Our Proven <span>Development Process</span></h2>
          <p class="ai-block__lead">Every successful solution begins with a proven methodology. Discover how our experienced architects, designers, developers, testers, and DevOps engineers transform ideas into secure, scalable, enterprise-grade digital products.</p>
        </header>
        <a href="../our-process.html" class="ai-btn ai-btn--primary" data-aos="fade-up">Explore Our Development Process <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </section>

    <section id="svc-testimonials" class="ai-block" aria-labelledby="svc-testimonials-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="ai-block__head" data-aos="fade-up">
          <span class="ai-block__eyebrow">Testimonials</span>
          <h2 id="svc-testimonials-heading" class="ai-block__title font-display">Client <span>Testimonials</span></h2>
          <p class="ai-block__lead">What enterprise leaders say about partnering with Guudle.</p>
        </header>
        <div class="ai-quotes">
        ${quoteCards}
        </div>
      </div>
    </section>

    <section class="ai-cta-band" aria-labelledby="svc-cta-heading">
      <div class="ai-cta-band__bg" style="background-image:url('${IMG.cta}')" aria-hidden="true"></div>
      <div class="ai-cta-band__veil" aria-hidden="true"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 id="svc-cta-heading" class="font-display">Start Your AI Transformation</h2>
        <p>Book a strategy session and explore the right AI practice for your use case.</p>
        <div class="ai-cta-band__actions">
          <a href="#svc-contact" class="ai-btn ai-btn--primary">Get Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="../contact.html" class="ai-btn ai-btn--ghost">Request Proposal</a>
        </div>
      </div>
    </section>

    <section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cpox-contact-grid">
          <div class="cpox-contact-aside" data-aos="fade-up">
            <div class="cpox-label" data-aos="fade-up"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
            <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">Project</span></h2>
            <p class="cpox-lead">Tell us about your goals. We respond within one business day.</p>
            <ul class="cpox-contact-list">
              <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
              <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:+447908727559">07908 727559</a></li>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
            </ul>
            <div class="cpox-contact-badges">
              <span><i class="fas fa-shield-halved"></i> Enterprise SLA</span>
              <span><i class="fas fa-globe"></i> Dedicated Delivery</span>
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
    </section>

    <section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
        <div class="flex flex-wrap gap-3">
          <a href="ai-development.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>AI Development</a>
          <a href="generative-ai.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Generative AI</a>
          <a href="enterprise-ai.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Enterprise AI</a>
          <a href="machine-learning.html" class="svc-related__link"><i class="fas fa-arrow-right"></i>Machine Learning</a>
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
  <script src="../../assets/js/dev-process.js"></script>
  <script src="../../assets/js/svc-landing.js"></script>
  <script src="../../assets/js/ai-page.js"></script>
</body>
</html>
`;

fs.writeFileSync(outPath, html, 'utf8');
console.log('Wrote', outPath);
