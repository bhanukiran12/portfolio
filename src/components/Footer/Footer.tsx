import { Link } from 'react-router-dom'
import { openCookiePreferences } from '../CookieConsent/cookiePreferences'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">© 2026 BB Technologies</p>
          <p className="footer-tagline">Websites · E-commerce · Software · AI</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/#projects">Solutions</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/#previous-work">Previous work</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/" state={{ openProjectForm: true }}>Start a project</Link>
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
