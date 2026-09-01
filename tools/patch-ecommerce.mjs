/**
 * Patch ecommerce.html — E-Commerce Development full rebuild
 * Run: node tools/patch-ecommerce.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderEcommerceMain, renderEcommerceFaqsJsonLd, ECOMMERCE_OG_IMAGE } from './ecommerce-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'services', 'ecommerce.html');
let html = fs.readFileSync(file, 'utf8');

const cssBlock = `<link rel="stylesheet" href="../../assets/css/ecommerce.css">`;

if (!html.includes('benefits-section.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/site-unified.css">',
    `<link rel="stylesheet" href="../../assets/css/site-unified.css">\n  <link rel="stylesheet" href="../../assets/css/benefits-section.css">`
  );
}
if (!html.includes('ecommerce.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',
    `<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  ${cssBlock}`
  );
}
if (!html.includes('industries-we-serve.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',
    `<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">`
  );
}

html = html.replace(
  /<body class="[^"]*"/,
  '<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page ecom-page"'
);

const title = 'E-Commerce Development | Guudle IT Solutions';
const desc = 'Custom e-commerce development — online stores, marketplaces, B2B wholesale, and B2C platforms with secure payments, inventory management, and conversion-focused UX by Guudle IT Solutions.';
const canonical = 'https://guudle.com/pages/services/ecommerce.html';

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="E-Commerce Development, Online Store, Custom Marketplace, B2B E-Commerce, Guudle IT Solutions">`);
html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);
html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);
html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`);
html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ECOMMERCE_OG_IMAGE}">`);
html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ECOMMERCE_OG_IMAGE}">`);

if (!html.includes('href="https://images.unsplash.com"')) {
  html = html.replace(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">'
  );
}

const faqEntities = renderEcommerceFaqsJsonLd();
const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'E-Commerce Development',
      description: desc,
      provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      areaServed: 'Worldwide',
      url: canonical,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://guudle.com/pages/services/' },
        { '@type': 'ListItem', position: 3, name: 'E-Commerce Development', item: canonical },
      ],
    },
  ],
};
html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`
);

const mainContent = renderEcommerceMain();
html = html.replace(
  /<main id="main">[\s\S]*?<\/main>/,
  `<main id="main">\n${mainContent}\n  </main>`
);

fs.writeFileSync(file, html, 'utf8');
console.log('Patched pages/services/ecommerce.html — E-Commerce rebuild complete');
