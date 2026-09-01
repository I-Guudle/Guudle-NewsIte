/**
 * Remove Enterprise Technology Hub sections from all HTML pages.
 * Run: node tools/remove-tech-hub-section.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const HUB_IDS =
  'svc-tech-hub|svc-tech-stack|wdev-tech-hub|ecom-tech-hub|cld-tech-hub|cma-tech-hub|mkt-tech-hub';

const SECTION_RE = new RegExp(
  `<section id="(?:${HUB_IDS})" class="(?:eth-v3|eth-hub|tech-hub-cta)[\\s\\S]*?<\\/section>\\s*`,
  'g'
);

const HOME_TECH_STACK_RE =
  /<section[^>]*id="tech-stack-section"[\s\S]*?<\/section>\s*/g;

const STICKY_LINK_RE =
  /<a href="#(?:svc-tech-hub|svc-tech-stack|wdev-tech-hub|ecom-tech-hub|cld-tech-hub|cma-tech-hub|mkt-tech-hub)"[^>]*>[\s\S]*?<\/a>\s*/g;

const ASSET_RE = [
  /\s*<link rel="stylesheet" href="(?:\.\.\/){0,2}assets\/css\/tech-hub-section\.css">\s*\n?/g,
  /\s*<link rel="stylesheet" href="(?:\.\.\/){0,2}assets\/css\/tech-hub-cta\.css">\s*\n?/g,
  /\s*<script src="(?:\.\.\/){0,2}assets\/js\/tech-hub-v3\.js"><\/script>\s*\n?/g,
];

function walkHtmlFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === 'july2026' || name === 'node_modules') continue;
      walkHtmlFiles(full, out);
    } else if (name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const LINK_RE = [
  /<a href="(?:\.\.\/){0,2}(?:pages\/)?technology\.html(?:#[^"]*)?"[^>]*class="ind-serve-v2__btn ind-serve-v2__btn--primary"[^>]*>Explore Technology Hub[\s\S]*?<\/a>\s*/g,
  /<a href="(?:\.\.\/){0,2}(?:pages\/)?technology\.html(?:#[^"]*)?"[^>]*class="svc-related__link"[^>]*>[\s\S]*?Technology Hub[\s\S]*?<\/a>/g,
  /<a href="(?:\.\.\/){0,2}(?:pages\/)?technology\.html(?:#[^"]*)?"[^>]*class="ai-svc-hub__tech-btn"[^>]*>[\s\S]*?<\/a>\s*/g,
  /<a href="(?:\.\.\/){0,2}(?:pages\/)?technology\.html(?:#[^"]*)?"[^>]*class="ai-svc-hub__inline-link"[^>]*>Technology Hub<\/a>/g,
  /<a href="(?:\.\.\/){0,2}(?:pages\/)?technology\.html(?:#[^"]*)?"[^>]*>Explore Our Technology Stack[\s\S]*?<\/a>\s*/g,
  /<a href="technology\.html"[^>]*>Technology<\/a>/g,
];

function patchHtml(html) {
  let out = html;
  out = out.replace(SECTION_RE, '');
  out = out.replace(HOME_TECH_STACK_RE, '');
  out = out.replace(STICKY_LINK_RE, '');
  for (const re of ASSET_RE) out = out.replace(re, '\n');
  for (const re of LINK_RE) out = out.replace(re, '');
  return out;
}

let count = 0;
const files = [
  ...walkHtmlFiles(path.join(root, 'pages')),
  path.join(root, 'index.html'),
].filter((f) => fs.existsSync(f));

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = patchHtml(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    console.log('  cleaned:', path.relative(root, file));
    count++;
  }
}

console.log(`\nTech Hub section removal — ${count} file(s) cleaned.`);
