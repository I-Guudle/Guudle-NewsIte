import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'index.html',
  'assets/js/mega-menu-data.js',
  'assets/js/mega-menu-webdev-data.js',
  'assets/js/components.js',
];

function collectHrefs(content) {
  const hrefs = new Set();
  const re = /href:\s*['"]([^'"]+)['"]|href=["']([^"'#?][^"']*)["']/g;
  let m;
  while ((m = re.exec(content))) {
    const href = (m[1] || m[2]).trim();
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:|\$\{)/i.test(href)) continue;
    hrefs.add(href.replace(/^\$\{base\}/, '').replace(/\$\{base\}/g, ''));
  }
  return [...hrefs];
}

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const broken = [];
  for (const href of collectHrefs(content)) {
    if (href.includes('${')) continue;
    const clean = href.split('?')[0].split('#')[0];
    const target = path.join(root, ...clean.split('/'));
    if (!fs.existsSync(target)) broken.push(clean);
  }
  console.log(`\n${file}: ${broken.length} broken`);
  broken.forEach((h) => console.log('  ', h));
}
