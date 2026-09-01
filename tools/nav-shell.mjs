/**
 * Shared navigation shell — single source for all page generators.
 */

export const NAV_SCRIPT_NAMES = [
  'mega-menu-webdev-data.js',
  'mega-menu-data.js',
  'mega-menu-render.js',
  'components.js',
  'main.js',
  'parallax-unified.js',
];

export function assetPrefix(relPath) {
  const depth = relPath.split(/[/\\]/).filter(Boolean).length - 1;
  if (depth <= 0) return 'assets/';
  return '../'.repeat(depth) + 'assets/';
}

export function navHeadBlock(prefix) {
  return `  <script src="https://cdn.tailwindcss.com"></script>
  <script src="${prefix}js/tailwind-config.js"></script>
  <link rel="stylesheet" href="${prefix}css/styles.css">
  <link rel="stylesheet" href="${prefix}css/site-unified.css">`;
}

export function navScriptBlock(prefix) {
  return NAV_SCRIPT_NAMES.map((s) => `  <script src="${prefix}js/${s}"></script>`).join('\n');
}

export function navPlaceholders() {
  return `  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>`;
}

export function navFooterPlaceholders() {
  return `  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>`;
}
