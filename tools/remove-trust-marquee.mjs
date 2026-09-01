/**
 * Remove Technologies & Tools / trust marquee sections from all HTML pages.
 * Run: node tools/remove-trust-marquee.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const TRUST_PATTERNS = [
  /\s*<section id="svc-trust"[\s\S]*?<\/section>\s*/g,
  /\s*<section class="pre-trust"[\s\S]*?<\/section>\s*/g,
];

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkHtml(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

let changed = 0;
let removed = 0;

for (const file of walkHtml(root)) {
  let content = fs.readFileSync(file, 'utf8');
  let next = content;
  let fileRemoved = 0;

  for (const re of TRUST_PATTERNS) {
    const matches = next.match(re);
    if (matches) {
      fileRemoved += matches.length;
      next = next.replace(re, '\n');
    }
  }

  if (next !== content) {
    fs.writeFileSync(file, next);
    changed++;
    removed += fileRemoved;
    console.log(`Updated: ${path.relative(root, file)} (${fileRemoved} section(s))`);
  }
}

console.log(`\nDone. ${changed} file(s) updated, ${removed} trust section(s) removed.`);
