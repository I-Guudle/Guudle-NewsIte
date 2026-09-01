/**
 * Deterministic unique layout profile per service slug.
 * Every page gets a distinct combination while staying on-brand.
 */
import { hashSlug } from './slider-images.mjs';

const HERO_TYPES = ['full', 'split', 'center', 'offset-left', 'offset-right'];
const CARD_STYLES = ['shadow', 'glass', 'bordered', 'gradient'];
const PROCESS_STYLES = ['timeline', 'cards'];
const PATTERNS = ['grid', 'dots', 'waves', 'diagonal', 'mesh'];
const FEATURE_COLS = [2, 3];
const WHY_LAYOUTS = ['grid-4', 'grid-3', 'bento'];
const BENEFITS_COLS = [2, 3, 4];
const TESTIMONIAL_LAYOUTS = ['grid-3', 'grid-2', 'stack'];

const SECTION_ORDER_VARIANTS = [
  ['overview', 'whyChoose', 'features', 'benefits', 'tech', 'process', 'industries', 'faq', 'testimonials', 'cta', 'contact'],
  ['overview', 'features', 'whyChoose', 'process', 'benefits', 'tech', 'industries', 'testimonials', 'faq', 'cta', 'contact'],
  ['overview', 'whyChoose', 'process', 'features', 'tech', 'benefits', 'industries', 'faq', 'testimonials', 'cta', 'contact'],
  ['overview', 'features', 'benefits', 'whyChoose', 'tech', 'process', 'industries', 'testimonials', 'faq', 'cta', 'contact'],
  ['overview', 'whyChoose', 'benefits', 'features', 'process', 'tech', 'industries', 'faq', 'testimonials', 'cta', 'contact'],
  ['overview', 'process', 'features', 'whyChoose', 'benefits', 'tech', 'industries', 'testimonials', 'faq', 'cta', 'contact'],
  ['overview', 'features', 'tech', 'whyChoose', 'benefits', 'process', 'industries', 'faq', 'testimonials', 'cta', 'contact'],
  ['overview', 'whyChoose', 'features', 'tech', 'benefits', 'process', 'industries', 'testimonials', 'faq', 'cta', 'contact'],
];

export function getLayoutProfile(slug) {
  const h = Math.abs(hashSlug(slug));
  return {
    layout: {
      hero: HERO_TYPES[h % HERO_TYPES.length],
      cards: CARD_STYLES[(h >> 3) % CARD_STYLES.length],
      process: PROCESS_STYLES[(h >> 5) % PROCESS_STYLES.length],
      pattern: PATTERNS[(h >> 7) % PATTERNS.length],
      featuresCols: FEATURE_COLS[(h >> 9) % FEATURE_COLS.length],
      whyLayout: WHY_LAYOUTS[(h >> 11) % WHY_LAYOUTS.length],
      benefitsCols: BENEFITS_COLS[(h >> 13) % BENEFITS_COLS.length],
      testimonialsLayout: TESTIMONIAL_LAYOUTS[(h >> 17) % TESTIMONIAL_LAYOUTS.length],
      parallaxSpeed: (0.22 + (h % 18) / 100).toFixed(2),
    },
    sectionOrder: SECTION_ORDER_VARIANTS[(h >> 15) % SECTION_ORDER_VARIANTS.length],
  };
}
