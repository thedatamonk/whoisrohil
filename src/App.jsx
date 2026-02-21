import React, { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: "terras",
    title: "Terras",
    github: "https://github.com/thedatamonk/terras",
    summary:
      "LLM-driven farmers' assistant: helps farmers get expert advice - covering crop disease, market prices, and government schemes.",
    details: [
      "Multimodal agent providing instant crop disease diagnosis from farmer-uploaded photos using OpenAI's vision models.",
      "Retrieves real-time market prices via government APIs",
      "Uses RAG over government scheme PDFs to answer questions about eligibility and benefits"
    ],
    stack: ["FastAPI", "Streamlit", "OpenAI APIs", "Qdrant", "PostgreSQL"],
  },
  {
    id: "sec-io",
    title: "Sec.io",
    github: "https://github.com/thedatamonk/sec.io",
    summary:
      "AI financial analyst for SEC filings — multi-agent pipeline with guardrails for accurate, grounded answers on public company data.",
    details: [
      "Multi-agent pipeline where specialized agents parse, retrieve, and synthesize information from SEC filings via edgartools.",
      "Guardrails layer validates outputs for factual consistency and flags hallucinations before surfacing answers to users.",
      "FastAPI backend exposes a clean API for querying any SEC-registered public company's filings.",
    ],
    stack: ["FastAPI", "OpenAI APIs", "edgartools"],
  },
  {
    id: "spendly",
    title: "Spendly",
    github: "https://github.com/thedatamonk/spendly",
    summary:
      "Shared expense tracker using natural language — log expenses via Telegram bot, visualize splits on a React dashboard.",
    details: [
      "Telegram bot as the primary interface: users log expenses in plain English.",
      "LLM (via OpenRouter) detects intent of the query, asks follow-up questions, and logs the expenses in TinyDB.",
      "User can also query pending balances and update existing expenses.",
      "A minimal React page to manage your expenses.",
    ],
    stack: ["Python", "FastAPI", "OpenRouter", "React", "Telegram Bot API"],
  },
  {
    id: "howzyourstay",
    title: "Howzyourstay",
    github: "https://github.com/thedatamonk/howzyourstay",
    summary:
      "Voice agent for guest feedback collection — calls guests via Twilio, conducts natural conversations, and stores structured insights.",
    details: [
      "Automated outbound calls to hostel guests using Twilio Voice API to collect post-stay feedback via natural conversation.",
      "Streams bidirectional audio between Twilio and OpenAI Realtime API, handles mid-conversation interruptions, and decides when to hang up autonomously via function calling.",
      "Summarizes the call transcript into structured JSON and stores it in Postgres DB.",
    ],
    stack: ["FastAPI", "OpenAI Realtime API", "Twilio Voice API", "PostgreSQL"],
  },
];

const EMAIL = "rohilpal9763@gmail.com";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayedProject, setDisplayedProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  // Handle smooth open/close animation:
  // Open: mount content immediately (displayedProject), then expand on next frame (expandedProject)
  // Close: collapse first (expandedProject=null), then unmount content after transition (displayedProject)
  useEffect(() => {
    if (selectedProject) {
      setDisplayedProject(selectedProject);
      // Delay expansion by one frame so the element is in the DOM at max-h-0 first
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExpandedProject(selectedProject);
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      // Collapse immediately, then clear content after transition completes
      setExpandedProject(null);
      const timer = setTimeout(() => setDisplayedProject(null), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const activeProject = PROJECTS.find((p) => p.id === displayedProject) || null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback: open mailto if clipboard fails
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-[#1c1917] selection:bg-teal-500/20 selection:text-teal-900">
      {/* Subtle grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -right-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-teal-100/40 via-cyan-50/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-stone-100/50 via-slate-50/30 to-transparent blur-3xl" />
      </div>

      <main className="relative z-10">
        {/* Header */}
        <header className="border-b border-stone-200/60">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`flex items-center gap-3 transition-all duration-700 hover:opacity-70 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tight">
                  RP
                </div>
              </div>
              <span className="text-base font-medium tracking-tight text-stone-800">Rohil Pal</span>
            </a>

            <nav
              className={`flex items-center transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <a
                href="/Rohil-Pal-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-[13px] text-stone-700 hover:bg-stone-200/70 hover:border-teal-300 transition-all"
              >
                Resume
              </a>
            </nav>
          </div>
        </header>

        {/* Hero - Compact */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-3xl">
            <div
              className={`inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[13px] text-emerald-700 font-medium">Open to ML Engineer roles</span>
            </div>

            <h1
              className={`text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight mb-5 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Builder. Tinkerer.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 bg-clip-text text-transparent">
                  Perpetually curious.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2.5 bg-gradient-to-r from-teal-200/60 to-cyan-200/40 blur-sm" />
              </span>
            </h1>

            <p
              className={`text-lg text-stone-500 max-w-2xl leading-relaxed transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Hey! I'm Rohil. I start more projects than I can actually finish. These days I spend most of my time poking around <span className="font-medium text-stone-700">LLMs</span>.
            </p>

          </div>
        </section>

        {/* Projects */}
        <section id="work" className="border-t border-stone-200/60 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[2.1rem] font-semibold tracking-tight text-teal-600">Side Hustles</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROJECTS.map((project, idx) => (
                <React.Fragment key={project.id}>
                  <button
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col ${
                      selectedProject === project.id
                        ? "bg-gradient-to-br from-teal-50 to-cyan-50/50 border-teal-300 shadow-lg shadow-teal-100/50"
                        : "bg-white/60 border-stone-200 hover:border-teal-300 hover:bg-white hover:shadow-md"
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h3 className={`font-semibold text-[15px] transition-colors truncate ${
                        selectedProject === project.id ? "text-teal-700" : "text-stone-800 group-hover:text-teal-700"
                      }`} title={project.title}>
                        {project.title}
                      </h3>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-stone-400 hover:text-teal-600 transition-colors -mr-1 -mt-1 p-1.5 rounded-lg hover:bg-teal-50"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                    </div>

                    <p className={`text-[13px] leading-relaxed mb-4 ${
                      selectedProject === project.id ? "text-teal-800/70" : "text-stone-500"
                    }`}>
                      {project.summary}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                            selectedProject === project.id
                              ? "bg-teal-100 text-teal-700"
                              : "bg-stone-200/70 text-stone-600 group-hover:bg-teal-50 group-hover:text-teal-600"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Mobile inline details panel — always in DOM for smooth transitions */}
                  <div className={`sm:hidden col-span-full overflow-hidden transition-all duration-300 ease-out ${expandedProject === project.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {displayedProject === project.id && activeProject && (
                      <div className="relative p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Close details"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div>
                          <h3 className="text-xl font-medium text-stone-800 mb-1">{activeProject.title}</h3>
                          <p className="text-[13px] font-medium text-stone-600 leading-relaxed mb-5">{activeProject.summary}</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-4">Technical Highlights</p>
                          <ul className="space-y-3">
                            {activeProject.details.map((detail, i) => (
                              <li key={i} className="flex gap-3 text-sm text-stone-600">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Project details panel — tablet/desktop */}
            <div className={`hidden sm:block overflow-hidden transition-all duration-300 ease-out ${expandedProject ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
              {activeProject && (
                <div className="relative p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                    aria-label="Close details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8">
                    <div>
                      <h3 className="text-xl font-medium text-stone-800 mb-1">{activeProject.title}</h3>
                      <p className="text-[13px] font-medium text-stone-600 leading-relaxed">{activeProject.summary}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-4">Technical Highlights</p>
                      <ul className="space-y-3">
                        {activeProject.details.map((detail, i) => (
                          <li key={i} className="flex gap-3 text-sm text-stone-600">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-stone-200/60 py-16 bg-white/40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-[2.1rem] font-semibold tracking-tight text-teal-600">Work Experience</h2>
            </div>

            <div className="space-y-2">
              {/* DataPOEM */}
              {[
                {
                  id: "datapoem",
                  role: "Senior Data Scientist",
                  company: "DataPOEM",
                  period: "Mar 2024 – Present",
                  current: true,
                  companyColor: "text-teal-600",
                  projects: [
                    {
                      title: "Automation of Market Mix Modelling (MMM) pipeline",
                      bullets: [
                        "Replaced manual notebook-driven pipeline with an automated workflow using Temporal.",
                        "Metadata stored in PostgreSQL, pipeline artifacts in S3.",
                        "Enabled faster delivery and onboarding of 3 new brands.",
                      ],
                    },
                    {
                      title: "Transformers for Market Mix Modelling",
                      bullets: [
                        "Co-developed custom transformer architecture and trained it on MMM data.",
                        "Wrote distributed training, hyperparameter tuning, and inference pipelines in PyTorch.",
                        "Deployed the pipelines using AWS SageMaker.",
                      ],
                    },
                  ],
                  stack: ["Python", "Temporal", "FastAPI", "PostgreSQL", "AWS S3", "PyTorch", "AWS SageMaker"],
                },
                {
                  id: "honeywell",
                  role: "Data Scientist",
                  company: "Honeywell",
                  period: "Aug 2021 – Mar 2024",
                  current: false,
                  companyColor: "text-stone-500",
                  projects: [
                    {
                      title: "Ventilation optimization in AHUs",
                      bullets: [
                        "Built end-to-end data pipeline consuming raw telemetry from Azure Event Hubs into delta tables.",
                        "Co-developed a patented algorithm to recommend optimal outdoor air set points for Air Handling Units.",
                        "Minimizes energy consumption while maintaining air quality standards.",
                      ],
                    },
                    {
                      title: "Optimal sensor placement in floor plans",
                      bullets: [
                        "Automated optimal placement of smoke sensors in commercial floor plans.",
                        "YOLOv3 for door detection, OpenCV contour detection for room segmentation.",
                        "Mixed-Integer Linear Programming (MILP) solver for optimal sensor placement.",
                      ],
                    },
                  ],
                  stack: ["PySpark", "Databricks", "Azure Event Hubs", "FastAPI", "YOLOv3", "OpenCV", "MILP"],
                },
              ].map((job) => (
                <div key={job.id} className="rounded-2xl border border-stone-200 overflow-hidden bg-white/60">
                  {/* Accordion header — always visible */}
                  <button
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-stone-50/80 transition-colors"
                  >
                    <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-stone-800">{job.role}</span>
                      <span className={`text-sm font-medium ${job.companyColor}`}>{job.company}</span>
                      {job.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-600 border border-teal-200">Now</span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400 shrink-0 mr-3">{job.period}</span>
                    <svg
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${expandedJob === job.id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion body */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${expandedJob === job.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-6 border-t border-stone-100">
                      <div className="space-y-5 mt-5">
                        {job.projects.map((p) => (
                          <div key={p.title}>
                            <p className="text-[13px] font-medium text-stone-700 mb-2">{p.title}</p>
                            <ul className="space-y-1.5">
                              {p.bullets.map((b, i) => (
                                <li key={i} className="flex gap-3 text-sm text-stone-500">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex-shrink-0" />
                                  <span className="leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {job.stack.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-stone-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-stone-200/60 py-12 sm:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-800 mb-4">
                Let's build something together
              </h2>

              <p className="text-stone-500 mb-8 leading-relaxed">
                I'm based in Bangalore and currently exploring new opportunities. If you're working on something interesting, I'd love to hear from you.
              </p>

              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 px-5 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium text-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all hover:-translate-y-1"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Say hello
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-200/60 py-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-400">
            <p>&copy; {new Date().getFullYear()} Rohil Pal</p>
            <div className="flex items-center gap-5">
              <a href="https://github.com/thedatamonk" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/rohilpal" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition-colors">LinkedIn</a>
              <a href="/Rohil-Pal-Resume.pdf" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition-colors">Resume</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
