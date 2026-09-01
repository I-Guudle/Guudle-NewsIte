#!/usr/bin/env node
/**
 * Production QA — images, links, HTML, JS, SEO basics
 * Run: node tools/qa-production.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['june2026', '222', '111', 'node_modules', '.git']);

const report = {
  pages: 0,
  brokenImages: [],
  brokenLinks: [],
  missingAlt: [],
  duplicateIds: [],
  missingTitle: [],
  missingDescription: [],
  jsErrors: [],
  placeholderImages: [],
  externalImages: [],
};

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(full, out);
    else if (ent.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveLocal(fromFile, href) {
  const clean = href.split('?')[0].split('#')[0];
  if (!clean || clean.startsWith('data:')) return null;
  const fromDir = path.dirname(fromFile);
  return path.normalize(path.join(fromDir, clean));
}

function collectPages() {
  const pages = walkHtml(path.join(ROOT, 'pages'));
  const index = path.join(ROOT, 'index.html');
  if (fs.existsSync(index)) pages.unshift(index);
  const portfolio = path.join(ROOT, 'portfolio.html');
  if (fs.existsSync(portfolio)) pages.push(portfolio);
  return pages;
}

function auditPage(file) {
  const rel = path.relative(ROOT, file);
  const html = fs.readFileSync(file, 'utf8');

  if (!/<title[^>]*>[\s\S]*?<\/title>/i.test(html) || /<title>\s*<\/title>/i.test(html)) {
    report.missingTitle.push(rel);
  }
  if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html)) {
    report.missingDescription.push(rel);
  }

  const idCounts = {};
  for (const m of html.matchAll(/\bid=["']([^"']+)["']/gi)) {
    idCounts[m[1]] = (idCounts[m[1]] || 0) + 1;
  }
  for (const [id, count] of Object.entries(idCounts)) {
    if (count > 1) report.duplicateIds.push({ page: rel, id, count });
  }

  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const srcM = tag.match(/\bsrc=["']([^"']+)["']/i);
    if (!srcM) continue;
    const src = srcM[1];
    if (/placeholder|via\.placeholder|placehold\.it|dummyimage|picsum\.photos\/seed\/placeholder/i.test(src)) {
      report.placeholderImages.push({ page: rel, src });
    }
    if (/^https?:\/\//i.test(src)) {
      report.externalImages.push({ page: rel, src });
      continue;
    }
    const altM = tag.match(/\balt=["']([^"']*)["']/i);
    const alt = altM ? altM[1] : null;
    if (alt === null || alt.trim() === '') {
      report.missingAlt.push({ page: rel, src });
    }
    const resolved = resolveLocal(file, src);
    if (resolved && !fs.existsSync(resolved)) {
      report.brokenImages.push({ page: rel, src, resolved: path.relative(ROOT, resolved) });
    }
  }

  for (const m of html.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
    const u = m[1].trim();
    if (/^https?:\/\//i.test(u) || u.startsWith('data:')) continue;
    const resolved = resolveLocal(file, u);
    if (resolved && !fs.existsSync(resolved) && /\.(jpg|jpeg|png|webp|gif|svg|avif)/i.test(u)) {
      report.brokenImages.push({ page: rel, src: u, resolved: path.relative(ROOT, resolved), css: true });
    }
  }

  const hrefRe = /(?:href|src)=["']([^"'#?][^"']*)["']/gi;
  let hm;
  while ((hm = hrefRe.exec(html)) !== null) {
    const href = hm[1].trim();
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    if (href.includes('${')) continue;
    const resolved = resolveLocal(file, href);
    if (resolved && !fs.existsSync(resolved)) {
      report.brokenLinks.push({ page: rel, href, resolved: path.relative(ROOT, resolved) });
    }
  }
}

function auditJs() {
  const jsDir = path.join(ROOT, 'assets', 'js');
  for (const f of fs.readdirSync(jsDir).filter((x) => x.endsWith('.js'))) {
    const full = path.join(jsDir, f);
    const r = spawnSync(process.execPath, ['--check', full], { encoding: 'utf8' });
    if (r.status !== 0) {
      report.jsErrors.push({ file: `assets/js/${f}`, err: (r.stderr || r.stdout || '').trim() });
    }
  }
}

const pages = collectPages();
report.pages = pages.length;
for (const p of pages) auditPage(p);
auditJs();

console.log('═══════════════════════════════════════════════════');
console.log('  GUUDLE PRODUCTION QA REPORT');
console.log('═══════════════════════════════════════════════════\n');
console.log(`Pages scanned: ${report.pages}`);
console.log(`Broken images: ${report.brokenImages.length}`);
console.log(`Broken internal links: ${report.brokenLinks.length}`);
console.log(`Images missing alt: ${report.missingAlt.length}`);
console.log(`Placeholder images: ${report.placeholderImages.length}`);
console.log(`External image URLs: ${report.externalImages.length}`);
console.log(`Duplicate IDs: ${report.duplicateIds.length}`);
console.log(`Missing title: ${report.missingTitle.length}`);
console.log(`Missing meta description: ${report.missingDescription.length}`);
console.log(`JS syntax errors: ${report.jsErrors.length}\n`);

const show = (label, arr, fmt) => {
  if (!arr.length) return;
  console.log(`── ${label} (${arr.length}) ──`);
  arr.slice(0, 40).forEach((x) => console.log(' ', fmt(x)));
  if (arr.length > 40) console.log(`  ... and ${arr.length - 40} more`);
  console.log('');
};

show('Broken images', report.brokenImages, (x) => `${x.page}: ${x.src} → ${x.resolved}`);
show('Broken links', report.brokenLinks, (x) => `${x.page}: ${x.href}`);
show('Missing alt', report.missingAlt, (x) => `${x.page}: ${x.src}`);
show('Placeholder images', report.placeholderImages, (x) => `${x.page}: ${x.src}`);
show('Duplicate IDs', report.duplicateIds, (x) => `${x.page}: #${x.id} (${x.count}x)`);
show('Missing title', report.missingTitle, (x) => x);
show('Missing description', report.missingDescription, (x) => x);
show('JS errors', report.jsErrors, (x) => `${x.file}: ${x.err.split('\n')[0]}`);

const critical =
  report.brokenImages.length +
  report.brokenLinks.length +
  report.jsErrors.length +
  report.placeholderImages.length;

const warn = report.missingAlt.length + report.duplicateIds.length + report.missingDescription.length;

if (critical === 0) {
  console.log('RESULT: PASS — no critical asset/link/JS failures');
  if (warn) console.log(`WARNINGS: ${warn} non-blocking issues (alt text, SEO, duplicate IDs)`);
  process.exit(warn > 500 ? 1 : 0);
}

console.error(`RESULT: FAIL — ${critical} critical issue(s)`);
process.exit(1);
