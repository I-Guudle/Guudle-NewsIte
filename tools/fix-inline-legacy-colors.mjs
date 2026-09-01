/**
 * Replace banned inline legacy colors with design-system tokens.
 * Run: node tools/fix-inline-legacy-colors.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const REPLACEMENTS = [
  ['text-[#0B1F3A]', 'text-slate-900'],
  ['text-[#0b1f3a]', 'text-slate-900'],
  ['#0B1F3A', '#0F172A'],
  ['#0b1f3a', '#0F172A'],
];

const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')].filter(fs.existsSync);
let n = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  const orig = c;
  for (const [from, to] of REPLACEMENTS) c = c.split(from).join(to);
  if (c !== orig) {
    fs.writeFileSync(f, c, 'utf8');
    n++;
    console.log('  updated:', path.relative(root, f));
  }
}
console.log(`\nFixed inline legacy colors on ${n} pages.`);
