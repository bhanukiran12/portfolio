import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './LegalPage.css'

type LegalPageProps = { type: 'privacy' | 'terms' }

function LegalPage({ type }: LegalPageProps) {
  const privacy = type === 'privacy'

  useEffect(() => {
    const title = privacy ? 'Privacy Policy | BhanuBeyond Technologies' : 'Terms and Conditions | BhanuBeyond Technologies'
    const description = privacy
      ? 'How BhanuBeyond Technologies handles information submitted through its website, contact form, and AI assistant.'
      : 'Terms for using the BhanuBeyond Technologies website and engaging its website, software, and AI automation services.'
    document.title = title
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.append(meta)
    }
    meta.content = description
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = `https://bhanubeyond.com${privacy ? '/privacy' : '/terms'}`
    return () => {
      document.title = 'BhanuBeyond Technologies — Websites, E-commerce, Software & AI'
      meta!.content = 'BhanuBeyond Technologies builds websites and e-commerce stores, full-stack products, AI chatbots, RAG systems, and workflow automation for businesses.'
      if (canonical) canonical.href = 'https://bhanubeyond.com/'
    }
  }, [privacy])

  return (
    <>
    <main id="main-content" className="legal-page">
      <div className="legal-inner">
        <Link to="/" className="legal-back">← BhanuBeyond</Link>
        <p className="section-label">BhanuBeyond Technologies</p>
        <h1>{privacy ? 'Privacy Policy' : 'Terms and Conditions'}</h1>
        <p className="legal-updated">Last updated: 14 October 2026</p>

        {privacy ? (
          <div className="legal-copy">
            <p>This policy explains how BhanuBeyond Technologies (“BhanuBeyond”, “we”, “us”) handles information when you visit <a href="https://bhanubeyond.com">bhanubeyond.com</a>, contact us, or use the website’s AI assistant.</p>
            <h2>Information you provide</h2>
            <p>If you use the contact form, we receive the name, email address, and message you submit. The form is processed by Formspree, which may filter spam before forwarding a valid enquiry to us. If you email or message us on WhatsApp, the relevant details are handled by that service and by us to respond.</p>
            <h2>AI assistant and technical data</h2>
            <p>If you use the AI assistant, the messages in that conversation are sent to our hosting provider, Vercel, and to OpenRouter to generate a reply. The service may log conversation text and a conversation identifier to operate and troubleshoot the assistant. If a private chat logging destination is configured for the service, those records may also be sent there. Do not submit passwords, payment details, sensitive personal information, or confidential material to the assistant.</p>
            <p>Our hosting and security providers may process technical information such as IP address, browser, device, and request data to deliver and protect the site.</p>
            <p>For pricing display, Vercel may use your IP address to provide us with an approximate country code. We use only that country-level result to show INR prices in India and USD prices elsewhere; we do not store the country code from this feature.</p>
            <h2>Analytics and cookies</h2>
            <p>Microsoft Clarity analytics is optional and loads only if you choose “Accept analytics” in the consent banner. If you reject, Clarity is not loaded. You can change your choice at any time using “Cookie settings” in the footer. The site stores your choice in your browser’s local storage; the consent setting itself is not an advertising cookie.</p>
            <h2>Why we use information</h2>
            <p>We use information to respond to requests, discuss and deliver services, operate and secure the site, prevent spam, and—only with your consent—understand how visitors use the site. We do not sell personal information.</p>
            <h2>Service providers and retention</h2>
            <p>Information may be handled by providers needed to run the site and respond to you, including Vercel, Formspree, OpenRouter, Microsoft Clarity (after consent), and the communication service you choose. These providers may process data in other countries. We keep enquiry and project information only as long as reasonably needed for those purposes, legal obligations, and dispute resolution, then delete or anonymize it where practical.</p>
            <h2>Your choices and requests</h2>
            <p>You may ask us to access, correct, or delete information you provided, or withdraw analytics consent, by emailing <a href="mailto:hello@bhanubeyound.com">hello@bhanubeyound.com</a>. We will handle requests under applicable law. You can also avoid using the contact form or AI assistant if you do not want to submit information through them.</p>
            <h2>Children and changes</h2>
            <p>This site is intended for businesses and professionals and is not directed to children. We may update this policy when our practices change; the date above will reflect the latest revision.</p>
            <h2>Contact</h2>
            <p>Questions about privacy can be sent to <a href="mailto:hello@bhanubeyound.com">hello@bhanubeyound.com</a>.</p>
          </div>
        ) : (
          <div className="legal-copy">
            <p>These terms apply to your use of the BhanuBeyond Technologies website. By using the site, you agree to these terms. If you do not agree, please do not use the site.</p>
            <h2>Website information</h2>
            <p>The site provides general information about our services, including business websites, e-commerce stores, custom software, AI systems, and automation. Website content is informational, may change, and is not a binding project offer.</p>
            <h2>Projects and services</h2>
            <p>Scope, fees, timelines, deliverables, ownership, support, and any use of third-party services for a project will be agreed separately in writing before work begins. Nothing on this site guarantees a particular result, launch date, or availability.</p>
            <h2>Acceptable use</h2>
            <p>Do not misuse the site, attempt unauthorized access, interfere with its operation, submit unlawful or harmful content, or use the AI assistant to request dangerous or abusive activity. Do not submit confidential or sensitive information to the AI assistant.</p>
            <h2>Intellectual property</h2>
            <p>Unless otherwise stated, site text, branding, design, and original materials belong to BhanuBeyond Technologies or their respective owners and may not be copied or reused without permission. Third-party marks and tools remain the property of their owners.</p>
            <h2>Third-party services and links</h2>
            <p>The site may link to external services such as WhatsApp, Formspree, Vercel, or OpenRouter. Those services are governed by their own terms and privacy policies. We are not responsible for external sites or services.</p>
            <h2>Availability and liability</h2>
            <p>We aim to keep the site available and accurate but provide it on an “as available” basis and do not guarantee uninterrupted or error-free operation. To the extent permitted by applicable law, BhanuBeyond Technologies is not liable for indirect or consequential loss arising from use of this informational site.</p>
            <h2>Changes and contact</h2>
            <p>We may update these terms by posting a revised version here. Continued use after an update means you accept the revised terms. Questions can be sent to <a href="mailto:hello@bhanubeyound.com">hello@bhanubeyound.com</a>.</p>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  )
}

export default LegalPage
