import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './WorkWithMe.css'

function WorkWithMePage() {
  return (
    <div className="wwm-page">
      <main id="main-content" className="wwm-main">
        <header className="wwm-hero nb-card">
          <p className="section-label">Collaborate</p>
          <h1 className="wwm-title">How to work with me</h1>
          <p className="wwm-lead">
            I partner with founders, startups, and teams on product builds — from websites and full
            stack apps to AI tools and onsite delivery. Read how I work below; if it fits, reach out
            on the home page contact form.
          </p>
        </header>

        <section className="wwm-block nb-card" aria-labelledby="wwm-what-heading">
          <h2 id="wwm-what-heading" className="wwm-heading">
            What I work on
          </h2>
          <ul className="wwm-list">
            <li>
              <strong>Websites &amp; landing pages</strong> — fast, responsive, conversion-focused.
            </li>
            <li>
              <strong>Full stack applications</strong> — React, Node.js, APIs, databases, deployment.
            </li>
            <li>
              <strong>AI-powered products</strong> — integrations, automation, voice agents, LLM workflows.
            </li>
            <li>
              <strong>Startups &amp; MVPs</strong> — ship a first version, iterate with clear milestones.
            </li>
            <li>
              <strong>Product ideas</strong> — early-stage concepts where you need engineering + product clarity.
            </li>
            <li>
              <strong>Onsite &amp; hybrid</strong> — when scope and location make in-person collaboration valuable.
            </li>
          </ul>
        </section>

        <section className="wwm-block nb-card" aria-labelledby="wwm-how-heading">
          <h2 id="wwm-how-heading" className="wwm-heading">
            How I collaborate
          </h2>
          <p>
            I work best when product, engineering, and business goals are aligned. You do not need a
            perfect spec — but the more context you share (users, sales motion, team structure), the
            faster we can move.
          </p>
          <div className="wwm-grid">
            <div className="wwm-card-inner">
              <h3>Product</h3>
              <p>What you are building, who it is for, stage (idea, MVP, live), and success metrics.</p>
            </div>
            <div className="wwm-card-inner">
              <h3>Management</h3>
              <p>Who owns decisions, existing team, and how you run delivery today.</p>
            </div>
            <div className="wwm-card-inner">
              <h3>Sales &amp; GTM</h3>
              <p>How you acquire customers, pricing, and go-to-market — so tech supports revenue.</p>
            </div>
          </div>
        </section>

        <section className="wwm-block nb-card" aria-labelledby="wwm-process-heading">
          <h2 id="wwm-process-heading" className="wwm-heading">
            Typical process
          </h2>
          <ol className="wwm-steps">
            <li>
              <strong>Intro</strong> — Calendly, WhatsApp, Signal, or email (links on home contact).
            </li>
            <li>
              <strong>Scope</strong> — goals, timeline, remote vs onsite, and rough budget range.
            </li>
            <li>
              <strong>Proposal</strong> — clear deliverables, milestones, and communication rhythm.
            </li>
            <li>
              <strong>Build &amp; ship</strong> — iterative delivery with demos and honest updates.
            </li>
          </ol>
          <p className="wwm-note">
            IST preferred; I align with your time zone. Payment via bank, UPI, or Wise for international
            clients.
          </p>
        </section>

        <section className="wwm-cta nb-card" aria-labelledby="wwm-cta-heading">
          <h2 id="wwm-cta-heading" className="wwm-heading">
            Ready to talk?
          </h2>
          <p>
            If this sounds like a fit, send a short message from the home page — name, email, and
            what you are building. I reply within 24–48 hours.
          </p>
          <Link to="/" state={{ scrollTo: 'contact' }} className="nb-btn nb-btn--primary">
            Go to contact form
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default WorkWithMePage
