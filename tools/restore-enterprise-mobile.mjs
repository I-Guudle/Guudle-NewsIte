/**
 * Restore indw Industries section on enterprise-mobile-app-development.html
 * and wire animated hero title markup.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { defaultIndustries } from './svc-shared-data.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'pages', 'services', 'enterprise-mobile-app-development.html');
let html = fs.readFileSync(file, 'utf8');

const industries = renderIndustriesParallaxSection({
  industries: defaultIndustries,
  sectionId: 'svc-industries',
  contactLink: '../contact.html',
  industriesLink: '../industries.html',
  lead: 'We build secure, practical technology for your industry — clear workflows, compliance awareness, and solutions your teams can actually use.',
}).trim();

const varietyRe = /\n    <section id="svc-industries" class="variety_section"[\s\S]*?<\/section>\n/;
const indwRe = /\n    <section id="svc-industries" class="indw-section"[\s\S]*?<\/section>\n/;

if (varietyRe.test(html)) {
  html = html.replace(varietyRe, `\n${industries}\n\n`);
} else if (indwRe.test(html)) {
  html = html.replace(indwRe, `\n${industries}\n\n`);
} else {
  throw new Error('Could not find industries section to restore');
}

// Remove variety/slick assets
html = html.replace(
  /\n  <link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/slick-carousel@1\.8\.1\/slick\/slick\.css">/,
  ''
);
html = html.replace(
  /\n  <link rel="stylesheet" href="\.\.\/\.\.\/assets\/css\/variety-section\.css">/,
  ''
);
html = html.replace(
  /\n  <script src="https:\/\/code\.jquery\.com\/jquery-3\.7\.1\.min\.js"><\/script>/,
  ''
);
html = html.replace(
  /\n  <script src="https:\/\/cdn\.jsdelivr\.net\/npm\/slick-carousel@1\.8\.1\/slick\/slick\.min\.js"><\/script>/,
  ''
);
html = html.replace(
  /\n  <script src="\.\.\/\.\.\/assets\/js\/variety-slider\.js"><\/script>/,
  ''
);

if (!html.includes('industries-tabs.js')) {
  html = html.replace(
    '</body>',
    `  <script src="../../assets/js/industries-tabs.js"></script>\n</body>`
  );
}

if (!html.includes('hero-title-animate.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/capabilities-accordion.css">',
    `<link rel="stylesheet" href="../../assets/css/capabilities-accordion.css">
  <link rel="stylesheet" href="../../assets/css/hero-title-animate.css">`
  );
}

// Animated hero title
const oldH1 =
  /<h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-\[2\.25rem\] sm:text-4xl xl:text-\[3\.25rem\] font-extrabold leading-\[1\.08\] mb-5" data-aos="fade-up" data-aos-delay="50">Enterprise Mobile <span class="hero-title-navy__line hero-title-navy__line--inline">Platforms at Scale<\/span><\/h1>/;

const newH1 = `<h1 id="svc-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title hero-title--animate text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">
              <span class="hero-title-animate" aria-label="Enterprise Mobile Platforms at Scale">
                <span class="hero-title-animate__line">
                  <span class="hero-title-animate__word" style="--i:0">Enterprise</span>
                  <span class="hero-title-animate__word" style="--i:1">Mobile</span>
                </span>
                <span class="hero-title-animate__line hero-title-animate__line--accent">
                  <span class="hero-title-animate__word" style="--i:2">Platforms</span>
                  <span class="hero-title-animate__word" style="--i:3">at</span>
                  <span class="hero-title-animate__word" style="--i:4">Scale</span>
                </span>
              </span>
            </h1>`;

if (!oldH1.test(html)) {
  // fallback: wrap existing h1 content if already partially changed
  if (!html.includes('hero-title-animate')) {
    throw new Error('Hero h1 pattern not found');
  }
} else {
  html = html.replace(oldH1, newH1);
}

if (!html.includes('hero-title-animate.js')) {
  html = html.replace(
    '</body>',
    `  <script src="../../assets/js/hero-title-animate.js"></script>\n</body>`
  );
}

fs.writeFileSync(file, html, 'utf8');
console.log('Restored industries + animated hero on enterprise-mobile-app-development.html');
