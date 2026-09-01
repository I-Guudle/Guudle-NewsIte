/**
 * Patch erp.html — replace Why Guudle with ERP hub section
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderErpWhySection } from './erp-why-render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'pages/services/erp.html');

let html = fs.readFileSync(file, 'utf8');

const start = html.indexOf('<section id="svc-whyChoose"');
if (start === -1) {
  console.error('Could not find svc-whyChoose section');
  process.exit(1);
}

const endMarker = '</section>\n\n    <section id="svc-industries"';
const end = html.indexOf(endMarker, start);
if (end === -1) {
  console.error('Could not find end of whyChoose section');
  process.exit(1);
}

const replacement = renderErpWhySection({
  sectionId: 'svc-whyChoose',
  contactLink: '#svc-contact',
  strategyLink: '#svc-contact',
}).trim();

html = html.slice(0, start) + replacement + '\n\n    <section id="svc-industries"' + html.slice(end + endMarker.length - '<section id="svc-industries"'.length);

if (!html.includes('erp-why-section.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">',
    '<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">\n  <link rel="stylesheet" href="../../assets/css/erp-why-section.css">'
  );
}

fs.writeFileSync(file, html, 'utf8');
console.log('Patched erp.html — ERP Why Choose section applied');
