/**
 * Ensures every HTML page loads the same navigation script stack as index.html.
 * Injects mega-menu-webdev-data.js before mega-menu-data.js when missing.
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const skip = new Set(['june2026', '222', '111', 'node_modules', 'tools']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function assetsPrefix(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  return `${'../'.repeat(depth)}assets/js/`;
}

function patchFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('mega-menu-webdev-data.js')) return false;

  const prefix = assetsPrefix(file);
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  if (depth > 0 && content.includes('src="assets/js/mega-menu-data.js"')) {
    content = content
      .replace(/href="assets\//g, 'href="../assets/')
      .replace(/src="assets\//g, 'src="../assets/');
    fs.writeFileSync(file, content, 'utf8');
    console.log('fixed asset paths:', rel);
    return true;
  }

  const dataLine = `<script src="${prefix}mega-menu-data.js"></script>`;
  if (!content.includes(dataLine)) {
    console.warn('skip (no mega-menu-data anchor):', rel);
    return false;
  }

  const webdevLine = `<script src="${prefix}mega-menu-webdev-data.js"></script>\n  `;
  fs.writeFileSync(file, content.replace(dataLine, webdevLine + dataLine), 'utf8');
  console.log('patched:', path.relative(root, file));
  return true;
}

const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];
let count = 0;
for (const file of files) {
  if (patchFile(file)) count++;
}
console.log(`\nPatched ${count} file(s).`);
