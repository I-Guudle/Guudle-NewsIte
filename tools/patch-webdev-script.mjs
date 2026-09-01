import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['111', 'node_modules', 'june2026', '222']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let patched = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('mega-menu-data.js') || html.includes('mega-menu-webdev-data.js')) continue;

  const isNested = file.includes(`${path.sep}pages${path.sep}`);
  const insert = isNested
    ? '<script src="../../assets/js/mega-menu-webdev-data.js"></script>\n  '
    : '<script src="assets/js/mega-menu-webdev-data.js"></script>\n  ';

  html = html.replace(
    isNested
      ? '<script src="../../assets/js/mega-menu-data.js"></script>'
      : '<script src="assets/js/mega-menu-data.js"></script>',
    `${insert}<script src="${isNested ? '../../' : ''}assets/js/mega-menu-data.js"></script>`,
  );
  fs.writeFileSync(file, html, 'utf8');
  patched++;
}

console.log(`Patched ${patched} HTML files with mega-menu-webdev-data.js`);
