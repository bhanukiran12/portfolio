import { useState, type FormEvent } from 'react'
import { submitContactForm } from '../../utils/formHandler'
import './ContactForm.css'

function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const result = await submitContactForm({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    })

    setSubmitting(false)

    if (result.success) {
      setSucceeded(true)
      form.reset()
      return
    }

    setError(result.message)
  }

  if (succeeded) {
    return (
      <div className="contact-form-success glass" role="status">
        <p className="contact-form-success-title">Message sent</p>
        <p>Thanks for reaching out. I&apos;ll reply within 24–48 hours.</p>
        <button
          type="button"
          className="glass-btn glass-btn--secondary"
          onClick={() => setSucceeded(false)}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="contact-form-label">
        Name <span className="contact-form-required">*</span>
        <input type="text" name="name" required className="contact-form-input" placeholder="Your name" />
      </label>
      <label className="contact-form-label">
        Email <span className="contact-form-required">*</span>
        <input
          type="email"
          name="email"
          required
          className="contact-form-input"
          placeholder="you@company.com"
        />
      </label>
      <label className="contact-form-label">
        Message <span className="contact-form-required">*</span>
        <textarea
          name="message"
          required
          className="contact-form-input contact-form-textarea"
          rows={5}
          placeholder="Tell me about your project, timeline, or question…"
        />
      </label>
      {error && (
        <p className="contact-form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="glass-btn glass-btn--primary" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm
