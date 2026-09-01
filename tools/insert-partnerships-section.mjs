import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const partialPath = path.join(root, 'assets/partials/technology-partnerships-section.html');

let html = fs.readFileSync(indexPath, 'utf8');
const partial = fs.readFileSync(partialPath, 'utf8');

if (html.includes('id="technology-partnerships"')) {
  console.log('Partnerships section already present');
  process.exit(0);
}

const insertAfterAi = html.indexOf('id="ai-services-section"');
if (insertAfterAi === -1) {
  console.error('AI section marker not found');
  process.exit(1);
}
const closeTag = html.indexOf('</section>', insertAfterAi);
if (closeTag === -1) {
  console.error('AI section closing tag not found');
  process.exit(1);
}
const insertAt = closeTag + '</section>'.length;
html = `${html.slice(0, insertAt)}\n\n${partial}\n${html.slice(insertAt)}`;

if (!html.includes('partnerships.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="assets/css/home-navy.css">',
    '<link rel="stylesheet" href="assets/css/home-navy.css">\n  <link rel="stylesheet" href="assets/css/partnerships.css">'
  );
}

if (!html.includes('partnerships.js')) {
  html = html.replace(
    '<script src="assets/js/home.js"></script>',
    '<script src="assets/js/partnerships.js"></script>\n  <script src="assets/js/home.js"></script>'
  );
}

fs.writeFileSync(indexPath, html);
console.log('Technology Partnerships section inserted successfully');
