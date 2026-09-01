/**
 * Site-wide teal → Aqua palette migration
 * Run: node tools/migrate-aqua-theme.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const REPLACEMENTS = [
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['#E6F4FE', '#E6F4FE'],
  ['#E6F4FE', '#E6F4FE'],
  ['#E6F4FE', '#E6F4FE'],
  ['#E6F4FE', '#E6F4FE'],
  ['#10A5F5', '#10A5F5'],
  ['#10A5F5', '#10A5F5'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(16, 165, 245', 'rgba(16, 165, 245'],
  ['rgba(16,165,245', 'rgba(16,165,245'],
  ['rgba(230, 249, 255', 'rgba(230, 249, 255'],
  ['rgba(230,249,255', 'rgba(230,249,255'],
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'june2026', '222', '111']);

function walk(dir, exts, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => ent.name.endsWith(e))) out.push(full);
  }
  return out;
}

function migrateFile(filePath) {
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
  ...walk(path.join(ROOT, 'assets'), ['.css', '.js']),
  ...walk(path.join(ROOT, 'pages'), ['.html']),
  ...walk(path.join(ROOT, 'tools'), ['.mjs', '.js']),
];

if (fs.existsSync(path.join(ROOT, 'index.html'))) targets.push(path.join(ROOT, 'index.html'));
if (fs.existsSync(path.join(ROOT, 'portfolio.html'))) targets.push(path.join(ROOT, 'portfolio.html'));

let changed = 0;
for (const f of targets) {
  if (f.endsWith('aqua-palette.css')) continue;
  if (migrateFile(f)) {
    changed++;
    console.log('  updated:', path.relative(ROOT, f));
  }
}

console.log(`\nAqua migration complete — ${changed} files updated.`);
