/**

 * Patch website-development.html — Website Development Services full rebuild

 * Run: node tools/patch-website-development.mjs

 */

import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import { renderWebsiteDevelopmentMain, renderWebsiteDevelopmentFaqsJsonLd, WDEV_OG_IMAGE } from './website-development-render.mjs';



const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const file = path.join(root, 'pages', 'services', 'website-development.html');

let html = fs.readFileSync(file, 'utf8');



const cssLinks = [

  '<link rel="stylesheet" href="../../assets/css/website-development.css">',

  '<link rel="stylesheet" href="../../assets/css/svc-enterprise-v3.css">',

];



for (const link of cssLinks) {

  if (!html.includes(link)) {

    html = html.replace(

      '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',

      `<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  ${link}`

    );

  }

}


if (!html.includes('industries-we-serve.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/svc-corpox.css">',
    `<link rel="stylesheet" href="../../assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">`
  );
}



html = html.replace(

  /<body class="[^"]*"/,

  '<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page wdev-page"'

);



const title = 'Website Development Services | Guudle IT Solutions';

const desc = 'Custom website development services — corporate websites, landing pages, CMS, PWAs, and enterprise portals. SEO-ready, mobile-first, high-performance websites by Guudle IT Solutions.';

const canonical = 'https://guudle.com/pages/services/website-development.html';



html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);

html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="Website Development Services, Custom Websites, Corporate Websites, Landing Pages, CMS Development, PWA, Guudle IT Solutions">`);

html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);

html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);

html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);

html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);

html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`);

html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${WDEV_OG_IMAGE}">`);

html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${WDEV_OG_IMAGE}">`);



if (!html.includes('href="https://images.unsplash.com"')) {

  html = html.replace(

    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',

    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">'

  );

}



const faqEntities = renderWebsiteDevelopmentFaqsJsonLd();

const ldJson = {

  '@context': 'https://schema.org',

  '@graph': [

    {

      '@type': 'Service',

      name: 'Website Development Services',

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

        { '@type': 'ListItem', position: 3, name: 'Website Development Services', item: canonical },

      ],

    },

  ],

};

html = html.replace(

  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,

  `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`

);



const mainContent = renderWebsiteDevelopmentMain();

html = html.replace(

  /<main id="main">[\s\S]*?<\/main>/,

  `<main id="main">\n${mainContent}\n  </main>`

);



if (!html.includes('svc-enterprise-v3.js')) {

  html = html.replace(

    '<script src="../../assets/js/svc-landing.js"></script>',

    '<script src="../../assets/js/svc-landing.js"></script>\n  <script src="../../assets/js/svc-enterprise-v3.js"></script>'

  );

}



fs.writeFileSync(file, html, 'utf8');

console.log('Patched pages/services/website-development.html — Website Development rebuild complete');


