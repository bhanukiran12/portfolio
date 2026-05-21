import { useState } from 'react'
import './Header.css'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#journey', label: 'Impact' },
  { href: '#projects', label: 'Work' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header-container">
        <a href="#hero" className="brand" onClick={closeMenu}>
          Bhanu Kiran
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav
          id="site-nav"
          className={`nav ${menuOpen ? 'nav-open' : ''}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={closeMenu}>
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
