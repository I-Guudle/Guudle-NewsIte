/**
 * API Development landing — endpoint diagram interactions
 */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('[data-api-node]');
    const lines = document.querySelectorAll('[data-api-line]');
    const consoleEl = document.querySelector('[data-api-console-output]');
    const snippets = {
      client: '<span class="api-console__prompt">$</span> curl -X GET <span class="api-console__url">/api/v1/health</span>',
      gateway: '<span class="api-console__method">GET</span> <span class="api-console__url">/api/v1/users</span> → <span class="api-console__val">200 OK</span>',
      auth: '<span class="api-console__method">POST</span> <span class="api-console__url">/api/v1/auth/token</span><br><span class="api-console__key">grant_type</span>: <span class="api-console__val">"client_credentials"</span>',
      users: '<span class="api-console__method">GET</span> <span class="api-console__url">/api/v1/users?page=1</span><br><span class="api-console__response">{ "data": [...], "total": 248 }</span>',
      orders: '<span class="api-console__method">POST</span> <span class="api-console__url">/api/v1/orders</span><br><span class="api-console__key">items</span>: <span class="api-console__val">[{ "sku": "P-102" }]</span>',
      payments: '<span class="api-console__method">PUT</span> <span class="api-console__url">/api/v1/payments/ch_8x2</span><br><span class="api-console__response">{ "status": "captured" }</span>',
      db: '<span class="api-console__prompt">→</span> PostgreSQL <span class="api-console__val">SELECT * FROM users LIMIT 10</span>',
    };
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const id = node.dataset.apiNode;
        nodes.forEach((n) => n.classList.toggle('is-active', n === node));
        lines.forEach((l) => l.classList.toggle('is-active', l.dataset.apiLine === id || l.dataset.apiLineTarget === id));
        if (consoleEl && snippets[id]) consoleEl.innerHTML = snippets[id];
      });
    });
    if (nodes[0]) nodes[0].click();
  });
})();
