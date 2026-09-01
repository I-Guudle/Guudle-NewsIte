/**
 * Replace brand cyan #10A5F5 → #10A5F5 site-wide
 * Run: node tools/migrate-to-10a5f5.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = '#10A5F5';
const BRAND_RGB = '16, 165, 245';
const BRAND_RGB_COMPACT = '16,165,245';

const REPLACEMENTS = [
  ['#10A5F5', BRAND],
  ['#10A5F5', BRAND],
  ['#0E96E8', '#0E96E8'],
  ['#0E96E8', '#0E96E8'],
  ['#0D84C4', '#0D84C4'],
  ['#0D84C4', '#0D84C4'],
  ['#0A7BC4', '#0A7BC4'],
  ['#0A7BC4', '#0A7BC4'],
  ['#3DB8F7', '#3DB8F7'],
  ['#5BC4FA', '#5BC4FA'],
  ['#5BC4FA', '#5BC4FA'],
  ['#E6F4FE', '#E6F4FE'],
  ['rgba(16, 165, 245', `rgba(${BRAND_RGB}`],
  ['rgba(16,165,245', `rgba(${BRAND_RGB_COMPACT}`],
  ['rgba(16, 165, 245', `rgba(${BRAND_RGB}`],
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'june2026', '222', '111']);

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => ent.name.endsWith(e))) out.push(full);
  }
  return out;
}

function migrateFile(filePath) {
  if (filePath.endsWith('aqua-palette.css')) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  for (const [from, to] of REPLACEMENTS) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const targets = [
  ...walk(path.join(ROOT, 'assets'), ['.css', '.js', '.html']),
  ...walk(path.join(ROOT, 'pages'), ['.html']),
  ...walk(path.join(ROOT, 'tools'), ['.mjs', '.js']),
];

for (const f of ['index.html', 'portfolio.html']) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) targets.push(p);
}

let changed = 0;
for (const f of targets) {
  if (migrateFile(f)) {
    changed++;
    console.log('  updated:', path.relative(ROOT, f));
  }
}

console.log(`\n#10A5F5 migration complete — ${changed} files updated.`);
