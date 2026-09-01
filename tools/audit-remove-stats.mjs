/**
 * Audit service pages — fail if vanity metrics / stat sections remain.
 * Run: node tools/audit-remove-stats.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'pages', 'services');
const extraPages = [path.join(root, 'pages', 'technology.html')];

const BLOCK_PATTERNS = [
  { id: 'cma-results', re: /<section[^>]*\bid="cma-results"[^>]*>/i, label: 'cma-results stats section' },
  { id: 'svc-stats', re: /<section[^>]*\bid="svc-stats"[^>]*>/i, label: 'svc-stats band' },
  { id: 'svc-results', re: /<section[^>]*\bid="svc-results"[^>]*>/i, label: 'svc-results KPI section' },
  { id: 'wdev-stats', re: /<section[^>]*\bid="wdev-stats"[^>]*>/i, label: 'wdev-stats section' },
  { id: 'mkt-stats', re: /<section[^>]*\bid="mkt-stats"[^>]*>/i, label: 'mkt-stats section' },
  { id: 'data-svc-stat', re: /data-svc-stat/i, label: 'animated svc stat counter' },
  { id: 'data-sp-counter', re: /data-sp-counter/i, label: 'sp counter attribute' },
  { id: 'cma-cap-stat', re: /cma-cap-stat/i, label: 'capability stat block' },
  { id: 'ptr-v3__stat', re: /ptr-v3__stat/i, label: 'ecosystem stat card' },
  { id: 'data-mkt-count', re: /data-mkt-count/i, label: 'marketing count animation' },
  { id: 'data-gproc-count', re: /data-gproc-count/i, label: 'process count animation' },
  { id: 'sp-stat-pill', re: /sp-stat-pill/i, label: 'stat pill row' },
  { id: 'dev-stat-card', re: /dev-stat-card/i, label: 'dev stat card' },
  { id: 'svc-kpi', re: /svc-kpi/i, label: 'svc KPI card' },
  { id: 'vanity-metric-grid', re: /font-extrabold text-cyan-400 mb-2">\s*[\+\d]/i, label: 'marketing vanity metric grid' },
  { id: 'tech-hero-stats', re: /tech-hero-v2__stats|data-tech-hero-stat/i, label: 'technology hero stats' },
  { id: 'tech-hub-stats', re: /tech-stack-hub__stats|tech-industry-hub__stats/i, label: 'technology hub stats' },
];

const files = [
  ...fs.readdirSync(servicesDir).filter((f) => f.endsWith('.html')).map((f) => path.join(servicesDir, f)),
  ...extraPages.filter((f) => fs.existsSync(f)),
];
const failures = [];

for (const filePath of files.sort()) {
  const file = path.basename(filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  for (const { id, re, label } of BLOCK_PATTERNS) {
    if (re.test(html)) {
      failures.push({ file, id, label });
    }
  }
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} issue(s) found:\n`);
  for (const f of failures) {
    console.error(`  ${f.file}: ${f.label} (${f.id})`);
  }
  process.exit(1);
}

console.log(`PASS — ${files.length} service pages audited; no stat/counter sections detected.`);
