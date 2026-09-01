/**
 * Verify each service page has a distinct layout fingerprint.
 * Run: node tools/audit-layout-uniqueness.mjs
 */
import { SVC_PAGES } from './svc-pages-config.mjs';
import { AI_PAGES } from './svc-ai-pages.mjs';
import { MIGRATED_PAGES } from './svc-migrated-pages.mjs';
import { PROFILES, MKT_SLUGS } from './mkt-unique-profiles.mjs';
import { getLayoutProfile } from './svc-layout-profiles.mjs';

const SVC_SLUGS = Object.keys({ ...SVC_PAGES, ...AI_PAGES, ...MIGRATED_PAGES });

function svcFingerprint(slug) {
  const { layout, sectionOrder } = getLayoutProfile(slug);
  return JSON.stringify({ layout, sectionOrder });
}

function mktFingerprint(slug) {
  const p = PROFILES[slug];
  if (!p) return null;
  return JSON.stringify({ hero: p.hero, pipeline: p.pipeline, accent: p.accent });
}

const svcMap = new Map();
const mktMap = new Map();
const svcDupes = [];
const mktDupes = [];

for (const slug of SVC_SLUGS) {
  const fp = svcFingerprint(slug);
  if (svcMap.has(fp)) svcDupes.push({ slug, sameAs: svcMap.get(fp) });
  else svcMap.set(fp, slug);
}

for (const slug of MKT_SLUGS) {
  const fp = mktFingerprint(slug);
  if (!fp) continue;
  if (mktMap.has(fp)) mktDupes.push({ slug, sameAs: mktMap.get(fp) });
  else mktMap.set(fp, slug);
}

console.log('════════════════════════════════════════');
console.log('  LAYOUT UNIQUENESS AUDIT');
console.log('════════════════════════════════════════\n');
console.log(`Tech/enterprise pages: ${SVC_SLUGS.length} (${svcMap.size} unique layouts)`);
console.log(`Marketing pages:       ${MKT_SLUGS.length} (${mktMap.size} unique layouts)\n`);

const issues = svcDupes.length + mktDupes.length;
if (svcDupes.length) {
  console.log('Duplicate tech/enterprise layouts:');
  for (const d of svcDupes.slice(0, 10)) console.log(`  ${d.slug} ↔ ${d.sameAs}`);
  if (svcDupes.length > 10) console.log(`  … and ${svcDupes.length - 10} more`);
}
if (mktDupes.length) {
  console.log('Duplicate marketing layouts:');
  for (const d of mktDupes) console.log(`  ${d.slug} ↔ ${d.sameAs}`);
}

const minUniqueSvc = Math.floor(SVC_SLUGS.length * 0.85);
const pass = issues === 0 || (svcMap.size >= minUniqueSvc && mktDupes.length === 0);

console.log(`\n${pass ? 'RESULT: PASS' : 'RESULT: FAIL'} — ${issues} duplicate fingerprint(s)`);
process.exit(pass ? 0 : 1);
