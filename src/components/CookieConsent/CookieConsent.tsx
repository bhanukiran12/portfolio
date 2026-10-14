import { useEffect, useState } from 'react'
import { COOKIE_PREFERENCES_EVENT } from './cookiePreferences'
import './CookieConsent.css'

const STORAGE_KEY = 'bhanubeyond-analytics-consent'
type Consent = 'accepted' | 'rejected'

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

function loadClarity() {
  if (document.querySelector('script[data-clarity="bhanubeyond"]')) return
  window.clarity = window.clarity ?? Object.assign((...args: unknown[]) => {
    (window.clarity!.q = window.clarity!.q ?? []).push(args)
  }, { q: [] })
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.clarity.ms/tag/yxkm6bo1vp'
  script.dataset.clarity = 'bhanubeyond'
  document.head.append(script)
}

function applyConsent(consent: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent)
  } catch {
    // The choice still applies to this page view if browser storage is disabled.
  }
  if (consent === 'accepted') loadClarity()
  else window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' })
}

function CookieConsent() {
  const [choice, setChoice] = useState<Consent | null>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored === 'accepted' || stored === 'rejected' ? stored : null
    } catch {
      return null
    }
  })
  const [open, setOpen] = useState(choice === null)

  useEffect(() => {
    if (choice === 'accepted') loadClarity()
    const show = () => setOpen(true)
    window.addEventListener(COOKIE_PREFERENCES_EVENT, show)
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, show)
  }, [choice])

  const save = (next: Consent) => {
    applyConsent(next)
    setChoice(next)
    setOpen(false)
  }

  if (!open) return null
  return (
    <aside className="cookie-consent" aria-label="Cookie and analytics preferences">
      <div className="cookie-consent-copy">
        <strong>Privacy choices</strong>
        <p>We use optional Microsoft Clarity analytics only with your permission. You can change this choice in Cookie settings.</p>
        <a href="/privacy">Read our privacy policy</a>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-reject" onClick={() => save('rejected')}>Reject analytics</button>
        <button type="button" className="cookie-accept" onClick={() => save('accepted')}>Accept analytics</button>
      </div>
    </aside>
  )
}

export default CookieConsent
