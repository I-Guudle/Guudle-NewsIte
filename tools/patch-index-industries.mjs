/**
 * Add premium Industries We Serve section to homepage.
 * Run: node tools/patch-index-industries.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { defaultIndustries } from './svc-shared-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');

if (html.includes('id="home-industries"')) {
  console.log('index.html already has home-industries section');
  process.exit(0);
}

const section = renderIndustriesParallaxSection({
  industries: defaultIndustries,
  slug: 'website-development',
  bg: 'sliders/38.jpg',
  sectionId: 'home-industries',
  lead: 'We combine deep domain knowledge with enterprise-grade engineering — delivering secure, scalable technology solutions tailored to each industry\'s compliance requirements, workflows, and growth ambitions.',
  pathPrefix: '',
  contactLink: 'pages/contact.html',
}).trim();

const marker = '<!-- IT Solutions Expertise Section -->';
const insertAt = html.indexOf(marker);
if (insertAt < 0) throw new Error('index.html insert marker not found');

html = html.slice(0, insertAt) + `<!-- Industries We Serve -->\n    ${section}\n\n    ` + html.slice(insertAt);

if (!html.includes('industries-we-serve.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="assets/css/svc-corpox.css">',
    '<link rel="stylesheet" href="assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="assets/css/industries-we-serve.css">'
  );
}

fs.writeFileSync(file, html, 'utf8');
console.log('Patched index.html — Industries We Serve section added');
