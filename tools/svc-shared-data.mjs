/** Shared content blocks for service landing pages */
export const IMG = (id, alt) => `https://images.unsplash.com/${id}?w=900&q=82&auto=format&fit=crop`;

export const enterpriseProcess = [
  { t: 'Discovery', d: 'Stakeholder workshops and technical assessment.', detail: 'We map goals, constraints, data sources, and success metrics before writing code.', icon: 'fa-magnifying-glass', duration: '1–2 weeks', deliverables: ['Discovery brief', 'Requirements matrix', 'Success KPIs'] },
  { t: 'Strategy', d: 'Roadmap, architecture, and ROI modeling.', detail: 'Prioritized backlog with clear milestones and business-case alignment.', icon: 'fa-route', duration: '1–2 weeks', deliverables: ['Solution roadmap', 'Architecture plan', 'ROI model'] },
  { t: 'Design', d: 'UX flows, prototypes, and solution design.', detail: 'Interactive prototypes validated with users and engineering feasibility.', icon: 'fa-pen-ruler', duration: '2–3 weeks', deliverables: ['User flows', 'Prototype', 'UI specifications'] },
  { t: 'Development', d: 'Agile sprints with transparent demos.', detail: 'Two-week iterations delivering testable, production-ready increments.', icon: 'fa-code', duration: 'Sprint-based', deliverables: ['Working software', 'Sprint demos', 'Technical docs'] },
  { t: 'Testing', d: 'QA, security review, and performance validation.', detail: 'Automated tests, accessibility checks, and load testing before release.', icon: 'fa-shield-halved', duration: '1–2 weeks', deliverables: ['QA reports', 'Security review', 'Load benchmarks'] },
  { t: 'Deployment', d: 'CI/CD launch with monitoring.', detail: 'Zero-downtime releases, observability, and runbooks for operations.', icon: 'fa-cloud-arrow-up', duration: '1 week', deliverables: ['CI/CD pipeline', 'Monitoring', 'Runbooks'] },
  { t: 'Optimization', d: 'Continuous improvement post-launch.', detail: 'Analytics-driven enhancements, model retraining, and feature iteration.', icon: 'fa-chart-line', duration: 'Ongoing', deliverables: ['Analytics review', 'Enhancement backlog', 'SLA support'] },
];

export const defaultIndustries = [
  { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'Apps that keep patient data safe and help clinics run day to day.' },
  { icon: 'fa-landmark', name: 'Finance', desc: 'Banking and payment systems that stay secure and ready for audits.' },
  { icon: 'fa-bag-shopping', name: 'Retail', desc: 'Sell online and in-store with one view of stock and customers.' },
  { icon: 'fa-industry', name: 'Manufacturing', desc: 'See machine health early and connect the factory floor to ERP.' },
  { icon: 'fa-truck', name: 'Logistics', desc: 'Track fleets, plan better routes, and share live delivery updates.' },
  { icon: 'fa-graduation-cap', name: 'Education', desc: 'Online learning with easy login, mobile access, and student tools.' },
  { icon: 'fa-building', name: 'Real Estate', desc: 'Property listings, lead tracking, and virtual tours that convert.' },
  { icon: 'fa-cloud', name: 'SaaS', desc: 'Subscription products with multi-tenant cloud built to grow.' },
  { icon: 'fa-landmark-dome', name: 'Government', desc: 'Citizen services that are secure, accessible, and easy to use.' },
  { icon: 'fa-shield-heart', name: 'Insurance', desc: 'Claims, policies, and self-service portals customers can trust.' },
  { icon: 'fa-utensils', name: 'Hospitality', desc: 'Bookings, guest apps, and POS that keep properties running smoothly.' },
];

export function galleryFor(...urls) {
  const labels = ['Architecture', 'Workflow', 'Platform', 'Team collaboration', 'Dashboard', 'Integration'];
  return urls.map((src, i) => ({
    src,
    alt: labels[i % labels.length],
    caption: labels[i % labels.length],
  }));
}

export const defaultFaqsExtra = [
  { q: 'How do you ensure project success?', a: 'Clear milestones, weekly demos, and KPI tracking aligned to your business goals from day one.' },
  { q: 'What engagement models do you offer?', a: 'Fixed-scope projects, dedicated teams, and flexible retainers depending on your timeline and budget.' },
  { q: 'Do you sign NDAs and protect IP?', a: 'Yes — full confidentiality, IP assignment, and enterprise-grade security practices.' },
  { q: 'How do you handle communication?', a: 'Dedicated project lead, Slack or Teams channel, and structured sprint reviews.' },
  { q: 'Can you work with our internal team?', a: 'We integrate with your developers, designers, and product owners as an extension of your team.' },
  { q: 'What post-launch support is included?', a: 'Maintenance packages with SLA-backed response times and proactive monitoring.' },
  { q: 'How do you price projects?', a: 'Transparent estimates after discovery — no surprise scope creep without written approval.' },
  { q: 'Where is your team located?', a: 'Global delivery with overlap hours for your timezone and on-site workshops when needed.' },
  { q: 'Do you provide documentation and handover?', a: 'Architecture docs, runbooks, and knowledge transfer sessions are included in every delivery.' },
  { q: 'How do you manage project risk?', a: 'Early technical spikes, phased delivery, and clear escalation paths keep timelines predictable.' },
];

export function mergeFaqs(specific, min = 10) {
  const merged = [...specific];
  for (const f of defaultFaqsExtra) {
    if (merged.length >= min) break;
    if (!merged.some((x) => x.q === f.q)) merged.push(f);
  }
  return merged.slice(0, Math.max(min, specific.length));
}

export const marketingProcess = [
  { t: 'Discovery', d: 'Goals, audience, and competitive landscape.', detail: 'Stakeholder workshops to align on KPIs, budget, and success metrics.' },
  { t: 'Audit', d: 'Channel, content, and conversion assessment.', detail: 'Deep-dive analysis of current performance, gaps, and quick wins.' },
  { t: 'Strategy', d: 'Channel mix and messaging framework.', detail: 'Data-backed roadmap prioritizing highest-ROI opportunities.' },
  { t: 'Planning', d: 'Campaign calendar and asset requirements.', detail: 'Detailed timelines, budgets, and creative briefs for every channel.' },
  { t: 'Campaign Setup', d: 'Accounts, tracking, and creative build.', detail: 'Pixel setup, UTM structure, ad groups, and landing pages configured.' },
  { t: 'Execution', d: 'Launch across selected channels.', detail: 'Coordinated go-live with QA on tracking, bids, and audience targeting.' },
  { t: 'Monitoring', d: 'Real-time performance dashboards.', detail: 'Daily checks on spend, CTR, CPA, and quality scores.' },
  { t: 'Optimization', d: 'A/B tests and bid adjustments.', detail: 'Continuous refinement of copy, creatives, audiences, and bids.' },
  { t: 'Reporting', d: 'Transparent monthly insights.', detail: 'Executive-ready reports tied to leads, ROAS, and revenue impact.' },
  { t: 'Scaling', d: 'Expand winning campaigns.', detail: 'Increase budget on proven channels and enter new markets.' },
];

export const marketingIndustries = [
  { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'Compliant patient acquisition and local visibility.' },
  { icon: 'fa-landmark', name: 'Finance', desc: 'Trust-led campaigns with regulatory awareness.' },
  { icon: 'fa-bag-shopping', name: 'Retail', desc: 'Omnichannel promotions and store traffic growth.' },
  { icon: 'fa-cart-shopping', name: 'E-commerce', desc: 'ROAS-focused paid media and conversion optimization.' },
  { icon: 'fa-building', name: 'Real Estate', desc: 'Lead generation and listing visibility campaigns.' },
  { icon: 'fa-graduation-cap', name: 'Education', desc: 'Enrollment marketing and student engagement funnels.' },
  { icon: 'fa-industry', name: 'Manufacturing', desc: 'B2B demand generation and trade lead programs.' },
  { icon: 'fa-truck', name: 'Logistics', desc: 'Partner acquisition and service-area targeting.' },
  { icon: 'fa-cloud', name: 'SaaS', desc: 'Pipeline growth, trials, and product-led acquisition.' },
  { icon: 'fa-utensils', name: 'Hospitality', desc: 'Bookings, reviews, and seasonal promotion campaigns.' },
];

export const marketingFaqsExtra = [
  { q: 'How quickly can we see marketing results?', a: 'Paid campaigns often show data within days; SEO and content typically gain traction in 8–16 weeks.' },
  { q: 'Do you provide monthly performance reports?', a: 'Yes — transparent dashboards and executive summaries with KPIs, insights, and next steps.' },
  { q: 'Can you work with our in-house marketing team?', a: 'We collaborate as an extension of your team or manage channels end-to-end.' },
  { q: 'What budgets do you typically manage?', a: 'From lean startup budgets to six-figure enterprise media spends.' },
  { q: 'Do you create ad creatives and copy?', a: 'Yes — design, copywriting, and landing page optimization are included in full-service packages.' },
  { q: 'How do you measure ROI?', a: 'We track leads, conversions, ROAS, CAC, and revenue attribution via analytics and CRM integration.' },
];

export function mergeMarketingFaqs(specific, min = 12) {
  const merged = [...specific];
  for (const f of [...marketingFaqsExtra, ...defaultFaqsExtra]) {
    if (merged.length >= min) break;
    if (!merged.some((x) => x.q === f.q)) merged.push(f);
  }
  return merged.slice(0, Math.max(min, merged.length));
}

export const MARKETING_SLUGS = [
  'promotion', 'seo', 'social-media-marketing', 'influencer-marketing', 'performance-marketing',
  'google-ads-management', 'meta-ads-management', 'search-engine-ads', 'bundle-marketing',
  'email-marketing', 'whatsapp-marketing', 'sms-marketing',
  'marketplace', 'ecommerce-management', 'product-listing', 'marketplace-seo',
];

export function marketingGalleryFor(...urls) {
  const labels = ['Campaign strategy', 'Analytics dashboard', 'Team collaboration', 'Creative assets', 'Performance metrics', 'Channel growth'];
  return urls.map((src, i) => ({
    src,
    alt: labels[i % labels.length],
    caption: labels[i % labels.length],
  }));
}

export const TARGET_REDIRECT_SLUGS = [
  'ai-development', 'generative-ai', 'ai-agent-development', 'ai-multi-agent-agents',
  'ai-automation', 'conversational-ai', 'machine-learning', 'enterprise-ai',
  'ai-product-engineering', 'rag-development',
  'custom-mobile-app-development', 'enterprise-mobile-app-development',
  'startup-app-development', 'business-mobile-applications',
  'consumer-mobile-applications', 'on-demand-app-development',
  'website-development',
];

/** 14 web/infrastructure service pages — enterprise homepage-aligned rebuild */
export const ENTERPRISE_WEB_SLUGS = [
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

/** Unique Unsplash hero images per enterprise web service (open source) */
export const ENTERPRISE_HERO_IMAGES = {
  'website-development': IMG('photo-1467232004584-a241de8bcf5d'),
  'cms': IMG('photo-1497633766535-8f91f24d44c'),
  'frontend-development': IMG('photo-1498050108023-c5249f4df085'),
  're-development-site': IMG('photo-1560518883-ce09059eeffa'),
  'full-stack-development': IMG('photo-1504638318981-a097836b4284'),
  'marketplace-development': IMG('photo-1556742049-0cfed4f6a45d'),
  'web-portal-development': IMG('photo-1551434678-e076c223a692'),
  'cloud-solutions': IMG('photo-1451187580459-43490279c0fa'),
  'seo-digital-optimization': IMG('photo-1432888492376-944dee89ba04'),
  'maintenance-support': IMG('photo-1553877522-43269d4ea984'),
  'ui-ux-design': IMG('photo-1561070791-2526d30994b5'),
  'website-security': IMG('photo-1563986768609-322da13575f3'),
  'legacy-modernization': IMG('photo-1551288049-bebda4e38f71'),
  'emerging-web-technologies': IMG('photo-1677442136019-21780ecad995'),
};

/** Companion overview / figure images */
export const ENTERPRISE_OVERVIEW_IMAGES = {
  'website-development': IMG('photo-1547658719-da2b51169166'),
  'cms': IMG('photo-1486312338219-ce68d2c6f44d'),
  'frontend-development': IMG('photo-15876286592822-26366e30e03c'),
  're-development-site': IMG('photo-1486406146926-c627a92ad1ab'),
  'full-stack-development': IMG('photo-1522071820081-009f0129c71c'),
  'marketplace-development': IMG('photo-1556740750-8890cde292aa'),
  'web-portal-development': IMG('photo-1497366216548-37526070297c'),
  'cloud-solutions': IMG('photo-1544197150-b99a580bb7a8'),
  'seo-digital-optimization': IMG('photo-1460925895917-afdab827c52f'),
  'maintenance-support': IMG('photo-1521791136064-7986c2920216'),
  'ui-ux-design': IMG('photo-1581291518857-4e27b16325c1'),
  'website-security': IMG('photo-1555949963-aa79dcee981c'),
  'legacy-modernization': IMG('photo-1517245386807-bb43f82c33c4'),
  'emerging-web-technologies': IMG('photo-1620712943543-bcc4688e7485'),
};

export const ENTERPRISE_SECTION_ORDER = [
  'overview', 'whyChoose', 'features', 'benefits', 'tech', 'process',
  'industries', 'testimonials', 'cta', 'contact',
];

export const enterpriseWebIndustries = [
  { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'HIPAA-aware platforms and clinical workflows.' },
  { icon: 'fa-helmet-safety', name: 'Construction', desc: 'Project portals, field apps, and contractor management.' },
  { icon: 'fa-graduation-cap', name: 'Education', desc: 'LMS, e-learning, and student engagement platforms.' },
  { icon: 'fa-landmark', name: 'Finance', desc: 'Secure fintech, banking, and compliance systems.' },
  { icon: 'fa-bag-shopping', name: 'Retail', desc: 'Omnichannel commerce and customer engagement.' },
  { icon: 'fa-landmark-dome', name: 'Government', desc: 'Citizen services and secure public-sector systems.' },
  { icon: 'fa-hotel', name: 'Hospitality', desc: 'Booking engines, guest apps, and operations tools.' },
  { icon: 'fa-building', name: 'Real Estate', desc: 'Property portals, CRM, and virtual tours.' },
  { icon: 'fa-truck-fast', name: 'Logistics', desc: 'Fleet, routing, and real-time tracking platforms.' },
  { icon: 'fa-industry', name: 'Manufacturing', desc: 'IoT, predictive maintenance, and supply chain.' },
  { icon: 'fa-bus', name: 'Transportation', desc: 'Mobility platforms and fleet management systems.' },
  { icon: 'fa-scale-balanced', name: 'Legal', desc: 'Case management and secure client portals.' },
  { icon: 'fa-shield-heart', name: 'Insurance', desc: 'Policy admin, claims, and customer self-service.' },
  { icon: 'fa-tower-cell', name: 'Telecommunications', desc: 'Customer portals and network operations tools.' },
];
