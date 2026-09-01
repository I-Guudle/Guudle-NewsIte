/**
 * Remove inline technology stack sections from service pages;
 * replace with shared Tech Hub CTA.
 * Run: node tools/migrate-tech-sections.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderTechHubCta } from './tech-hub-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVICES_DIR = path.join(ROOT, 'pages', 'services');

const TECH_SECTION_RE =
  /<section id="(?:svc|[a-z]+)-tech"[\s\S]*?<\/section>\s*/gi;
const MKT_TECH_SECTION_RE =
  /<section[^>]*\bid="mkt-tech"[\s\S]*?<\/section>\s*/gi;
const ORPHAN_CPOX_TECH_RE =
  /\s*class="cpox-section cpox-section--white">\s*<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">[\s\S]*?cpox-tech-grid[\s\S]*?<\/section>\s*/gi;
const TECH_SECTION_SVC_TECH_RE = /<section id="svc-tech"[\s\S]*?<\/section>\s*/gi;
const TECH_SECTION_CLASS_RE =
  /<section[^>]*\bclass="[^"]*\bsvc-tech\b[^"]*"[^>]*>[\s\S]*?<\/section>\s*/gi;

const STICKY_TECH_LINK_RE =
  /<a\s+href="#(?:svc|[a-z]+)-tech"[^>]*>[\s\S]*?<\/a>\s*/gi;

const TECH_HUB_CSS =
  '  <link rel="stylesheet" href="../../assets/css/tech-hub-cta.css">\n';

const SKIP_BASENAMES = new Set(['technology.html']);

function removeTechSections(html) {
  let out = html;
  out = out.replace(TECH_SECTION_RE, '');
  out = out.replace(MKT_TECH_SECTION_RE, '');
  out = out.replace(ORPHAN_CPOX_TECH_RE, '');
  out = out.replace(TECH_SECTION_SVC_TECH_RE, '');
  out = out.replace(TECH_SECTION_CLASS_RE, '');
  return out;
}

function removeStickyTechLinks(html) {
  return html.replace(STICKY_TECH_LINK_RE, '');
}

function hasTechHubCta(html) {
  return /\bclass="tech-hub-cta"|\bid="svc-tech-hub"/.test(html);
}

function ensureTechHubCss(html) {
  if (/tech-hub-cta\.css/.test(html)) return html;
  const corpoxRe =
    /(<link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/svc-corpox\.css">\s*\n?)/i;
  if (corpoxRe.test(html)) {
    return html.replace(corpoxRe, `$1${TECH_HUB_CSS}`);
  }
  return html.replace(/<\/head>/i, `${TECH_HUB_CSS}</head>`);
}

function findInsertIndex(html) {
  const faq = html.match(/<section[^>]*\bid="(?:svc-faq|[^"]*-faq)"[^>]*>/i);
  if (faq && faq.index != null) return faq.index;

  const contact = html.match(
    /<section[^>]*\bid="(?:svc-contact|[^"]*contact[^"]*)"[^>]*>/i,
  );
  if (contact && contact.index != null) return contact.index;

  const cta = html.match(/<section[^>]*\bid="(?:svc-cta|[^"]*-cta)"[^>]*>/i);
  if (cta && cta.index != null) return cta.index;

  return -1;
}

function insertTechHubCta(html) {
  if (hasTechHubCta(html)) return html;
  const block = `\n    ${renderTechHubCta({ linkPrefix: '../' })}\n`;
  const idx = findInsertIndex(html);
  if (idx === -1) {
    console.warn('  warn: no FAQ/contact/CTA anchor — skipped CTA insert');
    return html;
  }
  return html.slice(0, idx) + block + html.slice(idx);
}

function migrateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let html = original;

  html = removeTechSections(html);
  html = removeStickyTechLinks(html);
  html = ensureTechHubCss(html);
  html = insertTechHubCta(html);

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

const files = fs
  .readdirSync(SERVICES_DIR)
  .filter((name) => name.endsWith('.html') && !SKIP_BASENAMES.has(name))
  .map((name) => path.join(SERVICES_DIR, name))
  .sort();

let modified = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (rel.replace(/\\/g, '/') === 'pages/technology.html') continue;
  if (migrateFile(file)) {
    modified++;
    console.log('  updated:', rel);
  }
}

console.log(`\nTech section migration complete — ${modified} file(s) modified.`);

