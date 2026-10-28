import { useState } from 'react'

const projects = [
  {
    name: 'Schedora',
    category: 'Scheduling, forms & workflow platform',
    description: 'Defined the product architecture and directed AI-assisted implementation, code review, and validation for a platform combining scheduling, intake forms, and automated follow-ups.',
    technologies: ['JavaScript', 'Node.js', 'SQLite', 'PostgreSQL', 'Anthropic SDK', 'GitHub Actions'],
    href: 'https://schedora.in/',
    theme: 'sage',
    visual: 'One platform. Connected workflows.',
    detail: 'Scheduling → Forms → Follow-ups',
    highlights: [
      'Configurable forms with conditional questions, answer piping, versioned publishing, server-side validation, response history, and CSV export.',
      'One-to-one, group, collective, and round-robin appointments with timezone-aware availability, booking limits, cancellation, and rescheduling.',
      'Workspace authorization, scrypt password hashing, cookie-based sessions, and CSRF protection.',
      'Backend services structured around SQL migrations, background jobs, and a durable outbox.',
      'Vercel and Render deployments with GitHub Actions checks for integration tests, browser journeys, and PostgreSQL compatibility.',
    ],
  },
  {
    name: 'WhatsApp AI Support Chatbot',
    category: 'AI application engineering · Retrieval-augmented generation',
    description: 'Developed and deployed a WhatsApp support chatbot for team use, connecting OpenAI APIs with a retrieval-augmented generation workflow.',
    technologies: ['OpenAI API', 'RAG', 'Supabase PostgreSQL', 'pgvector', 'Gallabox'],
    theme: 'blue',
    visual: 'Context-aware support.',
    detail: 'Knowledge base → Retrieval → WhatsApp',
    highlights: [
      'Retrieved relevant knowledge-base content using Supabase PostgreSQL and pgvector.',
      'Used retrieved context to ground OpenAI responses in the support knowledge base.',
      'Integrated the retrieval and response workflow with WhatsApp through Gallabox.',
    ],
  },
  {
    name: 'Lead Management & CRM Automation',
    category: 'Full-stack development · API integrations',
    description: 'Designed and developed a full-stack lead capture and management pipeline, moving verified lead information into downstream business workflows.',
    technologies: ['React.js', 'Node.js', 'REST APIs', 'Google Sheets API', 'CRM APIs'],
    theme: 'orange',
    visual: 'Verified leads. Connected systems.',
    detail: 'Capture → OTP verification → CRM',
    highlights: [
      'Built the lead capture interface with React.js and backend processing with Node.js.',
      'Implemented OTP verification and backend validation of lead information.',
      'Integrated Google Sheets and CRM APIs to transfer verified leads into downstream workflows.',
    ],
  },
] as const

const experience = [
  { role: 'Team Lead Manager', company: 'NxtWave', period: 'April 2025 — Present' },
  { role: 'Associate Mentor', company: 'NIAT', period: 'December 2024 — April 2025' },
  { role: 'Frontend Development Intern', company: 'Mentorify', period: 'January — May 2024', description: 'Contributed to frontend development during the internship.' },
]

const skills = [
  { title: 'Programming', items: ['C++', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { title: 'Core computer science', items: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS', 'Time & Space Complexity'] },
  { title: 'Frontend', items: ['React.js', 'React Router', 'HTML5', 'CSS3', 'Bootstrap'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Webhooks', 'WebSockets'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'pgvector'] },
  { title: 'AI engineering', items: ['OpenAI API', 'Anthropic SDK', 'RAG', 'Embeddings', 'Semantic Search', 'AI-Assisted Development'] },
  { title: 'Tools & deployment', items: ['Git', 'GitHub', 'Docker', 'Postman', 'GitHub Actions', 'Vercel', 'Render'] },
]

function ProfessionalPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  return (
    <div className="personal-site">
      <a className="personal-skip" href="#main-content">Skip to content</a>
      <header className="personal-header">
        <a className="personal-wordmark" href="/" aria-label="Vemula Bhanu Kiran home">bhanu<span>kiran.</span></a>
        <button className="personal-menu-toggle" aria-controls="personal-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
          {menuOpen ? 'Close menu' : 'Open menu'}
        </button>
        <nav id="personal-nav" aria-label="Main" className={menuOpen ? 'is-open' : ''}>
          {['Work', 'About', 'Experience', 'Contact'].map(label => (
            <a key={label} href={`/#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="personal-header-link" href="mailto:bhanukiran750@gmail.com">Let’s connect <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content">
        <section className="personal-hero personal-container" aria-labelledby="personal-title">
          <div className="personal-hero-copy">
            <p className="personal-eyebrow"><span className="personal-dot" /> FULL-STACK DEVELOPMENT · BACKEND · AI</p>
            <h1 id="personal-title">Vemula Bhanu<br /><span>Kiran</span></h1>
            <p className="personal-introduction">Computer Science graduate building <strong>full-stack applications, backend systems, and practical AI solutions.</strong></p>
            <p className="personal-hero-note">I define architectures, direct AI-assisted implementation and validation, and connect applications with the data and workflows that make them useful.</p>
            <div className="personal-actions">
              <a className="personal-button" href="/#work">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="personal-text-link" href="https://www.linkedin.com/in/bhanu-kiran-vemula/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside className="personal-intro-card" aria-label="Profile at a glance">
            <div className="personal-card-top"><span>ENGINEERING WITH INTENTION</span><span aria-hidden="true">✳</span></div>
            <img className="personal-portrait" src="/images/vemula-bhanu-kiran.jpg" alt="Vemula Bhanu Kiran" width={400} height={400} fetchPriority="high" />
            <div className="personal-card-caption"><strong>Vemula Bhanu Kiran</strong><span>Full-stack development · Backend systems · AI</span></div>
            <div className="personal-card-bottom"><span>MADHAPUR, HYDERABAD</span><span>TELANGANA, INDIA</span></div>
          </aside>
        </section>

        <div className="personal-focus-strip">
          <span>Full-stack development</span><span aria-hidden="true">✳</span>
          <span>Backend systems</span><span aria-hidden="true">✳</span>
          <span>AI application engineering</span><span aria-hidden="true">✳</span>
          <span>Workflow automation</span>
        </div>

        <section id="work" className="personal-section personal-container" aria-labelledby="work-title">
          <div className="personal-section-heading">
            <div><p className="personal-eyebrow">01 / TECHNICAL PROJECTS</p><h2 id="work-title">Architecture to implementation.</h2></div>
            <p>Scheduling, retrieval-augmented AI, and verified lead pipelines — built around practical workflows.</p>
          </div>
          <div className="personal-project-grid">
            {projects.map((project, index) => (
              <article key={project.name} className={index === 0 ? 'personal-project personal-project--featured' : 'personal-project'}>
                <div className={`personal-project-art personal-project-art--${project.theme}`} aria-hidden="true">
                  <span className="personal-project-number">0{index + 1}</span>
                  <strong>{project.visual}</strong>
                  <span className="personal-project-flow">{project.detail}</span>
                  <div className="personal-art-orbit" />
                </div>
                <div className="personal-project-content">
                  <div className="personal-project-heading">
                    <div><p className="personal-eyebrow">{project.category}</p><h3>{project.name}</h3></div>
                    <button
                      className="personal-project-toggle"
                      aria-expanded={expandedProject === project.name}
                      aria-controls={`project-${index}`}
                      aria-label={`${expandedProject === project.name ? 'Hide' : 'Show'} details for ${project.name}`}
                      onClick={() => setExpandedProject(expandedProject === project.name ? null : project.name)}
                    >
                      {expandedProject === project.name ? '−' : '+'}
                    </button>
                  </div>
                  <p>{project.description}</p>
                  <ul className="personal-tags" aria-label={`${project.name} technologies`}>
                    {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
                  </ul>
                  {'href' in project && (
                    <a className="personal-text-link personal-project-live" href={project.href} target="_blank" rel="noopener noreferrer">Explore Schedora <span aria-hidden="true">↗</span></a>
                  )}
                  <div id={`project-${index}`} hidden={expandedProject !== project.name} className="personal-project-detail">
                    <ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="personal-about" aria-labelledby="about-title">
          <div className="personal-container personal-about-grid">
            <div><p className="personal-eyebrow">02 / PROFESSIONAL SUMMARY</p><h2 id="about-title">Systems thinking.<br />Hands-on engineering.</h2></div>
            <div className="personal-about-copy">
              <p>I’m a Computer Science graduate with hands-on experience in full-stack development, backend systems, and AI application engineering.</p>
              <p>For Schedora, I defined the architecture and directed AI-assisted implementation and validation across scheduling, forms, and workflow automation.</p>
              <p>I’ve also built a WhatsApp support chatbot using retrieval-augmented generation and a lead management pipeline integrating verification, Google Sheets, and CRM APIs.</p>
              <a className="personal-text-link" href="https://github.com/bhanukiran12" target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section id="experience" className="personal-section personal-container" aria-labelledby="experience-title">
          <div className="personal-section-heading">
            <div><p className="personal-eyebrow">03 / PROFESSIONAL EXPERIENCE</p><h2 id="experience-title">My professional journey.</h2></div>
            <p>Experience across team leadership, mentoring, and frontend development.</p>
          </div>
          <div className="personal-timeline">
            {experience.map(item => (
              <article key={item.role}>
                <div><p className="personal-eyebrow">{item.company}</p><h3>{item.role}</h3>{item.description && <p className="personal-experience-description">{item.description}</p>}</div>
                <p>{item.period}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="personal-skills personal-container" aria-labelledby="skills-title">
          <p className="personal-eyebrow">TECHNICAL SKILLS</p>
          <h2 id="skills-title">Foundations, systems, and tools.</h2>
          <div className="personal-skills-grid">
            {skills.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
          </div>
        </section>

        <section id="education" className="personal-learning personal-container" aria-labelledby="education-title">
          <p className="personal-eyebrow">04 / EDUCATION & TRAINING</p>
          <h2 id="education-title">A foundation in computer science.</h2>
          <div className="personal-learning-grid">
            <article>
              <p className="personal-eyebrow">VIT-AP UNIVERSITY · 2020–2024</p>
              <h3>B.Tech in Computer Science and Engineering</h3>
              <p>Bachelor of Technology</p>
              <span className="personal-academic-score">CGPA 8.09 / 10</span>
            </article>
            <article>
              <p className="personal-eyebrow">NXTWAVE · JANUARY–DECEMBER 2024</p>
              <h3>MERN Stack Trainee</h3>
              <p>Full-stack development training</p>
            </article>
          </div>
        </section>

        <section id="contact" className="personal-contact personal-container" aria-labelledby="contact-title">
          <p className="personal-eyebrow">05 / LET’S CONNECT</p>
          <h2 id="contact-title">Let’s talk engineering.</h2>
          <p>For full-stack development, backend systems, and AI application engineering opportunities, get in touch.</p>
          <a className="personal-email" href="mailto:bhanukiran750@gmail.com">bhanukiran750@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="personal-contact-links">
            <a href="tel:+916309499278">+91 6309499278</a>
            <a href="https://www.linkedin.com/in/bhanu-kiran-vemula/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/bhanukiran12" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
          <p className="personal-location">Madhapur, Hyderabad, Telangana</p>
        </section>
      </main>
      <footer className="personal-footer personal-container"><span>© {new Date().getFullYear()} Vemula Bhanu Kiran</span><span>Hyderabad, India.</span><a href="/#main-content">Back to top ↑</a></footer>
    </div>
  )
}

export default ProfessionalPortfolio
