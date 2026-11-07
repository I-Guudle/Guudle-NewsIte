(function () {
  const cfg = window.GDB_CONFIG;
  if (!cfg) return;

  const viewEl = document.getElementById('gdb-view');
  const titleEl = document.getElementById('gdb-title');
  const crumbEl = document.getElementById('gdb-crumb');
  const navEl = document.getElementById('gdb-nav');

  const ICONS = {
    overview: 'fa-gauge-high', tenants: 'fa-building', customers: 'fa-users',
    users: 'fa-user-gear', plans: 'fa-tags', subscriptions: 'fa-rotate',
    products: 'fa-cube', services: 'fa-screwdriver-wrench', payments: 'fa-credit-card',
    invoices: 'fa-file-invoice-dollar', revenue: 'fa-chart-line', analytics: 'fa-chart-pie',
    support: 'fa-headset', permissions: 'fa-shield-halved', automation: 'fa-bolt',
    settings: 'fa-gear', health: 'fa-heart-pulse', clients: 'fa-address-book',
    contacts: 'fa-id-card', leads: 'fa-bullseye', opportunities: 'fa-handshake',
    sales: 'fa-chart-line', projects: 'fa-diagram-project', tasks: 'fa-list-check',
    time: 'fa-clock', estimates: 'fa-file-lines', proposals: 'fa-file-signature',
    team: 'fa-people-group', documents: 'fa-folder-open', messages: 'fa-comments',
    collaboration: 'fa-user-group', reports: 'fa-chart-column',
  };

  function badge(status) {
    const map = { Active: 'ok', Paid: 'ok', Healthy: 'ok', Won: 'ok', Open: 'ok', Trial: 'warn', Pending: 'warn', Due: 'warn', Risk: 'risk', Past: 'risk', Suspended: 'risk' };
    const cls = map[status] ? `gdb-badge--${map[status]}` : '';
    return `<span class="gdb-badge ${cls}">${status}</span>`;
  }

  function kpis(items) {
    return `<div class="gdb-kpis">${items.map((k) => `<article class="gdb-kpi"><span>${k.label}</span><strong>${k.value}</strong></article>`).join('')}</div>`;
  }

  function table(title, headers, rows, action) {
    return `
      <section class="gdb-panel">
        <div class="gdb-panel__head">
          <h2>${title}</h2>
          ${action || '<button type="button" class="gdb-btn gdb-btn--ghost">Export</button>'}
        </div>
        <div style="overflow:auto">
          <table class="gdb-table">
            <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </section>`;
  }

  function form(title, fields, note) {
    return `
      <section class="gdb-panel">
        <div class="gdb-panel__head"><h2>${title}</h2></div>
        <form class="gdb-form" onsubmit="event.preventDefault(); alert('Prototype only — this action will connect to the live API in production.');">
          ${fields.map((f) => `
            <div class="${f.full ? 'full' : ''}">
              <label>${f.label}</label>
              ${f.type === 'textarea'
                ? `<textarea rows="3" placeholder="${f.placeholder || ''}"></textarea>`
                : f.type === 'select'
                  ? `<select>${(f.options || []).map((o) => `<option>${o}</option>`).join('')}</select>`
                  : `<input type="${f.type || 'text'}" placeholder="${f.placeholder || ''}">`}
            </div>`).join('')}
          <div class="full"><button type="submit" class="gdb-btn gdb-btn--primary">Save</button></div>
        </form>
        ${note ? `<p class="gdb-note">${note}</p>` : ''}
      </section>`;
  }

  const adminViews = {
    overview: {
      title: 'Platform overview',
      crumb: 'Super Admin / Control plane',
      render: () => kpis([
        { label: 'Active tenants', value: '128' },
        { label: 'MRR', value: '£86.4k' },
        { label: 'Open tickets', value: '14' },
        { label: 'System health', value: '99.97%' },
      ]) + table('Recent tenant activity', ['Tenant', 'Plan', 'Users', 'MRR', 'Status'], [
        ['Northline Legal', 'Growth', '18', '£1,602', badge('Active')],
        ['Harbor Clinics', 'Enterprise', '64', 'Custom', badge('Active')],
        ['Brightfield Studio', 'Starter', '6', '£294', badge('Trial')],
        ['Kite Logistics', 'Growth', '22', '£1,958', badge('Active')],
      ]) + table('Revenue movement', ['Date', 'Event', 'Amount', 'Tenant'], [
        ['11 Sep', 'Subscription renewal', '£1,602', 'Northline Legal'],
        ['10 Sep', 'Seat expansion', '£267', 'Kite Logistics'],
        ['09 Sep', 'Invoice collected', '£4,800', 'Harbor Clinics'],
      ]),
    },
    tenants: {
      title: 'Tenants',
      crumb: 'Super Admin / Tenants',
      render: () => kpis([
        { label: 'Total tenants', value: '146' },
        { label: 'Paying', value: '128' },
        { label: 'Trials', value: '12' },
        { label: 'Churn risk', value: '6' },
      ]) + table('All workspaces', ['Workspace', 'Industry', 'Owner', 'Plan', 'Status'], [
        ['Northline Legal', 'Professional services', 'amira@northline.co', 'Growth', badge('Active')],
        ['Harbor Clinics', 'Healthcare', 'ops@harbor.clinic', 'Enterprise', badge('Active')],
        ['Brightfield Studio', 'Creative', 'hello@brightfield.io', 'Starter', badge('Trial')],
        ['Atlas Trade', 'Wholesale', 'cfo@atlas.trade', 'Growth', badge('Suspended')],
      ]) + form('Provision tenant', [
        { label: 'Company name', placeholder: 'Acme Ltd' },
        { label: 'Primary admin email', type: 'email', placeholder: 'admin@acme.com' },
        { label: 'Plan', type: 'select', options: ['Starter', 'Growth', 'Enterprise'] },
        { label: 'Region', type: 'select', options: ['UK', 'EU', 'US'] },
      ], 'Creates an isolated client workspace on the GUUDLE Business Operating Platform.'),
    },
    customers: { title: 'Customers', crumb: 'Super Admin / Customers', render: () => table('Billing customers', ['Customer', 'Tenant', 'Seats', 'Lifetime value', 'Health'], [
      ['Northline Legal LLP', 'northline', '18', '£38,400', badge('Healthy')],
      ['Harbor Clinics Group', 'harbor', '64', '£212,000', badge('Healthy')],
      ['Brightfield Studio', 'brightfield', '6', '£1,470', badge('Trial')],
    ]) },
    users: { title: 'Users', crumb: 'Super Admin / Users', render: () => table('Platform users', ['Name', 'Email', 'Role', 'Tenant', 'Status'], [
      ['Amira Cole', 'amira@northline.co', 'Tenant admin', 'Northline', badge('Active')],
      ['GUUDLE Ops', 'ops@guudle.com', 'Super admin', 'Platform', badge('Active')],
      ['Leo Hart', 'leo@harbor.clinic', 'Finance', 'Harbor', badge('Active')],
    ]) },
    plans: { title: 'SaaS plans', crumb: 'Super Admin / Plans', render: () => table('Catalog', ['Plan', 'Price', 'Modules', 'Automation', 'Support'], [
      ['Starter', '£49 / user', 'CRM, Projects, Time, Invoices', '5 rules', 'Email'],
      ['Growth', '£89 / user', 'Full operating platform', 'Unlimited', 'Priority'],
      ['Enterprise', 'Custom', 'Full + SSO + audit', 'Unlimited', 'Dedicated'],
    ]) },
    subscriptions: { title: 'Subscriptions', crumb: 'Super Admin / Subscriptions', render: () => table('Live subscriptions', ['Tenant', 'Plan', 'Renews', 'Seats', 'Status'], [
      ['Northline Legal', 'Growth', '11 Oct 2026', '18', badge('Active')],
      ['Brightfield Studio', 'Starter', '02 Oct 2026', '6', badge('Trial')],
      ['Harbor Clinics', 'Enterprise', '01 Jan 2027', '64', badge('Active')],
    ]) },
    products: { title: 'Products', crumb: 'Super Admin / Products', render: () => table('Module catalog', ['Module', 'Code', 'Attached to plans', 'Status'], [
      ['CRM', 'crm', 'All', badge('Active')],
      ['Payments', 'payments', 'Growth, Enterprise', badge('Active')],
      ['Client Collaboration', 'collab', 'Growth, Enterprise', badge('Active')],
    ]) },
    services: { title: 'Services', crumb: 'Super Admin / Services', render: () => table('Managed services', ['Service', 'Attached tenants', 'SLA', 'Status'], [
      ['Onboarding concierge', '34', '5 business days', badge('Active')],
      ['Data migration', '11', 'Scoped', badge('Active')],
      ['White-glove success', '8', 'Named CSM', badge('Active')],
    ]) },
    payments: { title: 'Payments', crumb: 'Super Admin / Payments', render: () => table('Collected payments', ['ID', 'Tenant', 'Method', 'Amount', 'Status'], [
      ['pay_8841', 'Harbor Clinics', 'Transfer', '£4,800', badge('Paid')],
      ['pay_8839', 'Northline Legal', 'Card', '£1,602', badge('Paid')],
      ['pay_8833', 'Atlas Trade', 'Card', '£890', badge('Pending')],
    ]) },
    invoices: { title: 'Invoices', crumb: 'Super Admin / Invoices', render: () => table('Platform invoices', ['Invoice', 'Tenant', 'Amount', 'Due', 'Status'], [
      ['INV-2026-0911', 'Northline Legal', '£1,602', '11 Sep', badge('Paid')],
      ['INV-2026-0902', 'Brightfield Studio', '£294', '16 Sep', badge('Due')],
      ['INV-2026-0888', 'Atlas Trade', '£890', '01 Sep', badge('Past')],
    ]) },
    revenue: { title: 'Revenue', crumb: 'Super Admin / Revenue', render: () => kpis([
      { label: 'MRR', value: '£86.4k' },
      { label: 'ARR', value: '£1.04m' },
      { label: 'Net new MRR', value: '+£4.1k' },
      { label: 'Logo churn', value: '1.2%' },
    ]) + table('Plan mix', ['Plan', 'Tenants', 'MRR share', 'Expansion'], [
      ['Starter', '41', '18%', 'Low'],
      ['Growth', '76', '54%', 'High'],
      ['Enterprise', '11', '28%', 'Medium'],
    ]) },
    analytics: { title: 'Analytics', crumb: 'Super Admin / Analytics', render: () => kpis([
      { label: 'Weekly active workspaces', value: '119' },
      { label: 'Avg modules used', value: '7.4' },
      { label: 'NPS', value: '64' },
      { label: 'Time-to-first invoice', value: '4.2d' },
    ]) + table('Adoption by module', ['Module', 'Active tenants', 'WoW', 'Stickiness'], [
      ['CRM', '128', '+3%', 'High'],
      ['Projects', '117', '+5%', 'High'],
      ['Invoicing', '101', '+2%', 'High'],
      ['Automation', '74', '+8%', 'Medium'],
    ]) },
    support: { title: 'Support', crumb: 'Super Admin / Support', render: () => table('Tickets', ['ID', 'Tenant', 'Topic', 'Priority', 'Status'], [
      ['T-441', 'Kite Logistics', 'Seat billing', 'High', badge('Open')],
      ['T-437', 'Harbor Clinics', 'SSO mapping', 'Medium', badge('Pending')],
      ['T-430', 'Northline Legal', 'Export CSV', 'Low', badge('Active')],
    ]) },
    permissions: { title: 'Permissions', crumb: 'Super Admin / Permissions', render: () => table('Roles', ['Role', 'Scope', 'Users', 'Capabilities'], [
      ['Super admin', 'Platform', '4', 'Tenants, billing, settings'],
      ['Success', 'Assigned tenants', '9', 'Support, health, notes'],
      ['Finance', 'Billing only', '3', 'Invoices, refunds, plans'],
    ]) },
    automation: { title: 'Automation', crumb: 'Super Admin / Automation', render: () => table('Platform workflows', ['Workflow', 'Trigger', 'Action', 'Status'], [
      ['Trial expiry nudge', 'Day 12 of trial', 'Email + in-app', badge('Active')],
      ['Failed payment retry', 'Payment declined', 'Retry + ticket', badge('Active')],
      ['Health risk alert', 'Usage drop 40%', 'Notify CSM', badge('Active')],
    ]) },
    settings: { title: 'Platform settings', crumb: 'Super Admin / Settings', render: () => form('Workspace defaults', [
      { label: 'Default region', type: 'select', options: ['UK', 'EU', 'US'] },
      { label: 'Trial length (days)', type: 'number', placeholder: '14' },
      { label: 'Support email', type: 'email', placeholder: 'support@guudle.com' },
      { label: 'Status page URL', placeholder: 'https://status.guudle.com' },
      { label: 'Maintenance note', type: 'textarea', full: true, placeholder: 'Shown to tenant admins' },
    ]) },
    health: { title: 'System health', crumb: 'Super Admin / Health', render: () => kpis([
      { label: 'API uptime', value: '99.97%' },
      { label: 'Queue lag', value: '1.2s' },
      { label: 'Failed jobs', value: '3' },
      { label: 'Error budget', value: 'Healthy' },
    ]) + table('Services', ['Service', 'Region', 'Latency', 'Status'], [
      ['Auth', 'London', '42ms', badge('Healthy')],
      ['Billing', 'London', '88ms', badge('Healthy')],
      ['Automation runner', 'London', '210ms', badge('Healthy')],
    ]) },
  };

  const clientViews = {
    overview: {
      title: 'Workspace overview',
      crumb: 'Northline Legal / Home',
      render: () => kpis([
        { label: 'Open pipeline', value: '£186k' },
        { label: 'Active projects', value: '11' },
        { label: 'Unbilled time', value: '46.5h' },
        { label: 'Overdue invoices', value: '£4,250' },
      ]) + table('Work that needs you', ['Item', 'Module', 'Owner', 'Due', 'State'], [
        ['Harbor retainers Q4', 'Proposal', 'Amira', '12 Sep', badge('Due')],
        ['Website rebuild', 'Project', 'Noah', '18 Sep', badge('Active')],
        ['INV-1044', 'Invoicing', 'Finance', '09 Sep', badge('Past')],
      ]),
    },
    clients: { title: 'Clients', crumb: 'CRM / Clients', render: () => table('Accounts', ['Client', 'Owner', 'Open deals', 'Projects', 'Health'], [
      ['Harbor Clinics', 'Amira', '2', '3', badge('Healthy')],
      ['Kite Logistics', 'Noah', '1', '2', badge('Active')],
      ['Brightfield Studio', 'Leah', '0', '1', badge('Risk')],
    ]) + form('Add client', [
      { label: 'Company', placeholder: 'Client Ltd' },
      { label: 'Primary contact', placeholder: 'Jane Adeyemi' },
      { label: 'Industry', type: 'select', options: ['Legal', 'Healthcare', 'Creative', 'Logistics'] },
      { label: 'Owner', type: 'select', options: ['Amira Cole', 'Noah Reid', 'Leah Shah'] },
    ]) },
    contacts: { title: 'Contacts', crumb: 'CRM / Contacts', render: () => table('People', ['Name', 'Company', 'Role', 'Email', 'Last touch'], [
      ['Leo Hart', 'Harbor Clinics', 'Ops Director', 'leo@harbor.clinic', 'Yesterday'],
      ['Priya Nair', 'Kite Logistics', 'CFO', 'priya@kite.log', '3 days ago'],
      ['Owen Blake', 'Brightfield Studio', 'Founder', 'owen@brightfield.io', '1 week ago'],
    ]) },
    leads: { title: 'Leads', crumb: 'Sales / Leads', render: () => table('Inbound', ['Lead', 'Source', 'Score', 'Owner', 'Status'], [
      ['Westmere Chambers', 'Referral', '82', 'Amira', badge('Open')],
      ['Solstice Retail', 'Website', '61', 'Leah', badge('Pending')],
      ['Arcadian Homes', 'Event', '74', 'Noah', badge('Open')],
    ]) },
    opportunities: { title: 'Opportunities', crumb: 'Sales / Opportunities', render: () => table('Deals', ['Opportunity', 'Value', 'Stage', 'Close', 'Owner'], [
      ['Harbor EHR rollout', '£84,000', 'Proposal', '30 Sep', 'Amira'],
      ['Kite control tower', '£46,000', 'Discovery', '21 Oct', 'Noah'],
      ['Brightfield retainers', '£18,000', 'Negotiation', '18 Sep', 'Leah'],
    ]) },
    sales: { title: 'Sales', crumb: 'Sales / Pipeline', render: () => kpis([
      { label: 'Weighted forecast', value: '£97k' },
      { label: 'Win rate', value: '41%' },
      { label: 'Avg cycle', value: '27 days' },
      { label: 'New this month', value: '9' },
    ]) + table('Pipeline', ['Stage', 'Deals', 'Value', 'Next action'], [
      ['Qualified', '6', '£72k', 'Discovery calls'],
      ['Proposal', '3', '£112k', 'Send / follow up'],
      ['Verbal', '2', '£36k', 'Contract'],
    ]) },
    projects: { title: 'Projects', crumb: 'Delivery / Projects', render: () => table('Active delivery', ['Project', 'Client', 'Progress', 'Budget', 'Status'], [
      ['Patient portal', 'Harbor Clinics', '68%', '£42k', badge('Active')],
      ['Route planner', 'Kite Logistics', '41%', '£28k', badge('Active')],
      ['Brand site', 'Brightfield Studio', '89%', '£12k', badge('Due')],
    ]) },
    tasks: { title: 'Tasks', crumb: 'Delivery / Tasks', render: () => table('Team work', ['Task', 'Project', 'Owner', 'Due', 'Priority'], [
      ['QA patient intake', 'Patient portal', 'Noah', '12 Sep', 'High'],
      ['Invoice schedule', 'Harbor retainers', 'Amira', '13 Sep', 'Medium'],
      ['Copy for launch', 'Brand site', 'Leah', '10 Sep', 'High'],
    ]) },
    time: { title: 'Time tracking', crumb: 'Delivery / Time', render: () => kpis([
      { label: 'This week', value: '186.0h' },
      { label: 'Billable', value: '151.5h' },
      { label: 'Unsubmitted', value: '12.0h' },
      { label: 'Ready to invoice', value: '46.5h' },
    ]) + `
      <section class="gdb-panel">
        <div class="gdb-panel__head">
          <h2>Weekly timesheet</h2>
          <button type="button" class="gdb-btn gdb-btn--primary" data-gdb-action="submit-timesheet">Submit timesheet</button>
        </div>
        <div style="overflow:auto">
          <table class="gdb-table">
            <thead><tr><th>Project</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Total</th><th>Billable</th></tr></thead>
            <tbody>
              <tr><td>Patient portal</td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="6.5" aria-label="Patient portal Monday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="7" aria-label="Patient portal Tuesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="6" aria-label="Patient portal Wednesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="5.5" aria-label="Patient portal Thursday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="4" aria-label="Patient portal Friday"></td><td>29.0</td><td>Yes</td></tr>
              <tr><td>Brand site</td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="2" aria-label="Brand site Monday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="3" aria-label="Brand site Tuesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="1.5" aria-label="Brand site Wednesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="0" aria-label="Brand site Thursday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="3" aria-label="Brand site Friday"></td><td>9.5</td><td>Yes</td></tr>
              <tr><td>Internal ops</td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="1" aria-label="Internal ops Monday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="0" aria-label="Internal ops Tuesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="0.5" aria-label="Internal ops Wednesday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="1.5" aria-label="Internal ops Thursday"></td><td><input class="gdb-hours" type="number" min="0" step="0.5" value="0" aria-label="Internal ops Friday"></td><td>3.0</td><td>No</td></tr>
            </tbody>
          </table>
        </div>
        <p class="gdb-note" data-gdb-note>Approved billable hours stay available to draft an invoice. This workspace preview does not write to a live ledger.</p>
      </section>` },
    estimates: { title: 'Estimates', crumb: 'Finance / Estimates', render: () => table('Estimates', ['Estimate', 'Client', 'Value', 'Valid until', 'Status'], [
      ['EST-221', 'Harbor Clinics', '£84,000', '25 Sep', badge('Open')],
      ['EST-218', 'Kite Logistics', '£46,000', '04 Oct', badge('Pending')],
      ['EST-210', 'Arcadian Homes', '£19,500', '01 Sep', badge('Won')],
    ], '<button type="button" class="gdb-btn gdb-btn--primary" data-gdb-action="convert-estimate">Convert EST-221 to proposal</button>') + `
      <section class="gdb-panel">
        <div class="gdb-panel__head"><h2>EST-221 line items</h2></div>
        <div style="overflow:auto"><table class="gdb-table"><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>
          <tr><td>Discovery and clinical workflow mapping</td><td>1</td><td>£12,000</td><td>£12,000</td></tr>
          <tr><td>Patient portal build</td><td>1</td><td>£54,000</td><td>£54,000</td></tr>
          <tr><td>Training and handover</td><td>1</td><td>£18,000</td><td>£18,000</td></tr>
        </tbody></table></div>
        <p class="gdb-note" data-gdb-note>An approved estimate can become a project or an invoice without retyping the scope.</p>
      </section>` },
    proposals: { title: 'Proposals', crumb: 'Sales / Proposals', render: () => table('Proposals', ['Proposal', 'Linked deal', 'Views', 'Sent', 'Status'], [
      ['Harbor EHR rollout', '£84,000', '7', '08 Sep', badge('Open')],
      ['Kite control tower', '£46,000', '2', '11 Sep', badge('Pending')],
    ], '<button type="button" class="gdb-btn gdb-btn--primary" data-gdb-action="send-proposal">Mark Harbor proposal viewed</button>') + `<p class="gdb-note" data-gdb-note>Proposals stay attached to the CRM account and the opportunity they came from.</p>` },
    invoices: { title: 'Invoices', crumb: 'Finance / Invoices', render: () => table('Client invoices', ['Invoice', 'Client', 'Amount', 'Due', 'Status'], [
      ['INV-1048', 'Harbor Clinics', '£8,400', '20 Sep', badge('Open')],
      ['INV-1044', 'Brightfield Studio', '£4,250', '09 Sep', badge('Past')],
      ['INV-1039', 'Kite Logistics', '£6,100', '01 Sep', badge('Paid')],
    ], '<button type="button" class="gdb-btn gdb-btn--primary" data-gdb-action="draft-invoice">Draft from unbilled time</button>') + `<p class="gdb-note" data-gdb-note>46.5 billable hours are waiting. Drafting an invoice does not collect a payment.</p>` },
    payments: { title: 'Payments', crumb: 'Finance / Payments', render: () => kpis([
      { label: 'Collected this month', value: '£9,500' },
      { label: 'Outstanding', value: '£12,650' },
      { label: 'Part-paid', value: '£1,000' },
      { label: 'Gross margin', value: '41%' },
    ]) + table('Received payments', ['Payment', 'Invoice', 'Method', 'Amount', 'Status'], [
      ['PMT-773', 'INV-1039', 'Transfer', '£6,100', badge('Paid')],
      ['PMT-770', 'INV-1031', 'Card', '£2,400', badge('Paid')],
      ['PMT-766', 'INV-1044', 'Card', '£1,000', badge('Pending')],
    ], '<button type="button" class="gdb-btn gdb-btn--primary" data-gdb-action="reconcile">Reconcile PMT-766</button>') + `<p class="gdb-note" data-gdb-note>Reconciliation matches a payment to the invoice balance. A remaining balance stays open.</p>` },
    team: { title: 'Team', crumb: 'Workspace / Team', render: () => table('Members', ['Name', 'Role', 'Capacity', 'Projects', 'Status'], [
      ['Amira Cole', 'Workspace admin', '72%', '4', badge('Active')],
      ['Noah Reid', 'Delivery lead', '91%', '3', badge('Active')],
      ['Leah Shah', 'Account manager', '64%', '5', badge('Active')],
    ]) },
    automation: { title: 'Automation', crumb: 'Workspace / Automation', render: () => table('Workspace rules', ['Rule', 'When', 'Then', 'Status'], [
      ['Won deal handoff', 'Opportunity marked Won', 'Create project and kickoff tasks', badge('Active')],
      ['Invoice reminder', 'Invoice 3 days overdue', 'Email client and notify finance', badge('Active')],
      ['Time to invoice', 'Friday 16:00', 'Draft invoice from unbilled time', badge('Active')],
    ], '<button type="button" class="gdb-btn gdb-btn--ghost" data-gdb-action="pause-rule">Pause Friday invoice draft</button>') + `<p class="gdb-note" data-gdb-note>Rules run inside this workspace. Pausing a rule stops the next scheduled run only.</p>` },
    documents: { title: 'Documents', crumb: 'Workspace / Documents', render: () => table('Files', ['Document', 'Related to', 'Updated', 'Visibility'], [
      ['MSA-Harbor.pdf', 'Harbor Clinics', '08 Sep', 'Client + team'],
      ['Scope-Kite-v3.docx', 'Kite control tower', '11 Sep', 'Internal'],
      ['Brand-guidelines.pdf', 'Brightfield Studio', '02 Sep', 'Client + team'],
    ]) },
    messages: { title: 'Messages', crumb: 'Collaboration / Messages', render: () => table('Threads', ['Thread', 'Client', 'Last message', 'Unread'], [
      ['Portal feedback', 'Harbor Clinics', 'Can we add export?', '2'],
      ['Retainer hours', 'Brightfield Studio', 'Please send August report', '1'],
      ['Go-live checklist', 'Kite Logistics', 'Staging looks good', '0'],
    ]) },
    collaboration: { title: 'Client collaboration', crumb: 'Collaboration / Portal', render: () => kpis([
      { label: 'Active client users', value: '27' },
      { label: 'Shared files', value: '148' },
      { label: 'Pending approvals', value: '5' },
      { label: 'Open threads', value: '9' },
    ]) + table('Shared workspaces', ['Client', 'Visible modules', 'Approvals', 'Last login'], [
      ['Harbor Clinics', 'Projects, Files, Invoices', '1', 'Today'],
      ['Kite Logistics', 'Projects, Files', '2', 'Yesterday'],
      ['Brightfield Studio', 'Invoices, Files', '2', '3 days ago'],
    ]) },
    reports: { title: 'Reports', crumb: 'Insights / Reports', render: () => kpis([
      { label: 'Aged 0–30 days', value: '£8,400' },
      { label: 'Aged 31–60', value: '£4,250' },
      { label: 'Utilization', value: '78%' },
      { label: 'Unbilled WIP', value: '£6,975' },
    ]) + table('Saved reports', ['Report', 'Owner', 'Cadence', 'Last run'], [
      ['Utilization by person', 'Noah', 'Weekly', '08 Sep'],
      ['Pipeline forecast', 'Amira', 'Weekly', '11 Sep'],
      ['Aged receivables', 'Finance', 'Daily', '11 Sep'],
    ], '<button type="button" class="gdb-btn gdb-btn--ghost" data-gdb-action="export-report">Export aged receivables</button>') + `<p class="gdb-note" data-gdb-note>Aged receivables can be exported from this preview. A live file is not downloaded until finance confirms the run.</p>` },
    analytics: { title: 'Analytics', crumb: 'Insights / Analytics', render: () => kpis([
      { label: 'Utilization', value: '78%' },
      { label: 'Gross margin', value: '41%' },
      { label: 'Avg invoice days', value: '18' },
      { label: 'Client NPS', value: '71' },
    ]) + table('Operating dashboard', ['Signal', 'Now', 'Target', 'Trend'], [
      ['Billable ratio', '81%', '75%', 'Up'],
      ['Invoice cycle', '18 days', '21 days', 'Up'],
      ['Open pipeline', '£186k', '£150k', 'Up'],
      ['Overdue share', '18%', 'Under 10%', 'Watch'],
    ]) },
  };

  const views = cfg.role === 'admin' ? adminViews : clientViews;

  function renderNav() {
    if (!navEl) return;
    navEl.innerHTML = cfg.nav.map((item) => `
      <a href="#${item.id}" data-view="${item.id}">
        <i class="fas ${ICONS[item.id] || 'fa-circle'}" aria-hidden="true"></i>
        <span>${item.label}</span>
      </a>
    `).join('');
  }

  function show(id) {
    const key = views[id] ? id : 'overview';
    const view = views[key];
    if (titleEl) titleEl.textContent = view.title;
    if (crumbEl) crumbEl.textContent = view.crumb;
    if (viewEl) viewEl.innerHTML = view.render();
    navEl?.querySelectorAll('a').forEach((a) => a.classList.toggle('is-active', a.dataset.view === key));
  }

  const actionNotes = {
    'submit-timesheet': 'Timesheet submitted for approval. Approved billable hours can be drafted into an invoice.',
    'convert-estimate': 'EST-221 is ready to open as a proposal. The line items stay on the same client.',
    'send-proposal': 'Harbor proposal marked as viewed by the client. The linked opportunity is unchanged.',
    'draft-invoice': 'Draft invoice created from 46.5 unbilled hours. No payment has been collected.',
    'reconcile': 'PMT-766 is matched to INV-1044. £3,250 remains outstanding on that invoice.',
    'pause-rule': 'The Friday unbilled-time draft is paused. Other rules stay active.',
    'export-report': 'Aged receivables export is prepared for this preview. A live file is not downloaded.',
  };

  viewEl?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-gdb-action]');
    if (!button) return;
    const note = viewEl.querySelector('[data-gdb-note]');
    const message = actionNotes[button.dataset.gdbAction];
    if (note && message) note.textContent = message;
  });

  renderNav();
  const initial = (location.hash || '#overview').slice(1);
  show(initial);
  window.addEventListener('hashchange', () => show(location.hash.slice(1)));
})();
