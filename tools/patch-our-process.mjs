/**
 * Patch our-process.html — Enterprise Development Process Hub
 * Run: node tools/patch-our-process.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderOurProcessMain, renderOurProcessFaqsJsonLd, PROCESS_OG_IMAGE } from './our-process-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'our-process.html');

let html = fs.readFileSync(file, 'utf8');

const cssLinks = [
  '<link rel="stylesheet" href="../assets/css/home.css">',
  '<link rel="stylesheet" href="../assets/css/dev-process.css">',
  '<link rel="stylesheet" href="../assets/css/our-process.css">',
  '<link rel="stylesheet" href="../assets/css/industries-we-serve.css">',
  '<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">',
];

for (const link of cssLinks) {
  const href = link.match(/href="([^"]+)"/)?.[1] || '';
  if (href && !html.includes(href.split('/').pop() || href)) {
    html = html.replace('</head>', `  ${link}\n</head>`);
  }
}

if (!html.includes('images.unsplash.com')) {
  html = html.replace(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">',
  );
}

html = html.replace(
  /<body class="[^"]*"/,
  '<body class="corp-page corp-page--process oproc-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium" data-corp-page="process"',
);

const title = 'Our Development Process | Guudle IT Solutions';
const desc = 'Enterprise software development lifecycle — discovery, planning, design, architecture, development, QA, deployment, and support. The single source of truth for how Guudle IT Solutions delivers digital products.';
const canonical = 'https://guudle.com/pages/our-process.html';

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);

const ogBlock = `<meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${PROCESS_OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${PROCESS_OG_IMAGE}">`;

if (html.includes('property="og:title"')) {
  html = html.replace(/<meta property="og:title" content="[^"]*">[\s\S]*?<meta name="twitter:image" content="[^"]*">/m, ogBlock);
} else {
  html = html.replace('</head>', `  ${ogBlock}\n</head>`);
}

const faqEntities = renderOurProcessFaqsJsonLd();
const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Our Development Process',
      description: desc,
      publisher: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      url: canonical,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Our Development Process', item: canonical },
      ],
    },
  ],
};

if (html.includes('application/ld+json')) {
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`);
} else {
  html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>\n</head>`);
}

const subnav = `<nav class="corp-subnav" aria-label="Company sections">
    <div class="corp-subnav-inner">
      <a href="about.html">About Us</a>
      <a href="testimonials.html">Testimonials</a><a href="our-process.html">Our Process</a>
    </div>
  </nav>`;

if (!html.includes('corp-subnav')) {
  html = html.replace('<div id="header-placeholder"></div>', `<div id="header-placeholder"></div>\n  ${subnav}`);
} else {
  html = html.replace(/<nav class="corp-subnav"[\s\S]*?<\/nav>/, subnav);
}

const mainContent = renderOurProcessMain();
html = html.replace(
  /<main id="main"[\s\S]*?<\/main>/,
  `<main id="main">\n${mainContent}\n  </main>`,
);

html = html.replace(/<script src="\.\.\/assets\/js\/about\.js"><\/script>\s*/g, '');

const scripts = [
  '<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>',
  '<script src="../assets/js/service-landing-core.js"></script>',
  '<script src="../assets/js/dev-process.js"></script>',
  '<script src="../assets/js/svc-landing.js"></script>',
];
for (const s of scripts) {
  const src = s.match(/src="([^"]+)"/)?.[1] || '';
  if (src && !html.includes(src)) {
    html = html.replace('</body>', `  ${s}\n</body>`);
  }
}

fs.writeFileSync(file, html, 'utf8');
console.log('Patched pages/our-process.html — Development Process Hub rebuild complete');
