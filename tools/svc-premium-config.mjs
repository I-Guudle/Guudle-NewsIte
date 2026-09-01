/** Premium enterprise landing overrides — web-application only (website-development uses enterprise v3) */

export const PREMIUM_SLUGS = new Set(['web-application']);

export const PREMIUM_OVERRIDES = {
  'website-development': {
    heroKicker: 'Empowering Digital Growth',
    heroEyebrow: 'Enterprise Web Engineering',
    stats: [
      { value: '250+', label: 'Websites Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '2.1s', label: 'Avg. Load Time' },
      { value: '40%', label: 'Avg. Conversion Lift' },
    ],
    hub: {
      badge: 'Architecture',
      title: 'Design Strategy Meets Technical Excellence',
      subtitle: 'Every page is engineered around brand narrative, conversion paths, and measurable performance — not templates.',
      center: 'Brand UX',
      nodes: [
        { icon: 'fa-compass-drafting', label: 'UX Strategy', desc: 'User journeys & wireframes' },
        { icon: 'fa-palette', label: 'Visual Design', desc: 'Brand systems & components' },
        { icon: 'fa-code', label: 'Front-End Build', desc: 'Semantic, accessible markup' },
        { icon: 'fa-gauge-high', label: 'Performance', desc: 'Core Web Vitals optimization' },
        { icon: 'fa-search', label: 'SEO Layer', desc: 'Structured data & metadata' },
        { icon: 'fa-chart-line', label: 'Analytics', desc: 'Conversion tracking setup' },
      ],
    },
    splits: [
      {
        badge: 'Conversion',
        title: 'Websites engineered to generate qualified leads',
        text: 'We map every CTA, form, and content block to your sales funnel — A/B tested layouts, trust signals, and frictionless contact flows that turn visitors into pipeline.',
        bullets: ['Lead capture optimization', 'Multi-step form UX', 'Trust & social proof blocks', 'CRM & marketing automation hooks'],
        imageOffset: 2,
        reverse: false,
      },
      {
        badge: 'Performance',
        title: 'Speed, accessibility, and SEO as first-class requirements',
        text: 'Sub-3-second loads, WCAG 2.1 AA compliance, and semantic HTML give you ranking advantage and inclusive experiences across every device and market.',
        bullets: ['Core Web Vitals tuning', 'WCAG 2.1 AA compliance', 'Internationalization ready', 'CDN & edge caching strategy'],
        imageOffset: 3,
        reverse: true,
      },
    ],
    workflow: [
      { icon: 'fa-lightbulb', title: 'Discovery', desc: 'Stakeholder workshops & competitive audit' },
      { icon: 'fa-pencil-ruler', title: 'Design', desc: 'Wireframes, UI kit & responsive prototypes' },
      { icon: 'fa-code', title: 'Development', desc: 'Clean code, CMS integration & QA' },
      { icon: 'fa-rocket', title: 'Launch', desc: 'Deploy, monitor & iterate post-go-live' },
    ],
    caseMetrics: [
      { stat: '+42%', statLabel: 'Lead Conversion', client: 'Meridian Group', location: 'London HQ', headline: 'Corporate site redesign drove qualified pipeline growth', tag: 'Corporate' },
      { stat: '2.4s', statLabel: 'Load Time', client: 'NovaBrand', location: 'New York', headline: 'Product launch site with 3× faster performance', tag: 'Marketing' },
      { stat: '+65%', statLabel: 'Demo Requests', client: 'CloudFlow', location: 'San Francisco', headline: 'SaaS marketing site with optimized demo funnel', tag: 'SaaS' },
    ],
    insights: [
      { icon: 'fa-arrow-trend-up', title: 'Conversion Trends', desc: 'Landing pages with clear value props convert 2.3× better than generic corporate layouts.' },
      { icon: 'fa-mobile-screen', title: 'Mobile-First Reality', desc: '68% of B2B research starts on mobile — responsive UX is non-negotiable.' },
      { icon: 'fa-shield-halved', title: 'Trust Signals', desc: 'Case studies, certifications, and client logos increase form submissions by up to 34%.' },
    ],
  },

  'web-application': {
    heroKicker: 'Building Digital Platforms',
    heroEyebrow: 'Enterprise Application Engineering',
    stats: [
      { value: '120+', label: 'Apps Shipped' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '10M+', label: 'Users Served' },
      { value: '4.8★', label: 'Avg. App Rating' },
    ],
    hub: {
      badge: 'Platform Architecture',
      title: 'Scalable Systems Built for Real-World Load',
      subtitle: 'Multi-tenant SaaS, internal portals, and customer-facing platforms — architected for security, scale, and long-term evolution.',
      center: 'Core API',
      nodes: [
        { icon: 'fa-layer-group', label: 'Microservices', desc: 'Modular, independently deployable' },
        { icon: 'fa-database', label: 'Data Layer', desc: 'PostgreSQL, Redis & event stores' },
        { icon: 'fa-lock', label: 'Security', desc: 'OAuth 2.0, RBAC & encryption' },
        { icon: 'fa-cloud', label: 'Cloud Native', desc: 'AWS, Azure & Kubernetes' },
        { icon: 'fa-bolt', label: 'Real-Time', desc: 'WebSockets & event streaming' },
        { icon: 'fa-chart-pie', label: 'Observability', desc: 'Metrics, logs & alerting' },
      ],
    },
    splits: [
      {
        badge: 'SaaS Engineering',
        title: 'Subscription products that scale from MVP to enterprise',
        text: 'Multi-tenant architecture, billing integration, onboarding flows, and admin dashboards — everything your SaaS needs to acquire, retain, and expand customers.',
        bullets: ['Multi-tenant data isolation', 'Stripe & billing integration', 'Role-based access control', 'Usage analytics & metering'],
        imageOffset: 2,
        reverse: false,
      },
      {
        badge: 'Integration',
        title: 'Connect your entire business ecosystem',
        text: 'REST and GraphQL APIs, webhook pipelines, and third-party integrations with Salesforce, HubSpot, ERP systems, and legacy platforms — unified under one application layer.',
        bullets: ['REST & GraphQL APIs', 'Event-driven architecture', 'Legacy system bridges', 'Developer portal & docs'],
        imageOffset: 4,
        reverse: true,
      },
    ],
    workflow: [
      { icon: 'fa-magnifying-glass', title: 'Discovery', desc: 'Requirements, personas & technical spikes' },
      { icon: 'fa-sitemap', title: 'Architecture', desc: 'System design, API contracts & infra plan' },
      { icon: 'fa-code-branch', title: 'Agile Build', desc: '2-week sprints with demo releases' },
      { icon: 'fa-server', title: 'Deploy & Scale', desc: 'CI/CD, monitoring & auto-scaling' },
    ],
    caseMetrics: [
      { stat: '$12M', statLabel: 'Funding Secured', client: 'HealthSync', location: 'Boston', headline: 'Patient engagement platform raised Series A post-launch', tag: 'Healthcare' },
      { stat: '2.4M', statLabel: 'Active Users', client: 'TaskFlow Pro', location: 'Berlin', headline: 'B2B workflow SaaS scaled to enterprise accounts', tag: 'SaaS' },
      { stat: '-60%', statLabel: 'Ops Cost', client: 'LogiChain', location: 'Singapore', headline: 'Internal portal replaced 12 legacy tools', tag: 'Enterprise' },
    ],
    insights: [
      { icon: 'fa-cloud', title: 'Cloud-Native Advantage', desc: 'Kubernetes-based apps handle 10× traffic spikes without manual intervention.' },
      { icon: 'fa-users', title: 'User-Centric Design', desc: 'Apps with embedded user research iterate 40% faster to product-market fit.' },
      { icon: 'fa-shield', title: 'Security by Design', desc: 'Zero-trust architecture reduces breach risk and accelerates enterprise sales cycles.' },
    ],
  },
};
