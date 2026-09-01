/**
 * Audit local image references across HTML/CSS/JS.
 * Run: node tools/audit-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP = new Set(['node_modules', '.git', 'june2026', '222']);
const imgRe = /(?:src|href|url\(|background-image:\s*url\(['"]?)([^'")\s>]+\.(?:png|jpe?g|gif|webp|svg|avif))/gi;

const issues = [];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP.has(ent.name)) continue;
      walk(path.join(dir, ent.name));
      continue;
    }
    if (!/\.(html|css|js|mjs)$/i.test(ent.name)) continue;
    const file = path.join(dir, ent.name);
    const rel = path.relative(root, file).replace(/\\/g, '/');
    const c = fs.readFileSync(file, 'utf8');
    let m;
    imgRe.lastIndex = 0;
    while ((m = imgRe.exec(c))) {
      let href = m[1].split('?')[0].split('#')[0];
      if (/^https?:\/\//i.test(href) || href.startsWith('data:')) continue;
      let target;
      if (href.startsWith('/')) target = path.join(root, href.slice(1));
      else target = path.resolve(path.dirname(file), href);
      if (!fs.existsSync(target)) {
        issues.push({ rel, href, resolved: path.relative(root, target).replace(/\\/g, '/') });
      }
    }
  }
}

walk(root);

const byHref = {};
for (const i of issues) byHref[i.href] = (byHref[i.href] || 0) + 1;

console.log(`Missing local images: ${issues.length} references, ${Object.keys(byHref).length} unique paths\n`);
Object.entries(byHref)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50)
  .forEach(([h, c]) => console.log(`${c}x  ${h}`));

process.exit(issues.length ? 1 : 0);
