/**
 * Guudle /sliders image registry — reuse existing project assets.
 * Paths are relative from pages/services/*.html
 */
export const SLIDER_IDS = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45,
];

export function hashSlug(slug) {
  return [...String(slug)].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
}

export function sliderIdForSlug(slug, offset = 0) {
  const h = Math.abs(hashSlug(slug) + offset);
  return SLIDER_IDS[h % SLIDER_IDS.length];
}

/** Relative path for HTML img/background (from pages/services/) */
export function sliderRel(id) {
  return `../../sliders/${id}.jpg`;
}

/** Absolute URL for OG / schema */
export function sliderAbs(id, origin = 'https://guudle.com') {
  return `${origin}/sliders/${id}.jpg`;
}

export function getSliderForSlug(slug, offset = 0) {
  return sliderRel(sliderIdForSlug(slug, offset));
}

export function getSliderOgUrl(slug, offset = 0) {
  return sliderAbs(sliderIdForSlug(slug, offset));
}

/** Multiple slider images for galleries / marketing pages */
export function sliderImagesForSlug(slug, count = 6) {
  return Array.from({ length: count }, (_, i) => getSliderForSlug(slug, i));
}
