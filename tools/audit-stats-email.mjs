/**
 * Site-wide audit: remove unverifiable statistics & standardize email to info@guudle.com
 * Run: node tools/audit-stats-email.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  serviceHeroValueGrid,
  serviceInlineValueGrid,
  corpValueGrid,
  csValueGrid,
  pfHeroValuePills,
  pfOverviewValueGrid,
  whyPartnerSection,
} from './value-props.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['222', '111', 'node_modules', '.git']);

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) walk(fp, acc);
    else acc.push(fp);
  }
  return acc;
}

function patchFile(fp, transform) {
  let content = fs.readFileSync(fp, 'utf8');
  const next = transform(content);
  if (next !== content) {
    fs.writeFileSync(fp, next);
    return true;
  }
  return false;
}

const whyPartnerRe = /    <!-- Why Partner -->[\s\S]*?    <\/section>\n\n    <!-- Technology Stack -->/g;

const corpStatsRe = /<div class="corp-stats">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/section>)/g;
const csStatsRe = /<div class="cs-stats">[\s\S]*?<\/div>/g;
const ctStatsRowRe = /\s*<div class="ct-stats-row ct-reveal">[\s\S]*?<\/div>\s*/g;

const pfHeroStatsRe = /<div class="pf-hero-stats"[\s\S]*?<\/div>\s*(?=<\/div>\s*<div class="pf-hero-visual)/;
const pfStatsSectionRe = /    <!-- ═══ PORTFOLIO OVERVIEW STATS ═══ -->[\s\S]*?    <\/section>\n\n/;

const heroGridRe = /<div class="grid grid-cols-2 gap-6 sp-reveal-right">[\s\S]*?<\/div>/g;
const hrmsGridRe = /<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">\s*<div class="sp-card-navy p-6">[\s\S]*?<\/div>\s*<\/div>/g;

const csCaseMetricsRe = /<div class="cs-case-metrics">[\s\S]*?<\/div>/g;
const csCaseMetricBlockRe = /<div class="cs-case-metric"><strong>[^<]+<\/strong><span>[^<]+<\/span><\/div>/g;

const glassdoorStatRe = /<div class="corp-stat corp-reveal corp-d4"><div class="corp-stat-val">4\.8[\s\S]*?<\/div><\/div>/g;

const textFixes = [
 [/hello@guudle\.com/g, 'info@guudle.com'],
 [/Senior engineers, designers, and architects with 10\+ years of enterprise delivery\./g,
   'Senior engineers, designers, and architects focused on enterprise delivery.'],
 [/Teams across time zones serving clients in 40\+ countries\./g,
   'Teams across time zones supporting clients worldwide.'],
 [/Collaborate across 40\+ countries\./g, 'Collaborate with distributed global teams.'],
 [/For over 15 years, Guudle/g, 'Guudle'],
 [/15\+ years of enterprise technology excellence/g, 'enterprise technology excellence'],
 [/and 15\+ years of enterprise/g, 'and enterprise'],
 [/Crossed 500 enterprise deliveries across 15 industries\./g,
   'Expanded enterprise delivery across multiple industries.'],
 [/<h3>500\+ Projects<\/h3>/g, '<h3>Enterprise Growth</h3>'],
 [/In-depth case studies with challenges, solutions, and measurable business results\./g,
   'In-depth case studies with challenges, solutions, and business outcomes.'],
 [/metrics: \[\[[^\]]+\][^\]]*\],/g, 'metrics: [],'],
];

function transformHtml(content) {
  let c = content;
  for (const [re, rep] of textFixes) c = c.replace(re, rep);

  c = c.replace(corpStatsRe, corpValueGrid());
  c = c.replace(csStatsRe, csValueGrid());
  c = c.replace(ctStatsRowRe, '\n');
  c = c.replace(pfHeroStatsRe, pfHeroValuePills() + '\n        ');
  c = c.replace(pfStatsSectionRe,
    `    <!-- Why Choose Guudle -->
    <section class="pf-section" aria-labelledby="pf-values-heading">
      <div class="pf-container">
        <div class="pf-section-head pf-reveal">
          <h2 id="pf-values-heading">Why Choose Guudle IT Solutions</h2>
          <p>Enterprise-grade development without unverified marketing claims — just proven delivery practices.</p>
        </div>
        ${pfOverviewValueGrid()}
      </div>
    </section>

`);
  c = c.replace(whyPartnerRe, whyPartnerSection() + '\n\n    <!-- Technology Stack -->');
  c = c.replace(heroGridRe, serviceHeroValueGrid());
  c = c.replace(hrmsGridRe, serviceInlineValueGrid());
  c = c.replace(glassdoorStatRe, '');

  // Inline sp-card stat grids (it-consulting, workflow-automation, legacy-modernization)
  c = c.replace(
    /<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">\s*(?:<div class="sp-card[^"]* p-6">[\s\S]*?<\/div>\s*){2,4}<\/div>/g,
    (match) => (match.includes('text-3xl font-bold') ? serviceInlineValueGrid() : match)
  );

  // QA demo metric
  c = c.replace(/<div class="sp-qa-metric"[^>]*>[\s\S]*?<\/div>/g,
    '<div class="sp-qa-metric" style="color:#22C55E"><i class="fas fa-check-circle text-2xl" aria-hidden="true"></i></div>');

  // Case study outcome metric rows → qualitative highlights
  c = c.replace(csCaseMetricsRe, (block) => {
    const spans = [...block.matchAll(/<span>([^<]+)<\/span>/g)].map((m) => m[1]);
    if (!spans.length) return '';
    return `<ul class="cs-case-outcomes">${spans.map((s) => `<li><i class="fas fa-check" aria-hidden="true"></i>${s}</li>`).join('')}</ul>`;
  });

  // Hero AI demo bars with fake percentages
  c = c.replace(/<span>98%<\/span>/g, '<span>High</span>');
  c = c.replace(/<span>120ms<\/span>/g, '<span>Low</span>');
  c = c.replace(/<span>2%<\/span>/g, '<span>Stable</span>');

  return c;
}

function transformJs(content) {
  let c = content.replace(/hello@guudle\.com/g, 'info@guudle.com');
  return c;
}

function transformPhp(content) {
  return content.replace(/hello@guudle\.com/g, 'info@guudle.com');
}

let updated = 0;

for (const fp of walk(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.html'))) {
  if (patchFile(fp, transformHtml)) { console.log('HTML', path.relative(ROOT, fp)); updated++; }
}

const indexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(indexPath) && patchFile(indexPath, transformHtml)) {
  console.log('HTML index.html'); updated++;
}

for (const fp of walk(path.join(ROOT, 'assets')).filter((f) => f.endsWith('.js'))) {
  if (patchFile(fp, transformJs)) { console.log('JS', path.relative(ROOT, fp)); updated++; }
}

for (const fp of walk(path.join(ROOT, 'api')).filter((f) => f.endsWith('.php'))) {
  if (patchFile(fp, transformPhp)) { console.log('PHP', path.relative(ROOT, fp)); updated++; }
}

console.log(`\nAudit pass complete. ${updated} files updated.`);
