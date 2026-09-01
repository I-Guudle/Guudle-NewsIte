/**
 * Enterprise Value — premium feature cards (no vanity metrics)
 * Replaces statistics / KPI / counter sections site-wide.
 */
import { renderBenefitsSection } from './benefits-section-render.mjs';

export const DEFAULT_ENTERPRISE_VALUE_CARDS = [
  {
    icon: 'fa-shield-halved',
    title: 'Enterprise Security',
    desc: 'Protect your business with industry-leading security, encryption, compliance, and continuous monitoring.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Scalable Architecture',
    desc: 'Cloud-native solutions that grow seamlessly with your business.',
  },
  {
    icon: 'fa-sliders',
    title: 'Custom Solutions',
    desc: 'Every solution is tailored specifically to your workflows and business objectives.',
  },
  {
    icon: 'fa-headset',
    title: 'Dedicated Support',
    desc: 'Long-term technical partnership with proactive maintenance and SLA-backed support.',
  },
  {
    icon: 'fa-code',
    title: 'Modern Technology',
    desc: 'Built using modern frameworks, cloud platforms, AI technologies, and enterprise best practices.',
  },
  {
    icon: 'fa-rocket',
    title: 'Future-Ready Solutions',
    desc: 'Designed for long-term scalability, flexibility, and continuous innovation.',
  },
  {
    icon: 'fa-gauge-high',
    title: 'Performance Optimized',
    desc: 'Fast, responsive, and engineered for exceptional user experiences across all devices.',
  },
  {
    icon: 'fa-plug',
    title: 'Seamless Integration',
    desc: 'Connect effortlessly with existing business systems, APIs, cloud services, and third-party platforms.',
  },
];

export const DEFAULT_ENTERPRISE_VALUE_COPY = {
  badge: 'Enterprise Value',
  title: 'Business Value We Deliver',
  accent: 'Deliver',
  lead: 'Enterprise-grade capabilities focused on security, scalability, and long-term partnership — designed for sustainable business growth.',
};

/**
 * @param {object} p — page config
 * @param {object} [opts]
 * @param {string} [opts.sectionId]
 * @param {string} [opts.slug]
 * @param {string} [opts.bg]
 * @param {string} [opts.badge]
 * @param {string} [opts.title]
 * @param {string} [opts.accent]
 * @param {string} [opts.lead]
 * @param {object[]} [opts.cards]
 * @param {number} [opts.limit]
 * @param {number} [opts.cols]
 * @param {boolean} [opts.aos]
 */
export function renderEnterpriseValueSection(p, opts = {}) {
  const slug = opts.slug || p.slug || 'website-development';
  const sectionId = opts.sectionId || 'svc-enterprise-value';
  const titles = p.sectionTitles || {};
  const cards = opts.cards || p.enterpriseValue || DEFAULT_ENTERPRISE_VALUE_CARDS;

  return renderBenefitsSection(
    {
      ...p,
      slug,
      benefits: cards,
      sectionTitles: {
        ...titles,
        benefitsBadge: opts.badge || titles.enterpriseValueBadge || titles.benefitsBadge || DEFAULT_ENTERPRISE_VALUE_COPY.badge,
        benefits: opts.title || titles.enterpriseValue || titles.benefits || DEFAULT_ENTERPRISE_VALUE_COPY.title,
        benefitsAccent: opts.accent || titles.enterpriseValueAccent || titles.benefitsAccent || DEFAULT_ENTERPRISE_VALUE_COPY.accent,
        benefitsSub: opts.lead || titles.enterpriseValueSub || titles.benefitsSub || DEFAULT_ENTERPRISE_VALUE_COPY.lead,
      },
    },
    {
      sectionId,
      slug,
      bg: opts.bg || p.enterpriseValueBg || p.benefitsBg,
      limit: opts.limit ?? 8,
      cols: opts.cols ?? 4,
      aos: opts.aos !== false,
    },
  );
}
