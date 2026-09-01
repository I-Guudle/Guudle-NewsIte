import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const partialPath = path.join(root, 'assets', 'partials', 'technology-partnerships-section.html');

let html = fs.readFileSync(indexPath, 'utf8');
const partial = fs.readFileSync(partialPath, 'utf8').trim() + '\n\n';

const startMarker = '<!-- Technology Partnerships';
const endMarker = '<!-- Mobile App Development Section - Comprehensive Rebuilt Design -->';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
  console.error('Could not remove old partnerships section', { startIdx, endIdx });
  process.exit(1);
}
html = html.slice(0, startIdx) + html.slice(endIdx);

const aiEnd = html.indexOf('id="ai-services-section"');
if (aiEnd === -1) {
  console.error('AI section not found');
  process.exit(1);
}
const closeAfterAi = html.indexOf('</section>', aiEnd);
if (closeAfterAi === -1) {
  console.error('AI section closing tag not found');
  process.exit(1);
}
const insertAt = closeAfterAi + '</section>'.length;
html = html.slice(0, insertAt) + '\n\n' + partial + html.slice(insertAt);

fs.writeFileSync(indexPath, html);
console.log('Technology Partnerships section moved after AI and redesigned.');
