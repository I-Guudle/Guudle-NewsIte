/**
 * GUUDLE Business Operating Platform — shared IA
 */
window.GuudlePlatform = {
  name: 'GUUDLE Business Operating Platform',
  tagline: 'One Platform. Every Part of Your Business.',
  support: 'Manage customers, sales, projects, teams, tasks, time and finances from one intelligent business workspace.',
  paths: {
    home: 'pages/saas/index.html',
    pricing: 'pages/saas/pricing.html',
    login: 'pages/saas/login.html',
    register: 'pages/saas/register.html',
    support: 'pages/saas/support.html',
    admin: 'dashboards/admin/index.html',
    client: 'dashboards/client/index.html',
  },
  modules: [
    { id: 'crm', name: 'CRM', icon: 'users', href: 'pages/saas/modules/crm.html', desc: 'Customers, contacts, and account history in one workspace.', bullets: ['Customer 360', 'Activity timeline', 'Account health', 'Relationship mapping'] },
    { id: 'sales', name: 'Sales', icon: 'chart', href: 'pages/saas/modules/sales.html', desc: 'Pipeline, opportunities, and revenue motion in the same system.', bullets: ['Pipelines', 'Opportunity stages', 'Win/loss notes', 'Forecast views'] },
    { id: 'projects', name: 'Project Management', icon: 'layers', href: 'pages/saas/modules/projects.html', desc: 'Plan delivery against the same clients and contracts you sell.', bullets: ['Project workspaces', 'Milestones', 'Dependencies', 'Client visibility'] },
    { id: 'tasks', name: 'Task Management', icon: 'list', href: 'pages/saas/modules/tasks.html', desc: 'Assign work across teams without leaving the operating platform.', bullets: ['Boards & lists', 'Owners & due dates', 'Priorities', 'Recurring work'] },
    { id: 'time', name: 'Time Tracking', icon: 'clock', href: 'pages/saas/modules/time-tracking.html', desc: 'Capture billable time that flows into invoices automatically.', bullets: ['Timers', 'Timesheets', 'Billable vs non-billable', 'Project burn'] },
    { id: 'estimates', name: 'Estimates', icon: 'document', href: 'pages/saas/modules/estimates.html', desc: 'Scope work and convert approved estimates into projects and invoices.', bullets: ['Line items', 'Client approval', 'Version history', 'One-click convert'] },
    { id: 'proposals', name: 'Proposals', icon: 'book', href: 'pages/saas/modules/proposals.html', desc: 'Send branded proposals connected to CRM and sales records.', bullets: ['Templates', 'eSignature-ready', 'Tracking', 'Won deal handoff'] },
    { id: 'invoicing', name: 'Invoicing', icon: 'invoice', href: 'pages/saas/modules/invoicing.html', desc: 'Invoice from tracked time, estimates, and project retainers.', bullets: ['Recurring invoices', 'Tax-ready', 'Reminders', 'Client portal'] },
    { id: 'payments', name: 'Payments', icon: 'bank', href: 'pages/saas/modules/payments.html', desc: 'Collect and reconcile payments against the same customer ledger.', bullets: ['Cards & transfers', 'Partial payments', 'Reconciliation', 'Receipts'] },
    { id: 'automation', name: 'Automation', icon: 'bolt', href: 'pages/saas/modules/automation.html', desc: 'Trigger follow-ups, tasks, and billing events across modules.', bullets: ['Workflow rules', 'Reminders', 'Handoffs', 'Approvals'] },
    { id: 'collaboration', name: 'Client Collaboration', icon: 'handshake', href: 'pages/saas/modules/collaboration.html', desc: 'Share files, messages, and approvals with clients in-context.', bullets: ['Shared workspace', 'Comments', 'Documents', 'Client login'] },
  ],
  plans: [
    { id: 'starter', name: 'Starter', price: '49', period: '/user /month', blurb: 'For small teams running clients and projects in one place.', features: ['CRM + Projects + Tasks', 'Time tracking', 'Estimates & invoices', '5 automations', 'Email support'] },
    { id: 'growth', name: 'Growth', price: '89', period: '/user /month', featured: true, blurb: 'For growing firms that need sales, billing, and client portals.', features: ['Everything in Starter', 'Sales pipeline', 'Proposals & payments', 'Client collaboration', 'Unlimited automations', 'Priority support'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', period: '', blurb: 'For multi-team operators who need admin control and scale.', features: ['Everything in Growth', 'SSO & permissions', 'Dedicated success', 'Custom modules', 'SLA & audit logs', 'Super-admin controls'] },
  ],
};
