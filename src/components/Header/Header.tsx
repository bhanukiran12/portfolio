import { useState } from 'react'
import './Header.css'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#journey', label: 'Impact' },
  { href: '#projects', label: 'Work' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#hero" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">BK</span>
          <span className="brand-name">Bhanu Kiran</span>
        </a>

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
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="#work-with-me"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Work with me
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
