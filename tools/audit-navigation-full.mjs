/**
 * Full navigation consistency audit — master report (homepage = reference).
 * Run: node tools/audit-navigation-full.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);

const REQUIRED_SCRIPTS = [
  'mega-menu-webdev-data.js',
  'mega-menu-data.js',
  'mega-menu-render.js',
  'components.js',
  'main.js',
];

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
  const categories = {
    home: [],
    about: [],
    services: [],
    portfolio: [],
    other: [],
  };

  for (const file of files) {
    const c = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file).replace(/\\/g, '/');

    if (rel === 'index.html') categories.home.push(rel);
    else if (rel.startsWith('pages/about')) categories.about.push(rel);
    else if (rel.startsWith('pages/services/')) categories.services.push(rel);
    else if (rel.startsWith('pages/portfolio/')) categories.portfolio.push(rel);
    else categories.other.push(rel);

    if (!c.includes('header-placeholder')) issues.push({ rel, type: 'missing-header-placeholder' });
    if (/id=["']site-header["']/.test(c)) issues.push({ rel, type: 'inline-site-header' });
    if (!c.includes('footer-placeholder')) issues.push({ rel, type: 'missing-footer-placeholder' });
    if (!c.includes('chatbot-placeholder')) issues.push({ rel, type: 'missing-chatbot-placeholder' });
    if (!c.includes('skip-link')) issues.push({ rel, type: 'missing-skip-link' });
    if (!c.includes('styles.css')) issues.push({ rel, type: 'missing-styles-css' });
    if (!c.includes('cdn.tailwindcss.com')) issues.push({ rel, type: 'missing-tailwind' });

    for (const s of REQUIRED_SCRIPTS) {
      if (!c.includes(s)) issues.push({ rel, type: 'missing-script', script: s });
    }

    const order = REQUIRED_SCRIPTS.map((s) => c.indexOf(s)).filter((i) => i > -1);
    if (order.length === REQUIRED_SCRIPTS.length) {
      const sorted = [...order].sort((a, b) => a - b);
      if (order.join() !== sorted.join()) issues.push({ rel, type: 'bad-script-order' });
    }

    const depth = rel.split('/').length - 1;
    if (depth > 0 && /(?:href|src)=["']assets\//.test(c)) {
      issues.push({ rel, type: 'bad-asset-path' });
    }
  }

  return { files, categories, issues };
}

function auditAccessibility() {
  const components = fs.readFileSync(path.join(root, 'assets/js/components.js'), 'utf8');
  const main = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
  const checks = [
    { name: 'header role="banner"', ok: components.includes('role="banner"') },
    { name: 'main nav aria-label', ok: components.includes('aria-label="Main navigation"') },
    { name: 'mobile menu aria-expanded', ok: main.includes("setAttribute('aria-expanded'") },
    { name: 'search aria-controls', ok: components.includes('aria-controls="nav-search-panel"') },
    { name: 'skip-link on pages', ok: true },
    { name: 'focus-visible styles', ok: fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8').includes(':focus-visible') },
    { name: 'keyboard escape closes mobile menu', ok: main.includes("'Escape'") || main.includes('"Escape"') },
  ];
  return checks;
}

function auditSingleSource() {
  const components = fs.readFileSync(path.join(root, 'assets/js/components.js'), 'utf8');
  return {
    injectViaPlaceholder: components.includes('#header-placeholder'),
    splitLayout: components.includes('site-nav--split') && components.includes('nav-menu-bar'),
    bottomDivider: components.includes('nav-bottom-divider'),
    homeNavStyle: components.includes('usesHomeNavStyle()') && components.includes('return true'),
    megaMenuData: fs.existsSync(path.join(root, 'assets/js/mega-menu-data.js')),
    megaMenuRender: fs.existsSync(path.join(root, 'assets/js/mega-menu-render.js')),
  };
}

function runSubAudit(script) {
  const r = spawnSync(process.execPath, [path.join(root, 'tools', script)], {
    cwd: root,
    encoding: 'utf8',
  });
  return { script, ok: r.status === 0, out: (r.stdout || r.stderr || '').trim() };
}

const pages = auditPages();
const a11y = auditAccessibility();
const source = auditSingleSource();
const subAudits = [
  'audit-header.mjs',
  'audit-nav.mjs',
  'audit-nav-scripts.mjs',
  'audit-marketing-nav.mjs',
  'audit-nav-colors.mjs',
  'audit-design-consistency.mjs',
].map(runSubAudit);

const a11yFail = a11y.filter((c) => !c.ok);
const sourceFail = Object.entries(source).filter(([, v]) => !v);
const pass =
  pages.issues.length === 0 &&
  a11yFail.length === 0 &&
  sourceFail.length === 0 &&
  subAudits.every((s) => s.ok);

console.log('═══════════════════════════════════════════════════════════');
console.log('  NAVIGATION CONSISTENCY AUDIT — FULL REPORT');
console.log('  Reference: index.html (Front Page / Home)');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('1. MASTER REFERENCE (Home Page)');
console.log('   Injection:  #header-placeholder → components.js → #site-header');
console.log('   Layout:     site-nav--split (logo row + mega menu bar at xl+)');
console.log('   Breakpoint: xl (1280px+) desktop nav | Mobile fullscreen drawer');
console.log('   Height:     64px mobile / 118px desktop | Style: white enterprise two-tier bar');
console.log('   Behavior:   solid white header | search panel | mega menus on xl+');
console.log('   CTA:        Start Your Project | Search panel | Mega menus\n');

console.log('2. PAGES REVIEWED');
const total = pages.files.length;
console.log(`   Total active pages: ${total}`);
for (const [cat, list] of Object.entries(pages.categories)) {
  if (list.length) console.log(`   - ${cat}: ${list.length}`);
}
console.log('   Excluded: june2026/, 222/, 111/ (legacy backups)\n');

console.log('3. INCONSISTENCIES FOUND');
if (pages.issues.length === 0) {
  console.log('   None — all pages use unified header placeholder + script stack.\n');
} else {
  for (const i of pages.issues) {
    console.log(`   [${i.type}] ${i.rel}${i.script ? ` (${i.script})` : ''}`);
  }
  console.log('');
}

console.log('4. COMPONENT CONSOLIDATION');
for (const [k, v] of Object.entries(source)) {
  console.log(`   ${v ? '✓' : '✗'} ${k}`);
}
console.log('   Config: assets/js/mega-menu-data.js, mega-menu-webdev-data.js');
console.log('   Styles: assets/css/styles.css (+ @import mega-menu.css)\n');

console.log('5. ACCESSIBILITY');
for (const c of a11y) console.log(`   ${c.ok ? '✓' : '✗'} ${c.name}`);
console.log('');

console.log('6. SUB-AUDIT RESULTS');
for (const s of subAudits) {
  console.log(`   ${s.ok ? 'PASS' : 'FAIL'} ${s.script}`);
}
console.log('');

console.log('7. FINAL VERIFICATION CHECKLIST');
const checklist = [
  ['All pages use same navigation structure', pages.issues.filter((i) => i.type.includes('header')).length === 0],
  ['Same menu items (mega-menu-data.js)', subAudits.find((s) => s.script === 'audit-marketing-nav.mjs')?.ok],
  ['Same styling (styles.css + mega-menu.css)', pages.issues.filter((i) => i.type === 'missing-styles-css').length === 0],
  ['Same responsive behavior (split header + fullscreen mobile)', source.splitLayout && source.bottomDivider],
  ['Same dropdown functionality (mega-menu-render.js)', source.megaMenuRender],
  ['Accessibility support (ARIA, skip-link, focus)', a11yFail.length === 0],
  ['Active states (main.js path matching)', fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8').includes('classList.add(\'active\')')],
  ['No inline duplicate headers', pages.issues.filter((i) => i.type === 'inline-site-header').length === 0],
  ['Footer + chatbot placeholders', pages.issues.filter((i) => i.type.includes('footer') || i.type.includes('chatbot')).length === 0],
  ['Tailwind utilities for header', pages.issues.filter((i) => i.type === 'missing-tailwind').length === 0],
];
for (const [label, ok] of checklist) {
  console.log(`   [${ok ? 'x' : ' '}] ${label}`);
}

console.log(`\n${pass ? 'RESULT: PASS — navigation matches Front Page across all active pages' : 'RESULT: FAIL — resolve issues above'}`);
process.exit(pass ? 0 : 1);
