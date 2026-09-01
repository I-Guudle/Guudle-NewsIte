/**
 * QA audit — Digital Marketing pages vs custom-mobile-app-development CMA template
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MARKETING_SLUGS } from './svc-shared-data.mjs';
import { MARKETING_ENTERPRISE_PARALLAX } from './marketing-parallax-images.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'pages', 'services');

const REQUIRED = [
  'cma-page',
  'cma-hero',
  'cma-intro',
  'cma-why',
  'cma-services',
  'cma-enterprise-parallax',
  'ent-parallax',
  'cma-features',
  'cma-industries',
  'cma-why-us',
  'cma-faq',
  'cma-cta',
  'svc-contact',
  'custom-mobile-app.css',
  'enterprise-parallax-section.css',
  'home.css',
  'parallax-unified.js',
  'application/ld+json',
  'FAQPage',
  'canonical',
];

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(html) {
  const text = stripHtml(html);
  return text ? text.split(' ').filter(Boolean).length : 0;
}

function extractEntParallaxBg(html) {
  const m = html.match(/id="cma-enterprise-parallax"[\s\S]*?background-image:url\('([^']+)'\)/);
  return m ? m[1] : null;
}

function resolveHref(fromFile, href) {
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  const base = path.dirname(fromFile);
  return path.normalize(path.join(base, href.split('#')[0]));
}

const usedParallaxBgs = new Map();
const issues = [];

for (const slug of MARKETING_SLUGS) {
  const file = path.join(servicesDir, `${slug}.html`);
  const pageIssues = [];

  if (!fs.existsSync(file)) {
    issues.push({ slug, pageIssues: ['MISSING FILE'] });
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const words = wordCount(html);

  if (html.includes('mkt-unique.css')) pageIssues.push('Legacy mkt-unique.css still present');
  if (html.includes('id="svc-hero-heading"') && !html.includes('id="cma-hero-heading"')) {
    pageIssues.push('Wrong template — uses svc-hero instead of cma-hero');
  }

  for (const key of REQUIRED) {
    if (!html.includes(key)) pageIssues.push(`Missing: ${key}`);
  }

  if (words < 1990) pageIssues.push(`Word count ${words} (target 2000+)`);

  const bg = extractEntParallaxBg(html);
  const expected = MARKETING_ENTERPRISE_PARALLAX[slug];
  if (!bg) pageIssues.push('Enterprise parallax background not found');
  else if (expected && !bg.includes(expected.split('photo-')[1]?.split('?')[0] || '___')) {
    // loose check — bg should contain photo id fragment
    const photoId = (expected.match(/photo-[a-f0-9-]+/) || [])[0];
    if (photoId && !bg.includes(photoId)) pageIssues.push('Enterprise parallax bg mismatch');
  }
  if (bg) {
    if (usedParallaxBgs.has(bg)) pageIssues.push(`Duplicate enterprise parallax bg with ${usedParallaxBgs.get(bg)}`);
    else usedParallaxBgs.set(bg, slug);
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const resolved = resolveHref(file, href);
    if (resolved && !fs.existsSync(resolved)) pageIssues.push(`Broken link: ${href}`);
  }

  if (pageIssues.length) issues.push({ slug, pageIssues, words });
  else console.log(`✓ ${slug.padEnd(28)} ${words} words · enterprise parallax OK`);
}

console.log('\n═══════════════════════════════════════');
console.log('  MARKETING CMA TEMPLATE + PARALLAX QA');
console.log('═══════════════════════════════════════\n');

if (issues.length) {
  console.log(`Pages with issues: ${issues.length}/${MARKETING_SLUGS.length}\n`);
  issues.forEach(({ slug, pageIssues, words }) => {
    console.log(`✗ ${slug}${words ? ` (${words} words)` : ''}`);
    pageIssues.forEach((i) => console.log(`    • ${i}`));
  });
  process.exit(1);
}

console.log(`\nRESULT: PASS — all ${MARKETING_SLUGS.length} pages match CMA template with unique enterprise parallax`);
process.exit(0);
