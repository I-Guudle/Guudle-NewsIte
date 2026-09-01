const fs = require('fs');
const path = require('path');

const projects = [
  ['jija-fashion', 'Jija Fashion', 'UK fashion and beauty e-commerce storefront with a category-rich catalogue and mobile-first checkout.'],
  ['zamzam-decor', 'Zamzam Decor', 'Premium home décor e-commerce with collection-led browsing and brand-forward shopping.'],
  ['siraj-paints', 'Siraj Paints', 'Corporate website and product catalogue for paints, coatings, and industrial solutions.'],
  ['barakat-bookshop', 'Barakat Bookshop', 'Bilingual Islamic bookshop with a deep catalogue and RTL-aware shopping experience.'],
  ['motorparts360', 'Motor Parts 360', 'Automotive parts e-commerce with fitment-oriented browsing and secure ordering.'],
  ['oak-eden', 'Oak Eden', 'UK retail website combining brand storytelling with a conversion-focused shop.'],
  ['nearbycare', 'Nearby Care', 'Trust-focused domiciliary care website with a clear path to a care assessment.'],
  ['bright-clinic', 'Bright Clinic', 'Modern clinic website presenting services, practitioners, and appointment pathways.'],
  ['netsecurityit', 'Net Security IT', 'Cybersecurity services website for enterprise protection and IT security expertise.'],
  ['luminhive', 'LuminHive', 'Technology solutions platform with a modular architecture and product-led interface.'],
  ['avalon-bay', 'Avalon Bay', 'Property platform with listings, tenant resources, and premium real estate presentation.'],
  ['pagewood-green', 'Pagewood Green', 'Real estate development website showcasing projects, amenities, and enquiries.'],
  ['masjid-umalqura', 'Masjid Umal Qura', 'Community mosque portal with prayer times, events, donations, and education.'],
  ['comfort-lane', 'Comfort Lane UK', 'Professional services website with clear service positioning and contact pathways.'],
  ['weydii', 'Weydii', 'Product-led digital platform connecting businesses with technology solutions.'],
  ['beba-gas', 'Beba Gas', 'Multi-vendor cooking gas delivery platform with customer, seller, and rider apps.'],
  ['leaforest', 'Leaforest', 'London PCO electric and hybrid car rental site for TfL, Uber, and Bolt-ready drivers.'],
  ['guudle-taxi', 'Guudle Taxi', 'Passenger, driver, and operations apps for on-demand taxi dispatch and tracking.'],
  ['healthcare-platform', 'Healthcare Management Platform', 'Clinical and administrative platform for appointments, records, and operations.'],
  ['financial-management', 'Financial Management System', 'Finance operations platform for ledgers, approvals, and management reporting.'],
  ['fleet-management', 'Fleet Management System', 'Operations platform for vehicles, drivers, maintenance, and route visibility.'],
  ['crm-platform', 'CRM Platform', 'Customer relationship platform for pipelines, activity history, and follow-up.'],
  ['erp-platform', 'ERP Platform', 'Modular ERP covering inventory, procurement, and operational reporting.'],
  ['education-portal', 'Education Learning Portal', 'Learning portal for programmes, enrolment, and student-facing resources.'],
  ['civic-portal', 'Civic Services Portal', 'Public-facing civic portal for services, information, and structured enquiries.'],
  ['marketplace-platform', 'Multi-Vendor Marketplace', 'Marketplace platform with vendor onboarding, catalogue control, and orders.'],
  ['booking-platform', 'Booking Platform', 'Scheduling platform for availability, bookings, and customer confirmations.'],
  ['analytics-platform', 'Analytics Platform', 'Analytics workspace for operational KPIs, exploration, and shared reporting.'],
  ['customer-portal', 'Customer Portal', 'Authenticated portal for account access, documents, and service requests.'],
  ['business-management', 'Business Management Platform', 'SaaS workspace for jobs, customers, and day-to-day operational control.'],
  ['gwda', 'GWDA', 'Charity website for health, WASH, education, and livelihoods programmes in Somaliland.'],
  ['kuulow', 'Kuulow', 'National health exchange platform site for FHIR-aligned clinical interoperability.'],
  ['new-pollard', 'New Pollard', 'SaaS marketing site for one-click cross-platform campaign automation.'],
  ['royaal-coffee', 'Royaal Coffee', 'UK store for Italian coffee beans, machines, grinders, and hospitality equipment.'],
  ['gojuno', 'Gojuno', 'UK frankincense essential-oil catalogue with origin, distillation, and enquiry pathways.'],
  ['sombrit', 'SOMBRIT', 'Tuition-centre website for Year 6+ through GCSE, AS, and A Level academic support.'],
  ['marsai', 'MarsAI', 'AI studio and cloud-infrastructure product website for automation and enterprise services.'],
  ['assunnah', 'Assunnah Islamic Centre', 'North London Islamic centre site for prayer, madrasah, institute, and rebuild donations.'],
  ['chargefox', 'Chargefox', 'London PCO and PHV car-hire website for Uber-ready weekly rentals.'],
  ['elmi-tech-group', 'Elmi Tech Group', 'IT services website covering security, software, web, mobile, training, and managed support.'],
  ['malmal', 'Malmal', 'Workflow automation site for sales, support, finance, and operations integrations.'],
  ['pure-myrrh', 'Pure Myrrh', 'Freight and cargo website with quotes, live tracking, and air, sea, and land services.'],
  ['sougal', 'Sougal', 'Fashion e-commerce store for menswear, womenswear, shoes, and accessories.'],
  ['malma1', 'Malma1', 'Client business website with a professional brand presence and enquiry pathway.'],
  ['beba24', 'Beba24', 'Local services marketplace connecting customers with nearby professionals to search, book, and review.'],
];

const dir = path.join(__dirname, '..', 'pages', 'case-studies');
fs.mkdirSync(dir, { recursive: true });

for (const [id, title, desc] of projects) {
  const url = `https://guudle.com/pages/case-studies/${id}.html`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Guudle IT Solutions">
  <meta name="description" content="${desc} Case study by Guudle IT Solutions.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${title} Case Study | Guudle IT Solutions">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <title>${title} Case Study | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../../assets/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-landing-shared.css">
  <link rel="stylesheet" href="../../assets/css/svc-landing.css">
  <link rel="stylesheet" href="../../assets/css/site-unified.css">
  <link rel="stylesheet" href="../../assets/css/home.css">
  <link rel="stylesheet" href="../../assets/css/svc-corpox.css">
  <link rel="stylesheet" href="../../assets/css/our-work.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[
    {"@type":"Article","headline":"${title} Case Study","description":"${desc}","author":{"@type":"Organization","name":"Guudle IT Solutions"},"publisher":{"@type":"Organization","name":"Guudle IT Solutions","url":"https://guudle.com"},"url":"${url}"},
    {"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://guudle.com/"},
      {"@type":"ListItem","position":2,"name":"Our Work","item":"https://guudle.com/pages/our-work.html"},
      {"@type":"ListItem","position":3,"name":"${title}","item":"${url}"}
    ]}
  ]}
  </script>
</head>
<body class="slp-page scroll-smooth antialiased guudle-site overflow-x-hidden home-premium svc-corpox-page ow-page" data-case-id="${id}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">
    <div id="csd-root"></div>
    <noscript>
      <section class="cpox-section">
        <div class="max-w-3xl mx-auto px-4">
          <p><a href="../our-work.html">Our Work</a></p>
          <h1>${title}</h1>
          <p>${desc}</p>
        </div>
      </section>
    </noscript>
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-webdev-data.js"></script>
  <script src="../../assets/js/mega-menu-data.js"></script>
  <script src="../../assets/js/mega-menu-render.js"></script>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/our-work-data.js"></script>
  <script src="../../assets/js/case-study.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, `${id}.html`), html);
}

console.log('Wrote', projects.length, 'case studies to', dir);
