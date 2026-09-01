/**
 * Technology Hub — full page renderer (pages/technology.html)
 */
import { renderDevProcessSection } from './dev-process-render.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { AI_EMERGING_TECH, AI_FILTERS } from './tech-data.mjs';
import { renderAiServiceDirectory } from './ai-hub-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function unsplash(photoId, w = 900) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=82&auto=format&fit=crop`;
}

const IMG_POOL = [
  'photo-1498050108023-c5249f4df085',
  'photo-1522071820081-009f0129c71c',
  'photo-1460925895917-afdab827c52f',
  'photo-1451187580459-43490279c0fa',
  'photo-1486406146926-c627a92ad1ab',
  'photo-1551434678-e076c223a692',
  'photo-1454165804606-c3d57bc86b40',
];

const IMG = {
  hero: unsplash('photo-1451187580459-43490279c0fa', 900),
  philosophy: unsplash('photo-1522071820081-009f0129c71c', 1600),
  frontend: unsplash('photo-1498050108023-c5249f4df085', 1600),
  comparison: unsplash('photo-1460925895917-afdab827c52f', 1600),
  industry: unsplash('photo-1486406146926-c627a92ad1ab', 1600),
  backend: unsplash('photo-1558494949-ef010cbdcc31', 1600),
  cta: unsplash('photo-1551434678-e076c223a692', 1600),
  roadmap: unsplash('photo-1454165804606-c3d57bc86b40', 1600),
};

const HERO_SUBTITLE =
  'Deliver secure, scalable, and future-ready digital solutions powered by the world\'s leading technologies. From AI and cloud computing to mobile applications, enterprise software, DevOps, cybersecurity, and modern web platforms, we leverage the right technology stack to help businesses innovate, grow, and stay ahead of the competition.';

const HERO_FLOAT_CHIPS = [
  ['fab fa-html5', 'HTML5'], ['fab fa-css3-alt', 'CSS3'], ['fab fa-js', 'JavaScript'], ['fab fa-react', 'React'],
  ['fas fa-n', 'Next.js'], ['fab fa-node-js', 'Node.js'], ['fab fa-laravel', 'Laravel'], ['fab fa-aws', 'AWS'],
  ['fab fa-microsoft', 'Azure'], ['fab fa-google', 'GCP'], ['fab fa-docker', 'Docker'], ['fas fa-robot', 'OpenAI'],
  ['fab fa-flutter', 'Flutter'], ['fas fa-database', 'PostgreSQL'], ['fab fa-python', 'Python'], ['fas fa-plug', 'REST API'],
];

const HERO_VALUE_PILLS = [
  ['fa-layer-group', 'Scalable Architecture'],
  ['fa-shield-halved', 'Security First'],
  ['fa-code', 'Modern Technology'],
  ['fa-headset', 'Dedicated Support'],
];

const HERO_ICON_GROUPS = [
  { label: 'Frontend', items: [['fab fa-html5', 'HTML5'], ['fab fa-css3-alt', 'CSS3'], ['fab fa-js', 'JavaScript'], ['fab fa-react', 'React']] },
  { label: 'Backend', items: [['fab fa-laravel', 'Laravel'], ['fab fa-node-js', 'Node.js'], ['fab fa-microsoft', 'ASP.NET']] },
  { label: 'Cloud', items: [['fab fa-aws', 'AWS'], ['fab fa-microsoft', 'Azure'], ['fab fa-google', 'Google Cloud']] },
  { label: 'AI', items: [['fas fa-robot', 'OpenAI'], ['fas fa-project-diagram', 'TensorFlow'], ['fas fa-link', 'LangChain']] },
];

const PHILOSOPHY_PILLARS = [
  ['fa-bullseye', 'Choosing the Right Technology', 'Every stack decision is aligned with business goals, team capability, and long-term product vision — never hype-driven choices.'],
  ['fa-expand', 'Long-Term Scalability', 'Architectures designed to handle growth in users, data, features, and geographic expansion without costly rewrites.'],
  ['fa-screwdriver-wrench', 'Maintainability', 'Clean code, documented APIs, and modular design so your team can evolve products efficiently for years.'],
  ['fa-shield-halved', 'Security First', 'Security embedded at every layer — authentication, encryption, compliance, and proactive vulnerability management.'],
  ['fa-gauge-high', 'Performance Excellence', 'Core Web Vitals, sub-second APIs, and optimized infrastructure tuned for real-world load and engagement.'],
  ['fa-layer-group', 'Future-Proof Architecture', 'Cloud-native, API-first, and standards-based systems ready for AI, mobile, and emerging platform integrations.'],
];

const FRONTEND_TECH = [
  { icon: 'fab fa-html5', title: 'HTML5', cat: 'core', type: 'Markup', desc: 'Semantic, accessible markup forming the foundation of every web experience we deliver.', useCases: ['Corporate websites', 'Web applications', 'SEO-ready pages', 'Progressive web apps'], tags: ['Semantic', 'Accessible', 'SEO'] },
  { icon: 'fab fa-css3-alt', title: 'CSS3', cat: 'core', type: 'Styling', desc: 'Modern styling with flexbox, grid, animations, and responsive layouts for pixel-perfect interfaces.', useCases: ['Responsive design', 'Design systems', 'Micro-interactions', 'Cross-browser UI'], tags: ['Grid', 'Flexbox', 'Animations'] },
  { icon: 'fab fa-js', title: 'JavaScript', cat: 'core', type: 'Language', desc: 'The core language powering interactive, dynamic, and real-time web experiences across the stack.', useCases: ['SPAs', 'Interactive dashboards', 'Form validation', 'Real-time updates'], tags: ['ES6+', 'DOM', 'Async'] },
  { icon: 'fab fa-js', title: 'TypeScript', cat: 'core', type: 'Language', desc: 'Typed JavaScript for large-scale applications with fewer runtime errors and better developer experience.', useCases: ['Enterprise apps', 'Shared codebases', 'API clients', 'Complex state management'], tags: ['Type-safe', 'Enterprise', 'Tooling'] },
  { icon: 'fab fa-react', title: 'React.js', cat: 'framework', type: 'UI Library', desc: 'Component-based UI library for building fast, scalable single-page applications and design systems.', useCases: ['SaaS dashboards', 'E-commerce storefronts', 'Admin panels', 'Customer portals'], tags: ['Components', 'Virtual DOM', 'Hooks'] },
  { icon: 'fas fa-n', title: 'Next.js', cat: 'framework', type: 'Meta-Framework', desc: 'Full-stack React framework with SSR, SSG, and API routes for SEO-friendly, high-performance web apps.', useCases: ['Marketing sites', 'E-commerce', 'Headless CMS frontends', 'Enterprise portals'], tags: ['SSR', 'SSG', 'App Router'] },
  { icon: 'fab fa-vuejs', title: 'Vue.js', cat: 'framework', type: 'Framework', desc: 'Progressive framework for building intuitive interfaces with gentle learning curve and powerful tooling.', useCases: ['Admin dashboards', 'Progressive apps', 'Embedded widgets', 'Content platforms'], tags: ['Reactive', 'Composition API', 'Nuxt'] },
  { icon: 'fab fa-angular', title: 'Angular', cat: 'framework', type: 'Enterprise Framework', desc: 'Enterprise-grade TypeScript framework with batteries-included architecture for large teams and complex apps.', useCases: ['Enterprise portals', 'Financial platforms', 'Government systems', 'Internal tools'], tags: ['RxJS', 'TypeScript', 'Enterprise'] },
  { icon: 'fas fa-bolt', title: 'Svelte', cat: 'framework', type: 'Framework', desc: 'Compiler-driven framework that ships minimal JavaScript for blazing-fast, lightweight user interfaces.', useCases: ['Performance-critical UIs', 'Embedded widgets', 'Marketing microsites', 'Interactive dashboards'], tags: ['Compile-time', 'Lightweight', 'SvelteKit'] },
  { icon: 'fab fa-bootstrap', title: 'Bootstrap', cat: 'styling', type: 'CSS Framework', desc: 'Rapid UI prototyping and responsive grid system for consistent, mobile-first component layouts.', useCases: ['MVPs', 'Admin templates', 'Marketing pages', 'Legacy modernization'], tags: ['Grid', 'Components', 'Mobile-first'] },
  { icon: 'fas fa-wind', title: 'Tailwind CSS', cat: 'styling', type: 'Utility CSS', desc: 'Utility-first CSS framework for custom, maintainable designs without leaving your HTML workflow.', useCases: ['Design systems', 'Landing pages', 'SaaS products', 'Rapid iteration'], tags: ['Utility-first', 'JIT', 'Design tokens'] },
  { icon: 'fab fa-sass', title: 'SASS / SCSS', cat: 'styling', type: 'Preprocessor', desc: 'CSS preprocessor with variables, mixins, and nesting for scalable, organized stylesheets.', useCases: ['Theme systems', 'Brand consistency', 'Large CSS codebases', 'Component libraries'], tags: ['Variables', 'Mixins', 'Modules'] },
  { icon: 'fas fa-cubes', title: 'Material UI', cat: 'ui', type: 'Component Library', desc: 'React component library implementing Google Material Design for polished, accessible enterprise UIs.', useCases: ['Enterprise dashboards', 'Data tables', 'Form-heavy apps', 'Design consistency'], tags: ['MUI', 'Theming', 'Accessibility'] },
  { icon: 'fas fa-shapes', title: 'ShadCN UI', cat: 'ui', type: 'Component System', desc: 'Copy-paste React components built on Radix UI and Tailwind for modern, accessible interface primitives.', useCases: ['SaaS UIs', 'Admin panels', 'Design systems', 'Startup MVPs'], tags: ['Radix', 'Tailwind', 'Accessible'] },
  { icon: 'fas fa-layer-group', title: 'Radix UI', cat: 'ui', type: 'Primitives', desc: 'Unstyled, accessible UI primitives for building high-quality design systems and custom components.', useCases: ['Design systems', 'Accessible forms', 'Dialogs & menus', 'Custom components'], tags: ['A11y', 'Headless', 'WAI-ARIA'] },
  { icon: 'fas fa-cube', title: 'Three.js', cat: 'animation', type: '3D Library', desc: '3D JavaScript library for immersive web experiences, product visualizations, and interactive graphics.', useCases: ['3D product viewers', 'Data visualizations', 'Immersive landing pages', 'Architectural walkthroughs'], tags: ['WebGL', '3D', 'Interactive'] },
  { icon: 'fas fa-film', title: 'GSAP', cat: 'animation', type: 'Animation', desc: 'Professional-grade animation library for scroll-triggered effects, timelines, and micro-interactions.', useCases: ['Hero animations', 'Scroll storytelling', 'Page transitions', 'Interactive marketing sites'], tags: ['ScrollTrigger', 'Timeline', 'Performance'] },
  { icon: 'fas fa-wand-magic-sparkles', title: 'Framer Motion', cat: 'animation', type: 'Animation', desc: 'Production-ready motion library for React with declarative animations and gesture support.', useCases: ['Page transitions', 'Micro-interactions', 'Gesture UIs', 'Animated layouts'], tags: ['React', 'Gestures', 'Layout'] },
  { icon: 'fas fa-bolt', title: 'Vite', cat: 'tooling', type: 'Build Tool', desc: 'Next-generation frontend tooling with instant HMR and optimized production builds.', useCases: ['React/Vue apps', 'Fast dev servers', 'Library bundling', 'Modern SPAs'], tags: ['HMR', 'ESM', 'Rollup'] },
  { icon: 'fas fa-box-open', title: 'Webpack', cat: 'tooling', type: 'Bundler', desc: 'Mature module bundler for complex asset pipelines, code splitting, and legacy project support.', useCases: ['Enterprise builds', 'Code splitting', 'Asset optimization', 'Legacy apps'], tags: ['Bundling', 'Loaders', 'Plugins'] },
];

const FRONTEND_FILTERS = [
  { id: 'all', label: 'All Frontend' },
  { id: 'core', label: 'Core Languages' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'styling', label: 'CSS & Styling' },
  { id: 'ui', label: 'UI Libraries' },
  { id: 'animation', label: 'Animation & 3D' },
  { id: 'tooling', label: 'Build & Tooling' },
];

const BACKEND_TECH = [
  { icon: 'fab fa-node-js', title: 'Node.js', cat: 'runtime', type: 'Runtime', desc: 'Event-driven JavaScript runtime for high-throughput APIs, real-time apps, and microservices.', useCases: ['Real-time chat', 'REST/GraphQL APIs', 'Microservices', 'IoT dashboards'], tags: ['Event loop', 'NPM', 'Non-blocking'] },
  { icon: 'fab fa-laravel', title: 'Laravel', cat: 'framework', type: 'PHP Framework', desc: 'Elegant PHP framework for rapid development of secure, scalable web applications and APIs.', useCases: ['E-commerce backends', 'CMS platforms', 'SaaS APIs', 'Enterprise portals'], tags: ['Eloquent', 'Blade', 'Artisan'] },
  { icon: 'fas fa-server', title: 'Express.js', cat: 'framework', type: 'Node Framework', desc: 'Minimal, flexible Node.js web framework for building fast HTTP APIs and middleware pipelines.', useCases: ['REST APIs', 'Middleware services', 'BFF layers', 'Webhook handlers'], tags: ['Middleware', 'Routing', 'Lightweight'] },
  { icon: 'fas fa-layer-group', title: 'NestJS', cat: 'framework', type: 'Node Framework', desc: 'Progressive Node.js framework with TypeScript, modular architecture, and enterprise patterns.', useCases: ['GraphQL APIs', 'Microservices', 'Real-time backends', 'SaaS platforms'], tags: ['TypeScript', 'DI', 'Modular'] },
  { icon: 'fab fa-microsoft', title: 'ASP.NET Core', cat: 'enterprise', type: 'Enterprise Framework', desc: 'High-performance cross-platform framework for enterprise web apps, APIs, and cloud-native services.', useCases: ['Banking systems', 'Government portals', 'Enterprise ERP', 'Healthcare platforms'], tags: ['.NET', 'Azure', 'High performance'] },
  { icon: 'fab fa-python', title: 'Django', cat: 'framework', type: 'Python Framework', desc: 'Batteries-included Python framework with ORM, admin panel, and security features built in.', useCases: ['Content platforms', 'Data portals', 'Internal tools', 'Rapid MVPs'], tags: ['ORM', 'Admin', 'Security'] },
  { icon: 'fab fa-python', title: 'Flask', cat: 'framework', type: 'Python Microframework', desc: 'Lightweight Python microframework for APIs, prototypes, and AI/ML service endpoints.', useCases: ['ML APIs', 'Microservices', 'Prototypes', 'Data pipelines'], tags: ['Minimal', 'Flexible', 'WSGI'] },
  { icon: 'fab fa-python', title: 'FastAPI', cat: 'framework', type: 'Python API Framework', desc: 'Modern, high-performance Python framework for building APIs with automatic OpenAPI documentation.', useCases: ['AI/ML APIs', 'High-throughput services', 'Async endpoints', 'Microservices'], tags: ['Async', 'OpenAPI', 'Pydantic'] },
  { icon: 'fab fa-java', title: 'Spring Boot', cat: 'enterprise', type: 'Java Framework', desc: 'Production-ready Java framework for enterprise microservices, batch processing, and cloud deployment.', useCases: ['Financial services', 'Large-scale APIs', 'Microservices', 'Legacy modernization'], tags: ['Microservices', 'JVM', 'Enterprise'] },
  { icon: 'fab fa-php', title: 'PHP', cat: 'language', type: 'Language', desc: 'Mature server-side language powering millions of websites with extensive hosting and CMS ecosystem.', useCases: ['WordPress sites', 'Legacy modernization', 'Shared hosting', 'Custom CMS'], tags: ['LAMP', 'CMS', 'Mature'] },
  { icon: 'fab fa-python', title: 'Python', cat: 'language', type: 'Language', desc: 'Versatile language for web backends, automation, data engineering, and AI/ML integration.', useCases: ['AI services', 'Automation scripts', 'Data APIs', 'Scientific computing'], tags: ['Data', 'AI/ML', 'Scripting'] },
  { icon: 'fab fa-java', title: 'Java', cat: 'language', type: 'Language', desc: 'Battle-tested enterprise language for large-scale, mission-critical backend systems.', useCases: ['Banking cores', 'Enterprise ERP', 'Android backends', 'High-availability systems'], tags: ['JVM', 'Enterprise', 'Scalable'] },
  { icon: 'fab fa-microsoft', title: 'C#', cat: 'language', type: 'Language', desc: 'Modern, type-safe language for .NET applications, cloud services, and cross-platform development.', useCases: ['Azure services', 'Desktop + web apps', 'Game backends', 'Enterprise APIs'], tags: ['.NET', 'Type-safe', 'Azure'] },
  { icon: 'fab fa-golang', title: 'Go', cat: 'language', type: 'Language', desc: 'Compiled language built for concurrent, high-performance cloud services and infrastructure tooling.', useCases: ['Microservices', 'DevOps tools', 'High-throughput APIs', 'Cloud-native apps'], tags: ['Concurrency', 'Compiled', 'Cloud-native'] },
  { icon: 'fas fa-gem', title: 'Ruby on Rails', cat: 'framework', type: 'Ruby Framework', desc: 'Convention-over-configuration framework for rapid prototyping and developer-friendly web apps.', useCases: ['Startups', 'MVPs', 'Internal tools', 'Content platforms'], tags: ['Convention', 'ActiveRecord', 'Rapid'] },
  { icon: 'fas fa-project-diagram', title: 'GraphQL', cat: 'api', type: 'API Layer', desc: 'Query language and runtime for flexible, efficient APIs with precise data fetching for modern frontends.', useCases: ['Mobile backends', 'Multi-client APIs', 'Real-time subscriptions', 'Headless commerce'], tags: ['Apollo', 'Schema', 'Subscriptions'] },
  { icon: 'fas fa-network-wired', title: 'gRPC', cat: 'api', type: 'RPC Framework', desc: 'High-performance RPC framework for microservice communication with protocol buffers and streaming.', useCases: ['Microservices', 'Internal APIs', 'Real-time streaming', 'Polyglot systems'], tags: ['Protobuf', 'Streaming', 'Performance'] },
  { icon: 'fas fa-bolt', title: 'Redis', cat: 'runtime', type: 'Cache & Queue', desc: 'In-memory data store for caching, session management, pub/sub messaging, and job queues.', useCases: ['API caching', 'Session storage', 'Rate limiting', 'Background jobs'], tags: ['Cache', 'Pub/Sub', 'Sessions'] },
];

const BACKEND_FILTERS = [
  { id: 'all', label: 'All Backend' },
  { id: 'language', label: 'Languages' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'runtime', label: 'Runtime & Cache' },
  { id: 'api', label: 'APIs & RPC' },
];

const MOBILE_TECH = [
  ['fab fa-flutter', 'Flutter'], ['fab fa-react', 'React Native'], ['fab fa-apple', 'Swift'], ['fab fa-apple', 'SwiftUI'],
  ['fab fa-android', 'Kotlin'], ['fab fa-android', 'Java Android'], ['fab fa-ionic', 'Ionic'], ['fas fa-bolt', 'Capacitor'],
  ['fas fa-fire', 'Firebase'],
];


const AI_IMG = unsplash('photo-1677442136019-21780ecad995', 1600);

const DATABASE_TECH = [
  ['fas fa-database', 'MySQL'], ['fas fa-database', 'PostgreSQL'], ['fas fa-leaf', 'MongoDB'], ['fas fa-database', 'SQL Server'],
  ['fas fa-database', 'MariaDB'], ['fas fa-database', 'SQLite'], ['fas fa-bolt', 'Redis'], ['fas fa-fire', 'Firebase Firestore'],
  ['fas fa-bolt', 'Supabase'], ['fas fa-magnifying-glass', 'ElasticSearch'],
];

const CLOUD_TECH = [
  ['fab fa-aws', 'AWS'], ['fab fa-microsoft', 'Azure'], ['fab fa-google', 'Google Cloud'], ['fab fa-digital-ocean', 'DigitalOcean'],
  ['fab fa-cloudflare', 'Cloudflare'], ['fas fa-triangle-exclamation', 'Vercel'], ['fas fa-cloud', 'Netlify'],
  ['fas fa-server', 'Render'], ['fas fa-train', 'Railway'], ['fas fa-fire', 'Firebase'],
];

const DEVOPS_TECH = [
  ['fab fa-docker', 'Docker'], ['fas fa-dharmachakra', 'Kubernetes'], ['fab fa-github', 'GitHub Actions'], ['fab fa-gitlab', 'GitLab CI/CD'],
  ['fas fa-mountain', 'Terraform'], ['fas fa-cogs', 'Ansible'], ['fab fa-jenkins', 'Jenkins'], ['fas fa-fire', 'Prometheus'],
  ['fas fa-chart-area', 'Grafana'], ['fas fa-server', 'NGINX'], ['fas fa-feather', 'Apache'], ['fab fa-linux', 'Linux'],
];

const API_TECH = [
  ['fas fa-plug', 'REST'], ['fas fa-project-diagram', 'GraphQL'], ['fas fa-bolt', 'WebSockets'], ['fas fa-network-wired', 'gRPC'],
  ['fas fa-key', 'OAuth'], ['fas fa-id-card', 'JWT'], ['fas fa-file-code', 'OpenAPI'], ['fab fa-stripe', 'Stripe API'],
  ['fab fa-paypal', 'PayPal API'], ['fab fa-google', 'Google Maps API'], ['fas fa-comment-sms', 'Twilio'], ['fas fa-fire', 'Firebase API'],
];

const SECURITY_TECH = [
  ['fas fa-lock', 'SSL'], ['fab fa-cloudflare', 'Cloudflare'], ['fas fa-shield-halved', 'WAF'], ['fas fa-key', 'OAuth2'],
  ['fas fa-user-shield', 'IAM'], ['fas fa-mobile-screen', '2FA'], ['fas fa-lock', 'Encryption'], ['fas fa-bug', 'OWASP'],
  ['fas fa-user-secret', 'Penetration Testing'], ['fas fa-chart-line', 'SIEM'], ['fas fa-eye', 'SOC'], ['fas fa-laptop-medical', 'Endpoint Protection'],
];

const UIUX_TECH = [
  ['fab fa-figma', 'Figma'], ['fab fa-adobe', 'Adobe XD'], ['fab fa-adobe', 'Photoshop'], ['fab fa-adobe', 'Illustrator'],
  ['fab fa-adobe', 'After Effects'], ['fas fa-film', 'Lottie'], ['fas fa-cube', 'Spline'], ['fas fa-wand-magic-sparkles', 'Framer'],
];

const CMS_TECH = [
  ['fab fa-wordpress', 'WordPress'], ['fab fa-drupal', 'Drupal'], ['fas fa-cubes', 'Strapi'], ['fas fa-file-lines', 'Sanity'],
  ['fas fa-cloud', 'Contentful'], ['fab fa-laravel', 'Laravel CMS'], ['fa-code-branch', 'Headless CMS'],
];

const TOOLS_TECH = [
  ['fas fa-code', 'VS Code'], ['fab fa-git-alt', 'Git'], ['fab fa-github', 'GitHub'], ['fab fa-gitlab', 'GitLab'],
  ['fas fa-paper-plane', 'Postman'], ['fab fa-docker', 'Docker Desktop'], ['fab fa-android', 'Android Studio'],
  ['fab fa-apple', 'Xcode'], ['fab fa-microsoft', 'Visual Studio'], ['fab fa-npm', 'npm'], ['fab fa-php', 'Composer'],
];

const INDUSTRY_STACKS = [
  {
    icon: 'fa-heart-pulse', name: 'Healthcare', cat: 'health',
    desc: 'HIPAA-aware platforms with secure patient data, appointment systems, and clinical workflow integration.',
    useCase: 'Patient portals, telehealth, EHR integration',
    layers: [
      { label: 'Frontend', items: ['React', 'Next.js'] },
      { label: 'Backend', items: ['Laravel', 'ASP.NET Core'] },
      { label: 'Mobile', items: ['Flutter', 'React Native'] },
      { label: 'Database', items: ['PostgreSQL', 'MySQL'] },
      { label: 'Cloud', items: ['AWS', 'Azure'] },
      { label: 'Security', items: ['HIPAA', 'OAuth2', 'Encryption'] },
    ],
  },
  {
    icon: 'fa-building-columns', name: 'Banking & Finance', cat: 'finance',
    desc: 'Regulated financial systems with audit trails, fraud detection, and enterprise-grade security architecture.',
    useCase: 'Core banking, fintech apps, payment gateways',
    layers: [
      { label: 'Frontend', items: ['Angular', 'React'] },
      { label: 'Backend', items: ['ASP.NET Core', 'Java Spring'] },
      { label: 'Database', items: ['SQL Server', 'PostgreSQL'] },
      { label: 'Cloud', items: ['Azure', 'AWS'] },
      { label: 'APIs', items: ['REST', 'Stripe', 'Plaid'] },
      { label: 'Security', items: ['PCI DSS', 'SOC 2', '2FA'] },
    ],
  },
  {
    icon: 'fa-graduation-cap', name: 'Education', cat: 'public',
    desc: 'Learning management systems, student portals, and accessible content platforms for schools and universities.',
    useCase: 'LMS, course catalogs, student dashboards',
    layers: [
      { label: 'Frontend', items: ['React', 'Vue.js'] },
      { label: 'Backend', items: ['Node.js', 'Laravel'] },
      { label: 'Mobile', items: ['Flutter'] },
      { label: 'Database', items: ['MongoDB', 'MySQL'] },
      { label: 'Cloud', items: ['Google Cloud', 'AWS'] },
      { label: 'CMS', items: ['Headless CMS', 'WordPress'] },
    ],
  },
  {
    icon: 'fa-landmark', name: 'Government', cat: 'public',
    desc: 'Accessible, secure citizen services with WCAG compliance, multi-language support, and audit-ready infrastructure.',
    useCase: 'Citizen portals, service directories, document libraries',
    layers: [
      { label: 'Frontend', items: ['Angular', 'React'] },
      { label: 'Backend', items: ['ASP.NET Core', 'Django'] },
      { label: 'Database', items: ['SQL Server', 'PostgreSQL'] },
      { label: 'Cloud', items: ['Azure', 'AWS GovCloud'] },
      { label: 'Security', items: ['WCAG 2.2', 'IAM', 'WAF'] },
    ],
  },
  {
    icon: 'fa-helmet-safety', name: 'Construction', cat: 'commerce',
    desc: 'Project showcase sites, lead generation, and field-service tools for contractors and developers.',
    useCase: 'Portfolio sites, project galleries, CRM leads',
    layers: [
      { label: 'Frontend', items: ['Vue.js', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Laravel', 'Node.js'] },
      { label: 'Database', items: ['MySQL', 'PostgreSQL'] },
      { label: 'Cloud', items: ['DigitalOcean', 'AWS'] },
      { label: 'Integrations', items: ['HubSpot', 'Google Maps'] },
    ],
  },
  {
    icon: 'fa-basket-shopping', name: 'Retail & E-Commerce', cat: 'commerce',
    desc: 'High-converting online stores with inventory sync, payment gateways, and omnichannel commerce capabilities.',
    useCase: 'Online stores, marketplaces, B2B wholesale',
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React'] },
      { label: 'Backend', items: ['Laravel', 'Node.js'] },
      { label: 'Payments', items: ['Stripe', 'PayPal', 'Apple Pay'] },
      { label: 'Database', items: ['MySQL', 'Redis'] },
      { label: 'Cloud', items: ['AWS', 'Vercel'] },
    ],
  },
  {
    icon: 'fa-concierge-bell', name: 'Hospitality', cat: 'commerce',
    desc: 'Booking engines, room galleries, and guest experience platforms for hotels, resorts, and travel brands.',
    useCase: 'Hotel booking, reservations, guest apps',
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React'] },
      { label: 'Mobile', items: ['Flutter', 'React Native'] },
      { label: 'Backend', items: ['Laravel', 'Node.js'] },
      { label: 'Database', items: ['Firebase', 'PostgreSQL'] },
      { label: 'Cloud', items: ['Firebase', 'AWS'] },
      { label: 'APIs', items: ['Booking APIs', 'Stripe'] },
    ],
  },
  {
    icon: 'fa-truck', name: 'Logistics & Transportation', cat: 'commerce',
    desc: 'Fleet tracking, route optimization, and real-time shipment visibility for logistics operators.',
    useCase: 'Fleet dashboards, tracking portals, dispatch systems',
    layers: [
      { label: 'Frontend', items: ['React', 'Angular'] },
      { label: 'Backend', items: ['Node.js', 'Go'] },
      { label: 'Mobile', items: ['Flutter', 'Kotlin'] },
      { label: 'Database', items: ['PostgreSQL', 'MongoDB'] },
      { label: 'Cloud', items: ['AWS', 'Google Cloud'] },
      { label: 'Real-time', items: ['WebSockets', 'Mapbox'] },
    ],
  },
  {
    icon: 'fa-industry', name: 'Manufacturing', cat: 'commerce',
    desc: 'IoT dashboards, supply chain visibility, and ERP integrations for industrial operations.',
    useCase: 'IoT monitoring, ERP portals, B2B ordering',
    layers: [
      { label: 'Frontend', items: ['Angular', 'React'] },
      { label: 'Backend', items: ['ASP.NET Core', 'Java'] },
      { label: 'Database', items: ['SQL Server', 'InfluxDB'] },
      { label: 'Cloud', items: ['Azure IoT', 'AWS'] },
      { label: 'DevOps', items: ['Docker', 'Kubernetes'] },
    ],
  },
  {
    icon: 'fa-robot', name: 'AI & Machine Learning', cat: 'tech',
    desc: 'LLM integrations, RAG pipelines, vector search, and intelligent automation for enterprise AI products.',
    useCase: 'AI agents, chatbots, predictive analytics',
    layers: [
      { label: 'AI', items: ['OpenAI', 'Claude', 'Gemini'] },
      { label: 'Frameworks', items: ['LangChain', 'PyTorch', 'TensorFlow'] },
      { label: 'Backend', items: ['Python', 'FastAPI', 'Node.js'] },
      { label: 'Database', items: ['PostgreSQL', 'Pinecone', 'Redis'] },
      { label: 'Cloud', items: ['AWS', 'GCP'] },
    ],
  },
  {
    icon: 'fa-house', name: 'Real Estate', cat: 'commerce',
    desc: 'Property listing platforms with map search, virtual tours, and CRM-integrated lead capture.',
    useCase: 'Property portals, agent sites, IDX integration',
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React'] },
      { label: 'Backend', items: ['Laravel', 'WordPress'] },
      { label: 'Database', items: ['MySQL', 'PostgreSQL'] },
      { label: 'Cloud', items: ['AWS', 'Cloudflare'] },
      { label: 'Integrations', items: ['Mapbox', 'Matterport', 'HubSpot'] },
    ],
  },
  {
    icon: 'fa-scale-balanced', name: 'Legal & Professional Services', cat: 'finance',
    desc: 'Trust-building corporate sites with secure client portals, document management, and intake forms.',
    useCase: 'Law firm websites, client portals, case intake',
    layers: [
      { label: 'Frontend', items: ['Next.js', 'WordPress'] },
      { label: 'Backend', items: ['Laravel', 'ASP.NET Core'] },
      { label: 'Database', items: ['MySQL', 'SQL Server'] },
      { label: 'Cloud', items: ['Azure', 'AWS'] },
      { label: 'Security', items: ['SSL', 'Encryption', 'GDPR'] },
    ],
  },
  {
    icon: 'fa-tower-cell', name: 'Telecommunications', cat: 'tech',
    desc: 'Customer self-service portals, billing systems, and network operations dashboards at scale.',
    useCase: 'Self-service portals, billing, network ops',
    layers: [
      { label: 'Frontend', items: ['Angular', 'React'] },
      { label: 'Backend', items: ['Java', 'Node.js'] },
      { label: 'Database', items: ['Oracle', 'PostgreSQL'] },
      { label: 'Cloud', items: ['AWS', 'OpenShift'] },
      { label: 'DevOps', items: ['Kubernetes', 'Terraform'] },
    ],
  },
  {
    icon: 'fa-hand-holding-heart', name: 'Non-Profit & NGO', cat: 'public',
    desc: 'Donation platforms, volunteer management, and mission-driven sites that inspire action and engagement.',
    useCase: 'Donation systems, volunteer signup, impact stories',
    layers: [
      { label: 'Frontend', items: ['React', 'WordPress'] },
      { label: 'Backend', items: ['Laravel', 'Node.js'] },
      { label: 'Payments', items: ['Stripe', 'PayPal'] },
      { label: 'Database', items: ['MySQL', 'PostgreSQL'] },
      { label: 'Cloud', items: ['DigitalOcean', 'AWS'] },
    ],
  },
  {
    icon: 'fa-shield-halved', name: 'Insurance', cat: 'finance',
    desc: 'Quote engines, policy management portals, and claims workflows with strict compliance requirements.',
    useCase: 'Quote calculators, policy portals, claims intake',
    layers: [
      { label: 'Frontend', items: ['React', 'Angular'] },
      { label: 'Backend', items: ['ASP.NET Core', 'Java'] },
      { label: 'Database', items: ['SQL Server', 'PostgreSQL'] },
      { label: 'Cloud', items: ['Azure', 'AWS'] },
      { label: 'Security', items: ['SOC 2', 'Encryption', 'Audit logs'] },
    ],
  },
  {
    icon: 'fa-newspaper', name: 'Media & Publishing', cat: 'tech',
    desc: 'High-traffic editorial platforms with CMS workflows, ad integration, and newsletter automation.',
    useCase: 'News sites, magazines, content hubs',
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React'] },
      { label: 'CMS', items: ['Headless CMS', 'WordPress', 'Strapi'] },
      { label: 'Backend', items: ['Node.js', 'Laravel'] },
      { label: 'Database', items: ['PostgreSQL', 'MongoDB'] },
      { label: 'Cloud', items: ['Vercel', 'AWS', 'CDN'] },
    ],
  },
];

const INDUSTRY_FILTERS = [
  { id: 'all', label: 'All Industries' },
  { id: 'health', label: 'Healthcare' },
  { id: 'finance', label: 'Financial Services' },
  { id: 'public', label: 'Public Sector' },
  { id: 'commerce', label: 'Commerce & Retail' },
  { id: 'tech', label: 'Technology & AI' },
];

const COMPARISONS = [
  {
    title: 'Flutter vs React Native',
    left: { name: 'Flutter', points: ['Single codebase for iOS, Android, web, desktop', 'Custom rendering engine — consistent UI', 'Strong performance with compiled Dart', 'Ideal for pixel-perfect branded apps'] },
    right: { name: 'React Native', points: ['Leverages existing React/JavaScript skills', 'Large npm ecosystem and community', 'Native module integration flexibility', 'Ideal for JS-first teams and rapid iteration'] },
  },
  {
    title: 'Laravel vs Node.js',
    left: { name: 'Laravel', points: ['Batteries-included PHP framework', 'Eloquent ORM and built-in auth', 'Excellent for CMS and e-commerce', 'Mature hosting and deployment options'] },
    right: { name: 'Node.js', points: ['JavaScript across frontend and backend', 'Event-driven, high-concurrency I/O', 'Ideal for real-time and microservices', 'Massive npm package ecosystem'] },
  },
  {
    title: 'React vs Angular',
    left: { name: 'React', points: ['Flexible, library-first approach', 'Huge ecosystem and hiring pool', 'Virtual DOM for efficient updates', 'Ideal for SPAs and design systems'] },
    right: { name: 'Angular', points: ['Full framework with CLI and conventions', 'TypeScript-first enterprise patterns', 'Built-in routing, forms, and HTTP', 'Ideal for large teams and long-lived apps'] },
  },
  {
    title: 'MySQL vs PostgreSQL',
    left: { name: 'MySQL', points: ['Widely supported and cost-effective', 'Excellent read performance', 'Simple replication and hosting', 'Ideal for web apps and CMS workloads'] },
    right: { name: 'PostgreSQL', points: ['Advanced SQL and JSON support', 'Strong ACID compliance and extensions', 'Superior for complex queries and analytics', 'Ideal for enterprise and geospatial data'] },
  },
  {
    title: 'MongoDB vs SQL Server',
    left: { name: 'MongoDB', points: ['Flexible document schema', 'Horizontal scaling with sharding', 'Fast iteration for evolving data models', 'Ideal for content, IoT, and catalog data'] },
    right: { name: 'SQL Server', points: ['Enterprise-grade relational database', 'Deep Microsoft ecosystem integration', 'Advanced reporting and BI tooling', 'Ideal for finance, ERP, and .NET stacks'] },
  },
  {
    title: 'AWS vs Azure',
    left: { name: 'AWS', points: ['Broadest cloud service catalog', 'Market leader with global regions', 'Mature serverless and container tooling', 'Ideal for startups to enterprise scale'] },
    right: { name: 'Azure', points: ['Seamless Microsoft/.NET integration', 'Strong hybrid cloud and Active Directory', 'Enterprise compliance and governance', 'Ideal for Microsoft-centric organizations'] },
  },
];

const WHY_TECH = [
  ['fa-gauge-high', 'Performance', 'Technologies selected for speed, efficiency, and measurable Core Web Vitals excellence.'],
  ['fa-shield-halved', 'Security', 'Enterprise-grade security, encryption, and compliance built into every layer of the stack.'],
  ['fa-expand', 'Scalability', 'Cloud-native architectures that scale horizontally with traffic, data, and feature growth.'],
  ['fa-screwdriver-wrench', 'Maintainability', 'Clean, documented codebases that your team can extend and support long-term.'],
  ['fa-users', 'Community Support', 'Active ecosystems with strong documentation, libraries, and global developer communities.'],
  ['fa-hourglass-half', 'Long-Term Stability', 'Proven technologies with stable release cycles and enterprise adoption track records.'],
  ['fa-building', 'Enterprise Ready', 'Battle-tested stacks used by Fortune 500 companies and regulated industries worldwide.'],
  ['fa-cloud', 'Cloud Native', 'Container-ready, API-first systems designed for modern cloud deployment and DevOps pipelines.'],
];

const ROADMAP_STEPS = [
  { t: 'Planning', d: 'Define project scope, technology requirements, success metrics, and stakeholder alignment.', icon: 'fa-clipboard-list', duration: '1–2 weeks' },
  { t: 'Architecture', d: 'Design system architecture, data models, integration points, and infrastructure blueprint.', icon: 'fa-sitemap', duration: '1–2 weeks' },
  { t: 'Design', d: 'Create UI/UX wireframes, prototypes, and design systems validated with users and engineering.', icon: 'fa-palette', duration: '2–3 weeks' },
  { t: 'Development', d: 'Build secure, scalable features in agile sprints with continuous integration and code review.', icon: 'fa-code', duration: 'Sprint-based' },
  { t: 'Testing', d: 'Execute functional, performance, security, accessibility, and cross-platform QA before release.', icon: 'fa-vial', duration: '1–2 weeks' },
  { t: 'Deployment', d: 'Launch to production with CI/CD pipelines, DNS, SSL, CDN, and zero-downtime release strategies.', icon: 'fa-rocket', duration: '1 week' },
  { t: 'Monitoring', d: 'Configure observability, alerting, logging, and uptime monitoring for production health.', icon: 'fa-chart-line', duration: 'Continuous' },
  { t: 'Optimization', d: 'Tune performance, reduce costs, improve conversion, and iterate based on analytics insights.', icon: 'fa-sliders', duration: 'Ongoing' },
  { t: 'Support', d: 'Provide SLA-backed maintenance, security patches, feature enhancements, and technical support.', icon: 'fa-headset', duration: 'Continuous' },
];

const CERTIFICATIONS = [
  ['fa-certificate', 'ISO', 'Quality management and information security standards alignment.'],
  ['fa-shield-halved', 'OWASP', 'Web application security best practices and vulnerability prevention.'],
  ['fa-universal-access', 'WCAG', 'Web Content Accessibility Guidelines 2.2 AA compliance.'],
  ['fa-user-shield', 'GDPR', 'Data protection and privacy regulation compliance for EU markets.'],
  ['fa-lock', 'SOC 2', 'Service organization controls for security, availability, and confidentiality.'],
  ['fa-credit-card', 'PCI DSS', 'Payment card industry data security for e-commerce platforms.'],
  ['fa-cloud', 'Cloud Certifications', 'AWS, Azure, and GCP certified cloud architects and engineers.'],
  ['fab fa-microsoft', 'Microsoft', 'Microsoft partner certifications and Azure solution expertise.'],
  ['fab fa-aws', 'AWS', 'Amazon Web Services certified solutions architects and developers.'],
  ['fab fa-google', 'Google', 'Google Cloud Platform certified professionals and AI specialists.'],
];

const FAQ = [
  { q: 'Why do you use Flutter for mobile development?', a: 'Flutter delivers a single codebase for iOS and Android with near-native performance, consistent UI across devices, and faster time-to-market — ideal for branded apps, MVPs, and cross-platform products.' },
  { q: 'Why do you choose Laravel for backend development?', a: 'Laravel offers rapid development, built-in security features, elegant ORM, and a mature ecosystem — making it excellent for e-commerce, CMS platforms, SaaS APIs, and enterprise web applications.' },
  { q: 'Do you integrate AI into your projects?', a: 'Yes. We integrate OpenAI, Claude, Gemini, LangChain, RAG pipelines, vector databases, and custom AI agents into web, mobile, and enterprise platforms — always with security and data governance in mind.' },
  { q: 'Which database should I choose for my project?', a: 'It depends on your data model and scale. We recommend MySQL or PostgreSQL for relational workloads, MongoDB for flexible documents, Redis for caching, and SQL Server for Microsoft-centric enterprise environments.' },
  { q: 'Do you provide cloud hosting and deployment?', a: 'Yes. We deploy to AWS, Azure, Google Cloud, DigitalOcean, Vercel, and Firebase with CI/CD pipelines, SSL, CDN, monitoring, and auto-scaling configured for production reliability.' },
  { q: 'How do you ensure security in your technology stack?', a: 'We implement SSL/TLS, OAuth2, encryption, WAF protection, OWASP best practices, penetration testing, 2FA, and compliance frameworks including GDPR, SOC 2, and PCI DSS where required.' },
];

function parallax({ id, bg, light, inner, speed = '0.32' }) {
  return `<section id="${id}" class="tech-parallax guudle-parallax-section${light ? ' tech-parallax--light' : ''}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="tech-parallax__ambient" aria-hidden="true"><span class="tech-parallax__orb tech-parallax__orb--1"></span><span class="tech-parallax__orb tech-parallax__orb--2"></span><div class="tech-parallax__grid"></div></div>
  <div class="tech-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="tech-parallax__overlay${light ? ' tech-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="tech-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

function glowCard({ icon, title, desc, items, delay = 0 }) {
  const list = items?.length
    ? `<ul class="tech-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(typeof i === 'string' ? i : i[1])}</li>`).join('')}</ul>`
    : '';
  return `<article class="tech-glow-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="tech-glow-card__glow" aria-hidden="true"></span><span class="tech-glow-card__shine" aria-hidden="true"></span>
    <span class="tech-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="tech-glow-card__title">${esc(title)}</h3>
    ${desc ? `<p class="tech-glow-card__desc">${esc(desc)}</p>` : ''}${list}
  </article>`;
}

function techHubCard(tech, delay = 0) {
  const iconCls = tech.icon.includes(' ') ? tech.icon : `fab ${tech.icon}`;
  const cases = tech.useCases?.length
    ? `<ul class="tech-hub-card__cases">${tech.useCases.map((c) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(c)}</li>`).join('')}</ul>`
    : '';
  const tags = tech.tags?.length
    ? `<div class="tech-hub-card__tags">${tech.tags.map((t) => `<span class="tech-hub-card__tag">${esc(t)}</span>`).join('')}</div>`
    : '';
  return `<article class="tech-hub-card" data-tech-hub-card data-tech-hub-cat="${esc(tech.cat)}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="tech-hub-card__glow" aria-hidden="true"></span>
    <header class="tech-hub-card__head">
      <span class="tech-hub-card__icon"><i class="${iconCls}" aria-hidden="true"></i></span>
      <div class="tech-hub-card__head-text">
        <span class="tech-hub-card__type">${esc(tech.type)}</span>
        <h3 class="tech-hub-card__title">${esc(tech.title)}</h3>
      </div>
    </header>
    <p class="tech-hub-card__desc">${esc(tech.desc)}</p>
    ${cases ? `<div class="tech-hub-card__cases-wrap"><span class="tech-hub-card__cases-label">Best use cases</span>${cases}</div>` : ''}
    ${tags}
  </article>`;
}

function renderTechHub({ filters, items, footnote }) {
  return `<div class="tech-stack-hub" data-tech-hub>
    <div class="tech-stack-hub__filters" role="tablist" aria-label="Filter technologies" data-aos="fade-up" data-aos-delay="120">
      ${filters.map((f) =>
        `<button type="button" class="tech-stack-hub__filter${f.id === 'all' ? ' is-active' : ''}" data-tech-hub-filter="${f.id}" role="tab" aria-selected="${f.id === 'all' ? 'true' : 'false'}">${esc(f.label)}</button>`
      ).join('')}
    </div>
    <div class="tech-stack-hub__grid" role="tabpanel">${items.map((t, i) => techHubCard(t, Math.min(i * 35, 420))).join('')}</div>
    ${footnote ? `<p class="tech-stack-hub__footnote" data-aos="fade-up"><i class="fas fa-circle-info" aria-hidden="true"></i> ${footnote}</p>` : ''}
  </div>`;
}

function techPillGrid(items, delayBase = 0) {
  return `<div class="tech-pill-grid">${items.map(([icon, name], i) =>
    `<div class="tech-pill" data-aos="fade-up" data-aos-delay="${Math.min(delayBase + i * 20, 400)}"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i><span>${esc(name)}</span></div>`
  ).join('')}</div>`;
}

function industryStackCard(stack, delay = 0) {
  const layers = stack.layers.map((layer) =>
    `<div class="tech-industry-stack__layer">
      <span class="tech-industry-stack__layer-label">${esc(layer.label)}</span>
      <div class="tech-industry-stack__tags">${layer.items.map((item) => `<span class="tech-industry-stack__tag">${esc(item)}</span>`).join('')}</div>
    </div>`
  ).join('');
  return `<article class="tech-industry-stack" data-tech-industry-card data-tech-industry-cat="${esc(stack.cat)}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="tech-industry-stack__glow" aria-hidden="true"></span>
    <header class="tech-industry-stack__head">
      <span class="tech-industry-stack__icon"><i class="fas ${stack.icon}" aria-hidden="true"></i></span>
      <div class="tech-industry-stack__head-text">
        <h3 class="tech-industry-stack__title">${esc(stack.name)}</h3>
        <p class="tech-industry-stack__use">${esc(stack.useCase)}</p>
      </div>
    </header>
    <p class="tech-industry-stack__desc">${esc(stack.desc)}</p>
    <div class="tech-industry-stack__layers">${layers}</div>
  </article>`;
}

function comparisonCard({ title, left, right }, delay = 0) {
  const col = (side) => `<div class="tech-compare-card__col">
    <h4 class="tech-compare-card__col-title">${esc(side.name)}</h4>
    <ul class="tech-compare-card__list">${side.points.map((p) => `<li><i class="fas fa-circle" aria-hidden="true"></i>${esc(p)}</li>`).join('')}</ul>
  </div>`;
  return `<article class="tech-compare-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="tech-compare-card__glow" aria-hidden="true"></span>
    <h3 class="tech-compare-card__title">${esc(title)}</h3>
    <div class="tech-compare-card__cols">${col(left)}<span class="tech-compare-card__vs" aria-hidden="true">VS</span>${col(right)}</div>
  </article>`;
}

function sectionHead({ badge, badgeIcon, title, lead, light = false, id }) {
  const lightClass = light ? ' tech-title--light' : '';
  const leadClass = light ? ' tech-lead--light' : '';
  return `<header class="tech-section-head" data-aos="fade-up">
    <span class="tech-badge${light ? '' : ' tech-badge--navy'}"><i class="${badgeIcon}" aria-hidden="true"></i> ${esc(badge)}</span>
    <h2 id="${id}-heading" class="tech-title${lightClass}">${title}</h2>
    ${lead ? `<p class="tech-lead${leadClass}">${esc(lead)}</p>` : ''}
  </header>`;
}

function techSection({ id, gray = false, inner }) {
  const mod = gray ? ' tech-section--gray' : ' tech-section--white';
  return `<section id="${id}" class="tech-section${mod}" aria-labelledby="${id}-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">${inner}</div>
  </section>`;
}

function renderTechnologyHero() {
  const orbitChips = HERO_FLOAT_CHIPS.map(([icon, name], i) =>
    `<span class="tech-hero-v2__orbit-chip" style="--orbit-i:${i}" title="${esc(name)}">
      <i class="${icon.includes(' ') ? icon : `fab ${icon}`}" aria-hidden="true"></i><span>${esc(name)}</span>
    </span>`
  ).join('');

  const valuePills = `<div class="slp-value-pills" data-aos="fade-up" data-aos-delay="240" aria-label="Enterprise technology focus">
    ${HERO_VALUE_PILLS.map(([icon, label]) =>
      `<span class="slp-value-pill"><i class="fas ${icon}" aria-hidden="true"></i> ${esc(label)}</span>`
    ).join('')}
  </div>`;

  const iconGroups = HERO_ICON_GROUPS.map((g, gi) =>
    `<div class="tech-hero-v2__icon-group" data-aos="fade-up" data-aos-delay="${200 + gi * 40}">
      <span class="tech-hero-v2__icon-group-label">${esc(g.label)}</span>
      <div class="tech-hero-v2__icon-row">${g.items.map(([icon, name]) =>
        `<button type="button" class="tech-hero-v2__icon-btn" aria-label="${esc(name)}">
          <i class="${icon.includes(' ') ? icon : `fab ${icon}`}" aria-hidden="true"></i>
          <span class="tech-hero-v2__icon-tooltip" role="tooltip">${esc(name)}</span>
        </button>`
      ).join('')}</div>
    </div>`
  ).join('');

  return `<section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split tech-hero-v2" aria-labelledby="tech-hero-heading" data-svc-hero data-tech-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>
      <div class="tech-hero-v2__motion" aria-hidden="true">
        <span class="tech-hero-v2__float tech-hero-v2__float--bracket">{ }</span>
        <span class="tech-hero-v2__float tech-hero-v2__float--binary">10110</span>
        <span class="tech-hero-v2__float tech-hero-v2__float--node"><i class="fas fa-circle-nodes"></i></span>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">
          <div class="relative order-2 lg:order-1" data-hero-parallax="0.05" data-aos="fade-right" data-aos-duration="800" data-tech-hero-visual>
            <div class="hero-visual-panel tech-hero-v2__panel">
              <div class="hero-visual-panel__glow" aria-hidden="true"></div>
              <div class="hero-visual-panel__ring" aria-hidden="true"></div>
              <div class="hero-visual-panel__frame">
                <img src="${IMG.hero}" alt="Global technology network with cloud infrastructure, AI, developers, and digital connectivity" width="640" height="800" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
              </div>
              <div class="tech-hero-v2__orbit" aria-hidden="true">${orbitChips}</div>
            </div>
            <div class="tech-hero-v2__ecosystem" aria-label="Technology categories">${iconGroups}</div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-6" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">Technology Stack</span>
            </nav>
            <div class="tech-hero-v2__badge" data-aos="fade-up" data-aos-delay="40">
              <span class="tech-hero-v2__badge-pulse" aria-hidden="true"></span>
              <i class="fas fa-microchip" aria-hidden="true"></i>
              <span>Enterprise Technology Stack</span>
            </div>
            <h1 id="tech-hero-heading" class="tech-hero-v2__title font-display hero-title" data-aos="fade-up" data-aos-delay="80">
              Building the Future with <span class="tech-hero-v2__title-grad">Modern Technologies</span>
            </h1>
            <p class="tech-hero-v2__highlights" data-aos="fade-up" data-aos-delay="120" aria-label="Key focus areas">
              <span>Scalable Solutions</span><span class="tech-hero-v2__highlights-sep" aria-hidden="true">·</span><span>Enterprise Innovation</span>
            </p>
            <p class="tech-hero-v2__lead" data-aos="fade-up" data-aos-delay="160">${esc(HERO_SUBTITLE)}</p>
            <div class="tech-hero-v2__actions" data-aos="fade-up" data-aos-delay="200">
              <a href="#tech-frontend" class="tech-hero-v2__btn tech-hero-v2__btn--primary magnetic">
                <span>Explore Our Technology Stack</span>
                <i class="fas fa-arrow-right tech-hero-v2__btn-arrow" aria-hidden="true"></i>
              </a>
              <a href="#tech-contact" class="tech-hero-v2__btn tech-hero-v2__btn--secondary">
                <span>Start Your Project</span>
              </a>
            </div>
            ${valuePills}
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;
}

export function renderTechnologyMain() {
  const hero = renderTechnologyHero();

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">
    <a href="#tech-philosophy" class="slp-sticky-nav__link" data-svc-nav-link>Philosophy</a>
    <a href="#tech-frontend" class="slp-sticky-nav__link" data-svc-nav-link>Frontend</a>
    <a href="#tech-backend" class="slp-sticky-nav__link" data-svc-nav-link>Backend</a>
    <a href="#tech-mobile" class="slp-sticky-nav__link" data-svc-nav-link>Mobile</a>
    <a href="#tech-ai" class="slp-sticky-nav__link" data-svc-nav-link>AI &amp; Emerging</a>
    <a href="#tech-database" class="slp-sticky-nav__link" data-svc-nav-link>Database</a>
    <a href="#tech-cloud" class="slp-sticky-nav__link" data-svc-nav-link>Cloud</a>
    <a href="#tech-devops" class="slp-sticky-nav__link" data-svc-nav-link>DevOps</a>
    <a href="#tech-industry-matrix" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
    <a href="#tech-comparison" class="slp-sticky-nav__link" data-svc-nav-link>Compare</a>
    <a href="#tech-roadmap" class="slp-sticky-nav__link" data-svc-nav-link>Roadmap</a>
    <a href="#tech-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
  </div></nav>`;

  const philosophySection = parallax({
    id: 'tech-philosophy',
    bg: IMG.philosophy,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-philosophy', badge: 'Philosophy', badgeIcon: 'fas fa-lightbulb', title: 'Technology <span class="tech-accent">Philosophy</span>', lead: 'We choose technologies based on business outcomes — not trends. Every stack decision balances performance, security, scalability, and long-term maintainability.' })}
      <div class="tech-philosophy-grid">${PHILOSOPHY_PILLARS.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: Math.min(i * 45, 270) })
      ).join('')}</div>
    </div>`,
  });

  const frontendSection = parallax({
    id: 'tech-frontend',
    bg: IMG.frontend,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-frontend', badge: 'Enterprise Hub', badgeIcon: 'fab fa-react', title: 'Frontend <span class="tech-accent">Technologies</span>', lead: 'The definitive reference for every frontend language, framework, UI library, and build tool we use — from semantic HTML to production-grade React and Next.js applications.' })}
      ${renderTechHub({
        filters: FRONTEND_FILTERS,
        items: FRONTEND_TECH,
        footnote: 'All frontend stacks are chosen for accessibility, SEO, performance, and long-term maintainability. Service pages link here for complete technology details.',
      })}
    </div>`,
  });

  const backendSection = parallax({
    id: 'tech-backend',
    bg: IMG.backend,
    speed: '0.28',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-backend', badge: 'Enterprise Hub', badgeIcon: 'fas fa-server', title: 'Backend <span class="tech-accent">Technologies</span>', lead: 'The single source of truth for server-side languages, enterprise frameworks, API layers, and runtime infrastructure powering secure, scalable business logic.' })}
      ${renderTechHub({
        filters: BACKEND_FILTERS,
        items: BACKEND_TECH,
        footnote: 'Backend architectures are tailored per project — from Laravel and Node.js APIs to ASP.NET Core and Spring Boot enterprise systems.',
      })}
    </div>`,
  });

  const mobileSection = techSection({
    id: 'tech-mobile',
    inner: `
      ${sectionHead({ id: 'tech-mobile', badge: 'Mobile', badgeIcon: 'fas fa-mobile-screen', title: 'Mobile <span class="tech-accent">Technologies</span>', lead: 'Native and cross-platform mobile development for iOS, Android, and hybrid experiences.' })}
      ${techPillGrid(MOBILE_TECH)}
    `,
  });

  const aiSection = parallax({
    id: 'tech-ai',
    bg: AI_IMG,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-ai', badge: 'Enterprise Hub', badgeIcon: 'fas fa-robot', title: 'AI &amp; Emerging <span class="tech-accent">Technologies</span>', lead: 'The single source of truth for LLMs, agents, machine learning, computer vision, RAG, vector databases, and enterprise AI platforms — mapped to our AI service practices.' })}
      ${renderTechHub({
        filters: AI_FILTERS,
        items: AI_EMERGING_TECH,
        footnote: 'All AI service pages link here for technology details. Stacks are tailored per engagement — explore our AI services below or contact us for an architecture review.',
      })}
      ${renderAiServiceDirectory({ linkPrefix: 'services/' })}
    </div>`,
  });

  const databaseSection = techSection({
    id: 'tech-database',
    inner: `
      ${sectionHead({ id: 'tech-database', badge: 'Database', badgeIcon: 'fas fa-database', title: 'Database <span class="tech-accent">Technologies</span>', lead: 'Relational, document, cache, and search databases selected for your data model and scale requirements.' })}
      ${techPillGrid(DATABASE_TECH)}
    `,
  });

  const cloudSection = techSection({
    id: 'tech-cloud',
    gray: true,
    inner: `
      ${sectionHead({ id: 'tech-cloud', badge: 'Cloud', badgeIcon: 'fas fa-cloud', title: 'Cloud <span class="tech-accent">Platforms</span>', lead: 'Deploy on leading cloud providers and edge platforms with auto-scaling, CDN, and global availability.' })}
      ${techPillGrid(CLOUD_TECH)}
    `,
  });

  const devopsSection = techSection({
    id: 'tech-devops',
    inner: `
      ${sectionHead({ id: 'tech-devops', badge: 'DevOps', badgeIcon: 'fas fa-dharmachakra', title: 'DevOps &amp; <span class="tech-accent">Infrastructure</span>', lead: 'Containerization, CI/CD, infrastructure as code, and observability for reliable production delivery.' })}
      ${techPillGrid(DEVOPS_TECH)}
    `,
  });

  const apiSection = techSection({
    id: 'tech-api',
    gray: true,
    inner: `
      ${sectionHead({ id: 'tech-api', badge: 'APIs', badgeIcon: 'fas fa-plug', title: 'API <span class="tech-accent">Technologies</span>', lead: 'REST, GraphQL, WebSockets, and third-party integrations connecting your digital ecosystem.' })}
      ${techPillGrid(API_TECH)}
    `,
  });

  const securitySection = techSection({
    id: 'tech-security',
    inner: `
      ${sectionHead({ id: 'tech-security', badge: 'Security', badgeIcon: 'fas fa-shield-halved', title: 'Cyber <span class="tech-accent">Security</span>', lead: 'Enterprise-grade security technologies protecting applications, data, and infrastructure at every layer.' })}
      ${techPillGrid(SECURITY_TECH)}
    `,
  });

  const uiuxSection = techSection({
    id: 'tech-uiux',
    gray: true,
    inner: `
      ${sectionHead({ id: 'tech-uiux', badge: 'UI/UX', badgeIcon: 'fab fa-figma', title: 'UI/UX Design <span class="tech-accent">Tools</span>', lead: 'Industry-standard design and prototyping tools for pixel-perfect, user-centered digital experiences.' })}
      ${techPillGrid(UIUX_TECH)}
    `,
  });

  const cmsSection = techSection({
    id: 'tech-cms',
    inner: `
      ${sectionHead({ id: 'tech-cms', badge: 'CMS', badgeIcon: 'fab fa-wordpress', title: 'CMS <span class="tech-accent">Platforms</span>', lead: 'Traditional and headless content management systems for flexible publishing workflows.' })}
      ${techPillGrid(CMS_TECH)}
    `,
  });

  const toolsSection = techSection({
    id: 'tech-tools',
    gray: true,
    inner: `
      ${sectionHead({ id: 'tech-tools', badge: 'Tools', badgeIcon: 'fas fa-code', title: 'Development <span class="tech-accent">Tools</span>', lead: 'IDEs, version control, testing, and package management tools powering our engineering workflow.' })}
      ${techPillGrid(TOOLS_TECH)}
    `,
  });

  const industryMatrixSection = parallax({
    id: 'tech-industry-matrix',
    bg: IMG.industry,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-industry-matrix', badge: 'Enterprise Hub', badgeIcon: 'fas fa-industry', title: 'Industries &amp; Technology <span class="tech-accent">Mapping</span>', lead: 'The single source of truth for every technology, framework, and platform we deploy — mapped to industry requirements, compliance standards, and business outcomes across 16 verticals.' })}
      <div class="tech-industry-hub" data-tech-industry-hub>
        <div class="tech-industry-hub__filters" role="tablist" aria-label="Filter industries by sector" data-aos="fade-up" data-aos-delay="80">
          ${INDUSTRY_FILTERS.map((f) =>
            `<button type="button" class="tech-industry-hub__filter${f.id === 'all' ? ' is-active' : ''}" data-tech-industry-filter="${f.id}" role="tab" aria-selected="${f.id === 'all' ? 'true' : 'false'}">${esc(f.label)}</button>`
          ).join('')}
        </div>
        <div class="tech-industry-hub__grid" role="tabpanel">
          ${INDUSTRY_STACKS.map((stack, i) => industryStackCard(stack, Math.min(i * 40, 400))).join('')}
        </div>
        <p class="tech-industry-hub__footnote" data-aos="fade-up"><i class="fas fa-circle-info" aria-hidden="true"></i> All service pages link here for technology details. Stacks are tailored per engagement — contact us for a custom architecture review.</p>
      </div>
    </div>`,
  });

  const comparisonSection = parallax({
    id: 'tech-comparison',
    bg: IMG.comparison,
    speed: '0.28',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${sectionHead({ id: 'tech-comparison', badge: 'Compare', badgeIcon: 'fas fa-scale-balanced', title: 'Technology <span class="tech-accent">Comparison</span>', lead: 'Understand the trade-offs between popular technology choices to make informed decisions for your project.', light: true })}
      <div class="tech-compare-grid">${COMPARISONS.map((c, i) => comparisonCard(c, Math.min(i * 50, 300))).join('')}</div>
    </div>`,
  });

  const whySection = techSection({
    id: 'tech-why',
    inner: `
      ${sectionHead({ id: 'tech-why', badge: 'Why These Technologies', badgeIcon: 'fas fa-award', title: 'Why We Choose These <span class="tech-accent">Technologies</span>', lead: 'Every technology in our stack is evaluated against rigorous criteria for production-grade digital products.' })}
      <div class="tech-feature-grid">${WHY_TECH.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: Math.min(i * 40, 320) })
      ).join('')}</div>
    `,
  });

  const roadmapSection = renderDevProcessSection({
    id: 'tech-roadmap',
    badge: 'Roadmap',
    title: 'Technology Roadmap',
    subtitle: 'A nine-phase delivery workflow from planning and architecture through deployment, monitoring, optimization, and ongoing support.',
    steps: ROADMAP_STEPS,
    linkPrefix: '',
    aos: true,
    metrics: [
      { value: '9', label: 'Phases' },
      { value: '100+', label: 'Technologies' },
      { value: '24/7', label: 'Support Options' },
    ],
  });

  const certificationsSection = techSection({
    id: 'tech-certifications',
    gray: true,
    inner: `
      ${sectionHead({ id: 'tech-certifications', badge: 'Standards', badgeIcon: 'fas fa-certificate', title: 'Certifications &amp; <span class="tech-accent">Standards</span>', lead: 'We align with international security, accessibility, and compliance standards across every engagement.' })}
      <div class="tech-cert-grid">${CERTIFICATIONS.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: Math.min(i * 40, 360) })
      ).join('')}</div>
    `,
  });

  const faqSection = renderEnterpriseFaqSection({
    id: 'tech-faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Answers about our technology choices, AI integration, database selection, cloud hosting, and security practices.',
    faqs: FAQ,
    contactHref: '#tech-contact',
    contactPageHref: 'contact.html',
    sectionClass: 'tech-faq-section',
  });

  const ctaParallax = parallax({
    id: 'tech-cta',
    bg: IMG.cta,
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      ${sectionHead({ id: 'tech-cta', badge: 'Get Started', badgeIcon: 'fas fa-rocket', title: 'Ready to Build with Modern <span class="tech-accent">Technologies?</span>', lead: 'Build future-ready software powered by industry-leading technologies, scalable cloud infrastructure, AI innovation, and enterprise-grade architecture. Let our experts help you select the right technology stack for your next project.', light: true })}
      <div class="tech-cta-row" data-aos="fade-up" data-aos-delay="100">
        <a href="#tech-contact" class="tech-btn tech-btn--primary">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="contact.html" class="tech-btn tech-btn--ghost">Book Free Consultation</a>
      </div>
    </div>`,
  });

  const contactSection = `<section id="tech-contact" class="cpox-section cpox-section--gray cpox-contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="cpox-contact-grid">
        <div class="cpox-contact__copy" data-aos="fade-right">
          <span class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></span>
          <h2 class="cpox-title font-display">Start Your Technology Project</h2>
          <p class="cpox-lead">Tell us about your goals, industry, and timeline — we'll respond within one business day with a tailored technology recommendation and project plan.</p>
        </div>
        <form class="cpox-contact-form slp-form" data-slp-form action="#" method="post" data-aos="fade-left">
          <div data-slp-field>
            <label for="tech-name">Full Name <span class="text-red-500">*</span></label>
            <input type="text" id="tech-name" name="name" class="slp-form-input" required placeholder="Your full name" autocomplete="name">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="tech-email">Work Email <span class="text-red-500">*</span></label>
            <input type="email" id="tech-email" name="email" class="slp-form-input" required placeholder="you@company.com" autocomplete="email">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="tech-message">Project Requirements <span class="text-red-500">*</span></label>
            <textarea id="tech-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your project, preferred technologies, integrations, and timeline..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  return `
    ${hero}
    ${stickyNav}
    ${philosophySection}
    ${frontendSection}
    ${backendSection}
    ${mobileSection}
    ${aiSection}
    ${databaseSection}
    ${cloudSection}
    ${devopsSection}
    ${apiSection}
    ${securitySection}
    ${uiuxSection}
    ${cmsSection}
    ${toolsSection}
    ${industryMatrixSection}
    ${comparisonSection}
    ${whySection}
    ${roadmapSection}
    ${certificationsSection}
    ${ctaParallax}
    ${contactSection}
  `;
}

export function renderTechnologyFaqsJsonLd() {
  return [];
}

export const TECH_OG_IMAGE = IMG.hero;
