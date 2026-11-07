/**
 * Guudle — Enterprise Mega Menu Renderers
 */
(function () {
  const FA = {
    brain: 'fa-brain', sparkles: 'fa-wand-magic-sparkles', robot: 'fa-robot', bolt: 'fa-bolt',
    chat: 'fa-comments', chart: 'fa-chart-line', eye: 'fa-eye', cogs: 'fa-gears',
    briefcase: 'fa-briefcase', plug: 'fa-plug', building: 'fa-building', layers: 'fa-layer-group',
    code: 'fa-code', database: 'fa-database', globe: 'fa-globe', mobile: 'fa-mobile-screen',
    android: 'fa-android', apple: 'fa-apple', saas: 'fa-cloud', rocket: 'fa-rocket',
    search: 'fa-magnifying-glass', palette: 'fa-palette', window: 'fa-window-maximize',
    shield: 'fa-shield-halved', server: 'fa-server', tools: 'fa-screwdriver-wrench',
    erp: 'fa-sitemap', users: 'fa-users', refresh: 'fa-arrows-rotate', cloud: 'fa-cloud',
    workflow: 'fa-diagram-project', 'chart-bar': 'fa-chart-bar', link: 'fa-link', bag: 'fa-bag-shopping',
    cube: 'fa-cube', cart: 'fa-cart-shopping', store: 'fa-store', heartbeat: 'fa-heart-pulse',
    bank: 'fa-building-columns', home: 'fa-house', education: 'fa-graduation-cap', truck: 'fa-truck',
    plane: 'fa-plane', food: 'fa-utensils', game: 'fa-gamepad', sport: 'fa-futbol',
    car: 'fa-car', signal: 'fa-signal', factory: 'fa-industry', award: 'fa-award',
    star: 'fa-star', handshake: 'fa-handshake', document: 'fa-file-lines', folder: 'fa-folder-open',
    book: 'fa-book', help: 'fa-circle-question', video: 'fa-video',
    megaphone: 'fa-bullhorn', envelope: 'fa-envelope', list: 'fa-list',
    clock: 'fa-clock', invoice: 'fa-file-invoice-dollar',
  };

  function renderStandardTabContent(base, sec) {
    return `
      <div class="mega-services-grid">
        <div class="mega-links-col">
          <h4 class="mega-section-title">${sec.label}</h4>
          <ul class="mega-links-list mega-links-list--cols">
            ${sec.links.map((link) => `
              <li><a href="${base}${link.href}" class="mega-link-item mega-link-item--rich">
                <span class="mega-link-icon">${faIcon(link.icon)}</span>
                <span>${link.name}</span>
              </a></li>
            `).join('')}
          </ul>
        </div>
        <aside class="mega-featured-cta">
          <div class="mega-cta-card">
            <div class="mega-cta-card-glow"></div>
            <p class="mega-cta-eyebrow">Featured</p>
            <h5 class="mega-cta-title">${sec.cta.title}</h5>
            <p class="mega-cta-desc">${sec.cta.desc}</p>
            <a href="${base}${sec.cta.href}" class="mega-cta-card-btn">${sec.cta.btn} <i class="fas fa-arrow-right"></i></a>
          </div>
        </aside>
      </div>`;
  }

  function faIcon(name, cls = 'text-sm') {
    const ic = FA[name] || FA.code;
    return `<i class="fas ${ic} ${cls}" aria-hidden="true"></i>`;
  }

  function megaFooter(base) {
    const data = window.GuudleMegaMenu;
    return `
      <div class="mega-footer">
        <div class="mega-trust">
          ${(data?.trust || []).map((t) => `
            <span class="mega-trust-item"><i class="fas fa-${t.icon === 'shield' ? 'shield-halved' : t.icon === 'award' ? 'award' : t.icon === 'globe' ? 'globe' : 'rocket'}"></i>${t.text}</span>
          `).join('')}
        </div>
        <div class="mega-footer-ctas">
          <a href="${base}pages/contact.html" class="mega-cta-secondary">Get Free Estimate</a>
          <a href="${base}pages/contact.html" class="mega-cta-primary">Book Consultation <i class="fas fa-arrow-right ml-2"></i></a>
        </div>
      </div>`;
  }

  function renderServicesMega(base) {
    const { services } = window.GuudleMegaMenu;
    const sections = services.sections;
    const defaultId = sections.find((s) => s.default)?.id || sections[0].id;

    return `
      <li class="relative group mega-menu-item mega-menu-item--wide list-none">
        <button type="button" class="mega-trigger nav-link flex items-center gap-1 cursor-pointer bg-transparent border-0" aria-haspopup="true" data-nav-section="services">
          ${faIcon('briefcase', 'text-xs opacity-70')}
          <span>Services</span>
          <span class="nav-plus-indicator" aria-hidden="true">+</span>
        </button>
        <div class="sub_menu mega-panel mega-panel--services">
          <div class="mega-services-layout">
            <nav class="mega-services-sidebar" aria-label="Service categories">
              ${sections.map((sec) => `
                <button type="button" class="mega-sidebar-btn ${sec.id === defaultId ? 'active' : ''}" data-tab="${sec.id}">
                  <span class="mega-sidebar-icon">${faIcon(sec.icon)}</span>
                  <span class="mega-sidebar-label">${sec.label}</span>
                  <i class="fas fa-chevron-right mega-sidebar-arrow"></i>
                </button>
              `).join('')}
            </nav>
            <div class="mega-services-content">
              ${sections.map((sec) => `
                <div class="mega-tab-content ${sec.id === defaultId ? 'active' : ''}" data-content="${sec.id}">
                  ${renderStandardTabContent(base, sec)}
                </div>
              `).join('')}
            </div>
          </div>
          ${megaFooter(base)}
        </div>
      </li>`;
  }

  function renderIndustriesMega(base) {
    const { industries } = window.GuudleMegaMenu;
    return `
      <li class="relative group mega-menu-item list-none">
        <a href="${base}pages/industries.html" class="mega-trigger nav-link flex items-center gap-1 cursor-pointer bg-transparent border-0" aria-haspopup="true" data-nav-section="industries" data-nav-match="industries">
          ${faIcon('building', 'text-xs opacity-70')}
          <span>Industries</span>
          <span class="nav-plus-indicator" aria-hidden="true">+</span>
        </a>
        <div class="sub_menu mega-panel mega-panel--industries">
          <div class="mega-panel-header">
            <h3 class="mega-panel-heading">Industries We Serve</h3>
            <p class="mega-panel-sub">Domain expertise across regulated and high-growth sectors</p>
          </div>
          <div class="mega-industry-grid">
            ${industries.items.map((item) => `
              <a href="${base}${item.href}" class="mega-industry-card">
                <span class="mega-industry-icon">${faIcon(item.icon)}</span>
                <span class="mega-industry-body">
                  <strong>${item.name}</strong>
                  <small>${item.desc}</small>
                </span>
                <i class="fas fa-arrow-right mega-industry-arrow"></i>
              </a>
            `).join('')}
          </div>
          <div class="mega-panel-footer-row">
            <a href="${base}pages/industries.html" class="mega-text-link">View all industries <i class="fas fa-arrow-right"></i></a>
          </div>
          ${megaFooter(base)}
        </div>
      </li>`;
  }

  function renderSolutionsMega(base) {
    const { solutions } = window.GuudleMegaMenu;
    return `
      <li class="relative group mega-menu-item list-none">
        <button type="button" class="mega-trigger nav-link flex items-center gap-1 cursor-pointer bg-transparent border-0" aria-haspopup="true" data-nav-section="solutions">
          ${faIcon('layers', 'text-xs opacity-70')}
          <span>Solutions</span>
          <span class="nav-plus-indicator" aria-hidden="true">+</span>
        </button>
        <div class="sub_menu mega-panel mega-panel--solutions">
          <div class="mega-panel-header">
            <h3 class="mega-panel-heading"><a href="${base}${solutions.hub?.href || 'pages/services/business-outcomes-digital-platforms.html'}" class="hover:text-primary transition-colors">Business Outcomes</a></h3>
            <p class="mega-panel-sub">Platforms engineered for measurable results</p>
          </div>
          <div class="mega-solution-grid">
            ${solutions.items.map((item) => `
              <a href="${base}${item.href}" class="mega-solution-card">
                <span class="mega-solution-icon">${faIcon(item.icon)}</span>
                <span class="mega-solution-body">
                  <strong>${item.name}</strong>
                  <small>${item.desc}</small>
                </span>
              </a>
            `).join('')}
          </div>
          ${solutions.hub ? `
          <div class="mega-panel-footer-row">
            <a href="${base}${solutions.hub.href}" class="mega-text-link">${solutions.hub.btn} <i class="fas fa-arrow-right"></i></a>
          </div>` : ''}
          ${megaFooter(base)}
        </div>
      </li>`;
  }

  function renderTechnologiesMega(base) {
    return '';
  }

  function renderPortfolioLink(base) {
    const { portfolio } = window.GuudleMegaMenu;
    return `
      <li class="list-none">
        <a href="${base}${portfolio.href}" class="nav-link flex items-center gap-1" data-nav-match="our-work" data-nav-section="portfolio">
          ${faIcon('folder', 'text-xs opacity-70')}
          <span>Our Work</span>
        </a>
      </li>`;
  }

  function renderSimpleDropdown(base, config) {
    const items = config.items;
    const navSection = config.navSection || '';
    return `
      <li class="relative group mega-menu-item list-none">
        <button type="button" class="mega-trigger nav-link flex items-center gap-1 cursor-pointer bg-transparent border-0" aria-haspopup="true"${navSection ? ` data-nav-section="${navSection}"` : ''}>
          ${faIcon(config.icon || 'briefcase', 'text-xs opacity-70')}
          <span>${config.label}</span>
          <span class="nav-plus-indicator" aria-hidden="true">+</span>
        </button>
        <div class="sub_menu mega-panel mega-panel--simple">
          <div class="mega-simple-grid">
            ${items.map((item) => `
              <a href="${base}${item.href}" class="mega-simple-link">
                <span class="mega-simple-icon">${faIcon(item.icon)}</span>
                <span>${item.name}</span>
              </a>
            `).join('')}
          </div>
          ${megaFooter(base)}
        </div>
      </li>`;
  }

  function renderPlatformMega(base) {
    const platform = window.GuudleMegaMenu.platform;
    if (!platform) return '';
    return `
      <li class="relative group mega-menu-item mega-menu-item--wide list-none">
        <button type="button" class="mega-trigger nav-link flex items-center gap-1 cursor-pointer bg-transparent border-0" aria-haspopup="true" data-nav-section="platform">
          ${faIcon('layers', 'text-xs opacity-70')}
          <span>Platform</span>
          <span class="nav-plus-indicator" aria-hidden="true">+</span>
        </button>
        <div class="sub_menu mega-panel mega-panel--platform">
          <div class="mega-platform-layout">
            <aside class="mega-platform-intro">
              <p class="mega-cta-eyebrow">GUUDLE SaaS</p>
              <h3 class="mega-platform-title">${platform.tagline}</h3>
              <p class="mega-platform-desc">${platform.support}</p>
              <div class="mega-platform-actions">
                <a href="${base}${platform.href}" class="mega-cta-primary">Explore Platform <i class="fas fa-arrow-right ml-2"></i></a>
                <a href="${base}pages/saas/pricing.html" class="mega-cta-secondary">View Pricing</a>
              </div>
              <div class="mega-platform-experiences">
                ${(platform.experiences || []).map((ex) => `
                  <a href="${base}${ex.href}" class="mega-platform-exp">
                    <span class="mega-simple-icon">${faIcon(ex.icon)}</span>
                    <span><strong>${ex.name}</strong><small>${ex.desc}</small></span>
                  </a>
                `).join('')}
              </div>
            </aside>
            <div class="mega-platform-modules">
              <h4 class="mega-section-title">Connected modules</h4>
              <div class="mega-platform-grid">
                ${platform.modules.map((item) => `
                  <a href="${base}${item.href}" class="mega-solution-card">
                    <span class="mega-solution-icon">${faIcon(item.icon)}</span>
                    <span class="mega-solution-body">
                      <strong>${item.name}</strong>
                      <small>${item.desc}</small>
                    </span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
          ${megaFooter(base)}
        </div>
      </li>`;
  }

  function renderAllMegaMenus(base) {
    if (!window.GuudleMegaMenu) return '';
    const { company } = window.GuudleMegaMenu;
    return [
      renderServicesMega(base),
      renderSolutionsMega(base),
      renderPortfolioLink(base),
      `<li class="list-none"><a href="${base}pages/saas/pricing.html" class="nav-link flex items-center gap-1" data-nav-section="pricing"><span>Pricing</span></a></li>`,
      renderSimpleDropdown(base, { ...company, icon: 'building', navSection: 'company' }),
    ].join('');
  }

  function getMobileNavGroups() {
    const d = window.GuudleMegaMenu;
    if (!d) return [];
    const groups = d.services.sections
      .filter((s) => s.links?.length)
      .map((s) => ({
        title: `Services — ${s.label}`,
        items: s.links.map((l) => ({ name: l.name, href: l.href })),
      }));
    groups.unshift({
      title: 'GUUDLE Business Platform',
      items: [
        { name: 'Platform Overview', href: 'pages/saas/index.html' },
        ...(d.platform?.modules || []).map((l) => ({ name: l.name, href: l.href })),
        { name: 'Pricing', href: 'pages/saas/pricing.html' },
        { name: 'Sign In', href: 'pages/saas/login.html' },
        { name: 'Start Free Trial', href: 'pages/saas/register.html' },
        { name: 'Super Admin Dashboard', href: 'dashboards/admin/index.html' },
        { name: 'Client Workspace', href: 'dashboards/client/index.html' },
      ],
    });
    groups.push(
      { title: 'Industries', items: [{ name: 'All industries', href: 'pages/industries.html' }, ...d.industries.items.map((l) => ({ name: l.name, href: l.href }))] },
      { title: 'Solutions', items: d.solutions.items.map((l) => ({ name: l.name, href: l.href })) },
      { title: 'Company', items: d.company.items.map((l) => ({ name: l.name, href: l.href })) },
    );
    return groups;
  }

  window.GuudleMegaMenuRender = {
    renderAllMegaMenus,
    getMobileNavGroups,
    faIcon,
  };
})();
