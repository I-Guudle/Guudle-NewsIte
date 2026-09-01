#!/usr/bin/env node
/**
 * Master QA — backgrounds, typography, design, services, navigation.
 * Run: node tools/audit-full.mjs
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const AUDITS = [
  'qa-production.mjs',
  'audit-backgrounds.mjs',
  'audit-typography.mjs',
  'audit-design-consistency.mjs',
  'audit-service-pages.mjs',
  'audit-sliders.mjs',
  'audit-layout-uniqueness.mjs',
  'audit-navigation-full.mjs',
];

let failed = 0;

console.log('═══════════════════════════════════════════════');
console.log('  GUUDLE FULL SITE QA');
console.log('═══════════════════════════════════════════════\n');

for (const script of AUDITS) {
  console.log(`▶ node tools/${script}`);
  const r = spawnSync(process.execPath, ['tools/' + script], { cwd: root, encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  process.stdout.write(out);
  if (r.status !== 0) failed++;
  console.log('');
}

if (failed === 0) {
  console.log('═══════════════════════════════════════════════');
  console.log('  RESULT: ALL PASS — 114 pages + shared assets');
  console.log('═══════════════════════════════════════════════');
  process.exit(0);
}

console.error(`RESULT: FAIL — ${failed} audit(s) failed`);
process.exit(1);
