/**
 * Fail if inline Enterprise Technology Hub sections remain on any page.
 * Run: node tools/audit-no-tech-hub.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const INLINE_PATTERNS = [
  /class="eth-v3"/,
  /class="eth-hub/,
  /class="tech-hub-cta"/,
  /id="svc-tech-hub"/,
  /id="svc-tech-stack"/,
  /id="mkt-tech-hub"/,
  /Technologies That Power Digital Innovation/,
  /tech-hub-section\.css/,
  /tech-hub-v3\.js/,
  /id="tech-stack-section"/,
  /Explore Technology Hub/,
];

const LINK_PATTERNS = [
  /href="[^"]*technology\.html[^"]*"[^>]*>[\s\S]*?Technology Hub/,
  /Explore Our Technology Stack/,
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === 'july2026' || name === 'node_modules') continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const hits = [];
for (const file of [...walk(path.join(root, 'pages')), path.join(root, 'index.html')]) {
  if (!fs.existsSync(file)) continue;
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const patterns = [...INLINE_PATTERNS];
  if (rel !== 'pages/technology.html') patterns.push(...LINK_PATTERNS);
  for (const re of patterns) {
    if (re.test(html)) {
      hits.push(`${rel} → ${re}`);
      break;
    }
  }
}

if (hits.length) {
  console.error('Tech Hub remnants found:', hits.length);
  hits.forEach((h) => console.error(' ', h));
  process.exit(1);
}
console.log('OK — no inline Enterprise Technology Hub sections found.');
process.exit(0);
