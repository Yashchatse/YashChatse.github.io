/* App.tsx */
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import type { FormEvent } from 'react'

/* ---------------- CONFIG ---------------- */

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
  'Java & .NET Backend Engineer',
  'SQL & DevOps Enthusiast',
]

type Theme = 'light' | 'dark'

/* ---------------- APP ---------------- */

export default function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const lastScroll = useRef(0)

  /* ---------- THEME ---------- */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  /* ---------- SCROLL SPY ---------- */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      lastScroll.current = current

      const sections = ['hero', 'about', 'skills', 'projects', 'case-studies', 'journey', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---------- TYPING EFFECT ---------- */
  useEffect(() => {
    const phrase = heroPhrases[phraseIndex % heroPhrases.length]
    const done = !isDeleting && typedText === phrase
    const cleared = isDeleting && typedText === ''

    const t = setTimeout(() => {
      if (done) return setIsDeleting(true)
      if (cleared) {
        setIsDeleting(false)
        setPhraseIndex((i) => i + 1)
        return
      }
      setTypedText(phrase.slice(0, typedText.length + (isDeleting ? -1 : 1)))
    }, isDeleting ? 60 : 120)

    return () => clearTimeout(t)
  }, [typedText, isDeleting, phraseIndex])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenu(false)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-muted-bg text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      {/* ================= HEADER ================= */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border bg-white/90 px-5 py-3 shadow backdrop-blur dark:bg-slate-900/80">
          <span className="text-xl font-semibold text-primary">Yash Chatse</span>

          {/* Desktop Nav */}
          <ul className="hidden gap-6 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className={`text-sm uppercase ${
                    activeSection === l.href
                      ? 'text-secondary font-semibold'
                      : 'hover:text-secondary'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="rounded-full border p-2"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenu(v => !v)}
              className="md:hidden rounded-full border p-2"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenu && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl bg-white p-4 shadow dark:bg-slate-900 md:hidden">
            {navLinks.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full py-3 text-left text-sm font-semibold"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative flex min-h-[90vh] items-center justify-center bg-hero bg-cover bg-center px-6 text-center text-white"
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-secondary">Hello, I'm</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Yash <span className="text-secondary">Chatse</span>
          </h1>

          <p className="mt-4 text-slate-200">
            Full-Stack / Backend Developer focused on Java, .NET Core, SQL and React.
          </p>

          <p className="mt-6 text-xl font-light">
            {typedText}
            <span className="ml-1 border-r-2 border-white animate-pulse" />
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollTo('projects')} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold">
              View Projects
            </button>
            <button onClick={() => scrollTo('contact')} className="rounded-full border px-6 py-3 text-sm font-semibold">
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow dark:bg-slate-900 md:grid-cols-[280px_1fr]">
          <img
            src="/image/yashme.jpeg"
            alt="Yash Chatse"
            className="mx-auto h-64 w-64 rounded-full object-cover shadow"
          />
          <div>
            <h2 className="section-title text-left">About Me</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              B.E. Computer Science (2024) · CDAC DAC · Full-Stack Developer Intern.
              I build production-ready systems with clean architecture and optimized databases.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title">Skills</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Frontend', 'HTML CSS JS React Tailwind'],
              ['Backend', 'Java Spring .NET PHP'],
              ['Database', 'MySQL SQL Server MongoDB'],
              ['DevOps', 'Git GitHub Docker'],
              ['Concepts', 'OOP DSA REST JWT']
            ].map(([t, v]) => (
              <div key={t} className="glass-card">
                <h3 className="text-lg font-semibold text-primary">{t}</h3>
                <p className="mt-3 text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-title">Projects</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {['Parent-Teacher Bridge', 'Inventory System', 'Internship App'].map(p => (
            <div key={p} className="glass-card">
              <h3 className="text-xl font-semibold">{p}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Real-world full-stack application with secure APIs and optimized SQL.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section id="journey" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="section-title">Journey</h2>
          <div className="mt-10 space-y-6">
            {[
              'B.Tech Computer Science (2021-24)',
              'Full-Stack Intern (2024)',
              'CDAC DAC (2025)',
            ].map(j => (
              <div key={j} className="glass-card">{j}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="bg-muted-bg py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="section-title">Contact</h2>
          <form className="glass-card mt-8 space-y-4">
            <input placeholder="Name" className="w-full rounded-xl p-3" />
            <input placeholder="Email" className="w-full rounded-xl p-3" />
            <textarea placeholder="Message" rows={4} className="w-full rounded-xl p-3" />
            <button className="w-full rounded-xl bg-secondary py-3 font-semibold text-white">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-primary py-6 text-center text-white">
        © {new Date().getFullYear()} Yash Chatse
      </footer>
    </div>
  )
}
