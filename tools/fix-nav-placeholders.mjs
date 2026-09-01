import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === '222' || ent.name === '111') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (ent.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const pages = walk(path.join(ROOT, 'pages'));
const index = path.join(ROOT, 'index.html');
let fixed = 0;

for (const file of [...pages, index]) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('header-placeholder')) continue;

  let changed = false;

  if (!html.includes('chatbot-placeholder') && html.includes('footer-placeholder')) {
    html = html.replace(
      /(<div id="footer-placeholder"><\/div>)\s*\n/,
      '$1\n  <div id="chatbot-placeholder"></div>\n'
    );
    changed = true;
  }

  if (html.includes('footer-placeholder') && !html.includes('styles.css')) {
    const depth = path.relative(ROOT, file).split(path.sep).length - 1;
    const prefix = depth === 0 ? 'assets' : '../'.repeat(depth - 1) + 'assets';
    const linkTag = `  <link rel="stylesheet" href="${prefix}/css/styles.css">\n`;
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${linkTag}</head>`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    fixed++;
    console.log('Fixed:', path.relative(ROOT, file));
  }
}

console.log(fixed ? `Done — ${fixed} file(s) updated.` : 'No placeholder fixes needed.');
