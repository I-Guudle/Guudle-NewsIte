/**
 * Web Development CMA page configs — derived from SVC_PAGES + business-website + backend-development
 */
import { SVC_PAGES } from './svc-pages-config.mjs';
import { IMG, enterpriseProcess, enterpriseWebIndustries, mergeFaqs } from './svc-shared-data.mjs';

export const WEB_DEV_CMA_SLUGS = [
  'website-development',
  'business-website',
  'ecommerce',
  'cms',
  'frontend-development',
  'backend-development',
  'full-stack-development',
  'marketplace-development',
  'web-portal-development',
  'cloud-solutions',
  'seo-digital-optimization',
  'maintenance-support',
  'ui-ux-design',
  'website-security',
  'legacy-modernization',
  'emerging-web-technologies',
];

const SLUG_LABELS = {
  'website-development': 'Web Development Services',
  'business-website': 'Custom Website Development',
  ecommerce: 'E-Commerce Development',
  cms: 'CMS Development',
  'frontend-development': 'Frontend Development',
  'backend-development': 'Backend Development',
  'full-stack-development': 'Full-Stack Development',
  'marketplace-development': 'Marketplace Development',
  'web-portal-development': 'Web Portal Development',
  'cloud-solutions': 'Hosting & Cloud Solutions',
  'seo-digital-optimization': 'SEO & Digital Optimization',
  'maintenance-support': 'Website Maintenance & Support',
  'ui-ux-design': 'UI/UX Design Services',
  'website-security': 'Website Security Services',
  'legacy-modernization': 'Migration & Modernization',
  'emerging-web-technologies': 'Emerging Web Technologies',
};

const WEB_RELATED = [
  { href: 'website-development.html', label: 'Web Development Services' },
  { href: 'custom-mobile-app-development.html', label: 'Custom Mobile Apps' },
  { href: 'full-stack-development.html', label: 'Full-Stack Development' },
  { href: 'ui-ux-design.html', label: 'UI/UX Design' },
];

function relatedFor(slug) {
  const idx = WEB_DEV_CMA_SLUGS.indexOf(slug);
  const picks = [1, 2, 3, 5].map((o) => WEB_DEV_CMA_SLUGS[(idx + o) % WEB_DEV_CMA_SLUGS.length]);
  return [...new Set(picks.filter((s) => s !== slug))].slice(0, 4).map((s) => ({
    href: `${s}.html`,
    label: SLUG_LABELS[s] || s,
  }));
}

function mergeServiceCards(page) {
  const features = page.features || [];
  const services = page.services || [];
  const seen = new Set();
  const merged = [];
  for (const item of [...features, ...services]) {
    const key = item.title;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged.slice(0, 12);
}

function webPage(slug, base) {
  const features = mergeServiceCards(base);
  const subhead = (base.subhead || '').replace(/\b99\.99%\b/g, 'enterprise-grade').replace(/\b24\/7\b/g, 'continuous');
  return {
    slug,
    process: enterpriseProcess,
    industries: enterpriseWebIndustries,
    related: base.related || relatedFor(slug),
    faqs: mergeFaqs(base.faqs || [], 10),
    features,
    ...base,
    subhead,
    layout: { hero: 'saas-light', pageRedesign: 'corpox', cards: 'bordered', process: 'cards', pattern: 'mesh' },
  };
}

const BACKEND_DEVELOPMENT = webPage('backend-development', {
  category: 'web',
  theme: 'backend',
  title: 'Backend Development',
  badge: 'Server-Side Engineering',
  headline: 'Backend Development',
  headlineAccent: 'Robust APIs & Scalable Systems',
  subhead: 'Enterprise backend engineering — REST and GraphQL APIs, microservices, databases, and cloud infrastructure built for performance, security, and scale.',
  metaDescription: 'Backend development services with Node.js, Python, .NET, and cloud-native architecture. Guudle builds secure, scalable APIs and server-side systems.',
  keywords: 'Backend Development, API Development, Microservices, Node.js, Python, Guudle IT Solutions',
  heroImage: IMG('photo-1558494949-ef010cbdcc31'),
  overviewImage: IMG('photo-1454165804606-c3d57bc86b40'),
  overview: {
    title: 'Server-Side Systems That Power Your Product',
    text: 'We architect and build backend systems that handle traffic spikes, protect sensitive data, and integrate cleanly with frontends, mobile apps, and third-party platforms — from MVP APIs to enterprise microservice ecosystems.',
    highlights: ['REST & GraphQL API design', 'Microservices & event-driven architecture', 'Database modeling & optimization', 'Cloud-native deployment'],
  },
  features: [
    { icon: 'fa-server', title: 'API Development', desc: 'RESTful and GraphQL APIs with versioning, documentation, and rate limiting.' },
    { icon: 'fa-diagram-project', title: 'Microservices Architecture', desc: 'Decomposed services with clear boundaries and independent deployment.' },
    { icon: 'fa-database', title: 'Database Engineering', desc: 'PostgreSQL, MongoDB, Redis — schema design, indexing, and replication.' },
    { icon: 'fa-shield-halved', title: 'Authentication & Authorization', desc: 'OAuth 2.0, JWT, SSO, and role-based access control.' },
    { icon: 'fa-cloud', title: 'Cloud Backend Deployment', desc: 'AWS Lambda, ECS, Azure Functions, and Kubernetes workloads.' },
    { icon: 'fa-bolt', title: 'Real-Time & Messaging', desc: 'WebSockets, message queues, and event streaming with Kafka or RabbitMQ.' },
  ],
  services: [
    { icon: 'fab fa-node-js', title: 'Node.js Backends', desc: 'Express, NestJS, and Fastify for high-throughput APIs.' },
    { icon: 'fab fa-python', title: 'Python Services', desc: 'Django, FastAPI, and Flask for data-heavy applications.' },
    { icon: 'fab fa-microsoft', title: '.NET Core APIs', desc: 'Enterprise-grade C# services with Azure integration.' },
    { icon: 'fa-gears', title: 'DevOps & CI/CD', desc: 'Automated pipelines, containerization, and infrastructure as code.' },
    { icon: 'fa-plug', title: 'Third-Party Integrations', desc: 'Payment gateways, CRMs, ERPs, and SaaS connectors.' },
    { icon: 'fa-chart-line', title: 'Performance Optimization', desc: 'Caching, query tuning, and load testing.' },
  ],
  tech: [
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'PostgreSQL', icon: 'fas fa-database' },
    { name: 'Redis', icon: 'fas fa-memory' },
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'Docker', icon: 'fab fa-docker' },
  ],
  faqs: [
    { q: 'Which backend stack do you recommend?', a: 'We select based on team skills, scale requirements, and integration needs — typically Node.js or Python for web APIs, .NET for enterprise environments.' },
    { q: 'Do you build microservices or monoliths?', a: 'We start pragmatically — modular monoliths for MVPs, microservices when scale and team structure warrant the complexity.' },
    { q: 'How do you handle API security?', a: 'Authentication, input validation, rate limiting, encryption in transit and at rest, and OWASP-aligned security reviews.' },
    { q: 'Can you integrate with our existing frontend?', a: 'Yes — we deliver documented APIs consumed by React, Vue, Angular, mobile apps, and partner systems.' },
    { q: 'Do you provide database migration support?', a: 'Schema design, migration scripts, zero-downtime cutovers, and performance tuning included.' },
    { q: 'What about monitoring and logging?', a: 'Structured logging, APM integration, health checks, and alerting configured from day one.' },
    { q: 'How long does backend development take?', a: 'API MVPs: 4–8 weeks. Enterprise platforms: 3–9 months depending on scope and integrations.' },
    { q: 'Do you offer ongoing backend maintenance?', a: 'Yes — SLA-backed support packages for security patches, scaling, and feature enhancements.' },
  ],
  cta: 'Build Your Backend Platform',
  ctaSubtext: 'Partner with Guudle IT Solutions for secure, scalable backend systems that power your web and mobile products.',
});

const BUSINESS_WEBSITE = webPage('business-website', {
  category: 'web',
  theme: 'business-website',
  title: 'Custom Website Development',
  badge: 'Business Web Excellence',
  headline: 'Custom Website Development',
  headlineAccent: 'Built for Trust & Conversion',
  subhead: 'Professional corporate websites, startup landing pages, and brand-driven marketing sites — engineered for credibility, lead generation, and long-term growth.',
  metaDescription: 'Custom website development for businesses — corporate sites, landing pages, and brand websites with SEO, performance, and conversion-focused UX by Guudle IT Solutions.',
  keywords: 'Custom Website Development, Business Website, Corporate Website, Landing Pages, Guudle IT Solutions',
  heroImage: IMG('photo-1467232004584-a241de8bcf5d'),
  overviewImage: IMG('photo-1547658719-da2b51169166'),
  overview: {
    title: 'Websites That Represent Your Brand With Authority',
    text: 'Your website is often the first impression customers have of your business. We design authoritative business websites with clear messaging, credible design, and conversion-focused layouts that support sales and marketing goals.',
    highlights: ['Lead generation & CRM integration', 'Brand-aligned visual design', 'Mobile-first responsive layouts', 'SEO and analytics foundation'],
  },
  features: [
    { icon: 'fa-building', title: 'Corporate Websites', desc: 'Multi-page business sites with services, team, and contact flows.' },
    { icon: 'fa-bullseye', title: 'Lead Generation', desc: 'Conversion-optimized layouts with forms, CTAs, and CRM integrations.' },
    { icon: 'fa-search', title: 'Local & On-Page SEO', desc: 'Schema markup, metadata, and local search optimization.' },
    { icon: 'fa-shield-halved', title: 'Security & Compliance', desc: 'SSL, GDPR-compliant forms, and privacy-ready architecture.' },
    { icon: 'fa-pen-to-square', title: 'CMS Integration', desc: 'WordPress or headless CMS so your team can update content easily.' },
    { icon: 'fa-tools', title: 'Maintenance & Support', desc: 'Ongoing updates, backups, monitoring, and enhancements.' },
  ],
  services: [
    { icon: 'fa-rocket', title: 'Startup Landing Pages', desc: 'High-converting single-page sites for product launches.' },
    { icon: 'fa-globe', title: 'Multi-Language Sites', desc: 'Internationalization for global business presence.' },
    { icon: 'fa-paintbrush', title: 'Brand Design Systems', desc: 'Visual identity reflected across every page and component.' },
    { icon: 'fa-chart-line', title: 'Conversion Optimization', desc: 'A/B testing, funnel analysis, and CRO improvements.' },
    { icon: 'fa-envelope', title: 'Marketing Integrations', desc: 'HubSpot, Mailchimp, Google Analytics, and live chat.' },
    { icon: 'fa-mobile-screen', title: 'Mobile-First Design', desc: 'Flawless experience on phones, tablets, and desktops.' },
  ],
  tech: [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Next.js', icon: 'fas fa-code' },
    { name: 'WordPress', icon: 'fab fa-wordpress' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
  ],
  faqs: [
    { q: 'How long does a business website take?', a: 'Marketing sites: 4–8 weeks. Multi-page corporate sites: 8–14 weeks depending on content and integrations.' },
    { q: 'Do you provide hosting?', a: 'Yes — we deploy to AWS, Azure, Vercel, or your preferred provider with CDN and SSL configured.' },
    { q: 'Can you redesign our existing site?', a: 'Absolutely — migration with SEO preservation, redirect mapping, and content refresh included.' },
    { q: 'Will our team be able to update content?', a: 'Yes — CMS setup, editor training, and documentation are standard deliverables.' },
    { q: 'Do you write website copy?', a: 'We collaborate on messaging and can provide SEO copywriting as part of the engagement.' },
    { q: 'What industries do you serve?', a: 'Professional services, manufacturing, healthcare, finance, retail, and technology — among others.' },
    { q: 'Is SEO included?', a: 'Technical SEO foundation, metadata, schema, sitemap, and Core Web Vitals optimization are built in.' },
    { q: 'Do you offer ongoing support?', a: 'Maintenance packages cover security updates, content changes, and performance monitoring.' },
  ],
  cta: 'Start Your Custom Website Project',
  ctaSubtext: 'Partner with Guudle IT Solutions to create a professional website that builds trust and drives qualified leads.',
});

const OVERRIDES = {
  'website-development': {
    title: 'Web Development Services',
    badge: 'Enterprise Web Engineering',
    headline: 'Web Development Services',
    headlineAccent: 'Built to Perform & Scale',
    subhead: 'End-to-end web development — custom websites, web applications, e-commerce, and portals — engineered with modern stacks, enterprise security, and conversion-focused UX.',
    metaDescription: 'Enterprise web development services — custom websites, web apps, e-commerce, and portals. Guudle IT Solutions delivers scalable, SEO-ready web solutions.',
    keywords: 'Web Development Services, Custom Web Development, Enterprise Websites, Web Applications, Guudle IT Solutions',
    cta: 'Start Your Web Development Project',
    ctaSubtext: 'Partner with Guudle IT Solutions for enterprise-grade web development that drives growth, performance, and long-term digital success.',
  },
  'cloud-solutions': {
    title: 'Hosting & Cloud Solutions',
    subhead: 'Enterprise-grade hosting and cloud solutions on AWS, Azure, GCP, and DigitalOcean — migration, DevOps, managed operations, and high-availability infrastructure.',
    metaDescription: 'Hosting and cloud solutions on AWS, Azure, GCP. Guudle provides cloud migration, managed hosting, DevOps, and enterprise infrastructure.',
  },
};

export const WEB_DEV_PAGES = Object.fromEntries(
  WEB_DEV_CMA_SLUGS.map((slug) => {
    if (slug === 'backend-development') return [slug, BACKEND_DEVELOPMENT];
    if (slug === 'business-website') return [slug, BUSINESS_WEBSITE];
    const base = SVC_PAGES[slug];
    if (!base) throw new Error(`Missing SVC_PAGES config for ${slug}`);
    const override = OVERRIDES[slug] || {};
    return [slug, webPage(slug, { ...base, ...override })];
  }),
);
