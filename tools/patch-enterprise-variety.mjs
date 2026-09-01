/**
 * Replace industries section on enterprise-mobile-app-development.html
 * with variety_section carousel (this page only).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'pages', 'services', 'enterprise-mobile-app-development.html');

const pairs = [
  [['medical-v.png', 'Medical'], ['pharma.png', 'Pharmaceutical']],
  [['healthcare.png', 'Healthcare'], ['Wellness.png', 'Wellness']],
  [['Finance.png', 'Finance'], ['Education.png', 'Education']],
  [['Manufacturing.png', 'Manufacturing'], ['Ecommerce.png', 'Ecommerce']],
  [['Real Estate.png', 'Real Estate'], ['Travel & Tourism.png', 'Travel & Tourism']],
  [['Social Networks.png', 'Social Networks'], ['Retails.png', 'Retails']],
  [['Energy.png', 'Energy'], ['Hospitality.png', 'Hospitality']],
  [['Media & Entertainment.png', 'Media & Entertainment'], ['Logistics & Distribution.png', 'Logistics & Distribution']],
  [['Clothing.png', 'Clothing'], ['Architectural.png', 'Architectural']],
  [['Transport.png', 'Transport'], ['Restaurant.png', 'Restaurant']],
  [['Advertising.png', 'Advertising'], ['Legal.png', 'Legal']],
  [['fintech.png', 'Fintech'], ['Telecom.png', 'Telecom']],
  [['Construction.png', 'Construction'], ['Automotive.png', 'Automotive']],
];

function imgUrl(fileName) {
  return `https://www.jeeltechsoft.com/images/${encodeURIComponent(fileName)}`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const slides = pairs
  .map(
    ([a, b]) => `          <div class="slide">
            <div class="variety_three">
              <img src="${imgUrl(a[0])}" alt="${esc(a[1])}" width="64" height="64" loading="lazy">
              <h6>${esc(a[1])}</h6>
            </div>
            <div class="variety_three">
              <img src="${imgUrl(b[0])}" alt="${esc(b[1])}" width="64" height="64" loading="lazy">
              <h6>${esc(b[1])}</h6>
            </div>
          </div>`
  )
  .join('\n');

const section = `    <section id="svc-industries" class="variety_section" aria-labelledby="svc-industries-heading">
      <div class="container">
        <h2 id="svc-industries-heading" class="py-4 text-center">We Serve A Variety of Businesses</h2>
        <div class="variety_grid_one col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <div class="variety-logos slider" data-variety-slider>
${slides}
          </div>
        </div>
      </div>
    </section>
`;

let html = fs.readFileSync(file, 'utf8');
const re = /\n    <section id="svc-industries" class="indw-section"[\s\S]*?<\/section>\n/;
if (!re.test(html)) {
  // already converted?
  if (html.includes('class="variety_section"')) {
    console.log('Already variety_section — refreshing content');
    html = html.replace(
      /\n    <section id="svc-industries" class="variety_section"[\s\S]*?<\/section>\n/,
      `\n${section}\n`
    );
  } else {
    throw new Error('industries section not found');
  }
} else {
  html = html.replace(re, `\n${section}\n`);
}

if (!html.includes('variety-section.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">',
    `<link rel="stylesheet" href="../../assets/css/industries-we-serve.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
  <link rel="stylesheet" href="../../assets/css/variety-section.css">`
  );
}

html = html.replace(/\n  <script src="\.\.\/\.\.\/assets\/js\/industries-tabs\.js"><\/script>/, '');

if (!html.includes('variety-slider.js')) {
  html = html.replace(
    '</body>',
    `  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
  <script src="../../assets/js/variety-slider.js"></script>
</body>`
  );
}

fs.writeFileSync(file, html, 'utf8');
console.log('Updated', path.relative(root, file));
