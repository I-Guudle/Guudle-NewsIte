/**
 * Website Development Services — full page renderer (website-development.html)
 */
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection, industriesFromTuples } from './industries-parallax-render.mjs';
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseValueSection } from './enterprise-value-section-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function unsplash(photoId, w = 900) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=82&auto=format&fit=crop`;
}

const IMG_POOL = [
  'photo-1498050108023-c5249f4df085',
  'photo-1522071820081-009f0129c71c',
  'photo-1460925895917-afdab827c52f',
  'photo-1556740758-90de374c12ad',
  'photo-1553877522-43269d4ea984',
  'photo-1486406146926-c627a92ad1ab',
  'photo-1454165804606-c3d57bc86b40',
  'photo-1551434678-e076c223a692',
  'photo-1441986300917-64674bd600d8',
  'photo-1472851294608-062f824d29cc',
  'photo-1556742049-0cfed4f6a45d',
  'photo-1551288049-bebda4e38f71',
];

const IMG = {
  hero: unsplash('photo-1498050108023-c5249f4df085', 900),
  intro: unsplash('photo-1522071820081-009f0129c71c', 1600),
  features: unsplash('photo-1460925895917-afdab827c52f', 1600),
  industries: unsplash('photo-1486406146926-c627a92ad1ab', 1600),
  stats: unsplash('photo-1454165804606-c3d57bc86b40', 1600),
  cta: unsplash('photo-1551434678-e076c223a692', 1600),
};

function serviceImg(i) {
  return unsplash(IMG_POOL[i % IMG_POOL.length], 640);
}

const INTRO_PILLS = [
  'Professional Web Development', 'Business Growth', 'Digital Presence', 'Customer Engagement',
  'Online Branding', 'Lead Generation', 'Performance Optimization', 'User Experience',
];

const WHY_NEEDS = [
  ['fa-shield-halved', 'Build Brand Credibility', 'A polished website establishes trust and positions your business as a professional industry leader.'],
  ['fa-magnifying-glass-chart', 'Increase Online Visibility', 'SEO-ready architecture helps customers discover your brand through search engines and referrals.'],
  ['fa-bullseye', 'Generate More Leads', 'Conversion-focused layouts and CTAs turn visitors into qualified inquiries and sales opportunities.'],
  ['fa-face-smile', 'Improve Customer Experience', 'Intuitive navigation and fast load times create seamless journeys across every device.'],
  ['fa-mobile-screen', 'Mobile-Responsive Design', 'Flawless experiences on smartphones, tablets, and desktops — where most users browse today.'],
  ['fa-search', 'SEO Optimization', 'Technical SEO, structured data, and clean markup built in from day one.'],
  ['fa-gauge-high', 'Faster Website Speed', 'Optimized assets, caching, and Core Web Vitals tuning for lightning-fast performance.'],
  ['fa-lock', 'Secure Infrastructure', 'SSL, encryption, firewall protection, and secure authentication protect your data and users.'],
  ['fa-chart-line', 'Better Conversion Rates', 'Strategic UX, clear messaging, and tested funnels maximize visitor-to-customer conversion.'],
  ['fa-gears', 'Business Automation', 'Integrate forms, CRM, booking, and workflows that reduce manual effort.'],
  ['fa-expand', 'Scalability', 'Architecture that grows with traffic spikes, new features, and expanding content.'],
  ['fa-globe', 'Global Reach', 'Multi-language, CDN, and cloud hosting to serve audiences anywhere in the world.'],
];

const MAIN_SERVICES = [
  { icon: 'fa-building', title: 'Corporate Websites', desc: 'Professional brand presence with investor-grade polish and enterprise credibility.', items: ['Executive messaging', 'Team & leadership pages', 'Investor relations', 'Multi-location support'], link: '#wdev-features' },
  { icon: 'fa-briefcase', title: 'Business Websites', desc: 'Growth-focused sites for SMEs and established businesses ready to scale online.', items: ['Service showcases', 'Lead capture forms', 'Client testimonials', 'Blog & resources'], link: '#wdev-features' },
  { icon: 'fa-rocket', title: 'Landing Pages', desc: 'High-converting campaign pages designed to capture leads and drive specific actions.', items: ['A/B test ready', 'Campaign tracking', 'Fast load times', 'Mobile-first UX'], link: '#wdev-features' },
  { icon: 'fa-images', title: 'Portfolio Websites', desc: 'Showcase creative work, case studies, and projects with stunning visual layouts.', items: ['Gallery grids', 'Project case studies', 'Filter & categories', 'Contact integration'], link: '#wdev-features' },
  { icon: 'fa-cart-shopping', title: 'E-Commerce Websites', desc: 'Online stores with secure checkout, product catalogs, and conversion optimization.', items: ['Product management', 'Payment gateways', 'Inventory sync', 'Order tracking'], link: 'ecommerce.html' },
  { icon: 'fa-graduation-cap', title: 'Educational Websites', desc: 'Learning platforms, school sites, and course hubs with accessible content architecture.', items: ['Course catalogs', 'Student portals', 'Event calendars', 'Resource libraries'], link: '#wdev-features' },
  { icon: 'fa-heart-pulse', title: 'Healthcare Websites', desc: 'HIPAA-aware healthcare sites with patient-focused UX and appointment integration.', items: ['Provider directories', 'Online booking', 'Patient resources', 'Secure forms'], link: '#wdev-features' },
  { icon: 'fa-house', title: 'Real Estate Websites', desc: 'Property listings, agent profiles, and lead generation for real estate professionals.', items: ['Property search', 'Map integration', 'Virtual tours', 'Lead capture'], link: 're-development-site.html' },
  { icon: 'fa-landmark', title: 'Government Portals', desc: 'Accessible, secure public-sector websites with compliance and citizen services.', items: ['WCAG compliance', 'Document libraries', 'Service directories', 'Multi-language'], link: '#wdev-features' },
  { icon: 'fa-hand-holding-heart', title: 'NGO Websites', desc: 'Mission-driven sites that inspire donations, volunteers, and community engagement.', items: ['Donation integration', 'Impact stories', 'Volunteer signup', 'Event promotion'], link: '#wdev-features' },
  { icon: 'fa-hotel', title: 'Hotel Websites', desc: 'Hospitality sites with room showcases, amenities, and direct booking capabilities.', items: ['Room galleries', 'Booking engine', 'Amenity highlights', 'Guest reviews'], link: '#wdev-features' },
  { icon: 'fa-utensils', title: 'Restaurant Websites', desc: 'Appetizing menus, reservations, and online ordering for food & beverage brands.', items: ['Digital menus', 'Table reservations', 'Online ordering', 'Location finder'], link: '#wdev-features' },
  { icon: 'fa-calendar-check', title: 'Booking Websites', desc: 'Appointment and reservation systems with real-time availability and confirmations.', items: ['Calendar sync', 'Payment on booking', 'Automated reminders', 'Admin dashboard'], link: '#wdev-features' },
  { icon: 'fa-id-card', title: 'Membership Platforms', desc: 'Gated content, subscription tiers, and member dashboards for communities.', items: ['User roles', 'Paywall integration', 'Member directories', 'Exclusive content'], link: '#wdev-features' },
  { icon: 'fa-newspaper', title: 'News & Magazine Websites', desc: 'Editorial platforms with categories, authors, and high-volume content publishing.', items: ['Editorial workflow', 'Category taxonomy', 'Author profiles', 'Newsletter signup'], link: '#wdev-features' },
  { icon: 'fa-users', title: 'Community Portals', desc: 'Forums, member areas, and social features that build engaged online communities.', items: ['User profiles', 'Discussion boards', 'Moderation tools', 'Notifications'], link: '#wdev-features' },
  { icon: 'fa-code', title: 'Custom Web Applications', desc: 'Bespoke web platforms with custom logic, dashboards, and third-party integrations.', items: ['Custom workflows', 'API integrations', 'Admin panels', 'Role-based access'], link: 'web-application.html' },
  { icon: 'fa-mobile-screen', title: 'Progressive Web Apps (PWA)', desc: 'App-like web experiences with offline support, push notifications, and install prompts.', items: ['Offline mode', 'Push notifications', 'Home screen install', 'Fast performance'], link: 'progressive-web-apps.html' },
];

const FEATURES_DASHBOARD = [
  { icon: 'fa-gauge-high', title: 'Performance', items: ['Lightning Fast Loading', 'Core Web Vitals Optimization', 'CDN Integration', 'Image Optimization', 'Browser Caching'] },
  { icon: 'fa-wand-magic-sparkles', title: 'User Experience', items: ['Responsive Design', 'Interactive UI', 'Accessibility (WCAG)', 'Intuitive Navigation', 'Conversion Optimization'] },
  { icon: 'fa-shield-halved', title: 'Security', items: ['SSL Certificates', 'Firewall Protection', 'Malware Scanning', 'Data Encryption', 'Secure Authentication'] },
  { icon: 'fa-magnifying-glass-chart', title: 'SEO', items: ['Technical SEO', 'Structured Data', 'Metadata Optimization', 'XML Sitemap', 'Schema Markup'] },
];

const WEBSITE_TYPES = [
  ['fa-seedling', 'Startup Websites'],
  ['fa-store', 'SME Websites'],
  ['fa-building', 'Enterprise Websites'],
  ['fa-landmark', 'Government Websites'],
  ['fa-graduation-cap', 'Educational Websites'],
  ['fa-stethoscope', 'Medical Websites'],
  ['fa-chart-pie', 'Financial Websites'],
  ['fa-truck', 'Logistics Websites'],
  ['fa-helmet-safety', 'Construction Websites'],
  ['fa-concierge-bell', 'Hospitality Websites'],
  ['fa-scale-balanced', 'Legal Firm Websites'],
  ['fa-microchip', 'Technology Company Websites'],
];

const CMS_FEATURES = [
  ['fab fa-wordpress', 'WordPress', 'Flexible CMS with themes, plugins, and easy content editing.'],
  ['fab fa-laravel', 'Laravel CMS', 'Custom admin panels built for your exact workflow and data model.'],
  ['fa-code-branch', 'Headless CMS', 'Decoupled content APIs powering web, mobile, and omnichannel experiences.'],
  ['fa-pen-to-square', 'Content Management', 'Intuitive editors for pages, posts, and reusable content blocks.'],
  ['fa-language', 'Multi-language Support', 'Localization and translation workflows for global audiences.'],
  ['fa-user-shield', 'User Roles', 'Granular permissions for admins, editors, and contributors.'],
  ['fa-upload', 'Content Publishing', 'Scheduled publishing, drafts, and approval workflows.'],
  ['fa-photo-film', 'Media Library', 'Organized asset management with optimized image delivery.'],
];

const SEO_FEATURES = [
  ['fa-file-lines', 'On-Page SEO', 'Optimized titles, headings, meta descriptions, and internal linking structure.'],
  ['fa-code', 'Technical SEO', 'Clean URLs, canonical tags, robots.txt, and crawlability best practices.'],
  ['fa-gauge-high', 'Speed Optimization', 'Minified assets, lazy loading, and server-side performance tuning.'],
  ['fa-chart-simple', 'Core Web Vitals', 'LCP, FID, and CLS optimization for Google ranking signals.'],
  ['fa-mobile-screen', 'Mobile Optimization', 'Mobile-first indexing readiness and touch-friendly experiences.'],
  ['fa-image', 'Image Compression', 'WebP/AVIF delivery with responsive srcset and lazy loading.'],
  ['fa-diagram-project', 'Structured Data', 'JSON-LD schema for rich snippets and enhanced search visibility.'],
  ['fa-location-dot', 'Local SEO', 'Google Business Profile integration and location-based optimization.'],
];

const PROCESS_STEPS = [
  { t: 'Discovery & Consultation', d: 'Understand your business goals, audience, competitors, and project requirements.', icon: 'fa-magnifying-glass', duration: '1–2 weeks' },
  { t: 'Planning & Strategy', d: 'Define site architecture, content strategy, technology stack, and project roadmap.', icon: 'fa-sitemap', duration: '1–2 weeks' },
  { t: 'UI/UX Design', d: 'Create visually engaging, brand-aligned designs that prioritize user experience.', icon: 'fa-palette', duration: '2–3 weeks' },
  { t: 'Wireframing & Prototyping', d: 'Interactive prototypes to validate layouts, flows, and functionality before development.', icon: 'fa-object-group', duration: '1–2 weeks' },
  { t: 'Development', d: 'Build secure, scalable, high-performance websites with clean, maintainable code.', icon: 'fa-code', duration: 'Sprint-based' },
  { t: 'Testing & QA', d: 'Cross-browser, cross-device, accessibility, and performance testing before launch.', icon: 'fa-vial', duration: '1–2 weeks' },
  { t: 'Deployment', d: 'Production launch with DNS, SSL, CDN setup, and go-live support.', icon: 'fa-rocket', duration: '1 week' },
  { t: 'Ongoing Support & Optimization', d: 'Maintenance, security updates, performance monitoring, and feature enhancements.', icon: 'fa-headset', duration: 'Continuous' },
];

const INDUSTRIES = [
  ['fa-heart-pulse', 'Healthcare'], ['fa-building-columns', 'Banking'], ['fa-graduation-cap', 'Education'],
  ['fa-landmark', 'Government'], ['fa-helmet-safety', 'Construction'], ['fa-industry', 'Manufacturing'],
  ['fa-basket-shopping', 'Retail'], ['fa-concierge-bell', 'Hospitality'], ['fa-house', 'Real Estate'],
  ['fa-truck', 'Transportation'], ['fa-hand-holding-heart', 'Non-Profit'], ['fa-shield-halved', 'Insurance'],
  ['fa-boxes-stacked', 'Logistics'], ['fa-microchip', 'Technology'], ['fa-tower-cell', 'Telecommunications'],
];

const WHY_US = [
  ['fa-puzzle-piece', 'Custom-Built Solutions', 'Every website tailored to your brand, goals, and audience — never generic templates.'],
  ['fa-mobile-screen', 'Mobile-First Design', 'Designed for smartphones first, then scaled beautifully to tablets and desktops.'],
  ['fa-shield-halved', 'Enterprise Security', 'SSL, encryption, firewall protection, and secure authentication built in.'],
  ['fa-magnifying-glass-chart', 'SEO-Optimized Architecture', 'Technical SEO, structured data, and performance-first builds from day one.'],
  ['fa-bolt', 'Lightning-Fast Performance', 'Core Web Vitals tuned for speed, engagement, and search rankings.'],
  ['fa-wand-magic-sparkles', 'Modern UI/UX', 'Clean, contemporary interfaces inspired by industry-leading digital products.'],
  ['fa-expand', 'Scalable Development', 'Architecture that grows with your traffic, content, and feature requirements.'],
  ['fa-cloud', 'Cloud Ready', 'Deploy on AWS, Azure, Google Cloud, or DigitalOcean with CI/CD pipelines.'],
  ['fa-arrows-rotate', 'Agile Development', 'Sprint-based delivery with demos, feedback loops, and transparent progress.'],
  ['fa-comments', 'Transparent Communication', 'Dedicated channels, weekly updates, and clear milestone tracking.'],
  ['fa-user-tie', 'Dedicated Project Manager', 'Named PM coordinating design, development, QA, and launch.'],
  ['fa-screwdriver-wrench', 'Long-Term Technical Support', 'Post-launch maintenance, monitoring, and enhancement packages.'],
];

const FAQ = [
  { q: 'Can you redesign my existing website?', a: 'Yes. We modernize existing sites with improved design, performance, SEO, and UX — preserving search rankings through careful migration and redirects.' },
  { q: 'Is every website mobile responsive?', a: 'Absolutely. Every website we build is fully responsive and tested across smartphones, tablets, and desktop browsers.' },
  { q: 'Will my website be SEO optimized?', a: 'Yes. We implement technical SEO, semantic HTML, structured data, optimized metadata, sitemaps, and Core Web Vitals best practices.' },
  { q: 'Can I update the content myself?', a: 'Yes. We integrate intuitive CMS platforms — WordPress, custom Laravel CMS, or headless solutions — so your team can manage content easily.' },
  { q: 'Do you provide website hosting?', a: 'Yes. We deploy to AWS, Azure, Google Cloud, DigitalOcean, or your preferred provider with SSL, CDN, and monitoring configured.' },
  { q: 'Do you offer maintenance after launch?', a: 'Yes. We provide ongoing maintenance packages including security updates, performance monitoring, backups, and feature enhancements.' },
  { q: 'Can you integrate third-party APIs?', a: 'Absolutely. We integrate CRM, ERP, payment gateways, booking systems, marketing tools, and custom APIs into your website.' },
];

const RELATED = [
  ['web-application.html', 'Web Application Development'],
  ['ecommerce.html', 'E-Commerce Development'],
  ['ui-ux-design.html', 'UI/UX Design'],
  ['custom-mobile-app-development.html', 'Mobile App Development'],
  ['cms.html', 'CMS Development'],
  ['cloud-solutions.html', 'Cloud Hosting'],
  ['api-development.html', 'API Development'],
  ['maintenance-support.html', 'Website Maintenance'],
  ['seo.html', 'SEO Services'],
  ['website-security.html', 'Cyber Security'],
];

function parallax({ id, bg, light, inner, speed = '0.32' }) {
  return `<section id="${id}" class="wdev-parallax guudle-parallax-section${light ? ' wdev-parallax--light' : ''}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="wdev-parallax__ambient" aria-hidden="true"><span class="wdev-parallax__orb wdev-parallax__orb--1"></span><span class="wdev-parallax__orb wdev-parallax__orb--2"></span><div class="wdev-parallax__grid"></div></div>
  <div class="wdev-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="wdev-parallax__overlay${light ? ' wdev-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="wdev-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

function glowCard({ icon, title, desc, items, delay = 0 }) {
  const list = items?.length ? `<ul class="wdev-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(typeof i === 'string' ? i : i[1])}</li>`).join('')}</ul>` : '';
  return `<article class="wdev-glow-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="wdev-glow-card__glow" aria-hidden="true"></span><span class="wdev-glow-card__shine" aria-hidden="true"></span>
    <span class="wdev-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="wdev-glow-card__title">${esc(title)}</h3>
    ${desc ? `<p class="wdev-glow-card__desc">${esc(desc)}</p>` : ''}${list}
  </article>`;
}

function serviceCard({ icon, title, desc, items, link, img, imgAlt, delay = 0 }) {
  const list = items?.length ? `<ul class="wdev-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>` : '';
  const href = link?.startsWith('#') || link?.includes('.html') ? link : `#${link || 'wdev-features'}`;
  const more = `<a href="${href}" class="wdev-link">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>`;
  return `<article class="wdev-glow-card wdev-service-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="wdev-glow-card__glow" aria-hidden="true"></span><span class="wdev-glow-card__shine" aria-hidden="true"></span>
    <div class="wdev-service-card__media"><img src="${img}" alt="${esc(imgAlt)}" width="400" height="220" loading="lazy" class="wdev-service-card__img"></div>
    <span class="wdev-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="wdev-glow-card__title">${esc(title)}</h3>
    <p class="wdev-glow-card__desc">${esc(desc)}</p>${list}${more}
  </article>`;
}

function enterpriseCard({ icon, title, items }, delay) {
  return `<article class="wdev-enterprise-card" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="wdev-enterprise-card__head">
      <span class="wdev-enterprise-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
      <h3 class="wdev-enterprise-card__title">${esc(title)}</h3>
    </div>
    <ul class="wdev-enterprise-card__list">${items.map((i) => `<li><i class="fas fa-circle" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>
  </article>`;
}

export function renderWebsiteDevelopmentMain() {
  const hero = `<section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="wdev-hero-heading" data-svc-hero>
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
                <img src="${IMG.hero}" alt="Professional web designers and developers collaborating on responsive website mockups and UI/UX design" width="640" height="800" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-laptop-code"></i> Web Design</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-chart-line"></i> Conversions</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">Website Development Services</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>HERO — Premium Interactive Experience</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <p class="hero-enter hero-enter-d1 text-sm font-bold uppercase tracking-wider text-[#10A5F5] mb-3" data-aos="fade-up">Website Development Services</p>
            <h1 id="wdev-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">Custom Websites That Convert &amp; <span class="block mt-2 hero-title-navy__line">Scale</span></h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">Build a powerful digital presence with high-performance, SEO-ready websites engineered to attract visitors, generate leads, and accelerate business growth. From corporate websites and landing pages to enterprise portals and custom web platforms, we develop secure, scalable, and conversion-focused solutions tailored to your brand and business goals.</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start Your Website Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-calendar-check text-cyan-600"></i> Book a Free Consultation</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-gauge-high" aria-hidden="true"></i></span><div><strong>High Performance</strong><p>Core Web Vitals optimized for speed and SEO.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-mobile-screen" aria-hidden="true"></i></span><div><strong>Mobile-First</strong><p>Flawless experiences on every device.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><div><strong>Enterprise Security</strong><p>SSL, encryption, and secure authentication.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-search" aria-hidden="true"></i></span><div><strong>SEO Ready</strong><p>Technical SEO and structured data built in.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">
    <a href="#wdev-intro" class="slp-sticky-nav__link" data-svc-nav-link>Overview</a>
    <a href="#wdev-why" class="slp-sticky-nav__link" data-svc-nav-link>Why Website</a>
    <a href="#wdev-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
    <a href="#wdev-features" class="slp-sticky-nav__link" data-svc-nav-link>Features</a>
    <a href="#wdev-types" class="slp-sticky-nav__link" data-svc-nav-link>Types</a>
    <a href="#wdev-cms" class="slp-sticky-nav__link" data-svc-nav-link>CMS</a>
    <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
  </div></nav>`;

  const intro = parallax({
    id: 'wdev-intro',
    bg: IMG.intro,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-laptop-code" aria-hidden="true"></i> Digital Presence</span>
        <h2 id="wdev-intro-heading" class="wdev-title">Build Modern Websites That Drive <span class="wdev-accent">Business Growth</span></h2>
        <p class="wdev-lead">In today's digital-first economy, your website is the foundation of your brand, sales pipeline, and customer relationships. Professional web development delivers a high-performance digital presence that engages audiences, builds credibility, and converts visitors into loyal customers — with optimized user experience at every touchpoint.</p>
        <div class="wdev-intro-pills">${INTRO_PILLS.map((p) => `<span class="wdev-intro-pill"><i class="fas fa-check" aria-hidden="true"></i>${esc(p)}</span>`).join('')}</div>
      </header>
    </div>`,
  });

  const whySection = `<section id="wdev-why" class="wdev-section wdev-section--gray" aria-labelledby="wdev-why-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-chart-line" aria-hidden="true"></i> Business Impact</span>
        <h2 id="wdev-why-heading" class="wdev-title">Why Your Business Needs a <span class="wdev-accent">Professional Website</span></h2>
        <p class="wdev-lead">A professionally developed website is not a cost — it is a strategic asset that drives visibility, trust, and revenue.</p>
      </header>
      <div class="wdev-feature-grid">${WHY_NEEDS.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: Math.min(i * 40, 360) })
      ).join('')}</div>
    </div>
  </section>`;

  const servicesSection = `<section id="wdev-services" class="wdev-section wdev-section--white" aria-labelledby="wdev-services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-layer-group" aria-hidden="true"></i> Services</span>
        <h2 id="wdev-services-heading" class="wdev-title">Our Website Development <span class="wdev-accent">Services</span></h2>
        <p class="wdev-lead">From corporate websites and landing pages to custom web applications and progressive web apps — we build solutions for every business need.</p>
      </header>
      <div class="wdev-service-grid wdev-service-grid--3">${MAIN_SERVICES.map((s, i) => serviceCard({
        ...s,
        img: serviceImg(i),
        imgAlt: `${s.title} — professional website development by Guudle IT Solutions`,
        delay: Math.min(i * 35, 420),
      })).join('')}</div>
    </div>
  </section>`;

  const featuresSection = parallax({
    id: 'wdev-features',
    bg: IMG.features,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge"><i class="fas fa-gauge-high" aria-hidden="true"></i> Enterprise Features</span>
        <h2 id="wdev-features-heading" class="wdev-title wdev-title--light">Website Features We <span class="wdev-accent">Deliver</span></h2>
        <p class="wdev-lead wdev-lead--light">Performance, user experience, security, and SEO — engineered into every website we build.</p>
      </header>
      <div class="wdev-enterprise-grid wdev-enterprise-grid--2x2">${FEATURES_DASHBOARD.map((f, i) => enterpriseCard(f, Math.min(i * 45, 280))).join('')}</div>
    </div>`,
  });

  const typesSection = `<section id="wdev-types" class="wdev-section wdev-section--gray" aria-labelledby="wdev-types-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-sitemap" aria-hidden="true"></i> Website Types</span>
        <h2 id="wdev-types-heading" class="wdev-title">Website Types We <span class="wdev-accent">Build</span></h2>
        <p class="wdev-lead">Tailored solutions for startups, enterprises, and specialized industries across every sector.</p>
      </header>
      <div class="wdev-industry-grid">${WEBSITE_TYPES.map(([icon, name], i) =>
        `<article class="wdev-industry-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 30, 360)}">
          <span class="wdev-industry-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
          <h3>${esc(name)}</h3>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const cmsSection = `<section id="wdev-cms" class="wdev-section wdev-section--white" aria-labelledby="wdev-cms-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-pen-to-square" aria-hidden="true"></i> Content Management</span>
        <h2 id="wdev-cms-heading" class="wdev-title">CMS Development <span class="wdev-accent">Solutions</span></h2>
        <p class="wdev-lead">Custom content management systems and integrations that empower your team to publish, manage, and scale content effortlessly.</p>
      </header>
      <div class="wdev-feature-grid wdev-feature-grid--4">${CMS_FEATURES.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 40 })
      ).join('')}</div>
    </div>
  </section>`;

  const seoSection = `<section id="wdev-seo" class="wdev-section wdev-section--gray" aria-labelledby="wdev-seo-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-magnifying-glass-chart" aria-hidden="true"></i> SEO &amp; Performance</span>
        <h2 id="wdev-seo-heading" class="wdev-title">SEO &amp; Performance <span class="wdev-accent">Optimization</span></h2>
        <p class="wdev-lead">Every website is built for search visibility, speed, and Core Web Vitals excellence from the ground up.</p>
      </header>
      <div class="wdev-feature-grid">${SEO_FEATURES.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 40 })
      ).join('')}</div>
    </div>
  </section>`;

  const processHubCta = renderProcessHubCta({ linkPrefix: '../' });

  const industriesSection = renderIndustriesParallaxSection({
    industries: industriesFromTuples(INDUSTRIES),
    slug: 'website-development',
    bg: IMG.industries,
    sectionId: 'wdev-industries',
    lead: 'Website development expertise powered by modern frameworks, cloud infrastructure, and enterprise security — across healthcare, finance, government, retail, and more.',
    pathPrefix: '../../',
    contactLink: '#wdev-contact',
  });

  const whyUsSection = `<section id="wdev-why-us" class="wdev-section wdev-section--gray" aria-labelledby="wdev-why-us-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-award" aria-hidden="true"></i> Why Guudle</span>
        <h2 id="wdev-why-us-heading" class="wdev-title">Why Choose Our Website Development <span class="wdev-accent">Services?</span></h2>
      </header>
      <div class="wdev-feature-grid wdev-feature-grid--4">${WHY_US.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 35 })
      ).join('')}</div>
    </div>
  </section>`;

  const valueSection = renderEnterpriseValueSection(
    { slug: 'website-development' },
    {
      sectionId: 'wdev-value',
      slug: 'website-development',
      bg: IMG.stats,
      title: 'Our Commitment to Excellence',
      accent: 'Excellence',
      lead: 'Enterprise website development focused on security, performance, scalability, and long-term partnership.',
    },
  );

  const faqSection = renderEnterpriseFaqSection({
    id: 'wdev-faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Answers about timelines, redesigns, mobile responsiveness, SEO, CMS, hosting, maintenance, and integrations.',
    faqs: FAQ,
    contactHref: '#svc-contact',
  });

  const relatedSection = `<section id="wdev-related" class="wdev-section wdev-section--white" aria-labelledby="wdev-related-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="wdev-section-head" data-aos="fade-up">
        <span class="wdev-badge wdev-badge--navy"><i class="fas fa-link" aria-hidden="true"></i> Explore More</span>
        <h2 id="wdev-related-heading" class="wdev-title">Related <span class="wdev-accent">Services</span></h2>
      </header>
      <div class="wdev-related-grid">${RELATED.map(([href, label], i) =>
        `<a href="${href}" class="wdev-related-card" data-aos="fade-up" data-aos-delay="${i * 30}"><i class="fas fa-arrow-right" aria-hidden="true"></i><span>${esc(label)}</span></a>`
      ).join('')}</div>
    </div>
  </section>`;

  const ctaParallax = parallax({
    id: 'wdev-cta',
    bg: IMG.cta,
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <header class="wdev-section-head" data-aos="fade-up">
        <h2 id="wdev-cta-heading" class="wdev-title wdev-title--light">Ready to Build a Website That Converts Visitors into <span class="wdev-accent">Customers?</span></h2>
        <p class="wdev-lead wdev-lead--light">Whether you're launching a new business, modernizing your existing website, or building a custom digital platform, our expert web development team delivers secure, scalable, and high-performance solutions designed to help your business grow online.</p>
        <div class="wdev-cta-row">
          <a href="../contact.html" class="wdev-btn wdev-btn--primary">Start Your Website Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="#svc-contact" class="wdev-btn wdev-btn--ghost">Request a Free Consultation</a>
        </div>
      </header>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="cpox-contact-grid">
        <div class="cpox-contact__copy" data-aos="fade-right">
          <span class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></span>
          <h2 class="cpox-title font-display">Start Your Website Project</h2>
          <p class="cpox-lead">Tell us about your business, goals, and timeline — we'll respond within one business day with a tailored website development plan.</p>
        </div>
        <form class="cpox-contact-form slp-form" data-slp-form action="#" method="post" data-aos="fade-left">
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
            <label for="svc-message">Website Requirements <span class="text-red-500">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your website type, features, integrations, and timeline..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  return `
    ${hero}
    ${stickyNav}
    ${intro}
    ${whySection}
    ${servicesSection}
    ${featuresSection}
    ${typesSection}
    ${cmsSection}
    ${seoSection}
    ${processHubCta}
    ${industriesSection}
    ${whyUsSection}
    ${valueSection}
    ${faqSection}
    ${relatedSection}
    ${ctaParallax}
    ${contactSection}
  `;
}

export function renderWebsiteDevelopmentFaqsJsonLd() {
  return FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}

export const WDEV_OG_IMAGE = IMG.hero;
