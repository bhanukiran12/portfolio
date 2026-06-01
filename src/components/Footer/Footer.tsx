import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">© 2026 Bhanu Kiran Vemula</p>
          <p className="footer-tagline">Full Stack Engineer · AI &amp; Web Products</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/#projects">Work</Link>
          <Link to="/work-with-me">Work with me</Link>
          <Link to="/" state={{ scrollTo: 'contact' }}>
            Contact
          </Link>
          <a href="https://linkedin.com/in/bhanu-kiranvemula" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:bhanukiran750@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
