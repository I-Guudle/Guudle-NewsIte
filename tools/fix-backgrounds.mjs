#!/usr/bin/env node
/**
 * Batch-neutralize inline dark section backgrounds in HTML files.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');

const REPLACEMENTS = [
  [/bg-gradient-to-br from-navy-900 via-navy-800 to-teal-900/g, 'bg-slate-50'],
  [/bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900/g, 'bg-slate-50'],
  [/bg-gradient-to-br from-teal-900/g, 'bg-slate-50'],
  [/bg-navy-900\b/g, 'bg-slate-50'],
  [/text-white\/80 bg-white\/10 border border-white\/15/g, 'text-slate-700 bg-slate-100 border border-slate-200'],
  [/font-extrabold text-white mb-4/g, 'font-extrabold text-slate-900 mb-4'],
  [/text-lg text-gray-200/g, 'text-lg text-slate-600'],
  [/text-gray-300 text-sm/g, 'text-slate-600 text-sm'],
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

console.log(`\nfix-backgrounds: ${changed} file(s) updated`);
