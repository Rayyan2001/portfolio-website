import { useEffect, useMemo, useRef, useState } from "react";
import me from "./assets/me.jpeg";
import GalleryHidden from "./GalleryHidden.jsx";
import resumePDF from "./assets/myresume.pdf"; // ✅ Your CV
import PortalGate from "./PortalGate.jsx";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return { theme, setTheme };
}

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur hover:bg-white/90 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
      title="Toggle light/dark"
    >
      <span className="relative inline-flex h-5 w-10 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors">
        <span
          className={`absolute h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
            isDark ? "translate-x-5" : "translate-x-1"
          }`}
        ></span>
      </span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

function Nav({ sections, active, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mb-3 flex items-center justify-between rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur shadow-sm">
          <div className="flex items-center gap-3 pl-4">
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 via-fuchsia-500 to-emerald-400 animate-float"></div>
              <div className="absolute inset-0 rounded-xl bg-white/30 dark:bg-white/10 mix-blend-overlay"></div>
            </div>
            <span className="font-extrabold tracking-tight text-xl">
              Anurag
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(s.id);
                }}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors hover:text-brand-700 dark:hover:text-brand-300 ${
                  active === s.id
                    ? "text-brand-700 dark:text-brand-300 bg-brand-500/10"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 pr-3">
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <a
              href={resumePDF}
              download="Anurag_Paudel_CV.pdf"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
            >
              Download CV
            </a>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur shadow-sm p-4">
            <div className="flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(s.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors hover:text-brand-700 dark:hover:text-brand-300 ${
                    active === s.id
                      ? "text-brand-700 dark:text-brand-300 bg-brand-500/10"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Hero({ onOpenHiddenGallery }) {
  const roles = useMemo(() => ["Anurag Paudel", " a Software Developer"], []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % roles.length), 4000);
    return () => clearTimeout(id);
  }, [index, roles.length]);
  return (
    <section id="home" className="relative isolate pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse"></span>
              Available for work
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                Crafting creativity into reality
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              I build modern web apps with React, Python and FastAPI, focused on
              performance, aesthetics, and interactivity.
            </p>
            <div className="mt-6">
              <div className="h-12 overflow-hidden">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-300">
                  <span>I'm </span>
                  <span
                    key={index}
                    className="will-change-transform inline-block animate-[fadeIn_0.6s_ease]"
                  >
                    {roles[index]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
              >
                View Portfolio
              </a>
              <a
                href={resumePDF}
                download="Anurag_Paudel_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div
              className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
              onDoubleClick={onOpenHiddenGallery}
              // title="Double‑click to open a hidden gallery"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-fuchsia-500 via-brand-500 to-emerald-400 blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative rounded-full w-full h-full p-1 bg-gradient-to-tr from-brand-500 to-fuchsia-500">
                <div className="rounded-full w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <img
                    src={me}
                    alt="Portrait of Anurag Paudel"
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ title, description, tags, source }) {
  return (
    <div className="group relative h-full min-h-[240px] flex flex-col rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/20 via-fuchsia-500/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="relative flex flex-col flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-3">
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const projects = [
    {
      title: "Simple Online Ecommerce Website from Scratch",
      description: "A simple online e-commerce website built from scratch.",
      tags: ["HTML", "CSS", "JavaScript"],
      source:
        "https://github.com/Rayyan2001/Simple-Online-ecommerce-website-from-scratch",
    },
    {
      title: "Nepal stock prediction using LSMT, GRU, RF",
      description:
        "Stock price forecasting using LSTM, GRU, and Random Forest.",
      tags: ["ML", "Time Series", "Python"],
      source:
        "https://github.com/Rayyan2001/Nepal-stock-prediction-using-LSMT--GRU--RF",
    },
    {
      title: "Nepali License Plate recognition",
      description: "License plate recognition for Nepali plates.",
      tags: ["Computer Vision", "Python", "Jupyter"],
      source: "https://github.com/Rayyan2001/Nepali-License-Plate-recognition",
    },
  ];
  return (
    <section id="portfolio" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Portfolio
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Some recent works and experiments.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 hover:underline"
          >
            Get in touch →
          </a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <PortfolioCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Contact
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Have a project in mind? Let’s talk.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/90 dark:bg-slate-800/80 px-4 py-3 outline-none focus:ring-2 ring-brand-400/70 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/90 dark:bg-slate-800/80 px-4 py-3 outline-none focus:ring-2 ring-brand-400/70 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  placeholder="Tell me about your project"
                  className="w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/90 dark:bg-slate-800/80 px-4 py-3 outline-none focus:ring-2 ring-brand-400/70 placeholder:text-slate-400"
                ></textarea>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} Anurag Paudel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#home"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              Home
            </a>
            <a
              href="#portfolio"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              Contact
            </a>
            <a
              href="https://github.com/Rayyan2001/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.465-1.11-1.465-.908-.621.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.222-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.565 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/anurag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.3 8.25h4.4V23H.3zM8.657 8.25h4.217v2.006h.06c.587-1.113 2.022-2.287 4.162-2.287 4.452 0 5.273 2.93 5.273 6.736V23h-4.4v-6.49c0-1.549-.028-3.54-2.158-3.54-2.158 0-2.49 1.685-2.49 3.43V23h-4.404z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              About
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
              I’m Anurag Paudel, a software developer focused on building
              delightful, high-performance web applications. I love shipping
              polished UI, clean architecture, and accessible experiences.
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
              Recently, I’ve worked on dashboards, interactive marketing sites,
              and reusable UI systems with React and Tailwind.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 px-5 py-3 text-base">
                Remote-friendly
              </span>
              <span className="inline-flex items-center rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 px-5 py-3 text-base">
                Open to freelance
              </span>
              <span className="inline-flex items-center rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 px-5 py-3 text-base">
                Performance-first
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5">
              <div className="text-sm text-slate-500">Experience</div>
              <div className="mt-1 text-2xl font-bold">2+ years</div>
            </div>
            <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5">
              <div className="text-sm text-slate-500">Open Source</div>
              <div className="mt-1 text-2xl font-bold">Contributor</div>
            </div>
            <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5">
              <div className="text-sm text-slate-500">Availability</div>
              <div className="mt-1 text-2xl font-bold">Open to work</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillIcon({ name }) {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    className: "h-8 w-8 text-brand-600 dark:text-brand-300",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "React JS":
    case "React Native":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="12" rx="9" ry="4.2"></ellipse>
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.2"
            transform="rotate(60 12 12)"
          ></ellipse>
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.2"
            transform="rotate(-60 12 12)"
          ></ellipse>
          <circle
            cx="12"
            cy="12"
            r="1.7"
            fill="currentColor"
            stroke="none"
          ></circle>
          {name === "React Native" ? (
            <rect
              x="16.2"
              y="6.2"
              width="5"
              height="10.5"
              rx="1.2"
              fill="currentColor"
              opacity="0.35"
              stroke="none"
            ></rect>
          ) : null}
        </svg>
      );
    case "Python":
      return (
        <svg {...commonProps}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
          ></rect>
          <text
            x="6.5"
            y="15"
            fontSize="8.5"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fill="currentColor"
          >
            Py
          </text>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg {...commonProps}>
          <path
            d="M4.5 13c1.6-3.2 3.6-4.8 6-4.8 1.2 0 2.2.4 3 .9.8.5 1.5 1.1 2.7 1.1 1.3 0 2.3-.6 3.3-1.8-1.6 3.2-3.6 4.8-6 4.8-1.2 0-2.2-.4-3-.9-.8-.5-1.5-1.1-2.7-1.1-1.3 0-2.3.6-3.3 1.8z"
            fill="currentColor"
            stroke="none"
          ></path>
          <path
            d="M4.5 18c1.6-3.2 3.6-4.8 6-4.8 1.2 0 2.2.4 3 .9.8.5 1.5 1.1 2.7 1.1 1.3 0 2.3-.6 3.3-1.8-1.6 3.2-3.6 4.8-6 4.8-1.2 0-2.2-.4-3-.9-.8-.5-1.5-1.1-2.7-1.1-1.3 0-2.3.6-3.3 1.8z"
            fill="currentColor"
            opacity="0.55"
            stroke="none"
          ></path>
        </svg>
      );
    case "Node.js":
      return (
        <svg {...commonProps}>
          <path d="M12 2.6 4 7v10l8 4.4 8-4.4V7L12 2.6z" fill="none"></path>
          <path d="M12 2.6 4 7v10l8 4.4 8-4.4V7L12 2.6z"></path>
          <text
            x="8.2"
            y="15"
            fontSize="7.5"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fill="currentColor"
          >
            JS
          </text>
        </svg>
      );
    case "FastAPI":
      return (
        <svg {...commonProps}>
          <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z"></path>
          <path
            d="M12 7.5 9.5 13h2l-1.5 3.5 4.5-5.5h-2L14 7.5h-2z"
            fill="currentColor"
            stroke="none"
          ></path>
        </svg>
      );
    case "SSMS":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="6.5" rx="6.5" ry="3"></ellipse>
          <path
            d="M5.5 6.8v7.1c0 1.7 3 3.1 6.5 3.1s6.5-1.4 6.5-3.1V6.8"
            fill="none"
          ></path>
          <path
            d="M5.5 11.2c0 1.7 3 3.1 6.5 3.1s6.5-1.4 6.5-3.1"
            fill="none"
          ></path>
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="3"></rect>
        </svg>
      );
  }
}

function SkillsSection() {
  const skills = [
    { name: "React JS", level: "Advanced" },
    { name: "Python", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" },
    { name: "FastAPI", level: "Intermediate" },
    { name: "React Native", level: "Intermediate" },
    { name: "SSMS", level: "Intermediate" },
    // { name: "Accessibility (a11y)", level: "Intermediate" },
    // { name: "Testing (Jest/RTL)", level: "Intermediate" },
  ];
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-24 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Skills
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Technologies I work with regularly.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {skills.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5 min-h-[96px] flex items-center gap-4"
            >
              <SkillIcon name={s.name} />
              <div>
                <div className="font-semibold text-base sm:text-lg">
                  {s.name}
                </div>
                <div className="mt-1 text-xs text-slate-500">{s.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [route, setRoute] = useState("/");
  const containerRef = useRef(null);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    const update = (e) => {
      const x = e.clientX + "px";
      const y = e.clientY + "px";
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
    };
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  // Reveal-on-scroll observer
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  if (route === "/portal") {
    const refreshToHome = () => {
      try {
        window.location.replace("/");
      } catch {
        window.location.href = "/";
      }
    };
    return (
      <PortalGate
        onBack={refreshToHome}
        onSuccess={() => setRoute("/gallery-hidden")}
      />
    );
  }

  if (route === "/gallery-hidden") {
    const refreshToHome = () => {
      try {
        window.location.replace("/");
      } catch {
        window.location.href = "/";
      }
    };
    return <GalleryHidden onBack={refreshToHome} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className="interactive-bg" aria-hidden="true"></div>
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-24 right-4 z-30">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      
      <Nav
        sections={sections}
        active={active}
        onNavigate={handleNavigate}
      />
      <main className="pt-6">
        <Hero onOpenHiddenGallery={() => setRoute("/portal")} />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
