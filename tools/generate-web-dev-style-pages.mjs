import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'pages', 'services');

const TAILWIND = `tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { DEFAULT: '#0B1F3A', 50: '#F0F4F8', 100: '#D9E2EC', 200: '#BCCCDC', 600: '#0B1F3A', 700: '#081829', 800: '#061220', 900: '#040D18' },
            teal: { 50: '#F0FDFA', 500: '#10A5F5', 600: '#10A5F5', 700: '#0F766E', 800: '#115E59' },
            'deep-blue': '#123D6A', 'royal-blue': '#2563EB', cyan: '#10A5F5', 'light-gray': '#F3F6FB',
          },
        },
      },
    };`;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function pills(items) {
  return items.map((p) =>
    `<div class="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
      <i class="fas fa-check-circle text-teal-600 mr-2"></i><span class="text-gray-700 font-medium">${esc(p)}</span>
    </div>`
  ).join('\n                ');
}

function offerItems(items) {
  return items.map(({ icon, title, desc }) =>
    `<li class="flex items-start">
      <i class="${icon} text-navy-600 mr-3 mt-1"></i>
      <div><h4 class="font-semibold text-gray-900 mb-1">${esc(title)}</h4><p class="text-gray-600">${esc(desc)}</p></div>
    </li>`
  ).join('\n                  ');
}

function serviceCard({ icon, gradient, title, desc, bullets, link, delay }) {
  const linkHtml = link
    ? `<a href="${link}" class="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center">Learn More <i class="fas fa-arrow-right ml-2"></i></a>`
    : `<a href="../contact.html" class="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center">Learn More <i class="fas fa-arrow-right ml-2"></i></a>`;
  return `<div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-6">
              <i class="${icon} text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">${esc(title)}</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">${esc(desc)}</p>
            <ul class="space-y-2 mb-6">${bullets.map((b) =>
              `<li class="flex items-center text-gray-700"><i class="fas fa-check text-teal-600 mr-2"></i><span>${esc(b)}</span></li>`
            ).join('')}</ul>
            ${linkHtml}
          </div>`;
}

function processSteps(steps) {
  return steps.map((s, i) =>
    `<div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white text-center" data-aos="fade-up" data-aos-delay="${50 + i * 50}">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">${i + 1}</div>
            <h3 class="text-2xl font-semibold mb-4">${esc(s.title)}</h3>
            <p class="text-gray-200 leading-relaxed">${esc(s.desc)}</p>
          </div>`
  ).join('\n          ');
}

function trustItems(items) {
  return items.map((t, i) =>
    `<div class="sp-trust-item text-center" data-aos="fade-up" data-aos-delay="${50 + i * 50}">
            <div class="sp-trust-icon mx-auto"><i class="${t.icon}"></i></div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${esc(t.title)}</h3>
            <p class="text-gray-600 text-sm">${esc(t.desc)}</p>
          </div>`
  ).join('\n          ');
}

function techStack(items) {
  return items.map((t, i) =>
    `<div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100" data-aos="fade-up" data-aos-delay="${50 + i * 50}">
            <i class="${t.icon} text-4xl ${t.color} mb-3"></i>
            <h4 class="font-semibold text-gray-900">${esc(t.name)}</h4>
          </div>`
  ).join('\n          ');
}

function innovationTabs(tabs) {
  const nav = tabs.map((t, i) =>
    `<button type="button" class="innovation-tab-btn ${i === 0 ? 'active px-6 py-3 rounded-t-xl font-semibold text-sm md:text-base transition-all duration-300 bg-gradient-to-r from-navy-600 to-teal-600 text-white shadow-lg' : 'px-6 py-3 rounded-t-xl font-semibold text-sm md:text-base transition-all duration-300 text-gray-700 hover:text-navy-600 hover:bg-gray-100'}" data-tab="${t.id}">
            <i class="${t.icon} mr-2"></i>${esc(t.label)}
          </button>`
  ).join('\n          ');

  const panels = tabs.map((t, i) => {
    const cards = t.cards.map((c) =>
      `<div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div class="w-16 h-16 bg-gradient-to-r ${c.gradient} rounded-xl flex items-center justify-center mb-6"><i class="${c.icon} text-white text-2xl"></i></div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${esc(c.title)}</h3>
                <p class="text-gray-600 mb-4">${esc(c.desc)}</p>
                <ul class="space-y-2 text-sm text-gray-600">${c.bullets.map((b) =>
                  `<li class="flex items-center"><i class="fas fa-check text-teal-500 mr-2"></i>${esc(b)}</li>`
                ).join('')}</ul>
              </div>`
    ).join('\n              ');
    return `<div class="innovation-tab-content ${i === 0 ? 'active' : 'hidden'}" data-content="${t.id}">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"${i === 0 ? ' data-aos="fade-up" data-aos-delay="200"' : ''}>
              ${cards}
            </div>
          </div>`;
  }).join('\n\n          ');

  return { nav, panels };
}

const DEFAULT_PROCESS = [
  { title: 'Discovery', desc: 'We start by understanding your goals, target audience, and business requirements. This helps us create a roadmap for success.' },
  { title: 'Strategy', desc: 'We create a custom plan tailored to your needs. This includes design mockups, technical architecture, and project timeline.' },
  { title: 'Development', desc: 'We build and code your solution using agile methodology. Regular updates and feedback ensure everything meets your expectations.' },
  { title: 'Launch', desc: 'We go live with the finished product. Post-launch support and maintenance ensure continued optimal performance.' },
];

const DEFAULT_TRUST = [
  { icon: 'fas fa-building', title: 'Enterprise-Grade Development', desc: 'Production-ready systems built to enterprise standards.' },
  { icon: 'fas fa-code', title: 'Custom Software Solutions', desc: 'Tailored applications aligned to your business goals.' },
  { icon: 'fas fa-cloud', title: 'Modern Cloud Architecture', desc: 'Scalable, resilient cloud-native design patterns.' },
  { icon: 'fas fa-shield-alt', title: 'Security-First Development', desc: 'Security and compliance embedded from day one.' },
];

const DEFAULT_INNOVATION = [
  { id: 'features', icon: 'fas fa-star', label: 'Core Features', cards: [
    { icon: 'fas fa-bolt', gradient: 'from-teal-500 to-cyan-500', title: 'Performance', desc: 'Optimized for speed, reliability, and smooth user experiences.', bullets: ['Fast load times', 'Efficient code', 'Scalable architecture'] },
    { icon: 'fas fa-mobile-alt', gradient: 'from-navy-500 to-teal-500', title: 'Responsive Design', desc: 'Flawless experiences across desktop, tablet, and mobile devices.', bullets: ['Mobile-first', 'Cross-browser', 'Accessible UI'] },
    { icon: 'fas fa-search', gradient: 'from-cyan-500 to-blue-500', title: 'SEO Ready', desc: 'Built with search visibility and discoverability in mind.', bullets: ['Semantic markup', 'Meta optimization', 'Structured data'] },
  ]},
  { id: 'integration', icon: 'fas fa-plug', label: 'Integrations', cards: [
    { icon: 'fas fa-credit-card', gradient: 'from-green-500 to-teal-500', title: 'Payments', desc: 'Secure payment and checkout integrations for commerce flows.', bullets: ['Stripe & PayPal', 'Apple Pay', 'Subscriptions'] },
    { icon: 'fas fa-envelope', gradient: 'from-blue-500 to-indigo-500', title: 'Marketing Tools', desc: 'Connect CRM, email, and analytics platforms seamlessly.', bullets: ['HubSpot', 'Mailchimp', 'Google Analytics'] },
    { icon: 'fas fa-database', gradient: 'from-purple-500 to-pink-500', title: 'APIs & Data', desc: 'Robust API layers for third-party and internal system sync.', bullets: ['REST & GraphQL', 'Webhooks', 'Real-time sync'] },
  ]},
  { id: 'security', icon: 'fas fa-shield-alt', label: 'Security', cards: [
    { icon: 'fas fa-lock', gradient: 'from-red-500 to-red-600', title: 'Data Protection', desc: 'Encryption and access controls to safeguard user data.', bullets: ['HTTPS/SSL', 'Role-based access', 'Secure auth'] },
    { icon: 'fas fa-user-shield', gradient: 'from-indigo-500 to-indigo-600', title: 'Compliance', desc: 'Solutions aligned with industry regulations and standards.', bullets: ['GDPR ready', 'Privacy policies', 'Audit trails'] },
    { icon: 'fas fa-history', gradient: 'from-orange-500 to-amber-500', title: 'Backups', desc: 'Automated backups and disaster recovery planning.', bullets: ['Daily backups', 'Version control', 'Recovery testing'] },
  ]},
  { id: 'growth', icon: 'fas fa-chart-line', label: 'Growth', cards: [
    { icon: 'fas fa-bullhorn', gradient: 'from-pink-500 to-rose-500', title: 'Conversion', desc: 'UX and CRO patterns that turn visitors into customers.', bullets: ['A/B testing', 'Clear CTAs', 'Funnel optimization'] },
    { icon: 'fas fa-globe', gradient: 'from-teal-500 to-green-500', title: 'Scalability', desc: 'Architecture that grows with traffic and feature demands.', bullets: ['Cloud hosting', 'CDN delivery', 'Auto-scaling'] },
    { icon: 'fas fa-headset', gradient: 'from-navy-500 to-blue-600', title: 'Support', desc: 'Ongoing maintenance and enhancement after launch.', bullets: ['SLA options', 'Bug fixes', 'Feature updates'] },
  ]},
  { id: 'future', icon: 'fas fa-lightbulb', label: 'Innovation', cards: [
    { icon: 'fas fa-brain', gradient: 'from-purple-500 to-pink-500', title: 'AI Features', desc: 'Smart automation and AI-assisted experiences where they add value.', bullets: ['Chatbots', 'Recommendations', 'Smart search'] },
    { icon: 'fas fa-cloud', gradient: 'from-blue-400 to-blue-600', title: 'Cloud Native', desc: 'Modern cloud infrastructure for reliability and global reach.', bullets: ['AWS & Azure', 'Serverless', 'Microservices'] },
    { icon: 'fas fa-code', gradient: 'from-gray-600 to-gray-800', title: 'Modern Stack', desc: 'Current frameworks and best practices for long-term maintainability.', bullets: ['Latest frameworks', 'Clean code', 'Documentation'] },
  ]},
];

const PAGES = [
  {
    slug: 'business-website',
    layout: 'web-dev',
    title: 'Business Website',
    meta: 'Professional business websites that build trust, generate leads, and represent your brand — by Guudle IT Solutions.',
    breadcrumb: 'Business Website',
    heroTitle: 'Business Website',
    heroSubtitle: 'Professional corporate websites and startup landing pages that build credibility, capture leads, and represent your brand with authority online.',
    heroIcon: 'fas fa-building',
    descHeading: 'Websites That Build',
    descHighlight: 'Trust & Generate Leads',
    descP1: 'Your website is often the first impression customers have of your business. We design authoritative business websites with clear messaging, credible design, and conversion-focused layouts.',
    descP2: 'From law firms and consultancies to manufacturers and professional services, we help UK businesses establish a strong digital presence that supports sales and marketing goals.',
    pills: ['Lead Generation', 'Brand Credibility', 'Mobile Responsive', 'SEO Optimized'],
    offer: [
      { icon: 'fas fa-briefcase', title: 'Corporate Sites', desc: 'Multi-page business websites with services, team, and contact flows' },
      { icon: 'fas fa-rocket', title: 'Startup Landing Pages', desc: 'High-converting single-page sites for product launches' },
      { icon: 'fas fa-envelope', title: 'Lead Capture', desc: 'Forms, CRM integration, and callback scheduling' },
      { icon: 'fas fa-paint-brush', title: 'Brand Design', desc: 'Visual identity aligned with your business values' },
    ],
    servicesTag: 'Our Services',
    servicesTitle: 'Business Website Services',
    servicesDesc: 'Everything you need for a professional online presence.',
    services: [
      { icon: 'fas fa-globe', gradient: 'from-navy-600 to-teal-600', title: 'Corporate Websites', desc: 'Multi-page business sites with services, about, team, and contact sections designed for credibility.', bullets: ['Custom design', 'Content strategy', 'Multi-language ready', 'Analytics setup'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-bullseye', gradient: 'from-teal-500 to-cyan-500', title: 'Lead Generation', desc: 'Conversion-optimized layouts with forms, CTAs, and CRM integrations to capture qualified leads.', bullets: ['Contact forms', 'CRM integration', 'Live chat ready', 'A/B testing'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-search', gradient: 'from-cyan-500 to-blue-500', title: 'Local SEO', desc: 'On-page SEO and local search optimization so customers in your area can find you easily.', bullets: ['Google Business', 'Schema markup', 'Local keywords', 'Speed optimization'], link: 'analytics.html', delay: 150 },
      { icon: 'fas fa-shield-alt', gradient: 'from-green-500 to-teal-500', title: 'Security & Compliance', desc: 'SSL, GDPR-compliant forms, privacy policies, and secure hosting for peace of mind.', bullets: ['SSL/HTTPS', 'GDPR forms', 'Cookie consent', 'Security headers'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-sync', gradient: 'from-indigo-500 to-navy-600', title: 'CMS Integration', desc: 'Easy-to-manage content with WordPress or headless CMS so your team can update pages without developers.', bullets: ['WordPress', 'Headless CMS', 'Editor training', 'Content workflows'], link: 'wordpress.html', delay: 250 },
      { icon: 'fas fa-tools', gradient: 'from-orange-500 to-amber-500', title: 'Maintenance & Support', desc: 'Ongoing updates, backups, monitoring, and enhancements to keep your site running smoothly.', bullets: ['Regular updates', 'Backups', 'Uptime monitoring', 'Content updates'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-html5', color: 'text-orange-500', name: 'HTML5' },
      { icon: 'fab fa-wordpress', color: 'text-blue-600', name: 'WordPress' },
      { icon: 'fab fa-js', color: 'text-yellow-400', name: 'JavaScript' },
      { icon: 'fab fa-react', color: 'text-blue-500', name: 'React' },
      { icon: 'fab fa-google', color: 'text-red-500', name: 'Analytics' },
      { icon: 'fas fa-server', color: 'text-gray-600', name: 'Cloud Hosting' },
    ],
    ctaTitle: 'Ready to Build Your Business Website?',
    ctaDesc: 'Partner with Guudle IT Solutions to create a professional website that builds trust and drives leads.',
    relatedLink: 'website-development.html',
  },
  {
    slug: 'web-application',
    layout: 'web-dev',
    title: 'Web Application Development',
    meta: 'Custom web applications, SaaS platforms, and enterprise portals — scalable solutions by Guudle IT Solutions.',
    breadcrumb: 'Web Application Development',
    heroTitle: 'Web Application Development',
    heroSubtitle: 'Scalable SaaS platforms, custom web apps, and enterprise portals built with modern frameworks — engineered for performance and growth.',
    heroIcon: 'fas fa-laptop-code',
    descHeading: 'Building Apps That',
    descHighlight: 'Scale With Your Business',
    descP1: 'When off-the-shelf software falls short, custom web applications deliver exactly what your business needs. We build SaaS platforms, internal tools, and customer portals with robust architecture.',
    descP2: 'Our team combines frontend excellence with scalable backend engineering — APIs, real-time features, and cloud deployment included.',
    pills: ['Scalable Architecture', 'API Integration', 'Real-time Features', 'Cloud Deployed'],
    offer: [
      { icon: 'fas fa-cloud', title: 'SaaS Platforms', desc: 'Subscription-based applications with billing and multi-tenant design' },
      { icon: 'fas fa-building', title: 'Enterprise Portals', desc: 'Internal dashboards and workflow tools for teams' },
      { icon: 'fas fa-plug', title: 'API Development', desc: 'REST and GraphQL APIs for integrations' },
      { icon: 'fas fa-bolt', title: 'Real-time Apps', desc: 'Live updates, chat, and collaborative features' },
    ],
    servicesTag: 'Our Services',
    servicesTitle: 'Web Application Services',
    servicesDesc: 'Full-stack development for complex business requirements.',
    services: [
      { icon: 'fas fa-layer-group', gradient: 'from-navy-600 to-teal-600', title: 'SaaS Development', desc: 'Multi-tenant subscription platforms with user management, billing, and analytics dashboards.', bullets: ['Subscription billing', 'User roles', 'Admin panels', 'Usage analytics'], link: 'saas-development.html', delay: 50 },
      { icon: 'fas fa-code', gradient: 'from-teal-500 to-cyan-500', title: 'Custom Web Apps', desc: 'Tailored applications for unique workflows — from booking systems to inventory management.', bullets: ['Custom workflows', 'Role permissions', 'Reporting', 'Mobile responsive'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-plug', gradient: 'from-blue-500 to-indigo-600', title: 'API Integration', desc: 'Connect your app to CRMs, payment gateways, ERPs, and third-party services securely.', bullets: ['REST & GraphQL', 'Webhooks', 'OAuth', 'Rate limiting'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-bolt', gradient: 'from-yellow-500 to-orange-500', title: 'Real-time Features', desc: 'Live dashboards, notifications, chat, and collaborative editing powered by WebSockets.', bullets: ['WebSockets', 'Push notifications', 'Live sync', 'Event streaming'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-mobile-alt', gradient: 'from-purple-500 to-pink-500', title: 'Progressive Web Apps', desc: 'App-like experiences in the browser with offline support and install prompts.', bullets: ['Offline mode', 'Service workers', 'App manifest', 'Push alerts'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-shield-alt', gradient: 'from-green-500 to-teal-500', title: 'Security & DevOps', desc: 'Authentication, encryption, CI/CD pipelines, and cloud deployment best practices.', bullets: ['OAuth & JWT', 'CI/CD', 'Docker', 'Monitoring'], link: 'cloud-solutions.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-react', color: 'text-blue-500', name: 'React' },
      { icon: 'fab fa-node-js', color: 'text-green-600', name: 'Node.js' },
      { icon: 'fab fa-python', color: 'text-yellow-500', name: 'Python' },
      { icon: 'fab fa-vuejs', color: 'text-green-500', name: 'Vue.js' },
      { icon: 'fas fa-database', color: 'text-indigo-600', name: 'PostgreSQL' },
      { icon: 'fab fa-aws', color: 'text-orange-500', name: 'AWS' },
    ],
    ctaTitle: 'Ready to Build Your Web Application?',
    ctaDesc: 'Let us architect and build a scalable web application tailored to your business needs.',
    relatedLink: 'website-development.html',
  },
  {
    slug: 'ios-app',
    layout: 'web-dev',
    title: 'iOS App Development',
    meta: 'Native iOS app development with Swift and SwiftUI — App Store ready apps by Guudle IT Solutions.',
    breadcrumb: 'iOS App Development',
    breadcrumbParent: { label: 'Mobile App', href: 'mobile-app.html' },
    heroTitle: 'iOS App Development',
    heroSubtitle: 'Premium native iOS applications built with Swift and SwiftUI — designed for the Apple ecosystem and approved for the App Store.',
    heroIcon: 'fab fa-apple',
    descHeading: 'Native iOS Apps',
    descHighlight: 'Built for Apple',
    descP1: 'We craft native iPhone and iPad experiences that leverage the full power of iOS — smooth animations, platform-native UI, and seamless integration with Apple services.',
    descP2: 'From consumer apps to enterprise mobility, our Swift developers deliver App Store-ready products with rigorous QA and ongoing support.',
    pills: ['Swift & SwiftUI', 'App Store Ready', 'Apple Pay', 'iCloud Sync'],
    offer: [
      { icon: 'fab fa-apple', title: 'Native Development', desc: 'Swift and SwiftUI for maximum performance' },
      { icon: 'fas fa-store', title: 'App Store Launch', desc: 'Submission, review, and ASO optimization' },
      { icon: 'fas fa-watch', title: 'Apple Ecosystem', desc: 'iPad, Watch, and widget extensions' },
      { icon: 'fas fa-lock', title: 'Security', desc: 'Keychain, biometrics, and secure data storage' },
    ],
    servicesTag: 'iOS Services',
    servicesTitle: 'iOS Development Services',
    servicesDesc: 'End-to-end native iOS solutions from concept to App Store.',
    services: [
      { icon: 'fab fa-apple', gradient: 'from-gray-800 to-gray-900', title: 'Native iOS Apps', desc: 'Full-featured iPhone and iPad apps with Swift, following Apple Human Interface Guidelines.', bullets: ['Swift & SwiftUI', 'UIKit when needed', 'Core Data', 'Push notifications'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-paint-brush', gradient: 'from-navy-600 to-teal-600', title: 'UI/UX Design', desc: 'Pixel-perfect interfaces that feel native to iOS with intuitive navigation and animations.', bullets: ['Figma prototypes', 'HIG compliance', 'Dark mode', 'Accessibility'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-store', gradient: 'from-teal-500 to-cyan-500', title: 'App Store Submission', desc: 'Complete App Store Connect setup, screenshots, metadata, and review management.', bullets: ['TestFlight beta', 'App review', 'ASO optimization', 'Release management'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-credit-card', gradient: 'from-blue-500 to-indigo-600', title: 'Apple Pay & IAP', desc: 'In-app purchases, subscriptions, and Apple Pay integration for monetization.', bullets: ['StoreKit 2', 'Subscriptions', 'Receipt validation', 'Apple Pay'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-cloud', gradient: 'from-cyan-500 to-blue-500', title: 'Backend Integration', desc: 'APIs, Firebase, and cloud services connected securely to your iOS app.', bullets: ['REST APIs', 'Firebase', 'iCloud', 'Real-time sync'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-tools', gradient: 'from-green-500 to-teal-500', title: 'Maintenance', desc: 'iOS version updates, bug fixes, feature releases, and performance monitoring.', bullets: ['OS compatibility', 'Crash reporting', 'Analytics', 'SLA support'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-swift', color: 'text-orange-500', name: 'Swift' },
      { icon: 'fab fa-apple', color: 'text-gray-800', name: 'SwiftUI' },
      { icon: 'fas fa-fire', color: 'text-amber-500', name: 'Firebase' },
      { icon: 'fas fa-database', color: 'text-blue-600', name: 'Core Data' },
      { icon: 'fab fa-github', color: 'text-gray-700', name: 'Xcode' },
      { icon: 'fas fa-cloud', color: 'text-cyan-500', name: 'CloudKit' },
    ],
    ctaTitle: 'Ready to Build Your iOS App?',
    ctaDesc: 'Let our Swift experts turn your iOS app idea into an App Store success.',
    relatedLink: 'mobile-app.html',
  },
  {
    slug: 'android-app',
    layout: 'web-dev',
    title: 'Android App Development',
    meta: 'Native Android app development with Kotlin and Jetpack Compose — Google Play ready apps by Guudle IT Solutions.',
    breadcrumb: 'Android App Development',
    breadcrumbParent: { label: 'Mobile App', href: 'mobile-app.html' },
    heroTitle: 'Android App Development',
    heroSubtitle: 'Native Android applications built with Kotlin and Material Design — optimized for the diverse Android device ecosystem and Google Play.',
    heroIcon: 'fab fa-android',
    descHeading: 'Native Android Apps',
    descHighlight: 'Material Design Excellence',
    descP1: 'Reach the world\'s largest mobile audience with native Android apps that perform flawlessly across phones, tablets, and wearables.',
    descP2: 'We follow Material Design guidelines and Google Play best practices to deliver polished apps with robust backend integration and scalable architecture.',
    pills: ['Kotlin & Compose', 'Material Design', 'Google Play', 'Firebase'],
    offer: [
      { icon: 'fab fa-android', title: 'Native Android', desc: 'Kotlin and Jetpack Compose development' },
      { icon: 'fas fa-store', title: 'Play Store Launch', desc: 'Publishing and store listing optimization' },
      { icon: 'fas fa-cogs', title: 'Device Features', desc: 'Camera, GPS, NFC, and sensor integration' },
      { icon: 'fas fa-shield-alt', title: 'Security', desc: 'Encrypted storage and secure authentication' },
    ],
    servicesTag: 'Android Services',
    servicesTitle: 'Android Development Services',
    servicesDesc: 'Complete Android solutions from design to Google Play.',
    services: [
      { icon: 'fab fa-android', gradient: 'from-green-600 to-green-800', title: 'Native Android Apps', desc: 'Feature-rich Android apps with Kotlin, Jetpack Compose, and modern Android architecture.', bullets: ['Kotlin', 'Jetpack Compose', 'Room database', 'WorkManager'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-paint-brush', gradient: 'from-teal-500 to-cyan-500', title: 'Material Design UI', desc: 'Beautiful, consistent interfaces following Google Material Design 3 principles.', bullets: ['Material 3', 'Dynamic color', 'Responsive layouts', 'Accessibility'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-store', gradient: 'from-blue-500 to-indigo-600', title: 'Google Play Launch', desc: 'Play Console setup, internal testing, staged rollouts, and store optimization.', bullets: ['Internal testing', 'Play review', 'ASO', 'Release tracks'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-fire', gradient: 'from-orange-500 to-red-500', title: 'Firebase Integration', desc: 'Authentication, Firestore, Cloud Messaging, and Analytics for your Android app.', bullets: ['Firebase Auth', 'FCM push', 'Crashlytics', 'Remote config'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-map-marker-alt', gradient: 'from-purple-500 to-pink-500', title: 'Maps & Location', desc: 'Google Maps SDK, geolocation, geofencing, and location-based features.', bullets: ['Maps SDK', 'Geofencing', 'Background location', 'Places API'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-tools', gradient: 'from-navy-600 to-teal-600', title: 'Maintenance', desc: 'Android version updates, performance tuning, and ongoing feature development.', bullets: ['OS updates', 'ProGuard/R8', 'Performance', 'SLA support'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-android', color: 'text-green-600', name: 'Kotlin' },
      { icon: 'fab fa-java', color: 'text-red-600', name: 'Java' },
      { icon: 'fas fa-fire', color: 'text-amber-500', name: 'Firebase' },
      { icon: 'fab fa-google', color: 'text-blue-500', name: 'Google Play' },
      { icon: 'fas fa-database', color: 'text-indigo-600', name: 'Room' },
      { icon: 'fab fa-github', color: 'text-gray-700', name: 'Gradle' },
    ],
    ctaTitle: 'Ready to Build Your Android App?',
    ctaDesc: 'Partner with us to create a native Android app that reaches millions of users.',
    relatedLink: 'mobile-app.html',
  },
  {
    slug: 'flutter-app',
    layout: 'web-dev',
    title: 'Flutter App Development',
    meta: 'Cross-platform Flutter app development with Dart — iOS and Android from a single codebase by Guudle IT Solutions.',
    breadcrumb: 'Flutter App Development',
    breadcrumbParent: { label: 'Mobile App', href: 'mobile-app.html' },
    heroTitle: 'Flutter App Development',
    heroSubtitle: 'Beautiful cross-platform mobile apps from a single Dart codebase — faster development, consistent UX on iOS and Android.',
    heroIcon: 'fas fa-mobile-alt',
    descHeading: 'One Codebase',
    descHighlight: 'Two Platforms',
    descP1: 'Flutter lets you ship iOS and Android apps simultaneously without compromising on performance or design quality. Google\'s UI toolkit delivers smooth 60fps animations and pixel-perfect custom interfaces.',
    descP2: 'We leverage Flutter\'s hot reload, rich widget library, and native compilation to accelerate your time-to-market while reducing development costs.',
    pills: ['Single Codebase', 'Hot Reload', 'Custom UI', 'Native Performance'],
    offer: [
      { icon: 'fas fa-mobile-alt', title: 'Cross-Platform', desc: 'iOS and Android from one Dart codebase' },
      { icon: 'fas fa-palette', title: 'Custom UI', desc: 'Brand-unique interfaces beyond templates' },
      { icon: 'fas fa-bolt', title: 'Fast Iteration', desc: 'Hot reload for rapid development cycles' },
      { icon: 'fas fa-plug', title: 'Native Modules', desc: 'Platform channels for device-specific features' },
    ],
    servicesTag: 'Flutter Services',
    servicesTitle: 'Flutter Development Services',
    servicesDesc: 'Cross-platform mobile excellence with Google Flutter.',
    services: [
      { icon: 'fas fa-mobile-alt', gradient: 'from-blue-400 to-blue-600', title: 'Cross-Platform Apps', desc: 'Full-featured iOS and Android apps from a single Flutter codebase with native performance.', bullets: ['Dart programming', 'Widget architecture', 'State management', 'Platform channels'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-palette', gradient: 'from-purple-500 to-pink-500', title: 'Custom UI Design', desc: 'Bespoke interfaces with smooth animations — not limited to Material or Cupertino defaults.', bullets: ['Custom widgets', 'Animations', 'Brand theming', 'Responsive layouts'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-store', gradient: 'from-teal-500 to-cyan-500', title: 'Store Deployment', desc: 'App Store and Google Play submission, testing, and release management for Flutter apps.', bullets: ['iOS build', 'Android build', 'Store assets', 'CI/CD pipelines'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-fire', gradient: 'from-orange-500 to-amber-500', title: 'Firebase & Backend', desc: 'Cloud Firestore, Auth, Cloud Functions, and REST API integration for Flutter apps.', bullets: ['Firebase suite', 'REST APIs', 'GraphQL', 'Offline sync'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-shopping-cart', gradient: 'from-green-500 to-teal-500', title: 'E-commerce Apps', desc: 'Shopping carts, payment flows, and product catalogs built with Flutter commerce patterns.', bullets: ['Product listings', 'Checkout flows', 'Order tracking', 'Push promos'], link: 'ecommerce.html', delay: 250 },
      { icon: 'fas fa-tools', gradient: 'from-navy-600 to-indigo-600', title: 'Maintenance', desc: 'Flutter SDK updates, dependency management, bug fixes, and feature enhancements.', bullets: ['SDK upgrades', 'Bloc/Provider', 'Testing', 'SLA support'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fas fa-mobile-alt', color: 'text-cyan-500', name: 'Flutter' },
      { icon: 'fas fa-code', color: 'text-blue-600', name: 'Dart' },
      { icon: 'fas fa-fire', color: 'text-amber-500', name: 'Firebase' },
      { icon: 'fab fa-google', color: 'text-red-500', name: 'Material' },
      { icon: 'fab fa-apple', color: 'text-gray-800', name: 'Cupertino' },
      { icon: 'fab fa-github', color: 'text-gray-700', name: 'GitHub Actions' },
    ],
    ctaTitle: 'Ready to Build with Flutter?',
    ctaDesc: 'Ship beautiful iOS and Android apps faster with our Flutter development team.',
    relatedLink: 'mobile-app.html',
  },
  {
    slug: 'ecommerce',
    layout: 'web-dev',
    title: 'E-commerce Development',
    meta: 'Custom e-commerce development — online stores, marketplaces, and secure checkout by Guudle IT Solutions.',
    breadcrumb: 'E-commerce Development',
    heroTitle: 'E-commerce Development',
    heroSubtitle: 'Online stores and marketplace solutions with secure payments, inventory management, and conversion-optimized shopping experiences.',
    heroIcon: 'fas fa-shopping-cart',
    descHeading: 'Online Stores That',
    descHighlight: 'Convert & Scale',
    descP1: 'We build e-commerce experiences that turn browsers into buyers — from single-brand stores to multi-vendor marketplaces with complex catalog and fulfillment needs.',
    descP2: 'Whether Shopify, WooCommerce, Magento, or custom builds, we deliver secure checkout, payment integration, and admin tools your team can manage confidently.',
    pills: ['Secure Checkout', 'Payment Integration', 'Inventory Management', 'Multi-vendor'],
    offer: [
      { icon: 'fas fa-store', title: 'Online Stores', desc: 'Full-featured shops with catalog and checkout' },
      { icon: 'fas fa-credit-card', title: 'Payments', desc: 'Stripe, PayPal, Apple Pay, and more' },
      { icon: 'fas fa-boxes', title: 'Inventory', desc: 'Stock management and order tracking' },
      { icon: 'fas fa-users', title: 'Marketplaces', desc: 'Multi-vendor platforms with vendor dashboards' },
    ],
    servicesTag: 'E-commerce Services',
    servicesTitle: 'E-commerce Development Services',
    servicesDesc: 'Complete commerce solutions for every business size.',
    services: [
      { icon: 'fas fa-shopping-bag', gradient: 'from-teal-500 to-cyan-500', title: 'Custom E-commerce', desc: 'Tailored online stores with unique workflows, B2B pricing, and custom product configurators.', bullets: ['Custom catalog', 'B2B pricing', 'Subscriptions', 'ERP sync'], link: '../contact.html', delay: 50 },
      { icon: 'fab fa-shopify', gradient: 'from-green-600 to-green-800', title: 'Shopify Stores', desc: 'Shopify setup, custom themes, app integrations, and migration from other platforms.', bullets: ['Theme dev', 'Shopify Apps', 'Payments', 'Migration'], link: 'shopify.html', delay: 100 },
      { icon: 'fab fa-wordpress', gradient: 'from-blue-600 to-indigo-600', title: 'WooCommerce', desc: 'WordPress-powered stores with WooCommerce plugins, themes, and payment gateways.', bullets: ['WooCommerce setup', 'Custom plugins', 'Themes', 'Subscriptions'], link: 'woocommerce.html', delay: 150 },
      { icon: 'fas fa-building', gradient: 'from-orange-500 to-red-600', title: 'Magento Enterprise', desc: 'High-traffic Magento 2 stores with multi-store, B2B, and advanced catalog management.', bullets: ['Magento 2', 'Multi-store', 'B2B modules', 'Performance'], link: 'magento.html', delay: 200 },
      { icon: 'fas fa-credit-card', gradient: 'from-purple-500 to-pink-500', title: 'Payment Integration', desc: 'Stripe, PayPal, Klarna, Apple Pay, and regional payment methods configured securely.', bullets: ['Stripe', 'PayPal', 'Buy now pay later', 'PCI compliance'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-chart-line', gradient: 'from-navy-600 to-teal-600', title: 'Conversion & SEO', desc: 'CRO, product SEO, structured data, and analytics to maximize revenue from traffic.', bullets: ['Product SEO', 'Schema markup', 'Cart optimization', 'Analytics'], link: 'analytics.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-shopify', color: 'text-green-600', name: 'Shopify' },
      { icon: 'fab fa-wordpress', color: 'text-blue-600', name: 'WooCommerce' },
      { icon: 'fab fa-magento', color: 'text-orange-600', name: 'Magento' },
      { icon: 'fab fa-stripe', color: 'text-indigo-600', name: 'Stripe' },
      { icon: 'fab fa-react', color: 'text-blue-500', name: 'React' },
      { icon: 'fab fa-node-js', color: 'text-green-600', name: 'Node.js' },
    ],
    ctaTitle: 'Ready to Launch Your Online Store?',
    ctaDesc: 'Let us build an e-commerce platform that drives sales and scales with your business.',
    relatedLink: 'website-development.html',
  },
  {
    slug: 'shopify',
    layout: 'web-dev',
    title: 'Shopify Development',
    meta: 'Custom Shopify store development, themes, and app integrations by Guudle IT Solutions.',
    breadcrumb: 'Shopify Development',
    breadcrumbParent: { label: 'E-commerce', href: 'ecommerce.html' },
    heroTitle: 'Shopify Development',
    heroSubtitle: 'Custom Shopify stores, themes, and app integrations — launch fast, scale confidently, and sell globally on the world\'s leading e-commerce platform.',
    heroIcon: 'fab fa-shopify',
    descHeading: 'Shopify Stores',
    descHighlight: 'Built to Sell',
    descP1: 'Shopify powers millions of merchants worldwide. We help you get the most from the platform with custom Liquid themes, Shopify App integrations, and optimized checkout flows.',
    descP2: 'From new store setup to migration from WooCommerce or Magento, our Shopify experts deliver stores that look premium and convert visitors into customers.',
    pills: ['Custom Themes', 'Shopify Apps', 'Payment Setup', 'SEO Optimized'],
    offer: [
      { icon: 'fab fa-shopify', title: 'Store Setup', desc: 'Complete Shopify store configuration and launch' },
      { icon: 'fas fa-paint-brush', title: 'Theme Development', desc: 'Custom Liquid themes matching your brand' },
      { icon: 'fas fa-plug', title: 'App Integration', desc: 'Shopify Apps and custom API integrations' },
      { icon: 'fas fa-truck', title: 'Shipping & Tax', desc: 'Fulfillment, shipping zones, and tax rules' },
    ],
    servicesTag: 'Shopify Services',
    servicesTitle: 'Shopify Development Services',
    servicesDesc: 'Expert Shopify development for growing brands.',
    services: [
      { icon: 'fab fa-shopify', gradient: 'from-green-600 to-green-800', title: 'Store Setup & Launch', desc: 'End-to-end Shopify store creation — products, collections, pages, and domain configuration.', bullets: ['Product import', 'Collections', 'Navigation', 'Domain & SSL'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-code', gradient: 'from-navy-600 to-teal-600', title: 'Custom Theme Dev', desc: 'Bespoke Shopify themes with Liquid, JavaScript, and responsive design for your brand.', bullets: ['Liquid templates', 'Sections & blocks', 'Mobile-first', 'Speed optimization'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-plug', gradient: 'from-blue-500 to-indigo-600', title: 'App Integration', desc: 'Connect Shopify with ERP, CRM, email marketing, and custom apps via Shopify API.', bullets: ['Shopify API', 'Webhooks', 'Custom apps', 'Third-party apps'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-credit-card', gradient: 'from-purple-500 to-pink-500', title: 'Payments & Checkout', desc: 'Shopify Payments, Stripe, PayPal, and buy-now-pay-later options configured and tested.', bullets: ['Shopify Payments', 'Multi-currency', 'Checkout UX', 'Abandoned cart'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-exchange-alt', gradient: 'from-orange-500 to-amber-500', title: 'Migration', desc: 'Move from WooCommerce, Magento, or custom platforms to Shopify with zero data loss.', bullets: ['Product migration', 'Customer data', 'URL redirects', 'SEO preservation'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-search', gradient: 'from-cyan-500 to-teal-500', title: 'Shopify SEO', desc: 'Product SEO, structured data, site speed, and Shopify-specific search optimization.', bullets: ['Meta templates', 'Schema markup', 'Core Web Vitals', 'Blog SEO'], link: 'analytics.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-shopify', color: 'text-green-600', name: 'Shopify' },
      { icon: 'fas fa-code', color: 'text-blue-600', name: 'Liquid' },
      { icon: 'fab fa-js', color: 'text-yellow-400', name: 'JavaScript' },
      { icon: 'fas fa-project-diagram', color: 'text-pink-500', name: 'GraphQL' },
      { icon: 'fab fa-react', color: 'text-cyan-500', name: 'Polaris' },
      { icon: 'fab fa-stripe', color: 'text-indigo-600', name: 'Stripe' },
    ],
    ctaTitle: 'Ready to Launch on Shopify?',
    ctaDesc: 'Get a custom Shopify store that looks great and drives sales from day one.',
    relatedLink: 'ecommerce.html',
  },
  {
    slug: 'magento',
    layout: 'web-dev',
    title: 'Magento Development',
    meta: 'Enterprise Magento 2 e-commerce development, optimization, and migration by Guudle IT Solutions.',
    breadcrumb: 'Magento Development',
    breadcrumbParent: { label: 'E-commerce', href: 'ecommerce.html' },
    heroTitle: 'Magento Development',
    heroSubtitle: 'Enterprise-grade Magento 2 e-commerce — high-traffic stores, complex catalogs, B2B commerce, and performance optimization for ambitious retailers.',
    heroIcon: 'fab fa-magento',
    descHeading: 'Enterprise Commerce',
    descHighlight: 'Powered by Magento',
    descP1: 'Magento 2 handles complex product catalogs, multi-store setups, and high transaction volumes that simpler platforms cannot. We build and optimize Magento stores for enterprise retailers and B2B wholesalers.',
    descP2: 'Our team delivers custom extensions, performance tuning, Elasticsearch integration, and seamless ERP connections for operations at scale.',
    pills: ['Magento 2', 'Multi-store', 'B2B Commerce', 'High Performance'],
    offer: [
      { icon: 'fab fa-magento', title: 'Magento 2 Builds', desc: 'Custom themes and module development' },
      { icon: 'fas fa-building', title: 'B2B Commerce', desc: 'Quote workflows, tier pricing, and accounts' },
      { icon: 'fas fa-tachometer-alt', title: 'Performance', desc: 'Caching, indexing, and CDN optimization' },
      { icon: 'fas fa-exchange-alt', title: 'Migration', desc: 'Magento 1 to 2 or platform migrations' },
    ],
    servicesTag: 'Magento Services',
    servicesTitle: 'Magento Development Services',
    servicesDesc: 'Enterprise e-commerce built on Adobe Commerce / Magento 2.',
    services: [
      { icon: 'fab fa-magento', gradient: 'from-orange-500 to-red-600', title: 'Magento 2 Development', desc: 'Custom Magento 2 stores with tailored themes, modules, and checkout experiences.', bullets: ['Custom themes', 'Module dev', 'Checkout UX', 'Admin customization'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-building', gradient: 'from-navy-600 to-indigo-600', title: 'B2B Commerce', desc: 'Company accounts, quote requests, tier pricing, and approval workflows for wholesale.', bullets: ['Company accounts', 'Quote management', 'Tier pricing', 'Credit limits'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-store', gradient: 'from-teal-500 to-cyan-500', title: 'Multi-Store Setup', desc: 'Multiple brands, languages, and currencies from a single Magento installation.', bullets: ['Multi-website', 'Localization', 'Currency', 'Shared catalog'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-tachometer-alt', gradient: 'from-green-500 to-teal-500', title: 'Performance Optimization', desc: 'Varnish, Redis, Elasticsearch, and CDN tuning for sub-second page loads at scale.', bullets: ['Varnish cache', 'Redis sessions', 'Elasticsearch', 'Image optimization'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-plug', gradient: 'from-purple-500 to-pink-500', title: 'ERP Integration', desc: 'Connect Magento to SAP, NetSuite, or custom ERPs for inventory and order sync.', bullets: ['Inventory sync', 'Order export', 'Customer sync', 'Real-time APIs'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-exchange-alt', gradient: 'from-blue-500 to-blue-700', title: 'Migration Services', desc: 'Migrate from Magento 1, WooCommerce, or legacy platforms with data integrity preserved.', bullets: ['Data migration', 'URL redirects', 'SEO mapping', 'Zero downtime'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-magento', color: 'text-orange-600', name: 'Magento 2' },
      { icon: 'fab fa-php', color: 'text-indigo-600', name: 'PHP' },
      { icon: 'fas fa-database', color: 'text-blue-600', name: 'MySQL' },
      { icon: 'fas fa-search', color: 'text-yellow-600', name: 'Elasticsearch' },
      { icon: 'fas fa-bolt', color: 'text-red-500', name: 'Redis' },
      { icon: 'fab fa-aws', color: 'text-orange-500', name: 'AWS' },
    ],
    ctaTitle: 'Ready for Enterprise Magento?',
    ctaDesc: 'Scale your e-commerce with a Magento 2 platform built for high performance and complex catalogs.',
    relatedLink: 'ecommerce.html',
  },
  {
    slug: 'woocommerce',
    layout: 'web-dev',
    title: 'WooCommerce Development',
    meta: 'WooCommerce store development, custom plugins, and WordPress e-commerce by Guudle IT Solutions.',
    breadcrumb: 'WooCommerce Development',
    breadcrumbParent: { label: 'E-commerce', href: 'ecommerce.html' },
    heroTitle: 'WooCommerce Development',
    heroSubtitle: 'Flexible WordPress-powered e-commerce — custom WooCommerce stores with full control over design, plugins, and content management.',
    heroIcon: 'fab fa-wordpress',
    descHeading: 'WordPress Commerce',
    descHighlight: 'Fully Customizable',
    descP1: 'WooCommerce combines the flexibility of WordPress with powerful e-commerce features — ideal for businesses that want content and commerce in one platform.',
    descP2: 'We build custom WooCommerce themes, develop plugins for unique workflows, and integrate payments, shipping, and marketing tools your store needs.',
    pills: ['WordPress CMS', 'Custom Plugins', 'Payment Gateways', 'Flexible Themes'],
    offer: [
      { icon: 'fab fa-wordpress', title: 'WooCommerce Setup', desc: 'Complete store configuration on WordPress' },
      { icon: 'fas fa-puzzle-piece', title: 'Custom Plugins', desc: 'Bespoke functionality for unique needs' },
      { icon: 'fas fa-paint-brush', title: 'Theme Customization', desc: 'Branded storefronts with Elementor or custom' },
      { icon: 'fas fa-credit-card', title: 'Payments', desc: 'Stripe, PayPal, and subscription billing' },
    ],
    servicesTag: 'WooCommerce Services',
    servicesTitle: 'WooCommerce Development Services',
    servicesDesc: 'WordPress e-commerce tailored to your business.',
    services: [
      { icon: 'fab fa-wordpress', gradient: 'from-blue-600 to-indigo-600', title: 'Store Setup', desc: 'WooCommerce installation, product catalog, shipping zones, tax rules, and payment configuration.', bullets: ['Product setup', 'Shipping rules', 'Tax config', 'Payment gateways'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-paint-brush', gradient: 'from-teal-500 to-cyan-500', title: 'Theme Development', desc: 'Custom WooCommerce themes or Elementor-based storefronts aligned with your brand identity.', bullets: ['Custom themes', 'Elementor Pro', 'Mobile responsive', 'Speed optimized'], link: 'wordpress.html', delay: 100 },
      { icon: 'fas fa-puzzle-piece', gradient: 'from-purple-500 to-pink-500', title: 'Custom Plugins', desc: 'Bespoke WooCommerce plugins for subscriptions, B2B pricing, bookings, and custom product types.', bullets: ['Custom product types', 'Subscriptions', 'B2B pricing', 'Bookings'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-credit-card', gradient: 'from-green-500 to-teal-500', title: 'Payment Integration', desc: 'Stripe, PayPal, Klarna, and WooCommerce Subscriptions for recurring revenue models.', bullets: ['Stripe', 'PayPal', 'Subscriptions', 'Multi-currency'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-search', gradient: 'from-orange-500 to-amber-500', title: 'WooCommerce SEO', desc: 'Product SEO, Yoast/Rank Math setup, schema markup, and performance for better rankings.', bullets: ['Product SEO', 'Schema markup', 'Site speed', 'Blog integration'], link: 'analytics.html', delay: 250 },
      { icon: 'fas fa-exchange-alt', gradient: 'from-navy-600 to-teal-600', title: 'Migration', desc: 'Move from Shopify, Magento, or legacy platforms to WooCommerce with full data migration.', bullets: ['Product import', 'Customer data', 'Order history', 'URL redirects'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-wordpress', color: 'text-blue-600', name: 'WordPress' },
      { icon: 'fab fa-woocommerce', color: 'text-purple-600', name: 'WooCommerce' },
      { icon: 'fab fa-php', color: 'text-indigo-600', name: 'PHP' },
      { icon: 'fas fa-database', color: 'text-blue-500', name: 'MySQL' },
      { icon: 'fas fa-paint-brush', color: 'text-pink-500', name: 'Elementor' },
      { icon: 'fab fa-stripe', color: 'text-indigo-600', name: 'Stripe' },
    ],
    ctaTitle: 'Ready to Build Your WooCommerce Store?',
    ctaDesc: 'Get a flexible WordPress e-commerce store customized for your products and customers.',
    relatedLink: 'ecommerce.html',
  },
  {
    slug: 'cms',
    layout: 'web-dev',
    title: 'CMS Development',
    meta: 'Custom and headless CMS development — Strapi, Contentful, WordPress, and editorial platforms by Guudle IT Solutions.',
    breadcrumb: 'CMS Development',
    heroTitle: 'CMS Development',
    heroSubtitle: 'Custom and headless CMS solutions that empower your team to publish content across web, app, and email — without developer dependency.',
    heroIcon: 'fas fa-file-alt',
    descHeading: 'Content Systems',
    descHighlight: 'Built for Publishers',
    descP1: 'Modern businesses need content that travels everywhere. We build headless CMS architectures and traditional CMS platforms that make publishing fast, consistent, and scalable.',
    descP2: 'From Strapi and Contentful to custom editorial platforms, we design workflows, roles, and integrations that match how your team actually works.',
    pills: ['Headless CMS', 'Multi-channel', 'Role-based Access', 'Easy Editing'],
    offer: [
      { icon: 'fas fa-cloud', title: 'Headless CMS', desc: 'API-first content for web, app, and IoT' },
      { icon: 'fas fa-users', title: 'Editorial Workflows', desc: 'Draft, review, approve, and publish flows' },
      { icon: 'fas fa-globe', title: 'Multi-language', desc: 'Localization and translation management' },
      { icon: 'fas fa-plug', title: 'Integrations', desc: 'Connect CMS to your marketing stack' },
    ],
    servicesTag: 'CMS Services',
    servicesTitle: 'CMS Development Services',
    servicesDesc: 'Content platforms engineered for modern publishing.',
    services: [
      { icon: 'fas fa-cloud', gradient: 'from-navy-600 to-teal-600', title: 'Headless CMS', desc: 'Strapi, Contentful, or Sanity setups with API delivery to web, mobile, and third-party channels.', bullets: ['Strapi', 'Contentful', 'Sanity', 'GraphQL APIs'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-cogs', gradient: 'from-teal-500 to-cyan-500', title: 'Custom CMS', desc: 'Bespoke content management systems tailored to your editorial workflow and content types.', bullets: ['Custom content types', 'Workflow engine', 'Media library', 'Version history'], link: '../contact.html', delay: 100 },
      { icon: 'fab fa-wordpress', gradient: 'from-blue-600 to-indigo-600', title: 'WordPress CMS', desc: 'WordPress as a flexible CMS with custom post types, ACF fields, and Gutenberg blocks.', bullets: ['Custom post types', 'ACF & blocks', 'Multisite', 'User roles'], link: 'wordpress.html', delay: 150 },
      { icon: 'fas fa-globe', gradient: 'from-purple-500 to-pink-500', title: 'Multi-channel Publishing', desc: 'Publish once, deliver everywhere — web, mobile app, email, and digital signage from one CMS.', bullets: ['Omnichannel', 'Webhooks', 'CDN delivery', 'Preview modes'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-users', gradient: 'from-green-500 to-teal-500', title: 'Editorial Workflows', desc: 'Role-based permissions, approval chains, scheduling, and audit trails for content teams.', bullets: ['Role permissions', 'Approval flows', 'Scheduling', 'Audit logs'], link: '../contact.html', delay: 250 },
      { icon: 'fas fa-exchange-alt', gradient: 'from-orange-500 to-amber-500', title: 'CMS Migration', desc: 'Migrate content from legacy CMS, spreadsheets, or static sites to a modern platform.', bullets: ['Content import', 'URL mapping', 'Media migration', 'SEO preservation'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fas fa-database', color: 'text-teal-600', name: 'Strapi' },
      { icon: 'fas fa-cloud', color: 'text-blue-500', name: 'Contentful' },
      { icon: 'fab fa-wordpress', color: 'text-blue-600', name: 'WordPress' },
      { icon: 'fas fa-code', color: 'text-purple-500', name: 'Sanity' },
      { icon: 'fab fa-node-js', color: 'text-green-600', name: 'Node.js' },
      { icon: 'fas fa-project-diagram', color: 'text-pink-500', name: 'GraphQL' },
    ],
    ctaTitle: 'Ready to Build Your CMS?',
    ctaDesc: 'Empower your team with a content platform designed for how you publish.',
    relatedLink: 'website-development.html',
  },
  {
    slug: 'wordpress',
    layout: 'web-dev',
    title: 'WordPress Development',
    meta: 'Custom WordPress development — themes, plugins, Elementor, and performance optimization by Guudle IT Solutions.',
    breadcrumb: 'WordPress Development',
    breadcrumbParent: { label: 'CMS', href: 'cms.html' },
    heroTitle: 'WordPress Development',
    heroSubtitle: 'Custom WordPress websites, plugins, and Elementor designs — secure, fast, and easy for your team to manage.',
    heroIcon: 'fab fa-wordpress',
    descHeading: 'WordPress Sites',
    descHighlight: 'Built Your Way',
    descP1: 'WordPress powers a large share of the web for good reason — flexibility, SEO-friendliness, and a vast plugin ecosystem. We build custom WordPress sites that go beyond templates.',
    descP2: 'From bespoke themes and Gutenberg blocks to WooCommerce stores and membership sites, our WordPress developers deliver maintainable, performant solutions.',
    pills: ['Custom Themes', 'Plugin Development', 'Elementor Pro', 'Performance Tuned'],
    offer: [
      { icon: 'fab fa-wordpress', title: 'Custom Themes', desc: 'Unique designs with clean, maintainable code' },
      { icon: 'fas fa-puzzle-piece', title: 'Plugin Dev', desc: 'Custom functionality for specific workflows' },
      { icon: 'fas fa-shopping-cart', title: 'WooCommerce', desc: 'E-commerce built on WordPress' },
      { icon: 'fas fa-shield-alt', title: 'Security', desc: 'Hardening, updates, and malware protection' },
    ],
    servicesTag: 'WordPress Services',
    servicesTitle: 'WordPress Development Services',
    servicesDesc: 'Professional WordPress development for every use case.',
    services: [
      { icon: 'fab fa-wordpress', gradient: 'from-blue-600 to-indigo-600', title: 'Custom Theme Development', desc: 'Bespoke WordPress themes with Gutenberg blocks, ACF fields, and responsive design.', bullets: ['Custom themes', 'Gutenberg blocks', 'ACF integration', 'Child themes'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-paint-brush', gradient: 'from-teal-500 to-cyan-500', title: 'Elementor Design', desc: 'Pixel-perfect Elementor Pro pages with custom widgets and dynamic content templates.', bullets: ['Elementor Pro', 'Dynamic tags', 'Theme builder', 'Popups & forms'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-puzzle-piece', gradient: 'from-purple-500 to-pink-500', title: 'Plugin Development', desc: 'Custom WordPress plugins for integrations, workflows, and features not available off-the-shelf.', bullets: ['Custom plugins', 'REST API', 'Shortcodes', 'Admin panels'], link: '../contact.html', delay: 150 },
      { icon: 'fas fa-shopping-cart', gradient: 'from-green-500 to-teal-500', title: 'WooCommerce', desc: 'Full WooCommerce store development on WordPress with payments and shipping configured.', bullets: ['Store setup', 'Custom products', 'Subscriptions', 'B2B pricing'], link: 'woocommerce.html', delay: 200 },
      { icon: 'fas fa-tachometer-alt', gradient: 'from-orange-500 to-amber-500', title: 'Performance & SEO', desc: 'Caching, image optimization, Core Web Vitals, and on-page SEO for WordPress sites.', bullets: ['Caching plugins', 'CDN setup', 'Schema markup', 'Speed audit'], link: 'analytics.html', delay: 250 },
      { icon: 'fas fa-shield-alt', gradient: 'from-navy-600 to-teal-600', title: 'Security & Maintenance', desc: 'WordPress hardening, automated backups, update management, and ongoing support.', bullets: ['Security hardening', 'Backups', 'Update management', 'Malware scanning'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fab fa-wordpress', color: 'text-blue-600', name: 'WordPress' },
      { icon: 'fab fa-php', color: 'text-indigo-600', name: 'PHP' },
      { icon: 'fas fa-paint-brush', color: 'text-pink-500', name: 'Elementor' },
      { icon: 'fab fa-woocommerce', color: 'text-purple-600', name: 'WooCommerce' },
      { icon: 'fas fa-database', color: 'text-blue-500', name: 'MySQL' },
      { icon: 'fab fa-js', color: 'text-yellow-400', name: 'JavaScript' },
    ],
    ctaTitle: 'Ready to Build on WordPress?',
    ctaDesc: 'Get a custom WordPress site that looks great, loads fast, and is easy to manage.',
    relatedLink: 'cms.html',
  },
  {
    slug: 'wix',
    layout: 'web-dev',
    title: 'Wix Development',
    meta: 'Professional Wix website design, Velo custom code, and e-commerce setup by Guudle IT Solutions.',
    breadcrumb: 'Wix Development',
    breadcrumbParent: { label: 'CMS', href: 'cms.html' },
    heroTitle: 'Wix Development',
    heroSubtitle: 'Modern Wix websites for small businesses and professionals — designed beautifully, deployed quickly, and easy to edit yourself.',
    heroIcon: 'fas fa-magic',
    descHeading: 'Wix Websites',
    descHighlight: 'Designed & Deployed Fast',
    descP1: 'Wix is ideal for businesses that need a professional web presence quickly without sacrificing design quality. We design Wix sites that stand out from templates.',
    descP2: 'With Velo custom code, Wix Stores, and Wix Bookings, we extend the platform beyond drag-and-drop to deliver features your business actually needs.',
    pills: ['Custom Design', 'Velo Code', 'Wix Stores', 'Quick Launch'],
    offer: [
      { icon: 'fas fa-magic', title: 'Wix Design', desc: 'Custom layouts beyond default templates' },
      { icon: 'fas fa-code', title: 'Velo Development', desc: 'Custom JavaScript and backend logic' },
      { icon: 'fas fa-shopping-bag', title: 'Wix Stores', desc: 'E-commerce with products and checkout' },
      { icon: 'fas fa-calendar', title: 'Wix Bookings', desc: 'Appointment and scheduling systems' },
    ],
    servicesTag: 'Wix Services',
    servicesTitle: 'Wix Development Services',
    servicesDesc: 'Professional Wix websites that look custom-built.',
    services: [
      { icon: 'fas fa-magic', gradient: 'from-purple-500 to-pink-500', title: 'Custom Wix Design', desc: 'Unique Wix websites with custom layouts, animations, and brand-aligned visual design.', bullets: ['Custom layouts', 'Brand design', 'Animations', 'Mobile optimized'], link: '../contact.html', delay: 50 },
      { icon: 'fas fa-code', gradient: 'from-navy-600 to-teal-600', title: 'Velo by Wix', desc: 'Custom JavaScript, database collections, and backend logic with Velo for advanced functionality.', bullets: ['Velo JavaScript', 'Data collections', 'Custom APIs', 'Dynamic pages'], link: '../contact.html', delay: 100 },
      { icon: 'fas fa-shopping-bag', gradient: 'from-green-500 to-teal-500', title: 'Wix Stores', desc: 'Wix e-commerce setup with products, collections, payments, shipping, and tax configuration.', bullets: ['Product catalog', 'Payments', 'Shipping zones', 'Abandoned cart'], link: 'ecommerce.html', delay: 150 },
      { icon: 'fas fa-calendar', gradient: 'from-blue-500 to-indigo-600', title: 'Wix Bookings', desc: 'Appointment scheduling, service menus, staff calendars, and automated reminders.', bullets: ['Service menus', 'Staff scheduling', 'Reminders', 'Payment on booking'], link: '../contact.html', delay: 200 },
      { icon: 'fas fa-search', gradient: 'from-cyan-500 to-teal-500', title: 'Wix SEO', desc: 'On-page SEO, structured data, site speed optimization, and Google Search Console setup.', bullets: ['Meta tags', 'Sitemap', 'Speed optimization', 'Analytics'], link: 'analytics.html', delay: 250 },
      { icon: 'fas fa-headset', gradient: 'from-orange-500 to-amber-500', title: 'Training & Support', desc: 'Editor training, content updates, and ongoing Wix support so your team stays independent.', bullets: ['Editor training', 'Content updates', 'Domain setup', 'Ongoing support'], link: '../contact.html', delay: 300 },
    ],
    tech: [
      { icon: 'fas fa-magic', color: 'text-purple-500', name: 'Wix Editor' },
      { icon: 'fas fa-code', color: 'text-blue-600', name: 'Velo' },
      { icon: 'fab fa-js', color: 'text-yellow-400', name: 'JavaScript' },
      { icon: 'fas fa-shopping-bag', color: 'text-green-600', name: 'Wix Stores' },
      { icon: 'fas fa-calendar', color: 'text-indigo-600', name: 'Wix Bookings' },
      { icon: 'fab fa-google', color: 'text-red-500', name: 'Analytics' },
    ],
    ctaTitle: 'Ready to Launch on Wix?',
    ctaDesc: 'Get a professional Wix website designed, built, and ready to grow your business.',
    relatedLink: 'cms.html',
  },
];

function breadcrumbHtml(p) {
  let html = `<a href="../../index.html" class="hover:text-white">Home</a>
          <span class="mx-2">/</span>
          <span>Services</span>`;
  if (p.breadcrumbParent) {
    html += `\n          <span class="mx-2">/</span>
          <a href="${p.breadcrumbParent.href}" class="hover:text-white">${esc(p.breadcrumbParent.label)}</a>`;
  }
  html += `\n          <span class="mx-2">/</span>
          <span class="text-teal-300 font-medium">${esc(p.breadcrumb)}</span>`;
  return html;
}

function renderPage(p) {
  const innovation = innovationTabs(p.innovation || DEFAULT_INNOVATION);
  const process = p.process || DEFAULT_PROCESS;
  const trust = p.trust || DEFAULT_TRUST;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSiteMetaBlock({ homeHref: '../../index.html', aboutHref: '../about.html' })}
  <meta name="description" content="${esc(p.meta)}">
  <title>${esc(p.title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>${TAILWIND}</script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-pages.css">
</head>
<body class="service-page layout-web-dev bg-white text-[#0B1F3A] antialiased" data-service="${p.slug}" data-layout="web-dev">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">

    <!-- Hero Section -->
    <section class="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-teal-800">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm text-gray-300 mb-8" aria-label="Breadcrumb">
          ${breadcrumbHtml(p)}
        </nav>
        <div class="text-center" data-aos="fade-up">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">${esc(p.heroTitle)}</h1>
          <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">${esc(p.heroSubtitle)}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="../contact.html" class="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">Request a Callback</a>
            <a href="../contact.html" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-navy-900 transition-all duration-300">Schedule Free Consultation</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Description Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div data-aos="fade-right" class="relative">
            <div class="rounded-2xl shadow-2xl w-full aspect-[4/3] bg-gradient-to-br from-navy-600 via-teal-600 to-cyan-600 flex items-center justify-center overflow-hidden">
              <i class="${p.heroIcon} text-white/30 text-[8rem]" aria-hidden="true"></i>
            </div>
          </div>
          <div class="space-y-8" data-aos="fade-left">
            <div>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ${esc(p.descHeading)} <span class="bg-gradient-to-r from-navy-600 to-teal-600 bg-clip-text text-transparent">${esc(p.descHighlight)}</span>
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">${esc(p.descP1)}</p>
              <p class="text-lg text-gray-600 mb-8 leading-relaxed">${esc(p.descP2)}</p>
              <div class="flex flex-wrap gap-4">
                ${pills(p.pills)}
              </div>
            </div>
            <div class="bg-gradient-to-br from-navy-600 to-teal-600 rounded-2xl p-1 shadow-2xl">
              <div class="bg-white rounded-xl p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
                <ul class="space-y-4">
                  ${offerItems(p.offer)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-100 mb-4">${esc(p.servicesTag)}</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">${esc(p.servicesTitle)}</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">${esc(p.servicesDesc)}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${p.services.map(serviceCard).join('\n\n          ')}
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-20 bg-gradient-to-br from-navy-900 to-teal-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-white/10 text-white border border-white/20 mb-4">Our Process</span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">How We Work</h2>
          <p class="text-xl text-gray-200 max-w-3xl mx-auto">See how our smooth, step-by-step process turns your ideas into practical digital solutions.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          ${processSteps(process)}
        </div>
      </div>
    </section>

    <!-- Why Partner -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Partner With Guudle</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">Trusted by businesses worldwide to deliver exceptional solutions</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${trustItems(trust)}
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-100 mb-4">Technologies</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">We leverage cutting-edge technologies to build modern, scalable solutions</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          ${techStack(p.tech)}
        </div>
      </div>
    </section>

    <!-- Innovation Tabs -->
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100" data-innovation-tabs>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-block text-sm font-semibold text-navy-600 uppercase tracking-wider bg-navy-50 px-4 py-2 rounded-full mb-4">Innovation &amp; Excellence</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powered by <span class="bg-gradient-to-r from-navy-600 to-teal-600 bg-clip-text text-transparent">Latest Technology</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Cutting-edge approaches and innovative solutions that drive your business forward</p>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mb-12 border-b-2 border-gray-200 pb-4" data-aos="fade-up" data-aos-delay="100">
          ${innovation.nav}
        </div>
        <div class="relative min-h-[400px]">
          ${innovation.panels}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-navy-600 to-teal-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">${esc(p.ctaTitle)}</h2>
          <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">${esc(p.ctaDesc)}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="../contact.html" class="bg-white text-navy-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">Get Started Today</a>
            <a href="../contact.html" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">Schedule a Consultation</a>
          </div>
        </div>
      </div>
    </section>

  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="../../assets/js/mega-menu-data.js"></script>
  <script src="../../assets/js/mega-menu-render.js"></script>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/service-pages.js"></script>
</body>
</html>`;
}

for (const p of PAGES) {
  const file = path.join(OUT, `${p.slug}.html`);
  fs.writeFileSync(file, renderPage(p), 'utf8');
  console.log('Wrote', p.slug + '.html');
}

console.log(`Done — ${PAGES.length} pages generated.`);
