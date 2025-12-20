import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import type { FormEvent } from 'react'

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Case Studies', href: 'case-studies' },
  { label: 'Journey', href: 'journey' },
  { label: 'Contact', href: 'contact' },
]

const heroPhrases = [
  'Full-Stack Developer',
  'Java & .NET Core Backend Developer',
  'SQL & DevOps Enthusiast',
]

type SkillCategory = {
  title: string
  items: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Java', 'Spring Boot', '.NET Core', 'PHP'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'SQL Server', 'MongoDB (basic)', 'PL/SQL'],
  },
  {
    title: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'],
  },
  {
    title: 'Concepts',
    items: ['OOP', 'DSA', 'REST APIs', 'JWT Auth', 'System Design (basics)', 'Multithreading (basics)'],
  },
]

type Project = {
  title: string
  description: string
  tech: string[]
  codeUrl: string
  demoUrl: string
  image: string
}

const projects: Project[] = [
  {
    title: 'Parent-Teacher Bridge',
    description:
      'Full-stack educational management platform with role-based dashboards for admin, teachers, students and parents, including timetable management, messaging, and secure authentication.',
    tech: ['React', '.NET Core', 'REST APIs', 'JWT', 'MS SQL Server'],
    codeUrl: '#',
    demoUrl: '#',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Inventory Management System',
    description:
      'College project for managing stock, suppliers, billing, and reports with powerful search and CRUD operations over a MySQL backend.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'REST-style endpoints'],
    codeUrl: '#',
    demoUrl: '#',
    image: 'https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Internship – Full-Stack Web App',
    description:
      'Worked as a full-stack intern building production modules: implemented CRUD features, dashboards, authentication, and optimised SQL queries as a lead developer on one of the core modules.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    codeUrl: '#',
    demoUrl: '#',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  
]

const timeline = [
  { title: 'B.Tech Computer Science', place: 'University of Pune', period: '2021 - 2024' },
  { title: 'Full Stack Developer Intern', place: 'Tech Solve', period: 'Summer 2024' },
  { title: 'Centre for Development of Advanced Computing', place: 'Pune', period: '2025' },
]

type CaseStudy = {
  title: string
  role: string
  problem: string
  approach: string
  outcome: string
  tech: string[]
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Parent-Teacher Bridge – Role-Based Educational Platform',
    role: 'Full-Stack Developer',
    problem:
      'Schools needed a single portal to connect admins, teachers, students and parents with clear permissions and up-to-date information.',
    approach:
      'Designed a layered architecture with a .NET Core backend, React frontend, and MS SQL Server. Implemented JWT-based authentication, role-based access control, and modular APIs for timetables, messaging and academic data.',
    outcome:
      'Delivered a responsive, secure portal where each role only sees relevant actions and data, reducing manual coordination and improving transparency.',
    tech: ['React', '.NET Core', 'JWT', 'MS SQL Server', 'REST APIs'],
  },
  {
    title: 'Inventory Management System – College Project (3rd Place)',
    role: 'Backend & Database Lead',
    problem:
      'Local businesses lacked a simple way to manage stock, suppliers, and billing while keeping data consistent and queryable.',
    approach:
      'Modelled a normalized MySQL schema, implemented PHP-based CRUD modules for products, suppliers, and invoices, and added reporting with search and filters. Focused on SQL performance and clear UI flows.',
    outcome:
      'Achieved reliable inventory tracking with fast lookups and printable reports, recognized with 3rd place in the college project competition.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'SQL'],
  },
]

const socialLinks = [
  { icon: 'fa-github', label: 'GitHub', href: 'https://github.com/YashChatse' },
  {
    icon: 'fa-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yash-chatse-06398425a/',
  },
  { icon: 'fa-x-twitter', label: 'Twitter', href: '#' },
  { icon: 'fa-instagram', label: 'Instagram', href: '#' },
]


const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqarbdbz'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [headerVisible, setHeaderVisible] = useState(true)
  const [typedText, setTypedText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [emailValue, setEmailValue] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [showResume, setShowResume] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [projectFilter, setProjectFilter] = useState<'all' | 'full-stack' | 'backend' | 'frontend' | 'java' | 'sql' | 'devops'>('all')
  const [projectSearch, setProjectSearch] = useState('')
  const [resumeZoom, setResumeZoom] = useState(1)

  const lastScrollRef = useRef(0)

  // Apply/remove Tailwind dark mode class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setShowScrollTop(current > 400)
      if (current > lastScrollRef.current && current > 160) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      lastScrollRef.current = current

      // Track active section for navbar highlighting
      const sections = ['hero', 'about', 'skills', 'projects', 'case-studies', 'journey', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const currentPhrase = heroPhrases[phraseIndex % heroPhrases.length]
    const completed = !isDeleting && typedText === currentPhrase
    const emptied = isDeleting && typedText === ''

    const timeout = setTimeout(() => {
      if (completed) {
        setIsDeleting(true)
        return
      }
      if (emptied) {
        setIsDeleting(false)
        setPhraseIndex((prev) => prev + 1)
        return
      }
      const nextLength = typedText.length + (isDeleting ? -1 : 1)
      setTypedText(currentPhrase.slice(0, nextLength))
    }, completed ? 1100 : isDeleting ? 60 : 140)

    return () => clearTimeout(timeout)
  }, [phraseIndex, isDeleting, typedText])

  const themeIcon = theme === 'dark' ? 'fa-sun' : 'fa-moon'

  const [isAnimating, setIsAnimating] = useState(false)
  const themeBtnRef = useRef<HTMLButtonElement | null>(null)

  const toggleThemeWithAnimation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isAnimating) return
    const btn = themeBtnRef.current
    if (!btn) {
      setTheme((t) => (t === 'light' ? 'dark' : 'light'))
      return
    }

    setIsAnimating(true)
    // Block interactions during animation
    const prevPointer = document.body.style.pointerEvents
    document.body.style.pointerEvents = 'none'

    const rect = btn.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    // compute max distance from click center to viewport corners
    const distances = [
      Math.hypot(centerX - 0, centerY - 0),
      Math.hypot(centerX - vw, centerY - 0),
      Math.hypot(centerX - 0, centerY - vh),
      Math.hypot(centerX - vw, centerY - vh),
    ]
    const maxDist = Math.max(...distances)
    // const finalSize = Math.ceil(maxDist * 2)

    const targetTheme: Theme = theme === 'light' ? 'dark' : 'light'

    const expandMs = 650
    const holdMs = 80
    const retractMs = 500

    // overlay background should match previous theme so it hides the newly-applied theme
    const overlayBg = theme === 'light' ? '#f8fafc' : '#0f1724'

    // apply the target theme immediately so underlying content reflects it
    if (targetTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }

    // create overlay that will mask the new theme and reveal it through a transparent circle
    const existing = document.getElementById('theme-reveal-overlay')
    if (existing) existing.remove()

    const overlay = document.createElement('div')
    overlay.id = 'theme-reveal-overlay'
    Object.assign(overlay.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100vw',
      height: '100vh',
      background: overlayBg,
      zIndex: '9999',
      pointerEvents: 'none',
      willChange: 'mask-image, -webkit-mask-image',
    } as CSSStyleDeclaration)

    document.body.appendChild(overlay)

    const maxR = Math.ceil(maxDist)

    // helper to set mask with given radius (in px)
    const setMaskRadius = (r: number) => {
      const inner = Math.max(0, r)
      const outer = inner + 1
      const mask = `radial-gradient(circle at ${centerX}px ${centerY}px, transparent ${inner}px, black ${outer}px)`
      overlay.style.webkitMaskImage = mask
      overlay.style.maskImage = mask
    }

    // animate using requestAnimationFrame with an ease-out cubic
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    // let rafId: number | null = null
    const startTime = performance.now()

    const animateExpand = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / expandMs)
      const eased = easeOutCubic(t)
      setMaskRadius(eased * maxR)
      if (t < 1) {
        window.requestAnimationFrame(animateExpand)
      } else {
        // hold briefly then retract
        window.setTimeout(() => {
          const retractStart = performance.now()
          const animateRetract = (n2: number) => {
            const e = Math.min(1, (n2 - retractStart) / retractMs)
            const rev = 1 - easeOutCubic(e)
            setMaskRadius(rev * maxR)
            if (e < 1) {
              window.requestAnimationFrame(animateRetract)
            } else {
              overlay.remove()
              setIsAnimating(false)
              document.body.style.pointerEvents = prevPointer || ''
            }
          }
          window.requestAnimationFrame(animateRetract)
        }, holdMs)
      }
    }

    // start with no reveal
    setMaskRadius(0)
    window.requestAnimationFrame(animateExpand)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactStatus === 'sending') return
    // validate email before sending
    if (!validateEmail(emailValue)) {
      setEmailValid(false)
      setEmailTouched(true)
      setEmailError('Please enter a valid email address')
      return
    }
    setContactStatus('sending')
    const form = event.currentTarget
    try {
      const formData = new FormData(form)
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      form.reset()
      setContactStatus('sent')
      setTimeout(() => setContactStatus('idle'), 2500)
    } catch (error) {
      console.error(error)
      setContactStatus('idle')
      alert('Something went wrong while sending your message. Please try again later.')
    }
  }

  const validateEmail = (value: string) => {
    // Simple but strict-enough email regex: user@host.tld (TLD min 2 chars)
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return re.test(value.trim())
  }

  const zoomIn = () => {
    setResumeZoom((prev) => Math.min(prev + 0.1, 2.0))
  }

  const zoomOut = () => {
    setResumeZoom((prev) => Math.max(prev - 0.1, 0.75))
  }

  const resetZoom = () => {
    setResumeZoom(1)
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Resume_Yash_Chatse.pdf'
    link.click()
  }

  // Handle Escape key to close resume modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showResume) {
        setShowResume(false)
        setResumeZoom(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showResume])

  return (
    <div className="min-h-screen bg-muted-bg text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transform transition duration-300 ${headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/100 px-6 py-3 shadow-soft backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/70">
          <span className="font-georgia text-2xl font-semibold text-primary dark:text-indigo-200">My Portfolio</span>
          <ul className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm uppercase tracking-wide transition relative pb-1 ${
                    activeSection === link.href
                      ? 'text-secondary dark:text-indigo-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-secondary'
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 ${
                    activeSection === link.href ? 'after:w-full' : 'after:w-0'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              ref={themeBtnRef}
              onClick={toggleThemeWithAnimation}
              disabled={isAnimating}
              className={`rounded-full border border-white/60 bg-white/70 p-2 text-primary shadow-soft transition hover:bg-secondary hover:text-white dark:border-slate-800 dark:bg-slate-800 ${isAnimating ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <i className={`fa-solid ${themeIcon} text-xs`}></i>
            </button>
            <button
              onClick={() => setShowResume(true)}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary"
            >
              Resume
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative min-h-[80vh] bg-hero bg-cover bg-center" id="hero">
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-secondary">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Yash <span className="text-secondary">Chatse</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
            I&apos;m a Full-Stack / Backend Developer focused on Java, .NET Core, SQL, and React. I build practical, production-ready
            web applications with clean architectures, reliable APIs, and optimized databases.
          </p>
          <p className="mt-4 text-2xl font-light">
            {typedText}
            <span className="ml-1 animate-pulse border-r-2 border-white"></span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-xl transition hover:bg-primary"
            >
              View Projects
            </button>
           
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-full border border-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white/10"
            >
              Contact Me
            </button>
          </div>
          {/* Scroll down indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 text-white transition hover:text-secondary"
              aria-label="Scroll to next section"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <i className="fa-solid fa-chevron-down text-lg"></i>
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 rounded-[2.5rem] bg-white p-10 shadow-soft dark:bg-slate-900 md:grid-cols-[320px_1fr]">
            <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-full border-8 border-white shadow-2xl dark:border-slate-800">
              <img src='/image/yashme.jpeg' alt="Yash Chatse" className="h-full w-full object-cover" />
            </div>
          <div className="flex flex-col justify-center">
            <h2 className="section-title text-left md:text-left">About Me</h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              I&apos;m a B.E. Computer Science graduate (2024) and CDAC DAC trainee with hands-on experience as a full-stack developer.
              I enjoy building real products end-to-end — from designing database schemas and REST APIs to crafting responsive user
              interfaces.
            </p>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              My work focuses on clean architecture, structured and well-documented APIs, SQL-optimized queries, and secure coding
              practices. Outside of coding you&apos;ll usually find me learning new backend / DevOps tools, working out, or gaming.
            </p>
            {/* Highlight badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['Full-Stack Developer', 'Java & SQL', 'Problem Solver', 'Continuous Learner'].map((badge) => (
                <div
                  key={badge}
                  className="rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-semibold text-primary dark:from-indigo-500/20 dark:to-indigo-400/20 dark:text-indigo-200 transition hover:shadow-md"
                >
                  ✨ {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title} className="glass-card group flex flex-col transition hover:shadow-lg">
                <h3 className="text-xl font-semibold text-primary dark:text-indigo-200">{category.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="relative group/skill rounded-full bg-primary/5 px-3 py-1 text-sm text-slate-800 transition hover:bg-primary/20 dark:bg-indigo-500/10 dark:text-slate-100 cursor-help"
                      title={`Experience with ${item}`}
                      role="tooltip"
                    >
                      <span className="flex items-center gap-1">
                        {item}
                        <span className="text-xs opacity-60">●</span>
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg group-hover/skill:block dark:bg-slate-800">
                        {item} expertise
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-title">Projects</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600 dark:text-slate-300">
          A selection of projects and practice work that showcase my experience across full-stack development, backend engineering,
          databases, and DevOps fundamentals.
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-2xl">
          <input
            type="text"
            placeholder="Search projects..."
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
            aria-label="Search projects"
          />
        </div>

        {/* Filters */}
        <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
          {(['all', 'full-stack', 'backend', 'frontend', 'java', 'sql', 'devops'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setProjectFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                projectFilter === filter
                  ? 'bg-secondary text-white shadow-lg'
                  : 'border border-slate-300 text-slate-700 hover:border-secondary dark:border-slate-700 dark:text-slate-200'
              }`}
              aria-pressed={projectFilter === filter}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects
            .filter((project) => {
              const searchMatch =
                project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                project.description.toLowerCase().includes(projectSearch.toLowerCase())
              if (projectFilter === 'all') return searchMatch
              if (projectFilter === 'full-stack') return searchMatch && ['React', '.NET Core', 'MySQL', 'SQL Server'].some((t) => project.tech.includes(t))
              if (projectFilter === 'backend') return searchMatch && ['Java', '.NET Core', 'PHP', 'REST APIs'].some((t) => project.tech.includes(t))
              if (projectFilter === 'frontend') return searchMatch && ['React', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'].some((t) => project.tech.includes(t))
              if (projectFilter === 'java') return searchMatch && project.tech.some((t) => t.toLowerCase().includes('java'))
              if (projectFilter === 'sql') return searchMatch && ['MySQL', 'SQL Server', 'PL/SQL'].some((t) => project.tech.includes(t))
              if (projectFilter === 'devops') return searchMatch && ['Docker', 'Git', 'GitHub'].some((t) => project.tech.includes(t))
              return searchMatch
            })
            .map((project) => (
              <article key={project.title} className="glass-card group flex h-full flex-col overflow-hidden transition hover:shadow-2xl">
                <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-primary dark:text-indigo-200">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-indigo-400/20 dark:text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary"
                  >
                    Live Demo <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </a>
                  <a
                    href={project.codeUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-100"
                  >
                    Source Code <i className="fa-brands fa-github text-sm"></i>
                  </a>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="section-title">Journey</h2>
          <div className="timeline-line relative mt-12 space-y-12">
            {timeline.map((item, index) => {
              const iconMap: Record<number, string> = {
                0: 'fa-graduation-cap',
                1: 'fa-laptop-code',
                2: 'fa-certificate',
              }
              const icon = iconMap[index] || 'fa-briefcase'
              return (
                <div
                  key={`${item.title}-${item.period}`}
                  className={`timeline-item group relative rounded-3xl border border-white/30 bg-white/80 p-8 shadow-soft backdrop-blur-md transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'ml-auto before:-left-6' : 'mr-auto before:-right-6'
                  }`}
                  style={{
                    animation: `slideIn${index % 2 === 0 ? 'Right' : 'Left'} 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-primary p-4 text-white shadow-lg transition group-hover:scale-110 dark:bg-indigo-500">
                    <i className={`fa-solid ${icon} text-lg`}></i>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">{item.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-primary dark:text-indigo-200">{item.title}</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{item.place}</p>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-title">Case Studies</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600 dark:text-slate-300">
          A closer look at how I design, architect, and deliver real-world software — from understanding the problem to shipping
          maintainable solutions.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((cs, idx) => (
            <article key={cs.title} className="glass-card group flex flex-col gap-3 transition hover:shadow-xl" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold text-primary dark:text-indigo-200">{cs.title}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-indigo-400/20 dark:text-indigo-200">
                  {cs.role}
                </span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Problem</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{cs.problem}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Approach</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{cs.approach}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Outcome</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{cs.outcome}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-slate-800 dark:bg-indigo-500/10 dark:text-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
            </article>
          ))}
        </div>
      </section>

      {/* Resume section */}
      <section id="resume" className="bg-muted-bg py-16 dark:bg-slate-950">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <h2 className="section-title">Resume</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Prefer a traditional resume view? Download my latest CV as a PDF, including education, skills, and detailed experience.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowResume(true)}
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:bg-secondary"
            >
              View Resume
            </button>
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white dark:border-indigo-400 dark:text-indigo-200 dark:hover:bg-indigo-400 dark:hover:text-slate-900"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="section-title">Contact</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Have an opportunity, project, or question? Send me a message and I&apos;ll get back to you as soon as I can.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <form onSubmit={handleContactSubmit} className="glass-card w-full max-w-xl space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value)
                  if (emailTouched) {
                    const ok = validateEmail(e.target.value)
                    setEmailValid(ok)
                    setEmailError(ok ? null : 'Please enter a valid email address')
                  }
                }}
                onBlur={() => {
                  setEmailTouched(true)
                  const ok = validateEmail(emailValue)
                  setEmailValid(ok)
                  setEmailError(ok ? null : 'Please enter a valid email address')
                }}
                className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60 ${emailTouched && !emailValid ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-slate-200 bg-white/70'}`}
              />
              {emailTouched && emailError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{emailError}</p>
              )}
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60"
              ></textarea>
              <button
                type="submit"
                disabled={contactStatus === 'sending' || !emailValid}
                className={`w-full rounded-2xl px-5 py-3 text-lg font-semibold text-white transition ${contactStatus === 'sending' || !emailValid ? 'bg-secondary/60 cursor-not-allowed' : 'bg-secondary hover:bg-primary'}`}
              >
                {contactStatus === 'sending' ? 'Sending...' : contactStatus === 'sent' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-10 text-white dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a key={social.icon} href={social.href} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl transition hover:-translate-y-1 hover:bg-white/40">
                <i className={`fa-brands ${social.icon}`} aria-hidden />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Yash Chatse. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Actions */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-xl transition hover:bg-secondary"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

      {/* Resume Modal - Premium Animated Viewer */}
      {showResume && (
        <>
          {/* Background overlay with blur */}
          <div
            className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm transition-all duration-300"
            onClick={() => {
              setShowResume(false)
              setResumeZoom(1)
            }}
            aria-hidden="true"
            style={{
              animation: 'fadeIn 300ms ease-out',
            }}
          ></div>

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            style={{
              animation: 'slideUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Modal Card */}
            <div className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
              {/* Header / Action Bar */}
              <div
                className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95"
                style={{
                  animation: 'fadeInDown 400ms ease-out 100ms both',
                }}
              >
                <h2
                  id="resume-title"
                  className="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  Resume – Yash Gautam Chatse
                </h2>
                <div className="flex items-center gap-2">
                  {/* Zoom Out */}
                  <button
                    onClick={zoomOut}
                    disabled={resumeZoom <= 0.75}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <i className="fa-solid fa-minus text-sm"></i>
                  </button>

                  {/* Zoom Display */}
                  <span className="min-w-[3rem] text-center text-xs font-medium text-slate-600 dark:text-slate-300">
                    {Math.round(resumeZoom * 100)}%
                  </span>

                  {/* Zoom In */}
                  <button
                    onClick={zoomIn}
                    disabled={resumeZoom >= 2.0}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <i className="fa-solid fa-plus text-sm"></i>
                  </button>

                  {/* Reset Zoom */}
                  <button
                    onClick={resetZoom}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    title="Reset Zoom"
                    aria-label="Reset zoom to 100%"
                  >
                    <i className="fa-solid fa-expand text-sm"></i>
                  </button>

                  {/* Divider */}
                  <div className="h-5 border-l border-slate-200 dark:border-slate-700"></div>

                  {/* Download */}
                  <button
                    onClick={downloadResume}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    title="Download Resume"
                    aria-label="Download resume as PDF"
                  >
                    <i className="fa-solid fa-download text-sm"></i>
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => {
                      setShowResume(false)
                      setResumeZoom(1)
                    }}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 dark:text-slate-300 dark:hover:bg-red-900/20"
                    title="Close Resume"
                    aria-label="Close resume viewer"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>
              </div>

              {/* PDF Viewer Container */}
              <div
                className="flex-1 overflow-auto bg-slate-50 p-6 dark:bg-slate-950"
                style={{
                  animation: 'fadeIn 400ms ease-out 150ms both',
                }}
              >
                <div className="mx-auto w-full max-w-2xl">
                  <div
                    className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 dark:bg-slate-800"
                    style={{
                      transform: `scale(${resumeZoom})`,
                      transformOrigin: 'top center',
                    }}
                  >
                    <iframe
                      title="Resume PDF"
                      src="/resume.pdf"
                      className="h-[90vh] w-full border-0"
                      onLoad={() => {
                        // PDF loaded
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer / Page Indicator */}
              <div
                className="flex items-center justify-center border-t border-slate-200 bg-white/95 px-6 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95"
                style={{
                  animation: 'fadeInUp 400ms ease-out 150ms both',
                }}
              >
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  📄 PDF Resume • Click any button to interact or press ESC to close
                </p>
              </div>
            </div>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Prevent body scroll when modal is open */}
          <style>{`body { overflow: hidden; }`}</style>
        </>
      )}
    </div>
  )
}

export default App
