import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <a href="#hero" className="brand">Bhanu Kiran</a>
                <nav className="nav">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact" className="nav-cta">Contact</a>
                </nav>
            </div>
        </header>
    )
}

export default Header
