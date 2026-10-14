import { Link } from 'react-router-dom'
import { openCookiePreferences } from '../CookieConsent/cookiePreferences'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">© 2026 BhanuBeyond Technologies</p>
          <p className="footer-tagline">Websites · Custom Software · AI Automation</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/#projects">Capabilities</Link>
          <Link to="/work-with-me">Start a project</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/" state={{ scrollTo: 'contact' }}>
            Contact
          </Link>
          <a href="https://www.linkedin.com/in/bhanu-kiran-vemula/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:hello@bhanubeyound.com">Email</a>
          <button type="button" onClick={openCookiePreferences}>Cookie settings</button>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
