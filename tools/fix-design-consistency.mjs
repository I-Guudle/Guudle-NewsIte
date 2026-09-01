/**

 * Enforce unified design shell on every active HTML page.

 * Run: node tools/fix-design-consistency.mjs

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

const UNIFIED_CSS_RE = /<link\s+rel="stylesheet"\s+href="[^"]*site-unified\.css"[^>]*>\s*/gi;



const FONT_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">';

const OLD_FONT_RE = /family=Inter[^"']*family=Manrope[^"']*/g;
const NEW_FONT_QUERY = 'family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800';



function stripAfterHtml(html) {

  const end = html.indexOf('</html>');

  if (end === -1) return html;

  const closeEnd = end + 7;

  const junk = html.slice(closeEnd).trim();

  if (!junk) return html;

  return html.slice(0, closeEnd) + (html.endsWith('\n') ? '' : '\n');

}



function ensureFonts(html) {
  const poppinsLink =
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">';

  html = html.replace(OLD_FONT_RE, NEW_FONT_QUERY);
  html = html.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*" rel="stylesheet">\s*/gi,
    ''
  );

  if (html.includes('family=Poppins')) {
    if (!html.includes(poppinsLink)) {
      html = html.replace(
        /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*Poppins[^"]*" rel="stylesheet">/i,
        poppinsLink
      );
    }
    return html;
  }

  const preconnect = html.indexOf('fonts.googleapis.com');
  if (preconnect === -1) {
    return html.replace(
      '</head>',
      `  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  ${poppinsLink}\n</head>`
    );
  }

  return html.replace('</head>', `  ${poppinsLink}\n</head>`);
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



function ensureSiteUnifiedCss(html, prefix) {

  html = html.replace(UNIFIED_CSS_RE, '');

  const tag = `  <link rel="stylesheet" href="${prefix}css/site-unified.css">\n`;

  if (html.includes('site-unified.css')) return html;

  const headClose = html.indexOf('</head>');

  if (headClose === -1) return html;

  return html.slice(0, headClose) + tag + html.slice(headClose);

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



function normalizeLegacyColors(html) {
  return html
    .replace(/#0[Bb]1[Ff]3[Aa]/g, '#0F172A')
    .replace(/#123[Dd]6[Aa]/g, '#334155')
    .replace(/#091729/g, '#0F172A')
    .replace(/#081829/g, '#0F172A')
    .replace(/#5[cC]0[cC]01/g, '#0F172A')
    .replace(/#33[cC][aA]0[dD]/g, '#10A5F5')
    .replace(/#2563[Ee][Bb]/g, '#10A5F5')
    .replace(/#40126[aA]/g, '#334155')
    .replace(/#22[Cc]55[Ee]/g, '#10A5F5')
    .replace(/#7[Cc]3[Aa][Ee][Dd]/g, '#64748B')
    .replace(/#0[Dd]9488/g, '#10A5F5')
    .replace(/#14[Bb]8[Aa]6/g, '#10A5F5')
    .replace(/style="color:#37474F"/gi, '')
    .replace(/style="color: #37474F"/gi, '');
}

function normalizeBodyClass(html) {

  return html.replace(/<body([^>]*)>/i, (match, attrs) => {

    if (attrs.includes('guudle-site')) return match;

    const cls = attrs.match(/class="([^"]*)"/);

    if (cls) {

      const merged = `${cls[1]} guudle-site`.trim();

      return `<body${attrs.replace(/class="[^"]*"/, `class="${merged}"`)}>`;

    }

    return `<body${attrs} class="guudle-site">`;

  });

}



const files = [...walk(path.join(root, 'pages')), path.join(root, 'index.html')];

let fixed = 0;



for (const file of files) {

  let html = fs.readFileSync(file, 'utf8');

  if (!html.includes('header-placeholder')) continue;



  const rel = path.relative(root, file).replace(/\\/g, '/');

  const prefix = assetPrefix(rel);

  const before = html;



  html = ensureFonts(html);

  html = ensureTailwindConfig(html, prefix);

  html = ensureSiteUnifiedCss(html, prefix);

  html = ensureNavScripts(html, prefix);

  html = ensureSkipAndPlaceholders(html);
  html = normalizeLegacyColors(html);
  html = normalizeBodyClass(html);

  html = stripAfterHtml(html);



  if (html !== before) {

    fs.writeFileSync(file, html, 'utf8');

    fixed++;

    console.log('Fixed:', rel);

  }

}



console.log(fixed ? `\nDone — ${fixed} page(s) normalized for unified design.` : '\nAll pages already match the unified design shell.');


