import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '111' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const scripts = [
  '<script src="assets/js/mega-menu-webdev-data.js"></script>',
  '<script src="assets/js/mega-menu-data.js"></script>',
  '<script src="assets/js/mega-menu-render.js"></script>',
];
const scriptsNested = [
  '<script src="../../assets/js/mega-menu-webdev-data.js"></script>',
  '<script src="../../assets/js/mega-menu-data.js"></script>',
  '<script src="../../assets/js/mega-menu-render.js"></script>',
];

let patched = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('components.js')) continue;
  if (html.includes('mega-menu-data.js')) continue;

  const isNested = file.includes(`${path.sep}pages${path.sep}`);
  const toInsert = isNested ? scriptsNested : scripts;
  const marker = isNested
    ? '<script src="../../assets/js/components.js"></script>'
    : '<script src="assets/js/components.js"></script>';

  html = html.replace(marker, `${toInsert.join('\n  ')}\n  ${marker}`);
  fs.writeFileSync(file, html, 'utf8');
  patched++;
  console.log('Patched', path.relative(root, file));
}

console.log(`Done — ${patched} files updated.`);
