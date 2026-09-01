import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const hrefRe = /href=["']([^"'#?][^"']*)["']/gi;
const seen = new Set();
const broken = [];
let m;
while ((m = hrefRe.exec(html))) {
  let href = m[1].trim();
  if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
  if (href.startsWith('#')) continue;
  href = href.split('?')[0].split('#')[0];
  if (seen.has(href)) continue;
  seen.add(href);
  const target = path.join(root, ...href.split('/'));
  if (!fs.existsSync(target)) broken.push(href);
}
const bgRe = /url\(['"]?([^'")]+)['"]?\)/g;
const bgBroken = [];
while ((m = bgRe.exec(html))) {
  const u = m[1].trim();
  if (/^https?:\/\//i.test(u) || u.startsWith('data:')) continue;
  const target = path.join(root, ...u.split('/'));
  if (!fs.existsSync(target)) bgBroken.push(u);
}
console.log('Local hrefs:', seen.size, 'broken:', broken.length);
broken.forEach((h) => console.log('  href', h));
console.log('Background urls broken:', bgBroken.length);
bgBroken.forEach((u) => console.log('  bg', u));
