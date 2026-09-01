/**
 * Rebuild index.html — parallax homepage
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const industries = fs.readFileSync(path.join(root, 'tools', '_home-industries-snip.html'), 'utf8');

const services = [
  ['fa-globe', 'Website Development', 'Conversion-focused sites engineered for speed, SEO, and growth.', 'pages/services/website-development.html'],
  ['fa-mobile-screen', 'Mobile Apps', 'iOS, Android, and Flutter apps with enterprise-grade quality.', 'pages/services/mobile-app.html'],
  ['fa-brain', 'AI & Emerging Tech', 'Production AI, agents, MLOps, and intelligent automation.', 'pages/services/ai.html'],
  ['fa-cloud', 'Cloud Engineering', 'Azure, AWS, and GCP platforms built for scale and resilience.', 'pages/services/cloud-engineering.html'],
  ['fa-building', 'Enterprise Software', 'Custom platforms, ERP, CRM, and digital transformation.', 'pages/services/enterprise-solutions.html'],
  ['fa-chart-line', 'Business Outcomes', 'Thirteen outcome platforms from SaaS to FinTech and healthcare.', 'pages/services/business-outcomes-digital-platforms.html'],
];

const outcomes = [
  ['ai-powered-automation.html', 'AI-Powered Automation', 'Intelligent workflows that reduce manual work'],
  ['enterprise-digital-transformation.html', 'Enterprise Digital Transformation', 'Modernize legacy systems at scale'],
  ['saas-platforms.html', 'SaaS Platforms', 'Subscription products with multi-tenant architecture'],
  ['marketplace-solutions.html', 'Marketplace Solutions', 'Multi-vendor commerce & booking platforms'],
  ['crm-systems.html', 'CRM Systems', 'Sales pipelines & customer 360 views'],
  ['erp-platforms.html', 'ERP Platforms', 'Unified operations & resource planning'],
  ['on-demand-apps.html', 'On-Demand Apps', 'Real-time matching & fulfillment'],
  ['delivery-platforms.html', 'Delivery Platforms', 'Last-mile logistics & tracking'],
  ['fintech-platforms.html', 'FinTech Platforms', 'Secure payments & financial products'],
  ['healthcare-platforms.html', 'Healthcare Platforms', 'Patient portals & clinical workflows'],
  ['ecommerce-systems.html', 'eCommerce Systems', 'Shopify, Magento, WooCommerce & custom'],
  ['ai-chatbots.html', 'AI Chatbots', 'Support automation & conversational UX'],
];

const svcHtml = services
  .map(
    ([icon, title, desc, href]) => `        <a href="${href}" class="hp-svc hp-reveal">
          <span class="hp-svc__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
          <h3>${title}</h3>
          <p>${desc}</p>
          <span class="hp-svc__link">Explore <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
        </a>`
  )
  .join('\n');

const outHtml = outcomes
  .map(
    ([href, title, desc]) => `        <a href="pages/services/${href}" class="hp-out hp-reveal">
          <strong>${title}</strong>
          <span>${desc}</span>
        </a>`
  )
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="Guudle IT Solutions — premium digital agency and enterprise technology partner. Software, cloud, AI, and transformation with measurable business outcomes.">
  <meta name="keywords" content="Guudle IT Solutions, Digital Agency, Enterprise Software, AI Development, Cloud Engineering, Digital Transformation">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/">
  <meta property="og:title" content="Guudle IT Solutions | Digital Agency & Enterprise Technology">
  <meta property="og:description" content="Build digital products that scale — software, cloud, AI, and transformation engineered for measurable outcomes.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/">
  <meta property="og:image" content="https://guudle.com/sliders/42.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Guudle IT Solutions | Digital Agency & Enterprise Technology">
  <meta name="twitter:description" content="Build digital products that scale — software, cloud, AI, and transformation engineered for measurable outcomes.">
  <title>Guudle IT Solutions | Digital Agency & Enterprise Technology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/service-landing-shared.css">
  <link rel="stylesheet" href="assets/css/site-unified.css">
  <link rel="stylesheet" href="assets/css/home.css">
  <link rel="stylesheet" href="assets/css/svc-corpox.css">
  <link rel="stylesheet" href="assets/css/industries-we-serve.css">
  <link rel="stylesheet" href="assets/css/home-parallax.css">
</head>
<body class="hp-page home-premium antialiased overflow-x-hidden guudle-site scroll-smooth">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>

  <main id="main">

    <section class="hp-hero" aria-labelledby="hero-heading" data-svc-hero>
      <div class="hp-hero__bg" style="background-image:url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="hp-hero__mesh" aria-hidden="true"></div>
      <div class="hp-hero__grid" aria-hidden="true"></div>
      <div class="hp-hero__inner">
        <div class="hp-wrap">
          <div class="hp-hero__layout">
            <div data-aos="fade-up">
              <p class="hp-brand font-display">GUUDLE<span>Empowered by Innovation</span></p>
              <h1 id="hero-heading" class="hero-title">Build digital products that scale with confidence — software, cloud, and AI engineered for enterprise outcomes.</h1>
              <p class="hp-hero__lead">We partner with ambitious teams to design, build, and operate premium platforms — from first release to production at scale.</p>
              <div class="hp-actions">
                <a href="pages/contact.html" class="hp-btn hp-btn--primary">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                <a href="#services" class="hp-btn hp-btn--ghost">Explore Services</a>
              </div>
            </div>
            <div class="hp-hero__form" data-aos="fade-left">
              <h2 class="font-display">Free consultation</h2>
              <p>Tell us about your goals — we respond within one business day.</p>
              <form id="hp-hero-form" novalidate>
                <div class="hp-field">
                  <label for="hp-name">Name</label>
                  <input id="hp-name" name="name" type="text" required placeholder="Your name" autocomplete="name">
                </div>
                <div class="hp-field">
                  <label for="hp-email">Work email</label>
                  <input id="hp-email" name="email" type="email" required placeholder="you@company.com" autocomplete="email">
                </div>
                <div class="hp-field">
                  <label for="hp-service">Interest</label>
                  <select id="hp-service" name="service" required>
                    <option value="">Select a focus</option>
                    <option>AI &amp; Automation</option>
                    <option>Web &amp; Mobile</option>
                    <option>Cloud &amp; Enterprise</option>
                    <option>Business Outcomes Platforms</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="hp-field">
                  <label for="hp-message">Project notes</label>
                  <textarea id="hp-message" name="message" rows="3" placeholder="Briefly describe your project..."></textarea>
                </div>
                <button type="submit" class="hp-btn hp-btn--primary">Send Message <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hp-parallax hp-parallax--dark" aria-label="Key outcomes">
      <div class="hp-parallax__bg" style="background-image:url('sliders/38.jpg')" aria-hidden="true"></div>
      <div class="hp-parallax__veil hp-parallax__veil--dark" aria-hidden="true"></div>
      <div class="hp-parallax__content">
        <div class="hp-wrap">
          <div class="hp-stats">
            <div class="hp-stat hp-reveal"><strong>500+</strong><span>Projects delivered</span></div>
            <div class="hp-stat hp-reveal"><strong>15+</strong><span>Years of delivery</span></div>
            <div class="hp-stat hp-reveal"><strong>98%</strong><span>Client satisfaction</span></div>
            <div class="hp-stat hp-reveal"><strong>24/7</strong><span>Support options</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="hp-section" aria-labelledby="services-heading">
      <div class="hp-wrap">
        <header class="hp-head hp-head--center" data-aos="fade-up">
          <span class="hp-eyebrow"><i class="fas fa-layer-group" aria-hidden="true"></i> Services</span>
          <h2 id="services-heading" class="hp-title font-display">Technology services that move the <span>business</span></h2>
          <p class="hp-lead">From websites and mobile apps to AI platforms and cloud estates — one accountable team from strategy to launch.</p>
        </header>
        <div class="hp-svc-grid">
${svcHtml}
        </div>
      </div>
    </section>

    <section id="outcomes" class="hp-parallax" aria-labelledby="outcomes-heading">
      <div class="hp-parallax__bg" style="background-image:url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="hp-parallax__veil" aria-hidden="true"></div>
      <div class="hp-parallax__content">
        <div class="hp-wrap">
          <header class="hp-head" data-aos="fade-up">
            <span class="hp-eyebrow"><i class="fas fa-bullseye" aria-hidden="true"></i> Business Outcomes</span>
            <h2 id="outcomes-heading" class="hp-title font-display">Platforms engineered for <span>measurable results</span></h2>
            <p class="hp-lead">Explore dedicated outcome pages — each linked from Solutions — covering automation, SaaS, CRM, ERP, FinTech, healthcare, and more.</p>
          </header>
          <div class="hp-out-grid">
${outHtml}
          </div>
          <div class="hp-actions" style="margin-top:1.75rem" data-aos="fade-up">
            <a href="pages/services/business-outcomes-digital-platforms.html" class="hp-btn hp-btn--navy">View all outcome platforms <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="pages/services/analytics-dashboards.html" class="hp-btn hp-btn--outline">Analytics Dashboards</a>
          </div>
        </div>
      </div>
    </section>

    <section id="process" class="hp-section hp-section--canvas" aria-labelledby="process-heading">
      <div class="hp-wrap">
        <header class="hp-head hp-head--center" data-aos="fade-up">
          <span class="hp-eyebrow"><i class="fas fa-route" aria-hidden="true"></i> How we deliver</span>
          <h2 id="process-heading" class="hp-title font-display">A clear path from discovery to <span>scale</span></h2>
          <p class="hp-lead">Transparent milestones, senior ownership, and production discipline on every engagement.</p>
        </header>
        <div class="hp-process">
          <article class="hp-step hp-reveal"><span class="hp-step__n">01</span><strong>Discover</strong><p>Goals, constraints, and success metrics.</p></article>
          <article class="hp-step hp-reveal"><span class="hp-step__n">02</span><strong>Design</strong><p>Architecture, UX, and delivery plan.</p></article>
          <article class="hp-step hp-reveal"><span class="hp-step__n">03</span><strong>Build</strong><p>Secure engineering with weekly demos.</p></article>
          <article class="hp-step hp-reveal"><span class="hp-step__n">04</span><strong>Launch</strong><p>Controlled release with observability.</p></article>
          <article class="hp-step hp-reveal"><span class="hp-step__n">05</span><strong>Optimise</strong><p>Performance, cost, and continuous value.</p></article>
        </div>
      </div>
    </section>

    ${industries}

    <section id="why" class="hp-section" aria-labelledby="why-heading">
      <div class="hp-wrap">
        <header class="hp-head hp-head--center" data-aos="fade-up">
          <span class="hp-eyebrow">Why Guudle</span>
          <h2 id="why-heading" class="hp-title font-display">Enterprise delivery with <span>partner accountability</span></h2>
          <p class="hp-lead">Security-first engineering, senior specialists, and outcomes you can measure.</p>
        </header>
        <div class="hp-why-grid">
          <article class="hp-why hp-reveal"><i class="fas fa-shield-halved" aria-hidden="true"></i><h3>Security-first</h3><p>Identity, encryption, and auditability designed into every platform.</p></article>
          <article class="hp-why hp-reveal"><i class="fas fa-users-gear" aria-hidden="true"></i><h3>Senior teams</h3><p>Architects and leads on your work — not junior bench rotations.</p></article>
          <article class="hp-why hp-reveal"><i class="fas fa-gauge-high" aria-hidden="true"></i><h3>Measurable ROI</h3><p>KPIs defined upfront and tracked through launch and beyond.</p></article>
          <article class="hp-why hp-reveal"><i class="fas fa-handshake" aria-hidden="true"></i><h3>Long-term partnership</h3><p>Support, optimisation, and roadmap continuity after go-live.</p></article>
        </div>
      </div>
    </section>

    <section class="hp-parallax hp-parallax--dark" aria-labelledby="cta-heading">
      <div class="hp-parallax__bg" style="background-image:url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80&auto=format&fit=crop')" aria-hidden="true"></div>
      <div class="hp-parallax__veil hp-parallax__veil--dark" aria-hidden="true"></div>
      <div class="hp-parallax__content">
        <div class="hp-wrap">
          <div class="hp-cta" data-aos="fade-up">
            <span class="hp-eyebrow"><i class="fas fa-rocket" aria-hidden="true"></i> Next step</span>
            <h2 id="cta-heading" class="hp-title font-display">Ready to build with <span>Guudle</span>?</h2>
            <p class="hp-lead" style="margin-left:auto;margin-right:auto">Start a conversation about your product, platform, or transformation programme.</p>
            <div class="hp-actions">
              <a href="pages/contact.html" class="hp-btn hp-btn--primary">Book Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="pages/portfolio.html" class="hp-btn hp-btn--ghost">View Portfolio</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="assets/js/mega-menu-webdev-data.js"></script>
  <script src="assets/js/mega-menu-data.js"></script>
  <script src="assets/js/mega-menu-render.js"></script>
  <script src="assets/js/components.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/parallax-unified.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="assets/js/industries-tabs.js"></script>
  <script src="assets/js/home-parallax.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');
console.log('Wrote index.html');
