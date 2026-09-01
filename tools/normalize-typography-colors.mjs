#!/usr/bin/env node
/**
 * Batch-update typography hex colors in active CSS to design tokens.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const CSS_DIR = join(ROOT, 'assets', 'css');

const SKIP = new Set([
  'june2026', '222', '111', 'node_modules',
  'web-application-landing.css', 'devops-landing.css', 'mob-landing.css',
  'mvp-landing.css', 'saas-landing.css', 'ai-agent-landing.css',
]);

const REPLACEMENTS = [
  [/color:\s*#37474F\b/gi, 'color: var(--text-heading, #0F172A)'],
  [/color:\s*#546E7A\b/gi, 'color: var(--text-muted, #64748B)'],
  [/color:\s*#78909C\b/gi, 'color: var(--text-muted, #64748B)'],
  [/color:\s*#475569\b/gi, 'color: var(--text-body, #475569)'],
  [/color:\s*#64748B\b/gi, 'color: var(--text-muted, #64748B)'],
  [/color:\s*#334155\b/gi, 'color: var(--text-subheading, #334155)'],
  [/--brand-text:\s*#37474F/gi, '--brand-text: var(--text-heading, #0F172A)'],
  [/--brand-text-muted:\s*#546E7A/gi, '--brand-text-muted: var(--text-muted, #64748B)'],
  [/--svc-navy:\s*#37474F/gi, '--svc-navy: var(--text-heading, #0F172A)'],
  [/--svc-muted:\s*#546E7A/gi, '--svc-muted: var(--text-muted, #64748B)'],
  [/--mkt-navy:\s*#37474F/gi, '--mkt-navy: var(--text-heading, #0F172A)'],
  [/--nav-grey-text:\s*#37474F/gi, '--nav-grey-text: var(--text-heading, #0F172A)'],
  [/--nav-grey-text-muted:\s*#546E7A/gi, '--nav-grey-text-muted: var(--text-muted, #64748B)'],
  [/--nav-slate:\s*#37474F/gi, '--nav-slate: var(--text-heading, #0F172A)'],
  [/--nav-slate-mid:\s*#546E7A/gi, '--nav-slate-mid: var(--text-subheading, #334155)'],
];

function walkCss(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkCss(p, out);
    else if (name.endsWith('.css')) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walkCss(CSS_DIR)) {
  let text = readFileSync(file, 'utf8');
  const orig = text;
  for (const [re, rep] of REPLACEMENTS) {
    text = text.replace(re, rep);
  }
  if (text !== orig) {
    writeFileSync(file, text, 'utf8');
    changed++;
    console.log(`  ${relative(ROOT, file)}`);
  }
}

console.log(`\nnormalize-typography-colors: ${changed} CSS file(s) updated`);
