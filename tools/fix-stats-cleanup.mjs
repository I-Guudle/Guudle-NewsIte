/** Second-pass cleanup for partial stat removals. Run: node tools/fix-stats-cleanup.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { csValueGrid, pfOverviewValueGrid, whyPartnerSection, serviceInlineValueGrid } from './value-props.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function patch(fp, fn) {
  if (!fs.existsSync(fp)) return;
  const orig = fs.readFileSync(fp, 'utf8');
  const next = fn(orig);
  if (next !== orig) {
    fs.writeFileSync(fp, next);
    console.log('Fixed', path.relative(ROOT, fp));
  }
}

function cleanCsStatRemnants(c) {
  return c.replace(
    /(<div class="cs-value-grid">[\s\S]*?<\/div>)([\s\S]*?)(?=\s*<\/div>\s*<\/div>\s*<\/section>)/g,
    (m, grid, junk) => (junk.includes('cs-stat') || junk.includes('data-cs-count') ? grid : m)
  );
}

function cleanContact(c) {
  return c.replace(
    /<div class="ct-stat-lbl">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    '</div>\n      </div>\n    </section>'
  );
}

function cleanPortfolio(c) {
  return c.replace(
    /    <!-- ═══ PORTFOLIO OVERVIEW STATS ═══ -->[\s\S]*?    <\/section>\n\n    <!-- ═══ FEATURED PROJECTS/,
    `    <!-- Why Choose Guudle -->
    <section class="pf-section" aria-labelledby="pf-values-heading">
      <div class="pf-container">
        <div class="pf-section-head pf-reveal">
          <h2 id="pf-values-heading">Why Choose Guudle IT Solutions</h2>
          <p>Enterprise-grade development backed by proven delivery practices.</p>
        </div>
        ${pfOverviewValueGrid()}
      </div>
    </section>

    <!-- ═══ FEATURED PROJECTS`
  );
}

function cleanHrms(c) {
  return c.replace(
    /(<div class="grid grid-cols-2 gap-6 sp-reveal-right">[\s\S]*?<\/div>)\s*(?:<div class="sp-card p-6">[\s\S]*?<\/div>\s*){1,4}\s*<\/div>/,
    '$1'
  );
}

function cleanWhyPartnerAlt(c) {
  const re = /    <!-- Why Partner With Guudle -->[\s\S]*?    <\/section>\n\n    <!-- Technology Stack -->/g;
  if (re.test(c)) return c.replace(re, whyPartnerSection() + '\n\n    <!-- Technology Stack -->');
  const re2 = /    <!-- Why Partner -->[\s\S]*?Projects Delivered[\s\S]*?    <\/section>\n\n    <!-- Technology Stack -->/g;
  return c.replace(re2, whyPartnerSection() + '\n\n    <!-- Technology Stack -->');
}

function cleanWorkflowAutomation(c) {
  return c.replace(
    /<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">\s*<div class="sp-card-navy p-6">[\s\S]*?80%[\s\S]*?<\/div>\s*<\/div>/,
    serviceInlineValueGrid()
  );
}

function cleanOrphanStatCards(c) {
  return c.replace(
    /(<div class="grid grid-cols-2 gap-6 sp-reveal-right">[\s\S]*?<\/div><\/div>)(?:<div class="sp-card p-6[\s\S]*?<p class="text-3xl font-bold[\s\S]*?<\/div>)+/g,
    '$1'
  );
}

function cleanNarrativeStats(c) {
  c = c.replace(/<p class="text-sm font-semibold mt-2" style="color:var\(--corp-accent\)">[^<]+<\/p>/g, '');
  c = c.replace(/Built teams delivering 50\+ apps with 4\.8★ average store ratings\./g,
    'Full-stack and mobile engineering leader focused on quality delivery and team excellence.');
  c = c.replace(/<div class="cs-dash-panel"><strong>[^<]+<\/strong><span class="text-xs text-white\/50">[^<]+<\/span><\/div>/g,
    '<div class="cs-dash-panel"><strong>—</strong><span class="text-xs text-white/50">Live metrics</span></div>');
  c = c.replace(/handles 500K patients across 8 countries/g, 'serves patients across multiple regions');
  c = c.replace(/From MVP to 200 paying customers in year one/g, 'From MVP to a growing customer base in year one');
  c = c.replace(/scaled sales from \$20M to \$80M ARR/g, 'scaled sales operations with unified architecture');
  c = c.replace(/with \$18M TVL within 90 days/g, 'with strong early adoption after mainnet launch');
  c = c.replace(/reduced our inventory waste by 30%/g, 'improved our inventory efficiency measurably');
  c = c.replace(/\+340% YoY · 200 paying customers/g, 'Subscription growth and customer adoption');
  c = c.replace(/847 docs indexed · Live inference/g, 'Document indexing · Live inference');
  c = c.replace(/200 tenants · Stripe billing/g, 'Multi-tenant · Stripe billing');
  c = c.replace(/serving 200\+ B2B customers in year one/g, 'serving B2B customers in year one');
  c = c.replace(/Single inventory view across 200\+ stores\./g, 'Single inventory view across retail locations.');
  c = c.replace(/<div class="cs-case-metric"><strong>[^<]+<\/strong><span>[^<]+<\/span><\/div>/g, '');
  return c;
}

function cleanFakeMetrics(c) {
  return c;
}

function cleanSpCounterCards(c) {
  return c.replace(/<div class="sp-card p-6"><p class="text-3xl font-bold[^"]*"[^>]*data-counter="[^"]*"[^>]*>[\s\S]*?<\/div>\s*/g, '');
}

for (const fp of fs.readdirSync(path.join(ROOT, 'pages')).flatMap((f) => {
  const p = path.join(ROOT, 'pages', f);
  if (f.endsWith('.html')) return [p];
  if (fs.statSync(p).isDirectory() && f === 'portfolio') {
    return fs.readdirSync(p).filter((x) => x.endsWith('.html')).map((x) => path.join(p, x));
  }
  if (fs.statSync(p).isDirectory() && f === 'services') {
    return fs.readdirSync(p).filter((x) => x.endsWith('.html')).map((x) => path.join(p, x));
  }
  return [];
})) {
  patch(fp, (c) => {
    let n = c;
    n = cleanCsStatRemnants(n);
    n = cleanOrphanStatCards(n);
    n = cleanNarrativeStats(n);
    n = cleanFakeMetrics(n);
    n = cleanSpCounterCards(n);
    n = cleanWhyPartnerAlt(n);
    if (fp.endsWith('contact.html')) n = cleanContact(n);
    if (fp.endsWith('portfolio.html')) n = cleanPortfolio(n);
    if (fp.endsWith('hrms.html')) n = cleanHrms(n);
    if (fp.endsWith('workflow-automation.html')) n = cleanWorkflowAutomation(n);
    return n;
  });
}

patch(path.join(ROOT, 'pages', 'case-studies.html'), cleanCsStatRemnants);

console.log('Cleanup pass done.');
