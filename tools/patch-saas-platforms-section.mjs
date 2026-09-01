/**
 * Patch saas-development.html — replace Industries v3 with SaaS Platforms section
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderSaasPlatformsSection } from './saas-platforms-render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const file = path.join(root, 'pages/services/saas-development.html');

let html = fs.readFileSync(file, 'utf8');

const start = html.indexOf('<section id="svc-industries" class="ind-v3');
if (start === -1) {
  console.error('Could not find svc-industries ind-v3 section');
  process.exit(1);
}

const endMarker = '</section>\n\n    <section id="svc-services"';
const end = html.indexOf(endMarker, start);
if (end === -1) {
  console.error('Could not find end of industries section');
  process.exit(1);
}

const replacement = renderSaasPlatformsSection({ sectionId: 'svc-industries', contactLink: '#svc-contact' }).trim();

html = html.slice(0, start) + replacement + '\n\n    <section id="svc-services"' + html.slice(end + endMarker.length - '<section id="svc-services"'.length);

if (!html.includes('saas-platforms-section.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">',
    '<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">\n  <link rel="stylesheet" href="../../assets/css/saas-platforms-section.css">'
  );
}

fs.writeFileSync(file, html, 'utf8');
console.log('Patched saas-development.html — SaaS Platforms section applied');
