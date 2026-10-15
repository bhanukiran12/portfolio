import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getWhatsAppUrl } from '../../config/contact'
import { reportWhatsAppConversion } from '../../utils/googleAds'
import './ServicePage.css'

type ServiceDetail = {
  eyebrow: string
  title: string
  intro: string
  startingAt: string
  useCases: string[]
  includes: string[]
  faqs: Array<{ question: string; answer: string }>
}

const services: Record<string, ServiceDetail> = {
  'web-experiences': {
    eyebrow: 'Web experiences',
    title: 'A website that makes your next customer action obvious.',
    intro: 'We create clear, fast websites and e-commerce experiences that explain your offer, build confidence, and give people a direct route to enquire or buy.',
    startingAt: 'Business websites from ₹25,000',
    useCases: ['A new business website that earns trust quickly', 'A redesign when the current site is unclear or hard to use', 'An e-commerce store with a clean path from product to checkout'],
    includes: ['Content and conversion structure before visuals', 'Responsive design for phone, tablet, and desktop', 'Contact or WhatsApp journeys, analytics, and SEO foundations', 'Access and handover so your team can own the site'],
    faqs: [
      { question: 'What do you need from me?', answer: 'Your offer, target customer, any existing content or examples, and timely feedback. We help shape the rest.' },
      { question: 'Will I own the website?', answer: 'Yes. The project is set up for your ownership, with the access and handover needed to continue independently.' },
      { question: 'How long does it take?', answer: 'A focused business website is usually scoped in weeks. The timeline is confirmed before work begins.' },
    ],
  },
  'custom-software': {
    eyebrow: 'Custom software',
    title: 'Software that fits the work your team actually does.',
    intro: 'From internal dashboards to client portals and focused MVPs, we shape practical software around the decisions, people, and workflows that matter.',
    startingAt: 'Discovery from ₹15,000 · MVPs from ₹1.5L',
    useCases: ['A dashboard replacing scattered spreadsheets and manual follow-up', 'A client portal that makes delivery or reporting easier', 'An MVP that tests one core product journey before a bigger build'],
    includes: ['Workflow mapping and a clear first-release scope', 'Roles, data, integrations, and key journeys defined upfront', 'Working reviews throughout the build', 'Launch support, documentation, and handover'],
    faqs: [
      { question: 'Do we need a full specification first?', answer: 'No. We start by clarifying the most valuable workflow and turn it into a practical first scope.' },
      { question: 'Can you work with our existing tools?', answer: 'Yes, where the systems provide suitable access. Integrations are assessed as part of scoping.' },
      { question: 'How do you reduce risk?', answer: 'We keep the first release focused, show progress early, and validate the important journeys before launch.' },
    ],
  },
  'ai-automation': {
    eyebrow: 'AI automation',
    title: 'Start with one workflow. Prove it. Then scale what works.',
    intro: 'We build practical AI assistants and automations for repetitive work—grounded in your information, connected to the right tools, and designed with clear human handoffs.',
    startingAt: 'Workflow automation from ₹35,000 · AI / RAG pilots from ₹1 lakh',
    useCases: ['Qualify and route inbound leads faster', 'Answer repeated questions from approved business knowledge', 'Turn documents or messages into reviewable structured work'],
    includes: ['One defined workflow and success measure', 'Knowledge, data, and integration assessment', 'Human review points for sensitive or important actions', 'A limited pilot before larger production scope'],
    faqs: [
      { question: 'What is an AI / RAG pilot?', answer: 'A limited assistant that answers from a defined knowledge source and is tested against the real questions it needs to handle.' },
      { question: 'Will AI take actions without approval?', answer: 'Not by default. Important actions can stay behind a human review step.' },
      { question: 'What determines the price?', answer: 'The workflow complexity, integrations, data quality, channels, security needs, and evaluation requirements.' },
    ],
  },
}

function ServicePage() {
  const { pathname } = useLocation()
  const service = pathname.split('/').filter(Boolean).at(-1)
  const detail = service ? services[service] : undefined

  useEffect(() => {
    if (!detail) return
    document.title = `${detail.eyebrow} | BB Technologies`
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [detail])

  if (!detail) {
    return <main className="service-page"><section className="service-hero"><p className="section-label">Service not found</p><h1>Let’s find the right starting point.</h1><Link className="glass-btn glass-btn--primary" to="/">Back to BhanuBeyond</Link></section></main>
  }

  return (
    <main className="service-page">
      <section className="service-hero" aria-labelledby="service-heading">
        <p className="section-label">BB Technologies · {detail.eyebrow}</p>
        <h1 id="service-heading">{detail.title}</h1>
        <p className="service-intro">{detail.intro}</p>
        <div className="service-actions">
          <a className="glass-btn glass-btn--primary" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={reportWhatsAppConversion}>Discuss on WhatsApp <span aria-hidden="true">↗</span></a>
          <Link className="service-back" to="/#projects">View all solutions <span aria-hidden="true">→</span></Link>
        </div>
        <p className="service-price">{detail.startingAt}</p>
      </section>

      <section className="service-section" aria-labelledby="use-cases-heading">
        <p className="section-label">Where it helps</p><h2 id="use-cases-heading">A focused solution for a real business need.</h2>
        <div className="service-grid">{detail.useCases.map((item, index) => <article key={item} className="service-card glass"><span>0{index + 1}</span><p>{item}</p></article>)}</div>
      </section>

      <section className="service-section service-includes" aria-labelledby="includes-heading">
        <p className="section-label">What to expect</p><h2 id="includes-heading">Built with clarity from the first conversation.</h2>
        <ul>{detail.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="service-section" aria-labelledby="faq-heading">
        <p className="section-label">Questions</p><h2 id="faq-heading">Before you start.</h2>
        <div className="service-faqs">{detail.faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="service-cta glass"><p className="section-label">A useful next step</p><h2>Tell us what needs to work better.</h2><p>We’ll help you identify the most practical place to begin and reply within 1–2 business days.</p><a className="glass-btn glass-btn--primary" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={reportWhatsAppConversion}>Start on WhatsApp <span aria-hidden="true">↗</span></a></section>
    </main>
  )
}

export default ServicePage
