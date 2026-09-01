/**
 * Industries We Serve — tabs + accordion (site-wide SSOT)
 */
import { defaultIndustries } from './svc-shared-data.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

const INDUSTRY_TECH = {
  Healthcare: ['HIPAA', 'HL7/FHIR', 'Cloud'],
  Finance: ['PCI-DSS', 'APIs', 'Encryption'],
  Banking: ['PCI-DSS', 'Open Banking', 'Security'],
  Retail: ['E-commerce', 'Analytics', 'CRM'],
  Manufacturing: ['IoT', 'ERP', 'Predictive AI'],
  Logistics: ['GPS/TMS', 'Real-time', 'APIs'],
  Education: ['LMS', 'SSO', 'Mobile'],
  'Real Estate': ['CRM', 'Portals', '3D/VR'],
  SaaS: ['Multi-tenant', 'AWS/Azure', 'APIs'],
  Government: ['Security', 'Accessibility', 'Compliance'],
  Construction: ['Field Apps', 'BIM', 'Cloud'],
  Hospitality: ['Booking', 'POS', 'Mobile'],
  Insurance: ['Claims', 'Compliance', 'Data'],
  Telecommunications: ['5G/OSS', 'APIs', 'Scale'],
  Technology: ['Microservices', 'DevOps', 'AI/ML'],
  'Non-Profit': ['Donations', 'CRM', 'Accessibility'],
  Transportation: ['Fleet', 'Routing', 'IoT'],
  'E-commerce': ['Storefronts', 'Payments', 'CRO'],
};

const DEFAULT_TECH = ['Cloud', 'APIs', 'Security'];

const SHORT_DESC = {
  Healthcare: 'Apps that keep patient data safe and help clinics run day to day.',
  Finance: 'Banking and payment systems that stay secure and ready for audits.',
  Retail: 'Sell online and in-store with one view of stock and customers.',
  Manufacturing: 'See machine health early and connect the factory floor to ERP.',
  Logistics: 'Track fleets, plan better routes, and share live delivery updates.',
  Education: 'Online learning with easy login, mobile access, and student tools.',
  'Real Estate': 'Property listings, lead tracking, and virtual tours that convert.',
  SaaS: 'Subscription products with multi-tenant cloud built to grow.',
  Government: 'Citizen services that are secure, accessible, and easy to use.',
  Construction: 'Jobsite apps and project portals that keep teams aligned.',
  Hospitality: 'Bookings, guest apps, and POS that keep properties running smoothly.',
  Insurance: 'Claims, policies, and self-service portals customers can trust.',
  Telecommunications: 'Network and customer platforms built for scale and uptime.',
  Technology: 'Product platforms with modern APIs, DevOps, and AI-ready data.',
  Transportation: 'Fleet and mobility systems that keep people and goods moving.',
  'E-commerce': 'Storefronts and checkout flows designed to convert and scale.',
  Banking: 'Core banking and open-banking APIs with strong security controls.',
  'Non-Profit': 'Donation and CRM tools that make fundraising simpler.',
};

const SPOTLIGHT_COPY = {
  Healthcare: 'Patient portals, care coordination, and EHR-ready systems built for real clinical workflows.',
  Finance: 'Fintech and banking platforms with encryption, audit trails, and real-time data flows.',
  Retail: 'Connected commerce — inventory, CRM, and analytics working across every channel.',
  Manufacturing: 'Predictive maintenance and supply-chain tools that cut downtime on the floor.',
  Logistics: 'Routing, shipment tracking, and fleet tools that keep shipments on schedule.',
  Education: 'LMS and student apps designed for accessibility, SSO, and mobile-first learning.',
  Government: 'Public-sector systems with accessibility, security hardening, and clear delivery.',
  Construction: 'Field apps and contractor portals for jobsite visibility and compliance.',
  SaaS: 'Multi-tenant products with billing, usage metering, and cloud architecture that scales.',
  Hospitality: 'Guest booking, POS, and service apps that improve stays and operations.',
  Insurance: 'Claims and policy platforms with compliance checks built into every step.',
};

function industryTech(name) {
  return INDUSTRY_TECH[name] || DEFAULT_TECH;
}

function shortDesc(name, fallback) {
  return SHORT_DESC[name] || fallback || `Practical digital solutions for ${String(name).toLowerCase()} teams.`;
}

function spotlightCopy(name, desc) {
  return SPOTLIGHT_COPY[name] || shortDesc(name, desc);
}

function normalizeIndustries(industries) {
  return (industries || []).map((ind) => {
    if (ind && typeof ind === 'object' && ind.name) {
      return {
        icon: ind.icon,
        name: ind.name,
        desc: shortDesc(ind.name, ind.desc),
      };
    }
    if (Array.isArray(ind)) {
      return {
        icon: ind[0],
        name: ind[1],
        desc: shortDesc(ind[1], ind[2]),
      };
    }
    return null;
  }).filter(Boolean);
}

function padNum(i) {
  return String(i + 1).padStart(2, '0');
}

function renderTags(tags) {
  return tags.map((t) => `<span>${esc(t)}</span>`).join('');
}

function renderAccordionItem(ind, index, contactHref, opts = {}) {
  const n = padNum(index + 1);
  const tags = industryTech(ind.name);
  const body = opts.priority ? spotlightCopy(ind.name, ind.desc) : shortDesc(ind.name, ind.desc);
  const label = opts.priority ? 'Priority vertical' : 'Industry';

  return `            <div class="indw-acc__item" data-indw-acc-item>
              <button type="button" class="indw-acc__btn" data-indw-acc-btn aria-expanded="false">
                <span class="indw-acc__num" aria-hidden="true">${n}</span>
                <span class="indw-acc__icon" aria-hidden="true"><i class="${faIcon(ind.icon)}"></i></span>
                <span class="indw-acc__meta">
                  <span class="indw-acc__label">${label}</span>
                  <span class="indw-acc__title">${esc(ind.name)}</span>
                  <span class="indw-acc__tags indw-tags">${renderTags(tags)}</span>
                </span>
                <i class="fas fa-chevron-down indw-acc__chevron" aria-hidden="true"></i>
              </button>
              <div class="indw-acc__panel">
                <p>${esc(body)}</p>
                <div class="indw-tags">${renderTags(tags)}</div>
                <a href="${esc(contactHref)}" class="indw-acc__link">Explore solutions <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              </div>
            </div>`;
}

function renderAccordion(items, contactHref, opts = {}) {
  if (!items.length) return '';
  return `<div class="indw-acc" data-indw-acc>
${items.map((ind, i) => renderAccordionItem(ind, opts.startIndex != null ? opts.startIndex + i : i, contactHref, opts)).join('\n')}
          </div>`;
}

const TECH_PILLARS = [
  {
    icon: 'fa-shield-halved',
    title: 'Security & Compliance',
    desc: 'Identity, encryption, and audit trails built in from the start.',
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud & Data Platforms',
    desc: 'Reliable cloud systems and data pipelines that grow with you.',
  },
  {
    icon: 'fa-diagram-project',
    title: 'Systems Integration',
    desc: 'Connect CRM, ERP, and apps so your tools work as one stack.',
  },
  {
    icon: 'fa-brain',
    title: 'AI & Automation',
    desc: 'Smart workflows and assistants tailored to how your industry runs.',
  },
];

function renderTechAccordion() {
  return `<div class="indw-tech-head">
            <h3>Capabilities that travel across every industry</h3>
            <p>The same engineering standards — security, integration, data, and cloud — applied with the nuance each sector needs.</p>
          </div>
          <div class="indw-acc" data-indw-acc>
${TECH_PILLARS.map((p, i) => `            <div class="indw-acc__item" data-indw-acc-item>
              <button type="button" class="indw-acc__btn" data-indw-acc-btn aria-expanded="false">
                <span class="indw-acc__num" aria-hidden="true">${padNum(i + 1)}</span>
                <span class="indw-acc__icon" aria-hidden="true"><i class="fas ${p.icon}"></i></span>
                <span class="indw-acc__meta">
                  <span class="indw-acc__label">Technology Expertise</span>
                  <span class="indw-acc__title">${esc(p.title)}</span>
                </span>
                <i class="fas fa-chevron-down indw-acc__chevron" aria-hidden="true"></i>
              </button>
              <div class="indw-acc__panel">
                <p>${esc(p.desc)}</p>
              </div>
            </div>`).join('\n')}
          </div>`;
}

/**
 * @param {object} opts
 */
export function renderIndustriesParallaxSection(opts = {}) {
  const industries = normalizeIndustries(opts.industries?.length ? opts.industries : defaultIndustries).slice(0, 12);
  const sectionId = opts.sectionId || 'svc-industries';
  const headingId = `${sectionId}-heading`;
  const lead = opts.lead
    || 'We build secure, practical technology for your industry — clear workflows, compliance awareness, and solutions your teams can actually use.';
  const contactHref = opts.contactLink || '#svc-contact';
  const industriesHref = opts.industriesLink
    || (opts.pathPrefix != null ? `${opts.pathPrefix}pages/industries.html`.replace('pages/pages/', 'pages/') : '../industries.html');

  const priority = industries.slice(0, 3);
  const rest = industries.length > 3 ? industries.slice(3) : [];
  const all = industries;

  return `
    <section id="${esc(sectionId)}" class="indw-section" aria-labelledby="${esc(headingId)}" data-indw-root>
      <div class="indw-section__bg" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1] py-20 sm:py-28">

        <header class="indw-intro" data-aos="fade-up">
          <span class="indw-badge"><i class="fas fa-microchip" aria-hidden="true"></i> Industries · Technology Expertise</span>
          <h2 id="${esc(headingId)}" class="indw-intro__title font-display">
            Industries We <span class="indw-intro__accent">Serve</span>
          </h2>
          <p class="indw-intro__lead">${esc(lead)}</p>
        </header>

        <div class="indw-tabs" role="tablist" aria-label="Industries sections" data-aos="fade-up">
          <button type="button" class="indw-tabs__btn is-active" role="tab" data-indw-tab="priority" aria-selected="true" id="${esc(sectionId)}-tab-priority">Priority Verticals</button>
          <button type="button" class="indw-tabs__btn" role="tab" data-indw-tab="all" aria-selected="false" id="${esc(sectionId)}-tab-all">All Industries</button>
          <button type="button" class="indw-tabs__btn" role="tab" data-indw-tab="tech" aria-selected="false" id="${esc(sectionId)}-tab-tech">Technology Expertise</button>
        </div>

        <div class="indw-panel is-active" role="tabpanel" data-indw-panel="priority" aria-labelledby="${esc(sectionId)}-tab-priority" data-aos="fade-up">
          <p class="indw-panel__note">Our most requested sectors — expand any row for details.</p>
          ${renderAccordion(priority, contactHref, { priority: true, startIndex: 0 })}
        </div>

        <div class="indw-panel" role="tabpanel" data-indw-panel="all" aria-labelledby="${esc(sectionId)}-tab-all" hidden>
          <p class="indw-panel__note">Browse every industry we support — short, practical descriptions.</p>
          ${renderAccordion(all, contactHref, { priority: false, startIndex: 0 })}
        </div>

        <div class="indw-panel" role="tabpanel" data-indw-panel="tech" aria-labelledby="${esc(sectionId)}-tab-tech" hidden>
          ${renderTechAccordion()}
        </div>

        <div class="indw-cta" data-aos="fade-up">
          <div class="indw-cta__copy">
            <h3 class="indw-cta__title">Ready to digitize your industry workflows?</h3>
            <p class="indw-cta__desc">Partner with Guudle to design and deliver secure, scalable solutions purpose-built for your sector.</p>
          </div>
          <div class="indw-cta__actions">
            <a href="${esc(contactHref)}" class="indw-cta__primary">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="${esc(industriesHref)}" class="indw-cta__ghost">View All Industries <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>

      </div>
    </section>
`;
}

export { INDUSTRY_TECH, SHORT_DESC, defaultIndustries };
