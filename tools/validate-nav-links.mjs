import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walkHtml(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === '222' || ent.name === '111') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(full, files);
    else if (ent.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function collectHrefs(obj, out = new Set()) {
  if (!obj || typeof obj !== 'object') return out;
  if (typeof obj.href === 'string' && obj.href.endsWith('.html')) out.add(obj.href);
  for (const val of Object.values(obj)) {
    if (Array.isArray(val)) val.forEach((item) => collectHrefs(item, out));
    else if (val && typeof val === 'object') collectHrefs(val, out);
  }
  return out;
}

const dataPath = path.join(ROOT, 'assets', 'js', 'mega-menu-data.js');
const dataSrc = fs.readFileSync(dataPath, 'utf8');
const dataMatch = dataSrc.match(/window\.GuudleMegaMenu\s*=\s*(\{[\s\S]*?\n\};)/);
if (!dataMatch) {
  console.error('Could not parse mega-menu-data.js');
  process.exit(1);
}

const menu = eval(`(${dataMatch[1].replace(/;\s*$/, '')})`);
const hrefs = [...collectHrefs(menu)];
const broken = [];

for (const href of hrefs) {
  const normalized = href.replace(/^\//, '');
  const targets = [
    path.join(ROOT, normalized),
    path.join(ROOT, normalized.replace(/^pages\//, 'pages/')),
  ];
  if (normalized === 'index.html') targets.push(path.join(ROOT, 'index.html'));
  const exists = targets.some((t) => fs.existsSync(t));
  if (!exists) broken.push(href);
}

const inlineBroken = [];
for (const file of walkHtml(path.join(ROOT, 'pages'))) {
  const html = fs.readFileSync(file, 'utf8');
  const re = /href="(\.\.\/[^"]+\.html|\.\/[^"]+\.html|pages\/[^"]+\.html)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const abs = path.normalize(path.join(path.dirname(file), href));
    if (!fs.existsSync(abs)) inlineBroken.push({ file: path.relative(ROOT, file), href });
  }
}

if (broken.length) {
  console.error('Mega menu broken links:');
  broken.forEach((h) => console.error(`  ${h}`));
}
if (inlineBroken.length) {
  console.error('Inline broken relative links (sample):');
  inlineBroken.slice(0, 20).forEach(({ file, href }) => console.error(`  ${file} → ${href}`));
  if (inlineBroken.length > 20) console.error(`  … and ${inlineBroken.length - 20} more`);
}

if (broken.length || inlineBroken.length) process.exit(1);
console.log(`✓ ${hrefs.length} mega menu links validated.`);
