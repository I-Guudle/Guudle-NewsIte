/**
 * Scans navigation-related CSS/JS for navy/dark-blue colors that should not appear in nav.
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const NAV_FILES = [
  'assets/css/styles.css',
  'assets/css/mega-menu.css',
  'assets/js/components.js',
  'assets/js/main.js',
  'assets/css/about.css',
];

const BANNED = [
  /#0[Bb]1[Ff]3[Aa]/g,
  /#001[Ff]54/g,
  /#002[Bb]5[Bb]/g,
  /#123[Dd]6[Aa]/g,
  /#091729/g,
  /#0[Aa]2540/g,
  /#1[Ee]3[Aa]8[Aa]/g,
  /#1[Dd]4[Ee][Dd]8/g,
  /#1[Ee]40[Aa][Ff]/g,
  /rgba\(\s*11\s*,\s*31\s*,\s*58/g,
];

const NAV_SCOPES = [
  /#site-header[\s\S]{0,800}/g,
  /\.nav-[\s\S]{0,400}/g,
  /\.mega-[\s\S]{0,400}/g,
  /\.mobile-menu[\s\S]{0,400}/g,
  /\.mobile-nav[\s\S]{0,400}/g,
  /\.corp-subnav[\s\S]{0,300}/g,
];

const NAV_SELECTOR_HINT = /#site-header|\.nav-|\.mega-|\.mobile-menu|\.mobile-nav|\.corp-subnav/;

function scanFile(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return [];
  const content = fs.readFileSync(full, 'utf8');
  const hits = [];
  for (const re of BANNED) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      const before = content.slice(0, m.index);
      const line = before.split('\n').length;
      const blockStart = before.lastIndexOf('\n}');
      const block = content.slice(blockStart > -1 ? blockStart : 0, m.index + 80);
      if (!NAV_SELECTOR_HINT.test(block) && !before.slice(before.lastIndexOf('\n', before.length - 2)).match(/^:root/)) {
        continue;
      }
      if (before.includes(':root') && !before.slice(before.lastIndexOf(':root')).match(/#site-header|\.nav-|\.mega-|\.mobile-/)) {
        continue;
      }
      hits.push({ file: rel, line, match: m[0] });
    }
  }
  return hits;
}

const allHits = NAV_FILES.flatMap(scanFile);
const byFile = {};
for (const h of allHits) {
  byFile[h.file] = byFile[h.file] || [];
  byFile[h.file].push(h);
}

console.log('Navigation color audit\n');
if (!allHits.length) {
  console.log('No banned navy/dark-blue hex values in nav source files.');
} else {
  for (const [file, list] of Object.entries(byFile)) {
    console.log(`${file} (${list.length})`);
    list.forEach((h) => console.log(`  L${h.line}: ${h.match}`));
  }
  console.log(`\nTotal: ${allHits.length}`);
}
