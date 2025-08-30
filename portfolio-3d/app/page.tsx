'use client';

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Code2, Database, Server, BrainCircuit, Sparkles, Layers, X } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

/* ================================
   Data
==================================*/
const ME = {
  name: "Shivam Chauhan",
  role: "Data Platform / Software Engineer",
  pitch:
    "I build data platforms, cloud pipelines, and smart applications — bridging DevOps, analytics, and UI.",
  location: "Tampa, FL",
  email: "shivamchauhan3957@gmail.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/shivamchauhan-",
  resumeUrl: "#",
};

type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: string[];
  thumb: string;     // thumbnail url
  video?: string;    // placeholder video url (YouTube/Vercel/MP4)
};

type Group = { category: string; items: Project[] };

function p(id: string, title: string, blurb: string, stack: string[], seed?: string, video?: string): Project {
  // picsum placeholder per-project
  const s = seed ?? title.replace(/\s+/g, "-").toLowerCase();
  return {
    id,
    title,
    blurb,
    stack,
    thumb: `https://picsum.photos/seed/${encodeURIComponent(s)}/800/500`,
    video,
  };
}

const PROJECT_GROUPS: Group[] = [
  {
    category: "Data Analytics",
    items: [
      p("da-sba", "Smart Business Assistant", "LLM-assisted analytics with CSV upload, KPI chat, and guided decisions.", ["FastAPI","React","AWS","Databricks"]),
      p("da-sfd", "Sales Forecasting Dashboard", "Time-series forecasts, promotions uplift, and scenario planning.", ["Python","Prophet","SQL","Power BI"]),
      p("da-ccd", "Credit Card Fraud Detection", "Streaming features + anomaly models with real-time alerts.", ["Spark","Kafka","PyTorch","Airflow"]),
    ],
  },
  {
    category: "Full-Stack",
    items: [
      p("fs-micro", "Microservices on AWS", "Event-driven microservices with auth, billing, and observability.", ["Node","Go","AWS","OpenAPI"]),
      p("fs-esports", "eSports Live Data Pipeline", "Ingest → transform → overlay feeds for real-time tournaments.", ["Kafka","React","MongoDB","AWS"]),
      p("fs-hospital", "Hospital Management DB", "Schema design + APIs for patients, appointments, billing.", ["PostgreSQL","Prisma","Next.js"]),
      p("fs-eeris", "EERIS System", "Incident/Request tracking app with role-based workflows.", ["Next.js","tRPC","Tailwind"]),
      p("fs-budget", "Budget Finder", "Smart budgeting app with bank import and anomaly tips.", ["Next.js","Supabase","Stripe"]),
      p("fs-stocklinqed", "Stock linqed", "Social market tracker with sentiment and watchlists.", ["Next.js","Python","Postgres"]),
    ],
  },
  {
    category: "DevOps",
    items: [
      p("do-cicd", "CI/CD with GitHub Actions", "Build → scan → test → deploy with environments & approvals.", ["GitHub Actions","Docker","AWS"]),
      p("do-observe", "End-to-End Monitoring & Logging", "Loki/Tempo/Prom stack with SLOs and alerts.", ["Grafana","Prometheus","Loki","Tempo"]),
      p("do-sec", "Secure DevOps Pipeline", "SAST/DAST/dep checks + signed images and policy gates.", ["Veracode","Trivy","Sigstore","OPA"]),
    ],
  },
  {
    category: "IoT",
    items: [
      p("iot-lock", "Smart Door Lock (Cloud)", "ESP32 lock with cloud control, auth, and audit trails.", ["ESP32","FastAPI","AWS IoT"]),
      p("iot-face", "Facial Recognition Entry", "Edge model + cloud IAM + privacy-safe storage.", ["OpenCV","ONNX","MQTT","S3"]),
      p("iot-events", "Event → Notification Service", "Rules engine from sensor events to SMS/Push.", ["Lambda","SQS","SNS","DynamoDB"]),
      p("iot-lake", "IoT Sensor Data Lakehouse", "Delta + streaming ETL for batch & real-time analytics.", ["Spark","Delta","Kafka","Databricks"]),
    ],
  },
];

/* ================================
   iOS-style helpers
==================================*/
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[color:var(--color-iosBorder)] px-3 py-1 text-xs leading-5 bg-[var(--color-iosCard)] backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[var(--radius-3xl)] border border-[color:var(--color-iosBorder)] bg-[var(--color-iosCard)] backdrop-blur p-5 shadow-[var(--shadow-ios)] hover:shadow-[var(--shadow-iosLift)] transition-shadow ${className}`}>
    {children}
  </div>
);

const PillButton = ({ href, children }: { href?: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--color-iosBorder)] px-4 py-2 bg-white hover:shadow-[var(--shadow-iosLift)] transition"
  >
    {children}
  </a>
);

/* ================================
   3D Hero Canvas
==================================*/
function HeroSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial color="#0A84FF" distort={0.35} speed={2} roughness={0.2} />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} />
    </Canvas>
  );
}

/* ================================
   Modal for project details
==================================*/
function useEscape(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handler();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEscape(onClose);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-[92vw] max-w-4xl rounded-3xl overflow-hidden border border-[color:var(--color-iosBorder)] bg-white shadow-[var(--shadow-iosLift)]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Poster / Video area (16:9) */}
            <div className="aspect-video bg-zinc-100">
              {/* Replace with <video controls src={project.video}/> or an <iframe> */}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{project.blurb}</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full p-2 border hover:bg-zinc-50"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================
   Project Card (hover enlarge)
==================================*/
function ProjectCard({
  item,
  hoveredId,
  setHoveredId,
  onOpen,
}: {
  item: Project;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onOpen: (p: Project) => void;
}) {
  const isActive = hoveredId === item.id;
  const hasHover = hoveredId !== null;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onFocus={() => setHoveredId(item.id)}
      onBlur={() => setHoveredId(null)}
      onClick={() => onOpen(item)}
      className="text-left group rounded-3xl overflow-hidden border border-[color:var(--color-iosBorder)] bg-[var(--color-iosCard)] backdrop-blur shadow-[var(--shadow-ios)] focus:outline-none"
      style={{ transformOrigin: "center center" }}
      initial={false}
      animate={{
        scale: hasHover ? (isActive ? 1.03 : 0.97) : 1,
        opacity: hasHover ? (isActive ? 1 : 0.92) : 1,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.thumb}
          alt={item.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p className="text-sm text-zinc-600 mt-1 line-clamp-2">{item.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.stack.slice(0, 4).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
        <div className="mt-3 text-xs text-zinc-500">Click for details & video</div>
      </div>
    </motion.button>
  );
}

/* ================================
   Page
==================================*/
export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // For more “open” feel: wider max width, generous spacing
  return (
    <main className="min-h-screen text-[color:var(--color-iosInk)]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-[color:var(--color-iosBorder)] bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">{ME.name}</a>
          <div className="flex items-center gap-2 p-1 rounded-[var(--radius-pill)] border border-[color:var(--color-iosBorder)] bg-white/70 backdrop-blur">
            {["projects", "roadmap", "skills", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="px-4 py-1.5 rounded-[var(--radius-pill)] text-sm hover:bg-white transition">
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="mx-auto max-w-7xl px-6 pt-16 pb-14 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <PillButton>{ME.location} • Open to opportunities</PillButton>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mt-5 mb-4">
            {ME.role}
          </h1>
          <p className="text-xl text-zinc-600 mb-8 max-w-3xl">
            {ME.pitch}
          </p>
          <div className="flex flex-wrap gap-3">
            <PillButton href="#projects"><Sparkles className="size-4" /> See Work</PillButton>
            <PillButton href={ME.resumeUrl}><ArrowRight className="size-4" /> Resume</PillButton>
          </div>
        </div>
        <div className="h-80 rounded-[var(--radius-3xl)] border border-[color:var(--color-iosBorder)] bg-white/50 backdrop-blur overflow-hidden">
          <HeroSphere />
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500">Selected Work</div>
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          </div>
          <Code2 className="size-5" />
        </div>

        {PROJECT_GROUPS.map((group) => (
          <div key={group.category} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Layers className="size-5" /> {group.category}
            </h3>

            {/* Wider cards, more whitespace; 3-column on large screens */}
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              onMouseLeave={() => setHoveredId(null)}
            >
              {group.items.map((item) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onOpen={(p) => setOpenProject(p)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500">Next Up</div>
            <h2 className="text-3xl font-semibold tracking-tight">Roadmap</h2>
          </div>
          <Server className="size-5" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card>
            <h3 className="font-semibold mb-3">Data Engineering</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Ingestion → streaming → lakehouse; data quality gates.</li>
              <li>Realtime anomaly detection + alerting.</li>
              <li>Case study with measurable impact.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3">DevOps</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>IaC (Terraform) with PR plan previews.</li>
              <li>SAST/DAST/dep scans before deploys.</li>
              <li>Blue/Green + Canary rollouts.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3">UI / 3D</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Framer Motion route transitions.</li>
              <li>R3F hero refinements; perf budgets.</li>
              <li>Accessibility (focus rings, contrast).</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-7xl px-6 pb-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500">Toolbox</div>
            <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
          </div>
          <BrainCircuit className="size-5" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Database className="size-5" />, title: "Data & Cloud", items: ["AWS","Databricks","PostgreSQL","MongoDB","Kafka"] },
            { icon: <Server className="size-5" />, title: "Backend", items: ["FastAPI","Spring Boot","Node.js","REST","Auth (OAuth2/JWT)"] },
            { icon: <Code2 className="size-5" />, title: "Frontend", items: ["React","Next.js","Tailwind CSS","Framer Motion"] },
            { icon: <BrainCircuit className="size-5" />, title: "ML / LLM", items: ["Gemini API","RAG","Pandas","PySpark"] },
          ].map((group) => (
            <Card key={group.title}>
              <div className="flex items-center gap-2">
                {group.icon}
                <h3 className="text-base font-semibold">{group.title}</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((s) => <Badge key={s}>{s}</Badge>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">Let’s build something great <Mail className="size-4" /></h3>
              <p className="text-sm text-zinc-600">Email me or connect on LinkedIn/GitHub. I usually respond within a day.</p>
            </div>
            <div className="flex items-center gap-3">
              <PillButton href={`mailto:${ME.email}`}><Mail className="size-4" /> Email</PillButton>
              <PillButton href={ME.linkedin}><Linkedin className="size-4" /> LinkedIn</PillButton>
              <PillButton href={ME.github}><Github className="size-4" /> GitHub</PillButton>
            </div>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--color-iosBorder)] py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {ME.name}. All rights reserved.</p>
          <p>Built with Next.js, Tailwind, Framer Motion, R3F.</p>
        </div>
      </footer>

      {/* MODAL */}
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </main>
  );
}
