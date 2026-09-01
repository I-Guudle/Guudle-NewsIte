/**
 * Patch technology.html — Enterprise Technology Hub full rebuild
 * Run: node tools/patch-technology.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderTechnologyMain, renderTechnologyFaqsJsonLd, TECH_OG_IMAGE } from './technology-render.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(root, 'pages', 'technology.html');

if (!fs.existsSync(file)) {
  const careers = path.join(root, 'pages', 'careers.html');
  if (fs.existsSync(careers)) fs.copyFileSync(careers, file);
}

let html = fs.readFileSync(file, 'utf8');

const cssLinks = [
  '<link rel="stylesheet" href="../assets/css/svc-corpox.css">',
  '<link rel="stylesheet" href="../assets/css/dev-process.css">',
  '<link rel="stylesheet" href="../assets/css/home.css">',
  '<link rel="stylesheet" href="../assets/css/technology.css">',
  '<link rel="stylesheet" href="../assets/css/ai-hub.css">',
  '<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">',
];

if (!html.includes('technology.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../assets/css/site-unified.css">',
    `<link rel="stylesheet" href="../assets/css/site-unified.css">\n  ${cssLinks.filter((l) => !html.includes(l.split('"')[1]?.split('/').pop() || '')).join('\n  ')}`
  );
}
for (const link of cssLinks) {
  if (!html.includes(link.split('href="')[1]?.split('"')[0] || link)) {
    if (link.includes('technology.css') && !html.includes('technology.css')) {
      html = html.replace('</head>', `  ${link}\n</head>`);
    }
  }
}

if (!html.includes('technology.css')) {
  html = html.replace('</head>', '  <link rel="stylesheet" href="../assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="../assets/css/dev-process.css">\n  <link rel="stylesheet" href="../assets/css/home.css">\n  <link rel="stylesheet" href="../assets/css/technology.css">\n  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">\n</head>');
}

html = html.replace(
  /<body class="[^"]*"/,
  '<body class="slp-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium tech-page" data-svc-theme="technology"'
);

const title = 'Technologies We Use | Guudle IT Solutions';
const desc = 'Enterprise technology hub — frontend, backend, mobile, AI, cloud, DevOps, databases, security, and development tools. The single source of truth for technologies used by Guudle IT Solutions.';
const canonical = 'https://guudle.com/pages/technology.html';

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
if (html.includes('name="description"')) {
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
} else {
  html = html.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n  <meta name="description" content="${desc}">`);
}
html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);
if (!html.includes('rel="canonical"')) {
  html = html.replace('<meta name="description"', `<link rel="canonical" href="${canonical}">\n  <meta name="description"`);
}
if (html.includes('property="og:title"')) {
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${TECH_OG_IMAGE}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${TECH_OG_IMAGE}">`);
} else {
  html = html.replace('</head>', `  <meta property="og:title" content="${title}">\n  <meta property="og:description" content="${desc}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${TECH_OG_IMAGE}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${title}">\n  <meta name="twitter:description" content="${desc}">\n  <meta name="twitter:image" content="${TECH_OG_IMAGE}">\n</head>`);
}

if (!html.includes('images.unsplash.com')) {
  html = html.replace(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">'
  );
}

const faqEntities = renderTechnologyFaqsJsonLd(); // retained for import compatibility; returns []
const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Technologies We Use',
      description: desc,
      publisher: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      url: canonical,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Technologies We Use', item: canonical },
      ],
    },
  ],
};

if (html.includes('application/ld+json')) {
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`);
} else {
  html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>\n</head>`);
}

const mainContent = renderTechnologyMain();
html = html.replace(
  /<main id="main">[\s\S]*?<\/main>/,
  `<main id="main">\n${mainContent}\n  </main>`
);

html = html.replace(/<nav class="corp-subnav"[\s\S]*?<\/nav>\s*/g, '');
html = html.replace(/<script src="\.\.\/assets\/js\/about\.js"><\/script>/, '');

const scripts = [
  '<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>',
  '<script src="../assets/js/service-landing-core.js"></script>',
  '<script src="../assets/js/dev-process.js"></script>',
  '<script src="../assets/js/svc-landing.js"></script>',
  '<script src="../assets/js/technology.js"></script>',
];
for (const s of scripts) {
  if (!html.includes(s.split('src="')[1]?.split('"')[0] || s)) {
    html = html.replace('</body>', `  ${s}\n</body>`);
  }
}

if (!html.includes('header-placeholder')) {
  html = html.replace('<body', '<a href="#main" class="skip-link">Skip to main content</a>\n  <div id="header-placeholder"></div>\n  <body');
}

fs.writeFileSync(file, html, 'utf8');

const careersFile = path.join(root, 'pages', 'careers.html');
if (fs.existsSync(careersFile) && careersFile !== file) {
  fs.unlinkSync(careersFile);
}

console.log('Patched pages/technology.html — Technology Hub rebuild complete');
