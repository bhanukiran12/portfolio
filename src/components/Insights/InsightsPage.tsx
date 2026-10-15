import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { insights } from '../../content/insights'
import './Insights.css'

function InsightsPage() {
  useEffect(() => { document.title = 'Insights | BhanuBeyond Technologies' }, [])
  return <main className="insights-page"><section className="insights-hero"><p className="section-label">BB Technologies · Insights</p><h1>Practical notes on websites, software, and AI automation.</h1><p>Clear explanations for business owners deciding what to improve, what to build, and where technology can genuinely help.</p></section><section className="insight-list" aria-label="Latest insights">{insights.map((insight) => <article key={insight.slug} className="insight-card glass"><div className="insight-meta"><span>{insight.category}</span><span>{insight.readTime}</span></div><h2>{insight.title}</h2><p>{insight.description}</p><Link to={`/insights/${insight.slug}`}>Read article <span aria-hidden="true">→</span></Link></article>)}</section></main>
}

export default InsightsPage
