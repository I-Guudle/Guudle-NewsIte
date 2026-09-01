/**
 * Our Development Process — full page renderer (pages/our-process.html)
 */
import { renderDevProcessSection } from './dev-process-render.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection, industriesFromTuples } from './industries-parallax-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function unsplash(photoId, w = 900) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=82&auto=format&fit=crop`;
}

export const PROCESS_OG_IMAGE = unsplash('photo-1522071820081-009f0129c71c', 1200);

const IMG = {
  hero: unsplash('photo-1522071820081-009f0129c71c', 900),
  lifecycle: unsplash('photo-1551434678-e076c223a692', 1600),
  agile: unsplash('photo-1454165804606-c3d57bc86b40', 1600),
  workflow: unsplash('photo-1460925895917-afdab827c52f', 1600),
  security: unsplash('photo-1558494949-ef010cbdcc31', 1600),
  industries: unsplash('photo-1451187580459-43490279c0fa', 1600),
  cta: unsplash('photo-1498050108023-c5249f4df085', 1600),
};

const LIFECYCLE_STEPS = [
  {
    t: 'Discovery', d: 'Deep discovery workshops to understand business goals, users, constraints, and success criteria before any build commitment.',
    detail: 'Collaborative sessions with stakeholders to define scope, priorities, and measurable outcomes.',
    icon: 'fa-magnifying-glass', duration: '1–2 weeks',
    deliverables: ['Requirements gathering', 'Business goals', 'Stakeholder meetings', 'Market research', 'Feasibility study'],
  },
  {
    t: 'Planning', d: 'Structured planning with project scope, roadmap, technology selection, and risk mitigation strategies.',
    detail: 'Architecture blueprint and sprint plan aligned to budget, timeline, and ROI targets.',
    icon: 'fa-clipboard-list', duration: '1–2 weeks',
    deliverables: ['Project scope', 'Roadmap', 'Technology selection', 'Architecture planning', 'Risk assessment'],
  },
  {
    t: 'UI/UX Design', d: 'User-centered design with research, wireframes, prototypes, and accessible design systems.',
    detail: 'WCAG-aware interfaces validated with users and engineering before development begins.',
    icon: 'fa-pen-nib', duration: '2–4 weeks',
    deliverables: ['User research', 'Wireframes', 'User journey', 'Interactive prototype', 'Design system', 'Accessibility'],
  },
  {
    t: 'Software Architecture', d: 'Enterprise system design covering cloud, APIs, databases, security, and scalability planning.',
    detail: 'Technical foundation designed for performance, compliance, and long-term evolution.',
    icon: 'fa-sitemap', duration: '1–2 weeks',
    deliverables: ['System design', 'Cloud architecture', 'API design', 'Database design', 'Security planning', 'Scalability planning'],
  },
  {
    t: 'Development', d: 'Agile engineering across frontend, backend, APIs, databases, CMS, AI, and cloud infrastructure.',
    detail: 'Secure, scalable increments delivered in transparent two-week sprints with demos.',
    icon: 'fa-code', duration: 'Sprint-based',
    deliverables: ['Frontend development', 'Backend development', 'API development', 'Database development', 'CMS integration', 'AI integration', 'Cloud infrastructure'],
  },
  {
    t: 'Quality Assurance', d: 'Comprehensive QA across unit, integration, automation, performance, security, and accessibility testing.',
    detail: 'Regression suites and cross-browser validation before every production release.',
    icon: 'fa-shield-halved', duration: '1–2 weeks',
    deliverables: ['Unit testing', 'Integration testing', 'Automation testing', 'Performance testing', 'Security testing', 'Accessibility testing', 'Browser compatibility'],
  },
  {
    t: 'Deployment', d: 'Production deployment with CI/CD pipelines, cloud configuration, monitoring, and DNS setup.',
    detail: 'Zero-downtime releases with rollback plans and operational runbooks.',
    icon: 'fa-cloud-arrow-up', duration: '1 week',
    deliverables: ['Cloud deployment', 'CI/CD', 'Server configuration', 'Production release', 'Monitoring setup', 'DNS configuration'],
  },
  {
    t: 'Maintenance & Support', d: 'Continuous updates, optimization, bug fixes, monitoring, and feature improvements post-launch.',
    detail: 'SLA-backed support with security patches and analytics-driven roadmap iteration.',
    icon: 'fa-headset', duration: 'Ongoing',
    deliverables: ['Updates', 'Performance optimization', 'Bug fixes', 'Monitoring', 'Feature improvements', 'Security updates'],
  },
];

const WHY_PROCESS = [
  ['fa-arrows-rotate', 'Agile Methodology', 'Iterative sprints with demos, retrospectives, and continuous stakeholder feedback.'],
  ['fa-handshake', 'Client Collaboration', 'Dedicated project leads, structured reporting, and direct access to engineering teams.'],
  ['fa-chart-line', 'Continuous Improvement', 'Post-launch optimization, monitoring, and feature evolution for long-term ROI.'],
  ['fa-building', 'Enterprise Standards', 'Security review, quality gates, and compliance awareness at every phase.'],
  ['fa-eye', 'Transparency', 'Clear milestones, velocity reporting, and shared project dashboards.'],
  ['fa-calendar-check', 'Predictable Delivery', 'Risk-managed roadmaps with realistic timelines and scope control.'],
];

const AGILE_CARDS = [
  ['fa-list-check', 'Sprint Planning', 'Backlog prioritization and sprint goals aligned with business outcomes.'],
  ['fa-users', 'Daily Standups', 'Short syncs to unblock teams and maintain momentum across disciplines.'],
  ['fa-desktop', 'Sprint Review', 'Demo working software to stakeholders every sprint for fast feedback.'],
  ['fa-rotate', 'Sprint Retrospective', 'Continuous process improvement based on team and client insights.'],
  ['fa-truck-fast', 'Continuous Delivery', 'Automated pipelines shipping tested increments to staging and production.'],
  ['fa-comments', 'Continuous Feedback', 'Structured channels for requirements refinement throughout delivery.'],
];

const ROLES = [
  ['fa-chart-pie', 'Business Analyst'], ['fa-tasks', 'Project Manager'], ['fa-diagram-project', 'Solution Architect'],
  ['fa-pen-ruler', 'UI/UX Designer'], ['fa-laptop-code', 'Frontend Developer'], ['fa-server', 'Backend Developer'],
  ['fa-mobile-screen', 'Mobile Developer'], ['fa-gears', 'DevOps Engineer'], ['fa-vial', 'QA Engineer'],
  ['fa-shield-halved', 'Security Engineer'], ['fa-cloud', 'Cloud Engineer'], ['fa-user-tie', 'Product Owner'],
];

const TOOLS = [
  ['fab fa-jira', 'Jira'], ['fab fa-microsoft', 'Azure DevOps'], ['fab fa-github', 'GitHub'], ['fab fa-gitlab', 'GitLab'],
  ['fab fa-figma', 'Figma'], ['fab fa-slack', 'Slack'], ['fab fa-docker', 'Docker'], ['fas fa-paper-plane', 'Postman'],
  ['fas fa-code', 'VS Code'], ['fab fa-jenkins', 'Jenkins'], ['fas fa-mountain', 'Terraform'],
];

const QA_STANDARDS = [
  ['fa-certificate', 'ISO Standards', 'Quality management and information security alignment.'],
  ['fa-shield-halved', 'OWASP', 'Web application security best practices and vulnerability prevention.'],
  ['fa-universal-access', 'WCAG', 'Accessibility compliance for inclusive digital experiences.'],
  ['fa-code-pull-request', 'Code Reviews', 'Peer review and quality gates before every merge.'],
  ['fa-gears', 'CI/CD', 'Automated build, test, and deployment pipelines.'],
  ['fa-vial', 'Testing Strategy', 'Unit, integration, E2E, performance, and security testing.'],
  ['fa-book', 'Documentation', 'Technical specs, runbooks, and handover materials.'],
];

const SECURITY_CARDS = [
  ['fa-lock', 'Encryption', 'Data encrypted in transit and at rest across all systems.'],
  ['fa-key', 'Authentication', 'OAuth2, JWT, MFA, and enterprise identity integration.'],
  ['fa-shield-halved', 'OWASP', 'Proactive protection against top web application risks.'],
  ['fa-database', 'Data Protection', 'GDPR-aware data handling and privacy by design.'],
  ['fa-plug', 'Secure APIs', 'Rate limiting, validation, and API gateway security.'],
  ['fa-cloud', 'Cloud Security', 'IAM, WAF, network segmentation, and audit logging.'],
  ['fa-user-secret', 'Penetration Testing', 'Security assessments before major releases.'],
  ['fa-users-gear', 'Role Management', 'Least-privilege access and RBAC across environments.'],
];

const INDUSTRIES = [
  ['fa-heart-pulse', 'Healthcare'], ['fa-helmet-safety', 'Construction'], ['fa-landmark', 'Government'],
  ['fa-graduation-cap', 'Education'], ['fa-building-columns', 'Banking'], ['fa-basket-shopping', 'Retail'],
  ['fa-concierge-bell', 'Hospitality'], ['fa-industry', 'Manufacturing'], ['fa-microchip', 'Technology'],
  ['fa-shield-halved', 'Insurance'], ['fa-tower-cell', 'Telecommunications'], ['fa-truck', 'Logistics'],
];

const WHY_CHOOSE = [
  ['fa-comments', 'Transparent Communication'], ['fa-users', 'Experienced Team'], ['fa-arrows-rotate', 'Agile Delivery'],
  ['fa-expand', 'Scalable Architecture'], ['fa-shield-halved', 'Security First'], ['fa-microchip', 'Modern Technology'],
  ['fa-user-tie', 'Dedicated Project Manager'], ['fa-headset', 'Continuous Support'], ['fa-bolt', 'Fast Delivery'],
  ['fa-vial', 'Quality Assurance'],
];

const FAQ = [
  { q: 'How long does development take?', a: 'Timelines depend on scope and complexity. After discovery, we provide a detailed roadmap — MVPs often launch in 8–12 weeks, while enterprise platforms may span several months in agile sprints.' },
  { q: 'Do you follow Agile?', a: 'Yes. We use Scrum-inspired agile with two-week sprints, daily standups, sprint reviews, retrospectives, and continuous delivery pipelines.' },
  { q: 'Can I track project progress?', a: 'Absolutely. You receive access to project dashboards, sprint demos, velocity reports, and a dedicated project manager for regular status updates.' },
  { q: 'Will I receive source code?', a: 'Yes. Upon project completion and per contract terms, you receive full source code, documentation, and deployment credentials.' },
  { q: 'Do you provide maintenance?', a: 'Yes. We offer SLA-backed maintenance plans covering updates, security patches, monitoring, bug fixes, and feature enhancements.' },
  { q: 'Can you scale my solution later?', a: 'Yes. Our cloud-native, modular architectures are designed to scale horizontally — adding users, features, integrations, and geographic regions without costly rewrites.' },
];

const RELATED = [
  { href: '../index.html#services', icon: 'fa-layer-group', title: 'Services', desc: 'Browse enterprise service offerings.' },
  { href: '../index.html#industries', icon: 'fa-industry', title: 'Industries', desc: 'Solutions across key verticals.' },
  { href: 'contact.html', icon: 'fa-briefcase', title: 'Portfolio', desc: 'Discuss your project requirements.' },
  { href: 'testimonials.html', icon: 'fa-star', title: 'Case Studies', desc: 'Client success stories and outcomes.' },
  { href: 'contact.html', icon: 'fa-envelope', title: 'Contact', desc: 'Start a conversation with our team.' },
];

const WORKFLOW_STEPS = ['Client', 'Discovery', 'Planning', 'Design', 'Development', 'Testing', 'Deployment', 'Support'];

function glowCard({ icon, title, desc, delay = 0 }) {
  return `<article class="oproc-glow-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="oproc-glow-card__glow" aria-hidden="true"></span>
    <span class="oproc-glow-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
    <h3 class="oproc-glow-card__title">${esc(title)}</h3>
    <p class="oproc-glow-card__desc">${esc(desc)}</p>
  </article>`;
}

function sectionHead({ id, badge, badgeIcon, title, lead, light = false }) {
  const lightClass = light ? ' oproc-title--light' : '';
  const leadClass = light ? ' oproc-lead--light' : '';
  return `<header class="oproc-section-head" data-aos="fade-up">
    <span class="oproc-badge${light ? '' : ' oproc-badge--navy'}"><i class="${badgeIcon}" aria-hidden="true"></i> ${esc(badge)}</span>
    <h2 id="${id}-heading" class="oproc-title${lightClass}">${title}</h2>
    ${lead ? `<p class="oproc-lead${leadClass}">${esc(lead)}</p>` : ''}
  </header>`;
}

function oprocSection({ id, gray = false, inner }) {
  const mod = gray ? ' oproc-section--gray' : ' oproc-section--white';
  return `<section id="${id}" class="oproc-section${mod}" aria-labelledby="${id}-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">${inner}</div>
  </section>`;
}

function parallax({ id, bg, inner, speed = '0.32' }) {
  return `<section id="${id}" class="oproc-parallax guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="oproc-parallax__ambient" aria-hidden="true"><span class="oproc-parallax__orb oproc-parallax__orb--1"></span><span class="oproc-parallax__orb oproc-parallax__orb--2"></span></div>
  <div class="oproc-parallax__bg guudle-parallax-layer" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="oproc-parallax__overlay" aria-hidden="true"></div>
  <div class="oproc-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

export function renderOurProcessMain() {
  const hero = `<section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="oproc-hero-heading" data-svc-hero>
    <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
    <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
    <div class="hero-dot-grid" aria-hidden="true"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
      <div class="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">
        <div class="order-2 lg:order-1" data-aos="fade-right">
          <p class="text-sm font-bold uppercase tracking-wider text-[#10A5F5] mb-3">Our Development Process</p>
          <h1 id="oproc-hero-heading" class="hero-title-navy font-display text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5">Delivering Digital Excellence Through a Proven Development Methodology</h1>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">Every successful digital product begins with a structured development process. From discovery and planning to deployment and continuous improvement, our experienced team follows a transparent, agile, and quality-driven approach that ensures every project is delivered on time, within budget, and beyond expectations.</p>
          <div class="flex flex-wrap gap-3">
            <a href="contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="contact.html" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-calendar-check text-cyan-600"></i> Book Free Consultation</a>
          </div>
        </div>
        <div class="order-1 lg:order-2" data-aos="fade-left">
          <div class="hero-visual-panel">
            <div class="hero-visual-panel__glow" aria-hidden="true"></div>
            <div class="hero-visual-panel__frame">
              <img src="${IMG.hero}" alt="Software development team collaborating on architecture, UI design, agile sprint planning, and deployment" width="640" height="720" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
  </section>`;

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">
    <a href="#oproc-why" class="slp-sticky-nav__link" data-svc-nav-link>Why It Works</a>
    <a href="#oproc-lifecycle" class="slp-sticky-nav__link" data-svc-nav-link>Lifecycle</a>
    <a href="#oproc-agile" class="slp-sticky-nav__link" data-svc-nav-link>Agile</a>
    <a href="#oproc-workflow" class="slp-sticky-nav__link" data-svc-nav-link>Workflow</a>
    <a href="#oproc-roles" class="slp-sticky-nav__link" data-svc-nav-link>Roles</a>
    <a href="#oproc-tools" class="slp-sticky-nav__link" data-svc-nav-link>Tools</a>
    <a href="#oproc-qa" class="slp-sticky-nav__link" data-svc-nav-link>QA</a>
    <a href="#oproc-security" class="slp-sticky-nav__link" data-svc-nav-link>Security</a>
    <a href="#oproc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
  </div></nav>`;

  const whySection = oprocSection({
    id: 'oproc-why',
    inner: `
      ${sectionHead({ id: 'oproc-why', badge: 'Methodology', badgeIcon: 'fas fa-lightbulb', title: 'Why Our Process <span class="oproc-accent">Works</span>', lead: 'A battle-tested delivery framework combining agile practices, enterprise standards, and transparent client collaboration.' })}
      <div class="oproc-feature-grid">${WHY_PROCESS.map(([icon, title, desc], i) => glowCard({ icon, title, desc, delay: Math.min(i * 45, 270) })).join('')}</div>
    `,
  });

  const lifecycleSection = renderDevProcessSection({
    id: 'oproc-lifecycle',
    badge: 'Lifecycle',
    title: 'Complete Software Development Lifecycle',
    subtitle: 'Eight structured phases from discovery through maintenance — the single source of truth for how Guudle delivers enterprise digital products.',
    steps: LIFECYCLE_STEPS,
    linkPrefix: '',
    aos: true,
    showMethodologyLink: false,
    metrics: [
      { value: '8', label: 'Phases' },
      { value: 'Agile', label: 'Methodology' },
      { value: '24/7', label: 'Support Options' },
    ],
  });

  const agileSection = parallax({
    id: 'oproc-agile',
    bg: IMG.agile,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'oproc-agile', badge: 'Agile', badgeIcon: 'fas fa-arrows-rotate', title: 'Agile Development <span class="oproc-accent">Methodology</span>', lead: 'Scrum-inspired practices that keep teams aligned, stakeholders informed, and software shipping continuously.' })}
      <div class="oproc-feature-grid">${AGILE_CARDS.map(([icon, title, desc], i) => glowCard({ icon, title, desc, delay: Math.min(i * 50, 300) })).join('')}</div>
    </div>`,
  });

  const workflowSection = oprocSection({
    id: 'oproc-workflow',
    gray: true,
    inner: `
      ${sectionHead({ id: 'oproc-workflow', badge: 'Workflow', badgeIcon: 'fas fa-diagram-project', title: 'Project <span class="oproc-accent">Workflow</span>', lead: 'A clear, linear path from client engagement through ongoing support — with feedback loops at every stage.' })}
      <div class="oproc-workflow" data-aos="fade-up" aria-label="Project workflow from client to support">
        ${WORKFLOW_STEPS.map((step, i) =>
          `${i > 0 ? '<span class="oproc-workflow__arrow" aria-hidden="true"><i class="fas fa-arrow-down"></i></span>' : ''}
          <div class="oproc-workflow__step"><span class="oproc-workflow__num">${String(i + 1).padStart(2, '0')}</span><span class="oproc-workflow__label">${esc(step)}</span></div>`
        ).join('')}
      </div>
    `,
  });

  const rolesSection = oprocSection({
    id: 'oproc-roles',
    inner: `
      ${sectionHead({ id: 'oproc-roles', badge: 'Team', badgeIcon: 'fas fa-users', title: 'Roles <span class="oproc-accent">Involved</span>', lead: 'Cross-functional specialists collaborating across every phase of your project.' })}
      <div class="oproc-role-grid">${ROLES.map(([icon, title], i) =>
        `<article class="oproc-role-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 35, 385)}">
          <span class="oproc-role-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
          <h3 class="oproc-role-card__title">${esc(title)}</h3>
        </article>`
      ).join('')}</div>
    `,
  });

  const toolsSection = oprocSection({
    id: 'oproc-tools',
    gray: true,
    inner: `
      ${sectionHead({ id: 'oproc-tools', badge: 'Tooling', badgeIcon: 'fas fa-toolbox', title: 'Tools We <span class="oproc-accent">Use</span>', lead: 'Industry-standard platforms for project management, design, development, testing, and DevOps.' })}
      <div class="oproc-tool-grid">${TOOLS.map(([icon, title], i) =>
        `<article class="oproc-tool-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 30, 330)}">
          <span class="oproc-tool-card__icon"><i class="${icon.includes(' ') ? icon : `fab ${icon}`}" aria-hidden="true"></i></span>
          <h3 class="oproc-tool-card__title">${esc(title)}</h3>
        </article>`
      ).join('')}</div>
    `,
  });

  const qaSection = oprocSection({
    id: 'oproc-qa',
    inner: `
      ${sectionHead({ id: 'oproc-qa', badge: 'Quality', badgeIcon: 'fas fa-award', title: 'Quality Assurance <span class="oproc-accent">Standards</span>', lead: 'Rigorous quality, security, and accessibility standards embedded throughout delivery.' })}
      <div class="oproc-feature-grid oproc-feature-grid--3">${QA_STANDARDS.map(([icon, title, desc], i) => glowCard({ icon, title, desc, delay: Math.min(i * 40, 280) })).join('')}</div>
    `,
  });

  const securitySection = parallax({
    id: 'oproc-security',
    bg: IMG.security,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'oproc-security', badge: 'Security', badgeIcon: 'fas fa-shield-halved', title: 'Security Throughout <span class="oproc-accent">Development</span>', lead: 'Security is not an afterthought — it is engineered into every layer from architecture through deployment.' })}
      <div class="oproc-feature-grid oproc-feature-grid--4">${SECURITY_CARDS.map(([icon, title, desc], i) => glowCard({ icon, title, desc, delay: Math.min(i * 40, 320) })).join('')}</div>
    </div>`,
  });

  const industriesSection = renderIndustriesParallaxSection({
    industries: industriesFromTuples(INDUSTRIES),
    slug: 'our-process',
    bg: IMG.industries,
    sectionId: 'oproc-industries',
    lead: 'Proven delivery experience across regulated and high-growth verticals — with technology processes engineered for compliance, scale, and innovation.',
    pathPrefix: '../',
    contactLink: 'contact.html',
  });

  const whyChooseSection = oprocSection({
    id: 'oproc-why-choose',
    inner: `
      ${sectionHead({ id: 'oproc-why-choose', badge: 'Why Guudle', badgeIcon: 'fas fa-star', title: 'Why Businesses Choose Our <span class="oproc-accent">Process</span>', lead: 'Enterprise teams partner with us for predictable delivery, transparent communication, and long-term success.' })}
      <div class="oproc-choose-grid">${WHY_CHOOSE.map(([icon, title], i) =>
        `<article class="oproc-choose-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 35, 350)}">
          <span class="oproc-choose-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
          <h3>${esc(title)}</h3>
        </article>`
      ).join('')}</div>
    `,
  });

  const faqSection = renderEnterpriseFaqSection({
    id: 'oproc-faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Clear answers about timelines, agile delivery, progress tracking, source code, maintenance, and scalability.',
    faqs: FAQ,
    contactHref: '#oproc-contact',
    contactPageHref: 'contact.html',
    aos: true,
  });

  const relatedSection = oprocSection({
    id: 'oproc-related',
    gray: true,
    inner: `
      ${sectionHead({ id: 'oproc-related', badge: 'Explore', badgeIcon: 'fas fa-compass', title: 'Related <span class="oproc-accent">Pages</span>', lead: 'Continue exploring our technology, services, and success stories.' })}
      <div class="oproc-related-grid">${RELATED.map((r, i) =>
        `<a href="${esc(r.href)}" class="oproc-related-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 240)}">
          <span class="oproc-related-card__icon"><i class="fas ${r.icon}" aria-hidden="true"></i></span>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.desc)}</p>
          <span class="oproc-related-card__link">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
        </a>`
      ).join('')}</div>
    `,
  });

  const ctaSection = parallax({
    id: 'oproc-contact',
    bg: IMG.cta,
    speed: '0.28',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <header class="oproc-section-head" data-aos="fade-up">
        <span class="oproc-badge"><i class="fas fa-rocket" aria-hidden="true"></i> Get Started</span>
        <h2 id="oproc-contact-heading" class="oproc-title oproc-title--light">Ready to Build Your Next Digital Solution?</h2>
        <p class="oproc-lead oproc-lead--light max-w-3xl mx-auto">Partner with our experienced architects, designers, engineers, and consultants to transform your ideas into secure, scalable, and innovative digital products. Our proven development process ensures transparency, quality, and long-term success from concept to deployment and beyond.</p>
      </header>
      <div class="flex flex-wrap justify-center gap-3 mt-8" data-aos="fade-up" data-aos-delay="100">
        <a href="contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="contact.html" class="oproc-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition">Book Free Consultation <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
      </div>
    </div>`,
  });

  return `
    ${hero}
    ${stickyNav}
    ${whySection}
    ${lifecycleSection}
    ${agileSection}
    ${workflowSection}
    ${rolesSection}
    ${toolsSection}
    ${qaSection}
    ${securitySection}
    ${industriesSection}
    ${whyChooseSection}
    ${relatedSection}
    ${ctaSection}
  `;
}

export function renderOurProcessFaqsJsonLd() {
  return [];
}
