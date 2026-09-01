import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const dirs = [
  path.join(root, 'pages', 'services'),
  path.join(root, 'pages'),
];

const trustGrid = `        <div class="sp-trust-item sp-reveal"><div class="sp-trust-icon"><i class="fas fa-rocket"></i></div><p class="text-sm font-semibold text-slate-800">End-to-end delivery</p></div>
        <div class="sp-trust-item sp-reveal sp-d1"><div class="sp-trust-icon"><i class="fas fa-shield-alt"></i></div><p class="text-sm font-semibold text-slate-800">Security-first</p></div>
        <div class="sp-trust-item sp-reveal sp-d2"><div class="sp-trust-icon"><i class="fas fa-bolt"></i></div><p class="text-sm font-semibold text-slate-800">Performance focused</p></div>
        <div class="sp-trust-item sp-reveal sp-d3"><div class="sp-trust-icon"><i class="fas fa-headset"></i></div><p class="text-sm font-semibold text-slate-800">Dedicated support</p></div>`;

const brokenPillRe =
  /<div class="sp-stat-pill[^"]*"[^>]*>\s*<p class="text-sm font-semibold text-slate-800 mt-1">Included<\/p>\s*<p class="text-sm text-slate-500 mt-1">([^<]+)<\/p>\s*<\/div>/g;

const statPillGridRe =
  /<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">\s*(?:<div class="sp-stat-pill[\s\S]*?<\/div>\s*){4}<\/div>/g;

const outcomeCardRe =
  /<p class="text-lg font-bold[^"]*">Included<\/p>\s*<p class="([^"]+)"[^>]*>([^<]+)<\/p>/g;

let total = 0;
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    const orig = content;

    content = content.replace(brokenPillRe, (_, label) => {
      return `<div class="sp-trust-item sp-reveal"><div class="sp-trust-icon"><i class="fas fa-check"></i></div><p class="text-sm font-semibold text-slate-800">${label.trim()}</p></div>`;
    });

    if (content.includes('>Included<') && statPillGridRe.test(content)) {
      content = content.replace(statPillGridRe, trustGrid);
    }

    content = content.replace(outcomeCardRe, (_, cls, label) => {
      return `<p class="text-base font-bold text-[#0B1F3A]">${label.trim()}</p><p class="${cls} text-sm mt-2">Measurable outcomes for your team</p>`;
    });

    content = content.replace(
      /<p class="text-2xl font-bold text-cyan-500">40%<\/p>/,
      '<p class="text-sm font-semibold text-cyan-500">Optimized spend</p>'
    );

    content = content.replace(
      /<h2 class="text-3xl font-bold text-center mb-12 sp-reveal">Pipeline Growth Stats<\/h2>/,
      '<h2 class="text-3xl font-bold text-center mb-12 sp-reveal">Pipeline Outcomes</h2>'
    );

    content = content.replace(
      /Real-time monitoring of 500\+ connected machines\./,
      'Real-time monitoring of connected machines at scale.'
    );

    if (content !== orig) {
      fs.writeFileSync(fp, content);
      total++;
      console.log('Fixed', path.relative(root, fp));
    }
  }
}
console.log(`Cleanup done: ${total} files.`);
