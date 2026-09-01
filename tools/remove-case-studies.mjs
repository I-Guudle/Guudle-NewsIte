/**
 * Remove Case Studies / Success Stories sections and nav links from all HTML pages.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['node_modules', 'tools']);

const SECTION_IDS = ['svc-cases', 'mkt-cases', 'pre-cases'];
const SECTION_ID_PATTERN = /-cases$/i;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function removeSectionById(html, id) {
  const re = new RegExp(`<section[^>]*\\bid="${id}"[^>]*>`, 'i');
  const match = html.match(re);
  if (!match) return html;

  const start = html.indexOf(match[0]);
  let depth = 0;
  let i = start;
  while (i < html.length) {
    if (html.slice(i).match(/^<section[\s>]/i)) depth++;
    if (html.slice(i).match(/^<\/section>/i)) {
      depth--;
      if (depth === 0) {
        return html.slice(0, start) + html.slice(i + '</section>'.length);
      }
    }
    i++;
  }
  return html;
}

function removePortfolioCaseStudiesBlock(html) {
  const marker = '<!-- ═══ CASE STUDIES';
  const start = html.indexOf(marker);
  if (start === -1) return html;

  const endMarker = '<!-- ═══ SERVICES WE DELIVERED';
  const end = html.indexOf(endMarker, start);
  if (end === -1) return html;

  return html.slice(0, start) + endMarker + html.slice(end + endMarker.length);
}

function findSectionIds(html) {
  const ids = new Set(SECTION_IDS);
  const re = /\bid="([^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (SECTION_ID_PATTERN.test(m[1])) ids.add(m[1]);
  }
  return [...ids];
}

function cleanHtml(html) {
  let out = html;
  let changed = false;

  for (const id of findSectionIds(out)) {
    const next = removeSectionById(out, id);
    if (next !== out) {
      out = next;
      changed = true;
    }
  }

  const pf = removePortfolioCaseStudiesBlock(out);
  if (pf !== out) {
    out = pf;
    changed = true;
  }

  const navRe = /<a[^>]*href="#[^"]*cases[^"]*"[^>]*>[^<]*<\/a>/gi;
  const navNext = out.replace(navRe, '');
  if (navNext !== out) {
    out = navNext;
    changed = true;
  }

  const linkRe = /<a[^>]*href="[^"]*case-studies\.html[^"]*"[^>]*>[\s\S]*?<\/a>/gi;
  const linkNext = out.replace(linkRe, '');
  if (linkNext !== out) {
    out = linkNext;
    changed = true;
  }

  return { html: out, changed };
}

const files = walk(root);
let patched = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  if (rel === 'pages\\case-studies.html' || rel === 'pages/case-studies.html') continue;

  const original = fs.readFileSync(file, 'utf8');
  const { html, changed } = cleanHtml(original);
  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    patched++;
    console.log('patched', rel);
  }
}

const toDelete = [];

const PORTFOLIO_CASE_PAGES = new Set([
  'ai-solutions.html',
  'mobile-apps.html',
  'enterprise-platforms.html',
  'saas-products.html',
  'blockchain-projects.html',
]);

function collectCaseStudyPages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectCaseStudyPages(full);
    else if (entry.name === 'case-studies.html') toDelete.push(full);
    else if (entry.name.endsWith('.html') && PORTFOLIO_CASE_PAGES.has(entry.name) && full.includes(`${path.sep}portfolio${path.sep}`)) {
      toDelete.push(full);
    }
  }
}

collectCaseStudyPages(root);

for (const file of toDelete) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log('deleted', path.relative(root, file));
  }
}

console.log(`Done. Patched ${patched} HTML file(s).`);
