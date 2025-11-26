import { useState } from "react";

// Minimal, modern personal site using React + TailwindCSS
// All heavier text is hidden behind interactions or compact sections.

const PROJECTS = [
  {
    id: "marketing-agent",
    badge: "LLM Agent",
    title: "Marketing Insights Copilot",
    company: "DataPOEM",
    period: "2024 – Present",
    summary:
      "Copilot that lets marketing teams ask anything about campaign performance, ROI and strategy.",
    details: [
      "Natural-language queries over complex marketing data (what worked, channel mix, scenarios).",
      "Guardrails, tracing and evaluations wired via LangSmith.",
      "Built with FastAPI and Claude, deployed in production.",
    ],
  },
  {
    id: "facility-agent",
    badge: "RAG Agent",
    title: "Facility Management Q&A Agent",
    company: "Honeywell",
    period: "2021 – 2024",
    summary:
      "Production RAG agent for building managers over technical manuals and live BMS telemetry.",
    details: [
      "Hybrid search (vector + keyword) + cross-encoder re-ranking over Pinecone.",
      "Tool-calling into BMS APIs for real-time status and procedures.",
      "Domain-tuned via PEFT for facility management terminology.",
    ],
  },
  {
    id: "kisan",
    badge: "Multimodal",
    title: "Project Kisan",
    company: "Side Project",
    period: "2024",
    summary:
      "Farmer assistant that diagnoses crop issues from photos and markets data.",
    details: [
      "OpenAI vision models for crop disease diagnosis.",
      "Weaviate + Feast + DeepEval for RAG, features and evaluation.",
      "Deployed on Render with a simple React front-end.",
    ],
  },
];

const FOCUS_AREAS = [
  "LLM agents & tool-use",
  "RAG systems",
  "MLOps & CI/CD",
  "Vector DBs (Pinecone, Weaviate)",
  "FastAPI services",
  "AWS SageMaker",
  "Evaluation (DeepEval, Langfuse, LangSmith)",
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]?.id ?? null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const activeProject = PROJECTS.find((p) => p.id === selectedProject) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" />

      {/* Shell */}
      <main className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-5xl space-y-10">
          {/* NAV */}
          <header className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Rohil Pal</h1>
              <p className="text-xs sm:text-sm text-slate-400">ML Engineer • LLM Agents • RAG • MLOps</p>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
              <a
                href="mailto:rohilpal9763@gmail.com"
                className="underline underline-offset-4 decoration-slate-500 hover:decoration-emerald-400"
              >
                Email
              </a>
              <span className="hidden sm:inline text-slate-600">/</span>
              <a
                href="https://github.com/thedatamonk"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-slate-500 hover:decoration-emerald-400"
              >
                GitHub
              </a>
              <span className="hidden sm:inline text-slate-600">/</span>
              <a
                href="/Rohil-Pal-Latest-Senior-ML-Engineer-Resume.pdf"
                className="underline underline-offset-4 decoration-slate-500 hover:decoration-emerald-400"
              >
                Resume
              </a>
            </div>
          </header>

          {/* HERO */}
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="inline-flex items-center rounded-full border border-emerald-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                  Shipping LLM agents to production
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
                  I build ML systems that plug straight into real workflows and ship.
                </h2>
                <p className="text-sm text-slate-400 max-w-xl">
                  Recent work: marketing analytics copilots at DataPOEM and a facility-management RAG agent at Honeywell
                  used by building managers.
                </p>
              </div>
            </div>

            {/* QUICK CARDS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Currently</p>
                <p className="text-sm font-medium">Senior Data Scientist @ DataPOEM</p>
                <p className="text-xs text-slate-400">Building LLM copilots + ML pipelines for marketing analytics.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Previously</p>
                <p className="text-sm font-medium">Data Scientist @ Honeywell</p>
                <p className="text-xs text-slate-400">Deployed a production RAG agent for facility managers.</p>
              </div>
            </div>
          </section>

          {/* WORK + SKILLS */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-start">
            {/* PROJECTS */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected Work</h3>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
                {PROJECTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProject(p.id)}
                    className={`group rounded-2xl border px-3 py-3 text-left text-xs transition hover:border-cyan-400/60 hover:bg-slate-900/80 ${
                      selectedProject === p.id
                        ? "border-slate-300 bg-slate-900/90 ring-1 ring-cyan-400/60 shadow-lg shadow-cyan-500/20"
                        : "border-slate-800 bg-slate-900/60"
                    }`}
                  >
                    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300 group-hover:border-cyan-400/60">
                      {p.badge}
                    </span>
                    <p className="mt-2 font-medium text-slate-100 line-clamp-2">{p.title}</p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {p.company} · {p.period}
                    </p>
                  </button>
                ))}
              </div>

              {activeProject && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-100">{activeProject.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {activeProject.company} · {activeProject.period}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-[11px] text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm">{activeProject.summary}</p>
                  <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
                    {activeProject.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* FOCUS / SKILLS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Focus</h3>
                <button
                  onClick={() => setShowAllSkills((v) => !v)}
                  className="text-[11px] text-slate-500 hover:text-slate-200"
                >
                  {showAllSkills ? "Show less" : "Show full stack"}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                <p className="text-xs text-slate-300">
                  I enjoy roles where I can own the full ML lifecycle: from problem framing and data pipelines to
                  LLM agents, evaluations, and deployment.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-100">
                  {FOCUS_AREAS.map((item, idx) => {
                    const isHidden = !showAllSkills && idx > 3;
                    if (isHidden) return null;
                    return (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-0.5"
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
                {showAllSkills && (
                  <p className="text-[11px] text-slate-500">
                    Also comfortable with: Python, PyTorch, Docker, GitHub Actions, Render, basic frontend with React +
                    TailwindCSS.
                  </p>
                )}
              </div>

              {/* Education card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-1.5 text-xs text-slate-300">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Education</p>
                <p className="text-sm font-medium text-slate-100">IIIT-Bangalore</p>
                <p>Bachelors & Masters, Computer Science · CGPA 3.41 / 4</p>
              </div>
            </div>
          </section>

          {/* How I like to work */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-slate-300">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">How I like to work</h3>
            <p>
              I like owning the full loop: scoping the problem, designing the data / eval strategy, building the
              model or LLM agent, and wiring it into a product with observability and guardrails.
            </p>
            <p>
              I’m happiest when I can ship small, iterate fast with real users, and measure impact in numbers
              (latency, adoption, revenue saved, errors reduced).
            </p>
          </section>

          {/* FOOTER */}
          <footer className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>Based in Bangalore · Open to ML Engineer / Applied Scientist roles.</p>
            <p>
              Contact: <span className="text-slate-300">rohilpal9763@gmail.com</span>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
