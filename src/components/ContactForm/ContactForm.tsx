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
    if (!form.reportValidity()) {
      setSubmitting(false)
      return
    }
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    if (name.length < 2 || message.length < 10) {
      setSubmitting(false)
      setError('Please enter your name and a message of at least 10 characters.')
      return
    }
    const result = await submitContactForm({
      name,
      email,
      message,
      _gotcha: String(formData.get('_gotcha') ?? ''),
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
        <p>Thanks for reaching out. BB Technologies will reply within 1–2 business days.</p>
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
      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="contact-form-label">
        Name <span className="contact-form-required">*</span>
        <input type="text" name="name" required minLength={2} maxLength={100} className="contact-form-input" placeholder="Your name" autoComplete="name" />
      </label>
      <label className="contact-form-label">
        Email <span className="contact-form-required">*</span>
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          className="contact-form-input"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </label>
      <label className="contact-form-label">
        Message <span className="contact-form-required">*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
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
