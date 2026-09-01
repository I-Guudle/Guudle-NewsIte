/**
 * Service page structure QA audit.
 * Run: node tools/audit-service-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svcDir = path.join(root, 'pages', 'services');
const REQUIRED = [
  'header-placeholder',
  'footer-placeholder',
  'tailwind-config.js',
  'site-unified.css',
  'components.js',
  'application/ld+json',
  'og:title',
  'canonical',
  'data-svc-parallax-section',
  '../../sliders/',
  'svc-overview',
  'svc-whyChoose',
  'svc-features',
  'svc-faq',
  'svc-testimonials',
  'svc-contact',
  'skip-link',
];

const files = fs.readdirSync(svcDir).filter((f) => f.endsWith('.html'));
const issues = [];

for (const file of files) {
  const rel = `pages/services/${file}`;
  const c = fs.readFileSync(path.join(svcDir, file), 'utf8');
  const isMkt = c.includes('data-mkt-page');
  const checks = isMkt
    ? ['header-placeholder', 'footer-placeholder', 'tailwind-config.js', 'site-unified.css', 'components.js', 'application/ld+json', 'skip-link', 'mkt-hero', 'data-mkt-parallax-section', '../../sliders/']
    : REQUIRED;
  for (const req of checks) {
    if (!c.includes(req)) issues.push({ rel, missing: req });
  }
}

console.log('════════════════════════════════════════');
console.log('  SERVICE PAGE STRUCTURE AUDIT');
console.log('════════════════════════════════════════\n');
console.log(`Service pages: ${files.length}`);
console.log(`Issues: ${issues.length}\n`);
if (issues.length) {
  const grouped = {};
  for (const i of issues) {
    grouped[i.missing] = (grouped[i.missing] || 0) + 1;
  }
  for (const [k, v] of Object.entries(grouped)) console.log(`  ${k}: ${v} pages`);
}
console.log(`\n${issues.length ? 'RESULT: FAIL' : 'RESULT: PASS — all service pages meet enterprise structure'}`);
process.exit(issues.length ? 1 : 0);
