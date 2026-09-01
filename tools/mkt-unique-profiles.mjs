/** Unique layout profile per marketing page — hero type, section pipeline, theme */
import { sliderImagesForSlug } from './slider-images.mjs';

const imgs = (slug) => sliderImagesForSlug(slug, 14);

export const PROFILES = {
  promotion: {
    hero: 'promo-launch',
    accent: '#F59E0B', accent2: '#FBBF24',
    extraCss: 'mkt-redesign.css',
    pipeline: ['promo-stats-cards', 'promo-overview-editorial', 'promo-types', 'promo-features-carousel', 'promo-process-timeline', 'promo-gallery-polaroid', 'promo-why-split', 'industries-marquee', 'promo-cases-bento', 'tech-pills', 'faq-accordion', 'cta-split', 'contact', 'related'],
    images: imgs('promotion'),
    tagline: 'Brand Growth & Market Expansion',
  },
  seo: {
    hero: 'seo-command',
    accent: '#22C55E', accent2: '#4ADE80',
    extraCss: 'mkt-redesign.css',
    pipeline: ['seo-metrics-dash', 'seo-overview-pillars', 'seo-features-grid-img', 'seo-audit-preview', 'seo-process-wizard', 'seo-gallery-compare', 'seo-why-stack', 'industries-grid-compact', 'seo-cases-slider', 'tech-grid', 'faq-two-col', 'cta-minimal', 'contact', 'related'],
    images: imgs('seo'),
    tagline: 'Search Domination',
  },
  'social-media-marketing': {
    hero: 'social-grid',
    accent: '#EC4899', accent2: '#F472B6',
    pipeline: ['engagement-stats', 'overview-zigzag', 'features-feed', 'showcase-a', 'gallery-instagram', 'process-stepped', 'why-light-bento', 'industries-pills', 'cases-stack', 'tech-row', 'showcase-b', 'faq-accordion', 'cta-social', 'contact', 'related'],
    images: imgs('social-media-marketing'),
    tagline: 'Audience Engagement',
  },
  'influencer-marketing': {
    hero: 'creators',
    accent: '#A855F7', accent2: '#C084FC',
    pipeline: ['overview-creator', 'features-showcase', 'showcase-a', 'stats-creator', 'process-timeline', 'gallery-creators', 'why-light-bento', 'industries-icons', 'cases-spotlight', 'tech-minimal', 'showcase-b', 'faq-accordion', 'cta-creator', 'contact', 'related'],
    images: imgs('influencer-marketing'),
    tagline: 'Creator Economy',
  },
  'performance-marketing': {
    hero: 'analytics',
    accent: '#3B82F6', accent2: '#60A5FA',
    pipeline: ['stats-dashboard', 'overview-analytics', 'features-metrics', 'showcase-a', 'gallery-charts', 'process-funnel', 'why-cards-offset', 'industries-grid-compact', 'cases-trio', 'tech-grid', 'showcase-b', 'faq-two-col', 'cta-data', 'contact', 'related'],
    images: imgs('performance-marketing'),
    tagline: 'Data-Driven Growth',
  },
  'google-ads-management': {
    hero: 'google-ppc',
    accent: '#4285F4', accent2: '#34A853',
    pipeline: ['overview-ppc', 'features-ad-mockup', 'stats-inline', 'showcase-a', 'process-horizontal', 'gallery-ppc', 'why-cards-offset', 'industries-marquee', 'cases-featured', 'tech-pills', 'showcase-b', 'faq-accordion', 'cta-ppc', 'contact', 'related'],
    images: imgs('google-ads-management'),
    tagline: 'Paid Search Success',
  },
  'meta-ads-management': {
    hero: 'meta-phone',
    accent: '#1877F2', accent2: '#E1306C',
    pipeline: ['features-ad-preview', 'overview-reverse', 'engagement-stats', 'showcase-a', 'gallery-meta', 'process-stepped', 'why-light-bento', 'industries-pills', 'cases-stack', 'tech-row', 'showcase-b', 'faq-accordion', 'cta-meta', 'contact', 'related'],
    images: imgs('meta-ads-management'),
    tagline: 'Social Advertising',
  },
  'search-engine-ads': {
    hero: 'sea-command',
    accent: '#6366F1', accent2: '#818CF8',
    extraCss: 'mkt-redesign.css',
    pipeline: ['sea-stats-strip', 'sea-overview-split', 'sea-platforms', 'sea-features-grid', 'sea-intent-map', 'sea-process-flow', 'sea-gallery-grid', 'sea-why-split', 'industries-marquee', 'sea-cases-bento', 'tech-pills', 'faq-two-col', 'cta-split', 'contact', 'related'],
    images: imgs('search-engine-ads'),
    tagline: 'Intent-Based Marketing',
  },
  'bundle-marketing': {
    hero: 'ecosystem',
    accent: '#8B5CF6', accent2: '#A78BFA',
    pipeline: ['overview-bento', 'features-network', 'stats-inline', 'showcase-a', 'process-orbit', 'gallery-omni', 'why-light-bento', 'industries-marquee', 'cases-featured', 'tech-pills', 'showcase-b', 'faq-accordion', 'cta-ecosystem', 'contact', 'related'],
    images: imgs('bundle-marketing'),
    tagline: 'Integrated Marketing Solutions',
  },
  'email-marketing': {
    hero: 'inbox',
    accent: '#10B981', accent2: '#34D399',
    pipeline: ['overview-inbox', 'features-workflow', 'stats-inline', 'showcase-a', 'gallery-email', 'process-horizontal', 'why-cards-offset', 'industries-pills', 'cases-stack', 'tech-row', 'showcase-b', 'faq-accordion', 'cta-inbox', 'contact', 'related'],
    images: imgs('email-marketing'),
    tagline: 'Automated Customer Engagement',
  },
  'whatsapp-marketing': {
    hero: 'chat',
    accent: '#25D366', accent2: '#128C7E',
    pipeline: ['features-bubbles', 'overview-chat', 'engagement-stats', 'showcase-a', 'gallery-chat', 'process-stepped', 'why-light-bento', 'industries-icons', 'cases-spotlight', 'tech-minimal', 'showcase-b', 'faq-accordion', 'cta-chat', 'contact', 'related'],
    images: imgs('whatsapp-marketing'),
    tagline: 'Instant Customer Communication',
  },
  'sms-marketing': {
    hero: 'mobile-notify',
    accent: '#10A5F5', accent2: '#10A5F5',
    pipeline: ['stats-mobile', 'overview-mobile', 'features-sms', 'showcase-a', 'gallery-mobile', 'process-funnel', 'why-cards-offset', 'industries-grid-compact', 'cases-trio', 'tech-grid', 'showcase-b', 'faq-two-col', 'cta-mobile', 'contact', 'related'],
    images: imgs('sms-marketing'),
    tagline: 'Direct Mobile Outreach',
  },
  marketplace: {
    hero: 'marketplace-platform',
    accent: '#F97316', accent2: '#FB923C',
    pipeline: ['overview-vendor', 'features-vendor', 'stats-inline', 'showcase-a', 'gallery-vendor', 'process-horizontal', 'why-light-bento', 'industries-marquee', 'cases-featured', 'tech-pills', 'showcase-b', 'faq-accordion', 'cta-marketplace', 'contact', 'related'],
    images: imgs('marketplace'),
    tagline: 'Marketplace Growth Platform',
  },
  'ecommerce-management': {
    hero: 'control-center',
    accent: '#5B9FFF', accent2: '#4DA3FF',
    pipeline: ['stats-dashboard', 'overview-control', 'features-ops', 'showcase-a', 'gallery-store', 'process-funnel', 'why-cards-offset', 'industries-pills', 'cases-stack', 'tech-row', 'showcase-b', 'faq-accordion', 'cta-store', 'contact', 'related'],
    images: imgs('ecommerce-management'),
    tagline: 'Store Operations Excellence',
  },
  'product-listing': {
    hero: 'catalog',
    accent: '#F97316', accent2: '#FDBA74',
    pipeline: ['features-catalog', 'overview-catalog', 'stats-inline', 'showcase-a', 'gallery-products', 'process-stepped', 'why-light-bento', 'industries-icons', 'cases-spotlight', 'tech-minimal', 'showcase-b', 'faq-two-col', 'cta-catalog', 'contact', 'related'],
    images: imgs('product-listing'),
    tagline: 'Product Visibility & Sales',
  },
  'marketplace-seo': {
    hero: 'ranking-chart',
    accent: '#22C55E', accent2: '#86EFAC',
    pipeline: ['results-hero-band', 'features-rank', 'overview-rank', 'showcase-a', 'gallery-rank', 'process-vertical-alt', 'why-cards-offset', 'industries-grid-compact', 'cases-trio', 'tech-grid', 'showcase-b', 'faq-accordion', 'cta-rank', 'contact', 'related'],
    images: imgs('marketplace-seo'),
    tagline: 'Marketplace Search Optimization',
  },
};

export const MKT_SLUGS = Object.keys(PROFILES);
