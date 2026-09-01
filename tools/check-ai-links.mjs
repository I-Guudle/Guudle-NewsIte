import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const slugs = [
  'ai', 'ai-development', 'generative-ai', 'ai-agent-development', 'ai-multi-agent-agents',
  'ai-automation', 'conversational-ai', 'machine-learning', 'computer-vision', 'rpa-development',
  'ai-consulting', 'ai-integration', 'enterprise-ai', 'ai-product-engineering', 'llm-development', 'rag-development',
];

const broken = [];

function resolveHref(fromDir, href) {
  const clean = href.split('#')[0];
  if (!clean || clean.startsWith('http') || clean.startsWith('mailto:') || clean.startsWith('tel:')) return null;
  if (clean.startsWith('../../')) return path.join(root, clean.slice(6));
  if (clean.startsWith('../')) return path.join(root, 'pages', clean.slice(3));
  return path.join(fromDir, clean);
}

for (const slug of slugs) {
  const file = path.join(root, 'pages', 'services', `${slug}.html`);
  const fromDir = path.dirname(file);
  const html = fs.readFileSync(file, 'utf8');

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('#')) continue;
    const target = resolveHref(fromDir, href);
    if (target && !fs.existsSync(target)) broken.push({ slug, href, target: path.relative(root, target) });
  }

  for (const m of html.matchAll(/href="#(svc-[^"]+)"/g)) {
    const id = m[1];
    if (!html.includes(`id="${id}"`)) broken.push({ slug, href: `#${id}`, target: 'missing section id' });
  }
}

// AI pages use svc-tech-stack instead of svc-industries
for (const slug of slugs) {
  if (slug === 'ai') continue;
  const file = path.join(root, 'pages', 'services', `${slug}.html`);
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="svc-tech-stack"') && html.includes('href="#svc-industries"')) {
    broken.push({ slug, href: '#svc-industries', target: 'should be svc-tech-stack' });
  }
}

// technology.html AI service links
const techHtml = fs.readFileSync(path.join(root, 'pages', 'technology.html'), 'utf8');
for (const m of techHtml.matchAll(/href="(services\/[^"#]+)"/g)) {
  const target = path.join(root, 'pages', m[1]);
  if (!fs.existsSync(target)) broken.push({ slug: 'technology.html', href: m[1], target: path.relative(root, target) });
}

console.log(broken.length ? broken.map((b) => `${b.slug}: ${b.href} -> ${b.target}`).join('\n') : 'All links OK');
