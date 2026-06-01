import { useState, type FormEvent } from 'react'
import ContactChannels from '../ContactChannels/ContactChannels'
import { submitWorkWithMeForm } from '../../utils/formHandler'
import './WorkWithMe.css'

const projectTypeOptions = [
  'Website / marketing',
  'Full stack application',
  'AI-powered product',
  'Startup / MVP',
  'Product idea (early stage)',
  'Onsite project',
  'Team extension / contract',
  'Other',
]

const collaborationOptions = [
  'Freelance / contract',
  'Project-based delivery',
  'Ongoing partnership',
  'Technical co-founder style',
  'Not sure yet',
]

const onsiteOptions = ['Remote only', 'Hybrid', 'Onsite required', 'Open to discuss']

const timelineOptions = [
  'ASAP (< 1 month)',
  '1–3 months',
  '3–6 months',
  '6+ months',
  'Exploring / no fixed date',
]

const budgetOptions = [
  'Prefer not to say',
  'Under ₹1L',
  '₹1L – ₹5L',
  '₹5L – ₹15L',
  '₹15L+',
  'USD / international — discuss on call',
]

const emptyForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectTypes: [] as string[],
  collaborationType: '',
  onsite: '',
  onsiteLocation: '',
  productName: '',
  productDescription: '',
  targetUsers: '',
  managementDetails: '',
  salesDetails: '',
  techPreferences: '',
  timeline: '',
  budget: '',
  additionalNotes: '',
}

function WorkWithMe() {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleProjectType = (type: string) => {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (form.projectTypes.length === 0) {
      setError('Select at least one project type.')
      return
    }

    setSubmitting(true)
    const result = await submitWorkWithMeForm({
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
      projectTypes: form.projectTypes,
      collaborationType: form.collaborationType,
      onsite: form.onsite,
      onsiteLocation: form.onsiteLocation || undefined,
      productName: form.productName,
      productDescription: form.productDescription,
      targetUsers: form.targetUsers,
      managementDetails: form.managementDetails,
      salesDetails: form.salesDetails,
      techPreferences: form.techPreferences || undefined,
      timeline: form.timeline,
      budget: form.budget || undefined,
      additionalNotes: form.additionalNotes || undefined,
    })
    setSubmitting(false)

    if (result.success) {
      setSucceeded(true)
      setForm(emptyForm)
      return
    }
    setError(result.message)
  }

  return (
    <section id="work-with-me" className="work-with-me section" aria-labelledby="work-with-me-heading">
      <header className="section-head">
        <span className="section-label">05 — Collaborate</span>
        <h2 id="work-with-me-heading" className="section-title">
          Work with me
        </h2>
        <p className="section-subtitle">
          Product ideas, startups, full stack builds, AI tools, and onsite projects. Share your
          business context below — product, management, sales, and delivery — so we can align
          before a call.
        </p>
      </header>

      <div className="work-with-me-layout">
        <aside className="work-with-me-aside nb-card">
          <h3 className="aside-title">Quick connect</h3>
          <p className="aside-text">
            Prefer to talk first? Book a slot or message me on WhatsApp, Signal, or email. IST
            preferred; I align with your time zone.
          </p>
          <ContactChannels />
          <ul className="work-with-me-list">
            <li>Onsite &amp; hybrid when scope fits</li>
            <li>Startups, MVPs, and established products</li>
            <li>Engineering + clarity on product &amp; GTM</li>
          </ul>
        </aside>

        <div className="work-with-me-form-wrap nb-card">
          {succeeded ? (
            <div className="form-success" role="status">
              <p className="form-success-title">Received — thank you!</p>
              <p>
                I&apos;ll review your details and reply within 24–48 hours. You can also book a
                call via Calendly above.
              </p>
              <button
                type="button"
                className="nb-btn nb-btn--secondary"
                onClick={() => setSucceeded(false)}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form className="wwm-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="wwm-fieldset">
                <legend className="wwm-legend">You &amp; your organization</legend>
                <div className="wwm-row wwm-row--2">
                  <label className="wwm-label">
                    Name <span className="wwm-required">*</span>
                    <input
                      type="text"
                      name="name"
                      required
                      className="wwm-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label className="wwm-label">
                    Email <span className="wwm-required">*</span>
                    <input
                      type="email"
                      name="email"
                      required
                      className="wwm-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                </div>
                <div className="wwm-row wwm-row--2">
                  <label className="wwm-label">
                    Company / startup
                    <input
                      type="text"
                      name="company"
                      className="wwm-input"
                      placeholder="Optional"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </label>
                  <label className="wwm-label">
                    Phone / WhatsApp
                    <input
                      type="tel"
                      name="phone"
                      className="wwm-input"
                      placeholder="Optional"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="wwm-fieldset">
                <legend className="wwm-legend">Project &amp; engagement</legend>
                <p className="wwm-hint">
                  What are you building? <span className="wwm-required">*</span> (select all that apply)
                </p>
                <div className="wwm-checkgrid">
                  {projectTypeOptions.map((type) => (
                    <label key={type} className="wwm-check">
                      <input
                        type="checkbox"
                        checked={form.projectTypes.includes(type)}
                        onChange={() => toggleProjectType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
                <div className="wwm-row wwm-row--2">
                  <label className="wwm-label">
                    Collaboration model <span className="wwm-required">*</span>
                    <select
                      name="collaborationType"
                      required
                      className="wwm-input wwm-select"
                      value={form.collaborationType}
                      onChange={(e) => setForm({ ...form, collaborationType: e.target.value })}
                    >
                      <option value="">Select…</option>
                      {collaborationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wwm-label">
                    Onsite / location <span className="wwm-required">*</span>
                    <select
                      name="onsite"
                      required
                      className="wwm-input wwm-select"
                      value={form.onsite}
                      onChange={(e) => setForm({ ...form, onsite: e.target.value })}
                    >
                      <option value="">Select…</option>
                      {onsiteOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {(form.onsite === 'Onsite required' || form.onsite === 'Hybrid') && (
                  <label className="wwm-label">
                    City / region for onsite
                    <input
                      type="text"
                      name="onsiteLocation"
                      className="wwm-input"
                      placeholder="e.g. Hyderabad, Bangalore, remote-first with monthly onsite"
                      value={form.onsiteLocation}
                      onChange={(e) => setForm({ ...form, onsiteLocation: e.target.value })}
                    />
                  </label>
                )}
              </fieldset>

              <fieldset className="wwm-fieldset">
                <legend className="wwm-legend">Product &amp; business</legend>
                <label className="wwm-label">
                  Product / project name <span className="wwm-required">*</span>
                  <input
                    type="text"
                    name="productName"
                    required
                    className="wwm-input"
                    placeholder="Working title or product name"
                    value={form.productName}
                    onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  />
                </label>
                <label className="wwm-label">
                  Product overview <span className="wwm-required">*</span>
                  <textarea
                    name="productDescription"
                    required
                    className="wwm-input wwm-textarea"
                    rows={4}
                    placeholder="What it does, problem it solves, current stage (idea, MVP, live), and key features you need built or improved."
                    value={form.productDescription}
                    onChange={(e) => setForm({ ...form, productDescription: e.target.value })}
                  />
                </label>
                <label className="wwm-label">
                  Target users &amp; market <span className="wwm-required">*</span>
                  <textarea
                    name="targetUsers"
                    required
                    className="wwm-input wwm-textarea"
                    rows={3}
                    placeholder="Who uses it, geography, B2B/B2C, size of audience or customer base."
                    value={form.targetUsers}
                    onChange={(e) => setForm({ ...form, targetUsers: e.target.value })}
                  />
                </label>
                <label className="wwm-label">
                  Management &amp; team <span className="wwm-required">*</span>
                  <textarea
                    name="managementDetails"
                    required
                    className="wwm-input wwm-textarea"
                    rows={3}
                    placeholder="Founders, product owner, existing eng/design team, decision makers, and how you run delivery today."
                    value={form.managementDetails}
                    onChange={(e) => setForm({ ...form, managementDetails: e.target.value })}
                  />
                </label>
                <label className="wwm-label">
                  Sales &amp; go-to-market <span className="wwm-required">*</span>
                  <textarea
                    name="salesDetails"
                    required
                    className="wwm-input wwm-textarea"
                    rows={3}
                    placeholder="How you acquire customers, pricing model, sales cycle, marketing channels, and revenue goals if relevant."
                    value={form.salesDetails}
                    onChange={(e) => setForm({ ...form, salesDetails: e.target.value })}
                  />
                </label>
                <label className="wwm-label">
                  Tech preferences
                  <textarea
                    name="techPreferences"
                    className="wwm-input wwm-textarea"
                    rows={2}
                    placeholder="Stack, integrations, hosting, or constraints (optional)"
                    value={form.techPreferences}
                    onChange={(e) => setForm({ ...form, techPreferences: e.target.value })}
                  />
                </label>
              </fieldset>

              <fieldset className="wwm-fieldset">
                <legend className="wwm-legend">Timeline &amp; budget</legend>
                <div className="wwm-row wwm-row--2">
                  <label className="wwm-label">
                    Timeline <span className="wwm-required">*</span>
                    <select
                      name="timeline"
                      required
                      className="wwm-input wwm-select"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    >
                      <option value="">Select…</option>
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wwm-label">
                    Budget range
                    <select
                      name="budget"
                      className="wwm-input wwm-select"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">Select…</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="wwm-label">
                  Anything else
                  <textarea
                    name="additionalNotes"
                    className="wwm-input wwm-textarea"
                    rows={3}
                    placeholder="Links, deck, competitors, success criteria…"
                    value={form.additionalNotes}
                    onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                  />
                </label>
              </fieldset>

              {error && (
                <p className="wwm-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="nb-btn nb-btn--primary wwm-submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send project details'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default WorkWithMe
