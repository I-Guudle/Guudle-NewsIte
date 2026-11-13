#!/usr/bin/env node
/**
 * Audit HTML/CSS for inconsistent dark or saturated section backgrounds.
 * Excludes intentional footer, hero image overlays, and button accents.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const HTML_DIRS = [ROOT, join(ROOT, 'pages')];
const CSS_DIR = join(ROOT, 'assets', 'css');

const BANNED_HTML = [
  /bg-gradient-to-br\s+from-navy-900/i,
  /bg-gradient-to-br\s+from-teal-900/i,
  /bg-navy-900\b/i,
  /from-navy-900\s+via-navy-800/i,
  /background:\s*#002080/i,
  /background:\s*#0F172A/i,
  /background-color:\s*#002080/i,
  /background-color:\s*#0F172A/i,
];

const BANNED_CSS = [
  /--svc-hero-bg:\s*linear-gradient[^;]*#001F/i,
  /background:\s*linear-gradient[^;]*#002080/i,
  /background:\s*linear-gradient[^;]*#0F172A/i,
  /background:\s*var\(--svc-navy\)/i,
  /\.svc-benefits\s*\{[^}]*background:\s*var\(--svc-navy\)/s,
];

const ALLOWLIST = [
  'site-footer',
  'chatbot',
  'nav-mobile',
  'mobile-drawer',
  'svc-btn-primary',
  'hero-cta-primary',
  'corp-btn--primary',
  'ai-feature-icon',
  'svc-process-step__num',
  'ai-btn-primary',
  'mkt-back-top',
];

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', 'june2026', '222', '111', '.git'].includes(name)) continue;
      walkHtml(p, out);
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function isAllowlisted(line) {
  return ALLOWLIST.some((a) => line.includes(a));
}

const issues = [];

for (const dir of HTML_DIRS) {
  for (const file of walkHtml(dir)) {
    const rel = relative(ROOT, file);
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (isAllowlisted(line)) return;
      for (const re of BANNED_HTML) {
        if (re.test(line)) {
          issues.push({ file: rel, line: i + 1, match: line.trim().slice(0, 120) });
          break;
        }
      }
    });
  }
}

const activeCss = [
  'site-unified.css',
  'svc-landing.css',
  'service-landing-shared.css',
  'home-navy.css',
  'home.css',
  'mkt-unique.css',
  'styles.css',
];

for (const css of activeCss) {
  const file = join(CSS_DIR, css);
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (isAllowlisted(line)) return;
    if (/site-footer|\.nav-mobile|footer/i.test(line) && /background/i.test(line)) return;
    for (const re of BANNED_CSS) {
      if (re.test(line)) {
        issues.push({ file: `assets/css/${css}`, line: i + 1, match: line.trim().slice(0, 120) });
        break;
      }
    }
  });
}

if (issues.length === 0) {
  console.log('✅ audit-backgrounds: PASS — no banned section backgrounds found');
  process.exit(0);
}

console.error(`❌ audit-backgrounds: FAIL — ${issues.length} issue(s)`);
for (const x of issues.slice(0, 40)) {
  console.error(`  ${x.file}:${x.line}  ${x.match}`);
}
if (issues.length > 40) console.error(`  … and ${issues.length - 40} more`);
process.exit(1);
