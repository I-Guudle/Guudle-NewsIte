/**
 * Generate Web Development pages — CMA master template (custom-mobile-app-development.html)
 * Run: node tools/generate-web-dev-cma-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WEB_DEV_PAGES, WEB_DEV_CMA_SLUGS } from './web-dev-pages.mjs';
import { renderWebDevCmaMain, renderWebDevFaqsJsonLd } from './web-dev-cma-render.mjs';
import { navScriptBlock } from './nav-shell.mjs';

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1].split(',') : null;

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'pages', 'services');
const prefix = '../../assets/';

function buildPage(slug, page) {
  const url = `https://guudle.com/pages/services/${slug}.html`;
  const ogImage = page.heroImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=82&auto=format&fit=crop';
  const faqEntities = renderWebDevFaqsJsonLd(page.faqs);
  const graph = [
    {
      '@type': 'Service',
      name: page.title,
      description: page.metaDescription,
      provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      areaServed: 'Worldwide',
      url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://guudle.com/pages/services/' },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
  ];
  if (faqEntities.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqEntities,
    });
  }

  const mainContent = renderWebDevCmaMain(page);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="${page.metaDescription}">
  <meta name="keywords" content="${page.keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${page.title} | Guudle IT Solutions">
  <meta property="og:description" content="${page.metaDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title} | Guudle IT Solutions">
  <meta name="twitter:description" content="${page.metaDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <title>${page.title} | Guudle IT Solutions</title>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="${prefix}js/tailwind-config.js"></script>
  <link rel="stylesheet" href="${prefix}css/styles.css">
  <link rel="stylesheet" href="${prefix}css/service-landing-shared.css">
  <link rel="stylesheet" href="${prefix}css/svc-landing.css">
  <link rel="stylesheet" href="${prefix}css/svc-capabilities.css">
  <link rel="stylesheet" href="${prefix}css/dev-process.css">
  <link rel="stylesheet" href="${prefix}css/process-hub-cta.css">
  <link rel="stylesheet" href="${prefix}css/site-unified.css">
  <link rel="stylesheet" href="${prefix}css/benefits-section.css">
  <link rel="stylesheet" href="${prefix}css/home.css">
  <link rel="stylesheet" href="${prefix}css/svc-corpox.css">
  <link rel="stylesheet" href="${prefix}css/industries-we-serve.css">
  <link rel="stylesheet" href="${prefix}css/custom-mobile-app.css">
  <link rel="stylesheet" href="${prefix}css/enterprise-parallax-section.css">
</head>
<body class="slp-page service-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page cma-page" data-slp-prefix="svc" data-svc-theme="${page.theme}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">
${mainContent}
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
${navScriptBlock(prefix)}
  <script src="${prefix}js/parallax-unified.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="${prefix}js/service-landing-core.js"></script>
  <script src="${prefix}js/dev-process.js"></script>
  <script src="${prefix}js/svc-landing.js"></script>
</body>
</html>`;
}

const slugs = ONLY || WEB_DEV_CMA_SLUGS.filter((s) => WEB_DEV_PAGES[s]);
let count = 0;

for (const slug of slugs) {
  const page = { ...WEB_DEV_PAGES[slug], slug };
  if (!page.title) {
    console.warn('Skip (no config):', slug);
    continue;
  }
  const html = buildPage(slug, page);
  const file = path.join(outDir, `${slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Generated:', path.relative(root, file));
  count++;
}

console.log(`\nDone — ${count} web development page(s) (CMA master template + enterprise parallax).`);
