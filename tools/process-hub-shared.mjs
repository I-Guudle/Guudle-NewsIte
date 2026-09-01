/**
 * Shared Process Hub CTA — links service pages to pages/our-process.html
 */
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/**
 * @param {{ linkPrefix?: string, id?: string, aos?: boolean }} opts
 */
export function renderProcessHubCta({
  linkPrefix = '../',
  id = 'svc-process-hub',
  aos = true,
  title,
  desc,
  badge,
  btn,
} = {}) {
  const href = `${linkPrefix}our-process.html`;
  const aosAttr = aos ? ' data-aos="fade-up"' : '';
  const heading = title || 'Our Proven Development Process';
  const description = desc || 'Every successful solution begins with a proven methodology. Discover how our experienced architects, designers, developers, testers, and DevOps engineers transform ideas into secure, scalable, enterprise-grade digital products.';
  const badgeText = badge || 'Process';
  const btnText = btn || 'Explore Our Development Process';
  return `<section id="${id}" class="process-hub-cta" aria-labelledby="${id}-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div class="process-hub-cta__card"${aosAttr}>
      <span class="process-hub-cta__glow" aria-hidden="true"></span>
      <div class="process-hub-cta__content">
        <span class="process-hub-cta__badge"><i class="fas fa-route" aria-hidden="true"></i> ${badgeText}</span>
        <h2 id="${id}-heading" class="process-hub-cta__title">${heading}</h2>
        <p class="process-hub-cta__desc">${description}</p>
        <a href="${href}" class="process-hub-cta__btn">${btnText} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </div>
</section>`;
}

export { esc as processHubEsc };
