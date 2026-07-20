import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useParallax } from '../../hooks/useParallax'
import ContactChannels from '../ContactChannels/ContactChannels'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import conversionPlatformDemo from '../../assets/projects/conversion-platform-demo.webm'
import parentMessageDemo from '../../assets/projects/parent-message-demo.webm'
import holiRunDemo from '../../assets/projects/holi-run-demo.webm'
import schedoraDemo from '../../assets/projects/schedora-demo.webm'
import vyraDemo from '../../assets/projects/vyra-demo.webm'
import './Home.css'

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  demoVideo?: string
  bento: 'featured' | 'wide' | 'standard'
}

const skills = [
  'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind',
  'Redux', 'REST APIs', 'GraphQL',
  'Git', 'CI/CD', 'Vite',
  'Node.js', 'Express.js',
  'MongoDB', 'MySQL',
  'SEO', 'WCAG', 'Responsive Design',
]

const projects: Project[] = [
  {
    title: 'Pulse AI',
    description:
      'Enterprise WhatsApp AI platform combining RAG, prompt engineering, and a live conversation dashboard to automate customer interactions at scale.',
    tech: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenAI GPT-4o', 'RAG', 'WhatsApp API'],
    link: '#',
    bento: 'featured',
  },
  {
    title: 'HoomanLabs Voice Agents',
    description:
      'Voice-agent creation, training, prompting, and workflow design for production-grade conversational experiences.',
    tech: ['Voice Agents', 'Prompt Engineering', 'Workflow Design', 'AI'],
    link: 'https://hoomanlabs.com/platform/agents/create',
    bento: 'featured',
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
  {
    title: 'AI-Powered Communication System',
    description:
      'WhatsApp message generator with personalized parent templates via Google Sheets API.',
    tech: ['React.js', 'JavaScript', 'REST APIs', 'Google Sheets API'],
    link: 'https://parent-message.vercel.app/',
    demoVideo: parentMessageDemo,
    bento: 'wide',
  },
  {
    title: 'Holi Run Game',
    description: 'Interactive browser game with responsive controls and engaging level design.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    link: 'https://nxtholi-run.netlify.app/',
    demoVideo: holiRunDemo,
    bento: 'standard',
  },
  {
    title: 'Schedora',
    description: 'Task and scheduling application for planning, organizing, and tracking daily work.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    link: 'https://sechdora-2f2g.onrender.com',
    demoVideo: schedoraDemo,
    bento: 'standard',
  },
  {
    title: 'Vyra',
    description: 'Goat and tiger strategy game with real-time gameplay and competitive mechanics.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    link: 'https://vyra-ues5.onrender.com',
    demoVideo: vyraDemo,
    bento: 'wide',
  },
]

const experience = [
  {
    title: 'Team Lead Manager',
    company: 'NxtWave',
    period: 'April 2025 — Present',
    description:
      'Lead development of scalable web applications and frontend systems. Drive architecture decisions, code quality, and engineering best practices while mentoring developers.',
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
                Full Stack · AI Products
              </p>
              <h1 id="hero-heading" className="hero-name">
                Bhanu Kiran
                <span className="hero-surname text-gradient">Vemula</span>
              </h1>
              <p className="hero-role">Engineer &amp; Team Lead</p>
              <p className="hero-intro">
                I build production-ready web applications, AI-powered tools, and scalable
                frontends at NxtWave — from conversion platforms and games to voice-agent
                workflows and mentor training at scale.
              </p>
              <div className="hero-stats">
                <div className="stat-box glass">
                  <span className="stat-value">2+</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat-box glass">
                  <span className="stat-value">20+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-box glass">
                  <span className="stat-value">100+</span>
                  <span className="stat-label">Mentors</span>
                </div>
              </div>
              <div className="hero-actions">
                <a href="#projects" className="glass-btn glass-btn--primary">
                  View work
                </a>
                <a
                  href="https://linkedin.com/in/bhanu-kiranvemula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn--ghost"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="hero-photo-wrap" ref={photoParallax}>
              <div className="hero-photo-frame glass">
                <div className="hero-photo-glow" aria-hidden="true" />
                <img
                  src="https://res.cloudinary.com/df7wnybwg/image/upload/v1770293271/mypics/12e_2026-02-05_at_5.16.19_PM_tr6pvu.jpg"
                  alt="Bhanu Kiran Vemula — full stack engineer"
                  className="hero-photo"
                  width={420}
                  height={420}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
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
              Engineering leader focused on scalable products, clean code, and real impact.
            </p>
          </header>

          <div className="about-bento">
            <div className="about-card glass about-bento-main">
              <p>
                I&apos;m <strong>Bhanu Kiran Vemula</strong> — Team Lead Manager at{' '}
                <strong>NxtWave</strong>, where I lead frontend systems, mentor engineers, and
                ship features that reach thousands of learners.
              </p>
              <p>
                <strong>BTech Computer Science (VIT)</strong> with hands-on MERN and React
                delivery. I&apos;ve built conversion platforms, AI communication tools, browser
                games, and scheduling apps — with live demos in the work section below.
              </p>
              <div className="about-badges">
                <span className="glass-tag">Team leadership</span>
                <span className="glass-tag">Full stack</span>
                <span className="glass-tag">AI products</span>
                <span className="glass-tag">Mentorship</span>
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
              Selected projects
            </h2>
            <p className="section-subtitle">
              Bento showcase — websites, games, AI tools, and full stack applications.
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
