import { useState } from 'react'

const projects = [
  {
    name: 'Conversion Platform',
    category: 'Frontend engineering · Lead generation',
    description: 'A lead-generation experience connecting campaign journeys with dynamic forms and sales workflows. Built to make the next step clear for prospective learners.',
    technologies: ['React', 'TypeScript', 'Dynamic forms'],
    href: 'https://ccbp.in/intensive',
    theme: 'orange',
    visual: 'From interest to action.',
    detail: 'Campaign → Form → Enquiry',
  },
  {
    name: 'Pulse AI',
    category: 'Applied AI · Conversational systems',
    description: 'A WhatsApp AI platform grounded in a knowledge base, with a live conversation view. Bringing retrieval, messaging, and human visibility into one workflow.',
    technologies: ['RAG', 'WhatsApp API', 'React', 'Node.js'],
    theme: 'blue',
    visual: 'Answers, with context.',
    detail: 'Knowledge → Retrieval → Conversation',
  },
  {
    name: 'AI-Powered Communication System',
    category: 'Workflow automation · Internal tools',
    description: 'A message generator that turns category templates and spreadsheet data into personalized parent communications, including student, coach, and university details.',
    technologies: ['React', 'Google Sheets API', 'REST APIs'],
    href: 'https://parent-message.vercel.app/',
    theme: 'sage',
    visual: 'Less repetition. More clarity.',
    detail: 'Templates → Personalization → Message',
  },
  {
    name: 'Schedora',
    category: 'Full-stack development · Productivity',
    description: 'A task and scheduling application for organizing daily work. Connecting a clear planning interface with the APIs that keep tasks and schedules in sync.',
    technologies: ['React', 'Node.js', 'REST APIs'],
    theme: 'sand',
    visual: 'Make room for focused work.',
    detail: 'Plan → Organize → Track',
  },
] as const

const experience = [
  { role: 'Team Lead Manager', company: 'NxtWave', period: 'Started April 2025', description: 'Web application development, frontend architecture, code quality, and developer mentoring.' },
  { role: 'Associate Mentor', company: 'NIAT · NxtWave', period: 'December 2024 — July 2025', description: 'Mentored developers in the MERN stack, reviewed code, and supported frontend engineering practices.' },
  { role: 'MERN Stack Trainee', company: 'NxtWave', period: 'January — December 2024', description: 'Built full-stack applications, reusable React components, and REST API integrations.' },
]

const skills = [
  { title: 'Interfaces', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'] },
  { title: 'Systems & data', items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'MySQL', 'Google Sheets API'] },
  { title: 'AI & workflows', items: ['RAG', 'LLM integrations', 'WhatsApp API', 'Workflow automation', 'Prompt design'] },
  { title: 'Engineering practice', items: ['Git & GitHub', 'Vite', 'CI/CD', 'Responsive design', 'Accessibility', 'Code review'] },
]

function ProfessionalPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  return (
    <div className="personal-site">
      <a className="personal-skip" href="#main-content">Skip to content</a>
      <header className="personal-header">
        <a className="personal-wordmark" href="/" aria-label="Bhanu Kiran Vemula home">bhanu<span>kiran.</span></a>
        <button className="personal-menu-toggle" aria-controls="personal-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Open menu'}</button>
        <nav id="personal-nav" aria-label="Main" className={menuOpen ? 'is-open' : ''}>
          {['Work', 'About', 'Experience', 'Contact'].map(label => <a key={label} href={`/#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="personal-header-link" href="mailto:bhanukiran750@gmail.com">Let’s connect <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content">
        <section className="personal-hero personal-container" aria-labelledby="personal-title">
          <div className="personal-hero-copy">
            <p className="personal-eyebrow"><span className="personal-dot" /> FULL-STACK DEVELOPMENT & APPLIED AI</p>
            <h1 id="personal-title">Thoughtful software.<br /><span>Useful AI.</span></h1>
            <p className="personal-introduction">I’m <strong>Bhanu Kiran Vemula</strong> — a developer and engineering mentor turning complex workflows into clear, useful digital experiences.</p>
            <p className="personal-hero-note">From responsive interfaces to knowledge-grounded AI, I care about the details that make software work for people.</p>
            <div className="personal-actions"><a className="personal-button" href="/#work">Explore my work <span aria-hidden="true">↓</span></a><a className="personal-text-link" href="https://www.linkedin.com/in/bhanu-kiran-vemula/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
          </div>
          <aside className="personal-intro-card" aria-label="Profile at a glance">
            <div className="personal-card-top"><span>BUILDING WITH INTENTION</span><span aria-hidden="true">✳</span></div>
            <div className="personal-monogram" aria-hidden="true">b<span>k</span><i>.</i></div>
            <div className="personal-card-caption"><strong>Bhanu Kiran Vemula</strong><span>Developer. Mentor. Problem solver.</span></div>
            <div className="personal-card-bottom"><span>BASED IN INDIA</span><span>OPEN TO CONVERSATIONS ↗</span></div>
          </aside>
        </section>

        <div className="personal-focus-strip"><span>Clean interfaces</span><span aria-hidden="true">✳</span><span>Connected systems</span><span aria-hidden="true">✳</span><span>Practical AI</span><span aria-hidden="true">✳</span><span>Thoughtful collaboration</span></div>

        <section id="work" className="personal-section personal-container" aria-labelledby="work-title">
          <div className="personal-section-heading"><div><p className="personal-eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Ideas put into practice.</h2></div><p>A selection of interfaces, tools, and AI systems I’ve worked on.</p></div>
          <div className="personal-project-grid">{projects.map((project, index) => <article key={project.name} className="personal-project">
            <div className={`personal-project-art personal-project-art--${project.theme}`} aria-hidden="true"><span className="personal-project-number">0{index + 1}</span><strong>{project.visual}</strong><span className="personal-project-flow">{project.detail}</span><div className="personal-art-orbit" /></div>
            <div className="personal-project-heading"><div><p className="personal-eyebrow">{project.category}</p><h3>{project.name}</h3></div><button className="personal-project-toggle" aria-expanded={expandedProject === project.name} aria-controls={`project-${index}`} aria-label={`${expandedProject === project.name ? 'Hide' : 'Show'} details for ${project.name}`} onClick={() => setExpandedProject(expandedProject === project.name ? null : project.name)}>{expandedProject === project.name ? '−' : '+'}</button></div>
            <p>{project.description}</p><ul className="personal-tags" aria-label={`${project.name} technologies`}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
            <div id={`project-${index}`} hidden={expandedProject !== project.name} className="personal-project-detail"><p><strong>Engineering focus:</strong> {project.detail.split(' → ').join(', ')}. The work brings together {project.technologies.join(', ')} around a practical user workflow.</p>{'href' in project && <a className="personal-text-link" href={project.href} target="_blank" rel="noopener noreferrer">Visit project <span aria-hidden="true">↗</span></a>}</div>
          </article>)}</div>
        </section>

        <section id="about" className="personal-about" aria-labelledby="about-title"><div className="personal-container personal-about-grid"><div><p className="personal-eyebrow">02 / A LITTLE ABOUT ME</p><h2 id="about-title">Curious by nature.<br />Practical by approach.</h2></div><div className="personal-about-copy"><p>I enjoy the space where engineering meets everyday problems: a form that needs to feel simpler, a team repeating the same task, or information that should be easier to find.</p><p>My work spans frontend development, full-stack applications, and AI-assisted workflows. Alongside building, I’ve mentored developers and helped teams think through code quality, architecture, and delivery.</p><p>I value clear communication, accessible interfaces, and software that is understandable long after its first release.</p><a className="personal-text-link" href="https://github.com/bhanukiran12" target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a></div></div></section>

        <section id="experience" className="personal-section personal-container" aria-labelledby="experience-title"><div className="personal-section-heading"><div><p className="personal-eyebrow">03 / EXPERIENCE</p><h2 id="experience-title">Building, learning, sharing.</h2></div><p>Experience across development, team leadership, and technical mentoring.</p></div><div className="personal-timeline">{experience.map(item => <article key={item.role}><div><p className="personal-eyebrow">{item.company}</p><h3>{item.role}</h3><p className="personal-period">{item.period}</p></div><p>{item.description}</p></article>)}</div></section>

        <section className="personal-skills personal-container" aria-labelledby="skills-title"><p className="personal-eyebrow">THE TOOLKIT</p><h2 id="skills-title">Tools follow the problem.</h2><div className="personal-skills-grid">{skills.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>

        <section id="contact" className="personal-contact personal-container" aria-labelledby="contact-title"><p className="personal-eyebrow">04 / SAY HELLO</p><h2 id="contact-title">Good work starts with<br />a good conversation.</h2><p>Have an engineering opportunity, a technical question, or an idea worth exploring? I’d be glad to hear from you.</p><a className="personal-email" href="mailto:bhanukiran750@gmail.com">bhanukiran750@gmail.com <span aria-hidden="true">↗</span></a><div className="personal-contact-links"><a href="https://www.linkedin.com/in/bhanu-kiran-vemula/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/bhanukiran12" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
      </main>
      <footer className="personal-footer personal-container"><span>© {new Date().getFullYear()} Bhanu Kiran Vemula</span><span>Built with care, in India.</span><a href="/#main-content">Back to top ↑</a></footer>
    </div>
  )
}

export default ProfessionalPortfolio
