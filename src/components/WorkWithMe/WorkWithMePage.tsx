import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './WorkWithMe.css'

function WorkWithMePage() {
  return (
    <div className="wwm-page">
      <main id="main-content" className="wwm-main">
        <header className="wwm-hero glass">
          <p className="section-label">Collaborate</p>
          <h1 className="wwm-title section-title">Start a project with BB Technologies</h1>
          <p className="wwm-lead">
            BB Technologies is a newly launched company building websites and e-commerce
            stores, full-stack products, AI chatbots, RAG systems, and workflow automation for businesses
            and businesses of any size.
          </p>
        </header>

        <section className="wwm-block glass" aria-labelledby="wwm-what-heading">
          <h2 id="wwm-what-heading" className="wwm-heading">
            What we build
          </h2>
          <ul className="wwm-list">
            <li>
              <strong>Websites &amp; e-commerce</strong> — customer-facing websites and online stores with clear journeys and practical handover.
            </li>
            <li>
              <strong>Full-stack products</strong> — dashboards, portals, internal tools, and MVPs built around your users and workflows.
            </li>
            <li>
              <strong>Custom software</strong> — React, Node.js, APIs, dashboards, portals, and deployments.
            </li>
            <li>
              <strong>AI chatbots &amp; RAG</strong> — assistants grounded in your knowledge, with suitable human handoffs.
            </li>
            <li>
              <strong>Workflow automation</strong> — connect the tools your team already uses and remove repeat work.
            </li>
          </ul>
        </section>

        <section className="wwm-block glass" aria-labelledby="wwm-how-heading">
          <h2 id="wwm-how-heading" className="wwm-heading">
            How we work
          </h2>
          <p className="wwm-text">
            You do not need a perfect specification. Tell us the problem, the people it affects,
            and what a useful result looks like. We turn that into a practical scope and delivery plan.
          </p>
          <div className="wwm-grid">
            <div className="wwm-card-inner glass">
              <h3>Understand</h3>
              <p>We learn your goals, users, existing tools, timeline, and budget range.</p>
            </div>
            <div className="wwm-card-inner glass">
              <h3>Plan</h3>
              <p>You get a clear proposal with deliverables, milestones, and a communication rhythm.</p>
            </div>
            <div className="wwm-card-inner glass">
              <h3>Build &amp; launch</h3>
              <p>We deliver in reviewable stages, then help you launch with confidence.</p>
            </div>
          </div>
        </section>

        <section className="wwm-block glass" aria-labelledby="wwm-process-heading">
          <h2 id="wwm-process-heading" className="wwm-heading">
            Typical process
          </h2>
          <ol className="wwm-steps">
            <li>
              <strong>Intro</strong> — share your idea on WhatsApp, by email, or through the project form.
            </li>
            <li>
              <strong>Scope</strong> — agree goals, timeline, priorities, and budget range.
            </li>
            <li>
              <strong>Proposal</strong> — receive clear deliverables, milestones, and communication rhythm.
            </li>
            <li>
              <strong>Build &amp; ship</strong> — review working progress, launch, and hand over with clarity.
            </li>
          </ol>
          <p className="wwm-note">
            We work remotely from India and can align with your time zone. Payment options are agreed in the proposal.
          </p>
        </section>

        <section className="wwm-cta glass" aria-labelledby="wwm-cta-heading">
          <h2 id="wwm-cta-heading" className="wwm-heading">
            Ready to talk?
          </h2>
          <p>
            If this sounds like a fit, send a short message from the home page — name, email, and
            what you are building. BB Technologies replies within 1–2 business days.
          </p>
          <Link to="/" state={{ openProjectForm: true }} className="glass-btn glass-btn--primary">
            Go to contact form
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default WorkWithMePage
