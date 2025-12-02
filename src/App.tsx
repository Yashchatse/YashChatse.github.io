import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Journey', href: 'journey' },
  { label: 'Certificates', href: 'certificates' },
  { label: 'Contact', href: 'contact' },
]

const heroPhrases = [
  'Full Stack Developer',
  'Creative UI Enthusiast',
  'Performance-Driven Engineer',
]

const skills = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg' },
  { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
  { name: 'ASP.NET Core', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
]

const projects = [
  {
    title: 'AI-enabled Support Desk',
    description: 'Conversational assistant that uses retrieval augmented generation to fast-track customer support resolutions.',
    link: '#',
    tags: ['AI', 'React', 'FastAPI'],
  },
  {
    title: 'Wellness Mobile App',
    description: 'Cross-platform companion app with habit tracking, statistics, and delightful micro-interactions.',
    link: '#',
    tags: ['React Native', 'UX', 'Firebase'],
  },
]

const timeline = [
  { title: 'B.Tech Computer Science', place: 'University of Pune', period: '2021 - 2025' },
  { title: 'Web Development Intern', place: 'WebDev Army', period: 'Summer 2024' },
  { title: 'Freelance Projects', place: 'Global Clients', period: '2022 - Present' },
]

const certificateFilters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Dev' },
  { id: 'programming', label: 'Programming' },
  { id: 'design', label: 'Design' },
] as const

type CertificateFilter = (typeof certificateFilters)[number]['id']

const certificates = [
  {
    id: 1,
    title: 'Career Essentials: Generative AI',
    category: 'programming' as CertificateFilter,
    file: '/pdf/CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn.pdf',
  },
  {
    id: 2,
    title: 'Coursera: Modern Web Development',
    category: 'web' as CertificateFilter,
    file: '/pdf/Coursera 2AM2XQ9V77L4.pdf',
  },
  {
    id: 3,
    title: 'WebDev Army Internship',
    category: 'web' as CertificateFilter,
    file: '/pdf/WebDevArmy Certificate (52).pdf',
  },
  {
    id: 4,
    title: 'UX/UI Fundamentals',
    category: 'design' as CertificateFilter,
    file: '/pdf/Course Certificate.pptx.pdf',
  },
]

const socialLinks = [
  { icon: 'fa-github', label: 'GitHub', href: 'https://github.com/' },
  {
    icon: 'fa-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yash-chatse-06398425a/',
  },
  { icon: 'fa-x-twitter', label: 'Twitter', href: '#' },
  { icon: 'fa-instagram', label: 'Instagram', href: '#' },
]
  
function App() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [typedText, setTypedText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [certFilter, setCertFilter] = useState<CertificateFilter>('all')
  const [visibleCertificates, setVisibleCertificates] = useState(4)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [showResume, setShowResume] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const lastScrollRef = useRef(0)

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

  useEffect(() => {
    setVisibleCertificates(4)
  }, [certFilter])

  const filteredCertificates = useMemo(() => {
    if (certFilter === 'all') return certificates
    return certificates.filter((cert) => cert.category === certFilter)
  }, [certFilter])

  const displayedCertificates = filteredCertificates.slice(0, visibleCertificates)
  const canShowMore = visibleCertificates < filteredCertificates.length

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactStatus === 'sending') return
    setContactStatus('sending')
    const form = event.currentTarget
    setTimeout(() => {
      form.reset()
      setContactStatus('sent')
      setTimeout(() => setContactStatus('idle'), 2500)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-muted-bg text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transform transition duration-300 ${headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/80 px-6 py-3 shadow-soft backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/70">
          <span className="font-georgia text-2xl font-semibold text-primary dark:text-indigo-200">My Portfolio</span>
          <ul className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm uppercase tracking-wide text-slate-700 transition hover:text-secondary dark:text-slate-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
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
            I&apos;m a Software Developer specializing in building scalable web applications with clean, efficient code.
            My expertise spans Java backend development, .NET backend development, and modern frontend frameworks.
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
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 rounded-[2.5rem] bg-white p-10 shadow-soft dark:bg-slate-900 md:grid-cols-[320px_1fr]">
          <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-full border-8 border-white shadow-2xl dark:border-slate-800">
            <img src="/image/WhatsApp Image 2024-12-22 at 13.38.34.jpeg" alt="Yash Chatse" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="section-title text-left md:text-left">About Me</h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              I craft professional, responsive experiences that feel effortless to use. From concept to deployment I love creating products
              that are visually clean, resilient, and performant.
            </p>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Outside of code you&apos;ll find me exploring new AI workflows, reading non-fiction, or chasing new PRs at the gym.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title">My Skills</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill.name} className="glass-card flex flex-col items-center text-center">
                <img src={skill.logo} alt={skill.name} className="mb-3 h-10 w-10 object-contain" />
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-title">Projects</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="glass-card flex h-full flex-col">
              <h3 className="text-2xl font-semibold text-primary dark:text-indigo-200">{project.title}</h3>
              <p className="mt-3 flex-1 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-4 py-1 text-sm text-primary dark:bg-indigo-400/20 dark:text-indigo-200">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link} className="mt-6 inline-flex items-center gap-2 text-secondary transition hover:text-primary">
                Live Demo <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="section-title">Journey</h2>
          <div className="timeline-line relative mt-12 space-y-12">
            {timeline.map((item, index) => (
              <div
                key={`${item.title}-${item.period}`}
                className={`timeline-item relative rounded-3xl border border-white/30 bg-white/80 p-8 shadow-soft backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'ml-auto before:-left-6' : 'mr-auto before:-right-6'
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">{item.period}</p>
                <h3 className="mt-2 text-2xl font-semibold text-primary dark:text-indigo-200">{item.title}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-title">Certificates</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {certificateFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setCertFilter(filter.id)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                certFilter === filter.id ? 'bg-primary text-white' : 'bg-white text-slate-700 shadow border border-slate-200 dark:bg-slate-900 dark:text-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {displayedCertificates.map((cert) => (
            <article key={cert.id} className="glass-card flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-primary dark:text-indigo-200">{cert.title}</h3>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">{cert.category}</p>
              <a href={cert.file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-secondary hover:text-primary">
                View Certificate <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </article>
          ))}
        </div>
        {canShowMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCertificates((prev) => prev + 2)}
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:bg-secondary"
            >
              Show More
            </button>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title">Contact</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="glass-card">
              <h3 className="text-2xl font-semibold text-primary dark:text-indigo-200">Contact Information</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Let&apos;s talk about your next project, collaboration, or role.
              </p>
              <div className="mt-6 space-y-4 text-slate-700 dark:text-slate-200">
                <p>
                  <span className="font-semibold text-primary dark:text-indigo-200">Email:</span> ygchatse@gmail.com
                </p>
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="glass-card space-y-4">
              <input type="text" name="name" placeholder="Your Name" required className="w-full rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60" />
              <textarea name="message" placeholder="Your Message" rows={5} required className="w-full rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-base outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900/60"></textarea>
              <button type="submit" className="w-full rounded-2xl bg-secondary px-5 py-3 text-lg font-semibold text-white transition hover:bg-primary">
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

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-2 py-6 backdrop-blur-sm md:px-4">
          <div className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
            <button
              aria-label="Close resume"
              onClick={() => setShowResume(false)}
              className="absolute right-4 top-4 rounded-full bg-secondary p-2 text-white shadow-lg hover:bg-primary"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="flex flex-1 flex-col overflow-hidden pt-12">
              <iframe title="Resume" src="/resume.pdf" className="h-full w-full border-0" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300">Resume – Yash Chatse</span>
              <a
                href="/resume.pdf"
                download
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
