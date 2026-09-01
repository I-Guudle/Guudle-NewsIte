#!/usr/bin/env node
/**
 * Full site normalize — design, backgrounds, typography, legacy pages.
 * Run after CSS/generator changes: node tools/normalize-site.mjs
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const STEPS = [
  'normalize-typography-colors.mjs',
  'fix-typography.mjs',
  'fix-backgrounds.mjs',
  'fix-legacy-dark-pages.mjs',
  'fix-design-consistency.mjs',
];

console.log('═══════════════════════════════════════════════');
console.log('  GUUDLE SITE NORMALIZE');
console.log('═══════════════════════════════════════════════\n');

for (const script of STEPS) {
  console.log(`▶ node tools/${script}`);
  const r = spawnSync(process.execPath, ['tools/' + script], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
}

console.log('\n▶ node tools/audit-full.mjs');
const audit = spawnSync(process.execPath, ['tools/audit-full.mjs'], { cwd: root, stdio: 'inherit' });
process.exit(audit.status || 0);
