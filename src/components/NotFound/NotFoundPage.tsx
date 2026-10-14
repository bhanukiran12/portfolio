import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../Footer/Footer'

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found | BhanuBeyond Technologies'
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.append(robots)
    }
    const previous = robots.content
    robots.content = 'noindex, follow'
    return () => {
      document.title = 'BhanuBeyond Technologies — Websites, Software & AI Automation'
      robots!.content = previous || 'index, follow, max-image-preview:large'
    }
  }, [])

  return (
    <>
      <main id="main-content" className="legal-page">
        <div className="legal-inner">
          <p className="section-label">404 — Page not found</p>
          <h1>That page isn’t here.</h1>
          <p className="section-subtitle">The link may be outdated, or the page may have moved.</p>
          <p style={{ marginTop: 28 }}><Link className="glass-btn glass-btn--primary" to="/">Back to BhanuBeyond</Link></p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage
