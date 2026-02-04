import { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: "marketing-agent",
    badge: "LLM Agent",
    title: "Marketing Insights Agent",
    company: "DataPOEM",
    period: "2024 – Present",
    summary:
      "LLM agent built on top of Market Mix Modelling (MMM) pipeline to provide accurate insights to marketing heads and budget planners.",
    details: [
      "Users can ask queries like \"Why did Meta Ads RROI drop from Q3 to Q4 by 15%?\" or \"What will happen if I shift marketing spends from Digital to TV?\"",
      "Achieved strong adoption and positive feedback from Unilever, one of the biggest clients.",
      "Built with FastAPI, LangSmith for observability, and Claude API.",
    ],
    stack: ["Claude API", "FastAPI", "LangSmith", "Python"],
  },
  {
    id: "facility-agent",
    badge: "RAG Agent",
    title: "Q&A Chatbot for Facility Management",
    company: "Honeywell",
    period: "2021 – 2024",
    summary:
      "Production RAG agent deployed as a containerized FastAPI service for facility managers.",
    details: [
      "Implemented Hybrid Search (vector + keyword) and Cross-Encoder Re-ranking over Pinecone for high-precision retrieval from complex technical documentation.",
      "Designed tool calling for fetching real-time operational data from BMS API streams, enabling context-aware status and procedural answers.",
      "Deployed at two Honeywell Bangalore offices.",
    ],
    stack: ["OpenAI API", "Pinecone", "FastAPI", "Python"],
  },
  {
    id: "kisan",
    badge: "Multimodal",
    title: "Kisan Agent",
    company: "Side Project",
    period: "2024",
    summary:
      "LLM-powered assistant for Indian farmers providing crop disease diagnosis, market analysis, and government scheme information.",
    details: [
      "Multimodal agent providing instant crop disease diagnosis from photos using OpenAI's vision models.",
      "Leveraged Feast Feature Store to manage and serve market data features as LLM context for price analysis.",
      "Uses Weaviate for RAG and DeepEval for offline evaluations. Deployed on Render.",
    ],
    stack: ["OpenAI API", "Weaviate", "Feast", "DeepEval", "React"],
  },
  {
    id: "sec-edgar",
    badge: "RAG + Tools",
    title: "SEC-Edgar Agent",
    company: "Side Project",
    period: "2024",
    summary:
      "Q&A chatbot for SEC-Edgar database providing grounded answers for queries related to SEC-registered public companies.",
    details: [
      "Built using RAG and function calling to provide accurate, grounded answers.",
      "Utilized DeepEval for continuous, offline evaluation of chatbot performance.",
      "Deployed on Render with Weaviate as the vector store.",
    ],
    stack: ["OpenAI API", "Weaviate", "DeepEval", "Render"],
  },
];

const EMAIL = "rohilpal9763@gmail.com";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayedProject, setDisplayedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle smooth close animation by keeping content visible during transition
  useEffect(() => {
    if (selectedProject) {
      setDisplayedProject(selectedProject);
    } else {
      // Delay clearing displayed project to allow close animation
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
              <span className="text-sm font-medium tracking-tight text-stone-800">Rohil Pal</span>
            </a>

            <nav
              className={`flex items-center gap-5 text-[13px] tracking-wide transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <a href="https://github.com/thedatamonk" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-teal-600 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/rohilpal" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-teal-600 transition-colors">
                LinkedIn
              </a>
              <a
                href="/Rohil-Pal-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200/70 hover:border-teal-300 transition-all"
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
              className={`inline-flex items-center gap-2 mb-5 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[13px] text-emerald-600 font-medium">Available for opportunities</span>
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
              ML Engineer specializing in LLM agents, RAG architectures, and production MLOps.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="border-t border-stone-200/60 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-teal-600 mb-2">Portfolio</p>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-800">Selected Work</h2>
              </div>
              <p className="text-sm text-stone-400 hidden sm:block">Click to explore</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROJECTS.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col ${
                    selectedProject === project.id
                      ? "bg-gradient-to-br from-teal-50 to-cyan-50/50 border-teal-300 shadow-lg shadow-teal-100/50"
                      : "bg-white/60 border-stone-200 hover:border-teal-300 hover:bg-white hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <h3 className={`font-semibold text-[15px] mb-2 transition-colors truncate ${
                    selectedProject === project.id ? "text-teal-700" : "text-stone-800 group-hover:text-teal-700"
                  }`} title={project.title}>
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-stone-400 mb-4">
                    {project.company} · {project.period}
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
              ))}
            </div>

            {/* Project details panel */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${selectedProject ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
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
                      <h3 className="text-xl font-medium text-stone-800 mb-2">{activeProject.title}</h3>
                      <p className="text-sm text-teal-600 mb-4">{activeProject.company} · {activeProject.period}</p>
                      <p className="text-stone-600 leading-relaxed">{activeProject.summary}</p>
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
        <section className="border-t border-stone-200/60 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-teal-600 mb-2">Background</p>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-800">Experience</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="group relative p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
                <div className="absolute top-5 right-5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200">
                  <span className="text-teal-600 text-xs font-semibold">Now</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-2">Mar 2024 – Present</p>
                <p className="font-medium text-stone-800 mb-1">Senior Data Scientist</p>
                <p className="text-sm text-teal-600 mb-3">DataPOEM · Bengaluru</p>
                <p className="text-[13px] text-stone-500 leading-relaxed mb-3">
                  Co-developed Marketing Insights Agent on top of MMM pipeline for portfolio brands including Unilever.
                </p>
                <p className="text-[13px] text-stone-500 leading-relaxed">
                  Leading automation of DataPOEM's MMM process — reduced delivery time from 10 days to 4 days.
                </p>
              </div>

              <div className="group relative p-5 rounded-2xl bg-white/60 border border-stone-200 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-2">Aug 2021 – Mar 2024</p>
                <p className="font-medium text-stone-800 mb-1">Data Scientist</p>
                <p className="text-sm text-stone-500 mb-3">Honeywell · Bengaluru</p>
                <p className="text-[13px] text-stone-500 leading-relaxed">
                  Engineered and deployed a production RAG agent for facility management. Implemented hybrid search with cross-encoder re-ranking. Deployed at two Honeywell Bangalore offices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-stone-200/60 py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-emerald-700 font-medium">Open to ML Engineer / Applied Scientist roles</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-800 mb-4">
                Let's build something together
              </h2>

              <p className="text-stone-500 mb-8 leading-relaxed">
                I'm based in Bangalore and currently exploring new opportunities. If you're working on interesting ML/AI problems, I'd love to hear from you.
              </p>

              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium text-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all hover:-translate-y-1"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied to clipboard!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {EMAIL}
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
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center text-sm text-stone-400">
            <p>&copy; {new Date().getFullYear()} Rohil Pal</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
