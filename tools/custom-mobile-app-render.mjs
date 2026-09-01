/**
 * Custom Mobile App Development page — full content renderer
 */
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function glowCard({ icon, title, desc, items, subheads, dark = false, delay = 0 }) {
  const lists = [];
  if (subheads?.length) {
    for (const sh of subheads) {
      lists.push(`<p class="cma-glow-card__subhead">${esc(sh.label)}</p>`);
      lists.push(`<ul class="cma-glow-card__list">${sh.items.map((i) =>
        `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`
      ).join('')}</ul>`);
    }
  } else if (items?.length) {
    lists.push(`<ul class="cma-glow-card__list">${items.map((i) =>
      `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`
    ).join('')}</ul>`);
  }
  return `<article class="cma-glow-card${dark ? ' cma-glow-card--dark' : ''}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="cma-glow-card__glow" aria-hidden="true"></span>
    <span class="cma-glow-card__shine" aria-hidden="true"></span>
    <span class="cma-glow-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
    <h3 class="cma-glow-card__title">${esc(title)}</h3>
    ${desc ? `<p class="cma-glow-card__desc">${esc(desc)}</p>` : ''}
    ${lists.join('')}
  </article>`;
}

function parallaxSection({ id, bg, light = false, hero = false, classExtra = '', inner }) {
  return `<section id="${id}" class="cma-parallax guudle-parallax-section${hero ? ' cma-parallax--hero' : ''} ${classExtra}" data-svc-parallax-section data-svc-parallax-speed="0.32" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="cma-parallax__ambient" aria-hidden="true">
    <span class="cma-parallax__orb cma-parallax__orb--1"></span>
    <span class="cma-parallax__orb cma-parallax__orb--2"></span>
  </div>
  <div class="cma-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="cma-parallax__overlay${light ? ' cma-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="cma-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

const WHY_BENEFITS = [
  'Reach customers anytime, anywhere',
  'Improve customer engagement',
  'Increase brand awareness',
  'Streamline business operations',
  'Generate new revenue streams',
  'Enhance customer loyalty',
  'Deliver personalized user experiences',
  'Stay competitive in the digital marketplace',
];

const SERVICES = [
  {
    icon: 'fa-brands fa-android',
    title: 'Android App Development',
    desc: 'Develop high-performance Android applications using the latest technologies and best practices.',
    items: ['Native Android Development', 'Material Design UI', 'Google Play Store Deployment', 'Android Tablet Support', 'Offline Functionality', 'Push Notifications', 'Google Maps Integration', 'In-App Purchases'],
  },
  {
    icon: 'fa-brands fa-apple',
    title: 'iOS App Development',
    desc: 'Build elegant and secure iOS applications for iPhone and iPad users.',
    items: ['Native iOS Development', 'Swift Development', 'Apple Pay Integration', 'Siri Support', 'Face ID & Touch ID', 'App Store Publishing', 'iCloud Integration', 'Secure Data Storage'],
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Cross-Platform App Development',
    desc: 'Develop one application that runs seamlessly on Android and iOS.',
    subheads: [
      { label: 'Technologies', items: ['Flutter', 'React Native', 'Ionic', '.NET MAUI'] },
      { label: 'Benefits', items: ['Faster Development', 'Reduced Costs', 'Shared Codebase', 'Native Performance', 'Faster Updates'] },
    ],
  },
  {
    icon: 'fa-building',
    title: 'Enterprise Mobile Applications',
    desc: 'Build enterprise-grade mobile solutions that improve productivity and business operations.',
    items: ['CRM Apps', 'ERP Apps', 'HR Management', 'Inventory Systems', 'Logistics Apps', 'Healthcare Solutions', 'Field Service Apps', 'Inspection Apps'],
  },
  {
    icon: 'fa-cart-shopping',
    title: 'E-Commerce Mobile Apps',
    desc: 'Launch feature-rich shopping applications that deliver exceptional customer experiences.',
    items: ['Product Catalog', 'Shopping Cart', 'Secure Checkout', 'Multiple Payment Gateways', 'Wishlist', 'Order Tracking', 'Reviews & Ratings', 'Push Notifications'],
  },
  {
    icon: 'fa-bolt',
    title: 'On-Demand Mobile Apps',
    desc: 'Develop real-time service applications similar to Uber, Deliveroo, or Fumbaa.',
    items: ['Taxi Booking', 'Food Delivery', 'Gas Delivery', 'Grocery Delivery', 'Parcel Delivery', 'Home Services', 'Healthcare Booking'],
  },
];

const FEATURE_GROUPS = [
  { icon: 'fa-users', title: 'User Management', items: ['Secure Registration', 'Social Login', 'User Profiles', 'Multi-Factor Authentication', 'Role-Based Access'] },
  { icon: 'fa-comments', title: 'Communication', items: ['Push Notifications', 'Live Chat', 'Voice Calls', 'Video Calls', 'Email Notifications'] },
  { icon: 'fa-credit-card', title: 'Payments', items: ['Stripe', 'PayPal', 'Apple Pay', 'Google Pay', 'Paystack', 'Flutterwave'] },
  { icon: 'fa-map-location-dot', title: 'Maps & Location', items: ['Google Maps', 'GPS Tracking', 'Route Navigation', 'Geofencing', 'Location Sharing'] },
  { icon: 'fa-shield-halved', title: 'Security', items: ['Data Encryption', 'Biometric Authentication', 'Secure APIs', 'Token-Based Authentication', 'GDPR Compliance'] },
  { icon: 'fa-chart-line', title: 'Analytics', items: ['User Analytics', 'Crash Reporting', 'Performance Monitoring', 'Business Intelligence', 'Custom Reports'] },
];


const PROCESS_STEPS = [
  { t: 'Discovery & Consultation', d: 'We analyze your business goals, target audience, and project requirements to define the best mobile strategy.', icon: 'fa-compass', duration: '1–2 weeks' },
  { t: 'Planning & Architecture', d: 'Our architects create the application structure, user flows, and technical roadmap.', icon: 'fa-sitemap', duration: '1–2 weeks' },
  { t: 'UI/UX Design', d: 'We design intuitive, engaging, and user-friendly interfaces that provide an exceptional user experience.', icon: 'fa-palette', duration: '2–4 weeks' },
  { t: 'Mobile App Development', d: 'Our developers build scalable, secure, and high-performance applications using modern technologies.', icon: 'fa-code', duration: '8–16 weeks' },
  { t: 'API Integration', d: 'We integrate payment gateways, maps, cloud services, authentication, analytics, and third-party APIs.', icon: 'fa-plug', duration: '2–4 weeks' },
  { t: 'Quality Assurance & Testing', d: 'Comprehensive testing ensures your app performs flawlessly across devices and operating systems.', icon: 'fa-vial-circle-check', duration: '2–3 weeks' },
  { t: 'Deployment', d: 'We publish your application to the Google Play Store and Apple App Store while ensuring compliance with platform guidelines.', icon: 'fa-rocket', duration: '1–2 weeks' },
  { t: 'Maintenance & Support', d: 'We provide ongoing updates, feature enhancements, security patches, and technical support.', icon: 'fa-headset', duration: 'Ongoing' },
];

const WHY_US = [
  'Experienced Mobile App Developers',
  'Custom Mobile Solutions',
  'Modern UI/UX Design',
  'Agile Development Process',
  'Enterprise-Grade Security',
  'Scalable Architecture',
  'Cross-Platform Expertise',
  'Seamless API Integrations',
  'Transparent Project Management',
  'Competitive Pricing',
  'On-Time Delivery',
  'Ongoing Maintenance & Support',
];

const FAQ = [
  { q: 'Which platforms do you develop for?', a: 'We develop native Android and iOS applications, as well as cross-platform solutions using Flutter and React Native.' },
  { q: 'How long does it take to build a mobile app?', a: 'Project timelines vary based on complexity. A simple app may take 8–12 weeks, while enterprise solutions typically require several months.' },
  { q: 'Can you integrate third-party services?', a: 'Yes. We integrate payment gateways, maps, CRM systems, ERP platforms, social media, cloud services, analytics tools, and many other APIs.' },
  { q: 'Will my app be published to the App Store and Google Play?', a: 'Yes. We handle the submission and publishing process for both stores and ensure compliance with their requirements.' },
  { q: 'Do you provide maintenance after launch?', a: 'Absolutely. We offer ongoing maintenance, updates, performance optimization, security monitoring, and technical support.' },
];

const RELATED = [
  ['web-application.html', 'Web Application Development'],
  ['ui-ux-design.html', 'UI/UX Design Services'],
  ['api-development.html', 'API Development & Integration'],
  ['devops.html', 'Cloud & DevOps Solutions'],
  ['ai-development.html', 'AI Development Services'],
  ['crm.html', 'CRM Development'],
  ['erp.html', 'ERP Development'],
  ['ecommerce.html', 'E-Commerce Development'],
];

const TECH = [
  { icon: 'fa-mobile-screen', title: 'Cross-Platform', items: ['Flutter', 'React Native', 'Ionic', '.NET MAUI'] },
  { icon: 'fa-brands fa-android', title: 'Android', items: ['Kotlin', 'Java'] },
  { icon: 'fa-brands fa-apple', title: 'iOS', items: ['Swift', 'SwiftUI'] },
  { icon: 'fa-server', title: 'Backend', items: ['Laravel', 'Node.js', 'ASP.NET Core', 'Django'] },
  { icon: 'fa-database', title: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase Firestore'] },
  { icon: 'fa-cloud', title: 'Cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud Platform'] },
  { icon: 'fa-plug', title: 'APIs & Integrations', items: ['REST API', 'GraphQL', 'Firebase', 'Google Maps', 'Twilio', 'Stripe', 'PayPal'] },
];

export function renderCustomMobileAppMain() {
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
              <span class="text-slate-900 font-semibold">Mobile App Development</span>
            </nav>

            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7 mx-auto" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>Mobile App Development Services</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>

            <h1 id="cma-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5 text-center mx-auto" data-aos="fade-up" data-aos-delay="50">Build Powerful Mobile Apps That<br class="hidden sm:block"><span class="block sm:inline mt-2 sm:mt-0 hero-title-navy__line hero-title-navy__line--inline">Transform Your Business</span></h1>

            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">Deliver exceptional digital experiences with custom mobile applications built for Android, iOS, and cross-platform devices. We design and develop secure, scalable, and high-performance mobile solutions that engage users, streamline operations, and accelerate business growth.</p>

            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9 justify-center" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Start Your Mobile App Project <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <i class="fas fa-calendar-check text-cyan-600"></i> Book a Free Consultation
              </a>
            </div>

            <div class="hero-enter hero-enter-d5 hero-enterprise-grid hero-enterprise-grid--center" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-layer-group" aria-hidden="true"></i></span>
                <div>
                  <strong>Scalable Architecture</strong>
                  <p>Cloud-native backends that grow with your users and feature roadmap.</p>
                </div>
              </article>
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                <div>
                  <strong>Security Focused</strong>
                  <p>Encryption, biometrics, and compliance-ready design from day one.</p>
                </div>
              </article>
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-code" aria-hidden="true"></i></span>
                <div>
                  <strong>Modern Technology</strong>
                  <p>Swift, Kotlin, Flutter &amp; React Native — matched to your goals.</p>
                </div>
              </article>
              <article class="hero-enterprise-card">
                <span class="hero-enterprise-card__icon"><i class="fas fa-headset" aria-hidden="true"></i></span>
                <div>
                  <strong>Dedicated Support</strong>
                  <p>Named account team with SLA-backed response and proactive monitoring.</p>
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
    </section>`;

  const intro = parallaxSection({
    id: 'cma-intro',
    bg: '../../sliders/15.jpg',
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-building" aria-hidden="true"></i> Mobile App Development Company</span>
        <h2 id="cma-intro-heading" class="cma-title">Transform Your Ideas into <span style="color:#10A5F5">Exceptional Mobile Applications</span></h2>
        <p class="cma-lead">Mobile applications have become an essential part of modern business, helping organizations connect with customers, automate processes, and unlock new revenue opportunities. Our experienced mobile app developers create intuitive, feature-rich applications tailored to your business goals.</p>
        <p class="cma-lead mt-4">Whether you're a startup launching an innovative product or an enterprise modernizing your digital ecosystem, we deliver mobile solutions that are scalable, secure, and built for long-term success.</p>
      </header>
    </div>`,
  });

  const whySection = `<section id="cma-why" class="py-20 sm:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Choose Mobile App Development?</h2>
        <p class="cma-lead">A professionally developed mobile application enables your business to reach new heights.</p>
      </header>
      <div class="cma-check-grid">${WHY_BENEFITS.map((b, i) =>
        `<div class="cma-check-item" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 280)}"><i class="fas fa-circle-check" aria-hidden="true"></i>${esc(b)}</div>`
      ).join('')}</div>
    </div>
  </section>`;

  const servicesSection = `<section id="cma-services" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-layer-group" aria-hidden="true"></i> Our Services</span>
        <h2 class="cma-title">Our Mobile App Development Services</h2>
        <p class="cma-lead">End-to-end mobile solutions — from native apps to enterprise platforms and on-demand marketplaces.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${SERVICES.map((s, i) =>
        glowCard({ ...s, delay: i * 55 })
      ).join('')}</div>
    </div>
  </section>`;

  const featuresParallax = parallaxSection({
    id: 'cma-features',
    bg: '../../sliders/22.jpg',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head cma-section-head--light" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-star" aria-hidden="true"></i> Enterprise Features</span>
        <h2 id="cma-features-heading" class="cma-title">Mobile App Features</h2>
        <p class="cma-lead">Our mobile applications include enterprise-grade functionality built for scale, security, and user delight.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${FEATURE_GROUPS.map((f, i) =>
        glowCard({ ...f, dark: true, delay: i * 50 })
      ).join('')}</div>
    </div>`,
  });

  const industriesSection = renderIndustriesParallaxSection({
    industries: [
      { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'HIPAA-aware telehealth, patient portals, and clinical mobility.' },
      { icon: 'fa-graduation-cap', name: 'Education', desc: 'LMS, e-learning, and campus engagement applications.' },
      { icon: 'fa-landmark', name: 'Finance', desc: 'Secure banking, payments, and compliance-ready fintech apps.' },
      { icon: 'fa-bag-shopping', name: 'Retail', desc: 'Omnichannel commerce, loyalty, and in-store mobile experiences.' },
      { icon: 'fa-store', name: 'E-commerce', desc: 'Marketplace, checkout, and fulfillment mobile platforms.' },
      { icon: 'fa-building', name: 'Real Estate', desc: 'Property search, CRM, and virtual tour applications.' },
      { icon: 'fa-truck', name: 'Logistics', desc: 'Fleet tracking, routing, and last-mile delivery apps.' },
      { icon: 'fa-industry', name: 'Manufacturing', desc: 'Field service, IoT dashboards, and production mobility.' },
      { icon: 'fa-landmark-dome', name: 'Government', desc: 'Citizen services and secure public-sector mobile systems.' },
    ],
    slug: 'custom-mobile-app-development',
    bg: '../../sliders/25.jpg',
    sectionId: 'cma-industries',
    lead: 'We build mobile applications for a wide range of industries with domain-aware compliance and workflows.',
    pathPrefix: '../../',
  });

  const processHubCta = renderProcessHubCta({ linkPrefix: '../' });

  const whyUsSection = `<section id="cma-why-us" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Choose Our Mobile App Development Services?</h2>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-4 gap-4">${WHY_US.map((w, i) =>
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
    title: 'Frequently Asked Questions',
    subtitle: 'Common questions about our mobile app development services.',
    faqs: FAQ,
    aos: true,
  });

  const ctaParallax = parallaxSection({
    id: 'cma-cta',
    bg: '../../sliders/32.jpg',
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 cma-cta-band" data-aos="fade-up">
      <h2 id="cma-cta-heading">Ready to Build Your Mobile App?</h2>
      <p>Turn your vision into a powerful mobile application that delights users and drives business growth. Whether you need a customer-facing app, an enterprise solution, or an on-demand platform, our experienced team is ready to deliver a secure, scalable, and high-performance product tailored to your goals.</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="../contact.html" class="cma-btn-primary">Get a Free Quote <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="#svc-contact" class="cma-btn-outline"><i class="fas fa-calendar-check" aria-hidden="true"></i> Schedule a Consultation</a>
      </div>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="cpox-contact-grid">
        <div class="cpox-contact-aside" data-aos="fade-up">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
          <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">Mobile App Project</span></h2>
          <p class="cpox-lead">Tell us about your app idea. We respond within one business day.</p>
          <ul class="cpox-contact-list">
            <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
            <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:+447908727559">07908 727559</a></li>
            <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
          </ul>
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
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your mobile app requirements..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  const relatedSection = `<section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
      <div class="flex flex-wrap gap-3">${RELATED.map(([href, label]) =>
        `<a href="${href}" class="svc-related__link"><i class="fas fa-arrow-right"></i>${esc(label)}</a>`
      ).join('')}</div>
    </div>
  </section>`;

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
    <div class="slp-sticky-nav__inner">
      <a href="#cma-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
      <a href="#cma-features" class="slp-sticky-nav__link" data-svc-nav-link>Features</a>
      <a href="#cma-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
      <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
    </div>
  </nav>`;

  return `
    ${hero}
    ${stickyNav}
    ${intro}
    ${whySection}
    ${servicesSection}
    ${featuresParallax}
    ${industriesSection}
    ${processHubCta}
    ${whyUsSection}
    ${faqSection}
    ${ctaParallax}
    ${contactSection}
    ${relatedSection}
  `;
}

export function renderCustomMobileAppFaqsJsonLd() {
  return FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}
