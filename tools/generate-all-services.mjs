/**
 * Generate all service pages — unified orchestrator.
 * Run: node tools/generate-all-services.mjs [--only=slug1,slug2] [--family=svc|mkt|all]
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const familyArg = process.argv.find((a) => a.startsWith('--family='));
const ONLY = onlyArg ? onlyArg.split('=')[1] : null;
const FAMILY = familyArg ? familyArg.split('=')[1] : 'all';

function run(script, extraArgs = []) {
  const args = ['tools/' + script];
  if (ONLY) args.push(`--only=${ONLY}`);
  args.push(...extraArgs);
  console.log(`\n▶ node ${args.join(' ')}`);
  const r = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
}

if (FAMILY === 'all' || FAMILY === 'svc') {
  run('generate-svc-pages.mjs');
}
if (FAMILY === 'all' || FAMILY === 'mkt') {
  run('generate-mkt-unique.mjs');
}
if (FAMILY === 'all') {
  run('fix-design-consistency.mjs');
  run('fix-typography.mjs');
  run('fix-legacy-dark-pages.mjs');
  run('audit-design-consistency.mjs');
  run('audit-backgrounds.mjs');
  run('audit-typography.mjs');
  run('audit-service-pages.mjs');
  run('audit-sliders.mjs');
  run('audit-layout-uniqueness.mjs');
}

console.log('\n✓ Service page generation complete.');
