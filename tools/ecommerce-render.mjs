/**
 * E-Commerce Development — full page renderer (ecommerce.html)
 */
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection, industriesFromTuples } from './industries-parallax-render.mjs';
import { renderBenefitsSection } from './benefits-section-render.mjs';
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function unsplash(photoId, w = 900) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=82&auto=format&fit=crop`;
}

const IMG = {
  hero: unsplash('photo-1556742049-0cfed4f6a45d', 900),
  intro: unsplash('photo-1556740758-90de374c12ad', 1600),
  enterprise: unsplash('photo-1460925895917-afdab827c52f', 1600),
  industries: unsplash('photo-1441986300917-64674bd600d8', 1600),
  cta: unsplash('photo-1472851294608-062f824d29cc', 1600),
  services: {
    custom: unsplash('photo-1556742049-0cfed4f6a45d', 640),
    marketplace: unsplash('photo-1441986300917-64674bd600d8', 640),
    b2b: unsplash('photo-1553877522-43269d4ea984', 640),
    b2c: unsplash('photo-1556740758-90de374c12ad', 640),
  },
};

const BENEFITS = [
  ['fa-chart-line', 'Increase Online Sales', 'Conversion-focused stores that turn visitors into buyers.'],
  ['fa-globe', 'Expand Your Global Reach', 'Sell across regions with multi-currency and localization.'],
  ['fa-face-smile', 'Improve Customer Experience', 'Fast, intuitive shopping journeys on every device.'],
  ['fa-piggy-bank', 'Reduce Operational Costs', 'Automate workflows and eliminate manual bottlenecks.'],
  ['fa-box', 'Automate Order Processing', 'Streamlined fulfillment from cart to delivery.'],
  ['fa-warehouse', 'Manage Inventory Efficiently', 'Real-time stock visibility across locations.'],
  ['fa-heart', 'Boost Customer Loyalty', 'Rewards, wishlists, and personalized experiences.'],
  ['fa-chart-pie', 'Gain Real-Time Business Insights', 'Dashboards for sales, traffic, and product performance.'],
  ['fa-credit-card', 'Support Multiple Payment Methods', 'Stripe, PayPal, Apple Pay, regional gateways, and more.'],
  ['fa-expand', 'Scale as Your Business Grows', 'Elastic architecture for traffic spikes and catalog growth.'],
];

const MAIN_SERVICES = [
  {
    icon: 'fa-store', title: 'Custom Online Store Development',
    desc: 'Tailor-made online stores that reflect your brand identity and business objectives.',
    items: ['Custom Store Design', 'Product Catalog Management', 'Category Management', 'Product Variations', 'Advanced Search & Filters', 'Shopping Cart', 'Wishlist', 'Customer Accounts'],
    img: IMG.services.custom, imgAlt: 'Custom online store development and product catalog',
    link: '#ecom-enterprise',
  },
  {
    icon: 'fa-shop', title: 'Multi-Vendor Marketplace Development',
    desc: 'Platforms where multiple vendors register, manage products, and sell through a centralized marketplace.',
    items: ['Vendor Registration', 'Vendor Dashboards', 'Product Approval Workflow', 'Commission Management', 'Order Management', 'Vendor Analytics', 'Customer Reviews', 'Vendor Verification'],
    img: IMG.services.marketplace, imgAlt: 'Multi-vendor marketplace e-commerce platform',
    link: '#ecom-enterprise',
  },
  {
    icon: 'fa-building', title: 'B2B & Wholesale E-Commerce',
    desc: 'Powerful wholesale platforms with advanced pricing and account management.',
    items: ['Bulk Ordering', 'Tiered Pricing', 'Business Accounts', 'Credit Terms', 'Quotation Requests', 'Purchase Orders', 'Custom Catalogs', 'Sales Reports'],
    img: IMG.services.b2b, imgAlt: 'B2B wholesale e-commerce platform',
    link: '#ecom-enterprise',
  },
  {
    icon: 'fa-bag-shopping', title: 'B2C Online Stores',
    desc: 'Engaging shopping experiences for direct-to-consumer businesses.',
    items: ['Personalized Recommendations', 'Promotional Campaigns', 'Discount Coupons', 'Loyalty Programs', 'Gift Cards', 'Customer Reviews', 'Social Sharing', 'Subscription Products'],
    img: IMG.services.b2c, imgAlt: 'B2C online store shopping experience',
    link: '#ecom-enterprise',
  },
];

const ENTERPRISE_FEATURES = [
  { icon: 'fa-boxes-stacked', title: 'Product Management', items: ['Unlimited Products', 'Categories & Subcategories', 'Product Variants', 'Digital Products', 'Inventory Tracking', 'SKU Management', 'Barcode Support', 'Bulk Product Import'] },
  { icon: 'fa-cart-shopping', title: 'Shopping Experience', items: ['Responsive Design', 'Quick View', 'Wishlist', 'Product Comparison', 'Recently Viewed Products', 'Smart Search', 'Advanced Filters', 'Related Products'] },
  { icon: 'fa-credit-card', title: 'Checkout & Payments', items: ['One-Page Checkout', 'Guest Checkout', 'Saved Payment Methods', 'Tax Calculation', 'Shipping Options', 'Promo Codes', 'Order Notes', 'Invoice Generation'] },
  { icon: 'fa-clipboard-list', title: 'Order Management', items: ['Order Dashboard', 'Order Tracking', 'Shipment Management', 'Delivery Status', 'Returns & Refunds', 'Cancellation Requests', 'Invoice Management', 'Customer Notifications'] },
  { icon: 'fa-warehouse', title: 'Inventory Management', items: ['Stock Monitoring', 'Low Stock Alerts', 'Warehouse Management', 'Multi-Location Inventory', 'Product Transfers', 'Supplier Management', 'Purchase Orders', 'Inventory Reports'] },
  { icon: 'fa-users', title: 'Customer Management', items: ['Customer Profiles', 'Order History', 'Wishlist', 'Reward Points', 'Loyalty Programs', 'Saved Addresses', 'Customer Segmentation', 'Personalized Recommendations'] },
  { icon: 'fa-bullhorn', title: 'Marketing & Sales Tools', items: ['SEO Optimization', 'Email Marketing', 'SMS Campaigns', 'Push Notifications', 'Abandoned Cart Recovery', 'Affiliate Program', 'Discount Campaigns', 'Referral System'] },
  { icon: 'fa-chart-line', title: 'Analytics & Reporting', items: ['Sales Reports', 'Revenue Analytics', 'Product Performance', 'Customer Insights', 'Conversion Rates', 'Traffic Sources', 'Inventory Reports', 'Vendor Reports'] },
  { icon: 'fa-mobile-screen', title: 'Mobile Commerce', items: ['Fully Responsive Design', 'Progressive Web App (PWA)', 'Android App Integration', 'iOS App Integration', 'Mobile Wallet Payments', 'Push Notifications', 'Fast Mobile Checkout', 'Offline Browsing Support'] },
  { icon: 'fa-plug', title: 'Third-Party Integrations', items: ['ERP Systems', 'CRM Platforms', 'Accounting Software', 'Shipping Providers', 'Payment Gateways', 'Marketing Automation', 'Social Media Platforms', 'Google Analytics & Meta Pixel'] },
  { icon: 'fa-shield-halved', title: 'Security & Compliance', items: ['SSL Encryption', 'PCI DSS Compliance', 'Secure Payment Processing', 'Role-Based Access Control', 'Two-Factor Authentication', 'Fraud Detection', 'Data Encryption', 'Regular Security Updates'] },
];

const PAYMENTS = ['Stripe', 'PayPal', 'Apple Pay', 'Google Pay', 'Paystack', 'Flutterwave', 'Klarna', 'Bank Transfer'];

const INDUSTRIES = [
  ['fa-shirt', 'Fashion & Apparel'],
  ['fa-microchip', 'Electronics'],
  ['fa-basket-shopping', 'Grocery & Supermarkets'],
  ['fa-couch', 'Furniture'],
  ['fa-pills', 'Healthcare & Pharmacy'],
  ['fa-spa', 'Beauty & Cosmetics'],
  ['fa-car', 'Automotive'],
  ['fa-helmet-safety', 'Construction Supplies'],
  ['fa-book', 'Books & Education'],
  ['fa-dumbbell', 'Sports & Fitness'],
  ['fa-utensils', 'Food & Beverage'],
  ['fa-gem', 'Jewellery & Luxury Goods'],
  ['fa-paw', 'Pet Supplies'],
  ['fa-wheat-awn', 'Agriculture'],
  ['fa-industry', 'Industrial Equipment'],
];

const PROCESS_STEPS = [
  { t: 'Discovery & Strategy', d: 'Understand your business model, products, customers, and growth objectives.', icon: 'fa-magnifying-glass', duration: '1–2 weeks' },
  { t: 'Planning & Architecture', d: 'Define technical architecture, user journeys, and project roadmap.', icon: 'fa-sitemap', duration: '1–2 weeks' },
  { t: 'UI/UX Design', d: 'Create visually engaging shopping experiences that encourage conversions.', icon: 'fa-palette', duration: '2–3 weeks' },
  { t: 'Development', d: 'Build secure, scalable, high-performance e-commerce platforms with modern technologies.', icon: 'fa-code', duration: 'Sprint-based' },
  { t: 'Integration', d: 'Connect payment gateways, shipping, CRM, ERP, and third-party services.', icon: 'fa-plug', duration: '1–2 weeks' },
  { t: 'Testing & QA', d: 'Ensure optimal performance, security, and compatibility across browsers and devices.', icon: 'fa-vial', duration: '1–2 weeks' },
  { t: 'Deployment', d: 'Launch with production setup, performance optimization, and go-live support.', icon: 'fa-rocket', duration: '1 week' },
  { t: 'Ongoing Support', d: 'Maintenance, feature enhancements, security updates, and technical support.', icon: 'fa-headset', duration: 'Continuous' },
];

const WHY_US = [
  ['fa-puzzle-piece', 'Fully Custom E-Commerce Solutions', 'Built around your processes — not generic templates.'],
  ['fa-shield-halved', 'Enterprise-Grade Security', 'PCI-aware architecture with encryption and access controls.'],
  ['fa-mobile-screen', 'Mobile-First Development', 'Optimized for smartphones, tablets, and desktops.'],
  ['fa-magnifying-glass-chart', 'SEO-Optimized Architecture', 'Structured data, clean URLs, and performance-first builds.'],
  ['fa-gauge-high', 'Fast Page Load Performance', 'Core Web Vitals tuned for speed and conversions.'],
  ['fa-wand-magic-sparkles', 'Conversion-Focused UI/UX', 'Checkout flows and layouts designed to sell.'],
  ['fa-cloud', 'Scalable Cloud Infrastructure', 'Auto-scaling hosting on AWS, Azure, GCP, and DigitalOcean.'],
  ['fa-credit-card', 'Secure Payment Integrations', 'Stripe, PayPal, Apple Pay, and regional gateways.'],
  ['fa-arrows-rotate', 'Agile Development Methodology', 'Sprint demos, transparent backlog, and iterative delivery.'],
  ['fa-user-tie', 'Dedicated Project Management', 'Named PM with structured communication cadence.'],
  ['fa-comments', 'Transparent Communication', 'Slack/Teams channels and weekly progress reviews.'],
  ['fa-screwdriver-wrench', 'Ongoing Maintenance & Support', 'Post-launch SLA packages and proactive monitoring.'],
];

const FAQ = [
  { q: 'Can you build a custom e-commerce platform instead of using Shopify or WooCommerce?', a: 'Yes. We specialize in custom e-commerce development tailored to your business processes, branding, and scalability requirements.' },
  { q: 'Can you integrate multiple payment gateways?', a: 'Absolutely. We integrate Stripe, PayPal, Paystack, Flutterwave, Apple Pay, Google Pay, and other secure payment providers.' },
  { q: 'Will my store work on mobile devices?', a: 'Yes. Every platform we build is fully responsive. We can also develop dedicated Android and iOS shopping apps.' },
  { q: 'Can I manage products and orders myself?', a: 'Yes. Your store includes an intuitive admin dashboard for products, inventory, orders, customers, promotions, and reports.' },
  { q: 'Do you provide support after launch?', a: 'Yes. We offer ongoing maintenance, performance monitoring, security updates, feature enhancements, and technical support.' },
];

function parallax({ id, bg, light, inner, speed = '0.32' }) {
  return `<section id="${id}" class="ecom-parallax guudle-parallax-section${light ? ' ecom-parallax--light' : ''}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="ecom-parallax__ambient" aria-hidden="true"><span class="ecom-parallax__orb ecom-parallax__orb--1"></span><span class="ecom-parallax__orb ecom-parallax__orb--2"></span><div class="ecom-parallax__grid"></div></div>
  <div class="ecom-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="ecom-parallax__overlay${light ? ' ecom-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="ecom-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

function glowCard({ icon, title, desc, items, delay = 0 }) {
  const list = items?.length ? `<ul class="ecom-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(typeof i === 'string' ? i : i[1])}</li>`).join('')}</ul>` : '';
  const description = desc || (typeof items?.[0] === 'object' ? '' : '');
  return `<article class="ecom-glow-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="ecom-glow-card__glow" aria-hidden="true"></span><span class="ecom-glow-card__shine" aria-hidden="true"></span>
    <span class="ecom-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="ecom-glow-card__title">${esc(title)}</h3>
    ${description ? `<p class="ecom-glow-card__desc">${esc(description)}</p>` : ''}${list}
  </article>`;
}

function serviceCard({ icon, title, desc, items, link, img, imgAlt, delay = 0 }) {
  const list = items?.length ? `<ul class="ecom-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>` : '';
  const more = link ? `<a href="${link}" class="ecom-link">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '';
  return `<article class="ecom-glow-card ecom-service-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="ecom-glow-card__glow" aria-hidden="true"></span><span class="ecom-glow-card__shine" aria-hidden="true"></span>
    <div class="ecom-service-card__media"><img src="${img}" alt="${esc(imgAlt)}" width="400" height="220" loading="lazy" class="ecom-service-card__img"></div>
    <span class="ecom-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="ecom-glow-card__title">${esc(title)}</h3>
    <p class="ecom-glow-card__desc">${esc(desc)}</p>${list}${more}
  </article>`;
}

function enterpriseCard({ icon, title, items }, delay, dark = false) {
  return `<article class="ecom-enterprise-card" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="ecom-enterprise-card__head">
      <span class="ecom-enterprise-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
      <h3 class="ecom-enterprise-card__title">${esc(title)}</h3>
    </div>
    <ul class="ecom-enterprise-card__list">${items.map((i) => `<li><i class="fas fa-circle" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>
  </article>`;
}

export function renderEcommerceMain() {
  const hero = `<section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="ecom-hero-heading" data-svc-hero>
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
                <img src="${IMG.hero}" alt="E-commerce platform — online store, shopping cart, and digital commerce by Guudle IT Solutions" width="640" height="800" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-cart-shopping"></i> Online Store</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-chart-line"></i> Conversions</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">E-Commerce Development</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>HERO — Premium Interactive Experience</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <p class="hero-enter hero-enter-d1 text-sm font-bold uppercase tracking-wider text-[#10A5F5] mb-3" data-aos="fade-up">E-Commerce Platforms Built to Sell</p>
            <h1 id="ecom-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">Scalable Online Stores Designed for <span class="block mt-2 hero-title-navy__line">Growth and Higher Conversions</span></h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-4 max-w-lg" data-aos="fade-up" data-aos-delay="100">Transform your business with a powerful e-commerce platform that delivers exceptional shopping experiences, streamlines operations, and drives sustainable revenue growth. We build secure, scalable, and feature-rich online stores that help businesses sell products and services efficiently across multiple channels.</p>
            <p class="hero-enter hero-enter-d3 text-sm sm:text-base text-slate-500 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="120">From startups launching their first online store to enterprise retailers managing thousands of products, our custom e-commerce solutions maximize conversions, improve customer satisfaction, and support long-term business growth.</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start Your E-Commerce Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-calendar-check text-cyan-600"></i> Request a Free Consultation</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-chart-line" aria-hidden="true"></i></span><div><strong>Conversion Optimized</strong><p>Checkout flows and UX designed to maximize sales.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-credit-card" aria-hidden="true"></i></span><div><strong>Secure Payments</strong><p>PCI-aware integrations with global payment gateways.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-store" aria-hidden="true"></i></span><div><strong>Multi-Channel Sales</strong><p>Web, mobile, marketplace, and B2B commerce.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-expand" aria-hidden="true"></i></span><div><strong>Scalable Platform</strong><p>Elastic infrastructure that grows with your catalog.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">
    <a href="#ecom-why" class="slp-sticky-nav__link" data-svc-nav-link>Why Invest</a>
    <a href="#ecom-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
    <a href="#ecom-enterprise" class="slp-sticky-nav__link" data-svc-nav-link>Features</a>
    <a href="#ecom-payments" class="slp-sticky-nav__link" data-svc-nav-link>Payments</a>
    <a href="#ecom-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
    <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
  </div></nav>`;

  const intro = parallax({
    id: 'ecom-intro',
    bg: IMG.intro,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="ecom-section-head" data-aos="fade-up">
        <span class="ecom-badge ecom-badge--navy"><i class="fas fa-cart-shopping" aria-hidden="true"></i> Digital Commerce</span>
        <h2 id="ecom-intro-heading" class="ecom-title">Why Invest in a <span class="ecom-accent">Custom E-Commerce Platform?</span></h2>
        <p class="ecom-lead">In today's digital economy, customers expect fast, secure, and personalized shopping experiences. A professionally developed e-commerce platform enables your business to reach a wider audience, automate operations, and provide a seamless purchasing journey.</p>
      </header>
    </div>`,
  });

  const whySection = renderBenefitsSection({
    slug: 'ecommerce',
    benefits: BENEFITS.map(([icon, title, desc]) => ({ icon, title, desc })),
    sectionTitles: {
      benefitsBadge: 'Business Benefits',
      benefitsHtml: 'Business Benefits of <span class="guudle-benefits__accent">Custom E-Commerce</span>',
      benefitsSub: 'Conversion-focused commerce outcomes that drive revenue, loyalty, and operational efficiency.',
    },
    layout: { benefitsCols: 4 },
  }, { sectionId: 'ecom-why', bg: IMG.intro, limit: 10, aos: true });

  const servicesSection = `<section id="ecom-services" class="ecom-section ecom-section--white" aria-labelledby="ecom-services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="ecom-section-head" data-aos="fade-up">
        <span class="ecom-badge ecom-badge--navy"><i class="fas fa-layer-group" aria-hidden="true"></i> Services</span>
        <h2 id="ecom-services-heading" class="ecom-title">Our E-Commerce <span class="ecom-accent">Development Services</span></h2>
        <p class="ecom-lead">From custom online stores and multi-vendor marketplaces to B2B wholesale and B2C retail — we build commerce platforms tailored to your business model.</p>
      </header>
      <div class="ecom-service-grid">${MAIN_SERVICES.map((s, i) => serviceCard({ ...s, delay: i * 60 })).join('')}</div>
    </div>
  </section>`;

  const enterpriseSection = parallax({
    id: 'ecom-enterprise',
    bg: IMG.enterprise,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="ecom-section-head" data-aos="fade-up">
        <span class="ecom-badge"><i class="fas fa-building" aria-hidden="true"></i> Enterprise</span>
        <h2 id="ecom-enterprise-heading" class="ecom-title ecom-title--light">Enterprise E-Commerce <span class="ecom-accent">Features</span></h2>
        <p class="ecom-lead ecom-lead--light">Enterprise-grade capabilities designed for performance, scalability, and long-term growth.</p>
      </header>
      <div class="ecom-enterprise-grid">${ENTERPRISE_FEATURES.map((f, i) => enterpriseCard(f, Math.min(i * 35, 350), true)).join('')}</div>
    </div>`,
  });

  const paymentsSection = `<section id="ecom-payments" class="ecom-section ecom-section--white" aria-labelledby="ecom-payments-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <header class="ecom-section-head" data-aos="fade-up">
        <span class="ecom-badge ecom-badge--navy"><i class="fas fa-credit-card" aria-hidden="true"></i> Payments</span>
        <h2 id="ecom-payments-heading" class="ecom-title">Secure <span class="ecom-accent">Payment Integrations</span></h2>
        <p class="ecom-lead">Provide a secure and frictionless checkout experience with leading global and regional payment providers.</p>
        <div class="ecom-payment-grid">${PAYMENTS.map((p) => `<span class="ecom-payment-pill"><i class="fas fa-check" aria-hidden="true"></i>${esc(p)}</span>`).join('')}</div>
      </header>
    </div>
  </section>`;

  const industriesSection = renderIndustriesParallaxSection({
    industries: industriesFromTuples(INDUSTRIES),
    slug: 'ecommerce',
    bg: IMG.industries,
    sectionId: 'ecom-industries',
    lead: 'E-commerce platforms engineered with secure payments, scalable cloud architecture, and conversion-focused UX — for retail, wholesale, and specialized sectors.',
    pathPrefix: '../../',
    contactLink: '#ecom-contact',
  });

  const processHubCta = renderProcessHubCta({ linkPrefix: '../' });

  const whyUsSection = `<section id="ecom-why-us" class="ecom-section ecom-section--white" aria-labelledby="ecom-why-us-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="ecom-section-head" data-aos="fade-up">
        <span class="ecom-badge ecom-badge--navy"><i class="fas fa-award" aria-hidden="true"></i> Why Guudle</span>
        <h2 id="ecom-why-us-heading" class="ecom-title">Why Choose Our <span class="ecom-accent">E-Commerce Development Services?</span></h2>
      </header>
      <div class="ecom-feature-grid ecom-feature-grid--4">${WHY_US.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 40 })
      ).join('')}</div>
    </div>
  </section>`;

  const faqSection = renderEnterpriseFaqSection({
    id: 'ecom-faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Answers about custom platforms, payments, mobile commerce, admin dashboards, and post-launch support.',
    faqs: FAQ,
    contactHref: '#svc-contact',
  });

  const ctaParallax = parallax({
    id: 'ecom-cta',
    bg: IMG.cta,
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <header class="ecom-section-head" data-aos="fade-up">
        <h2 id="ecom-cta-heading" class="ecom-title ecom-title--light">Ready to Launch Your <span class="ecom-accent">Online Store?</span></h2>
        <p class="ecom-lead ecom-lead--light">Whether you're creating a new online business, expanding into digital commerce, or upgrading an existing platform, we deliver secure, scalable, and conversion-focused e-commerce solutions tailored to your goals.</p>
        <div class="ecom-cta-row">
          <a href="../contact.html" class="ecom-btn ecom-btn--primary">Start Your E-Commerce Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="#svc-contact" class="ecom-btn ecom-btn--ghost">Request a Free Consultation</a>
        </div>
      </header>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="cpox-contact-grid">
        <div class="cpox-contact__copy" data-aos="fade-right">
          <span class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></span>
          <h2 class="cpox-title font-display">Start Your E-Commerce Project</h2>
          <p class="cpox-lead">Tell us about your products, target customers, and commerce goals — we'll respond within one business day with a tailored plan.</p>
        </div>
        <form class="cpox-contact-form slp-form" data-slp-form action="#" method="post" data-aos="fade-left">
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
            <label for="svc-message">E-Commerce Requirements <span class="text-red-500">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your store type, products, integrations, and timeline..."></textarea>
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
    ${enterpriseSection}
    ${paymentsSection}
    ${industriesSection}
    ${processHubCta}
    ${whyUsSection}
    ${faqSection}
    ${ctaParallax}
    ${contactSection}
  `;
}

export function renderEcommerceFaqsJsonLd() {
  return FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}

export const ECOMMERCE_OG_IMAGE = IMG.hero;
