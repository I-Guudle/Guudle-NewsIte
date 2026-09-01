/**
 * Remove static vanity metrics, stat sections, and placeholder counters from HTML.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['111', 'node_modules', 'june2026', '222', 'tools']);

const VALUE_PILLS = `<div class="slp-value-pills" data-aos="fade-up" data-aos-delay="200">
  <span class="slp-value-pill"><i class="fas fa-layer-group" aria-hidden="true"></i> Scalable Architecture</span>
  <span class="slp-value-pill"><i class="fas fa-shield-halved" aria-hidden="true"></i> Security Focused</span>
  <span class="slp-value-pill"><i class="fas fa-code" aria-hidden="true"></i> Modern Technology</span>
  <span class="slp-value-pill"><i class="fas fa-headset" aria-hidden="true"></i> Dedicated Support</span>
</div>`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function cleanHtml(html) {
  let out = html;
  let changed = false;

  // Remove process metrics strip (static numbers)
  const devprocStripRe = /<div class="devproc-strip"[\s\S]*?<\/div>\s*/gi;
  if (devprocStripRe.test(out)) {
    out = out.replace(devprocStripRe, '');
    changed = true;
  }
  const devprocStripOrphansRe = /(?:<div class="devproc-strip__item">[\s\S]*?<\/div>\s*)+<\/div>\s*(?=<div class="devproc-journey")/gi;
  if (devprocStripOrphansRe.test(out)) {
    out = out.replace(devprocStripOrphansRe, '');
    changed = true;
  }

  // Remove mkt stat rows
  const mktStatsRe = /<section[^>]*\bid="mkt-stats"[^>]*>[\s\S]*?<\/section>/gi;
  if (mktStatsRe.test(out)) {
    out = out.replace(mktStatsRe, '');
    changed = true;
  }

  // Remove marketing CMA results stats band
  const cmaResultsRe = /<section[^>]*\bid="cma-results"[^>]*>[\s\S]*?<\/section>/gi;
  if (cmaResultsRe.test(out)) {
    out = out.replace(cmaResultsRe, '');
    changed = true;
  }

  // Remove full stats sections (id contains "stats")
  const statsSectionRe = /<section[^>]*\bid="[^"]*stats[^"]*"[^>]*>[\s\S]*?<\/section>/gi;
  if (statsSectionRe.test(out)) {
    out = out.replace(statsSectionRe, '');
    changed = true;
  }

  // Remove pf-hero-stats blocks
  const pfStatsRe = /<div[^>]*class="[^"]*pf-hero-stats[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
  if (pfStatsRe.test(out)) {
    out = out.replace(pfStatsRe, '');
    changed = true;
  }

  // Remove hero stat grids containing data-*-count
  const heroGridRe = /<div class="grid grid-cols-2[^"]*"[^>]*data-aos[^>]*>[\s\S]*?data-[a-z]+-count[\s\S]*?<\/div>/gi;
  if (heroGridRe.test(out)) {
    out = out.replace(heroGridRe, VALUE_PILLS);
    changed = true;
  }

  // Remove any remaining grid with count attributes
  const anyCountGridRe = /<div class="grid[^"]*"[^>]*>[\s\S]*?data-[a-z]+-count[\s\S]*?<\/div>\s*<\/div>/gi;
  while (anyCountGridRe.test(out)) {
    out = out.replace(anyCountGridRe, (match) => {
      if (match.includes('data-') && match.includes('-count')) {
        changed = true;
        return VALUE_PILLS;
      }
      return match;
    });
    break;
  }

  // Remove individual elements with data-*-count
  const countElRe = /<[^>]+data-[a-z]+-count[^>]*>[\s\S]*?<\/[^>]+>/gi;
  if (countElRe.test(out)) {
    out = out.replace(countElRe, '');
    changed = true;
  }

  // Remove stat cards
  const statCardRe = /<div class="[^"]*stat-card[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
  if (statCardRe.test(out)) {
    out = out.replace(statCardRe, '');
    changed = true;
  }

  // Remove sticky nav Impact links
  out = out.replace(/\s*<a[^>]*href="#[^"]*stats[^"]*"[^>]*>[\s\S]*?<\/a>/gi, () => {
    changed = true;
    return '';
  });

  // Remove download brochure / PDF CTAs
  out = out.replace(/<a[^>]*>[^<]*Download (Brochure|PDF|Catalog|Whitepaper|Presentation|Company Profile)[^<]*<\/a>/gi, () => {
    changed = true;
    return '';
  });

  // Case study vanity stat badges → qualitative tags
  const caseStatMap = [
    [/<span class="mob-case__stat">500K\+ Downloads<\/span>/g, '<span class="mob-case__stat">Consumer App</span>'],
    [/<span class="mob-case__stat">200K Active Users<\/span>/g, '<span class="mob-case__stat">Healthcare Platform</span>'],
    [/<span class="mob-case__stat">£12M Transaction Volume<\/span>/g, '<span class="mob-case__stat">Enterprise FinTech</span>'],
    [/<span class="and-case__tag">2M\+ Downloads<\/span>/g, '<span class="and-case__tag">Food &amp; Delivery</span>'],
    [/<span class="wa-case__stat">2M\+ Active Users<\/span>/g, '<span class="wa-case__stat">Marketplace Platform</span>'],
    [/<p class="text-xs font-bold text-primary mb-1"><i class="fas fa-download mr-1"><\/i> 1M\+ installs<\/p>/g, '<p class="text-xs font-bold text-primary mb-1"><i class="fas fa-mobile-screen mr-1"></i> Play Store ready</p>'],
    [/<p class="text-xs text-slate-500">50K\+ reviews<\/p>/g, '<p class="text-xs text-slate-500">User feedback</p>'],
    [/<div class="tex-eco__count">\d+ technologies<\/div>/g, '<div class="tex-eco__count">Core stack</div>'],
    [/<div class="tex-eco__count">\d+ capabilities<\/div>/g, '<div class="tex-eco__count">Key capabilities</div>'],
  ];
  for (const [re, rep] of caseStatMap) {
    if (re.test(out)) {
      out = out.replace(re, rep);
      changed = true;
    }
  }

  // Any case study badge with digits, %, or vanity scale → qualitative tag
  const caseBadgeRe = /<span class="([^"]*case__(?:stat|tag)[^"]*)">[^<]*(?:\d|%|\+|K|M|£|\$)[^<]*<\/span>/gi;
  if (caseBadgeRe.test(out)) {
    out = out.replace(caseBadgeRe, '<span class="$1">Client Success</span>');
    changed = true;
  }

  // Standalone vanity metric cards (e.g. 15+ Industries served)
  const vanityCardRe = /<div class="sp-card p-6"><p class="text-3xl font-bold[^"]*">[^<]*(?:\d|%|\+)[^<]*<\/p><p class="text-slate-500[^"]*">[^<]*<\/p><\/div>/gi;
  if (vanityCardRe.test(out)) {
    out = out.replace(vanityCardRe, '');
    changed = true;
  }

  // Mock dashboard / UI growth metrics
  const mockMetricMap = [
    [/<p class="text-accent text-sm font-bold">\+142% Growth<\/p>/g, '<p class="text-accent text-sm font-bold">User Engagement</p>'],
    [/<p class="text-white\/50 text-xs">\+18% conversion<\/p>/g, '<p class="text-white/50 text-xs">Conversion uplift</p>'],
    [/<p class="text-white text-xs font-bold"><i class="fas fa-chart-line mr-1 text-accent"><\/i> \+38% conversions<\/p>/g, '<p class="text-white text-xs font-bold"><i class="fas fa-chart-line mr-1 text-accent"></i> Conversion uplift</p>'],
    [/<p class="slp-display text-2xl font-extrabold mb-1">\+42% task completion<\/p>/g, '<p class="slp-display text-2xl font-extrabold mb-1">Improved task completion</p>'],
    [/Customer churn risk down 22% after/gi, 'Customer churn risk reduced after'],
    [/\+54% qualified inquiries/gi, 'strong growth in qualified inquiries'],
  ];
  for (const [re, rep] of mockMetricMap) {
    if (re.test(out)) {
      out = out.replace(re, rep);
      changed = true;
    }
  }

  // Soft metric copy replacements
  const replacements = [
    [/15\+ years shipping/gi, 'Proven experience shipping'],
    [/Serving \d+\+ Countries/gi, 'Serving organizations worldwide'],
    [/Countries Served/gi, 'Industry Expertise'],
    [/Combined Downloads/gi, 'Mobile Expertise'],
    [/Apps Launched/gi, 'App Delivery'],
    [/Global Delivery/gi, 'Dedicated Delivery'],
    [/Proven Delivery/gi, 'Quality Delivery'],
    [/500K downloads in year one; 4\.8★ average rating on both stores\./gi, 'Strong App Store adoption and consistently high user ratings across both stores.'],
    [/200K monthly active users; 40% reduction in call center volume\./gi, 'Sustained patient engagement with measurable reduction in call center volume.'],
    [/£12M monthly transaction volume; 99\.97% uptime since launch\./gi, 'Reliable transaction processing with enterprise-grade uptime since launch.'],
    [/Revenue tripled in 18 months; 2M\+ active users on the platform\./gi, 'Revenue growth and platform adoption scaled across multiple markets.'],
    [/2M\+ registered users; 40% customer retention increase after UX overhaul\./gi, 'Improved user registration flows and measurable retention gains after UX overhaul.'],
    [/Reached #3 in Finance category with 500K downloads in 4 months\./gi, 'Featured finance experience with rapid App Store traction after launch.'],
    [/From marketplace concept to 10,000\+ transactions monthly/gi, 'From marketplace concept to a scalable transaction platform'],
    [/We hit 500K downloads in six months with zero policy violations\./gi, 'We launched on the Play Store with zero policy violations and strong early adoption.'],
    [/70% of processes automated; 45% operational cost reduction within first year\./gi, 'Majority of processes automated with measurable operational cost reduction within the first year.'],
    [/70% of manual processes automated; inventory accuracy improved to 99\.2%\./gi, 'Manual processes automated with significantly improved inventory accuracy.'],
    [/Operations 50% faster; customer retention up 40%; delivery costs down 22%\./gi, 'Faster operations, improved customer retention, and lower delivery costs.'],
    [/Revenue tripled in 18 months; customer churn reduced 28% with integrated analytics\./gi, 'Revenue growth and reduced churn with integrated analytics.'],
    [/4\.7★ rating, 2M downloads, 40% faster order completion\./gi, 'Strong Play Store ratings and faster order completion.'],
    [/70% reduction in paperwork, 99\.5% sync reliability offline\./gi, 'Significant reduction in paperwork with reliable offline sync.'],
    [/\$2\.4M ARR in 24 months, 99\.95% uptime, 2\.1% monthly churn\./gi, 'Sustainable recurring revenue with reliable uptime and controlled churn.'],
    [/50K paying subscribers, 40% gross margin, Series A funded\./gi, 'Growing subscriber base, healthy margins, and successful funding round.'],
    [/10K users in first week, 40% repeat rate proved product-market fit\./gi, 'Strong early adoption and repeat usage proved product-market fit.'],
    [/Active users tripled within six months; support calls dropped 35% after launch\./gi, 'User engagement grew steadily while support volume decreased after launch.'],
    [/Dispatch time cut by 40%; on-time delivery improved to 96% within the first quarter\./gi, 'Faster dispatch and improved on-time delivery within the first quarter.'],
    [/Infrastructure spend reduced 60%; release cycle moved from monthly to bi-weekly\./gi, 'Lower infrastructure spend and faster release cadence.'],
    [/70% of processes automated; 45% cost reduction within the first year\./gi, 'Majority of processes automated with measurable cost reduction within the first year.'],
    [/adopted by 95% of field staff within the first month/gi, 'adopted quickly by field staff within the first month'],
    [/Test coverage went from 40% to 87% in three months/gi, 'Test coverage expanded significantly in three months'],
    [/churn dropped 35% after the analytics dashboard launch/gi, 'churn improved after the analytics dashboard launch'],
    [/support tickets by 40% and improved user engagement/gi, 'support tickets and improved user engagement'],
    [/Guudle.s phased approach kept our operations running while delivering 65% process automation/gi, 'Guudle phased approach kept our operations running while delivering substantial process automation'],
    [/data-aos-count[^>]*/gi, ''],
  ];
  for (const [re, rep] of replacements) {
    if (re.test(out)) {
      out = out.replace(re, rep);
      changed = true;
    }
  }

  // Clean empty lines
  out = out.replace(/\n{4,}/g, '\n\n\n');

  return { html: out, changed };
}

let total = 0;
for (const file of [...walk(path.join(root, 'pages')), path.join(root, 'index.html')]) {
  if (!fs.existsSync(file)) continue;
  const original = fs.readFileSync(file, 'utf8');
  const { html, changed } = cleanHtml(original);
  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    total++;
    console.log('Cleaned:', path.relative(root, file));
  }
}
console.log(`\nDone — ${total} files updated.`);
