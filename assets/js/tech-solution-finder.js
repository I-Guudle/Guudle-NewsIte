/**
 * Tech Solution Finder — 5-step homepage wizard
 */
(function () {
  'use strict';

  const STEP_NAMES = ['Industry', 'Project Type', 'Budget Range', 'Timeline', 'Additional Needs'];
  const TOTAL = 5;

  const LABELS = {
    industry: {
      healthcare: 'Healthcare', fintech: 'FinTech', ecommerce: 'E-commerce', education: 'Education',
      travel: 'Travel & Hospitality', realestate: 'Real Estate', ondemand: 'On-Demand', other: 'Custom Industry',
    },
    project: {
      'mobile-app': 'Mobile App', 'web-app': 'Web Application', 'ai-solution': 'AI Solution',
      blockchain: 'Blockchain Platform', 'custom-software': 'Custom Software', mvp: 'MVP / Startup',
    },
    budget: {
      'under-10k': 'Under $10,000', '10-25k': '$10,000 – $25,000', '25-40k': '$25,000 – $40,000',
      '40-60k': '$40,000 – $60,000', '60k-plus': '$60,000+',
    },
    timeline: {
      '1-2': '1 – 2 Months', '3-4': '3 – 4 Months', '4-6': '4 – 6 Months', '6-plus': '6+ Months',
    },
  };

  const TECH = {
    'mobile-app': 'Flutter, React Native, Node.js, Firebase, AWS',
    'web-app': 'React, Next.js, Node.js, PostgreSQL, AWS',
    'ai-solution': 'Python, TensorFlow, OpenAI, LangChain, AWS',
    blockchain: 'Solidity, Web3.js, Node.js, IPFS, AWS',
    'custom-software': '.NET, Java, Node.js, PostgreSQL, Azure',
    mvp: 'React, Node.js, PostgreSQL, Vercel, AWS',
  };

  const FEATURES = {
    healthcare: 'HIPAA Compliance, Telemedicine, EHR Integration, Patient Portal',
    fintech: 'KYC/AML, Payment Gateway, Fraud Detection, Secure Dashboard',
    ecommerce: 'Product Catalog, Checkout, Inventory, Analytics Dashboard',
    education: 'LMS, Video Lessons, Student Portal, Progress Tracking',
    travel: 'Booking Engine, Itinerary Builder, Payment Integration, Reviews',
    realestate: 'Property Listings, Virtual Tours, CRM, Lead Management',
    ondemand: 'Real-time Matching, GPS Tracking, In-app Payments, Notifications',
    other: 'Custom Workflows, Admin Dashboard, Analytics, Role-based Access',
  };

  const state = {
    step: 0,
    industry: 'healthcare',
    project: 'web-app',
    budget: 'under-10k',
    timeline: '1-2',
    industryOther: '',
  };

  let root;

  function $(sel) { return root?.querySelector(sel); }
  function $$(sel) { return [...(root?.querySelectorAll(sel) || [])]; }

  function buildRecommendation() {
    const indKey = state.industry === 'other' && state.industryOther
      ? state.industryOther
      : (LABELS.industry[state.industry] || 'Your Industry');
    const proj = LABELS.project[state.project] || 'Digital Solution';
    const adj = state.project === 'mobile-app' ? 'Mobile' : state.project === 'ai-solution' ? 'AI-Powered' : 'Scalable';

    return {
      title: `${adj} ${indKey} ${proj}`,
      desc: `A comprehensive ${proj.toLowerCase()} designed for ${typeof indKey === 'string' ? indKey.toLowerCase() : 'your sector'} with enterprise-grade security and scalability.`,
      timeline: LABELS.timeline[state.timeline] || '—',
      budget: LABELS.budget[state.budget] || '—',
      tech: TECH[state.project] || 'React, Node.js, PostgreSQL, AWS',
      features: FEATURES[state.industry] || FEATURES.other,
    };
  }

  function updateResult() {
    const rec = buildRecommendation();
    const card = $('.tsf-result-card');
    if (card) card.classList.add('tsf-has-selection');
    Object.entries(rec).forEach(([key, val]) => {
      const el = root.querySelector(`[data-tsf-result="${key}"]`);
      if (el) el.textContent = val;
    });
  }

  function updateProgress() {
    const pct = ((state.step + 1) / TOTAL) * 100;
    const fill = $('[data-tsf-progress-fill]');
    const stepEl = $('[data-tsf-progress-step]');
    const nameEl = $('[data-tsf-progress-name]');
    const navIdx = $('#tsfNavStepIdx');
    if (fill) fill.style.width = `${pct}%`;
    if (stepEl) stepEl.textContent = String(state.step + 1);
    if (nameEl) nameEl.textContent = STEP_NAMES[state.step];
    if (navIdx) navIdx.textContent = String(state.step + 1);
  }

  function updateStepsNav() {
    $$('.tsf-step-item').forEach((item) => {
      const i = parseInt(item.dataset.tsfStep, 10);
      item.classList.toggle('is-active', i === state.step);
      item.classList.toggle('is-complete', i < state.step);
    });
  }

  function showPanel(index) {
    $$('[data-tsf-panel]').forEach((p) => {
      const i = parseInt(p.dataset.tsfPanel, 10);
      p.hidden = i !== index;
      p.classList.toggle('is-active', i === index);
    });
    state.step = index;
    updateStepsNav();
    updateProgress();
    updateNavButtons();
    hideError();
  }

  function updateNavButtons() {
    const back = $('#tsfBack');
    const skip = $('#tsfSkip');
    const next = $('#tsfNext');
    if (back) back.hidden = state.step === 0;
    if (skip) skip.hidden = state.step >= TOTAL - 1;
    if (next) {
      next.hidden = state.step >= TOTAL - 1;
      next.innerHTML = state.step === TOTAL - 2
        ? 'Continue to Form <i class="fas fa-arrow-right" aria-hidden="true"></i>'
        : 'Next <i class="fas fa-arrow-right" aria-hidden="true"></i>';
    }
  }

  function hideError() {
    const err = $('#tsfError');
    if (err) err.hidden = true;
  }

  function showError(msg) {
    const err = $('#tsfError');
    const msgEl = $('#tsfErrorMsg');
    const panel = $(`[data-tsf-panel="${state.step}"]`);
    if (msgEl) msgEl.textContent = msg;
    if (err) err.hidden = false;
    if (panel) {
      panel.classList.remove('tsf-shake');
      void panel.offsetWidth;
      panel.classList.add('tsf-shake');
    }
  }

  function getGroupSelection(group) {
    const btn = root.querySelector(`.tsf-option-card.is-selected[data-tsf-group="${group}"]`);
    return btn?.dataset.tsfValue || '';
  }

  function validateStep() {
    if (state.step === 0) {
      const val = getGroupSelection('industry');
      if (!val) return false;
      if (val === 'other') {
        const other = $('#tsfIndustryOther')?.value.trim();
        if (!other) {
          showError('Please describe your industry, or select a different option.');
          return false;
        }
        state.industryOther = other;
      }
      state.industry = val;
    }
    if (state.step === 1) {
      const val = getGroupSelection('project');
      if (!val) return false;
      state.project = val;
    }
    if (state.step === 2) {
      const val = getGroupSelection('budget');
      if (!val) return false;
      state.budget = val;
    }
    if (state.step === 3) {
      const val = getGroupSelection('timeline');
      if (!val) return false;
      state.timeline = val;
    }
    updateResult();
    return true;
  }

  function syncStateFromUI() {
    const ind = getGroupSelection('industry');
    if (ind) state.industry = ind;
    const proj = getGroupSelection('project');
    if (proj) state.project = proj;
    const bud = getGroupSelection('budget');
    if (bud) state.budget = bud;
    const tl = getGroupSelection('timeline');
    if (tl) state.timeline = tl;
    updateResult();
  }

  function onOptionClick(btn) {
    const group = btn.dataset.tsfGroup;
    root.querySelectorAll(`.tsf-option-card[data-tsf-group="${group}"]`).forEach((b) => {
      b.classList.remove('is-selected');
    });
    btn.classList.add('is-selected');
    hideError();

    if (group === 'industry') {
      const wrap = $('[data-tsf-other-for="industry"]');
      if (wrap) wrap.hidden = btn.dataset.tsfOther !== '1';
    }

    if (group === 'industry') state.industry = btn.dataset.tsfValue;
    if (group === 'project') state.project = btn.dataset.tsfValue;
    if (group === 'budget') state.budget = btn.dataset.tsfValue;
    if (group === 'timeline') state.timeline = btn.dataset.tsfValue;
    updateResult();
  }

  function prefillFormMessage() {
    const rec = buildRecommendation();
    const msg = $('#tsf-message');
    if (!msg || msg.value.includes('[TSF Recommendation]')) return;
    const indLabel = state.industry === 'other' && state.industryOther
      ? state.industryOther
      : (LABELS.industry[state.industry] || state.industry);
    msg.value = `[TSF Recommendation]\nSolution: ${rec.title}\nIndustry: ${indLabel}\nBudget: ${rec.budget}\nTimeline: ${rec.timeline}\n\n`;
  }

  function bindEvents() {
    root.querySelectorAll('.tsf-option-card').forEach((btn) => {
      btn.addEventListener('click', () => onOptionClick(btn));
    });

    $('#tsfNext')?.addEventListener('click', () => {
      if (state.step < TOTAL - 1) {
        if (state.step < 4 && !validateStep()) {
          showError('Please select an option on this step, or click Skip to continue.');
          return;
        }
        showPanel(state.step + 1);
        if (state.step === TOTAL - 1) prefillFormMessage();
      }
    });

    $('#tsfBack')?.addEventListener('click', () => {
      if (state.step > 0) showPanel(state.step - 1);
    });

    $('#tsfSkip')?.addEventListener('click', () => {
      syncStateFromUI();
      if (state.step < TOTAL - 1) showPanel(state.step + 1);
    });

    $('#tsf-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      prefillFormMessage();
      form.querySelector('.tsf-btn-submit')?.setAttribute('hidden', '');
      $('#tsfFormSuccess')?.removeAttribute('hidden');
    });

    $('[data-tsf-book-cta]')?.addEventListener('click', (e) => {
      syncStateFromUI();
      if (state.step < TOTAL - 1) {
        e.preventDefault();
        showPanel(TOTAL - 1);
        prefillFormMessage();
        root.querySelector('#tsf-name')?.focus();
      }
    });

    $('#tsfIndustryOther')?.addEventListener('input', (e) => {
      state.industryOther = e.target.value.trim();
      if (state.industry === 'other') updateResult();
    });
  }

  function init() {
    root = document.getElementById('tech-solution-finder');
    if (!root || root.dataset.tsfInit === '1') return;
    root.dataset.tsfInit = '1';
    bindEvents();
    updateResult();
    updateProgress();
    updateNavButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
