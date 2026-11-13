import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';
import { serviceHeroValueCards } from './value-props.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'pages', 'services');

const PAGES = [
  {
    slug: 'ai-development',
    file: 'ai-development.html',
    title: 'AI Development',
    badge: 'Artificial Intelligence',
    breadcrumb: 'AI Development',
    accent: '#2563EB',
    layout: 'layout-neural-ai',
    dataLayout: 'neural-ai',
    dataService: 'ai-development',
    heroStyle: 'light',
    headline: 'Build Production-Grade',
    headlineAccent: 'AI Systems That Scale',
    subtitle: 'From proof-of-concept to monitored production inference — we engineer AI solutions integrated with your data, workflows, and governance requirements.',
    heroVisual: 'cards',
    heroCards: [
      { icon: 'fa-brain', label: 'ML Models', sub: 'Train & deploy', grad: 'from-[#2563EB] to-[#10A5F5]' },
      { icon: 'fa-robot', label: 'Agents', sub: 'Autonomous tasks', grad: 'from-[#7C3AED] to-[#2563EB]' },
      { icon: 'fa-eye', label: 'Vision', sub: 'Image & video', grad: 'from-[#10A5F5] to-[#22C55E]' },
      { icon: 'fa-comments', label: 'NLP', sub: 'Language AI', grad: 'from-[#EA580C] to-[#F59E0B]' },
    ],
    trust: [
      ['fa-shield-halved', 'Responsible AI', 'Governance built in'],
      ['fa-gauge-high', 'Production MLOps', 'Monitored inference'],
      ['fa-plug', 'Enterprise integration', 'ERP, CRM & data lake'],
      ['fa-lock', 'Secure by design', 'Private & compliant'],
    ],
    overviewTitle: 'AI Engineering for Real Business Outcomes',
    overview: 'We don\'t ship disconnected experiments. Our AI development practice pairs data science with software engineering and MLOps so models stay accurate, fair, and maintainable long after launch.',
    overviewBullets: ['End-to-end from data prep to production deployment', 'Explainable AI and audit-ready documentation', 'Continuous monitoring, retraining, and drift detection'],
    stats: [['85%', 'Automation rate', 'navy'], ['10x', 'Faster insights', 'accent'], ['99.5%', 'Model uptime', 'blue'], ['6 wks', 'To first POC', 'teal']],
    capabilities: [
      ['fa-brain', 'Custom ML Models', 'Supervised, unsupervised, and reinforcement learning tailored to your domain.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-wand-magic-sparkles', 'Generative AI', 'LLM-powered copilots, content generation, and intelligent assistants.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-eye', 'Computer Vision', 'Object detection, OCR, quality inspection, and video analytics.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-language', 'NLP & Document AI', 'Entity extraction, summarization, and multilingual understanding.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-chart-line', 'Predictive Analytics', 'Forecasting, churn, risk scoring, and demand planning models.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-arrows-spin', 'MLOps & Monitoring', 'CI/CD for models, A/B testing, drift alerts, and automated retraining.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-hospital', 'Healthcare', 'Clinical NLP, imaging triage, and HIPAA-compliant automation.', 'teal'],
      ['fa-building-columns', 'Financial Services', 'Fraud detection, KYC parsing, and regulatory reporting.', 'blue'],
      ['fa-store', 'Retail', 'Personalization, demand sensing, and visual search.', 'purple'],
      ['fa-industry', 'Manufacturing', 'Predictive maintenance, defect detection, and digital work instructions.', 'orange'],
    ],
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'AWS SageMaker', 'Azure ML', 'Kubernetes', 'MLflow', 'Docker', 'FastAPI', 'PostgreSQL'],
    benefits: [
      ['fa-bolt', 'Speed', 'Accelerate innovation with rapid AI prototyping and deployment.'],
      ['fa-coins', 'ROI', 'Automate high-value tasks and reduce operational costs.'],
      ['fa-shield-halved', 'Trust', 'Explainable, governed AI your stakeholders can rely on.'],
      ['fa-expand', 'Scale', 'Architectures that grow from pilot to enterprise-wide rollout.'],
    ],
    ctaTitle: 'Ready to Build Production AI?',
    ctaSub: 'Book an AI strategy session and get a tailored roadmap for your use case.',
  },
  {
    slug: 'generative-ai',
    file: 'generative-ai.html',
    title: 'Generative AI Development',
    badge: 'Generative AI',
    breadcrumb: 'Generative AI Development',
    accent: '#7C3AED',
    layout: 'layout-neural-ai',
    dataLayout: 'generative-ai',
    dataService: 'generative-ai',
    heroStyle: 'dark',
    headline: 'Harness Generative AI for',
    headlineAccent: 'Creative & Cognitive Scale',
    subtitle: 'Build copilots, content engines, and intelligent generators on GPT, Claude, Gemini, or private open-weight models — with guardrails that keep output safe and on-brand.',
    heroVisual: 'sparkle',
    trust: [
      ['fa-wand-magic-sparkles', 'Multi-model', 'OpenAI, Anthropic, open source'],
      ['fa-shield-halved', 'Guardrails', 'Content safety & PII filtering'],
      ['fa-palette', 'Brand-aligned', 'Tone, style & template control'],
      ['fa-bolt', 'Low latency', 'Optimized inference pipelines'],
    ],
    overviewTitle: 'Generative AI That Stays On Mission',
    overview: 'Generative AI unlocks new productivity — but only when outputs are accurate, safe, and aligned with your brand. We engineer prompt systems, fine-tuning workflows, and evaluation harnesses so GenAI delivers consistently in production.',
    overviewBullets: ['Prompt engineering and model selection for your use case', 'Fine-tuning and RLHF for domain-specific quality', 'Human-in-the-loop review and automated quality scoring'],
    stats: [['70%', 'Content time saved', 'navy'], ['3x', 'Output volume', 'accent'], ['95%', 'Quality pass rate', 'blue'], ['4 wks', 'To MVP copilot', 'teal']],
    capabilities: [
      ['fa-file-lines', 'Content Generation', 'Marketing copy, reports, summaries, and product descriptions at scale.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-image', 'Image & Media Gen', 'Visual assets, thumbnails, and creative variations with brand controls.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-code', 'Code Generation', 'Developer copilots, test generation, and documentation automation.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-sliders', 'Prompt Engineering', 'System prompts, few-shot libraries, and chain-of-thought templates.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-microchip', 'Fine-Tuning', 'Domain adaptation on proprietary data with evaluation benchmarks.', 'from-[#7C3AED] to-[#10A5F5]'],
      ['fa-filter', 'Safety & Moderation', 'Toxicity filters, PII redaction, and policy enforcement layers.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-bullhorn', 'Marketing', 'Campaign copy, A/B variants, and localized content at scale.', 'purple'],
      ['fa-graduation-cap', 'Education', 'Adaptive learning content and automated grading assistance.', 'blue'],
      ['fa-scale-balanced', 'Legal', 'Contract summarization and clause extraction with audit trails.', 'teal'],
      ['fa-newspaper', 'Media', 'Automated drafts, headlines, and multimedia asset generation.', 'orange'],
    ],
    tech: ['GPT-4o', 'Claude', 'Gemini', 'Llama', 'Stable Diffusion', 'LangChain', 'Python', 'Azure OpenAI', 'AWS Bedrock', 'Hugging Face', 'vLLM'],
    benefits: [
      ['fa-clock', 'Efficiency', 'Generate in minutes what took days manually.'],
      ['fa-lightbulb', 'Innovation', 'Unlock new products and customer experiences.'],
      ['fa-shield-halved', 'Safety', 'Controlled outputs with enterprise guardrails.'],
      ['fa-globe', 'Reach', 'Multilingual generation for global audiences.'],
    ],
    ctaTitle: 'Ready to Deploy Generative AI?',
    ctaSub: 'Get a GenAI feasibility assessment and prototype plan for your top use case.',
  },
  {
    slug: 'ai-agent',
    file: 'ai-agent-development.html',
    title: 'AI Agent Development',
    badge: 'Autonomous AI Agents',
    breadcrumb: 'AI Agent Development',
    accent: '#10A5F5',
    layout: 'layout-workflow-nodes',
    dataLayout: 'ai-agent',
    dataService: 'ai-agent',
    heroStyle: 'light',
    headline: 'Deploy Autonomous AI Agents That',
    headlineAccent: 'Get Work Done',
    subtitle: 'Multi-step agents that plan, use tools, call APIs, and complete complex workflows — from research and data entry to customer support and operations.',
    heroVisual: 'flow',
    flowSteps: ['Plan', 'Tool Use', 'Execute', 'Verify'],
    trust: [
      ['fa-robot', 'Multi-agent', 'Orchestrated specialist agents'],
      ['fa-screwdriver-wrench', 'Tool calling', 'APIs, DBs & browsers'],
      ['fa-eye', 'Observable', 'Step-by-step audit logs'],
      ['fa-user-check', 'Human oversight', 'Approval gates when needed'],
    ],
    overviewTitle: 'Agents That Act, Not Just Answer',
    overview: 'AI agents go beyond chatbots — they reason through tasks, invoke tools, and persist until the job is done. We build agent frameworks with memory, planning, and guardrails for enterprise reliability.',
    overviewBullets: ['ReAct and plan-and-execute agent architectures', 'Secure tool access with scoped permissions', 'Human-in-the-loop checkpoints for high-stakes actions'],
    stats: [['60%', 'Task automation', 'navy'], ['5+', 'Tools per agent', 'accent'], ['24/7', 'Always on', 'blue'], ['8 wks', 'To production agent', 'teal']],
    capabilities: [
      ['fa-sitemap', 'Agent Orchestration', 'Supervisor agents coordinating specialist sub-agents for complex jobs.', 'from-[#10A5F5] to-[#2563EB]'],
      ['fa-screwdriver-wrench', 'Tool Integration', 'Connect CRM, ERP, email, calendars, databases, and custom APIs.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-memory', 'Memory & Context', 'Short and long-term memory for multi-turn, multi-session workflows.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-list-check', 'Task Planning', 'Decompose goals into steps with retry logic and error recovery.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-shield-halved', 'Safety Controls', 'Action limits, approval workflows, and sandboxed execution.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-chart-line', 'Performance Tuning', 'Latency optimization, cost control, and success rate monitoring.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-headset', 'Customer Support', 'Ticket triage, resolution, and escalation agents.', 'cyan'],
      ['fa-briefcase', 'Professional Services', 'Research, proposal drafting, and CRM update agents.', 'blue'],
      ['fa-truck', 'Operations', 'Order processing, inventory checks, and supplier coordination.', 'teal'],
      ['fa-laptop-code', 'Engineering', 'Code review, documentation, and CI/CD assistant agents.', 'purple'],
    ],
    tech: ['LangGraph', 'LangChain', 'OpenAI Assistants', 'AutoGen', 'CrewAI', 'Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    benefits: [
      ['fa-bolt', 'Autonomy', 'Complete multi-step tasks without constant human input.'],
      ['fa-coins', 'Cost down', 'Replace repetitive cognitive work at scale.'],
      ['fa-clock', '24/7', 'Agents work around the clock across time zones.'],
      ['fa-expand', 'Scale', 'Handle volume spikes without adding headcount.'],
    ],
    ctaTitle: 'Ready to Deploy AI Agents?',
    ctaSub: 'Map your highest-value workflows to an agent architecture blueprint.',
  },
  {
    slug: 'ai-automation',
    file: 'ai-automation.html',
    title: 'AI Automation',
    badge: 'Intelligent Automation',
    breadcrumb: 'AI Automation',
    accent: '#EA580C',
    layout: 'layout-workflow-nodes',
    dataLayout: 'ai-automation',
    dataService: 'ai-automation',
    heroStyle: 'light',
    headline: 'Intelligent Automation That',
    headlineAccent: 'Thinks Before It Acts',
    subtitle: 'Combine AI with workflow automation to handle unstructured data, make decisions, and trigger actions — bridging the gap between RPA and true cognitive automation.',
    heroVisual: 'flow',
    flowSteps: ['Ingest', 'Understand', 'Decide', 'Act'],
    trust: [
      ['fa-brain', 'Cognitive', 'Beyond rule-based bots'],
      ['fa-diagram-project', 'Orchestrated', 'End-to-end workflows'],
      ['fa-file-invoice', 'Document AI', 'Unstructured data handled'],
      ['fa-gauge-high', 'Measurable', 'ROI tracked per process'],
    ],
    overviewTitle: 'Smarter Automation for Unstructured Work',
    overview: 'Traditional automation breaks on exceptions and unstructured inputs. AI automation adds understanding — reading documents, classifying intent, and making context-aware decisions before triggering downstream systems.',
    overviewBullets: ['Intelligent document processing and classification', 'Decision engines powered by ML and business rules', 'Integration with RPA, iPaaS, and enterprise systems'],
    stats: [['75%', 'Manual work eliminated', 'navy'], ['90%', 'Accuracy on docs', 'accent'], ['50%', 'Faster processing', 'blue'], ['6 wks', 'First process live', 'teal']],
    capabilities: [
      ['fa-file-invoice', 'Document Intelligence', 'Extract, classify, and route invoices, contracts, and forms automatically.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-code-branch', 'Decision Automation', 'ML models and rules that route, approve, or flag items intelligently.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-envelope', 'Email & Ticket AI', 'Auto-triage, respond, and escalate support and operations emails.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-plug', 'System Triggers', 'Push outcomes to ERP, CRM, ServiceNow, and custom APIs.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-user-check', 'Human-in-the-Loop', 'Confidence thresholds and review queues for edge cases.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-chart-pie', 'Process Analytics', 'Dashboards showing throughput, accuracy, and savings per workflow.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-receipt', 'Finance', 'Invoice processing, expense approval, and reconciliation.', 'orange'],
      ['fa-users-gear', 'HR', 'Resume screening, onboarding docs, and policy Q&A.', 'blue'],
      ['fa-boxes-stacked', 'Supply Chain', 'PO matching, shipment docs, and exception handling.', 'teal'],
      ['fa-building-columns', 'Insurance', 'Claims intake, policy document parsing, and fraud flags.', 'purple'],
    ],
    tech: ['UiPath', 'Power Automate', 'Python', 'OpenAI', 'Azure AI', 'AWS Textract', 'Camunda', 'n8n', 'Node.js'],
    benefits: [
      ['fa-gauge-high', 'Efficiency', 'Process more volume with fewer people.'],
      ['fa-circle-check', 'Accuracy', 'Reduce errors on repetitive cognitive tasks.'],
      ['fa-coins', 'Savings', 'Lower cost per transaction over time.'],
      ['fa-bolt', 'Speed', 'Near-instant processing for routine work.'],
    ],
    ctaTitle: 'Ready to Automate with AI?',
    ctaSub: 'Share a process and we\'ll estimate the automation potential and ROI.',
  },
  {
    slug: 'conversational-ai',
    file: 'conversational-ai.html',
    title: 'Conversational AI',
    badge: 'Conversational AI',
    breadcrumb: 'Conversational AI',
    accent: '#10A5F5',
    layout: 'layout-phone-showcase',
    dataLayout: 'conversational-ai',
    dataService: 'conversational-ai',
    heroStyle: 'light',
    headline: 'Conversations That Feel Human and',
    headlineAccent: 'Drive Real Results',
    subtitle: 'Enterprise chatbots and voice assistants that understand intent, maintain context, and integrate with your knowledge base and backend systems — on web, mobile, and contact center channels.',
    heroVisual: 'chat',
    trust: [
      ['fa-comments', 'Omnichannel', 'Web, app, SMS & voice'],
      ['fa-book', 'Knowledge-grounded', 'RAG on your docs'],
      ['fa-language', 'Multilingual', '50+ languages supported'],
      ['fa-chart-line', 'Analytics', 'Intent & satisfaction tracking'],
    ],
    overviewTitle: 'Chatbots That Actually Help Customers',
    overview: 'Most chatbots frustrate users with scripted dead ends. We build conversational AI with natural language understanding, context memory, and seamless handoff to humans when needed.',
    overviewBullets: ['Intent recognition and entity extraction tuned to your domain', 'Integration with CRM, ticketing, and order management systems', 'Continuous learning from conversation logs and feedback'],
    stats: [['40%', 'Support deflection', 'navy'], ['4.5★', 'User satisfaction', 'accent'], ['<2s', 'Response time', 'blue'], ['8 wks', 'To live chatbot', 'teal']],
    capabilities: [
      ['fa-comments', 'AI Chatbots', 'Web and in-app assistants with rich UI components and quick replies.', 'from-[#10A5F5] to-[#10A5F5]'],
      ['fa-microphone', 'Voice Assistants', 'IVR replacement and voice-enabled apps with speech-to-text and TTS.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-brain', 'NLU Engine', 'Custom intent models trained on your conversation data.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-database', 'Knowledge Integration', 'RAG-powered answers from FAQs, manuals, and internal wikis.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-user-group', 'Agent Handoff', 'Warm transfer to live agents with full conversation context.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-chart-simple', 'Conversation Analytics', 'Intent trends, drop-off points, and CSAT measurement.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-cart-shopping', 'eCommerce', 'Order tracking, product Q&A, and returns assistance.', 'teal'],
      ['fa-hospital', 'Healthcare', 'Appointment scheduling and patient FAQ with HIPAA controls.', 'blue'],
      ['fa-plane', 'Travel', 'Booking changes, itinerary help, and loyalty program support.', 'purple'],
      ['fa-building', 'B2B SaaS', 'In-app support, onboarding guides, and feature discovery.', 'orange'],
    ],
    tech: ['Dialogflow', 'Rasa', 'OpenAI', 'Azure Bot Service', 'Twilio', 'LangChain', 'Node.js', 'Python', 'WebSocket'],
    benefits: [
      ['fa-headset', 'Support scale', 'Handle more inquiries without growing headcount.'],
      ['fa-face-smile', 'Experience', 'Instant, accurate answers customers appreciate.'],
      ['fa-clock', 'Always on', '24/7 availability across every channel.'],
      ['fa-coins', 'Cost down', 'Lower cost per support interaction.'],
    ],
    ctaTitle: 'Ready for Smarter Conversations?',
    ctaSub: 'Get a conversational AI demo built on your FAQ and sample dialogues.',
  },
  {
    slug: 'machine-learning',
    file: 'machine-learning.html',
    title: 'Machine Learning Solutions',
    badge: 'Machine Learning',
    breadcrumb: 'Machine Learning Solutions',
    accent: '#2563EB',
    layout: 'layout-chart-analytics',
    dataLayout: 'machine-learning',
    dataService: 'machine-learning',
    heroStyle: 'dark',
    headline: 'Machine Learning Models That',
    headlineAccent: 'Predict, Classify & Optimize',
    subtitle: 'Custom ML solutions for forecasting, classification, recommendation, and anomaly detection — engineered with rigorous validation and production-grade MLOps.',
    heroVisual: 'metrics',
    trust: [
      ['fa-flask', 'Rigorous validation', 'Cross-val & holdout testing'],
      ['fa-eye', 'Explainable', 'SHAP, LIME & feature importance'],
      ['fa-arrows-spin', 'MLOps ready', 'Automated retraining pipelines'],
      ['fa-database', 'Data-first', 'Feature engineering expertise'],
    ],
    overviewTitle: 'ML Built on Solid Data Science Foundations',
    overview: 'Successful machine learning starts with clean data, sound methodology, and clear success metrics. We deliver models that generalize to production — not just perform on training sets.',
    overviewBullets: ['Feature engineering and data pipeline design', 'Model selection, hyperparameter tuning, and ensemble methods', 'Explainability reports for stakeholder trust and compliance'],
    stats: [['92%', 'Model accuracy avg.', 'navy'], ['-30%', 'Forecast error', 'accent'], ['100%', 'Reproducible', 'blue'], ['10 wks', 'Typical delivery', 'teal']],
    capabilities: [
      ['fa-chart-line', 'Predictive Modeling', 'Regression, time series, and survival analysis for business forecasting.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-tags', 'Classification', 'Binary and multi-class models for fraud, churn, and categorization.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-thumbs-up', 'Recommendation Engines', 'Collaborative filtering and content-based personalization systems.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-triangle-exclamation', 'Anomaly Detection', 'Unsupervised models for fraud, defects, and system monitoring.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-wand-magic-sparkles', 'Feature Engineering', 'Automated and domain-expert feature creation for model performance.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-server', 'Model Deployment', 'Batch and real-time inference on cloud, edge, and on-premise.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-credit-card', 'FinTech', 'Credit scoring, fraud detection, and transaction categorization.', 'blue'],
      ['fa-industry', 'Manufacturing', 'Quality prediction, yield optimization, and sensor analytics.', 'teal'],
      ['fa-heart-pulse', 'Healthcare', 'Risk stratification, readmission prediction, and cohort analysis.', 'purple'],
      ['fa-cart-shopping', 'Retail', 'Demand forecasting, basket analysis, and dynamic pricing.', 'orange'],
    ],
    tech: ['Python', 'scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'Spark MLlib', 'MLflow', 'Kubeflow', 'AWS SageMaker', 'Databricks'],
    benefits: [
      ['fa-bullseye', 'Accuracy', 'Models validated on real-world data.'],
      ['fa-chart-line', 'Insights', 'Turn data into actionable predictions.'],
      ['fa-shield-halved', 'Compliance', 'Explainable outputs for regulated industries.'],
      ['fa-expand', 'Scale', 'Inference that handles production traffic.'],
    ],
    ctaTitle: 'Ready to Deploy Machine Learning?',
    ctaSub: 'Start with a data assessment and model feasibility study.',
  },
  {
    slug: 'computer-vision',
    file: 'computer-vision.html',
    title: 'Computer Vision',
    badge: 'Computer Vision',
    breadcrumb: 'Computer Vision',
    accent: '#10A5F5',
    layout: 'layout-neural-ai',
    dataLayout: 'computer-vision',
    dataService: 'computer-vision',
    heroStyle: 'light',
    headline: 'See What Matters with',
    headlineAccent: 'Enterprise Computer Vision',
    subtitle: 'Image recognition, object detection, OCR, and video analytics — deployed on cloud, edge, and mobile for quality control, security, and operational automation.',
    heroVisual: 'vision',
    trust: [
      ['fa-camera', 'Multi-modal', 'Image, video & stream'],
      ['fa-microchip', 'Edge ready', 'On-device inference'],
      ['fa-gauge-high', 'Real-time', 'Sub-second detection'],
      ['fa-ruler', 'Precision', 'Custom-trained models'],
    ],
    overviewTitle: 'Visual Intelligence for Physical Operations',
    overview: 'Computer vision brings AI to the physical world — inspecting products on the line, reading documents, monitoring facilities, and enabling AR experiences. We build models optimized for your lighting, angles, and hardware constraints.',
    overviewBullets: ['Custom dataset creation, labeling, and augmentation pipelines', 'Edge deployment on NVIDIA Jetson, mobile, and embedded devices', 'Integration with MES, WMS, and security systems'],
    stats: [['99.2%', 'Detection accuracy', 'navy'], ['30 FPS', 'Real-time processing', 'accent'], ['-80%', 'Manual inspection', 'blue'], ['12 wks', 'Pilot to production', 'teal']],
    capabilities: [
      ['fa-magnifying-glass', 'Object Detection', 'Locate and classify objects in images and video streams.', 'from-[#10A5F5] to-[#10A5F5]'],
      ['fa-circle-check', 'Quality Inspection', 'Defect detection, dimension measurement, and pass/fail automation.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-file-lines', 'OCR & Document Scan', 'Extract text from IDs, forms, labels, and handwritten documents.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-video', 'Video Analytics', 'People counting, behavior analysis, and perimeter monitoring.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-face-smile', 'Facial Recognition', 'Consent-based identity verification and access control.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-vr-cardboard', 'AR Overlays', 'Visual guidance and annotation for field and factory workers.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-industry', 'Manufacturing', 'Inline defect detection and assembly verification.', 'teal'],
      ['fa-warehouse', 'Logistics', 'Barcode scanning, package dimensioning, and sortation.', 'blue'],
      ['fa-shield-halved', 'Security', 'Perimeter monitoring, access control, and anomaly alerts.', 'purple'],
      ['fa-car', 'Automotive', 'ADAS components, damage assessment, and parts recognition.', 'orange'],
    ],
    tech: ['OpenCV', 'YOLO', 'TensorFlow', 'PyTorch', 'ONNX', 'NVIDIA TensorRT', 'AWS Rekognition', 'Azure Vision', 'Edge TPU'],
    benefits: [
      ['fa-circle-check', 'Quality', 'Catch defects humans miss, consistently.'],
      ['fa-clock', 'Speed', 'Inspect at line speed without bottlenecks.'],
      ['fa-coins', 'Cost down', 'Reduce manual inspection and rework.'],
      ['fa-shield-halved', 'Safety', 'Monitor hazardous areas and compliance.'],
    ],
    ctaTitle: 'Ready to Add Visual Intelligence?',
    ctaSub: 'Send sample images and we\'ll assess feasibility and accuracy targets.',
  },
  {
    slug: 'rpa',
    file: 'rpa-development.html',
    title: 'RPA Development',
    badge: 'Robotic Process Automation',
    breadcrumb: 'RPA Development',
    accent: '#7C3AED',
    layout: 'layout-workflow-nodes',
    dataLayout: 'rpa-development',
    dataService: 'rpa',
    heroStyle: 'light',
    headline: 'Software Robots That Work',
    headlineAccent: 'While You Sleep',
    subtitle: 'UiPath, Automation Anywhere, and Power Automate bots that handle repetitive UI and data tasks across legacy and modern applications — with AI-enhanced exception handling.',
    heroVisual: 'flow',
    flowSteps: ['Record', 'Build', 'Test', 'Deploy'],
    trust: [
      ['fa-robot', 'Certified', 'UiPath & AA partners'],
      ['fa-clock', '24/7 bots', 'Unattended automation'],
      ['fa-shield-halved', 'Governed', 'Bot management & audit'],
      ['fa-brain', 'AI-enhanced', 'Intelligent exceptions'],
    ],
    overviewTitle: 'RPA That Delivers Quick, Measurable Wins',
    overview: 'RPA is the fastest path to automation ROI for rule-based processes. We identify high-volume tasks, build resilient bots, and establish a CoE so your automation program scales sustainably.',
    overviewBullets: ['Process discovery and ROI prioritization workshops', 'Attended and unattended bot development and scheduling', 'Bot monitoring, exception handling, and continuous improvement'],
    stats: [['80%', 'Manual effort cut', 'navy'], ['6 wks', 'First bot live', 'accent'], ['99%', 'Process accuracy', 'blue'], ['3x', 'ROI in year one', 'teal']],
    capabilities: [
      ['fa-desktop', 'UI Automation', 'Automate clicks, data entry, and navigation across any application.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-database', 'Data Migration', 'Extract, transform, and load data between systems automatically.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-envelope-open-text', 'Email & File Bots', 'Process inbox attachments, downloads, and scheduled file batches.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-file-invoice', 'Invoice Processing', 'RPA + OCR for accounts payable and receivable workflows.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-gauge', 'Bot Monitoring', 'Dashboards, alerts, and SLA tracking for your bot fleet.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-building', 'CoE Setup', 'Governance framework, standards, and developer training.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-receipt', 'Finance', 'Reconciliation, reporting, and journal entries.', 'purple'],
      ['fa-users-gear', 'HR', 'Employee data updates, payroll prep, and onboarding.', 'blue'],
      ['fa-headset', 'Operations', 'Ticket updates, order processing, and data sync.', 'teal'],
      ['fa-building-columns', 'Banking', 'KYC document processing and compliance reporting.', 'orange'],
    ],
    tech: ['UiPath', 'Automation Anywhere', 'Power Automate', 'Blue Prism', 'Python', 'OCR', 'SAP', 'Oracle', 'Excel'],
    benefits: [
      ['fa-clock', 'Time saved', 'Bots run 24/7 without breaks.'],
      ['fa-circle-check', 'Accuracy', 'Eliminate human data-entry errors.'],
      ['fa-coins', 'Quick ROI', 'Payback often within 6–12 months.'],
      ['fa-users', 'Empower staff', 'Free teams for higher-value work.'],
    ],
    ctaTitle: 'Ready to Deploy RPA Bots?',
    ctaSub: 'Identify your top 3 automatable processes in a free discovery workshop.',
  },
  {
    slug: 'ai-consulting',
    file: 'ai-consulting.html',
    title: 'AI Consulting',
    badge: 'AI Strategy & Advisory',
    breadcrumb: 'AI Consulting',
    accent: '#123D6A',
    layout: 'layout-corporate-timeline',
    dataLayout: 'ai-consulting',
    dataService: 'ai-consulting',
    heroStyle: 'light',
    headline: 'AI Strategy That Turns Ambition into',
    headlineAccent: 'Actionable Roadmaps',
    subtitle: 'Vendor-neutral AI consulting from use-case discovery and feasibility assessment to architecture design, ethics review, and build-vs-buy guidance — backed by hands-on engineering depth.',
    heroVisual: 'cards',
    heroCards: [
      { icon: 'fa-compass', label: 'Strategy', sub: 'Use-case prioritization', grad: 'from-[#123D6A] to-[#2563EB]' },
      { icon: 'fa-sitemap', label: 'Architecture', sub: 'Platform & stack design', grad: 'from-[#2563EB] to-[#10A5F5]' },
      { icon: 'fa-scale-balanced', label: 'Ethics', sub: 'Responsible AI review', grad: 'from-[#10A5F5] to-[#22C55E]' },
      { icon: 'fa-rocket', label: 'Delivery', sub: 'POC to production', grad: 'from-[#7C3AED] to-[#2563EB]' },
    ],
    trust: [
      ['fa-handshake', 'Vendor-neutral', 'Your interests first'],
      ['fa-user-tie', 'Senior-led', 'Practitioners, not generalists'],
      ['fa-chart-simple', 'ROI-focused', 'Business case driven'],
      ['fa-globe', 'Global', 'Onshore & offshore teams'],
    ],
    overviewTitle: 'Consultants Who Ship, Not Just Slide',
    overview: 'AI strategy fails when it stays in the boardroom. Our consultants combine executive advisory with engineering execution — so recommendations become working systems with measurable outcomes.',
    overviewBullets: ['AI readiness assessment and maturity scoring', 'Use-case portfolio prioritization by ROI and feasibility', 'Responsible AI frameworks and governance design'],
    stats: [['200+', 'AI engagements', 'navy'], ['4 wks', 'To roadmap', 'accent'], ['15+', 'Industries', 'blue'], ['100%', 'Senior teams', 'teal']],
    capabilities: [
      ['fa-lightbulb', 'AI Strategy', 'Vision, operating model, and investment roadmap aligned to business goals.', 'from-[#123D6A] to-[#2563EB]'],
      ['fa-magnifying-glass-chart', 'Feasibility Assessment', 'Data, technical, and organizational readiness for each use case.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-sitemap', 'Solution Architecture', 'Model selection, infrastructure, and integration blueprints.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-scale-balanced', 'Responsible AI', 'Bias testing, explainability, and regulatory compliance guidance.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-coins', 'Build vs. Buy', 'Vendor evaluation and total cost of ownership analysis.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-chalkboard-user', 'AI Literacy', 'Executive workshops and team enablement programs.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-building', 'Enterprise', 'Cross-functional AI transformation at scale.', 'navy'],
      ['fa-rocket', 'Startups', 'AI product strategy and technical due diligence.', 'blue'],
      ['fa-handshake-angle', 'Private Equity', 'Portfolio AI value creation and assessment.', 'teal'],
      ['fa-landmark', 'Public Sector', 'Citizen services and responsible AI deployment.', 'purple'],
    ],
    tech: ['TOGAF', 'NIST AI RMF', 'ISO 42001', 'OpenAI', 'Azure AI', 'AWS', 'MLflow', 'Responsible AI Toolkits'],
    benefits: [
      ['fa-bullseye', 'Clarity', 'Confident, prioritized AI investment plan.'],
      ['fa-shield-halved', 'Lower risk', 'Avoid costly architecture mistakes.'],
      ['fa-gauge-high', 'Speed', 'Accelerate from idea to validated POC.'],
      ['fa-coins', 'ROI', 'Focus budget on highest-impact use cases.'],
    ],
    ctaTitle: 'Need Expert AI Guidance?',
    ctaSub: 'Book a consultation with a senior AI advisor on your toughest decisions.',
  },
  {
    slug: 'ai-integration',
    file: 'ai-integration.html',
    title: 'AI Integration',
    badge: 'AI Integration Services',
    breadcrumb: 'AI Integration',
    accent: '#2563EB',
    layout: 'layout-cloud-float',
    dataLayout: 'ai-integration',
    dataService: 'ai-integration',
    heroStyle: 'light',
    headline: 'Embed AI Seamlessly Into',
    headlineAccent: 'Your Existing Systems',
    subtitle: 'Connect LLMs, ML models, and AI services to ERP, CRM, data warehouses, and custom apps — with secure APIs, event-driven pipelines, and minimal disruption to current workflows.',
    heroVisual: 'integration',
    trust: [
      ['fa-plug', 'API-first', 'REST, GraphQL & gRPC'],
      ['fa-lock', 'Secure', 'Auth, encryption & audit'],
      ['fa-arrows-spin', 'Event-driven', 'Real-time AI triggers'],
      ['fa-puzzle-piece', 'Modular', 'Swap models without rebuild'],
    ],
    overviewTitle: 'AI That Works Inside Your Stack',
    overview: 'The best AI is invisible — embedded where users already work. We integrate models and AI services into your existing applications, portals, and batch processes without rip-and-replace.',
    overviewBullets: ['API gateway and middleware for model serving', 'CRM, ERP, and ServiceNow AI plugin development', 'Real-time and batch inference pipeline design'],
    stats: [['50+', 'Integrations delivered', 'navy'], ['<100ms', 'API latency p95', 'accent'], ['99.9%', 'Uptime SLA', 'blue'], ['6 wks', 'Typical integration', 'teal']],
    capabilities: [
      ['fa-plug', 'API Development', 'Secure, versioned APIs wrapping models for any consumer application.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-cubes', 'Microservices', 'Containerized AI services with autoscaling and health checks.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-bolt', 'Event Pipelines', 'Kafka and webhook triggers for real-time AI processing.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-window-maximize', 'UI Embedding', 'Copilot panels, smart search, and inline suggestions in existing UIs.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-database', 'Data Connectors', 'Sync models with Snowflake, Databricks, SQL Server, and SaaS APIs.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-shield-halved', 'Security Layer', 'OAuth, API keys, rate limiting, and PII masking at the boundary.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-cart-shopping', 'eCommerce', 'Product recommendations and search in storefronts.', 'blue'],
      ['fa-briefcase', 'Professional Services', 'CRM copilots and proposal generation plugins.', 'purple'],
      ['fa-industry', 'Manufacturing', 'MES integration for quality AI and predictive alerts.', 'teal'],
      ['fa-hospital', 'Healthcare', 'EHR-adjacent AI for clinical documentation support.', 'orange'],
    ],
    tech: ['FastAPI', 'Node.js', 'GraphQL', 'Kafka', 'Docker', 'Kubernetes', 'Azure API Management', 'AWS API Gateway', 'MuleSoft'],
    benefits: [
      ['fa-puzzle-piece', 'Seamless', 'AI where users already work.'],
      ['fa-bolt', 'Fast', 'Low-latency inference at the point of need.'],
      ['fa-shield-halved', 'Secure', 'Enterprise auth and data protection.'],
      ['fa-wrench', 'Maintainable', 'Swap models without rebuilding apps.'],
    ],
    ctaTitle: 'Ready to Integrate AI?',
    ctaSub: 'Map your systems and we\'ll design the integration architecture.',
  },
  {
    slug: 'enterprise-ai',
    file: 'enterprise-ai.html',
    title: 'Enterprise AI Solutions',
    badge: 'Enterprise AI',
    breadcrumb: 'Enterprise AI Solutions',
    accent: '#002080',
    layout: 'layout-institutional-banner',
    dataLayout: 'enterprise-ai',
    dataService: 'enterprise-ai',
    heroStyle: 'dark-banner',
    headline: 'Enterprise-Grade AI for',
    headlineAccent: 'Global Organizations',
    subtitle: 'Secure, scalable, and governed AI platforms deployed across business units — with centralized model management, compliance controls, and multi-tenant architecture.',
    heroVisual: 'enterprise',
    trust: [
      ['fa-building', 'Multi-BU', 'Shared AI platform'],
      ['fa-shield-halved', 'Compliant', 'SOC2, HIPAA, GDPR ready'],
      ['fa-users', 'Governed', 'RBAC & model registry'],
      ['fa-globe', 'Global', 'Multi-region deployment'],
    ],
    overviewTitle: 'AI at Enterprise Scale and Governance',
    overview: 'Enterprise AI requires more than models — it needs platform thinking. We build centralized AI capabilities with proper governance, cost controls, and reusable components that business units can adopt safely.',
    overviewBullets: ['Enterprise AI platform and model registry design', 'Multi-tenant architecture with cost allocation per BU', 'Compliance, audit trails, and responsible AI governance'],
    stats: [['Fortune 500', 'Clients served', 'navy'], ['10+', 'BUs on one platform', 'accent'], ['-40%', 'AI infra cost', 'blue'], ['99.99%', 'Platform uptime', 'teal']],
    capabilities: [
      ['fa-server', 'AI Platform', 'Centralized model serving, feature store, and experiment tracking.', 'from-[#002080] to-[#2563EB]'],
      ['fa-sitemap', 'Multi-Tenant Design', 'Isolated workloads with shared infrastructure and cost controls.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-book', 'Model Registry', 'Versioning, approval workflows, and lineage for every model.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-shield-halved', 'AI Governance', 'Policy enforcement, bias monitoring, and audit reporting.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-users-gear', 'Center of Excellence', 'Standards, templates, and enablement for internal AI teams.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-chart-pie', 'FinOps for AI', 'Token, compute, and storage cost tracking per team and project.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-building-columns', 'Financial Services', 'Regulated AI with full audit and explainability.', 'navy'],
      ['fa-hospital', 'Healthcare', 'HIPAA-compliant AI across clinical and admin functions.', 'teal'],
      ['fa-industry', 'Manufacturing', 'Plant-level AI on a unified corporate platform.', 'blue'],
      ['fa-store', 'Retail', 'Omnichannel AI with centralized personalization engine.', 'purple'],
    ],
    tech: ['Azure AI Foundry', 'AWS SageMaker', 'Databricks', 'MLflow', 'Kubeflow', 'Terraform', 'Kubernetes', 'Snowflake'],
    benefits: [
      ['fa-building', 'Scale', 'One platform, many business units.'],
      ['fa-shield-halved', 'Governance', 'Compliance built into every deployment.'],
      ['fa-coins', 'Efficiency', 'Shared infra lowers per-project cost.'],
      ['fa-bolt', 'Speed', 'Reusable components accelerate new use cases.'],
    ],
    ctaTitle: 'Ready for Enterprise AI?',
    ctaSub: 'Get an enterprise AI platform assessment and governance framework review.',
  },
  {
    slug: 'ai-product-engineering',
    file: 'ai-product-engineering.html',
    title: 'AI Product Engineering',
    badge: 'AI Product Engineering',
    breadcrumb: 'AI Product Engineering',
    accent: '#7C3AED',
    layout: 'layout-dashboard-saas',
    dataLayout: 'ai-product-engineering',
    dataService: 'ai-product-engineering',
    heroStyle: 'dark',
    headline: 'Engineer AI-Native Products',
    headlineAccent: 'Users Love to Use',
    subtitle: 'Full-stack AI product development — from UX and model integration to scalable backend, billing, and analytics — for startups and enterprises launching AI-first SaaS.',
    heroVisual: 'product',
    trust: [
      ['fa-layer-group', 'Full-stack', 'UI to model serving'],
      ['fa-rocket', 'MVP fast', '8-week launch cycles'],
      ['fa-chart-line', 'Metrics', 'Usage & quality dashboards'],
      ['fa-expand', 'Scale-ready', 'Multi-tenant from day one'],
    ],
    overviewTitle: 'From AI Idea to Shippable Product',
    overview: 'AI products need product thinking, not just model accuracy. We engineer complete AI-native applications with polished UX, reliable inference, subscription billing, and the observability to iterate fast.',
    overviewBullets: ['AI-first UX design with streaming responses and feedback loops', 'Scalable inference architecture with cost optimization', 'Product analytics, A/B testing, and quality monitoring'],
    stats: [['30+', 'AI products shipped', 'navy'], ['8 wks', 'Avg MVP timeline', 'accent'], ['4.8★', 'User ratings', 'blue'], ['10M+', 'API calls/mo', 'teal']],
    capabilities: [
      ['fa-palette', 'AI UX Design', 'Copilot interfaces, chat UX, and progressive disclosure patterns.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-code', 'Full-Stack Build', 'React/Next.js frontends with Python/Node AI backends.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-bolt', 'Inference Layer', 'Low-latency model serving with caching and fallbacks.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-credit-card', 'SaaS Billing', 'Usage-based and subscription billing with Stripe integration.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-chart-simple', 'Product Analytics', 'Feature usage, model quality, and retention tracking.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-vial', 'Experimentation', 'A/B tests for prompts, models, and UI variants.', 'from-[#10A5F5] to-[#3B82F6]'],
    ],
    industries: [
      ['fa-laptop-code', 'SaaS Startups', 'AI-native MVPs and investor-ready demos.', 'purple'],
      ['fa-building', 'Enterprise', 'Internal AI tools productized for employee adoption.', 'blue'],
      ['fa-graduation-cap', 'EdTech', 'Adaptive learning and AI tutor products.', 'teal'],
      ['fa-briefcase', 'LegalTech', 'Contract analysis and research copilot products.', 'orange'],
    ],
    tech: ['Next.js', 'React', 'Python', 'FastAPI', 'OpenAI', 'Stripe', 'PostgreSQL', 'Redis', 'Vercel', 'AWS'],
    benefits: [
      ['fa-rocket', 'Speed', 'Launch AI products in weeks, not quarters.'],
      ['fa-face-smile', 'Adoption', 'UX that drives daily active usage.'],
      ['fa-coins', 'Revenue', 'Monetization built in from the start.'],
      ['fa-expand', 'Scale', 'Architecture ready for growth.'],
    ],
    ctaTitle: 'Ready to Build Your AI Product?',
    ctaSub: 'From concept to MVP — let\'s scope your AI-native product roadmap.',
  },
  {
    slug: 'llm',
    file: 'llm-development.html',
    title: 'LLM Development',
    badge: 'Large Language Models',
    breadcrumb: 'LLM Development',
    accent: '#6366F1',
    layout: 'layout-neural-ai',
    dataLayout: 'llm-development',
    dataService: 'llm',
    heroStyle: 'dark',
    headline: 'Custom LLM Solutions for',
    headlineAccent: 'Domain-Specific Intelligence',
    subtitle: 'Fine-tune, deploy, and optimize large language models — GPT, Claude, Llama, Mistral — with private hosting, prompt systems, and evaluation frameworks tuned to your industry.',
    heroVisual: 'llm',
    trust: [
      ['fa-lock', 'Private deploy', 'On-prem & VPC options'],
      ['fa-microchip', 'Fine-tuned', 'Domain adaptation'],
      ['fa-gauge-high', 'Optimized', 'Latency & cost tuned'],
      ['fa-vial', 'Evaluated', 'Benchmark harnesses'],
    ],
    overviewTitle: 'LLMs Engineered for Your Domain',
    overview: 'Off-the-shelf LLMs are powerful but generic. We fine-tune, prompt-engineer, and deploy models that understand your terminology, policies, and workflows — with rigorous evaluation before production.',
    overviewBullets: ['Model selection guide: closed vs. open-weight vs. fine-tuned', 'Fine-tuning on proprietary data with privacy safeguards', 'Comprehensive eval suites for accuracy, safety, and latency'],
    stats: [['40%', 'Better domain accuracy', 'navy'], ['-60%', 'Token cost', 'accent'], ['<500ms', 'P95 latency', 'blue'], ['10 wks', 'Fine-tune to prod', 'teal']],
    capabilities: [
      ['fa-microchip', 'Fine-Tuning', 'LoRA, QLoRA, and full fine-tuning on domain-specific datasets.', 'from-[#6366F1] to-[#2563EB]'],
      ['fa-server', 'Private Deployment', 'vLLM, TGI, and Ollama on your VPC or on-premise infrastructure.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-sliders', 'Prompt Systems', 'Versioned prompt libraries with A/B testing and rollback.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-vial', 'Evaluation Frameworks', 'Automated benchmarks for accuracy, hallucination, and toxicity.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-compress', 'Model Optimization', 'Quantization, distillation, and caching for cost and speed.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-shield-halved', 'Safety Alignment', 'RLHF, constitutional AI, and output filtering pipelines.', 'from-[#6366F1] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-scale-balanced', 'Legal', 'Contract analysis models trained on legal corpora.', 'indigo'],
      ['fa-stethoscope', 'Healthcare', 'Clinical documentation models with HIPAA compliance.', 'teal'],
      ['fa-industry', 'Manufacturing', 'Technical manual and SOP understanding models.', 'blue'],
      ['fa-landmark', 'Government', 'Policy and citizen-service language models.', 'purple'],
    ],
    tech: ['GPT-4o', 'Claude 3', 'Llama 3', 'Mistral', 'vLLM', 'Hugging Face', 'LoRA', 'LangChain', 'Weights & Biases', 'Python'],
    benefits: [
      ['fa-bullseye', 'Accuracy', 'Models that speak your domain fluently.'],
      ['fa-lock', 'Privacy', 'Keep sensitive data on your infrastructure.'],
      ['fa-coins', 'Cost', 'Optimized inference reduces token spend.'],
      ['fa-shield-halved', 'Safety', 'Aligned outputs with guardrails.'],
    ],
    ctaTitle: 'Ready to Deploy Custom LLMs?',
    ctaSub: 'Get an LLM readiness assessment and fine-tuning feasibility review.',
  },
  {
    slug: 'rag',
    file: 'rag-development.html',
    title: 'RAG Development',
    badge: 'Retrieval-Augmented Generation',
    breadcrumb: 'RAG Development',
    accent: '#10A5F5',
    layout: 'layout-data-streams',
    dataLayout: 'rag-development',
    dataService: 'rag',
    heroStyle: 'dark',
    headline: 'Ground AI Answers in',
    headlineAccent: 'Your Trusted Knowledge',
    subtitle: 'RAG pipelines that connect LLMs to your documents, databases, and wikis — delivering accurate, cited responses instead of hallucinations.',
    heroVisual: 'rag',
    trust: [
      ['fa-book', 'Cited answers', 'Source attribution'],
      ['fa-database', 'Any source', 'Docs, DBs & APIs'],
      ['fa-arrows-rotate', 'Fresh', 'Auto-sync knowledge'],
      ['fa-shield-halved', 'Secure', 'Access-controlled retrieval'],
    ],
    overviewTitle: 'Accurate AI Powered by Your Data',
    overview: 'RAG is the enterprise standard for knowledge-grounded AI. We build ingestion pipelines, vector stores, retrieval strategies, and generation layers that give users trustworthy answers with source citations.',
    overviewBullets: ['Multi-format document ingestion with chunking and embedding strategies', 'Hybrid search combining semantic and keyword retrieval', 'Citation, confidence scoring, and "I don\'t know" fallbacks'],
    stats: [['95%', 'Answer accuracy', 'navy'], ['-80%', 'Hallucinations', 'accent'], ['<3s', 'Query response', 'blue'], ['6 wks', 'To live RAG bot', 'teal']],
    capabilities: [
      ['fa-file-import', 'Document Ingestion', 'PDF, Word, HTML, Confluence, SharePoint, and API sources.', 'from-[#10A5F5] to-[#10A5F5]'],
      ['fa-vector-square', 'Vector Stores', 'Pinecone, Weaviate, pgvector, and Azure AI Search setup.', 'from-[#2563EB] to-[#10A5F5]'],
      ['fa-magnifying-glass', 'Hybrid Retrieval', 'Semantic + BM25 search with reranking for best results.', 'from-[#7C3AED] to-[#2563EB]'],
      ['fa-link', 'Citation Engine', 'Inline source links and confidence scores on every answer.', 'from-[#10A5F5] to-[#22C55E]'],
      ['fa-arrows-rotate', 'Knowledge Sync', 'Scheduled re-indexing when source documents change.', 'from-[#EA580C] to-[#F59E0B]'],
      ['fa-user-shield', 'Access Control', 'Row-level security so users only retrieve authorized content.', 'from-[#2563EB] to-[#10A5F5]'],
    ],
    industries: [
      ['fa-building', 'Enterprise', 'Internal knowledge bases and policy Q&A.', 'teal'],
      ['fa-headset', 'Support', 'Customer-facing help bots grounded in product docs.', 'blue'],
      ['fa-scale-balanced', 'Legal', 'Case law and contract research assistants.', 'purple'],
      ['fa-graduation-cap', 'Education', 'Course material and research paper Q&A systems.', 'orange'],
    ],
    tech: ['LangChain', 'LlamaIndex', 'OpenAI', 'Pinecone', 'Weaviate', 'pgvector', 'Cohere Rerank', 'Python', 'FastAPI', 'Azure AI Search'],
    benefits: [
      ['fa-circle-check', 'Accuracy', 'Answers grounded in your actual data.'],
      ['fa-shield-halved', 'Trust', 'Citations build user confidence.'],
      ['fa-lock', 'Security', 'Retrieval respects access permissions.'],
      ['fa-arrows-rotate', 'Freshness', 'Knowledge stays current automatically.'],
    ],
    ctaTitle: 'Ready to Build RAG Systems?',
    ctaSub: 'Send sample documents and we\'ll prototype a knowledge-grounded assistant.',
  },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function statColor(type, accent) {
  if (type === 'navy') return 'sp-card-navy';
  if (type === 'accent') return `text-[${accent}]`;
  if (type === 'blue') return 'text-[#2563EB]';
  return 'text-[#10A5F5]';
}

function heroSection(p) {
  const bc = `<nav class="text-sm text-slate-500 mb-8 sp-reveal" aria-label="Breadcrumb">
    <a href="../../index.html" class="hover:text-[#002080]">Home</a><span class="mx-2">/</span><span>Services</span><span class="mx-2">/</span><span class="font-medium" style="color:${p.accent}">${esc(p.breadcrumb)}</span>
  </nav>`;

  const ctas = `<div class="flex flex-wrap gap-3 sp-reveal sp-d2">
    <a href="../contact.html" class="sp-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">Get Started <i class="fas fa-arrow-right"></i></a>
    <a href="../contact.html" class="sp-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-sm">Talk to Experts</a>
  </div>`;

  if (p.heroStyle === 'dark' || p.heroStyle === 'dark-banner') {
    const bcDark = bc.replace('text-slate-500', 'text-white/60').replace('hover:text-[#002080]', 'hover:text-white');
    return `<section class="pt-28 pb-20 relative overflow-hidden" style="background:linear-gradient(150deg,#002080 0%,#1E1B4B 55%,${p.accent}22 100%);color:#fff;">
      <div class="max-w-7xl mx-auto px-4">
        ${bcDark}
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="sp-badge bg-white/10 mb-6 sp-reveal" style="color:${p.accent}">${esc(p.badge)}</span>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} <span style="color:${p.accent}">${esc(p.headlineAccent)}</span></h1>
          <p class="text-white/70 text-lg mb-8 sp-reveal sp-d1">${esc(p.subtitle)}</p>
          <div class="flex flex-wrap justify-center gap-3 sp-reveal sp-d2">
            <a href="../contact.html" class="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl hover:shadow-xl transition-all text-sm" style="background:${p.accent};color:#fff">Get Started <i class="fas fa-arrow-right"></i></a>
            <a href="../contact.html" class="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm">Talk to Experts</a>
          </div>
        </div>
        ${heroVisual(p, true)}
      </div>
    </section>`;
  }

  if (p.heroVisual === 'cards' && p.heroCards) {
    const cards = p.heroCards.map((c, i) => {
      const mt = i % 2 === 1 ? ' mt-6' : '';
      return `<div class="sp-card p-6${mt}"><div class="w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} text-white grid place-items-center mb-3"><i class="fas ${c.icon}"></i></div><p class="font-bold">${esc(c.label)}</p><p class="text-xs text-slate-500 mt-1">${esc(c.sub)}</p></div>`;
    }).join('');
    return `<section class="pt-28 pb-20 bg-gradient-to-b from-[#F3F6FB] to-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <div>${bc}
          <span class="sp-badge mb-6 sp-reveal" style="background:${p.accent}18;color:${p.accent}">${esc(p.badge)}</span>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} <span class="sp-gradient-text">${esc(p.headlineAccent)}</span></h1>
          <p class="text-slate-600 text-lg mb-8 sp-reveal sp-d1">${esc(p.subtitle)}</p>
          ${ctas}
        </div>
        <div class="grid grid-cols-2 gap-4 sp-reveal-right">${cards}</div>
      </div>
    </section>`;
  }

  if (p.heroVisual === 'flow' && p.flowSteps) {
    const steps = p.flowSteps.map((s, i) => {
      const border = i === p.flowSteps.length - 1 ? ' border-2 border-[#002080]' : '';
      return `<div class="sp-card px-6 py-5 text-center min-w-[110px]${border}"><p class="font-bold text-sm">${esc(s)}</p></div>${i < p.flowSteps.length - 1 ? '<i class="fas fa-arrow-right hidden sm:block" style="color:' + p.accent + '"></i>' : ''}`;
    }).join('');
    return `<section class="pt-28 pb-20 bg-gradient-to-b from-[#F3F6FB] to-white">
      <div class="max-w-7xl mx-auto px-4">${bc}
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="sp-badge mb-6 sp-reveal" style="background:${p.accent}18;color:${p.accent}">${esc(p.badge)}</span>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} <span class="sp-gradient-text">${esc(p.headlineAccent)}</span></h1>
          <p class="text-slate-600 text-lg sp-reveal sp-d1">${esc(p.subtitle)}</p>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-3 sm:gap-4 sp-reveal sp-d2">${steps}</div>
        <div class="text-center mt-10 sp-reveal sp-d3"><a href="../contact.html" class="sp-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">Get Started <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </section>`;
  }

  if (p.heroVisual === 'chat') {
    return `<section class="pt-28 pb-20 bg-gradient-to-b from-[#F3F6FB] to-white">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">${bc}
        <div class="lg:col-span-2 grid lg:grid-cols-2 gap-14 items-center -mt-6">
          <div>
            <span class="sp-badge mb-6 sp-reveal" style="background:${p.accent}18;color:${p.accent}">${esc(p.badge)}</span>
            <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} <span class="sp-gradient-text">${esc(p.headlineAccent)}</span></h1>
            <p class="text-slate-600 text-lg mb-8 sp-reveal sp-d1">${esc(p.subtitle)}</p>
            ${ctas}
          </div>
          <div class="sp-card p-5 sp-reveal-right max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full">
            <div class="space-y-3">
              <div class="bg-[#F3F6FB] rounded-xl p-3 text-sm text-slate-600">How do I track my order?</div>
              <div class="rounded-xl p-3 text-sm text-white" style="background:${p.accent}">Your order #4821 shipped today. Expected delivery: May 31. <span class="text-xs opacity-70 block mt-1">Source: Order API</span></div>
              <div class="bg-[#F3F6FB] rounded-xl p-3 text-sm text-slate-600">Can I change the address?</div>
              <div class="rounded-xl p-3 text-sm text-white" style="background:${p.accent}">Yes — I can update it before 6 PM today. What's the new address?</div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  // default centered
  return `<section class="pt-28 pb-20 bg-gradient-to-b from-[#F3F6FB] to-white">
    <div class="max-w-7xl mx-auto px-4">${bc}
      <div class="text-center max-w-3xl mx-auto">
        <span class="sp-badge mb-6 sp-reveal" style="background:${p.accent}18;color:${p.accent}">${esc(p.badge)}</span>
        <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight sp-reveal">${esc(p.headline)} <span class="sp-gradient-text">${esc(p.headlineAccent)}</span></h1>
        <p class="text-slate-600 text-lg mb-8 sp-reveal sp-d1">${esc(p.subtitle)}</p>
        <div class="flex flex-wrap justify-center gap-3 sp-reveal sp-d2">
          <a href="../contact.html" class="sp-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">Get Started <i class="fas fa-arrow-right"></i></a>
          <a href="../contact.html" class="sp-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-sm">Talk to Experts</a>
        </div>
      </div>
    </div>
  </section>`;
}

function heroVisual(p, dark) {
  if (p.heroVisual === 'flow' && p.flowSteps) {
    return `<div class="flex flex-wrap justify-center items-center gap-3 sp-reveal sp-d3">${p.flowSteps.map((s, i) =>
      `<div class="bg-white/10 backdrop-blur border ${i === p.flowSteps.length - 1 ? 'border-cyan' : 'border-white/15'} rounded-xl px-5 py-4 text-center min-w-[100px]"><p class="text-xs font-semibold">${esc(s)}</p></div>${i < p.flowSteps.length - 1 ? '<i class="fas fa-arrow-right text-cyan hidden sm:block"></i>' : ''}`
    ).join('')}</div>`;
  }
  if (p.heroVisual === 'rag') {
    return `<div class="flex flex-wrap justify-center items-center gap-3 sp-reveal sp-d3">
      <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-4 text-center"><i class="fas fa-file-pdf text-cyan mb-2"></i><p class="text-xs">Ingest</p></div>
      <i class="fas fa-arrow-right text-cyan hidden sm:block"></i>
      <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-4 text-center"><i class="fas fa-vector-square text-cyan mb-2"></i><p class="text-xs">Embed</p></div>
      <i class="fas fa-arrow-right text-cyan hidden sm:block"></i>
      <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-4 text-center"><i class="fas fa-magnifying-glass text-cyan mb-2"></i><p class="text-xs">Retrieve</p></div>
      <i class="fas fa-arrow-right text-cyan hidden sm:block"></i>
      <div class="bg-white/10 backdrop-blur border border-cyan rounded-xl px-5 py-4 text-center"><i class="fas fa-wand-magic-sparkles text-cyan mb-2"></i><p class="text-xs">Generate</p></div>
    </div>`;
  }
  return '';
}

function buildPage(p) {
  const trustHtml = p.trust.map((t, i) =>
    `<div class="sp-trust-item sp-reveal${i ? ` sp-d${i}` : ''}"><div class="sp-trust-icon"><i class="fas ${t[0]}"></i></div><p class="text-sm font-semibold text-slate-800">${esc(t[1])}</p><p class="text-xs text-slate-500 mt-1">${esc(t[2])}</p></div>`
  ).join('');

  const statsHtml = p.stats.map(([val, label, type], i) => {
    if (type === 'navy') return `<div class="sp-card-navy p-6 sp-reveal sp-d${i + 1}"><p class="text-3xl font-bold">${esc(val)}</p><p class="text-white/60 text-sm mt-2">${esc(label)}</p></div>`;
    const cls = type === 'accent' ? `text-3xl font-bold` : `text-3xl font-bold ${statColor(type, p.accent)}`;
    const style = type === 'accent' ? ` style="color:${p.accent}"` : '';
    return `<div class="sp-card p-6 sp-reveal sp-d${i + 1}"><p class="${cls}"${style}>${esc(val)}</p><p class="text-slate-500 text-sm mt-2">${esc(label)}</p></div>`;
  }).join('');

  const capsHtml = p.capabilities.map(([icon, title, desc, grad], i) =>
    `<div class="sp-card p-7 sp-reveal sp-d${(i % 3) + 1}"><div class="w-12 h-12 rounded-xl bg-gradient-to-br ${grad} text-white grid place-items-center mb-4"><i class="fas ${icon}"></i></div><h3 class="font-bold text-lg mb-2">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');

  const indHtml = p.industries.map(([icon, title, desc], i) =>
    `<div class="sp-card p-6 sp-reveal sp-d${i + 1}"><i class="fas ${icon} text-2xl mb-3" style="color:${p.accent}"></i><h3 class="font-bold mb-1">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');

  const techHtml = p.tech.map(t => `<span class="sp-chip">${esc(t)}</span>`).join('');
  const benHtml = p.benefits.map(([icon, title, desc], i) =>
    `<div class="sp-card p-6 text-center sp-reveal sp-d${i + 1}"><div class="sp-icon-ring mx-auto mb-4"><i class="fas ${icon}" style="color:${p.accent}"></i></div><h3 class="font-bold mb-1">${esc(title)}</h3><p class="text-slate-500 text-sm">${esc(desc)}</p></div>`
  ).join('');

  const bullets = p.overviewBullets.map(b =>
    `<li class="flex items-start gap-3"><i class="fas fa-circle-check mt-1" style="color:${p.accent}"></i><span class="text-slate-600">${esc(b)}</span></li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSiteMetaBlock({ homeHref: '../../index.html', aboutHref: '../about.html' })}
  <meta name="description" content="${esc(p.subtitle)} — ${esc(p.title)} by Guudle IT Solutions.">
  <title>${esc(p.title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>tailwind.config={theme:{extend:{colors:{navy:'#002080','deep-blue':'#123D6A','royal-blue':'#2563EB',cyan:'#10A5F5','light-gray':'#F3F6FB'}}}}<\/script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-pages.css">
</head>
<body class="service-page ${p.layout} bg-white text-[#002080] antialiased" data-service="${p.dataService}" data-layout="${p.dataLayout}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">

    ${heroSection(p)}

    <section class="py-16 border-y border-slate-100 bg-[#F3F6FB]">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">${trustHtml}</div>
    </section>

    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div class="sp-reveal-left">
          <h2 class="text-3xl font-bold mb-6">${esc(p.overviewTitle)}</h2>
          <p class="text-slate-500 mb-6">${esc(p.overview)}</p>
          <ul class="space-y-3">${bullets}</ul>
        </div>
        <div class="grid grid-cols-2 gap-6 sp-reveal-right">${serviceHeroValueCards()}</div>
      </div>
    </section>

    <section class="py-24 sp-section-gray">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal">
          <h2 class="text-3xl font-bold mb-4">Core Capabilities</h2>
          <p class="text-slate-500">Engineered capabilities that deliver measurable AI outcomes.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${capsHtml}</div>
      </div>
    </section>

    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal">
          <h2 class="text-3xl font-bold mb-4">Industry Applications</h2>
          <p class="text-slate-500">Real-world AI impact across sectors.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">${indHtml}</div>
      </div>
    </section>

    <section class="py-24 sp-section-gray">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4 sp-reveal">Technology Stack</h2>
        <p class="text-slate-500 mb-10 sp-reveal sp-d1">Frameworks, models, and platforms we build with.</p>
        <div class="flex flex-wrap justify-center gap-3 sp-reveal sp-d2">${techHtml}</div>
      </div>
    </section>

    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 sp-reveal">
          <h2 class="text-3xl font-bold mb-4">Business Outcomes</h2>
          <p class="text-slate-500">Results that justify AI investment.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">${benHtml}</div>
      </div>
    </section>

    <section class="py-24 sp-section-navy">
      <div class="max-w-4xl mx-auto px-4 text-center sp-reveal">
        <h2 class="text-3xl font-bold mb-4">${esc(p.ctaTitle)}</h2>
        <p class="text-white/60 mb-8">${esc(p.ctaSub)}</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a href="../contact.html" class="inline-flex px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-xl hover:shadow-xl transition-all text-sm">Contact Us</a>
          <a href="../contact.html" class="inline-flex px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm">Request Demo</a>
        </div>
      </div>
    </section>
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-data.js"><\/script>
  <script src="../../assets/js/mega-menu-render.js"><\/script>
  <script src="../../assets/js/components.js"><\/script>
  <script src="../../assets/js/main.js"><\/script>
  <script src="../../assets/js/service-pages.js"><\/script>
</body>
</html>`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const p of PAGES) {
  const outPath = path.join(OUT, p.file);
  fs.writeFileSync(outPath, buildPage(p), 'utf8');
  console.log(`✓ ${p.file}`);
}
console.log(`\nGenerated ${PAGES.length} AI service pages.`);
