/** Shared value-proposition blocks (no numerical claims). */

export const VALUE_PROPS = [
  ['fa-building', 'Enterprise-Grade Development', 'Production-ready systems built to enterprise standards.'],
  ['fa-code', 'Custom Software Solutions', 'Tailored applications aligned to your business goals.'],
  ['fa-cloud', 'Modern Cloud Architecture', 'Scalable, resilient cloud-native design patterns.'],
  ['fa-layer-group', 'Scalable Digital Platforms', 'Architecture designed to grow with your organization.'],
  ['fa-shield-alt', 'Security-First Development', 'Security and compliance embedded from day one.'],
  ['fa-diagram-project', 'Agile Delivery Methodology', 'Transparent sprints with continuous stakeholder feedback.'],
  ['fa-headset', 'Dedicated Project Support', 'Responsive guidance from discovery through launch.'],
  ['fa-industry', 'Industry-Focused Solutions', 'Domain expertise across regulated and growth sectors.'],
];

export function serviceHeroValueCards() {
  const items = VALUE_PROPS.slice(0, 4);
  return items.map(([icon, title, desc], i) =>
    `<div class="sp-card${i === 0 ? '-navy' : ''} p-6 sp-reveal sp-d${i + 1}"><div class="sp-trust-icon mb-3"><i class="fas ${icon}" aria-hidden="true"></i></div><p class="font-semibold${i === 0 ? ' text-white' : ' text-slate-800'}">${title}</p><p class="${i === 0 ? 'text-white/60' : 'text-slate-500'} text-sm mt-2">${desc}</p></div>`
  ).join('');
}

export function serviceHeroValueGrid() {
  return `<div class="grid grid-cols-2 gap-6 sp-reveal-right">${serviceHeroValueCards()}</div>`;
}

export function serviceInlineValueGrid(navy = true) {
  const items = VALUE_PROPS.slice(4, 8);
  return `<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">${items.map(([icon, title, desc], i) =>
    `<div class="${i === 0 && navy ? 'sp-card-navy' : 'sp-card'} p-6"><div class="sp-trust-icon mb-3"><i class="fas ${icon}" aria-hidden="true"></i></div><p class="font-semibold${i === 0 && navy ? ' text-white' : ' text-slate-800'}">${title}</p><p class="${i === 0 && navy ? 'text-white/60' : 'text-slate-500'} text-sm mt-2">${desc}</p></div>`
  ).join('')}</div>`;
}

export function corpValueGrid() {
  const colors = [
    'linear-gradient(135deg,#2563EB,#10A5F5)',
    'linear-gradient(135deg,#10A5F5,#22C55E)',
    'linear-gradient(135deg,#7C3AED,#2563EB)',
    'linear-gradient(135deg,#EA580C,#F59E0B)',
  ];
  const items = VALUE_PROPS.slice(0, 4);
  return `<div class="corp-grid-4">${items.map(([icon, title, desc], i) =>
    `<div class="corp-card corp-reveal corp-d${i + 1}"><div class="corp-card-icon" style="background:${colors[i]}"><i class="fas ${icon}"></i></div><h3 class="font-bold mb-1">${title}</h3><p class="text-sm text-slate-600">${desc}</p></div>`
  ).join('')}</div>`;
}

export function csValueGrid() {
  const items = VALUE_PROPS.slice(0, 4);
  return `<div class="cs-value-grid">${items.map(([icon, title, desc], i) =>
    `<div class="cs-value-card cs-reveal cs-d${i + 1}"><div class="cs-value-icon"><i class="fas ${icon}" aria-hidden="true"></i></div><h3>${title}</h3><p>${desc}</p></div>`
  ).join('')}</div>`;
}

export function pfHeroValuePills() {
  const items = VALUE_PROPS.slice(0, 4);
  return `<div class="pf-hero-values" aria-label="Why choose Guudle">${items.map(([icon, title]) =>
    `<div class="pf-hero-value"><i class="fas ${icon}" aria-hidden="true"></i><span>${title}</span></div>`
  ).join('')}</div>`;
}

export function pfOverviewValueGrid() {
  const items = VALUE_PROPS.slice(0, 4);
  return `<div class="pf-value-grid">${items.map(([icon, title, desc], i) =>
    `<article class="pf-value-card pf-reveal"><div class="pf-value-icon"><i class="fas ${icon}" aria-hidden="true"></i></div><h3>${title}</h3><p>${desc}</p></article>`
  ).join('')}</div>`;
}

export function whyPartnerSection() {
  const items = VALUE_PROPS.slice(0, 4);
  return `    <!-- Why Partner -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Guudle IT Solutions</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">Enterprise-grade delivery with the agility of a premium digital partner.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
${items.map(([icon, title, desc], i) =>
    `          <div class="sp-trust-item text-center" data-aos="fade-up" data-aos-delay="${50 + i * 50}">
            <div class="sp-trust-icon mx-auto"><i class="fas ${icon}"></i></div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-600 text-sm">${desc}</p>
          </div>`
  ).join('\n')}
        </div>
      </div>
    </section>`;
}
