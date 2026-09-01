/**
 * QA audit for 16 Digital Marketing & Marketplace service pages
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROFILES, MKT_SLUGS } from './mkt-unique-profiles.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'pages', 'services');

const REQUIRED_META = ['canonical', 'og:title', 'og:description', 'twitter:card', 'application/ld+json'];
const REQUIRED_SHELL = ['header-placeholder', 'footer-placeholder', 'mkt-unique.css', 'mkt-unique.js', 'components.js', 'cdn.tailwindcss.com'];
const MIN_IMAGES = 12;

function resolveHref(fromFile, href) {
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return null;
  const base = path.dirname(fromFile);
  return path.normalize(path.join(base, href.split('#')[0]));
}

function findDuplicateIds(html) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  const dups = new Set();
  ids.forEach((id) => { if (seen.has(id)) dups.add(id); seen.add(id); });
  return [...dups];
}

function countEmptyAlt(html) {
  return (html.match(/alt=""/g) || []).length;
}

const issues = [];
const report = [];
const heroes = new Set();

for (const slug of MKT_SLUGS) {
  const file = path.join(servicesDir, `${slug}.html`);
  const pageIssues = [];

  if (!fs.existsSync(file)) {
    pageIssues.push('MISSING FILE');
    issues.push({ slug, pageIssues });
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const imgs = (html.match(/<img /g) || []).length;
  const heroMatch = html.match(/mkt-hero--([\w-]+)/);
  const hero = heroMatch ? heroMatch[1] : 'unknown';
  heroes.add(hero);

  if (imgs < MIN_IMAGES) pageIssues.push(`Only ${imgs} images (min ${MIN_IMAGES})`);
  if (!html.includes('id="mkt-h1"')) pageIssues.push('Missing h1#mkt-h1');
  if (!html.includes('aria-labelledby="mkt-h1"')) pageIssues.push('Hero missing aria-labelledby');
  if (countEmptyAlt(html) > 0) pageIssues.push(`${countEmptyAlt(html)} empty alt attributes`);

  for (const key of REQUIRED_META) {
    if (!html.includes(key)) pageIssues.push(`Missing ${key}`);
  }
  for (const key of REQUIRED_SHELL) {
    if (!html.includes(key)) pageIssues.push(`Missing ${key}`);
  }

  const dups = findDuplicateIds(html);
  if (dups.length) pageIssues.push(`Duplicate IDs: ${dups.join(', ')}`);

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const resolved = resolveHref(file, href);
    if (resolved && !fs.existsSync(resolved)) {
      pageIssues.push(`Broken link: ${href}`);
    }
  }

  if (!html.includes('@type":"Service')) pageIssues.push('Missing Service schema');
  if (!html.includes('FAQPage') && !html.includes('@type":"FAQPage')) {
    // FAQ optional if no faqs in content - check faq section
    if (html.includes('id="mkt-faq"')) {
      if (!html.includes('FAQPage')) pageIssues.push('FAQ section without FAQPage schema');
    }
  }

  const profile = PROFILES[slug];
  if (profile?.extraCss && !html.includes(profile.extraCss)) {
    pageIssues.push(`Missing extraCss: ${profile.extraCss}`);
  }

  report.push({ slug, imgs, hero, issues: pageIssues.length, ok: pageIssues.length === 0 });
  if (pageIssues.length) issues.push({ slug, pageIssues });
}

const duplicateHeroes = heroes.size !== MKT_SLUGS.length;

console.log('═══════════════════════════════════════');
console.log('  MARKETING PAGES QA AUDIT');
console.log('═══════════════════════════════════════\n');
console.log(`Pages audited: ${MKT_SLUGS.length}`);
console.log(`Unique heroes: ${heroes.size}/16 ${duplicateHeroes ? '⚠ DUPLICATE' : '✓'}`);
console.log(`Pages with issues: ${issues.length}\n`);

report.forEach((r) => {
  const mark = r.ok ? '✓' : '✗';
  console.log(`${mark} ${r.slug.padEnd(28)} imgs=${String(r.imgs).padStart(2)} hero=${r.hero}`);
});

if (issues.length) {
  console.log('\n--- ISSUES ---');
  issues.forEach(({ slug, pageIssues }) => {
    console.log(`\n${slug}:`);
    pageIssues.forEach((i) => console.log(`  • ${i}`));
  });
  process.exit(1);
}

console.log('\nRESULT: PASS — all marketing pages production-ready');
process.exit(0);
