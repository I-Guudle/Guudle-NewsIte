import fs from 'fs';
import path from 'path';

const servicesDir = path.resolve(import.meta.dirname, '..', 'pages', 'services');

const trustSection = `    <section class="py-16 border-y border-slate-100 bg-[#F3F6FB]">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="sp-trust-item sp-reveal"><div class="sp-trust-icon"><i class="fas fa-rocket"></i></div><p class="text-sm font-semibold text-slate-800">End-to-end delivery</p><p class="text-xs text-slate-500 mt-1">Strategy through launch</p></div>
        <div class="sp-trust-item sp-reveal sp-d1"><div class="sp-trust-icon"><i class="fas fa-shield-alt"></i></div><p class="text-sm font-semibold text-slate-800">Security-first</p><p class="text-xs text-slate-500 mt-1">Enterprise-grade practices</p></div>
        <div class="sp-trust-item sp-reveal sp-d2"><div class="sp-trust-icon"><i class="fas fa-bolt"></i></div><p class="text-sm font-semibold text-slate-800">Performance focused</p><p class="text-xs text-slate-500 mt-1">Fast, reliable systems</p></div>
        <div class="sp-trust-item sp-reveal sp-d3"><div class="sp-trust-icon"><i class="fas fa-headset"></i></div><p class="text-sm font-semibold text-slate-800">Dedicated support</p><p class="text-xs text-slate-500 mt-1">When you need us</p></div>
      </div>
    </section>`;

const devStatInner = `        <div class="sp-trust-item sp-reveal"><div class="sp-trust-icon"><i class="fas fa-rocket"></i></div><p class="text-sm font-semibold text-slate-800">Launch-ready delivery</p></div>
        <div class="sp-trust-item sp-reveal sp-d1"><div class="sp-trust-icon"><i class="fas fa-shield-alt"></i></div><p class="text-sm font-semibold text-slate-800">Security-first builds</p></div>
        <div class="sp-trust-item sp-reveal sp-d2"><div class="sp-trust-icon"><i class="fas fa-bolt"></i></div><p class="text-sm font-semibold text-slate-800">Performance optimized</p></div>
        <div class="sp-trust-item sp-reveal sp-d3"><div class="sp-trust-icon"><i class="fas fa-headset"></i></div><p class="text-sm font-semibold text-slate-800">Dedicated support</p></div>`;

const statPillRe = /<section class="py-16 border-y border-slate-100">\s*<div class="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">\s*(?:<div class="sp-stat-pill[\s\S]*?<\/div>\s*){4}<\/div>\s*<\/section>/g;

const devStatRe = /(<section class="py-10[^"]*"[^>]*>\s*<div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4[^"]*"[^>]*>\s*)(?:<div class="dev-stat-card">[\s\S]*?<\/div>\s*){4}(<\/div>\s*<\/section>)/g;

const devStatReplacement = `$1${devStatInner}$2`;

const spCounterRe = /<p class="text-3xl font-bold[^"]*"[^>]*data-sp-counter="[^"]*"[^>]*>0<\/p>/g;
const spCounterRe2 = /<p class="text-4xl font-bold sp-counter[^"]*"[^>]*data-sp-counter="[^"]*"[^>]*>0<\/p>/g;
const spCounterRe3 = /<p class="text-5xl font-bold sp-counter[^"]*"[^>]*data-sp-counter="[^"]*"[^>]*>0<\/p>/g;
const spCounterRe4 = /<p class="text-2xl font-bold[^"]*sp-counter"[^>]*data-sp-counter="[^"]*"[^>]*>0<\/p>/g;

let count = 0;
for (const file of fs.readdirSync(servicesDir).filter((f) => f.endsWith('.html'))) {
  const fp = path.join(servicesDir, file);
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;

  content = content.replace(statPillRe, trustSection);
  content = content.replace(devStatRe, devStatReplacement);

  // Magento-style inline stat blocks
  content = content.replace(spCounterRe4, '<p class="text-sm font-semibold text-slate-800">Included</p>');
  content = content.replace(spCounterRe, '<p class="text-sm font-semibold text-slate-800 mt-1">Included</p>');
  content = content.replace(spCounterRe2, '<p class="text-lg font-bold text-[#002080]">Included</p>');
  content = content.replace(spCounterRe3, '<p class="text-lg font-bold text-[#002080]">Included</p>');

  // Cloud solutions hero stat
  content = content.replace(
    /<p class="text-2xl font-bold text-\[#2563EB\]">99\.99%<\/p>/,
    '<p class="text-sm font-semibold text-[#2563EB]">High availability</p>'
  );
  content = content.replace(
    /with 99\.99% uptime SLAs and proven/,
    'with reliable uptime SLAs and proven'
  );

  // Analytics demo dashboard numbers
  content = content.replace(
    /<p class="text-2xl font-bold">\$12\.8M<\/p><p class="text-xs text-slate-500">42 deals<\/p>/,
    '<p class="text-sm font-semibold text-slate-800">Pipeline overview</p><p class="text-xs text-slate-500">Active deals</p>'
  );
  content = content.replace(
    /<p class="text-2xl font-bold text-amber-600">8<\/p><p class="text-xs text-slate-500">accounts flagged<\/p>/,
    '<p class="text-sm font-semibold text-amber-600">At-risk accounts</p><p class="text-xs text-slate-500">Flagged for review</p>'
  );
  content = content.replace(
    /<p class="text-2xl font-bold text-\[#21759B\]">500\+<\/p><p class="text-xs text-slate-500">Sites maintained<\/p>/,
    '<p class="text-sm font-semibold text-[#21759B]">Ongoing maintenance</p><p class="text-xs text-slate-500">Sites supported</p>'
  );

  if (content !== orig) {
    fs.writeFileSync(fp, content);
    count++;
    console.log('Updated', file);
  }
}
console.log(`Done. ${count} service files updated.`);
