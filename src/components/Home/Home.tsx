import { useState, useEffect, useRef } from 'react'
import Header from "../Header/Header"
import { useForm } from '@formspree/react'
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

  const isGoogleScriptConfigured = false

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
      link: "https://ccbp.in/intensive"
    },
    {
      title: "Mentor Performance Dashboard",
      description: "Developed a real-time analytics dashboard to track mentor performance, engagement, and key metrics. Designed reusable and scalable UI components for efficient data visualization.",
      tech: ["React.js", "Redux", "REST APIs", "MongoDB"],
      link: "#"
    },
    {
      title: "AI-Powered Communication System",
      description: "Built a system to generate personalized parent messages based on selected user events and inputs. Integrated Gemini LLM to enhance and refine generated messages for improved clarity and personalization.",
      tech: ["Node.js", "Express.js", "Gemini LLM", "REST APIs"],
      link: "#"
    },
    {
      title: "Phishing URL Detection",
      description: "Advanced ML-based system to identify and prevent malicious phishing URLs, enhancing cybersecurity.",
      tech: ["Python", "Machine Learning", "Scikit-learn"],
      link: "#"
    },
    {
      title: "Women Safety System",
      description: "Portable Arduino-based safety system sending emergency messages with GPS coordinates.",
      tech: ["Arduino", "GPS", "IoT"],
      link: "#"
    },
    {
      title: "Jobby App",
      description: "Advanced job search platform with filtering, authentication, and JWT token security.",
      tech: ["React.js", "JWT", "REST APIs"],
      link: "#"
    },
    {
      title: "Library Management",
      description: "Complete system with student authentication for issuing/returning books.",
      tech: ["PHP", "SQL", "Database"],
      link: "#"
    }
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
    <div>
      <Header />
      
      <canvas ref={canvasRef} className="particle-canvas" onMouseMove={handleMouseMove} />

      <section id="hero" className="hero-section">
        <div className="hud-overlay">
          <div className="hud-corner hud-top-left"></div>
          <div className="hud-corner hud-top-right"></div>
          <div className="hud-corner hud-bottom-left"></div>
          <div className="hud-corner hud-bottom-right"></div>
          <div className="hud-scanner"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="glitch-wrapper">
              <h1 className="glitch" data-text="BHANU KIRAN">BHANU KIRAN</h1>
            </div>
            <h2 className="hero-subtitle">VEMULA</h2>
            <div className="hero-title">
              <span className="neon-text">Team Lead Manager</span>
              <span className="divider">|</span>
              <span className="neon-text-violet">Full Stack Developer</span>
              <span className="divider">|</span>
              <span className="neon-text">React Specialist</span>
            </div>
            <p className="hero-bio">
              Driven tech professional with hands-on leadership experience, passionate about 
              mentoring, collaborative problem-solving, and building robust web technologies.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-value">20+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-value">100+</span>
                <span className="stat-label">Mentored</span>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#projects" className="btn-cyber btn-primary-cyber">
                <span className="btn-text">View Projects</span>
              </a>
              <a href="#contact" className="btn-cyber btn-secondary-cyber">
                <span className="btn-text">Contact Me</span>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-frame">
              <div className="profile-glow"></div>
              <img 
                src="https://res.cloudinary.com/df7wnybwg/image/upload/v1770293271/mypics/12e_2026-02-05_at_5.16.19_PM_tr6pvu.jpg" 
                alt="Bhanu Kiran Vemula"
                className="profile-photo-cyber"
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

      <section id="about" className="section about-section">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-grid">
          <div className="about-main">
            <div className="tech-frame">
              <div className="frame-corner frame-top-left"></div>
              <div className="frame-corner frame-top-right"></div>
              <div className="frame-corner frame-bottom-left"></div>
              <div className="frame-corner frame-bottom-right"></div>
              
              <p className="about-text">
                Currently leading a team at <span className="highlight-cyan">NxtWave</span>, I thrive on delivering 
                results while supporting others to excel in dynamic, fast-paced environments. My journey has taken me 
                from intensive academic mentoring to delivering as a <span className="highlight-violet">Team Lead Manager</span> 
                at NxtWave, where I oversee and guide high-impact teams in Hyderabad.
              </p>
              <p className="about-text">
                With a strong academic background in <span className="highlight-cyan">Computer Science (BTech, VIT)</span>, 
                complemented by real-world experience as both a mentor and a MERN stack trainee, I blend technical 
                acumen with a talent for coaching others.
              </p>
              <p className="about-text">
                Whether collaborating across functions or mentoring aspiring developers, my focus is always on 
                cultivating growth, fostering innovation, and achieving excellence.
              </p>
              
              <div className="about-badges">
                <span className="badge">Proactive</span>
                <span className="badge">Goal-Oriented</span>
                <span className="badge">Problem Solver</span>
                <span className="badge">Adaptable</span>
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

      <section id="experience" className="section experience-section">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Experience</h2>
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

      <section id="projects" className="section projects-section">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Projects</h2>
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
                  <a href={project.link} className="project-link-cyber">
                    <span className="link-text">Access Project</span>
                    <span className="link-arrow">➜</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">Contact</h2>
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
            <ContactForm />
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">EMAIL</span>
                <a href="mailto:bhanukiran750@gmail.com">bhanukiran750@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">LINK</span>
                <a href="https://linkedin.com/in/bhanu-kiranvemula" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">WEB</span>
                <a href="https://bhanulinks.ccbp.tech/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-cyber">
        <div className="footer-content">
          <p className="footer-text">
            2025 <span className="neon-text">Bhanu Kiran Vemula</span> | All Systems Operational
          </p>
          <div className="footer-links">
            <a href="https://linkedin.com/in/bhanu-kiranvemula" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:bhanukiran750@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  // Replace with your Formspree form ID
  // Get your form ID from https://formspree.io/ after creating a form
  const [state, handleSubmit] = useForm('mgonrwjz');

  if (state.succeeded) {
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
      
      <button 
        type="submit" 
        disabled={state.submitting}
        className="cyber-submit-btn"
      >
        <span className="btn-content">
          {state.submitting ? (
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
