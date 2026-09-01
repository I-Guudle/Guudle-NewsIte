/**
 * Verify Aqua theme migration — no legacy teal hex in active assets
 * Run: node tools/audit-aqua-theme.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');

const LEGACY = [
  /#06[Bb]6[Dd]4/,
  /#14[Bb]8[Aa]6/,
  /#2[Dd]4[Bb][Ff]/,
  /#22[Dd]3[Ee][Ee]/,
  /#0891[Bb]2/,
  /#0[Dd]9488/,
  /rgba\(45,\s*212,\s*191/,
  /rgba\(6,\s*182,\s*212/,
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (/\.(css|js|html)$/.test(ent.name)) out.push(full);
  }
  return out;
}

const files = walk(ASSETS);
let hits = 0;

for (const f of files) {
  if (f.includes('aqua-palette.css')) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes('teal-') && !line.includes('/*') && line.includes('text-teal')) return;
    for (const re of LEGACY) {
      if (re.test(line)) {
        hits++;
        console.log(`${path.relative(ROOT, f)}:${i + 1}: ${line.trim().slice(0, 100)}`);
      }
    }
  });
}

if (hits === 0) {
  console.log('✓ No legacy teal hex found in assets/');
} else {
  console.log(`\n${hits} legacy teal reference(s) remain — review above.`);
  process.exitCode = 1;
}
