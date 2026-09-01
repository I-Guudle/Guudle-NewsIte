import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderTechSolutionFinderSection } from './tech-solution-finder-render.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');

const start = html.indexOf('<!-- Industries We Serve -->');
const altStart = html.indexOf('<!-- Tech Solution Finder -->');
const sectionStart = start >= 0 ? start : altStart;
const end = html.indexOf('\n  </main>');
if (sectionStart < 0 || end < 0) throw new Error('index.html markers not found');

const section = `<!-- Tech Solution Finder -->\n${renderTechSolutionFinderSection()}\n\n`;
html = html.slice(0, sectionStart) + section + html.slice(end);

if (!html.includes('tech-solution-finder.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="assets/css/partnerships.css">',
    '<link rel="stylesheet" href="assets/css/partnerships.css">\n  <link rel="stylesheet" href="assets/css/tech-solution-finder.css">'
  );
}

if (!html.includes('tech-solution-finder.js')) {
  html = html.replace(
    '<script src="assets/js/home.js"></script>',
    '<script src="assets/js/tech-solution-finder.js"></script>\n<script src="assets/js/home.js"></script>'
  );
}

fs.writeFileSync(file, html);
console.log('Patched index.html — Tech Solution Finder section');
