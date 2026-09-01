import fs from 'fs';
import path from 'path';

const root = process.cwd();
const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);

const REQUIRED_SCRIPTS = [
  'mega-menu-webdev-data.js',
  'mega-menu-data.js',
  'mega-menu-render.js',
  'components.js',
  'main.js',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];
const issues = [];

for (const file of files) {
  const c = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);

  if (!c.includes('header-placeholder')) issues.push({ file: rel, type: 'missing-placeholder' });
  if (!c.includes('footer-placeholder')) issues.push({ file: rel, type: 'missing-footer-placeholder' });
  if (!c.includes('styles.css')) issues.push({ file: rel, type: 'missing-styles-css' });

  for (const s of REQUIRED_SCRIPTS) {
    if (!c.includes(s)) issues.push({ file: rel, type: 'missing-script', script: s });
  }

  if (c.includes('id="site-header"') || c.includes("id='site-header'")) {
    issues.push({ file: rel, type: 'inline-header' });
  }

  const w = c.indexOf('mega-menu-webdev-data.js');
  const comp = c.indexOf('components.js');
  const main = c.indexOf('main.js');
  if (w > -1 && comp > -1 && w > comp) issues.push({ file: rel, type: 'bad-script-order' });
  if (comp > -1 && main > -1 && comp > main) issues.push({ file: rel, type: 'bad-script-order' });

  if (!c.includes('chatbot-placeholder')) {
    issues.push({ file: rel, type: 'missing-chatbot-placeholder' });
  }
  if (!c.includes('skip-link')) {
    issues.push({ file: rel, type: 'missing-skip-link' });
  }

  const depth = rel.split(/[/\\]/).length - 1;
  if (depth > 0 && (c.includes('href="assets/') || c.includes("href='assets/") || c.includes('src="assets/') || c.includes("src='assets/"))) {
    issues.push({ file: rel, type: 'bad-asset-path' });
  }

  if (c.includes('id="site-header"') === false && c.includes('header-placeholder') === false) {
    // already checked placeholder
  }

  const scriptOrder = REQUIRED_SCRIPTS.map((s) => c.indexOf(s)).filter((i) => i > -1);
  if (scriptOrder.length === REQUIRED_SCRIPTS.length) {
    const sorted = [...scriptOrder].sort((a, b) => a - b);
    if (scriptOrder.join() !== sorted.join()) {
      issues.push({ file: rel, type: 'bad-script-order' });
    }
  }
}

const byType = {};
for (const i of issues) {
  const key = i.type + (i.script ? `:${i.script}` : '');
  byType[key] = byType[key] || [];
  byType[key].push(i.file);
}

console.log(`Audited ${files.length} HTML files\n`);
for (const [type, list] of Object.entries(byType).sort()) {
  console.log(`${type} (${list.length})`);
  list.forEach((f) => console.log(`  ${f}`));
}
console.log(`\nTotal issues: ${issues.length}`);
