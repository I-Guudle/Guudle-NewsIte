/**
 * Ensure service pages use /sliders assets (no Unsplash in body).
 * Run: node tools/audit-sliders.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svcDir = path.join(root, 'pages', 'services');
const files = fs.readdirSync(svcDir).filter((f) => f.endsWith('.html'));

const issues = [];

for (const file of files) {
  const rel = `pages/services/${file}`;
  const c = fs.readFileSync(path.join(svcDir, file), 'utf8');
  if (c.includes('unsplash.com')) {
    issues.push({ rel, type: 'unsplash' });
  }
  if (!c.includes('../../sliders/') && !c.includes('/sliders/')) {
    issues.push({ rel, type: 'missing-sliders' });
  }
  if (!c.includes('parallax-section')) {
    issues.push({ rel, type: 'missing-parallax' });
  }
}

console.log('════════════════════════════════════════');
console.log('  SLIDER & PARALLAX ASSET AUDIT');
console.log('════════════════════════════════════════\n');
console.log(`Service pages: ${files.length}`);
console.log(`Issues: ${issues.length}\n`);

if (issues.length) {
  const grouped = {};
  for (const i of issues) grouped[i.type] = (grouped[i.type] || 0) + 1;
  for (const [k, v] of Object.entries(grouped)) console.log(`  ${k}: ${v}`);
}

console.log(`\n${issues.length ? 'RESULT: FAIL' : 'RESULT: PASS — all service pages use /sliders with parallax'}`);
process.exit(issues.length ? 1 : 0);
