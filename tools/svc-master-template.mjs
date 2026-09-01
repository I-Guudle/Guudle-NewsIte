/**
 * Master design system — enterprise-mobile-app-development.html
 * Single source of truth for all generated service pages.
 */

export const MASTER_LAYOUT = {
  hero: 'saas-light',
  pageRedesign: 'corpox',
  cards: 'bordered',
  process: 'cards',
  pattern: 'mesh',
};

export const MASTER_SECTION_ORDER = [
  'features',
  'overview',
  'whyChoose',
  'industries',
  'services',
  'benefits',
  'process',
  'tech',
  'testimonials',
  'cta',
  'contact',
];

export const MASTER_HERO_HIGHLIGHTS = [
  { icon: 'fa-layer-group', title: 'Scalable Architecture', desc: 'Cloud-native systems built to grow with your business and user base.' },
  { icon: 'fa-shield-halved', title: 'Security Focused', desc: 'Zero-trust design with encryption, audit trails, and policy controls.' },
  { icon: 'fa-code', title: 'Modern Technology', desc: 'Current stacks and best practices matched to your requirements.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Named account team with SLA-backed response and proactive monitoring.' },
];

export const MASTER_HERO_CTA_PRIMARY = 'Get Started';
export const MASTER_HERO_CTA_SECONDARY = 'Book a Strategy Session';

export function isCorpoxPage(p) {
  return p?.layout?.pageRedesign === 'corpox';
}
