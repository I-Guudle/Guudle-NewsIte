/**
 * Inject Guudle IT Solutions ownership & attribution meta into all primary site pages.
 * Usage: node tools/inject-site-meta.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getSiteMetaForFile,
  injectSiteMetaIntoHtml,
  htmlHasSiteMeta,
} from './site-meta.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (ent.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const targets = [...walk(path.join(ROOT, 'pages')), path.join(ROOT, 'index.html')];

let updated = 0;
let skipped = 0;
const failed = [];

for (const file of targets) {
  const rel = path.relative(ROOT, file);
  const html = fs.readFileSync(file, 'utf8');

  if (htmlHasSiteMeta(html)) {
    skipped++;
    continue;
  }

  const metaBlock = getSiteMetaForFile(file);
  const result = injectSiteMetaIntoHtml(html, metaBlock);

  if (!result.changed) {
    failed.push({ file: rel, reason: result.reason });
    continue;
  }

  fs.writeFileSync(file, result.html, 'utf8');
  updated++;
}

console.log('Site meta injection complete.');
console.log(`  Updated: ${updated}`);
console.log(`  Already present: ${skipped}`);
if (failed.length) {
  console.log(`  Failed (${failed.length}):`);
  failed.forEach(({ file, reason }) => console.log(`    ${file} — ${reason}`));
  process.exit(1);
}
console.log(`✓ All ${targets.length} primary pages have ownership metadata.`);
