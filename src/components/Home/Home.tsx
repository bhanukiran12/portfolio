import { useEffect, useRef } from 'react'
import Header from '../Header/Header'
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
    title: 'HoomanLabs Voice Agents',
    description:
      'Voice-agent creation, training, prompting, and workflow design for production-grade conversational experiences.',
    tech: ['Voice Agents', 'Prompt Engineering', 'Workflow Design', 'AI'],
    link: 'https://hoomanlabs.com/platform/agents/create',
  },
  {
    title: 'Conversion Platform',
    description:
      'Lead-generation web platform with dynamic, high-conversion forms for user acquisition and sales workflows.',
    tech: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    link: 'https://ccbp.in/intensive',
    demoVideo: conversionPlatformDemo,
  },
  {
    title: 'AI-Powered Communication System',
    description:
      'WhatsApp message generator with personalized parent templates via Google Sheets API.',
    tech: ['React.js', 'JavaScript', 'REST APIs', 'Google Sheets API'],
    link: 'https://parent-message.vercel.app/',
    demoVideo: parentMessageDemo,
  },
  {
    title: 'Holi Run Game',
    description: 'Interactive browser game with responsive controls and engaging level design.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    link: 'https://nxtholi-run.netlify.app/',
    demoVideo: holiRunDemo,
  },
  {
    title: 'Schedora',
    description: 'Task and scheduling application for planning, organizing, and tracking daily work.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    link: 'https://sechdora-2f2g.onrender.com',
    demoVideo: schedoraDemo,
  },
  {
    title: 'Vyra',
    description: 'Goat and tiger strategy game with real-time gameplay and competitive mechanics.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    link: 'https://vyra-ues5.onrender.com',
    demoVideo: vyraDemo,
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
  return (
    <div className="portfolio">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <section id="hero" className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-label">Portfolio · 2026</p>
              <h1 id="hero-heading" className="hero-name">
                Bhanu Kiran
                <span className="hero-surname">Vemula</span>
              </h1>
              <p className="hero-role">Full Stack Engineer &amp; Team Lead</p>
              <p className="hero-intro">
                I build production-ready web applications, AI-powered tools, and scalable
                frontends at NxtWave — from conversion platforms and games to voice-agent
                workflows and mentor training at scale.
              </p>
              <div className="hero-stats">
                <div className="stat-box">
                  <span className="stat-value">2+</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">20+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">100+</span>
                  <span className="stat-label">Mentors trained</span>
                </div>
              </div>
              <div className="hero-actions">
                <a href="#projects" className="nb-btn nb-btn--primary">
                  View work
                </a>
                <a
                  href="https://linkedin.com/in/bhanu-kiranvemula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn nb-btn--secondary"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <div className="hero-photo-frame nb-card">
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

          <div className="about-layout">
            <div className="about-card nb-card">
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
                <span className="nb-tag">Team leadership</span>
                <span className="nb-tag">Full stack</span>
                <span className="nb-tag">AI products</span>
                <span className="nb-tag">Mentorship</span>
              </div>
            </div>

            <aside className="skills-panel nb-card">
              <h3 className="panel-title">Tech stack</h3>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <span key={skill} className="nb-tag">
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

        <section id="experience" className="section section--alt" aria-labelledby="experience-heading">
          <header className="section-head">
            <span className="section-label">02 — Experience</span>
            <h2 id="experience-heading" className="section-title">
              Career timeline
            </h2>
            <p className="section-subtitle">Leadership and engineering at scale.</p>
          </header>

          <div className="timeline">
            {experience.map((exp) => (
              <article key={exp.title} className="timeline-card nb-card">
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

          <div className="journey-layout">
            <div className="journey-image nb-card">
              <img
                src="/images/niat-journey.png"
                alt="NIAT mentor training at NxtWave Institute of Advanced Technologies"
                loading="lazy"
              />
            </div>
            <div className="journey-text nb-card">
              <p>
                From May 2025, I had the privilege of training over{' '}
                <strong>100 NIAT mentors and instructors</strong>. Each now guides thousands of
                students across India — a ripple effect that multiplies impact exponentially.
              </p>
              <p>
                This was never just about sessions. It was conversations with brilliant minds from{' '}
                <strong>IITs, IIMs</strong>, and institutions nationwide — exchanging ideas and
                passion for shaping the future.
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
                <span className="nb-tag">#Education</span>
                <span className="nb-tag">#NIAT</span>
                <span className="nb-tag">#NxtWave</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section--alt" aria-labelledby="projects-heading">
          <header className="section-head">
            <span className="section-label">04 — Work</span>
            <h2 id="projects-heading" className="section-title">
              Selected projects
            </h2>
            <p className="section-subtitle">
              Live demos — websites, games, AI tools, and full stack applications.
            </p>
          </header>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article key={project.title} className="project-card nb-card">
                <span className="project-index">0{index + 1}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="nb-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.demoVideo && (
                  <div className="project-demo">
                    <span className="demo-label">Demo · autoplay · unmute for sound</span>
                    <ProjectVideo src={project.demoVideo} title={project.title} />
                  </div>
                )}
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link nb-btn nb-btn--ghost"
                  >
                    Visit live site →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-name">© 2026 Bhanu Kiran Vemula</p>
            <p className="footer-tagline">Full Stack Engineer · AI &amp; Web Products</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#projects">Work</a>
            <a href="https://linkedin.com/in/bhanu-kiranvemula" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:bhanukiran750@gmail.com">Email</a>
          </nav>
        </div>
      </footer>
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
      className="project-video"
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
