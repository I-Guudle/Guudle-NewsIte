import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';
import { corpValueGrid } from './value-props.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, '..', 'pages');

const SUBNAV = [
  { file: 'about.html', label: 'About Us' },
  { file: 'testimonials.html', label: 'Testimonials' },
  { file: 'our-process.html', label: 'Our Process' },
];

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

function subnav() {
  return `<nav class="corp-subnav" aria-label="Company sections">
  <div class="corp-subnav-inner">${SUBNAV.map((l) => `<a href="${l.file}">${esc(l.label)}</a>`).join('')}</div>
</nav>`;
}

function shell({ title, desc, theme, body, active }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSiteMetaBlock({ homeHref: '../index.html', aboutHref: 'about.html' })}
  <meta name="description" content="${esc(desc)}">
  <title>${esc(title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="../assets/js/tailwind-config.js"><\/script>
  <link rel="stylesheet" href="../assets/css/styles.css">
  <link rel="stylesheet" href="../assets/css/about.css">
</head>
<body class="corp-page corp-page--${theme}" data-corp-page="${theme}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  ${subnav()}
  <main id="main">${body}</main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../assets/js/mega-menu-webdev-data.js"><\/script>
  <script src="../assets/js/mega-menu-data.js"><\/script>
  <script src="../assets/js/mega-menu-render.js"><\/script>
  <script src="../assets/js/components.js"><\/script>
  <script src="../assets/js/main.js"><\/script>
  <script src="../assets/js/about.js"><\/script>
</body>
</html>`;
}

function cta(title, sub, btn = 'Contact Us') {
  return `<section class="corp-cta"><div class="max-w-4xl mx-auto px-4 corp-reveal">
    <h2>${esc(title)}</h2><p>${esc(sub)}</p>
    <a href="contact.html" class="corp-btn corp-btn--primary">${esc(btn)} <i class="fas fa-arrow-right"></i></a>
  </div></section>`;
}

function valuePropsSection() {
  return `<section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4">${corpValueGrid()}</div></section>`;
}

function ecoLinks(exclude) {
  const icons = { 'about.html': 'fa-building', 'technology.html': 'fa-microchip', 'testimonials.html': 'fa-star', 'our-process.html': 'fa-diagram-project' };
  const colors = { 'about.html': '#2563EB', 'technology.html': '#10A5F5', 'testimonials.html': '#7C3AED', 'our-process.html': '#6366F1' };
  const desc = { 'about.html': 'Our story, vision & values', 'technology.html': 'Our tech stack', 'testimonials.html': 'Client success stories', 'our-process.html': 'How we deliver' };
  return `<section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4">
    <div class="corp-section-head corp-reveal"><h2>Explore Our Company</h2><p>Navigate the full Guudle corporate experience.</p></div>
    <div class="corp-eco-grid">${SUBNAV.filter((l) => l.file !== exclude).map((l) =>
      `<a href="${l.file}" class="corp-eco-link corp-reveal"><i class="fas ${icons[l.file]}" style="background:${colors[l.file]}"></i><div><strong>${esc(l.label)}</strong><p class="text-sm text-slate-500 mt-0.5">${esc(desc[l.file])}</p></div><i class="fas fa-arrow-right ml-auto text-slate-400"></i></a>`
    ).join('')}</div>
  </div></section>`;
}

/* ─── ABOUT US ─── */
function pageAbout() {
  const timeline = [
    ['2010', 'Founded', 'Guudle IT Solutions launched with a mission to make enterprise technology accessible.'],
    ['2014', 'Global Expansion', 'Opened delivery centers across UK, UAE, and North America.'],
    ['2018', 'Cloud & AI Practice', 'Launched dedicated cloud engineering and AI innovation lab.'],
    ['2022', 'Enterprise Growth', 'Expanded enterprise delivery across multiple industries.'],
    ['2026', 'Innovation Leader', 'Recognized as a premium partner for digital transformation worldwide.'],
  ];
  const values = [
    ['fa-lightbulb', 'Innovation', 'We embrace emerging tech to solve complex challenges.', 'linear-gradient(135deg,#2563EB,#10A5F5)'],
    ['fa-shield-halved', 'Integrity', 'Transparency and ethics guide every decision.', 'linear-gradient(135deg,#10A5F5,#22C55E)'],
    ['fa-gem', 'Excellence', 'Premium quality in every line of code and interaction.', 'linear-gradient(135deg,#7C3AED,#2563EB)'],
    ['fa-heart', 'Customer Success', 'Your outcomes define our success.', 'linear-gradient(135deg,#EA580C,#F59E0B)'],
  ];
  return shell({
    title: 'About Us',
    desc: 'About Guudle IT Solutions — mission, vision, values, and enterprise technology excellence.',
    theme: 'about',
    body: `
    <section class="corp-hero">
      <div class="corp-hero-mesh"></div>
      <div class="corp-hero-glow" style="width:400px;height:400px;background:#10A5F5;top:-100px;right:-80px;"></div>
      <div class="corp-hero-inner max-w-7xl mx-auto px-4">
        <span class="corp-badge corp-reveal"><i class="fas fa-building"></i> Corporate Excellence</span>
        <h1 class="corp-hero-title corp-reveal corp-d1">Engineering Trust at Global Scale</h1>
        <p class="corp-hero-sub corp-reveal corp-d2">Guudle IT Solutions is the trusted technology partner for organizations seeking premium software, cloud, AI, and digital transformation — delivered with integrity, innovation, and measurable impact.</p>
        <div class="flex flex-wrap gap-3 corp-reveal corp-d3 mt-6">
          <a href="contact.html" class="corp-btn corp-btn--primary" style="background:#10A5F5">Partner With Us</a>
          <a href="our-process.html" class="corp-btn corp-btn--outline">Our Process</a>
        </div>
      </div>
    </section>
${valuePropsSection()}
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Our Story</h2><p>A journey of growth, innovation, and global impact.</p></div>
      <div class="corp-timeline">${timeline.map(([y, t, d], i) =>
        `<div class="corp-timeline-item corp-reveal corp-d${(i % 3) + 1}"><span class="corp-timeline-year">${esc(y)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`
      ).join('')}</div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
      <div class="corp-card corp-reveal"><h2 class="text-2xl font-bold mb-4">Our Mission</h2><p class="text-slate-600 leading-relaxed">To empower organizations worldwide with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.</p></div>
      <div class="corp-card corp-reveal corp-d1"><h2 class="text-2xl font-bold mb-4">Our Vision</h2><p class="text-slate-600 leading-relaxed">To be the world's most trusted premium technology partner, recognized for excellence in software engineering, cloud innovation, and AI-driven transformation.</p></div>
    </div></section>
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Core Values</h2><p>The principles that guide every engagement.</p></div>
      <div class="corp-grid-4">${values.map(([icon, title, desc, grad], i) =>
        `<div class="corp-card corp-reveal corp-d${i + 1}"><div class="corp-card-icon" style="background:${grad}"><i class="fas ${icon}"></i></div><h3 class="font-bold text-lg mb-2">${esc(title)}</h3><p class="text-sm text-slate-600">${esc(desc)}</p></div>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('about.html')}
    ${cta('Ready to Transform Your Business?', 'Let\'s discuss how Guudle can accelerate your digital journey.')}
    `,
  });
}

/* ─── LEADERSHIP ─── */
function pageLeadership() {
  const leaders = [
    { initials: 'AK', name: 'Alex Kumar', role: 'CEO & Founder', bio: '20+ years leading enterprise technology firms. Former VP Engineering at a Fortune 500 fintech. Passionate about scalable innovation and client success.', tags: ['Strategy', 'Enterprise Sales', 'FinTech'], grad: 'linear-gradient(135deg,#002080,#2563EB)' },
    { initials: 'MR', name: 'Maria Rodriguez', role: 'Chief Technology Officer', bio: 'Cloud architect and AI strategist. Led platform migrations for global banks and healthcare networks. AWS & Azure certified.', tags: ['Cloud', 'AI/ML', 'Architecture'], grad: 'linear-gradient(135deg,#7C3AED,#2563EB)' },
    { initials: 'DW', name: 'David Wong', role: 'VP Engineering', bio: 'Full-stack and mobile engineering leader focused on quality delivery and high-performing engineering teams.', tags: ['Mobile', 'Full-Stack', 'DevOps'], grad: 'linear-gradient(135deg,#10A5F5,#10A5F5)' },
    { initials: 'EJ', name: 'Emily Johnson', role: 'VP Client Success', bio: 'Enterprise relationship leader with deep experience in SaaS, ERP, and long-term account growth across EMEA and Americas.', tags: ['Client Success', 'ERP', 'SaaS'], grad: 'linear-gradient(135deg,#EA580C,#F59E0B)' },
    { initials: 'RS', name: 'Rajesh Sharma', role: 'VP AI & Data', bio: 'ML engineer turned executive. Leads Guudle AI Lab — RAG, computer vision, and MLOps at enterprise scale.', tags: ['AI', 'Data Engineering', 'MLOps'], grad: 'linear-gradient(135deg,#6366F1,#2563EB)' },
    { initials: 'LC', name: 'Lisa Chen', role: 'VP Design & UX', bio: 'Award-winning product designer. Drives design systems and UX excellence across web, mobile, and enterprise portals.', tags: ['UI/UX', 'Design Systems', 'Product'], grad: 'linear-gradient(135deg,#EC4899,#7C3AED)' },
  ];
  return shell({
    title: 'Leadership',
    desc: 'Meet the Guudle IT Solutions leadership team — experienced executives driving innovation and client success.',
    theme: 'leadership',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal" style="background:rgba(18,61,106,0.1);color:#123D6A"><i class="fas fa-users"></i> Leadership Team</span>
      <h1 class="corp-hero-title corp-reveal corp-d1">Leaders Who Ship Results</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto" style="color:#64748b">Experienced executives and technologists guiding Guudle's global delivery, innovation, and client partnerships.</p>
    </div></section>
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-grid-3">${leaders.map((l, i) =>
        `<article class="corp-leader corp-reveal corp-d${(i % 3) + 1}">
          <div class="corp-leader-photo" style="background:${l.grad}"><div class="corp-leader-avatar">${esc(l.initials)}</div></div>
          <div class="corp-leader-body">
            <h3>${esc(l.name)}</h3><p class="corp-leader-role">${esc(l.role)}</p>
            <p class="corp-leader-bio">${esc(l.bio)}</p>
            <div class="corp-leader-tags">${l.tags.map((t) => `<span class="corp-tag">${esc(t)}</span>`).join('')}</div>
            <a href="https://linkedin.com" class="inline-flex items-center gap-1 text-sm font-semibold mt-3" style="color:var(--corp-accent)" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> LinkedIn</a>
          </div>
        </article>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('leadership.html')}
    ${cta('Work With Our Leadership Team', 'Schedule a strategy session with our executives.')}
    `,
  });
}

/* ─── CAREERS ─── */
function pageCareers() {
  const jobs = [
    ['Senior Full-Stack Developer', 'Remote • Full-time • Engineering'],
    ['Cloud Solutions Architect', 'Remote • Full-time • Cloud'],
    ['AI/ML Engineer', 'Remote • Full-time • AI Lab'],
    ['UI/UX Designer', 'Remote • Full-time • Design'],
    ['DevOps Engineer', 'Remote • Full-time • DevOps'],
    ['Project Manager', 'Remote • Full-time • Delivery'],
  ];
  const perks = [
    ['fa-globe', 'Remote-Friendly', 'Work from anywhere with flexible hours.'],
    ['fa-users', 'Global Teams', 'Collaborate with distributed global teams.'],
    ['fa-graduation-cap', 'Learning Budget', 'Certifications and training funded.'],
    ['fa-rocket', 'Innovation Culture', 'Build cutting-edge enterprise products.'],
  ];
  return shell({
    title: 'Careers',
    desc: 'Careers at Guudle IT Solutions — join our global team of engineers, designers, and innovators.',
    theme: 'careers',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal"><i class="fas fa-briefcase"></i> Join Our Team</span>
      <h1 class="corp-hero-title corp-reveal corp-d1">Build the Future With Us</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto">Join a global team of passionate engineers, designers, and consultants shaping enterprise technology worldwide.</p>
      <a href="#jobs" class="corp-btn corp-btn--primary corp-reveal corp-d3 mt-4" style="background:#fff;color:#10A5F5">View Open Positions</a>
    </div></section>
    ${valuePropsSection()}
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Life at Guudle</h2><p>Culture, benefits, and growth opportunities.</p></div>
      <div class="corp-culture-grid corp-reveal mb-10">
        <div class="corp-culture-item" style="background:linear-gradient(135deg,#10A5F5,#10A5F5)"><i class="fas fa-laptop-house"></i><span>Remote-first</span></div>
        <div class="corp-culture-item" style="background:linear-gradient(135deg,#2563EB,#7C3AED)"><i class="fas fa-people-group"></i><span>Team retreats</span></div>
        <div class="corp-culture-item" style="background:linear-gradient(135deg,#EA580C,#F59E0B)"><i class="fas fa-code"></i><span>Hack weeks</span></div>
        <div class="corp-culture-item" style="background:linear-gradient(135deg,#002080,#2563EB)"><i class="fas fa-heart-pulse"></i><span>Wellness perks</span></div>
      </div>
      <div class="corp-grid-4">${perks.map(([icon, t, d], i) =>
        `<div class="corp-card corp-reveal corp-d${i + 1}"><div class="corp-card-icon" style="background:linear-gradient(135deg,#10A5F5,#10A5F5)"><i class="fas ${icon}"></i></div><h3 class="font-bold mb-1">${esc(t)}</h3><p class="text-sm text-slate-600">${esc(d)}</p></div>`
      ).join('')}</div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-3xl mx-auto px-4 corp-reveal">
      <blockquote class="corp-testimonial-inner text-center">
        <p class="text-slate-600 italic mb-4">"The learning culture here is unmatched. I went from mid-level to lead in 18 months with full certification support."</p>
        <p class="font-bold text-sm">Anika Patel</p>
        <p class="text-xs text-slate-500">Senior Cloud Engineer · 3 years at Guudle</p>
      </blockquote>
    </div></section>
    <section class="corp-section" id="jobs"><div class="max-w-3xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Open Positions</h2><p>Find your next role on our global team.</p></div>
      <div class="space-y-3">${jobs.map(([t, m], i) =>
        `<article class="corp-job corp-reveal corp-d${(i % 3) + 1}"><div><h3 class="font-bold">${esc(t)}</h3><p class="text-sm text-slate-500">${esc(m)}</p></div><a href="contact.html" class="corp-btn corp-btn--primary text-sm py-2 px-4">Apply Now</a></article>`
      ).join('')}</div>
    </div></section>
    <section class="corp-section"><div class="max-w-3xl mx-auto px-4 corp-reveal">
      <div class="corp-section-head"><h2>Recruitment Process</h2></div>
      <div class="corp-grid-2 text-sm">
        <div class="corp-card"><strong>1. Apply</strong><p class="text-slate-600 mt-1">Submit your application and portfolio.</p></div>
        <div class="corp-card"><strong>2. Interview</strong><p class="text-slate-600 mt-1">Technical and culture fit conversations.</p></div>
        <div class="corp-card"><strong>3. Offer</strong><p class="text-slate-600 mt-1">Competitive package and onboarding plan.</p></div>
        <div class="corp-card"><strong>4. Launch</strong><p class="text-slate-600 mt-1">Join your team and start making impact.</p></div>
      </div>
    </div></section>
    ${ecoLinks('careers.html')}
    ${cta('Join Our Team', 'We\'re always looking for exceptional talent.', 'Apply Today')}
    `,
  });
}

/* ─── AWARDS ─── */
function pageAwards() {
  const awards = [
    ['fa-trophy', 'Best Enterprise Software Partner 2025', 'Tech Excellence Awards'],
    ['fa-medal', 'Top AI Innovation Firm', 'Global IT Summit'],
    ['fa-star', 'Client Success Leader', 'B2B Review Platform'],
    ['fa-certificate', 'AWS Advanced Consulting Partner', 'Amazon Web Services'],
    ['fa-certificate', 'Microsoft Gold Partner', 'Microsoft'],
    ['fa-shield-halved', 'ISO 27001 Certified', 'Information Security'],
  ];
  return shell({
    title: 'Awards & Certifications',
    desc: 'Guudle IT Solutions awards, certifications, and industry recognition.',
    theme: 'awards',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal"><i class="fas fa-award"></i> Recognition & Trust</span>
      <h1 class="corp-hero-title corp-reveal corp-d1">Awards & Certifications</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto">Industry recognition and compliance standards that validate our commitment to excellence.</p>
    </div></section>
${valuePropsSection()}
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-grid-3">${awards.map(([icon, title, sub], i) =>
        `<div class="corp-award corp-reveal corp-d${(i % 3) + 1}"><i class="fas ${icon}"></i><h3 class="font-bold text-sm mb-1">${esc(title)}</h3><p class="text-xs text-slate-500">${esc(sub)}</p></div>`
      ).join('')}</div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-3xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Compliance Standards</h2></div>
      <div class="flex flex-wrap justify-center gap-2">${['ISO 27001', 'GDPR', 'HIPAA Ready', 'SOC 2', 'PCI DSS'].map((t) => `<span class="corp-tag text-base px-4 py-2">${esc(t)}</span>`).join('')}</div>
    </div></section>
    ${ecoLinks('awards-certifications.html')}
    ${cta('Partner With a Certified Leader', 'Work with a team backed by industry recognition.')}
    `,
  });
}

/* ─── TESTIMONIALS ─── */
function pageTestimonials() {
  const items = [
    { name: 'Sarah Mitchell', co: 'NovaBank', type: 'Cloud Migration', quote: 'Guudle migrated our core banking platform to AWS with zero downtime. Their engineering discipline and communication were exceptional.', stars: 5 },
    { name: 'James Okonkwo', co: 'MediCare Global', type: 'Mobile App', quote: 'The telemedicine app they built serves patients across multiple regions. Clinicians love it, and our App Store rating speaks for itself.', stars: 5 },
    { name: 'Elena Vasquez', co: 'RetailMax', type: 'AI Analytics', quote: 'Their AI demand forecasting improved our inventory efficiency measurably. ROI was visible within the first quarter of go-live.', stars: 5 },
    { name: 'Tom Bradley', co: 'LogiFlow', type: 'ERP Implementation', quote: 'A complex SAP rollout across 6 regions — delivered on time with measurable savings from day one. True enterprise partners.', stars: 5 },
    { name: 'Priya Nair', co: 'EduLearn', type: 'SaaS Platform', quote: 'From MVP to a growing customer base in year one. Guudle understood product, not just code.', stars: 5 },
    { name: 'Marcus Chen', co: 'SecureChain', type: 'Blockchain', quote: 'Audited smart contracts, polished dApp, mainnet on schedule. Investors were impressed.', stars: 5 },
  ];
  return shell({
    title: 'Client Testimonials',
    desc: 'Client testimonials and success stories from Guudle IT Solutions enterprise projects.',
    theme: 'testimonials',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal" style="background:rgba(255,255,255,0.12);color:#C4B5FD"><i class="fas fa-star"></i> Client Success</span>
      <h1 class="corp-hero-title corp-reveal corp-d1">Trusted by Industry Leaders</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto">Real feedback from clients who achieved measurable results with Guudle.</p>
    </div></section>
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-carousel corp-reveal">
        <div class="corp-carousel-track">${items.map((t) =>
          `<div class="corp-testimonial"><div class="corp-testimonial-inner">
            <div class="corp-stars">${'★'.repeat(t.stars)}</div>
            <p class="text-slate-600 text-sm leading-relaxed mb-4">"${esc(t.quote)}"</p>
            <p class="font-bold text-sm">${esc(t.name)}</p>
            <p class="text-xs text-slate-500">${esc(t.co)} · ${esc(t.type)}</p>
          </div></div>`
        ).join('')}</div>
        <div class="corp-carousel-nav">
          <button type="button" class="corp-carousel-btn" data-corp-prev aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
          <button type="button" class="corp-carousel-btn" data-corp-next aria-label="Next"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-section-head corp-reveal"><h2>Clients We Serve</h2></div>
      <div class="corp-client-logos corp-reveal">${['NovaBank', 'MediCare', 'RetailMax', 'LogiFlow', 'EduLearn', 'SecureChain'].map((l) =>
        `<span class="corp-client-logo">${esc(l)}</span>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('testimonials.html')}
    ${cta('Become Our Next Success Story', 'Let\'s discuss your project goals.')}
    `,
  });
}

/* ─── PARTNERSHIPS ─── */
function pagePartnerships() {
  const partners = ['Microsoft', 'Google Cloud', 'Oracle', 'IBM', 'Alibaba Cloud', 'AWS', 'Azure', 'Salesforce', 'SAP', 'ServiceNow'];
  return shell({
    title: 'Partnerships',
    desc: 'Guudle technology partnerships with Microsoft, Google, AWS, Oracle, IBM, and leading enterprise platforms.',
    theme: 'partnerships',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal" style="background:rgba(37,99,235,0.1);color:#2563EB"><i class="fas fa-handshake"></i> Strategic Alliances</span>
      <h1 class="corp-hero-title corp-reveal corp-d1" style="color:#002080">Technology Partnerships</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto" style="color:#64748b">Certified alliances with the world's leading cloud, enterprise, and innovation platforms.</p>
    </div></section>
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-marquee corp-reveal"><div class="corp-marquee-track">${[...partners, ...partners].map((p) => `<span class="corp-partner-logo">${esc(p)}</span>`).join('')}</div></div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-grid-3">${[
        ['Microsoft', 'Gold Partner — Azure, Dynamics 365, Power Platform delivery.'],
        ['Google Cloud', 'Partner — data analytics, AI, and cloud-native solutions.'],
        ['AWS', 'Advanced Consulting Partner — migration, DevOps, and serverless.'],
        ['Oracle', 'Implementation partner for ERP and database modernization.'],
        ['IBM', 'Enterprise integration and hybrid cloud solutions.'],
        ['Alibaba Cloud', 'APAC cloud infrastructure and global expansion.'],
      ].map(([name, desc], i) =>
        `<div class="corp-card corp-reveal corp-d${(i % 3) + 1}"><h3 class="font-bold text-lg mb-2">${esc(name)}</h3><p class="text-sm text-slate-600">${esc(desc)}</p></div>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('partnerships.html')}
    ${cta('Leverage Our Partner Ecosystem', 'Access certified expertise across leading platforms.')}
    `,
  });
}

/* ─── GLOBAL PRESENCE ─── */
function pageGlobal() {
  const offices = [
    ['London, UK', 'HQ & EMEA Delivery'],
    ['Dubai, UAE', 'Middle East & Africa'],
    ['New York, USA', 'Americas'],
    ['Singapore', 'APAC Hub'],
    ['Toronto, Canada', 'North America Engineering'],
  ];
  const mapDots = [[22, 38], [58, 42], [18, 35], [78, 55], [15, 28]];
  return shell({
    title: 'Global Presence',
    desc: 'Guudle IT Solutions global presence — offices and delivery centers worldwide.',
    theme: 'global',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal"><i class="fas fa-globe"></i> Worldwide Reach</span>
      <h1 class="corp-hero-title corp-reveal corp-d1">Global Presence</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto">Delivering enterprise technology solutions across continents with local expertise and global standards.</p>
    </div></section>
${valuePropsSection()}
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-map corp-reveal" aria-hidden="true">${mapDots.map(([l, t], i) =>
        `<span class="corp-map-dot" style="left:${l}%;top:${t}%;animation-delay:${i * 0.4}s"></span>`
      ).join('')}</div>
      <div class="corp-grid-3 mt-8">${offices.map(([city, role], i) =>
        `<div class="corp-card corp-reveal corp-d${(i % 3) + 1}"><i class="fas fa-location-dot mb-2" style="color:var(--corp-accent)"></i><h3 class="font-bold">${esc(city)}</h3><p class="text-sm text-slate-600">${esc(role)}</p></div>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('global-presence.html')}
    ${cta('Work With a Global Partner', 'Local presence, global delivery capability.')}
    `,
  });
}

/* ─── OUR PROCESS ─── */
function pageProcess() {
  const steps = [
    ['01', 'Discovery & Strategy', 'Understand goals, constraints, and success metrics.'],
    ['02', 'Planning & Architecture', 'Blueprint systems, integrations, and delivery roadmap.'],
    ['03', 'Design & Prototyping', 'UX flows, wireframes, and validated prototypes.'],
    ['04', 'Development & Integration', 'Agile sprints with continuous client feedback.'],
    ['05', 'Testing & QA', 'Automated and manual testing for quality assurance.'],
    ['06', 'Deployment & Launch', 'Zero-downtime releases and go-live support.'],
    ['07', 'Support & Optimization', 'Monitoring, enhancements, and long-term partnership.'],
  ];
  return shell({
    title: 'Our Process',
    desc: 'Guudle IT Solutions delivery process — from discovery to deployment and ongoing support.',
    theme: 'process',
    body: `
    <section class="corp-hero"><div class="corp-hero-inner max-w-7xl mx-auto px-4 text-center">
      <span class="corp-badge corp-reveal" style="background:rgba(99,102,241,0.1);color:#6366F1"><i class="fas fa-diagram-project"></i> Delivery Excellence</span>
      <h1 class="corp-hero-title corp-reveal corp-d1" style="color:#002080">Our Process</h1>
      <p class="corp-hero-sub corp-reveal corp-d2 mx-auto" style="color:#64748b">A proven enterprise workflow from strategy through launch and beyond.</p>
    </div></section>
    <section class="corp-section"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-process corp-reveal">${steps.map(([n, t, d]) =>
        `<div class="corp-process-step"><div class="corp-process-num">${n}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`
      ).join('')}</div>
    </div></section>
    <section class="corp-section corp-section--gray"><div class="max-w-7xl mx-auto px-4">
      <div class="corp-grid-3">${[
        ['Agile Delivery', 'Two-week sprints with demos and transparent progress.'],
        ['Quality Gates', 'Code review, automated tests, and security scans at every phase.'],
        ['Client Partnership', 'Dedicated PM and direct access to engineering leads.'],
      ].map(([t, d], i) =>
        `<div class="corp-card corp-reveal corp-d${i + 1}"><h3 class="font-bold mb-2">${esc(t)}</h3><p class="text-sm text-slate-600">${esc(d)}</p></div>`
      ).join('')}</div>
    </div></section>
    ${ecoLinks('our-process.html')}
    ${cta('Start Your Project Today', 'Experience our proven delivery methodology firsthand.')}
    `,
  });
}

const pages = [
  ['about.html', pageAbout],
  ['testimonials.html', pageTestimonials],
];

for (const [file, builder] of pages) {
  fs.writeFileSync(path.join(PAGES_DIR, file), builder(), 'utf8');
  console.log(`✓ ${file}`);
}
console.log(`\nGenerated ${pages.length} corporate about ecosystem pages.`);
