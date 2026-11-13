/**
 * Guudle Service Pages — Per-page animations & interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('service-page')) return;

  initServiceReveal();
  initLayoutAnimations();
  initServiceAccordions();
  initServiceTabs();
  initInnovationTabs();
  initParallaxScroll();
  initDevParallaxLayers();
  initServiceAos();
  markLightHeader();
});

function initServiceTabs() {
  document.querySelectorAll('[data-sp-tabs]').forEach((root) => {
    const btns = root.querySelectorAll('.sp-tab-btn');
    const panels = root.querySelectorAll('.sp-tab-panel');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        if (!id) return;
        btns.forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        panels.forEach((p) => p.classList.toggle('active', p.dataset.tabPanel === id));
      });
    });
  });
}

function initInnovationTabs() {
  document.querySelectorAll('[data-innovation-tabs]').forEach((root) => {
    const btns = root.querySelectorAll('.innovation-tab-btn');
    const panels = root.querySelectorAll('.innovation-tab-content');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        if (!id) return;
        btns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('active', active);
          if (active) {
            b.className = 'innovation-tab-btn active px-6 py-3 rounded-t-xl font-semibold text-sm md:text-base transition-all duration-300 bg-gradient-to-r from-navy-600 to-teal-600 text-white shadow-lg';
          } else {
            b.className = 'innovation-tab-btn px-6 py-3 rounded-t-xl font-semibold text-sm md:text-base transition-all duration-300 text-gray-700 hover:text-navy-600 hover:bg-gray-100';
          }
        });
        panels.forEach((p) => {
          const show = p.dataset.content === id;
          p.classList.toggle('hidden', !show);
          p.classList.toggle('active', show);
        });
      });
    });
  });
}

function initServiceAos() {
  if (typeof AOS === 'undefined' || !document.querySelector('[data-aos]')) return;
  AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });
}

function initDevParallaxLayers() {
  const layers = document.querySelectorAll('[data-dev-parallax]');
  if (!layers.length) return;
  let ticking = false;
  const update = () => {
    const scrollY = window.scrollY;
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.devParallax) || 0.15;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY - window.innerHeight * 0.5) * speed * 0.1;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function markLightHeader() {
  /* Nav styling handled by nav-light-top on #site-header via components.js */
}

function initServiceReveal() {
  const els = document.querySelectorAll('.sp-reveal, .sp-reveal-left, .sp-reveal-right, .sp-scale');
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => obs.observe(el));

  document.querySelectorAll('.layout-enterprise-stats .stat-block').forEach((el, i) => {
    setTimeout(() => {
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('active'); o.disconnect(); }
      }, { threshold: 0.5 });
      o.observe(el);
    }, i * 100);
  });
}

function initLayoutAnimations() {
  const layout = document.body.dataset.layout;
  if (!layout) return;

  switch (layout) {
    case 'chart-analytics':
    case 'insight-bars':
      initBarChartObserver();
      break;
    case 'pipeline-crm':
      initPipelineHover();
      break;
    case 'workflow-nodes':
    case 'automation-graph':
      initWorkflowSvg();
      break;
    case 'iot-network':
    case 'iot-radar':
      initIotPulse();
      break;
    case 'neural-ai':
    case 'ai-neural-premium':
      initNeuralCanvas();
      break;
    case 'data-streams':
    case 'data-pipeline':
      initDataStreams();
      break;
    case 'cloud-parallax':
      initCloudCanvas();
      break;
    case 'aws-parallax':
      initAwsArchitecture();
      break;
    case 'azure-parallax':
      initAzureHexPulse();
      break;
    case 'saas-parallax':
      initSaasMetrics();
      break;
    case 'editorial-trust':
      initEditorialStagger();
      break;
    case 'dark-terminal':
      initTerminalTyping();
      break;
    case 'magento-enterprise':
      initMagentoRings();
      break;
    case 'wp-commerce-blocks':
      initGutenbergBlocks();
      break;
    case 'crm-kanban':
      initKanbanHover();
      break;
    default:
      break;
  }
}

function initEditorialStagger() {
  document.querySelectorAll('.editorial-reveal-col').forEach((col, i) => {
    col.style.transitionDelay = `${i * 0.12}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        col.classList.add('active');
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(col);
  });
}

function initTerminalTyping() {
  const el = document.getElementById('terminal-text');
  if (!el) return;
  const lines = [
    '$ guudle init webapp --stack=react,node',
    '✓ Scaffolding microservices architecture...',
    '✓ Configuring CI/CD pipeline (GitHub Actions)',
    '✓ Deploying to AWS ECS — region: eu-west-2',
    '→ Application live at https://app.client.io',
  ];
  let lineIdx = 0;
  let charIdx = 0;
  let current = '';

  function type() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      current += line[charIdx++];
      el.textContent = current;
      setTimeout(type, 28 + Math.random() * 24);
    } else {
      current += '\n';
      el.textContent = current;
      charIdx = 0;
      lineIdx++;
      setTimeout(type, lineIdx < lines.length ? 400 : 0);
    }
  }

  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      type();
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(el.closest('.terminal-window') || el);
}

function initBarChartObserver() {
  document.querySelectorAll('.bar-animate').forEach((bar) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { bar.style.animationPlayState = 'running'; obs.disconnect(); }
    }, { threshold: 0.3 });
    bar.style.animationPlayState = 'paused';
    obs.observe(bar);
  });
}

function initPipelineHover() {
  document.querySelectorAll('.pipeline-stage').forEach((stage) => {
    stage.addEventListener('mouseenter', () => {
      document.querySelectorAll('.pipeline-stage').forEach((s) => s.classList.remove('ring-2', 'ring-royal-blue'));
      stage.classList.add('ring-2', 'ring-royal-blue');
    });
  });
}

function initWorkflowSvg() {
  const svg = document.getElementById('workflow-svg');
  if (!svg) return;
  svg.querySelectorAll('path').forEach((path, i) => {
    path.style.animationDelay = `${i * 0.3}s`;
  });
}

function initIotPulse() {
  document.querySelectorAll('.iot-node').forEach((node, i) => {
    node.addEventListener('click', () => {
      node.classList.toggle('ring-4');
      node.classList.toggle('ring-cyan-400');
    });
  });
}

function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const nodes = [];
  let frame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    nodes.length = 0;
    for (let i = 0; i < 24; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((n, i) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
      ctx.fill();
      nodes.slice(i + 1).forEach((n2) => {
        const d = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 32, 128, ${0.15 * (1 - d / 100)})`;
          ctx.stroke();
        }
      });
    });
    frame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

function initDataStreams() {
  const container = document.querySelector('.stream-container');
  if (!container) return;
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = 'stream-line absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3';
    line.style.top = `${15 + i * 18}%`;
    line.style.animationDelay = `${i * 0.6}s`;
    container.appendChild(line);
  }
}

function initServiceAccordions() {
  document.querySelectorAll('.sp-accordion-item').forEach((item) => {
    item.querySelector('.sp-accordion-trigger')?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.closest('.sp-accordion')?.querySelectorAll('.sp-accordion-item').forEach((i) => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

function initParallaxScroll() {
  const sections = document.querySelectorAll('.sp-parallax-section');
  if (!sections.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  function update() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      section.querySelectorAll('[data-parallax-speed]').forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallaxSpeed) || 0.3;
        const y = (progress - 0.5) * 120 * speed;
        layer.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initCloudCanvas() {
  const canvas = document.getElementById('cloud-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    particles.length = 0;
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

function initAwsArchitecture() {
  document.querySelectorAll('.aws-stack-layer').forEach((layer, i) => {
    layer.style.transitionDelay = `${i * 0.08}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        layer.classList.add('opacity-100', 'translate-x-0');
        layer.classList.remove('opacity-0', 'translate-x-8');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    layer.classList.add('opacity-0', 'translate-x-8', 'transition-all', 'duration-700');
    obs.observe(layer);
  });
}

function initAzureHexPulse() {
  document.querySelectorAll('.azure-service-tile').forEach((tile, i) => {
    tile.style.animationDelay = `${i * 0.15}s`;
  });
}

function initSaasMetrics() {
  document.querySelectorAll('.saas-metric-bar').forEach((bar) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        bar.style.animationPlayState = 'running';
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    bar.style.animationPlayState = 'paused';
    obs.observe(bar);
  });
}

function initMagentoRings() {
  document.querySelectorAll('.kpi-ring').forEach((svg) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        svg.querySelectorAll('.ring-progress').forEach((circle) => {
          const offset = circle.getAttribute('stroke-dashoffset');
          circle.style.strokeDashoffset = offset;
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(svg);
  });
}

function initGutenbergBlocks() {
  document.querySelectorAll('.gutenberg-block').forEach((block, i) => {
    setTimeout(() => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { block.classList.add('active'); obs.disconnect(); }
      }, { threshold: 0.3 });
      obs.observe(block);
    }, i * 120);
  });
}

function initKanbanHover() {
  document.querySelectorAll('.kanban-col').forEach((col) => {
    col.addEventListener('mouseenter', () => {
      document.querySelectorAll('.kanban-col').forEach((c) => c.classList.remove('ring-2', 'ring-[#2563EB]'));
      col.classList.add('ring-2', 'ring-[#2563EB]');
    });
  });
}
