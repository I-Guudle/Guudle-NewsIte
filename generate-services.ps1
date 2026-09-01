# Generate service pages for Guudle IT Solutions
$services = @{
    'website-development' = @{ title='Website Development'; subtitle='Custom, responsive, and SEO-optimized websites that drive business growth'; icon='globe'; features=@('Custom responsive design','SEO-friendly architecture','Performance optimization','CMS integration','Analytics setup','Security hardening'); benefits=@('Increase online visibility','Convert visitors to customers','Mobile-first experience','Scalable architecture'); tech=@('HTML5','Tailwind CSS','JavaScript','WordPress','Next.js') }
    'business-website' = @{ title='Business Website'; subtitle='Professional corporate websites and startup landing pages that build credibility'; icon='building'; features=@('Corporate branding','Lead generation forms','Professional design','Content strategy','Multi-page architecture','Brand consistency'); benefits=@('Establish market presence','Generate qualified leads','Build brand trust','Support sales teams'); tech=@('HTML5','Tailwind CSS','JavaScript','WordPress','Webflow') }
    'web-application' = @{ title='Web Application Development'; subtitle='Scalable SaaS platforms, custom web apps, and enterprise portals'; icon='bolt'; features=@('SaaS platform development','Custom web applications','Enterprise portals','API integration','Real-time features','Multi-tenant architecture'); benefits=@('Automate business processes','Scale with your growth','Reduce operational costs','Improve user engagement'); tech=@('JavaScript','Node.js','React','PostgreSQL','AWS') }
    'mobile-app' = @{ title='Mobile App Development'; subtitle='Cross-platform mobile applications with exceptional UI/UX'; icon='mobile'; features=@('Cross-platform development','Native performance','UI/UX design','Push notifications','Offline capabilities','App store deployment'); benefits=@('Reach mobile audiences','Enhance customer engagement','Streamline operations','Increase brand loyalty'); tech=@('React Native','Flutter','Swift','Kotlin','Firebase') }
    'ios-app' = @{ title='iOS App Development'; subtitle='Native iPhone and iPad applications built with Swift'; icon='apple'; features=@('Native Swift development','iOS design guidelines','App Store optimization','Core Data integration','Apple Pay integration','iCloud sync'); benefits=@('Premium user experience','Maximum performance','Apple ecosystem integration','Higher user retention'); tech=@('Swift','SwiftUI','UIKit','Core Data','Xcode') }
    'android-app' = @{ title='Android App Development'; subtitle='Native Android applications using Kotlin and Java'; icon='android'; features=@('Kotlin & Java development','Material Design UI','Google Play deployment','Firebase integration','Wear OS support','Android Auto'); benefits=@('Reach Android market share','Custom device features','Google services integration','Flexible deployment'); tech=@('Kotlin','Java','Jetpack Compose','Firebase','Gradle') }
    'flutter-app' = @{ title='Flutter App Development'; subtitle='Fast, beautiful cross-platform mobile apps from a single codebase'; icon='flutter'; features=@('Single codebase deployment','Custom animations','Hot reload development','Platform-specific UI','State management','Native module integration'); benefits=@('Faster time to market','Cost-effective development','Consistent cross-platform UX','Easy maintenance'); tech=@('Flutter','Dart','Firebase','Provider','Bloc') }
    'ecommerce' = @{ title='E-commerce Development'; subtitle='Online stores and marketplace solutions with secure payment integration'; icon='cart'; features=@('Online store development','Marketplace solutions','Payment gateway integration','Inventory management','Order tracking','Multi-vendor support'); benefits=@('Expand sales channels','24/7 revenue generation','Global market reach','Automated order processing'); tech=@('Shopify','WooCommerce','Magento','Stripe','PayPal') }
    'shopify' = @{ title='Shopify Development'; subtitle='Custom Shopify stores, themes, and app integrations'; icon='shop'; features=@('Shopify store setup','Custom theme development','App integration','Payment setup','Product migration','SEO optimization'); benefits=@('Quick store launch','Scalable e-commerce','Built-in security','Extensive app ecosystem'); tech=@('Shopify Liquid','Shopify API','JavaScript','GraphQL','Polaris') }
    'magento' = @{ title='Magento Development'; subtitle='Enterprise-grade Magento e-commerce solutions and optimization'; icon='store'; features=@('Enterprise Magento development','Performance optimization','Multi-store setup','B2B commerce','Custom extensions','Migration services'); benefits=@('Handle high traffic volumes','Complex catalog management','Enterprise scalability','Advanced customization'); tech=@('Magento 2','PHP','MySQL','Redis','Elasticsearch') }
    'woocommerce' = @{ title='WooCommerce Development'; subtitle='WordPress-powered e-commerce stores with full customization'; icon='plugin'; features=@('WooCommerce store setup','Custom plugin development','Theme customization','Payment integration','Shipping configuration','Product import/export'); benefits=@('WordPress flexibility','Cost-effective solution','Large plugin ecosystem','Easy content management'); tech=@('WordPress','WooCommerce','PHP','MySQL','Elementor') }
    'cms' = @{ title='CMS Development'; subtitle='Custom and headless CMS solutions for content-driven businesses'; icon='cms'; features=@('Custom CMS development','Headless CMS architecture','Content workflow','Multi-language support','Media management','Role-based access'); benefits=@('Easy content updates','Flexible content delivery','Omnichannel publishing','Reduced developer dependency'); tech=@('Strapi','Contentful','Sanity','WordPress','Custom API') }
    'wordpress' = @{ title='WordPress Development'; subtitle='Custom WordPress websites, plugins, and Elementor designs'; icon='wp'; features=@('Custom WordPress themes','Plugin development','Elementor page building','Performance optimization','Security hardening','Migration services'); benefits=@('User-friendly management','SEO-friendly structure','Extensive plugin library','Cost-effective maintenance'); tech=@('WordPress','PHP','Elementor','ACF','MySQL') }
    'wix' = @{ title='Wix Development'; subtitle='Modern Wix websites for small businesses and professionals'; icon='wix'; features=@('Wix website design','Velo custom code','E-commerce setup','Booking systems','SEO configuration','Domain & hosting setup'); benefits=@('Quick deployment','Drag-and-drop editing','Built-in hosting','Mobile responsive'); tech=@('Wix','Velo','JavaScript','Wix Stores','Wix Bookings') }
    'enterprise-solutions' = @{ title='Enterprise Solutions'; subtitle='Digital transformation, automation, and scalable infrastructure for large organizations'; icon='enterprise'; features=@('Digital transformation strategy','Enterprise automation','Scalable infrastructure','Legacy modernization','System integration','Change management'); benefits=@('Operational efficiency','Competitive advantage','Future-proof technology','Reduced technical debt'); tech=@('AWS','Azure','Microservices','Docker','Kubernetes') }
    'erp' = @{ title='ERP Solutions'; subtitle='Enterprise resource planning implementation and resource management systems'; icon='erp'; features=@('ERP implementation','Resource management','Financial modules','Supply chain integration','Custom workflows','Reporting dashboards'); benefits=@('Unified business data','Streamlined operations','Real-time insights','Improved decision making'); tech=@('SAP','Oracle','Microsoft Dynamics','Odoo','Custom ERP') }
    'crm' = @{ title='CRM Solutions'; subtitle='Customer relationship management and sales automation platforms'; icon='crm'; features=@('CRM implementation','Sales automation','Lead management','Customer analytics','Pipeline tracking','Integration services'); benefits=@('Improve customer retention','Boost sales productivity','Centralized customer data','Data-driven sales'); tech=@('Salesforce','HubSpot','Microsoft Dynamics','Zoho','Custom CRM') }
    'business-process' = @{ title='Business Process Automation'; subtitle='Workflow automation and process optimization systems'; icon='process'; features=@('Workflow automation','Process optimization','RPA integration','Document management','Approval workflows','KPI tracking'); benefits=@('Reduce manual errors','Faster processing times','Cost reduction','Improved compliance'); tech=@('Power Automate','Zapier','Custom APIs','RPA Tools','Workflow Engines') }
    'cloud-solutions' = @{ title='Cloud Solutions'; subtitle='Cloud migration, infrastructure setup, and consulting services'; icon='cloud'; features=@('Cloud migration','Infrastructure setup','Cloud consulting','Hybrid cloud','Disaster recovery','Cost optimization'); benefits=@('Scalable resources','Reduced IT costs','Enhanced security','Global availability'); tech=@('AWS','Azure','Google Cloud','Docker','Terraform') }
    'aws' = @{ title='AWS Cloud Services'; subtitle='AWS cloud architecture, DevOps, and deployment solutions'; icon='aws'; features=@('AWS architecture design','DevOps & CI/CD','Serverless solutions','EC2 & Lambda','RDS & DynamoDB','CloudWatch monitoring'); benefits=@('Industry-leading cloud platform','Pay-as-you-go pricing','Global infrastructure','Enterprise security'); tech=@('AWS EC2','Lambda','S3','RDS','CloudFormation') }
    'azure' = @{ title='Microsoft Azure Solutions'; subtitle='Enterprise cloud services on Microsoft Azure platform'; icon='azure'; features=@('Azure cloud architecture','Azure DevOps','Active Directory integration','Azure SQL','App Services','Azure AI services'); benefits=@('Microsoft ecosystem integration','Enterprise compliance','Hybrid cloud support','Global data centers'); tech=@('Azure','Azure DevOps','Power Platform','.NET','Azure SQL') }
    'saas-development' = @{ title='SaaS Development'; subtitle='Subscription-based application architecture and platform development'; icon='saas'; features=@('SaaS platform architecture','Subscription billing','Multi-tenant design','User management','Analytics dashboard','API development'); benefits=@('Recurring revenue model','Scalable user base','Lower customer acquisition cost','Continuous updates'); tech=@('Node.js','React','Stripe','PostgreSQL','AWS') }
    'analytics' = @{ title='Analytics & Business Intelligence'; subtitle='Business intelligence dashboards and reporting systems'; icon='analytics'; features=@('BI dashboard development','Reporting systems','Data warehousing','KPI tracking','Real-time analytics','Custom reports'); benefits=@('Data-driven decisions','Identify growth opportunities','Monitor performance','Predictive insights'); tech=@('Power BI','Tableau','SQL','Python','BigQuery') }
    'power-bi' = @{ title='Power BI Development'; subtitle='Microsoft Power BI dashboards and data visualization solutions'; icon='pbi'; features=@('Power BI dashboard design','Data modeling','DAX calculations','Report automation','Embedded analytics','Data gateway setup'); benefits=@('Microsoft integration','Self-service analytics','Interactive visualizations','Real-time data refresh'); tech=@('Power BI','DAX','Power Query','Azure Synapse','SQL Server') }
    'salesforce' = @{ title='Salesforce Implementation'; subtitle='Salesforce CRM implementation and automation services'; icon='sf'; features=@('Salesforce implementation','Custom object development','Workflow automation','Integration services','Lightning components','Report & dashboard setup'); benefits=@('Industry-leading CRM','Sales productivity boost','Customer 360 view','Extensive app marketplace'); tech=@('Salesforce','Apex','Lightning','Visualforce','MuleSoft') }
    'dynamics-365' = @{ title='Microsoft Dynamics 365'; subtitle='Enterprise productivity and business application integration'; icon='d365'; features=@('Dynamics 365 implementation','CRM & ERP modules','Power Platform integration','Custom workflows','Data migration','Training & support'); benefits=@('Unified Microsoft platform','Enterprise scalability','AI-powered insights','Seamless Office 365 integration'); tech=@('Dynamics 365','Power Platform','Azure','.NET','Power Apps') }
    'iot' = @{ title='Internet of Things (IoT)'; subtitle='Smart device integration, IoT dashboards, and industrial IoT solutions'; icon='iot'; features=@('Smart device integration','IoT dashboard systems','Industrial IoT','Sensor data processing','Edge computing','Remote monitoring'); benefits=@('Real-time monitoring','Predictive maintenance','Operational efficiency','Cost savings'); tech=@('AWS IoT','Azure IoT','MQTT','Node.js','Python') }
    'ai' = @{ title='Artificial Intelligence'; subtitle='AI-powered automation, machine learning, and intelligent chatbot solutions'; icon='ai'; features=@('AI-powered automation','Machine learning models','AI chatbot development','Natural language processing','Computer vision','Predictive analytics'); benefits=@('Automate complex tasks','Personalized experiences','Competitive innovation','Data-driven intelligence'); tech=@('OpenAI API','TensorFlow','Python','LangChain','AWS SageMaker') }
    'data-analytics' = @{ title='Data Analytics'; subtitle='Big data processing, predictive analytics, and real-time reporting'; icon='data'; features=@('Big data processing','Predictive analytics','Real-time reporting','Data pipeline development','ETL processes','Data visualization'); benefits=@('Uncover hidden patterns','Forecast trends','Optimize operations','Reduce risks'); tech=@('Python','Apache Spark','SQL','Power BI','AWS Redshift') }
}

function Get-ServicePageHtml($slug, $data) {
    $featuresHtml = ($data.features | ForEach-Object { "              <li class=`"flex items-start gap-3`"><svg class=`"w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5`" fill=`"none`" stroke=`"currentColor`" viewBox=`"0 0 24 24`"><path stroke-linecap=`"round`" stroke-linejoin=`"round`" stroke-width=`"2`" d=`"M5 13l4 4L19 7`"/></svg><span class=`"text-slate-300`">$_</span></li>" }) -join "`n"
    $benefitsHtml = ($data.benefits | ForEach-Object { "              <div class=`"glass-card rounded-xl p-4`"><p class=`"text-white font-medium`">$_</p></div>" }) -join "`n"
    $techHtml = ($data.tech | ForEach-Object { "              <span class=`"px-4 py-2 glass rounded-lg text-sm text-cyan-400`">$_</span>" }) -join "`n"

    return @"
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="$($data.subtitle) - Guudle IT Solutions premium enterprise technology services.">
  <title>$($data.title) | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={darkMode:'class',theme:{extend:{colors:{primary:'#2563eb',secondary:'#7c3aed',accent:'#06b6d4'}}}}</script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body class="bg-slate-950 text-slate-100 antialiased">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>

  <main id="main">
    <section class="pt-32 pb-20 hero-bg grid-pattern relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <nav class="text-sm text-slate-400 mb-6 reveal" aria-label="Breadcrumb">
          <a href="../../index.html" class="hover:text-white">Home</a> / <span class="text-cyan-400">$($data.title)</span>
        </nav>
        <div class="max-w-3xl reveal">
          <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 text-sm font-medium mb-4">Premium Service</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">$($data.title)</h1>
          <p class="text-xl text-slate-400 mb-8">$($data.subtitle)</p>
          <div class="flex flex-wrap gap-4">
            <a href="../contact.html" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all btn-shine">Get Free Consultation</a>
            <a href="../portfolio.html" class="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all">View Our Work</a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="reveal">
            <h2 class="text-3xl font-bold text-white mb-6">What We Deliver</h2>
            <ul class="space-y-4">
$featuresHtml
            </ul>
          </div>
          <div class="reveal delay-200">
            <h2 class="text-3xl font-bold text-white mb-6">Key Benefits</h2>
            <div class="grid sm:grid-cols-2 gap-4">
$benefitsHtml
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-white mb-8 text-center reveal">Technologies We Use</h2>
        <div class="flex flex-wrap justify-center gap-3 reveal">
$techHtml
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-white mb-12 text-center reveal">Our Process</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="glass-card rounded-2xl p-6 text-center reveal"><div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mx-auto mb-4">1</div><h3 class="text-white font-semibold mb-2">Discovery</h3><p class="text-slate-400 text-sm">Understanding your goals and requirements</p></div>
          <div class="glass-card rounded-2xl p-6 text-center reveal delay-100"><div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mx-auto mb-4">2</div><h3 class="text-white font-semibold mb-2">Strategy</h3><p class="text-slate-400 text-sm">Planning architecture and roadmap</p></div>
          <div class="glass-card rounded-2xl p-6 text-center reveal delay-200"><div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mx-auto mb-4">3</div><h3 class="text-white font-semibold mb-2">Development</h3><p class="text-slate-400 text-sm">Agile build with regular updates</p></div>
          <div class="glass-card rounded-2xl p-6 text-center reveal delay-300"><div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mx-auto mb-4">4</div><h3 class="text-white font-semibold mb-2">Launch & Support</h3><p class="text-slate-400 text-sm">Deployment and ongoing maintenance</p></div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
      <div class="max-w-4xl mx-auto px-4 text-center reveal">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
        <p class="text-slate-400 mb-8">Let's discuss how our $($data.title) services can help you achieve your goals.</p>
        <a href="../contact.html" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Start Your Project</a>
      </div>
    </section>
  </main>

  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/components.js"></script>
  <script src="../../assets/js/main.js"></script>
</body>
</html>
"@
}

$outDir = Join-Path $PSScriptRoot "pages\services"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

foreach ($entry in $services.GetEnumerator()) {
    $html = Get-ServicePageHtml $entry.Key $entry.Value
    $filePath = Join-Path $outDir "$($entry.Key).html"
    [System.IO.File]::WriteAllText($filePath, $html, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Created: $filePath"
}

Write-Host "`nGenerated $($services.Count) service pages."
