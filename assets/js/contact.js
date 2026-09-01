/**
 * Contact page — multi-step inquiry form, validation, file uploads, API integration
 */
(function () {
  'use strict';

  const cfg = window.GUUDLE_CONTACT || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SERVICE_GROUPS = [
    {
      title: 'Software Development',
      items: ['Custom Software Development', 'Enterprise Software Development', 'SaaS Development', 'ERP Development', 'CRM Development', 'HRMS Development'],
    },
    {
      title: 'Web Development',
      items: ['Website Development', 'Web Application Development', 'E-Commerce Development', 'Progressive Web Apps'],
    },
    {
      title: 'Mobile Development',
      items: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'Flutter Development', 'React Native Development'],
    },
    {
      title: 'Cloud & Infrastructure',
      items: ['Cloud Engineering', 'DevOps Services', 'Legacy Modernization', 'Infrastructure Management'],
    },
    {
      title: 'Artificial Intelligence',
      items: ['Machine Learning', 'AI Automation', 'Predictive Analytics', 'Computer Vision', 'NLP Solutions'],
    },
    {
      title: 'Design Services',
      items: ['UI/UX Design', 'Product Design', 'Brand Identity'],
    },
    {
      title: 'Consulting',
      items: ['Digital Transformation', 'IT Consulting', 'Product Discovery', 'Business Process Automation'],
    },
  ];

  const QUICK_MAP = {
    website: ['Website Development'],
    mobile: ['Mobile App Development'],
    ai: ['Machine Learning', 'AI Automation'],
    cloud: ['Cloud Engineering'],
    enterprise: ['Enterprise Software Development'],
    design: ['UI/UX Design'],
    transformation: ['Digital Transformation'],
  };

  const TESTIMONIALS = [
    { quote: 'Guudle delivered our platform on time with exceptional quality. Their team understood our enterprise requirements from day one.', name: 'James Mitchell', company: 'FinTech Startup', rating: 5 },
    { quote: 'From discovery to launch, the process was transparent and professional. We saw measurable improvements in conversion within weeks.', name: 'Sarah Ahmed', company: 'E-Commerce Brand', rating: 5 },
    { quote: 'Their AI and cloud expertise helped us modernize legacy systems without disrupting operations. Highly recommended.', name: 'David Chen', company: 'Enterprise Client', rating: 5 },
  ];

  const FAQ = [
    { q: 'How long does development take?', a: 'Timelines depend on scope — MVPs often launch in 8–12 weeks, while enterprise platforms may take 4–9 months. We provide a detailed estimate after discovery.' },
    { q: 'What industries do you serve?', a: 'Healthcare, retail, fintech, real estate, logistics, education, manufacturing, non-profit, and more — with domain-specific compliance where required.' },
    { q: 'What technologies do you use?', a: 'React, Next.js, Node.js, Laravel, .NET, Flutter, AWS, Azure, PostgreSQL, and modern AI/ML stacks — chosen per project requirements.' },
    { q: 'Do you offer support and maintenance?', a: 'Yes. We provide SLA-backed support, monitoring, security patches, and continuous improvement after launch.' },
    { q: 'How does your development process work?', a: 'Discovery → strategy & design → agile development → QA → launch → ongoing support, with regular demos and stakeholder feedback.' },
  ];

  let csrfToken = '';
  let currentStep = 1;
  const totalSteps = 4;

  /* ── Utilities ── */
  function $(sel, root = document) { return root.querySelector(sel); }
  function $$(sel, root = document) { return [...root.querySelectorAll(sel)]; }

  function showFieldError(input, msg) {
    const wrap = input.closest('.ct-field');
    if (!wrap) return;
    wrap.classList.add('ct-field--error');
    let err = wrap.querySelector('.ct-field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'ct-field-error';
      err.setAttribute('role', 'alert');
      wrap.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearFieldError(input) {
    const wrap = input.closest('.ct-field');
    if (!wrap) return;
    wrap.classList.remove('ct-field--error');
    const err = wrap.querySelector('.ct-field-error');
    if (err) err.remove();
  }

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /* ── CSRF ── */
  async function fetchCsrf() {
    try {
      const res = await fetch(cfg.csrfUrl || '../api/csrf-token.php', { credentials: 'same-origin' });
      const data = await res.json();
      if (data.token) csrfToken = data.token;
    } catch {
      console.warn('CSRF token unavailable — form will fail until API is configured.');
    }
  }

  /* ── Render dynamic UI ── */
  function renderServices() {
    const host = $('#service-groups');
    if (!host) return;
    host.innerHTML = SERVICE_GROUPS.map((g) => `
      <fieldset class="ct-service-group">
        <legend>${g.title}</legend>
        <div class="ct-service-grid">
          ${g.items.map((item) => `
            <label class="ct-service-check">
              <input type="checkbox" name="services" value="${item.replace(/"/g, '&quot;')}">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>
    `).join('');
  }

  function renderFaq() {
    const host = $('#ct-faq-list');
    if (!host) return;
    host.innerHTML = FAQ.map((item, i) => `
      <div class="ent-faq__item slp-faq-item" data-ent-faq data-svc-faq>
        <button type="button" class="ent-faq__trigger slp-faq-trigger" id="ct-faq-btn-${i}" aria-expanded="false" aria-controls="ct-faq-panel-${i}">
          <span class="ent-faq__q">${item.q}</span>
          <span class="ent-faq__icon" aria-hidden="true"><i class="fas fa-plus"></i></span>
        </button>
        <div class="ent-faq__panel slp-faq-panel" id="ct-faq-panel-${i}" role="region" aria-labelledby="ct-faq-btn-${i}">
          <div class="slp-faq-panel__inner ent-faq__a">${item.a}</div>
        </div>
      </div>
    `).join('');
  }

  function renderTestimonials() {
    const track = $('#ct-testimonial-track');
    if (!track) return;
    track.innerHTML = TESTIMONIALS.map((t, i) => `
      <article class="ct-testimonial${i === 0 ? ' is-active' : ''}" data-slide="${i}">
        <div class="ct-testimonial-stars">${'★'.repeat(t.rating)}</div>
        <blockquote>${t.quote}</blockquote>
        <footer><strong>${t.name}</strong><span>${t.company}</span></footer>
      </article>
    `).join('');
    let idx = 0;
    const slides = $$('.ct-testimonial', track);
    const dots = $('#ct-testimonial-dots');
    if (dots) {
      dots.innerHTML = slides.map((_, i) => `<button type="button" class="ct-dot${i === 0 ? ' active' : ''}" data-dot="${i}" aria-label="Testimonial ${i + 1}"></button>`).join('');
      dots.addEventListener('click', (e) => {
        const d = e.target.closest('[data-dot]');
        if (d) go(parseInt(d.dataset.dot, 10));
      });
    }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      $$('.ct-dot', dots).forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    $('#ct-testimonial-prev')?.addEventListener('click', () => go(idx - 1));
    $('#ct-testimonial-next')?.addEventListener('click', () => go(idx + 1));
    if (!reduced) setInterval(() => go(idx + 1), 7000);
  }

  /* ── Multi-step form ── */
  function updateProgress() {
    const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const bar = $('#ct-progress-bar');
    const label = $('#ct-progress-label');
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `Step ${currentStep} of ${totalSteps}`;
    $$('.ct-step-pill').forEach((pill) => {
      const step = parseInt(pill.dataset.step, 10);
      pill.classList.toggle('active', step === currentStep);
      pill.classList.toggle('done', step < currentStep);
    });
    $$('[data-form-step]').forEach((panel) => {
      const step = parseInt(panel.dataset.formStep, 10);
      panel.hidden = step !== currentStep;
      panel.classList.toggle('ct-step-panel--active', step === currentStep);
    });
    $('#ct-form-prev')?.toggleAttribute('disabled', currentStep === 1);
    const nextBtn = $('#ct-form-next');
    const submitBtn = $('#ct-form-submit');
    if (nextBtn) nextBtn.hidden = currentStep === totalSteps;
    if (submitBtn) submitBtn.hidden = currentStep !== totalSteps;
  }

  function validateStep(step) {
    const form = $('#inquiry-form');
    if (!form) return false;
    let valid = true;

    if (step === 1) {
      ['full_name', 'email'].forEach((name) => {
        const el = form.elements[name];
        clearFieldError(el);
        if (!el?.value.trim()) {
          showFieldError(el, 'This field is required.');
          valid = false;
        }
      });
      const email = form.elements.email;
      if (email?.value && !validateEmail(email.value.trim())) {
        showFieldError(email, 'Enter a valid email address.');
        valid = false;
      }
    }

    if (step === 2) {
      const checked = $$('input[name="services"]:checked', form);
      const err = $('#services-error');
      if (!checked.length) {
        if (err) err.hidden = false;
        valid = false;
      } else if (err) err.hidden = true;
    }

    if (step === 3) {
      const desc = form.elements.project_description;
      clearFieldError(desc);
      if (!desc?.value.trim()) {
        showFieldError(desc, 'Please describe your project.');
        valid = false;
      }
    }

    if (step === 4) {
      const gdpr = form.elements.gdpr;
      const err = $('#gdpr-error');
      if (!gdpr?.checked) {
        if (err) err.hidden = false;
        valid = false;
      } else if (err) err.hidden = true;
    }

    return valid;
  }

  function buildReview() {
    const form = $('#inquiry-form');
    const host = $('#ct-review-summary');
    if (!form || !host) return;
    const services = $$('input[name="services"]:checked', form).map((c) => c.value);
    const fields = [
      ['Name', form.full_name?.value],
      ['Company', form.company_name?.value],
      ['Email', form.email?.value],
      ['Phone', form.phone?.value],
      ['Country', form.country?.value],
      ['Project', form.project_title?.value],
      ['Budget', form.budget?.value],
      ['Timeline', form.timeline?.value],
      ['Services', services.join(', ') || '—'],
    ];
    host.innerHTML = fields.filter(([, v]) => v).map(([k, v]) =>
      `<div class="ct-review-row"><span>${k}</span><strong>${v}</strong></div>`
    ).join('');
  }

  /* ── File uploads ── */
  function initFileUpload() {
    const input = $('#inquiry-files');
    const list = $('#ct-file-list');
    const zone = $('#ct-upload-zone');
    if (!input || !list) return;

    function renderFiles() {
      list.innerHTML = '';
      [...input.files].forEach((file, i) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const allowed = cfg.allowedExtensions || [];
        const li = document.createElement('li');
        li.className = 'ct-file-item';
        const invalid = file.size > (cfg.maxFileSize || 10485760) || (allowed.length && !allowed.includes(ext));
        li.innerHTML = `
          <div class="ct-file-info">
            <i class="fas fa-file${invalid ? '-circle-xmark text-red-500' : '-lines'}"></i>
            <span>${file.name}</span>
            <em>${(file.size / 1024 / 1024).toFixed(2)} MB</em>
          </div>
          <div class="ct-file-progress"><div class="ct-file-progress-bar" style="width:100%"></div></div>
          ${invalid ? '<span class="ct-file-warn">Invalid file</span>' : ''}
        `;
        list.appendChild(li);
      });
    }

    input.addEventListener('change', renderFiles);
    zone?.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone?.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      input.files = e.dataTransfer.files;
      renderFiles();
    });
    zone?.addEventListener('click', () => input.click());
    zone?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
  }

  /* ── Submit ── */
  async function submitForm(e) {
    e.preventDefault();
    if (!validateStep(4)) return;

    const form = $('#inquiry-form');
    const btn = $('#ct-form-submit');
    const status = $('#ct-form-status');
    if (!form || !btn) return;

    btn.disabled = true;
    btn.classList.add('loading');
    if (status) {
      status.hidden = false;
      status.className = 'ct-form-status';
      status.textContent = (window.GuudleContact && window.GuudleContact.messages.sending) || 'Sending your enquiry...';
    }

    const preferSupabase = (cfg.preferSupabase !== false) && window.GuudleContact && window.GuudleContact.isConfigured();

    if (preferSupabase) {
      const result = await window.GuudleContact.submitFromForm(form, {
        multiService: true,
        requireService: false,
        sourcePage: 'pages/contact.html',
        onSuccess: function () {
          $('#inquiry-form-wrap')?.setAttribute('hidden', '');
          const success = $('#ct-success');
          if (success) {
            success.hidden = false;
            const ref = $('#ct-success-ref');
            if (ref) ref.textContent = '';
            success.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
          }
        },
      });

      if (!result.ok) {
        if (status && result.validation) {
          status.hidden = true;
        } else if (status) {
          status.hidden = false;
          status.className = 'ct-form-status ct-form-status--error';
          status.textContent =
            (window.GuudleContact && window.GuudleContact.messages.failure) ||
            "We couldn't submit your enquiry right now. Please try again.";
        }
        btn.disabled = false;
        btn.classList.remove('loading');
      }
      return;
    }

    /* Legacy PHP path when Supabase is not configured */
    const fd = new FormData(form);
    const services = $$('input[name="services"]:checked', form).map((c) => c.value);
    fd.delete('services');
    fd.append('services', JSON.stringify(services));
    fd.append('csrf_token', csrfToken);

    try {
      const res = await fetch(cfg.submitUrl || '../api/submit-inquiry.php', {
        method: 'POST',
        body: fd,
        credentials: 'same-origin',
        headers: { 'X-CSRF-Token': csrfToken },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed.');
      }
      if (data.csrf_token) csrfToken = data.csrf_token;
      $('#inquiry-form-wrap')?.setAttribute('hidden', '');
      const success = $('#ct-success');
      if (success) {
        success.hidden = false;
        $('#ct-success-ref').textContent = data.reference ? `#${data.reference}` : '';
        success.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }
    } catch (err) {
      if (status) {
        status.hidden = false;
        status.className = 'ct-form-status ct-form-status--error';
        status.textContent =
          "We couldn't submit your enquiry right now. Please try again. Or email info@guudle.com";
      }
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  }

  function initQuickCards() {
    $$('.ct-quick-card').forEach((card) => {
      card.addEventListener('click', () => {
        const key = card.dataset.quick;
        const services = QUICK_MAP[key] || [];
        renderServices();
        services.forEach((name) => {
          const cb = $(`input[name="services"][value="${name}"]`);
          if (cb) cb.checked = true;
        });
        currentStep = 2;
        updateProgress();
        $('#inquiry-form')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  function initReveal() {
    $$('.ct-reveal').forEach((el) => {
      if (reduced) { el.classList.add('is-visible'); return; }
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('is-visible'); }
      }, { threshold: 0.1 }).observe(el);
    });
  }

  function initForm() {
    const form = $('#inquiry-form');
    if (!form) return;

    $$('.ct-input, .ct-textarea, select.ct-input', form).forEach((input) => {
      input.addEventListener('input', () => clearFieldError(input));
      input.addEventListener('blur', () => {
        if (input.required && !input.value.trim()) showFieldError(input, 'This field is required.');
      });
    });

    $('#ct-form-next')?.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      if (currentStep === 3) buildReview();
      if (currentStep < totalSteps) { currentStep++; updateProgress(); }
    });

    $('#ct-form-prev')?.addEventListener('click', () => {
      if (currentStep > 1) { currentStep--; updateProgress(); }
    });

    form.addEventListener('submit', submitForm);
    updateProgress();
  }

  async   function init() {
    renderServices();
    renderFaq();
    document.dispatchEvent(new CustomEvent('guudle:faq-ready'));
    renderTestimonials();
    initFileUpload();
    initQuickCards();
    initReveal();
    await fetchCsrf();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
