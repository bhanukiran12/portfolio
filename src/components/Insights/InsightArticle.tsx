import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWhatsAppUrl } from '../../config/contact'
import { getInsight } from '../../content/insights'
import { reportWhatsAppConversion } from '../../utils/googleAds'
import './Insights.css'

function InsightArticle() {
  const { slug } = useParams()
  const insight = getInsight(slug)
  useEffect(() => { if (insight) { document.title = `${insight.title} | BhanuBeyond`; window.scrollTo({ top: 0, behavior: 'instant' }) } }, [insight])
  if (!insight) return <main className="insights-page"><section className="insights-hero"><p className="section-label">Insight not found</p><h1>That article is not available.</h1><Link className="glass-btn glass-btn--primary" to="/insights">View all insights</Link></section></main>
  return <main className="insights-page"><article className="article"><Link className="article-back" to="/insights">← All insights</Link><div className="insight-meta"><span>{insight.category}</span><span>{insight.readTime}</span><span>{insight.published}</span></div><h1>{insight.title}</h1><p className="article-lead">{insight.description}</p>{insight.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<aside className="article-cta glass"><p className="section-label">A practical next step</p><h2>Need help applying this to your business?</h2><p>Start with one clear outcome. We’ll help you identify a practical scope and reply within 1–2 business days.</p><div><Link className="glass-btn" to={insight.servicePath}>{insight.serviceLabel}</Link><a className="glass-btn glass-btn--primary" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={reportWhatsAppConversion}>Discuss on WhatsApp ↗</a></div></aside></article></main>
}

export default InsightArticle
