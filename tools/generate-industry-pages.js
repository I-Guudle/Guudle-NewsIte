/**
 * Generates dedicated industry landing pages in pages/industries/.
 * Run: node tools/generate-industry-pages.js
 */
const fs = require('fs');
const path = require('path');

const INDUSTRIES = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'heart-pulse',
    tags: ['HIPAA', 'HL7/FHIR', 'Cloud'],
    eyebrow: 'Healthcare technology',
    headline: 'Systems that support clinical work, not get in its way',
    lead: 'Patient portals, care coordination, and EHR-ready platforms built around real clinical workflows, privacy, and the way care teams actually operate.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=82&auto=format&fit=crop',
    alt: 'Clinicians reviewing patient information on a healthcare platform',
    challenges: [
      { title: 'Fragmented records', body: 'Care teams lose time reconciling data across EHR, labs, pharmacies, and patient-facing tools.' },
      { title: 'Privacy and access', body: 'Patient data must be protected with role-based access, audit trails, and consent that holds up in practice.' },
      { title: 'Adoption in the clinic', body: 'A system that looks complete but slows a ward round will not be used. Workflow fit is part of the design.' },
    ],
    deliver: [
      { title: 'Patient and clinician portals', body: 'Appointments, results, messaging, and records with proxy access where policy allows.' },
      { title: 'Care coordination', body: 'Referrals, discharge tasks, and multi-site scheduling that respect rooms, credentials, and equipment.' },
      { title: 'EHR-ready integration', body: 'HL7/FHIR and vendor APIs so the system of record stays the system of record.' },
      { title: 'Operational dashboards', body: 'Capacity, wait times, and quality indicators that operations teams can act on.' },
    ],
    related: [
      { href: '../services/healthcare-platforms.html', title: 'Healthcare Platforms', body: 'Patient portals, EMR, telemedicine, and hospital digital systems.' },
      { href: '../services/custom-software-development.html', title: 'Custom Software', body: 'Applications shaped to how your organisation actually works.' },
      { href: '../services/mobile-app.html', title: 'Mobile Applications', body: 'iOS and Android products for patients, clinicians, and field teams.' },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: 'landmark',
    tags: ['PCI-DSS', 'APIs', 'Encryption'],
    eyebrow: 'Financial technology',
    headline: 'Secure platforms for payments, banking, and financial operations',
    lead: 'Fintech and banking systems with encryption, audit trails, and real-time data flows — designed so operations, risk, and customers can trust what they see.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=82&auto=format&fit=crop',
    alt: 'Financial operations dashboard and payment systems',
    challenges: [
      { title: 'Control without friction', body: 'Customers expect speed. Risk and operations need traces, limits, and explanations for every material action.' },
      { title: 'Integration density', body: 'Core banking, payments, KYC, ledgers, and reporting rarely live in one product. The seams have to be intentional.' },
      { title: 'Change under scrutiny', body: 'New features land in environments that are audited. Delivery has to stay disciplined as the product evolves.' },
    ],
    deliver: [
      { title: 'Payments and ledgers', body: 'Money movement, reconciliation, and operational views that stay consistent under load.' },
      { title: 'Customer and advisor portals', body: 'Onboarding, accounts, and self-service with the controls your compliance team requires.' },
      { title: 'APIs and partner rails', body: 'Documented interfaces for banks, processors, and internal systems.' },
      { title: 'Reporting and audit support', body: 'Event history, access logs, and extracts that operations and audit can actually use.' },
    ],
    related: [
      { href: '../services/fintech-platforms.html', title: 'Fintech Platforms', body: 'Payments, banking, and compliance-aware financial products.' },
      { href: '../services/custom-software-development.html', title: 'Custom Software', body: 'Secure applications built around your operating model.' },
      { href: '../services/data-analytics.html', title: 'Data & Analytics', body: 'Reporting and insight on operational and customer data.' },
    ],
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'bag-shopping',
    tags: ['E-commerce', 'Analytics', 'CRM'],
    eyebrow: 'Retail and commerce',
    headline: 'Connected commerce across store, web, and operations',
    lead: 'Inventory, CRM, and analytics working across every channel — so stock, customers, and orders are one operating picture rather than three separate systems.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=82&auto=format&fit=crop',
    alt: 'Retail commerce and in-store operations',
    challenges: [
      { title: 'Channel silos', body: 'Web, marketplace, and store often hold different truths about stock, price, and the customer.' },
      { title: 'Peak demand', body: 'Promotions and seasonal peaks expose weak architecture faster than any planning workshop.' },
      { title: 'Operational follow-through', body: 'An order is not complete at checkout. Fulfilment, returns, and service have to stay in the same story.' },
    ],
    deliver: [
      { title: 'Commerce platforms', body: 'Stores and catalogues designed for conversion, merchandising, and growth.' },
      { title: 'Inventory and order flow', body: 'A single view of stock, allocation, and fulfilment across channels.' },
      { title: 'Customer and CRM systems', body: 'Identity, history, and service tools that store and digital teams can both use.' },
      { title: 'Retail analytics', body: 'Demand, basket, and operations reporting that merchandising can act on.' },
    ],
    related: [
      { href: '../services/ecommerce.html', title: 'eCommerce Development', body: 'High-converting stores and digital commerce platforms.' },
      { href: '../services/crm.html', title: 'CRM Development', body: 'Customer systems for sales, service, and retention.' },
      { href: '../services/data-analytics.html', title: 'Data & Analytics', body: 'Channel and operations insight for retail teams.' },
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'industry',
    tags: ['IoT', 'ERP', 'Operations'],
    eyebrow: 'Manufacturing technology',
    headline: 'Connect the factory floor to the systems that run the business',
    lead: 'Machine health, production visibility, and ERP integration — so operations can see what is happening on the line and act before a delay becomes a shortage.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=82&auto=format&fit=crop',
    alt: 'Manufacturing operations and industrial systems',
    challenges: [
      { title: 'Shop-floor visibility', body: 'Production status often lives in local systems, whiteboards, or tribal knowledge rather than in ERP.' },
      { title: 'Legacy equipment', body: 'Useful machines are not always network-ready. Integration has to respect what is already on the floor.' },
      { title: 'Quality and traceability', body: 'When something fails, operations need to know which batch, which line, and which supplier was involved.' },
    ],
    deliver: [
      { title: 'Operations dashboards', body: 'Line status, throughput, and exceptions that supervisors can use in the moment.' },
      { title: 'ERP and MES integration', body: 'Orders, inventory, and production data connected without duplicating the system of record.' },
      { title: 'IoT and machine data', body: 'Signals from equipment turned into maintenance and production insight.' },
      { title: 'Quality workflows', body: 'Checks, holds, and traceability that follow the product through the plant.' },
    ],
    related: [
      { href: '../services/iot.html', title: 'IoT Solutions', body: 'Connected equipment and operational telemetry.' },
      { href: '../services/erp.html', title: 'ERP Development', body: 'Planning and operations systems the plant can actually run on.' },
      { href: '../services/data-engineering.html', title: 'Data Engineering', body: 'Pipelines from the floor to reporting and planning.' },
    ],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    icon: 'truck',
    tags: ['GPS/TMS', 'Real-time', 'APIs'],
    eyebrow: 'Logistics and supply chain',
    headline: 'Live visibility from warehouse to last mile',
    lead: 'Fleet tracking, route planning, and delivery updates that operations, customers, and partners can share — without maintaining three different versions of the truth.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=82&auto=format&fit=crop',
    alt: 'Logistics warehouse and fleet operations',
    challenges: [
      { title: 'Late information', body: 'If location and ETA arrive after the customer has already called, the system is not doing its job.' },
      { title: 'Partner complexity', body: 'Carriers, warehouses, and customers all need different views of the same movement.' },
      { title: 'Exception handling', body: 'The plan is not the work. Delays, failed deliveries, and reroutes need a controlled path.' },
    ],
    deliver: [
      { title: 'Tracking and visibility', body: 'Live location, status, and customer-facing updates from a single operational feed.' },
      { title: 'Routing and dispatch', body: 'Planning tools that dispatchers can override when the day does not go to plan.' },
      { title: 'Warehouse systems', body: 'Inbound, pick, pack, and inventory connected to the rest of the network.' },
      { title: 'Partner APIs', body: 'Interfaces for carriers, marketplaces, and internal ERP without fragile file drops.' },
    ],
    related: [
      { href: '../services/custom-software-development.html', title: 'Custom Software', body: 'TMS, WMS, and operational platforms built to your network.' },
      { href: '../services/mobile-app.html', title: 'Mobile Applications', body: 'Driver, warehouse, and customer apps that stay in sync.' },
      { href: '../services/api-development.html', title: 'API Development', body: 'Reliable interfaces across carriers and internal systems.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    icon: 'graduation-cap',
    tags: ['LMS', 'SSO', 'Mobile'],
    eyebrow: 'Education technology',
    headline: 'Learning platforms students and staff will actually use',
    lead: 'Online learning, student tools, and institutional systems with straightforward login, mobile access, and the administration schools and universities cannot skip.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=82&auto=format&fit=crop',
    alt: 'Students and educators using a digital learning platform',
    challenges: [
      { title: 'Access and identity', body: 'Students, parents, faculty, and administrators need different access without a maze of logins.' },
      { title: 'Content and assessment', body: 'Courses, submissions, and grades have to stay coherent as cohorts and terms change.' },
      { title: 'Mobile-first use', body: 'Much of the real work happens on a phone between classes, not at a desktop during office hours.' },
    ],
    deliver: [
      { title: 'Learning platforms', body: 'Course delivery, progress, and assessment that teaching staff can run without a specialist on call.' },
      { title: 'Student and parent portals', body: 'Timetables, results, fees, and communication in one place.' },
      { title: 'SSO and identity', body: 'Institutional login, roles, and cohort access that match how the organisation is structured.' },
      { title: 'Mobile learning apps', body: 'iOS and Android experiences for study, attendance, and campus services.' },
    ],
    related: [
      { href: '../services/web-application.html', title: 'Web Applications', body: 'Portals and platforms for students, faculty, and administration.' },
      { href: '../services/mobile-app.html', title: 'Mobile Applications', body: 'Learning and campus apps for iOS and Android.' },
      { href: '../services/saas-development.html', title: 'SaaS Development', body: 'Multi-tenant education products built to grow.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'building',
    tags: ['CRM', 'Portals', 'Listings'],
    eyebrow: 'Property technology',
    headline: 'Listings, leads, and property operations in one environment',
    lead: 'Property listing platforms, agent CRM, and client portals — so inventory, enquiries, and viewings are managed as a process rather than a pile of spreadsheets and chats.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=82&auto=format&fit=crop',
    alt: 'Modern residential and commercial property',
    challenges: [
      { title: 'Lead leakage', body: 'Enquiries arrive from portals, walk-ins, and referrals. If they are not captured cleanly, they disappear.' },
      { title: 'Listing quality', body: 'Photos, availability, and legal status change. Public pages have to stay in step with operations.' },
      { title: 'Handover to operations', body: 'Once a deal closes, property management, tenancy, and service still need a system.' },
    ],
    deliver: [
      { title: 'Listing and search', body: 'Public and agent-facing inventory with filters, media, and accurate availability.' },
      { title: 'CRM for agents', body: 'Pipelines, viewings, and follow-up that match how agencies actually sell.' },
      { title: 'Client portals', body: 'Documents, offers, and progress without chasing email threads.' },
      { title: 'Property operations', body: 'Tenancy, maintenance, and owner reporting where the portfolio requires it.' },
    ],
    related: [
      { href: '../services/crm.html', title: 'CRM Development', body: 'Pipelines and customer systems for agencies and developers.' },
      { href: '../services/web-portal-development.html', title: 'Web Portals', body: 'Buyer, tenant, and owner portals with the right access.' },
      { href: '../services/website-development.html', title: 'Website Development', body: 'Property sites built to convert enquiry, not just display stock.' },
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    icon: 'cloud',
    tags: ['Multi-tenant', 'Cloud', 'APIs'],
    eyebrow: 'Software as a service',
    headline: 'Subscription products built to be operated, not just launched',
    lead: 'Multi-tenant platforms with the tenancy, billing, and APIs a SaaS business needs after the first customers arrive — architecture that can grow without a rewrite at the first scale event.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=82&auto=format&fit=crop',
    alt: 'SaaS product analytics and cloud platform',
    challenges: [
      { title: 'Tenancy and isolation', body: 'Customers expect their data to be theirs. The platform has to enforce that as a default, not a hope.' },
      { title: 'Product versus project', body: 'SaaS is operated continuously. Roadmaps, releases, and support have to be designed in from the start.' },
      { title: 'Integrations as a product', body: 'APIs, webhooks, and admin tools are part of what customers buy, not an afterthought.' },
    ],
    deliver: [
      { title: 'Multi-tenant platforms', body: 'Cloud products with tenancy, roles, and environments that operations can run.' },
      { title: 'Billing and lifecycle', body: 'Plans, trials, upgrades, and account states that match how you sell.' },
      { title: 'Product APIs', body: 'Documented interfaces and webhooks your customers and partners can depend on.' },
      { title: 'Admin and observability', body: 'The internal tools your team needs to support customers without opening a database.' },
    ],
    related: [
      { href: '../services/saas-development.html', title: 'SaaS Development', body: 'Secure, scalable subscription platforms.' },
      { href: '../services/saas-platforms.html', title: 'SaaS Platforms', body: 'Multi-tenant products engineered for growth.' },
      { href: '../services/cloud-solutions.html', title: 'Cloud Solutions', body: 'Architecture and delivery for cloud-native products.' },
    ],
  },
  {
    slug: 'government',
    name: 'Government',
    icon: 'landmark-dome',
    tags: ['Security', 'Accessibility', 'Compliance'],
    eyebrow: 'Public sector technology',
    headline: 'Citizen services that are secure, accessible, and usable',
    lead: 'Digital services for public organisations — designed so people can complete the task, staff can operate the process, and security and accessibility are not optional extras.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a153?w=900&q=82&auto=format&fit=crop',
    alt: 'Public sector and civic digital services',
    challenges: [
      { title: 'Trust and scrutiny', body: 'Public services are used by people who did not choose the vendor. Clarity, fairness, and auditability matter.' },
      { title: 'Accessibility as a requirement', body: 'If a service cannot be used by the people it is for, it is not finished — regardless of how complete the backlog looks.' },
      { title: 'Legacy estates', body: 'New services usually have to sit alongside systems that cannot be replaced in a single programme.' },
    ],
    deliver: [
      { title: 'Citizen-facing services', body: 'Applications, payments, and case tracking that people can complete without specialist help.' },
      { title: 'Staff case systems', body: 'Queues, evidence, and decisions that case workers can run day to day.' },
      { title: 'Accessible delivery', body: 'Interfaces and content designed to meet accessibility expectations from the start.' },
      { title: 'Secure integration', body: 'Identity, records, and departmental systems connected with clear access rules.' },
    ],
    related: [
      { href: '../services/web-portal-development.html', title: 'Web Portals', body: 'Citizen and staff portals with the right access model.' },
      { href: '../services/legacy-modernization.html', title: 'Legacy Modernization', body: 'Evolve existing estates without unnecessary disruption.' },
      { href: '../services/it-consulting.html', title: 'IT Consulting', body: 'Architecture and delivery advice for public programmes.' },
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    icon: 'shield-halved',
    tags: ['Claims', 'Compliance', 'Data'],
    eyebrow: 'Insurance technology',
    headline: 'Claims, policies, and portals customers can trust',
    lead: 'Policy administration, claims handling, and self-service — so customers can see where they stand, and operations can process work with the controls the line of business requires.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=82&auto=format&fit=crop',
    alt: 'Insurance policy and claims operations',
    challenges: [
      { title: 'Opaque journeys', body: 'Customers abandon processes they cannot follow. Status, documents, and next steps have to be visible.' },
      { title: 'Claims complexity', body: 'Intake, assessment, payments, and exceptions involve many roles. The workflow has to match that reality.' },
      { title: 'Product change', body: 'New products and rules should not require a full rebuild of the servicing stack.' },
    ],
    deliver: [
      { title: 'Policy and servicing portals', body: 'Quotes, documents, and policy changes customers and brokers can complete themselves where policy allows.' },
      { title: 'Claims workflows', body: 'Intake, assignment, evidence, and settlement with a clear audit path.' },
      { title: 'Broker and agent tools', body: 'Pipelines and case handling for distribution partners.' },
      { title: 'Operational reporting', body: 'Volumes, cycle times, and leakage indicators for operations and actuarial teams.' },
    ],
    related: [
      { href: '../services/custom-software-development.html', title: 'Custom Software', body: 'Policy, claims, and servicing systems built to your products.' },
      { href: '../services/workflow-automation.html', title: 'Workflow Automation', body: 'Reduce manual hand-offs in claims and underwriting.' },
      { href: '../services/data-analytics.html', title: 'Data & Analytics', body: 'Operational and portfolio insight for insurance teams.' },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: 'hotel',
    tags: ['Booking', 'POS', 'Mobile'],
    eyebrow: 'Hospitality technology',
    headline: 'Bookings, guest experience, and property operations together',
    lead: 'Reservation systems, guest apps, and point of sale that keep hotels, restaurants, and venues running — so front of house and operations share the same picture of the guest.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=82&auto=format&fit=crop',
    alt: 'Hospitality property and guest experience',
    challenges: [
      { title: 'Disconnected guest data', body: 'Booking, stay, dining, and service often live in different systems. Staff then reconstruct the guest at the desk.' },
      { title: 'Peak service', body: 'Check-in, kitchen, and events fail in public. The software has to stay calm when the property is busy.' },
      { title: 'Multi-property control', body: 'Groups need consistency without forcing every site into an identical, unusable process.' },
    ],
    deliver: [
      { title: 'Booking and availability', body: 'Reservations, rates, and inventory that channels and the front desk can both trust.' },
      { title: 'Guest apps and portals', body: 'Pre-arrival, stay services, and post-stay communication on web and mobile.' },
      { title: 'POS and operations', body: 'Ordering, billing, and property operations connected to the guest record.' },
      { title: 'Group reporting', body: 'Occupancy, revenue, and service metrics across properties.' },
    ],
    related: [
      { href: '../services/web-application.html', title: 'Web Applications', body: 'Booking, guest, and operations platforms.' },
      { href: '../services/mobile-app.html', title: 'Mobile Applications', body: 'Guest and staff apps for stay and service.' },
      { href: '../services/crm.html', title: 'CRM Development', body: 'Guest history and loyalty that properties can actually use.' },
    ],
  },
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pageHtml(ind) {
  const others = INDUSTRIES.filter((x) => x.slug !== ind.slug);
  const url = `https://guudle.com/pages/industries/${ind.slug}.html`;
  const desc = esc(ind.lead);
  const title = `${esc(ind.name)} Industry Solutions | Guudle IT Solutions`;

  const tags = ind.tags.map((t) => `<li>${esc(t)}</li>`).join('');
  const challenges = ind.challenges.map((c, i) => `
          <article class="gind-card" data-aos="fade-up" data-aos-delay="${i * 50}">
            <span class="gind-num">0${i + 1}</span>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.body)}</p>
          </article>`).join('');
  const deliver = ind.deliver.map((c, i) => `
          <article class="gind-card" data-aos="fade-up" data-aos-delay="${i * 40}">
            <span class="gind-num">0${i + 1}</span>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.body)}</p>
          </article>`).join('');
  const related = ind.related.map((r) => `
          <a href="${esc(r.href)}" data-aos="fade-up">
            <h3>${esc(r.title)}</h3>
            <p>${esc(r.body)}</p>
          </a>`).join('');
  const otherLinks = others.map((o) => `
          <a href="${esc(o.slug)}.html" data-aos="fade-up">
            <h3>${esc(o.name)}</h3>
            <p>${esc(o.lead)}</p>
          </a>`).join('');

  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${ind.name} Industry Solutions`,
        description: ind.lead,
        url,
        publisher: { '@type': 'Organization', name: 'Guudle IT Solutions', url: 'https://guudle.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://guudle.com/' },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://guudle.com/pages/industries.html' },
          { '@type': 'ListItem', position: 3, name: ind.name, item: url },
        ],
      },
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="copyright" content="© 2026 Guudle IT Solutions. All rights reserved.">
  <meta name="publisher" content="Guudle IT Solutions">
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${esc(ind.image)}">
  <title>${title}</title>
  <script type="application/ld+json">${ld}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../../assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-landing-shared.css">
  <link rel="stylesheet" href="../../assets/css/home.css">
  <link rel="stylesheet" href="../../assets/css/industry-page.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">
  <link rel="stylesheet" href="../../assets/css/brand-system.css">
  <link rel="stylesheet" href="../../assets/css/enterprise-system.css">
</head>
<body class="gind-page slp-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium" data-slp-prefix="svc">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="slp-scroll-progress" data-svc-scroll-progress aria-hidden="true"></div>
  <button type="button" class="slp-back-top" data-svc-back-top aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
  <div id="header-placeholder"></div>
  <main id="main">

    <section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="gind-hero-heading" data-svc-hero>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">
          <div class="order-2 lg:order-1 max-w-xl">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a>
              <span class="mx-2 text-slate-300">/</span>
              <a href="../industries.html" class="hover:text-slate-800 transition-colors">Industries</a>
              <span class="mx-2 text-slate-300">/</span>
              <span class="text-[#0B1F3A] font-semibold">${esc(ind.name)}</span>
            </nav>
            <p class="gind-kicker">${esc(ind.eyebrow)}</p>
            <h1 id="gind-hero-heading" class="hero-title-navy font-display text-[2.15rem] sm:text-4xl xl:text-[3rem] font-extrabold leading-[1.08] mb-5">${esc(ind.headline)}</h1>
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">${esc(ind.lead)}</p>
            <div class="flex flex-wrap gap-3 mb-8">
              <a href="../contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start a conversation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#gind-deliver" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm">What we deliver</a>
            </div>
            <ul class="gind-pills">${tags}</ul>
          </div>
          <div class="order-1 lg:order-2" data-aos="fade-left">
            <div class="hero-visual-panel">
              <div class="hero-visual-panel__glow" aria-hidden="true"></div>
              <div class="hero-visual-panel__frame">
                <img src="${esc(ind.image)}" alt="${esc(ind.alt)}" width="640" height="800" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>

    <nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
      <div class="slp-sticky-nav__inner">
        <a href="#gind-challenges" class="slp-sticky-nav__link" data-svc-nav-link>Challenges</a>
        <a href="#gind-deliver" class="slp-sticky-nav__link" data-svc-nav-link>What we deliver</a>
        <a href="#gind-related" class="slp-sticky-nav__link" data-svc-nav-link>Related services</a>
        <a href="#gind-others" class="slp-sticky-nav__link" data-svc-nav-link>Other industries</a>
        <a href="#gind-cta" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
      </div>
    </nav>

    <section id="gind-challenges" class="gind-section gind-section--mute" aria-labelledby="gind-challenges-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="gind-head" data-aos="fade-up">
          <p class="gind-kicker">Operating realities</p>
          <h2 id="gind-challenges-heading" class="gind-title">What ${esc(ind.name.toLowerCase())} organisations typically need to solve</h2>
        </header>
        <div class="gind-grid gind-grid--3">${challenges}
        </div>
      </div>
    </section>

    <section id="gind-deliver" class="gind-section" aria-labelledby="gind-deliver-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="gind-head" data-aos="fade-up">
          <p class="gind-kicker">What we deliver</p>
          <h2 id="gind-deliver-heading" class="gind-title">Practical systems for ${esc(ind.name.toLowerCase())} operations</h2>
          <p class="gind-lead gind-lead--center" style="margin-left:auto;margin-right:auto;">We design, build, integrate, and modernise the digital environment around how this sector actually works — then stay with it after launch.</p>
        </header>
        <div class="gind-grid gind-grid--2">${deliver}
        </div>
      </div>
    </section>

    <section id="gind-related" class="gind-section gind-section--mute" aria-labelledby="gind-related-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="gind-head gind-head--left" data-aos="fade-up">
          <p class="gind-kicker">Related services</p>
          <h2 id="gind-related-heading" class="gind-title">Capabilities we apply in ${esc(ind.name.toLowerCase())}</h2>
        </header>
        <div class="gind-related gind-grid gind-grid--3">${related}
        </div>
      </div>
    </section>

    <section id="gind-others" class="gind-section" aria-labelledby="gind-others-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="gind-head gind-head--left" data-aos="fade-up">
          <p class="gind-kicker">More sectors</p>
          <h2 id="gind-others-heading" class="gind-title">Other industries we support</h2>
        </header>
        <div class="gind-others gind-grid gind-grid--3">${otherLinks}
        </div>
        <p class="mt-8"><a href="../industries.html" class="gstory-inline" style="color:#001F54;font-weight:700;">View all industries <i class="fas fa-arrow-right" aria-hidden="true"></i></a></p>
      </div>
    </section>

    <section id="gind-cta" class="gind-cta guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.28" aria-labelledby="gind-cta-heading">
      <div class="gind-cta__bg guudle-parallax-layer" style="background-image:url('${esc(ind.image)}')"></div>
      <div class="gind-cta__overlay" aria-hidden="true"></div>
      <div class="gind-cta__content py-20 sm:py-28">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <p class="gind-kicker gind-kicker--on-dark">Next step</p>
          <h2 id="gind-cta-heading" class="gind-title gind-title--light">Talk to us about ${esc(ind.name.toLowerCase())} systems</h2>
          <p class="gind-cta__lead">Tell us what you need to design, build, integrate, or modernise. We will help you plan the work and deliver it with discipline.</p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href="../contact.html" class="hero-cta-navy-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">Start a conversation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="../industries.html" class="gind-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">All industries</a>
          </div>
        </div>
      </div>
    </section>

  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-webdev-data.js"></script>
  <script src="../../assets/js/mega-menu-data.js"></script>
  <script src="../../assets/js/mega-menu-render.js"></script>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/parallax-unified.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="../../assets/js/service-landing-core.js"></script>
</body>
</html>
`;
}

const outDir = path.join(__dirname, '..', 'pages', 'industries');
fs.mkdirSync(outDir, { recursive: true });
for (const ind of INDUSTRIES) {
  const file = path.join(outDir, `${ind.slug}.html`);
  fs.writeFileSync(file, pageHtml(ind), 'utf8');
  console.log('wrote', path.relative(path.join(__dirname, '..'), file));
}
