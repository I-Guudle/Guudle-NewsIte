/** QA: fail if unverifiable stats or old email remain in main site. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const BAD_PATTERNS = [
  { re: /hello@guudle\.com/i, label: 'old email' },
  { re: /data-pf-count|data-cs-count|data-ct-count|data-corp-count|data-counter|data-sp-counter/i, label: 'counter attribute' },
  { re: /Projects Delivered|Active Clients|Years Experience|Client Satisfaction|Happy Clients/i, label: 'stat heading' },
  { re: /initCounters|initServiceCounters|animateCounter/i, label: 'counter JS' },
];

function collectFiles() {
  const files = [];
  const index = path.join(ROOT, 'index.html');
  if (fs.existsSync(index)) files.push(index);
  for (const dir of ['pages', 'assets', 'api']) {
    const base = path.join(ROOT, dir);
    if (!fs.existsSync(base)) continue;
    (function walk(d) {
      for (const name of fs.readdirSync(d)) {
        const fp = path.join(d, name);
        if (fs.statSync(fp).isDirectory()) walk(fp);
        else if (/\.(html|js|php|css)$/.test(name)) files.push(fp);
      }
    })(base);
  }
  return files;
}

let issues = 0;
for (const fp of collectFiles()) {
  const rel = path.relative(ROOT, fp);
  const text = fs.readFileSync(fp, 'utf8');
  for (const { re, label } of BAD_PATTERNS) {
    if (re.test(text)) {
      const m = text.match(re);
      console.log(`FAIL [${label}] ${rel}: ${m[0]}`);
      issues++;
    }
  }
}

if (issues) {
  console.log(`\n${issues} issue(s) found.`);
  process.exit(1);
}
console.log('PASS — no counter attributes, stat headings, old email, or counter JS in main site.');
