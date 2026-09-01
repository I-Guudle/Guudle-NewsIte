/**
 * Patch Industries We Serve → professional indw design across all live pages
 * Run: node tools/patch-all-industries-sections.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { defaultIndustries } from './svc-shared-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'pages', 'services');

const SECTION_RE = /<section id="[^"]*" class="(?:cpox-industries-parallax|ind-light|ind-serve-v2|ind-v3|indw-section|saas-plat)[^"]*"[\s\S]*?<\/section>/g;

function parseIndustriesFromHtml(sectionHtml) {
  const industries = [];
  const patterns = [
    /<article class="(?:cpox-industry-card|ind-serve-card|ind-serve-v2__card|ind-v3__card|indw-card|indw-spot)"[\s\S]*?<i class="([^"]*)"[\s\S]*?<h3(?: class="[^"]*")?>([\s\S]*?)<\/h3>[\s\S]*?<p(?: class="[^"]*")?>([\s\S]*?)<\/p>/g,
    /class="ind-v3__card-title">([\s\S]*?)<\/h3>[\s\S]*?class="ind-v3__card-desc">([\s\S]*?)<\/p>/g,
  ];

  let m;
  const re = patterns[0];
  while ((m = re.exec(sectionHtml)) !== null) {
    const iconClass = m[1].trim();
    const icon = iconClass.replace(/^fas\s+/, '').replace(/^fa-solid\s+/, '');
    const name = m[2].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim();
    const desc = m[3].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim();
    if (name && !industries.some((x) => x.name === name)) {
      industries.push({ icon, name, desc });
    }
  }
  return industries.length ? industries.slice(0, 12) : defaultIndustries;
}

function extractLead(sectionHtml) {
  const m = sectionHtml.match(/class="(?:cpox-industries-head__lead|ind-serve-v2__lead|ind-light__lead|ind-v3__lead|indw-intro__lead)">([\s\S]*?)<\/p>/);
  return m ? m[1].replace(/&amp;/g, '&').replace(/&rsquo;/g, '\u2019').trim() : undefined;
}

function extractContact(sectionHtml, fallback) {
  const m = sectionHtml.match(/class="(?:ind-serve-v2__footer-cta|ind-light__footer-cta|ind-v3__footer-cta|indw-cta__primary|indw-card__link)" href="([^"]+)"/);
  return m ? m[1] : fallback;
}

function replaceSection(html, opts) {
  let changed = false;
  const updated = html.replace(SECTION_RE, (oldSection) => {
    // Skip SaaS platforms section that is not an industries section
    if (oldSection.includes('class="saas-plat"') && !/Industries We Serve|indw-|ind-v3/.test(oldSection)) {
      return oldSection;
    }
    const idMatch = oldSection.match(/id="([^"]+)"/);
    const sectionId = idMatch ? idMatch[1] : 'svc-industries';
    const parsed = parseIndustriesFromHtml(oldSection);
    const byName = new Map(parsed.map((i) => [i.name, i]));
    // Prefer default short-copy set (adds Insurance / Hospitality), keep extras from page
    const industries = [
      ...defaultIndustries.map((d) => ({
        icon: byName.get(d.name)?.icon || d.icon,
        name: d.name,
        desc: d.desc,
      })),
      ...parsed.filter((p) => !defaultIndustries.some((d) => d.name === p.name)),
    ].slice(0, 12);
    const contactLink = extractContact(oldSection, opts.contactLink);
    changed = true;
    return renderIndustriesParallaxSection({
      industries,
      sectionId,
      lead: 'We build secure, practical technology for your industry — clear workflows, compliance awareness, and solutions your teams can actually use.',
      contactLink,
      industriesLink: opts.industriesLink,
      pathPrefix: opts.pathPrefix,
    }).trim();
  });
  return { html: updated, changed };
}

function ensureCss(html, cssHref) {
  if (html.includes('industries-we-serve.css')) return html;
  const link = `  <link rel="stylesheet" href="${cssHref}industries-we-serve.css">\n`;
  if (html.includes('svc-corpox.css')) {
    return html.replace(
      /<link rel="stylesheet" href="[^"]*svc-corpox\.css">/,
      (m) => `${m}\n${link.trimEnd()}`
    );
  }
  if (html.includes('</head>')) {
    return html.replace('</head>', `${link}</head>`);
  }
  return html;
}

function ensureJs(html, jsHref) {
  if (html.includes('industries-tabs.js')) return html;
  const script = `  <script src="${jsHref}industries-tabs.js"></script>\n`;
  if (html.includes('svc-landing.js')) {
    return html.replace(
      /<script src="[^"]*svc-landing\.js"><\/script>/,
      (m) => `${m}\n${script.trimEnd()}`
    );
  }
  if (html.includes('</body>')) {
    return html.replace('</body>', `${script}</body>`);
  }
  return html;
}

function patchFile(file, opts) {
  let html = fs.readFileSync(file, 'utf8');
  SECTION_RE.lastIndex = 0;
  if (!SECTION_RE.test(html)) {
    SECTION_RE.lastIndex = 0;
    return false;
  }
  SECTION_RE.lastIndex = 0;
  const result = replaceSection(html, opts);
  html = result.html;
  if (result.changed) {
    const cssPrefix = opts.cssPrefix || '../../assets/css/';
    const jsPrefix = opts.jsPrefix || cssPrefix.replace('/css/', '/js/');
    html = ensureCss(html, cssPrefix);
    html = ensureJs(html, jsPrefix);
    fs.writeFileSync(file, html, 'utf8');
    console.log('  patched:', path.relative(root, file));
  }
  return result.changed;
}

let count = 0;

for (const file of fs.readdirSync(servicesDir).filter((f) => f.endsWith('.html'))) {
  if (patchFile(path.join(servicesDir, file), {
    pathPrefix: '../../',
    cssPrefix: '../../assets/css/',
    jsPrefix: '../../assets/js/',
    contactLink: '../contact.html',
    industriesLink: '../industries.html',
  })) count++;
}

const pageFiles = [
  { rel: 'pages/industries.html', contact: 'contact.html', industries: 'industries.html', prefix: '../' },
  { rel: 'pages/our-process.html', contact: 'contact.html', industries: 'industries.html', prefix: '../' },
  { rel: 'index.html', contact: 'pages/contact.html', industries: 'pages/industries.html', prefix: '' },
];

for (const item of pageFiles) {
  const file = path.join(root, item.rel);
  if (!fs.existsSync(file)) continue;
  if (patchFile(file, {
    pathPrefix: item.prefix,
    cssPrefix: `${item.prefix}assets/css/`,
    jsPrefix: `${item.prefix}assets/js/`,
    contactLink: item.contact,
    industriesLink: item.industries,
  })) count++;
}

console.log(`\nIndustries indw redesign — ${count} page(s) updated.`);
