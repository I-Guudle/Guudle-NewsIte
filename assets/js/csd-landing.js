/**
 * Guudle — Custom Software Development landing (page-specific)
 */
(function () {
  'use strict';

  function initArchitectureDiagram() {
    const nodes = document.querySelectorAll('[data-csd-arch-node]');
    const lines = document.querySelectorAll('[data-csd-arch-line]');
    if (!nodes.length) return;

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const id = node.dataset.csdArchNode;
        nodes.forEach((n) => n.classList.toggle('is-active', n === node));
        lines.forEach((l) => l.classList.toggle('csd-arch__line--active', l.dataset.csdArchLine === id || l.dataset.csdArchLine === 'all'));
      });
      node.addEventListener('mouseleave', () => {
        nodes.forEach((n) => n.classList.remove('is-active'));
        lines.forEach((l) => l.classList.remove('csd-arch__line--active'));
      });
    });
  }

  function initWorkflowPanels() {
    const panels = document.querySelectorAll('[data-csd-workflow-panel]');
    if (!panels.length) return;
    panels.forEach((panel) => {
      panel.addEventListener('click', () => {
        const active = panel.classList.contains('is-active');
        panels.forEach((p) => p.classList.remove('is-active'));
        if (!active) panel.classList.add('is-active');
      });
    });
    if (panels[0]) panels[0].classList.add('is-active');
  }

  function initProcessTimeline() {
    const steps = document.querySelectorAll('[data-csd-timeline-step]');
    const details = document.querySelectorAll('[data-csd-timeline-detail]');
    if (!steps.length) return;
    steps.forEach((step) => {
      step.addEventListener('click', () => {
        const id = step.dataset.csdTimelineStep;
        steps.forEach((s) => {
          const on = s === step;
          s.classList.toggle('is-active', on);
          s.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        details.forEach((d) => d.classList.toggle('is-active', d.dataset.csdTimelineDetail === id));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.slp-page[data-slp-prefix="csd"]')) return;
    initArchitectureDiagram();
    initWorkflowPanels();
    initProcessTimeline();
  });
})();
