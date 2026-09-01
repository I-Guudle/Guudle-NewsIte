/**
 * Transform MARKETING_PAGES configs into custom-mobile-app-development template format.
 */
import { MARKETING_PAGES } from './svc-marketing-pages.mjs';
import { MARKETING_SLUGS } from './svc-shared-data.mjs';
import { MASTER_LAYOUT, MASTER_HERO_CTA_PRIMARY, MASTER_HERO_CTA_SECONDARY } from './svc-master-template.mjs';

const MARKETING_SECTION_ORDER = [
  'overview', 'whyChoose', 'features', 'benefits', 'process', 'industries', 'testimonials', 'faq', 'cta', 'contact',
];

const MARKETING_HERO_HIGHLIGHTS = [
  { icon: 'fa-chart-line', title: 'Measurable ROI', desc: 'Every campaign tied to leads, revenue, and ROAS targets' },
  { icon: 'fa-bullseye', title: 'Data-Driven Strategy', desc: 'Analytics-led planning, testing, and optimization' },
  { icon: 'fa-wand-magic-sparkles', title: 'AI-Powered Marketing', desc: 'Automation, segmentation, and intelligent targeting' },
  { icon: 'fa-user-tie', title: 'Dedicated Team', desc: 'Strategists, creatives, and certified media specialists' },
];

const MARKETING_INDUSTRIES = [
  { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'Compliant patient acquisition, local visibility, and trust-led campaigns.' },
  { icon: 'fa-landmark', name: 'Finance', desc: 'Regulatory-aware demand generation and conversion funnels.' },
  { icon: 'fa-graduation-cap', name: 'Education', desc: 'Enrollment marketing, student engagement, and nurture programs.' },
  { icon: 'fa-helmet-safety', name: 'Construction', desc: 'Local lead generation, project showcases, and trade visibility.' },
  { icon: 'fa-industry', name: 'Manufacturing', desc: 'B2B demand generation, distributor outreach, and trade programs.' },
  { icon: 'fa-bag-shopping', name: 'Retail', desc: 'Omnichannel promotions, foot traffic growth, and loyalty campaigns.' },
  { icon: 'fa-building-columns', name: 'Government', desc: 'Public awareness, citizen engagement, and compliant outreach.' },
  { icon: 'fa-utensils', name: 'Hospitality', desc: 'Bookings, reviews, seasonal promotions, and guest retention.' },
  { icon: 'fa-truck', name: 'Logistics', desc: 'Partner acquisition, service-area targeting, and B2B pipelines.' },
  { icon: 'fa-building', name: 'Real Estate', desc: 'Listing visibility, lead generation, and agent brand building.' },
  { icon: 'fa-car', name: 'Automotive', desc: 'Dealer traffic, inventory promotions, and local search dominance.' },
  { icon: 'fa-microchip', name: 'Technology', desc: 'SaaS pipeline growth, product-led acquisition, and ABM programs.' },
  { icon: 'fa-hand-holding-heart', name: 'Non-Profit', desc: 'Donor acquisition, awareness campaigns, and community engagement.' },
];

const MARKETING_TESTIMONIALS = [
  { quote: 'Guudle rebuilt our marketing engine from the ground up — organic traffic up 214%, paid ROAS at 3.4x, and a dashboard our executives actually use every week.', name: 'Sarah Chen', role: 'VP Marketing', company: 'FinScale Technologies' },
  { quote: 'Their team operates like an extension of ours — transparent reporting, rapid testing, and campaigns that consistently beat our CPA targets quarter after quarter.', name: 'Marcus Webb', role: 'Director of Growth', company: 'NovaRetail Group' },
  { quote: 'From strategy through execution, every channel was aligned. We saw measurable pipeline impact within 60 days and sustained growth across SEO, paid, and email.', name: 'Priya Sharma', role: 'CMO', company: 'HealthBridge Systems' },
];

const WHY_ICONS = ['fa-chart-line', 'fa-user-plus', 'fa-bullhorn', 'fa-arrow-trend-up'];
const WHY_TITLES = ['Increase Revenue', 'More Qualified Leads', 'Stronger Brand Awareness', 'Higher Conversion Rates'];
const FEATURE_TAGS = ['Strategy', 'Execution', 'Analytics', 'Optimization', 'Automation', 'Growth'];

const SLUG_SHORT = {
  promotion: 'Promotion Marketing',
  seo: 'SEO',
  'social-media-marketing': 'Social Media',
  'influencer-marketing': 'Influencer Marketing',
  'performance-marketing': 'Performance Marketing',
  'google-ads-management': 'Google Ads',
  'meta-ads-management': 'Meta Ads',
  'search-engine-ads': 'Paid Search',
  'bundle-marketing': 'Integrated Marketing',
  'email-marketing': 'Email Marketing',
  'whatsapp-marketing': 'WhatsApp Marketing',
  'sms-marketing': 'SMS Marketing',
  marketplace: 'Marketplace Management',
  'ecommerce-management': 'E-Commerce',
  'product-listing': 'Product Listings',
  'marketplace-seo': 'Marketplace SEO',
};

function whyNeedsFor(page) {
  const label = SLUG_SHORT[page.slug] || page.title;
  const descs = [
    `${label} programs engineered to grow pipeline and revenue — with attribution models that prove impact on your bottom line, not vanity metrics alone.`,
    `Precision audience targeting and intent-based messaging that fills your CRM with prospects ready to buy — reducing cost per lead while improving sales velocity.`,
    `Consistent brand storytelling across every touchpoint builds trust, recall, and category authority — turning casual browsers into loyal advocates over time.`,
    `Conversion rate optimization across landing pages, offers, and nurture flows turns existing traffic into customers — compounding returns from every marketing dollar spent.`,
  ];
  return WHY_TITLES.map((title, i) => ({
    icon: WHY_ICONS[i],
    title,
    desc: descs[i],
  }));
}

function enrichFeature(f, i, page) {
  const label = SLUG_SHORT[page.slug] || page.title;
  const detail = f.detail || `${f.desc} Our ${label} specialists deploy enterprise playbooks — combining creative excellence, rigorous testing, and transparent analytics so every initiative drives measurable pipeline, revenue, and long-term brand equity for your organization.`;
  const points = f.points || [
    `Discovery workshops aligned to your funnel stages, ICP, and revenue KPIs`,
    `Channel-specific execution with creative frameworks and messaging tested for conversion`,
    `Weekly optimization cycles with executive-ready dashboards and actionable insights`,
    `Cross-functional collaboration with sales and product teams for closed-loop reporting`,
  ];
  const chips = f.chips || ['Analytics', 'Automation', 'ROI Tracking'];
  return {
    ...f,
    tag: f.tag || FEATURE_TAGS[i % FEATURE_TAGS.length],
    detail,
    points,
    chips,
    featured: f.featured ?? (i === 1),
    accent: f.accent ?? (i === 1 ? 'marketing' : undefined),
  };
}

function expandOverview(page) {
  const ov = page.overview || {};
  const extra = ` In today's competitive landscape, ${page.title.toLowerCase()} is not optional — it is the engine that connects your brand to buyers actively searching for solutions. Guudle IT Solutions combines strategic consulting with hands-on execution: certified platform specialists, creative teams, and analytics engineers working as one accountable unit. We audit your current performance, identify high-ROI opportunities, build integrated campaigns, and optimize continuously — so you gain sustainable growth, not short-term spikes. Every engagement includes transparent reporting, CRM integration, and executive summaries tied to leads, ROAS, CAC, and revenue. Our methodology spans discovery workshops, competitive intelligence, audience research, messaging architecture, channel setup, creative production, launch QA, daily monitoring, weekly optimization sprints, and monthly executive reviews. Whether you are scaling a startup pipeline or optimizing enterprise media spend across regions, we align every tactic to business outcomes — reducing wasted spend, improving conversion rates, and building brand equity that compounds quarter over quarter. Clients choose Guudle because we deliver agency-grade creativity with engineering-grade accountability: documented hypotheses, controlled experiments, full-funnel attribution, and recommendations your leadership team can act on immediately.`;
  return {
    ...ov,
    text: (ov.text || '') + extra,
  };
}

function buildEcosystem(page) {
  const short = SLUG_SHORT[page.slug] || page.title;
  return {
    sectionId: 'marketing-ecosystem',
    headingId: 'marketing-ecosystem-heading',
    badge: page.badge || 'Digital Marketing',
    title: `${short} Excellence,`,
    titleEm: 'Powered by Leading Platforms',
    lead: page.subhead,
    sub: page.overview?.text?.slice(0, 280) || '',
    hubTitle: 'Guudle Marketing Hub',
    hubCore: 'GUUDLE<br>Marketing',
    ctaTitle: page.cta || `Ready to Grow with ${page.title}?`,
    ctaDesc: page.ctaSubtext || 'Partner with Guudle IT Solutions for data-driven marketing that generates more traffic, qualified leads, and measurable business growth.',
    ctaBtn: 'Get Started Today',
  };
}

function toMarketingMobileConfig(page) {
  const short = SLUG_SHORT[page.slug] || page.title;
  const features = (page.features || []).map((f, i) => enrichFeature(f, i, page));
  const services = features.slice(0, 6).map((f) => ({
    icon: f.icon,
    title: f.title,
    desc: f.desc,
  }));

  return {
    category: 'marketing',
    theme: page.theme,
    title: page.title,
    badge: page.badge,
    headline: page.headline,
    headlineAccent: page.headlineAccent,
    subhead: page.subhead,
    metaDescription: page.metaDescription,
    keywords: page.keywords,
    heroImage: page.heroImage,
    overviewImage: page.overviewImage,
    heroCtaPrimary: 'Get Started Today',
    heroCtaSecondary: 'Book Free Consultation',
    heroHighlights: MARKETING_HERO_HIGHLIGHTS,
    layout: { ...MASTER_LAYOUT },
    capabilitiesVariant: 'mobile-premium',
    ecosystemSection: true,
    capabilitiesIntro: page.capabilitiesIntro || `Enterprise-grade ${short.toLowerCase()} — from strategy and creative through launch, optimization, and transparent reporting — designed for measurable pipeline growth, stronger brand presence, and sustainable ROI.`,
    capabilitySpotlight: {
      icon: 'fa-chart-line',
      eyebrow: 'Data-Driven Excellence',
      title: `${short} That Delivers Measurable Growth`,
      lead: page.overview?.text?.slice(0, 320) || page.subhead,
      points: (page.overview?.highlights || []).slice(0, 4).map((h) => h),
      stack: (page.trust || []).slice(0, 6),
    },
    whyChooseIntro: `From startups to enterprise brands — we design and execute ${short.toLowerCase()} programs that generate qualified leads, improve conversion rates, and deliver transparent ROI your leadership team can trust.`,
    sectionTitles: {
      features: 'Our Services',
      featuresSub: `Comprehensive ${short.toLowerCase()} capabilities — strategy, execution, analytics, and optimization under one accountable team.`,
      whyChooseBadge: 'Business Impact',
      whyChooseHtml: `Why Your Business Needs <span class="cma-why-head__accent">${escHtml(short)}</span>`,
      whyChooseLink: 'Explore our services',
      benefits: 'Results & Benefits',
      benefitsLead: 'Outcomes that matter — measurable marketing value delivered with enterprise-grade execution and transparent accountability.',
      testimonials: 'Client Success Stories',
      process: 'Our Marketing Process',
    },
    whyChoose: whyNeedsFor(page),
    overview: expandOverview(page),
    features,
    services,
    benefits: page.benefits,
    process: page.process,
    industries: MARKETING_INDUSTRIES,
    industriesLead: `We deliver ${short.toLowerCase()} programs across regulated, competitive, and high-growth sectors — with compliance-aware messaging, localized targeting, and analytics built for your industry's buying cycle.`,
    industriesFooterText: `${short} engineered for your industry's audience, compliance requirements, and revenue goals.`,
    testimonials: MARKETING_TESTIMONIALS,
    faqs: page.faqs,
    related: page.related,
    tech: page.tech,
    trust: page.trust,
    cta: page.cta || `Ready to Grow with ${page.title}?`,
    ctaSubtext: page.ctaSubtext || `Let's build a data-driven ${short.toLowerCase()} strategy that generates more traffic, qualified leads, and measurable business growth.`,
    sectionOrder: MARKETING_SECTION_ORDER,
    includeFaq: true,
    processHub: {
      badge: 'Marketing Process',
      title: 'Our Proven Marketing Process',
      desc: 'Every successful campaign begins with a rigorous methodology — discovery, research, strategy, execution, optimization, and transparent reporting. Discover how our strategists, creatives, and analysts transform marketing goals into measurable revenue outcomes.',
      btn: 'Explore Our Marketing Process',
    },
    ecosystem: buildEcosystem(page),
    capabilitiesBadgeIcon: 'fa-bullhorn',
    whyChooseBadgeIcon: 'fa-chart-line',
  };
}

function escHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export const MARKETING_MOBILE_PAGES = Object.fromEntries(
  MARKETING_SLUGS.filter((slug) => MARKETING_PAGES[slug]).map((slug) => [
    slug,
    toMarketingMobileConfig(MARKETING_PAGES[slug]),
  ])
);

export { toMarketingMobileConfig, MARKETING_SECTION_ORDER, MARKETING_INDUSTRIES };
