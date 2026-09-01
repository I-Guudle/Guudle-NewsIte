/**
 * Canonical site ownership & development attribution metadata for Guudle IT Solutions.
 * Used by page generators and tools/inject-site-meta.mjs.
 */

export const SITE_META_MARKER = '<!-- Site ownership & development attribution — Guudle IT Solutions -->';

const COMPANY = 'Guudle IT Solutions';
const YEAR = '2026';
const RIGHTS = `© ${YEAR} ${COMPANY}. All rights reserved.`;
const ATTRIBUTION = `© ${YEAR} ${COMPANY}. This website is owned, designed, and developed by ${COMPANY}.`;

/**
 * @param {{ homeHref?: string, aboutHref?: string }} [opts]
 * @returns {string} HTML block (leading newline, 2-space indent per line)
 */
export function getSiteMetaBlock(opts = {}) {
  const homeHref = opts.homeHref ?? 'index.html';
  const aboutHref = opts.aboutHref ?? 'pages/about.html';

  return `
  ${SITE_META_MARKER}
  <meta name="author" content="${COMPANY}">
  <meta name="copyright" content="${RIGHTS}">
  <meta name="owner" content="${COMPANY}">
  <meta name="designer" content="${COMPANY}">
  <meta name="developer" content="${COMPANY}">
  <meta name="creator" content="${COMPANY}">
  <meta name="publisher" content="${COMPANY}">
  <meta name="application-name" content="${COMPANY}">
  <meta name="dcterms.rights" content="${RIGHTS}">
  <meta name="dcterms.rightsHolder" content="${COMPANY}">
  <meta name="dcterms.creator" content="${COMPANY}">
  <meta name="dcterms.publisher" content="${COMPANY}">
  <meta name="dcterms.dateCopyrighted" content="${YEAR}">
  <meta name="rights" content="${ATTRIBUTION}">
  <link rel="author" href="${aboutHref}">
  <link rel="home" href="${homeHref}">`;
}

/**
 * @param {string} filePath
 * @returns {{ homeHref: string, aboutHref: string }}
 */
export function getSiteMetaLinksForFile(filePath) {
  const normalized = filePath.replace(/\\/g, '/');

  if (/(^|\/)index\.html$/i.test(normalized) && !normalized.includes('/pages/')) {
    return { homeHref: 'index.html', aboutHref: 'pages/about.html' };
  }

  if (normalized.includes('/pages/services/') || normalized.includes('/pages/portfolio/')) {
    return { homeHref: '../../index.html', aboutHref: '../about.html' };
  }

  if (normalized.includes('/pages/')) {
    return { homeHref: '../index.html', aboutHref: 'about.html' };
  }

  return { homeHref: 'index.html', aboutHref: 'pages/about.html' };
}

/** @param {string} filePath */
export function getSiteMetaForFile(filePath) {
  return getSiteMetaBlock(getSiteMetaLinksForFile(filePath));
}

export function htmlHasSiteMeta(html) {
  return html.includes(SITE_META_MARKER);
}

/** @param {string} html @param {string} metaBlock */
export function injectSiteMetaIntoHtml(html, metaBlock) {
  if (htmlHasSiteMeta(html)) {
    return { html, changed: false, reason: 'already-present' };
  }

  const viewportRe = /(<meta\s+name="viewport"[^>]*>\s*)/i;
  if (viewportRe.test(html)) {
    return {
      html: html.replace(viewportRe, `$1${metaBlock}\n  `),
      changed: true,
      reason: 'injected',
    };
  }

  const charsetRe = /(<meta\s+charset="[^"]*">\s*)/i;
  if (charsetRe.test(html)) {
    return {
      html: html.replace(charsetRe, `$1${metaBlock}\n`),
      changed: true,
      reason: 'injected-after-charset',
    };
  }

  return { html, changed: false, reason: 'no-anchor' };
}
