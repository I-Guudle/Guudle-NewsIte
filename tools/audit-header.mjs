/**
 * Master header audit — structure, scripts, colors, single-source verification.
 * Run: node tools/audit-header.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);

const REQUIRED_SCRIPTS = [
  'mega-menu-webdev-data.js',
  'mega-menu-data.js',
  'mega-menu-render.js',
  'components.js',
  'main.js',
];

const NAV_FILES = [
  'assets/css/styles.css',
  'assets/css/mega-menu.css',
  'assets/css/nav-lock.css',
  'assets/js/components.js',
  'assets/js/main.js',
  'assets/js/tailwind-config.js',
];

const BANNED_IN_HEADER = [
  /#0[Bb]1[Ff]3[Aa]/,
  /#001[Ff]3[Ff]/,
  /#001[Ff]54/,
  /#002147/,
  /#003366/,
  /#0[Aa]2540/,
  /#123[Dd]6[Aa]/,
  /#091729/,
  /#1[Ee]3[Aa]8[Aa]/,
  /#1[Dd]4[Ee][Dd]8/,
  /#2563[Ee][Bb]/,
  /#1[Ee]40[Aa][Ff]/,
  /rgba\(\s*11\s*,\s*31\s*,\s*58/,
  /rgba\(\s*37\s*,\s*99\s*,\s*235/,
];

const NAV_HINT = /#site-header|\.nav-|\.mega-|\.mobile-menu|\.mobile-nav|\.corp-subnav/;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function auditPages() {
  const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];
  const issues = [];
  for (const file of files) {
    const c = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    if (!c.includes('header-placeholder')) issues.push({ rel, type: 'missing-header-placeholder' });
    if (c.match(/id=["']site-header["']/)) issues.push({ rel, type: 'inline-site-header' });
    for (const s of REQUIRED_SCRIPTS) {
      if (!c.includes(s)) issues.push({ rel, type: 'missing-script', script: s });
    }
    const depth = rel.split(/[/\\]/).length - 1;
    if (depth > 0 && /src=["']assets\//.test(c)) issues.push({ rel, type: 'bad-asset-path' });
    if (c.includes('header-placeholder') && !c.includes('tailwind-config.js') && c.includes('cdn.tailwindcss.com')) {
      issues.push({ rel, type: 'missing-tailwind-config' });
    }
  }
  return { count: files.length, issues };
}

function auditHeaderColors() {
  const hits = [];
  for (const rel of NAV_FILES) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, 'utf8');
    for (const re of BANNED_IN_HEADER) {
      let m;
      const r = new RegExp(re.source, re.flags + 'g');
      while ((m = r.exec(content)) !== null) {
        const before = content.slice(0, m.index);
        const blockStart = Math.max(0, before.lastIndexOf('\n}'));
        const block = content.slice(blockStart, m.index + 60);
        if (!NAV_HINT.test(block)) continue;
        if (before.lastIndexOf(':root') > before.lastIndexOf('\n}') && !NAV_HINT.test(before.slice(before.lastIndexOf(':root')))) continue;
        hits.push({ file: rel, line: before.split('\n').length, match: m[0] });
      }
    }
  }
  return hits;
}

function auditPageNavOverrides() {
  const banned = ['service-pages.css', 'svc-landing.css', 'about.css', 'home.css', 'home-navy.css', 'mkt-unique.css'];
  const hits = [];
  for (const rel of banned) {
    const full = path.join(root, 'assets/css', rel);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, 'utf8');
    if (/#site-header|\.site-nav--/.test(content)) {
      hits.push({ file: `assets/css/${rel}`, issue: 'page CSS must not override #site-header (use nav-lock.css only)' });
    }
  }
  return hits;
}

function auditSingleSource() {
  const components = fs.readFileSync(path.join(root, 'assets/js/components.js'), 'utf8');
  const checks = {
    renderHeader: components.includes('function renderHeader()'),
    renderMobileMenu: components.includes('function renderMobileMenu('),
    usesHomeNavStyle: components.includes('function usesHomeNavStyle()'),
    injectComponents: components.includes('function injectComponents()'),
    navLockCss: components.includes('nav-lock.css'),
    splitNav: components.includes('site-nav--split') && components.includes('nav-menu-bar') && components.includes('nav-header-divider'),
    enterpriseNav: components.includes('site-nav--enterprise') && components.includes('nav-top-contact') && components.includes('nav-cta-btn--appointment'),
    navLightTop: components.includes('nav-light-top'),
    maxW1400: components.includes('max-w-[1400px]'),
  };
  return checks;
}

const pages = auditPages();
const colors = auditHeaderColors();
const source = auditSingleSource();
const navOverrides = auditPageNavOverrides();

console.log('═══════════════════════════════════════');
console.log('  GUUDLE HEADER AUDIT REPORT');
console.log('═══════════════════════════════════════\n');

console.log(`Pages audited: ${pages.count}`);
console.log(`Structural issues: ${pages.issues.length}`);
if (pages.issues.length) {
  for (const i of pages.issues) console.log(`  [${i.type}] ${i.rel}${i.script ? ` (${i.script})` : ''}`);
}

console.log(`\nHeader color violations: ${colors.length}`);
if (colors.length) {
  for (const h of colors) console.log(`  ${h.file}:${h.line} ${h.match}`);
}

console.log(`\nPage CSS nav overrides: ${navOverrides.length}`);
if (navOverrides.length) {
  for (const h of navOverrides) console.log(`  ${h.file}: ${h.issue}`);
}

console.log('\nSingle source (components.js):');
for (const [k, v] of Object.entries(source)) {
  console.log(`  ${k}: ${v ? 'OK' : 'MISSING'}`);
}

console.log('\nFront Page header spec (reference):');
console.log('  Layout: enterprise two-tier (DOCTORY-style) | Container: max-w-[1400px]');
console.log('  Height: 64px mobile / 118px desktop (xl+) | Class: site-nav--split site-nav--enterprise');
console.log('  Top bar: brand + support/phone + social | Nav bar: mega menu + search + CTA');
console.log('  Desktop nav: xl+ (1280px) | Mobile: search + fullscreen drawer');
console.log('  CTA: cyan appointment button (#10A5F5) | Accent: --nav-accent (#10A5F5)');

const pass = pages.issues.length === 0 && colors.length === 0 && navOverrides.length === 0 && Object.values(source).every(Boolean);
console.log(`\n${pass ? 'RESULT: PASS — unified header system verified' : 'RESULT: FAIL — see issues above'}`);
process.exit(pass ? 0 : 1);
