import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useReveal } from '../../hooks/useReveal'
import { getWhatsAppUrl } from '../../config/contact'
import { reportWhatsAppConversion } from '../../utils/googleAds'
import ContactChannels from '../ContactChannels/ContactChannels'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import './Home.css'

type Service = {
  title: string
  path: string
  description: string
  tech: string[]
  highlights?: string[]
  bento: 'featured' | 'wide' | 'standard'
}

const capabilities: Service[] = [
  {
    title: 'Websites & e-commerce stores',
    path: '/web-experiences',
    description: 'Marketing websites and online stores designed to present your offer clearly and make it easy for customers to take the next step.',
    highlights: ['Responsive pages and clear calls to action', 'Product catalogues and standard checkout flows', 'Basic SEO foundations and practical handover'],
    tech: ['React', 'TypeScript', 'Payments', 'SEO'], bento: 'featured',
  },
  { title: 'Software built around your workflow', path: '/custom-software', description: 'Custom dashboards, client portals, internal tools, and MVPs that bring your process into one dependable place.', tech: ['React', 'Node.js', 'APIs', 'Databases'], bento: 'wide' },
  { title: 'AI assistants that do useful work', path: '/ai-automation', description: 'Knowledge-grounded chatbots, document Q&A, lead qualification, and AI workflows with the right human handoffs.', tech: ['RAG', 'LLMs', 'Vector databases', 'Function calling'], bento: 'wide' },
  { title: 'Automation that keeps work moving', path: '/ai-automation', description: 'Connect your existing tools, remove copy-paste work, and make routine follow-up, routing, and reporting more reliable.', tech: ['n8n', 'Zapier', 'Webhooks', 'Integrations'], bento: 'wide' },
]

const process = [
  { icon: '01', title: 'Discover', description: 'We understand the business problem, users, current tools, and the outcome worth improving.' },
  { icon: '02', title: 'Scope', description: 'You receive a plain-English scope, milestones, starting price, and a realistic timeline before work begins.' },
  { icon: '03', title: 'Build', description: 'We build in focused stages, sharing progress early so feedback arrives when it is most useful.' },
  { icon: '04', title: 'Review & launch', description: 'We test the important journeys together, resolve the final details, and put the work live.' },
  { icon: '05', title: 'Handover', description: 'You receive the project access, code, documentation, and a clear next-step plan.' },
]

const previousWork = [
  {
    title: 'Lead Conversion Platform',
    context: 'Campaign journeys needed a clearer route from interest to enquiry.',
    delivered: 'A lead-conversion experience with dynamic forms and a simpler enquiry path.',
    tech: ['React', 'TypeScript', 'Dynamic forms'],
    link: 'https://ccbp.in/intensive',
  },
  {
    title: 'Pulse AI',
    context: 'Teams needed a better way to answer repeat questions without losing visibility.',
    delivered: 'A WhatsApp AI platform grounded in a knowledge base, with a live conversation view.',
    tech: ['RAG', 'WhatsApp API', 'React', 'Node.js'],
  },
  {
    title: 'HoomanLabs Voice Agents',
    context: 'The voice journey needed to sound useful and route people reliably.',
    delivered: 'Voice-agent setup, conversational prompts, and workflow choices shaped around the intended experience.',
    tech: ['Voice agents', 'Prompting', 'Workflow design'],
  },
  {
    title: 'AI-Powered Communication System',
    context: 'Manual follow-up from spreadsheet information took too much repetitive effort.',
    delivered: 'A communication helper that turns spreadsheet details into reusable, personalised WhatsApp messages.',
    tech: ['WhatsApp', 'Google Sheets API', 'React'],
  },
]

type PriceHighlight = { label: string, amount: string }
type PricingOption = {
  title: string
  priceInr: string
  priceUsd: string
  description: string
  scopeInr: string
  scopeUsd: string
  priceHighlightsInr?: PriceHighlight[]
  priceHighlightsUsd?: PriceHighlight[]
}

const pricing: PricingOption[] = [
  {
    title: 'Business website',
    priceInr: 'From ₹25,000',
    priceUsd: 'From $265',
    description: 'A focused website that explains what you do and helps visitors get in touch.',
    scopeInr: 'Up to five pages, responsive layout, contact form or WhatsApp link, and basic SEO. Copy and images supplied by you.',
    scopeUsd: 'Up to five pages, responsive layout, contact form or WhatsApp link, and basic SEO. Copy and images supplied by you.',
  },
  {
    title: 'Custom website',
    priceInr: 'From ₹49,000',
    priceUsd: 'From $515',
    description: 'A more tailored web presence for a distinct brand, service, or content need.',
    scopeInr: 'Custom design, up to eight pages, CMS setup, analytics, and a lead form. Final scope agreed before work begins.',
    scopeUsd: 'Custom design, up to eight pages, CMS setup, analytics, and a lead form. Final scope agreed before work begins.',
  },
  {
    title: 'E-commerce store',
    priceInr: 'From ₹75,000',
    priceUsd: 'From $785',
    description: 'A focused online store with the core shopping flow your customers need.',
    scopeInr: 'Starting scope covers a standard catalogue, cart, checkout, and payment integration. Inventory, shipping rules, migrations, and other integrations affect the quote.',
    scopeUsd: 'Starting scope covers a standard catalogue, cart, checkout, and payment integration. Inventory, shipping rules, migrations, and other integrations affect the quote.',
  },
  {
    title: 'Full-stack MVP',
    priceInr: 'From ₹1.5L',
    priceUsd: 'From $1,565',
    description: 'A first release for one clearly defined product or business workflow.',
    scopeInr: 'We scope the core user journey, roles, data, and integrations before quoting the full build. A discovery sprint is ₹15,000 and credited if you proceed.',
    scopeUsd: 'We scope the core user journey, roles, data, and integrations before quoting the full build. A discovery sprint is $160 and credited if you proceed.',
  },
  {
    title: 'AI & workflow automation',
    priceInr: 'Starting from ₹35,000',
    priceUsd: 'Starting from $365',
    description: 'Choose a focused workflow automation or begin with an AI / RAG assistant pilot—then grow only when the next step is proven useful.',
    scopeInr: 'Single workflow automation starts at ₹35,000. A limited chatbot/RAG pilot starts at ₹1 lakh; integrations, channels, data volume, and evaluation needs change the price.',
    scopeUsd: 'Single workflow automation starts at $365. A limited chatbot/RAG pilot starts at $1,050; integrations, channels, data volume, and evaluation needs change the price.',
    priceHighlightsInr: [
      { label: 'Workflow automation', amount: 'Starts at ₹35,000' },
      { label: 'AI / RAG assistant pilot', amount: 'Starts at ₹1,00,000' },
    ],
    priceHighlightsUsd: [
      { label: 'Workflow automation', amount: 'Starts at $365' },
      { label: 'AI / RAG assistant pilot', amount: 'Starts at $1,050' },
    ],
  },
]

function Home() {
  const [showAllWork, setShowAllWork] = useState(false)
  const [expandedSolutionTech, setExpandedSolutionTech] = useState<number | null>(null)
  const [visitorCountry, setVisitorCountry] = useState('IN')
  const [contactOpen, setContactOpen] = useState(false)
  const contactDialogRef = useRef<HTMLDialogElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isContactOpen = contactOpen || Boolean(location.state?.openProjectForm)
  const closeContactForm = () => {
    setContactOpen(false)
    if (location.state?.openProjectForm) navigate('/', { replace: true, state: null })
  }
  useScrollToSection()
  useReveal()

  useEffect(() => {
    let active = true
    fetch('/api/geo', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Country lookup unavailable')
        return response.json() as Promise<{ country?: unknown }>
      })
      .then(({ country }) => {
        if (active && typeof country === 'string' && /^[A-Z]{2}$/.test(country)) {
          setVisitorCountry(country)
        }
      })
      .catch(() => {
        // Local previews and unavailable geo lookups keep India pricing by default.
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!location.state?.openProjectForm) return
    const timer = window.setTimeout(() => {
      setContactOpen(true)
      navigate('/', { replace: true, state: null })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [location.key, location.state, navigate])

  useEffect(() => {
    const dialog = contactDialogRef.current
    if (!dialog) return
    if (isContactOpen && !dialog.open) dialog.showModal()
    if (!isContactOpen && dialog.open) dialog.close()
  }, [isContactOpen])

  return (
    <div className="portfolio">
      <main id="main-content">
        <section id="hero" className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-label"><span className="hero-label-dot" aria-hidden="true" />For growing businesses · India & remote</p>
              <h1 id="hero-heading" className="hero-name">Bhanu<span className="hero-surname text-gradient">Beyond</span></h1>
              <p className="hero-role">Digital systems that make the next move easier.</p>
              <p className="hero-intro">BB Technologies builds <strong>high-converting websites, useful custom software, and practical AI automation</strong> for businesses ready to improve how they sell, serve, and operate.</p>
              <div className="hero-trust" aria-label="How BhanuBeyond works"><span>Clear scope</span><span>Practical handover</span><span>Reply in 1–2 business days</span></div>
              <div className="hero-actions"><a className="glass-btn glass-btn--primary" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={reportWhatsAppConversion}>Start on WhatsApp <span aria-hidden="true">↗</span></a><a href="#projects" className="hero-text-link">Explore solutions <span aria-hidden="true">→</span></a></div>
            </div>
            <div className="hero-summary glass" aria-label="BhanuBeyond services">
              <div className="hero-summary-top"><span className="hero-summary-spark" aria-hidden="true">✦</span><p className="hero-summary-label">Built for momentum</p></div>
              <ul>
                <li><span>01</span><div><strong>Web experiences</strong><small>Websites and stores that turn interest into action.</small></div></li>
                <li><span>02</span><div><strong>Custom software</strong><small>Useful tools that fit the way your team works.</small></div></li>
                <li><span>03</span><div><strong>AI automation</strong><small>Less repetitive work, with the right human handoff.</small></div></li>
              </ul>
              <p className="hero-summary-note">Start with one clear need. Grow the solution only when it makes sense.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <header className="section-head" data-reveal><span className="section-label">01 — About</span><h2 id="about-heading" className="section-title">A practical partner, from the first conversation.</h2><p className="section-subtitle">Clear communication, useful technology, and a delivery approach that fits the project.</p></header>
          <div className="about-bento">
            <div className="about-portrait glass"><img src="https://res.cloudinary.com/df7wnybwg/image/upload/f_auto,q_auto,w_720/v1791969841/BhanuBeyond/5881509d-2e2a-4a64-b5ef-fb39ff2d2592.png" alt="Bhanu Kiran Vemula" className="about-photo" width={720} height={900} loading="lazy" decoding="async" /><span className="about-photo-caption">Bhanu Kiran Vemula · Founder</span></div>
            <div className="about-card glass about-bento-main"><p><strong>BB Technologies</strong> brings hands-on experience across websites, product builds, AI systems, and automation.</p><p>We shape each engagement around the product, customer experience, or workflow that needs to improve—without unnecessary complexity.</p><div className="about-badges"><span className="glass-tag">Outcome-led planning</span><span className="glass-tag">Straightforward communication</span><span className="glass-tag">Thoughtful handover</span></div><div className="about-next-step"><p>Have a project in mind? Start with the problem you want to solve—we’ll help you decide the most useful next step.</p><button type="button" className="glass-btn glass-btn--primary" onClick={() => setContactOpen(true)}>Talk through your idea <span aria-hidden="true">→</span></button></div></div>
          </div>
        </section>

        <section id="process" className="section" aria-labelledby="process-heading">
          <header className="section-head" data-reveal><span className="section-label">02 — Process</span><h2 id="process-heading" className="section-title">A clear path from problem to handover</h2><p className="section-subtitle">You see the scope, progress, launch plan, and ownership details before surprises can grow.</p></header>
          <div className="timeline">{process.map((step) => <article key={step.icon} className="timeline-card" data-reveal><div className="timeline-icon">{step.icon}</div><div className="timeline-body"><div className="timeline-top"><h3>{step.title}</h3></div><p className="timeline-desc">{step.description}</p></div></article>)}</div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-heading">
          <header className="section-head" data-reveal><span className="section-label">03 — Solutions</span><h2 id="projects-heading" className="section-title">What BB Technologies can help you move forward</h2><p className="section-subtitle">Websites and online stores, full-stack products, AI assistants, and automation—scoped to your needs.</p></header>
          <div className="solutions-grid">{capabilities.map((capability, index) => {
            const isExpanded = expandedSolutionTech === index
            const visibleTech = isExpanded ? capability.tech : capability.tech.slice(0, 2)
            const remainingCount = capability.tech.length - 2
            return <article key={`${capability.title}-${index}`} data-reveal className="solution-item"><span className="solution-index">0{index + 1}</span><div><h3 className="bento-title">{capability.title}</h3><p className="bento-desc">{capability.description}</p>{capability.highlights && <ul className="bento-highlights">{capability.highlights.map((point) => <li key={point}>{point}</li>)}</ul>}<div className="solution-tech"><p className="solution-tech-label">Technologies</p><div className="bento-tech">{visibleTech.map((tech) => <span key={tech} className="glass-tag">{tech}</span>)}{remainingCount > 0 && <button type="button" className="technology-more" onClick={() => setExpandedSolutionTech(isExpanded ? null : index)} aria-expanded={isExpanded}>{isExpanded ? '− Show less' : `+ ${remainingCount} more`}</button>}</div></div><Link className="solution-link" to={capability.path}>See service details <span aria-hidden="true">→</span></Link></div></article>
          })}</div>
        </section>

        <section id="pricing" className="section" aria-labelledby="pricing-heading">
          <header className="section-head" data-reveal><span className="section-label">04 — Pricing</span><h2 id="pricing-heading" className="section-title">Clear starting points. Scope before commitment.</h2><p className="section-subtitle">These starting prices are for defined launch scopes. We confirm deliverables, timeline, and final price before work begins.</p></header>
          <div className="pricing-grid">{pricing.map((item, index) => <article key={item.title} className="pricing-card glass lift" data-reveal>
            <span className="pricing-index">0{index + 1}</span><h3 className="pricing-title">{item.title}</h3>{item.priceHighlightsInr ? <div className="pricing-starts" aria-label="Starting prices">{(visitorCountry === 'IN' ? item.priceHighlightsInr : item.priceHighlightsUsd)?.map((price) => <div className="pricing-start" key={price.label}><span>{price.label}</span><strong>{price.amount}</strong></div>)}</div> : <p className="pricing-price">{visitorCountry === 'IN' ? item.priceInr : item.priceUsd}</p>}<p className="pricing-description">{item.description}</p><p className="pricing-scope">{visitorCountry === 'IN' ? item.scopeInr : item.scopeUsd}</p>
          </article>)}</div>
          <p className="pricing-note">Outside India, prices are shown in rounded USD equivalents (about ₹96 per $1). Taxes where applicable, third-party subscriptions, hosting, payment fees, and AI usage are billed separately. Final pricing depends on agreed scope.</p>
          <div className="pricing-cta"><button type="button" className="glass-btn glass-btn--primary" onClick={() => setContactOpen(true)}>Discuss your project</button></div>
        </section>

        <section id="previous-work" className="section" aria-labelledby="previous-work-heading">
          <header className="section-head" data-reveal><span className="section-label">05 — Build experience</span><h2 id="previous-work-heading" className="section-title">Selected problems turned into useful systems</h2><p className="section-subtitle">Examples from Bhanu’s earlier work. They show the kinds of business problems and delivery work that inform BB Technologies today.</p></header>
          <div className="bento-grid previous-work-grid">{previousWork.slice(0, 3).map((project, index) => <article key={project.title} className="bento-card glass lift previous-work-card">
            <span className="bento-index">0{index + 1}</span><h3 className="bento-title">{project.title}</h3><p className="case-label">Context</p><p className="bento-desc">{project.context}</p><p className="case-label">Delivered</p><p className="bento-desc">{project.delivered}</p><div className="bento-tech">{project.tech.map((tech) => <span key={tech} className="glass-tag">{tech}</span>)}</div>{project.link && <a className="glass-btn glass-btn--primary previous-work-link" href={project.link} target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>}
          </article>)}</div>
          <div id="previous-work-more" className="bento-grid previous-work-grid previous-work-more" hidden={!showAllWork}><article className="bento-card glass lift previous-work-card">
            <span className="bento-index">04</span><h3 className="bento-title">{previousWork[3].title}</h3><p className="case-label">Context</p><p className="bento-desc">{previousWork[3].context}</p><p className="case-label">Delivered</p><p className="bento-desc">{previousWork[3].delivered}</p><div className="bento-tech">{previousWork[3].tech.map((tech) => <span key={tech} className="glass-tag">{tech}</span>)}</div>
          </article></div>
          <button type="button" className="more-work-button" onClick={() => setShowAllWork((visible) => !visible)} aria-expanded={showAllWork} aria-controls="previous-work-more">
            {showAllWork ? '− Show less' : <>+ More work <span className="more-work-count">1</span></>}
          </button>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
          <header className="section-head" data-reveal><span className="section-label">06 — Contact</span><h2 id="contact-heading" className="section-title">Tell us what you want to build</h2><p className="section-subtitle">Share a little context and BB Technologies will help you identify the right next step.</p></header>
          <div className="contact-bento"><aside className="contact-aside glass"><h3 className="contact-aside-title">Quick connect</h3><ContactChannels /><p className="contact-form-prompt">Prefer a structured project brief?</p><button type="button" className="glass-btn glass-btn--primary" onClick={() => setContactOpen(true)}>Open project form</button></aside></div>
        </section>
        <dialog ref={contactDialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClose={closeContactForm} onCancel={closeContactForm} onClick={(event) => { if (event.target === event.currentTarget) closeContactForm() }}>
          <div className="project-dialog-content">
            <div className="project-dialog-heading"><div><p className="section-label">BB Technologies</p><h2 id="project-dialog-title">Start a project</h2><p>Tell us what you’re planning. We’ll reply within 1–2 business days.</p></div><button type="button" className="project-dialog-close" aria-label="Close project form" onClick={closeContactForm}>×</button></div>
            <h3 className="contact-aside-title">Or contact us directly</h3>
            <ContactChannels />
            <div className="project-dialog-form"><ContactForm /></div>
          </div>
        </dialog>
      </main>
      <Footer />
    </div>
  )
}

export default Home
