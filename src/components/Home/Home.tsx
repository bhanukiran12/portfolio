import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useParallax } from '../../hooks/useParallax'
import { contactConfig, getWhatsAppUrl } from '../../config/contact'
import ContactChannels from '../ContactChannels/ContactChannels'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import conversionPlatformDemo from '../../assets/projects/conversion-platform-demo.webm'
import parentMessageDemo from '../../assets/projects/parent-message-demo.webm'
import './Home.css'

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  demoVideo?: string
  bento: 'featured' | 'wide' | 'standard'
  highlights?: string[]
}

const skills = [
  'Python', 'OpenAI GPT-4o', 'RAG', 'Vector DBs', 'Embeddings', 'Prompt Engineering',
  'n8n', 'Zapier', 'WhatsApp Business API',
  'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'Redux',
  'Node.js', 'Express.js', 'REST APIs', 'GraphQL',
  'MongoDB', 'MySQL',
  'Git', 'CI/CD', 'Vite',
  'SEO', 'WCAG', 'Responsive Design',
]

const services = [
  {
    title: 'RAG & Document Q&A',
    description:
      'Chat over your own docs, tickets, and knowledge base — grounded answers with citations and hallucination guardrails.',
  },
  {
    title: 'Conversational AI',
    description:
      'Support and onboarding chatbots on WhatsApp, web, or Slack — prompt-engineered, with a human-in-the-loop dashboard.',
  },
  {
    title: 'Workflow Automation',
    description:
      'Connect the tools you already use — n8n, Zapier, Sheets, APIs — so repetitive work runs itself.',
  },
]

const projects: Project[] = [
  {
    title: 'Pulse AI',
    description:
      'Enterprise WhatsApp AI platform that automates customer conversations at scale, built end to end.',
    highlights: [
      'Problem — support teams buried under repetitive WhatsApp queries.',
      'Approach — RAG over the company knowledge base + GPT-4o, with prompt guardrails and a live human-in-the-loop dashboard.',
      'Result — automated first-response across thousands of customer conversations.',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenAI GPT-4o', 'RAG', 'Vector DB', 'WhatsApp API'],
    link: '#',
    bento: 'featured',
  },
  {
    title: 'HoomanLabs Voice Agents',
    description:
      'Voice-agent creation, training, prompting, and workflow design for production-grade conversational experiences.',
    tech: ['Voice Agents', 'Prompt Engineering', 'Conversation Design', 'LLMs'],
    link: 'https://hoomanlabs.com/platform/agents/create',
    bento: 'wide',
  },
  {
    title: 'Parent Comms Automation',
    description:
      'Workflow automation that turns a Google Sheet of student data into personalized parent WhatsApp messages — consistent tone at scale, zero manual copy-paste.',
    tech: ['React.js', 'JavaScript', 'REST APIs', 'Google Sheets API', 'Workflow Automation'],
    link: 'https://parent-message.vercel.app/',
    demoVideo: parentMessageDemo,
    bento: 'wide',
  },
  {
    title: 'Conversion Platform',
    description:
      'Lead-generation web platform with dynamic, high-conversion forms for user acquisition and sales workflows.',
    tech: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    link: 'https://ccbp.in/intensive',
    demoVideo: conversionPlatformDemo,
    bento: 'wide',
  },
]

const comingSoon = [
  {
    title: 'RAG Document Q&A Bot',
    description:
      'Upload a set of documents, ask questions, get cited answers — with retrieval tuning and hallucination guardrails.',
    tech: ['Python', 'OpenAI', 'RAG', 'Vector DBs'],
  },
  {
    title: 'Workflow Automation Builder',
    description:
      'Visual trigger → action flows that wire together the tools a small team already runs on.',
    tech: ['n8n', 'APIs', 'Webhooks'],
  },
  {
    title: 'Tool-Calling AI Agent',
    description:
      'An agent that actually executes — calling real APIs and tools to complete multi-step tasks, not just chat.',
    tech: ['LLMs', 'Function Calling', 'Node.js'],
  },
]

const learningProjects = [
  {
    title: 'Schedora',
    description: 'Task and scheduling app for planning, organizing, and tracking daily work.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    link: 'https://sechdora-2f2g.onrender.com',
  },
  {
    title: 'Vyra',
    description: 'Goat-and-tiger strategy game with real-time gameplay and competitive mechanics.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    link: 'https://vyra-ues5.onrender.com',
  },
]

const experience = [
  {
    title: 'Team Lead Manager',
    company: 'NxtWave',
    period: 'April 2025 — Present',
    description:
      'Lead development of AI-powered support and onboarding systems alongside scalable web applications. Drive architecture, code quality, and engineering best practices while mentoring developers.',
    icon: 'TL',
  },
  {
    title: 'Associate Mentor',
    company: 'NIAT (NxtWave)',
    period: 'December 2024 — July 2025',
    description:
      'Mentored developers in MERN stack and frontend architecture. Conducted code reviews and enforced best practices.',
    icon: 'AM',
  },
  {
    title: 'MERN Stack Trainee',
    company: 'NxtWave',
    period: 'January 2024 — December 2024',
    description:
      'Built full-stack applications with React, Node.js, and MongoDB. Developed reusable UI components and integrated REST APIs.',
    icon: 'TR',
  },
]

function Home() {
  useScrollToSection()
  const heroParallax = useParallax<HTMLDivElement>(0.06)
  const photoParallax = useParallax<HTMLDivElement>(-0.04)

  return (
    <div className="portfolio">
      <main id="main-content">
        <section id="hero" className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy" ref={heroParallax}>
              <p className="hero-label">
                <span className="hero-label-dot" aria-hidden="true" />
                AI Systems · Automation · Full Stack
              </p>
              <h1 id="hero-heading" className="hero-name">
                Bhanu Kiran
                <span className="hero-surname text-gradient">Vemula</span>
              </h1>
              <p className="hero-role">I build AI systems that do real work.</p>
              <p className="hero-intro">
                I design and ship <strong>RAG-based support systems, conversational AI, and
                workflow automation</strong> — then engineer the full stack around them so they
                hold up in production. Team Lead at NxtWave, where my AI systems handle customer
                conversations and onboarding at scale.
              </p>
              <div className="hero-stats">
                <div className="stat-box glass">
                  <span className="stat-value">RAG</span>
                  <span className="stat-label">LLM systems in production</span>
                </div>
                <div className="stat-box glass">
                  <span className="stat-value">2+</span>
                  <span className="stat-label">Years full stack</span>
                </div>
                <div className="stat-box glass">
                  <span className="stat-value">24–48h</span>
                  <span className="stat-label">Reply time</span>
                </div>
              </div>
              <div className="hero-actions">
                <a
                  href={contactConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn--primary"
                >
                  Book a call
                </a>
                <a href="#projects" className="glass-btn glass-btn--ghost">
                  See the work
                </a>
              </div>
            </div>

            <div className="hero-photo-wrap" ref={photoParallax}>
              <div className="hero-photo-frame glass">
                <div className="hero-photo-glow" aria-hidden="true" />
                <img
                  src="https://res.cloudinary.com/df7wnybwg/image/upload/f_auto,q_auto,w_840/v1787814093/7f69e113-bea0-4879-b63d-3869e1c88818_x6biez.png"
                  alt="Bhanu Kiran Vemula — AI systems and full stack engineer"
                  className="hero-photo"
                  width={420}
                  height={525}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="available" className="section" aria-labelledby="available-heading">
          <div className="avail-card glass">
            <div className="avail-head">
              <p className="avail-status">
                <span
                  className={`avail-dot ${contactConfig.availableForFreelance ? 'avail-dot--on' : ''}`}
                  aria-hidden="true"
                />
                {contactConfig.availableForFreelance
                  ? `Currently available for freelance — ${contactConfig.freelanceCapacity.toLowerCase()}`
                  : 'Freelance schedule is currently full — reach out to join the waitlist'}
              </p>
              <h2 id="available-heading" className="avail-title">
                AI &amp; automation projects, built to ship
              </h2>
              <p className="avail-lead">
                I take on focused engagements in RAG systems, conversational AI, and workflow
                automation — with the full-stack engineering to put them in production.{' '}
                {contactConfig.responseTime} · Remote, IST-aligned.
              </p>
            </div>

            <div className="avail-services">
              {services.map((service) => (
                <div key={service.title} className="avail-service">
                  <h3 className="avail-service-title">{service.title}</h3>
                  <p className="avail-service-desc">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="avail-actions">
              <a
                href={contactConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn--primary"
              >
                Book a call
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn--ghost"
              >
                WhatsApp
              </a>
              <a href={`mailto:${contactConfig.email}`} className="glass-btn glass-btn--ghost">
                Email
              </a>
              <Link to="/work-with-me" className="avail-link">
                How I work →
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <header className="section-head">
            <span className="section-label">01 — About</span>
            <h2 id="about-heading" className="section-title">
              Building with clarity
            </h2>
            <p className="section-subtitle">
              Engineer focused on AI systems that solve real problems — and hold up in production.
            </p>
          </header>

          <div className="about-bento">
            <div className="about-card glass about-bento-main">
              <p>
                I&apos;m <strong>Bhanu Kiran Vemula</strong> — Team Lead at <strong>NxtWave</strong>,
                where I build <strong>AI chatbots, RAG-based support systems, and onboarding
                automation</strong> that reach thousands of learners, and lead the engineers who
                ship them.
              </p>
              <p>
                <strong>BTech Computer Science (VIT)</strong> with hands-on full-stack delivery
                across React, Node.js, and Python. I pair LLM and retrieval work with the
                engineering to deploy, monitor, and scale it — live demos in the work section
                below.
              </p>
              <div className="about-badges">
                <span className="glass-tag">RAG systems</span>
                <span className="glass-tag">Conversational AI</span>
                <span className="glass-tag">Workflow automation</span>
                <span className="glass-tag">Full stack</span>
              </div>
            </div>

            <aside className="skills-panel glass about-bento-side">
              <h3 className="panel-title">Tech stack</h3>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <span key={skill} className="glass-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="education-block">
                <h4 className="panel-title">Education</h4>
                <p className="edu-degree">BTech Computer Science</p>
                <p className="edu-meta">VIT Amaravathi · GPA 8.09 · 2019–2024</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-heading">
          <header className="section-head">
            <span className="section-label">02 — Experience</span>
            <h2 id="experience-heading" className="section-title">
              Career timeline
            </h2>
            <p className="section-subtitle">Leadership and engineering at scale.</p>
          </header>

          <div className="timeline">
            {experience.map((exp) => (
              <article key={exp.title} className="timeline-card glass">
                <div className="timeline-icon">{exp.icon}</div>
                <div className="timeline-body">
                  <div className="timeline-top">
                    <h3>{exp.title}</h3>
                    <time className="timeline-period">{exp.period}</time>
                  </div>
                  <p className="timeline-company">{exp.company}</p>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="section" aria-labelledby="journey-heading">
          <header className="section-head">
            <span className="section-label">03 — Impact</span>
            <h2 id="journey-heading" className="section-title">
              A journey worth sharing
            </h2>
            <p className="section-subtitle">Training 100+ NIAT mentors at NxtWave.</p>
          </header>

          <div className="journey-bento">
            <div className="journey-image glass journey-bento-visual">
              <img
                src="/images/niat-journey.png"
                alt="NIAT mentor training at NxtWave Institute of Advanced Technologies"
                loading="lazy"
              />
            </div>
            <div className="journey-text glass journey-bento-copy">
              <p>
                From May 2025, I had the privilege of training over{' '}
                <strong>100 NIAT mentors and instructors</strong>. Each now guides thousands of
                students across India — a ripple effect that multiplies impact exponentially.
              </p>
              <p>
                This was never just about sessions. It was conversations with brilliant minds from{' '}
                <strong>IITs, IIMs</strong>, and institutions nationwide.
              </p>
              <blockquote className="journey-quote">
                When we empower teachers, we transform generations.
              </blockquote>
              <ul className="journey-list">
                <li>Tech mentors uplift students.</li>
                <li>Students drive innovation.</li>
                <li>That innovation builds a developed India.</li>
              </ul>
              <div className="journey-tags">
                <span className="glass-tag">#Education</span>
                <span className="glass-tag">#NIAT</span>
                <span className="glass-tag">#NxtWave</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-heading">
          <header className="section-head">
            <span className="section-label">04 — Work</span>
            <h2 id="projects-heading" className="section-title">
              Selected work
            </h2>
            <p className="section-subtitle">
              AI platforms, conversational systems, automation, and the full-stack apps around them.
            </p>
          </header>

          <div className="bento-grid">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`bento-card glass bento-${project.bento} ${project.demoVideo ? 'bento-has-video' : ''}`}
              >
                <span className="bento-index">0{index + 1}</span>
                <h3 className="bento-title">{project.title}</h3>
                <p className="bento-desc">{project.description}</p>
                {project.highlights && (
                  <ul className="bento-highlights">
                    {project.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
                <div className="bento-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="glass-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.demoVideo && (
                  <div className="bento-demo">
                    <span className="demo-label">Live demo</span>
                    <ProjectVideo src={project.demoVideo} title={project.title} />
                  </div>
                )}
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-link glass-btn glass-btn--ghost"
                  >
                    Visit site →
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="next-block">
            <h3 className="next-title">Building next</h3>
            <div className="next-grid">
              {comingSoon.map((project) => (
                <article key={project.title} className="bento-card glass next-card">
                  <span className="next-tag glass-tag">Coming soon</span>
                  <h4 className="bento-title">{project.title}</h4>
                  <p className="bento-desc">{project.description}</p>
                  <div className="bento-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="glass-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <details className="learning-block">
            <summary className="learning-summary">
              Earlier &amp; learning projects
            </summary>
            <ul className="learning-list">
              {learningProjects.map((project) => (
                <li key={project.title} className="learning-item">
                  <div className="learning-item-head">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="learning-item-title"
                    >
                      {project.title} →
                    </a>
                    <span className="learning-item-tech">{project.tech.join(' · ')}</span>
                  </div>
                  <p className="learning-item-desc">{project.description}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
          <header className="section-head">
            <span className="section-label">05 — Contact</span>
            <h2 id="contact-heading" className="section-title">
              Get in touch
            </h2>
            <p className="section-subtitle">
              Book a call or send a message. Read{' '}
              <Link to="/work-with-me" className="contact-inline-link">
                how to work with me
              </Link>{' '}
              first if you are exploring a project.
            </p>
          </header>

          <div className="contact-bento">
            <aside className="contact-aside glass">
              <h3 className="contact-aside-title">Quick connect</h3>
              <ContactChannels />
            </aside>
            <div className="contact-form-wrap glass">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ProjectVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className="bento-video"
      src={src}
      autoPlay
      controls
      muted
      loop
      playsInline
      preload="auto"
      aria-label={`${title} demo`}
    />
  )
}

export default Home
