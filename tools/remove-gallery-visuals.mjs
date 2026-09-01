/**
 * Remove Visuals / Solution in Action gallery sections site-wide.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['node_modules', 'tools']);

const SECTION_IDS = ['svc-gallery', 'mkt-gallery'];

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

function cleanHtml(html) {
  let out = html;
  let changed = false;

  for (const id of SECTION_IDS) {
    const next = removeSectionById(out, id);
    if (next !== out) {
      out = next;
      changed = true;
    }
  }

  const navRe = /<a[^>]*href="#(?:svc|mkt)-gallery"[^>]*>[^<]*<\/a>/gi;
  const navNext = out.replace(navRe, '');
  if (navNext !== out) {
    out = navNext;
    changed = true;
  }

  return { html: out, changed };
}

const files = walk(root);
let patched = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  const original = fs.readFileSync(file, 'utf8');
  const { html, changed } = cleanHtml(original);
  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    patched++;
    console.log('patched', rel);
  }
}

console.log(`Done. Patched ${patched} HTML file(s).`);
