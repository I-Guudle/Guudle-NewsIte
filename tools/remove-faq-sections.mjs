/**
 * Strip FAQ sections and scripts from all HTML pages.
 * Run: node tools/remove-faq-sections.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP = new Set(['node_modules', '.git', 'june2026', '222']);
let updated = 0;

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP.has(ent.name)) continue;
      walk(p);
      continue;
    }
    if (!ent.name.endsWith('.html')) continue;
    let html = fs.readFileSync(p, 'utf8');
    const orig = html;

    html = html.replace(/<section[^>]*\bid="(?:svc-faq|tech-faq|oproc-faq|cld-faq|cma-faq|ecom-faq|wdev-faq|msl-faq|mkt-faq|pre-faq|ent-faq)"[^>]*>[\s\S]*?<\/section>\s*/gi, '');
    html = html.replace(/<!-- FAQ -->[\s\S]*?<section class="ct-section ct-section--gray"[\s\S]*?<\/section>\s*/gi, '');
    html = html.replace(/<a href="#(?:svc-faq|tech-faq|oproc-faq|cld-faq|cma-faq|ecom-faq|wdev-faq|msl-faq|mkt-faq|pre-faq|ct-faq)"[^>]*>FAQ<\/a>\s*/gi, '');
    html = html.replace(/\s*<script src="[^"]*faq-enterprise\.js"><\/script>/gi, '');
    html = html.replace(/\s*<link rel="stylesheet" href="[^"]*faq-enterprise\.css">/gi, '');

    if (html !== orig) {
      fs.writeFileSync(p, html, 'utf8');
      updated++;
      console.log('  stripped:', path.relative(root, p).replace(/\\/g, '/'));
    }
  }
}

walk(root);
console.log(`\nStripped FAQ from ${updated} page(s).`);
