/** Legacy Tech Hub CTA — removed site-wide. Stub for legacy imports. */
export function renderTechHubCta() {
  return '';
}

export function renderAiTechHubCta() {
  return '';
}

export function techHubEsc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
