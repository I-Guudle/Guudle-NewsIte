/**
 * SaaS Development — Build Modern SaaS Platforms section (replaces Industries v3)
 */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const DELIVERY_PILLARS = [
  { icon: 'fa-server', label: 'High Availability' },
  { icon: 'fa-cloud', label: 'Cloud Scalability' },
  { icon: 'fa-shield-halved', label: 'Enterprise Security' },
  { icon: 'fa-layer-group', label: 'Multi-Tenant Architecture' },
  { icon: 'fa-credit-card', label: 'Subscription Management' },
  { icon: 'fa-bolt', label: 'Fast Performance' },
  { icon: 'fa-globe', label: 'Global Accessibility' },
  { icon: 'fa-lightbulb', label: 'Continuous Innovation' },
];

const SAAS_TYPES = [
  { icon: 'fa-users', label: 'CRM SaaS Platforms' },
  { icon: 'fa-building', label: 'ERP SaaS Solutions' },
  { icon: 'fa-id-badge', label: 'HR & Payroll Systems' },
  { icon: 'fa-calculator', label: 'Accounting & Finance Software' },
  { icon: 'fa-list-check', label: 'Project Management Platforms' },
  { icon: 'fa-graduation-cap', label: 'Learning Management Systems (LMS)' },
  { icon: 'fa-heart-pulse', label: 'Healthcare SaaS Solutions' },
  { icon: 'fa-stethoscope', label: 'Telemedicine Platforms' },
  { icon: 'fa-house', label: 'Property Management Systems' },
  { icon: 'fa-building-columns', label: 'Real Estate SaaS' },
  { icon: 'fa-boxes-stacked', label: 'Inventory Management Systems' },
  { icon: 'fa-warehouse', label: 'Warehouse Management Software' },
  { icon: 'fa-hotel', label: 'Hotel & Hospitality Platforms' },
  { icon: 'fa-utensils', label: 'Restaurant Management Systems' },
  { icon: 'fa-cart-shopping', label: 'E-Commerce SaaS Platforms' },
  { icon: 'fa-store', label: 'Multi-Vendor Marketplaces' },
  { icon: 'fa-hard-hat', label: 'Construction Management Software' },
  { icon: 'fa-calendar-check', label: 'Appointment Booking Systems' },
  { icon: 'fa-headset', label: 'Customer Support Platforms' },
  { icon: 'fa-bullhorn', label: 'Marketing Automation Platforms' },
  { icon: 'fa-robot', label: 'AI-Powered SaaS Products' },
  { icon: 'fa-chart-line', label: 'Business Intelligence Platforms' },
  { icon: 'fa-gears', label: 'Workflow Automation Software' },
  { icon: 'fa-folder-open', label: 'Document Management Systems' },
  { icon: 'fa-id-card', label: 'Membership & Subscription Platforms' },
];

const CORE_CAPABILITIES = [
  'Multi-Tenant Architecture', 'Subscription Billing', 'Customer Onboarding',
  'User & Role Management', 'Workspace Management', 'Team Collaboration',
  'Cloud Deployment', 'API-First Architecture', 'Enterprise Security', 'Real-Time Analytics',
];

const FEATURE_MODULES = [
  {
    id: 'billing',
    icon: 'fa-credit-card',
    accent: 'cyan',
    title: 'Subscription & Billing',
    items: [
      'Monthly & Annual Plans', 'Free Trial Management', 'Recurring Billing',
      'Usage-Based Pricing', 'Invoice Generation', 'Coupon & Discount Management',
      'Subscription Upgrades & Downgrades', 'Automated Payment Collection',
    ],
  },
  {
    id: 'multitenant',
    icon: 'fa-layer-group',
    accent: 'indigo',
    title: 'Multi-Tenant Architecture',
    desc: 'Develop secure platforms that support multiple organizations from a single application while keeping each tenant\'s data fully isolated.',
    items: [
      'Tenant Isolation', 'Custom Domains', 'White Label Solutions', 'Organization Management',
      'Workspace Configuration', 'User Permissions', 'Tenant Analytics', 'Dedicated Resource Allocation',
    ],
  },
  {
    id: 'onboarding',
    icon: 'fa-route',
    accent: 'violet',
    title: 'Customer Onboarding',
    desc: 'Deliver a smooth onboarding experience that increases user adoption and customer retention.',
    items: [
      'Guided Setup Wizard', 'Product Tours', 'Interactive Tutorials', 'Email Verification',
      'Account Activation', 'Profile Setup', 'Team Invitations', 'Welcome Automation',
    ],
  },
  {
    id: 'identity',
    icon: 'fa-user-shield',
    accent: 'teal',
    title: 'User & Identity Management',
    items: [
      'Secure Authentication', 'Social Login', 'Multi-Factor Authentication', 'Single Sign-On (SSO)',
      'Role-Based Access Control', 'Organization Management', 'User Invitations', 'Audit Logs',
    ],
  },
  {
    id: 'analytics',
    icon: 'fa-chart-pie',
    accent: 'sky',
    title: 'Analytics & Reporting',
    desc: 'Gain valuable insights into your business performance through real-time dashboards and intelligent reporting.',
    items: [
      'Revenue Analytics', 'Customer Insights', 'Subscription Metrics', 'Churn Analysis',
      'User Activity Reports', 'KPI Dashboards', 'Financial Reports', 'Growth Analytics',
    ],
  },
  {
    id: 'automation',
    icon: 'fa-gears',
    accent: 'emerald',
    title: 'Workflow Automation',
    desc: 'Automate repetitive tasks and streamline business operations.',
    items: [
      'Approval Workflows', 'Email Automation', 'Task Automation', 'Notifications',
      'Scheduled Jobs', 'Customer Lifecycle Automation', 'CRM Integration', 'Marketing Automation',
    ],
  },
];

const INTEGRATIONS = [
  'Stripe', 'PayPal', 'Microsoft 365', 'Google Workspace', 'Slack', 'Zoom',
  'Salesforce', 'HubSpot', 'Mailchimp', 'Twilio', 'WhatsApp Business', 'QuickBooks',
  'Xero', 'REST APIs', 'GraphQL APIs',
];

const CLOUD_NATIVE = [
  'Auto Scaling', 'Load Balancing', 'Containerization', 'Kubernetes', 'Docker',
  'CI/CD Pipelines', 'High Availability', 'Disaster Recovery', 'Backup & Restore', 'CDN Integration',
];

const SECURITY_FEATURES = [
  'End-to-End Encryption', 'Secure APIs', 'SSL Certificates', 'Firewall Protection',
  'Data Backup', 'Intrusion Detection', 'Vulnerability Scanning', 'Security Monitoring',
  'Audit Logs', 'GDPR Compliance', 'HIPAA-Ready Architecture', 'Role-Based Permissions',
];

function renderPillar(p, i) {
  return `<article class="saas-plat__pillar" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 280)}">
    <span class="saas-plat__pillar-icon"><i class="fas ${esc(p.icon)}" aria-hidden="true"></i></span>
    <span class="saas-plat__pillar-label">${esc(p.label)}</span>
  </article>`;
}

function renderType(t, i) {
  return `<article class="saas-plat__type" data-aos="fade-up" data-aos-delay="${Math.min(i * 25, 300)}">
    <span class="saas-plat__type-icon"><i class="fas ${esc(t.icon)}" aria-hidden="true"></i></span>
    <h3 class="saas-plat__type-label">${esc(t.label)}</h3>
  </article>`;
}

function renderCapChip(label, i) {
  return `<span class="saas-plat__cap-chip" data-aos="fade-up" data-aos-delay="${Math.min(i * 30, 240)}">${esc(label)}</span>`;
}

function renderFeatureModule(m, i) {
  const desc = m.desc
    ? `<p class="saas-plat__feat-desc">${esc(m.desc)}</p>`
    : '';
  const items = m.items.map((item) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(item)}</li>`
  ).join('');

  return `<article class="saas-plat__feat saas-plat__feat--${m.accent}" data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 360)}">
    <div class="saas-plat__feat-glow" aria-hidden="true"></div>
    <div class="saas-plat__feat-head">
      <span class="saas-plat__feat-icon"><i class="fas ${esc(m.icon)}" aria-hidden="true"></i></span>
      <h3 class="saas-plat__feat-title">${esc(m.title)}</h3>
    </div>
    ${desc}
    <ul class="saas-plat__feat-list">${items}</ul>
  </article>`;
}

function renderTag(label, i) {
  return `<span class="saas-plat__tag" data-aos="fade-up" data-aos-delay="${Math.min(i * 20, 200)}">${esc(label)}</span>`;
}

export function renderSaasPlatformsSection(opts = {}) {
  const sectionId = opts.sectionId || 'svc-industries';
  const contactLink = opts.contactLink || '#svc-contact';

  return `
    <section id="${sectionId}" class="saas-plat" aria-labelledby="saas-plat-heading">
      <div class="saas-plat__ambient saas-plat__ambient--hero" aria-hidden="true">
        <div class="saas-plat__mesh"></div>
        <div class="saas-plat__orb saas-plat__orb--1"></div>
        <div class="saas-plat__orb saas-plat__orb--2"></div>
      </div>

      <div class="saas-plat__block saas-plat__block--light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="saas-plat__head" data-aos="fade-up">
            <span class="saas-plat__eyebrow"><i class="fas fa-cloud" aria-hidden="true"></i> SaaS Platforms</span>
            <h2 id="saas-plat-heading" class="saas-plat__title font-display">Build Modern SaaS Platforms for <span class="saas-plat__accent">Every Industry</span></h2>
            <p class="saas-plat__lead">We help startups, SMEs, and enterprises build innovative SaaS products that simplify workflows, automate business processes, and generate recurring revenue.</p>
          </header>
          <p class="saas-plat__subhead" data-aos="fade-up" data-aos-delay="60">Our SaaS solutions are engineered to deliver:</p>
          <div class="saas-plat__pillars" role="list">${DELIVERY_PILLARS.map(renderPillar).join('')}</div>
        </div>
      </div>

      <div class="saas-plat__block saas-plat__block--dark">
        <div class="saas-plat__ambient saas-plat__ambient--dark" aria-hidden="true">
          <div class="saas-plat__grid-lines"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="saas-plat__head saas-plat__head--light" data-aos="fade-up">
            <span class="saas-plat__eyebrow saas-plat__eyebrow--dark"><i class="fas fa-th-large" aria-hidden="true"></i> SaaS Applications</span>
            <h3 class="saas-plat__title saas-plat__title--light font-display">Our SaaS Development Services</h3>
            <p class="saas-plat__lead saas-plat__lead--light">We build a wide variety of cloud-based SaaS applications, including:</p>
          </header>
          <div class="saas-plat__types" role="list">${SAAS_TYPES.map(renderType).join('')}</div>
        </div>
      </div>

      <div class="saas-plat__block saas-plat__block--soft">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <header class="saas-plat__head" data-aos="fade-up">
            <span class="saas-plat__eyebrow"><i class="fas fa-rocket" aria-hidden="true"></i> Built for Growth</span>
            <h3 class="saas-plat__title font-display">SaaS Solutions Built for <span class="saas-plat__accent">Growth</span></h3>
            <p class="saas-plat__lead">Every SaaS application is designed with scalability, flexibility, and business continuity in mind.</p>
          </header>
          <h4 class="saas-plat__section-label" data-aos="fade-up">Core Capabilities</h4>
          <div class="saas-plat__cap-chips">${CORE_CAPABILITIES.map(renderCapChip).join('')}</div>
        </div>
      </div>

      <div class="saas-plat__block saas-plat__block--dark">
        <div class="saas-plat__ambient saas-plat__ambient--dark" aria-hidden="true"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="saas-plat__head saas-plat__head--light" data-aos="fade-up">
            <span class="saas-plat__eyebrow saas-plat__eyebrow--dark"><i class="fas fa-star" aria-hidden="true"></i> Enterprise SaaS Features</span>
            <h3 class="saas-plat__title saas-plat__title--light font-display">Enterprise-Grade SaaS <span class="saas-plat__accent-light">Capabilities</span></h3>
          </header>
          <div class="saas-plat__feat-grid">${FEATURE_MODULES.map(renderFeatureModule).join('')}</div>
        </div>
      </div>

      <div class="saas-plat__block saas-plat__block--light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div class="saas-plat__split">
            <div class="saas-plat__split-copy" data-aos="fade-right">
              <span class="saas-plat__eyebrow"><i class="fas fa-plug" aria-hidden="true"></i> Integrations</span>
              <h3 class="saas-plat__title font-display">API &amp; <span class="saas-plat__accent">Integrations</span></h3>
              <p class="saas-plat__lead">Connect your SaaS platform with leading business applications.</p>
              <p class="saas-plat__subhead">Supported integrations include:</p>
            </div>
            <div class="saas-plat__tags-wrap" data-aos="fade-left">${INTEGRATIONS.map(renderTag).join('')}</div>
          </div>
        </div>
      </div>

      <div class="saas-plat__block saas-plat__block--navy">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div class="saas-plat__dual">
            <article class="saas-plat__panel" data-aos="fade-up">
              <div class="saas-plat__panel-glow" aria-hidden="true"></div>
              <span class="saas-plat__panel-icon"><i class="fas fa-cloud-arrow-up" aria-hidden="true"></i></span>
              <h3 class="saas-plat__panel-title">Cloud-Native Architecture</h3>
              <p class="saas-plat__panel-desc">Our SaaS platforms are built using modern cloud technologies for maximum reliability and performance.</p>
              <ul class="saas-plat__panel-list">${CLOUD_NATIVE.map((item) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(item)}</li>`).join('')}</ul>
            </article>
            <article class="saas-plat__panel saas-plat__panel--security" data-aos="fade-up" data-aos-delay="80">
              <div class="saas-plat__panel-glow" aria-hidden="true"></div>
              <span class="saas-plat__panel-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
              <h3 class="saas-plat__panel-title">Security &amp; Compliance</h3>
              <p class="saas-plat__panel-desc">Enterprise-grade security is built into every SaaS platform.</p>
              <p class="saas-plat__panel-sub">Security Features</p>
              <ul class="saas-plat__panel-list saas-plat__panel-list--cols">${SECURITY_FEATURES.map((item) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(item)}</li>`).join('')}</ul>
            </article>
          </div>
          <footer class="saas-plat__footer" data-aos="fade-up">
            <p class="saas-plat__footer-text"><i class="fas fa-rocket" aria-hidden="true"></i> Ready to launch a scalable SaaS product that drives recurring revenue?</p>
            <a href="${esc(contactLink)}" class="saas-plat__footer-cta">Start Your SaaS Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </footer>
        </div>
      </div>
    </section>`;
}
