import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const aiSection = `    <!-- AI Services Section — clean redesign -->
    <section class="ai-section-redesign py-24 lg:py-28 bg-[#0B1F3A]" id="ai-services-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                <span class="ai-section-badge"><i class="fas fa-brain"></i> Artificial Intelligence Services</span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 mb-5 leading-tight">
                    Transform Your Business with<br/>
                    <span class="text-cyan-400">AI-Powered Solutions</span>
                </h2>
                <p class="text-lg md:text-xl text-slate-300 leading-relaxed">
                    Harness artificial intelligence to automate processes, gain insights, and drive innovation across your organization.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
                <div class="space-y-5" data-aos="fade-right">
                    <article class="ai-feature-card">
                        <div class="ai-feature-icon"><i class="fas fa-robot"></i></div>
                        <div>
                            <h3>Machine Learning &amp; Deep Learning</h3>
                            <p>Predictive analytics, neural networks, and intelligent automation that learn and adapt.</p>
                        </div>
                    </article>
                    <article class="ai-feature-card">
                        <div class="ai-feature-icon"><i class="fas fa-comments"></i></div>
                        <div>
                            <h3>Natural Language Processing</h3>
                            <p>Chatbots, sentiment analysis, and language understanding for smarter customer interactions.</p>
                        </div>
                    </article>
                    <article class="ai-feature-card">
                        <div class="ai-feature-icon"><i class="fas fa-eye"></i></div>
                        <div>
                            <h3>Computer Vision</h3>
                            <p>Image recognition, object detection, and visual analytics for quality control and automation.</p>
                        </div>
                    </article>
                    <article class="ai-feature-card">
                        <div class="ai-feature-icon"><i class="fas fa-chart-line"></i></div>
                        <div>
                            <h3>Predictive Analytics</h3>
                            <p>Forecast trends, optimize operations, and make data-driven decisions with confidence.</p>
                        </div>
                    </article>
                    <div class="flex flex-col sm:flex-row gap-3 pt-2">
                        <a href="pages/services/ai.html" class="ai-btn-primary">Explore AI Services <i class="fas fa-arrow-right ml-2"></i></a>
                        <a href="pages/contact.html" class="ai-btn-outline">Get Started Today</a>
                    </div>
                </div>

                <div class="ai-visual-panel" data-aos="fade-left">
                    <div class="ai-visual-inner">
                        <i class="fas fa-brain ai-visual-icon" aria-hidden="true"></i>
                    </div>
                    <div class="ai-benefit-grid">
                        <div class="ai-benefit-pill"><i class="fas fa-bullseye"></i><span>Precision Models</span></div>
                        <div class="ai-benefit-pill"><i class="fas fa-bolt"></i><span>Rapid Processing</span></div>
                        <div class="ai-benefit-pill"><i class="fas fa-clock"></i><span>Always Available</span></div>
                    </div>
                    <div class="ai-hub-card">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="ai-feature-icon ai-feature-icon--sm"><i class="fas fa-lightbulb"></i></div>
                            <div>
                                <h4 class="text-white font-bold">AI Innovation Hub</h4>
                                <p class="text-sm text-slate-300">Tailored solutions for your business</p>
                            </div>
                        </div>
                        <a href="pages/services/ai.html" class="text-cyan-400 text-sm font-semibold inline-flex items-center gap-2 hover:text-cyan-300">Learn More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up">
                <h3 class="text-2xl md:text-3xl font-bold text-white text-center mb-8">Additional AI Capabilities</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="ai-cap-card"><i class="fas fa-cog"></i><h4>AI Automation</h4><p>Intelligent process automation</p></div>
                    <div class="ai-cap-card"><i class="fas fa-shield-alt"></i><h4>AI Security</h4><p>Fraud detection &amp; prevention</p></div>
                    <div class="ai-cap-card"><i class="fas fa-user-robot"></i><h4>AI Assistants</h4><p>Virtual assistants &amp; chatbots</p></div>
                    <div class="ai-cap-card"><i class="fas fa-search"></i><h4>AI Analytics</h4><p>Advanced data insights</p></div>
                </div>
            </div>
        </div>
    </section>`;

const aiStart = html.indexOf('    <!-- Special AI Services Section');
const aiEnd = html.indexOf('    <!-- Technology Stack Section with Tabs -->');
if (aiStart === -1 || aiEnd === -1) throw new Error('AI section markers not found');
html = html.slice(0, aiStart) + aiSection + '\n\n' + html.slice(aiEnd);

const techHeaderRe = /    <!-- Technology Stack Section with Tabs -->[\s\S]*?<!-- Enhanced Stats Icon Boxes -->[\s\S]*?<\/div>\s*\n\s*\n            <!-- Vertical Tabs Layout -->/;
const techHeaderNew = `    <!-- Technology Stack Section — plain layout -->
    <section class="tech-stack-plain py-24 bg-[#F8FAFC]" id="tech-stack-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14" data-aos="fade-up">
                <span class="tech-stack-badge"><i class="fas fa-code"></i> Our Technology Expertise</span>
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mt-6 mb-4">Technology Stack</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Modern frameworks and tools to build scalable, high-performance solutions for your business.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14" data-aos="fade-up" data-aos-delay="100">
                <div class="tech-highlight-card"><i class="fas fa-code"></i><h3>Modern Frameworks</h3><p>React, Node, cloud-native stacks</p></div>
                <div class="tech-highlight-card"><i class="fas fa-cloud"></i><h3>Cloud Ready</h3><p>AWS, Azure, and scalable infrastructure</p></div>
                <div class="tech-highlight-card"><i class="fas fa-headset"></i><h3>Expert Support</h3><p>Dedicated guidance from build to launch</p></div>
            </div>

            <!-- Vertical Tabs Layout -->`;

if (!techHeaderRe.test(html)) {
  throw new Error('Tech stack header not found');
}
html = html.replace(techHeaderRe, techHeaderNew);

fs.writeFileSync(indexPath, html);
console.log('Patched index.html AI + tech stack sections');
