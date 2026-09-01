/**
 * Check internal hrefs on live HTML (index.html + pages/).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIR = new Set(['Endjuly2026', 'july2026', 'june2026', '222', '111', 'CEYRIIN', 'node_modules', '.git']);

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = walk(ROOT, []).filter((f) => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return rel === 'index.html' || rel.startsWith('pages/');
});

const hrefRe = /(?:href|src)=["']([^"']+)["']/gi;
const broken = [];
let checked = 0;

function isExternal(u) {
  return /^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(u);
}

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  let m;
  hrefRe.lastIndex = 0;
  while ((m = hrefRe.exec(html))) {
    let url = m[1].trim();
    if (!url || isExternal(url)) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    checked += 1;
    const target = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(target)) {
      broken.push({
        file: path.relative(ROOT, file).replace(/\\/g, '/'),
        href: url,
      });
    }
  }
}

const jsFiles = ['assets/js/mega-menu-data.js', 'assets/js/mega-menu-webdev-data.js', 'assets/js/components.js'];
const jsBroken = [];
const jsRe = /href:\s*['"]([^'"]+)['"]/g;
for (const rel of jsFiles) {
  const t = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  let m;
  jsRe.lastIndex = 0;
  while ((m = jsRe.exec(t))) {
    const u = m[1].split('#')[0];
    if (!u.startsWith('pages/')) continue;
    if (!fs.existsSync(path.join(ROOT, u))) jsBroken.push({ file: rel, href: u });
  }
}

console.log(JSON.stringify({ files: files.length, checked, broken: broken.length, samples: broken.slice(0, 80), navBroken: jsBroken }, null, 2));
