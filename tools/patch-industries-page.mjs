import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'pages', 'industries.html');
let html = fs.readFileSync(file, 'utf8');

const extendedIndustries = [
  { icon: 'fa-heart-pulse', name: 'Healthcare', desc: 'HIPAA-compliant telemedicine, EHR systems, patient portals, and health analytics platforms.' },
  { icon: 'fa-landmark', name: 'Finance & Banking', desc: 'Secure fintech platforms, payment systems, trading apps, and regulatory compliance solutions.' },
  { icon: 'fa-cart-shopping', name: 'E-commerce & Retail', desc: 'Online stores, marketplaces, inventory management, and omnichannel retail solutions.' },
  { icon: 'fa-building', name: 'Real Estate', desc: 'Property listing platforms, CRM for agents, virtual tours, and property management systems.' },
  { icon: 'fa-graduation-cap', name: 'Education', desc: 'Learning management systems, e-learning platforms, student portals, and educational apps.' },
  { icon: 'fa-industry', name: 'Manufacturing', desc: 'IoT dashboards, supply chain management, production monitoring, and ERP integration.' },
  { icon: 'fa-truck', name: 'Logistics', desc: 'Fleet management, route optimization, warehouse management, and tracking systems.' },
  { icon: 'fa-plane', name: 'Travel & Hospitality', desc: 'Booking platforms, hotel management, travel apps, and customer experience solutions.' },
  { icon: 'fa-car', name: 'Automotive', desc: 'Dealer management systems, connected car platforms, and automotive e-commerce.' },
].slice(0, 9);

if (!html.includes('industries-we-serve.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../assets/css/svc-corpox.css">',
    '<link rel="stylesheet" href="../assets/css/svc-corpox.css">\n  <link rel="stylesheet" href="../assets/css/industries-we-serve.css">'
  );
}

const section = renderIndustriesParallaxSection({
  industries: extendedIndustries,
  slug: 'website-development',
  sectionId: 'industries-parallax',
  lead: 'Deep domain expertise delivering tailored technology solutions across diverse sectors — from regulated healthcare to high-growth startups.',
  pathPrefix: '../',
});

const start = html.indexOf('<section class="py-16">');
const end = html.indexOf('<section class="py-20 bg-slate-50 border-t border-slate-200">');
if (start < 0 || end < 0) throw new Error('industries.html markers not found');

html = html.slice(0, start) + section + '\n\n    ' + html.slice(end);

const scriptStart = html.indexOf('  <script>\n    const industries = [');
const scriptEnd = html.indexOf('  </script>\n  </body>');
if (scriptStart >= 0 && scriptEnd > scriptStart) {
  html = html.slice(0, scriptStart) + `  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script>
    if (typeof AOS !== 'undefined') AOS.init({ duration: 700, once: true, offset: 80 });
    document.querySelectorAll('.reveal').forEach(el => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
      }, { threshold: 0.1 });
      observer.observe(el);
    });
  </script>` + html.slice(scriptEnd);
}

fs.writeFileSync(file, html);
console.log('Patched pages/industries.html');
