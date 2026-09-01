/**
 * ERP Development — Why Choose / Unified Operations hub section
 */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const ERP_BENEFITS = [
  { icon: 'fa-sitemap', text: 'Centralize all business operations' },
  { icon: 'fa-bolt', text: 'Improve productivity through automation' },
  { icon: 'fa-circle-check', text: 'Reduce manual processes and errors' },
  { icon: 'fa-eye', text: 'Increase operational visibility' },
  { icon: 'fa-boxes-stacked', text: 'Manage finance, HR, inventory, and procurement in one system' },
  { icon: 'fa-chart-line', text: 'Enable real-time reporting and analytics' },
  { icon: 'fa-people-group', text: 'Improve collaboration across departments' },
  { icon: 'fa-arrow-up-right-dots', text: 'Scale your business with confidence' },
];

const SCALABLE_FEATURES = [
  'Cloud-native infrastructure',
  'Modular ERP architecture',
  'Multi-company support',
  'Multi-branch management',
  'Multi-language capability',
  'Multi-currency support',
  'High-performance databases',
  'Horizontal scalability',
];

const SECURITY_FEATURES = [
  'Zero-Trust Security Architecture',
  'End-to-End Data Encryption',
  'Role-Based Access Control (RBAC)',
  'Multi-Factor Authentication (MFA)',
  'Single Sign-On (SSO)',
  'Audit Logs & Activity Tracking',
  'Data Backup & Disaster Recovery',
  'GDPR & Industry Compliance',
  'Security Monitoring',
  'API Security Protection',
];

const TECH_STACK = [
  {
    icon: 'fa-display',
    title: 'Frontend',
    items: ['React.js', 'Angular', 'Vue.js', 'Next.js'],
  },
  {
    icon: 'fa-server',
    title: 'Backend',
    items: ['Laravel', 'Node.js', 'ASP.NET Core', 'Django', 'Spring Boot'],
  },
  {
    icon: 'fa-database',
    title: 'Database',
    items: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'MongoDB'],
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud Platforms',
    items: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform', 'DigitalOcean'],
  },
];

const SUPPORT_SERVICES = [
  'Dedicated Project Manager',
  'SLA-Based Technical Support',
  '24/7 System Monitoring',
  'Performance Optimization',
  'Security Updates & Patch Management',
  'Feature Enhancements',
  'User Training',
  'Preventive Maintenance',
  'System Health Reports',
  'Technical Consultation',
];

const WHY_BUSINESSES = [
  { icon: 'fa-sliders', text: 'Fully Customized ERP Development' },
  { icon: 'fa-industry', text: 'Industry-Specific Business Solutions' },
  { icon: 'fa-shield-halved', text: 'Enterprise-Grade Security Standards' },
  { icon: 'fa-cloud', text: 'Cloud-Ready Architecture' },
  { icon: 'fa-brain', text: 'AI & Business Intelligence Integration' },
  { icon: 'fa-plug', text: 'Seamless Third-Party Integrations' },
  { icon: 'fa-mobile-screen', text: 'User-Friendly Interface' },
  { icon: 'fa-arrows-spin', text: 'Agile Development Methodology' },
  { icon: 'fa-clipboard-list', text: 'Transparent Project Management' },
  { icon: 'fa-handshake', text: 'Long-Term Technical Partnership' },
];

function renderBenefit(item, i) {
  return `<article class="erp-why__benefit" data-aos="fade-up" data-aos-delay="${Math.min(i * 45, 280)}">
    <span class="erp-why__benefit-icon"><i class="fas ${esc(item.icon)}" aria-hidden="true"></i></span>
    <p class="erp-why__benefit-text">${esc(item.text)}</p>
  </article>`;
}

function renderFeatureList(items) {
  return `<ul class="erp-why__feature-list">${items.map((item) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i><span>${esc(item)}</span></li>`
  ).join('')}</ul>`;
}

function renderTechColumn(col, i) {
  return `<article class="erp-why__tech-col" data-aos="fade-up" data-aos-delay="${80 + i * 60}">
    <span class="erp-why__tech-icon"><i class="fas ${esc(col.icon)}" aria-hidden="true"></i></span>
    <h4 class="erp-why__tech-title">${esc(col.title)}</h4>
    <ul class="erp-why__tech-list">${col.items.map((item) =>
      `<li>${esc(item)}</li>`
    ).join('')}</ul>
  </article>`;
}

function renderWhyItem(item, i) {
  return `<article class="erp-why__why-item" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 240)}">
    <span class="erp-why__why-icon"><i class="fas ${esc(item.icon)}" aria-hidden="true"></i></span>
    <p>${esc(item.text)}</p>
  </article>`;
}

export function renderErpWhySection(opts = {}) {
  const sectionId = opts.sectionId || 'svc-whyChoose';
  const contactLink = opts.contactLink || '#svc-contact';
  const strategyLink = opts.strategyLink || contactLink;

  return `
    <section id="${sectionId}" class="erp-why" aria-labelledby="erp-why-heading">
      <div class="erp-why__block erp-why__block--light">
        <div class="erp-why__ambient" aria-hidden="true">
          <div class="erp-why__mesh"></div>
          <div class="erp-why__orb erp-why__orb--1"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="erp-why__head" data-aos="fade-up">
            <span class="erp-why__eyebrow"><i class="fas fa-diagram-project" aria-hidden="true"></i> ERP Development Services</span>
            <h2 id="erp-why-heading" class="erp-why__title font-display">Unified Operations. <span class="erp-why__accent">Smarter Decisions. Greater Business Efficiency.</span></h2>
            <p class="erp-why__lead">Transform your business with a powerful Enterprise Resource Planning (ERP) system that unifies finance, human resources, inventory, procurement, manufacturing, sales, customer management, and daily operations into one intelligent platform. Our custom ERP development services help organizations eliminate data silos, automate workflows, improve collaboration, and gain real-time insights that drive productivity and sustainable growth.</p>
            <p class="erp-why__lead erp-why__lead--secondary">Whether you're a growing business or a large enterprise, we build scalable, cloud-native ERP solutions tailored to your unique processes, enabling you to streamline operations, reduce costs, and make faster, data-driven decisions.</p>
            <div class="erp-why__hero-ctas">
              <a href="${esc(contactLink)}" class="erp-why__cta erp-why__cta--primary">Get Started <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="${esc(strategyLink)}" class="erp-why__cta erp-why__cta--secondary"><i class="fas fa-calendar-check" aria-hidden="true"></i> Book a Strategy Session</a>
            </div>
          </header>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--dark">
        <div class="erp-why__ambient erp-why__ambient--dark" aria-hidden="true">
          <div class="erp-why__grid-lines"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="erp-why__head erp-why__head--light" data-aos="fade-up">
            <span class="erp-why__eyebrow erp-why__eyebrow--dark"><i class="fas fa-star" aria-hidden="true"></i> Why Choose Us</span>
            <h3 class="erp-why__title erp-why__title--light font-display">Why Choose Our ERP Development Services?</h3>
            <p class="erp-why__lead erp-why__lead--light">We design and develop enterprise ERP platforms that integrate every department into one centralized system. Our solutions provide complete visibility across your business, helping management monitor performance, optimize resources, and improve operational efficiency.</p>
          </header>
          <p class="erp-why__subhead" data-aos="fade-up">Our ERP Solutions Help You:</p>
          <div class="erp-why__benefits">${ERP_BENEFITS.map(renderBenefit).join('')}</div>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--soft">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <header class="erp-why__head" data-aos="fade-up">
            <span class="erp-why__eyebrow"><i class="fas fa-building" aria-hidden="true"></i> Enterprise ERP</span>
            <h3 class="erp-why__title font-display">Enterprise ERP Built for <span class="erp-why__accent">Modern Businesses</span></h3>
          </header>
          <div class="erp-why__pillars">
            <article class="erp-why__pillar" data-aos="fade-up" data-aos-delay="0">
              <div class="erp-why__pillar-head">
                <span class="erp-why__pillar-icon"><i class="fas fa-layer-group" aria-hidden="true"></i></span>
                <div>
                  <h4 class="erp-why__pillar-title">Scalable Architecture</h4>
                  <p class="erp-why__pillar-lead">Our ERP solutions are built using modern cloud-native architecture that grows alongside your organization. Whether you have hundreds or millions of records, multiple business locations, or thousands of users, your ERP platform remains fast, reliable, and highly available.</p>
                </div>
              </div>
              <p class="erp-why__pillar-label">Features Include:</p>
              ${renderFeatureList(SCALABLE_FEATURES)}
            </article>
            <article class="erp-why__pillar erp-why__pillar--security" data-aos="fade-up" data-aos-delay="80">
              <div class="erp-why__pillar-head">
                <span class="erp-why__pillar-icon erp-why__pillar-icon--security"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                <div>
                  <h4 class="erp-why__pillar-title">Enterprise-Grade Security</h4>
                  <p class="erp-why__pillar-lead">Protect your business-critical information with advanced security features designed to safeguard sensitive financial records, employee information, customer data, and operational processes.</p>
                </div>
              </div>
              <p class="erp-why__pillar-label">Security Features:</p>
              ${renderFeatureList(SECURITY_FEATURES)}
            </article>
          </div>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--navy">
        <div class="erp-why__ambient erp-why__ambient--dark" aria-hidden="true">
          <div class="erp-why__grid-lines"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="erp-why__head erp-why__head--light" data-aos="fade-up">
            <span class="erp-why__eyebrow erp-why__eyebrow--dark"><i class="fas fa-code" aria-hidden="true"></i> Technology</span>
            <h3 class="erp-why__title erp-why__title--light font-display">Modern Technology Stack</h3>
            <p class="erp-why__lead erp-why__lead--light">We use industry-leading technologies to build secure, scalable, and future-ready ERP platforms that deliver exceptional performance across web, mobile, and cloud environments.</p>
          </header>
          <div class="erp-why__tech-grid">${TECH_STACK.map(renderTechColumn).join('')}</div>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <article class="erp-why__support" data-aos="fade-up">
            <div class="erp-why__support-copy">
              <span class="erp-why__eyebrow"><i class="fas fa-headset" aria-hidden="true"></i> Ongoing Partnership</span>
              <h3 class="erp-why__title font-display">Dedicated Support &amp; <span class="erp-why__accent">Continuous Improvement</span></h3>
              <p class="erp-why__lead">Our partnership doesn't end after deployment. We provide comprehensive post-launch support to ensure your ERP system remains secure, optimized, and aligned with your evolving business needs.</p>
              <p class="erp-why__pillar-label erp-why__pillar-label--left">Support Services Include:</p>
            </div>
            <div class="erp-why__support-grid">${SUPPORT_SERVICES.map((item, i) =>
              `<div class="erp-why__support-item" data-aos="fade-up" data-aos-delay="${Math.min(i * 35, 280)}"><i class="fas fa-check-circle" aria-hidden="true"></i><span>${esc(item)}</span></div>`
            ).join('')}</div>
          </article>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--dark">
        <div class="erp-why__ambient erp-why__ambient--dark" aria-hidden="true">
          <div class="erp-why__grid-lines"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="erp-why__head erp-why__head--light" data-aos="fade-up">
            <span class="erp-why__eyebrow erp-why__eyebrow--dark"><i class="fas fa-award" aria-hidden="true"></i> Trusted Partner</span>
            <h3 class="erp-why__title erp-why__title--light font-display">Why Businesses Choose Our ERP Solutions</h3>
          </header>
          <div class="erp-why__why-grid">${WHY_BUSINESSES.map(renderWhyItem).join('')}</div>
        </div>
      </div>

      <div class="erp-why__block erp-why__block--closing">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <article class="erp-why__closing" data-aos="fade-up">
            <div class="erp-why__closing-glow" aria-hidden="true"></div>
            <span class="erp-why__eyebrow erp-why__eyebrow--dark"><i class="fas fa-rocket" aria-hidden="true"></i> Get Started</span>
            <h3 class="erp-why__title erp-why__title--light font-display">Ready to Modernize Your Business Operations?</h3>
            <p class="erp-why__lead erp-why__lead--light">Empower your organization with a secure, scalable, and intelligent ERP solution that unifies every department, automates complex workflows, and provides real-time insights for smarter decision-making. From finance and HR to inventory, procurement, and operations, we build ERP systems that help businesses improve efficiency, reduce costs, and accelerate sustainable growth.</p>
            <div class="erp-why__hero-ctas erp-why__hero-ctas--center">
              <a href="${esc(contactLink)}" class="erp-why__cta erp-why__cta--primary">Get Started <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="${esc(strategyLink)}" class="erp-why__cta erp-why__cta--secondary erp-why__cta--secondary-dark"><i class="fas fa-calendar-check" aria-hidden="true"></i> Book a Strategy Session</a>
            </div>
          </article>
        </div>
      </div>
    </section>`;
}
