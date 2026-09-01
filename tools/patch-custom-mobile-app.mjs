/**
 * Patch custom-mobile-app-development.html with full mobile app content
 * Run: node tools/patch-custom-mobile-app.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderCustomMobileAppMain, renderCustomMobileAppFaqsJsonLd } from './custom-mobile-app-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'services', 'custom-mobile-app-development.html');
let html = fs.readFileSync(file, 'utf8');

const cssLink = '<link rel="stylesheet" href="../../assets/css/custom-mobile-app.css">';
if (!html.includes('custom-mobile-app.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',
    `<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  ${cssLink}`
  );
}

html = html.replace(
  /<body class="[^"]*"/,
  '<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page cma-page"'
);

const desc = 'Mobile App Development Services — custom Android, iOS, and cross-platform apps. Guudle builds secure, scalable mobile solutions with enterprise UX, API integrations, and App Store deployment.';
html = html.replace(
  /<meta name="description" content="[^"]*">/,
  `<meta name="description" content="${desc}">`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*">/,
  `<meta property="og:description" content="${desc}">`
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*">/,
  `<meta name="twitter:description" content="${desc}">`
);
html = html.replace(
  /<title>[^<]*<\/title>/,
  '<title>Mobile App Development Services | Guudle IT Solutions</title>'
);
html = html.replace(
  /<meta property="og:title" content="[^"]*">/,
  '<meta property="og:title" content="Mobile App Development Services | Guudle IT Solutions">'
);
html = html.replace(
  /<meta name="twitter:title" content="[^"]*">/,
  '<meta name="twitter:title" content="Mobile App Development Services | Guudle IT Solutions">'
);

const faqEntities = renderCustomMobileAppFaqsJsonLd();
const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Mobile App Development Services',
      description: desc,
      provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      areaServed: 'Worldwide',
      url: 'https://guudle.com/pages/services/custom-mobile-app-development.html',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://guudle.com/pages/services/' },
        { '@type': 'ListItem', position: 3, name: 'Mobile App Development Services', item: 'https://guudle.com/pages/services/custom-mobile-app-development.html' },
      ],
    },
  ],
};
html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`
);

const mainContent = renderCustomMobileAppMain();
html = html.replace(
  /<main id="main">[\s\S]*?<\/main>/,
  `<main id="main">\n${mainContent}\n  </main>`
);

fs.writeFileSync(file, html, 'utf8');
console.log('Patched pages/services/custom-mobile-app-development.html');
