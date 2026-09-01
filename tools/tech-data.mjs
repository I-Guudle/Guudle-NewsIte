/**
 * Single source of truth — technology registry & AI service catalog.
 * Imported by technology-render.mjs, ai-hub-render.mjs, and service generators.
 */

/** @typedef {{ slug: string, href: string, title: string, badge: string, icon: string, desc: string, techAnchor?: string }} AiServiceEntry */

export const AI_SERVICE_CATALOG = [
  { slug: 'ai-development', href: 'ai-development.html', title: 'AI Development', badge: 'Core AI', icon: 'fa-brain', desc: 'Production-grade ML systems, MLOps, and end-to-end AI engineering from data to deployment.', techAnchor: '#tech-ai' },
  { slug: 'generative-ai', href: 'generative-ai.html', title: 'Generative AI Development', badge: 'GenAI', icon: 'fa-wand-magic-sparkles', desc: 'LLM copilots, content engines, and governed generative AI with brand-safe guardrails.', techAnchor: '#tech-ai' },
  { slug: 'ai-agent-development', href: 'ai-agent-development.html', title: 'AI Agent Development', badge: 'Agents', icon: 'fa-robot', desc: 'Autonomous agents with tool use, planning loops, and human-in-the-loop checkpoints.', techAnchor: '#tech-ai' },
  { slug: 'ai-multi-agent-agents', href: 'ai-multi-agent-agents.html', title: 'AI Multi-Agent Systems', badge: 'Orchestration', icon: 'fa-users-gear', desc: 'Supervisor-worker topologies and specialist agent teams for complex enterprise workflows.', techAnchor: '#tech-ai' },
  { slug: 'ai-automation', href: 'ai-automation.html', title: 'AI Automation', badge: 'Automation', icon: 'fa-gears', desc: 'Intelligent process automation combining RPA, LLMs, and workflow engines.', techAnchor: '#tech-ai' },
  { slug: 'conversational-ai', href: 'conversational-ai.html', title: 'Conversational AI', badge: 'Chat & Voice', icon: 'fa-comments', desc: 'Enterprise chatbots and voice assistants with RAG grounding and seamless handoff.', techAnchor: '#tech-ai' },
  { slug: 'machine-learning', href: 'machine-learning.html', title: 'Machine Learning Solutions', badge: 'ML Engineering', icon: 'fa-chart-line', desc: 'Custom predictive models, feature stores, and production MLOps pipelines.', techAnchor: '#tech-ai' },
  { slug: 'computer-vision', href: 'computer-vision.html', title: 'Computer Vision', badge: 'Vision AI', icon: 'fa-eye', desc: 'Object detection, OCR, quality inspection, and edge-deployed vision systems.', techAnchor: '#tech-ai' },
  { slug: 'rpa-development', href: 'rpa-development.html', title: 'RPA Development', badge: 'RPA', icon: 'fa-robot', desc: 'UiPath and Power Automate bots that eliminate repetitive manual work at scale.', techAnchor: '#tech-ai' },
  { slug: 'ai-consulting', href: 'ai-consulting.html', title: 'AI Consulting', badge: 'Strategy', icon: 'fa-compass', desc: 'AI readiness assessments, use-case prioritization, and responsible adoption roadmaps.', techAnchor: '#tech-ai' },
  { slug: 'ai-integration', href: 'ai-integration.html', title: 'AI Integration', badge: 'Integration', icon: 'fa-plug', desc: 'Embed models and copilots into CRM, ERP, data platforms, and customer products.', techAnchor: '#tech-ai' },
  { slug: 'enterprise-ai', href: 'enterprise-ai.html', title: 'Enterprise AI Solutions', badge: 'Enterprise', icon: 'fa-building', desc: 'Governed AI platforms with model registry, SSO, multi-tenancy, and compliance.', techAnchor: '#tech-ai' },
  { slug: 'ai-product-engineering', href: 'ai-product-engineering.html', title: 'AI Product Engineering', badge: 'AI Products', icon: 'fa-rocket', desc: 'AI-native SaaS products from MVP to scale with billing, multi-tenancy, and growth analytics.', techAnchor: '#tech-ai' },
  { slug: 'llm-development', href: 'llm-development.html', title: 'LLM Development', badge: 'LLMs', icon: 'fa-microchip', desc: 'Fine-tuning, deployment, and governance of domain-specific large language models.', techAnchor: '#tech-ai' },
  { slug: 'rag-development', href: 'rag-development.html', title: 'RAG Development', badge: 'RAG', icon: 'fa-database', desc: 'Retrieval-augmented generation with vector search, citations, and access-controlled knowledge.', techAnchor: '#tech-ai' },
];

export const AI_FILTERS = [
  { id: 'all', label: 'All AI & ML' },
  { id: 'llm', label: 'LLMs & GenAI' },
  { id: 'agents', label: 'Agents & Automation' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'vision', label: 'Computer Vision' },
  { id: 'platform', label: 'AI Platforms' },
  { id: 'integration', label: 'Integration & APIs' },
  { id: 'data', label: 'Data & Vector' },
];

export const AI_EMERGING_TECH = [
  { icon: 'fas fa-robot', title: 'OpenAI GPT', cat: 'llm', type: 'Foundation Model', desc: 'GPT-4o and enterprise API integrations for copilots, agents, and content generation with function calling.', useCases: ['Enterprise copilots', 'Code assistants', 'Document analysis', 'Agent tool use'], tags: ['GPT-4o', 'Assistants API', 'Function calling'] },
  { icon: 'fas fa-brain', title: 'Anthropic Claude', cat: 'llm', type: 'Foundation Model', desc: 'Claude models for long-context reasoning, safe enterprise dialogue, and complex document workflows.', useCases: ['Legal review', 'Research synthesis', 'Support automation', 'Policy analysis'], tags: ['Long context', 'Constitutional AI', 'Enterprise'] },
  { icon: 'fab fa-google', title: 'Google Gemini', cat: 'llm', type: 'Foundation Model', desc: 'Multimodal Gemini models integrated with Google Cloud for text, image, and code understanding.', useCases: ['Multimodal apps', 'GCP-native AI', 'Workspace integration', 'Search augmentation'], tags: ['Multimodal', 'Vertex AI', 'Gemini Pro'] },
  { icon: 'fas fa-microchip', title: 'Meta Llama', cat: 'llm', type: 'Open-Weight LLM', desc: 'Self-hosted Llama models for private, cost-efficient inference in VPC and on-prem environments.', useCases: ['Private deployment', 'Cost optimization', 'Air-gapped systems', 'Fine-tuning base'], tags: ['Open weights', 'Self-hosted', 'Llama 3'] },
  { icon: 'fas fa-link', title: 'LangChain', cat: 'agents', type: 'AI Framework', desc: 'Composable framework for LLM chains, agents, tool calling, and retrieval pipelines in production.', useCases: ['Agent orchestration', 'RAG pipelines', 'Tool integration', 'Prompt management'], tags: ['Chains', 'Agents', 'LCEL'] },
  { icon: 'fas fa-diagram-project', title: 'LangGraph', cat: 'agents', type: 'Agent Orchestration', desc: 'Graph-based agent workflows with state management, branching, and human-in-the-loop checkpoints.', useCases: ['Multi-step agents', 'Supervisor patterns', 'Stateful workflows', 'Approval gates'], tags: ['State graphs', 'Multi-agent', 'HITL'] },
  { icon: 'fas fa-users', title: 'CrewAI', cat: 'agents', type: 'Multi-Agent', desc: 'Role-based agent teams with task delegation for research, ops, and development workflows.', useCases: ['Research pipelines', 'Content teams', 'Ops automation', 'Dev agent swarms'], tags: ['Role agents', 'Task delegation', 'Crews'] },
  { icon: 'fas fa-robot', title: 'AutoGen', cat: 'agents', type: 'Multi-Agent', desc: 'Microsoft AutoGen for conversational multi-agent systems with code execution and tool use.', useCases: ['Code generation', 'Multi-agent chat', 'Research automation', 'Azure integration'], tags: ['Microsoft', 'Code exec', 'Group chat'] },
  { icon: 'fas fa-face-smile', title: 'Hugging Face', cat: 'llm', type: 'Model Hub', desc: 'Transformers ecosystem for model hosting, fine-tuning, inference endpoints, and open-source LLMs.', useCases: ['Model hosting', 'Fine-tuning', 'Inference API', 'Open models'], tags: ['Transformers', 'Hub', 'Spaces'] },
  { icon: 'fas fa-book', title: 'LlamaIndex', cat: 'data', type: 'RAG Framework', desc: 'Data framework for connecting LLMs to private data with indexing, query engines, and agents.', useCases: ['Document Q&A', 'Knowledge bases', 'Data agents', 'Structured retrieval'], tags: ['Indexing', 'Query engines', 'Data agents'] },
  { icon: 'fas fa-cube', title: 'Pinecone', cat: 'data', type: 'Vector Database', desc: 'Managed vector database for semantic search, RAG, and real-time similarity at scale.', useCases: ['Enterprise RAG', 'Semantic search', 'Recommendations', 'Real-time retrieval'], tags: ['Vectors', 'Hybrid search', 'Managed'] },
  { icon: 'fas fa-database', title: 'Weaviate', cat: 'data', type: 'Vector Database', desc: 'Open-source vector search with hybrid filtering, multi-tenancy, and GraphQL API.', useCases: ['Self-hosted RAG', 'Hybrid search', 'Multi-tenant SaaS', 'Knowledge graphs'], tags: ['Hybrid', 'GraphQL', 'Open source'] },
  { icon: 'fas fa-project-diagram', title: 'TensorFlow', cat: 'ml', type: 'ML Framework', desc: 'Google\'s ML framework for deep learning, production serving with TF Serving, and edge deployment.', useCases: ['Custom models', 'Production serving', 'Edge ML', 'Computer vision'], tags: ['Keras', 'TF Serving', 'TFLite'] },
  { icon: 'fas fa-fire', title: 'PyTorch', cat: 'ml', type: 'ML Framework', desc: 'Research and production deep learning with dynamic graphs, TorchServe, and Hugging Face integration.', useCases: ['Research to prod', 'NLP models', 'Vision models', 'Fine-tuning'], tags: ['Dynamic graphs', 'TorchServe', 'Research'] },
  { icon: 'fas fa-chart-line', title: 'Scikit-learn', cat: 'ml', type: 'ML Library', desc: 'Classical ML algorithms for tabular data — classification, regression, clustering, and preprocessing.', useCases: ['Tabular ML', 'Churn prediction', 'Risk scoring', 'Feature engineering'], tags: ['Classical ML', 'Tabular', 'Pipelines'] },
  { icon: 'fas fa-flask', title: 'MLflow', cat: 'ml', type: 'MLOps', desc: 'Experiment tracking, model registry, and deployment lifecycle management for ML teams.', useCases: ['Experiment tracking', 'Model registry', 'Deployment', 'Reproducibility'], tags: ['Tracking', 'Registry', 'MLOps'] },
  { icon: 'fab fa-aws', title: 'AWS SageMaker', cat: 'platform', type: 'Cloud ML', desc: 'End-to-end ML platform on AWS for training, tuning, deployment, and monitoring at scale.', useCases: ['Model training', 'Managed endpoints', 'Feature store', 'Pipelines'], tags: ['AWS', 'Training', 'Endpoints'] },
  { icon: 'fab fa-microsoft', title: 'Azure OpenAI', cat: 'platform', type: 'Enterprise AI', desc: 'Private GPT deployments on Azure with enterprise security, compliance, and VNet integration.', useCases: ['Private GPT', 'Enterprise copilots', 'Compliance', 'Azure-native'], tags: ['Private', 'VNet', 'Enterprise SLA'] },
  { icon: 'fas fa-database', title: 'Databricks', cat: 'platform', type: 'Data & AI', desc: 'Lakehouse platform for data engineering, ML, and LLM fine-tuning on unified data.', useCases: ['Lakehouse ML', 'LLM fine-tuning', 'Feature engineering', 'Real-time AI'], tags: ['Spark', 'MLflow', 'Unity Catalog'] },
  { icon: 'fas fa-eye', title: 'OpenCV', cat: 'vision', type: 'Vision Library', desc: 'Computer vision library for image processing, object detection pipelines, and real-time video analytics.', useCases: ['Image processing', 'Video analytics', 'OCR prep', 'Edge vision'], tags: ['CV', 'Real-time', 'Open source'] },
  { icon: 'fas fa-crosshairs', title: 'YOLO', cat: 'vision', type: 'Object Detection', desc: 'Real-time object detection models for industrial QA, security, and autonomous perception.', useCases: ['Defect detection', 'Security cameras', 'Inventory counting', 'Autonomous systems'], tags: ['Real-time', 'Detection', 'Edge'] },
  { icon: 'fab fa-aws', title: 'AWS Rekognition', cat: 'vision', type: 'Cloud Vision', desc: 'Managed vision API for label detection, facial analysis, and content moderation.', useCases: ['Content moderation', 'Identity verification', 'Media tagging', 'Safety filters'], tags: ['Managed', 'AWS', 'API'] },
  { icon: 'fas fa-robot', title: 'UiPath', cat: 'agents', type: 'RPA Platform', desc: 'Enterprise RPA with AI document understanding, process mining, and orchestration.', useCases: ['Invoice automation', 'Data entry', 'Legacy UI automation', 'Document AI'], tags: ['RPA', 'Document AI', 'Orchestrator'] },
  { icon: 'fab fa-microsoft', title: 'Power Automate', cat: 'agents', type: 'Workflow Automation', desc: 'Microsoft low-code automation with AI Builder, Copilot, and Dynamics 365 integration.', useCases: ['Office automation', 'Approval flows', 'Dynamics integration', 'AI Builder'], tags: ['Low-code', 'Microsoft', 'Copilot'] },
  { icon: 'fab fa-google', title: 'Dialogflow', cat: 'integration', type: 'Conversational AI', desc: 'Google conversational AI platform for chatbots, voice agents, and CX automation.', useCases: ['Customer bots', 'IVR replacement', 'Omnichannel', 'Intent routing'], tags: ['CX', 'Voice', 'Google Cloud'] },
  { icon: 'fas fa-comments', title: 'Rasa', cat: 'integration', type: 'Open NLU', desc: 'Open-source conversational AI with full control over NLU, dialogue, and deployment.', useCases: ['Private chatbots', 'Regulated industries', 'Custom NLU', 'On-prem chat'], tags: ['Open source', 'NLU', 'Self-hosted'] },
  { icon: 'fas fa-phone', title: 'Twilio', cat: 'integration', type: 'Communications API', desc: 'SMS, voice, and WhatsApp APIs for omnichannel conversational AI deployments.', useCases: ['WhatsApp bots', 'SMS alerts', 'Voice IVR', 'Omnichannel CX'], tags: ['WhatsApp', 'Voice', 'SMS'] },
  { icon: 'fas fa-shield-halved', title: 'Guardrails AI', cat: 'platform', type: 'AI Safety', desc: 'Output validation, PII filtering, and policy enforcement layers for production LLM apps.', useCases: ['Content safety', 'PII redaction', 'Policy enforcement', 'Compliance'], tags: ['Safety', 'Validation', 'Governance'] },
  { icon: 'fas fa-wand-magic-sparkles', title: 'Prompt Engineering', cat: 'llm', type: 'Methodology', desc: 'System prompts, few-shot libraries, chain-of-thought, and evaluation harnesses for reliable LLM output.', useCases: ['Copilot quality', 'Brand voice', 'Evaluation', 'Cost optimization'], tags: ['Prompts', 'CoT', 'Evals'] },
  { icon: 'fas fa-vector-square', title: 'pgvector', cat: 'data', type: 'Vector Extension', desc: 'PostgreSQL vector extension for RAG without separate vector DB infrastructure.', useCases: ['Simpler RAG', 'Existing Postgres', 'Hybrid apps', 'Cost efficiency'], tags: ['Postgres', 'Vectors', 'SQL'] },
];

export const AI_TECH_PILLS = [
  ['fas fa-robot', 'OpenAI'], ['fas fa-brain', 'Anthropic Claude'], ['fab fa-google', 'Gemini'], ['fas fa-microchip', 'Llama'],
  ['fas fa-link', 'LangChain'], ['fas fa-diagram-project', 'LangGraph'], ['fas fa-face-smile', 'Hugging Face'],
  ['fas fa-project-diagram', 'TensorFlow'], ['fas fa-fire', 'PyTorch'], ['fas fa-chart-line', 'Scikit-learn'],
  ['fas fa-cube', 'Pinecone'], ['fas fa-database', 'Weaviate'], ['fas fa-user-gear', 'AI Agents'],
  ['fas fa-wand-magic-sparkles', 'Generative AI'], ['fas fa-eye', 'Computer Vision'], ['fas fa-robot', 'UiPath'],
];

/** Full-stack technology layers — links to pages/technology.html anchors (single source of truth) */
export const TECH_STACK_LAYERS = [
  { icon: 'fab fa-react', title: 'Frontend', anchor: '#tech-frontend', desc: 'React, Next.js, TypeScript, Tailwind CSS, Vue.js, and modern UI libraries.', techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
  { icon: 'fas fa-server', title: 'Backend', anchor: '#tech-backend', desc: 'Node.js, Laravel, Python, ASP.NET Core, GraphQL, and enterprise APIs.', techs: ['Node.js', 'Laravel', 'Python', 'ASP.NET', 'GraphQL'] },
  { icon: 'fas fa-mobile-screen', title: 'Mobile', anchor: '#tech-mobile', desc: 'Flutter, React Native, Swift, Kotlin, and cross-platform delivery.', techs: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'] },
  { icon: 'fas fa-robot', title: 'AI & ML', anchor: '#tech-ai', desc: 'LLMs, agents, RAG, TensorFlow, PyTorch, and enterprise AI platforms.', techs: ['OpenAI', 'LangChain', 'PyTorch', 'RAG', 'Vector DBs'] },
  { icon: 'fas fa-cloud', title: 'Cloud', anchor: '#tech-cloud', desc: 'AWS, Azure, Google Cloud, serverless, and global CDN deployment.', techs: ['AWS', 'Azure', 'GCP', 'Vercel', 'Cloudflare'] },
  { icon: 'fas fa-dharmachakra', title: 'DevOps', anchor: '#tech-devops', desc: 'Docker, Kubernetes, CI/CD, Terraform, and production observability.', techs: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'NGINX'] },
  { icon: 'fas fa-database', title: 'Databases', anchor: '#tech-database', desc: 'PostgreSQL, MongoDB, Redis, Elasticsearch, and vector stores.', techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Pinecone'] },
  { icon: 'fas fa-plug', title: 'APIs', anchor: '#tech-api', desc: 'REST, GraphQL, gRPC, WebSockets, OAuth, and third-party integrations.', techs: ['REST', 'GraphQL', 'gRPC', 'OAuth', 'Stripe API'] },
  { icon: 'fas fa-shield-halved', title: 'Security', anchor: '#tech-security', desc: 'SSL, WAF, IAM, encryption, OWASP, and enterprise compliance.', techs: ['SSL/TLS', 'OAuth2', 'WAF', 'IAM', 'OWASP'] },
  { icon: 'fas fa-code', title: 'Dev Tools', anchor: '#tech-tools', desc: 'VS Code, Git, Docker Desktop, Postman, and engineering workflow tooling.', techs: ['VS Code', 'Git', 'GitHub', 'Postman', 'npm'] },
];

export const TECH_HUB_STATS = [
  { value: '100+', label: 'Technologies' },
  { value: '10', label: 'Stack Layers' },
  { value: '50+', label: 'Frameworks' },
  { value: '24/7', label: 'Support' },
];
