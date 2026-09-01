/**
 * Live-site typography / hero cleanup.
 * Skips archive folders. Adds enterprise-system.css last. Strips aurora, gradient text, aqua highlights.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set([
  'Endjuly2026', 'july2026', 'june2026', '222', '111', 'CEYRIIN',
  'node_modules', '.git', '.superpowers'
]);

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function relCss(file) {
  const rel = path.relative(path.dirname(file), path.join(ROOT, 'assets/css/enterprise-system.css')).replace(/\\/g, '/');
  return rel;
}

const files = walk(ROOT, []).filter((f) => {
  if (f.includes('.backup')) return false;
  if (f.endsWith('index.backup-pre-parallax.html')) return false;
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return rel === 'index.html' || rel.startsWith('pages/');
});
let changed = 0;
const report = { files: 0, aurora: 0, gradientText: 0, aquaSpan: 0, cssLink: 0 };

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;

  const auroraRe = /\s*<div class="hero-aurora[^"]*"[^>]*><\/div>/g;
  const beamRe = /\s*<div class="hero-beam"[^>]*><\/div>/g;
  const auroraHits = (html.match(auroraRe) || []).length;
  const beamHits = (html.match(beamRe) || []).length;
  html = html.replace(auroraRe, '');
  html = html.replace(beamRe, '');
  report.aurora += auroraHits + beamHits;

  html = html.replace(
    /<span class="[^"]*bg-clip-text[^"]*text-transparent[^"]*"[^>]*>([\s\S]*?)<\/span>/g,
    '$1'
  );
  html = html.replace(
    /<span class="[^"]*text-transparent[^"]*bg-clip-text[^"]*"[^>]*>([\s\S]*?)<\/span>/g,
    '$1'
  );
  html = html.replace(/\s(bg-clip-text|text-transparent|bg-gradient-to-[rltb]|hero-gradient-text|svc-gradient-text|slp-gradient-text)/g, '');
  if (html !== orig) report.gradientText += 1;

  const aquaBefore = html;
  html = html.replace(/\sstyle="color:#10A5F5"/g, '');
  html = html.replace(/\sstyle="color: #10A5F5"/g, '');
  if (html !== aquaBefore) report.aquaSpan += 1;

  html = html.replace(/\stext-cyan-600/g, ' text-slate-800');
  html = html.replace(/\sbg-violet-400|\sbg-violet-500|\sbg-cyan-400|\sbg-cyan-600/g, ' bg-slate-400');
  html = html.replace(/\stext-violet-500|\stext-purple-400|\stext-blue-400|\stext-indigo-400/g, ' text-slate-700');
  html = html.replace(/\sbg-blue-500\/10|\sbg-purple-500\/10|\sbg-indigo-500\/10/g, ' bg-slate-100');

  if (!html.includes('enterprise-system.css') && html.includes('</head>')) {
    const href = relCss(file);
    html = html.replace('</head>', `  <link rel="stylesheet" href="${href}">\n</head>`);
    report.cssLink += 1;
  }

  if (html !== orig) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(JSON.stringify({ scanned: files.length, changed, ...report }, null, 2));
