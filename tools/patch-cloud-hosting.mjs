/**
 * Patch cloud-solutions.html — Hosting & Cloud Solutions full rebuild
 * Run: node tools/patch-cloud-hosting.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderCloudHostingMain, renderCloudHostingFaqsJsonLd, CLOUD_HOSTING_OG_IMAGE } from './cloud-hosting-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'services', 'cloud-solutions.html');
let html = fs.readFileSync(file, 'utf8');

const cssBlock = `<link rel="stylesheet" href="../../assets/css/cloud-hosting.css">`;
if (!html.includes('cloud-hosting.css')) {
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
  '<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page cld-page"'
);

const title = 'Hosting & Cloud Solutions Services | Guudle IT Solutions';
const desc = 'Enterprise hosting and cloud solutions on AWS, Azure, GCP, and DigitalOcean. Guudle delivers cloud migration, managed hosting, DevOps, security, and 99.99% uptime infrastructure.';
const canonical = 'https://guudle.com/pages/services/cloud-solutions.html';

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="Hosting, Cloud Solutions, AWS, Azure, GCP, Managed Cloud, DevOps, Guudle IT Solutions">`);
html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);
html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);
html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${CLOUD_HOSTING_OG_IMAGE}">`);
html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${CLOUD_HOSTING_OG_IMAGE}">`);

if (!html.includes('href="https://images.unsplash.com"')) {
  html = html.replace(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">'
  );
}

const faqEntities = renderCloudHostingFaqsJsonLd();
const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Hosting & Cloud Solutions Services',
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
        { '@type': 'ListItem', position: 3, name: 'Hosting & Cloud Solutions Services', item: canonical },
      ],
    },
  ],
};
html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`
);

const mainContent = renderCloudHostingMain();
html = html.replace(
  /<main id="main">[\s\S]*?<\/main>/,
  `<main id="main">\n${mainContent}\n  </main>`
);

fs.writeFileSync(file, html, 'utf8');
console.log('Patched pages/services/cloud-solutions.html — Hosting & Cloud Solutions rebuild complete');
