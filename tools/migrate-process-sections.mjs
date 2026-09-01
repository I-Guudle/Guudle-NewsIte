/**
 * Remove inline development process sections from service pages;
 * replace with shared Process Hub CTA.
 * Run: node tools/migrate-process-sections.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderProcessHubCta } from './process-hub-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVICES_DIR = path.join(ROOT, 'pages', 'services');
const PAGES_DIR = path.join(ROOT, 'pages');

const KEEP_DEVPROC_IDS = new Set(['tech-roadmap', 'oproc-lifecycle']);

const STICKY_PROCESS_LINK_RE =
  /<a\s+href="#[^"]*(?:process|migration|pre-process)[^"]*"[^>]*class="[^"]*slp-sticky-nav__link[^"]*"[^>]*>[\s\S]*?<\/a>\s*/gi;

const PRE_PROCESS_SECTION_RE =
  /<section id="pre-process"[\s\S]*?<\/section>\s*/gi;

const PROCESS_HUB_CSS =
  '  <link rel="stylesheet" href="../../assets/css/process-hub-cta.css">\n';

const SKIP_FILES = new Set([
  path.join(PAGES_DIR, 'our-process.html'),
  path.join(PAGES_DIR, 'technology.html'),
]);

function removeDevprocSections(html) {
  return html.replace(
    /<section id="([^"]*)"[^>]*class="[^"]*devproc-section[^"]*"[^>]*>[\s\S]*?<\/section>\s*/gi,
    (match, id) => (KEEP_DEVPROC_IDS.has(id) ? match : ''),
  );
}

function removeStickyProcessLinks(html) {
  return html.replace(STICKY_PROCESS_LINK_RE, '');
}

function removePreProcessSections(html) {
  return html.replace(PRE_PROCESS_SECTION_RE, '');
}

function hasProcessHubCta(html) {
  return /\bclass="process-hub-cta"|\bid="svc-process-hub"/.test(html);
}

function ensureProcessHubCss(html) {
  if (/process-hub-cta\.css/.test(html)) return html;
  const corpoxRe =
    /(<link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/svc-corpox\.css">\s*\n?)/i;
  if (corpoxRe.test(html)) {
    return html.replace(corpoxRe, `$1${PROCESS_HUB_CSS}`);
  }
  const devprocRe =
    /(<link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/dev-process\.css">\s*\n?)/i;
  if (devprocRe.test(html)) {
    return html.replace(devprocRe, `$1${PROCESS_HUB_CSS}`);
  }
  return html.replace(/<\/head>/i, `${PROCESS_HUB_CSS}</head>`);
}

function findInsertIndex(html) {
  const faq = html.match(/<section[^>]*\bid="(?:svc-faq|[^"]*-faq|mkt-faq|ent-faq|oproc-faq)"[^>]*>/i);
  if (faq?.index != null) return faq.index;

  const techHub = html.match(/\bid="svc-tech-hub"/);
  if (techHub?.index != null) return techHub.index;

  const contact = html.match(/<section[^>]*\bid="(?:svc-contact|[^"]*contact[^"]*)"[^>]*>/i);
  if (contact?.index != null) return contact.index;

  const cta = html.match(/<section[^>]*\bid="(?:svc-cta|[^"]*-cta)"[^>]*>/i);
  if (cta?.index != null) return cta.index;

  return -1;
}

function insertProcessHubCta(html) {
  if (hasProcessHubCta(html)) return html;
  const block = `\n    ${renderProcessHubCta({ linkPrefix: '../' })}\n`;
  const idx = findInsertIndex(html);
  if (idx === -1) {
    console.warn('  warn: no FAQ/tech-hub/contact anchor — skipped CTA insert');
    return html;
  }
  return html.slice(0, idx) + block + html.slice(idx);
}

function migrateFile(filePath) {
  if (SKIP_FILES.has(filePath)) return false;
  const original = fs.readFileSync(filePath, 'utf8');
  let html = original;

  html = removeDevprocSections(html);
  html = removePreProcessSections(html);
  html = removeStickyProcessLinks(html);
  html = ensureProcessHubCss(html);
  html = insertProcessHubCta(html);

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

const files = [
  ...fs.readdirSync(SERVICES_DIR).filter((n) => n.endsWith('.html')).map((n) => path.join(SERVICES_DIR, n)),
].sort();

let modified = 0;
for (const file of files) {
  if (migrateFile(file)) {
    modified++;
    console.log('  updated:', path.relative(ROOT, file));
  }
}

console.log(`\nProcess section migration complete — ${modified} file(s) modified.`);
