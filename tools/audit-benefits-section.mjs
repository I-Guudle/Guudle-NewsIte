/**
 * Audit Benefits sections — expect guudle-benefits SSOT markup site-wide
 * Run: node tools/audit-benefits-section.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const servicesDir = path.join(root, 'pages', 'services');

const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.html'));
let ok = 0;
let missing = [];
let legacy = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(servicesDir, file), 'utf8');
  if (!html.includes('id="svc-benefits"') && !html.includes('id="ecom-why"')) continue;
  if (html.includes('class="guudle-benefits')) {
    ok++;
    if (!html.includes('benefits-section.css')) {
      missing.push(`${file} (no benefits-section.css link)`);
    }
  } else if (html.includes('cpox-benefits-glow') || html.includes('class="svc-benefits ') || html.includes('pre-benefits')) {
    legacy.push(file);
  }
}

console.log(`Benefits sections using guudle-benefits: ${ok}`);
if (missing.length) {
  console.log('Missing CSS link:');
  missing.forEach((f) => console.log('  -', f));
}
if (legacy.length) {
  console.error('Legacy benefits markup still present:');
  legacy.forEach((f) => console.error('  -', f));
  process.exit(1);
}
console.log('Audit passed.');
