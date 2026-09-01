/**
 * List service pages missing Industries We Serve section (v2).
 * Run: node tools/audit-industries-section.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'pages', 'services');
const missing = [];

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(dir, f), 'utf8');
  if (
    !html.includes('id="svc-industries"') &&
    !html.includes('id="svc-tech-stack"') &&
    !html.includes('id="mkt-industries"') &&
    !html.includes('id="cma-industries"') &&
    !html.includes('id="ecom-industries"') &&
    !html.includes('id="cld-industries"') &&
    !html.includes('id="wdev-industries"')
  ) {
    missing.push(f);
  }
}

console.log('Missing industries section:', missing.length);
missing.forEach((f) => console.log(' ', f));
process.exit(missing.length ? 1 : 0);
