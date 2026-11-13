/**
 * Normalize legacy brand colors in active CSS files.
 * Run: node tools/normalize-css-colors.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'css');
const REPLACEMENTS = [
  [/#0[Bb]1[Ff]3[Aa]/g, '#37474F'],
  [/#123[Dd]6[Aa]/g, '#455A64'],
  [/#2563[Ee][Bb]/g, '#10A5F5'],
  [/#091729/g, '#2E3440'],
  [/#081829/g, '#2E3440'],
  [/#5[cC]0[cC]01/g, '#37474F'],
  [/#33[cC][aA]0[dD]/g, '#10A5F5'],
  [/#40126[aA]/g, '#455A64'],
  [/#22[Cc]55[Ee]/g, '#10A5F5'],
  [/#7[Cc]3[Aa][Ee][Dd]/g, '#546E7A'],
  [/#0[Dd]9488/g, '#10A5F5'],
  [/#14[Bb]8[Aa]6/g, '#10A5F5'],
  [/rgba\(\s*11\s*,\s*31\s*,\s*58/g, 'rgba(55, 71, 79'],
  [/rgba\(\s*37\s*,\s*99\s*,\s*235/g, 'rgba(0, 32, 128'],
];

let changed = 0;
for (const file of fs.readdirSync(root).filter((f) => f.endsWith('.css'))) {
  const full = path.join(root, file);
  let content = fs.readFileSync(full, 'utf8');
  const before = content;
  for (const [re, rep] of REPLACEMENTS) {
    content = content.replace(re, rep);
  }
  if (content !== before) {
    fs.writeFileSync(full, content, 'utf8');
    changed++;
    console.log('Updated:', file);
  }
}
console.log(changed ? `\nDone — ${changed} CSS file(s) normalized.` : '\nCSS colors already normalized.');
