import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { insights } from '../../content/insights'
import './Insights.css'

function InsightsPage() {
  useEffect(() => { document.title = 'Insights | BB Technologies' }, [])
  const [featured, ...latest] = insights
  return <main className="insights-page">
    <section className="insights-hero">
      <p className="section-label">BB Technologies · Insights</p>
      <h1>Better decisions start with a clearer next step.</h1>
      <p>Useful field notes for business owners deciding what to improve, what to build, and where technology can genuinely help.</p>
      <div className="insights-hero-note"><span aria-hidden="true">✦</span> No jargon. No trend-chasing. Just practical guidance for the work ahead.</div>
    </section>
    <section className="insight-list" aria-label="Latest insights">
      <p className="insight-list-label">Start here</p>
      <article className="insight-featured glass">
        <div className="insight-featured-orb" aria-hidden="true">01</div>
        <div className="insight-featured-content">
          <div className="insight-meta"><span>{featured.category}</span><span>{featured.readTime}</span></div>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <Link className="insight-read-link" to={`/insights/${featured.slug}`}>Read the guide <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
      <div className="insight-grid">{latest.map((insight, index) => <article key={insight.slug} className="insight-card"><div className="insight-card-top"><div className="insight-meta"><span>{insight.category}</span><span>{insight.readTime}</span></div><span className="insight-number" aria-hidden="true">0{index + 2}</span></div><h2>{insight.title}</h2><p>{insight.description}</p><Link className="insight-read-link" to={`/insights/${insight.slug}`}>Read article <span aria-hidden="true">→</span></Link></article>)}</div>
    </section>
  </main>
}

export default InsightsPage
