import { useEffect, useMemo, useRef, useState } from "react";
import me from "./assets/me.jpeg";
import resumePDF from "./assets/anurag_resume.pdf";

/* ─── Theme hook ─── */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch { return "light"; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  return { theme, setTheme };
}

/* ─── Theme Toggle ─── */
function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur hover:bg-white dark:hover:bg-slate-800/80 transition-all"
      aria-label="Toggle theme"
    >
      <span className="relative inline-flex h-4 w-8 items-center rounded-full bg-slate-200 dark:bg-indigo-500 transition-colors duration-300">
        <span className={`absolute h-3 w-3 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isDark ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      <span className="hidden sm:inline text-slate-600 dark:text-slate-300">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

/* ─── Navbar ─── */
function Nav({ sections, active, onNavigate, theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <nav className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-6">
        {/* Main nav bar */}
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm px-4 py-2.5">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 animate-float shadow-lg shadow-indigo-500/30" />
            <span className="font-extrabold tracking-tight text-lg" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              Anurag
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); onNavigate(s.id); }}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all ${
                  active === s.id
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a
              href={resumePDF}
              download="Anurag_Paudel_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 btn-primary text-xs px-3.5 py-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
              Download CV
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg p-3">
            <div className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); onNavigate(s.id); setMobileOpen(false); }}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    active === s.id
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {s.label}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/10">
                <a
                  href={resumePDF}
                  download="Anurag_Paudel_CV.pdf"
                  className="btn-primary w-full justify-center"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  const roles = useMemo(() => ["Anurag Paudel", "a Software Developer", "a React Specialist", "an ML Enthusiast"], []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % roles.length), 3500);
    return () => clearTimeout(id);
  }, [index, roles.length]);

  return (
    <section id="home" className="relative isolate pt-28 sm:pt-32 lg:pt-36 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-50 dark:bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for work
            </div>

            <h1 className="hero-headline" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              <span className="bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
                Crafting creativity
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                into reality
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I build modern web apps with <strong className="text-slate-700 dark:text-slate-200 font-semibold">React</strong>, <strong className="text-slate-700 dark:text-slate-200 font-semibold">Python</strong> and <strong className="text-slate-700 dark:text-slate-200 font-semibold">FastAPI</strong> — focused on performance, aesthetics, and delightful experiences.
            </p>

            {/* Role cycling */}
            <div className="mt-6 h-10 overflow-hidden flex justify-center lg:justify-start">
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex gap-2 items-center">
                <span className="text-slate-500 dark:text-slate-400 font-normal text-lg">I'm </span>
                <span key={index} className="inline-block" style={{ animation: "fadeIn 0.5s ease forwards" }}>
                  {roles[index]}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <a href="#portfolio" className="btn-primary">
                View Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={resumePDF}
                download="Anurag_Paudel_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 blur-3xl opacity-25 animate-pulse" />
              {/* Decorative orbit rings */}
              <div className="absolute inset-0 rounded-full border border-indigo-400/20 dark:border-indigo-400/15 scale-110" />
              <div className="absolute inset-0 rounded-full border border-purple-400/15 dark:border-purple-400/10 scale-125" />
              {/* Photo */}
              <div className="relative rounded-full w-full h-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 shadow-2xl shadow-indigo-500/30">
                <div className="rounded-full w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <img
                    src={me}
                    alt="Portrait of Anurag Paudel"
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-2 sm:right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-slate-100 dark:border-white/10">
                <span className="text-lg">⚡</span>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white leading-none">2+ Years</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function AboutSection() {
  const stats = [
    { label: "Experience", value: "2+ years", icon: "🚀" },
    { label: "Open Source", value: "Contributor", icon: "🌐" },
    { label: "Availability", value: "Open to work", icon: "✅" },
  ];

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 mb-2">About me</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              The developer behind the work
            </h2>
            <div className="section-divider" />
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I'm <strong className="text-slate-800 dark:text-white font-semibold">Anurag Paudel</strong>, a software developer focused on building delightful, high-performance web applications. I love shipping polished UI, clean architecture, and accessible experiences.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Recently, I've worked on dashboards, interactive marketing sites, and reusable UI systems with React and Tailwind. I'm also passionate about machine learning and computer vision projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Remote-friendly", "Open to freelance", "Performance-first"].map((badge) => (
                <span key={badge} className="inline-flex items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 flex items-center gap-4 skill-card">
                <div className="text-3xl">{s.icon}</div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{s.label}</div>
                  <div className="mt-0.5 text-xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: "'Clash Display', sans-serif" }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
function SkillIcon({ name }) {
  const base = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className: "h-7 w-7", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "React JS": case "React Native": return (
      <svg {...base}>
        <ellipse cx="12" cy="12" rx="9" ry="4.2" />
        <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-60 12 12)" />
        <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    );
    case "Python": return (
      <svg {...base}><rect x="3" y="3" width="18" height="18" rx="3" /><text x="6.5" y="15" fontSize="8.5" fontFamily="system-ui" fill="currentColor">Py</text></svg>
    );
    case "Tailwind CSS": return (
      <svg {...base}>
        <path d="M4.5 13c1.6-3.2 3.6-4.8 6-4.8 1.2 0 2.2.4 3 .9.8.5 1.5 1.1 2.7 1.1 1.3 0 2.3-.6 3.3-1.8-1.6 3.2-3.6 4.8-6 4.8-1.2 0-2.2-.4-3-.9-.8-.5-1.5-1.1-2.7-1.1-1.3 0-2.3.6-3.3 1.8z" fill="currentColor" stroke="none" />
        <path d="M4.5 18c1.6-3.2 3.6-4.8 6-4.8 1.2 0 2.2.4 3 .9.8.5 1.5 1.1 2.7 1.1 1.3 0 2.3-.6 3.3-1.8-1.6 3.2-3.6 4.8-6 4.8-1.2 0-2.2-.4-3-.9-.8-.5-1.5-1.1-2.7-1.1-1.3 0-2.3.6-3.3 1.8z" fill="currentColor" opacity="0.5" stroke="none" />
      </svg>
    );
    case "Node.js": return (
      <svg {...base}><path d="M12 2.6 4 7v10l8 4.4 8-4.4V7L12 2.6z" /><text x="8.2" y="15" fontSize="7.5" fontFamily="system-ui" fill="currentColor">JS</text></svg>
    );
    case "FastAPI": return (
      <svg {...base}><path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" /><path d="M12 7.5 9.5 13h2l-1.5 3.5 4.5-5.5h-2L14 7.5h-2z" fill="currentColor" stroke="none" /></svg>
    );
    case "SSMS": return (
      <svg {...base}><ellipse cx="12" cy="6.5" rx="6.5" ry="3" /><path d="M5.5 6.8v7.1c0 1.7 3 3.1 6.5 3.1s6.5-1.4 6.5-3.1V6.8" fill="none" /><path d="M5.5 11.2c0 1.7 3 3.1 6.5 3.1s6.5-1.4 6.5-3.1" fill="none" /></svg>
    );
    default: return <svg {...base}><rect x="4" y="4" width="16" height="16" rx="3" /></svg>;
  }
}

function SkillsSection() {
  const skills = [
    { name: "React JS", level: "Advanced", color: "from-sky-500/10 to-cyan-500/10", text: "text-sky-600 dark:text-sky-400" },
    { name: "Python", level: "Advanced", color: "from-yellow-500/10 to-amber-500/10", text: "text-yellow-600 dark:text-yellow-400" },
    { name: "Tailwind CSS", level: "Advanced", color: "from-teal-500/10 to-cyan-500/10", text: "text-teal-600 dark:text-teal-400" },
    { name: "Node.js", level: "Intermediate", color: "from-green-500/10 to-emerald-500/10", text: "text-green-600 dark:text-green-400" },
    { name: "FastAPI", level: "Intermediate", color: "from-indigo-500/10 to-purple-500/10", text: "text-indigo-600 dark:text-indigo-400" },
    { name: "React Native", level: "Intermediate", color: "from-blue-500/10 to-sky-500/10", text: "text-blue-600 dark:text-blue-400" },
    { name: "SSMS", level: "Intermediate", color: "from-rose-500/10 to-pink-500/10", text: "text-rose-600 dark:text-rose-400" },
  ];

  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 mb-2">What I work with</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
          Skills & Technologies
        </h2>
        <div className="section-divider" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className={`skill-card glass rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-br ${s.color}`}
            >
              <div className={`flex-shrink-0 ${s.text}`}>
                <SkillIcon name={s.name} />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm sm:text-base truncate text-slate-800 dark:text-white">{s.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ─── */
function PortfolioCard({ title, description, tags, source }) {
  return (
    <div className="portfolio-card glass rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Background gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex-1 relative">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug" style={{ fontFamily: "'Clash Display', sans-serif" }}>
          {title}
        </h3>
        <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>

      {source && (
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.465-1.11-1.465-.908-.621.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.222-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.565 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
            </svg>
            View Source
          </a>
        </div>
      )}
    </div>
  );
}

function PortfolioSection() {
  const projects = [
    {
      title: "Simple Online Ecommerce Website from Scratch",
      description: "A fully functional e-commerce website built from scratch with cart functionality, product pages, and checkout flow.",
      tags: ["HTML", "CSS", "JavaScript"],
      source: "https://github.com/Rayyan2001/Simple-Online-ecommerce-website-from-scratch",
    },
    {
      title: "Nepal Stock Prediction using LSTM, GRU, RF",
      description: "Time-series stock price forecasting using LSTM, GRU, and Random Forest models on Nepal's NEPSE market data.",
      tags: ["ML", "Time Series", "Python", "Jupyter"],
      source: "https://github.com/Rayyan2001/Nepal-stock-prediction-using-LSMT--GRU--RF",
    },
    {
      title: "Nepali License Plate Recognition",
      description: "Computer vision system for detecting and recognizing Nepali vehicle license plates using deep learning.",
      tags: ["Computer Vision", "Python", "Deep Learning"],
      source: "https://github.com/Rayyan2001/Nepali-License-Plate-recognition",
    },
    {
      title: "Facial Emotion Detection",
      description: "Model trained on a Kaggle facial expression dataset to classify 7 human emotions in real time. Achieved 67% accuracy using a CNN architecture.",
      tags: ["CNN", "Python", "Kaggle", "OpenCV"],
      source: "https://github.com/Rayyan2001/Emotion-Detection",
    },
  ];

  return (
    <section id="portfolio" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 mb-2">My work</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              Portfolio
            </h2>
            <div className="section-divider" />
          </div>
          <a href="https://github.com/Rayyan2001/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-2">
            See all on GitHub →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => <PortfolioCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
// Uses EmailJS to send directly to paudelanurag34@gmail.com
// Setup: https://www.emailjs.com — replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY below
const EMAILJS_SERVICE_ID  = "service_vryffm8";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_dk5cm9d";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "SvG8E9wQ6kErzYcWR";   // e.g. "abcDEFghiJKL"

function useEmailJS() {
  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    document.head.appendChild(script);
  }, []);
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500 font-medium">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

function ContactSection() {
  useEmailJS();

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const validate = (vals) => {
    const e = {};
    if (!vals.name.trim()) e.name = "Name is required.";
    else if (vals.name.trim().length < 2) e.name = "Name must be at least 2 characters.";

    if (!vals.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = "Enter a valid email address.";

    if (!vals.message.trim()) e.message = "Message is required.";
    else if (vals.message.trim().length < 10) e.message = "Message must be at least 10 characters.";

    return e;
  };

  const handleChange = (e) => {
    const updated = { ...fields, [e.target.name]: e.target.value };
    setFields(updated);
    if (touched[e.target.name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const next = { ...touched, [e.target.name]: true };
    setTouched(next);
    setErrors(validate(fields));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    fields.name,
          from_email:   fields.email,
          message:      fields.message,
          to_email:     "paudelanurag34@gmail.com",
        }
      );
      setStatus("sent");
      setFields({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 transition-shadow bg-white dark:bg-slate-800/80 ${
      touched[field] && errors[field]
        ? "border-rose-400 dark:border-rose-500 focus:ring-rose-400/30"
        : "border-slate-200 dark:border-white/10 focus:ring-indigo-400/25"
    }`;

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 mb-2">Get in touch</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
          Let's work together
        </h2>
        <div className="section-divider" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Open for projects</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                I'm currently available for freelance work and full-time opportunities. Got a project in mind? Let's chat!
              </p>
            </div>
            <div className="glass rounded-2xl p-6 flex flex-col gap-4">
              <a href="mailto:paudelanurag34@gmail.com"
                className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span className="text-xl">✉️</span>
                paudelanurag34@gmail.com
              </a>
              {[
                { label: "GitHub", href: "https://github.com/Rayyan2001/", icon: "🐙" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/anurag-paudel-49516b268/", icon: "💼" },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span className="text-xl">{link.icon}</span>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[340px] gap-4">
                <div className="text-5xl">🎉</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Message sent!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  Thanks for reaching out! I'll reply to <strong className="text-slate-700 dark:text-slate-200">{fields.email || "your email"}</strong> as soon as possible.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-primary mt-2 text-sm">Send another</button>
              </div>
            ) : (
              <form className="glass rounded-2xl p-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text" name="name" value={fields.name}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="Your name"
                      className={inputClass("name")}
                    />
                    <FieldError msg={touched.name && errors.name} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email" name="email" value={fields.email}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />
                    <FieldError msg={touched.email && errors.email} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows="5" name="message" value={fields.message}
                    onChange={handleChange} onBlur={handleBlur}
                    placeholder="Tell me about your project..."
                    className={`${inputClass("message")} resize-none`}
                  />
                  <div className="flex items-start justify-between mt-1">
                    <FieldError msg={touched.message && errors.message} />
                    <span className={`text-xs ml-auto ${fields.message.length < 10 ? "text-slate-400" : "text-emerald-500"}`}>
                      {fields.message.length} / 10 min
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-8 mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Anurag Paudel. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["home", "portfolio", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="capitalize hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                {id}
              </a>
            ))}
            <a href="https://github.com/Rayyan2001/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.465-1.11-1.465-.908-.621.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.222-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.565 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Root ─── */
export default function App() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("home");

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* Active section detection */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Mouse tracking for interactive background */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const update = (e) => {
      document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
      document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
    };
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("reveal-visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="interactive-bg" aria-hidden="true" />
      <Nav sections={sections} active={active} onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}