/**
 * Verify Industries We Serve v3 coverage site-wide
 * Run: node tools/audit-industries-v3.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === 'node_modules' || name === 'july2026' || name === 'june2026' || name === '222' || name === '111') continue;
      walk(full, acc);
    } else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const legacyRe = /class="(?:cpox-industries-parallax ind-serve-v2|ind-light cpox-industries)/;
const statsRe = /ind-serve-v2__stats|ind-light__stats/;
let ok = 0;
let fail = 0;

for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('Industries We') && !html.includes('id="svc-industries"') && !html.includes('id="home-industries"')) continue;
  if (!html.includes('ind-v3') && (html.includes('svc-industries') || html.includes('home-industries') || html.includes('industries-parallax'))) {
    if (legacyRe.test(html) || html.includes('ind-serve-v2__card')) {
      console.log('LEGACY:', path.relative(root, file));
      fail++;
      continue;
    }
  }
  if (html.includes('ind-v3') && html.includes('ind-v3__featured')) {
    if (statsRe.test(html)) {
      console.log('STATS REMAIN:', path.relative(root, file));
      fail++;
    } else {
      ok++;
    }
  }
}

console.log(`\nIndustries v3 audit — ${ok} ok, ${fail} legacy/failed`);
process.exit(fail ? 1 : 0);
