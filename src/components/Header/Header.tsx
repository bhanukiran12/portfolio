import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const navLinks = [
  { hash: '#about', label: 'About' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#journey', label: 'Impact' },
  { hash: '#projects', label: 'Work' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const closeMenu = () => setMenuOpen(false)

  const sectionLink = (hash: string) => {
    if (location.pathname === '/') {
      return hash
    }
    return `/${hash}`
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">BK</span>
          <span className="brand-name">Bhanu Kiran</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.hash} href={sectionLink(link.hash)} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <Link to="/work-with-me" className="nav-cta" onClick={closeMenu}>
            Work with me
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
