import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const files = [...walk(path.join(ROOT, 'pages')), path.join(ROOT, 'index.html')];
let fixed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  html = html.replace(/(<link rel="home" href="[^"]+">)\n<meta name="description"/g, '$1\n  <meta name="description"');
  html = html.replace(/(<meta name="viewport"[^>]+>)\n  \n  <!-- Site ownership/g, '$1\n  <!-- Site ownership');
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    fixed++;
  }
}

console.log(`Fixed formatting on ${fixed} files.`);
