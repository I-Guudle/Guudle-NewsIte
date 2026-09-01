/**
 * Homepage Tech Solution Finder section HTML
 */
export function renderTechSolutionFinderSection() {
  return `
    <section class="tsf-section section-padding" id="tech-solution-finder" aria-labelledby="tsf-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 tsf-container">
        <header class="tsf-header text-center" data-aos="fade-up">
          <span class="tsf-badge"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> AI Powered</span>
          <h2 id="tsf-heading" class="tsf-title font-display">Find Your Perfect Tech Solution <span class="tsf-highlight">in 60 Seconds</span></h2>
          <p class="tsf-subtitle">Answer a few quick questions and get a personalized recommendation for your project needs.</p>
        </header>

        <div class="tsf-mobile-progress" aria-hidden="true">
          <div class="tsf-mobile-progress__top">
            <span class="tsf-mobile-progress__label">Step <span data-tsf-progress-step>1</span> of 5</span>
            <span class="tsf-mobile-progress__name" data-tsf-progress-name>Industry</span>
          </div>
          <div class="tsf-mobile-progress__track">
            <span class="tsf-mobile-progress__fill" data-tsf-progress-fill style="width:20%"></span>
          </div>
        </div>

        <div class="tsf-layout">
          <div class="tsf-wizard-card" data-aos="fade-up" data-aos-delay="80">
            <div class="tsf-wizard-inner">
              <nav class="tsf-steps-nav" aria-label="Solution finder steps">
                <ol class="tsf-steps-list">
                  <li class="tsf-step-item is-active" data-tsf-step="0">
                    <span class="tsf-step-marker">1</span>
                    <span class="tsf-step-copy">
                      <span class="tsf-step-title">Industry</span>
                      <small>Select your industry</small>
                    </span>
                  </li>
                  <li class="tsf-step-item" data-tsf-step="1">
                    <span class="tsf-step-marker">2</span>
                    <span class="tsf-step-copy">
                      <span class="tsf-step-title">Project Type</span>
                      <small>What do you want to build?</small>
                    </span>
                  </li>
                  <li class="tsf-step-item" data-tsf-step="2">
                    <span class="tsf-step-marker">3</span>
                    <span class="tsf-step-copy">
                      <span class="tsf-step-title">Budget Range</span>
                      <small>Select your budget range</small>
                    </span>
                  </li>
                  <li class="tsf-step-item" data-tsf-step="3">
                    <span class="tsf-step-marker">4</span>
                    <span class="tsf-step-copy">
                      <span class="tsf-step-title">Timeline</span>
                      <small>Project delivery timeline</small>
                    </span>
                  </li>
                  <li class="tsf-step-item" data-tsf-step="4">
                    <span class="tsf-step-marker">5</span>
                    <span class="tsf-step-copy">
                      <span class="tsf-step-title">Additional Needs</span>
                      <small>Share your requirements</small>
                    </span>
                  </li>
                </ol>
              </nav>

              <div class="tsf-main">
                <div class="tsf-panels">
                  <div class="tsf-panel is-active" data-tsf-panel="0">
                    <h3 class="tsf-question">Which industry does your business belong to?</h3>
                    <div class="tsf-options-grid">
                      ${tsfOption('industry', 'healthcare', 'fa-heart-pulse', 'Healthcare', true)}
                      ${tsfOption('industry', 'fintech', 'fa-landmark', 'FinTech')}
                      ${tsfOption('industry', 'ecommerce', 'fa-cart-shopping', 'E-commerce')}
                      ${tsfOption('industry', 'education', 'fa-graduation-cap', 'Education')}
                      ${tsfOption('industry', 'travel', 'fa-plane', 'Travel & Hospitality')}
                      ${tsfOption('industry', 'realestate', 'fa-building', 'Real Estate')}
                      ${tsfOption('industry', 'ondemand', 'fa-mobile-screen', 'On-Demand')}
                      ${tsfOption('industry', 'other', 'fa-grip', 'Other', false, true)}
                    </div>
                    <div class="tsf-other-wrap" data-tsf-other-for="industry" hidden>
                      <label class="tsf-other-label" for="tsfIndustryOther"><i class="fas fa-pen" aria-hidden="true"></i> Please describe your industry</label>
                      <input type="text" class="tsf-other-input" id="tsfIndustryOther" placeholder="e.g. Logistics, AgriTech, legal services…" autocomplete="off">
                    </div>
                  </div>

                  <div class="tsf-panel" data-tsf-panel="1" hidden>
                    <h3 class="tsf-question">What type of solution do you want to build?</h3>
                    <div class="tsf-options-grid tsf-options-grid--3">
                      ${tsfOption('project', 'mobile-app', 'fa-mobile-screen', 'Mobile App')}
                      ${tsfOption('project', 'web-app', 'fa-globe', 'Web Application', true)}
                      ${tsfOption('project', 'ai-solution', 'fa-brain', 'AI Solution')}
                      ${tsfOption('project', 'blockchain', 'fa-link', 'Blockchain Platform')}
                      ${tsfOption('project', 'custom-software', 'fa-code', 'Custom Software')}
                      ${tsfOption('project', 'mvp', 'fa-rocket', 'MVP / Startup')}
                    </div>
                  </div>

                  <div class="tsf-panel" data-tsf-panel="2" hidden>
                    <h3 class="tsf-question">What is your estimated project budget?</h3>
                    <div class="tsf-options-grid tsf-options-grid--2">
                      ${tsfOption('budget', 'under-10k', 'fa-wallet', 'Under $10,000', true)}
                      ${tsfOption('budget', '10-25k', 'fa-money-bill', '$10,000 – $25,000')}
                      ${tsfOption('budget', '25-40k', 'fa-credit-card', '$25,000 – $40,000')}
                      ${tsfOption('budget', '40-60k', 'fa-chart-bar', '$40,000 – $60,000')}
                      ${tsfOption('budget', '60k-plus', 'fa-arrow-trend-up', '$60,000+')}
                    </div>
                  </div>

                  <div class="tsf-panel" data-tsf-panel="3" hidden>
                    <h3 class="tsf-question">When do you need your project delivered?</h3>
                    <div class="tsf-options-grid tsf-options-grid--2">
                      ${tsfOption('timeline', '1-2', 'fa-bolt', '1 – 2 Months', true)}
                      ${tsfOption('timeline', '3-4', 'fa-calendar', '3 – 4 Months')}
                      ${tsfOption('timeline', '4-6', 'fa-calendar-days', '4 – 6 Months')}
                      ${tsfOption('timeline', '6-plus', 'fa-clock', '6+ Months')}
                    </div>
                  </div>

                  <div class="tsf-panel" data-tsf-panel="4" hidden>
                    <h3 class="tsf-question">Tell us about your project requirements</h3>
                    <p class="tsf-form-lead">Complete the form below and our specialists will contact you within 24 hours.</p>
                    <form id="tsf-form" class="tsf-form" novalidate>
                      <div class="tsf-form-grid">
                        <div class="tsf-field">
                          <label for="tsf-name">Full Name <span aria-hidden="true">*</span></label>
                          <input type="text" id="tsf-name" name="name" required placeholder="Your name" autocomplete="name">
                        </div>
                        <div class="tsf-field">
                          <label for="tsf-phone">Phone Number</label>
                          <input type="tel" id="tsf-phone" name="phone" placeholder="Your phone" autocomplete="tel">
                        </div>
                        <div class="tsf-field tsf-field--full">
                          <label for="tsf-email">Email Address <span aria-hidden="true">*</span></label>
                          <input type="email" id="tsf-email" name="email" required placeholder="you@company.com" autocomplete="email">
                        </div>
                        <div class="tsf-field tsf-field--full">
                          <label for="tsf-message">Your Requirement <span aria-hidden="true">*</span></label>
                          <textarea id="tsf-message" name="message" rows="4" required placeholder="Describe your project goals…"></textarea>
                        </div>
                      </div>
                      <p class="tsf-nda"><i class="fas fa-shield-halved" aria-hidden="true"></i> Your ideas are fully protected under our NDA.</p>
                      <button type="submit" class="tsf-btn tsf-btn-submit">Send Your Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
                      <div class="tsf-form-success" id="tsfFormSuccess" hidden>
                        <i class="fas fa-circle-check" aria-hidden="true"></i>
                        <p><strong>Thank you!</strong> Our consultant will contact you within 24 hours.</p>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="tsf-error" id="tsfError" role="alert" hidden>
                  <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
                  <span id="tsfErrorMsg">Please select an option on this step, or click Skip to continue.</span>
                </div>

                <div class="tsf-nav">
                  <button type="button" class="tsf-btn tsf-btn-back" id="tsfBack" hidden>
                    <i class="fas fa-arrow-left" aria-hidden="true"></i> Back
                  </button>
                  <button type="button" class="tsf-btn tsf-btn-skip" id="tsfSkip">
                    Skip <i class="fas fa-forward" aria-hidden="true"></i>
                  </button>
                  <span class="tsf-nav-spacer"></span>
                  <span class="tsf-nav-step-text"><strong id="tsfNavStepIdx">1</strong> / 5</span>
                  <button type="button" class="tsf-btn tsf-btn-next" id="tsfNext">
                    Next <i class="fas fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside class="tsf-result-card" data-aos="fade-up" data-aos-delay="140" aria-live="polite">
            <div class="tsf-result-visual" aria-hidden="true">
              <span class="tsf-result-glow"></span>
              <i class="fas fa-microchip"></i>
            </div>
            <div class="tsf-result-head">
              <span class="tsf-result-eyebrow"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> Your Recommended Solution</span>
              <span class="tsf-match-badge">Best Match</span>
            </div>
            <h3 class="tsf-result-title" data-tsf-result="title">Scalable Web Application</h3>
            <p class="tsf-result-desc" data-tsf-result="desc">Select your preferences to see a tailored recommendation.</p>
            <ul class="tsf-result-meta">
              <li><i class="fas fa-clock" aria-hidden="true"></i><span><strong>Estimated Timeline:</strong> <span data-tsf-result="timeline">—</span></span></li>
              <li><i class="fas fa-wallet" aria-hidden="true"></i><span><strong>Budget Range:</strong> <span data-tsf-result="budget">—</span></span></li>
              <li><i class="fas fa-layer-group" aria-hidden="true"></i><span><strong>Recommended Tech:</strong> <span data-tsf-result="tech">React, Node.js, PostgreSQL, AWS</span></span></li>
              <li><i class="fas fa-key" aria-hidden="true"></i><span><strong>Key Features:</strong> <span data-tsf-result="features">Admin Dashboard, Analytics, Secure Auth</span></span></li>
            </ul>
            <a href="pages/contact.html" class="tsf-result-cta" data-tsf-book-cta>Book Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <p class="tsf-result-note"><i class="fas fa-circle-check" aria-hidden="true"></i> No obligation • 100% Free</p>
          </aside>
        </div>
      </div>
    </section>`;
}

function tsfOption(group, value, icon, label, selected = false, isOther = false) {
  const sel = selected ? ' is-selected' : '';
  const other = isOther ? ' data-tsf-other="1"' : '';
  return `<button type="button" class="tsf-option-card${sel}" data-tsf-group="${group}" data-tsf-value="${value}"${other}>
    <span class="tsf-option-check" aria-hidden="true"><i class="fas fa-check"></i></span>
    <span class="tsf-option-icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
    <span class="tsf-option-label">${label}</span>
  </button>`;
}
