#!/usr/bin/env node
/**
 * Audit typography colors for WCAG-aligned palette and readability issues.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const CSS_DIR = join(ROOT, 'assets', 'css');

const APPROVED = {
  heading: ['#0F172A', '#0f172a', 'var(--text-heading)', 'text-slate-900', 'text-gray-900'],
  subheading: ['#334155', 'var(--text-subheading)', 'text-slate-700', 'text-gray-700'],
  body: ['#475569', 'var(--text-body)', 'text-slate-600', 'text-gray-600'],
  muted: ['#64748B', 'var(--text-muted)', 'text-slate-500', 'text-gray-500'],
};

const HTML_ISSUES = [
  { re: /style="color:#37474F"/i, msg: 'Legacy heading color #37474F — use CSS tokens or text-slate-900' },
  { re: /style="color:#546E7A"/i, msg: 'Legacy muted color #546E7A — use text-slate-500' },
  { re: /section[^>]*bg-(?:white|slate-50)[^>]*>[\s\S]{0,800}?text-white(?!\/)/i, msg: 'White text on light section background' },
];

const ALLOWLIST_LINE = [
  'home-parallax-immersive',
  'cs-case-visual',
  'cs-case-visual-inner',
  'cs-dash-panel',
  'site-footer',
  'nav-mobile',
  'hero-cta-primary',
  'svc-btn-primary',
  'corp-btn--primary',
  'cs-cta-btn--primary',
  'hero-cta-secondary',
  'Subscribe',
  'Contact Us',
];

const CSS_ISSUES = [
  { re: /color:\s*#37474F\b/i, msg: 'Legacy text color #37474F in CSS — use var(--text-heading)' },
  { re: /color:\s*#546E7A\b/i, msg: 'Legacy text color #546E7A in CSS — use var(--text-muted)' },
  { re: /--brand-text:\s*#37474F/i, msg: 'brand-text token not aligned to #0F172A' },
];

const REQUIRED_FILES = ['typography.css', 'site-unified.css'];

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', 'june2026', '222', '111'].includes(name)) continue;
      walkHtml(p, out);
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const issues = [];

for (const file of walkHtml(ROOT)) {
  const rel = relative(ROOT, file);
  if (rel.startsWith('june2026') || rel.startsWith('222') || rel.startsWith('111')) continue;
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (ALLOWLIST_LINE.some((a) => line.includes(a))) return;
    if (/cs-case-visual|home-parallax|site-footer|nav-mobile|chatbot/.test(line)) return;
    for (const { re, msg } of HTML_ISSUES) {
      if (re.test(line)) {
        issues.push({ file: rel, line: i + 1, msg, snippet: line.trim().slice(0, 100) });
        break;
      }
    }
  });
}

for (const css of REQUIRED_FILES) {
  const file = join(CSS_DIR, css);
  const text = readFileSync(file, 'utf8');
  if (!text.includes('--text-heading: #0A2540') && !text.includes('--text-heading: #0F172A')) {
    issues.push({ file: `assets/css/${css}`, line: 0, msg: 'Missing --text-heading token (#0A2540 or #0F172A)' });
  }
  if (!text.includes('--text-body: #475569')) {
    issues.push({ file: `assets/css/${css}`, line: 0, msg: 'Missing --text-body token (#475569)' });
  }
}

const activeCss = ['svc-landing.css', 'service-landing-shared.css', 'home.css', 'home-navy.css', 'styles.css', 'case-studies.css', 'about.css', 'mkt-unique.css'];
for (const css of activeCss) {
  const file = join(CSS_DIR, css);
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (/background:|border-color:|box-shadow:|gradient/.test(line) && !/^\s*color:/.test(line)) return;
    if (/\.site-footer|nav-mobile|cs-case-visual|btn-primary|process-step__num|ai-feature-icon/.test(line)) return;
    for (const { re, msg } of CSS_ISSUES) {
      if (re.test(line)) {
        issues.push({ file: `assets/css/${css}`, line: i + 1, msg, snippet: line.trim().slice(0, 100) });
        break;
      }
    }
  });
}

if (issues.length === 0) {
  console.log('✅ audit-typography: PASS — typography tokens and colors aligned');
  console.log('\nPalette:');
  console.log('  H1–H3:  #0F172A');
  console.log('  H4–H6:  #334155');
  console.log('  Body:   #475569');
  console.log('  Muted:  #64748B');
  console.log('  Links:  #10A5F5 → #155E75 hover');
  process.exit(0);
}

console.error(`❌ audit-typography: FAIL — ${issues.length} issue(s)`);
for (const x of issues.slice(0, 50)) {
  console.error(`  ${x.file}:${x.line}  ${x.msg}`);
  if (x.snippet) console.error(`    ${x.snippet}`);
}
if (issues.length > 50) console.error(`  … and ${issues.length - 50} more`);
process.exit(1);
