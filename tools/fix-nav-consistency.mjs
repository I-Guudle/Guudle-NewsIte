/**
 * Enforce identical navigation shell on every active HTML page.
 * Run: node tools/fix-nav-consistency.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { assetPrefix, navScriptBlock, NAV_SCRIPT_NAMES } from './nav-shell.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
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

const TAILWIND_INLINE = /<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>\s*/gi;
const TAILWIND_CONFIG_SRC = /<script\s+src="[^"]*tailwind-config\.js"[^>]*><\/script>\s*/gi;
const NAV_SCRIPT_RE = /<script\s+src="[^"]*(?:mega-menu-webdev-data|mega-menu-data|mega-menu-render|components|main)\.js"[^>]*><\/script>\s*/gi;

function stripAfterHtml(html) {
  const close = html.search(/<\/html>\s*$/i);
  if (close === -1) return html;
  const end = html.indexOf('</html>') + 7;
  const junk = html.slice(end).trim();
  if (!junk) return html;
  return html.slice(0, end) + (html.endsWith('\n') ? '' : '\n');
}

function ensureTailwindConfig(html, prefix) {
  html = html.replace(TAILWIND_INLINE, '');
  html = html.replace(TAILWIND_CONFIG_SRC, '');
  const cdn = html.indexOf('cdn.tailwindcss.com');
  if (cdn === -1) return html;
  const insertAt = html.indexOf('</script>', cdn) + 9;
  const tag = `\n  <script src="${prefix}js/tailwind-config.js"></script>`;
  if (!html.includes('tailwind-config.js')) {
    html = html.slice(0, insertAt) + tag + html.slice(insertAt);
  }
  return html;
}

function ensureNavScripts(html, prefix) {
  if (!html.includes('header-placeholder')) return html;

  html = stripAfterHtml(html);
  html = html.replace(NAV_SCRIPT_RE, '');

  const headEnd = html.indexOf('</head>');
  if (headEnd === -1) return html;
  const head = html.slice(0, headEnd + 7);
  let body = html.slice(headEnd + 7);

  const pageScripts = [];
  body = body.replace(/<script\s+src="([^"]+\.js)"[^>]*><\/script>\s*/gi, (match, src) => {
    if (NAV_SCRIPT_NAMES.some((n) => src.includes(n))) return '';
    pageScripts.push(match.trim());
    return '';
  });

  const block = navScriptBlock(prefix);
  const tail = pageScripts.length ? `\n${pageScripts.join('\n')}` : '';
  const marker = '<div id="chatbot-placeholder"></div>';
  if (body.includes(marker)) {
    body = body.replace(marker, `${marker}\n${block}${tail}`);
  } else {
    body = body.replace('</body>', `${block}${tail}\n</body>`);
  }
  return head + body;
}

function ensureSkipAndPlaceholders(html) {
  if (!html.includes('skip-link') && html.includes('header-placeholder')) {
    html = html.replace(
      '<div id="header-placeholder"></div>',
      '<a href="#main" class="skip-link">Skip to main content</a>\n  <div id="header-placeholder"></div>'
    );
  }
  if (html.includes('header-placeholder') && !html.includes('footer-placeholder')) {
    html = html.replace('</body>', '  <div id="footer-placeholder"></div>\n  <div id="chatbot-placeholder"></div>\n</body>');
  } else if (html.includes('footer-placeholder') && !html.includes('chatbot-placeholder')) {
    html = html.replace(
      /<div id="footer-placeholder"><\/div>\s*/,
      '<div id="footer-placeholder"></div>\n  <div id="chatbot-placeholder"></div>\n'
    );
  }
  return html;
}

const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];
let fixed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('header-placeholder')) continue;

  const rel = path.relative(root, file).replace(/\\/g, '/');
  const prefix = assetPrefix(rel);
  const before = html;

  html = ensureTailwindConfig(html, prefix);
  html = ensureNavScripts(html, prefix);
  html = ensureSkipAndPlaceholders(html);
  html = stripAfterHtml(html);

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    fixed++;
    console.log('Fixed:', rel);
  }
}

console.log(fixed ? `\nDone — ${fixed} page(s) normalized.` : '\nAll pages already match the navigation shell.');
