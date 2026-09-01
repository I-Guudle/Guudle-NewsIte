import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MARKETING_PAGES } from './svc-marketing-pages.mjs';
import { PROFILES, MKT_SLUGS } from './mkt-unique-profiles.mjs';
import { renderHero, renderPipeline, renderTrust, renderStickyNav } from './mkt-render.mjs';
import { getSliderOgUrl, getSliderForSlug } from './slider-images.mjs';

function useSlider(slug, src, offset = 0) {
  if (!src || String(src).includes('unsplash.com')) return getSliderForSlug(slug, offset);
  return src;
}

function buildCtx(slug) {
  const content = MARKETING_PAGES[slug];
  const profile = PROFILES[slug];
  if (!content || !profile) return null;
  const images = profile.images;
  const ctx = {
    slug,
    ...content,
    ...profile,
    heroImage: images[0],
    overviewImage: images[1],
    images,
  };
  ctx.pipeline = profile.pipeline.filter((key) => !key.includes('cases') && !key.includes('gallery') && !key.includes('faq'));
  ctx.cases = (ctx.cases || []).map((c, i) => ({
    ...c,
    image: useSlider(slug, c.image, 10 + i),
  }));
  if (Array.isArray(ctx.gallery)) {
    ctx.gallery = ctx.gallery.map((g, i) => ({
      ...g,
      src: useSlider(slug, g.src, 5 + i),
    }));
  }
  return ctx;
}

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1].split(',') : null;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'pages', 'services');

function schemaJson(slug, p) {
  const url = `https://guudle.com/pages/services/${slug}.html`;
  const graph = [
    { '@type': 'Service', name: p.title, description: p.metaDescription, provider: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' }, areaServed: 'Worldwide', url },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
      { '@type': 'ListItem', position: 2, name: 'Marketing', item: 'https://guudle.com/pages/services/promotion.html' },
      { '@type': 'ListItem', position: 3, name: p.title, item: url },
    ]},
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function buildPage(ctx) {
  const { slug, accent, accent2 } = ctx;
  const og = getSliderOgUrl(slug);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="description" content="${ctx.metaDescription}">
  <meta name="keywords" content="${ctx.keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:title" content="${ctx.title} | Guudle IT Solutions">
  <meta property="og:description" content="${ctx.metaDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://guudle.com/pages/services/${slug}.html">
  <meta property="og:image" content="${og}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${ctx.title} | Guudle IT Solutions">
  <meta name="twitter:description" content="${ctx.metaDescription}">
  <meta name="twitter:image" content="${og}">
  <title>${ctx.title} | Guudle IT Solutions</title>
  <script type="application/ld+json">${schemaJson(slug, ctx)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../../assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/mkt-unique.css">
  <link rel="stylesheet" href="../../assets/css/svc-capabilities.css">
  <link rel="stylesheet" href="../../assets/css/dev-process.css">
  ${ctx.extraCss ? `<link rel="stylesheet" href="../../assets/css/${ctx.extraCss}">` : ''}
  <link rel="stylesheet" href="../../assets/css/svc-corpox.css">
  <link rel="stylesheet" href="../../assets/css/industries-we-serve.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">
  <style>:root{--mkt-accent:${accent};--mkt-accent2:${accent2};}</style>
</head>
<body class="mkt-page slp-page service-page scroll-smooth antialiased guudle-site" data-mkt-page="${slug}" data-slp-prefix="mkt">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="mkt-scroll-progress" data-mkt-scroll-progress aria-hidden="true"></div>
  <button type="button" class="mkt-back-top" data-mkt-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">
    ${renderHero(ctx)}
    ${renderStickyNav(ctx)}
    ${renderTrust(ctx)}
    ${renderPipeline(ctx)}
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-webdev-data.js"></script>
  <script src="../../assets/js/mega-menu-data.js"></script>
  <script src="../../assets/js/mega-menu-render.js"></script>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/parallax-unified.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="../../assets/js/dev-process.js"></script>
  <script src="../../assets/js/mkt-unique.js"></script>
</body>
</html>`;
}

const targets = ONLY || MKT_SLUGS;
let n = 0;
for (const slug of targets) {
  const ctx = buildCtx(slug);
  if (!ctx) { console.warn('Skip:', slug); continue; }
  const out = path.join(outDir, `${slug}.html`);
  fs.writeFileSync(out, buildPage(ctx), 'utf8');
  console.log('Generated unique:', path.relative(root, out));
  n++;
}
console.log(`\nDone — ${n} unique marketing page(s).`);
