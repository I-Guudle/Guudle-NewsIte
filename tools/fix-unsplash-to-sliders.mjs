/**
 * Replace Unsplash URLs with local /sliders assets on service pages.
 * Run: node tools/fix-unsplash-to-sliders.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSliderForSlug, getSliderOgUrl } from './slider-images.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svcDir = path.join(root, 'pages', 'services');
const files = fs.readdirSync(svcDir).filter((f) => f.endsWith('.html'));

let updated = 0;
for (const file of files) {
  const slug = file.replace(/\.html$/, '');
  const full = path.join(svcDir, file);
  let html = fs.readFileSync(full, 'utf8');
  if (!html.includes('unsplash.com')) continue;

  const local = getSliderForSlug(slug);
  const og = getSliderOgUrl(slug);
  const next = html
    .replace(/https:\/\/images\.unsplash\.com\/[^"'\s)]+/g, (match, offset, str) => {
      const ctx = str.slice(Math.max(0, offset - 80), offset);
      if (/og:image|twitter:image|property=.og|schema/i.test(ctx + str.slice(offset, offset + 40))) {
        return og;
      }
      return local;
    });

  if (next !== html) {
    fs.writeFileSync(full, next, 'utf8');
    updated++;
    console.log('  fixed:', file);
  }
}

console.log(`\nReplaced Unsplash on ${updated} service pages.`);
