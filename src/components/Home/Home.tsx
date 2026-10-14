import { Link } from 'react-router-dom'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useParallax } from '../../hooks/useParallax'
import { useReveal } from '../../hooks/useReveal'
import { contactConfig, getWhatsAppUrl } from '../../config/contact'
import ContactChannels from '../ContactChannels/ContactChannels'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import './Home.css'

type Service = {
  title: string
  description: string
  tech: string[]
  highlights?: string[]
  bento: 'featured' | 'wide' | 'standard'
}

const services = [
  { title: 'Professional Portfolio & Blog Support', description: 'Keep portfolios, case studies, and blogs current. Our interns contribute under guidance, building real experience while showing their skills.' },
  { title: 'Business Websites', description: 'Fast, mobile-ready websites for local businesses that make services clear and turn visitors into enquiries.' },
  { title: 'Custom Software', description: 'Dashboards, portals, internal tools, and full-stack products shaped around the way your team works.' },
  { title: 'AI & Automation', description: 'Website chatbots, RAG systems, custom AI workflows, and automations that remove repetitive work.' },
]

const capabilities: Service[] = [
  {
    title: 'Websites that earn attention',
    description: 'Ongoing portfolio and blog support for professionals, alongside business websites and service pages that stay clear, fast, and useful on every device.',
    highlights: ['Clear positioning and calls to action', 'Responsive design and basic SEO foundations', 'Simple handover so your team can keep moving'],
    tech: ['React', 'TypeScript', 'SEO', 'Responsive design'], bento: 'featured',
  },
  { title: 'Software built around your workflow', description: 'Custom dashboards, client portals, internal tools, and MVPs that bring your process into one dependable place.', tech: ['React', 'Node.js', 'APIs', 'Databases'], bento: 'wide' },
  { title: 'AI assistants that do useful work', description: 'Knowledge-grounded chatbots, document Q&A, lead qualification, and AI workflows with the right human handoffs.', tech: ['RAG', 'LLMs', 'Vector databases', 'Function calling'], bento: 'wide' },
  { title: 'Automation that keeps work moving', description: 'Connect your existing tools, remove copy-paste work, and make routine follow-up, routing, and reporting more reliable.', tech: ['n8n', 'Zapier', 'Webhooks', 'Integrations'], bento: 'wide' },
]

const process = [
  { icon: '01', title: 'Tell us the goal', description: 'Share the problem, your users, your current tools, and what a useful outcome looks like.' },
  { icon: '02', title: 'Get a clear plan', description: 'We define the right scope, deliverables, timeline, and communication rhythm before work begins.' },
  { icon: '03', title: 'Build, review, launch', description: 'You see working progress in stages, give feedback early, and receive a clear handover at launch.' },
]

function Home() {
  useScrollToSection()
  useReveal()
  const heroParallax = useParallax<HTMLDivElement>(0.06)
  const photoParallax = useParallax<HTMLDivElement>(-0.04)

  return (
    <div className="portfolio">
      <main id="main-content">
        <section id="hero" className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy" ref={heroParallax}>
              <p className="hero-label"><span className="hero-label-dot" aria-hidden="true" />Websites · Custom Software · AI Automation</p>
              <h1 id="hero-heading" className="hero-name">Bhanu<span className="hero-surname text-gradient">Beyond</span></h1>
              <p className="hero-role">Build beyond the expected.</p>
              <p className="hero-intro">We help professionals keep portfolios and blogs current, help local businesses win enquiries, and build <strong>custom software and practical AI automation</strong> for growing teams.</p>
              <div className="hero-stats">
                <div className="stat-box glass"><span className="stat-value">Web</span><span className="stat-label">portfolio &amp; business sites</span></div>
                <div className="stat-box glass"><span className="stat-value">Build</span><span className="stat-label">custom software &amp; MVPs</span></div>
                <div className="stat-box glass"><span className="stat-value">AI</span><span className="stat-label">chatbots, RAG &amp; automation</span></div>
              </div>
              <div className="hero-actions"><a href="#contact" className="glass-btn glass-btn--primary">Start a project</a><a href="#services" className="glass-btn glass-btn--ghost">Explore services</a></div>
            </div>
            <div className="hero-photo-wrap" ref={photoParallax}>
              <div className="hero-photo-frame glass"><div className="hero-photo-glow" aria-hidden="true" />
                <img src="https://res.cloudinary.com/df7wnybwg/image/upload/v1791969841/BhanuBeyond/5881509d-2e2a-4a64-b5ef-fb39ff2d2592.png" alt="Bhanu Kiran, founder of BhanuBeyond Technologies" className="hero-photo" width={420} height={525} loading="eager" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section" aria-labelledby="services-heading">
          <div className="avail-card glass">
            <div className="avail-head"><p className="avail-status"><span className="avail-dot avail-dot--on" aria-hidden="true" />Currently taking on new projects</p><h2 id="services-heading" className="avail-title">The right support for where you are now</h2><p className="avail-lead">From keeping a professional portfolio or blog current to building full-stack products and connected AI workflows, BhanuBeyond matches the scope to the problem — then delivers something useful. {contactConfig.responseTime} · Remote, India.</p></div>
            <div className="avail-services">{services.map((service) => <div key={service.title} className="avail-service lift"><h3 className="avail-service-title">{service.title}</h3><p className="avail-service-desc">{service.description}</p></div>)}</div>
            <div className="avail-actions"><a href="#contact" className="glass-btn glass-btn--primary">Tell us what you need</a><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="glass-btn glass-btn--ghost">WhatsApp</a><a href={`mailto:${contactConfig.email}`} className="glass-btn glass-btn--ghost">Email us</a><Link to="/work-with-me" className="avail-link">How we work →</Link></div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <header className="section-head" data-reveal><span className="section-label">01 — About</span><h2 id="about-heading" className="section-title">A practical technology partner</h2><p className="section-subtitle">Clear communication, useful technology, and a delivery approach that fits the project.</p></header>
          <div className="about-bento">
            <div className="about-card glass about-bento-main"><p><strong>BhanuBeyond Technologies</strong> is led by Bhanu Kiran Vemula, a full-stack engineer working across websites, product builds, AI systems, and automation.</p><p>We help people get online with confidence, help businesses improve the tools they depend on, and help teams use AI where it creates real value — not just more noise.</p><div className="about-badges"><span className="glass-tag">Websites</span><span className="glass-tag">Full stack</span><span className="glass-tag">AI systems</span><span className="glass-tag">Automation</span></div></div>
            <aside className="skills-panel glass about-bento-side"><h3 className="panel-title">Built with</h3><div className="skills-grid">{['React', 'TypeScript', 'Node.js', 'Python', 'APIs', 'RAG', 'LLMs', 'n8n', 'Databases', 'SEO'].map((skill) => <span key={skill} className="glass-tag">{skill}</span>)}</div><div className="education-block"><h4 className="panel-title">Founder-led</h4><p className="edu-degree">Technical clarity from the first conversation</p><p className="edu-meta">Right-sized delivery for every project</p></div></aside>
          </div>
        </section>

        <section id="process" className="section" aria-labelledby="process-heading">
          <header className="section-head" data-reveal><span className="section-label">02 — Process</span><h2 id="process-heading" className="section-title">Simple from first message to launch</h2><p className="section-subtitle">No technical vocabulary required. We make the next step clear.</p></header>
          <div className="timeline">{process.map((step) => <article key={step.icon} className="timeline-card glass lift" data-reveal><div className="timeline-icon">{step.icon}</div><div className="timeline-body"><div className="timeline-top"><h3>{step.title}</h3></div><p className="timeline-desc">{step.description}</p></div></article>)}</div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-heading">
          <header className="section-head" data-reveal><span className="section-label">03 — Capabilities</span><h2 id="projects-heading" className="section-title">What BhanuBeyond can help you build</h2><p className="section-subtitle">A focused service catalogue, from your first website to the systems that run behind it.</p></header>
          <div className="bento-grid">{capabilities.map((capability, index) => <article key={capability.title} data-reveal className={`bento-card glass lift bento-${capability.bento}`}><span className="bento-index">0{index + 1}</span><h3 className="bento-title">{capability.title}</h3><p className="bento-desc">{capability.description}</p>{capability.highlights && <ul className="bento-highlights">{capability.highlights.map((point) => <li key={point}>{point}</li>)}</ul>}<div className="bento-tech">{capability.tech.map((tech) => <span key={tech} className="glass-tag">{tech}</span>)}</div></article>)}</div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
          <header className="section-head" data-reveal><span className="section-label">04 — Contact</span><h2 id="contact-heading" className="section-title">Tell us what you want to build</h2><p className="section-subtitle">Share a little context and BhanuBeyond will help you identify the right next step.</p></header>
          <div className="contact-bento"><aside className="contact-aside glass"><h3 className="contact-aside-title">Quick connect</h3><ContactChannels /></aside><div className="contact-form-wrap glass"><ContactForm /></div></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
