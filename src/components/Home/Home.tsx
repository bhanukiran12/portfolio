import { useState, useEffect, useRef, type FormEvent } from 'react'
import Header from "../Header/Header"
import { submitForm } from '../../utils/formHandler'
import { contactConfig } from '../../config/contact'
import ContactChannels from '../ContactChannels/ContactChannels'
import conversionPlatformDemo from '../../assets/projects/conversion-platform-demo.webm'
import parentMessageDemo from '../../assets/projects/parent-message-demo.webm'
import holiRunDemo from '../../assets/projects/holi-run-demo.webm'
import schedoraDemo from '../../assets/projects/schedora-demo.webm'
import vyraDemo from '../../assets/projects/vyra-demo.webm'
import './Home.css'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const newParticles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      newParticles.forEach((particle, index) => {
        particle.x += particle.speedX + (mousePos.x - particle.x) * 0.001
        particle.y += particle.speedY + (mousePos.y - particle.y) * 0.001

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `rgba(0, 255, 255, ${particle.opacity})`)
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        newParticles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const terminalText = "> Initializing connection protocol...> Establishing secure channel...> Ready to receive transmission."
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < terminalText.length) {
        setTypedText(terminalText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const skills = [
    // Frontend
    "React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS", "Tailwind",
    // State & Data
    "Redux", "Context API", "REST APIs", "GraphQL",
    // Tools
    "Git", "GitHub", "Webpack", "Vite", "Babel", "CI/CD", "Jira",
    // Backend
    "Node.js", "Express.js",
    // Database
    "MongoDB", "MySQL",
    // Other
    "SEO", "WCAG", "Responsive Design", "Agile"
  ]

  const projects = [
    {
      title: "Conversion Platform",
      description: "Developed a lead-generation web platform aligned with business requirements to support user acquisition and sales workflows. Built dynamic, high-conversion forms to capture user data and streamline lead collection.",
      tech: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
      link: "https://ccbp.in/intensive",
      demoVideo: conversionPlatformDemo,
    },
    {
      title: "AI-Powered Communication System",
      description: "WhatsApp Message Generator that creates personalized parent messages from category and subcategory templates. Supports university, coach, and student name personalization with templates loaded via Google Sheets API.",
      tech: ["React.js", "JavaScript", "REST APIs", "Google Sheets API"],
      link: "https://parent-message.vercel.app/",
      demoVideo: parentMessageDemo,
    },
    {
      title: "Holi Run Game",
      description: "Interactive browser game built for Holi-themed gameplay with responsive controls and engaging level design.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      link: "https://nxtholi-run.netlify.app/",
      demoVideo: holiRunDemo,
    },
    {
      title: "Schedora",
      description: "Task and scheduling application for planning, organizing, and tracking daily work with a clean, user-friendly interface.",
      tech: ["React.js", "Node.js", "REST APIs"],
      link: "https://sechdora-2f2g.onrender.com",
      demoVideo: schedoraDemo,
    },
    {
      title: "Vyra",
      description: "Goat and tiger strategy game with real-time gameplay, character movement, and competitive mechanics in the browser.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      link: "https://vyra-ues5.onrender.com",
      demoVideo: vyraDemo,
    },
  ]

  const services = [
    {
      title: 'Custom Websites',
      description:
        'Fast, responsive marketing sites and landing pages built with React — optimized for conversions, SEO, and global audiences.',
      tags: ['React', 'SEO', 'Responsive UI'],
    },
    {
      title: 'Full Stack Applications',
      description:
        'End-to-end MERN products with secure APIs, databases, and scalable architecture for startups and growing teams.',
      tags: ['Node.js', 'MongoDB', 'REST APIs'],
    },
    {
      title: 'AI-Powered Products',
      description:
        'Intelligent tools like message generators, automation workflows, and LLM-integrated features that solve real business problems.',
      tags: ['AI Integration', 'Gemini', 'Automation'],
    },
    {
      title: 'UI/UX Implementation',
      description:
        'Pixel-perfect interfaces from your designs — clean layouts, accessible components, and polished user flows that feel premium.',
      tags: ['Figma to Code', 'WCAG', 'Design Systems'],
    },
    {
      title: 'Freelance & Contract',
      description:
        'Remote collaboration with clients in India, USA, UK, Europe, and worldwide. Clear updates, async-friendly, delivery-focused.',
      tags: ['IST preferred', 'Your timezone', 'Bank / UPI / Wise'],
    },
  ]

  const experience = [
    {
      title: "Team Lead Manager",
      company: "NxtWave",
      period: "April 2025 - Present",
      description: "Lead development of scalable web applications and frontend systems. Drive architecture decisions, code quality, and engineering best practices. Mentor developers, improving delivery speed and code quality.",
      icon: "TL"
    },
    {
      title: "Associate Mentor",
      company: "NIAT (NxtWave)",
      period: "December 2024 - July 2025",
      description: "Mentored developers in MERN stack and frontend architecture. Conducted code reviews and enforced best practices.",
      icon: "AM"
    },
    {
      title: "MERN Stack Trainee",
      company: "NxtWave",
      period: "January 2024 - December 2024",
      description: "Built full-stack applications with React, Node.js, and MongoDB. Developed reusable UI components and integrated REST APIs.",
      icon: "TR"
    }
  ]

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <canvas ref={canvasRef} className="particle-canvas" onMouseMove={handleMouseMove} aria-hidden="true" />

      <main id="main-content">
      <section id="hero" className="hero-section" aria-labelledby="hero-heading">
        <div className="hud-overlay">
          <div className="hud-corner hud-top-left"></div>
          <div className="hud-corner hud-top-right"></div>
          <div className="hud-corner hud-bottom-left"></div>
          <div className="hud-corner hud-bottom-right"></div>
          <div className="hud-scanner"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-availability">
              <span className="availability-dot" aria-hidden="true" />
              Available for freelance — India &amp; worldwide
            </p>
            <div className="glitch-wrapper">
              <h1 id="hero-heading" className="glitch" data-text="BHANU KIRAN">BHANU KIRAN</h1>
            </div>
            <p className="hero-role">Full Stack &amp; AI Developer for Hire</p>
            <h2 className="hero-subtitle">VEMULA</h2>
            <div className="hero-title">
              <span className="neon-text">Websites</span>
              <span className="divider">|</span>
              <span className="neon-text-violet">AI Products</span>
              <span className="divider">|</span>
              <span className="neon-text">MERN Stack</span>
            </div>
            <p className="hero-bio">
              I help international clients and Indian businesses ship production-ready web apps —
              from landing pages and dashboards to AI-powered tools. Remote-friendly, clear
              communication, and design-aware engineering you can trust.
            </p>
            <div className="hero-trust">
              <span>IST preferred</span>
              <span>Client time zones</span>
              <span>English</span>
              <span>Bank / UPI / Wise</span>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-value">20+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat">
                <span className="stat-value">100+</span>
                <span className="stat-label">Developers Mentored</span>
              </div>
            </div>
            <div className="hero-cta">
              <a
                href={contactConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber btn-primary-cyber"
              >
                <span className="btn-text">Book a Call</span>
              </a>
              <a href="#contact" className="btn-cyber btn-secondary-cyber">
                <span className="btn-text">Start a Project</span>
              </a>
              <a href="#projects" className="btn-cyber btn-secondary-cyber">
                <span className="btn-text">View My Work</span>
              </a>
            </div>
            <ContactChannels compact />
          </div>
          <div className="hero-image">
            <div className="profile-frame">
              <div className="profile-glow"></div>
              <img 
                src="https://res.cloudinary.com/df7wnybwg/image/upload/v1770293271/mypics/12e_2026-02-05_at_5.16.19_PM_tr6pvu.jpg" 
                alt="Bhanu Kiran Vemula — freelance full stack and AI developer"
                className="profile-photo-cyber"
                width={400}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
              <div className="scan-line"></div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>SCROLL DOWN</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      <section id="about" className="section about-section" aria-labelledby="about-heading">
        <div className="section-header">
          <span className="section-number">01</span>
          <div>
            <h2 id="about-heading" className="section-title">About Me</h2>
            <p className="section-subtitle">
              Full stack developer partnering with teams in India and abroad
            </p>
          </div>
        </div>
        
        <div className="about-grid">
          <div className="about-main">
            <div className="tech-frame">
              <div className="frame-corner frame-top-left"></div>
              <div className="frame-corner frame-top-right"></div>
              <div className="frame-corner frame-bottom-left"></div>
              <div className="frame-corner frame-bottom-right"></div>
              
              <p className="about-text">
                I&apos;m <span className="highlight-cyan">Bhanu Kiran Vemula</span> — Team Lead Manager at{' '}
                <span className="highlight-cyan">NxtWave</span> and a freelance developer for clients who need
                reliable websites, full stack apps, and AI features. I work with startups, agencies, and founders
                across time zones with a product-minded approach: understand the goal, ship clean code, iterate fast.
              </p>
              <p className="about-text">
                <span className="highlight-violet">BTech Computer Science (VIT)</span> plus hands-on MERN and React
                delivery. I&apos;ve built games, scheduling tools, AI message systems, and conversion platforms — see
                live demos in my portfolio below.
              </p>
              <p className="about-text">
                Whether you need a one-page site, a long-term contract, or an AI integration, I focus on clarity,
                performance, and UX that converts visitors into customers.
              </p>
              
              <div className="about-badges">
                <span className="badge">Remote-First</span>
                <span className="badge">Client-Focused</span>
                <span className="badge">AI &amp; Web</span>
                <span className="badge">On-Time Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="about-skills">
            <h3 className="skills-title">Skill Matrix</h3>
            <div className="skill-cloud">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag-cyber" style={{ animationDelay: `${index * 0.1}s` }}>
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="education-box">
              <h4>Education</h4>
              <div className="edu-item">
                <span className="edu-degree">BTech Computer Science</span>
                <span className="edu-school">VIT Amaravathi</span>
                <span className="edu-gpa">GPA: 8.09</span>
                <span className="edu-year">2019 - 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section" aria-labelledby="services-heading">
        <div className="section-header">
          <span className="section-number">02</span>
          <div>
            <h2 id="services-heading" className="section-title">Freelance Services</h2>
            <p className="section-subtitle">
              Websites, AI apps, and full stack development for global clients
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article key={index} className="service-card">
              <span className="service-index">0{index + 1}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="services-cta-bar">
          <p>Have a project in mind? Let&apos;s discuss scope, timeline, and budget.</p>
          <a href="#contact" className="btn-cyber btn-primary-cyber">
            <span className="btn-text">Get a Free Consultation</span>
          </a>
        </div>
      </section>

      <section id="experience" className="section experience-section" aria-labelledby="experience-heading">
        <div className="section-header">
          <span className="section-number">03</span>
          <div>
            <h2 id="experience-heading" className="section-title">Experience</h2>
            <p className="section-subtitle">Leadership and engineering at scale</p>
          </div>
        </div>
        
        <div className="timeline-cyber">
          <div className="timeline-line"></div>
          {experience.map((exp, index) => (
            <div key={index} className={`timeline-item-cyber ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-marker">
                <span className="marker-icon">{exp.icon}</span>
              </div>
              <div className="timeline-content-cyber">
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="journey" className="section journey-section" aria-labelledby="journey-heading">
        <div className="section-header">
          <span className="section-number">04</span>
          <div>
            <h2 id="journey-heading" className="section-title">A Journey Worth Sharing</h2>
            <p className="section-subtitle">Training 100+ NIAT mentors at NxtWave</p>
          </div>
        </div>

        <div className="journey-grid">
          <div className="journey-visual">
            <div className="journey-image-frame">
              <div className="frame-corner frame-top-left"></div>
              <div className="frame-corner frame-top-right"></div>
              <div className="frame-corner frame-bottom-left"></div>
              <div className="frame-corner frame-bottom-right"></div>
              <img
                src="/images/niat-journey.png"
                alt="NIAT mentor training at NxtWave Institute of Advanced Technologies"
                className="journey-image"
              />
            </div>
          </div>

          <div className="journey-content">
            <p className="journey-lead">
              From May 2025, I had the privilege of training over{' '}
              <span className="highlight-cyan">100 NIAT mentors and instructors</span>. Each of them
              now carries the responsibility of teaching, guiding, and inspiring thousands — and
              eventually lakhs — of students across India.
            </p>

            <p className="journey-text">
              For me, this has never been just about training sessions. It has been about
              conversations with brilliant minds — mentors and instructors from{' '}
              <span className="highlight-violet">IITs, IIMs</span>, and many other institutions. I
              listened to their stories, exchanged ideas, and witnessed their passion for shaping
              the future.
            </p>

            <div className="journey-highlight-box">
              <h3 className="journey-subtitle">The True Impact</h3>
              <p className="journey-text">
                When one mentor inspires 100 students, and those students step into the world with
                confidence and skills, the ripple effect becomes unstoppable. One spark can ignite
                hundreds of flames, and together, these young minds can light up the path for an
                entire generation. This is how education multiplies impact — not by addition, but
                by exponential growth.
              </p>
              <p className="journey-text">
                To every student reading this — you are not just learning skills, you are building
                the foundation of <span className="highlight-cyan">India&apos;s tomorrow</span>.
              </p>
            </div>

            <p className="journey-text">
              I&apos;m deeply grateful to <span className="highlight-cyan">NxtWave</span> for giving
              me this opportunity. Training these mentors has felt like a noble task, one that
              reminds me every day: when we empower teachers, we transform generations.
            </p>

            <ul className="journey-impact-list">
              <li>These tech mentors will uplift students.</li>
              <li>Those students will drive innovation.</li>
              <li>That innovation will make India great again.</li>
            </ul>

            <p className="journey-text">
              As someone who believes in being a Jack of all and a master of a few, I take pride in
              contributing wherever impact matters most. And this, without doubt, is one of the
              proudest chapters of my journey.
            </p>

            <p className="journey-closing">
              To my mentors, instructors, and students — this is just the beginning. We are not only
              building a movement, but we are going to play a major role in shaping a{' '}
              <span className="highlight-violet">Developed India</span>.
            </p>

            <div className="journey-tags">
              <span className="journey-tag">#Education</span>
              <span className="journey-tag">#nxtwaveacedamicmentors</span>
              <span className="journey-tag">#NIAT</span>
              <span className="journey-tag">#NxtWave</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
        <div className="section-header">
          <span className="section-number">05</span>
          <div>
            <h2 id="projects-heading" className="section-title">Selected Work</h2>
            <p className="section-subtitle">
              Live demos — websites, games, AI tools, and full stack apps
            </p>
          </div>
        </div>
        
        <div className="projects-masonry">
          {projects.map((project, index) => (
            <div key={index} className={`project-card-cyber ${index % 3 === 0 ? 'large' : ''} ${index % 2 === 0 ? 'offset-top' : ''}`}>
              <div className="card-glass">
                <div className="scanline-overlay"></div>
                <div className="card-content">
                  <div className="card-header">
                    <span className="project-id">PRJ_0{index + 1}</span>
                    <div className="card-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {'demoVideo' in project && project.demoVideo && (
                    <div className="project-demo">
                      <span className="project-demo-label">
                        <span>Project Demo</span>
                        <span className="project-demo-hint">Autoplay · unmute for sound</span>
                      </span>
                      <ProjectVideo
                        src={project.demoVideo}
                        title={project.title}
                      />
                    </div>
                  )}
                  {project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-cyber"
                    >
                      <span className="link-text">Visit Live Site</span>
                      <span className="link-arrow">➜</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
        <div className="section-header">
          <span className="section-number">06</span>
          <div>
            <h2 id="contact-heading" className="section-title">Let&apos;s Work Together</h2>
            <p className="section-subtitle">
              Based in IST (preferred) · I align with your time zone · Bank, UPI, or Wise — reply within 24–48 hours
            </p>
          </div>
        </div>
        
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-btn close"></span>
              <span className="terminal-btn minimize"></span>
              <span className="terminal-btn maximize"></span>
            </div>
            <span className="terminal-title">contact_terminal.exe</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-output">
              <p className="terminal-line">{typedText}</p>
            </div>
            <ContactChannels />
            <ContactForm />
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">LINK</span>
                <a href={contactConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">WEB</span>
                <a href={contactConfig.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      <footer className="footer-cyber">
        <div className="footer-content">
          <div className="footer-brand-block">
            <p className="footer-text">
              © 2026 <span className="neon-text">Bhanu Kiran Vemula</span>
            </p>
            <p className="footer-seo-line">
              Freelance Full Stack &amp; AI Developer · Websites · MERN · Remote Worldwide
            </p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#projects">Work</a>
            <a href="https://linkedin.com/in/bhanu-kiranvemula" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
          </div>
        </div>
      </footer>

      <a href="#contact" className="floating-hire-cta" aria-label="Hire me for your project">
        Hire Me
      </a>
    </>
  )
}

function ProjectVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="project-demo-video"
      src={src}
      autoPlay
      controls
      muted
      loop
      playsInline
      preload="auto"
      aria-label={`${title} website demo`}
    />
  );
}

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await submitForm({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    });

    setSubmitting(false);

    if (result.success) {
      setSucceeded(true);
      form.reset();
      return;
    }

    setError(result.message);
  };

  if (succeeded) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>Transmission Complete!</h3>
        <p>Your message has been received. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="cyber-form">
      <div className="form-group-cyber">
        <label className="cyber-label">
          <span className="label-icon">▸</span> Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="cyber-input"
          placeholder="Enter your name"
        />
      </div>
      
      <div className="form-group-cyber">
        <label className="cyber-label">
          <span className="label-icon">▸</span> Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="cyber-input"
          placeholder="Enter your email"
        />
      </div>
      
      <div className="form-group-cyber">
        <label className="cyber-label">
          <span className="label-icon">▸</span> Message
        </label>
        <textarea
          name="message"
          required
          className="cyber-textarea"
          placeholder="Enter your message..."
          rows={4}
        />
      </div>
      
      {error && <p className="form-error">{error}</p>}

      <button 
        type="submit" 
        disabled={submitting}
        className="cyber-submit-btn"
      >
        <span className="btn-content">
          {submitting ? (
            <><span className="loading-dots">...</span> Transmitting</>
          ) : (
            <><span className="btn-icon">▹</span> Send Message</>
          )}
        </span>
      </button>
    </form>
  );
}

export default Home
