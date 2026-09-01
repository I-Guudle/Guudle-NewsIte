#!/usr/bin/env node
/**
 * Convert legacy dark-mode pages (technologies, blog, industries) to bright typography.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const FILES = [
  'pages/technologies.html',
  'pages/blog.html',
  'pages/industries.html',
];

const REPLACEMENTS = [
  [/<html lang="en" class="dark">/g, '<html lang="en">'],
  [/body class="bg-slate-950 text-slate-100 antialiased guudle-site"/g, 'body class="antialiased guudle-site"'],
  [/class="pt-32 pb-12 hero-bg grid-pattern"/g, 'class="pt-32 pb-12 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200"'],
  [/text-white font-medium/g, 'text-slate-900 font-semibold'],
  [/text-white font-semibold/g, 'text-slate-900 font-semibold'],
  [/text-white font-bold/g, 'text-slate-900 font-bold'],
  [/text-white mb-4/g, 'text-slate-900 mb-4'],
  [/text-white mb-2/g, 'text-slate-900 mb-2'],
  [/text-white text-sm/g, 'text-slate-700 text-sm'],
  [/text-xl text-slate-400/g, 'text-xl text-slate-600'],
  [/text-slate-400 text-sm/g, 'text-slate-600 text-sm'],
  [/text-slate-400 mb-8/g, 'text-slate-600 mb-8'],
  [/text-slate-400 hover:text-cyan-400/g, 'text-slate-600 hover:text-teal-700'],
  [/text-cyan-400/g, 'text-teal-700'],
  [/group-hover:text-cyan-400/g, 'group-hover:text-teal-700'],
  [/glass-card rounded-xl p-4/g, 'bg-white border border-slate-200 shadow-sm rounded-xl p-4'],
  [/glass-card rounded-2xl/g, 'bg-white border border-slate-200 shadow-sm rounded-2xl'],
  [/class="glass rounded-2xl/g, 'class="bg-slate-50 border border-slate-200 rounded-2xl'],
  [/bg-gradient-to-r from-blue-600\/20 to-purple-600\/20/g, 'bg-slate-50 border-t border-slate-200'],
  [/bg-white\/5 border border-white\/10 text-white text-sm/g, 'bg-white border border-slate-200 text-slate-800 text-sm'],
  [/placeholder-slate-500/g, 'placeholder-slate-400'],
  [/from-blue-600 to-purple-600 text-white/g, 'hero-cta-primary text-white'],
];

for (const rel of FILES) {
  const file = join(ROOT, rel);
  let html = readFileSync(file, 'utf8');
  const orig = html;
  for (const [re, rep] of REPLACEMENTS) {
    html = html.replace(re, rep);
  }
  if (html !== orig) {
    writeFileSync(file, html, 'utf8');
    console.log(`  updated ${rel}`);
  }
}

console.log('\nfix-legacy-dark-pages: done');
