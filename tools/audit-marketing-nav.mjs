/**
 * Marketing menu link audit — mega-menu-data vs filesystem + page shell
 * Run: node tools/audit-marketing-nav.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MKT_SLUGS } from './mkt-unique-profiles.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'pages', 'services');

const EXPECTED = [
  { label: 'Promotion', href: 'pages/services/promotion.html', slug: 'promotion' },
  { label: 'SEO', href: 'pages/services/seo.html', slug: 'seo' },
  { label: 'Social Media', href: 'pages/services/social-media-marketing.html', slug: 'social-media-marketing' },
  { label: 'Influencer Marketing', href: 'pages/services/influencer-marketing.html', slug: 'influencer-marketing' },
  { label: 'Performance Marketing', href: 'pages/services/performance-marketing.html', slug: 'performance-marketing' },
  { label: 'Google Ads Management', href: 'pages/services/google-ads-management.html', slug: 'google-ads-management' },
  { label: 'Meta Ads Management', href: 'pages/services/meta-ads-management.html', slug: 'meta-ads-management' },
  { label: 'Search Engine Ads', href: 'pages/services/search-engine-ads.html', slug: 'search-engine-ads' },
  { label: 'Bundle Marketing', href: 'pages/services/bundle-marketing.html', slug: 'bundle-marketing' },
  { label: 'E-mail Marketing', href: 'pages/services/email-marketing.html', slug: 'email-marketing' },
  { label: 'WhatsApp Marketing', href: 'pages/services/whatsapp-marketing.html', slug: 'whatsapp-marketing' },
  { label: 'SMS Marketing', href: 'pages/services/sms-marketing.html', slug: 'sms-marketing' },
  { label: 'Marketplace', href: 'pages/services/marketplace.html', slug: 'marketplace' },
  { label: 'E-commerce Management', href: 'pages/services/ecommerce-management.html', slug: 'ecommerce-management' },
  { label: 'Product Listing', href: 'pages/services/product-listing.html', slug: 'product-listing' },
  { label: 'Marketplace SEO', href: 'pages/services/marketplace-seo.html', slug: 'marketplace-seo' },
];

const NAV_SCRIPTS = [
  'mega-menu-webdev-data.js',
  'mega-menu-data.js',
  'mega-menu-render.js',
  'components.js',
  'main.js',
];

function readMegaMenuLinks() {
  const src = fs.readFileSync(path.join(root, 'assets/js/mega-menu-data.js'), 'utf8');
  const block = src.match(/id:\s*'marketing'[\s\S]*?links:\s*\[([\s\S]*?)\]\s*,\s*\}/);
  if (!block) return [];
  const links = [];
  const re = /name:\s*'([^']+)'[^}]*href:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(block[1])) !== null) links.push({ name: m[1], href: m[2] });
  return links;
}

const issues = [];
const menuLinks = readMegaMenuLinks();

console.log('═══════════════════════════════════════');
console.log('  MARKETING NAVIGATION AUDIT');
console.log('═══════════════════════════════════════\n');

if (menuLinks.length !== 16) {
  issues.push(`mega-menu-data.js: expected 16 marketing links, found ${menuLinks.length}`);
}

for (let i = 0; i < EXPECTED.length; i++) {
  const exp = EXPECTED[i];
  const menu = menuLinks[i];
  const file = path.join(servicesDir, `${exp.slug}.html`);

  if (!fs.existsSync(file)) issues.push(`Missing page: ${exp.slug}.html`);
  if (!menu) issues.push(`Missing menu entry: ${exp.label}`);
  else {
    if (menu.name !== exp.label && !(exp.label === 'E-mail Marketing' && menu.name === 'E-mail Marketing')) {
      if (menu.name !== exp.label) issues.push(`Label mismatch [${i}]: menu="${menu.name}" expected="${exp.label}"`);
    }
    if (menu.href !== exp.href) issues.push(`Href mismatch ${exp.label}: menu="${menu.href}" expected="${exp.href}"`);
  }

  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('header-placeholder')) issues.push(`${exp.slug}: missing header-placeholder`);
    if (!html.includes('cdn.tailwindcss.com')) issues.push(`${exp.slug}: missing Tailwind (header requires it)`);
    if (!html.includes('nav-light-top') && !html.includes('components.js')) {
      /* header injected at runtime */
    }
    for (const s of NAV_SCRIPTS) {
      if (!html.includes(s)) issues.push(`${exp.slug}: missing script ${s}`);
    }
    const idx = NAV_SCRIPTS.map((s) => html.indexOf(s));
    if (idx.every((n) => n > -1) && idx.join() !== [...idx].sort((a, b) => a - b).join()) {
      issues.push(`${exp.slug}: incorrect nav script order`);
    }
    const resolved = path.join(root, menu?.href || exp.href);
    if (!fs.existsSync(resolved)) issues.push(`${exp.label}: target file not found at ${exp.href}`);
  }
}

if (MKT_SLUGS.length !== 16) issues.push(`PROFILES: expected 16 slugs, got ${MKT_SLUGS.length}`);

for (const exp of EXPECTED) {
  if (!MKT_SLUGS.includes(exp.slug)) issues.push(`PROFILES missing slug: ${exp.slug}`);
}

if (issues.length) {
  console.log('ISSUES FOUND:\n');
  issues.forEach((i) => console.log(`  • ${i}`));
  process.exit(1);
}

console.log('Menu links (mega-menu-data.js):');
menuLinks.forEach((l, i) => console.log(`  ✓ ${String(i + 1).padStart(2)}. ${l.name} → ${l.href}`));

console.log('\nPage shell checks (16/16):');
console.log('  ✓ header-placeholder + Tailwind + nav scripts');
console.log('  ✓ All target HTML files exist');
console.log('  ✓ PROFILES slugs aligned\n');
console.log('RESULT: PASS — marketing navigation verified');
