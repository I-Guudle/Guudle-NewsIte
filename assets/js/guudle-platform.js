(function () {
  const data = window.GuudlePlatform;
  if (!data) return;

  const intentNote = document.getElementById("gbp-plan-intent");
  if (intentNote) {
    const params = new URLSearchParams(window.location.search);
    const names = { starter: "Starter", growth: "Growth", enterprise: "Enterprise" };
    const plan = names[params.get("plan") || ""];
    if (plan) {
      const interval = params.get("interval") === "annual" ? "yearly" : "monthly";
      const verb = params.get("intent") === "subscribe" ? "subscribe to" : "start a 7-day trial of";
      intentNote.hidden = false;
      intentNote.textContent = `You chose to ${verb} the ${plan} plan, billed ${interval}. This form creates a workspace and does not charge a card.`;
    }
  }

  function basePath() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const idx = segments.indexOf('pages');
    if (idx === -1) return '';
    return '../'.repeat(segments.length - idx - 1);
  }

  const base = basePath();
  const current = window.location.pathname.replace(/\\/g, '/');

  function href(path) {
    return `${base}${path}`;
  }

  function isActive(path) {
    return current.endsWith(path.replace(/^pages\//, '')) || current.includes(`/${path}`);
  }

  const nav = document.querySelector('[data-gbp-subnav]');
  if (nav) {
    const links = [
      { name: 'Overview', href: data.paths.home },
      ...data.modules.map((m) => ({ name: m.name, href: m.href })),
      { name: 'Pricing', href: data.paths.pricing },
      { name: 'Support', href: data.paths.support },
    ];
    nav.innerHTML = links.map((l) =>
      `<a href="${href(l.href)}" class="${isActive(l.href) ? 'is-active' : ''}">${l.name}</a>`
    ).join('');
  }

  const moduleGrid = document.querySelector('[data-gbp-modules]');
  if (moduleGrid && !moduleGrid.dataset.rendered) {
    moduleGrid.dataset.rendered = '1';
    moduleGrid.innerHTML = data.modules.map((m) => `
      <a class="gbp-card" href="${href(m.href)}">
        <div class="gbp-card__icon"><i class="fas fa-layer-group" aria-hidden="true"></i></div>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <ul>${m.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </a>
    `).join('');
  }

  const tabs = document.querySelectorAll('[data-gbp-role-tab]');
  const roleInput = document.querySelector('[data-gbp-role]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (roleInput) roleInput.value = tab.dataset.gbpRoleTab;
    });
  });

  document.querySelectorAll('[data-gbp-auth]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = form.querySelector('[data-gbp-role]')?.value || 'client';
      const dest = role === 'admin' ? data.paths.admin : data.paths.client;
      window.location.href = href(dest);
    });
  });
})();
