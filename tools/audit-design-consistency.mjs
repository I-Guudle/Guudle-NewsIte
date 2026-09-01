/**

 * Full-site design & navigation consistency audit.

 * Run: node tools/audit-design-consistency.mjs

 */

import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';



const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);



const REQUIRED_SCRIPTS = [

  'mega-menu-webdev-data.js',

  'mega-menu-data.js',

  'mega-menu-render.js',

  'components.js',

  'main.js',

];



const BANNED_COLORS = [

  { re: /#5[cC]0[cC]01/, label: 'dark red' },

  { re: /#33[cC][aA]0[dD]/, label: 'bright green' },

  { re: /#0[Bb]1[Ff]3[Aa]/, label: 'legacy navy blue' },

  { re: /#123[Dd]6[Aa]/, label: 'legacy deep blue' },

  { re: /#2563[Ee][Bb]/, label: 'legacy royal blue' },

  { re: /#091729/, label: 'dark navy' },

  { re: /#40126[aA]/, label: 'purple override' },

];



function walk(dir, files = []) {

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {

    if (skip.has(entry.name)) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) walk(full, files);

    else if (entry.name.endsWith('.html')) files.push(full);

  }

  return files;

}



const htmlFiles = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];

const issues = [];



for (const file of htmlFiles) {

  const rel = path.relative(root, file).replace(/\\/g, '/');

  const c = fs.readFileSync(file, 'utf8');



  if (!c.includes('header-placeholder')) {

    issues.push({ rel, type: 'missing-header-placeholder' });

    continue;

  }



  if (c.match(/id=["']site-header["']/)) issues.push({ rel, type: 'inline-site-header' });

  if (!c.includes('tailwind-config.js') && c.includes('cdn.tailwindcss.com')) {

    issues.push({ rel, type: 'missing-tailwind-config' });

  }

  if (!c.includes('site-unified.css')) issues.push({ rel, type: 'missing-site-unified-css' });

  if (!c.includes('styles.css')) issues.push({ rel, type: 'missing-styles-css' });



  for (const s of REQUIRED_SCRIPTS) {

    if (!c.includes(s)) issues.push({ rel, type: 'missing-script', detail: s });

  }



  for (const { re, label } of BANNED_COLORS) {

    if (re.test(c)) issues.push({ rel, type: 'banned-color', detail: label });

  }



  if (/#site-header|\.site-nav--/.test(c) && !c.includes('header-placeholder')) {

    issues.push({ rel, type: 'inline-nav-override' });

  }

}



const components = fs.readFileSync(path.join(root, 'assets/js/components.js'), 'utf8');

const sourceChecks = {

  splitNav: components.includes('site-nav--split') && components.includes('nav-menu-bar'),

  siteUnifiedInject: components.includes('site-unified.css'),

  navLockInject: components.includes('nav-lock.css'),

};



const unifiedExists = fs.existsSync(path.join(root, 'assets/css/site-unified.css'));

const navLockExists = fs.existsSync(path.join(root, 'assets/css/nav-lock.css'));



console.log('═══════════════════════════════════════════════');

console.log('  GUUDLE DESIGN CONSISTENCY AUDIT');

console.log('═══════════════════════════════════════════════\n');

console.log(`Pages scanned: ${htmlFiles.length}`);

console.log(`Issues found: ${issues.length}\n`);



const grouped = {};

for (const i of issues) {

  grouped[i.type] = grouped[i.type] || [];

  grouped[i.type].push(i);

}



for (const [type, list] of Object.entries(grouped)) {

  console.log(`${type}: ${list.length}`);

  for (const item of list.slice(0, 8)) {

    console.log(`  - ${item.rel}${item.detail ? ` (${item.detail})` : ''}`);

  }

  if (list.length > 8) console.log(`  ... and ${list.length - 8} more`);

  console.log('');

}



console.log('Shared assets:');

console.log(`  site-unified.css: ${unifiedExists ? 'OK' : 'MISSING'}`);

console.log(`  nav-lock.css: ${navLockExists ? 'OK' : 'MISSING'}`);

for (const [k, v] of Object.entries(sourceChecks)) {

  console.log(`  components.${k}: ${v ? 'OK' : 'MISSING'}`);

}



const pass = issues.length === 0 && unifiedExists && navLockExists && Object.values(sourceChecks).every(Boolean);

console.log(`\n${pass ? 'RESULT: PASS' : 'RESULT: FAIL — run node tools/fix-design-consistency.mjs'}`);

process.exit(pass ? 0 : 1);


