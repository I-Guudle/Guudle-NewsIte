/**
 * Patch re-development-site.html with extended parallax sections + grids
 * Run: node tools/patch-re-development-site.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  renderRedevTransformParallax,
  renderRedevSolutionsParallax,
  renderRedevTopServicesGrid,
  renderRedevStatsParallax,
  renderRedevSectorGrid,
  renderRedevSignsGrid,
  renderRedevPortfolioParallax,
} from './re-development-site-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'services', 're-development-site.html');
let html = fs.readFileSync(file, 'utf8');

if (!html.includes('industries-we-serve.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">'
  );
}
if (!html.includes('re-development-site.css')) {
  html = html.replace(
    /(<link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/industries-we-serve\.css">|<link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/svc-corpox\.css">)/,
    '$1\n  <link rel="stylesheet" href="../../assets/css/re-development-site.css">'
  );
}

html = html.replace(
  /<body class="[^"]*"/,
  '<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page redev-page"'
);

function has(id) {
  return html.includes(`id="${id}"`);
}

function injectAfter(pattern, content, label) {
  if (has(label)) return;
  if (!html.includes(pattern)) {
    console.warn('Pattern not found for', label);
    return;
  }
  html = html.replace(pattern, `${pattern}\n\n    ${content}`);
}

const injections = [
  {
    id: 'redev-transform',
    pattern: '</section>\n    \n    <nav class="slp-sticky-nav"',
    content: renderRedevTransformParallax(),
    replacePattern: true,
  },
  {
    id: 'redev-solutions',
    pattern: '</section>\n\n    <section id="svc-overview"',
    content: renderRedevSolutionsParallax(),
  },
  {
    id: 'redev-top-services',
    pattern: '</section>\n\n    <section id="svc-whyChoose"',
    content: renderRedevTopServicesGrid(),
  },
  {
    id: 'redev-stats',
    pattern: '</section>\n\n    <section id="svc-industries"',
    content: renderRedevStatsParallax(),
  },
  {
    id: 'redev-sectors',
    pattern: '</section>\n\n    <section id="svc-benefits"',
    content: renderRedevSectorGrid(),
  },
  {
    id: 'redev-signs',
    pattern: '</section>\n<section id="svc-process"',
    content: renderRedevSignsGrid(),
  },
  {
    id: 'redev-portfolio',
    pattern: '</section>\n\n    <section id="svc-tech-hub"',
    content: renderRedevPortfolioParallax(),
  },
];

for (const { id, pattern, content, replacePattern } of injections) {
  if (has(id)) continue;
  if (replacePattern) {
    html = html.replace(pattern, `</section>\n    \n    ${content}\n    \n    <nav class="slp-sticky-nav"`);
  } else {
    injectAfter(pattern, content, id);
  }
}

if (!html.includes('href="#redev-top-services"')) {
  html = html.replace(
    '<a href="#svc-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>',
    '<a href="#redev-top-services" class="slp-sticky-nav__link" data-svc-nav-link>Solutions</a><a href="#svc-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a><a href="#redev-portfolio" class="slp-sticky-nav__link" data-svc-nav-link>Portfolio</a>'
  );
}

html = html.replace(
  /<p class="cpox-lead">Modern tools and platforms we use to deliver enterprise-grade mobile solutions\.<\/p>/,
  '<p class="cpox-lead">Modern tools and platforms we use to deliver high-converting real estate development websites.</p>'
);

fs.writeFileSync(file, html, 'utf8');
console.log('Patched pages/services/re-development-site.html with extended RE sections');
