/**
 * Factory for enterprise service landing page configs.
 * Used by svc-migrated-pages.mjs and extended AI entries.
 */
import {
  IMG, enterpriseProcess, defaultIndustries, galleryFor, mergeFaqs,
  ENTERPRISE_WEB_SLUGS, ENTERPRISE_SECTION_ORDER, enterpriseWebIndustries,
  ENTERPRISE_HERO_IMAGES, ENTERPRISE_OVERVIEW_IMAGES,
} from './svc-shared-data.mjs';
import { getSliderForSlug, getSliderOgUrl } from './slider-images.mjs';
import { getLayoutProfile } from './svc-layout-profiles.mjs';
import {
  MASTER_LAYOUT,
  MASTER_SECTION_ORDER,
  MASTER_HERO_HIGHLIGHTS,
  MASTER_HERO_CTA_PRIMARY,
  MASTER_HERO_CTA_SECONDARY,
} from './svc-master-template.mjs';

/** Unsplash photo IDs by service category (royalty-free via images.unsplash.com) */
export const HERO_PHOTOS = {
  ai: 'photo-1677442136019-21780ecad995',
  genai: 'photo-1620712943543-bcc4688e7485',
  agents: 'photo-1677442136019-21780ecad995',
  ml: 'photo-1551288049-bebda4e38f71',
  vision: 'photo-1485827404703-89b55fcc595e',
  rpa: 'photo-1454165804606-c3d57bc86b40',
  mobile: 'photo-1512941937669-90a1df58e7cd',
  enterprise: 'photo-1460925895917-afdab827c52f',
  erp: 'photo-1556761175-b413da4baf72',
  cloud: 'photo-1451187580459-43490279c0fa',
  web: 'photo-1498050108023-c5249f4df085',
  ecommerce: 'photo-1556742049-0cfed4f6a45d',
  uiux: 'photo-1561070791-2526d30994b5',
  security: 'photo-1563986768609-322da13575f3',
  marketing: 'photo-1432888622747-4ebee778277a',
  devops: 'photo-1667372393119-3d4c48d07b9c',
  data: 'photo-1551288049-bebda4e38f71',
  saas: 'photo-1551434678-e076c223a692',
  default: 'photo-1522071820081-009f0129c71c',
};

export const STANDARD_SECTION_ORDER = [
  'overview', 'whyChoose', 'features', 'benefits', 'tech', 'process',
  'industries', 'testimonials', 'cta', 'contact',
];

export function ensureStandardSections(order) {
  const base = [...(order || STANDARD_SECTION_ORDER)].filter((s) => s !== 'cases' && s !== 'gallery');
  const inserts = [
    ['whyChoose', 'overview'],
    ['testimonials', 'industries'],
    ['industries', 'process'],
  ];
  for (const [section, after] of inserts) {
    if (base.includes(section)) continue;
    const idx = base.indexOf(after);
    base.splice(idx >= 0 ? idx + 1 : base.length - 2, 0, section);
  }
  return base;
}

export const defaultWhyChoose = [
  { icon: 'fa-medal', title: 'Enterprise Delivery', desc: 'Fortune-grade engineering practices, documentation, and governance on every engagement.' },
  { icon: 'fa-users-gear', title: 'Senior Specialists', desc: 'Architects and leads with deep domain experience — not junior bench rotations.' },
  { icon: 'fa-shield-halved', title: 'Security & Compliance', desc: 'Security-first design with audit trails, encryption, and regulatory awareness.' },
  { icon: 'fa-chart-line', title: 'Measurable ROI', desc: 'KPIs defined upfront and tracked through launch with transparent reporting.' },
];

export const defaultTestimonials = [
  { quote: 'Guudle delivered on time with enterprise quality. Our platform scaled seamlessly through peak demand.', name: 'Sarah Chen', role: 'CTO', company: 'FinScale Technologies' },
  { quote: 'Their team integrated with ours like an extension of our engineering org. Communication was exceptional.', name: 'Marcus Webb', role: 'VP Engineering', company: 'NovaRetail Group' },
  { quote: 'From discovery to deployment, every milestone was clear. We saw measurable business impact within weeks.', name: 'Priya Sharma', role: 'Director of Digital', company: 'HealthBridge Systems' },
];

const defaultBenefits = [
  { icon: 'fa-chart-line', title: 'Measurable Outcomes', desc: 'Solutions aligned to business KPIs and long-term growth.' },
  { icon: 'fa-shield-halved', title: 'Enterprise Security', desc: 'Security-first architecture with compliance readiness.' },
  { icon: 'fa-arrows-spin', title: 'Agile Delivery', desc: 'Transparent sprints with continuous stakeholder feedback.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Long-term partnership beyond launch day.' },
];

const defaultFeatures = [
  { icon: 'fa-lightbulb', title: 'Strategic Discovery', desc: 'Deep requirements analysis aligned to business goals.' },
  { icon: 'fa-code', title: 'Modern Engineering', desc: 'Cloud-native, scalable, and maintainable architecture.' },
  { icon: 'fa-plug', title: 'Seamless Integration', desc: 'Connect with ERP, CRM, analytics, and third-party APIs.' },
  { icon: 'fa-gauge-high', title: 'Performance Optimized', desc: 'Fast, reliable systems built for production workloads.' },
  { icon: 'fa-lock', title: 'Security Built-In', desc: 'Encryption, access controls, and audit-ready design.' },
  { icon: 'fa-rocket', title: 'Future-Ready', desc: 'Extensible platforms that evolve with your business.' },
];

const defaultServices = [
  { icon: 'fas fa-compass', title: 'Consulting & Strategy', desc: 'Roadmaps, architecture, and feasibility assessments.' },
  { icon: 'fas fa-pencil-ruler', title: 'Design & Prototyping', desc: 'UX flows, wireframes, and interactive prototypes.' },
  { icon: 'fas fa-code', title: 'Implementation', desc: 'Full-stack development with agile delivery.' },
  { icon: 'fas fa-vial', title: 'QA & Testing', desc: 'Automated testing, security review, and UAT support.' },
  { icon: 'fas fa-cloud', title: 'Cloud Deployment', desc: 'CI/CD, monitoring, and scalable infrastructure.' },
  { icon: 'fas fa-life-ring', title: 'Support & Growth', desc: 'Maintenance, optimization, and feature iteration.' },
];

const defaultTech = [
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'Azure', icon: 'fab fa-microsoft' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Docker', icon: 'fab fa-docker' },
];

function useSlider(slug, src, offset = 0) {
  if (!src || String(src).includes('unsplash.com')) return getSliderForSlug(slug, offset);
  return src;
}

function heroPhoto(category, slug) {
  const map = {
    ai: HERO_PHOTOS.ai, 'computer-vision': HERO_PHOTOS.vision, 'rpa-development': HERO_PHOTOS.rpa,
    'llm-development': HERO_PHOTOS.genai, 'generative-ai': HERO_PHOTOS.genai,
    mobile: HERO_PHOTOS.mobile, enterprise: HERO_PHOTOS.enterprise, erp: HERO_PHOTOS.erp,
    crm: HERO_PHOTOS.enterprise, hrms: HERO_PHOTOS.enterprise, cloud: HERO_PHOTOS.cloud,
    web: HERO_PHOTOS.web, ecommerce: HERO_PHOTOS.ecommerce, 'ui-ux-design': HERO_PHOTOS.uiux,
    devops: HERO_PHOTOS.devops, data: HERO_PHOTOS.data, saas: HERO_PHOTOS.saas,
  };
  if (map[slug]) return map[slug];
  if (slug.includes('mobile') || slug.includes('app')) return HERO_PHOTOS.mobile;
  if (slug.includes('cloud') || slug.includes('aws') || slug.includes('azure')) return HERO_PHOTOS.cloud;
  if (slug.includes('seo') || slug.includes('marketing') || slug.includes('ads')) return HERO_PHOTOS.marketing;
  return map[category] || HERO_PHOTOS.default;
}

/**
 * Build a complete service page config with sensible enterprise defaults.
 */
export function buildServicePage(opts) {
  const slug = opts.slug;
  const title = opts.title || slugTitle(slug);
  const category = opts.category || 'enterprise';
  const { sectionOrder: profileOrder } = getLayoutProfile(slug);
  const isEnterpriseWeb = ENTERPRISE_WEB_SLUGS.includes(slug);
  const mergedLayout = { ...MASTER_LAYOUT, ...(opts.layout || {}) };
  const useMasterTemplate = mergedLayout.pageRedesign === 'corpox';
  const heroImage = (isEnterpriseWeb && ENTERPRISE_HERO_IMAGES[slug])
    || opts.heroImage
    || getSliderForSlug(slug);
  const overviewImage = (isEnterpriseWeb && ENTERPRISE_OVERVIEW_IMAGES[slug])
    || opts.overviewImage
    || getSliderForSlug(slug, 1);
  const heroOgUrl = opts.heroOgUrl
    || (String(heroImage).includes('unsplash.com') ? heroImage : getSliderOgUrl(slug));
  const imgs = [
    heroImage,
    overviewImage,
    getSliderForSlug(slug, 2),
    getSliderForSlug(slug, 3),
    getSliderForSlug(slug, 4),
    getSliderForSlug(slug, 5),
  ];

  const headline = opts.headline || title;
  const headlineAccent = opts.headlineAccent || 'Built for Enterprise Scale';

  return {
    slug,
    category,
    theme: opts.theme || slug.replace(/-/g, '').slice(0, 12),
    title,
    badge: opts.badge || 'Enterprise Services',
    headline,
    headlineAccent,
    subhead: opts.subhead || `Guudle IT Solutions delivers ${title.toLowerCase()} with enterprise-grade architecture, security, and measurable business outcomes for global organizations.`,
    metaDescription: opts.metaDescription || `${title} services by Guudle IT Solutions — enterprise architecture, agile delivery, and long-term support for ambitious teams worldwide.`,
    keywords: opts.keywords || `${title}, Enterprise Software, Guudle IT Solutions`,
    layout: mergedLayout,
    heroImage,
    heroOgUrl,
    overviewImage,
    heroCtaPrimary: opts.heroCtaPrimary || (useMasterTemplate ? MASTER_HERO_CTA_PRIMARY : undefined),
    heroCtaSecondary: opts.heroCtaSecondary || (useMasterTemplate ? MASTER_HERO_CTA_SECONDARY : undefined),
    heroHighlights: opts.heroHighlights || (useMasterTemplate ? MASTER_HERO_HIGHLIGHTS : undefined),
    heroHideImage: opts.heroHideImage,
    heroCentered: opts.heroCentered ?? (useMasterTemplate ? (!heroImage || !!opts.heroHideImage) : undefined),
    heroFeatureStyle: opts.heroFeatureStyle,
    heroImagePosition: opts.heroImagePosition,
    overview: opts.overview || {
      title: `Introduction to ${title}`,
      text: `We partner with enterprises to design, build, and scale ${title.toLowerCase()} solutions that reduce operational friction, improve customer experiences, and drive measurable ROI. Our teams combine strategic consulting with hands-on engineering.`,
      highlights: opts.highlights || ['Discovery-led engagement', 'Security & compliance ready', 'Agile delivery with demos', 'Post-launch optimization'],
    },
    whyChoose: opts.whyChoose || defaultWhyChoose,
    features: opts.features || defaultFeatures,
    services: opts.services || defaultServices,
    benefits: opts.benefits || defaultBenefits,
    process: opts.process || enterpriseProcess,
    industries: isEnterpriseWeb ? (opts.industries || enterpriseWebIndustries) : (opts.industries || defaultIndustries),
    gallery: (opts.gallery || galleryFor(...imgs)).map((g, i) => ({
      ...g,
      src: useSlider(slug, g.src, i),
    })),
    cases: (opts.cases || [
      { tag: 'Enterprise', title: `${title} Platform`, desc: `End-to-end ${title.toLowerCase()} delivery with measurable KPI improvements.`, image: getSliderForSlug(slug, 2) },
      { tag: 'Global', title: 'Multi-Region Rollout', desc: 'Secure deployment across regions with unified governance.', image: getSliderForSlug(slug, 3) },
      { tag: 'Innovation', title: 'Digital Transformation', desc: 'Modernized legacy workflows with cloud-native architecture.', image: getSliderForSlug(slug, 4) },
    ]).map((c, i) => ({
      ...c,
      image: useSlider(slug, c.image, 2 + i),
    })),
    tech: opts.tech || defaultTech,
    testimonials: opts.testimonials || defaultTestimonials,
    faqs: mergeFaqs(opts.faqs || [{ q: `What is included in ${title}?`, a: 'Discovery, architecture, implementation, testing, deployment, and optional managed support.' }], 10),
    trust: opts.trust || ['AWS', 'Azure', 'React', 'Node.js', 'Python'],
    related: opts.related || [
      { href: 'enterprise-solutions.html', label: 'Enterprise Solutions' },
      { href: 'cloud-engineering.html', label: 'Cloud Engineering' },
      { href: 'ai-development.html', label: 'AI Development' },
      { href: 'website-development.html', label: 'Website Development' },
    ],
    sectionOrder: ensureStandardSections(
      opts.sectionOrder
        ? opts.sectionOrder
        : useMasterTemplate
          ? MASTER_SECTION_ORDER
          : (isEnterpriseWeb ? ENTERPRISE_SECTION_ORDER : profileOrder)
    ),
    enterpriseTier: useMasterTemplate ? false : (isEnterpriseWeb || !!opts.enterpriseTier),
    stats: undefined,
    cta: isEnterpriseWeb ? (opts.cta || "Let's Build Your Next Digital Solution") : (opts.cta || `Ready to Start Your ${title} Project?`),
    ctaSubtext: opts.ctaSubtext || (isEnterpriseWeb
      ? 'Partner with our experienced team to create secure, scalable, and future-ready web solutions tailored to your business goals.'
      : 'Partner with Guudle IT Solutions for enterprise-grade delivery.'),
    sectionTitles: opts.sectionTitles || {
      whyChoose: 'Why Choose Guudle',
      features: 'Key Features & Capabilities',
      featuresSub: 'Enterprise-grade capabilities designed for performance, security, scalability, and long-term maintainability.',
      benefits: 'Business Benefits',
      tech: 'Technology Stack',
      process: 'Our Development Process',
      cases: 'Success Stories',
      testimonials: 'Client Testimonials',
    },
    capabilitiesVariant: opts.capabilitiesVariant,
    capabilitiesIntro: opts.capabilitiesIntro,
    flutterSpotlight: opts.flutterSpotlight,
    capabilitySpotlight: opts.capabilitySpotlight,
    capabilitiesBadgeIcon: opts.capabilitiesBadgeIcon,
    whyChooseBadgeIcon: opts.whyChooseBadgeIcon,
    whyChooseIntro: opts.whyChooseIntro,
    whyChooseVariant: opts.whyChooseVariant,
    whyChooseTheme: opts.whyChooseTheme,
    whyChooseCtaHref: opts.whyChooseCtaHref,
    whyChooseCtaLabel: opts.whyChooseCtaLabel,
    industriesTheme: opts.industriesTheme,
    industriesLead: opts.industriesLead,
    industriesFooterText: opts.industriesFooterText,
    industriesBg: opts.industriesBg,
    afterFeaturesParallax: opts.afterFeaturesParallax,
    industriesVariant: opts.industriesVariant,
    ecosystemSection: opts.ecosystemSection,
    ecosystem: opts.ecosystem,
    includeFaq: opts.includeFaq,
    processHub: opts.processHub,
    ...opts.overrides,
  };
}
