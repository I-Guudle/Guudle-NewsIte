import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const REQUIRED = ['mega-menu-data.js', 'mega-menu-render.js', 'components.js', 'main.js'];

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === '222' || ent.name === '111') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (ent.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function scriptIndex(html, name) {
  return html.indexOf(name);
}

const pages = walk(path.join(ROOT, 'pages'));
const index = path.join(ROOT, 'index.html');
const all = [...pages, index];
const issues = [];

for (const file of all) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('header-placeholder')) continue;
  const rel = path.relative(ROOT, file);

  for (const script of REQUIRED) {
    if (!html.includes(script)) issues.push({ file: rel, issue: `missing script: ${script}` });
  }

  const order = REQUIRED.map((s) => scriptIndex(html, s)).filter((i) => i >= 0);
  for (let i = 1; i < order.length; i++) {
    if (order[i] < order[i - 1]) {
      issues.push({ file: rel, issue: 'nav script load order incorrect' });
      break;
    }
  }

  if (!html.includes('footer-placeholder')) {
    issues.push({ file: rel, issue: 'missing #footer-placeholder' });
  }
  if (!html.includes('chatbot-placeholder')) {
    issues.push({ file: rel, issue: 'missing #chatbot-placeholder' });
  }
  if (!html.includes('styles.css')) {
    issues.push({ file: rel, issue: 'missing styles.css (shared nav styles)' });
  }
  if (html.includes('id="site-header"') || html.includes('class="site-nav fixed')) {
    issues.push({ file: rel, issue: 'inline header detected — use #header-placeholder' });
  }
}

if (issues.length) {
  console.error('Navigation audit issues:');
  issues.forEach(({ file, issue }) => console.error(`  ${file} → ${issue}`));
  process.exit(1);
}

const count = all.filter((f) => fs.readFileSync(f, 'utf8').includes('header-placeholder')).length;
console.log(`✓ All ${count} pages pass unified navigation audit.`);
