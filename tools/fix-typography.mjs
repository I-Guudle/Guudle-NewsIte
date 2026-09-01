#!/usr/bin/env node
/**
 * Batch-fix inline typography colors and misaligned Tailwind text utilities.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');

const REPLACEMENTS = [
  [/style="color:#37474F"/gi, ''],
  [/style="color: #37474F"/gi, ''],
  [/style="color:#546E7A"/gi, 'class="text-slate-500"'],
  [/style="color: #546E7A"/gi, 'class="text-slate-500"'],
  [/text-slate-800\b/g, 'text-slate-900'],
  [/text-gray-800\b/g, 'text-gray-900'],
  [/text-gray-600\b/g, 'text-slate-600'],
  [/text-gray-500\b/g, 'text-slate-500'],
  [/text-gray-400\b/g, 'text-slate-500'],
  [/text-gray-300\b/g, 'text-slate-600'],
  [/text-gray-200\b/g, 'text-slate-600'],
  [/font-extrabold text-white mb-4/g, 'font-extrabold text-slate-900 mb-4'],
  [/font-bold text-white mb-2/g, 'font-bold mb-2'],
];

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', 'june2026', '222', '111', '.git'].includes(name)) continue;
      walkHtml(p, out);
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walkHtml(ROOT)) {
  const rel = relative(ROOT, file);
  if (rel.startsWith('june2026') || rel.startsWith('222') || rel.startsWith('111')) continue;

  let html = readFileSync(file, 'utf8');
  const orig = html;
  for (const [re, rep] of REPLACEMENTS) {
    html = html.replace(re, rep);
  }
  if (html !== orig) {
    writeFileSync(file, html, 'utf8');
    changed++;
    console.log(`  updated ${rel}`);
  }
}

console.log(`\nfix-typography: ${changed} HTML file(s) updated`);
